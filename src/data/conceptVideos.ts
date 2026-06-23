import type { LearningVideo } from '../types';

// ===========================================================================
// Concept -> short learning videos. The Videos journey section (Zone01 Final)
// resolves an exercise's conceptIds against this map, so videos are reused
// across exercises and always match the concepts being practiced.
//
// Selection rules: concept-focused, short (ideally 5-20 min, up to ~30 if
// especially valuable). No full courses or multi-hour tutorials. Durations are
// approximate ("~N min"). URLs are the curated, known-good set already used
// elsewhere in the app.
// ===========================================================================

const LGR = "Let's Get Rusty";

export const conceptVideos: Record<string, LearningVideo[]> = {
  ownership: [
    { title: 'Understanding Ownership in Rust', channel: LGR, url: 'https://www.youtube.com/watch?v=VFIOSWy93H0', duration: '~16 min', concept: 'Ownership', why: 'Ownership and moves underpin how values are passed and returned here.' },
  ],
  borrowing: [
    { title: 'References and Borrowing', channel: LGR, url: 'https://www.youtube.com/watch?v=DiwD_9B-k5w', duration: '~10 min', concept: 'Borrowing', why: 'Borrowing with & lets functions use data without taking ownership of it.' },
  ],
  references: [
    { title: 'References and Borrowing', channel: LGR, url: 'https://www.youtube.com/watch?v=DiwD_9B-k5w', duration: '~10 min', concept: 'References & Slices', why: 'This exercise passes data by reference / slice instead of by value.' },
  ],
  lifetimes: [
    { title: 'References and Borrowing', channel: LGR, url: 'https://www.youtube.com/watch?v=DiwD_9B-k5w', duration: '~10 min', concept: 'Lifetimes', why: 'Lifetimes build directly on borrowing — start here before the annotations.' },
  ],
  option: [
    { title: 'Option Type — no NULL!', channel: 'Rust Fundamentals', url: 'https://www.youtube.com/watch?v=jecoX-bp5c4', duration: '~9 min', concept: 'Option<T>', why: 'The exercise returns/handles values that may be absent via Option.' },
  ],
  result: [
    { title: "Understand Rust's Result Type", channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=s7z_sdPBwFg', duration: '~11 min', concept: 'Result<T, E>', why: 'Fallible operations here return Result — Ok on success, Err on failure.' },
    { title: 'Error Handling Made Easy with the ? Operator', channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=Z6wxawIPUaw', duration: '~6 min', concept: 'The ? operator', why: '? propagates errors concisely — handy when chaining fallible steps.' },
  ],
  error_handling: [
    { title: 'Error Handling in Rust', channel: LGR, url: 'https://www.youtube.com/watch?v=wM6o70NAWUI', duration: '~13 min', concept: 'Error Handling', why: 'Covers returning errors as values and validating inputs, as this exercise does.' },
  ],
  iterators: [
    { title: 'Iterators in Rust', channel: LGR, url: 'https://www.youtube.com/watch?v=4GcKrj4By8k', duration: '~12 min', concept: 'Iterators', why: 'map / filter / collect chains are the cleanest way to transform the data here.' },
  ],
  closures: [
    { title: 'Closures in Rust', channel: LGR, url: 'https://www.youtube.com/watch?v=kZXJvLfjUS4', duration: '~10 min', concept: 'Closures', why: 'Closures are passed to iterator adapters and comparators in this exercise.' },
  ],
  traits: [
    { title: 'Traits in Rust', channel: 'Tensor Programming', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A', duration: '~13 min', concept: 'Traits', why: 'You implement a trait (e.g. From / Display) to give your type behavior.' },
  ],
  display_trait: [
    { title: 'Traits in Rust', channel: 'Tensor Programming', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A', duration: '~13 min', concept: 'Display & Formatting', why: 'Display is a trait; this shows how trait methods like fmt are implemented.' },
  ],
  enums: [
    { title: 'Enums and Pattern Matching', channel: LGR, url: 'https://www.youtube.com/watch?v=DSZqIJhkNCM', duration: '~14 min', concept: 'Enums', why: 'The exercise models its cases with an enum and matches on the variants.' },
  ],
  pattern_matching: [
    { title: 'Enums and Pattern Matching', channel: LGR, url: 'https://www.youtube.com/watch?v=DSZqIJhkNCM', duration: '~14 min', concept: 'Pattern Matching', why: 'match drives the branching logic in this exercise.' },
  ],
  structs: [
    { title: 'Structs in Rust', channel: LGR, url: 'https://www.youtube.com/watch?v=n3bPhdiJm9I', duration: '~12 min', concept: 'Structs', why: 'You define a struct and implement methods on it here.' },
  ],
  generics: [
    { title: 'Generic Types in Rust', channel: LGR, url: 'https://www.youtube.com/watch?v=6rcTSxPJ6Bw', duration: '~11 min', concept: 'Generics', why: 'This exercise is generic over a type parameter with trait bounds.' },
  ],
  collections: [
    { title: 'Vectors and Hash Maps', channel: LGR, url: 'https://www.youtube.com/watch?v=ic9WEuto-gE', duration: '~15 min', concept: 'Collections (Vec & HashMap)', why: 'Vec/HashMap are the data structures you build up in this exercise.' },
  ],
  vecdeque: [
    { title: 'Vectors and Hash Maps', channel: LGR, url: 'https://www.youtube.com/watch?v=ic9WEuto-gE', duration: '~15 min', concept: 'Queues & Collections', why: 'Grounds the collection thinking behind this queue/list exercise.' },
  ],
  cli_args: [
    { title: 'Build a Rust CLI — Command Line Arguments', channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=_T4sE6NEcV0', duration: '~12 min', concept: 'Command-Line Arguments', why: 'This is a CLI program that reads its input from std::env::args().' },
  ],
  matrices: [
    { title: 'Arrays in Rust', channel: 'dcode', url: 'https://www.youtube.com/watch?v=cH6Qv47MPwk', duration: '~8 min', concept: 'Arrays & Grids', why: 'Matrices are nested arrays/Vecs indexed by row and column.' },
  ],
  sorting: [
    { title: 'Closures in Rust', channel: LGR, url: 'https://www.youtube.com/watch?v=kZXJvLfjUS4', duration: '~10 min', concept: 'Sorting with comparators', why: 'sort_by takes a comparator closure — the key skill for ordering here.' },
  ],
  parsing: [
    { title: 'Strings in Rust', channel: 'dcode', url: 'https://www.youtube.com/watch?v=ABYdoxzNJJ8', duration: '~10 min', concept: 'String & char scanning', why: 'Parsing means scanning characters/tokens and reacting to each one.' },
  ],
};

// Resolve the videos relevant to a set of concept ids, de-duplicated by URL and
// keeping the order of the concepts.
export function videosForConcepts(conceptIds: string[]): LearningVideo[] {
  const seen = new Set<string>();
  const out: LearningVideo[] = [];
  for (const id of conceptIds) {
    for (const v of conceptVideos[id] ?? []) {
      if (!seen.has(v.url)) {
        seen.add(v.url);
        out.push(v);
      }
    }
  }
  return out;
}
