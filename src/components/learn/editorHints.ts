// Seed progressive guidance comments into an exercise's starter code so the
// student sees non-spoiler hints right inside the editor. Hints are inserted
// just after the first opening brace (the function body). Used only on first
// load (no saved draft), so it never overwrites the student's work.

export function seedHints(starter: string, hints: string[]): string {
  if (!hints || hints.length === 0) return starter;

  const block = hints.map((h) => `    // Hint: ${h}`).join('\n');
  const brace = starter.indexOf('{');

  // No function body found — just prepend the hints as a comment block.
  if (brace === -1) return `${block}\n${starter}`;

  const newlineAfterBrace = starter.indexOf('\n', brace);
  if (newlineAfterBrace === -1) return `${starter}\n${block}`;

  return (
    starter.slice(0, newlineAfterBrace + 1) +
    block +
    '\n' +
    starter.slice(newlineAfterBrace + 1)
  );
}
