import type { Chapter } from '../types';

export const chapter1: Chapter = {
  id: 'intro',
  title: 'Chapter 1 — Introduction to Rust',
  description:
    'Get up and running with Rust. Understand what makes it unique, how it compares to languages you already know, and set up your development environment.',
  sections: [
    {
      id: 'what-is-rust',
      title: 'What Is Rust?',
      content: `Rust is a systems programming language created at Mozilla Research, first released in 2015. It is designed to be:

**Fast** — Zero-cost abstractions, no garbage collector, performance comparable to C and C++.

**Safe** — Memory safety guaranteed at compile time without a GC. No null pointer dereferences, no dangling pointers, no data races.

**Expressive** — Modern type system, powerful enums, pattern matching, closures, iterators.

As a C#/Java/Go/Python developer, the most jarring thing about Rust is that many things you expect to "just work" require you to be explicit. In exchange, you get compile-time guarantees that no other mainstream language provides.

**The core innovation:** Rust enforces memory safety through its *ownership system* — a set of rules the compiler checks at compile time. No runtime cost, no garbage collector pauses, no manual memory management bugs.`,
      codeExample: `// Your first Rust program
fn main() {
    let name = "Rustacean"; // immutable by default
    let mut count = 0;      // mutable variable

    for _ in 0..5 {
        count += 1;
    }

    println!("Hello, {}! Count: {}", name, count);
    // Output: Hello, Rustacean! Count: 5
}`,
    },
    {
      id: 'installation',
      title: 'Installing Rust',
      content: `The official way to install Rust is via **rustup**, the Rust toolchain installer.

**On macOS/Linux:**
\`\`\`bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
\`\`\`

**On Windows:**
Download and run \`rustup-init.exe\` from [rustup.rs](https://rustup.rs)

After installation, verify it works:
\`\`\`bash
rustc --version    # the Rust compiler
cargo --version    # the build system and package manager
\`\`\`

**rustup also installs:**
- \`rustc\` — the compiler
- \`cargo\` — the build tool and package manager (like npm for JS, pip for Python, maven for Java)
- Standard library documentation (available offline via \`rustup doc\`)

**Recommended editor:** VS Code with the [rust-analyzer](https://rust-analyzer.github.io/) extension. It gives you autocompletion, type hints, and inline error messages.`,
      codeExample: `# Check your installation
rustc --version
# rustc 1.81.0 (eeb90cda1 2024-09-04)

cargo --version
# cargo 1.81.0 (2dbb1af80 2024-08-20)`,
    },
    {
      id: 'cargo',
      title: 'Cargo — The Rust Build System',
      content: `Cargo is Rust's build system and package manager. It handles everything:

| Task | Cargo Command | Equivalent |
|------|--------------|------------|
| Create new project | \`cargo new my_project\` | \`mkdir\` + init |
| Build | \`cargo build\` | \`javac\`, \`go build\` |
| Run | \`cargo run\` | \`java Main\`, \`go run\` |
| Test | \`cargo test\` | \`jest\`, \`pytest\`, \`go test\` |
| Add dependency | \`cargo add serde\` | \`npm install\`, \`pip install\` |
| Check (no binary) | \`cargo check\` | type check only |
| Format code | \`cargo fmt\` | \`prettier\`, \`gofmt\` |
| Lint | \`cargo clippy\` | \`eslint\`, \`golint\` |

**Project structure created by \`cargo new hello_world\`:**

\`\`\`
hello_world/
├── Cargo.toml    ← project manifest (like package.json)
├── Cargo.lock    ← exact dependency versions (like package-lock.json)
└── src/
    └── main.rs   ← entry point
\`\`\`

**Cargo.toml** — the project manifest:
\`\`\`toml
[package]
name = "hello_world"
version = "0.1.0"
edition = "2021"

[dependencies]
# Add crates (packages) here
serde = { version = "1.0", features = ["derive"] }
\`\`\`

Dependencies are called **crates** in Rust. Find them at [crates.io](https://crates.io).`,
      codeExample: `# Create a new binary project
cargo new hello_world
cd hello_world

# Run it
cargo run
# Compiling hello_world v0.1.0
# Finished dev [unoptimized + debuginfo] target(s) in 0.5s
# Running \`target/debug/hello_world\`
# Hello, world!`,
    },
    {
      id: 'variables',
      title: 'Variables and Mutability',
      content: `In Rust, variables are **immutable by default**. This is a deliberate design choice — it forces you to be explicit about what changes.

\`\`\`rust
let x = 5;      // immutable — cannot be reassigned
let mut y = 5;  // mutable — can be reassigned
y = 10;         // OK
x = 10;         // COMPILE ERROR: cannot assign twice to immutable variable
\`\`\`

**Comparing to other languages:**
- **JavaScript:** \`const\` vs \`let\` — similar concept, but Rust's default is immutable
- **Java:** All primitive variables are reassignable by default; you use \`final\` to make them immutable
- **C#:** \`var\` (mutable) vs \`readonly\` — Rust reverses the default
- **Go:** \`:=\` creates mutable variables by default
- **Python:** All variables are mutable by default

**Shadowing** — a Rust feature with no direct equivalent:
\`\`\`rust
let x = 5;
let x = x + 1;  // shadows the previous x — creates a new binding
let x = x * 2;  // x is now 12
println!("{}", x);  // 12
\`\`\`

Shadowing is different from \`mut\` — it creates a completely new variable and can even change the type.

**Constants** — always immutable, must have a type annotation, can be computed at compile time:
\`\`\`rust
const MAX_POINTS: u32 = 100_000;  // type required, value at compile time
const PI: f64 = 3.14159265358979;
\`\`\``,
      codeExample: `fn main() {
    let x = 5;            // immutable
    let mut count = 0;    // mutable

    count += 1;
    // x += 1;  ← compile error!

    // Shadowing — same name, new variable
    let spaces = "   ";         // &str
    let spaces = spaces.len();  // usize — different type!
    println!("{}", spaces);     // 3

    const MAX: u32 = 1_000_000;
    println!("Max: {}", MAX);
}`,
    },
    {
      id: 'data-types',
      title: 'Data Types',
      content: `Rust is statically typed. The compiler usually infers types, but you can annotate explicitly.

## Scalar Types

**Integers:**
| Type | Size | Range |
|------|------|-------|
| \`i8\` | 8-bit | -128 to 127 |
| \`u8\` | 8-bit unsigned | 0 to 255 |
| \`i16\` | 16-bit | -32,768 to 32,767 |
| \`u16\` | 16-bit unsigned | 0 to 65,535 |
| \`i32\` | 32-bit | -2^31 to 2^31-1 |
| \`u32\` | 32-bit unsigned | 0 to 2^32-1 |
| \`i64\` | 64-bit | -2^63 to 2^63-1 |
| \`u64\` | 64-bit unsigned | — |
| \`isize\` | pointer-sized | depends on arch |
| \`usize\` | pointer-sized unsigned | array indices |

**Floats:** \`f32\` (32-bit) and \`f64\` (64-bit, default)

**Boolean:** \`bool\` — \`true\` or \`false\`

**Character:** \`char\` — a Unicode scalar value (4 bytes), written with single quotes: \`'a'\`, \`'🦀'\`

## Compound Types

**Tuples** — fixed-size, heterogeneous:
\`\`\`rust
let tup: (i32, f64, bool) = (42, 3.14, true);
let (x, y, z) = tup;  // destructuring
let first = tup.0;    // index access
\`\`\`

**Arrays** — fixed-size, homogeneous (stack-allocated):
\`\`\`rust
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let fives = [5; 10];  // [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
let first = arr[0];
\`\`\`

**Coming from Java/C#:** Rust arrays are like C arrays — fixed size on the stack. For dynamic arrays, use \`Vec<T>\` (like Java's \`ArrayList\` or C#'s \`List<T>\`).`,
      codeExample: `fn main() {
    // Integers
    let x: i32 = -42;
    let y: u64 = 1_000_000;  // underscore for readability
    let z = 0xFF_u8;          // hex literal

    // Floats
    let pi: f64 = 3.14159;
    let e = 2.718_f32;        // type suffix

    // Booleans
    let is_rust_great: bool = true;

    // Characters (Unicode!)
    let letter: char = 'A';
    let emoji: char = '🦀';

    // Tuple
    let coords = (10.5_f64, -3.2_f64);
    println!("x={}, y={}", coords.0, coords.1);

    // Array
    let months = ["Jan", "Feb", "Mar"];
    println!("First month: {}", months[0]);

    // Type casting (no implicit casting in Rust!)
    let a: i32 = 42;
    let b: f64 = a as f64;  // explicit cast required
}`,
    },
    {
      id: 'functions',
      title: 'Functions',
      content: `Functions in Rust use the \`fn\` keyword. Return types are declared after \`->\`.

**Key insight:** In Rust, the last expression in a function body is implicitly returned (no \`return\` keyword needed). A statement ending with \`;\` does NOT return a value; an expression without \`;\` does.

\`\`\`rust
// Explicit return
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}

// Implicit return (idiomatic Rust)
fn add(a: i32, b: i32) -> i32 {
    a + b   ← no semicolon — this IS the return value
}

// Functions that return nothing return ()  (called "unit")
fn print_hello() {
    println!("Hello!");
    // implicitly returns ()
}
\`\`\`

**Comparing to other languages:**
- **Go:** Similar — no parens around params, explicit return type
- **JavaScript:** \`const add = (a, b) => a + b\` — similar implicit return in arrow functions
- **Python:** No type annotations by default (though you can add them)
- **Java/C#:** Always need \`return\` keyword; function parameters always typed

**Parameters must always have type annotations in function signatures** — Rust doesn't infer them.`,
      codeExample: `fn celsius_to_fahrenheit(c: f64) -> f64 {
    c * 1.8 + 32.0  // implicit return — no semicolon!
}

fn divide(x: i32, y: i32) -> (i32, i32) {
    (x / y, x % y)  // return a tuple
}

fn greet(name: &str) {  // &str = string reference
    println!("Hello, {}!", name);
    // returns () implicitly
}

fn main() {
    let temp = celsius_to_fahrenheit(100.0);
    println!("{} °F", temp);  // 212 °F

    let (quotient, remainder) = divide(17, 5);
    println!("{} r {}", quotient, remainder);  // 3 r 2

    greet("Rustacean");
}`,
    },
    {
      id: 'ownership-intro',
      title: 'Ownership — The Key Concept',
      content: `**Ownership is the most important concept in Rust.** Every other feature builds on it.

## The Rules

1. Each value in Rust has an *owner*
2. There can only be *one owner at a time*
3. When the owner goes out of scope, the value is *dropped* (freed)

## Why This Matters

In other languages, memory is managed either:
- **Manually** (C/C++): you call malloc/free. Powerful but dangerous (use-after-free, double-free, leaks)
- **Garbage Collector** (Java/C#/Go/Python/JS): runtime tracks references and frees memory. Safe but adds overhead and unpredictable pauses

Rust takes a third path: **ownership** rules enforced at compile time. No GC, no manual free — the compiler figures it out.

## Move Semantics

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1;  // s1 is MOVED to s2

println!("{}", s1);  // COMPILE ERROR: s1 was moved!
println!("{}", s2);  // OK
\`\`\`

This is like **transferring ownership of a file** — once you give it away, you no longer have it.

## Copy Types

Simple scalar types (integers, floats, booleans, chars) implement the \`Copy\` trait — they're cheaply copied on the stack:

\`\`\`rust
let x = 5;
let y = x;  // x is COPIED (not moved)
println!("{} {}", x, y);  // Both work! 5 5
\`\`\`

## Borrowing (Preview)

To use a value without taking ownership, you *borrow* it with \`&\`:

\`\`\`rust
let s1 = String::from("hello");
let len = calculate_length(&s1);  // borrow s1
println!("{} has length {}", s1, len);  // s1 still valid!

fn calculate_length(s: &String) -> usize {
    s.len()  // s is a reference — doesn't own it
}
\`\`\`

We'll go much deeper into ownership, borrowing, and lifetimes in Checkpoint 2.`,
      codeExample: `fn main() {
    // --- COPY types (stack values) ---
    let x = 5;
    let y = x;          // copy
    println!("{} {}", x, y);  // both valid

    // --- MOVE semantics (heap values) ---
    let s1 = String::from("hello");
    let s2 = s1;        // s1 is moved to s2
    // println!("{}", s1);  // error!
    println!("{}", s2); // OK

    // --- CLONE to deep copy ---
    let s3 = String::from("world");
    let s4 = s3.clone();  // explicit deep copy
    println!("{} {}", s3, s4);  // both valid

    // --- BORROWING ---
    let s5 = String::from("Rust");
    let len = get_length(&s5);  // pass reference
    println!("{} has {} chars", s5, len);  // s5 still valid
}

fn get_length(s: &String) -> usize {
    s.len()  // borrow without owning
}`,
    },
    {
      id: 'strings',
      title: 'Strings in Rust',
      content: `Rust has two string types — this confuses almost every beginner.

## \`&str\` — String Slice (borrowed string)
- A reference to a sequence of UTF-8 bytes stored somewhere
- Immutable view into string data
- Zero allocation — points to existing memory
- Common for function parameters

## \`String\` — Owned String
- Heap-allocated, growable string
- You own it — you can modify, append, etc.
- Must explicitly allocate

\`\`\`rust
let s1: &str = "hello";          // string literal — stored in binary
let s2: String = String::from("hello");  // heap-allocated
let s3: String = "hello".to_string();    // also heap-allocated

// Convert String → &str
let s4: &str = &s2;  // borrow as &str
let s5: &str = &s2[..];  // same
\`\`\`

**Analogy for Java developers:** \`&str\` is like \`String\` (immutable), and Rust's \`String\` is like \`StringBuilder\` (mutable, owned).

**Analogy for Go developers:** \`&str\` is like Go's string (immutable), \`String\` is like \`[]byte\` (mutable, owned).

## Common String Operations
\`\`\`rust
let mut s = String::from("Hello");
s.push(' ');           // push char
s.push_str("world");   // append &str
let len = s.len();     // byte length (NOT char count!)
let upper = s.to_uppercase();
let contains = s.contains("world");
let replaced = s.replace("world", "Rust");

// Iterate over characters (NOT bytes)
for c in s.chars() {
    println!("{}", c);
}

// Character count (important for Unicode!)
let char_count = s.chars().count();  // NOT s.len()
\`\`\``,
      codeExample: `fn main() {
    // &str — borrowed, immutable
    let literal: &str = "I'm a string slice";

    // String — owned, mutable
    let mut owned = String::from("Hello");
    owned.push_str(", world!");
    println!("{}", owned);  // Hello, world!

    // String methods
    println!("Length: {}", owned.len());           // bytes
    println!("Chars: {}", owned.chars().count());  // characters
    println!("Upper: {}", owned.to_uppercase());
    println!("Contains 'world': {}", owned.contains("world"));

    // Split and collect
    let words: Vec<&str> = owned.split(", ").collect();
    println!("{:?}", words);  // ["Hello", "world!"]

    // Format strings (like Python f-strings or Java String.format)
    let name = "Rust";
    let version = 2021;
    let s = format!("{} edition {}", name, version);
    println!("{}", s);  // Rust edition 2021
}`,
    },
    {
      id: 'control-flow',
      title: 'Control Flow',
      content: `## If Expressions

In Rust, \`if\` is an *expression* — it returns a value:

\`\`\`rust
let number = 7;
let description = if number > 0 { "positive" } else { "negative" };
// like Python's ternary: "positive" if number > 0 else "negative"
// like JS: number > 0 ? "positive" : "negative"
\`\`\`

## Loops

Rust has three loop constructs:

\`\`\`rust
// 1. loop — infinite, use 'break' to exit (can return a value!)
let mut count = 0;
let result = loop {
    count += 1;
    if count == 5 { break count * 2; }  // returns 10
};

// 2. while — condition-based
let mut n = 3;
while n != 0 {
    println!("{}", n);
    n -= 1;
}

// 3. for — iterating (most common)
for i in 0..5 {        // 0, 1, 2, 3, 4  (exclusive end)
    println!("{}", i);
}
for i in 0..=5 {       // 0, 1, 2, 3, 4, 5  (inclusive end)
    println!("{}", i);
}
for item in &vec![1,2,3] {  // iterate over a reference to a Vec
    println!("{}", item);
}
\`\`\`

## Match — Rust's Superpower

\`match\` is more powerful than \`switch\` in Java/C# or \`match\` in other languages:

\`\`\`rust
let value = 3;
match value {
    1 => println!("one"),
    2 | 3 => println!("two or three"),   // OR pattern
    4..=10 => println!("four to ten"),    // range pattern
    _ => println!("something else"),      // wildcard
}

// Match is exhaustive — you MUST handle all cases
// Match can return a value
let msg = match value {
    1 => "one",
    2 => "two",
    _ => "many",
};
\`\`\``,
      codeExample: `fn main() {
    // if as expression
    let score = 85;
    let grade = if score >= 90 { "A" }
                else if score >= 80 { "B" }
                else if score >= 70 { "C" }
                else { "F" };
    println!("Grade: {}", grade);  // Grade: B

    // for loop with range
    let sum: i32 = (1..=100).sum();  // sum of 1 to 100
    println!("Sum 1-100: {}", sum);  // 5050

    // for with enumerate (like Python's enumerate)
    let fruits = vec!["apple", "banana", "cherry"];
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", i, fruit);
    }

    // match
    let coin = "quarter";
    let value = match coin {
        "penny"   => 1,
        "nickel"  => 5,
        "dime"    => 10,
        "quarter" => 25,
        _         => 0,
    };
    println!("Value: {} cents", value);  // 25 cents
}`,
    },
    {
      id: 'modules',
      title: 'Modules and Imports',
      content: `Rust organizes code into **modules**. The \`use\` keyword brings items into scope.

## Module Structure

\`\`\`rust
// In a library crate (lib.rs):
pub mod math {
    pub fn add(a: i32, b: i32) -> i32 { a + b }

    pub mod advanced {
        pub fn factorial(n: u64) -> u64 { (1..=n).product() }
    }
}

// Using it:
use math::add;
use math::advanced::factorial;

// Or fully qualified:
let result = math::add(1, 2);
\`\`\`

## Standard Library Modules

\`\`\`rust
use std::collections::HashMap;  // like Java's java.util.HashMap
use std::collections::HashSet;
use std::io::{self, Read, Write};
use std::fs::File;
use std::fmt;
\`\`\`

**Key standard library items:**
- \`std::collections\` — HashMap, HashSet, BTreeMap, VecDeque
- \`std::fs\` — file system operations
- \`std::io\` — I/O traits and utilities
- \`std::fmt\` — string formatting

## The Prelude

Rust automatically imports many common types without needing \`use\`:
- \`Vec\`, \`String\`, \`Option\`, \`Result\`, \`println!\`, \`format!\`, etc.

For the exercises in this course, you'll mostly need:
\`\`\`rust
use std::collections::HashMap;
// Most other things are in the prelude
\`\`\``,
      codeExample: `use std::collections::HashMap;

fn main() {
    // HashMap — like Python dict, Java HashMap, Go map, JS Object/Map
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert(String::from("Alice"), 95);
    scores.insert(String::from("Bob"), 87);

    // Access
    if let Some(score) = scores.get("Alice") {
        println!("Alice: {}", score);  // Alice: 95
    }

    // Iterate
    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }

    // entry API — insert if not present
    scores.entry(String::from("Charlie")).or_insert(75);
    println!("{:?}", scores);
}`,
    },
  ],
};
