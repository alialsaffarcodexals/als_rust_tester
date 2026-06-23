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

  // -------------------------------------------------------------------------
  // NEW Final-only slugs — full guided content.
  // -------------------------------------------------------------------------
  count_factorial_steps: {
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
    overview: {
      whatYouBuild:
        'A function that multiplies every element of a Matrix by a scalar and returns a new Matrix (scalar multiplication).',
      inputOutput:
        'Input: a Matrix and an i32 multiplier. Output: a new Matrix with each field scaled by the multiplier.',
      constraints: [
        'Return a new Matrix; do not mutate the input.',
        'Every field is multiplied by the same scalar.',
      ],
      commonMistakes: [
        'Multiplying only some fields.',
        'Trying to mutate the moved-in Matrix instead of building a fresh one.',
      ],
    },
    officialDescription: `## matrix_multiplication

Create a function multiply that takes a Matrix and an i32 multiplier and returns a new Matrix in which every element has been multiplied by the scalar.

### Expected function

~~~
pub fn multiply(m: Matrix, multiplier: i32) -> Matrix
~~~

### Usage

Multiplying a matrix by 3 scales each of its elements by 3.`,
    objectives: {
      learn: ['Read struct fields and build a struct literal.', 'Apply the same operation to every field.'],
      whyExists: 'A gentle introduction to structs and returning new values rather than mutating.',
      rustSkills: ['structs', 'arithmetic'],
    },
    conceptIds: ['structs', 'matrices'],
    conceptNotes: {
      structs: 'Access fields with m.a and build a new Matrix { a, b, c, d } literal.',
      matrices: 'Scalar multiplication scales every entry by the same number.',
    },
    similar: {
      title: 'Scale a point',
      prompt: 'Given a struct Point { x: i32, y: i32 }, write scale(p, k) returning a new Point with both fields multiplied by k.',
      starter: `pub struct Point { pub x: i32, pub y: i32 }

pub fn scale(p: Point, k: i32) -> Point {
    todo!()
}`,
      hint: 'Return Point { x: p.x * k, y: p.y * k }.',
      concepts: ['structs'],
      solution: `pub struct Point { pub x: i32, pub y: i32 }

pub fn scale(p: Point, k: i32) -> Point {
    Point { x: p.x * k, y: p.y * k }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Scale one field of the new Matrix. Fill the expression for field a.',
        template: `Matrix {
    a: _____,
    b: m.b * multiplier,
    c: m.c * multiplier,
    d: m.d * multiplier,
}`,
        accepted: ['m.a * multiplier'],
        acceptedPatterns: ['^m\\.a\\s*\\*\\s*multiplier$'],
        hints: ['Read field a with m.a.', 'Multiply it by the scalar.'],
        explanation: 'Each field of the new Matrix is the old field times the multiplier.',
        whatYouLearned: 'Access struct fields with dot notation and build a struct literal.',
        conceptId: 'structs',
      },
      {
        kind: 'choice',
        prompt: 'Why does multiply return a new Matrix instead of editing m in place?',
        options: [
          'm is taken by value and the signature returns a fresh Matrix',
          'Rust cannot multiply integers',
          'Matrices are immutable in Rust',
          'It is faster to allocate a new one',
        ],
        correct: [0],
        why: [
          'The signature consumes m and returns a new Matrix, so we build and return one.',
          'Rust multiplies integers fine.',
          'Nothing is inherently immutable here; it is the API shape.',
          'Performance is not the reason; the contract is.',
        ],
        hints: ['Look at the return type.', 'm is moved in; a new value comes out.'],
        explanation: 'The function signature returns Matrix, so the idiomatic solution constructs and returns a new struct literal.',
        whatYouLearned: 'Follow the signature: return a value rather than mutating an argument.',
        conceptId: 'structs',
      },
      {
        kind: 'bug',
        prompt: 'This scaling forgot something. Click the mistake.',
        code: `Matrix {
    a: m.a * multiplier,
    b: m.b,
    c: m.c * multiplier,
    d: m.d * multiplier,
}`,
        bugs: [{ line: 3, token: 'b' }],
        hints: ['Every field must be scaled.', 'Compare line b to the others.'],
        explanation: 'Field b is copied unscaled; it should be m.b * multiplier like the others.',
        whatYouLearned: 'Apply the operation uniformly to every field.',
        conceptId: 'structs',
      },
    ],
    documentation: {
      apis: [
        { name: 'Struct update / literals', url: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html', note: 'build Matrix { ... }' },
        { name: 'i32 multiplication', url: 'https://doc.rust-lang.org/std/primitive.i32.html', note: 'scale each field' },
      ],
      links: [
        { title: 'The Book — Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html' },
        { title: 'Rust By Example — Structures', url: 'https://doc.rust-lang.org/rust-by-example/custom_types/structs.html' },
      ],
      videos: [{ title: 'Structs in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=n3bPhdiJm9I' }],
    },
    editorHints: [
      'Read each field with m.a, m.b, ...',
      'Build and return a brand-new Matrix literal.',
      'Multiply every field by the same multiplier.',
    ],
  },

  min_and_max: {
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
};
