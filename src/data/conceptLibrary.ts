import type { ConceptEntry } from '../types';

// ===========================================================================
// Reusable Rust concept library.
// Keyed by a stable concept id; referenced by exercises via conceptIds.
// Beginner-friendly: each entry explains the idea, why Rust uses it, and shows
// one minimal isolated example with a plain-English walkthrough.
// This file is zone-agnostic and can be reused by any future learning content.
// ===========================================================================

export const conceptLibrary: Record<string, ConceptEntry> = {
  ownership: {
    id: 'ownership',
    name: 'Ownership',
    explanation:
      'Every value in Rust has a single owner — the variable responsible for it. When the owner goes out of scope, the value is automatically freed. Assigning a non-Copy value (like a String) to another variable *moves* ownership; the old variable can no longer be used.',
    whyItMatters:
      'Ownership is how Rust guarantees memory safety without a garbage collector. The compiler frees memory for you at exactly the right time, with zero runtime cost.',
    example: `let name = String::from("Ali");
let another = name;        // ownership MOVES to 'another'
// println!("{}", name);   // compile error: 'name' was moved
println!("{}", another);   // ok`,
    exampleExplain:
      'The String "Ali" lives on the heap. After `let another = name;` only `another` owns it — `name` is invalidated so two variables can never free the same memory.',
    docUrl: 'https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html',
  },

  borrowing: {
    id: 'borrowing',
    name: 'Borrowing',
    explanation:
      'Instead of moving a value you can *borrow* it with a reference (`&value`). Borrowing lets a function read or use a value without taking ownership, so the original owner keeps it afterwards. You can have many shared `&` borrows, or exactly one mutable `&mut` borrow.',
    whyItMatters:
      'Borrowing avoids needless copying and keeps values usable after a function call, while the borrow checker still prevents data races and dangling references at compile time.',
    example: `fn len(s: &String) -> usize { s.len() }

let greeting = String::from("hello");
let n = len(&greeting);    // borrow, don't move
println!("{} is {} chars", greeting, n); // greeting still usable`,
    exampleExplain:
      '`&greeting` hands `len` a temporary reference. `len` reads the string but never owns it, so `greeting` is still valid on the next line.',
    docUrl: 'https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html',
  },

  references: {
    id: 'references',
    name: 'References & Slices',
    explanation:
      'A reference (`&T`) points at a value without owning it. A slice (`&[T]` or `&str`) references a contiguous range of a collection — for example a window into a Vec or part of a String — again without copying.',
    whyItMatters:
      'Slices let functions accept "any portion of a sequence" generically and cheaply. Taking `&[u64]` instead of `Vec<u64>` means the caller can pass a Vec, an array, or a sub-range.',
    example: `fn sum(nums: &[i64]) -> i64 {
    nums.iter().sum()
}

let v = vec![1, 2, 3, 4];
println!("{}", sum(&v));      // whole vec
println!("{}", sum(&v[1..3])); // just elements 2 and 3`,
    exampleExplain:
      '`&[i64]` is a slice. `&v` borrows the whole vector as a slice; `&v[1..3]` borrows only part of it. No data is copied either way.',
    docUrl: 'https://doc.rust-lang.org/book/ch04-03-slices.html',
  },

  lifetimes: {
    id: 'lifetimes',
    name: 'Lifetimes',
    explanation:
      'A lifetime is the span during which a reference is valid. Usually the compiler infers them, but sometimes you annotate them (e.g. `fn first<\'a>(s: &\'a str) -> &\'a str`) to tell the compiler how the lifetimes of inputs and outputs relate.',
    whyItMatters:
      'Lifetimes are how Rust statically guarantees a reference never outlives the data it points to — eliminating dangling pointers without any runtime check.',
    example: `fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}`,
    exampleExplain:
      "The `'a` says: the returned reference lives at least as long as both inputs. The caller therefore knows the result is safe to use as long as both arguments are alive.",
    docUrl: 'https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html',
  },

  option: {
    id: 'option',
    name: 'Option<T>',
    explanation:
      'Rust has no null. Instead, a value that may be absent has type `Option<T>`, which is either `Some(value)` or `None`. You must handle both cases — usually with `match`, `if let`, or helpers like `unwrap_or`.',
    whyItMatters:
      'By making "might be missing" part of the type, the compiler forces you to deal with the empty case, eliminating an entire class of null-pointer bugs.',
    example: `fn first_char(s: &str) -> Option<char> {
    s.chars().next()
}

match first_char("hi") {
    Some(c) => println!("first is {}", c),
    None => println!("empty string"),
}`,
    exampleExplain:
      '`chars().next()` returns `Option<char>` because the string could be empty. The `match` makes you handle both `Some` and `None`, so you can never read a missing value by accident.',
    docUrl: 'https://doc.rust-lang.org/std/option/enum.Option.html',
  },

  result: {
    id: 'result',
    name: 'Result<T, E>',
    explanation:
      'An operation that can fail returns `Result<T, E>`: either `Ok(value)` on success or `Err(error)` on failure. As with Option, you handle both arms — or propagate the error with the `?` operator.',
    whyItMatters:
      'Errors are ordinary values, not hidden exceptions. The type signature tells callers exactly what can fail, and the compiler ensures failures are not silently ignored.',
    example: `fn parse(s: &str) -> Result<i64, std::num::ParseIntError> {
    s.parse::<i64>()
}

match parse("42") {
    Ok(n) => println!("got {}", n),
    Err(e) => println!("bad number: {}", e),
}`,
    exampleExplain:
      '`parse` hands back `Ok(42)` for valid input and `Err(..)` for "abc". The match forces you to deal with the failure path explicitly.',
    docUrl: 'https://doc.rust-lang.org/std/result/enum.Result.html',
  },

  iterators: {
    id: 'iterators',
    name: 'Iterators',
    explanation:
      'An iterator produces a sequence of values one at a time. Calling `.iter()` (or `.into_iter()`) on a collection gives you one, and you chain adapters like `.map()`, `.filter()`, `.enumerate()` and finish with a consumer like `.collect()`, `.sum()`, or a `for` loop.',
    whyItMatters:
      'Iterator chains are expressive *and* fast — the compiler optimizes them down to the same code as a hand-written loop (zero-cost abstraction), while reading like a description of the transformation.',
    example: `let nums = vec![1, 2, 3, 4];
let evens_doubled: Vec<i32> = nums.iter()
    .filter(|&&n| n % 2 == 0)
    .map(|&n| n * 2)
    .collect();
// evens_doubled == [4, 8]`,
    exampleExplain:
      '`filter` keeps even numbers, `map` doubles each, and `collect` gathers the results into a new Vec. Nothing runs until `collect` consumes the chain.',
    docUrl: 'https://doc.rust-lang.org/book/ch13-02-iterators.html',
  },

  traits: {
    id: 'traits',
    name: 'Traits',
    explanation:
      'A trait is a set of methods a type can implement — like an interface. Common ones include `Display` (how to print with `{}`), `Clone`, and `PartialEq`. You write `impl SomeTrait for YourType { ... }`.',
    whyItMatters:
      'Traits enable shared behavior and generics: a function can accept "any type that implements `Display`" without knowing the concrete type, giving you polymorphism with no runtime cost.',
    example: `use std::fmt;
struct Point { x: i32, y: i32 }
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}
println!("{}", Point { x: 1, y: 2 }); // (1, 2)`,
    exampleExplain:
      'By implementing `Display`, `Point` gains the ability to be printed with `{}`. The `write!` macro sends the formatted text to the formatter.',
    docUrl: 'https://doc.rust-lang.org/book/ch10-02-traits.html',
  },

  enums: {
    id: 'enums',
    name: 'Enums',
    explanation:
      'An enum defines a type by listing its possible variants. Variants can carry data, so one enum can model several shapes of value (e.g. `Shape::Circle(f64)` vs `Shape::Rect(f64, f64)`).',
    whyItMatters:
      'Enums plus `match` let you model "one of these cases" precisely, and the compiler checks you handled every variant — impossible states become unrepresentable.',
    example: `enum Shape {
    Circle(f64),
    Rect(f64, f64),
}
fn area(s: &Shape) -> f64 {
    match s {
        Shape::Circle(r) => 3.14159 * r * r,
        Shape::Rect(w, h) => w * h,
    }
}`,
    exampleExplain:
      'Each `Shape` is exactly one variant. `match` pulls the data out of whichever variant it is, and must cover both or the code will not compile.',
    docUrl: 'https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html',
  },

  structs: {
    id: 'structs',
    name: 'Structs',
    explanation:
      'A struct groups related fields into one named type. You construct it with a struct literal (`Point { x: 1, y: 2 }`) and access fields with a dot (`p.x`). Methods go in an `impl` block.',
    whyItMatters:
      'Structs give your data a clear shape and name, making code self-documenting and letting you attach behavior (methods) to the data it operates on.',
    example: `struct User { name: String, age: u32 }
impl User {
    fn new(name: &str, age: u32) -> Self {
        User { name: name.to_string(), age }
    }
    fn greet(&self) -> String {
        format!("Hi, I'm {}", self.name)
    }
}`,
    exampleExplain:
      '`User` bundles a name and age. `new` is an associated constructor, and `greet` borrows `&self` to read a field without consuming the struct.',
    docUrl: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html',
  },

  pattern_matching: {
    id: 'pattern_matching',
    name: 'Pattern Matching',
    explanation:
      '`match` compares a value against patterns and runs the first arm that fits, binding any captured pieces. It must be exhaustive (cover every case), often using `_` as a catch-all. `if let` is a shorthand for matching one pattern.',
    whyItMatters:
      'Matching is how you safely take apart enums, Options, tuples and more. Exhaustiveness checking means adding a new variant forces you to update every match — the compiler finds the gaps.',
    example: `let n = 3;
let label = match n {
    0 => "zero",
    1 | 2 => "small",
    _ => "many",
};
// label == "many"`,
    exampleExplain:
      'The arms are tried top to bottom. `1 | 2` matches either value; `_` catches everything else so the match is exhaustive.',
    docUrl: 'https://doc.rust-lang.org/book/ch06-02-match.html',
  },

  closures: {
    id: 'closures',
    name: 'Closures',
    explanation:
      'A closure is an anonymous function written with `|args| body`. It can capture variables from the surrounding scope. Closures are most often passed to iterator adapters like `map` and `filter`.',
    whyItMatters:
      'Closures let you parameterize behavior — passing a small piece of logic into another function — which is the backbone of Rust’s expressive iterator and sorting APIs.',
    example: `let factor = 10;
let scaled: Vec<i32> = (1..=3).map(|n| n * factor).collect();
// scaled == [10, 20, 30]`,
    exampleExplain:
      'The closure `|n| n * factor` captures `factor` from the environment and is applied to each number by `map`.',
    docUrl: 'https://doc.rust-lang.org/book/ch13-01-closures.html',
  },

  error_handling: {
    id: 'error_handling',
    name: 'Error Handling',
    explanation:
      'Recoverable errors flow through `Result`/`Option`. The `?` operator unwraps an `Ok`/`Some` or returns the error early. For unrecoverable bugs you can `panic!`. Helpers like `unwrap_or`, `map_err`, and `ok_or` convert between them.',
    whyItMatters:
      'Explicit error handling keeps failures visible and local. `?` makes the happy path readable while still propagating every error correctly.',
    example: `fn double(s: &str) -> Result<i64, std::num::ParseIntError> {
    let n = s.parse::<i64>()?; // returns Err early on failure
    Ok(n * 2)
}`,
    exampleExplain:
      'If `parse` fails, `?` returns the `Err` from `double` immediately; otherwise `n` is the parsed number and execution continues.',
    docUrl: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html',
  },

  cli_args: {
    id: 'cli_args',
    name: 'Command-Line Arguments',
    explanation:
      '`std::env::args()` yields the program’s command-line arguments as an iterator of `String`. The first item (index 0) is the program name itself; the real user arguments start at index 1. Collect them into a `Vec<String>` to index or iterate.',
    whyItMatters:
      'Reading argv is how a CLI program receives input. Checking how many arguments arrived (and rejecting the wrong count) is a common validation step.',
    example: `use std::env;
let args: Vec<String> = env::args().collect();
if args.len() != 2 {
    println!("Error");        // expected exactly one user argument
} else {
    println!("you passed: {}", args[1]);
}`,
    exampleExplain:
      '`args[0]` is the binary name, so `args.len() == 2` means exactly one user argument. `cargo run hello` makes `args[1] == "hello"`.',
    docUrl: 'https://doc.rust-lang.org/std/env/fn.args.html',
  },

  collections: {
    id: 'collections',
    name: 'Collections (Vec & HashMap)',
    explanation:
      '`Vec<T>` is a growable array; push with `.push()`, index with `[i]`, iterate with `.iter()`. `HashMap<K, V>` stores key→value pairs; insert with `.insert()`, look up with `.get()`, and the `entry` API makes "insert or update" easy.',
    whyItMatters:
      'Almost every program needs a list or a lookup table. Vec and HashMap are the two workhorse collections in the standard library.',
    example: `use std::collections::HashMap;
let mut counts: HashMap<&str, i32> = HashMap::new();
for word in ["a", "b", "a"] {
    *counts.entry(word).or_insert(0) += 1;
}
// counts["a"] == 2, counts["b"] == 1`,
    exampleExplain:
      '`entry(word).or_insert(0)` returns a mutable reference to the count (creating it as 0 first time). `*... += 1` bumps it — a clean counting idiom.',
    docUrl: 'https://doc.rust-lang.org/book/ch08-00-common-collections.html',
  },

  generics: {
    id: 'generics',
    name: 'Generics',
    explanation:
      'Generics let one definition work for many types using a type parameter like `T`. `struct Wrapper<T> { value: T }` or `fn first<T>(v: &[T]) -> &T` work for any `T`, often constrained by trait bounds (`T: Display`).',
    whyItMatters:
      'Generics remove duplication: write the logic once and use it for `i32`, `String`, or your own types, with full type-checking and no runtime cost.',
    example: `struct Garage<T> { items: Vec<T> }
impl<T> Garage<T> {
    fn new() -> Self { Garage { items: Vec::new() } }
    fn add(&mut self, item: T) { self.items.push(item); }
}`,
    exampleExplain:
      '`Garage<T>` can hold any type. `Garage<String>` stores strings, `Garage<Car>` stores cars — one implementation, many element types.',
    docUrl: 'https://doc.rust-lang.org/book/ch10-01-syntax.html',
  },

  vecdeque: {
    id: 'vecdeque',
    name: 'VecDeque (Queues)',
    explanation:
      '`VecDeque<T>` is a double-ended queue. Push/pop efficiently at both ends: `push_back`/`pop_front` model a FIFO queue, while `push_front`/`pop_back` are also available. `pop_front` returns an `Option<T>` (None when empty).',
    whyItMatters:
      'When you need first-in-first-out behavior (a waiting line, a task queue), VecDeque gives O(1) operations at both ends, unlike removing from the front of a Vec.',
    example: `use std::collections::VecDeque;
let mut queue: VecDeque<&str> = VecDeque::new();
queue.push_back("first");
queue.push_back("second");
assert_eq!(queue.pop_front(), Some("first"));`,
    exampleExplain:
      'Items join at the back and leave from the front, so "first" comes out first — the defining behavior of a queue.',
    docUrl: 'https://doc.rust-lang.org/std/collections/struct.VecDeque.html',
  },

  display_trait: {
    id: 'display_trait',
    name: 'Display & Formatting',
    explanation:
      'Implementing `std::fmt::Display` defines how your type prints with `{}`. Inside `fmt` you use `write!(f, "...")`. The `format!` macro builds a `String` the same way `println!` builds output.',
    whyItMatters:
      'Custom `Display` lets your types produce exactly the textual output an exercise expects — essential when tests compare printed strings byte-for-byte.',
    example: `use std::fmt;
struct Money(u32);
impl fmt::Display for Money {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "$ {}", self.0)
    }
}
assert_eq!(format!("{}", Money(5)), "$ 5");`,
    exampleExplain:
      '`write!` formats into the provided formatter `f`. Now `format!("{}", Money(5))` yields exactly "$ 5".',
    docUrl: 'https://doc.rust-lang.org/std/fmt/trait.Display.html',
  },

  recursion: {
    id: 'recursion',
    name: 'Recursion',
    explanation:
      'A recursive function calls itself on a smaller input until it reaches a base case that stops the recursion. Each call solves a tiny piece and combines it with the result of the smaller call.',
    whyItMatters:
      'Many problems are naturally self-similar — factorials, tree traversals, divide-and-conquer. Recursion expresses them directly, often more clearly than a manual stack.',
    example: `fn factorial(n: u64) -> u64 {
    if n <= 1 {
        1                 // base case
    } else {
        n * factorial(n - 1) // recursive case
    }
}`,
    exampleExplain:
      'The base case (n <= 1) stops the recursion; otherwise each call multiplies n by the factorial of n-1, unwinding to the final product.',
    docUrl: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html',
  },

  sorting: {
    id: 'sorting',
    name: 'Sorting',
    explanation:
      'Arranging elements into order. The standard library offers sort() and sort_by(|a, b| ...) for custom keys; you can also implement a sort (e.g. insertion sort) by repeatedly placing each element into its correct position.',
    whyItMatters:
      'Ordered data powers search, ranking, and deduplication. Knowing both the built-in sorts and how a simple sort works is core algorithmic literacy.',
    example: `let mut v = vec![3, 1, 2];
v.sort();                       // [1, 2, 3]
v.sort_by(|a, b| b.cmp(a));     // [3, 2, 1] (descending)`,
    exampleExplain:
      'sort() orders ascending in place; sort_by takes a comparator returning an Ordering, here reversing the comparison for descending order.',
    docUrl: 'https://doc.rust-lang.org/std/primitive.slice.html#method.sort',
  },

  matrices: {
    id: 'matrices',
    name: 'Matrices & Grids',
    explanation:
      'A 2-D grid of values, usually a Vec<Vec<T>> (rows of columns) or a struct with fixed fields. You index with two coordinates, m[row][col], and loop with nested ranges.',
    whyItMatters:
      'Matrices appear in graphics, linear algebra, and games. Comfort with nested indexing and row/column iteration is essential for these problems.',
    example: `let m = vec![vec![1, 2], vec![3, 4]];
let mut sum = 0;
for row in 0..m.len() {
    for col in 0..m[row].len() {
        sum += m[row][col];
    }
}`,
    exampleExplain:
      'The outer loop walks rows, the inner loop walks columns; m[row][col] reads one cell. Nested loops visit every element.',
    docUrl: 'https://doc.rust-lang.org/book/ch08-01-vectors.html',
  },

  trees: {
    id: 'trees',
    name: 'Recursive Data (Trees)',
    explanation:
      'A tree is a value that contains more values of the same kind — e.g. an enum where a node holds child nodes. Because the type is recursive, the children usually sit behind a Vec or Box, and you process them with a recursive function.',
    whyItMatters:
      'Nested/hierarchical data (file systems, expression trees, JSON) is everywhere. Recursive types plus recursive functions are the natural way to model and flatten them.',
    example: `enum Tree {
    Leaf(i32),
    Node(Vec<Tree>),
}
fn sum(t: &Tree) -> i32 {
    match t {
        Tree::Leaf(v) => *v,
        Tree::Node(children) => children.iter().map(sum).sum(),
    }
}`,
    exampleExplain:
      'A Leaf yields its value; a Node recursively sums its children. The match handles both shapes, and recursion walks the whole tree.',
    docUrl: 'https://doc.rust-lang.org/book/ch15-01-box.html',
  },

  parsing: {
    id: 'parsing',
    name: 'Parsing & Interpreters',
    explanation:
      'Turning raw text into meaning: scanning characters or tokens and acting on them. A simple interpreter walks the input once, keeping state (a position, a stack, counters) and reacting to each symbol.',
    whyItMatters:
      'Reading structured input — numbers, commands, mini-languages — is a recurring task. A clear scan-and-act loop keeps parsers correct and readable.',
    example: `let mut depth = 0;
for c in "(())".chars() {
    match c {
        '(' => depth += 1,
        ')' => depth -= 1,
        _ => {}
    }
}`,
    exampleExplain:
      'The loop scans each character and updates state: depth rises on "(" and falls on ")", a tiny parser for nesting.',
    docUrl: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars',
  },
};

// Resolve a list of concept ids into their entries, skipping unknown ids.
export function resolveConcepts(ids: string[]): ConceptEntry[] {
  return ids.map((id) => conceptLibrary[id]).filter((c): c is ConceptEntry => !!c);
}
