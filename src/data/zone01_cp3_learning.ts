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
        prompt: 'Before applying an operator you must have two operands waiting. Fill the guard that rejects a malformed expression.',
        template: `"+" | "-" | "*" | "/" | "%" => {
    if _____ {
        return Err(());
    }
    let b = stack.pop().unwrap();
    let a = stack.pop().unwrap();
}`,
        accepted: ['stack.len() < 2'],
        acceptedPatterns: ['^stack\\.len\\(\\)\\s*<\\s*2$'],
        hints: [
          'An operator needs two numbers already on the stack.',
          'If fewer than 2 are present the expression is invalid.',
        ],
        explanation:
          'Applying an operator with fewer than two operands means the input was malformed, so we return Err before popping anything.',
        whatYouLearned: 'Guard the stack depth before every operator.',
        conceptId: 'error_handling',
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
        prompt: 'A token that is not an operator must be a number. Fill what happens when parsing fails.',
        template: `num => match num.parse::<i64>() {
    Ok(n) => stack.push(n),
    Err(_) => _____,
}`,
        accepted: ['return Err(())'],
        acceptedPatterns: ['^return Err\\(\\(\\)\\)$'],
        hints: [
          'An unparseable token (like "ksd") is invalid input.',
          'Bail out of the function with return Err(()).',
        ],
        explanation:
          'Every non-operator token is parsed as an i64; if parsing fails the expression is invalid, so we return Err immediately.',
        whatYouLearned: 'Reject unknown tokens by propagating an error.',
        conceptId: 'error_handling',
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
      {
        kind: 'choice',
        prompt: 'In a program, what does args[0] always hold?',
        options: ['the first user argument', 'the program name', 'the final result', 'an empty string'],
        correct: [1],
        why: [
          'The first user argument is args[1], not args[0].',
          'args[0] is always the program (binary) name.',
          'args holds inputs, not results.',
          'args[0] is never empty for a real run.',
        ],
        hints: ['Think about what cargo run puts before your arguments.', 'It is the program itself.'],
        explanation: 'std::env::args() yields the program name first, so args[0] is the binary name and real arguments start at args[1] — which is why exactly one user argument means args.len() == 2.',
        whatYouLearned: 'argv[0] is the program name across languages.',
        conceptId: 'cli_args',
      },
      {
        kind: 'bug',
        prompt: 'This tokenizer does not ignore extra spaces as the spec requires. Click the mistake.',
        code: `for token in expr.split(" ") {
    stack.push(token.parse().unwrap());
}`,
        bugs: [{ line: 1, token: 'split' }],
        hints: [
          'Two spaces in a row produce an empty token with this approach.',
          'Look at how the string is broken into tokens.',
        ],
        explanation: 'split(" ") splits on each single space, so "1  2" yields an empty token between the numbers and parse() panics. split_whitespace() collapses any run of whitespace — satisfying the "extra spaces ignored" rule.',
        whatYouLearned: 'Use split_whitespace(), not split(" "), to ignore extra spaces.',
        conceptId: 'cli_args',
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
        prompt: 'Loop over the words in the text. Fill the iterator that yields whitespace-separated words.',
        template: `for word in words._____() {
    // count each word
}`,
        accepted: ['split_whitespace'],
        acceptedPatterns: ['^split_whitespace$'],
        hints: [
          'The standard library can split on any run of whitespace.',
          'split_whitespace() yields each word and skips empty pieces.',
        ],
        explanation:
          'split_whitespace() breaks the text into words on any ASCII whitespace (spaces, tabs, newlines), which is exactly how words are separated here.',
        whatYouLearned: 'split_whitespace() iterates the words of a string.',
        conceptId: 'iterators',
      },
      {
        kind: 'match',
        prompt: 'Match each piece of the word-counting solution to what it does.',
        pairs: [
          { left: 'split_whitespace()', right: 'break the text into words' },
          { left: '.to_lowercase()', right: 'make the count case-insensitive' },
          { left: '.entry(key)', right: 'look up the slot for a word' },
          { left: '.or_insert(0)', right: 'start a new word at count 0' },
        ],
        hints: [
          'Think about the order: split, normalize, then count.',
          'entry/or_insert together create-or-update a counter.',
        ],
        explanation: 'The text is split into words, each word is lowercased so cases merge, and entry(key).or_insert(0) returns a counter (creating it at 0 the first time) that is then incremented.',
        whatYouLearned: 'Each method has a single clear role in the counting pipeline.',
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
      {
        prompt: 'or_insert(0) returns a mutable reference. Fill the symbol that dereferences it so += 1 updates the stored count.',
        template: `_____counts.entry(key).or_insert(0) += 1;`,
        accepted: ['*'],
        acceptedPatterns: ['^\\*$'],
        hints: [
          'or_insert returns &mut u32, not u32.',
          'Dereference the reference with * before += .',
        ],
        explanation:
          'or_insert hands back a mutable reference; the leading * dereferences it so += 1 modifies the value stored in the map.',
        whatYouLearned: 'Dereference a &mut with * to modify what it points to.',
        conceptId: 'collections',
      },
      {
        prompt: 'Finish the function. Fill what it returns after the loop.',
        template: `// after counting every word
_____`,
        accepted: ['counts'],
        acceptedPatterns: ['^counts$'],
        hints: [
          'The function returns the populated map.',
          'Return counts (no semicolon = return value).',
        ],
        explanation:
          'After the loop the map holds every word and its count, so the function’s final expression is counts.',
        whatYouLearned: 'A function’s last expression (no semicolon) is its return value.',
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
        prompt: 'Guard against overflow at i32::MIN. Fill the wider signed type we cast to before calling abs().',
        template: `let abs = (v as _____).abs();`,
        accepted: ['i64'],
        acceptedPatterns: ['^i64$'],
        hints: [
          'i32::MIN has no positive counterpart inside i32.',
          'Cast to a wider signed type first: i64.',
        ],
        explanation:
          '(i32::MIN).abs() would overflow because +2147483648 is out of i32 range; widening to i64 first makes abs() safe for every input.',
        whatYouLearned: 'Widen before abs() to avoid overflow at i32::MIN.',
        conceptId: 'error_handling',
      },
      {
        kind: 'choice',
        prompt: 'Which iterator adapter reverses the order of the characters?',
        template: `let reversed: String = abs.to_string()
    .chars()
    .____()
    .collect();`,
        options: ['reverse()', 'rev()', 'flip()', 'sort()'],
        correct: [1],
        why: [
          'reverse() reverses a slice in place and returns (), it is not an iterator adapter.',
          'rev() reverses a double-ended iterator — exactly what we need.',
          'There is no flip() method on iterators.',
          'sort() orders items; it does not reverse the sequence.',
        ],
        hints: [
          'You want to walk the characters back to front.',
          'It is the double-ended iterator adapter.',
        ],
        explanation: 'chars() yields a double-ended iterator, and rev() walks it from the last character to the first before collect() rebuilds the String.',
        whatYouLearned: 'rev() reverses an iterator without copying.',
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
        prompt: 'Build the leading sign. Fill the else branch (empty for non-negative numbers).',
        template: `let sign = if v < 0 { "-" } else { _____ };`,
        accepted: ['""'],
        acceptedPatterns: ['^""$'],
        hints: [
          'Positive numbers get no sign.',
          'Use an empty string "".',
        ],
        explanation:
          'Negative inputs get a "-" prefix; everything else contributes an empty string, so only negatives show a sign. if/else is an expression that yields the chosen text.',
        whatYouLearned: 'if/else is an expression that produces a value.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'This attempt to reverse a string does not compile. Click the token that is the mistake.',
        code: `fn reverse_it(v: i32) -> String {
    let s = v.to_string();
    let reversed = s.reverse();
    reversed
}`,
        bugs: [{ line: 3, token: 'reverse' }],
        hints: [
          'String has no method that reverses it directly.',
          'Look at the method called on s.',
        ],
        explanation: 'String has no reverse() method; reversing text goes through an iterator: s.chars().rev().collect(). (Slices do have reverse(), but it mutates in place and returns ().)',
        whatYouLearned: 'Reverse text via chars().rev().collect(), not a reverse() method.',
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
      {
        kind: 'order',
        prompt: 'Assemble the full reverse_it function. Drop the right fragments into order — one fragment does not belong.',
        scaffold: `fn reverse_it(v: i32) -> String {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
    [ slot 4 ]
}`,
        fragments: [
          'let abs = (v as i64).abs();',
          'let reversed: String = abs.to_string().chars().rev().collect();',
          'let sign = if v < 0 { "-" } else { "" };',
          'format!("{}{}{}", sign, reversed, abs)',
        ],
        distractors: [
          'let reversed = v.to_string().reverse();',
        ],
        hints: [
          'Take the absolute value first, then reverse its digits.',
          'Work out the sign separately, and assemble sign + reversed + original last.',
        ],
        explanation: 'First widen and take the absolute value, then reverse its digits, then decide the sign, and finally format sign + reversed digits + original number. The reverse() fragment is a distractor — String has no reverse().',
        whatYouLearned: 'The algorithm flows: normalize → transform → sign → assemble.',
        conceptId: 'iterators',
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
      {
        prompt: 'Collect each line into the result. Fill the Vec method that appends a line.',
        template: `result._____(format!("{}{}", " ".repeat(k), v.repeat(k)));`,
        accepted: ['push'],
        acceptedPatterns: ['^push$'],
        hints: [
          'A Vec grows from the back.',
          'Use push to append one element.',
        ],
        explanation:
          'Each formatted line is appended to the result vector with push, building the pyramid line by line.',
        whatYouLearned: 'Vec::push appends a single element.',
        conceptId: 'collections',
      },
      {
        prompt: 'Finish the function. Fill what it returns (the pyramid of 2*i-1 lines).',
        template: `// after the ascending and descending loops
_____`,
        accepted: ['result'],
        acceptedPatterns: ['^result$'],
        hints: [
          'Return the collected lines.',
          'The variable holding them is result.',
        ],
        explanation:
          'Both loops have filled result with the ascending then descending lines, so the function returns result.',
        whatYouLearned: 'Return the accumulated Vec as the final expression.',
        conceptId: 'collections',
      },
      {
        kind: 'choice',
        prompt: 'Which expression repeats the string v exactly k times?',
        options: ['v.repeat(k)', 'v * k', 'v.clone(k)', 'repeat(v, k)'],
        correct: [0],
        why: [
          'str::repeat(k) returns the string repeated k times.',
          'Rust strings do not support multiplication.',
          'clone() takes no count argument.',
          'There is no free repeat function for this.',
        ],
        hints: ['Strings have a method for this.', 'It mirrors " ".repeat(k) used for the indentation.'],
        explanation: 'v.repeat(k) builds k concatenated copies of v — the content of each pyramid line, after k spaces of indentation.',
        whatYouLearned: 'str::repeat(n) repeats a string n times.',
        conceptId: 'display_trait',
      },
      {
        kind: 'bug',
        prompt: 'This line builds the wrong pyramid content. Click the buggy token.',
        code: `for k in 1..=i {
    let line = format!("{}{}", " ".repeat(k), v.repeat(i));
    result.push(line);
}`,
        bugs: [{ line: 2, token: 'i' }],
        hints: [
          'The repeat count should grow with the level, not stay fixed.',
          'Compare the two repeat() calls on line 2.',
        ],
        explanation: 'At level k the string must repeat k times, but v.repeat(i) always repeats it i times. It should be v.repeat(k) to match the indentation " ".repeat(k).',
        whatYouLearned: 'Use the loop variable k, not the fixed bound i, for per-level sizes.',
        conceptId: 'iterators',
      },
      {
        kind: 'order',
        prompt: 'Assemble the full inv_pyramid. One fragment does not belong.',
        scaffold: `pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
    [ slot 4 ]
}`,
        fragments: [
          'let mut result = Vec::new();',
          'for k in 1..=i { result.push(format!("{}{}", " ".repeat(k), v.repeat(k))); }',
          'for k in (1..i).rev() { result.push(format!("{}{}", " ".repeat(k), v.repeat(k))); }',
          'result',
        ],
        distractors: [
          'for k in 0..i { result.push(v.repeat(k)); }',
        ],
        hints: [
          'Create the vector, climb up the levels, then mirror back down.',
          'The descending loop uses (1..i).rev() so it does not repeat the peak.',
        ],
        explanation: 'Start an empty Vec, push lines for levels 1..=i (ascending), then for (1..i).rev() (descending) to mirror the shape, and finally return result. The 0..i fragment is a distractor — it lacks indentation and the descending half.',
        whatYouLearned: 'A symmetric shape is built by an up-loop then a mirrored down-loop.',
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
        prompt: 'Inside the loop, a clean divisor means n is composite. Fill the value returned.',
        template: `if n % i == 0 {
    return _____;
}`,
        accepted: ['false'],
        acceptedPatterns: ['^false$'],
        hints: [
          'If i divides n with no remainder, n is not prime.',
          'Return false immediately.',
        ],
        explanation:
          'A divisor other than 1 and n proves n is composite, so the helper returns false at once.',
        whatYouLearned: 'Exit early as soon as the answer is known.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'If the loop finds no divisor, n is prime. Fill the value the helper returns.',
        template: `    // no divisor found
    _____
}`,
        accepted: ['true'],
        acceptedPatterns: ['^true$'],
        hints: [
          'Reaching here means nothing divided n.',
          'Return true.',
        ],
        explanation:
          'If no divisor was found up to the square root, n has no factors other than 1 and itself, so it is prime.',
        whatYouLearned: 'The loop falling through means the predicate holds.',
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
      {
        kind: 'choice',
        prompt: 'Fill the loop bound that checks divisors only up to the square root of n.',
        template: `let mut i = 2;
while ____ {
    if n % i == 0 { return false; }
    i += 1;
}`,
        options: ['i < n', 'i * i <= n', 'i <= n / 2', 'i != n'],
        correct: [1],
        why: [
          'Correct but slow — it checks far more divisors than needed.',
          'Stops at the square root: any factor above sqrt(n) pairs with one below it.',
          'Better than i < n but still does too much work.',
          'This never bounds the loop correctly.',
        ],
        hints: ['A factor larger than sqrt(n) pairs with a smaller one.', 'Avoid computing a square root: compare i*i with n.'],
        explanation: 'i * i <= n stops the loop at the square root of n, which is enough to find any divisor and is far faster than scanning up to n.',
        whatYouLearned: 'The square-root bound is the efficient primality check.',
        conceptId: 'error_handling',
      },
      {
        kind: 'bug',
        prompt: 'This primality test returns the wrong answers. It has TWO bugs — click both.',
        code: `fn is_prime(n: usize) -> bool {
    let mut i = 2;
    while i * i <= n {
        if n % i == 0 {
            return true;
        }
        i += 1;
    }
    false
}`,
        bugs: [
          { line: 5, token: 'true' },
          { line: 9, token: 'false' },
        ],
        hints: [
          'Finding a divisor means the number is NOT prime.',
          'Reaching the end with no divisor means it IS prime — check both returns.',
        ],
        explanation: 'The returns are swapped: a found divisor (n % i == 0) means composite, so it should return false; falling out of the loop means prime, so the final value should be true.',
        whatYouLearned: 'A found divisor → false; no divisor → true.',
        conceptId: 'error_handling',
      },
      {
        kind: 'order',
        prompt: 'Assemble next_prime around its is_prime helper. One fragment does not belong.',
        scaffold: `pub fn next_prime(nbr: usize) -> usize {
    fn is_prime(n: usize) -> bool {
        [ slot 1 ]
        [ slot 2 ]
        [ slot 3 ]
    }
    [ slot 4 ]
}`,
        fragments: [
          'if n < 2 { return false; }',
          'let mut i = 2; while i * i <= n { if n % i == 0 { return false; } i += 1; }',
          'true',
          'let mut n = nbr; while !is_prime(n) { n += 1; } n',
        ],
        distractors: [
          'let mut n = nbr; while !is_prime(n) { n -= 1; } n',
        ],
        hints: [
          'is_prime first rejects < 2, then checks divisors, then returns true.',
          'The search starts at nbr and steps upward.',
        ],
        explanation: 'is_prime rejects numbers below 2, scans divisors up to the square root, and returns true if none divide. Then next_prime steps upward from nbr until is_prime holds. The n -= 1 fragment is a distractor (that would search downward).',
        whatYouLearned: 'A helper defines the test; the driver loops until it passes.',
        conceptId: 'error_handling',
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
        prompt: 'A prefix is a sub-slice of the first k elements. Fill the range used to take it.',
        template: `let total: u64 = v[.._____].iter().sum();`,
        accepted: ['k'],
        acceptedPatterns: ['^k$'],
        hints: [
          'You want elements 0 up to (but not including) k.',
          'The range is ..k, so the index is k.',
        ],
        explanation:
          'v[..k] borrows the first k elements as a slice; summing it gives the partial sum for that prefix size.',
        whatYouLearned: 'v[..k] is the slice of the first k elements.',
        conceptId: 'references',
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
      {
        prompt: 'Inside the loop, store each partial sum. Fill the Vec method that appends it.',
        template: `sums._____(v[..k].iter().sum());`,
        accepted: ['push'],
        acceptedPatterns: ['^push$'],
        hints: [
          'A Vec grows from the back.',
          'Use push to append the computed sum.',
        ],
        explanation:
          'Each prefix sum is appended to sums with push, building the result largest-first down to the trailing 0.',
        whatYouLearned: 'Vec::push appends one element.',
        conceptId: 'collections',
      },
      {
        prompt: 'Finish the function. Fill what it returns.',
        template: `// after the loop
_____`,
        accepted: ['sums'],
        acceptedPatterns: ['^sums$'],
        hints: [
          'Return the vector you built.',
          'The variable is sums.',
        ],
        explanation:
          'The loop has filled sums with every partial total, so the function returns sums.',
        whatYouLearned: 'Return the accumulated Vec as the final expression.',
        conceptId: 'collections',
      },
      {
        kind: 'choice',
        prompt: 'Which expression is the slice of the first k elements of v?',
        options: ['v[..k]', 'v[k..]', 'v[k]', 'v.first(k)'],
        correct: [0],
        why: [
          'v[..k] is the slice from the start up to (not including) index k.',
          'v[k..] is the slice from k to the end — the opposite part.',
          'v[k] is a single element, not a slice.',
          'first() takes no argument and returns Option<&T>.',
        ],
        hints: ['You want the prefix, from the start.', 'A range with no left bound starts at 0.'],
        explanation: 'v[..k] borrows the first k elements; .iter().sum() then totals them. v[k..] would be the suffix instead.',
        whatYouLearned: 'v[..k] is the prefix slice of length k.',
        conceptId: 'references',
      },
      {
        kind: 'bug',
        prompt: 'This builds the wrong values — it counts elements instead of summing them. Click the buggy token.',
        code: `for k in (0..=v.len()).rev() {
    sums.push(v[..k].iter().count());
}`,
        bugs: [{ line: 2, token: 'count' }],
        hints: [
          'We want the total of the elements, not how many there are.',
          'Look at the iterator consumer.',
        ],
        explanation: 'count() returns the number of elements; we need their total, so it must be sum(). For [3,5,8] the first push should be 16, not 3.',
        whatYouLearned: 'sum() totals values; count() counts them.',
        conceptId: 'iterators',
      },
      {
        kind: 'order',
        prompt: 'Assemble parts_sums. One fragment does not belong.',
        scaffold: `pub fn parts_sums(v: &[u64]) -> Vec<u64> {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
}`,
        fragments: [
          'let mut sums = Vec::with_capacity(v.len() + 1);',
          'for k in (0..=v.len()).rev() { sums.push(v[..k].iter().sum()); }',
          'sums',
        ],
        distractors: [
          'for k in 0..v.len() { sums.push(v[k]); }',
        ],
        hints: [
          'Pre-size the vector, fill it from the full slice down to empty, then return it.',
          'The range counts down with (0..=v.len()).rev().',
        ],
        explanation: 'Allocate the result, then for k from len down to 0 push the sum of v[..k] (full total first, trailing 0 last), and return sums. The distractor pushes single elements, not prefix sums.',
        whatYouLearned: 'Iterate prefix sizes high-to-low to produce the partial sums.',
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
        prompt: 'The primality helper rejects small numbers. Fill the condition that means "not prime".',
        template: `fn is_prime(n: u64) -> bool {
    if _____ {
        return false;
    }
    // ... divisor checks ...
    true
}`,
        accepted: ['n < 2'],
        acceptedPatterns: ['^n\\s*<\\s*2$'],
        hints: [
          '0 and 1 are not prime.',
          'Reject anything below 2.',
        ],
        explanation:
          'The smallest prime is 2, so any n below 2 is immediately not prime.',
        whatYouLearned: 'Handle edge cases before the main loop.',
        conceptId: 'error_handling',
      },
      {
        prompt: 'Only check divisors up to the square root. Fill the loop bound.',
        template: `let mut i = 2;
while _____ {
    if n % i == 0 { return false; }
    i += 1;
}`,
        accepted: ['i * i <= n'],
        acceptedPatterns: ['^i\\s*\\*\\s*i\\s*<=\\s*n$'],
        hints: [
          'A factor larger than sqrt(n) pairs with a smaller one.',
          'Compare i*i with n instead of taking a square root.',
        ],
        explanation:
          'Checking divisors only up to sqrt(n) (i*i <= n) is enough and far faster than going all the way to n.',
        whatYouLearned: 'The square-root bound makes primality testing efficient.',
        conceptId: 'error_handling',
      },
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
      {
        prompt: 'After the guard, move to the next lower candidate. Fill the step-down operator.',
        template: `if n == 0 { return 0; }
n _____ 1;`,
        accepted: ['-='],
        acceptedPatterns: ['^-=$'],
        hints: [
          'You want to decrease n by one.',
          'Use the compound subtraction operator -= .',
        ],
        explanation:
          'After confirming n is not yet 0, n -= 1 steps down to the next candidate and the loop tries again.',
        whatYouLearned: 'Searching downward decrements until a prime is found.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'prev_prime searches downward over u64. What prevents an underflow panic?',
        options: ['if n == 0 { return 0; }', 'n.abs()', 'cast to i64 first', 'nothing is needed'],
        correct: [0],
        why: [
          'Returning before n would drop below 0 avoids the panic.',
          'u64 has no abs(), and there is no negative to strip.',
          'Casting changes the type but the loop still must stop at 0.',
          'Without a guard, n -= 1 at n == 0 panics in debug and wraps in release.',
        ],
        hints: ['u64 cannot go below 0.', 'Stop the loop before subtracting from 0.'],
        explanation: 'Subtracting 1 from a 0_u64 underflows, so the function must return (here, 0 — no prime found) once n reaches 0, before the n -= 1 step.',
        whatYouLearned: 'Guard unsigned subtraction against underflow.',
        conceptId: 'error_handling',
      },
      {
        kind: 'bug',
        prompt: 'This search goes the wrong direction for prev_prime. Click the buggy token.',
        code: `let mut n = nbr;
while !is_prime(n) {
    n += 1;
}
n`,
        bugs: [{ line: 3, token: '+=' }],
        hints: [
          'prev_prime wants the largest prime not exceeding nbr.',
          'Which way should n move?',
        ],
        explanation: 'prev_prime searches downward, so it must step n -= 1, not n += 1 (that would find the NEXT prime instead of the previous one).',
        whatYouLearned: 'Previous-prime searches down; next-prime searches up.',
        conceptId: 'pattern_matching',
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
        prompt: 'The access level is one of three kinds. Fill the missing variant.',
        template: `pub enum AccessLevel {
    Guest,
    Normal,
    _____,
}`,
        accepted: ['Admin'],
        acceptedPatterns: ['^Admin,?$'],
        hints: [
          'A guest, a normal user, and one more privileged role.',
          'The third variant is Admin.',
        ],
        explanation:
          'AccessLevel enumerates the three roles; Admin is the privileged one alongside Guest and Normal.',
        whatYouLearned: 'An enum lists the fixed set of variants a value can be.',
        conceptId: 'enums',
      },
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
        prompt: 'Non-guests may share their name. Fill the value send_name returns for them.',
        template: `match self.access_level {
    AccessLevel::Guest => None,
    _ => _____,
}`,
        accepted: ['Some(&self.name)'],
        acceptedPatterns: ['^Some\\(&self\\.name\\)$'],
        hints: [
          'A present value is wrapped in Some.',
          'Borrow the name: Some(&self.name).',
        ],
        explanation:
          'For Normal and Admin the name is available, so send_name returns Some(&self.name) — a borrowed string, not an owned copy.',
        whatYouLearned: 'Some(x) wraps a value that is present.',
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
      {
        prompt: 'Build the success case. Fill the Some arm of check_user_name.',
        template: `match user.send_name() {
    Some(name) => _____,
    None => (false, "ERROR: User is guest"),
}`,
        accepted: ['(true, name)'],
        acceptedPatterns: ['^\\(true,\\s*name\\)$'],
        hints: [
          'The tuple is (bool, &str).',
          'A present name gives (true, name).',
        ],
        explanation:
          'When send_name yields Some(name) the user is allowed, so we return (true, name); the None arm returns the guest error.',
        whatYouLearned: 'Each match arm produces the same result type.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'Which type lets send_name express "there is no name" without using null?',
        options: ['Option', 'Result', 'Vec', 'bool'],
        correct: [0],
        why: [
          'Option<T> is Some(value) or None — exactly "maybe a value".',
          'Result is for success/failure with an error value, not mere absence.',
          'Vec is a list; it does not model a single optional value.',
          'bool says yes/no but cannot also carry the name.',
        ],
        hints: ['Rust has no null.', 'It is the Some/None type.'],
        explanation: 'Option<&str> models a value that may be absent: None for a guest, Some(name) otherwise — checked at compile time.',
        whatYouLearned: 'Option replaces null for "value may be missing".',
        conceptId: 'option',
      },
      {
        kind: 'bug',
        prompt: 'send_name returns an Option, but this match treats it like a Result. Click the mistake.',
        code: `match user.send_name() {
    Some(name) => (true, name),
    Err(_) => (false, "ERROR: User is guest"),
}`,
        bugs: [{ line: 3, token: 'Err' }],
        hints: [
          'send_name returns Option<&str>, not Result.',
          'What is the "empty" variant of an Option?',
        ],
        explanation: 'An Option has Some and None — not Err. The second arm must be None => (false, "ERROR: User is guest"); Err belongs to Result.',
        whatYouLearned: 'Match Option with Some/None, Result with Ok/Err.',
        conceptId: 'option',
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
        prompt: 'Handle the special case first: no formality and an invalid invitation. Fill the Result check for "is an error".',
        template: `if formality_level.is_none() && invitation_message._____() {
    return Outfit { jacket: Jacket::Flowers, hat: Hat::Baseball };
}`,
        accepted: ['is_err'],
        acceptedPatterns: ['^is_err$'],
        hints: [
          'Result has predicate methods is_ok and is_err.',
          'You want the error case: is_err().',
        ],
        explanation:
          'When there is no formality level AND the invitation is an error, the outfit is Flowers + Baseball — handled before any other rule.',
        whatYouLearned: 'is_err() tests a Result for the error case without unwrapping it.',
        conceptId: 'result',
      },
      {
        prompt: 'When there is no formality level, the jacket is Flowers. Fill the None arm.',
        template: `let jacket = match formality_level {
    None => _____,
    Some(level) if level > 0 => Jacket::White,
    _ => Jacket::Black,
};`,
        accepted: ['Jacket::Flowers'],
        acceptedPatterns: ['^Jacket::Flowers$'],
        hints: [
          'No formality information means the casual choice.',
          'Return Jacket::Flowers.',
        ],
        explanation:
          'A missing formality level (None) maps to the Flowers jacket; the other arms handle the present cases.',
        whatYouLearned: 'Each match arm maps one input case to one result.',
        conceptId: 'pattern_matching',
      },
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
        prompt: 'A formality level of 0 should give the Black jacket. Fill the catch-all pattern for the remaining case.',
        template: `Some(level) if level > 0 => Jacket::White,
_____ => Jacket::Black,`,
        accepted: ['_'],
        acceptedPatterns: ['^_$'],
        hints: [
          'Some(0) is the only case left after None and Some(level > 0).',
          'Use the wildcard pattern _ .',
        ],
        explanation:
          'After None and the positive-level guard, the only remaining case is Some(0); the _ wildcard catches it and yields Black, keeping the match exhaustive.',
        whatYouLearned: '_ catches every remaining case so the match compiles.',
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
      {
        prompt: 'Assemble the final result from the two decisions. Fill the struct being returned.',
        template: `_____ { jacket, hat }`,
        accepted: ['Outfit'],
        acceptedPatterns: ['^Outfit$'],
        hints: [
          'The function returns an outfit.',
          'Build an Outfit struct with the chosen jacket and hat.',
        ],
        explanation:
          'With jacket and hat decided, the function returns Outfit { jacket, hat } using field-init shorthand.',
        whatYouLearned: 'Combine independent decisions into one returned struct.',
        conceptId: 'structs',
      },
      {
        kind: 'choice',
        prompt: 'Which match arm fires only for a formality level greater than 0?',
        options: ['Some(level) if level > 0', 'Some(level > 0)', 'Some(_) if > 0', 'level > 0'],
        correct: [0],
        why: [
          'A pattern Some(level) with a guard if level > 0 is the correct form.',
          'You cannot put an expression inside Some(...) as a pattern.',
          'A guard needs the bound name: if level > 0.',
          'This is a bare condition, not a match pattern.',
        ],
        hints: ['Bind the inner value, then add a condition.', 'The condition after a pattern is a guard (if ...).'],
        explanation: 'Some(level) binds the inner number, and the guard if level > 0 restricts the arm to positive levels; Some(0) then falls through to the next arm.',
        whatYouLearned: 'Pattern + guard: Some(x) if cond.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'The hat choice is inverted. It has TWO bugs (the swapped hats) — click both.',
        code: `let hat = if invitation_message.is_ok() {
    Hat::Snapback
} else {
    Hat::Fedora
};`,
        bugs: [
          { line: 2, token: 'Snapback' },
          { line: 4, token: 'Fedora' },
        ],
        hints: [
          'A valid (Ok) invitation should give the dressier hat.',
          'Compare which hat goes with Ok vs Err.',
        ],
        explanation: 'The hats are swapped: an Ok invitation should give Hat::Fedora and the else (Err) branch Hat::Snapback.',
        whatYouLearned: 'Read which branch is Ok vs Err before assigning.',
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
        prompt: 'The error type lists the ways an office can fail. Fill the keyword that defines such a fixed set of variants.',
        template: `pub _____ ErrorOffice {
    OfficeClose(u32),
    OfficeNotFound(u32),
    OfficeFull(u32),
}`,
        accepted: ['enum'],
        acceptedPatterns: ['^enum$'],
        hints: ['It is one of several named cases.', 'Define it with the enum keyword.'],
        explanation: 'ErrorOffice is an enum: each variant is one kind of failure, carrying the id of the office that produced it.',
        whatYouLearned: 'An enum models a fixed set of alternatives.',
        conceptId: 'enums',
      },
      {
        prompt: 'Each office points to the next one or fails. Fill the type that expresses "value or error".',
        template: `pub struct OfficeOne {
    pub next_office: _____<OfficeTwo, ErrorOffice>,
}`,
        accepted: ['Result'],
        acceptedPatterns: ['^Result$'],
        hints: ['Success or failure is modeled by one std type.', 'It is Result<T, E>.'],
        explanation: 'next_office is a Result<OfficeTwo, ErrorOffice>: Ok holds the next office, Err holds the failure.',
        whatYouLearned: 'Result<T, E> expresses an operation that can fail.',
        conceptId: 'result',
      },
      {
        prompt: 'Fill the error type in the method signature so it matches the offices.',
        template: `pub fn get_document_id(&self) -> Result<u32, _____> {`,
        accepted: ['ErrorOffice'],
        acceptedPatterns: ['^ErrorOffice$'],
        hints: ['The whole chain propagates the same error type.', 'It is ErrorOffice.'],
        explanation: 'The method returns Result<u32, ErrorOffice>: the document id on success, or the first office error encountered.',
        whatYouLearned: 'The function error type must match what ? propagates.',
        conceptId: 'result',
      },
      {
        prompt: 'Walk the chain in one expression. Fill the operator (after the first office) that unwraps each Ok and propagates any Err.',
        template: `self.next_office_____.next_office?.next_office?.document_id`,
        accepted: ['?'],
        acceptedPatterns: ['^\\?$'],
        hints: ['One punctuation mark unwraps a Result or returns early.', 'It is the ? operator.'],
        explanation: 'The ? operator yields the inner value on Ok, or returns the Err from the whole function. Chaining ? walks office to office.',
        whatYouLearned: 'The ? operator replaces a tower of matches with one line.',
        conceptId: 'error_handling',
      },
      {
        prompt: 'The chain ends at the document id. Fill the final field (already a Result).',
        template: `self.next_office?.next_office?.next_office?._____`,
        accepted: ['document_id'],
        acceptedPatterns: ['^document_id$'],
        hints: ['The last office holds the answer.', 'Its field is document_id.'],
        explanation: 'The fourth office document_id is itself a Result<u32, ErrorOffice>, so it is returned directly as the method result.',
        whatYouLearned: 'A trailing Result field can be returned without another ?.',
        conceptId: 'result',
      },
      {
        prompt: 'To hand back a success value explicitly, you wrap it. Fill the Result variant.',
        template: `fn ready(id: u32) -> Result<u32, ErrorOffice> {
    _____(id)
}`,
        accepted: ['Ok'],
        acceptedPatterns: ['^Ok$'],
        hints: ['Success in a Result is the Ok variant.', 'Wrap the value: Ok(id).'],
        explanation: 'A successful Result is built with Ok(value); the ? operator is the inverse — it unwraps an Ok.',
        whatYouLearned: 'Ok(x) constructs the success side of a Result.',
        conceptId: 'result',
      },
      {
        kind: 'choice',
        prompt: 'What does the ? operator do when it meets an Err?',
        options: [
          'returns that Err from the whole function',
          'panics the program',
          'silently ignores it',
          'converts it to None',
        ],
        correct: [0],
        why: [
          'On Err, ? returns it early from the enclosing function.',
          'panic is what unwrap() does, not ?.',
          '? never ignores an error.',
          '? works on Result here, not Option.',
        ],
        hints: ['It is the opposite of unwrap’s panic.', 'It propagates the error upward.'],
        explanation: 'On Ok(v) the ? operator yields v; on Err(e) it returns Err(e) from the function — propagating the failure without a manual match.',
        whatYouLearned: 'The ? operator propagates errors instead of panicking.',
        conceptId: 'error_handling',
      },
      {
        kind: 'bug',
        prompt: 'This walks the office chain but will panic on a failure instead of propagating it. Click the mistake.',
        code: `let two = self.next_office.unwrap();
let three = two.next_office?;`,
        bugs: [{ line: 1, token: 'unwrap' }],
        hints: [
          'unwrap() crashes on an Err.',
          'The chain wants to propagate errors, like the next line does.',
        ],
        explanation: 'unwrap() panics if next_office is an Err. Use ? instead so the error is returned from the function, matching the rest of the chain.',
        whatYouLearned: 'Prefer ? over unwrap() to propagate errors gracefully.',
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
      {
        prompt: 'Numbers under 20 are a direct table lookup. Fill the method that turns the looked-up word into an owned String.',
        template: `if n < 20 {
    return ones[n as usize]._____();
}`,
        accepted: ['to_string'],
        acceptedPatterns: ['^to_string$'],
        hints: [
          'ones[..] is a &str; the function returns a String.',
          'Convert with to_string().',
        ],
        explanation: 'For 0..20 the word is a direct array lookup; to_string() converts the &str into the owned String the function returns.',
        whatYouLearned: 'to_string() turns a &str into an owned String.',
        conceptId: 'collections',
      },
      {
        prompt: 'For 20..100, pick the tens word. Fill the divisor that selects the tens digit.',
        template: `let t = tens[(n / _____) as usize];`,
        accepted: ['10'],
        acceptedPatterns: ['^10$'],
        hints: [
          'You want the tens digit of n.',
          'Integer-divide by 10.',
        ],
        explanation: 'n / 10 drops the ones digit, giving the tens index — e.g. 45 / 10 = 4 selects "forty".',
        whatYouLearned: 'Integer division extracts higher-place digits.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'Join tens and ones with a hyphen. Fill the operator that gets the ones digit.',
        template: `format!("{}-{}", t, ones[(n _____ 10) as usize])`,
        accepted: ['%'],
        acceptedPatterns: ['^%$'],
        hints: [
          'You want the remainder after dividing by 10.',
          'Use the modulo operator %.',
        ],
        explanation: 'n % 10 is the ones digit, so forty (n/10) plus five (n%10) becomes "forty-five".',
        whatYouLearned: 'Modulo extracts the lowest digit.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'Larger numbers are spelled by recursion. Fill the function called on the remainder.',
        template: `// for hundreds: "X hundred" then the rest
format!("{} {}", h, _____(n % 100))`,
        accepted: ['spell'],
        acceptedPatterns: ['^spell$'],
        hints: [
          'The same helper handles whatever is left over.',
          'Call spell recursively.',
        ],
        explanation: 'After naming the hundreds, spell(n % 100) recursively names the remaining two digits — the recursion that scales to thousands and millions.',
        whatYouLearned: 'Recursion breaks a big number into smaller named parts.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'How do you get the ones digit of a number n?',
        options: ['n % 10', 'n / 10', 'n - 10', 'n & 10'],
        correct: [0],
        why: [
          'The remainder after dividing by 10 is the last digit.',
          'n / 10 drops the last digit (gives the higher places).',
          'Subtraction does not isolate a digit.',
          'Bitwise AND with 10 is unrelated to decimal digits.',
        ],
        hints: ['Think remainder.', 'Use the modulo operator.'],
        explanation: 'n % 10 yields the ones digit (45 % 10 == 5), while n / 10 yields the tens and above — together they drive the spelling.',
        whatYouLearned: 'Modulo extracts the last digit; division shifts it away.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'Spelling the magnitude of a negative number goes wrong here. Click the buggy token.',
        code: `// n is negative
format!("minus {}", spell(n as u64))`,
        bugs: [{ line: 2, token: 'n' }],
        hints: [
          'n is negative; casting it straight to u64 gives a huge wrong number.',
          'You need the positive magnitude first.',
        ],
        explanation: 'Casting a negative i64 to u64 wraps to an enormous value. Negate first: spell((-n) as u64) passes the positive magnitude to the speller.',
        whatYouLearned: 'Take the magnitude before converting a negative to unsigned.',
        conceptId: 'error_handling',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 98 — queens
  // -------------------------------------------------------------------------
  queens: {
    overview: {
      whatYouBuild:
        'A chess model with a validated board position and a queen. The key method can_attack decides whether two queens threaten each other — sharing a rank, a file, or a diagonal.',
      inputOutput:
        'ChessPosition::new(rank, file) returns Some only for coordinates on the 8x8 board (else None). Queen::can_attack(other) returns a bool.',
      constraints: [
        'Valid coordinates satisfy rank < 8 and file < 8.',
        'Queens attack along the same rank, the same file, or a diagonal.',
        'A diagonal means the row distance equals the column distance.',
      ],
      commonMistakes: [
        'Comparing usize coordinates directly so the subtraction underflows — cast to i64 before .abs().',
        'Forgetting the diagonal case (only checking rank and file).',
        'Not validating coordinates in ChessPosition::new.',
      ],
    },
    officialDescription: `## queens

Model chess positions and queens.

ChessPosition::new validates a rank and file and returns an Option — Some for a valid square on the 8x8 board, None otherwise.

Queen::can_attack returns true when two queens share a rank, a file, or a diagonal.

### Expected items

~~~
impl ChessPosition {
    pub fn new(rank: usize, file: usize) -> Option<Self>
}
impl Queen {
    pub fn can_attack(self, other: Self) -> bool
}
~~~`,
    objectives: {
      learn: [
        'Validate construction by returning an Option.',
        'Compare coordinates safely by casting before subtraction.',
        'Express a geometric rule as a boolean expression.',
      ],
      whyExists:
        'The queens-attack check is the heart of the N-Queens puzzle and teaches careful signed arithmetic.',
      rustSkills: ['structs', 'Option', 'integer casts', 'boolean logic'],
    },
    conceptIds: ['structs', 'option', 'pattern_matching'],
    conceptNotes: {
      option: 'ChessPosition::new returns None for off-board coordinates, so invalid positions cannot be built.',
    },
    similar: {
      title: 'Same diagonal?',
      prompt:
        'Write a function on_diagonal(r1, c1, r2, c2): all i64, that returns true if the two points lie on a diagonal — that is, the absolute row difference equals the absolute column difference.',
      starter: `pub fn on_diagonal(r1: i64, c1: i64, r2: i64, c2: i64) -> bool {
    // |r1 - r2| == |c1 - c2|
    todo!()
}`,
      hint: 'Use (r1 - r2).abs() == (c1 - c2).abs().',
      concepts: ['pattern_matching'],
      solution: `pub fn on_diagonal(r1: i64, c1: i64, r2: i64, c2: i64) -> bool {
    (r1 - r2).abs() == (c1 - c2).abs()
}`,
    },
    sideQuiz: [
      {
        prompt: 'A board position needs a row and a column. Fill the type of the file (column) field.',
        template: `pub struct ChessPosition {
    pub rank: usize,
    pub file: _____,
}`,
        accepted: ['usize'],
        acceptedPatterns: ['^usize,?$'],
        hints: [
          'Both coordinates are non-negative indices.',
          'Use usize, like rank.',
        ],
        explanation: 'rank and file are board indices, so both are usize — non-negative whole numbers.',
        whatYouLearned: 'usize is the natural type for indices and sizes.',
        conceptId: 'structs',
      },
      {
        prompt: 'Only on-board coordinates are valid. Fill the condition for ChessPosition::new to return Some.',
        template: `pub fn new(rank: usize, file: usize) -> Option<Self> {
    if _____ {
        Some(ChessPosition { rank, file })
    } else {
        None
    }
}`,
        accepted: ['rank < 8 && file < 8'],
        acceptedPatterns: ['^rank\\s*<\\s*8\\s*&&\\s*file\\s*<\\s*8$'],
        hints: ['The board is 8x8, indices 0..8.', 'Both rank and file must be below 8.'],
        explanation: 'A square is valid only when both coordinates are in 0..8, so we return Some then, and None otherwise.',
        whatYouLearned: 'Returning Option from a constructor rejects invalid input by design.',
        conceptId: 'option',
      },
      {
        prompt: 'Off-board coordinates are rejected. Fill the else branch of ChessPosition::new.',
        template: `if rank < 8 && file < 8 {
    Some(ChessPosition { rank, file })
} else {
    _____
}`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: [
          'An invalid position has no value.',
          'Return None.',
        ],
        explanation: 'Coordinates outside the 8x8 board cannot form a valid position, so new returns None for them.',
        whatYouLearned: 'None signals construction failed validation.',
        conceptId: 'option',
      },
      {
        prompt: 'Two queens attack on a diagonal when the row distance equals the column distance. Fill the diagonal test.',
        template: `// r1,f1,r2,f2 are i64
r1 == r2 || f1 == f2 || _____`,
        accepted: ['(r1 - r2).abs() == (f1 - f2).abs()'],
        acceptedPatterns: ['^\\(r1\\s*-\\s*r2\\)\\.abs\\(\\)\\s*==\\s*\\(f1\\s*-\\s*f2\\)\\.abs\\(\\)$'],
        hints: ['A diagonal has equal vertical and horizontal distance.', 'Compare (r1 - r2).abs() with (f1 - f2).abs().'],
        explanation: 'Same rank or same file covers straight lines; equal absolute differences covers diagonals. Casting to i64 first lets the subtraction go negative safely.',
        whatYouLearned: 'Cast unsigned coordinates to signed before subtracting.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'Why cast at all? Fill the signed type the coordinates are converted to before subtracting.',
        template: `let (r1, f1) = (self.position.rank as _____, self.position.file as i64);`,
        accepted: ['i64'],
        acceptedPatterns: ['^i64$'],
        hints: [
          'usize subtraction can underflow when the second value is larger.',
          'Cast to a signed type: i64.',
        ],
        explanation: 'Casting usize coordinates to i64 lets (r1 - r2) go negative safely, so .abs() measures the true distance.',
        whatYouLearned: 'Convert to signed before a subtraction that may go negative.',
        conceptId: 'structs',
      },
      {
        prompt: 'Assemble the full attack rule: same rank, same file, or same diagonal. Fill the diagonal test.',
        template: `r1 == r2 || f1 == f2 || _____`,
        accepted: ['(r1 - r2).abs() == (f1 - f2).abs()'],
        acceptedPatterns: ['^\\(r1\\s*-\\s*r2\\)\\.abs\\(\\)\\s*==\\s*\\(f1\\s*-\\s*f2\\)\\.abs\\(\\)$'],
        hints: [
          'A diagonal has equal vertical and horizontal distance.',
          'Compare (r1 - r2).abs() with (f1 - f2).abs().',
        ],
        explanation: 'The complete rule ORs three cases: same rank, same file, or equal absolute differences (a diagonal). Any one makes the queens attack.',
        whatYouLearned: 'Combine independent conditions with || for the final rule.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'Two queens share a diagonal exactly when:',
        options: [
          '(r1 - r2).abs() == (f1 - f2).abs()',
          'r1 == r2',
          'f1 == f2',
          'r1 + f1 == r2 + f2',
        ],
        correct: [0],
        why: [
          'Equal row distance and column distance means a diagonal.',
          'Equal ranks means the same row, not a diagonal.',
          'Equal files means the same column, not a diagonal.',
          'That captures only one of the two diagonal directions.',
        ],
        hints: ['A diagonal step changes row and column by the same amount.', 'Compare the absolute differences.'],
        explanation: 'On a diagonal the vertical and horizontal distances are equal, so |r1 - r2| == |f1 - f2| (covering both diagonal directions).',
        whatYouLearned: 'Diagonal ⇔ equal absolute row/column differences.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'ChessPosition::new should reject off-board coordinates. Click the mistake.',
        code: `pub fn new(rank: usize, file: usize) -> Option<Self> {
    if rank < 8 && file < 8 {
        Some(ChessPosition { rank, file })
    } else {
        Some(ChessPosition { rank, file })
    }
}`,
        bugs: [{ line: 5, token: 'Some' }],
        hints: [
          'What should happen for invalid coordinates?',
          'Look at the else branch.',
        ],
        explanation: 'The else branch handles off-board coordinates, so it must return None, not another Some — otherwise invalid positions are accepted.',
        whatYouLearned: 'A validating constructor returns None on failure.',
        conceptId: 'option',
      },
      {
        kind: 'order',
        prompt: 'Assemble can_attack. One fragment does not belong.',
        scaffold: `pub fn can_attack(self, other: Self) -> bool {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
}`,
        fragments: [
          'let (r1, f1) = (self.position.rank as i64, self.position.file as i64);',
          'let (r2, f2) = (other.position.rank as i64, other.position.file as i64);',
          'r1 == r2 || f1 == f2 || (r1 - r2).abs() == (f1 - f2).abs()',
        ],
        distractors: [
          'r1 == r2 && f1 == f2 && r1 == f1',
        ],
        hints: [
          'Cast both positions to i64 first, then test the three attack lines.',
          'The result combines rank, file, and diagonal with ||.',
        ],
        explanation: 'Bind both positions as signed pairs, then return the OR of same-rank, same-file, and same-diagonal. The && fragment is wrong — queens attack if ANY line matches, not all.',
        whatYouLearned: 'Cast, then OR the three attack conditions.',
        conceptId: 'pattern_matching',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 100 — scytale_decoder
  // -------------------------------------------------------------------------
  scytale_decoder: {
    overview: {
      whatYouBuild:
        'A decoder for the scytale transposition cipher. The ciphertext was written row by row into a grid; decoding reads it back column by column. Invalid inputs return None.',
      inputOutput:
        'Input: s: String and letters_per_turn: usize. Output: Option<String> — Some(decoded) or None when the input is empty, the turn count is 0, or the length is not divisible by letters_per_turn.',
      constraints: [
        'Empty message or letters_per_turn == 0 -> None.',
        'Length must be divisible by letters_per_turn, else None.',
        'Read the grid column by column to undo the row-by-row encoding.',
      ],
      commonMistakes: [
        'Indexing the grid the wrong way (row vs column) and reversing the cipher incorrectly.',
        'Forgetting the divisibility / empty validation.',
        'Counting bytes instead of chars().',
      ],
    },
    officialDescription: `## scytale_decoder

Decode a scytale cipher. The message was written into a grid row by row with letters_per_turn columns; to decode, read it back column by column.

Return None when the message is empty, when letters_per_turn is 0, or when the message length is not divisible by letters_per_turn.

### Expected function

~~~
pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String>
~~~`,
    objectives: {
      learn: [
        'Validate inputs and return None for the invalid cases.',
        'Index a flat sequence as a 2-D grid.',
        'Reorder characters by reading columns instead of rows.',
      ],
      whyExists:
        'Transposition ciphers teach index arithmetic over a grid stored in a flat Vec.',
      rustSkills: ['Option', 'slices/Vec', 'nested loops', 'index math'],
    },
    conceptIds: ['option', 'collections', 'iterators'],
    conceptNotes: {
      option: 'Every invalid case (empty, zero columns, non-divisible length) returns None instead of a wrong answer.',
      collections: 'The characters are collected into a Vec<char> so they can be indexed as a grid.',
    },
    similar: {
      title: 'Rectangle check',
      prompt:
        'Write a function that returns Some(rows) — the number of rows — when len is exactly divisible by cols (and cols > 0), or None otherwise. This is the validation step the decoder needs first.',
      starter: `pub fn rows_for(len: usize, cols: usize) -> Option<usize> {
    // None if cols == 0 or len % cols != 0
    todo!()
}`,
      hint: 'Guard cols == 0 and len % cols != 0 first, else Some(len / cols).',
      concepts: ['option'],
      solution: `pub fn rows_for(len: usize, cols: usize) -> Option<usize> {
    if cols == 0 || len % cols != 0 {
        return None;
    }
    Some(len / cols)
}`,
    },
    sideQuiz: [
      {
        prompt: 'Reject the impossible inputs first. Fill what is returned for an empty message or zero columns.',
        template: `if s.is_empty() || letters_per_turn == 0 {
    return _____;
}`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: [
          'There is nothing to decode in these cases.',
          'Return None.',
        ],
        explanation: 'An empty message or a column count of zero cannot describe a grid, so the decoder bails out with None.',
        whatYouLearned: 'Validate the easy impossible cases before any work.',
        conceptId: 'option',
      },
      {
        prompt: 'The grid must be a clean rectangle. Fill the condition that rejects a non-divisible length.',
        template: `let len = s.chars().count();
if _____ {
    return None;
}`,
        accepted: ['len % letters_per_turn != 0'],
        acceptedPatterns: ['^len\\s*%\\s*letters_per_turn\\s*!=\\s*0$'],
        hints: ['The letters must fill complete columns.', 'Use the remainder operator: len % letters_per_turn != 0.'],
        explanation: 'If the length is not a multiple of the column count the grid is ragged and cannot be decoded, so we return None.',
        whatYouLearned: 'The modulo operator checks divisibility.',
        conceptId: 'option',
      },
      {
        prompt: 'Work out the grid height. Fill the divisor that gives the number of rows.',
        template: `let rows = len / _____;`,
        accepted: ['letters_per_turn'],
        acceptedPatterns: ['^letters_per_turn$'],
        hints: [
          'Total letters divided by columns gives rows.',
          'Divide by letters_per_turn.',
        ],
        explanation: 'len / letters_per_turn is the number of rows in the grid, since each row holds letters_per_turn characters.',
        whatYouLearned: 'Grid height = total / width.',
        conceptId: 'collections',
      },
      {
        prompt: 'Index the message as characters, not bytes. Fill the consumer that gathers them into a Vec<char>.',
        template: `let chars: Vec<char> = s.chars()._____;`,
        accepted: ['collect()'],
        acceptedPatterns: ['^collect\\(\\)$'],
        hints: [
          'chars() is an iterator; you want a Vec.',
          'Finish with collect().',
        ],
        explanation: 'Collecting into Vec<char> lets us index the grid by (row, col); using chars avoids byte-vs-character bugs.',
        whatYouLearned: 'Collect chars into a Vec for random access.',
        conceptId: 'collections',
      },
      {
        prompt: 'Read the grid column by column. Fill the flat index for the character at (row, col).',
        template: `for col in 0..letters_per_turn {
    for row in 0..rows {
        result.push(chars[_____]);
    }
}`,
        accepted: ['row * letters_per_turn + col'],
        acceptedPatterns: ['^row\\s*\\*\\s*letters_per_turn\\s*\\+\\s*col$'],
        hints: ['The grid was filled row by row.', 'Element (row, col) sits at row * width + col.'],
        explanation: 'Since encoding wrote rows of letters_per_turn characters, the cell (row, col) is at row * letters_per_turn + col. Iterating col-major undoes the cipher.',
        whatYouLearned: 'Row-major flattening: index = row * width + col.',
        conceptId: 'collections',
      },
      {
        prompt: 'Return the decoded text. Fill the Option variant that wraps a successful result.',
        template: `// result holds the decoded message
_____(result)`,
        accepted: ['Some'],
        acceptedPatterns: ['^Some$'],
        hints: [
          'Success in an Option is wrapped.',
          'Use Some(result).',
        ],
        explanation: 'After all validations pass and the grid is read column by column, the decoded String is returned as Some(result).',
        whatYouLearned: 'Some(x) wraps the successful result of an Option-returning function.',
        conceptId: 'option',
      },
      {
        kind: 'choice',
        prompt: 'Which condition detects a length that is NOT a clean multiple of the column count?',
        options: ['len % letters_per_turn != 0', 'len / letters_per_turn', 'len == letters_per_turn', 'letters_per_turn % len != 0'],
        correct: [0],
        why: [
          'A non-zero remainder means the grid is not a clean rectangle.',
          'Division gives the row count, not a divisibility test.',
          'Equality is unrelated to divisibility.',
          'The operands are the wrong way round.',
        ],
        hints: ['Think remainder.', 'len divided by columns must leave nothing over.'],
        explanation: 'If len % letters_per_turn != 0 the characters cannot fill complete columns, so the message is invalid and the decoder returns None.',
        whatYouLearned: 'Modulo checks for a clean rectangular fit.',
        conceptId: 'option',
      },
      {
        kind: 'bug',
        prompt: 'This guard returns the wrong thing for invalid input. Click the mistake.',
        code: `if s.is_empty() || letters_per_turn == 0 {
    return Some(s);
}`,
        bugs: [{ line: 2, token: 'Some' }],
        hints: [
          'Empty input or zero columns cannot be decoded.',
          'What does an Option-returning function give on failure?',
        ],
        explanation: 'Invalid input has no decoding, so the guard must return None, not Some(s). Returning Some would hand back the raw (undecoded) string.',
        whatYouLearned: 'Return None for the invalid cases of an Option function.',
        conceptId: 'option',
      },
      {
        kind: 'order',
        prompt: 'Assemble scytale_decoder. One fragment does not belong.',
        scaffold: `pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
    [ slot 4 ]
}`,
        fragments: [
          'if s.is_empty() || letters_per_turn == 0 { return None; }',
          'let len = s.chars().count(); if len % letters_per_turn != 0 { return None; }',
          'let rows = len / letters_per_turn; let chars: Vec<char> = s.chars().collect(); let mut result = String::new(); for col in 0..letters_per_turn { for row in 0..rows { result.push(chars[row * letters_per_turn + col]); } }',
          'Some(result)',
        ],
        distractors: [
          'let rows = letters_per_turn / len;',
        ],
        hints: [
          'Validate first (empty/zero, then divisibility), then read the grid column by column.',
          'rows = len / letters_per_turn, not the other way round.',
        ],
        explanation: 'Reject the impossible cases, check the length divides evenly, read the grid column-major into result, then return Some(result). The rows = letters_per_turn / len fragment is a distractor with the division reversed.',
        whatYouLearned: 'Validate, then transform, then wrap in Some.',
        conceptId: 'option',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 101 — matrix_display
  // -------------------------------------------------------------------------
  matrix_display: {
    overview: {
      whatYouBuild:
        'A Matrix type that prints itself nicely. Implementing Display makes each row appear as "(a b c)" with rows separated by newlines.',
      inputOutput:
        'Matrix::new(&[&[i32]]) builds the matrix. Printing it with {} yields one parenthesized, space-separated row per line.',
      constraints: [
        'Implement std::fmt::Display for Matrix.',
        'Each row prints as "(n n n)" with single spaces between numbers.',
        'Rows are joined by newlines, with no trailing newline.',
      ],
      commonMistakes: [
        'Adding a trailing newline after the last row.',
        'Using commas instead of spaces between numbers.',
        'Trying to println! inside fmt instead of using write!.',
      ],
    },
    officialDescription: `## matrix_display

Implement Display for a Matrix so that printing it produces one row per line, each row wrapped in parentheses with its numbers separated by single spaces.

### Expected items

~~~
pub struct Matrix(pub Vec<Vec<i32>>);
impl std::fmt::Display for Matrix { ... }
~~~

### Usage

A 2x2 matrix prints as two lines like "(1 2)" and "(3 4)".`,
    objectives: {
      learn: [
        'Implement the Display trait with write!.',
        'Build per-row strings with map + join.',
        'Join lines with newlines without a trailing one.',
      ],
      whyExists:
        'Custom Display is essential whenever tests compare printed output exactly.',
      rustSkills: ['traits', 'Display', 'iterators', 'String join'],
    },
    conceptIds: ['display_trait', 'traits', 'iterators'],
    conceptNotes: {
      display_trait: 'write!(f, ...) sends formatted text to the formatter; format! builds each row string.',
      iterators: 'map turns each row into "(...)" and join stitches the lines together.',
    },
    similar: {
      title: 'Print a row',
      prompt:
        'Write a function row_string(row: &[i32]) -> String that returns the row as "(1 2 3)". This is the per-row helper the Display impl uses.',
      starter: `pub fn row_string(row: &[i32]) -> String {
    // stringify each number, join with spaces, wrap in parentheses
    todo!()
}`,
      hint: 'Map each n to n.to_string(), collect into Vec<String>, join(" "), then format!("({})", joined).',
      concepts: ['iterators', 'display_trait'],
      solution: `pub fn row_string(row: &[i32]) -> String {
    let cells: Vec<String> = row.iter().map(|n| n.to_string()).collect();
    format!("({})", cells.join(" "))
}`,
    },
    sideQuiz: [
      {
        prompt: 'A Matrix wraps rows of numbers. Fill the element type stored in the grid.',
        template: `pub struct Matrix(pub Vec<Vec<_____>>);`,
        accepted: ['i32'],
        acceptedPatterns: ['^i32$'],
        hints: [
          'The cells are whole signed numbers.',
          'Use i32.',
        ],
        explanation: 'Matrix is a tuple struct wrapping a Vec of rows, each a Vec<i32> of cell values.',
        whatYouLearned: 'A tuple struct gives a name to a wrapped type.',
        conceptId: 'structs',
      },
      {
        prompt: 'Implement Display. Fill the return type of the fmt method.',
        template: `fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::_____ {`,
        accepted: ['Result'],
        acceptedPatterns: ['^Result$'],
        hints: [
          'Formatting can fail, so it returns a Result.',
          'The type is fmt::Result.',
        ],
        explanation: 'Display::fmt returns fmt::Result, which write! produces — propagating any formatting error.',
        whatYouLearned: 'Display::fmt returns fmt::Result.',
        conceptId: 'display_trait',
      },
      {
        prompt: 'Wrap a row of stringified cells. Fill the format so it becomes "(a b c)".',
        template: `let cells: Vec<String> = row.iter().map(|n| n.to_string()).collect();
let line = format!("(_____)", cells.join(" "));`,
        accepted: ['{}'],
        acceptedPatterns: ['^\\{\\}$'],
        hints: ['format! uses {} as a placeholder.', 'Put a single {} between the parentheses.'],
        explanation: 'The literal parentheses surround a {} placeholder, which is filled by the space-joined cells, giving "(1 2 3)".',
        whatYouLearned: 'format! mixes literal text with {} placeholders.',
        conceptId: 'display_trait',
      },
      {
        prompt: 'Turn each number into text before joining. Fill the method that stringifies a number.',
        template: `let cells: Vec<String> = row.iter().map(|n| n._____()).collect();`,
        accepted: ['to_string'],
        acceptedPatterns: ['^to_string$'],
        hints: [
          'You need each i32 as a String.',
          'Use to_string().',
        ],
        explanation: 'Mapping each number through to_string() produces the Vec<String> that join(" ") then stitches into a row.',
        whatYouLearned: 'map(|n| n.to_string()) converts a row of numbers to strings.',
        conceptId: 'iterators',
      },
      {
        prompt: 'Inside fmt, send the joined lines to the formatter. Fill the macro used (not println!).',
        template: `impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // lines: Vec<String>
        _____(f, "{}", lines.join("\\n"))
    }
}`,
        accepted: ['write!'],
        acceptedPatterns: ['^write!$'],
        hints: ['You write into the formatter f, not stdout.', 'The macro is write! .'],
        explanation: 'Inside a Display impl you use write!(f, ...) to send text to the formatter; println! would go to stdout and is wrong here.',
        whatYouLearned: 'write!(f, ...) is how Display produces its output.',
        conceptId: 'display_trait',
      },
      {
        kind: 'choice',
        prompt: 'Inside a Display::fmt implementation, which macro emits the output?',
        options: ['write!', 'println!', 'print!', 'format!'],
        correct: [0],
        why: [
          'write!(f, ...) sends formatted text to the formatter.',
          'println! goes to stdout, bypassing the formatter.',
          'print! also writes to stdout, not f.',
          'format! builds a String but does not write to f.',
        ],
        hints: ['You write into the formatter f.', 'It looks like print but takes f first.'],
        explanation: 'Display::fmt receives a Formatter f and must write into it with write!(f, ...); println!/print! would wrongly target stdout.',
        whatYouLearned: 'Use write!(f, ...) inside fmt, not println!.',
        conceptId: 'display_trait',
      },
      {
        kind: 'bug',
        prompt: 'This Display impl writes to the wrong place. Click the mistake.',
        code: `fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    println!("{}", self.0.len());
    Ok(())
}`,
        bugs: [{ line: 2, token: 'println' }],
        hints: [
          'The output must go into the formatter, not stdout.',
          'Look at the macro used.',
        ],
        explanation: 'println! prints to stdout and ignores f; it must be write!(f, "{}", ...) so the formatted text becomes the value’s Display output.',
        whatYouLearned: 'fmt writes into f with write!, never println!.',
        conceptId: 'display_trait',
      },
      {
        kind: 'match',
        prompt: 'Match each piece of the Matrix Display to its job.',
        pairs: [
          { left: 'self.0.iter()', right: 'iterate over the rows' },
          { left: '.map(|n| n.to_string())', right: 'turn numbers into text' },
          { left: 'cells.join(" ")', right: 'space-separate a row' },
          { left: 'lines.join("\\n")', right: 'put each row on its own line' },
        ],
        hints: [
          'iter walks the rows; map transforms each number.',
          'join(" ") spaces cells within a row; join("\\n") stacks rows.',
        ],
        explanation: 'The rows are iterated, each number stringified, the cells joined by spaces into "(a b c)", and finally the row strings joined by newlines so each row prints on its own line.',
        whatYouLearned: 'map + join build the formatted rows and the final layout.',
        conceptId: 'iterators',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 102 — office_worker
  // -------------------------------------------------------------------------
  office_worker: {
    overview: {
      whatYouBuild:
        'A worker type built from a comma-separated string via the From trait. "name,age,role" converts into an OfficeWorker, and the role word converts into a WorkerRole enum.',
      inputOutput:
        'WorkerRole::from("admin") -> Admin. OfficeWorker::from("Ada,30,admin") -> a worker with those fields.',
      constraints: [
        'Implement From<&str> for WorkerRole ("admin"/"user"/anything else -> Guest).',
        'Implement From<&str> for OfficeWorker by splitting on commas.',
        'Parse the age field into a number.',
      ],
      commonMistakes: [
        'Not handling the default (Guest) role for unknown words.',
        'Forgetting to parse the age string into u32.',
        'Indexing split parts without collecting them first.',
      ],
    },
    officialDescription: `## office_worker

Implement the From trait so an OfficeWorker can be created from a string of the form "name,age,role", and a WorkerRole can be created from a role word.

The role is admin, user, or anything else (which becomes Guest).

### Expected items

~~~
impl From<&str> for WorkerRole { ... }
impl From<&str> for OfficeWorker { ... }
~~~`,
    objectives: {
      learn: [
        'Implement the From trait for ergonomic conversions.',
        'Split a string and parse fields.',
        'Map words to enum variants with match.',
      ],
      whyExists:
        'From/Into conversions are everywhere in Rust APIs; this teaches you to write them.',
      rustSkills: ['traits', 'From', 'enums', 'string parsing'],
    },
    conceptIds: ['traits', 'enums', 'structs', 'pattern_matching'],
    conceptNotes: {
      traits: 'Implementing From<&str> gives you .into() and From::from for free.',
      pattern_matching: 'A match maps each role word to its WorkerRole variant, with _ as the Guest default.',
    },
    similar: {
      title: 'Parse a point',
      prompt:
        'Implement From<&str> for a Point { x: i32, y: i32 } where the input looks like "3,4". Same split-and-parse pattern as the worker.',
      starter: `pub struct Point { pub x: i32, pub y: i32 }

impl From<&str> for Point {
    fn from(s: &str) -> Self {
        // split on ',', parse both numbers
        todo!()
    }
}`,
      hint: 'let p: Vec<&str> = s.split(\',\').collect(); then parse p[0] and p[1].',
      concepts: ['traits', 'structs'],
      solution: `pub struct Point { pub x: i32, pub y: i32 }

impl From<&str> for Point {
    fn from(s: &str) -> Self {
        let p: Vec<&str> = s.split(',').collect();
        Point { x: p[0].parse().unwrap(), y: p[1].parse().unwrap() }
    }
}`,
    },
    sideQuiz: [
      {
        prompt: 'A conversion from text is the From trait. Fill the trait being implemented.',
        template: `impl _____<&str> for WorkerRole {
    fn from(s: &str) -> Self { /* ... */ }
}`,
        accepted: ['From'],
        acceptedPatterns: ['^From$'],
        hints: [
          'It converts a &str into a WorkerRole.',
          'Implement From<&str>.',
        ],
        explanation: 'Implementing From<&str> for WorkerRole gives an ergonomic conversion (and .into() for free).',
        whatYouLearned: 'From<T> defines how to build a type from a T.',
        conceptId: 'traits',
      },
      {
        prompt: 'Map the "admin" word to its variant. Fill the WorkerRole variant.',
        template: `match s {
    "admin" => WorkerRole::_____,
    "user" => WorkerRole::User,
    _ => WorkerRole::Guest,
}`,
        accepted: ['Admin'],
        acceptedPatterns: ['^Admin,?$'],
        hints: [
          'The privileged role.',
          'It is WorkerRole::Admin.',
        ],
        explanation: 'Each known word maps to its variant; "admin" becomes WorkerRole::Admin.',
        whatYouLearned: 'match maps string keys to enum variants.',
        conceptId: 'enums',
      },
      {
        prompt: 'Map a role word to its variant. Fill the catch-all arm so unknown words become Guest.',
        template: `match s {
    "admin" => WorkerRole::Admin,
    "user" => WorkerRole::User,
    _____ => WorkerRole::Guest,
}`,
        accepted: ['_'],
        acceptedPatterns: ['^_$'],
        hints: ['You need a pattern that matches everything else.', 'The wildcard pattern is _ .'],
        explanation: 'The _ arm catches every word that is not "admin" or "user", defaulting them to Guest and keeping the match exhaustive.',
        whatYouLearned: '_ is the catch-all pattern that makes a match exhaustive.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'Split "name,age,role" into its parts. Fill the separator passed to split.',
        template: `let parts: Vec<&str> = s.split(_____).collect();`,
        accepted: ["','", '\',\''],
        acceptedPatterns: ["^'\\,'$"],
        hints: ['The fields are comma-separated.', 'Split on the character literal \',\'.'],
        explanation: "s.split(',') breaks the string at each comma; collecting gives [name, age, role] for indexing.",
        whatYouLearned: 'str::split takes a pattern such as a char to break a string into pieces.',
        conceptId: 'traits',
      },
      {
        prompt: 'The age field arrives as text. Fill the method that converts it to a number.',
        template: `OfficeWorker {
    name: parts[0].to_string(),
    age: parts[1]._____().unwrap(),
    role: WorkerRole::from(parts[2]),
}`,
        accepted: ['parse'],
        acceptedPatterns: ['^parse$'],
        hints: [
          'A &str becomes a number via one method.',
          'Use parse() (its target type is inferred from the field).',
        ],
        explanation: 'parts[1].parse().unwrap() turns the age text into the numeric age field; the field type tells parse what to produce.',
        whatYouLearned: 'str::parse converts text into a number.',
        conceptId: 'traits',
      },
      {
        prompt: 'Reuse the role conversion you wrote earlier. Fill the From method that turns the third part into a WorkerRole.',
        template: `role: WorkerRole::_____(parts[2]),`,
        accepted: ['from'],
        acceptedPatterns: ['^from$'],
        hints: [
          'You implemented From<&str> for WorkerRole.',
          'Call WorkerRole::from(parts[2]).',
        ],
        explanation: 'WorkerRole::from(parts[2]) reuses the role conversion, so building the worker composes the two From impls.',
        whatYouLearned: 'From impls compose: one conversion can call another.',
        conceptId: 'traits',
      },
      {
        kind: 'choice',
        prompt: 'You implemented From<&str> for WorkerRole. Which method does that give you for free?',
        options: ['.into()', '.parse()', '.as_str()', '.clone()'],
        correct: [0],
        why: [
          'Implementing From<T> automatically provides Into for the reverse direction, so "admin".into() works.',
          'parse() comes from FromStr, a different trait.',
          'as_str() is unrelated to conversion.',
          'clone() duplicates a value; it is not a conversion.',
        ],
        hints: ['From and Into are paired.', 'It is the dual of From.'],
        explanation: 'A From<A> for B impl gives a matching Into<B> for A for free, so you can write let r: WorkerRole = "admin".into();',
        whatYouLearned: 'Implement From; get Into automatically.',
        conceptId: 'traits',
      },
      {
        kind: 'bug',
        prompt: 'The fields are filled from the wrong parts. It has TWO bugs (swapped indices) — click both.',
        code: `OfficeWorker {
    name: parts[1].to_string(),
    age: parts[0].parse().unwrap(),
    role: WorkerRole::from(parts[2]),
}`,
        bugs: [
          { line: 2, token: '1' },
          { line: 3, token: '0' },
        ],
        hints: [
          'The input is "name,age,role" in that order.',
          'Check which index feeds name and which feeds age.',
        ],
        explanation: 'For "name,age,role", parts[0] is the name and parts[1] is the age. They are swapped here — name should use parts[0] and age parts[1].',
        whatYouLearned: 'Map split parts to fields in the right order.',
        conceptId: 'traits',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 103 — organize_garage
  // -------------------------------------------------------------------------
  organize_garage: {
    overview: {
      whatYouBuild:
        'A generic Garage<T> holding an optional value on the left and right. Moving a value to one side adds it to whatever is already there (so T must support +), then clears the other side.',
      inputOutput:
        'move_to_right() shifts the left value rightward (summing if the right is occupied) and leaves the left empty; move_to_left() mirrors it.',
      constraints: [
        'Garage is generic over T; methods require T: Add<Output = T> + Copy.',
        'Moving into an occupied side sums the two values.',
        'After a move, the source side becomes None.',
      ],
      commonMistakes: [
        'Forgetting the trait bounds (Add and Copy) on the impl.',
        'Not clearing the source side after the move.',
        'Mishandling the empty-destination case (no addition needed).',
      ],
    },
    officialDescription: `## organize_garage

Create a generic Garage<T> with an optional value on the left and on the right.

move_to_right moves the left value to the right, adding it to the existing right value if there is one, then empties the left. move_to_left is the mirror image.

The element type must support addition and be copyable.

### Expected items

~~~
pub struct Garage<T> { pub left: Option<T>, pub right: Option<T> }
impl<T: Add<Output = T> + Copy> Garage<T> { ... }
~~~`,
    objectives: {
      learn: [
        'Write a generic struct and constrained impl.',
        'Use trait bounds (Add, Copy) to enable operations.',
        'Combine Option values with match.',
      ],
      whyExists:
        'It introduces generics with trait bounds — writing code that works for many types under stated requirements.',
      rustSkills: ['generics', 'trait bounds', 'Option', 'match'],
    },
    conceptIds: ['generics', 'option', 'pattern_matching'],
    conceptNotes: {
      generics: 'Garage<T> works for any T that is addable and Copy, declared as impl<T: Add<Output = T> + Copy>.',
      option: 'Each side is an Option<T>; take/match handle the present and absent cases.',
    },
    similar: {
      title: 'Generic pair max',
      prompt:
        'Write a generic function bigger<T: PartialOrd>(a: T, b: T) -> T that returns the larger of two values. Same idea of a type parameter with a trait bound.',
      starter: `pub fn bigger<T: PartialOrd>(a: T, b: T) -> T {
    // return whichever is greater
    todo!()
}`,
      hint: 'if a >= b { a } else { b } — PartialOrd enables the comparison.',
      concepts: ['generics'],
      solution: `pub fn bigger<T: PartialOrd>(a: T, b: T) -> T {
    if a >= b { a } else { b }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Each side of the garage may be empty. Fill the type wrapping the left value.',
        template: `pub struct Garage<T> {
    pub left: _____<T>,
    pub right: Option<T>,
}`,
        accepted: ['Option'],
        acceptedPatterns: ['^Option$'],
        hints: [
          'A side either holds a value or is empty.',
          'Use Option<T>.',
        ],
        explanation: 'Each side is an Option<T>: Some(value) when occupied, None when empty.',
        whatYouLearned: 'Option<T> models a slot that may be empty.',
        conceptId: 'option',
      },
      {
        prompt: 'Using + on values requires a trait. Fill the trait imported from std::ops.',
        template: `use std::ops::_____;`,
        accepted: ['Add'],
        acceptedPatterns: ['^Add$'],
        hints: [
          'The + operator is backed by one trait.',
          'Import Add.',
        ],
        explanation: 'The + operator is defined by the Add trait, which the method bounds require so values can be summed.',
        whatYouLearned: 'Operators map to traits (+ is Add).',
        conceptId: 'generics',
      },
      {
        prompt: 'The impl needs T to be addable and copyable. Fill the trait bounds.',
        template: `impl<T: _____> Garage<T> {
    // move_to_right, move_to_left ...
}`,
        accepted: ['Add<Output = T> + Copy'],
        acceptedPatterns: ['^Add<Output = T>\\s*\\+\\s*Copy$'],
        hints: ['You use + on values, and you read them without moving.', 'Require Add<Output = T> + Copy.'],
        explanation: 'Add<Output = T> lets you write a + b returning a T, and Copy lets you read a value out of an Option without moving it.',
        whatYouLearned: 'Trait bounds state what operations a generic type must support.',
        conceptId: 'generics',
      },
      {
        prompt: 'Only act when the source side has a value. Fill the pattern that binds the right value r.',
        template: `pub fn move_to_left(&mut self) {
    if let _____ = self.right {
        // combine into the left, then clear the right
    }
}`,
        accepted: ['Some(r)'],
        acceptedPatterns: ['^Some\\(r\\)$'],
        hints: [
          'You want to run only when right is occupied.',
          'Match Some(r) with if let.',
        ],
        explanation: 'if let Some(r) = self.right runs the body only when the right side holds a value, binding it to r.',
        whatYouLearned: 'if let runs code only for the matching pattern.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'When moving left into an occupied right, sum them. Fill the arm for an already-present right value r.',
        template: `self.right = Some(match self.right {
    Some(r) => _____,
    None => l,
});`,
        accepted: ['r + l'],
        acceptedPatterns: ['^r\\s*\\+\\s*l$'],
        hints: ['Both sides hold a value here.', 'Add them: r + l.'],
        explanation: 'If the right already holds r, the moved-in l is added to it (r + l); if the right was empty, l simply lands there.',
        whatYouLearned: 'match handles the present (Some) and absent (None) cases distinctly.',
        conceptId: 'option',
      },
      {
        prompt: 'After moving a value across, empty the source side. Fill the value assigned to clear it.',
        template: `// the right value has been moved into the left
self.right = _____;`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: [
          'The source side is now empty.',
          'Set it to None.',
        ],
        explanation: 'Once the right value has been combined into the left, the right side is cleared by assigning None.',
        whatYouLearned: 'Set an Option to None to mark it empty.',
        conceptId: 'option',
      },
      {
        kind: 'choice',
        prompt: 'Which trait bound lets you use + on values of type T?',
        options: ['T: Add<Output = T>', 'T: Sum', 'T: Ord', 'T: Default'],
        correct: [0],
        why: [
          'The + operator is provided by the Add trait.',
          'Sum is for totalling an iterator, not the + operator.',
          'Ord is for comparison/ordering.',
          'Default provides a zero value, not addition.',
        ],
        hints: ['Operators map to traits.', '+ is the Add trait.'],
        explanation: 'Add<Output = T> means a + b is valid and yields a T, which is what the garage needs to combine two values.',
        whatYouLearned: 'The + operator requires the Add trait bound.',
        conceptId: 'generics',
      },
      {
        kind: 'bug',
        prompt: 'After moving the value right, the source side is not cleared. Click the mistake.',
        code: `if let Some(l) = self.left {
    self.right = Some(l);
    self.left = Some(l);
}`,
        bugs: [{ line: 3, token: 'Some' }],
        hints: [
          'Once moved, the left side should be empty.',
          'Look at what self.left is set to.',
        ],
        explanation: 'After moving the value to the right, the left must be emptied: self.left = None. Setting it to Some(l) leaves the value duplicated on both sides.',
        whatYouLearned: 'Clear the source side (None) after a move.',
        conceptId: 'option',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 104 — blood_types_s
  // -------------------------------------------------------------------------
  blood_types_s: {
    overview: {
      whatYouBuild:
        'A blood-type compatibility model. A BloodType is an antigen (A/AB/B/O) plus an Rh factor (+/-). can_receive_from encodes the transfusion rules, and donors/recipients list all compatible types.',
      inputOutput:
        'can_receive_from(other) -> bool. donors() / recipients() -> Vec<BloodType> filtered from all eight types.',
      constraints: [
        'O antigen is universal donor; AB antigen is universal recipient.',
        'An Rh- donor works for anyone; an Rh+ donor only for an Rh+ recipient.',
        'donors and recipients filter the full list of 8 types by the rule.',
      ],
      commonMistakes: [
        'Reversing the donor/recipient direction in the filter.',
        'Getting the Rh rule backwards.',
        'Forgetting AB accepts A and B antigens.',
      ],
    },
    officialDescription: `## blood_types_s

Model blood types (an antigen A/AB/B/O and an Rh factor + or -) and their compatibility.

can_receive_from(other) returns whether a recipient can safely receive from a donor. donors() returns every type the recipient can receive from; recipients() returns every type that can receive from this one.

### Expected items

~~~
impl BloodType {
    pub fn can_receive_from(self, other: Self) -> bool
    pub fn donors(self) -> Vec<Self>
    pub fn recipients(self) -> Vec<Self>
}
~~~`,
    objectives: {
      learn: [
        'Encode rules with match over enum variants.',
        'Filter a collection with a closure predicate.',
        'Generate all combinations with nested loops.',
      ],
      whyExists:
        'Compatibility rules are a great fit for enums + match, and donors/recipients teach filtering.',
      rustSkills: ['enums', 'match', 'iterators', 'structs'],
    },
    conceptIds: ['enums', 'pattern_matching', 'iterators', 'structs'],
    conceptNotes: {
      pattern_matching: 'matches!(self.antigen, Antigen::A | Antigen::AB) tests several variants in one shot.',
      iterators: 'donors/recipients use .filter(...).collect() over all eight types.',
    },
    similar: {
      title: 'Universal donor?',
      prompt:
        'Given an Antigen enum (A, AB, B, O), write is_universal_donor(a: Antigen) -> bool that is true only for O. A tiny match/comparison drill.',
      starter: `pub enum Antigen { A, AB, B, O }

pub fn is_universal_donor(a: Antigen) -> bool {
    // true only for O
    todo!()
}`,
      hint: 'matches!(a, Antigen::O) or a == Antigen::O (with PartialEq).',
      concepts: ['enums', 'pattern_matching'],
      solution: `#[derive(PartialEq)]
pub enum Antigen { A, AB, B, O }

pub fn is_universal_donor(a: Antigen) -> bool {
    matches!(a, Antigen::O)
}`,
    },
    sideQuiz: [
      {
        prompt: 'A blood type starts with an antigen. Fill the missing antigen variant.',
        template: `pub enum Antigen { A, AB, B, _____ }`,
        accepted: ['O'],
        acceptedPatterns: ['^O,?$'],
        hints: [
          'The four ABO antigens are A, AB, B, and one more.',
          'The fourth is O.',
        ],
        explanation: 'The ABO system has four antigens: A, AB, B, and O. O carries no antigen, which is why it is the universal donor.',
        whatYouLearned: 'An enum enumerates the fixed set of antigens.',
        conceptId: 'enums',
      },
      {
        prompt: 'O has no antigen, so everyone accepts it. Fill the value of the O arm.',
        template: `let antigen_ok = match other.antigen {
    Antigen::O => _____,
    // ... A, B, AB arms ...
};`,
        accepted: ['true'],
        acceptedPatterns: ['^true$'],
        hints: [
          'O is the universal donor for the antigen rule.',
          'Every recipient accepts O, so return true.',
        ],
        explanation: 'An O donor has no A or B antigen, so any recipient accepts it — the O arm is always true.',
        whatYouLearned: 'O is the universal donor antigen.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'AB recipients accept A and B antigens. Fill the test that matches either A or AB on the recipient.',
        template: `// other.antigen == A is accepted by recipients whose antigen is A or AB
Antigen::A => _____,`,
        accepted: ['matches!(self.antigen, Antigen::A | Antigen::AB)'],
        acceptedPatterns: ['^matches!\\(self\\.antigen,\\s*Antigen::A\\s*\\|\\s*Antigen::AB\\)$'],
        hints: ['You can test several variants with the matches! macro.', 'matches!(self.antigen, Antigen::A | Antigen::AB).'],
        explanation: 'An A donor is accepted by recipients carrying the A antigen, i.e. A or AB. matches! with the | pattern checks both at once.',
        whatYouLearned: 'matches!(x, P | Q) tests membership in a set of variants.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'The Rh rule: an Rh- donor works for anyone. Fill the donor Rh factor that is always accepted.',
        template: `let rh_ok = self.rh_factor == RhFactor::Positive
    || other.rh_factor == RhFactor::_____;`,
        accepted: ['Negative'],
        acceptedPatterns: ['^Negative$'],
        hints: [
          'An Rh-negative donor is safe for any recipient.',
          'The accepted donor factor is Negative.',
        ],
        explanation: 'A recipient accepts a donor when the recipient is Rh+ OR the donor is Rh-, since Rh- blood carries no Rh antigen.',
        whatYouLearned: 'Rh- is the universal donor for the Rh factor.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'Both rules must hold. Fill the combination returned by can_receive_from.',
        template: `antigen_ok _____ rh_ok`,
        accepted: ['&&'],
        acceptedPatterns: ['^&&$'],
        hints: [
          'A transfusion is safe only if BOTH rules pass.',
          'Combine with logical AND: && .',
        ],
        explanation: 'Compatibility requires the antigen rule AND the Rh rule, so the method returns antigen_ok && rh_ok.',
        whatYouLearned: '&& requires both conditions to be true.',
        conceptId: 'pattern_matching',
      },
      {
        prompt: 'donors() lists every type self can receive from. Fill the method used in the filter.',
        template: `Self::all().into_iter().filter(|&other| self._____(other)).collect()`,
        accepted: ['can_receive_from'],
        acceptedPatterns: ['^can_receive_from$'],
        hints: [
          'A donor is someone self can receive from.',
          'Call self.can_receive_from(other).',
        ],
        explanation: 'donors keeps every type where self.can_receive_from(other) holds — the mirror of recipients.',
        whatYouLearned: 'Reuse the core rule to derive related queries.',
        conceptId: 'iterators',
      },
      {
        prompt: 'recipients() keeps every type that can receive from self. Fill the filter predicate.',
        template: `Self::all().into_iter().filter(|&other| _____).collect()`,
        accepted: ['other.can_receive_from(self)'],
        acceptedPatterns: ['^other\\.can_receive_from\\(self\\)$'],
        hints: ['A recipient is someone who can receive from self.', 'Call other.can_receive_from(self).'],
        explanation: 'recipients are types that can receive from self, so we keep other where other.can_receive_from(self) is true (the mirror of donors).',
        whatYouLearned: 'filter keeps elements for which the closure returns true.',
        conceptId: 'iterators',
      },
      {
        kind: 'choice',
        prompt: 'Which antigen is the universal donor (accepted by every recipient)?',
        options: ['O', 'AB', 'A', 'B'],
        correct: [0],
        why: [
          'O carries no A or B antigen, so anyone can receive it.',
          'AB is the universal recipient, not donor.',
          'A is only accepted by A and AB recipients.',
          'B is only accepted by B and AB recipients.',
        ],
        hints: ['Which type has no antigen to react against?', 'It is the one with neither A nor B.'],
        explanation: 'O has no surface antigen, so it triggers no reaction and every recipient accepts it — the universal donor. AB, with both antigens, is the universal recipient.',
        whatYouLearned: 'O is the universal donor; AB the universal recipient.',
        conceptId: 'enums',
      },
      {
        kind: 'bug',
        prompt: 'The Rh compatibility rule is inverted. It has TWO bugs — click both Rh factors.',
        code: `let rh_ok = self.rh_factor == RhFactor::Negative
    || other.rh_factor == RhFactor::Positive;`,
        bugs: [
          { line: 1, token: 'Negative' },
          { line: 2, token: 'Positive' },
        ],
        hints: [
          'An Rh- donor is safe for anyone; an Rh+ recipient accepts either.',
          'Both factors are the wrong way round.',
        ],
        explanation: 'The rule should be self.rh_factor == Positive || other.rh_factor == Negative: an Rh+ recipient accepts anything, and an Rh- donor is universally safe. Both factors here are swapped.',
        whatYouLearned: 'Rh+ recipient OR Rh- donor → compatible.',
        conceptId: 'pattern_matching',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 105 — format_me
  // -------------------------------------------------------------------------
  format_me: {
    overview: {
      whatYouBuild:
        'A Park type with several optional text fields and a ParkType enum. Display formats a park into a fixed pattern, substituting a "No <field>" placeholder wherever a field is None.',
      inputOutput:
        'Printing a Park yields "<type> - <name>, <address>, <cap> - <state>", with missing fields shown as "No name", "No address", etc.',
      constraints: [
        'Implement Display for both ParkType and Park.',
        'Optional fields use as_deref().unwrap_or("No <field>").',
        'ParkType prints in lowercase (garden/forest/playground).',
      ],
      commonMistakes: [
        'Calling unwrap() on a None field and panicking.',
        'Forgetting to implement Display for ParkType separately.',
        'Mismatching the exact separators in the format string.',
      ],
    },
    officialDescription: `## format_me

Implement Display for a Park (and its ParkType). A park has a type plus several optional fields (name, address, cap, state).

Print the park as "<type> - <name>, <address>, <cap> - <state>", substituting a placeholder like "No name" for any field that is None.

### Expected items

~~~
impl std::fmt::Display for ParkType { ... }
impl std::fmt::Display for Park { ... }
~~~`,
    objectives: {
      learn: [
        'Implement Display for an enum and a struct.',
        'Turn Option<String> into &str with a default using as_deref().unwrap_or(...).',
        'Compose a multi-field format string.',
      ],
      whyExists:
        'It combines Display with Option defaults — a very common real formatting need.',
      rustSkills: ['Display', 'Option', 'as_deref', 'format'],
    },
    conceptIds: ['display_trait', 'option', 'traits'],
    conceptNotes: {
      option: 'as_deref() turns &Option<String> into Option<&str>, then unwrap_or supplies the placeholder when it is None.',
      display_trait: 'A single write! with the full pattern produces the whole line.',
    },
    similar: {
      title: 'Optional name',
      prompt:
        'Write a function label(name: &Option<String>) -> String that returns the name or "No name" when it is None. Same as_deref().unwrap_or pattern used for each park field.',
      starter: `pub fn label(name: &Option<String>) -> String {
    // return the name, or "No name" if None
    todo!()
}`,
      hint: 'name.as_deref().unwrap_or("No name").to_string().',
      concepts: ['option'],
      solution: `pub fn label(name: &Option<String>) -> String {
    name.as_deref().unwrap_or("No name").to_string()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Several park fields may be absent. Fill the type wrapping the optional name field.',
        template: `pub struct Park {
    pub name: _____<String>,
    pub park_type: ParkType,
    // address, cap, state are also optional
}`,
        accepted: ['Option'],
        acceptedPatterns: ['^Option$'],
        hints: [
          'A field that might be missing.',
          'Use Option<String>.',
        ],
        explanation: 'name, address, cap, and state are Option<String> — present (Some) or missing (None).',
        whatYouLearned: 'Option<T> marks a field that may be absent.',
        conceptId: 'option',
      },
      {
        prompt: 'Turn an &Option<String> into an Option<&str> so unwrap_or can supply a &str default. Fill the method.',
        template: `let name = self.name._____().unwrap_or("No name");`,
        accepted: ['as_deref'],
        acceptedPatterns: ['^as_deref$'],
        hints: [
          'You need Option<&str>, not Option<String>.',
          'as_deref() borrows the inner String as &str.',
        ],
        explanation: 'as_deref() converts &Option<String> to Option<&str>, so unwrap_or("No name") can return a &str either way.',
        whatYouLearned: 'as_deref() turns Option<String> into Option<&str>.',
        conceptId: 'option',
      },
      {
        prompt: 'Substitute a placeholder when the name field is None. Fill the default-providing call.',
        template: `// self.name: Option<String>
let name = self.name.as_deref()._____("No name");`,
        accepted: ['unwrap_or'],
        acceptedPatterns: ['^unwrap_or$'],
        hints: ['Option has a method that returns the value or a fallback.', 'unwrap_or supplies the default.'],
        explanation: 'as_deref() gives Option<&str>; unwrap_or("No name") yields the inner string or the placeholder when it is None — no panic.',
        whatYouLearned: 'unwrap_or supplies a default instead of panicking on None.',
        conceptId: 'option',
      },
      {
        prompt: 'Display a ParkType in lowercase. Fill the macro that writes to the formatter.',
        template: `impl fmt::Display for ParkType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let text = match self {
            ParkType::Garden => "garden",
            ParkType::Forest => "forest",
            ParkType::Playground => "playground",
        };
        _____(f, "{}", text)
    }
}`,
        accepted: ['write!'],
        acceptedPatterns: ['^write!$'],
        hints: ['Display writes into f.', 'Use the write! macro.'],
        explanation: 'write!(f, "{}", text) sends the lowercase name to the formatter, which is what printing the ParkType uses.',
        whatYouLearned: 'Display impls produce output via write!(f, ...).',
        conceptId: 'display_trait',
      },
      {
        prompt: 'A ParkType prints its name in lowercase. Fill the text for the Garden variant.',
        template: `let text = match self {
    ParkType::Garden => "_____",
    ParkType::Forest => "forest",
    ParkType::Playground => "playground",
};`,
        accepted: ['garden'],
        acceptedPatterns: ['^garden$'],
        hints: [
          'Lowercase the variant name.',
          'Garden prints as "garden".',
        ],
        explanation: 'Each ParkType variant maps to its lowercase word; Garden becomes "garden".',
        whatYouLearned: 'A match can map enum variants to display strings.',
        conceptId: 'display_trait',
      },
      {
        prompt: 'Assemble the whole Park line. Fill the first value in the format — the park type.',
        template: `write!(
    f,
    "{} - {}, {}, {} - {}",
    self._____,
    self.name.as_deref().unwrap_or("No name"),
    self.address.as_deref().unwrap_or("No address"),
    self.cap.as_deref().unwrap_or("No cap"),
    self.state.as_deref().unwrap_or("No state"),
)`,
        accepted: ['park_type'],
        acceptedPatterns: ['^park_type,?$'],
        hints: [
          'The line starts with the park type.',
          'It is self.park_type.',
        ],
        explanation: 'The Park Display writes the type first, then each optional field with its "No <field>" fallback, in one write! call.',
        whatYouLearned: 'One write! can format many fields at once.',
        conceptId: 'display_trait',
      },
      {
        kind: 'choice',
        prompt: 'Which turns an Option<String> field into a &str with a fallback, without panicking?',
        options: ['.as_deref().unwrap_or("No name")', '.unwrap()', '.expect("missing")', '.to_string()'],
        correct: [0],
        why: [
          'as_deref() gives Option<&str>; unwrap_or supplies the default for None.',
          'unwrap() panics when the field is None.',
          'expect() also panics on None (with a message).',
          'to_string() does not exist on Option and would not provide a default.',
        ],
        hints: ['You need a &str either way, no panics.', 'Borrow with as_deref, then unwrap_or.'],
        explanation: 'self.name.as_deref().unwrap_or("No name") yields the inner text or the placeholder — safe for a missing field, unlike unwrap/expect which panic.',
        whatYouLearned: 'as_deref().unwrap_or(...) safely defaults an optional field.',
        conceptId: 'option',
      },
      {
        kind: 'bug',
        prompt: 'This will panic when a park field is missing. Click the mistake.',
        code: `let name = self.name.unwrap();`,
        bugs: [{ line: 1, token: 'unwrap' }],
        hints: [
          'name is an Option that can be None.',
          'unwrap() on None crashes.',
        ],
        explanation: 'unwrap() panics on None. A missing field should fall back to a placeholder: self.name.as_deref().unwrap_or("No name").',
        whatYouLearned: 'Never unwrap() an optional field that may be absent.',
        conceptId: 'option',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 106 — moving_targets
  // -------------------------------------------------------------------------
  moving_targets: {
    overview: {
      whatYouBuild:
        'A singly linked stack (Field) of Target values built from Option<Box<Node>>. push adds to the front, pop removes from the front, and peek / peek_mut look at the top without removing it.',
      inputOutput:
        'push(target) stores a Target; pop() -> Option<Target>; peek() -> Option<&Target>; peek_mut() -> Option<&mut Target>.',
      constraints: [
        'The list is Option<Box<Node>>; Box gives the recursive type a known size.',
        'Use Option::take() to move a node out while leaving None behind.',
        'peek borrows shared; peek_mut borrows mutable.',
      ],
      commonMistakes: [
        'Fighting the borrow checker by not using take() when detaching the head.',
        'Returning the node instead of its contained Target.',
        'Confusing as_ref (shared) with as_mut (mutable) in peek.',
      ],
    },
    officialDescription: `## moving_targets

Build a singly linked stack of Target values. Implement push (add to front), pop (remove from front), peek (reference to the top), and peek_mut (mutable reference to the top).

### Expected items

~~~
impl Field {
    pub fn push(&mut self, target: Target)
    pub fn pop(&mut self) -> Option<Target>
    pub fn peek(&self) -> Option<&Target>
    pub fn peek_mut(&mut self) -> Option<&mut Target>
}
~~~`,
    objectives: {
      learn: [
        'Build a recursive data structure with Box.',
        'Move values out of an Option with take().',
        'Provide shared and mutable access with as_ref / as_mut.',
      ],
      whyExists:
        'A hand-written linked list is the classic way to internalize ownership, Box, and Option together.',
      rustSkills: ['Box', 'Option', 'ownership', 'references'],
    },
    conceptIds: ['structs', 'option', 'references'],
    conceptNotes: {
      option: 'self.head.take() moves the current head out and leaves None, sidestepping borrow-checker conflicts.',
      references: 'peek uses as_ref() for a shared &Target; peek_mut uses as_mut() for a &mut Target.',
    },
    similar: {
      title: 'Optional swap-out',
      prompt:
        'Given let mut slot: Option<i32> = Some(5);, write one line that moves the value out into x and leaves slot as None. This is the take() trick the list relies on.',
      starter: `let mut slot: Option<i32> = Some(5);
// move the value out, leaving None behind
let x = /* fill this */ ;
// now slot == None and x == Some(5)`,
      hint: 'Option::take() does exactly this: let x = slot.take();',
      concepts: ['option'],
      solution: `let mut slot: Option<i32> = Some(5);
let x = slot.take();
// slot == None, x == Some(5)`,
    },
    sideQuiz: [
      {
        prompt: 'A node links to the next via an optional boxed node. Fill the pointer type that makes the recursive type sized.',
        template: `type Link = Option<_____<Node>>;`,
        accepted: ['Box'],
        acceptedPatterns: ['^Box$'],
        hints: [
          'A struct cannot contain itself directly.',
          'Put it behind a Box, which has a known size.',
        ],
        explanation: 'A Node contains another Node via Option<Box<Node>>; Box is a heap pointer of fixed size, so the recursive type compiles.',
        whatYouLearned: 'Box gives a recursive type a known size.',
        conceptId: 'references',
      },
      {
        prompt: 'A new Field starts empty. Fill the head value.',
        template: `Field { head: _____ }`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: [
          'An empty stack has no first node.',
          'Use None.',
        ],
        explanation: 'An empty Field has no head, so head is None until something is pushed.',
        whatYouLearned: 'None represents the empty end of a list.',
        conceptId: 'option',
      },
      {
        prompt: 'push links the new node to the old head. Fill the call that moves the old head out, leaving None.',
        template: `let node = Box::new(Node { elem: target, next: self.head._____ });
self.head = Some(node);`,
        accepted: ['take()'],
        acceptedPatterns: ['^take\\(\\)$'],
        hints: ['You need to move the old head out without cloning.', 'Option::take() leaves None behind.'],
        explanation: 'self.head.take() hands the old head to the new node’s next and resets head to None, after which we set head to the new node.',
        whatYouLearned: 'Option::take() moves a value out and leaves None.',
        conceptId: 'option',
      },
      {
        prompt: 'Finish push: make the new node the head. Fill the Option variant wrapping it.',
        template: `let node = Box::new(Node { elem: target, next: self.head.take() });
self.head = _____(node);`,
        accepted: ['Some'],
        acceptedPatterns: ['^Some$'],
        hints: [
          'The head now holds a node.',
          'Wrap it in Some.',
        ],
        explanation: 'After linking the new node to the old head, the head is set to Some(node) so the stack points at the new top.',
        whatYouLearned: 'Some(node) marks the head as occupied.',
        conceptId: 'option',
      },
      {
        prompt: 'pop takes the head out and, if present, returns its value. Fill the Option adapter that transforms the taken node.',
        template: `self.head.take()._____(|node| {
    self.head = node.next;
    node.elem
})`,
        accepted: ['map'],
        acceptedPatterns: ['^map$'],
        hints: [
          'You want to transform Some(node) into Some(value), leaving None as None.',
          'Use map.',
        ],
        explanation: 'take() removes the head; map runs only when there was a node, advancing the head to node.next and yielding node.elem.',
        whatYouLearned: 'Option::map transforms the inner value when present.',
        conceptId: 'option',
      },
      {
        prompt: 'peek returns a shared reference to the top Target. Fill the method that borrows the Option contents.',
        template: `pub fn peek(&self) -> Option<&Target> {
    self.head._____.map(|node| &node.elem)
}`,
        accepted: ['as_ref()'],
        acceptedPatterns: ['^as_ref\\(\\)$'],
        hints: ['You must not move the head out for a peek.', 'as_ref() turns &Option<T> into Option<&T>.'],
        explanation: 'as_ref() borrows the head without moving it, so map can hand back a reference to the contained Target.',
        whatYouLearned: 'as_ref() lets you look inside an Option by reference.',
        conceptId: 'references',
      },
      {
        prompt: 'peek_mut returns a mutable reference to the top Target. Fill the method that borrows the head mutably.',
        template: `pub fn peek_mut(&mut self) -> Option<&mut Target> {
    self.head._____().map(|node| &mut node.elem)
}`,
        accepted: ['as_mut'],
        acceptedPatterns: ['^as_mut$'],
        hints: [
          'You need a mutable borrow, not a move or a shared borrow.',
          'as_mut() turns &mut Option<T> into Option<&mut T>.',
        ],
        explanation: 'as_mut() borrows the head mutably so map can hand back a &mut to the contained Target for in-place editing.',
        whatYouLearned: 'as_mut() gives a mutable peek into an Option.',
        conceptId: 'references',
      },
      {
        kind: 'choice',
        prompt: 'Why is each Node wrapped in a Box (Option<Box<Node>>)?',
        options: [
          'to give the recursive type a known, fixed size',
          'to make the node mutable',
          'to share the node between owners',
          'to make the node Copy',
        ],
        correct: [0],
        why: [
          'Box is a fixed-size heap pointer, so a type that contains itself can compile.',
          'Box does not change mutability.',
          'Sharing is Rc/Arc, not Box.',
          'Box does not make a type Copy.',
        ],
        hints: ['A struct cannot directly contain itself.', 'Box has a known pointer size.'],
        explanation: 'A Node contains another Node; without indirection its size would be infinite. Box is a heap pointer of fixed size, so the recursive type has a known size.',
        whatYouLearned: 'Box gives a recursive type a known size.',
        conceptId: 'references',
      },
      {
        kind: 'bug',
        prompt: 'peek should not modify the stack. Click the mistake.',
        code: `pub fn peek(&self) -> Option<&Target> {
    self.head.take().map(|node| &node.elem)
}`,
        bugs: [{ line: 2, token: 'take' }],
        hints: [
          'peek only reads the top; it must not remove it.',
          'take() moves the head out (and needs &mut, which peek does not have).',
        ],
        explanation: 'take() removes the head, which peek must not do (and it needs &mut self). Use self.head.as_ref().map(|node| &node.elem) to look without removing.',
        whatYouLearned: 'peek borrows with as_ref(); take() is for removal.',
        conceptId: 'references',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 107 — car_rental
  // -------------------------------------------------------------------------
  car_rental: {
    overview: {
      whatYouBuild:
        'A RentalBusiness that stores its Car inside a RefCell, giving interior mutability: the Car can be borrowed, taken, mutated, or replaced even through a shared &self.',
      inputOutput:
        'rent_car() -> Ref<Car> (read), repair_car() -> RefMut<Car> (mutate), sell_car() -> Car (take, leaving a default), change_car(new) replaces it.',
      constraints: [
        'Store the Car as RefCell<Car>.',
        'borrow() for shared read, borrow_mut() for mutation.',
        'take() removes the Car leaving Default in place.',
      ],
      commonMistakes: [
        'Trying to mutate through &self without interior mutability.',
        'Holding a borrow and a borrow_mut at the same time (runtime panic).',
        'Forgetting Car: Default for take().',
      ],
    },
    officialDescription: `## car_rental

Model a rental business that owns one Car but can change it through a shared reference, using RefCell for interior mutability.

rent_car hands out a read-only borrow, repair_car a mutable borrow, sell_car takes the car out (leaving a default), and change_car replaces it.

### Expected items

~~~
impl RentalBusiness {
    pub fn rent_car(&self) -> Ref<'_, Car>
    pub fn sell_car(&self) -> Car
    pub fn repair_car(&self) -> RefMut<'_, Car>
    pub fn change_car(&self, new_car: Car)
}
~~~`,
    objectives: {
      learn: [
        'Use RefCell for interior mutability through &self.',
        'Distinguish borrow() (shared) from borrow_mut() (exclusive).',
        'Swap or take the contained value safely.',
      ],
      whyExists:
        'RefCell is the gateway to interior mutability — needed whenever you must mutate behind a shared reference.',
      rustSkills: ['RefCell', 'interior mutability', 'borrowing'],
    },
    conceptIds: ['structs', 'references', 'borrowing'],
    conceptNotes: {
      borrowing: 'RefCell moves Rust’s borrow rules to runtime: borrow() yields a shared Ref, borrow_mut() an exclusive RefMut; breaking the rules panics at runtime.',
      references: 'rent_car returns a Ref guard (read), repair_car a RefMut guard (write).',
    },
    similar: {
      title: 'Mutate through &self',
      prompt:
        'Given a struct Counter { n: RefCell<i32> }, write a method bump(&self) that increases n by 1 — through a shared &self. Same interior-mutability move as the rental business.',
      starter: `use std::cell::RefCell;
pub struct Counter { pub n: RefCell<i32> }

impl Counter {
    pub fn bump(&self) {
        // increment the inner value through &self
        todo!()
    }
}`,
      hint: '*self.n.borrow_mut() += 1;',
      concepts: ['references', 'borrowing'],
      solution: `use std::cell::RefCell;
pub struct Counter { pub n: RefCell<i32> }

impl Counter {
    pub fn bump(&self) {
        *self.n.borrow_mut() += 1;
    }
}`,
    },
    sideQuiz: [
      {
        prompt: 'sell_car leaves an empty Car behind. Fill the derive that lets Car be created with default values.',
        template: `#[derive(Debug, _____, PartialEq, Eq)]
pub struct Car {
    pub color: String,
    pub plate: String,
}`,
        accepted: ['Default'],
        acceptedPatterns: ['^Default$'],
        hints: [
          'take() replaces the value with its default.',
          'Derive Default.',
        ],
        explanation: 'Deriving Default lets RefCell::take() leave a Default::default() Car behind when the real one is sold.',
        whatYouLearned: 'Derive Default to get a zero-value constructor.',
        conceptId: 'structs',
      },
      {
        prompt: 'The business must mutate its Car through a shared &self. Fill the wrapper that provides interior mutability.',
        template: `pub struct RentalBusiness {
    pub car: _____<Car>,
}`,
        accepted: ['RefCell'],
        acceptedPatterns: ['^RefCell$'],
        hints: [
          'Mutating through &self needs interior mutability.',
          'Use RefCell<Car>.',
        ],
        explanation: 'RefCell<Car> moves borrow checking to runtime, so the Car can change even when the business is only shared (&self).',
        whatYouLearned: 'RefCell enables mutation behind a shared reference.',
        conceptId: 'references',
      },
      {
        prompt: 'rent_car returns a read guard. Fill the guard type for a shared borrow of the Car.',
        template: `pub fn rent_car(&self) -> _____<'_, Car> {
    self.car.borrow()
}`,
        accepted: ['Ref'],
        acceptedPatterns: ['^Ref$'],
        hints: [
          'borrow() yields a shared guard.',
          'The guard type is Ref (with a lifetime and the Car type).',
        ],
        explanation: 'borrow() returns a Ref guard granting read-only access; the guard releases the borrow when dropped.',
        whatYouLearned: 'RefCell::borrow() yields a Ref read guard.',
        conceptId: 'borrowing',
      },
      {
        prompt: 'rent_car gives read-only access. Fill the RefCell method it calls.',
        template: `pub fn rent_car(&self) -> Ref<'_, Car> {
    self.car._____()
}`,
        accepted: ['borrow'],
        acceptedPatterns: ['^borrow$'],
        hints: [
          'A shared, read-only borrow.',
          'Call borrow().',
        ],
        explanation: 'borrow() hands out a shared Ref; many readers may borrow at once, but not while a borrow_mut is active.',
        whatYouLearned: 'borrow() is the shared/read side of RefCell.',
        conceptId: 'borrowing',
      },
      {
        prompt: 'sell_car removes the Car (leaving a default). Fill the RefCell method that takes the value out.',
        template: `pub fn sell_car(&self) -> Car {
    self.car._____()
}`,
        accepted: ['take'],
        acceptedPatterns: ['^take$'],
        hints: [
          'Move the value out, leaving Default in place.',
          'RefCell::take() does this.',
        ],
        explanation: 'take() returns the current Car and stores a default one in its place — possible only because Car derives Default.',
        whatYouLearned: 'RefCell::take() removes the value, leaving its default.',
        conceptId: 'borrowing',
      },
      {
        prompt: 'repair_car hands out a mutable borrow of the Car. Fill the RefCell method.',
        template: `pub fn repair_car(&self) -> RefMut<'_, Car> {
    self.car._____()
}`,
        accepted: ['borrow_mut'],
        acceptedPatterns: ['^borrow_mut$'],
        hints: ['You need a writable borrow.', 'RefCell::borrow_mut() yields a RefMut.'],
        explanation: 'borrow_mut() returns a RefMut guard granting exclusive mutable access to the Car, even though self is only &self.',
        whatYouLearned: 'borrow_mut() is the mutable side of RefCell.',
        conceptId: 'borrowing',
      },
      {
        prompt: 'change_car replaces the whole Car through a mutable borrow. Fill the left-hand side being assigned.',
        template: `pub fn change_car(&self, new_car: Car) {
    _____ = new_car;
}`,
        accepted: ['*self.car.borrow_mut()'],
        acceptedPatterns: ['^\\*self\\.car\\.borrow_mut\\(\\)$'],
        hints: ['Write through the mutable borrow.', 'Dereference it: *self.car.borrow_mut().'],
        explanation: 'Assigning to *self.car.borrow_mut() overwrites the value inside the RefCell with new_car.',
        whatYouLearned: 'Dereferencing a RefMut lets you assign a new value in place.',
        conceptId: 'borrowing',
      },
      {
        kind: 'choice',
        prompt: 'Which type lets you mutate a value through a shared &self reference?',
        options: ['RefCell', 'Box', 'Rc', 'Vec'],
        correct: [0],
        why: [
          'RefCell provides interior mutability with runtime borrow checks.',
          'Box owns a value but does not allow mutation through &self.',
          'Rc shares ownership but is read-only by itself.',
          'Vec is a collection, unrelated to interior mutability.',
        ],
        hints: ['The business mutates its car through &self.', 'It is the interior-mutability cell type.'],
        explanation: 'RefCell<T> moves borrow checking to runtime, so borrow_mut() can hand out a mutable reference even though self is only &self.',
        whatYouLearned: 'RefCell enables mutation behind a shared reference.',
        conceptId: 'borrowing',
      },
      {
        kind: 'bug',
        prompt: 'rent_car is meant to be read-only, but this hands out a mutable borrow. Click the mistake.',
        code: `pub fn rent_car(&self) -> Ref<'_, Car> {
    self.car.borrow_mut()
}`,
        bugs: [{ line: 2, token: 'borrow_mut' }],
        hints: [
          'rent_car returns a Ref (shared) guard.',
          'borrow_mut yields a RefMut, not a Ref.',
        ],
        explanation: 'rent_car returns a read-only Ref, so it must call borrow(); borrow_mut() returns a RefMut and would also block other readers at runtime.',
        whatYouLearned: 'borrow() for reading, borrow_mut() for writing.',
        conceptId: 'borrowing',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 108 — drop_the_blog
  // -------------------------------------------------------------------------
  drop_the_blog: {
    overview: {
      whatYouBuild:
        'A Blog that tracks articles and counts how many have been "dropped". Each Article borrows its parent Blog; when an Article goes out of scope, a Drop implementation automatically records the drop.',
      inputOutput:
        'new_article returns an (id, Article). When the Article is dropped (e.g. via discard), the Blog’s drop count and state update automatically.',
      constraints: [
        'Use Cell<usize> and RefCell<Vec<bool>> for interior mutability.',
        'Article holds a reference to its parent Blog (a lifetime).',
        'Implement Drop for Article so dropping it calls parent.add_drop(id).',
      ],
      commonMistakes: [
        'Forgetting that Drop runs automatically at end of scope.',
        'Lifetime errors from the Article -> Blog reference.',
        'Mutating Cell/RefCell incorrectly (get/set vs borrow_mut).',
      ],
    },
    officialDescription: `## drop_the_blog

Model a Blog that owns article state and a drop counter, using Cell and RefCell for interior mutability.

Each Article borrows the Blog. Implement Drop for Article so that when an article is dropped, it records the drop on its parent Blog.

### Expected items

~~~
impl Blog { pub fn new_article(&self, body: String) -> (usize, Article<'_>) ... }
impl<'a> Drop for Article<'a> { fn drop(&mut self) ... }
~~~`,
    objectives: {
      learn: [
        'Implement the Drop trait for cleanup logic.',
        'Hold a reference with a lifetime parameter.',
        'Mutate shared state with Cell and RefCell.',
      ],
      whyExists:
        'Drop plus borrowing-with-lifetimes is an advanced ownership scenario that ties the model together.',
      rustSkills: ['Drop', 'lifetimes', 'Cell/RefCell'],
    },
    conceptIds: ['traits', 'lifetimes', 'references'],
    conceptNotes: {
      traits: 'Implementing Drop gives a type custom behavior that runs automatically when it goes out of scope.',
      lifetimes: "Article<'a> borrows its parent Blog for the lifetime 'a, so the Blog must outlive the Article.",
    },
    similar: {
      title: 'Say goodbye on drop',
      prompt:
        'Implement Drop for a struct Guard { name: String } so that dropping it prints "bye <name>". This is the same auto-cleanup hook the blog uses.',
      starter: `pub struct Guard { pub name: String }

impl Drop for Guard {
    fn drop(&mut self) {
        // print "bye <name>"
        todo!()
    }
}`,
      hint: 'println!("bye {}", self.name); inside drop.',
      concepts: ['traits'],
      solution: `pub struct Guard { pub name: String }

impl Drop for Guard {
    fn drop(&mut self) {
        println!("bye {}", self.name);
    }
}`,
    },
    sideQuiz: [
      {
        prompt: 'The Blog counts drops behind a shared &self. Fill the cell type holding the Copy counter.',
        template: `pub struct Blog {
    pub drops: _____<usize>,
    pub states: RefCell<Vec<bool>>,
}`,
        accepted: ['Cell'],
        acceptedPatterns: ['^Cell$'],
        hints: [
          'A simple Copy value mutated through &self.',
          'Use Cell<usize>.',
        ],
        explanation: 'drops is a Cell<usize>: Cell gives cheap interior mutability for Copy values like a counter, without runtime borrow tracking.',
        whatYouLearned: 'Cell provides interior mutability for Copy values.',
        conceptId: 'references',
      },
      {
        prompt: 'An Article borrows its parent Blog. Fill the type it holds a reference to.',
        template: `pub struct Article<'a> {
    pub id: usize,
    pub body: String,
    pub parent: &'a _____,
}`,
        accepted: ['Blog'],
        acceptedPatterns: ['^Blog$'],
        hints: [
          'The article points back at the thing that owns it.',
          "It is &'a Blog.",
        ],
        explanation: "Article<'a> holds &'a Blog, so the lifetime 'a ties the article to a Blog that must outlive it.",
        whatYouLearned: 'A lifetime parameter ties a borrowed reference to its owner.',
        conceptId: 'lifetimes',
      },
      {
        prompt: 'Creating an article records its initial (not-dropped) state. Fill the Vec method that adds it.',
        template: `self.states.borrow_mut()._____(false);`,
        accepted: ['push'],
        acceptedPatterns: ['^push$'],
        hints: [
          'A new article starts not dropped.',
          'push(false) onto the states vector.',
        ],
        explanation: 'Each new article appends a false (not dropped) to the states vector through a mutable borrow of the RefCell.',
        whatYouLearned: 'borrow_mut() then push appends through a RefCell<Vec<_>>.',
        conceptId: 'references',
      },
      {
        prompt: 'The next id equals how many articles already exist. Fill the method that reads that count.',
        template: `pub fn new_id(&self) -> usize {
    self.states.borrow()._____()
}`,
        accepted: ['len'],
        acceptedPatterns: ['^len$'],
        hints: [
          'Ids are assigned sequentially from 0.',
          'The next id is the current length: len().',
        ],
        explanation: 'With ids handed out in order, the next id is simply states.len() — read via a shared borrow.',
        whatYouLearned: 'A running count can serve as the next sequential id.',
        conceptId: 'references',
      },
      {
        prompt: 'Cleanup runs automatically at end of scope. Fill the trait implemented for Article.',
        template: `impl<'a> _____ for Article<'a> {
    fn drop(&mut self) { /* ... */ }
}`,
        accepted: ['Drop'],
        acceptedPatterns: ['^Drop$'],
        hints: [
          'The trait whose method runs when a value is dropped.',
          'It is Drop.',
        ],
        explanation: 'Implementing Drop for Article means Rust runs drop(&mut self) automatically when an article goes out of scope.',
        whatYouLearned: 'Implement Drop to run code at end of scope.',
        conceptId: 'traits',
      },
      {
        prompt: 'When an Article is dropped it should tell its parent. Fill the body of drop.',
        template: `impl<'a> Drop for Article<'a> {
    fn drop(&mut self) {
        _____;
    }
}`,
        accepted: ['self.parent.add_drop(self.id)'],
        acceptedPatterns: ['^self\\.parent\\.add_drop\\(self\\.id\\)$'],
        hints: ['The Article knows its parent Blog and its own id.', 'Call self.parent.add_drop(self.id).'],
        explanation: 'drop runs automatically at end of scope; here it records the drop on the parent Blog via add_drop(self.id).',
        whatYouLearned: 'Drop::drop runs cleanup logic automatically when a value goes out of scope.',
        conceptId: 'traits',
      },
      {
        prompt: 'add_drop bumps the counter held in a Cell. Fill the call that reads the current count.',
        template: `// self.drops: Cell<usize>
self.drops.set(self.drops._____() + 1);`,
        accepted: ['get'],
        acceptedPatterns: ['^get$'],
        hints: ['Cell has get and set.', 'Read with get(), then set the new value.'],
        explanation: 'Cell stores Copy values; get() reads the current count and set(...) writes the incremented one.',
        whatYouLearned: 'Cell uses get()/set() for interior mutability of Copy values.',
        conceptId: 'references',
      },
      {
        kind: 'choice',
        prompt: 'Which trait runs cleanup code automatically when a value goes out of scope?',
        options: ['Drop', 'Default', 'Clone', 'Copy'],
        correct: [0],
        why: [
          'Drop::drop runs automatically at end of scope.',
          'Default provides a zero value, not cleanup.',
          'Clone duplicates; it does not run at scope end.',
          'Copy is for bitwise copies, not cleanup.',
        ],
        hints: ['It is named after what happens to the value.', 'The method is drop(&mut self).'],
        explanation: 'Implementing Drop gives a type custom logic (here, recording the drop on the parent Blog) that Rust runs automatically when the value is dropped.',
        whatYouLearned: 'Drop runs cleanup automatically at end of scope.',
        conceptId: 'traits',
      },
      {
        kind: 'bug',
        prompt: 'When an article is dropped it records the wrong thing. Click the mistake.',
        code: `impl<'a> Drop for Article<'a> {
    fn drop(&mut self) {
        self.parent.add_drop(self.body);
    }
}`,
        bugs: [{ line: 3, token: 'body' }],
        hints: [
          'add_drop identifies which article was dropped.',
          'Which field is the identifier?',
        ],
        explanation: 'add_drop takes the article id, so it must be self.id, not self.body (the text). Passing the body would not type-check and would not identify the article.',
        whatYouLearned: 'Drop records the id, not the payload.',
        conceptId: 'traits',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 109 — lunch_queue
  // -------------------------------------------------------------------------
  lunch_queue: {
    overview: {
      whatYouBuild:
        'A lunch line modeled as a singly linked list of Person nodes. You can add people to the front, remove in FIFO order, reverse the whole queue, and search by name.',
      inputOutput:
        'add(name, discount) inserts at the front; rm() -> Option<(String, i32)> removes the oldest; invert_queue() reverses links; search(name) -> Option<(&String, &i32)>.',
      constraints: [
        'The list is Option<Box<Person>>; Box makes the recursive type sized.',
        'rm removes in FIFO order (the first person added, at the tail).',
        'invert_queue reverses by flipping each next pointer.',
      ],
      commonMistakes: [
        'Removing from the wrong end (FIFO means oldest-out).',
        'Losing the rest of the list when flipping pointers during invert.',
        'Borrow-checker errors from not using take()/as_mut() correctly.',
      ],
    },
    officialDescription: `## lunch_queue

Model a lunch queue as a singly linked list of people (name + discount).

Implement add (insert at the front), rm (remove in FIFO order and return the person), invert_queue (reverse the list), and search (find a person by name).

### Expected items

~~~
impl Queue {
    pub fn add(&mut self, name: String, discount: i32)
    pub fn rm(&mut self) -> Option<(String, i32)>
    pub fn invert_queue(&mut self)
    pub fn search(&self, name: &str) -> Option<(&String, &i32)>
}
~~~`,
    objectives: {
      learn: [
        'Manipulate a linked list with Box and Option.',
        'Reverse a list by re-pointing links.',
        'Traverse with as_ref / as_mut to read or edit nodes.',
      ],
      whyExists:
        'A FIFO queue over a linked list is a thorough workout in ownership, Option, and Box.',
      rustSkills: ['Box', 'Option', 'linked list', 'iteration'],
    },
    conceptIds: ['vecdeque', 'structs', 'option'],
    conceptNotes: {
      vecdeque: 'This is a hand-built queue. The standard library’s VecDeque offers the same FIFO behavior with push_back / pop_front.',
      option: 'next_person: Option<Box<Person>> is None at the end of the list; take() detaches nodes during reversal.',
    },
    similar: {
      title: 'Length of a list',
      prompt:
        'Given the Person/Link types, write a function that counts the people in a queue by walking next_person until None. Practices the same as_ref() traversal as search.',
      starter: `// type Link = Option<Box<Person>>;
pub fn count(mut current: &Link) -> usize {
    let mut n = 0;
    while let Some(p) = current {
        // count and advance
        todo!()
    }
    n
}`,
      hint: 'n += 1; current = &p.next_person; (the while-let binds p by reference).',
      concepts: ['option', 'structs'],
      solution: `pub fn count(mut current: &Link) -> usize {
    let mut n = 0;
    while let Some(p) = current {
        n += 1;
        current = &p.next_person;
    }
    n
}`,
    },
    sideQuiz: [
      {
        prompt: 'A person links to the next one. Fill the pointer type that makes the recursive Person sized.',
        template: `pub type Link = Option<_____<Person>>;`,
        accepted: ['Box'],
        acceptedPatterns: ['^Box$'],
        hints: [
          'A Person cannot directly contain a Person.',
          'Put it behind a Box.',
        ],
        explanation: 'Link is Option<Box<Person>>; Box is a fixed-size heap pointer, which lets the self-referential Person type compile.',
        whatYouLearned: 'Box gives a recursive type a known size.',
        conceptId: 'vecdeque',
      },
      {
        prompt: 'A fresh queue is empty. Fill the node value.',
        template: `Queue { node: _____ }`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: [
          'No people are waiting yet.',
          'Use None.',
        ],
        explanation: 'An empty queue has no first node, so node is None until someone is added.',
        whatYouLearned: 'None is the empty end of the queue.',
        conceptId: 'option',
      },
      {
        prompt: 'add inserts at the front, linking the new person to the old head. Fill the call that detaches the old head.',
        template: `let person = Box::new(Person { name, discount, next_person: self.node._____ });
self.node = Some(person);`,
        accepted: ['take()'],
        acceptedPatterns: ['^take\\(\\)$'],
        hints: ['Move the old front out without cloning.', 'Option::take() leaves None behind.'],
        explanation: 'self.node.take() hands the previous front to the new person’s next_person and resets node, after which the new person becomes the front.',
        whatYouLearned: 'take() is the key move for restructuring linked lists.',
        conceptId: 'option',
      },
      {
        prompt: 'Finish add: make the new person the front. Fill the Option variant wrapping them.',
        template: `let person = Box::new(Person { name, discount, next_person: self.node.take() });
self.node = _____(person);`,
        accepted: ['Some'],
        acceptedPatterns: ['^Some$'],
        hints: [
          'The front now holds a person.',
          'Wrap it in Some.',
        ],
        explanation: 'After linking the new person to the previous front, node is set to Some(person) so the queue points at the new front.',
        whatYouLearned: 'Some(node) marks the queue front as occupied.',
        conceptId: 'option',
      },
      {
        prompt: 'invert_queue reverses the list. Fill the line that saves the rest of the list before re-pointing the current node.',
        template: `while let Some(mut boxed) = current {
    current = boxed.next_person._____;
    boxed.next_person = prev;
    prev = Some(boxed);
}`,
        accepted: ['take()'],
        acceptedPatterns: ['^take\\(\\)$'],
        hints: ['Grab the remainder before you overwrite next_person.', 'boxed.next_person.take() detaches and returns the rest.'],
        explanation: 'take() moves the rest of the list into current before we flip boxed.next_person to point at prev, so no nodes are lost.',
        whatYouLearned: 'Reversing a list means saving "next" before re-pointing it.',
        conceptId: 'option',
      },
      {
        prompt: 'search walks the list node by node. Fill the method that advances to the next person without consuming the list.',
        template: `let mut current = self.node.as_ref();
while let Some(person) = current {
    if person.name == name { /* found */ }
    current = person.next_person._____();
}`,
        accepted: ['as_ref'],
        acceptedPatterns: ['^as_ref$'],
        hints: [
          'You are only reading, so borrow rather than move.',
          'as_ref() gives Option<&Box<Person>>.',
        ],
        explanation: 'as_ref() borrows the next link so the walk reads each node without taking ownership of the list.',
        whatYouLearned: 'as_ref() traverses a linked list by shared reference.',
        conceptId: 'option',
      },
      {
        prompt: 'When the name matches, return the person details. Fill the Option variant wrapping the found pair.',
        template: `if person.name == name {
    return _____((&person.name, &person.discount));
}`,
        accepted: ['Some'],
        acceptedPatterns: ['^Some$'],
        hints: [
          'A found result is present.',
          'Wrap the tuple in Some.',
        ],
        explanation: 'On a match, search returns Some((&name, &discount)); if the loop ends with no match it returns None.',
        whatYouLearned: 'Return Some(...) on success, None when nothing matches.',
        conceptId: 'option',
      },
      {
        kind: 'choice',
        prompt: 'rm() removes in FIFO order. Which person leaves first?',
        options: ['the oldest (first added)', 'the newest (last added)', 'a random person', 'the one with the biggest discount'],
        correct: [0],
        why: [
          'First-in-first-out: the earliest person to join leaves first.',
          'That would be last-in-first-out (a stack).',
          'A queue is ordered, not random.',
          'Discount does not affect queue order.',
        ],
        hints: ['FIFO = first in, first out.', 'Like a real lunch line.'],
        explanation: 'A FIFO queue serves people in arrival order, so rm() removes the person who has been waiting longest (added first), which sits at the tail of this front-insert list.',
        whatYouLearned: 'FIFO removes the oldest element first.',
        conceptId: 'vecdeque',
      },
      {
        kind: 'bug',
        prompt: 'This insert will not compile — it moves out of borrowed self. Click the mistake.',
        code: `pub fn add(&mut self, name: String, discount: i32) {
    let person = Box::new(Person { name, discount, next_person: self.node });
    self.node = Some(person);
}`,
        bugs: [{ line: 2, token: 'node' }],
        hints: [
          'You cannot move self.node out behind a &mut reference.',
          'There is a method that swaps it out, leaving None.',
        ],
        explanation: 'self.node cannot be moved out directly; use self.node.take() to detach the old front (leaving None) before linking it as next_person.',
        whatYouLearned: 'Use take() to move an Option field out of &mut self.',
        conceptId: 'option',
      },
      {
        kind: 'match',
        prompt: 'Match each Queue method to what it does.',
        pairs: [
          { left: 'add', right: 'insert a person at the front' },
          { left: 'rm', right: 'remove the oldest person (FIFO)' },
          { left: 'invert_queue', right: 'reverse the order of the list' },
          { left: 'search', right: 'find a person by name' },
        ],
        hints: [
          'add/rm are the two ends; invert flips; search reads.',
          'rm follows FIFO; add inserts at the front.',
        ],
        explanation: 'add links a new person at the front, rm removes the oldest (FIFO) from the tail, invert_queue reverses all the next pointers, and search walks the list to find a name.',
        whatYouLearned: 'Each linked-list method has one clear responsibility.',
        conceptId: 'vecdeque',
      },
    ],
  },
};
