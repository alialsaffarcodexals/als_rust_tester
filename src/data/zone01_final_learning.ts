import type { Cp3LearningContent } from '../types';
import { zone01Cp3Learning } from './zone01_cp3_learning';

// ===========================================================================
// Zone01 Final guided-learning content, keyed by exercise slug.
//
// 14 Final slugs are shared with CP3 — they reuse the CP3 journey by spreading
// the CP3 entry and adding a Documentation section + editor hints.
// 16 Final-only slugs (added in a later step) get full original content.
//
// Authoring notes match zone01_cp3_learning.ts (officialDescription uses ~~~
// fences; sideQuiz blanks default to '_____'; documentation lists APIs + links
// (+ optional videos); editorHints are non-spoiler progressive comments seeded
// into the editor).
// ===========================================================================

export const zone01FinalLearning: Record<string, Cp3LearningContent> = {
  // -------------------------------------------------------------------------
  // Shared with CP3 — reuse the full journey, add Documentation + editor hints.
  // -------------------------------------------------------------------------
  counting_words: {
    ...zone01Cp3Learning.counting_words,
    documentation: {
      apis: [
        { name: 'str::split', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.split', note: 'split on a char or a predicate closure' },
        { name: 'char::is_alphanumeric', url: 'https://doc.rust-lang.org/std/primitive.char.html#method.is_alphanumeric', note: 'keep letters/digits, drop punctuation' },
        { name: 'str::to_lowercase', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.to_lowercase', note: 'case-insensitive keys' },
        { name: 'HashMap::entry', url: 'https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry', note: 'insert-or-update a counter' },
      ],
      links: [
        { title: 'Rust By Example — HashMap', url: 'https://doc.rust-lang.org/rust-by-example/std/hash.html' },
        { title: 'The Book — Storing keys with associated values', url: 'https://doc.rust-lang.org/book/ch08-03-hash-maps.html' },
      ],
      videos: [{ title: 'Vectors and Hash Maps', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=ic9WEuto-gE' }],
    },
    editorHints: [
      'Split on every character that is NOT a letter/digit, but keep the apostrophe in words like "it\'s".',
      'Skip empty pieces that appear between consecutive separators.',
      'Lowercase each word before counting, and use entry(word).or_insert(0).',
    ],
  },

  reverse_it: {
    ...zone01Cp3Learning.reverse_it,
    documentation: {
      apis: [
        { name: 'i32::abs', url: 'https://doc.rust-lang.org/std/primitive.i32.html#method.abs', note: 'work on the magnitude' },
        { name: 'str::chars', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars', note: 'iterate characters' },
        { name: 'Iterator::rev', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.rev', note: 'reverse the order' },
        { name: 'Iterator::collect', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect', note: 'rebuild a String' },
      ],
      links: [
        { title: 'Rust By Example — Iterators', url: 'https://doc.rust-lang.org/rust-by-example/trait/iter.html' },
        { title: 'format! macro', url: 'https://doc.rust-lang.org/std/macro.format.html' },
      ],
      videos: [{ title: 'Iterators in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=4GcKrj4By8k' }],
    },
    editorHints: [
      'Take the absolute value first so the minus sign does not get reversed.',
      'Reverse the digit characters with chars().rev().collect().',
      'Assemble sign + reversed digits + original number with format!.',
    ],
  },

  inv_pyramid: {
    ...zone01Cp3Learning.inv_pyramid,
    documentation: {
      apis: [
        { name: 'str::repeat', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.repeat', note: 'k copies of a string' },
        { name: 'Range / RangeInclusive', url: 'https://doc.rust-lang.org/std/ops/struct.RangeInclusive.html', note: '1..=i ascending levels' },
        { name: 'Iterator::rev', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.rev', note: '(1..i).rev() for the descending half' },
        { name: 'Vec::push', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.push', note: 'collect each line' },
      ],
      links: [
        { title: 'format! macro', url: 'https://doc.rust-lang.org/std/macro.format.html' },
        { title: 'The Book — Control flow (loops)', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html' },
      ],
    },
    editorHints: [
      'At level k, the line is k spaces followed by the string repeated k times.',
      'Build the ascending half with 1..=i, then mirror it with (1..i).rev().',
      'Push each formatted line into the result Vec and return it.',
    ],
  },

  nextprime: {
    ...zone01Cp3Learning.nextprime,
    documentation: {
      apis: [
        { name: 'Rem (%) operator', url: 'https://doc.rust-lang.org/std/ops/trait.Rem.html', note: 'test divisibility with n % i == 0' },
        { name: 'while loops', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html#looping-through-a-collection-with-for', note: 'search loop' },
      ],
      links: [
        { title: 'The Book — Functions', url: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html' },
        { title: 'Rust By Example — Primitives', url: 'https://doc.rust-lang.org/rust-by-example/primitives.html' },
      ],
    },
    editorHints: [
      'Write a small is_prime helper: reject n < 2, then test divisors.',
      'Only check divisors up to the square root: while i * i <= n.',
      'From nbr, step upward until is_prime returns true.',
    ],
  },

  partial_sums: {
    ...zone01Cp3Learning.partial_sums,
    documentation: {
      apis: [
        { name: 'slice indexing v[..k]', url: 'https://doc.rust-lang.org/std/primitive.slice.html', note: 'prefix sub-slice' },
        { name: 'Iterator::sum', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.sum', note: 'total a slice' },
        { name: 'Vec::with_capacity', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.with_capacity', note: 'pre-allocate len+1' },
      ],
      links: [
        { title: 'Rust By Example — Slices', url: 'https://doc.rust-lang.org/rust-by-example/primitives/array.html' },
        { title: 'The Book — Vectors', url: 'https://doc.rust-lang.org/book/ch08-01-vectors.html' },
      ],
    },
    editorHints: [
      'There are len+1 results, ending with a trailing 0.',
      'For each prefix size k, sum v[..k] with .iter().sum().',
      'Iterate k from len down to 0 (use (0..=v.len()).rev()).',
    ],
  },

  previousprime: {
    ...zone01Cp3Learning.previousprime,
    documentation: {
      apis: [
        { name: 'Rem (%) operator', url: 'https://doc.rust-lang.org/std/ops/trait.Rem.html', note: 'divisibility test' },
        { name: 'u64', url: 'https://doc.rust-lang.org/std/primitive.u64.html', note: 'beware unsigned underflow' },
      ],
      links: [
        { title: 'The Book — Functions', url: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html' },
        { title: 'Integer overflow', url: 'https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-overflow' },
      ],
    },
    editorHints: [
      'Reuse the same is_prime helper (square-root bound).',
      'Search downward from nbr instead of upward.',
      'Guard against u64 underflow: stop before subtracting from 0.',
    ],
  },

  scytale_decoder: {
    ...zone01Cp3Learning.scytale_decoder,
    documentation: {
      apis: [
        { name: 'str::chars / count', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars', note: 'count characters, not bytes' },
        { name: 'Iterator::collect (Vec<char>)', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect', note: 'index the grid' },
        { name: 'Option', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'None for invalid input' },
      ],
      links: [
        { title: 'Rust By Example — Option', url: 'https://doc.rust-lang.org/rust-by-example/std/option.html' },
        { title: 'The Book — Strings', url: 'https://doc.rust-lang.org/book/ch08-02-strings.html' },
      ],
    },
    editorHints: [
      'Return None for empty input, zero columns, or a length not divisible by the column count.',
      'Collect chars into a Vec so you can index the grid by (row, col).',
      'Decode by reading the grid column by column: index = row * cols + col.',
    ],
  },

  rpn: {
    ...zone01Cp3Learning.rpn,
    documentation: {
      apis: [
        { name: 'std::env::args', url: 'https://doc.rust-lang.org/std/env/fn.args.html', note: 'read the command-line argument' },
        { name: 'str::split_whitespace', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.split_whitespace', note: 'ignore extra spaces' },
        { name: 'str::parse', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.parse', note: 'parse operands to i64' },
        { name: 'Vec (as a stack)', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.pop', note: 'push/pop operands' },
      ],
      links: [
        { title: 'The Book — Accepting command line arguments', url: 'https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html' },
        { title: 'Reverse Polish notation', url: 'https://en.wikipedia.org/wiki/Reverse_Polish_notation' },
      ],
      videos: [{ title: 'Build a Rust CLI — Command Line Arguments', channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=_T4sE6NEcV0' }],
    },
    editorHints: [
      'Use a Vec<i64> as a stack: push numbers, pop two for each operator.',
      'Handle all five operators +, -, *, /, % (modulo is easy to forget).',
      'Print "Error" for a bad token, too few operands, or != 1 value left at the end.',
    ],
  },

  blood_types_s: {
    ...zone01Cp3Learning.blood_types_s,
    documentation: {
      apis: [
        { name: 'matches! macro', url: 'https://doc.rust-lang.org/std/macro.matches.html', note: 'test several enum variants at once' },
        { name: 'Iterator::filter', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter', note: 'donors / recipients' },
        { name: 'derive(PartialEq, Eq)', url: 'https://doc.rust-lang.org/std/cmp/trait.PartialEq.html', note: 'compare blood types' },
      ],
      links: [
        { title: 'The Book — Enums', url: 'https://doc.rust-lang.org/book/ch06-00-enums.html' },
        { title: 'Rust By Example — match', url: 'https://doc.rust-lang.org/rust-by-example/flow_control/match.html' },
      ],
      videos: [{ title: 'Enums and Pattern Matching', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=DSZqIJhkNCM' }],
    },
    editorHints: [
      'Compatibility has two independent rules: antigen and Rh factor — both must hold.',
      'O is the universal donor antigen; AB is the universal recipient.',
      'donors() and recipients() are mirror filters over all eight blood types.',
    ],
  },

  office_worker: {
    ...zone01Cp3Learning.office_worker,
    documentation: {
      apis: [
        { name: 'From / Into', url: 'https://doc.rust-lang.org/std/convert/trait.From.html', note: 'ergonomic conversions from &str' },
        { name: 'str::split', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.split', note: 'break "name,age,role"' },
        { name: 'str::parse', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.parse', note: 'parse the age field' },
      ],
      links: [
        { title: 'Rust By Example — From and Into', url: 'https://doc.rust-lang.org/rust-by-example/conversion/from_into.html' },
        { title: 'The Book — Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html' },
      ],
    },
    editorHints: [
      'Implement From<&str> for the role: map "admin"/"user" and default everything else to Guest.',
      'Implement From<&str> for the worker by splitting on commas.',
      'Parse the age string into a number with .parse().',
    ],
  },

  matrix_display: {
    ...zone01Cp3Learning.matrix_display,
    documentation: {
      apis: [
        { name: 'std::fmt::Display', url: 'https://doc.rust-lang.org/std/fmt/trait.Display.html', note: 'custom {} printing' },
        { name: 'write! macro', url: 'https://doc.rust-lang.org/std/macro.write.html', note: 'write into the formatter' },
        { name: 'slice::join / Iterator', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.join', note: 'join cells and rows' },
      ],
      links: [
        { title: 'Rust By Example — Display', url: 'https://doc.rust-lang.org/rust-by-example/hello/print/print_display.html' },
        { title: 'std::fmt module', url: 'https://doc.rust-lang.org/std/fmt/' },
      ],
      videos: [{ title: 'Traits in Rust', channel: 'Tensor Programming', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A' }],
    },
    editorHints: [
      'Implement Display and write into the formatter with write!(f, ...), never println!.',
      'Turn each row into "(a b c)": stringify the numbers and join with spaces.',
      'Join the row strings with newlines, with no trailing newline.',
    ],
  },

  queens: {
    ...zone01Cp3Learning.queens,
    documentation: {
      apis: [
        { name: 'Option (constructor)', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'None for off-board squares' },
        { name: 'i64::abs', url: 'https://doc.rust-lang.org/std/primitive.i64.html#method.abs', note: 'diagonal distance' },
        { name: 'derive(Clone, Copy)', url: 'https://doc.rust-lang.org/std/marker/trait.Copy.html', note: 'cheap position values' },
      ],
      links: [
        { title: 'Rust By Example — Option', url: 'https://doc.rust-lang.org/rust-by-example/std/option.html' },
        { title: 'Eight queens puzzle', url: 'https://en.wikipedia.org/wiki/Eight_queens_puzzle' },
      ],
    },
    editorHints: [
      'ChessPosition::new returns Some only when rank and file are both < 8.',
      'Cast coordinates to i64 before subtracting so the difference can go negative.',
      'Queens attack on the same rank, file, or diagonal (equal absolute differences).',
    ],
  },

  drop_the_blog: {
    ...zone01Cp3Learning.drop_the_blog,
    documentation: {
      apis: [
        { name: 'std::ops::Drop', url: 'https://doc.rust-lang.org/std/ops/trait.Drop.html', note: 'run code at end of scope' },
        { name: 'std::cell::Cell', url: 'https://doc.rust-lang.org/std/cell/struct.Cell.html', note: 'mutate a Copy counter via &self' },
        { name: 'std::cell::RefCell', url: 'https://doc.rust-lang.org/std/cell/struct.RefCell.html', note: 'mutate the states vec via &self' },
      ],
      links: [
        { title: 'The Book — Interior mutability', url: 'https://doc.rust-lang.org/book/ch15-05-interior-mutability.html' },
        { title: 'The Book — Running code on cleanup with Drop', url: 'https://doc.rust-lang.org/book/ch15-03-drop.html' },
      ],
      videos: [{ title: 'Smart Pointers & Interior Mutability', channel: 'Jon Gjengset', url: 'https://www.youtube.com/watch?v=8O0Nt9qY_vo' }],
    },
    editorHints: [
      'Store the counter in a Cell and the per-article state in a RefCell for interior mutability.',
      'Article holds a reference to its parent Blog (a lifetime parameter).',
      'Implement Drop for Article so dropping it records the drop on the parent.',
    ],
  },

  lunch_queue: {
    ...zone01Cp3Learning.lunch_queue,
    documentation: {
      apis: [
        { name: 'Option::take', url: 'https://doc.rust-lang.org/std/option/enum.Option.html#method.take', note: 'move a node out, leaving None' },
        { name: 'Box<T>', url: 'https://doc.rust-lang.org/std/boxed/struct.Box.html', note: 'size the recursive Person type' },
        { name: 'Option::as_ref / as_mut', url: 'https://doc.rust-lang.org/std/option/enum.Option.html#method.as_ref', note: 'walk the list by reference' },
      ],
      links: [
        { title: 'The Book — Box and recursive types', url: 'https://doc.rust-lang.org/book/ch15-01-box.html' },
        { title: 'Learning Rust With Entirely Too Many Linked Lists', url: 'https://rust-unofficial.github.io/too-many-lists/' },
      ],
      videos: [{ title: 'Smart Pointers & Interior Mutability', channel: 'Jon Gjengset', url: 'https://www.youtube.com/watch?v=8O0Nt9qY_vo' }],
    },
    editorHints: [
      'The queue is a singly linked list of Option<Box<Person>>; add() inserts at the front.',
      'Use Option::take() to move nodes out of &mut self without fighting the borrow checker.',
      'rm() is FIFO — remove the oldest (the tail); invert_queue() reverses the next pointers.',
    ],
  },
};
