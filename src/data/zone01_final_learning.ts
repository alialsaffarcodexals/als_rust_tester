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
    expectedIO: {
      input: `words: &str`,
      output: `HashMap<String, u32>`,
      behavior: `Counts how often each word appears — case-insensitive, punctuation ignored, but an apostrophe inside a word (like "it's") is kept.`,
      examples: [
        { input: `"Hello, world!"`, output: `{"hello": 1, "world": 1}` },
        { input: `"Batman, BATMAN, batman, Stop stop"`, output: `{"batman": 3, "stop": 2}` },
        { input: `"it's IT'S"`, output: `{"it's": 2}`, note: `apostrophe kept` },
      ],
    },
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
    expectedIO: {
      input: `v: i32`,
      output: `String`,
      behavior: `Returns the reversed digits followed by the original number; a negative sign stays at the front.`,
      examples: [
        { input: `123`, output: `"321123"` },
        { input: `-123`, output: `"-321123"`, note: `sign kept in front` },
        { input: `50`, output: `"0550"`, note: `zeros preserved` },
      ],
    },
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
    expectedIO: {
      input: `v: String, i: usize`,
      output: `Vec<String>  (the lines)`,
      behavior: `Builds a centered diamond: rows grow from 1 to i repeats of v, then shrink back to 1, each indented by its row number.`,
      examples: [
        { input: `"x", 3`, output: ` x\n  xx\n   xxx\n  xx\n x` },
        { input: `"x", 2`, output: ` x\n  xx\n x` },
        { input: `"o", 1`, output: ` o`, note: `single row` },
      ],
    },
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
    expectedIO: {
      input: `nbr: usize`,
      output: `usize`,
      behavior: `Returns the smallest prime greater than or equal to nbr.`,
      examples: [
        { input: `4`, output: `5` },
        { input: `11`, output: `11`, note: `already prime → itself` },
        { input: `14`, output: `17` },
      ],
    },
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
    expectedIO: {
      input: `v: &[u64]`,
      output: `Vec<u64>`,
      behavior: `Sums of the shrinking prefixes: the total, then drop the last element each time, down to the empty sum (always ends in 0).`,
      examples: [
        { input: `[1, 2, 3, 4, 5]`, output: `[15, 10, 6, 3, 1, 0]` },
        { input: `[10, 20]`, output: `[30, 10, 0]` },
        { input: `[]`, output: `[0]`, note: `empty slice → [0]` },
      ],
    },
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
    expectedIO: {
      input: `nbr: u64`,
      output: `u64`,
      behavior: `Returns the largest prime less than or equal to nbr.`,
      examples: [
        { input: `34`, output: `31` },
        { input: `13`, output: `13`, note: `already prime → itself` },
        { input: `20`, output: `19` },
      ],
    },
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
    expectedIO: {
      input: `s: String, letters_per_turn: usize`,
      output: `Option<String>`,
      behavior: `Decodes a scytale cipher by reading the text column by column. Returns None if the text is empty or its length isn't divisible by letters_per_turn.`,
      examples: [
        { input: `"abcdef", 2`, output: `Some("acebdf")` },
        { input: `"abcdef", 3`, output: `Some("adbecf")` },
        { input: `"", 3`, output: `None`, note: `empty → None` },
      ],
    },
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
    expectedIO: {
      input: `expr: &str  (space-separated postfix tokens)`,
      output: `f64`,
      behavior: `Evaluates a Reverse Polish (postfix) expression. Supports + - * / %.`,
      examples: [
        { input: `"3 4 +"`, output: `7` },
        { input: `"5 1 2 + 4 * + 3 -"`, output: `14` },
        { input: `"10 2 /"`, output: `5` },
      ],
    },
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
    expectedIO: {
      input: `BloodType { antigen, rh_factor }  + its methods`,
      output: `recipients()/donors(): Vec<BloodType> · can_receive_from(o): bool`,
      behavior: `Model blood-type compatibility: recipients() = who can receive this type, donors() = who it can receive from, can_receive_from(o) checks one pair (ABO + Rh rules).`,
      examples: [
        { input: `O+ .can_receive_from(O+)`, output: `true` },
        { input: `O+ .can_receive_from(O-)`, output: `true` },
        { input: `O- .can_receive_from(O+)`, output: `false`, note: `Rh+ donor → Rh- recipient not allowed` },
      ],
    },
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
    expectedIO: {
      input: `&str  ("name,age,role")  via  OfficeWorker::from`,
      output: `OfficeWorker { name, age, role }`,
      behavior: `Parse a "name,age,role" string into an OfficeWorker; the role text maps to a WorkerRole enum variant.`,
      examples: [
        { input: `"Manuel,23,admin"`, output: `OfficeWorker { name: "Manuel", age: 23, role: Admin }` },
        { input: `"Jean Jacques,44,guest"`, output: `OfficeWorker { name: "Jean Jacques", age: 44, role: Guest }`, note: `spaces in name kept` },
      ],
    },
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
    expectedIO: {
      input: `Matrix(Vec<Vec<i32>>)  built via Matrix::new(&[&[i32]])`,
      output: `Display — each row as "(a b c)"`,
      behavior: `Implement Display so the matrix prints one row per line, values space-separated inside parentheses.`,
      examples: [
        { input: `Matrix::new(&[&[1, 2, 3], &[4, 5, 6], &[7, 8, 9]])`, output: `(1 2 3)\n(4 5 6)\n(7 8 9)` },
        { input: `Matrix::new(&[&[1, 2], &[3, 4]])`, output: `(1 2)\n(3 4)` },
        { input: `Matrix::new(&[&[1]])`, output: `(1)`, note: `single cell` },
      ],
    },
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
    expectedIO: {
      input: `two Queens at board positions (rank, file)`,
      output: `can_attack(other): bool`,
      behavior: `Two queens can attack each other if they share a rank, a file, or a diagonal.`,
      examples: [
        { input: `Queen(2, 2).can_attack(Queen(0, 4))`, output: `true`, note: `same diagonal` },
        { input: `Queen(1, 2).can_attack(Queen(0, 4))`, output: `false` },
        { input: `Queen(3, 1).can_attack(Queen(3, 7))`, output: `true`, note: `same rank` },
      ],
    },
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
    expectedIO: {
      input: `Blog + Article handles (new_article, discard, is_dropped, drops)`,
      output: `is_dropped(id): bool · drops: Cell<usize> counter`,
      behavior: `A blog tracks its articles. Discarding (dropping) an article marks it dropped and bumps the shared drop counter; is_dropped(id) reports a given article's state.`,
      examples: [
        { input: `new_article → discard → (is_dropped(id), id, &drops)`, output: `(true, 0, Cell { value: 1 })` },
        { input: `discard a 2nd article → (is_dropped(id1), id1, &drops)`, output: `(true, 1, Cell { value: 2 })` },
        { input: `3rd article still alive via Rc clone`, output: `(false, 2, Cell { value: 2 }, 1)`, note: `not dropped` },
      ],
    },
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
    expectedIO: {
      input: `Queue (linked list) + add(name, discount), rm(), search(name), invert_queue()`,
      output: `rm()/search(): Option<(String, i32)> · Debug prints the chain`,
      behavior: `A singly-linked queue of people: add appends to the back, rm removes the front, search finds a person by name, invert_queue reverses the order.`,
      examples: [
        { input: `add Marie/Monica/Ana/Alice; search("Marie")`, output: `Some(("Marie", 20))` },
        { input: `search("someone")`, output: `None`, note: `not in the queue` },
        { input: `rm()`, output: `Some(("Marie", 20))`, note: `removes the front` },
      ],
    },
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

  // -------------------------------------------------------------------------
  // NEW Final-only slugs — full guided content.
  // -------------------------------------------------------------------------
  count_factorial_steps: {
    expectedIO: {
      input: `factorial: u64`,
      output: `u64`,
      behavior: `Given a number that is a factorial, return the n where n! == factorial. Return 0 when the input isn't a factorial.`,
      examples: [
        { input: `720`, output: `6`, note: `6! = 720` },
        { input: `6`, output: `3`, note: `3! = 6` },
        { input: `13`, output: `0`, note: `not a factorial` },
      ],
    },
    overview: {
      whatYouBuild:
        'A function that, given a factorial value, returns how many multiplications produced it — i.e. the n in n!. If the value is not a factorial, or is 0 or 1, it returns 0.',
      inputOutput:
        'Input: a u64 factorial. Output: a u64 step count. 720 -> 6 (6!), 6 -> 3 (3!), 13 -> 0 (not a factorial).',
      constraints: [
        '0 and 1 return 0.',
        'A value that is not exactly some n! returns 0.',
        'Rebuild the factorial by multiplying 1*2*3*... and count the steps.',
      ],
      commonMistakes: [
        'Returning the loop counter even when the product overshot the target (not a factorial).',
        'Off-by-one in the step count (the multiply by i is step i).',
        'Forgetting the 0/1 edge cases.',
      ],
    },
    officialDescription: `## count_factorial_steps

Create a function count_factorial_steps that receives a factorial number and counts how many multiplications are necessary to reach it. If the argument is not a factorial, or it is 0 or 1, the function returns 0.

The factorial of a number is the product of all integers from 1 to that number, e.g. 6! = 1*2*3*4*5*6 = 720, so the factorial steps of 720 are 6.

### Expected function

~~~
pub fn count_factorial_steps(factorial: u64) -> u64
~~~

### Usage

count_factorial_steps(720) = 6, count_factorial_steps(13) = 0, count_factorial_steps(6) = 3.`,
    objectives: {
      learn: ['Rebuild a value with a multiplying loop.', 'Detect a non-factorial by overshoot.', 'Handle edge cases up front.'],
      whyExists: 'It connects factorials to iteration and teaches careful loop termination and validation.',
      rustSkills: ['loops', 'integer math', 'validation'],
    },
    conceptIds: ['recursion', 'error_handling'],
    conceptNotes: {
      recursion: 'Factorials are the classic recursion example; here we rebuild one iteratively and count the multiplications.',
      error_handling: 'A value that is not exactly some n! is rejected by returning 0.',
    },
    similar: {
      title: 'Powers of two',
      prompt:
        'Write a function that returns how many times you can double 1 to reach n (or 0 if n is not a power of two). Same "rebuild and count, reject on overshoot" pattern.',
      starter: `pub fn steps_to_pow2(n: u64) -> u64 {
    // double from 1, counting steps, until you reach or pass n
    todo!()
}`,
      hint: 'Keep a product and a counter; stop when product >= n; return the count only if product == n.',
      concepts: ['recursion', 'error_handling'],
      solution: `pub fn steps_to_pow2(n: u64) -> u64 {
    if n < 1 { return 0; }
    let mut p = 1u64; let mut steps = 0u64;
    while p < n { p *= 2; steps += 1; }
    if p == n { steps } else { 0 }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Handle the trivial inputs first. Fill the condition that returns 0 immediately.',
        template: `if _____ {
    return 0;
}`,
        accepted: ['factorial <= 1'],
        acceptedPatterns: ['^factorial\\s*<=\\s*1$'],
        hints: ['0! and 1! are both 1.', 'Reject factorial <= 1.'],
        explanation: 'Per the spec, 0 and 1 return 0, so we bail out before the loop.',
        whatYouLearned: 'Guard edge cases before the main logic.',
        conceptId: 'error_handling',
      },
      {
        prompt: 'Rebuild the factorial. Fill the line that grows the product on each step.',
        template: `while product < factorial {
    i += 1;
    _____;
}`,
        accepted: ['product *= i'],
        acceptedPatterns: ['^product\\s*\\*=\\s*i$'],
        hints: ['Multiply the running product by the new i.', 'product *= i.'],
        explanation: 'Each step multiplies the product by the next integer i, rebuilding 1*2*3*...',
        whatYouLearned: 'A running product reconstructs a factorial step by step.',
        conceptId: 'recursion',
      },
      {
        kind: 'choice',
        prompt: 'count_factorial_steps(13) should return what, and why?',
        options: ['0, because 13 is not a factorial', '13, because it is the input', '6, because 6! = 720', '1, because 1! = 1'],
        correct: [0],
        why: [
          '13 lies between 6 (3!) and 24 (4!), so no n! equals 13 — return 0.',
          'The function returns a step count, not the input.',
          '720, not 13, has 6 steps.',
          '13 is not 1.',
        ],
        hints: ['Is 13 equal to any factorial?', '3! = 6 and 4! = 24.'],
        explanation: 'The product jumps 1, 2, 6, 24 — it never equals 13, so the function returns 0.',
        whatYouLearned: 'Non-factorials are detected when the product overshoots without matching.',
        conceptId: 'error_handling',
      },
      {
        kind: 'bug',
        prompt: 'This returns the wrong answer for non-factorials. Click the mistake.',
        code: `while product < factorial {
    i += 1;
    product *= i;
}
return i;`,
        bugs: [{ line: 5, token: 'i' }],
        hints: [
          'What if the product overshot the target?',
          'You must confirm product == factorial before returning i.',
        ],
        explanation: 'Returning i unconditionally reports a step count even for non-factorials. Return i only if product == factorial, otherwise 0.',
        whatYouLearned: 'Validate the result before returning it.',
        conceptId: 'error_handling',
      },
      {
        kind: 'order',
        prompt: 'Assemble count_factorial_steps. One fragment does not belong.',
        scaffold: `pub fn count_factorial_steps(factorial: u64) -> u64 {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
    [ slot 4 ]
}`,
        fragments: [
          'if factorial <= 1 { return 0; }',
          'let mut product = 1u64; let mut i = 1u64;',
          'while product < factorial { i += 1; product *= i; }',
          'if product == factorial { i } else { 0 }',
        ],
        distractors: ['return factorial;'],
        hints: ['Edge case, then set up, then multiply-loop, then the validated answer.', 'The last line must check product == factorial.'],
        explanation: 'Reject 0/1, set product and i to 1, multiply up until product reaches factorial, then return i only if it matched exactly.',
        whatYouLearned: 'Validate-setup-loop-return is a robust shape for "rebuild and count".',
        conceptId: 'recursion',
      },
    ],
    documentation: {
      apis: [
        { name: 'u64 arithmetic', url: 'https://doc.rust-lang.org/std/primitive.u64.html', note: 'multiply the running product' },
        { name: 'while loops', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html', note: 'rebuild the factorial' },
      ],
      links: [
        { title: 'The Book — Control flow', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html' },
        { title: 'Factorial (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Factorial' },
      ],
    },
    editorHints: [
      'Return 0 immediately for factorial <= 1.',
      'Multiply a running product by 2, 3, 4, ... counting each step.',
      'Only return the count if the product landed exactly on the target.',
    ],
  },

  matrix_multiplication: {
    expectedIO: {
      input: `m: Matrix, multiplier: i32`,
      output: `Matrix`,
      behavior: `Multiply every element of the 2x2 matrix by the scalar and return a new Matrix.`,
      constraints: `Matrix is a tuple struct of two rows: Matrix((i32, i32), (i32, i32)); derive Debug, PartialEq, Eq.`,
      examples: [
        { input: `Matrix((1, 3), (4, 5)), 3`, output: `Matrix((3, 9), (12, 15))` },
        { input: `Matrix((1, -1), (0, 5)), -2`, output: `Matrix((-2, 2), (0, -10))` },
        { input: `Matrix((7, 7), (7, 7)), 0`, output: `Matrix((0, 0), (0, 0))`, note: `scalar 0` },
      ],
    },
    overview: {
      whatYouBuild:
        'A 2x2 Matrix modeled as a tuple struct of two tuples, plus a multiply function that scales every number in it by a scalar and returns a new Matrix.',
      inputOutput:
        'Input: a Matrix (e.g. Matrix((1, 3), (4, 5))) and an i32 multiplier. Output: a new Matrix with each of its four numbers multiplied. multiply(Matrix((1, 3), (4, 5)), 3) = Matrix((3, 9), (12, 15)).',
      constraints: [
        'Define Matrix as a tuple struct of two tuples: struct Matrix((i32, i32), (i32, i32)).',
        'Matrix must derive Debug, PartialEq and Eq.',
        'Scale all four numbers (m.0.0, m.0.1, m.1.0, m.1.1) by the same scalar; return a new Matrix.',
      ],
      commonMistakes: [
        'Forgetting to define the Matrix struct (the starter only has the function).',
        'Using named fields like m.a instead of tuple indexing (m.0.0, m.0.1, m.1.0, m.1.1).',
        'Scaling only some of the numbers.',
      ],
    },
    officialDescription: `## matrix_multiplication

- Define a struct named Matrix as a tuple of two tuples; each nested tuple holds two i32.
- Create a function named multiply that receives a Matrix and an i32 and returns the Matrix with every number multiplied by the second argument.

Matrix must implement Debug, PartialEq and Eq (use derive). Remember you are defining a library, so public items must be marked pub.

### Expected items

~~~
#[derive(Debug, PartialEq, Eq)]
pub struct Matrix((i32, i32), (i32, i32));

pub fn multiply(m: Matrix, multiplier: i32) -> Matrix
~~~

### Usage

multiply(Matrix((1, 3), (4, 5)), 3) prints Matrix((3, 9), (12, 15)).`,
    objectives: {
      learn: ['Define a tuple struct and derive traits on it.', 'Index nested tuples with .0.0 syntax.', 'Build and return a new value rather than mutating.'],
      whyExists: 'A gentle introduction to tuple structs, derives, and tuple indexing.',
      rustSkills: ['tuple structs', 'derive', 'arithmetic'],
    },
    conceptIds: ['structs', 'matrices'],
    conceptNotes: {
      structs: 'Matrix is a tuple struct: struct Matrix((i32, i32), (i32, i32)). Access its parts by position — m.0 and m.1 are the rows, m.0.0 is the first number of the first row.',
      matrices: 'A 2x2 matrix stored as two rows; scalar multiplication scales every entry by the same number.',
    },
    similar: {
      title: 'Scale a point',
      prompt: 'Given a tuple struct Point(i32, i32), write scale(p, k) returning a new Point with both numbers multiplied by k. Same tuple-struct indexing as Matrix.',
      starter: `#[derive(Debug, PartialEq, Eq)]
pub struct Point(i32, i32);

pub fn scale(p: Point, k: i32) -> Point {
    todo!()
}`,
      hint: 'Index with p.0 and p.1: Point(p.0 * k, p.1 * k).',
      concepts: ['structs'],
      solution: `#[derive(Debug, PartialEq, Eq)]
pub struct Point(i32, i32);

pub fn scale(p: Point, k: i32) -> Point {
    Point(p.0 * k, p.1 * k)
}`,
    },
    sideQuiz: [
      {
        prompt: 'Define the Matrix type. Fill the tuple-struct body (two tuples of two i32).',
        template: `#[derive(Debug, PartialEq, Eq)]
pub struct Matrix(_____);`,
        accepted: ['(i32, i32), (i32, i32)'],
        acceptedPatterns: ['^\\(i32,\\s*i32\\),\\s*\\(i32,\\s*i32\\)$'],
        hints: ['Two rows, each a pair of i32.', 'It is two tuples: (i32, i32), (i32, i32).'],
        explanation: 'Matrix is a tuple struct of two (i32, i32) tuples — the two rows of the 2x2 matrix.',
        whatYouLearned: 'A tuple struct groups fixed, positional fields under a name.',
        conceptId: 'structs',
      },
      {
        kind: 'choice',
        prompt: 'What must Matrix derive, per the spec (and the {:?} usage)?',
        options: ['Debug, PartialEq, Eq', 'Clone, Copy', 'Display, Hash', 'nothing'],
        correct: [0],
        why: [
          'The usage prints with {:?} (needs Debug); the spec also requires PartialEq and Eq.',
          'Clone/Copy are not required here.',
          'Display/Hash are not needed.',
          'At minimum Debug is required for the {:?} print.',
        ],
        hints: ['The test prints the matrix with {:?}.', 'The spec lists three traits.'],
        explanation: 'derive(Debug, PartialEq, Eq) gives the {:?} printing the test uses plus the equality the spec requires.',
        whatYouLearned: 'derive adds standard behavior (printing, comparison) to your struct.',
        conceptId: 'structs',
      },
      {
        prompt: 'Scale the first number of the first row. Fill the indexed access.',
        template: `Matrix(
    (_____ * multiplier, m.0.1 * multiplier),
    (m.1.0 * multiplier, m.1.1 * multiplier),
)`,
        accepted: ['m.0.0'],
        acceptedPatterns: ['^m\\.0\\.0$'],
        hints: ['m.0 is the first row; .0 again is its first number.', 'Use m.0.0.'],
        explanation: 'Tuple structs are indexed by position: m.0 is the first row tuple, and m.0.0 is its first number.',
        whatYouLearned: 'Index nested tuples with chained .N, e.g. m.0.0.',
        conceptId: 'structs',
      },
      {
        kind: 'bug',
        prompt: 'This uses the wrong field syntax for a tuple struct. Click the mistake.',
        code: `Matrix(
    (m.a * multiplier, m.0.1 * multiplier),
    (m.1.0 * multiplier, m.1.1 * multiplier),
)`,
        bugs: [{ line: 2, token: 'a' }],
        hints: ['Tuple structs have no named fields.', 'Use positional indexing instead of m.a.'],
        explanation: 'A tuple struct has no field named a; the first number is m.0.0, not m.a.',
        whatYouLearned: 'Tuple-struct fields are positional (m.0.0), not named (m.a).',
        conceptId: 'structs',
      },
    ],
    documentation: {
      apis: [
        { name: 'Tuple structs', url: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html#using-tuple-structs-without-named-fields-to-create-different-types', note: 'struct Matrix((i32,i32),(i32,i32))' },
        { name: 'derive(Debug, PartialEq, Eq)', url: 'https://doc.rust-lang.org/book/ch05-02-example-structs.html#adding-useful-functionality-with-derived-traits', note: 'printing and comparison' },
        { name: 'Tuple indexing', url: 'https://doc.rust-lang.org/rust-by-example/primitives/tuples.html', note: 'm.0.0, m.0.1, m.1.0, m.1.1' },
      ],
      links: [
        { title: 'The Book — Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html' },
        { title: 'Rust By Example — Structures', url: 'https://doc.rust-lang.org/rust-by-example/custom_types/structs.html' },
      ],
      videos: [{ title: 'Structs in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=n3bPhdiJm9I' }],
    },
    editorHints: [
      'Define the Matrix tuple struct: #[derive(Debug, PartialEq, Eq)] pub struct Matrix((i32, i32), (i32, i32));',
      'Index the nested tuples with m.0.0, m.0.1, m.1.0, m.1.1.',
      'Build and return a new Matrix(...), multiplying every number by the multiplier.',
    ],
  },

  min_and_max: {
    expectedIO: {
      input: `nb_1: i32, nb_2: i32, nb_3: i32`,
      output: `(i32, i32)  // (minimum, maximum)`,
      behavior: `Returns a tuple of the smallest and largest of the three numbers.`,
      examples: [
        { input: `9, 2, 4`, output: `(2, 9)` },
        { input: `-3, 7, 0`, output: `(-3, 7)` },
        { input: `5, 5, 5`, output: `(5, 5)`, note: `all equal` },
      ],
    },
    overview: {
      whatYouBuild:
        'A function that returns both the smallest and the largest of three integers as a (min, max) tuple.',
      inputOutput: 'Input: three i32 values. Output: a tuple (min, max).',
      constraints: ['Use std::cmp::min / std::cmp::max (or comparisons).', 'Return them as a tuple in (min, max) order.'],
      commonMistakes: ['Comparing only two of the three values.', 'Swapping the tuple order.'],
    },
    officialDescription: `## min_and_max

Create a function min_and_max that takes three i32 numbers and returns a tuple containing the smallest and the largest of them.

### Expected function

~~~
pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32)
~~~`,
    objectives: {
      learn: ['Compare values with std::cmp::min/max.', 'Chain comparisons over three values.', 'Return a tuple.'],
      whyExists: 'A tiny drill in comparison helpers and tuple returns.',
      rustSkills: ['std::cmp', 'tuples'],
    },
    conceptIds: ['pattern_matching'],
    conceptNotes: {
      pattern_matching: 'std::cmp::min/max pick a value by comparison; chaining handles three inputs.',
    },
    similar: {
      title: 'Middle of three',
      prompt: 'Return the median (middle value) of three integers. Same comparison-chaining idea.',
      starter: `pub fn middle(a: i32, b: i32, c: i32) -> i32 {
    todo!()
}`,
      hint: 'median = a + b + c - min(a, min(b, c)) - max(a, max(b, c)).',
      concepts: ['pattern_matching'],
      solution: `pub fn middle(a: i32, b: i32, c: i32) -> i32 {
    let lo = a.min(b).min(c);
    let hi = a.max(b).max(c);
    a + b + c - lo - hi
}`,
    },
    sideQuiz: [
      {
        prompt: 'Find the smallest of three by chaining. Fill the inner call.',
        template: `let min = std::cmp::min(nb_1, _____);`,
        accepted: ['std::cmp::min(nb_2, nb_3)'],
        acceptedPatterns: ['^std::cmp::min\\(nb_2,\\s*nb_3\\)$'],
        hints: ['Compare nb_1 with the smaller of nb_2 and nb_3.', 'Nest another std::cmp::min.'],
        explanation: 'min(nb_1, min(nb_2, nb_3)) is the smallest of the three.',
        whatYouLearned: 'Chain pairwise comparisons to handle more than two values.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'Which expression returns the result in the required order?',
        options: ['(min, max)', '(max, min)', '[min, max]', '{min, max}'],
        correct: [0],
        why: [
          'A tuple (min, max) matches the return type and order.',
          'That reverses the required order.',
          'Square brackets make an array, not a tuple.',
          'Braces are not tuple syntax here.',
        ],
        hints: ['The return type is (i32, i32).', 'Smallest first, largest second.'],
        explanation: 'The function returns the tuple (min, max) — parentheses, min first.',
        whatYouLearned: 'Tuples group multiple return values in a fixed order.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'This finds the largest incorrectly. Click the mistake.',
        code: `let max = std::cmp::min(nb_1, std::cmp::max(nb_2, nb_3));`,
        bugs: [{ line: 1, token: 'min' }],
        hints: ['You want the biggest, not the smallest.', 'Look at the outer call.'],
        explanation: 'The outer call should be std::cmp::max; using min here can never yield the overall maximum.',
        whatYouLearned: 'Use max (not min) to find the largest.',
        conceptId: 'pattern_matching',
      },
    ],
    documentation: {
      apis: [
        { name: 'std::cmp::min', url: 'https://doc.rust-lang.org/std/cmp/fn.min.html', note: 'smaller of two' },
        { name: 'std::cmp::max', url: 'https://doc.rust-lang.org/std/cmp/fn.max.html', note: 'larger of two' },
        { name: 'Tuples', url: 'https://doc.rust-lang.org/book/ch03-02-data-types.html#the-tuple-type', note: 'return (min, max)' },
      ],
      links: [
        { title: 'Rust By Example — Tuples', url: 'https://doc.rust-lang.org/rust-by-example/primitives/tuples.html' },
        { title: 'std::cmp module', url: 'https://doc.rust-lang.org/std/cmp/' },
      ],
    },
    editorHints: [
      'Chain std::cmp::min twice for the smallest of three.',
      'Chain std::cmp::max twice for the largest.',
      'Return them as the tuple (min, max).',
    ],
  },

  modify_letter: {
    expectedIO: {
      input: `s: &str, letter: char`,
      output: `String`,
      behavior: `Three helpers: remove_letter_sensitive and remove_letter_insensitive delete the letter; swap_letter_case flips the case of every occurrence of it.`,
      examples: [
        { input: `remove_letter_sensitive("Jojhn jis sljeepjjing", 'j')`, output: `"John is sleeping"` },
        { input: `remove_letter_insensitive("JaimA ais swiaAmmingA", 'A')`, output: `"Jim is swimming"`, note: `both cases removed` },
        { input: `swap_letter_case("byE bye", 'e')`, output: `"bye byE"` },
      ],
    },
    overview: {
      whatYouBuild:
        'String functions that remove a chosen letter from a string — one case-sensitive, one case-insensitive (the full subject also includes swapping a letter\'s case).',
      inputOutput: 'Input: a &str and a char. Output: a new String with that letter removed (respecting case or not).',
      constraints: ['ASCII only.', 'remove_letter_sensitive matches exact case; remove_letter_insensitive matches both cases.'],
      commonMistakes: ['Comparing without lowercasing in the insensitive version.', 'Trying to mutate &str instead of building a new String.'],
    },
    officialDescription: `## modify_letter

Implement string functions:

- remove_letter_sensitive(s, letter): remove every occurrence of letter (case-sensitive).
- remove_letter_insensitive(s, letter): remove every occurrence of letter, ignoring case.
- swap_letter_case(s, letter): toggle the case of the chosen letter.

Use ASCII characters only.

### Expected functions

~~~
pub fn remove_letter_sensitive(s: &str, letter: char) -> String
pub fn remove_letter_insensitive(s: &str, letter: char) -> String
~~~

### Usage

remove_letter_sensitive("Jojhn jis sljeepjjing", 'j') = "John is sleeping".`,
    objectives: {
      learn: ['Iterate characters with chars().', 'Keep/drop characters with filter and a closure.', 'collect() back into a String.'],
      whyExists: 'Foundational string processing with iterators and closures.',
      rustSkills: ['iterators', 'closures', 'char methods'],
    },
    conceptIds: ['iterators', 'closures'],
    conceptNotes: {
      iterators: 'chars().filter(...).collect() is the build-a-new-string pattern.',
      closures: 'The filter predicate is a closure deciding which characters to keep.',
    },
    similar: {
      title: 'Keep only vowels',
      prompt: 'Write a function that returns a new String containing only the vowels of the input. Same chars().filter().collect() pattern.',
      starter: `pub fn only_vowels(s: &str) -> String {
    todo!()
}`,
      hint: 's.chars().filter(|c| "aeiouAEIOU".contains(*c)).collect()',
      concepts: ['iterators', 'closures'],
      solution: `pub fn only_vowels(s: &str) -> String {
    s.chars().filter(|c| "aeiouAEIOU".contains(*c)).collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Remove a letter (case-sensitive). Fill the predicate that keeps the other characters.',
        template: `s.chars().filter(|&c| _____).collect()`,
        accepted: ['c != letter'],
        acceptedPatterns: ['^c\\s*!=\\s*letter$'],
        hints: ['Keep characters that are NOT the target.', 'Compare c with letter.'],
        explanation: 'filter keeps characters where the closure is true; here, every character except the target letter.',
        whatYouLearned: 'chars().filter(pred).collect() builds a filtered String.',
        conceptId: 'iterators',
      },
      {
        prompt: 'For the case-insensitive version, normalize before comparing. Fill the method.',
        template: `let target = letter.to_ascii_lowercase();
s.chars().filter(|c| c._____() != target).collect()`,
        accepted: ['to_ascii_lowercase'],
        acceptedPatterns: ['^to_ascii_lowercase$'],
        hints: ['Lowercase both sides before comparing.', 'char has to_ascii_lowercase().'],
        explanation: 'Comparing lowercased characters removes both "A" and "a".',
        whatYouLearned: 'Normalize case on both sides for case-insensitive matching.',
        conceptId: 'iterators',
      },
      {
        kind: 'choice',
        prompt: 'remove_letter_sensitive("aAbA", \'A\') returns what?',
        options: ['"ab"', '"aAbA"', '""', '"AA"'],
        correct: [0],
        why: [
          'Only the uppercase A characters are removed, leaving "ab".',
          'Something is removed, so it is not unchanged.',
          'Lowercase a stays.',
          'The lowercase letters are kept, not removed.',
        ],
        hints: ['Case-sensitive: only exact "A" goes.', 'The two lowercase a... wait, only one lowercase a and one b remain.'],
        explanation: 'Case-sensitive removal drops only the two uppercase A characters, leaving the lowercase a and b: "ab".',
        whatYouLearned: 'Case-sensitive matching distinguishes "A" from "a".',
        conceptId: 'iterators',
      },
      {
        kind: 'bug',
        prompt: 'This insensitive removal is actually case-sensitive. Click the mistake.',
        code: `let target = letter.to_ascii_lowercase();
s.chars().filter(|&c| c != target).collect()`,
        bugs: [{ line: 2, token: 'c' }],
        hints: ['target is lowercased, but c is not.', 'The comparison must lowercase c too.'],
        explanation: 'c is compared raw against a lowercased target, so uppercase matches slip through. Use c.to_ascii_lowercase() != target.',
        whatYouLearned: 'Both sides of a case-insensitive comparison must be normalized.',
        conceptId: 'iterators',
      },
    ],
    documentation: {
      apis: [
        { name: 'str::chars', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars', note: 'iterate characters' },
        { name: 'Iterator::filter', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter', note: 'keep matching chars' },
        { name: 'char::to_ascii_lowercase', url: 'https://doc.rust-lang.org/std/primitive.char.html#method.to_ascii_lowercase', note: 'case-insensitive compare' },
      ],
      links: [
        { title: 'Rust By Example — Strings', url: 'https://doc.rust-lang.org/rust-by-example/std/str.html' },
        { title: 'Iterator::collect', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect' },
      ],
      videos: [{ title: 'Iterators in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=4GcKrj4By8k' }],
    },
    editorHints: [
      'Use s.chars().filter(...).collect() to build the new String.',
      'For the sensitive version, keep chars where c != letter.',
      'For the insensitive version, lowercase BOTH c and letter before comparing.',
    ],
  },

  smallest: {
    expectedIO: {
      input: `h: HashMap<&str, i32>`,
      output: `i32`,
      behavior: `Returns the smallest value stored in the map.`,
      examples: [
        { input: `{"Cat": 122, "Dog": 333, "Elephant": 334, "Gorilla": 14}`, output: `14` },
        { input: `{"a": -5, "b": -2, "c": -10}`, output: `-10`, note: `negatives` },
        { input: `{"only": 42}`, output: `42`, note: `single entry` },
      ],
    },
    overview: {
      whatYouBuild: 'A function that returns the smallest value stored in a HashMap of name -> value.',
      inputOutput: 'Input: a HashMap<&str, i32>. Output: the smallest i32 value (0 for an empty map).',
      constraints: ['Look at the values, not the keys.', 'Handle the empty map without panicking.'],
      commonMistakes: ['Iterating keys instead of values.', 'Calling unwrap() on an empty map (panics).'],
    },
    officialDescription: `## smallest

Create a function smallest that takes a HashMap of &str to i32 and returns the smallest value it contains.

### Expected function

~~~
pub fn smallest(h: HashMap<&str, i32>) -> i32
~~~`,
    objectives: {
      learn: ['Iterate a map\'s values.', 'Find a minimum with Iterator::min.', 'Default safely on an empty collection.'],
      whyExists: 'Practices HashMap iteration and the Option returned by min.',
      rustSkills: ['HashMap', 'iterators', 'Option'],
    },
    conceptIds: ['collections', 'iterators'],
    conceptNotes: {
      collections: 'HashMap::values() yields the stored i32s.',
      iterators: 'min() returns an Option because the iterator could be empty.',
    },
    similar: {
      title: 'Largest value',
      prompt: 'Return the largest value in a HashMap<&str, i32> (0 if empty). Same values().max() pattern.',
      starter: `use std::collections::HashMap;
pub fn largest(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`,
      hint: 'h.values().copied().max().unwrap_or(0)',
      concepts: ['collections', 'iterators'],
      solution: `use std::collections::HashMap;
pub fn largest(h: HashMap<&str, i32>) -> i32 {
    h.values().copied().max().unwrap_or(0)
}`,
    },
    sideQuiz: [
      {
        prompt: 'Iterate the map\'s values. Fill the accessor.',
        template: `let result = h._____().copied().min().unwrap_or(0);`,
        accepted: ['values'],
        acceptedPatterns: ['^values$'],
        hints: ['You want the stored numbers, not the names.', 'HashMap has values().'],
        explanation: 'values() yields the i32 values; copied() turns &i32 into i32 so min() can compare owned values.',
        whatYouLearned: 'Use values() to iterate a map\'s values.',
        conceptId: 'collections',
      },
      {
        kind: 'choice',
        prompt: 'Why does min() need unwrap_or(0) here?',
        options: [
          'min() returns Option, which is None for an empty map',
          'min() can panic',
          'unwrap_or speeds it up',
          'min() returns a Result',
        ],
        correct: [0],
        why: [
          'An empty iterator has no minimum, so min() returns None; unwrap_or supplies 0.',
          'min() does not panic.',
          'It is about correctness, not speed.',
          'min() returns Option, not Result.',
        ],
        hints: ['What if the map is empty?', 'min() of nothing is None.'],
        explanation: 'min() returns Option<i32>; unwrap_or(0) provides a sensible default when the map is empty.',
        whatYouLearned: 'min()/max() return Option to handle the empty case.',
        conceptId: 'iterators',
      },
      {
        kind: 'bug',
        prompt: 'This looks at the wrong part of the map. Click the mistake.',
        code: `let result = h.keys().copied().min().unwrap_or(0);`,
        bugs: [{ line: 1, token: 'keys' }],
        hints: ['We want the smallest value, not key.', 'Check the accessor.'],
        explanation: 'keys() iterates the &str names; we need values() to find the smallest i32.',
        whatYouLearned: 'keys() vs values(): pick the right one.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'HashMap::values', url: 'https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.values', note: 'iterate values' },
        { name: 'Iterator::min', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.min', note: 'smallest (Option)' },
        { name: 'Option::unwrap_or', url: 'https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or', note: 'default for empty' },
      ],
      links: [
        { title: 'The Book — Hash maps', url: 'https://doc.rust-lang.org/book/ch08-03-hash-maps.html' },
        { title: 'Rust By Example — Iterators', url: 'https://doc.rust-lang.org/rust-by-example/trait/iter.html' },
      ],
    },
    editorHints: [
      'Iterate values() (not keys()).',
      'Use min() to find the smallest — it returns an Option.',
      'unwrap_or(0) handles the empty map.',
    ],
  },

  prime_checker: {
    expectedIO: {
      input: `nb: usize`,
      output: `Option<Result<usize, PrimeErr>>`,
      behavior: `Some(Ok(n)) if prime; Some(Err(Even)) if even; Some(Err(Divider(d))) for an odd composite (smallest divisor d); None when it can't be classified (0 or 1).`,
      examples: [
        { input: `2`, output: `Some(Ok(2))` },
        { input: `14`, output: `Some(Err(Even))`, note: `even` },
        { input: `9`, output: `Some(Err(Divider(3)))`, note: `odd composite` },
        { input: `1`, output: `None`, note: `not classifiable` },
      ],
    },
    overview: {
      whatYouBuild:
        'A function that classifies a number: None for inputs <= 1, otherwise a Result that is Ok(n) for primes, Err(Even) for even numbers, or Err(Divider(d)) with the smallest odd divider.',
      inputOutput: 'Input: a usize. Output: Option<Result<usize, PrimeErr>>. 2 -> Some(Ok(2)); 14 -> Some(Err(Even)); 9 -> Some(Err(Divider(3))); 1 -> None.',
      constraints: ['<= 1 returns None.', 'Even numbers (except 2) return Err(Even).', 'Otherwise return the smallest odd divider, or Ok(n) if prime.', 'Should be reasonably optimized (check to the square root).'],
      commonMistakes: ['Forgetting the None case for <= 1.', 'Treating 2 as Even.', 'Scanning all numbers instead of stopping at the square root.'],
    },
    officialDescription: `## prime_checker

Create a function prime_checker that takes a usize and checks if it is prime.

The result is None if the argument is <= 1. Otherwise it returns a Result: Ok(usize) if prime, or Err(PrimeErr). PrimeErr is Even if the number is a multiple of two, or Divider(usize) where the usize is the smallest divider.

### Expected items

~~~
#[derive(PartialEq, Eq, Debug)]
pub enum PrimeErr { Even, Divider(usize) }

pub fn prime_checker(nb: usize) -> Option<Result<usize, PrimeErr>>
~~~

### Usage

prime_checker(2) = Some(Ok(2)), prime_checker(14) = Some(Err(Even)), prime_checker(2147483647) = Some(Ok(2147483647)).`,
    objectives: {
      learn: ['Combine Option and Result in one return type.', 'Model errors with an enum.', 'Optimize a primality test to the square root.'],
      whyExists: 'A rich exercise in nested Option/Result modelling and efficient looping.',
      rustSkills: ['Option', 'Result', 'enums', 'algorithms'],
    },
    conceptIds: ['option', 'result', 'enums', 'error_handling'],
    conceptNotes: {
      option: 'The outer Option encodes "out of range" (<= 1) as None.',
      result: 'The inner Result is Ok(prime) or Err(PrimeErr).',
      enums: 'PrimeErr carries the failure reason (Even or the divider).',
    },
    similar: {
      title: 'Classify even/odd/zero',
      prompt: 'Write a function returning an enum Sign { Zero, Even, Odd } describing a usize. Practices enum returns and branching.',
      starter: `pub enum Sign { Zero, Even, Odd }
pub fn classify(n: usize) -> Sign {
    todo!()
}`,
      hint: 'match on n == 0, then n % 2.',
      concepts: ['enums', 'pattern_matching'],
      solution: `pub enum Sign { Zero, Even, Odd }
pub fn classify(n: usize) -> Sign {
    if n == 0 { Sign::Zero } else if n % 2 == 0 { Sign::Even } else { Sign::Odd }
}`,
    },
    sideQuiz: [
      {
        kind: 'choice',
        prompt: 'What is the correct return type for prime_checker?',
        options: [
          'Option<Result<usize, PrimeErr>>',
          'Result<usize, PrimeErr>',
          'Option<usize>',
          'Result<Option<usize>, PrimeErr>',
        ],
        correct: [0],
        why: [
          'None for <= 1, otherwise a Result(Ok/Err) — an Option wrapping a Result.',
          'Misses the None (<= 1) case.',
          'Cannot express the Even/Divider error.',
          'The nesting is backwards: <= 1 is the Option layer, not the Result layer.',
        ],
        hints: ['Two layers: in-range? then prime?', 'Outer Option, inner Result.'],
        explanation: 'The <= 1 case is None; everything else is a Result, so the type is Option<Result<usize, PrimeErr>>.',
        whatYouLearned: 'Nest Option and Result to model two independent outcomes.',
        conceptId: 'option',
      },
      {
        prompt: 'Reject the out-of-range inputs. Fill the value returned for nb <= 1.',
        template: `if nb <= 1 {
    return _____;
}`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: ['<= 1 is not classified as prime or not.', 'Return None.'],
        explanation: 'Per the spec, inputs of 1 or less return None (outside the prime question).',
        whatYouLearned: 'None marks an input outside the meaningful range.',
        conceptId: 'option',
      },
      {
        prompt: 'Report an even number. Fill the value for a multiple of two (after handling 2).',
        template: `if nb % 2 == 0 {
    return Some(Err(PrimeErr::_____));
}`,
        accepted: ['Even'],
        acceptedPatterns: ['^Even$'],
        hints: ['The variant for multiples of two.', 'PrimeErr::Even.'],
        explanation: 'Even numbers greater than 2 fail with Err(PrimeErr::Even).',
        whatYouLearned: 'Enum variants name each failure reason.',
        conceptId: 'enums',
      },
      {
        kind: 'choice',
        prompt: 'What does prime_checker(9) return?',
        options: ['Some(Err(Divider(3)))', 'Some(Err(Even))', 'Some(Ok(9))', 'None'],
        correct: [0],
        why: [
          '9 is odd and divisible by 3 — the smallest divider is 3.',
          '9 is odd, not even.',
          '9 is not prime (3 * 3).',
          '9 is greater than 1, so not None.',
        ],
        hints: ['9 is odd; what divides it?', '3 * 3 = 9.'],
        explanation: '9 is odd, and the first odd divisor found is 3, so it returns Some(Err(PrimeErr::Divider(3))).',
        whatYouLearned: 'The smallest divider is the first odd factor found.',
        conceptId: 'result',
      },
      {
        kind: 'bug',
        prompt: 'This primality loop is slow and can mis-handle 2. Click the inefficiency in the bound.',
        code: `let mut i = 3;
while i < nb {
    if nb % i == 0 { return Some(Err(PrimeErr::Divider(i))); }
    i += 2;
}`,
        bugs: [{ line: 2, token: 'nb' }],
        hints: ['How far do you really need to check divisors?', 'A divisor pairs with one below the square root.'],
        explanation: 'Scanning while i < nb is O(n). Stop at the square root: while i * i <= nb. (The spec asks for an optimized solution.)',
        whatYouLearned: 'Bound divisor checks by the square root for efficiency.',
        conceptId: 'error_handling',
      },
    ],
    documentation: {
      apis: [
        { name: 'Option<Result<T, E>>', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'nested outcome type' },
        { name: 'enum with data', url: 'https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html', note: 'PrimeErr::Divider(usize)' },
        { name: 'Rem (%)', url: 'https://doc.rust-lang.org/std/ops/trait.Rem.html', note: 'divisibility test' },
      ],
      links: [
        { title: 'Rust By Example — Result', url: 'https://doc.rust-lang.org/rust-by-example/error/result.html' },
        { title: 'The Book — Enums', url: 'https://doc.rust-lang.org/book/ch06-00-enums.html' },
      ],
      videos: [{ title: "Use and Understand Rust's Result Type", channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=s7z_sdPBwFg' }],
    },
    editorHints: [
      'Return None for nb <= 1; handle 2 as the only even prime.',
      'Reject other even numbers with Err(PrimeErr::Even).',
      'Scan odd divisors only up to the square root; the first one found is Divider(i), else Ok(nb).',
    ],
  },

  profanity_filter: {
    expectedIO: {
      input: `message: &str`,
      output: `Result<&str, &str>`,
      behavior: `Ok(message) if the message is clean; Err("ERROR: illegal") if it contains a banned word or is empty.`,
      examples: [
        { input: `"hello there"`, output: `Ok("hello there")` },
        { input: `"you are stupid"`, output: `Err("ERROR: illegal")`, note: `contains profanity` },
        { input: `""`, output: `Err("ERROR: illegal")`, note: `empty message` },
      ],
    },
    overview: {
      whatYouBuild: 'A message validator that returns the text on success or an error string when the message is empty or contains a banned word.',
      inputOutput: 'Input: a &str message. Output: Result<&str, &str> — Ok(message) or Err("ERROR: illegal").',
      constraints: ['Empty input -> Err("ERROR: illegal").', 'Contains "stupid" -> Err("ERROR: illegal").', 'Otherwise Ok(message).'],
      commonMistakes: ['Panicking instead of returning an Err.', 'Mismatching the exact error text.', 'Forgetting the empty-string case.'],
    },
    officialDescription: `## profanity_filter

Create a function check_ms that takes a &str and returns Result<&str, &str>.

- Return Err("ERROR: illegal") if the input is empty.
- Return Err("ERROR: illegal") if the input contains the word "stupid".
- Otherwise return Ok(message).

### Expected function

~~~
pub fn check_ms(message: &str) -> Result<&str, &str>
~~~

### Usage

check_ms("hello there") = Ok("hello there"), check_ms("") = Err("ERROR: illegal"), check_ms("you are stupid") = Err("ERROR: illegal").`,
    objectives: {
      learn: ['Return Result instead of panicking.', 'Test substrings with contains.', 'Branch into Ok/Err.'],
      whyExists: 'A clean introduction to recoverable errors via Result.',
      rustSkills: ['Result', 'string search', 'error handling'],
    },
    conceptIds: ['result', 'error_handling'],
    conceptNotes: {
      result: 'Ok carries the valid message; Err carries the rejection reason.',
      error_handling: 'Validation returns an Err value rather than panicking.',
    },
    similar: {
      title: 'Non-empty validator',
      prompt: 'Write a function that returns Ok(name) if a name is non-empty, else Err("empty"). Same Result branching.',
      starter: `pub fn check_name(name: &str) -> Result<&str, &str> {
    todo!()
}`,
      hint: 'if name.is_empty() { Err("empty") } else { Ok(name) }',
      concepts: ['result', 'error_handling'],
      solution: `pub fn check_name(name: &str) -> Result<&str, &str> {
    if name.is_empty() { Err("empty") } else { Ok(name) }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Detect the banned word. Fill the method that tests for a substring.',
        template: `if message.is_empty() || message._____("stupid") {
    return Err("ERROR: illegal");
}`,
        accepted: ['contains'],
        acceptedPatterns: ['^contains$'],
        hints: ['You want to know if a substring is present.', 'str has contains().'],
        explanation: 'contains("stupid") is true when the banned word appears anywhere in the message.',
        whatYouLearned: 'str::contains tests for a substring.',
        conceptId: 'result',
      },
      {
        prompt: 'On success, return the message. Fill the Result variant.',
        template: `_____(message)`,
        accepted: ['Ok'],
        acceptedPatterns: ['^Ok$'],
        hints: ['Success is the Ok side.', 'Wrap the message in Ok.'],
        explanation: 'A valid message is returned as Ok(message).',
        whatYouLearned: 'Ok(value) is the success side of a Result.',
        conceptId: 'result',
      },
      {
        kind: 'choice',
        prompt: 'What does check_ms("") return?',
        options: ['Err("ERROR: illegal")', 'Ok("")', 'None', 'a panic'],
        correct: [0],
        why: [
          'Empty input is explicitly rejected with the error string.',
          'Empty is not Ok.',
          'The function returns Result, not Option.',
          'It returns an Err value, it does not panic.',
        ],
        hints: ['Empty input is one of the rejection cases.', 'It returns an Err, not Ok.'],
        explanation: 'The empty string triggers the first guard, returning Err("ERROR: illegal").',
        whatYouLearned: 'Handle the empty-input edge case explicitly.',
        conceptId: 'error_handling',
      },
      {
        kind: 'bug',
        prompt: 'This validator crashes instead of reporting an error. Click the mistake.',
        code: `if message.contains("stupid") {
    panic!("ERROR: illegal");
}
Ok(message)`,
        bugs: [{ line: 2, token: 'panic' }],
        hints: ['The function returns a Result for a reason.', 'Errors should be values, not crashes.'],
        explanation: 'panic! aborts the program; a banned word should instead return Err("ERROR: illegal") so the caller can handle it.',
        whatYouLearned: 'Return Err values; reserve panic for unrecoverable bugs.',
        conceptId: 'error_handling',
      },
    ],
    documentation: {
      apis: [
        { name: 'str::contains', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.contains', note: 'detect the banned word' },
        { name: 'str::is_empty', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.is_empty', note: 'reject empty input' },
        { name: 'Result', url: 'https://doc.rust-lang.org/std/result/enum.Result.html', note: 'Ok / Err return' },
      ],
      links: [
        { title: 'The Book — Recoverable errors with Result', url: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html' },
        { title: 'Rust By Example — Result', url: 'https://doc.rust-lang.org/rust-by-example/error/result.html' },
      ],
    },
    editorHints: [
      'Reject empty input and any message containing "stupid".',
      'Both rejections return Err("ERROR: illegal") (exact text).',
      'Otherwise return Ok(message).',
    ],
  },

  insertion_sort: {
    expectedIO: {
      input: `slice: &mut [i32], steps: usize`,
      output: `()  // sorts the slice in place`,
      behavior: `Runs exactly 'steps' iterations of insertion sort on the slice, mutating it in place (steps = len-1 fully sorts it).`,
      examples: [
        { input: `[5, 3, 7, 2, 1, 6, 8, 4], steps = 1`, output: `[3, 5, 7, 2, 1, 6, 8, 4]`, note: `one pass` },
        { input: `[5, 3, 7, 2, 1, 6, 8, 4], steps = 7`, output: `[1, 2, 3, 4, 5, 6, 7, 8]`, note: `len-1 → fully sorted` },
      ],
    },
    overview: {
      whatYouBuild: 'An in-place insertion sort that runs only up to a given number of passes — allowing partial or full sorting.',
      inputOutput: 'Input: &mut [i32] and a steps count. Effect: the slice is sorted in place by up to `steps` outer passes.',
      constraints: ['Sort in place (mutable slice).', 'Run at most `steps` passes (and at most len-1).', 'Each pass inserts one more element into the sorted left part.'],
      commonMistakes: ['Running more passes than `steps`.', 'Index underflow when shifting at the front.', 'Returning a new Vec instead of mutating in place.'],
    },
    officialDescription: `## insertion_sort

Implement insertion_sort on a mutable slice of i32, running iterations of the algorithm up to the number indicated by steps.

Insertion sort takes each element (from index 1) and shifts it left past any larger neighbours until it is in order. The steps parameter limits how many outer iterations run, so the array may be partially or fully sorted.

### Expected function

~~~
pub fn insertion_sort(slice: &mut [i32], steps: usize)
~~~

### Usage

With steps = 1 on [5, 3, 7, 2, 1, 6, 8, 4] -> [3, 5, 7, 2, 1, 6, 8, 4]; with steps = 7 the array is fully sorted.`,
    objectives: {
      learn: ['Mutate a slice in place.', 'Implement insertion sort.', 'Bound the work by a parameter.'],
      whyExists: 'Implementing a sort by hand builds core algorithmic understanding and in-place mutation skills.',
      rustSkills: ['mutable slices', 'sorting', 'loops'],
    },
    conceptIds: ['sorting', 'references'],
    conceptNotes: {
      sorting: 'Insertion sort grows a sorted prefix one element at a time.',
      references: 'A &mut [i32] lets the function reorder the caller\'s data in place.',
    },
    similar: {
      title: 'One bubble pass',
      prompt: 'Write a function that performs a single bubble-sort pass over a &mut [i32] (swap adjacent out-of-order pairs once). Same in-place swap idea.',
      starter: `pub fn bubble_pass(slice: &mut [i32]) {
    todo!()
}`,
      hint: 'for i in 0..slice.len().saturating_sub(1) { if slice[i] > slice[i+1] { slice.swap(i, i+1); } }',
      concepts: ['sorting', 'references'],
      solution: `pub fn bubble_pass(slice: &mut [i32]) {
    for i in 0..slice.len().saturating_sub(1) {
        if slice[i] > slice[i + 1] { slice.swap(i, i + 1); }
    }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Shift an element left into place. Fill the call that swaps neighbours.',
        template: `while j > 0 && slice[j - 1] > slice[j] {
    slice._____(j - 1, j);
    j -= 1;
}`,
        accepted: ['swap'],
        acceptedPatterns: ['^swap$'],
        hints: ['Slices have a method to exchange two indices.', 'slice.swap(a, b).'],
        explanation: 'swap(j-1, j) moves the element one position left while it is smaller than its left neighbour.',
        whatYouLearned: 'slice::swap exchanges two elements in place.',
        conceptId: 'sorting',
      },
      {
        prompt: 'Limit the passes. Fill the bound so we never exceed the slice or `steps`.',
        template: `let limit = steps.min(slice.len()._____(1));`,
        accepted: ['saturating_sub'],
        acceptedPatterns: ['^saturating_sub$'],
        hints: ['len - 1 could underflow on an empty slice.', 'Use saturating_sub(1).'],
        explanation: 'saturating_sub(1) yields len-1 without underflowing to a huge usize when the slice is empty.',
        whatYouLearned: 'saturating_sub avoids unsigned underflow.',
        conceptId: 'references',
      },
      {
        kind: 'choice',
        prompt: 'After insertion_sort(&mut [5,3,7,2,1,6,8,4], 1), what is the array?',
        options: ['[3, 5, 7, 2, 1, 6, 8, 4]', '[1, 2, 3, 4, 5, 6, 7, 8]', '[3, 5, 2, 7, 1, 6, 8, 4]', 'unchanged'],
        correct: [0],
        why: [
          'One pass inserts index 1 (the 3) before the 5; the rest is untouched.',
          'That is the fully sorted result (needs more passes).',
          'Only the first two elements change on pass 1.',
          'Pass 1 does change the array.',
        ],
        hints: ['steps = 1 does a single outer pass.', 'Only element at index 1 is inserted.'],
        explanation: 'The first pass moves the 3 left past the 5, giving [3, 5, 7, ...]; later elements wait for later passes.',
        whatYouLearned: 'Each pass places exactly one more element.',
        conceptId: 'sorting',
      },
      {
        kind: 'order',
        prompt: 'Assemble insertion_sort. One fragment does not belong.',
        scaffold: `pub fn insertion_sort(slice: &mut [i32], steps: usize) {
    [ slot 1 ]
    [ slot 2 ]
}`,
        fragments: [
          'let limit = steps.min(slice.len().saturating_sub(1));',
          'for i in 1..=limit { let mut j = i; while j > 0 && slice[j - 1] > slice[j] { slice.swap(j - 1, j); j -= 1; } }',
        ],
        distractors: ['slice.sort();'],
        hints: ['Compute the pass limit, then run the bounded insertion loop.', 'slice.sort() would ignore the steps parameter.'],
        explanation: 'First clamp the number of passes, then run insertion sort for that many outer iterations. slice.sort() is a distractor — it ignores steps.',
        whatYouLearned: 'A bounded loop gives partial sorting controlled by a parameter.',
        conceptId: 'sorting',
      },
    ],
    documentation: {
      apis: [
        { name: 'slice::swap', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.swap', note: 'exchange two elements' },
        { name: 'usize::saturating_sub', url: 'https://doc.rust-lang.org/std/primitive.usize.html#method.saturating_sub', note: 'safe len - 1' },
        { name: 'Ord::min', url: 'https://doc.rust-lang.org/std/cmp/trait.Ord.html#method.min', note: 'clamp the pass count' },
      ],
      links: [
        { title: 'Insertion sort (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Insertion_sort' },
        { title: 'The Book — Slices', url: 'https://doc.rust-lang.org/book/ch04-03-slices.html' },
      ],
      videos: [{ title: 'Crust of Rust: Sorting Algorithms', channel: 'Jon Gjengset', url: 'https://www.youtube.com/watch?v=h4RkCyJyXmM' }],
    },
    editorHints: [
      'Sort in place through the &mut slice — do not return a new Vec.',
      'Run at most `steps` outer passes (and at most len-1).',
      'Each pass shifts one element left with slice.swap until it is in order.',
    ],
  },

  matrix_determinant: {
    expectedIO: {
      input: `matrix: [[isize; 3]; 3]`,
      output: `isize`,
      behavior: `Returns the determinant of the 3x3 matrix.`,
      examples: [
        { input: `[[1, 2, 3], [4, 5, 6], [7, 8, 10]]`, output: `-3` },
        { input: `[[2, 0, 0], [0, 3, 0], [0, 0, 4]]`, output: `24`, note: `diagonal → product` },
        { input: `[[1, 0, 0], [0, 1, 0], [0, 0, 1]]`, output: `1`, note: `identity` },
      ],
    },
    overview: {
      whatYouBuild: 'A function that computes the determinant of a 3x3 integer matrix by cofactor expansion along the top row.',
      inputOutput: 'Input: [[isize; 3]; 3]. Output: the determinant as isize. The example matrix gives 35.',
      constraints: ['Use cofactor expansion (or the rule of Sarrus).', 'Mind the alternating + - + signs.', 'A 2x2 determinant is a*d - b*c.'],
      commonMistakes: ['Getting the cofactor signs wrong (the middle term is subtracted).', 'Picking the wrong minor elements.'],
    },
    officialDescription: `## matrix_determinant

Create a function that receives a 3x3 matrix ([[isize; 3]; 3]) and returns its determinant.

A 2x2 determinant |a b / c d| is a*d - b*c. For a 3x3 matrix, expand along the top row: a*det(minor of a) - b*det(minor of b) + c*det(minor of c).

### Expected function

~~~
pub fn matrix_determinant(matrix: [[isize; 3]; 3]) -> isize
~~~

### Example

The determinant of [[1, 2, 4], [2, -1, 3], [4, 0, 1]] is 35.`,
    objectives: {
      learn: ['Index a 2-D array.', 'Apply cofactor expansion.', 'Track the alternating signs.'],
      whyExists: 'Connects nested indexing with a real linear-algebra formula.',
      rustSkills: ['arrays', 'arithmetic', 'algorithms'],
    },
    conceptIds: ['matrices', 'recursion'],
    conceptNotes: {
      matrices: 'm[row][col] indexes the grid; the determinant combines 2x2 minors.',
      recursion: 'A 3x3 determinant is defined in terms of 2x2 determinants — the same idea generalizes recursively.',
    },
    similar: {
      title: '2x2 determinant',
      prompt: 'Write det2(m: [[isize; 2]; 2]) -> isize returning a*d - b*c. This is the building block of the 3x3 case.',
      starter: `pub fn det2(m: [[isize; 2]; 2]) -> isize {
    todo!()
}`,
      hint: 'm[0][0]*m[1][1] - m[0][1]*m[1][0]',
      concepts: ['matrices'],
      solution: `pub fn det2(m: [[isize; 2]; 2]) -> isize {
    m[0][0] * m[1][1] - m[0][1] * m[1][0]
}`,
    },
    sideQuiz: [
      {
        prompt: 'Fill the 2x2 determinant of the minor for the top-left element a (rows 1-2, cols 1-2).',
        template: `let a_term = m[0][0] * (_____);`,
        accepted: ['m[1][1] * m[2][2] - m[1][2] * m[2][1]'],
        acceptedPatterns: ['^m\\[1\\]\\[1\\]\\s*\\*\\s*m\\[2\\]\\[2\\]\\s*-\\s*m\\[1\\]\\[2\\]\\s*\\*\\s*m\\[2\\]\\[1\\]$'],
        hints: ['Delete a\'s row (0) and column (0); the minor is rows 1-2, cols 1-2.', 'Its determinant is e*i - f*h.'],
        explanation: 'The minor for a excludes row 0 and column 0, leaving [[e,f],[h,i]] whose determinant is m[1][1]*m[2][2] - m[1][2]*m[2][1].',
        whatYouLearned: 'A cofactor uses the 2x2 determinant of the remaining minor.',
        conceptId: 'matrices',
      },
      {
        kind: 'choice',
        prompt: 'Cofactor expansion along the top row uses which sign pattern?',
        options: ['+ - +', '+ + +', '- + -', '+ - + - (four terms)'],
        correct: [0],
        why: [
          'For a 3x3, the top-row cofactors alternate plus, minus, plus.',
          'The middle term must be subtracted.',
          'The first term is positive, not negative.',
          'A 3x3 row has three terms, not four.',
        ],
        hints: ['The signs alternate starting with +.', 'Three columns → three signs.'],
        explanation: 'Expanding along row 0: +a*minor - b*minor + c*minor.',
        whatYouLearned: 'Cofactor signs alternate + - + along a row.',
        conceptId: 'matrices',
      },
      {
        kind: 'bug',
        prompt: 'The middle term has the wrong sign. Click the mistake.',
        code: `m[0][0] * (m[1][1]*m[2][2] - m[1][2]*m[2][1])
    + m[0][1] * (m[1][0]*m[2][2] - m[1][2]*m[2][0])
    + m[0][2] * (m[1][0]*m[2][1] - m[1][1]*m[2][0])`,
        bugs: [{ line: 2, token: '+' }],
        hints: ['Remember the + - + pattern.', 'The b term should be subtracted.'],
        explanation: 'The second (b) cofactor must be subtracted: change the leading + on line 2 to a minus.',
        whatYouLearned: 'The middle cofactor is negated.',
        conceptId: 'matrices',
      },
    ],
    documentation: {
      apis: [
        { name: 'Arrays [[T; N]; M]', url: 'https://doc.rust-lang.org/std/primitive.array.html', note: 'fixed-size 2-D matrix' },
        { name: 'isize', url: 'https://doc.rust-lang.org/std/primitive.isize.html', note: 'signed result' },
      ],
      links: [
        { title: 'Determinant (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Determinant' },
        { title: 'Rust By Example — Arrays', url: 'https://doc.rust-lang.org/rust-by-example/primitives/array.html' },
      ],
    },
    editorHints: [
      'Expand along the top row: a*minor - b*minor + c*minor.',
      'Each minor is a 2x2 determinant (e*i - f*h form).',
      'Watch the alternating + - + signs.',
    ],
  },

  order_books: {
    expectedIO: {
      input: `writer: &mut Writer  (Writer.books: Vec<Book { title, year }>)`,
      output: `()  // sorts writer.books in place`,
      behavior: `Sorts the writer's books alphabetically by title (case-insensitive), in place.`,
      examples: [
        { input: `["Nineteen Eighty-Four", "Animal Farm", "Burmese Days"]`, output: `["Animal Farm", "Burmese Days", "Nineteen Eighty-Four"]` },
        { input: `["banana", "Apple"]`, output: `["Apple", "banana"]`, note: `case-insensitive` },
      ],
    },
    overview: {
      whatYouBuild: 'A function that sorts a writer\'s list of books alphabetically by title, case-insensitively, in place.',
      inputOutput: 'Input: &mut Writer (which owns a Vec<Book>). Effect: writer.books is sorted by title, ignoring case.',
      constraints: ['Sort in place via sort_by.', 'Comparison must be case-insensitive.', 'Order by the book title.'],
      commonMistakes: ['Sorting case-sensitively (uppercase sorts before lowercase).', 'Returning a new Vec instead of mutating in place.'],
    },
    officialDescription: `## order_books

Given a Writer that owns a Vec of Book (each Book has a title and a year), implement order_books to sort the writer's books alphabetically by title, case-insensitively, in place.

### Expected function

~~~
pub fn order_books(writer: &mut Writer)
~~~

### Behavior

After sorting, titles appear in case-insensitive alphabetical order (e.g. Hamlet, MacBeth, Othelo, Romeo and Juliet).`,
    objectives: {
      learn: ['Sort a Vec with sort_by and a comparator closure.', 'Compare strings case-insensitively.', 'Mutate data behind a &mut reference.'],
      whyExists: 'Teaches custom sorting with closures over struct fields.',
      rustSkills: ['sorting', 'closures', 'structs'],
    },
    conceptIds: ['sorting', 'closures', 'structs'],
    conceptNotes: {
      sorting: 'sort_by orders elements using a comparator you provide.',
      closures: 'The comparator closure compares the two books\' titles.',
    },
    similar: {
      title: 'Sort names case-insensitively',
      prompt: 'Sort a Vec<String> of names alphabetically ignoring case, in place. Same sort_by + to_lowercase comparator.',
      starter: `pub fn sort_names(names: &mut Vec<String>) {
    todo!()
}`,
      hint: 'names.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()))',
      concepts: ['sorting', 'closures'],
      solution: `pub fn sort_names(names: &mut Vec<String>) {
    names.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()));
}`,
    },
    sideQuiz: [
      {
        prompt: 'Sort the books by title, ignoring case. Fill the comparator body.',
        template: `writer.books.sort_by(|a, b| {
    _____
});`,
        accepted: ['a.title.to_lowercase().cmp(&b.title.to_lowercase())'],
        acceptedPatterns: ['^a\\.title\\.to_lowercase\\(\\)\\.cmp\\(&b\\.title\\.to_lowercase\\(\\)\\)$'],
        hints: ['Compare the lowercased titles.', 'Use a.title.to_lowercase().cmp(&b.title.to_lowercase()).'],
        explanation: 'cmp returns an Ordering; comparing lowercased titles makes the sort case-insensitive.',
        whatYouLearned: 'sort_by with a comparator orders by any key you choose.',
        conceptId: 'sorting',
      },
      {
        kind: 'choice',
        prompt: 'Why lowercase both titles before comparing?',
        options: [
          'so "apple" and "Apple" sort together (case-insensitive)',
          'to make the sort faster',
          'because cmp does not work on String',
          'to remove punctuation',
        ],
        correct: [0],
        why: [
          'Raw comparison puts all uppercase before lowercase; lowercasing both removes that bias.',
          'It is about ordering, not speed.',
          'cmp works fine on String; the issue is case.',
          'Lowercasing does not remove punctuation.',
        ],
        hints: ['ASCII uppercase sorts before lowercase.', 'Normalize case for a fair comparison.'],
        explanation: 'Without lowercasing, "Zebra" would sort before "apple"; lowercasing both gives true alphabetical order.',
        whatYouLearned: 'Normalize keys for case-insensitive ordering.',
        conceptId: 'sorting',
      },
      {
        kind: 'bug',
        prompt: 'This sort is case-sensitive. Click the change needed (the call that should lowercase).',
        code: `writer.books.sort_by(|a, b| {
    a.title.cmp(&b.title)
});`,
        bugs: [{ line: 2, token: 'cmp' }],
        hints: ['Titles must compare without case.', 'Lowercase both sides before cmp.'],
        explanation: 'Comparing raw titles is case-sensitive; lowercase both first: a.title.to_lowercase().cmp(&b.title.to_lowercase()).',
        whatYouLearned: 'Apply to_lowercase() to both keys for a case-insensitive sort.',
        conceptId: 'sorting',
      },
    ],
    documentation: {
      apis: [
        { name: 'slice::sort_by', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.sort_by', note: 'sort with a comparator' },
        { name: 'str::to_lowercase', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.to_lowercase', note: 'case-insensitive key' },
        { name: 'Ord::cmp', url: 'https://doc.rust-lang.org/std/cmp/trait.Ord.html#tymethod.cmp', note: 'returns an Ordering' },
      ],
      links: [
        { title: 'The Book — Closures', url: 'https://doc.rust-lang.org/book/ch13-01-closures.html' },
        { title: 'std::cmp::Ordering', url: 'https://doc.rust-lang.org/std/cmp/enum.Ordering.html' },
      ],
      videos: [{ title: 'Closures in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=kZXJvLfjUS4' }],
    },
    editorHints: [
      'Use writer.books.sort_by(|a, b| ...) to sort in place.',
      'Compare a.title.to_lowercase() with b.title.to_lowercase().',
      'cmp on the lowercased titles gives case-insensitive order.',
    ],
  },

  rot21: {
    expectedIO: {
      input: `input: &str`,
      output: `String`,
      behavior: `Caesar cipher shifting each letter forward by 21 (a → v); case is preserved and non-letters are left unchanged.`,
      examples: [
        { input: `"a"`, output: `"v"` },
        { input: `"MISS"`, output: `"HDNN"`, note: `uppercase preserved` },
        { input: `"rot21 works!"`, output: `"mjo21 rjmfn!"`, note: `digits/punctuation unchanged` },
      ],
    },
    overview: {
      whatYouBuild: 'A ROT cipher that rotates each ASCII letter 21 positions forward in the alphabet, leaving non-letters unchanged and preserving case.',
      inputOutput: 'Input: a &str. Output: a String with letters shifted by 21. "MISS" -> "HDNN".',
      constraints: ['Only ASCII letters are shifted.', 'Wrap around with modulo 26.', 'Preserve case; pass non-letters through unchanged.'],
      commonMistakes: ['Forgetting to wrap with % 26.', 'Using the wrong base (\'a\' vs \'A\').', 'Shifting non-letter characters.'],
    },
    officialDescription: `## rot21

Implement rot21, which rotates each letter of the input 21 positions to the right in the alphabet, leaving non-letter characters unchanged and preserving case.

### Function signature

~~~
pub fn rot21(input: &str) -> String
~~~

### Examples

'a' -> 'v', "MISS" -> "HDNN", "Testing numbers 1 2 3" -> "Oznodib iphwzmn 1 2 3".`,
    objectives: {
      learn: ['Map over characters.', 'Do modular arithmetic on letter offsets.', 'Preserve case and non-letters.'],
      whyExists: 'A classic cipher that drills character arithmetic and modulo wrap-around.',
      rustSkills: ['chars', 'arithmetic', 'iterators'],
    },
    conceptIds: ['iterators', 'parsing'],
    conceptNotes: {
      iterators: 'chars().map(...).collect() transforms each character into the result String.',
      parsing: 'Each letter is converted to a 0..26 offset, shifted, and converted back.',
    },
    similar: {
      title: 'ROT13',
      prompt: 'Implement rot13 (shift letters by 13). Identical structure to rot21 with a different shift.',
      starter: `pub fn rot13(input: &str) -> String {
    todo!()
}`,
      hint: 'For a lowercase c: (((c as u8 - b\'a\' + 13) % 26) + b\'a\') as char.',
      concepts: ['iterators', 'parsing'],
      solution: `pub fn rot13(input: &str) -> String {
    input.chars().map(|c| {
        if c.is_ascii_lowercase() { (((c as u8 - b'a' + 13) % 26) + b'a') as char }
        else if c.is_ascii_uppercase() { (((c as u8 - b'A' + 13) % 26) + b'A') as char }
        else { c }
    }).collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Shift a lowercase letter by 21 with wrap-around. Fill the modulus.',
        template: `(((c as u8 - b'a' + 21) % _____) + b'a') as char`,
        accepted: ['26'],
        acceptedPatterns: ['^26$'],
        hints: ['How many letters in the alphabet?', 'Wrap with % 26.'],
        explanation: '% 26 keeps the shifted offset within the 26-letter alphabet, wrapping past z back to a.',
        whatYouLearned: 'Modulo wraps an index back into range.',
        conceptId: 'parsing',
      },
      {
        kind: 'choice',
        prompt: 'What does rot21("a") produce?',
        options: ["\"v\"", "\"u\"", "\"b\"", "\"a\""],
        correct: [0],
        why: [
          "a is index 0; 0 + 21 = 21, which is 'v'.",
          "u is index 20, one short.",
          "b would be a shift of 1, not 21.",
          "a unchanged would be a shift of 0 or 26.",
        ],
        hints: ["'a' is offset 0.", '0 + 21 = 21 → the 22nd letter.'],
        explanation: "'a' has offset 0; (0 + 21) % 26 = 21, which maps to 'v'.",
        whatYouLearned: 'Letter arithmetic uses 0-based offsets from the base letter.',
        conceptId: 'parsing',
      },
      {
        kind: 'bug',
        prompt: 'Uppercase letters come out wrong here. Click the mistake.',
        code: `else if c.is_ascii_uppercase() {
    (((c as u8 - b'a' + 21) % 26) + b'A') as char
}`,
        bugs: [{ line: 2, token: "b'a'" }],
        hints: ['Uppercase offsets must be measured from the uppercase base.', "Check the subtraction base."],
        explanation: "For uppercase letters subtract b'A', not b'a'; otherwise the offset is wrong (the gap between 'A' and 'a' is 32).",
        whatYouLearned: 'Anchor letter arithmetic to the correct case base.',
        conceptId: 'parsing',
      },
    ],
    documentation: {
      apis: [
        { name: 'char::is_ascii_lowercase', url: 'https://doc.rust-lang.org/std/primitive.char.html#method.is_ascii_lowercase', note: 'detect letters to shift' },
        { name: 'Iterator::map', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.map', note: 'transform each char' },
        { name: 'as casts (char/u8)', url: 'https://doc.rust-lang.org/rust-by-example/types/cast.html', note: 'char <-> byte arithmetic' },
      ],
      links: [
        { title: 'ROT13 (Wikipedia)', url: 'https://en.wikipedia.org/wiki/ROT13' },
        { title: 'Rust By Example — Casting', url: 'https://doc.rust-lang.org/rust-by-example/types/cast.html' },
      ],
    },
    editorHints: [
      'map over input.chars() and collect into a String.',
      'For each letter, subtract the case base, add 21, take % 26, add the base back.',
      'Leave non-letters unchanged.',
    ],
  },

  display_table: {
    expectedIO: {
      input: `Table { headers, body }  built via new() / add_row()`,
      output: `Display — a bordered ASCII table`,
      behavior: `Implement Display to render a centered, bordered table; an empty table prints nothing.`,
      examples: [
        { input: `headers ["Name","Age"]; rows ["Bob","30"], ["Alexa","7"]`, output: `| Name  | Age |\n|-------+-----|\n|  Bob  | 30  |\n| Alexa |  7  |` },
        { input: `Table::new()  (empty)`, output: ``, note: `empty → prints nothing` },
      ],
    },
    overview: {
      whatYouBuild: 'A Table type whose Display prints a bordered, column-aligned table: a header row, a separator, and centered data cells whose columns auto-size to the widest content.',
      inputOutput: 'Building blocks: Table::new(), add_row(&[String]); printing with {} produces the formatted table (nothing for an empty table).',
      constraints: ['Each column width = its widest cell.', 'Center text in each cell (offset one left when not exact).', 'Use pipe delimiters and a dash/plus separator.', 'Print nothing when empty.'],
      commonMistakes: ['Not sizing columns to the widest cell.', 'Using println! inside fmt instead of write!.', 'Off-by-one in the centering padding.'],
    },
    officialDescription: `## display_table

Implement a Table (headers + body rows) and its Display so that printing it shows a formatted table:

- A header row and the data rows, separated by pipes, with text centered in each cell.
- A separator line of dashes and plus signs.
- Column widths adjust to the longest element in each column.
- When centering is not exact, offset the text one position to the left.
- Print nothing when the table has no data.

### Expected items

~~~
pub struct Table { pub headers: Vec<String>, pub body: Vec<Vec<String>> }
impl std::fmt::Display for Table { ... }
~~~`,
    objectives: {
      learn: ['Implement Display for a complex layout.', 'Compute per-column widths.', 'Center and pad strings.'],
      whyExists: 'A demanding formatting exercise combining Display, iterators, and string padding.',
      rustSkills: ['Display', 'iterators', 'string formatting'],
    },
    conceptIds: ['display_trait', 'iterators', 'collections'],
    conceptNotes: {
      display_trait: 'write!/writeln! emit each line into the formatter.',
      iterators: 'map + max compute column widths; map + join build each row.',
    },
    similar: {
      title: 'Column widths',
      prompt: 'Given headers and rows (Vec<Vec<String>>), write a function returning a Vec<usize> of each column\'s maximum width. This is the sizing step display_table needs.',
      starter: `pub fn col_widths(headers: &[String], body: &[Vec<String>]) -> Vec<usize> {
    todo!()
}`,
      hint: 'Start widths from header lengths, then take the max with each cell length.',
      concepts: ['iterators', 'collections'],
      solution: `pub fn col_widths(headers: &[String], body: &[Vec<String>]) -> Vec<usize> {
    let mut w: Vec<usize> = headers.iter().map(|h| h.len()).collect();
    for row in body {
        for (i, c) in row.iter().enumerate() { w[i] = w[i].max(c.len()); }
    }
    w
}`,
    },
    sideQuiz: [
      {
        prompt: 'A column is as wide as its widest cell. Fill the update that grows the width.',
        template: `for (i, cell) in row.iter().enumerate() {
    widths[i] = widths[i]._____(cell.len());
}`,
        accepted: ['max'],
        acceptedPatterns: ['^max$'],
        hints: ['Keep the larger of the current width and this cell.', 'usize has a max() method.'],
        explanation: 'widths[i].max(cell.len()) keeps each column at least as wide as its widest cell.',
        whatYouLearned: 'Fold a maximum across values with max().',
        conceptId: 'collections',
      },
      {
        kind: 'choice',
        prompt: 'Inside Display::fmt, how should each line be emitted?',
        options: ['writeln!(f, ...)', 'println!(...)', 'print!(...)', 'format!(...) then drop it'],
        correct: [0],
        why: [
          'writeln! writes a line into the formatter f (what Display must do).',
          'println! goes to stdout, not the formatter.',
          'print! also targets stdout.',
          'format! builds a String but never writes it to f.',
        ],
        hints: ['Display writes into f.', 'You also want a trailing newline per row.'],
        explanation: 'writeln!(f, ...) appends a formatted line to the formatter, which is what printing the Table uses.',
        whatYouLearned: 'Use write!/writeln! into the formatter inside fmt.',
        conceptId: 'display_trait',
      },
      {
        kind: 'bug',
        prompt: 'This Display prints to the wrong place. Click the mistake.',
        code: `fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    println!("{}", self.headers.join(" | "));
    Ok(())
}`,
        bugs: [{ line: 2, token: 'println' }],
        hints: ['Output must go into f.', 'Swap the macro.'],
        explanation: 'println! writes to stdout and ignores f; use writeln!(f, ...) so the text becomes the Table\'s Display output.',
        whatYouLearned: 'fmt must write into the formatter, never to stdout.',
        conceptId: 'display_trait',
      },
    ],
    documentation: {
      apis: [
        { name: 'std::fmt::Display', url: 'https://doc.rust-lang.org/std/fmt/trait.Display.html', note: 'custom {} output' },
        { name: 'write! / writeln!', url: 'https://doc.rust-lang.org/std/macro.writeln.html', note: 'emit lines into the formatter' },
        { name: 'str::repeat', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.repeat', note: 'build padding and separators' },
        { name: 'slice::join', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.join', note: 'join cells with delimiters' },
      ],
      links: [
        { title: 'Rust By Example — Display', url: 'https://doc.rust-lang.org/rust-by-example/hello/print/print_display.html' },
        { title: 'std::fmt module', url: 'https://doc.rust-lang.org/std/fmt/' },
      ],
      videos: [{ title: 'Traits in Rust', channel: 'Tensor Programming', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A' }],
    },
    editorHints: [
      'First compute each column width as the max of its header and cell lengths.',
      'Center each value in its column; put the extra space on the right when padding is odd.',
      'Emit rows and a dash/plus separator with writeln!(f, ...); print nothing if empty.',
    ],
  },

  filter_table: {
    expectedIO: {
      input: `&self + a closure: filter_col(|h| ...) / filter_row(col_name, |v| ...)`,
      output: `Option<Table>`,
      behavior: `filter_col keeps the columns whose header passes the closure; filter_row keeps the rows whose value in a named column passes it. Returns None when nothing matches.`,
      examples: [
        { input: `table.filter_col(|h| h == "Name")`, output: `Some(Table { headers: ["Name"], body: [["Adam"], ["Adamaris"], ["Ackerley"]] })` },
        { input: `table.filter_row("Last Name", |v| v == "Philips")`, output: `Some(Table { headers: ["Name", "Last Name", "ID Number"], body: [["Adam", "Philips", "123456789"], ["Ackerley", "Philips", "123456789"]] })` },
        { input: `table.filter_col(|h| h == "Nope")`, output: `None`, note: `no match → None` },
      ],
    },
    overview: {
      whatYouBuild: 'A Table you can filter two ways: filter_col keeps the columns whose header passes a closure; filter_row keeps the rows whose value in a named column passes a closure. Both return Option<Table>.',
      inputOutput: 'Table::new(); add_row(&[String]); filter_col(|header| ...) -> Option<Table> (keep matching columns); filter_row(col_name, |cell| ...) -> Option<Table> (keep matching rows). None when nothing matches.',
      constraints: ['filter_col and filter_row each take a closure (Fn(&str) -> bool).', 'Return Some(table) on a match, None when nothing matches (or the column name is missing).', 'Build a new Table; do not mutate the original.'],
      commonMistakes: ['Declaring the predicate as a bare type T instead of a generic F: Fn(&str) -> bool (the starter ships with the bare T — fix it).', 'Returning an empty Table instead of None when nothing matches.', 'Confusing filter_col (filters columns by header) with filter_row (filters rows by a cell).'],
    },
    officialDescription: `## filter_table

Build a Table (headers + body rows) with new() and add_row, then implement two filters:

- filter_col keeps only the columns whose header satisfies the predicate.
- filter_row keeps only the rows whose value in the named column satisfies the predicate.

Each predicate is a closure taking a &str and returning a bool, and each method returns Option<Table> (None when nothing matches, or when the column name is not found).

### Expected items

~~~
#[derive(Clone, Debug, PartialEq)]
pub struct Table { pub headers: Vec<String>, pub body: Vec<Vec<String>> }
impl Table {
    pub fn new() -> Table
    pub fn add_row(&mut self, row: &[String])
    pub fn filter_col<F: Fn(&str) -> bool>(&self, filter: F) -> Option<Self>
    pub fn filter_row<F: Fn(&str) -> bool>(&self, col_name: &str, filter: F) -> Option<Self>
}
~~~`,
    objectives: {
      learn: ['Accept a closure as a generic parameter (F: Fn(&str) -> bool).', 'Project/filter rows and columns with iterators.', 'Return Option to signal "no match".'],
      whyExists: 'Practices closures-as-parameters, iterator filtering over structured data, and Option results.',
      rustSkills: ['closures', 'iterators', 'generics', 'Option'],
    },
    conceptIds: ['iterators', 'closures', 'collections'],
    conceptNotes: {
      iterators: 'filter_row: body.iter().filter(|row| filter(&row[idx])).cloned().collect(). filter_col projects each row down to the kept column indexes.',
      closures: 'The predicate is any Fn(&str) -> bool, passed as a generic F so any closure works.',
    },
    similar: {
      title: 'Keep even numbers',
      prompt: 'Given a &[i32], return a Vec<i32> of just the even values. Same iter().filter().collect() shape.',
      starter: `pub fn evens(v: &[i32]) -> Vec<i32> {
    todo!()
}`,
      hint: 'v.iter().filter(|&&n| n % 2 == 0).copied().collect()',
      concepts: ['iterators', 'closures'],
      solution: `pub fn evens(v: &[i32]) -> Vec<i32> {
    v.iter().filter(|&&n| n % 2 == 0).copied().collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'filter_col takes any closure that tests a &str. Fill its generic bound.',
        template: `pub fn filter_col<F: _____>(&self, filter: F) -> Option<Self> {`,
        accepted: ['Fn(&str) -> bool'],
        acceptedPatterns: ['^Fn\\(&str\\)\\s*->\\s*bool$'],
        hints: ['It is called as filter(header), passing a &str.', 'A closure from &str to bool: Fn(&str) -> bool.'],
        explanation: 'The predicate is any Fn(&str) -> bool, so the method is generic over F: Fn(&str) -> bool.',
        whatYouLearned: 'Accept a closure as a generic parameter bounded by an Fn trait.',
        conceptId: 'closures',
      },
      {
        kind: 'choice',
        prompt: 'What does filter_col(|h| h == "Name") return?',
        options: [
          'Some(table) with only the columns whose header passes the predicate',
          'Some(table) with only the rows that contain "Name"',
          'the index of the matching column',
          'a Vec of the headers',
        ],
        correct: [0],
        why: [
          'filter_col keeps the columns whose header matches and projects every row down to them.',
          'Filtering rows is filter_row\'s job, not filter_col.',
          'It returns a whole Table (in an Option), not an index.',
          'It returns Option<Table>, not a Vec.',
        ],
        hints: ['_col filters columns, _row filters rows.', 'The predicate is tested against each header.'],
        explanation: 'filter_col selects columns by header; filter_row selects rows by a named column. Both return Option<Table>.',
        whatYouLearned: 'Distinguish column filtering (by header) from row filtering (by cell).',
        conceptId: 'iterators',
      },
      {
        kind: 'bug',
        prompt: 'Nothing matched, but this still returns a table. Click the mistake.',
        code: `if idxs.is_empty() {
    return Some(Table::new());
}`,
        bugs: [{ line: 2, token: 'Some' }],
        hints: ['The signature returns Option for a reason.', 'No match should be None.'],
        explanation: 'When nothing matches, return None — not Some(empty). The Option lets callers detect "no result".',
        whatYouLearned: 'Use None to signal "no match" instead of an empty success value.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'Closures as parameters (Fn)', url: 'https://doc.rust-lang.org/book/ch13-01-closures.html', note: 'F: Fn(&str) -> bool' },
        { name: 'Iterator::filter', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter', note: 'keep matching rows' },
        { name: 'Option', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'Some(table) / None' },
      ],
      links: [
        { title: 'Rust By Example — Iterators', url: 'https://doc.rust-lang.org/rust-by-example/trait/iter.html' },
        { title: 'The Book — Closures', url: 'https://doc.rust-lang.org/book/ch13-01-closures.html' },
      ],
    },
    editorHints: [
      'Give filter_col/filter_row a generic closure bound: <F: Fn(&str) -> bool> (the starter has a bare T that will not compile).',
      'filter_col keeps columns whose header passes the closure; filter_row keeps rows whose named-column cell passes it.',
      'Return None when nothing matches (or the column name is missing); otherwise Some(new_table).',
    ],
  },

  flat_tree: {
    expectedIO: {
      input: `tree: &BTreeSet<T>`,
      output: `Vec<T>`,
      behavior: `Returns the set's elements as a sorted Vec (a BTreeSet already iterates in sorted order).`,
      examples: [
        { input: `BTreeSet::from([34, 0, 9, 30])`, output: `[0, 9, 30, 34]` },
        { input: `BTreeSet::from(["Slow", "kill", "will", "Horses"])`, output: `["Horses", "Slow", "kill", "will"]`, note: `uppercase sorts first` },
        { input: `BTreeSet::from([3, 3, 1])`, output: `[1, 3]`, note: `set drops duplicates` },
      ],
    },
    overview: {
      whatYouBuild: 'A generic function that flattens a BTreeSet into a sorted Vec of its elements.',
      inputOutput: 'Input: &BTreeSet<T>. Output: Vec<T> in sorted order. {34,0,9,30} -> [0,9,30,34].',
      constraints: ['A BTreeSet is already sorted — iterate it in order.', 'Return owned values (the bound T: ToOwned<Owned = T> lets you clone each).'],
      commonMistakes: ['Trying to sort manually (the set is already ordered).', 'Returning references instead of owned values.'],
    },
    officialDescription: `## flat_tree

Implement flatten_tree, which takes a reference to a std::collections::BTreeSet and returns a fresh Vec containing the tree's elements in sorted order.

### Expected function

~~~
pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T>
~~~

### Usage

flatten_tree(&BTreeSet::from([34, 0, 9, 30])) = [0, 9, 30, 34].`,
    objectives: {
      learn: ['Iterate a BTreeSet (sorted order).', 'Convert borrowed items to owned with to_owned.', 'Use a generic with a trait bound.'],
      whyExists: 'Introduces ordered sets and generic functions with trait bounds.',
      rustSkills: ['BTreeSet', 'generics', 'iterators'],
    },
    conceptIds: ['collections', 'iterators', 'generics'],
    conceptNotes: {
      collections: 'A BTreeSet keeps elements sorted, so iteration yields them in order.',
      generics: 'The bound T: ToOwned<Owned = T> lets the function clone each element into the Vec.',
    },
    similar: {
      title: 'Set to sorted Vec of i32',
      prompt: 'Write a non-generic function that turns a &BTreeSet<i32> into a sorted Vec<i32>. Same iterate-and-collect idea.',
      starter: `use std::collections::BTreeSet;
pub fn to_vec(set: &BTreeSet<i32>) -> Vec<i32> {
    todo!()
}`,
      hint: 'set.iter().copied().collect()',
      concepts: ['collections', 'iterators'],
      solution: `use std::collections::BTreeSet;
pub fn to_vec(set: &BTreeSet<i32>) -> Vec<i32> {
    set.iter().copied().collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Turn each borrowed element into an owned one. Fill the method.',
        template: `tree.iter().map(|x| x._____()).collect()`,
        accepted: ['to_owned'],
        acceptedPatterns: ['^to_owned$'],
        hints: ['iter() yields &T, but the Vec needs T.', 'The bound gives you to_owned().'],
        explanation: 'to_owned() converts &T into an owned T (the bound T: ToOwned<Owned = T> guarantees it), so collect() can build a Vec<T>.',
        whatYouLearned: 'to_owned() produces an owned value from a reference.',
        conceptId: 'generics',
      },
      {
        kind: 'choice',
        prompt: 'What does flatten_tree(&BTreeSet::from([34, 0, 9, 30])) return?',
        options: ['[0, 9, 30, 34]', '[34, 0, 9, 30]', '[34, 30, 9, 0]', 'an unsorted Vec'],
        correct: [0],
        why: [
          'A BTreeSet stores elements sorted, so iteration is ascending.',
          'Insertion order is not preserved by a set.',
          'That is descending; BTreeSet iterates ascending.',
          'It is sorted, because the set is ordered.',
        ],
        hints: ['BTreeSet keeps its elements ordered.', 'Iteration is ascending.'],
        explanation: 'BTreeSet is an ordered set, so iterating it yields sorted values: [0, 9, 30, 34].',
        whatYouLearned: 'BTreeSet iteration is already sorted — no extra sort needed.',
        conceptId: 'collections',
      },
      {
        kind: 'bug',
        prompt: 'This does redundant (and wrong) work. Click the unnecessary call.',
        code: `let mut v: Vec<T> = tree.iter().map(|x| x.to_owned()).collect();
v.sort();`,
        bugs: [{ line: 2, token: 'sort' }],
        hints: ['Where do the elements come from?', 'A BTreeSet is already ordered.'],
        explanation: 'The elements are already sorted by the BTreeSet, so the extra v.sort() is unnecessary (and would also require T: Ord).',
        whatYouLearned: 'Do not re-sort data that is already ordered.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'BTreeSet', url: 'https://doc.rust-lang.org/std/collections/struct.BTreeSet.html', note: 'ordered set' },
        { name: 'ToOwned', url: 'https://doc.rust-lang.org/std/borrow/trait.ToOwned.html', note: 'borrowed -> owned' },
        { name: 'Iterator::collect', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect', note: 'build the Vec' },
      ],
      links: [
        { title: 'The Book — Generic types and traits', url: 'https://doc.rust-lang.org/book/ch10-00-generics.html' },
        { title: 'std::collections', url: 'https://doc.rust-lang.org/std/collections/' },
      ],
    },
    editorHints: [
      'A BTreeSet iterates in sorted order — no manual sorting needed.',
      'Map each &T to an owned value with to_owned().',
      'collect() into the Vec<T>.',
    ],
  },

  brackets_matching: {
    expectedIO: {
      input: `s: &str`,
      output: `bool`,
      behavior: `True when every (), [], {} is correctly matched and nested; any other character is ignored.`,
      examples: [
        { input: `"(a[b]{c})"`, output: `true` },
        { input: `"(]"`, output: `false`, note: `mismatched pair` },
        { input: `"((("`, output: `false`, note: `unclosed` },
      ],
    },
    overview: {
      whatYouBuild: 'A command-line program that, for each argument, prints "OK" if its brackets are correctly matched/nested, otherwise "Error". Non-bracket characters are ignored.',
      inputOutput: 'Args: any number of strings. For each, print OK or Error. No arguments -> print nothing.',
      constraints: ['Match (), [], {} — an opener must close with its own kind.', 'Ignore all non-bracket characters.', 'A string with no brackets is OK.'],
      commonMistakes: ['Not checking that the popped opener matches the closer type.', 'Forgetting the empty-stack case on a closer.', 'Not handling "no arguments" (print nothing).'],
    },
    officialDescription: `## brackets_matching

Create a program that takes any number of command-line arguments. For each argument, print "OK" if the expression is correctly bracketed, otherwise "Error".

All characters are ignored except the brackets (), [], {}. An opening bracket must be closed by the matching closing bracket. A string with no brackets is correctly bracketed. With no arguments, print nothing.

Use std::env::args() to read the arguments.

### Usage

~~~
$ cargo run '(johndoe)'
OK
$ cargo run '([)]'
Error
~~~`,
    objectives: {
      learn: ['Use a Vec as a stack.', 'Match closers to the correct opener.', 'Read and loop over CLI arguments.'],
      whyExists: 'The canonical stack problem; also practices argv handling.',
      rustSkills: ['stack (Vec)', 'pattern matching', 'CLI args'],
    },
    conceptIds: ['collections', 'pattern_matching', 'cli_args'],
    conceptNotes: {
      collections: 'A Vec<char> stack remembers the open brackets seen so far.',
      pattern_matching: 'A match routes each character to push, pop-and-check, or ignore.',
    },
    similar: {
      title: 'Balanced parentheses',
      prompt: 'Write balanced(s: &str) -> bool that checks only round parentheses () using a counter (no other bracket types). A simpler version of the stack idea.',
      starter: `pub fn balanced(s: &str) -> bool {
    todo!()
}`,
      hint: 'Keep a depth counter; +1 on (, -1 on ); fail if it goes negative; OK if it ends at 0.',
      concepts: ['pattern_matching'],
      solution: `pub fn balanced(s: &str) -> bool {
    let mut depth = 0i32;
    for c in s.chars() {
        if c == '(' { depth += 1; }
        else if c == ')' { depth -= 1; if depth < 0 { return false; } }
    }
    depth == 0
}`,
    },
    sideQuiz: [
      {
        prompt: 'Remember each opener. Fill the action for an opening bracket.',
        template: `match c {
    '(' | '[' | '{' => stack._____(c),
    // closers handled below
    _ => {}
}`,
        accepted: ['push'],
        acceptedPatterns: ['^push$'],
        hints: ['Put the opener on the stack.', 'Vec::push.'],
        explanation: 'Each opening bracket is pushed so a later closer can check it.',
        whatYouLearned: 'A stack records the still-open brackets.',
        conceptId: 'collections',
      },
      {
        prompt: 'A closer must match the most recent opener. Fill the check for ")".',
        template: `')' => if stack.pop() != _____ { return false; },`,
        accepted: ["Some('(')"],
        acceptedPatterns: ["^Some\\('\\('\\)$"],
        hints: ['pop() returns an Option.', 'It must be Some with the matching opener.'],
        explanation: 'pop() returns the last opener (or None if empty); for ")" it must be Some(\'(\'), else the string is unbalanced.',
        whatYouLearned: 'Match each closer to the correct opener via the popped value.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'What should "([)]" print, and why?',
        options: [
          'Error, because ")" tries to close "[" (wrong type)',
          'OK, because every bracket has a partner',
          'Error, because there are too many brackets',
          'OK, because the counts are equal',
        ],
        correct: [0],
        why: [
          'After ( [ the next is ), which would close [, but [ needs ] — mismatch.',
          'Counts being equal is not enough; nesting must match.',
          'The count is fine; the nesting is wrong.',
          'Equal counts do not guarantee correct nesting.',
        ],
        hints: ['Brackets must close in the right order.', 'Can ) close [ ?'],
        explanation: '"([)]" is interleaved: ) tries to close [, which is invalid, so it prints Error.',
        whatYouLearned: 'Correct bracketing needs proper nesting, not just equal counts.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'This balance check ignores the bracket TYPE. Click the mistake.',
        code: `')' => if stack.pop().is_none() { return false; },
']' => if stack.pop().is_none() { return false; },`,
        bugs: [{ line: 1, token: 'is_none' }],
        hints: ['A ) must close a ( specifically.', 'is_none only checks the stack is non-empty.'],
        explanation: 'is_none() only verifies something was open, not that it was the right kind. Compare the popped value to the matching opener, e.g. != Some(\'(\').',
        whatYouLearned: 'Check the popped opener\'s type, not just that one exists.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'order',
        prompt: 'Assemble is_balanced. One fragment does not belong.',
        scaffold: `fn is_balanced(s: &str) -> bool {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
}`,
        fragments: [
          'let mut stack: Vec<char> = Vec::new();',
          "for c in s.chars() { match c { '(' | '[' | '{' => stack.push(c), ')' => if stack.pop() != Some('(') { return false; }, ']' => if stack.pop() != Some('[') { return false; }, '}' => if stack.pop() != Some('{') { return false; }, _ => {} } }",
          'stack.is_empty()',
        ],
        distractors: ['return s.len() % 2 == 0;'],
        hints: ['Make a stack, scan characters pushing/popping, then check nothing is left open.', 'An even length does not prove balance.'],
        explanation: 'Create the stack, push openers and match closers as you scan, then balanced means the stack is empty. The length-parity fragment is a distractor.',
        whatYouLearned: 'Stack scan + empty-at-end is the bracket-matching algorithm.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'Vec::push / Vec::pop', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.pop', note: 'use a Vec as a stack' },
        { name: 'std::env::args', url: 'https://doc.rust-lang.org/std/env/fn.args.html', note: 'read the arguments' },
        { name: 'match', url: 'https://doc.rust-lang.org/book/ch06-02-match.html', note: 'route each character' },
      ],
      links: [
        { title: 'The Book — Command line arguments', url: 'https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html' },
        { title: 'Vec as a stack', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html' },
      ],
      videos: [{ title: 'Build a Rust CLI — Command Line Arguments', channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=_T4sE6NEcV0' }],
    },
    editorHints: [
      'Use a Vec<char> as a stack; push openers, pop on closers.',
      'A closer must pop its matching opener — check the type, not just non-empty.',
      'Balanced means the stack is empty at the end; ignore non-bracket characters.',
    ],
  },

  brain_fuck: {
    expectedIO: {
      input: `code: &str  (Brainfuck source)`,
      output: `String  (whatever the program prints)`,
      behavior: `Interpret the Brainfuck program over a byte tape and return its output. Cells wrap on overflow; '.' emits the current cell as an ASCII char.`,
      examples: [
        { input: `"++++++++[>++++++++<-]>+++++++++."`, output: `"I"`, note: `cell = 73 = 'I'` },
        { input: `"+++++[>+++++++++++++<-]>."`, output: `"A"`, note: `5 x 13 = 65 = 'A'` },
        { input: `"+++"`, output: `""`, note: `no '.' → no output` },
      ],
    },
    overview: {
      whatYouBuild: 'A Brainfuck interpreter: an array of 2048 bytes and a data pointer, executing the program given as the first command-line argument.',
      inputOutput: 'Arg: Brainfuck source (guaranteed valid). Effect: runs it, printing bytes via the "." command.',
      constraints: ['Tape of 2048 bytes, all starting at 0.', 'Commands: > < + - . [ ]; all other characters are comments.', '[ and ] loop while the current cell is non-zero.'],
      commonMistakes: ['Not matching nested [ ] when jumping.', 'Forgetting byte wrap-around (use wrapping_add/sub).', 'Off-by-one in the program counter after a jump.'],
    },
    officialDescription: `## brain_fuck

Build a Brainfuck interpreter using an array of 2048 bytes and a memory pointer. The program is the first command-line argument (guaranteed valid).

Commands:

- > and < move the pointer right and left
- + and - increment and decrement the current byte
- . outputs the current byte as an ASCII character
- [ and ] form a loop that runs while the current byte is non-zero
- all other characters are comments

### Behavior

Running the classic program prints "Hello World!".`,
    objectives: {
      learn: ['Scan and interpret commands with state.', 'Manage a tape, a data pointer, and a program counter.', 'Match nested loop brackets.'],
      whyExists: 'A complete (if tiny) interpreter — the capstone of parsing and stateful iteration.',
      rustSkills: ['parsing', 'arrays', 'control flow', 'CLI args'],
    },
    conceptIds: ['parsing', 'collections', 'cli_args'],
    conceptNotes: {
      parsing: 'The interpreter scans the source once, reacting to each command and jumping for loops.',
      collections: 'A fixed [u8; 2048] tape holds the memory cells.',
    },
    similar: {
      title: 'Run + and - only',
      prompt: 'Write a function that takes a string of only + and - and returns the resulting byte value (starting from 0, wrapping). A mini-interpreter for two commands.',
      starter: `pub fn run_pm(src: &str) -> u8 {
    todo!()
}`,
      hint: 'Fold over chars: + => wrapping_add(1), - => wrapping_sub(1).',
      concepts: ['parsing'],
      solution: `pub fn run_pm(src: &str) -> u8 {
    let mut cell = 0u8;
    for c in src.chars() {
        match c { '+' => cell = cell.wrapping_add(1), '-' => cell = cell.wrapping_sub(1), _ => {} }
    }
    cell
}`,
    },
    sideQuiz: [
      {
        prompt: 'Increment the current cell, wrapping past 255. Fill the method.',
        template: `'+' => tape[ptr] = tape[ptr]._____(1),`,
        accepted: ['wrapping_add'],
        acceptedPatterns: ['^wrapping_add$'],
        hints: ['A byte must wrap from 255 back to 0.', 'Use wrapping_add(1).'],
        explanation: 'wrapping_add(1) increments the byte and wraps 255 -> 0, which is how Brainfuck cells behave.',
        whatYouLearned: 'wrapping_add/sub model byte overflow without panicking.',
        conceptId: 'parsing',
      },
      {
        kind: 'choice',
        prompt: 'What does the "." command do?',
        options: [
          'output the current byte as an ASCII character',
          'move the pointer right',
          'increment the current byte',
          'start a loop',
        ],
        correct: [0],
        why: [
          '"." prints the current cell as a character.',
          '">" moves the pointer right.',
          '"+" increments the byte.',
          '"[" starts a loop.',
        ],
        hints: ['It is the only output command.', 'Think print.'],
        explanation: 'The "." command outputs the byte at the pointer interpreted as ASCII.',
        whatYouLearned: 'Each Brainfuck symbol maps to one tiny operation.',
        conceptId: 'parsing',
      },
      {
        kind: 'bug',
        prompt: 'The "[" handler ignores nested brackets when skipping. Click the part that should track nesting.',
        code: `'[' => if tape[ptr] == 0 {
    while code[pc] != ']' { pc += 1; }
},`,
        bugs: [{ line: 2, token: ']' }],
        hints: ['What if there is a "[" inside the loop body?', 'You must count depth, not stop at the first "]".'],
        explanation: 'Stopping at the first "]" breaks on nested loops; instead track a depth counter, increasing on "[" and decreasing on "]", until it returns to zero.',
        whatYouLearned: 'Matching nested brackets requires a depth counter.',
        conceptId: 'parsing',
      },
      {
        kind: 'order',
        prompt: 'Order the steps of the interpreter\'s main loop body for one command. One fragment does not belong.',
        scaffold: `// inside: while pc < code.len() {
    [ slot 1 ]
    [ slot 2 ]
// }`,
        fragments: [
          "match code[pc] { '>' => ptr += 1, '<' => ptr -= 1, '+' => tape[ptr] = tape[ptr].wrapping_add(1), '-' => tape[ptr] = tape[ptr].wrapping_sub(1), '.' => print!(\"{}\", tape[ptr] as char), '[' => {/* skip if zero */}, ']' => {/* jump back if non-zero */}, _ => {} }",
          'pc += 1;',
        ],
        distractors: ['tape = [0u8; 2048];'],
        hints: ['Handle the current command, then advance the program counter.', 'Re-initializing the tape inside the loop would erase memory.'],
        explanation: 'Each iteration dispatches on the current command, then advances pc. Re-creating the tape inside the loop is a distractor — it would wipe memory every step.',
        whatYouLearned: 'Interpret-then-advance is the heart of a bytecode/loop interpreter.',
        conceptId: 'parsing',
      },
    ],
    documentation: {
      apis: [
        { name: 'u8::wrapping_add / wrapping_sub', url: 'https://doc.rust-lang.org/std/primitive.u8.html#method.wrapping_add', note: 'byte cells wrap' },
        { name: 'arrays [u8; N]', url: 'https://doc.rust-lang.org/std/primitive.array.html', note: 'the 2048-byte tape' },
        { name: 'std::env::args', url: 'https://doc.rust-lang.org/std/env/fn.args.html', note: 'read the source program' },
        { name: 'print! macro', url: 'https://doc.rust-lang.org/std/macro.print.html', note: 'output a byte as a char' },
      ],
      links: [
        { title: 'Brainfuck (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Brainfuck' },
        { title: 'The Book — Command line arguments', url: 'https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html' },
      ],
    },
    editorHints: [
      'Keep a [u8; 2048] tape, a data pointer, and a program counter.',
      'match on each command; use wrapping_add/sub for + and -.',
      'For [ and ], scan to the matching bracket using a depth counter (handles nesting).',
    ],
  },
};
