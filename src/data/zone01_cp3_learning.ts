import type { Cp3LearningContent } from '../types';

// ===========================================================================
// CP3 guided-learning content, keyed by exercise slug.
// Each entry powers the journey tabs: Overview, Official Description, Concepts,
// Similar Practice, Side Quiz, Terminal (CLI only), Walkthrough, Self-Check.
//
// Authoring notes:
//  - officialDescription uses light markdown. Use ~~~ fences for code blocks so
//    Rust code needs no backtick escaping; keep inline code in plain words.
//  - sideQuiz blanks default to the token '_____'; `accepted` lists the valid
//    answers (whitespace-normalized) and `acceptedPatterns` adds regex matches.
//  - terminal is present only for command-line programs (e.g. rpn). Its
//    runnerTemplate is a self-contained reference binary; {{ARGS}} is replaced
//    at runtime with the typed arguments as a Vec<String> literal.
// ===========================================================================

export const zone01Cp3Learning: Record<string, Cp3LearningContent> = {
  // -------------------------------------------------------------------------
  // 99 — rpn  (CLI program, the terminal exemplar)
  // -------------------------------------------------------------------------
  rpn: {
    overview: {
      whatYouBuild:
        'A command-line calculator that evaluates an arithmetic expression written in Reverse Polish Notation (RPN), where each operator comes after its two operands. It reads one argument, computes the result, and prints it — or prints "Error" for any invalid input.',
      inputOutput:
        'Input: exactly one command-line argument, a string of space-separated numbers and operators (e.g. "1 2 * 3 * 4 +"). Output: the numeric result on its own line, or the word "Error" if the expression is invalid or the argument count is wrong.',
      constraints: [
        'Support the five operators: +, -, *, /, and % (modulo).',
        'Operands fit in an i64.',
        'Extra spaces between tokens must be ignored.',
        'Print "Error" (then a newline) for: no argument, more than one argument, an empty expression, an unknown token, or a malformed expression.',
        'Read input with std::env::args().',
      ],
      commonMistakes: [
        'Forgetting the % (modulo) operator.',
        'Popping operands in the wrong order — for "-" and "/" the first popped value is the right-hand operand.',
        'Not checking the stack has two operands before applying an operator.',
        'Not verifying exactly one value remains on the stack at the end (too many operands is an error).',
        'Treating "no argument" and "empty string" as valid.',
      ],
    },
    officialDescription: `## rpn

Write a program which takes a string containing an equation written in Reverse Polish Notation (RPN). It should evaluate the expression, and print the result on the standard output followed by a newline.

- If the expression is not valid, or if there is not exactly one argument, "Error" must be printed on the standard output followed by a newline.

Extra spaces on the expression should be ignored.

Reverse Polish Notation is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.

The following operators must be implemented: +, -, *, / and % (modulo).

All the given operands must fit in an i64.

Examples of formulas converted into RPN:

~~~
3 + 4                 >> 3 4 +
((1 * 2) * 3) - 4     >> 1 2 * 3 * 4 - or 3 1 2 * * 4 -
50 * (5 - (10 / 9))   >> 5 10 9 / - 50 *
~~~

Here is how to evaluate a formula in RPN:

~~~
1 2 * 3 * 4 -
2 3 * 4 -
6 4 -
2
~~~

Use std::env::args() to get the program's arguments.

### Usage

~~~
$ cargo run "1 2 * 3 * 4 +"
10
$ cargo run "1 2 3 4 +"
Error
$ cargo run ""
Error
$ cargo run
Error
$ cargo run "2" "4"
Error
$ cargo run "     1      3 * 2 -"
1
$ cargo run "     1      3 * ksd 2 -"
Error
~~~`,
    objectives: {
      learn: [
        'Read and validate command-line arguments with std::env::args().',
        'Use a Vec as a stack to evaluate an expression.',
        'Branch on tokens with match, including a combined arm for operators.',
        'Model failure with Result and convert it into the required "Error" output.',
      ],
      whyExists:
        'RPN is the classic introduction to stack-based evaluation — the same technique real calculators and virtual machines use. It forces careful input validation and teaches you to think in terms of a stack.',
      rustSkills: ['CLI args', 'Vec / stack', 'match', 'Result', 'parsing', 'error handling'],
    },
    conceptIds: ['cli_args', 'collections', 'pattern_matching', 'error_handling'],
    conceptNotes: {
      collections: 'Here the Vec is used as a stack: push operands, and pop the top two when an operator appears.',
      pattern_matching: 'A single match arm "+" | "-" | "*" | "/" | "%" handles all operators; everything else is treated as a number to parse.',
      error_handling: 'Any invalid step returns Err(()), and main turns that into the printed word "Error".',
    },
    similar: {
      title: 'Balanced brackets checker',
      prompt:
        'Write a function that returns true if every opening bracket in a string has a matching closing bracket in the right order, using a Vec as a stack. Push on "(", pop on ")" — and it is unbalanced if you ever pop an empty stack, or the stack is non-empty at the end. Same stack pattern as RPN, different problem.',
      starter: `pub fn balanced(s: &str) -> bool {
    let mut stack: Vec<char> = Vec::new();
    for c in s.chars() {
        // push on '(', pop on ')'
        todo!()
    }
    stack.is_empty()
}`,
      hint: 'When you see ")", a pop() that returns None means there was no matching "(" — return false immediately.',
      concepts: ['collections', 'pattern_matching'],
      solution: `pub fn balanced(s: &str) -> bool {
    let mut stack: Vec<char> = Vec::new();
    for c in s.chars() {
        match c {
            '(' => stack.push(c),
            ')' => {
                if stack.pop().is_none() {
                    return false;
                }
            }
            _ => {}
        }
    }
    stack.is_empty()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Collect the command-line arguments into a vector of strings.',
        template: `use std::env;

fn main() {
    let args: Vec<String> = _____;
    println!("{}", args.len());
}`,
        accepted: ['env::args().collect()', 'std::env::args().collect()'],
        acceptedPatterns: ['^(std::)?env::args\\(\\)\\.collect\\(\\)$'],
        hints: [
          'std::env::args() gives you an iterator over the arguments.',
          'Turn an iterator into a Vec with .collect(); the Vec<String> annotation tells it which collection to build.',
        ],
        explanation:
          'env::args() yields the arguments as an iterator; .collect() gathers them into the annotated Vec<String>. args[0] is the program name, so real arguments start at index 1.',
        whatYouLearned: 'Reading argv is the entry point of any CLI program.',
        conceptId: 'cli_args',
      },
      {
        prompt: 'There must be exactly one user argument. Fill the condition that detects the wrong count (remember args[0] is the program name).',
        template: `let args: Vec<String> = env::args().collect();
if _____ {
    println!("Error");
    return;
}`,
        accepted: ['args.len() != 2'],
        acceptedPatterns: ['^args\\.len\\(\\)\\s*!=\\s*2$'],
        hints: [
          'args includes the program name at index 0.',
          'One user argument means the length is 2 in total; reject anything else.',
        ],
        explanation:
          'Because args[0] is always the binary name, exactly one user argument means args.len() == 2. Any other count is invalid, so we print "Error".',
        whatYouLearned: 'Validating the argument count up front is essential CLI hygiene.',
        conceptId: 'cli_args',
      },
      {
        prompt: 'An operator pops the top two operands. We popped b first; now pop the second operand a.',
        template: `let b = stack.pop().unwrap();
let a = _____;
let result = a - b;  // order matters: a is the left operand`,
        accepted: ['stack.pop().unwrap()'],
        acceptedPatterns: ['^stack\\.pop\\(\\)\\.unwrap\\(\\)$'],
        hints: [
          'a comes off the same stack as b.',
          'Use the same stack.pop().unwrap() call you used for b.',
        ],
        explanation:
          'The stack is LIFO, so the most recent operand (b, the right-hand side) pops first and the earlier one (a, the left-hand side) pops second. That ordering is what makes a - b and a / b correct.',
        whatYouLearned: 'Pop order determines operand order for non-commutative operators.',
        conceptId: 'collections',
      },
      {
        prompt: 'Complete the modulo arm of the operator match.',
        template: `let result = match token {
    "+" => a + b,
    "-" => a - b,
    "*" => a * b,
    "/" => a / b,
    "%" => _____,
    _ => unreachable!(),
};`,
        accepted: ['a % b'],
        acceptedPatterns: ['^a\\s*%\\s*b$'],
        hints: [
          'Modulo uses the % operator in Rust.',
          'Mirror the other arms: left operand, operator, right operand.',
        ],
        explanation:
          'The % operator computes the remainder of a divided by b. It is required by the spec and easy to forget.',
        whatYouLearned: 'All five operators (+, -, *, /, %) must be handled.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'After processing every token a valid expression leaves exactly one value on the stack. Fill the count to check for.',
        template: `if stack.len() == _____ {
    Ok(stack.pop().unwrap())
} else {
    Err(())
}`,
        accepted: ['1'],
        acceptedPatterns: ['^1$'],
        hints: [
          'How many results should a finished calculation have?',
          'Exactly one number should remain — more means too many operands.',
        ],
        explanation:
          'A well-formed RPN expression collapses to a single value. Zero values (empty input) or more than one (e.g. "1 2 3 4 +") both mean the expression was invalid.',
        whatYouLearned: 'The final stack size validates the whole expression.',
        conceptId: 'error_handling',
      },
    ],
    terminal: {
      programName: 'rpn',
      examples: ['"1 2 * 3 * 4 +"', '"     1      3 * 2 -"', '"1 2 3 4 +"', '""'],
      runnerTemplate: `fn main() {
    let args: Vec<String> = {{ARGS}};
    if args.len() != 2 {
        println!("Error");
        return;
    }
    let expr = args[1].trim();
    if expr.is_empty() {
        println!("Error");
        return;
    }
    match rpn(expr) {
        Ok(result) => println!("{}", result),
        Err(_) => println!("Error"),
    }
}

fn rpn(expr: &str) -> Result<i64, ()> {
    let mut stack: Vec<i64> = Vec::new();
    for token in expr.split_whitespace() {
        match token {
            "+" | "-" | "*" | "/" | "%" => {
                if stack.len() < 2 {
                    return Err(());
                }
                let b = stack.pop().unwrap();
                let a = stack.pop().unwrap();
                let result = match token {
                    "+" => a + b,
                    "-" => a - b,
                    "*" => a * b,
                    "/" => {
                        if b == 0 {
                            return Err(());
                        }
                        a / b
                    }
                    "%" => {
                        if b == 0 {
                            return Err(());
                        }
                        a % b
                    }
                    _ => unreachable!(),
                };
                stack.push(result);
            }
            num => match num.parse::<i64>() {
                Ok(n) => stack.push(n),
                Err(_) => return Err(()),
            },
        }
    }
    if stack.len() == 1 {
        Ok(stack.pop().unwrap())
    } else {
        Err(())
    }
}`,
      explain:
        'std::env::args() always puts the program name at args[0], so your real expression is args[1]. The program trims it, splits on whitespace (which is why extra spaces are ignored), then evaluates it with a stack. Try an invalid expression to see it print "Error".',
    },
  },

  // -------------------------------------------------------------------------
  // 88 — counting_words
  // -------------------------------------------------------------------------
  counting_words: {
    overview: {
      whatYouBuild:
        'A function that counts how many times each word appears in a string and returns the counts in a HashMap, case-insensitively, ignoring punctuation (except an apostrophe inside a word like "it\'s").',
      inputOutput:
        'Input: a &str of text. Output: a HashMap<String, u32> mapping each lowercased word to its number of occurrences.',
      constraints: [
        'Counting is case-insensitive: "HELLO", "Hello" and "hello" are the same word.',
        'Ignore all punctuation except an apostrophe used inside a word (e.g. "it\'s").',
        'Words may be separated by any ASCII whitespace (spaces, tabs, newlines).',
        'Every key in the resulting HashMap must be lowercase.',
      ],
      commonMistakes: [
        'Forgetting to lowercase the word before counting, producing duplicate keys.',
        'Stripping the in-word apostrophe and turning "it\'s" into "its".',
        'Relying on HashMap iteration order (it is intentionally unordered).',
      ],
    },
    officialDescription: `## counting_words

Create a function named counting_words, that receives a &str. It should return each word in the string and the number of times it appears in the string.

Each of the following counts as one single word:

- A number like "0" or "1234".
- A word or letter like "a" or "they".
- Two words joined by a single apostrophe like "it's" or "they're".

Rules:

- The count is case insensitive, so that "HELLO", "Hello", and "hello" are 3 uses of the same word.
- All forms of punctuation are to be ignored, except for the apostrophe when used as in the example above.
- Words can be separated by any form of ASCII whitespace.
- On the resulting HashMap, every word occurrence should be in lowercase.

### Expected function

~~~
fn counting_words(words: &str) -> HashMap<String, u32>
~~~

### Usage

~~~
$ cargo run
{"world": 1, "hello": 1}
{"stop": 2, "batman": 3}
~~~`,
    objectives: {
      learn: [
        'Build and update a HashMap with the entry / or_insert idiom.',
        'Normalize text (lowercase, strip unwanted punctuation) before counting.',
        'Iterate over whitespace-separated tokens.',
      ],
      whyExists:
        'Word frequency counting is the "hello world" of hash maps — it teaches the insert-or-update pattern you will reuse constantly.',
      rustSkills: ['HashMap', 'iterators', 'string handling', 'closures'],
    },
    conceptIds: ['collections', 'iterators', 'closures'],
    conceptNotes: {
      collections: 'The HashMap maps each lowercased word to a u32 count; entry(key).or_insert(0) creates a counter on first sight.',
      iterators: 'split_whitespace() yields the tokens; you then clean and count each one.',
    },
    similar: {
      title: 'Count the vowels',
      prompt:
        'Write a function that returns a HashMap<char, u32> counting how many times each vowel (a, e, i, o, u) appears in a lowercase string. Same entry/or_insert counting pattern, simpler keys.',
      starter: `use std::collections::HashMap;

pub fn count_vowels(s: &str) -> HashMap<char, u32> {
    let mut counts: HashMap<char, u32> = HashMap::new();
    for c in s.chars() {
        // if c is a vowel, bump its counter
        todo!()
    }
    counts
}`,
      hint: 'Check "aeiou".contains(c), then *counts.entry(c).or_insert(0) += 1.',
      concepts: ['collections', 'iterators'],
      solution: `use std::collections::HashMap;

pub fn count_vowels(s: &str) -> HashMap<char, u32> {
    let mut counts: HashMap<char, u32> = HashMap::new();
    for c in s.chars() {
        if "aeiou".contains(c) {
            *counts.entry(c).or_insert(0) += 1;
        }
    }
    counts
}`,
    },
    sideQuiz: [
      {
        prompt: 'Create the empty HashMap that will hold the word counts.',
        template: `use std::collections::HashMap;

let mut counts: HashMap<String, u32> = _____;`,
        accepted: ['HashMap::new()'],
        acceptedPatterns: ['^HashMap::new\\(\\)$'],
        hints: ['Every std collection has a constructor.', 'Use HashMap::new() to start empty.'],
        explanation: 'HashMap::new() creates an empty map; the annotation HashMap<String, u32> fixes the key and value types.',
        whatYouLearned: 'A HashMap is the natural structure for key → count.',
        conceptId: 'collections',
      },
      {
        prompt: 'Lowercase the word so that "Hello" and "hello" count as one.',
        template: `let key = word._____();`,
        accepted: ['to_lowercase'],
        acceptedPatterns: ['^to_lowercase$'],
        hints: ['Strings have a method for case conversion.', 'to_lowercase() returns a new lowercased String.'],
        explanation: 'to_lowercase() normalizes case so different capitalizations map to the same key.',
        whatYouLearned: 'Normalize before you count to avoid duplicate keys.',
        conceptId: 'collections',
      },
      {
        prompt: 'Increment the counter for this key, creating it at 0 if missing.',
        template: `*counts.entry(key)._____(0) += 1;`,
        accepted: ['or_insert'],
        acceptedPatterns: ['^or_insert$'],
        hints: ['The entry API returns whatever is there, or lets you supply a default.', 'or_insert(0) inserts 0 the first time, then returns a mutable reference.'],
        explanation: 'entry(key).or_insert(0) gives a &mut to the count (starting at 0); the leading * dereferences it so += 1 updates the stored value.',
        whatYouLearned: 'entry(...).or_insert(...) is the canonical insert-or-update idiom.',
        conceptId: 'collections',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 93 — reverse_it
  // -------------------------------------------------------------------------
  reverse_it: {
    overview: {
      whatYouBuild:
        'A function that takes a number and returns a string of its digits reversed, immediately followed by the original number. A leading "-" is added when the number is negative.',
      inputOutput:
        'Input: an i32 (e.g. 123 or -123). Output: a String — the reversed digits then the original digits, e.g. 123 -> "321123", -123 -> "-321123".',
      constraints: [
        'Work on the absolute value when reversing the digits.',
        'Prepend a single "-" only for negative inputs.',
        'The original number is appended in its normal (non-reversed) form.',
      ],
      commonMistakes: [
        'Letting the minus sign get caught up in the digit reversal.',
        'Reversing the whole formatted string instead of just the digits.',
        'Forgetting to append the original number after the reversed digits.',
      ],
    },
    officialDescription: `## reverse_it

Create a function named reverse_it, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a "-" should be added to the beginning of the string.

### Expected function

~~~
pub fn reverse_it(v: i32) -> String
~~~

### Usage

~~~
$ cargo run
321123
-321123
~~~`,
    objectives: {
      learn: [
        'Convert a number to a string and back-handle its characters.',
        'Reverse a sequence with the iterator .rev() adapter.',
        'Build a result string with format!.',
      ],
      whyExists:
        'It is a compact drill in string/number conversion and iterator reversal — small but it exercises the core "transform a sequence" muscle.',
      rustSkills: ['iterators', 'string handling', 'formatting'],
    },
    conceptIds: ['iterators', 'display_trait'],
    conceptNotes: {
      iterators: 'chars().rev().collect() reverses the digit characters into a new String.',
      display_trait: 'format! builds the final String the same way println! builds output.',
    },
    similar: {
      title: 'Reverse only the letters',
      prompt:
        'Write a function that returns a new String with the characters of the input reversed. Same chars().rev().collect() pattern as the digit reversal in reverse_it.',
      starter: `pub fn reverse_str(s: &str) -> String {
    // reverse the characters and collect into a String
    todo!()
}`,
      hint: 'Chain s.chars().rev().collect() and annotate the result as String.',
      concepts: ['iterators'],
      solution: `pub fn reverse_str(s: &str) -> String {
    s.chars().rev().collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Take the absolute value so a negative sign does not interfere with reversing the digits.',
        template: `let original = _____.to_string();`,
        accepted: ['v.abs()'],
        acceptedPatterns: ['^v\\.abs\\(\\)$'],
        hints: ['i32 has a method for absolute value.', 'v.abs() strips the sign.'],
        explanation: 'v.abs() gives the magnitude, so reversing works on digits only; the sign is handled separately.',
        whatYouLearned: 'Separate the sign from the digits before transforming them.',
        conceptId: 'iterators',
      },
      {
        prompt: 'Reverse the characters of the digit string.',
        template: `let reversed: String = original.chars()._____.collect();`,
        accepted: ['rev()'],
        acceptedPatterns: ['^rev\\(\\)$'],
        hints: ['Iterators have an adapter that flips order.', 'chars().rev() yields the characters back to front.'],
        explanation: 'chars() makes an iterator of characters, rev() reverses it, and collect() gathers them into a new String.',
        whatYouLearned: '.rev() reverses any double-ended iterator.',
        conceptId: 'iterators',
      },
      {
        prompt: 'Append the original number after the reversed digits.',
        template: `let out = format!("{}{}", reversed, _____);`,
        accepted: ['original'],
        acceptedPatterns: ['^original$'],
        hints: ['The result is reversed digits THEN the original number.', 'Use the original string you built earlier.'],
        explanation: 'format! concatenates the reversed digits and the original digits into the final answer (a "-" is prepended for negatives).',
        whatYouLearned: 'format! is the clean way to assemble a string from parts.',
        conceptId: 'display_trait',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 89 — inv_pyramid
  // -------------------------------------------------------------------------
  inv_pyramid: {
    overview: {
      whatYouBuild:
        'A function that returns the lines of a pyramid built from a repeated string. At level k there are k spaces of indentation followed by the string repeated k times. The pyramid grows from level 1 up to i, then mirrors back down to 1.',
      inputOutput:
        'Input: a String v and a size i (usize). Output: a Vec<String>, one entry per line. The result has 2*i-1 lines: ascending 1..=i then descending i-1..=1.',
      constraints: [
        'At level k: k spaces, then v repeated k times.',
        'Ascend from level 1 to i, then descend from i-1 back to 1.',
        'The result is a Vec<String> — one String per line, no trailing newline characters.',
      ],
      commonMistakes: [
        'Only building the ascending half and forgetting the descending mirror.',
        'Indenting with the wrong number of spaces (it equals the level k).',
        'Repeating the string the wrong number of times — it is also k.',
      ],
    },
    officialDescription: `## inv_pyramid

Write a function inv_pyramid that builds a pyramid from a string.

For each level k, the line is made of k spaces followed by the string v repeated k times. The pyramid ascends from level 1 to level i and then descends from level i-1 back to level 1, producing 2*i-1 lines in total.

### Expected function

~~~
pub fn inv_pyramid(v: String, i: usize) -> Vec<String>
~~~

### Usage

Calling inv_pyramid with a string and a size returns the lines of the pyramid, which the test program prints one per line.`,
    objectives: {
      learn: [
        'Build strings with " ".repeat(k) and v.repeat(k).',
        'Use ranges and .rev() to ascend then descend.',
        'Collect formatted lines into a Vec<String>.',
      ],
      whyExists:
        'It is a focused drill in string building and range iteration — producing structured text output, a common real-world task.',
      rustSkills: ['ranges', 'string repeat', 'format!', 'Vec'],
    },
    conceptIds: ['iterators', 'display_trait', 'collections'],
    conceptNotes: {
      iterators: 'The ranges 1..=i and (1..i).rev() drive the ascending and descending halves.',
      display_trait: 'format!("{}{}", " ".repeat(k), v.repeat(k)) assembles each line.',
    },
    similar: {
      title: 'Left-aligned triangle',
      prompt:
        'Write a function that returns a Vec<String> where line k (for k from 1 to n) contains the character "*" repeated k times. Same repeat-and-collect pattern, just the ascending half.',
      starter: `pub fn triangle(n: usize) -> Vec<String> {
    let mut rows = Vec::new();
    for k in 1..=n {
        // push a line of k stars
        todo!()
    }
    rows
}`,
      hint: 'Use "*".repeat(k) and rows.push(...).',
      concepts: ['iterators', 'display_trait'],
      solution: `pub fn triangle(n: usize) -> Vec<String> {
    let mut rows = Vec::new();
    for k in 1..=n {
        rows.push("*".repeat(k));
    }
    rows
}`,
    },
    sideQuiz: [
      {
        prompt: 'Build one pyramid line: k spaces, then the string v repeated k times.',
        template: `result.push(format!("{}{}", " ".repeat(k), _____));`,
        accepted: ['v.repeat(k)'],
        acceptedPatterns: ['^v\\.repeat\\(k\\)$'],
        hints: ['Strings have a method that repeats them n times.', 'v.repeat(k) gives k copies of v joined together.'],
        explanation: 'At level k the content is the string repeated k times, right after k spaces of indentation.',
        whatYouLearned: 'str::repeat builds repeated text without a manual loop.',
        conceptId: 'display_trait',
      },
      {
        prompt: 'Ascend through the levels 1, 2, ..., i. Fill the range.',
        template: `for k in _____ {
    result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));
}`,
        accepted: ['1..=i'],
        acceptedPatterns: ['^1..=i$'],
        hints: ['You need every level from 1 through i inclusive.', 'An inclusive range uses ..= .'],
        explanation: '1..=i includes both ends, so levels run 1 through i. The exclusive 1..i would stop at i-1.',
        whatYouLearned: 'Inclusive ranges (a..=b) include the upper bound.',
        conceptId: 'iterators',
      },
      {
        prompt: 'Descend the mirror half: levels i-1 down to 1. Fill the reversed range.',
        template: `for k in (1..i)._____ {
    result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));
}`,
        accepted: ['rev()'],
        acceptedPatterns: ['^rev\\(\\)$'],
        hints: ['You want to walk the range backwards.', 'Ranges have a .rev() adapter.'],
        explanation: '(1..i).rev() yields i-1, i-2, ..., 1, mirroring the ascending half to complete the pyramid.',
        whatYouLearned: '.rev() walks a range from high to low.',
        conceptId: 'iterators',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 90 — nextprime
  // -------------------------------------------------------------------------
  nextprime: {
    overview: {
      whatYouBuild:
        'A function that returns the smallest prime number greater than or equal to a given number, using a primality test that only checks divisors up to the square root.',
      inputOutput:
        'Input: a usize nbr. Output: the next prime >= nbr (e.g. next_prime(0) -> 2, next_prime(14) -> 17).',
      constraints: [
        'A prime has no divisors other than 1 and itself; numbers below 2 are not prime.',
        'Only test divisors up to the square root of n (i * i <= n).',
        'If nbr itself is prime, return nbr.',
      ],
      commonMistakes: [
        'Checking divisors all the way to n instead of stopping at the square root.',
        'Treating 0 or 1 as prime.',
        'Off-by-one: starting the search above nbr instead of at nbr.',
      ],
    },
    officialDescription: `## nextprime

Create a function next_prime that returns the next prime number greater than or equal to the given number.

A number is prime if it is at least 2 and has no divisors other than 1 and itself.

### Expected function

~~~
pub fn next_prime(nbr: usize) -> usize
~~~

### Usage

next_prime(0) returns 2, next_prime(7) returns 7, and next_prime(14) returns 17.`,
    objectives: {
      learn: [
        'Write a primality test that stops at the square root.',
        'Use a nested helper function.',
        'Loop until a condition is met.',
      ],
      whyExists:
        'Primality testing is a classic algorithm that teaches loop bounds and the square-root optimization.',
      rustSkills: ['loops', 'helper functions', 'integer math'],
    },
    conceptIds: ['error_handling', 'pattern_matching'],
    conceptNotes: {
      error_handling: 'Here there is no Result — the "validation" is the boolean is_prime check that guards the search.',
    },
    similar: {
      title: 'Count primes below n',
      prompt:
        'Write a function that returns how many prime numbers are strictly less than n. Reuse the same is_prime square-root test inside a counting loop.',
      starter: `pub fn count_primes(n: usize) -> usize {
    fn is_prime(x: usize) -> bool {
        if x < 2 { return false; }
        let mut i = 2;
        while i * i <= x {
            if x % i == 0 { return false; }
            i += 1;
        }
        true
    }
    // count primes in 0..n
    todo!()
}`,
      hint: 'Loop k from 0 to n-1 and increment a counter when is_prime(k).',
      concepts: ['error_handling'],
      solution: `pub fn count_primes(n: usize) -> usize {
    fn is_prime(x: usize) -> bool {
        if x < 2 { return false; }
        let mut i = 2;
        while i * i <= x {
            if x % i == 0 { return false; }
            i += 1;
        }
        true
    }
    (0..n).filter(|&k| is_prime(k)).count()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Numbers below 2 are not prime. Fill the early-return condition.',
        template: `fn is_prime(n: usize) -> bool {
    if _____ {
        return false;
    }
    // ... divisor checks ...
    true
}`,
        accepted: ['n < 2'],
        acceptedPatterns: ['^n\\s*<\\s*2$'],
        hints: ['0 and 1 are not prime.', 'Reject anything less than 2.'],
        explanation: 'The smallest prime is 2, so any n below 2 is immediately not prime.',
        whatYouLearned: 'Handle edge cases before the main loop.',
        conceptId: 'error_handling',
      },
      {
        prompt: 'We only need divisors up to the square root. Fill the loop bound.',
        template: `let mut i = 2;
while _____ {
    if n % i == 0 {
        return false;
    }
    i += 1;
}`,
        accepted: ['i * i <= n'],
        acceptedPatterns: ['^i\\s*\\*\\s*i\\s*<=\\s*n$'],
        hints: ['If n has a divisor, one of them is <= sqrt(n).', 'Compare i*i with n instead of computing a square root.'],
        explanation: 'Any factor larger than sqrt(n) pairs with one smaller than sqrt(n), so checking up to i*i <= n is enough — and much faster than going to n.',
        whatYouLearned: 'The square-root bound makes primality testing efficient.',
        conceptId: 'error_handling',
      },
      {
        prompt: 'Search upward from nbr until is_prime holds. Fill the step that advances the candidate.',
        template: `let mut n = nbr;
while !is_prime(n) {
    _____;
}
n`,
        accepted: ['n += 1'],
        acceptedPatterns: ['^n\\s*\\+=\\s*1$'],
        hints: ['Try the next integer when the current one is not prime.', 'Increment n by one.'],
        explanation: 'Starting at nbr, we step up by one until is_prime returns true, then return that number.',
        whatYouLearned: 'A while-not loop searches for the first value satisfying a predicate.',
        conceptId: 'pattern_matching',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 91 — partial_sums (parts_sums)
  // -------------------------------------------------------------------------
  partial_sums: {
    overview: {
      whatYouBuild:
        'A function that returns the running totals of a slice as it is progressively shortened from the end: first the sum of all elements, then the sum without the last element, and so on, ending with 0.',
      inputOutput:
        'Input: a &[u64] slice. Output: a Vec<u64> of length len+1. For &[3, 5, 8]: [16, 8, 3, 0].',
      constraints: [
        'The result has exactly len+1 entries.',
        'Entry k is the sum of the first (len-k) elements; the final entry is 0.',
        'Take a slice (&[u64]), not an owned Vec.',
      ],
      commonMistakes: [
        'Forgetting the trailing 0 (the empty-prefix sum).',
        'Summing prefixes in the wrong direction.',
        'Returning len entries instead of len+1.',
      ],
    },
    officialDescription: `## parts_sums

Create a function parts_sums that receives a slice of u64 and returns a vector with the sum of all the elements, then the sum with the last element removed, and so on, down to 0.

### Expected function

~~~
pub fn parts_sums(v: &[u64]) -> Vec<u64>
~~~

### Usage

parts_sums(&[3, 5, 8]) returns [16, 8, 3, 0].`,
    objectives: {
      learn: [
        'Sum a slice with .iter().sum().',
        'Take sub-slices with range indexing v[..k].',
        'Build a result Vec of a known size.',
      ],
      whyExists:
        'It practices slice ranges and iterator summation — the building blocks of many numeric routines.',
      rustSkills: ['slices', 'iterators', 'Vec'],
    },
    conceptIds: ['references', 'iterators', 'collections'],
    conceptNotes: {
      references: 'The input is a slice &[u64], so the function works for any contiguous run of u64 without taking ownership.',
      iterators: 'v[..k].iter().sum() adds up the first k elements.',
    },
    similar: {
      title: 'Prefix sums',
      prompt:
        'Write a function that returns a Vec<u64> where entry k is the sum of the first k elements (growing from 0 up to the full total). Same slice + iter().sum() pattern, growing instead of shrinking.',
      starter: `pub fn prefix_sums(v: &[u64]) -> Vec<u64> {
    let mut out = Vec::new();
    for k in 0..=v.len() {
        // push the sum of the first k elements
        todo!()
    }
    out
}`,
      hint: 'v[..k].iter().sum() gives the sum of the first k elements.',
      concepts: ['references', 'iterators'],
      solution: `pub fn prefix_sums(v: &[u64]) -> Vec<u64> {
    let mut out = Vec::new();
    for k in 0..=v.len() {
        out.push(v[..k].iter().sum());
    }
    out
}`,
    },
    sideQuiz: [
      {
        prompt: 'Sum the first k elements of the slice.',
        template: `let total: u64 = v[..k].iter()._____;`,
        accepted: ['sum()'],
        acceptedPatterns: ['^sum\\(\\)$'],
        hints: ['Iterators can total their items.', 'Use the sum() consumer.'],
        explanation: 'v[..k] is the sub-slice of the first k elements; .iter().sum() adds them up.',
        whatYouLearned: '.sum() consumes an iterator into a total.',
        conceptId: 'iterators',
      },
      {
        prompt: 'Iterate prefix sizes from len down to 0. Fill the reversed inclusive range.',
        template: `for k in _____.rev() {
    sums.push(v[..k].iter().sum());
}`,
        accepted: ['(0..=v.len())', '0..=v.len()'],
        acceptedPatterns: ['^\\(?0..=v\\.len\\(\\)\\)?$'],
        hints: ['You need sizes 0 through len inclusive.', 'Build 0..=v.len() and reverse it.'],
        explanation: '(0..=v.len()).rev() yields len, len-1, ..., 0, so the first push is the full sum and the last is the empty-slice sum (0).',
        whatYouLearned: 'Inclusive ranges plus .rev() count down including both ends.',
        conceptId: 'iterators',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 92 — previousprime
  // -------------------------------------------------------------------------
  previousprime: {
    overview: {
      whatYouBuild:
        'A function that returns the largest prime number less than or equal to a given number, searching downward with the same square-root primality test.',
      inputOutput:
        'Input: a u64 nbr. Output: the largest prime <= nbr (e.g. prev_prime(10) -> 7, prev_prime(13) -> 13).',
      constraints: [
        'Numbers below 2 are not prime.',
        'Search downward from nbr and stop at the first prime.',
        'Guard against subtracting below 0 on u64.',
      ],
      commonMistakes: [
        'Underflowing a u64 by subtracting below 0.',
        'Starting the search below nbr when nbr itself is prime.',
        'Reusing the square-root bound incorrectly.',
      ],
    },
    officialDescription: `## prev_prime

Create a function prev_prime that returns the largest prime number less than or equal to the given number. If there is no such prime, return 0.

### Expected function

~~~
pub fn prev_prime(nbr: u64) -> u64
~~~

### Usage

prev_prime(13) returns 13, prev_prime(10) returns 7, prev_prime(1) returns 0.`,
    objectives: {
      learn: [
        'Reuse a primality helper while searching downward.',
        'Avoid unsigned underflow with an explicit zero guard.',
        'Return early from a loop.',
      ],
      whyExists:
        'The mirror of nextprime — it reinforces the primality test and adds the subtlety of unsigned subtraction.',
      rustSkills: ['loops', 'integer math', 'helper functions'],
    },
    conceptIds: ['error_handling', 'pattern_matching'],
    conceptNotes: {
      error_handling: 'The zero guard prevents a u64 underflow panic — an important defensive check with unsigned types.',
    },
    similar: {
      title: 'Is it prime?',
      prompt:
        'Write a function is_prime(n: u64) -> bool using the square-root method. This is the helper the real exercise relies on — get it solid here.',
      starter: `pub fn is_prime(n: u64) -> bool {
    // numbers < 2 are not prime; check divisors up to sqrt(n)
    todo!()
}`,
      hint: 'Reject n < 2, then loop while i * i <= n checking n % i == 0.',
      concepts: ['error_handling'],
      solution: `pub fn is_prime(n: u64) -> bool {
    if n < 2 { return false; }
    let mut i = 2;
    while i * i <= n {
        if n % i == 0 { return false; }
        i += 1;
    }
    true
}`,
    },
    sideQuiz: [
      {
        prompt: 'Return immediately when the current candidate is prime.',
        template: `let mut n = nbr;
loop {
    if is_prime(n) {
        return _____;
    }
    if n == 0 { return 0; }
    n -= 1;
}`,
        accepted: ['n'],
        acceptedPatterns: ['^n$'],
        hints: ['You want to return the prime you just found.', 'That value is the current candidate n.'],
        explanation: 'As soon as is_prime(n) is true, n is the answer — the largest prime not exceeding nbr.',
        whatYouLearned: 'Return early from a loop the moment the goal is reached.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'Prevent a u64 underflow before stepping down. Fill the guard condition.',
        template: `if _____ {
    return 0;
}
n -= 1;`,
        accepted: ['n == 0'],
        acceptedPatterns: ['^n\\s*==\\s*0$'],
        hints: ['Subtracting 1 from 0 on a u64 panics.', 'Stop when n has reached 0.'],
        explanation: 'u64 cannot go below 0, so we must return before n -= 1 would underflow. Reaching 0 means no prime was found.',
        whatYouLearned: 'Unsigned subtraction needs an explicit lower-bound guard.',
        conceptId: 'error_handling',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 94 — check_user_name
  // -------------------------------------------------------------------------
  check_user_name: {
    overview: {
      whatYouBuild:
        'A small access-control model: a User has a name and an AccessLevel. A guest may not reveal their name. send_name returns the name as an Option, and check_user_name turns that into a (bool, &str) tuple.',
      inputOutput:
        'Input: a &User. Output: (true, name) for non-guests, or (false, "ERROR: User is guest") for a guest.',
      constraints: [
        'AccessLevel has Guest, Normal, and Admin variants.',
        'send_name returns None for a Guest and Some(&name) otherwise.',
        'check_user_name converts the Option into a (bool, &str) tuple.',
      ],
      commonMistakes: [
        'Returning an owned String where a borrowed &str is expected.',
        'Forgetting that only Guest is restricted (Normal and Admin both reveal the name).',
        'Mismatching the exact error message text.',
      ],
    },
    officialDescription: `## check_user_name

Model a user with an access level. A guest is not allowed to share their name.

Implement send_name on User, returning an Option: None for a guest, otherwise the name. Then implement check_user_name that returns a tuple: (true, name) when a name is available, or (false, error message) when the user is a guest.

### Expected items

~~~
pub enum AccessLevel { Guest, Normal, Admin }
pub struct User { pub name: String, pub access_level: AccessLevel }
pub fn check_user_name(user: &User) -> (bool, &str)
~~~`,
    objectives: {
      learn: [
        'Model choices with an enum and data with a struct.',
        'Return optional data with Option.',
        'Convert an Option into another shape with match.',
      ],
      whyExists:
        'It ties together the three core type tools — enum, struct, Option — in a tiny realistic permission check.',
      rustSkills: ['enums', 'structs', 'Option', 'match'],
    },
    conceptIds: ['enums', 'structs', 'option', 'pattern_matching'],
    conceptNotes: {
      option: 'send_name returns Option<&str>: None encodes "not allowed", Some(name) the value.',
      pattern_matching: 'check_user_name matches that Option to build the (bool, &str) tuple.',
    },
    similar: {
      title: 'Maybe greet',
      prompt:
        'Given an Option<&str> name, write a function that returns "Hello, X" when a name is present and "Hello, stranger" when it is None. Same match-on-Option pattern.',
      starter: `pub fn greet(name: Option<&str>) -> String {
    match name {
        // Some -> personalized, None -> stranger
        todo!()
    }
}`,
      hint: 'Two arms: Some(n) => format!("Hello, {}", n), None => "Hello, stranger".to_string().',
      concepts: ['option', 'pattern_matching'],
      solution: `pub fn greet(name: Option<&str>) -> String {
    match name {
        Some(n) => format!("Hello, {}", n),
        None => "Hello, stranger".to_string(),
    }
}`,
    },
    sideQuiz: [
      {
        prompt: 'A guest hides their name. Fill the value send_name returns for a Guest.',
        template: `pub fn send_name(&self) -> Option<&str> {
    match self.access_level {
        AccessLevel::Guest => _____,
        _ => Some(&self.name),
    }
}`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: ['Option has a variant meaning "nothing".', 'Return None for a guest.'],
        explanation: 'A guest has no shareable name, so send_name returns None; everyone else returns Some(&self.name).',
        whatYouLearned: 'None models the absence of a value.',
        conceptId: 'option',
      },
      {
        prompt: 'Turn the Option from send_name into the result tuple. Fill the None arm.',
        template: `match user.send_name() {
    Some(name) => (true, name),
    None => _____,
}`,
        accepted: ['(false, "ERROR: User is guest")'],
        acceptedPatterns: ['^\\(false,\\s*"ERROR: User is guest"\\)$'],
        hints: ['The tuple is (bool, &str).', 'A guest gives (false, "ERROR: User is guest").'],
        explanation: 'When send_name is None the user is a guest, so we report (false, error message); a present name gives (true, name).',
        whatYouLearned: 'match converts an Option into whatever shape you need.',
        conceptId: 'pattern_matching',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 95 — dress_code
  // -------------------------------------------------------------------------
  dress_code: {
    overview: {
      whatYouBuild:
        'A function that decides an Outfit (a Jacket and a Hat) from an optional formality level and a Result invitation. Different combinations of present/absent inputs map to different clothing choices.',
      inputOutput:
        'Input: formality_level: Option<u32> and invitation_message: Result<&str, &str>. Output: an Outfit { jacket, hat }.',
      constraints: [
        'No formality AND an Err invitation -> Flowers jacket + Baseball hat.',
        'Jacket: None -> Flowers, Some(level > 0) -> White, Some(0) -> Black.',
        'Hat: Ok invitation -> Fedora, Err -> Snapback.',
      ],
      commonMistakes: [
        'Missing the special-case combination that yields Flowers + Baseball.',
        'Treating Some(0) the same as a positive level.',
        'Swapping the Ok/Err hat mapping.',
      ],
    },
    officialDescription: `## dress_code

Choose an outfit based on two inputs: an optional formality level and an invitation that is either Ok or Err.

Rules:

- If there is no formality level and the invitation is an error, wear the Flowers jacket and the Baseball hat.
- Jacket: no formality level -> Flowers; a level greater than 0 -> White; a level of 0 -> Black.
- Hat: a valid (Ok) invitation -> Fedora; otherwise -> Snapback.

### Expected function

~~~
pub fn choose_outfit(formality_level: Option<u32>, invitation_message: Result<&str, &str>) -> Outfit
~~~`,
    objectives: {
      learn: [
        'Branch on Option with match guards (Some(x) if cond).',
        'Branch on Result with is_ok / is_err.',
        'Combine independent decisions into one returned struct.',
      ],
      whyExists:
        'It exercises decision-making across Option and Result together — the two pillars of Rust control flow.',
      rustSkills: ['Option', 'Result', 'match guards', 'enums', 'structs'],
    },
    conceptIds: ['option', 'result', 'enums', 'pattern_matching'],
    conceptNotes: {
      pattern_matching: 'A match with a guard (Some(level) if level > 0) distinguishes a positive level from zero.',
      result: 'invitation_message.is_ok() decides the hat without inspecting the inner text.',
    },
    similar: {
      title: 'Ticket price',
      prompt:
        'Given age: Option<u32>, return a price: None -> 0 (unknown), Some(a) if a < 18 -> 5, otherwise 10. Same match-with-guard pattern as the jacket choice.',
      starter: `pub fn price(age: Option<u32>) -> u32 {
    match age {
        // None -> 0, child -> 5, else 10
        todo!()
    }
}`,
      hint: 'Use Some(a) if a < 18 => 5 as a guarded arm.',
      concepts: ['option', 'pattern_matching'],
      solution: `pub fn price(age: Option<u32>) -> u32 {
    match age {
        None => 0,
        Some(a) if a < 18 => 5,
        _ => 10,
    }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Pick the jacket for a positive formality level. Fill the guard so it only matches levels above 0.',
        template: `let jacket = match formality_level {
    None => Jacket::Flowers,
    Some(level) _____ => Jacket::White,
    _ => Jacket::Black,
};`,
        accepted: ['if level > 0'],
        acceptedPatterns: ['^if\\s+level\\s*>\\s*0$'],
        hints: ['A match arm can carry a condition.', 'Add a guard: if level > 0.'],
        explanation: 'The guard if level > 0 makes this arm fire only for positive levels; Some(0) falls through to the _ arm (Black).',
        whatYouLearned: 'Match guards add a boolean condition to a pattern.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'Choose the hat from the invitation. Fill the check for a valid invitation.',
        template: `let hat = if invitation_message._____ {
    Hat::Fedora
} else {
    Hat::Snapback
};`,
        accepted: ['is_ok()'],
        acceptedPatterns: ['^is_ok\\(\\)$'],
        hints: ['Result has predicate methods.', 'is_ok() is true for Ok(_).'],
        explanation: 'is_ok() tells us the invitation was valid without unwrapping it, so we choose Fedora; otherwise Snapback.',
        whatYouLearned: 'is_ok()/is_err() inspect a Result without consuming it.',
        conceptId: 'result',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 96 — get_document_id
  // -------------------------------------------------------------------------
  get_document_id: {
    overview: {
      whatYouBuild:
        'A chain of offices, each holding a Result pointing to the next office (or an error). get_document_id walks the whole chain and returns the final document id, short-circuiting on the first error with the ? operator.',
      inputOutput:
        'Input: &self on OfficeOne. Output: Result<u32, ErrorOffice> — Ok(document_id) if every office succeeds, or the first error encountered.',
      constraints: [
        'Each office stores next_office: Result<NextOffice, ErrorOffice>.',
        'Use the ? operator to unwrap each step and propagate errors.',
        'The final office holds the document_id as a Result.',
      ],
      commonMistakes: [
        'Manually matching each Result instead of using ? to chain them.',
        'Returning the wrong error type (the chain must propagate ErrorOffice).',
        'Forgetting the last field is already the Result to return.',
      ],
    },
    officialDescription: `## get_document_id

A document request passes through a chain of offices. Each office holds a Result that is either the next office or an ErrorOffice. The final office holds the document id (also a Result).

Implement get_document_id on the first office so it walks the chain and returns the document id, or the first error encountered.

### Expected method

~~~
impl OfficeOne {
    pub fn get_document_id(&self) -> Result<u32, ErrorOffice>
}
~~~`,
    objectives: {
      learn: [
        'Propagate errors concisely with the ? operator.',
        'Chain several fallible steps into one expression.',
        'Model a pipeline with nested Result-bearing structs.',
      ],
      whyExists:
        'It is the canonical demonstration of ? — turning a tower of matches into a single readable line.',
      rustSkills: ['Result', '? operator', 'structs', 'error handling'],
    },
    conceptIds: ['result', 'error_handling', 'structs'],
    conceptNotes: {
      error_handling: 'The ? operator unwraps an Ok or returns the Err from the whole function immediately.',
      result: 'Every office field is a Result, so ? can be applied at each hop.',
    },
    similar: {
      title: 'Chained parsing',
      prompt:
        'Write a function that parses two &str into i64 and returns their sum, using ? to bail out on the first parse failure. Same early-return-on-error idea as the office chain.',
      starter: `pub fn add(a: &str, b: &str) -> Result<i64, std::num::ParseIntError> {
    // parse both with ? then add
    todo!()
}`,
      hint: 'let x = a.parse::<i64>()?; let y = b.parse::<i64>()?; Ok(x + y).',
      concepts: ['result', 'error_handling'],
      solution: `pub fn add(a: &str, b: &str) -> Result<i64, std::num::ParseIntError> {
    let x = a.parse::<i64>()?;
    let y = b.parse::<i64>()?;
    Ok(x + y)
}`,
    },
    sideQuiz: [
      {
        prompt: 'Walk the whole chain in one expression. Fill the operator (after the first office) that unwraps each Ok and propagates any Err.',
        template: `pub fn get_document_id(&self) -> Result<u32, ErrorOffice> {
    self.next_office_____.next_office?.next_office?.document_id
}`,
        accepted: ['?'],
        acceptedPatterns: ['^\\?$'],
        hints: ['One punctuation mark unwraps a Result or returns early.', 'It is the ? operator.'],
        explanation: 'The ? operator yields the inner value on Ok, or returns the Err from the function. Chaining ? walks office to office until the final document_id Result.',
        whatYouLearned: 'The ? operator replaces a tower of matches with one line.',
        conceptId: 'error_handling',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 97 — negative_spelling
  // -------------------------------------------------------------------------
  negative_spelling: {
    overview: {
      whatYouBuild:
        'A function that spells a negative number in English words, prefixed with "minus". It rejects zero and positive numbers, then spells the magnitude using lookup tables and recursion for tens, hundreds, thousands, and millions.',
      inputOutput:
        'Input: an i64 n. Output: a String. For -45: "minus forty-five". For 0 or positives: an error string.',
      constraints: [
        'Only negative numbers are spelled; reject zero and positives.',
        'Spell the absolute value, then prefix "minus ".',
        'Use hyphenation for compound tens (e.g. forty-five).',
      ],
      commonMistakes: [
        'Letting the minus sign interfere with the digit-to-word logic.',
        'Forgetting the hyphen in numbers like twenty-one.',
        'Not handling the recursive breakdown for hundreds/thousands.',
      ],
    },
    officialDescription: `## negative_spelling

Create a function negative_spell that spells out a negative number in English, prefixed with the word minus.

If the number is not negative, return an error string.

### Expected function

~~~
pub fn negative_spell(n: i64) -> String
~~~

### Usage

negative_spell(-45) returns "minus forty-five".`,
    objectives: {
      learn: [
        'Guard against invalid input early.',
        'Use lookup tables (arrays) for fixed word lists.',
        'Break a big problem into recursive sub-cases.',
      ],
      whyExists:
        'Number-to-words is a rich exercise in branching, lookup tables, and recursion over ranges.',
      rustSkills: ['arrays', 'recursion', 'match / if', 'format!'],
    },
    conceptIds: ['pattern_matching', 'error_handling', 'collections'],
    conceptNotes: {
      error_handling: 'The function returns an error string for non-negative input instead of panicking.',
    },
    similar: {
      title: 'Spell 0–19',
      prompt:
        'Write a function that returns the English word for a number 0..=19 using an array lookup. This is the base case the full speller builds on.',
      starter: `pub fn small_word(n: usize) -> &'static str {
    let ones = [
        "zero","one","two","three","four","five","six","seven","eight","nine",
        "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen",
        "seventeen","eighteen","nineteen",
    ];
    // return the word for n (assume n < 20)
    todo!()
}`,
      hint: 'Index the array directly: ones[n].',
      concepts: ['collections'],
      solution: `pub fn small_word(n: usize) -> &'static str {
    let ones = [
        "zero","one","two","three","four","five","six","seven","eight","nine",
        "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen",
        "seventeen","eighteen","nineteen",
    ];
    ones[n]
}`,
    },
    sideQuiz: [
      {
        prompt: 'Reject non-negative input up front. Fill the condition.',
        template: `pub fn negative_spell(n: i64) -> String {
    if _____ {
        return "error: positive number".to_string();
    }
    format!("minus {}", spell((-n) as u64))
}`,
        accepted: ['n >= 0'],
        acceptedPatterns: ['^n\\s*>=\\s*0$'],
        hints: ['This function only handles negatives.', 'Reject zero and anything positive: n >= 0.'],
        explanation: 'Only negative numbers are valid, so we bail out for n >= 0 before doing any spelling work.',
        whatYouLearned: 'Validate inputs before the main logic.',
        conceptId: 'error_handling',
      },
      {
        prompt: 'Spell the magnitude. Fill what we negate and convert so the helper gets a positive value.',
        template: `// n is negative here
format!("minus {}", spell((_____) as u64))`,
        accepted: ['-n'],
        acceptedPatterns: ['^-n$'],
        hints: ['We need the positive magnitude of a negative n.', 'Negating a negative gives a positive: -n.'],
        explanation: 'Since n is negative, -n is its positive magnitude, which the spell helper turns into words; "minus " is prefixed in front.',
        whatYouLearned: 'Separate the sign from the magnitude, then recombine.',
        conceptId: 'pattern_matching',
      },
    ],
  },
};
