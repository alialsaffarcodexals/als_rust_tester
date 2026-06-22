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
};
