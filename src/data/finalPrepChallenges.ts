import type { FinalPrepChallenge } from '../types';

// ===========================================================================
// Final Preparation Quiz — a bank of self-contained coding challenges grouped
// by level (1 = easiest .. 9 = hardest). Levels 1-6 are the priority and have
// several challenges each; 7-9 are lighter. Each challenge is graded by running
// its testCases on the Rust playground: the student fills the function, the
// test provides its own fn main with assertions and prints "ok".
// ===========================================================================

const tc = (id: string, description: string, code: string) => ({
  id,
  description,
  code,
  expectedOutput: 'ok',
  hidden: false,
});

export const finalPrepChallenges: FinalPrepChallenge[] = [
  // ---------------------------------------------------------------- Level 1
  {
    id: 'fp_l1_sum_to_n',
    level: 1,
    title: 'Sum to N',
    difficulty: 'easiest',
    description: 'Return the sum of all integers from 1 up to and including n.',
    requirements: ['Return 0 when n is 0.', 'Use a loop, a range, or the closed-form formula.'],
    expectedBehavior: 'sum_to_n(5) = 15, sum_to_n(0) = 0, sum_to_n(100) = 5050.',
    starter: `pub fn sum_to_n(n: u64) -> u64 {\n    todo!()\n}`,
    hints: ['(1..=n) gives an inclusive range.', 'You can .sum() a range, or add in a loop.'],
    concepts: ['iterators'],
    docs: {
      apis: [{ name: 'RangeInclusive', url: 'https://doc.rust-lang.org/std/ops/struct.RangeInclusive.html', note: '1..=n' }],
      links: [{ title: 'Iterator::sum', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.sum' }],
    },
    testCases: [tc('t1', 'sums', `fn main(){ assert_eq!(sum_to_n(5),15); assert_eq!(sum_to_n(0),0); assert_eq!(sum_to_n(100),5050); println!("ok"); }`)],
  },
  {
    id: 'fp_l1_max_two',
    level: 1,
    title: 'Max of Two',
    difficulty: 'easiest',
    description: 'Return the larger of two integers.',
    requirements: ['Handle negatives.', 'Return either value if they are equal.'],
    expectedBehavior: 'max_two(3, 7) = 7, max_two(-1, -5) = -1.',
    starter: `pub fn max_two(a: i32, b: i32) -> i32 {\n    todo!()\n}`,
    hints: ['An if/else is enough.', 'std::cmp::max(a, b) also works.'],
    concepts: ['pattern_matching'],
    testCases: [tc('t1', 'max', `fn main(){ assert_eq!(max_two(3,7),7); assert_eq!(max_two(-1,-5),-1); assert_eq!(max_two(4,4),4); println!("ok"); }`)],
  },
  {
    id: 'fp_l1_abs_diff',
    level: 1,
    title: 'Absolute Difference',
    difficulty: 'easy',
    description: 'Return the absolute difference between two integers.',
    requirements: ['Result is always non-negative.'],
    expectedBehavior: 'abs_diff(3, 8) = 5, abs_diff(8, 3) = 5.',
    starter: `pub fn abs_diff(a: i64, b: i64) -> i64 {\n    todo!()\n}`,
    hints: ['(a - b) might be negative.', 'Apply .abs() to the difference.'],
    concepts: ['pattern_matching'],
    testCases: [tc('t1', 'abs diff', `fn main(){ assert_eq!(abs_diff(3,8),5); assert_eq!(abs_diff(8,3),5); assert_eq!(abs_diff(-2,2),4); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 2
  {
    id: 'fp_l2_count_vowels',
    level: 2,
    title: 'Count Vowels',
    difficulty: 'easy',
    description: 'Count the vowels (a, e, i, o, u) in a string, case-insensitively.',
    requirements: ['Count both uppercase and lowercase vowels.', 'Return 0 for an empty string.'],
    expectedBehavior: 'count_vowels("hello") = 2, count_vowels("AEIOU") = 5, count_vowels("xyz") = 0.',
    starter: `pub fn count_vowels(s: &str) -> usize {\n    todo!()\n}`,
    hints: ['Iterate chars and filter the vowels.', '"aeiouAEIOU".contains(c) is a quick test.'],
    concepts: ['iterators', 'closures'],
    docs: {
      apis: [{ name: 'str::chars', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars' }, { name: 'Iterator::filter', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter' }],
      links: [{ title: 'Rust By Example — Strings', url: 'https://doc.rust-lang.org/rust-by-example/std/str.html' }],
    },
    testCases: [tc('t1', 'vowels', `fn main(){ assert_eq!(count_vowels("hello"),2); assert_eq!(count_vowels("AEIOU"),5); assert_eq!(count_vowels("xyz"),0); println!("ok"); }`)],
  },
  {
    id: 'fp_l2_reverse_words',
    level: 2,
    title: 'Reverse Word Order',
    difficulty: 'easy',
    description: 'Return the words of a string in reverse order, separated by single spaces.',
    requirements: ['Split on whitespace.', 'Join the reversed words with single spaces.'],
    expectedBehavior: 'reverse_words("hello world") = "world hello", reverse_words("a b c") = "c b a".',
    starter: `pub fn reverse_words(s: &str) -> String {\n    todo!()\n}`,
    hints: ['split_whitespace() gives the words.', 'Collect to a Vec, reverse, then join(" ").'],
    concepts: ['iterators', 'collections'],
    testCases: [tc('t1', 'reverse', `fn main(){ assert_eq!(reverse_words("hello world"),"world hello"); assert_eq!(reverse_words("a b c"),"c b a"); println!("ok"); }`)],
  },
  {
    id: 'fp_l2_is_palindrome',
    level: 2,
    title: 'Palindrome Check',
    difficulty: 'medium',
    description: 'Return true if the string reads the same forwards and backwards (compare characters).',
    requirements: ['An empty string is a palindrome.', 'Compare by characters, not bytes.'],
    expectedBehavior: 'is_palindrome("racecar") = true, is_palindrome("rust") = false.',
    starter: `pub fn is_palindrome(s: &str) -> bool {\n    todo!()\n}`,
    hints: ['Collect chars, or compare chars() with chars().rev().', 's.chars().eq(s.chars().rev()) works.'],
    concepts: ['iterators'],
    testCases: [tc('t1', 'palindrome', `fn main(){ assert!(is_palindrome("racecar")); assert!(!is_palindrome("rust")); assert!(is_palindrome("")); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 3
  {
    id: 'fp_l3_unique_sorted',
    level: 3,
    title: 'Unique & Sorted',
    difficulty: 'medium',
    description: 'Return the distinct values of a slice, sorted ascending.',
    requirements: ['Remove duplicates.', 'Sort the result ascending.', 'An empty input gives an empty Vec.'],
    expectedBehavior: 'unique_sorted(&[3,1,2,3,1]) = [1,2,3].',
    starter: `pub fn unique_sorted(v: &[i32]) -> Vec<i32> {\n    todo!()\n}`,
    hints: ['Sort a copy, then dedup().', 'Or collect into a BTreeSet then into a Vec.'],
    concepts: ['collections', 'sorting'],
    docs: {
      apis: [{ name: 'slice::sort', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.sort' }, { name: 'Vec::dedup', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.dedup' }],
      links: [{ title: 'BTreeSet', url: 'https://doc.rust-lang.org/std/collections/struct.BTreeSet.html' }],
    },
    testCases: [tc('t1', 'unique sorted', `fn main(){ assert_eq!(unique_sorted(&[3,1,2,3,1]),vec![1,2,3]); assert_eq!(unique_sorted(&[]),Vec::<i32>::new()); println!("ok"); }`)],
  },
  {
    id: 'fp_l3_char_count',
    level: 3,
    title: 'Character Frequency',
    difficulty: 'medium',
    description: 'Return a HashMap mapping each character of the string to how many times it appears.',
    requirements: ['Count every character.', 'Use the entry API to insert-or-update.'],
    expectedBehavior: 'For "aab": a -> 2, b -> 1.',
    starter: `use std::collections::HashMap;\n\npub fn char_count(s: &str) -> HashMap<char, u32> {\n    todo!()\n}`,
    hints: ['Loop over s.chars().', '*map.entry(c).or_insert(0) += 1.'],
    concepts: ['collections', 'iterators'],
    docs: {
      apis: [{ name: 'HashMap::entry', url: 'https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry' }],
      links: [{ title: 'The Book — Hash maps', url: 'https://doc.rust-lang.org/book/ch08-03-hash-maps.html' }],
    },
    testCases: [tc('t1', 'frequency', `fn main(){ let m = char_count("aab"); assert_eq!(m[&'a'],2); assert_eq!(m[&'b'],1); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 4
  {
    id: 'fp_l4_safe_div',
    level: 4,
    title: 'Safe Division',
    difficulty: 'medium',
    description: 'Divide two integers, returning None when dividing by zero.',
    requirements: ['Return None if the divisor is 0.', 'Otherwise return Some(quotient).'],
    expectedBehavior: 'safe_div(10, 2) = Some(5), safe_div(1, 0) = None.',
    starter: `pub fn safe_div(a: i64, b: i64) -> Option<i64> {\n    todo!()\n}`,
    hints: ['Guard the zero case first.', 'Return Some(a / b) otherwise.'],
    concepts: ['option', 'error_handling'],
    docs: {
      apis: [{ name: 'Option', url: 'https://doc.rust-lang.org/std/option/enum.Option.html' }],
      links: [{ title: 'Rust By Example — Option', url: 'https://doc.rust-lang.org/rust-by-example/std/option.html' }],
    },
    testCases: [tc('t1', 'safe div', `fn main(){ assert_eq!(safe_div(10,2),Some(5)); assert_eq!(safe_div(1,0),None); assert_eq!(safe_div(-9,3),Some(-3)); println!("ok"); }`)],
  },
  {
    id: 'fp_l4_parse_sum',
    level: 4,
    title: 'Parse & Sum',
    difficulty: 'medium',
    description: 'Parse two strings as i64 and return their sum, propagating a parse error.',
    requirements: ['Use the ? operator to bail on a bad parse.', 'Return Ok(sum) on success.'],
    expectedBehavior: 'parse_sum("3", "4") = Ok(7); parse_sum("x", "4") is an Err.',
    starter: `pub fn parse_sum(a: &str, b: &str) -> Result<i64, std::num::ParseIntError> {\n    todo!()\n}`,
    hints: ['let x = a.parse::<i64>()?;', 'Return Ok(x + y).'],
    concepts: ['result', 'error_handling'],
    docs: {
      apis: [{ name: 'str::parse', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.parse' }, { name: 'Result', url: 'https://doc.rust-lang.org/std/result/enum.Result.html' }],
      links: [{ title: 'The Book — The ? operator', url: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html' }],
    },
    testCases: [tc('t1', 'parse sum', `fn main(){ assert_eq!(parse_sum("3","4"),Ok(7)); assert!(parse_sum("x","4").is_err()); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 5
  {
    id: 'fp_l5_rectangle_area',
    level: 5,
    title: 'Rectangle Area',
    difficulty: 'medium',
    description: 'Implement an area() method on a Rectangle struct.',
    requirements: ['area() borrows &self.', 'Return width * height.'],
    expectedBehavior: 'Rectangle { width: 3, height: 4 }.area() = 12.',
    starter: `pub struct Rectangle {\n    pub width: u32,\n    pub height: u32,\n}\n\nimpl Rectangle {\n    pub fn area(&self) -> u32 {\n        todo!()\n    }\n}`,
    hints: ['Access fields with self.width and self.height.', 'Multiply them.'],
    concepts: ['structs'],
    docs: {
      apis: [{ name: 'impl blocks / methods', url: 'https://doc.rust-lang.org/book/ch05-03-method-syntax.html' }],
      links: [{ title: 'The Book — Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html' }],
    },
    testCases: [tc('t1', 'area', `fn main(){ assert_eq!(Rectangle{width:3,height:4}.area(),12); assert_eq!(Rectangle{width:5,height:5}.area(),25); println!("ok"); }`)],
  },
  {
    id: 'fp_l5_shape_area',
    level: 5,
    title: 'Shape Area (enum)',
    difficulty: 'hard',
    description: 'Compute the area of a Shape enum that is either a Square(side) or a Rectangle(w, h).',
    requirements: ['Match on the Shape variants.', 'Square(s) area is s*s; Rectangle(w, h) area is w*h.'],
    expectedBehavior: 'area(&Shape::Square(3)) = 9, area(&Shape::Rectangle(2, 5)) = 10.',
    starter: `pub enum Shape {\n    Square(i64),\n    Rectangle(i64, i64),\n}\n\npub fn area(s: &Shape) -> i64 {\n    todo!()\n}`,
    hints: ['match s { Shape::Square(side) => ..., Shape::Rectangle(w, h) => ... }.', 'Each arm computes its own area.'],
    concepts: ['enums', 'pattern_matching'],
    docs: {
      apis: [{ name: 'enum with data', url: 'https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html' }],
      links: [{ title: 'Rust By Example — match', url: 'https://doc.rust-lang.org/rust-by-example/flow_control/match.html' }],
    },
    testCases: [tc('t1', 'shape area', `fn main(){ assert_eq!(area(&Shape::Square(3)),9); assert_eq!(area(&Shape::Rectangle(2,5)),10); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 6
  {
    id: 'fp_l6_fib',
    level: 6,
    title: 'Fibonacci',
    difficulty: 'hard',
    description: 'Return the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1).',
    requirements: ['fib(0) = 0, fib(1) = 1.', 'Use iteration (or memoized recursion) to stay efficient.'],
    expectedBehavior: 'fib(10) = 55, fib(20) = 6765.',
    starter: `pub fn fib(n: u32) -> u64 {\n    todo!()\n}`,
    hints: ['Keep two running values a, b and roll them forward.', 'Loop n times updating (a, b) = (b, a + b).'],
    concepts: ['recursion'],
    docs: {
      links: [{ title: 'Fibonacci number', url: 'https://en.wikipedia.org/wiki/Fibonacci_number' }],
      apis: [{ name: 'loops', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html' }],
    },
    testCases: [tc('t1', 'fib', `fn main(){ assert_eq!(fib(0),0); assert_eq!(fib(1),1); assert_eq!(fib(10),55); assert_eq!(fib(20),6765); println!("ok"); }`)],
  },
  {
    id: 'fp_l6_balanced',
    level: 6,
    title: 'Balanced Brackets',
    difficulty: 'hard',
    description: 'Return true if all (), [], {} in the string are correctly matched and nested. Ignore other characters.',
    requirements: ['Use a stack.', 'A closer must match the most recent opener of its kind.', 'An empty string is balanced.'],
    expectedBehavior: 'balanced("([])") = true, balanced("([)]") = false, balanced("") = true.',
    starter: `pub fn balanced(s: &str) -> bool {\n    todo!()\n}`,
    hints: ['Push openers onto a Vec; on a closer, pop and compare.', 'Balanced iff the stack ends empty.'],
    concepts: ['collections', 'pattern_matching'],
    docs: {
      apis: [{ name: 'Vec::push / pop', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.pop' }],
      links: [{ title: 'The Book — match', url: 'https://doc.rust-lang.org/book/ch06-02-match.html' }],
    },
    testCases: [tc('t1', 'balanced', `fn main(){ assert!(balanced("([])")); assert!(!balanced("([)]")); assert!(balanced("")); assert!(balanced("a(b[c]d)e")); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 7
  {
    id: 'fp_l7_max_item',
    level: 7,
    title: 'Generic Maximum',
    difficulty: 'hard',
    description: 'Return the largest item of a slice as an Option, generic over any comparable, copyable type.',
    requirements: ['Return None for an empty slice.', 'Work for any T: PartialOrd + Copy.'],
    expectedBehavior: 'max_item(&[3, 7, 2]) = Some(7); max_item::<i32>(&[]) = None.',
    starter: `pub fn max_item<T: PartialOrd + Copy>(v: &[T]) -> Option<T> {\n    todo!()\n}`,
    hints: ['Handle the empty case up front.', 'Fold: keep the larger of the current best and each element.'],
    concepts: ['generics', 'option', 'iterators'],
    docs: {
      apis: [{ name: 'Trait bounds', url: 'https://doc.rust-lang.org/book/ch10-02-traits.html#traits-as-parameters' }],
      links: [{ title: 'The Book — Generics', url: 'https://doc.rust-lang.org/book/ch10-01-syntax.html' }],
    },
    testCases: [tc('t1', 'generic max', `fn main(){ assert_eq!(max_item(&[3,7,2]),Some(7)); assert_eq!(max_item::<i32>(&[]),None); assert_eq!(max_item(&[1.5,2.5,0.5]),Some(2.5)); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 8
  {
    id: 'fp_l8_sum_even_squares',
    level: 8,
    title: 'Sum of Even Squares',
    difficulty: 'hard',
    description: 'Return the sum of the squares of the even numbers in a slice, using an iterator chain.',
    requirements: ['Keep only even numbers.', 'Square each, then sum.'],
    expectedBehavior: 'sum_even_squares(&[1,2,3,4]) = 4 + 16 = 20.',
    starter: `pub fn sum_even_squares(v: &[i32]) -> i32 {\n    todo!()\n}`,
    hints: ['Chain .iter().filter(...).map(...).sum().', 'Even means n % 2 == 0.'],
    concepts: ['iterators', 'closures'],
    docs: {
      apis: [{ name: 'Iterator::filter / map / sum', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html' }],
      links: [{ title: 'The Book — Iterators', url: 'https://doc.rust-lang.org/book/ch13-02-iterators.html' }],
    },
    testCases: [tc('t1', 'even squares', `fn main(){ assert_eq!(sum_even_squares(&[1,2,3,4]),20); assert_eq!(sum_even_squares(&[1,3,5]),0); println!("ok"); }`)],
  },

  // ---------------------------------------------------------------- Level 9
  {
    id: 'fp_l9_eval_rpn',
    level: 9,
    title: 'RPN Evaluator',
    difficulty: 'hardest',
    description: 'Evaluate a space-separated Reverse Polish Notation expression (+, -, *, /), returning None on any invalid input.',
    requirements: ['Use a stack of i64.', 'Operators pop two operands (a then b, computing a op b).', 'None if a token is bad, an operator lacks operands, or != 1 value remains.'],
    expectedBehavior: 'eval_rpn("3 4 +") = Some(7); eval_rpn("5 1 2 + 4 * + 3 -") = Some(14); eval_rpn("1 2 3") = None.',
    starter: `pub fn eval_rpn(expr: &str) -> Option<i64> {\n    todo!()\n}`,
    hints: ['split_whitespace(); push numbers, fold operators.', 'At the end exactly one value should remain.'],
    concepts: ['collections', 'parsing', 'option'],
    docs: {
      apis: [{ name: 'str::split_whitespace', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.split_whitespace' }, { name: 'Vec as a stack', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.pop' }],
      links: [{ title: 'Reverse Polish notation', url: 'https://en.wikipedia.org/wiki/Reverse_Polish_notation' }],
    },
    testCases: [tc('t1', 'rpn', `fn main(){ assert_eq!(eval_rpn("3 4 +"),Some(7)); assert_eq!(eval_rpn("5 1 2 + 4 * + 3 -"),Some(14)); assert_eq!(eval_rpn("1 2 3"),None); println!("ok"); }`)],
  },
];

export const FINAL_PREP_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
