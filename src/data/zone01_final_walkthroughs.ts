import type { SolutionStep } from '../types';

// Step-by-step walkthroughs for the NEW Zone01 Final slugs (those not shared
// with CP3). Slugs shared with CP3 reuse zone01_walkthroughs.ts via a merged
// lookup in LessonPage. Keyed by slug. Concatenating each step's `code` with
// newlines reproduces a working solution.
export const zone01FinalWalkthroughs: Record<string, SolutionStep[]> = {
  count_factorial_steps: [
    { code: `pub fn count_factorial_steps(factorial: u64) -> u64 {`, explain: `Given a factorial value, return how many multiplications (the n in n!) produced it.` },
    { code: `    if factorial <= 1 {\n        return 0;\n    }`, explain: `0 and 1 (and any non-factorial handled below) return 0 per the spec.` },
    { code: `    let mut product = 1u64;\n    let mut i = 1u64;`, explain: `Rebuild the factorial: product starts at 1, i is the current multiplier/step count.` },
    { code: `    while product < factorial {\n        i += 1;\n        product *= i;\n    }`, explain: `Multiply by 2, 3, 4, ... until the running product reaches (or passes) the target.` },
    { code: `    if product == factorial { i } else { 0 }\n}`, explain: `If we landed exactly on the value, i is the number of steps; otherwise it was not a factorial, so return 0.` },
  ],

  matrix_multiplication: [
    { code: `pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {`, explain: `Scale every element of the matrix by the scalar multiplier and return a new Matrix.` },
    { code: `    Matrix {\n        a: m.a * multiplier,\n        b: m.b * multiplier,\n        c: m.c * multiplier,\n        d: m.d * multiplier,\n    }\n}`, explain: `Build a fresh Matrix literal, multiplying each field. This is scalar multiplication.` },
  ],

  min_and_max: [
    { code: `pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {`, explain: `Return both the smallest and largest of three numbers as a tuple.` },
    { code: `    let min = std::cmp::min(nb_1, std::cmp::min(nb_2, nb_3));`, explain: `Chain two min calls to find the smallest of three.` },
    { code: `    let max = std::cmp::max(nb_1, std::cmp::max(nb_2, nb_3));`, explain: `Chain two max calls for the largest.` },
    { code: `    (min, max)\n}`, explain: `Return them as a (min, max) tuple.` },
  ],

  modify_letter: [
    { code: `pub fn remove_letter_sensitive(s: &str, letter: char) -> String {`, explain: `Remove every occurrence of letter (case-sensitive).` },
    { code: `    s.chars().filter(|&c| c != letter).collect()\n}`, explain: `Keep only the characters that are not the target letter, then collect into a String.` },
    { code: `pub fn remove_letter_insensitive(s: &str, letter: char) -> String {`, explain: `Same idea, but ignore case.` },
    { code: `    let target = letter.to_ascii_lowercase();\n    s.chars().filter(|c| c.to_ascii_lowercase() != target).collect()\n}`, explain: `Compare lowercased characters so both 'A' and 'a' are removed.` },
  ],

  smallest: [
    { code: `use std::collections::HashMap;`, explain: `The input is a HashMap of name -> value.` },
    { code: `pub fn smallest(h: HashMap<&str, i32>) -> i32 {`, explain: `Return the smallest value stored in the map.` },
    { code: `    h.values().copied().min().unwrap_or(0)\n}`, explain: `values() iterates the i32s; min() finds the smallest (an Option); unwrap_or(0) handles an empty map.` },
  ],

  prime_checker: [
    { code: `#[derive(PartialEq, Eq, Debug)]\npub enum PrimeErr {\n    Even,\n    Divider(usize),\n}`, explain: `The error type: Even for multiples of two, or Divider(d) with the smallest odd divider.` },
    { code: `pub fn prime_checker(nb: usize) -> Option<Result<usize, PrimeErr>> {`, explain: `None when nb <= 1; otherwise a Result that is Ok(nb) for primes or Err(PrimeErr).` },
    { code: `    if nb <= 1 {\n        return None;\n    }\n    if nb == 2 {\n        return Some(Ok(2));\n    }`, explain: `Reject 0 and 1 with None; 2 is the only even prime.` },
    { code: `    if nb % 2 == 0 {\n        return Some(Err(PrimeErr::Even));\n    }`, explain: `Any other even number fails with Even.` },
    { code: `    let mut i = 3;\n    while i * i <= nb {\n        if nb % i == 0 {\n            return Some(Err(PrimeErr::Divider(i)));\n        }\n        i += 2;\n    }`, explain: `Test only odd divisors up to the square root; the first one found is the smallest divider.` },
    { code: `    Some(Ok(nb))\n}`, explain: `No divider found, so nb is prime.` },
  ],

  profanity_filter: [
    { code: `pub fn check_ms(message: &str) -> Result<&str, &str> {`, explain: `Validate a message, returning the text on success or an error string.` },
    { code: `    if message.is_empty() || message.contains("stupid") {\n        Err("ERROR: illegal")\n    } else {\n        Ok(message)\n    }\n}`, explain: `Empty input or a banned word ("stupid") gives Err("ERROR: illegal"); anything else passes through as Ok.` },
  ],

  insertion_sort: [
    { code: `pub fn insertion_sort(slice: &mut [i32], steps: usize) {`, explain: `Run up to "steps" outer passes of insertion sort, in place.` },
    { code: `    let limit = steps.min(slice.len().saturating_sub(1));`, explain: `Never do more passes than length-1; saturating_sub avoids underflow on an empty slice.` },
    { code: `    for i in 1..=limit {`, explain: `Each pass i inserts element i into the already-sorted left portion.` },
    { code: `        let mut j = i;\n        while j > 0 && slice[j - 1] > slice[j] {\n            slice.swap(j - 1, j);\n            j -= 1;\n        }\n    }\n}`, explain: `Shift the element left past any larger neighbours until it sits in order.` },
  ],

  matrix_determinant: [
    { code: `pub fn matrix_determinant(m: [[isize; 3]; 3]) -> isize {`, explain: `Compute the determinant of a 3x3 matrix by cofactor expansion along the top row.` },
    { code: `    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])`, explain: `a times the 2x2 determinant of the minor that excludes a's row and column.` },
    { code: `        - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])`, explain: `minus b times its minor's determinant (note the sign).` },
    { code: `        + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])\n}`, explain: `plus c times its minor. For the example this gives 35.` },
  ],

  order_books: [
    { code: `pub fn order_books(writer: &mut Writer) {`, explain: `Sort the writer's books alphabetically by title, case-insensitively, in place.` },
    { code: `    writer.books.sort_by(|a, b| {\n        a.title.to_lowercase().cmp(&b.title.to_lowercase())\n    });\n}`, explain: `sort_by compares lowercased titles so "hamlet" and "Hamlet" order the same way.` },
  ],

  rot21: [
    { code: `pub fn rot21(input: &str) -> String {`, explain: `Apply a ROT cipher that rotates each letter 21 positions forward, leaving other characters unchanged.` },
    { code: `    input.chars().map(|c| {`, explain: `Transform each character and collect the results into a new String.` },
    { code: `        if c.is_ascii_lowercase() {\n            (((c as u8 - b'a' + 21) % 26) + b'a') as char\n        }`, explain: `For a lowercase letter: shift within 0..26 using its offset from 'a', wrap with % 26, then back to a char.` },
    { code: `        else if c.is_ascii_uppercase() {\n            (((c as u8 - b'A' + 21) % 26) + b'A') as char\n        }`, explain: `Same for uppercase, anchored at 'A'.` },
    { code: `        else { c }\n    }).collect()\n}`, explain: `Non-letters pass through unchanged.` },
  ],

  flat_tree: [
    { code: `use std::collections::BTreeSet;`, explain: `A BTreeSet keeps its elements in sorted order automatically.` },
    { code: `pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T> {`, explain: `Return the set's elements as a sorted Vec. The bound lets us turn each &T into an owned T.` },
    { code: `    tree.iter().map(|x| x.to_owned()).collect()\n}`, explain: `Iterating a BTreeSet already yields sorted items; clone each into the Vec.` },
  ],

  brackets_matching: [
    { code: `use std::env;`, explain: `Read command-line arguments.` },
    { code: `fn is_balanced(s: &str) -> bool {\n    let mut stack: Vec<char> = Vec::new();`, explain: `A stack remembers the opening brackets seen so far.` },
    { code: `    for c in s.chars() {\n        match c {\n            '(' | '[' | '{' => stack.push(c),`, explain: `Push every opening bracket; ignore all other characters.` },
    { code: `            ')' => if stack.pop() != Some('(') { return false; },\n            ']' => if stack.pop() != Some('[') { return false; },\n            '}' => if stack.pop() != Some('{') { return false; },\n            _ => {}\n        }\n    }`, explain: `A closing bracket must pop the matching opener; a mismatch (or empty stack) means unbalanced.` },
    { code: `    stack.is_empty()\n}`, explain: `Balanced only if no openers are left unclosed.` },
    { code: `fn main() {\n    let args: Vec<String> = env::args().collect();\n    for arg in &args[1..] {\n        println!("{}", if is_balanced(arg) { "OK" } else { "Error" });\n    }\n}`, explain: `For each argument print OK or Error. No arguments prints nothing.` },
  ],

  brain_fuck: [
    { code: `use std::env;`, explain: `The Brainfuck source is the first command-line argument.` },
    { code: `fn main() {\n    let args: Vec<String> = env::args().collect();\n    let code: Vec<char> = args[1].chars().collect();`, explain: `Collect the program's characters so we can jump around by index.` },
    { code: `    let mut tape = [0u8; 2048];\n    let mut ptr = 0usize;\n    let mut pc = 0usize;`, explain: `A 2048-byte tape, a data pointer, and a program counter.` },
    { code: `    while pc < code.len() {\n        match code[pc] {\n            '>' => ptr += 1,\n            '<' => ptr -= 1,\n            '+' => tape[ptr] = tape[ptr].wrapping_add(1),\n            '-' => tape[ptr] = tape[ptr].wrapping_sub(1),\n            '.' => print!("{}", tape[ptr] as char),`, explain: `Move the pointer, change the current cell, or output it as ASCII. wrapping_add/sub model byte overflow.` },
    { code: `            '[' => if tape[ptr] == 0 {\n                let mut depth = 1;\n                while depth > 0 { pc += 1; if code[pc] == '[' { depth += 1; } else if code[pc] == ']' { depth -= 1; } }\n            },`, explain: `At '[' with a zero cell, skip forward past the matching ']' (counting nesting).` },
    { code: `            ']' => if tape[ptr] != 0 {\n                let mut depth = 1;\n                while depth > 0 { pc -= 1; if code[pc] == ']' { depth += 1; } else if code[pc] == '[' { depth -= 1; } }\n            },\n            _ => {}\n        }\n        pc += 1;\n    }\n}`, explain: `At ']' with a non-zero cell, jump back to the matching '['. Any other character is a comment. Advance the program counter each step.` },
  ],

  display_table: [
    { code: `use std::fmt;`, explain: `We implement Display for the Table.` },
    { code: `impl fmt::Display for Table {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        if self.headers.is_empty() {\n            return Ok(());\n        }`, explain: `Print nothing for an empty table.` },
    { code: `        let mut widths: Vec<usize> = self.headers.iter().map(|h| h.len()).collect();\n        for row in &self.body {\n            for (i, cell) in row.iter().enumerate() {\n                widths[i] = widths[i].max(cell.len());\n            }\n        }`, explain: `Each column is as wide as its widest cell (header or body).` },
    { code: `        let center = |s: &str, w: usize| {\n            let pad = w - s.len();\n            let left = pad / 2;\n            format!("{}{}{}", " ".repeat(left), s, " ".repeat(pad - left))\n        };`, explain: `Centre a value in its column; when the padding is odd the extra space goes on the right (text sits one to the left).` },
    { code: `        let line = |cells: &[String]| cells.iter().enumerate().map(|(i, c)| center(c, widths[i])).collect::<Vec<_>>().join(" | ");`, explain: `Build one row: centre every cell and join with " | ".` },
    { code: `        writeln!(f, "| {} |", line(&self.headers))?;\n        let sep: Vec<String> = widths.iter().map(|w| "-".repeat(w + 2)).collect();\n        writeln!(f, "+{}+", sep.join("+"))?;\n        for row in &self.body {\n            writeln!(f, "| {} |", line(row))?;\n        }\n        Ok(())\n    }\n}`, explain: `Write the header row, a dash/plus separator sized to each column, then the body rows. (Exact spacing follows the subject.)` },
  ],

  filter_table: [
    { code: `impl Table {\n    pub fn new() -> Table {\n        Table { headers: Vec::new(), body: Vec::new() }\n    }`, explain: `Start with an empty table.` },
    { code: `    pub fn add_row(&mut self, row: &[String]) {\n        self.body.push(row.to_vec());\n    }`, explain: `Append a row (copying the borrowed slice into an owned Vec).` },
    { code: `    pub fn filter_col(&self, column_index: usize, value: &str) -> Table {`, explain: `Return a new Table containing only the rows whose given column equals value.` },
    { code: `        let body = self.body.iter()\n            .filter(|row| row.get(column_index).map(|c| c == value).unwrap_or(false))\n            .cloned()\n            .collect();`, explain: `filter keeps matching rows; get() guards against a missing column.` },
    { code: `        Table { headers: self.headers.clone(), body }\n    }\n}`, explain: `Keep the same headers, with the filtered body.` },
  ],
};
