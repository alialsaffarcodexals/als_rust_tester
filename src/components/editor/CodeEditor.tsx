import React, { useRef, useState, useEffect, useCallback } from 'react';
import Editor, { type OnMount, type Monaco } from '@monaco-editor/react';
import {
  RUST_REFERENCE_ENTRIES,
  lookupRustToken,
  renderHoverMarkdown,
  type RustTokenKind,
} from '../../data/rustReference';

// Language providers are global to the Monaco 'rust' language, so they must be
// registered exactly once — not on every editor mount (which would stack
// duplicate hovers/completions).
let rustIntelliSenseRegistered = false;

function completionKind(monaco: Monaco, kind: RustTokenKind) {
  const K = monaco.languages.CompletionItemKind;
  switch (kind) {
    case 'keyword': return K.Keyword;
    case 'primitive': return K.Struct;
    case 'type': return K.Class;
    case 'variant': return K.EnumMember;
    case 'macro': return K.Function;
    case 'method': return K.Method;
    case 'function': return K.Function;
    case 'trait': return K.Interface;
    case 'concept': return K.Interface;
    default: return K.Text;
  }
}

function registerRustIntelliSense(monaco: Monaco) {
  // Hover: explanation + usage example + documentation link for built-ins.
  monaco.languages.registerHoverProvider('rust', {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const line = model.getLineContent(position.lineNumber);
      const followedByBang = line.charAt(word.endColumn - 1) === '!';
      const entry = lookupRustToken(word.word, followedByBang);
      if (!entry) return null;
      const endColumn = followedByBang ? word.endColumn + 1 : word.endColumn;
      return {
        range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, endColumn),
        contents: [{ value: renderHoverMarkdown(entry), isTrusted: true }],
      };
    },
  });

  // Autocompletion: curated snippets + every reference entry.
  monaco.languages.registerCompletionItemProvider('rust', {
    triggerCharacters: ['.', ':', '!'],
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const snippetRule = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      const snippets = [
        { label: 'fn', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'fn ${1:function_name}(${2:params}) -> ${3:ReturnType} {\n\t${4:todo!()}\n}', insertTextRules: snippetRule, documentation: 'Define a function', range },
        { label: 'pub fn', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'pub fn ${1:function_name}(${2:params}) -> ${3:ReturnType} {\n\t${4:todo!()}\n}', insertTextRules: snippetRule, documentation: 'Define a public function', range },
        { label: 'println!', kind: monaco.languages.CompletionItemKind.Function, insertText: 'println!("${1:}")${0}', insertTextRules: snippetRule, documentation: 'Print to stdout with newline', range },
        { label: 'vec!', kind: monaco.languages.CompletionItemKind.Function, insertText: 'vec![${1}]', insertTextRules: snippetRule, documentation: 'Create a Vec', range },
        { label: 'match', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'match ${1:value} {\n\t${2:pattern} => ${3:result},\n\t_ => ${4:default},\n}', insertTextRules: snippetRule, documentation: 'Pattern matching', range },
        { label: 'impl', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'impl ${1:TypeName} {\n\t${0}\n}', insertTextRules: snippetRule, documentation: 'Implement methods for a type', range },
        { label: 'struct', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'struct ${1:Name} {\n\t${2:field}: ${3:Type},\n}', insertTextRules: snippetRule, documentation: 'Define a struct', range },
        { label: 'enum', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'enum ${1:Name} {\n\t${2:Variant},\n}', insertTextRules: snippetRule, documentation: 'Define an enum', range },
        { label: 'if let', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if let ${1:Some(val)} = ${2:expr} {\n\t${0}\n}', insertTextRules: snippetRule, documentation: 'Pattern match with if let', range },
        { label: 'HashMap::new', kind: monaco.languages.CompletionItemKind.Function, insertText: 'use std::collections::HashMap;\nlet mut ${1:map}: HashMap<${2:K}, ${3:V}> = HashMap::new();', insertTextRules: snippetRule, documentation: 'Create a new HashMap', range },
      ];
      const snippetLabels = new Set(snippets.map((s) => s.label));
      const fromReference = RUST_REFERENCE_ENTRIES
        .filter((e) => !snippetLabels.has(e.name))
        .map((e) => ({
          label: e.name,
          kind: completionKind(monaco, e.kind),
          insertText: e.name,
          detail: e.signature ?? e.kind,
          documentation: {
            value: `${e.summary}${e.example ? '\n\n```rust\n' + e.example + '\n```' : ''}\n\n[📖 docs](${e.docUrl})`,
          },
          range,
        }));
      return { suggestions: [...snippets, ...fromReference] };
    },
  });
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
  language?: string;
}

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  height = '400px',
  language = 'rust',
}: CodeEditorProps) {
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const exitFullscreen = useCallback(() => setIsFullscreen(false), []);

  // Escape key exits fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') exitFullscreen(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFullscreen, exitFullscreen]);

  // Tell Monaco to re-layout after fullscreen toggle (size changed)
  useEffect(() => {
    editorRef.current?.layout();
  }, [isFullscreen]);

  const handleMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;

    monaco.editor.defineTheme('rustpath-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'f97316', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: 'f97316', fontStyle: 'bold' },
        { token: 'keyword.other', foreground: 'f97316' },
        { token: 'string', foreground: '4ade80' },
        { token: 'string.escape', foreground: '2dd4bf' },
        { token: 'number', foreground: 'facc15' },
        { token: 'comment', foreground: '4b5563', fontStyle: 'italic' },
        { token: 'type', foreground: 'a78bfa' },
        { token: 'entity.name.function', foreground: '60a5fa' },
        { token: 'entity.name.type', foreground: 'a78bfa' },
        { token: 'variable', foreground: 'f1f5f9' },
        { token: 'delimiter', foreground: '64748b' },
        { token: 'operator', foreground: 'f97316' },
        { token: 'support.function', foreground: '2dd4bf' },
        { token: 'macro', foreground: '2dd4bf' },
      ],
      colors: {
        'editor.background': '#0d0d14',
        'editor.foreground': '#f1f5f9',
        'editor.lineHighlightBackground': '#13131f',
        'editor.selectionBackground': '#2d2d52',
        'editor.inactiveSelectionBackground': '#1f1f35',
        'editorLineNumber.foreground': '#374151',
        'editorLineNumber.activeForeground': '#64748b',
        'editorIndentGuide.background': '#1e1e35',
        'editorIndentGuide.activeBackground': '#2a2a48',
        'editorCursor.foreground': '#f97316',
        'editor.wordHighlightBackground': '#2d2d52',
        'editorGutter.background': '#0d0d14',
        'editorWidget.background': '#13131f',
        'editorWidget.border': '#2a2a48',
        'input.background': '#1a1a2e',
        'input.foreground': '#f1f5f9',
        'scrollbarSlider.background': '#2a2a4880',
        'scrollbarSlider.hoverBackground': '#3a3a6080',
        'scrollbarSlider.activeBackground': '#4a4a8080',
      },
    });
    monaco.editor.setTheme('rustpath-dark');

    if (!rustIntelliSenseRegistered) {
      rustIntelliSenseRegistered = true;
      registerRustIntelliSense(monaco);
    }

    // Ctrl/Cmd + click a built-in token to open its official documentation.
    editor.onMouseDown((e) => {
      const ev = e.event;
      if (!(ev.ctrlKey || ev.metaKey)) return;
      const position = e.target.position;
      const model = editor.getModel();
      if (!position || !model) return;
      const w = model.getWordAtPosition(position);
      if (!w) return;
      const followedByBang = model.getLineContent(position.lineNumber).charAt(w.endColumn - 1) === '!';
      const entry = lookupRustToken(w.word, followedByBang);
      if (entry) {
        ev.preventDefault();
        ev.stopPropagation();
        window.open(entry.docUrl, '_blank', 'noopener,noreferrer');
      }
    });

    editor.focus();
  };

  const FullscreenIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ExitFullscreenIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 1v4H1M13 5H9V1M9 13v-4h4M1 9h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const editorEl = (
    <div className={`code-editor-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Fullscreen toggle button */}
      <button
        className="editor-fs-btn"
        onClick={() => setIsFullscreen((v) => !v)}
        title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
      >
        {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      </button>

      <Editor
        height={isFullscreen ? '100%' : height}
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        onMount={handleMount}
        theme="rustpath-dark"
        options={{
          readOnly,
          fontSize: 14,
          fontFamily: 'Cascadia Code, Fira Code, JetBrains Mono, Consolas, monospace',
          fontLigatures: true,
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
          suggest: { showWords: false },
          renderLineHighlight: 'line',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          padding: { top: 12, bottom: 12 },
          roundedSelection: true,
          formatOnPaste: true,
          formatOnType: false,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
          overviewRulerLanes: 0,
        }}
        loading={
          <div className="editor-loading">
            <div className="spinner" />
            <span>Loading editor...</span>
          </div>
        }
      />

      <style>{`
        .code-editor-wrapper {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-normal);
          /* Resize handle */
          resize: vertical;
          min-height: 120px;
        }
        .code-editor-wrapper.fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          border-radius: 0;
          border: none;
          resize: none;
        }
        /* Backdrop behind fullscreen editor */
        .code-editor-wrapper.fullscreen::before {
          content: '';
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: -1;
        }
        .editor-fs-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 10;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(13, 13, 20, 0.75);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.15s, color 0.15s, background 0.15s;
          backdrop-filter: blur(4px);
        }
        .code-editor-wrapper:hover .editor-fs-btn,
        .code-editor-wrapper.fullscreen .editor-fs-btn {
          opacity: 1;
        }
        .editor-fs-btn:hover {
          color: var(--text-primary);
          background: rgba(30, 30, 50, 0.95);
          border-color: var(--rust);
        }
        .editor-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          height: 200px;
          background: var(--bg-elevated);
          color: var(--text-muted);
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );

  return editorEl;
}
