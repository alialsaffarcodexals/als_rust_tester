import React, { useRef } from 'react';
import Editor, { type OnMount, type Monaco } from '@monaco-editor/react';

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

  const handleMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;

    // Custom Rust theme
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

    // Register Rust language snippets
    monaco.languages.registerCompletionItemProvider('rust', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [
          {
            label: 'fn',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'fn ${1:function_name}(${2:params}) -> ${3:ReturnType} {\n\t${4:todo!()}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a function',
            range,
          },
          {
            label: 'pub fn',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'pub fn ${1:function_name}(${2:params}) -> ${3:ReturnType} {\n\t${4:todo!()}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a public function',
            range,
          },
          {
            label: 'println!',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'println!("${1:}")${0}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Print to stdout with newline',
            range,
          },
          {
            label: 'vec!',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vec![${1}]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a Vec',
            range,
          },
          {
            label: 'match',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'match ${1:value} {\n\t${2:pattern} => ${3:result},\n\t_ => ${4:default},\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Pattern matching',
            range,
          },
          {
            label: 'impl',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'impl ${1:TypeName} {\n\t${0}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Implement methods for a type',
            range,
          },
          {
            label: 'struct',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'struct ${1:Name} {\n\t${2:field}: ${3:Type},\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a struct',
            range,
          },
          {
            label: 'enum',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'enum ${1:Name} {\n\t${2:Variant},\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define an enum',
            range,
          },
          {
            label: 'if let',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'if let ${1:Some(val)} = ${2:expr} {\n\t${0}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Pattern match with if let',
            range,
          },
          {
            label: 'HashMap::new',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'use std::collections::HashMap;\nlet mut ${1:map}: HashMap<${2:K}, ${3:V}> = HashMap::new();',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a new HashMap',
            range,
          },
        ];
        return { suggestions };
      },
    });

    // Focus editor
    editor.focus();
  };

  return (
    <div className="code-editor-wrapper">
      <Editor
        height={height}
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
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-normal);
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
}
