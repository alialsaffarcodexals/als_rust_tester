"""
Parse all Zone01 checkpoint exercises and emit src/data/zone01.ts.
Each exercise folder has README.md + src/main.rs.
"""
import pathlib, re, sys, json
sys.stdout.reconfigure(encoding='utf-8')

SRC = pathlib.Path(r"C:\Users\alooo\Downloads\rust_checkpoints-main\rust_checkpoints-main")
OUT = pathlib.Path(r"C:\Users\alooo\Desktop\ALS_Rutst tester\src\data\zone01.ts")

# Level table from root README — exercise_slug -> (checkpoint, level)
LEVEL_TABLE = {
    # checkpoint01
    'min_and_max':            ('zone01_cp1', 1),
    'matrix_multiplication':  ('zone01_cp1', 1),
    'reverse_it':             ('zone01_cp1', 2),
    'smallest':               ('zone01_cp1', 2),
    'counting_words':         ('zone01_cp1', 3),
    'partial_sums':           ('zone01_cp1', 3),
    'inv_pyramid':            ('zone01_cp1', 3),
    'insertion_sort':         ('zone01_cp1', 4),
    'rpn':                    ('zone01_cp1', 4),
    # checkpoint02
    'previousprime':          ('zone01_cp2', 1),
    'nextprime':              ('zone01_cp2', 1),
    'reverse_it_cp2':         ('zone01_cp2', 1),
    'count_factorial_steps':  ('zone01_cp2', 2),
    'lucas_number':           ('zone01_cp2', 2),
    'own_and_return':         ('zone01_cp2', 2),
    'matrix_determinant':     ('zone01_cp2', 2),
    'check_user_name':        ('zone01_cp2', 3),
    'get_document_id':        ('zone01_cp2', 3),
    'dress_code':             ('zone01_cp2', 3),
    'rot21':                  ('zone01_cp2', 4),
    'order_books':            ('zone01_cp2', 4),
    'prime_checker':          ('zone01_cp2', 4),
    'queens':                 ('zone01_cp2', 4),
    'scytale_decoder':        ('zone01_cp2', 4),
    # checkpoint03
    'car_rental':             ('zone01_cp3', 6),
    'drop_the_blog':          ('zone01_cp3', 6),
    'lunch_queue':            ('zone01_cp3', 6),
    'moving_targets':         ('zone01_cp3', 5),
    'format_me':              ('zone01_cp3', 5),
    'blood_types_s':          ('zone01_cp3', 5),
    'office_worker':          ('zone01_cp3', 4),
    'matrix_display':         ('zone01_cp3', 4),
    'organize_garage':        ('zone01_cp3', 4),
    'negative_spelling':      ('zone01_cp3', 3),
    'rpn_cp3':                ('zone01_cp3', 3),
    'queens_cp3':             ('zone01_cp3', 3),
    'scytale_decoder_cp3':    ('zone01_cp3', 3),
    'check_user_name_cp3':    ('zone01_cp3', 2),
    'get_document_id_cp3':    ('zone01_cp3', 2),
    'dress_code_cp3':         ('zone01_cp3', 2),
    'counting_words_cp3':     ('zone01_cp3', 1),
    'partial_sums_cp3':       ('zone01_cp3', 1),
    'inv_pyramid_cp3':        ('zone01_cp3', 1),
    'previousprime_cp3':      ('zone01_cp3', 1),
    'nextprime_cp3':          ('zone01_cp3', 1),
    'reverse_it_cp3':         ('zone01_cp3', 1),
    # checkpoint04 (final)
    'brackets_matching':      ('zone01_final', 9),
    'brain_fuck':             ('zone01_final', 9),
    'flat_tree':              ('zone01_final', 8),
    'drop_the_blog_f':        ('zone01_final', 7),
    'filter_table':           ('zone01_final', 7),
    'display_table':          ('zone01_final', 7),
    'matrix_display_f':       ('zone01_final', 6),
    'queens_f':               ('zone01_final', 6),
    'office_worker_f':        ('zone01_final', 5),
    'blood_types_s_f':        ('zone01_final', 5),
    'insertion_sort_f':       ('zone01_final', 4),
    'rpn_f':                  ('zone01_final', 4),
    'rot21_f':                ('zone01_final', 4),
    'order_books_f':          ('zone01_final', 4),
    'matrix_determinant_f':   ('zone01_final', 4),
    'partial_sums_f':         ('zone01_final', 3),
    'inv_pyramid_f':          ('zone01_final', 3),
    'previousprime_f':        ('zone01_final', 3),
    'nextprime_f':            ('zone01_final', 3),
    'profanity_filter':       ('zone01_final', 3),
    'prime_checker_f':        ('zone01_final', 3),
    'scytale_decoder_f':      ('zone01_final', 3),
    'reverse_it_f':           ('zone01_final', 2),
    'counting_words_f':       ('zone01_final', 2),
    'smallest_f':             ('zone01_final', 2),
    'modify_letter':          ('zone01_final', 2),
    'min_and_max_f':          ('zone01_final', 1),
    'count_factorial_steps_f':('zone01_final', 1),
    'matrix_multiplication_f':('zone01_final', 1),
}

DIFF_MAP = {1: 'easiest', 2: 'easy', 3: 'medium', 4: 'hard', 5: 'hard', 6: 'hardest', 7: 'hardest', 8: 'hardest', 9: 'hardest'}
CP_ORDER  = ['zone01_cp1', 'zone01_cp2', 'zone01_cp3', 'zone01_final']

def prettify(slug: str) -> str:
    return slug.replace('_', ' ').title()

def extract_section(text: str, heading: str) -> str:
    """Extract content between a ### heading and the next ###"""
    pattern = rf'###\s+{re.escape(heading)}\s*\n(.*?)(?=\n###|\Z)'
    m = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
    return m.group(1).strip() if m else ''

def extract_code_block(text: str, lang: str = '') -> str:
    """Extract first code block of the given language."""
    pattern = rf'```{lang}(.*?)```'
    m = re.search(pattern, text, re.DOTALL)
    return m.group(1).strip() if m else ''

def extract_console_output(text: str) -> str:
    """Extract expected output from a console block (lines after '$ cargo run')."""
    m = re.search(r'```console(.*?)```', text, re.DOTALL)
    if not m:
        return ''
    console = m.group(1)
    lines = console.strip().splitlines()
    out_lines = []
    recording = False
    for line in lines:
        if line.strip().startswith('$ cargo run') or line.strip().startswith('$ '):
            recording = True
            continue
        if recording and line.strip() == '$':
            break
        if recording:
            out_lines.append(line)
    return '\n'.join(out_lines).strip()

def extract_function_sigs(text: str) -> 'list[str]':
    """Extract lines that look like function/struct/enum signatures from README code blocks."""
    sigs = []
    # Find all rust code blocks
    for m in re.finditer(r'```rust(.*?)```', text, re.DOTALL):
        block = m.group(1).strip()
        # Skip usage examples (they have fn main)
        if 'fn main()' in block:
            continue
        if block:
            sigs.append(block)
    return sigs

def extract_hints(text: str) -> list[str]:
    """Extract hint text from Notions section."""
    notions = extract_section(text, 'Notions')
    if not notions:
        return []
    hints = []
    for line in notions.splitlines():
        line = line.strip()
        # Extract link text from markdown links
        m = re.search(r'\[([^\]]+)\]\(([^)]+)\)', line)
        if m:
            hints.append(f'{m.group(1)} — {m.group(2)}')
        elif line.startswith('-') and line[1:].strip():
            hints.append(line[1:].strip())
    return [h for h in hints if h]

def js_str(s: str) -> str:
    """Escape a string for a JS template literal."""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

def parse_exercise(folder: pathlib.Path, cp_key: str, level: int, ex_id: int):
    readme_path = folder / 'README.md'
    main_path   = folder / 'src' / 'main.rs'
    if not readme_path.exists():
        return None

    readme = readme_path.read_text(encoding='utf-8', errors='replace')
    main_rs = main_path.read_text(encoding='utf-8', errors='replace') if main_path.exists() else ''

    slug  = folder.name
    title = prettify(slug)

    # Instructions = everything between ### Instructions and the next ###
    instructions = extract_section(readme, 'Instructions')
    if not instructions:
        # fallback: everything after the title heading
        instructions = re.sub(r'^##[^#].*\n', '', readme, count=1).strip()

    # Function signatures
    sigs = extract_function_sigs(readme)
    starter = sigs[0] if sigs else f'pub fn {slug}() {{\n    todo!()\n}}'

    # Test case: use main.rs content, strip the `use slug::*;` import
    test_code = main_rs
    test_code = re.sub(r'use\s+\S+::[\*\w]+;\s*\n?', '', test_code).strip()

    # Expected output from console block
    expected = extract_console_output(readme)

    # Hints from Notions
    hints = extract_hints(readme)

    diff = DIFF_MAP.get(level, 'medium')

    return {
        'id': ex_id,
        'slug': slug,
        'title': title,
        'checkpoint': cp_key,
        'difficulty': diff,
        'order': level,
        'instructions': instructions,
        'starter': starter,
        'test_code': test_code,
        'expected': expected,
        'hints': hints,
    }

# Collect checkpoint folder → cp_key mapping
CP_FOLDER_MAP = {
    'checkpoint01': 'zone01_cp1',
    'checkpoint02': 'zone01_cp2',
    'checkpoint03': 'zone01_cp3',
    'checkpoint04': 'zone01_final',
}

# Build a simple level lookup: (cp_folder, exercise_slug) -> level
# We'll determine level by scanning LEVEL_TABLE for the base slug
def get_level(cp_key: str, slug: str) -> int:
    # try exact match, then try with suffix stripped
    for k, (cp, lvl) in LEVEL_TABLE.items():
        base = k.rstrip('_f').rstrip('_cp2').rstrip('_cp3').rstrip('_f')
        if cp == cp_key and (k == slug or base == slug or k.startswith(slug)):
            return lvl
    # default by checkpoint
    defaults = {'zone01_cp1': 2, 'zone01_cp2': 2, 'zone01_cp3': 3, 'zone01_final': 4}
    return defaults.get(cp_key, 2)

exercises = []
ex_id = 64

for cp_folder_name, cp_key in CP_FOLDER_MAP.items():
    cp_folder = SRC / cp_folder_name
    if not cp_folder.exists():
        continue
    # Sort subdirs alphabetically for consistent ordering
    subdirs = sorted([d for d in cp_folder.iterdir() if d.is_dir()])
    # Sort by level within checkpoint
    def sort_key(d):
        return get_level(cp_key, d.name)
    subdirs.sort(key=sort_key)

    for ex_dir in subdirs:
        level = get_level(cp_key, ex_dir.name)
        ex = parse_exercise(ex_dir, cp_key, level, ex_id)
        if ex:
            exercises.append(ex)
            ex_id += 1

print(f'Parsed {len(exercises)} exercises (ids {exercises[0]["id"]}–{exercises[-1]["id"]})')

# ── Emit TypeScript ────────────────────────────────────────────────────────────
lines = []
lines.append("import type { Exercise } from '../types';")
lines.append("")
lines.append("export const zone01Exercises: Exercise[] = [")

for ex in exercises:
    instr  = js_str(ex['instructions'])
    start  = js_str(ex['starter'])
    tcode  = js_str(ex['test_code'])
    exp    = js_str(ex['expected'])
    hints_ts = ', '.join(f'`{js_str(h)}`' for h in ex['hints'])

    # Build test case only if we have both code and expected output
    if ex['test_code'].strip() and ex['expected'].strip():
        test_cases = f"""[{{
      id: 'tc_{ex["id"]}_1',
      description: 'Usage example',
      code: `{tcode}`,
      expectedOutput: `{exp}`,
      hidden: false,
    }}]"""
    else:
        test_cases = '[]'

    lines.append(f"""  {{
    id: {ex['id']},
    slug: '{ex['slug']}',
    title: '{ex['title']}',
    checkpoint: '{ex['checkpoint']}',
    difficulty: '{ex['difficulty']}',
    order: {ex['order']},
    concept: `{instr}`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `{instr}`,
    functionSignatures: [`{start}`],
    constraints: [],
    starterCode: `{start}`,
    solution: '',
    testCases: {test_cases},
    hints: [{hints_ts}],
  }},""")

lines.append("];")
lines.append("")

OUT.write_text('\n'.join(lines), encoding='utf-8')
print(f'Written to {OUT}')
print(f'Lines: {len(lines)}')
