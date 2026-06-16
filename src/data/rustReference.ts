// Curated Rust knowledge base for the in-editor IntelliSense:
//   - hover tooltips (explanation + usage example + documentation link)
//   - Ctrl/Cmd+click to open the official documentation
//   - autocompletion suggestions
//
// Entries are keyed by the token as it appears in source code.
//   - macros are keyed WITH the bang, e.g. 'println!'
//   - methods are keyed by their bare name, e.g. 'unwrap', 'collect'
//   - keywords / types / primitives are keyed by their exact spelling
//
// This is intentionally tailored to the Rust used across the Zone01 CP3
// exercises (iterators, String/str, Vec, HashMap, Option/Result, structs,
// enums, pattern matching, ownership) so explanations stay beginner friendly.

export type RustTokenKind =
  | 'keyword'
  | 'primitive'
  | 'type'
  | 'macro'
  | 'method'
  | 'function'
  | 'variant'
  | 'trait'
  | 'concept';

export interface RustDocEntry {
  /** Display name, e.g. 'println!' or 'unwrap' */
  name: string;
  kind: RustTokenKind;
  /** A representative signature (shown in a code fence in the hover). */
  signature?: string;
  /** Beginner-friendly explanation, one short paragraph. */
  summary: string;
  /** A tiny runnable-looking usage example. */
  example?: string;
  /** Link to the official documentation. */
  docUrl: string;
}

const STD = 'https://doc.rust-lang.org/std';
const ITER = `${STD}/iter/trait.Iterator.html#method`;
const SLICE = `${STD}/primitive.slice.html#method`;
const STR = `${STD}/primitive.str.html#method`;
const STRING = `${STD}/string/struct.String.html#method`;
const VEC = `${STD}/vec/struct.Vec.html#method`;
const OPT = `${STD}/option/enum.Option.html#method`;
const RES = `${STD}/result/enum.Result.html#method`;
const MAP = `${STD}/collections/struct.HashMap.html#method`;
const KW = (k: string) => `${STD}/keyword.${k}.html`;
const MACRO = (m: string) => `${STD}/macro.${m}.html`;

// ---------------------------------------------------------------------------
// Keywords
// ---------------------------------------------------------------------------
const keywords: RustDocEntry[] = [
  { name: 'fn', kind: 'keyword', signature: 'fn name(args) -> ReturnType { ... }', summary: 'Declares a function. Parameters list their types; the return type comes after `->` (omit it for functions that return nothing, i.e. the unit type `()`).', example: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}', docUrl: KW('fn') },
  { name: 'let', kind: 'keyword', signature: 'let name = value;', summary: 'Binds a value to a variable. Bindings are immutable by default — add `mut` to allow reassignment. Types are usually inferred but can be annotated with `: Type`.', example: 'let x = 5;\nlet name: String = String::from("Ada");', docUrl: KW('let') },
  { name: 'mut', kind: 'keyword', signature: 'let mut name = value;', summary: 'Marks a binding or reference as mutable, allowing its value to change. Without `mut`, variables and `&` references are read-only.', example: 'let mut count = 0;\ncount += 1; // allowed because of `mut`', docUrl: KW('mut') },
  { name: 'const', kind: 'keyword', signature: 'const NAME: Type = value;', summary: 'Declares a compile-time constant. The type annotation is required and the value must be known at compile time. Conventionally written in SCREAMING_CASE.', example: 'const MAX: usize = 100;', docUrl: KW('const') },
  { name: 'static', kind: 'keyword', signature: "static NAME: Type = value;", summary: 'Declares a value with a fixed memory location that lives for the entire program (`\'static` lifetime).', example: "static GREETING: &str = \"hello\";", docUrl: KW('static') },
  { name: 'pub', kind: 'keyword', signature: 'pub fn / pub struct / pub mod', summary: 'Makes an item (function, struct, field, module…) visible outside its module. Without it, items are private to the current module.', example: 'pub fn parts_sums(nbs: &[u64]) -> Vec<u64> { /* ... */ }', docUrl: KW('pub') },
  { name: 'struct', kind: 'keyword', signature: 'struct Name { field: Type }', summary: 'Defines a custom data type that groups named fields together. Rust also has tuple structs `struct P(i32, i32);` and unit structs `struct U;`.', example: 'struct Point {\n    x: f64,\n    y: f64,\n}', docUrl: KW('struct') },
  { name: 'enum', kind: 'keyword', signature: 'enum Name { Variant, Other(Type) }', summary: 'Defines a type that is exactly one of several variants. Variants can carry data. Enums pair naturally with `match`. `Option` and `Result` are enums.', example: 'enum Shape {\n    Circle(f64),\n    Rect { w: f64, h: f64 },\n}', docUrl: KW('enum') },
  { name: 'impl', kind: 'keyword', signature: 'impl Type { fn method(&self) {} }', summary: 'Adds methods and associated functions to a type, or implements a trait for a type (`impl Trait for Type`). Methods that take `&self` operate on an instance.', example: 'impl Point {\n    fn origin() -> Self { Point { x: 0.0, y: 0.0 } }\n    fn dist(&self) -> f64 { (self.x*self.x + self.y*self.y).sqrt() }\n}', docUrl: KW('impl') },
  { name: 'trait', kind: 'keyword', signature: 'trait Name { fn method(&self); }', summary: 'Defines shared behavior (a set of methods) that types can implement. Similar to interfaces in other languages. Standard traits include `Clone`, `Display`, `Iterator`.', example: 'trait Area {\n    fn area(&self) -> f64;\n}', docUrl: KW('trait') },
  { name: 'type', kind: 'keyword', signature: 'type Alias = ExistingType;', summary: 'Creates a type alias — a new name for an existing type. Useful for shortening long generic types.', example: 'type Grid = Vec<Vec<i32>>;', docUrl: KW('type') },
  { name: 'match', kind: 'keyword', signature: 'match value { pattern => expr, _ => expr }', summary: 'Compares a value against patterns and runs the first arm that matches. Matches must be exhaustive — use `_` as a catch-all. `match` is an expression, so it returns a value.', example: 'match n {\n    0 => "zero",\n    1 | 2 => "small",\n    _ => "many",\n}', docUrl: KW('match') },
  { name: 'if', kind: 'keyword', signature: 'if condition { ... } else { ... }', summary: 'Runs a block when a boolean condition is true. `if` is an expression and can return a value. See also `if let` for matching a single pattern.', example: 'let label = if x > 0 { "pos" } else { "non-pos" };', docUrl: KW('if') },
  { name: 'else', kind: 'keyword', signature: 'if cond { ... } else { ... }', summary: 'Provides the alternative branch for an `if`, or chains more conditions with `else if`.', example: 'if a { 1 } else if b { 2 } else { 3 };', docUrl: KW('else') },
  { name: 'while', kind: 'keyword', signature: 'while condition { ... }', summary: 'Repeats a block while a condition stays true. See also `while let` to loop until a pattern stops matching.', example: 'let mut i = 0;\nwhile i < 5 {\n    i += 1;\n}', docUrl: KW('while') },
  { name: 'loop', kind: 'keyword', signature: 'loop { ... break value; }', summary: 'An infinite loop. Exit with `break`, which can also return a value from the loop.', example: 'let mut n = 1;\nlet pow = loop {\n    n *= 2;\n    if n > 100 { break n; }\n};', docUrl: KW('loop') },
  { name: 'for', kind: 'keyword', signature: 'for item in iterable { ... }', summary: 'Iterates over anything that implements `IntoIterator` (ranges, slices, `Vec`, iterators…). Each pass binds the next item.', example: 'for i in 0..3 {\n    println!("{i}");\n}\nfor word in words.iter() { /* ... */ }', docUrl: KW('for') },
  { name: 'in', kind: 'keyword', signature: 'for x in iterable', summary: 'Used in a `for` loop to separate the loop variable from the iterable being looped over.', example: 'for c in "abc".chars() { /* ... */ }', docUrl: KW('in') },
  { name: 'break', kind: 'keyword', signature: 'break;  |  break value;', summary: 'Exits the innermost loop immediately. Inside a `loop`, `break value` makes the loop evaluate to that value.', example: 'for x in list {\n    if x == target { break; }\n}', docUrl: KW('break') },
  { name: 'continue', kind: 'keyword', signature: 'continue;', summary: 'Skips the rest of the current loop iteration and jumps to the next one.', example: 'for n in 0..10 {\n    if n % 2 == 0 { continue; }\n    // only odd numbers reach here\n}', docUrl: KW('continue') },
  { name: 'return', kind: 'keyword', signature: 'return value;', summary: 'Returns early from a function with the given value. The last expression of a block (without a semicolon) is also returned implicitly, so explicit `return` is mostly for early exits.', example: 'fn first_even(v: &[i32]) -> Option<i32> {\n    for &n in v {\n        if n % 2 == 0 { return Some(n); }\n    }\n    None\n}', docUrl: KW('return') },
  { name: 'use', kind: 'keyword', signature: 'use path::to::Item;', summary: 'Brings a path into scope so you can refer to it by a short name. Group imports with braces.', example: 'use std::collections::HashMap;\nuse std::cmp::{min, max};', docUrl: KW('use') },
  { name: 'mod', kind: 'keyword', signature: 'mod name { ... }', summary: 'Declares a module — a named namespace that organizes code and controls visibility.', example: 'mod geometry {\n    pub fn area() {}\n}', docUrl: KW('mod') },
  { name: 'as', kind: 'keyword', signature: 'value as Type', summary: 'Performs an explicit primitive cast (e.g. between numeric types) or renames an import. Numeric casts can truncate, so be careful.', example: 'let x = 3.9_f64 as i32; // 3 (truncates)\nuse std::io::Result as IoResult;', docUrl: KW('as') },
  { name: 'ref', kind: 'keyword', signature: 'let ref r = value;  |  Some(ref x) =>', summary: 'Binds by reference inside a pattern instead of moving the value out. In modern Rust you usually use `&` in the matched expression instead.', example: 'match &opt {\n    Some(ref s) => println!("{s}"),\n    None => {}\n}', docUrl: KW('ref') },
  { name: 'move', kind: 'keyword', signature: 'move || { ... }', summary: 'Forces a closure to take ownership of the variables it captures, rather than borrowing them. Required when a closure outlives the current scope (e.g. threads).', example: 'let data = vec![1, 2, 3];\nlet f = move || println!("{:?}", data);', docUrl: KW('move') },
  { name: 'where', kind: 'keyword', signature: 'fn f<T>(x: T) where T: Clone', summary: 'Specifies trait bounds on generic parameters in a more readable, separated clause.', example: 'fn largest<T>(list: &[T]) -> &T\nwhere T: PartialOrd { /* ... */ }', docUrl: KW('where') },
  { name: 'dyn', kind: 'keyword', signature: 'Box<dyn Trait>', summary: 'Marks a trait object — a value accessed through a trait pointer with dynamic dispatch (the concrete type is decided at runtime).', example: 'let shapes: Vec<Box<dyn Area>> = vec![];', docUrl: KW('dyn') },
  { name: 'self', kind: 'keyword', signature: 'fn method(&self)', summary: 'The receiver of a method: `&self` (borrow), `&mut self` (mutable borrow) or `self` (take ownership). Lowercase `self` also refers to the current module in a path.', example: 'impl Counter {\n    fn value(&self) -> u32 { self.count }\n}', docUrl: KW('self') },
  { name: 'Self', kind: 'keyword', signature: '-> Self', summary: 'An alias for the type of the current `impl` or `trait` block. Handy in constructors and builder methods.', example: 'impl Point {\n    fn new() -> Self { Self { x: 0.0, y: 0.0 } }\n}', docUrl: KW('SelfTy') },
  { name: 'crate', kind: 'keyword', signature: 'crate::module::item', summary: 'Refers to the root of the current crate in a path. `extern crate` (old editions) linked an external crate.', example: 'use crate::data::exercises;', docUrl: KW('crate') },
  { name: 'super', kind: 'keyword', signature: 'super::item', summary: 'Refers to the parent module in a path.', example: 'use super::shared_helper;', docUrl: KW('super') },
  { name: 'true', kind: 'keyword', signature: 'true', summary: 'The boolean value for "yes". Has type `bool`.', example: 'let done: bool = true;', docUrl: `${STD}/primitive.bool.html` },
  { name: 'false', kind: 'keyword', signature: 'false', summary: 'The boolean value for "no". Has type `bool`.', example: 'let mut ready = false;', docUrl: `${STD}/primitive.bool.html` },
];

// ---------------------------------------------------------------------------
// Primitive types
// ---------------------------------------------------------------------------
const prim = (name: string, summary: string, example: string): RustDocEntry => ({ name, kind: 'primitive', summary, example, docUrl: `${STD}/primitive.${name}.html` });
const primitives: RustDocEntry[] = [
  prim('i8', 'Signed 8-bit integer (−128 to 127).', 'let b: i8 = -5;'),
  prim('i16', 'Signed 16-bit integer.', 'let n: i16 = 1000;'),
  prim('i32', 'Signed 32-bit integer. The default type for integer literals.', 'let n = 42; // inferred as i32'),
  prim('i64', 'Signed 64-bit integer.', 'let big: i64 = 9_000_000_000;'),
  prim('i128', 'Signed 128-bit integer.', 'let huge: i128 = 1 << 100;'),
  prim('isize', 'Signed integer the size of a pointer (used for indices/offsets).', 'let delta: isize = -1;'),
  prim('u8', 'Unsigned 8-bit integer (0 to 255). Also how bytes are represented.', "let byte: u8 = b'A'; // 65"),
  prim('u16', 'Unsigned 16-bit integer.', 'let port: u16 = 8080;'),
  prim('u32', 'Unsigned 32-bit integer.', 'let count: u32 = 0;'),
  prim('u64', 'Unsigned 64-bit integer. Common for sizes and large counts.', 'let total: u64 = 0;'),
  prim('u128', 'Unsigned 128-bit integer.', 'let n: u128 = 0;'),
  prim('usize', 'Unsigned integer the size of a pointer. The type used for indexing and lengths (`vec.len()` is `usize`).', 'let len: usize = v.len();'),
  prim('f32', 'Single-precision (32-bit) floating-point number.', 'let pi: f32 = 3.14;'),
  prim('f64', 'Double-precision (64-bit) floating-point number. The default for float literals.', 'let avg = 2.5; // inferred f64'),
  prim('bool', 'A boolean: either `true` or `false`.', 'let ok: bool = 1 < 2;'),
  prim('char', 'A single Unicode scalar value (4 bytes), written with single quotes. Not the same as a byte.', "let c: char = 'λ';"),
  prim('str', 'A string slice: an immutable, borrowed view into UTF-8 text. Usually seen as `&str`. The owned counterpart is `String`.', 'let greeting: &str = "hello";'),
];

// ---------------------------------------------------------------------------
// Standard library types
// ---------------------------------------------------------------------------
const types: RustDocEntry[] = [
  { name: 'String', kind: 'type', signature: 'String', summary: 'A growable, heap-allocated, owned UTF-8 string. Create with `String::new()`, `String::from("…")` or `"…".to_string()`. Borrow it as `&str`.', example: 'let mut s = String::from("ab");\ns.push(\'c\'); // "abc"', docUrl: `${STD}/string/struct.String.html` },
  { name: 'Vec', kind: 'type', signature: 'Vec<T>', summary: 'A growable array (vector) of values of type `T`, stored on the heap. Create with `Vec::new()` or the `vec![]` macro. Index with `v[i]`.', example: 'let mut v: Vec<i32> = Vec::new();\nv.push(1);\nv.push(2);', docUrl: `${STD}/vec/struct.Vec.html` },
  { name: 'Option', kind: 'type', signature: 'enum Option<T> { Some(T), None }', summary: 'Represents an optional value: `Some(value)` or `None`. Rust uses this instead of null. Get the inner value with `match`, `if let`, `unwrap`, `unwrap_or`, etc.', example: 'fn first(v: &[i32]) -> Option<i32> {\n    if v.is_empty() { None } else { Some(v[0]) }\n}', docUrl: `${STD}/option/enum.Option.html` },
  { name: 'Result', kind: 'type', signature: 'enum Result<T, E> { Ok(T), Err(E) }', summary: 'Represents either success `Ok(value)` or failure `Err(error)`. The standard way to handle recoverable errors. The `?` operator propagates the `Err`.', example: 'fn parse(s: &str) -> Result<i32, std::num::ParseIntError> {\n    s.parse::<i32>()\n}', docUrl: `${STD}/result/enum.Result.html` },
  { name: 'Box', kind: 'type', signature: 'Box<T>', summary: 'A smart pointer that stores its value on the heap. Useful for recursive types and trait objects (`Box<dyn Trait>`).', example: 'let boxed: Box<i32> = Box::new(5);', docUrl: `${STD}/boxed/struct.Box.html` },
  { name: 'HashMap', kind: 'type', signature: 'HashMap<K, V>', summary: 'A hash table mapping keys to values. Import from `std::collections`. Insert with `.insert(k, v)`, look up with `.get(&k)`, and count/accumulate with `.entry(k).or_insert(0)`.', example: 'use std::collections::HashMap;\nlet mut counts: HashMap<&str, i32> = HashMap::new();\n*counts.entry("a").or_insert(0) += 1;', docUrl: `${STD}/collections/struct.HashMap.html` },
  { name: 'HashSet', kind: 'type', signature: 'HashSet<T>', summary: 'A collection of unique values (a hash set). Import from `std::collections`. `.insert(x)` returns `false` if the value was already present.', example: 'use std::collections::HashSet;\nlet mut seen = HashSet::new();\nseen.insert(3);', docUrl: `${STD}/collections/struct.HashSet.html` },
  { name: 'BTreeMap', kind: 'type', signature: 'BTreeMap<K, V>', summary: 'An ordered map (keys kept sorted). Same API as `HashMap` but iterates in sorted key order.', example: 'use std::collections::BTreeMap;\nlet mut m = BTreeMap::new();\nm.insert(2, "b");\nm.insert(1, "a");', docUrl: `${STD}/collections/struct.BTreeMap.html` },
  { name: 'VecDeque', kind: 'type', signature: 'VecDeque<T>', summary: 'A double-ended queue: push/pop efficiently at both the front and the back. Great for queues (FIFO) and ring buffers.', example: 'use std::collections::VecDeque;\nlet mut q = VecDeque::new();\nq.push_back(1);\nlet front = q.pop_front();', docUrl: `${STD}/collections/struct.VecDeque.html` },
  { name: 'Rc', kind: 'type', signature: 'Rc<T>', summary: 'A single-threaded reference-counted smart pointer, allowing multiple owners of the same data. Clone to share; the value drops when the last `Rc` does.', example: 'use std::rc::Rc;\nlet a = Rc::new(5);\nlet b = Rc::clone(&a);', docUrl: `${STD}/rc/struct.Rc.html` },
  { name: 'RefCell', kind: 'type', signature: 'RefCell<T>', summary: 'Provides interior mutability: mutate data through a shared reference, with borrow rules checked at runtime via `.borrow()` / `.borrow_mut()`.', example: 'use std::cell::RefCell;\nlet c = RefCell::new(0);\n*c.borrow_mut() += 1;', docUrl: `${STD}/cell/struct.RefCell.html` },
];

// ---------------------------------------------------------------------------
// Enum variants (Option / Result)
// ---------------------------------------------------------------------------
const variants: RustDocEntry[] = [
  { name: 'Some', kind: 'variant', signature: 'Some(value)', summary: 'The `Option` variant that holds a value. The opposite of `None`.', example: 'let x: Option<i32> = Some(7);', docUrl: `${STD}/option/enum.Option.html#variant.Some` },
  { name: 'None', kind: 'variant', signature: 'None', summary: 'The `Option` variant that represents the absence of a value.', example: 'let nothing: Option<i32> = None;', docUrl: `${STD}/option/enum.Option.html#variant.None` },
  { name: 'Ok', kind: 'variant', signature: 'Ok(value)', summary: 'The `Result` variant for success, carrying the produced value.', example: 'let r: Result<i32, String> = Ok(200);', docUrl: `${STD}/result/enum.Result.html#variant.Ok` },
  { name: 'Err', kind: 'variant', signature: 'Err(error)', summary: 'The `Result` variant for failure, carrying the error value.', example: 'let r: Result<i32, String> = Err("boom".to_string());', docUrl: `${STD}/result/enum.Result.html#variant.Err` },
];

// ---------------------------------------------------------------------------
// Macros
// ---------------------------------------------------------------------------
const macros: RustDocEntry[] = [
  { name: 'println!', kind: 'macro', signature: 'println!("{}", value)', summary: 'Prints to standard output, followed by a newline. Use `{}` placeholders (Display) or `{:?}` (Debug). You can also inline variables: `println!("{name}")`.', example: 'let name = "Ada";\nprintln!("Hello, {}!", name);\nprintln!("{:?}", vec![1, 2, 3]);', docUrl: MACRO('println') },
  { name: 'print!', kind: 'macro', signature: 'print!("{}", value)', summary: 'Like `println!` but without a trailing newline. Output may need flushing if not followed by a newline.', example: 'print!("loading");\nprint!("...");', docUrl: MACRO('print') },
  { name: 'eprintln!', kind: 'macro', signature: 'eprintln!("{}", value)', summary: 'Prints to standard error (stderr) with a newline. Useful for diagnostics that should not mix with normal output.', example: 'eprintln!("warning: {}", msg);', docUrl: MACRO('eprintln') },
  { name: 'format!', kind: 'macro', signature: 'let s: String = format!("{}", value)', summary: 'Builds a `String` using the same placeholder syntax as `println!`, without printing it. The go-to way to assemble formatted text.', example: 'let row = format!("{:>3} | {}", id, name);', docUrl: MACRO('format') },
  { name: 'vec!', kind: 'macro', signature: 'vec![a, b, c]  |  vec![0; n]', summary: 'Creates a `Vec`. List elements, or use `vec![value; count]` to repeat a value `count` times.', example: 'let nums = vec![1, 2, 3];\nlet zeros = vec![0; 5]; // [0,0,0,0,0]', docUrl: MACRO('vec') },
  { name: 'panic!', kind: 'macro', signature: 'panic!("message")', summary: 'Immediately aborts the current thread with an error message. Use for unrecoverable bugs — prefer `Result` for expected errors.', example: 'if denom == 0 { panic!("division by zero"); }', docUrl: MACRO('panic') },
  { name: 'assert!', kind: 'macro', signature: 'assert!(condition)', summary: 'Panics if the condition is false. Commonly used in tests and to enforce invariants.', example: 'assert!(v.len() > 0, "vector must not be empty");', docUrl: MACRO('assert') },
  { name: 'assert_eq!', kind: 'macro', signature: 'assert_eq!(left, right)', summary: 'Panics if the two values are not equal, printing both. The standard way to check results in tests.', example: 'assert_eq!(add(2, 2), 4);', docUrl: MACRO('assert_eq') },
  { name: 'assert_ne!', kind: 'macro', signature: 'assert_ne!(left, right)', summary: 'Panics if the two values ARE equal.', example: 'assert_ne!(result, 0);', docUrl: MACRO('assert_ne') },
  { name: 'todo!', kind: 'macro', signature: 'todo!()', summary: 'A placeholder that compiles anywhere a value is expected but panics if reached. Lets unfinished code type-check while you work on it.', example: 'fn solve() -> i32 {\n    todo!()\n}', docUrl: MACRO('todo') },
  { name: 'unimplemented!', kind: 'macro', signature: 'unimplemented!()', summary: 'Marks code that is intentionally not implemented; panics if reached. Similar to `todo!` but signals "may never be implemented".', example: 'fn rare_case() {\n    unimplemented!()\n}', docUrl: MACRO('unimplemented') },
  { name: 'dbg!', kind: 'macro', signature: 'dbg!(expr)', summary: 'Prints the file/line and the value of an expression to stderr for debugging, then returns the value so you can wrap it inline.', example: 'let x = dbg!(2 + 3); // prints and keeps x = 5', docUrl: MACRO('dbg') },
  { name: 'write!', kind: 'macro', signature: 'write!(buf, "{}", value)', summary: 'Writes formatted text into anything implementing `Write` (a `String`, a formatter, a file…). Returns a `Result`.', example: 'use std::fmt::Write;\nlet mut out = String::new();\nwrite!(out, "{}-{}", a, b).unwrap();', docUrl: MACRO('write') },
  { name: 'writeln!', kind: 'macro', signature: 'writeln!(buf, "{}", value)', summary: 'Like `write!` but appends a newline.', example: 'writeln!(out, "row {}", i).unwrap();', docUrl: MACRO('writeln') },
  { name: 'matches!', kind: 'macro', signature: 'matches!(value, pattern)', summary: 'Returns `true` if the value matches the given pattern, otherwise `false`. A concise alternative to a `match` that only needs a boolean.', example: 'let is_letter = matches!(c, \'a\'..=\'z\' | \'A\'..=\'Z\');', docUrl: MACRO('matches') },
];

// ---------------------------------------------------------------------------
// Methods & associated functions (keyed by bare name)
// ---------------------------------------------------------------------------
const methods: RustDocEntry[] = [
  // Iterator pipeline
  { name: 'iter', kind: 'method', signature: 'fn iter(&self) -> Iter<T>', summary: 'Returns an iterator that yields shared references (`&T`) to each element, without consuming the collection.', example: 'for x in v.iter() {\n    println!("{x}");\n}', docUrl: `${SLICE}.iter` },
  { name: 'iter_mut', kind: 'method', signature: 'fn iter_mut(&mut self) -> IterMut<T>', summary: 'Returns an iterator of mutable references (`&mut T`), letting you modify each element in place.', example: 'for x in v.iter_mut() {\n    *x *= 2;\n}', docUrl: `${SLICE}.iter_mut` },
  { name: 'into_iter', kind: 'method', signature: 'fn into_iter(self) -> IntoIter<T>', summary: 'Consumes the collection and yields owned values (`T`). This is what a `for x in collection` loop uses by default.', example: 'let owned: Vec<String> = names.into_iter().collect();', docUrl: `${STD}/iter/trait.IntoIterator.html#tymethod.into_iter` },
  { name: 'map', kind: 'method', signature: 'fn map<B, F>(self, f: F) -> Map  // also Option::map', summary: 'Transforms each item with a closure, producing a new iterator. On `Option`/`Result`, transforms the contained value if present.', example: 'let squares: Vec<i32> = (1..=3).map(|n| n * n).collect(); // [1,4,9]', docUrl: `${ITER}.map` },
  { name: 'filter', kind: 'method', signature: 'fn filter<P>(self, predicate: P) -> Filter', summary: 'Keeps only the items for which the closure returns `true`.', example: 'let evens: Vec<i32> = (1..=6).filter(|n| n % 2 == 0).collect(); // [2,4,6]', docUrl: `${ITER}.filter` },
  { name: 'filter_map', kind: 'method', signature: 'fn filter_map<B, F>(self, f: F) -> FilterMap', summary: 'Applies a closure that returns `Option<B>` and keeps only the `Some` values, unwrapping them. Filters and maps in one pass.', example: 'let nums: Vec<i32> = ["1", "x", "3"].iter().filter_map(|s| s.parse().ok()).collect(); // [1,3]', docUrl: `${ITER}.filter_map` },
  { name: 'collect', kind: 'method', signature: 'fn collect<B>(self) -> B', summary: 'Consumes an iterator and gathers the items into a collection such as `Vec`, `String`, or `HashMap`. The target type is usually annotated or inferred.', example: 'let v: Vec<char> = "abc".chars().collect();\nlet s: String = vec![\'h\', \'i\'].into_iter().collect();', docUrl: `${ITER}.collect` },
  { name: 'enumerate', kind: 'method', signature: 'fn enumerate(self) -> Enumerate', summary: 'Wraps each item with its index, yielding `(index, item)` pairs starting at 0.', example: 'for (i, c) in "abc".chars().enumerate() {\n    println!("{i}: {c}");\n}', docUrl: `${ITER}.enumerate` },
  { name: 'rev', kind: 'method', signature: 'fn rev(self) -> Rev', summary: 'Reverses the direction of a (double-ended) iterator, yielding items from back to front.', example: 'let reversed: String = "abc".chars().rev().collect(); // "cba"', docUrl: `${ITER}.rev` },
  { name: 'zip', kind: 'method', signature: 'fn zip<U>(self, other: U) -> Zip', summary: 'Pairs up items from two iterators, yielding `(a, b)` tuples and stopping when either runs out.', example: 'for (n, c) in [1,2,3].iter().zip("abc".chars()) { /* (1,\'a\') ... */ }', docUrl: `${ITER}.zip` },
  { name: 'chain', kind: 'method', signature: 'fn chain<U>(self, other: U) -> Chain', summary: 'Links two iterators end to end, yielding all of the first then all of the second.', example: 'let all: Vec<i32> = (1..=2).chain(5..=6).collect(); // [1,2,5,6]', docUrl: `${ITER}.chain` },
  { name: 'take', kind: 'method', signature: 'fn take(self, n: usize) -> Take', summary: 'Yields at most the first `n` items, then stops. Useful for limiting infinite iterators.', example: 'let first3: Vec<u64> = (1..).take(3).collect(); // [1,2,3]', docUrl: `${ITER}.take` },
  { name: 'skip', kind: 'method', signature: 'fn skip(self, n: usize) -> Skip', summary: 'Ignores the first `n` items and yields the rest.', example: 'let rest: Vec<i32> = [1,2,3,4].iter().skip(2).copied().collect(); // [3,4]', docUrl: `${ITER}.skip` },
  { name: 'step_by', kind: 'method', signature: 'fn step_by(self, step: usize) -> StepBy', summary: 'Yields every `step`-th element, starting with the first.', example: 'let evens: Vec<i32> = (0..10).step_by(2).collect(); // [0,2,4,6,8]', docUrl: `${ITER}.step_by` },
  { name: 'fold', kind: 'method', signature: 'fn fold<B, F>(self, init: B, f: F) -> B', summary: 'Reduces an iterator to a single value by repeatedly combining an accumulator with each item.', example: 'let sum = [1,2,3].iter().fold(0, |acc, n| acc + n); // 6', docUrl: `${ITER}.fold` },
  { name: 'sum', kind: 'method', signature: 'fn sum<S>(self) -> S', summary: 'Adds up all items of an iterator. The result type is often annotated (e.g. `.sum::<u64>()`).', example: 'let total: u64 = nums.iter().sum();', docUrl: `${ITER}.sum` },
  { name: 'product', kind: 'method', signature: 'fn product<P>(self) -> P', summary: 'Multiplies all items of an iterator together.', example: 'let fact: u64 = (1..=5).product(); // 120', docUrl: `${ITER}.product` },
  { name: 'count', kind: 'method', signature: 'fn count(self) -> usize', summary: 'Consumes the iterator and returns how many items it yielded.', example: 'let n = "hello".chars().filter(|&c| c == \'l\').count(); // 2', docUrl: `${ITER}.count` },
  { name: 'find', kind: 'method', signature: 'fn find<P>(&mut self, predicate: P) -> Option<Item>', summary: 'Returns the first item matching the predicate as `Some(item)`, or `None`.', example: 'let first_big = v.iter().find(|&&x| x > 100);', docUrl: `${ITER}.find` },
  { name: 'position', kind: 'method', signature: 'fn position<P>(&mut self, predicate: P) -> Option<usize>', summary: 'Returns the index of the first item matching the predicate, or `None`.', example: 'let idx = v.iter().position(|&x| x == target);', docUrl: `${ITER}.position` },
  { name: 'any', kind: 'method', signature: 'fn any<F>(&mut self, f: F) -> bool', summary: 'Returns `true` if at least one item satisfies the closure. Short-circuits on the first match.', example: 'let has_neg = v.iter().any(|&x| x < 0);', docUrl: `${ITER}.any` },
  { name: 'all', kind: 'method', signature: 'fn all<F>(&mut self, f: F) -> bool', summary: 'Returns `true` only if every item satisfies the closure. Short-circuits on the first failure.', example: 'let all_pos = v.iter().all(|&x| x > 0);', docUrl: `${ITER}.all` },
  { name: 'max', kind: 'method', signature: 'fn max(self) -> Option<Item>', summary: 'Returns the largest item of an iterator as `Some`, or `None` if empty. (`std::cmp::max(a, b)` compares just two values.)', example: 'let biggest = v.iter().max();', docUrl: `${ITER}.max` },
  { name: 'min', kind: 'method', signature: 'fn min(self) -> Option<Item>', summary: 'Returns the smallest item of an iterator as `Some`, or `None` if empty.', example: 'let smallest = v.iter().min();', docUrl: `${ITER}.min` },
  { name: 'max_by_key', kind: 'method', signature: 'fn max_by_key<B, F>(self, f: F) -> Option<Item>', summary: 'Returns the item whose mapped key is largest.', example: 'let longest = words.iter().max_by_key(|w| w.len());', docUrl: `${ITER}.max_by_key` },
  { name: 'min_by_key', kind: 'method', signature: 'fn min_by_key<B, F>(self, f: F) -> Option<Item>', summary: 'Returns the item whose mapped key is smallest.', example: 'let shortest = words.iter().min_by_key(|w| w.len());', docUrl: `${ITER}.min_by_key` },
  { name: 'flatten', kind: 'method', signature: 'fn flatten(self) -> Flatten', summary: 'Flattens one level of nesting, turning an iterator of iterables into a single iterator.', example: 'let flat: Vec<i32> = vec![vec![1,2], vec![3]].into_iter().flatten().collect(); // [1,2,3]', docUrl: `${ITER}.flatten` },
  { name: 'flat_map', kind: 'method', signature: 'fn flat_map<U, F>(self, f: F) -> FlatMap', summary: 'Maps each item to an iterator and flattens the results into one stream. Equivalent to `.map(f).flatten()`.', example: 'let chars: Vec<char> = words.iter().flat_map(|w| w.chars()).collect();', docUrl: `${ITER}.flat_map` },
  { name: 'copied', kind: 'method', signature: 'fn copied(self) -> Copied', summary: 'Turns an iterator of `&T` (where `T: Copy`) into an iterator of `T` by copying each element.', example: 'let v: Vec<i32> = slice.iter().copied().collect();', docUrl: `${ITER}.copied` },
  { name: 'cloned', kind: 'method', signature: 'fn cloned(self) -> Cloned', summary: 'Turns an iterator of `&T` (where `T: Clone`) into an iterator of `T` by cloning each element.', example: 'let v: Vec<String> = refs.iter().cloned().collect();', docUrl: `${ITER}.cloned` },
  { name: 'peekable', kind: 'method', signature: 'fn peekable(self) -> Peekable', summary: 'Adapts an iterator so you can `.peek()` at the next item without consuming it.', example: 'let mut it = v.iter().peekable();\nif it.peek().is_some() { /* ... */ }', docUrl: `${ITER}.peekable` },
  { name: 'next', kind: 'method', signature: 'fn next(&mut self) -> Option<Item>', summary: 'Advances the iterator and returns the next item as `Some`, or `None` when exhausted. The single required method of the `Iterator` trait.', example: 'let mut it = v.iter();\nlet first = it.next();', docUrl: `${STD}/iter/trait.Iterator.html#tymethod.next` },
  { name: 'rposition', kind: 'method', signature: 'fn rposition<P>(&mut self, predicate: P) -> Option<usize>', summary: 'Like `position`, but searches from the end and returns the index of the last match.', example: 'let last = v.iter().rposition(|&x| x == 0);', docUrl: `${ITER}.rposition` },

  // Vec / slice
  { name: 'push', kind: 'method', signature: 'fn push(&mut self, value: T)', summary: 'Appends a value to the end of a `Vec` (or `String` via `push` for a `char`).', example: 'let mut v = vec![1, 2];\nv.push(3); // [1,2,3]', docUrl: `${VEC}.push` },
  { name: 'pop', kind: 'method', signature: 'fn pop(&mut self) -> Option<T>', summary: 'Removes and returns the last element as `Some`, or `None` if empty. Pairs with `push` to build a stack.', example: 'let mut v = vec![1, 2, 3];\nlet last = v.pop(); // Some(3)', docUrl: `${VEC}.pop` },
  { name: 'insert', kind: 'method', signature: 'fn insert(&mut self, index, value)  // also HashMap::insert', summary: 'For `Vec`: inserts a value at an index, shifting later elements right. For `HashMap`: adds/replaces a key→value pair.', example: 'let mut v = vec![1, 3];\nv.insert(1, 2); // [1,2,3]', docUrl: `${VEC}.insert` },
  { name: 'remove', kind: 'method', signature: 'fn remove(&mut self, index) -> T', summary: 'Removes and returns the element at an index, shifting later elements left. Panics if the index is out of bounds.', example: 'let mut v = vec![1, 2, 3];\nlet x = v.remove(0); // x = 1, v = [2,3]', docUrl: `${VEC}.remove` },
  { name: 'get', kind: 'method', signature: 'fn get(&self, index) -> Option<&T>  // also HashMap::get', summary: 'Safely accesses an element/value by index or key, returning `Some(&value)` or `None` instead of panicking like `[i]` does.', example: 'if let Some(x) = v.get(10) { /* ... */ } else { /* out of range */ }', docUrl: `${SLICE}.get` },
  { name: 'len', kind: 'method', signature: 'fn len(&self) -> usize', summary: 'Returns the number of elements (or bytes, for `&str`). Type is `usize`.', example: 'let n = v.len();', docUrl: `${SLICE}.len` },
  { name: 'is_empty', kind: 'method', signature: 'fn is_empty(&self) -> bool', summary: 'Returns `true` if there are no elements. Clearer and sometimes faster than `len() == 0`.', example: 'if v.is_empty() { return None; }', docUrl: `${SLICE}.is_empty` },
  { name: 'contains', kind: 'method', signature: 'fn contains(&self, x: &T) -> bool  // also str::contains', summary: 'Returns `true` if the slice contains an element equal to `x` (or, for `&str`, the substring/char).', example: 'let has = v.contains(&5);\nlet has_sub = "hello".contains("ell");', docUrl: `${SLICE}.contains` },
  { name: 'sort', kind: 'method', signature: 'fn sort(&mut self)', summary: 'Sorts a slice/`Vec` in ascending order in place (stable sort). Elements must be `Ord`.', example: 'let mut v = vec![3, 1, 2];\nv.sort(); // [1,2,3]', docUrl: `${SLICE}.sort` },
  { name: 'sort_by', kind: 'method', signature: 'fn sort_by<F>(&mut self, compare: F)', summary: 'Sorts in place using a custom comparison closure returning an `Ordering`.', example: 'v.sort_by(|a, b| b.cmp(a)); // descending', docUrl: `${SLICE}.sort_by` },
  { name: 'sort_by_key', kind: 'method', signature: 'fn sort_by_key<K, F>(&mut self, f: F)', summary: 'Sorts in place by a key extracted from each element.', example: 'people.sort_by_key(|p| p.age);', docUrl: `${SLICE}.sort_by_key` },
  { name: 'sort_unstable', kind: 'method', signature: 'fn sort_unstable(&mut self)', summary: 'Like `sort` but faster and not stable (equal elements may be reordered). Good default when stability does not matter.', example: 'v.sort_unstable();', docUrl: `${SLICE}.sort_unstable` },
  { name: 'reverse', kind: 'method', signature: 'fn reverse(&mut self)', summary: 'Reverses the order of elements in a slice/`Vec` in place.', example: 'let mut v = vec![1, 2, 3];\nv.reverse(); // [3,2,1]', docUrl: `${SLICE}.reverse` },
  { name: 'dedup', kind: 'method', signature: 'fn dedup(&mut self)', summary: 'Removes consecutive duplicate elements. Sort first if you want to remove all duplicates.', example: 'let mut v = vec![1, 1, 2, 2, 1];\nv.dedup(); // [1,2,1]', docUrl: `${VEC}.dedup` },
  { name: 'extend', kind: 'method', signature: 'fn extend<I>(&mut self, iter: I)', summary: 'Appends every item from an iterator to the collection.', example: 'let mut v = vec![1];\nv.extend([2, 3]); // [1,2,3]', docUrl: `${VEC}.extend` },
  { name: 'with_capacity', kind: 'method', signature: 'fn with_capacity(n: usize) -> Vec<T>', summary: 'Creates an empty `Vec`/`String` that has pre-allocated room for `n` elements, avoiding reallocations.', example: 'let mut v = Vec::with_capacity(100);', docUrl: `${VEC}.with_capacity` },
  { name: 'drain', kind: 'method', signature: 'fn drain(&mut self, range) -> Drain', summary: 'Removes a range of elements and yields them as an iterator, leaving the rest in place.', example: 'let removed: Vec<i32> = v.drain(0..2).collect();', docUrl: `${VEC}.drain` },
  { name: 'retain', kind: 'method', signature: 'fn retain<F>(&mut self, keep: F)', summary: 'Keeps only the elements for which the closure returns `true`, removing the rest in place.', example: 'v.retain(|&x| x % 2 == 0); // keep evens', docUrl: `${VEC}.retain` },
  { name: 'first', kind: 'method', signature: 'fn first(&self) -> Option<&T>', summary: 'Returns the first element as `Some(&first)`, or `None` if empty.', example: 'if let Some(x) = v.first() { /* ... */ }', docUrl: `${SLICE}.first` },
  { name: 'last', kind: 'method', signature: 'fn last(&self) -> Option<&T>', summary: 'Returns the last element as `Some(&last)`, or `None` if empty.', example: 'let end = v.last();', docUrl: `${SLICE}.last` },
  { name: 'swap', kind: 'method', signature: 'fn swap(&mut self, a: usize, b: usize)', summary: 'Swaps the two elements at the given indices in place.', example: 'v.swap(0, v.len() - 1);', docUrl: `${SLICE}.swap` },
  { name: 'windows', kind: 'method', signature: 'fn windows(&self, size) -> Windows', summary: 'Yields overlapping slices of the given length (a sliding window).', example: 'for pair in v.windows(2) { /* [a,b], [b,c], ... */ }', docUrl: `${SLICE}.windows` },
  { name: 'chunks', kind: 'method', signature: 'fn chunks(&self, size) -> Chunks', summary: 'Yields non-overlapping slices of up to `size` elements. Handy for splitting data into rows/groups.', example: 'for row in grid.chunks(3) { /* 3 at a time */ }', docUrl: `${SLICE}.chunks` },
  { name: 'join', kind: 'method', signature: 'fn join(&self, sep) -> String', summary: 'Concatenates a slice of strings (or slices) into one, inserting a separator between elements.', example: 'let csv = ["a", "b", "c"].join(", "); // "a, b, c"', docUrl: `${SLICE}.join` },
  { name: 'concat', kind: 'method', signature: 'fn concat(&self) -> String', summary: 'Concatenates a slice of strings/slices into one, with no separator.', example: 'let s = ["foo", "bar"].concat(); // "foobar"', docUrl: `${SLICE}.concat` },

  // String / str
  { name: 'chars', kind: 'method', signature: 'fn chars(&self) -> Chars', summary: 'Returns an iterator over the `char`s of a string (Unicode scalar values), the usual way to process text by character.', example: 'let upper: String = "abc".chars().map(|c| c.to_ascii_uppercase()).collect();', docUrl: `${STR}.chars` },
  { name: 'bytes', kind: 'method', signature: 'fn bytes(&self) -> Bytes', summary: 'Returns an iterator over the raw UTF-8 bytes (`u8`) of a string.', example: 'for b in "AB".bytes() { /* 65, 66 */ }', docUrl: `${STR}.bytes` },
  { name: 'char_indices', kind: 'method', signature: 'fn char_indices(&self) -> CharIndices', summary: 'Like `chars`, but yields `(byte_index, char)` pairs.', example: 'for (i, c) in "abc".char_indices() { /* (0,\'a\') ... */ }', docUrl: `${STR}.char_indices` },
  { name: 'split', kind: 'method', signature: 'fn split(&self, pat) -> Split', summary: 'Splits a string by a separator (a char, &str, or closure), yielding the pieces as `&str`s.', example: 'let parts: Vec<&str> = "a,b,c".split(\',\').collect(); // ["a","b","c"]', docUrl: `${STR}.split` },
  { name: 'split_whitespace', kind: 'method', signature: 'fn split_whitespace(&self) -> SplitWhitespace', summary: 'Splits a string on runs of whitespace, ignoring leading/trailing/duplicate spaces. Ideal for tokenizing words.', example: 'let words: Vec<&str> = "  hi   there ".split_whitespace().collect(); // ["hi","there"]', docUrl: `${STR}.split_whitespace` },
  { name: 'splitn', kind: 'method', signature: 'fn splitn(&self, n, pat) -> SplitN', summary: 'Splits into at most `n` pieces; the final piece keeps the rest of the string unsplit.', example: 'let kv: Vec<&str> = "key=a=b".splitn(2, \'=\').collect(); // ["key","a=b"]', docUrl: `${STR}.splitn` },
  { name: 'lines', kind: 'method', signature: 'fn lines(&self) -> Lines', summary: 'Yields each line of a string (splitting on `\\n`, handling `\\r\\n`), without the line endings.', example: 'for line in text.lines() { /* ... */ }', docUrl: `${STR}.lines` },
  { name: 'trim', kind: 'method', signature: 'fn trim(&self) -> &str', summary: 'Returns the string with leading and trailing whitespace removed.', example: 'let clean = "  hi  ".trim(); // "hi"', docUrl: `${STR}.trim` },
  { name: 'trim_start', kind: 'method', signature: 'fn trim_start(&self) -> &str', summary: 'Removes only leading whitespace.', example: 'let s = "  hi".trim_start(); // "hi"', docUrl: `${STR}.trim_start` },
  { name: 'trim_end', kind: 'method', signature: 'fn trim_end(&self) -> &str', summary: 'Removes only trailing whitespace.', example: 'let s = "hi  ".trim_end(); // "hi"', docUrl: `${STR}.trim_end` },
  { name: 'to_uppercase', kind: 'method', signature: 'fn to_uppercase(&self) -> String', summary: 'Returns a new `String` with every character uppercased (Unicode-aware). For ASCII-only, `to_ascii_uppercase` is cheaper.', example: 'let shout = "hello".to_uppercase(); // "HELLO"', docUrl: `${STR}.to_uppercase` },
  { name: 'to_lowercase', kind: 'method', signature: 'fn to_lowercase(&self) -> String', summary: 'Returns a new `String` with every character lowercased (Unicode-aware).', example: 'let quiet = "HELLO".to_lowercase(); // "hello"', docUrl: `${STR}.to_lowercase` },
  { name: 'to_ascii_uppercase', kind: 'method', signature: 'fn to_ascii_uppercase(&self) -> String', summary: 'Uppercases only ASCII letters a–z, leaving other characters unchanged. Also available on `char`.', example: "let c = 'a'.to_ascii_uppercase(); // 'A'", docUrl: `${STR}.to_ascii_uppercase` },
  { name: 'to_ascii_lowercase', kind: 'method', signature: 'fn to_ascii_lowercase(&self) -> String', summary: 'Lowercases only ASCII letters A–Z. Also available on `char`.', example: "let c = 'A'.to_ascii_lowercase(); // 'a'", docUrl: `${STR}.to_ascii_lowercase` },
  { name: 'replace', kind: 'method', signature: 'fn replace(&self, from, to) -> String', summary: 'Returns a new string with all occurrences of a pattern replaced.', example: 'let s = "a-b-c".replace(\'-\', "_"); // "a_b_c"', docUrl: `${STR}.replace` },
  { name: 'starts_with', kind: 'method', signature: 'fn starts_with(&self, pat) -> bool', summary: 'Returns `true` if the string begins with the given prefix (char or &str).', example: 'let yes = "hello".starts_with("he");', docUrl: `${STR}.starts_with` },
  { name: 'ends_with', kind: 'method', signature: 'fn ends_with(&self, pat) -> bool', summary: 'Returns `true` if the string ends with the given suffix.', example: 'let yes = "file.rs".ends_with(".rs");', docUrl: `${STR}.ends_with` },
  { name: 'parse', kind: 'method', signature: 'fn parse<F>(&self) -> Result<F, F::Err>', summary: 'Parses a string into another type (number, bool, …). Returns a `Result`; annotate the target with `parse::<i32>()` or via the binding type.', example: 'let n: i32 = "42".parse().unwrap();\nlet maybe = "x".parse::<i32>(); // Err', docUrl: `${STR}.parse` },
  { name: 'push_str', kind: 'method', signature: 'fn push_str(&mut self, s: &str)', summary: 'Appends a whole string slice to the end of a `String`.', example: 'let mut s = String::from("foo");\ns.push_str("bar"); // "foobar"', docUrl: `${STRING}.push_str` },
  { name: 'as_str', kind: 'method', signature: 'fn as_str(&self) -> &str', summary: 'Borrows a `String` as a `&str` slice without copying.', example: 'fn takes_str(s: &str) {}\ntakes_str(owned.as_str());', docUrl: `${STRING}.as_str` },
  { name: 'as_bytes', kind: 'method', signature: 'fn as_bytes(&self) -> &[u8]', summary: 'Views the string as its underlying slice of UTF-8 bytes.', example: 'let first_byte = "Hi".as_bytes()[0]; // 72', docUrl: `${STR}.as_bytes` },
  { name: 'repeat', kind: 'method', signature: 'fn repeat(&self, n: usize) -> String', summary: 'Builds a new string/`Vec` by repeating the contents `n` times. Great for drawing lines or padding.', example: 'let bar = "=".repeat(10); // "=========="', docUrl: `${STR}.repeat` },

  // Option / Result
  { name: 'unwrap', kind: 'method', signature: 'fn unwrap(self) -> T', summary: 'Extracts the value from `Some`/`Ok`. PANICS on `None`/`Err`. Convenient in examples and tests, but prefer `match`, `?`, or `unwrap_or` in real code.', example: 'let n: i32 = "5".parse().unwrap();', docUrl: `${OPT}.unwrap` },
  { name: 'expect', kind: 'method', signature: 'fn expect(self, msg: &str) -> T', summary: 'Like `unwrap`, but panics with your custom message — making failures easier to diagnose.', example: 'let cfg = load().expect("config must exist");', docUrl: `${OPT}.expect` },
  { name: 'unwrap_or', kind: 'method', signature: 'fn unwrap_or(self, default: T) -> T', summary: 'Returns the contained value, or a fallback default if it is `None`/`Err`. Never panics.', example: 'let n = "x".parse::<i32>().unwrap_or(0); // 0', docUrl: `${OPT}.unwrap_or` },
  { name: 'unwrap_or_else', kind: 'method', signature: 'fn unwrap_or_else<F>(self, f: F) -> T', summary: 'Like `unwrap_or` but computes the fallback lazily with a closure (only if needed).', example: 'let v = map.get(&k).copied().unwrap_or_else(|| compute());', docUrl: `${OPT}.unwrap_or_else` },
  { name: 'unwrap_or_default', kind: 'method', signature: 'fn unwrap_or_default(self) -> T', summary: 'Returns the contained value, or the type’s `Default` (0, "", empty Vec…) when missing.', example: 'let count: i32 = maybe.unwrap_or_default(); // 0 if None', docUrl: `${OPT}.unwrap_or_default` },
  { name: 'is_some', kind: 'method', signature: 'fn is_some(&self) -> bool', summary: 'Returns `true` if the `Option` is `Some`.', example: 'if opt.is_some() { /* ... */ }', docUrl: `${OPT}.is_some` },
  { name: 'is_none', kind: 'method', signature: 'fn is_none(&self) -> bool', summary: 'Returns `true` if the `Option` is `None`.', example: 'if opt.is_none() { return; }', docUrl: `${OPT}.is_none` },
  { name: 'is_ok', kind: 'method', signature: 'fn is_ok(&self) -> bool', summary: 'Returns `true` if the `Result` is `Ok`.', example: 'if res.is_ok() { /* ... */ }', docUrl: `${RES}.is_ok` },
  { name: 'is_err', kind: 'method', signature: 'fn is_err(&self) -> bool', summary: 'Returns `true` if the `Result` is `Err`.', example: 'if res.is_err() { /* handle */ }', docUrl: `${RES}.is_err` },
  { name: 'ok', kind: 'method', signature: 'fn ok(self) -> Option<T>', summary: 'Converts a `Result<T, E>` into an `Option<T>`, discarding the error. Common before `filter_map`.', example: 'let n = "5".parse::<i32>().ok(); // Some(5)', docUrl: `${RES}.ok` },
  { name: 'map_or', kind: 'method', signature: 'fn map_or<U, F>(self, default: U, f: F) -> U', summary: 'Applies a closure to the contained value, or returns a default if there is none.', example: 'let len = opt.map_or(0, |s| s.len());', docUrl: `${OPT}.map_or` },
  { name: 'and_then', kind: 'method', signature: 'fn and_then<U, F>(self, f: F) -> Option<U>', summary: 'Chains computations that themselves return `Option`/`Result`, flattening the result (a.k.a. flatMap/bind).', example: 'let x = first().and_then(|v| second(v));', docUrl: `${OPT}.and_then` },
  { name: 'ok_or', kind: 'method', signature: 'fn ok_or<E>(self, err: E) -> Result<T, E>', summary: 'Converts an `Option` into a `Result`, using the supplied error for the `None` case.', example: 'let r = opt.ok_or("missing");', docUrl: `${OPT}.ok_or` },

  // HashMap / entry
  { name: 'entry', kind: 'method', signature: 'fn entry(&mut self, key: K) -> Entry', summary: 'Gets a view into a map slot for a key, so you can insert-if-absent or update in place. The idiomatic way to count or accumulate.', example: 'let mut counts = std::collections::HashMap::new();\n*counts.entry(word).or_insert(0) += 1;', docUrl: `${MAP}.entry` },
  { name: 'or_insert', kind: 'method', signature: 'fn or_insert(self, default: V) -> &mut V', summary: 'On a map `entry`: returns a mutable reference to the value, inserting `default` first if the key was absent.', example: '*map.entry(k).or_insert(0) += 1;', docUrl: `${STD}/collections/hash_map/enum.Entry.html#method.or_insert` },
  { name: 'or_insert_with', kind: 'method', signature: 'fn or_insert_with<F>(self, f: F) -> &mut V', summary: 'Like `or_insert`, but builds the default lazily with a closure (e.g. an empty `Vec`).', example: 'map.entry(k).or_insert_with(Vec::new).push(item);', docUrl: `${STD}/collections/hash_map/enum.Entry.html#method.or_insert_with` },
  { name: 'contains_key', kind: 'method', signature: 'fn contains_key(&self, k: &K) -> bool', summary: 'Returns `true` if the map has the given key.', example: 'if map.contains_key("id") { /* ... */ }', docUrl: `${MAP}.contains_key` },
  { name: 'keys', kind: 'method', signature: 'fn keys(&self) -> Keys', summary: 'Returns an iterator over the map’s keys.', example: 'for k in map.keys() { /* ... */ }', docUrl: `${MAP}.keys` },
  { name: 'values', kind: 'method', signature: 'fn values(&self) -> Values', summary: 'Returns an iterator over the map’s values.', example: 'let total: i32 = map.values().sum();', docUrl: `${MAP}.values` },
  { name: 'values_mut', kind: 'method', signature: 'fn values_mut(&mut self) -> ValuesMut', summary: 'Returns an iterator of mutable references to the map’s values.', example: 'for v in map.values_mut() { *v += 1; }', docUrl: `${MAP}.values_mut` },

  // Conversions & misc
  { name: 'to_string', kind: 'method', signature: 'fn to_string(&self) -> String', summary: 'Converts a value into an owned `String`. Available on anything that implements `Display` (numbers, `&str`, etc.).', example: 'let s = 42.to_string(); // "42"', docUrl: `${STD}/string/trait.ToString.html#tymethod.to_string` },
  { name: 'to_owned', kind: 'method', signature: 'fn to_owned(&self) -> Owned', summary: 'Creates an owned copy from a borrowed value, e.g. `&str` → `String` or `&[T]` → `Vec<T>`.', example: 'let owned: String = "hi".to_owned();', docUrl: `${STD}/borrow/trait.ToOwned.html#tymethod.to_owned` },
  { name: 'clone', kind: 'method', signature: 'fn clone(&self) -> Self', summary: 'Makes an explicit deep copy of a value. Needed when you want a second owned copy of data that does not implement `Copy`.', example: 'let a = vec![1, 2, 3];\nlet b = a.clone(); // independent copy', docUrl: `${STD}/clone/trait.Clone.html#tymethod.clone` },
  { name: 'into', kind: 'method', signature: 'fn into(self) -> T', summary: 'Converts a value into another type using the `Into`/`From` traits. The target type is inferred from context.', example: 'let s: String = "hi".into();', docUrl: `${STD}/convert/trait.Into.html#tymethod.into` },
  { name: 'from', kind: 'function', signature: 'fn from(value) -> Self', summary: 'An associated function that builds a value of one type from another (`String::from`, `Vec::from`, …). The basis of `.into()`.', example: 'let s = String::from("hello");', docUrl: `${STD}/convert/trait.From.html#tymethod.from` },
  { name: 'default', kind: 'function', signature: 'fn default() -> Self', summary: 'Produces the type’s default value (0, "", empty collections, `None`…). Call as `Type::default()` or via `#[derive(Default)]`.', example: 'let v: Vec<i32> = Vec::default(); // []', docUrl: `${STD}/default/trait.Default.html#tymethod.default` },
  { name: 'new', kind: 'function', signature: 'fn new() -> Self', summary: 'The conventional constructor name for an empty/initial value (`Vec::new()`, `String::new()`, `HashMap::new()`).', example: 'let mut v: Vec<i32> = Vec::new();', docUrl: `${STD}/vec/struct.Vec.html#method.new` },

  // Numeric helpers
  { name: 'abs', kind: 'method', signature: 'fn abs(self) -> Self', summary: 'Returns the absolute value of a signed number.', example: 'let d = (-7).abs(); // 7', docUrl: `${STD}/primitive.i32.html#method.abs` },
  { name: 'pow', kind: 'method', signature: 'fn pow(self, exp: u32) -> Self', summary: 'Raises an integer to an integer power. (Floats use `powi`/`powf`.)', example: 'let n = 2_u32.pow(10); // 1024', docUrl: `${STD}/primitive.i32.html#method.pow` },
  { name: 'powf', kind: 'method', signature: 'fn powf(self, exp: f64) -> f64', summary: 'Raises a float to a floating-point power.', example: 'let r = 2.0_f64.powf(0.5); // ~1.414', docUrl: `${STD}/primitive.f64.html#method.powf` },
  { name: 'powi', kind: 'method', signature: 'fn powi(self, exp: i32) -> f64', summary: 'Raises a float to an integer power (faster than `powf`).', example: 'let r = 3.0_f64.powi(2); // 9.0', docUrl: `${STD}/primitive.f64.html#method.powi` },
  { name: 'sqrt', kind: 'method', signature: 'fn sqrt(self) -> f64', summary: 'Returns the square root of a float.', example: 'let r = 16.0_f64.sqrt(); // 4.0', docUrl: `${STD}/primitive.f64.html#method.sqrt` },
  { name: 'floor', kind: 'method', signature: 'fn floor(self) -> f64', summary: 'Rounds a float down to the nearest whole number.', example: 'let n = 3.9_f64.floor(); // 3.0', docUrl: `${STD}/primitive.f64.html#method.floor` },
  { name: 'ceil', kind: 'method', signature: 'fn ceil(self) -> f64', summary: 'Rounds a float up to the nearest whole number.', example: 'let n = 3.1_f64.ceil(); // 4.0', docUrl: `${STD}/primitive.f64.html#method.ceil` },
  { name: 'round', kind: 'method', signature: 'fn round(self) -> f64', summary: 'Rounds a float to the nearest whole number (halfway cases round away from zero).', example: 'let n = 2.5_f64.round(); // 3.0', docUrl: `${STD}/primitive.f64.html#method.round` },
  { name: 'rem_euclid', kind: 'method', signature: 'fn rem_euclid(self, rhs) -> Self', summary: 'Computes a non-negative remainder, unlike `%` which can be negative for negative operands. Useful for wrapping indices.', example: 'let i = (-1_i32).rem_euclid(5); // 4', docUrl: `${STD}/primitive.i32.html#method.rem_euclid` },
  { name: 'checked_add', kind: 'method', signature: 'fn checked_add(self, rhs) -> Option<Self>', summary: 'Adds two integers, returning `None` instead of overflowing.', example: 'let r = u8::MAX.checked_add(1); // None', docUrl: `${STD}/primitive.i32.html#method.checked_add` },
  { name: 'saturating_sub', kind: 'method', signature: 'fn saturating_sub(self, rhs) -> Self', summary: 'Subtracts integers, clamping at the type’s minimum instead of underflowing (e.g. `0u32 - 1 = 0`).', example: 'let r = 0_u32.saturating_sub(5); // 0', docUrl: `${STD}/primitive.u32.html#method.saturating_sub` },
];

// ---------------------------------------------------------------------------
// Cross-cutting concepts (no single keyword, but worth explaining on hover)
// ---------------------------------------------------------------------------
const concepts: RustDocEntry[] = [
  { name: 'Iterator', kind: 'trait', signature: 'trait Iterator { fn next(&mut self) -> Option<Item>; }', summary: 'The trait powering lazy sequences. Implement `next`, get dozens of adapter methods (`map`, `filter`, `collect`…) for free.', example: 'let v: Vec<i32> = (1..=3).map(|x| x * 2).collect();', docUrl: `${STD}/iter/trait.Iterator.html` },
  { name: 'Clone', kind: 'trait', signature: 'trait Clone { fn clone(&self) -> Self; }', summary: 'Types that can be explicitly duplicated with `.clone()`. Derive it with `#[derive(Clone)]`.', example: '#[derive(Clone)]\nstruct Point { x: i32, y: i32 }', docUrl: `${STD}/clone/trait.Clone.html` },
  { name: 'Display', kind: 'trait', signature: 'trait Display { fn fmt(&self, f) -> Result }', summary: 'Controls how a value prints with `{}`. Implementing it also gives you `.to_string()`.', example: 'impl std::fmt::Display for Point {\n    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {\n        write!(f, "({}, {})", self.x, self.y)\n    }\n}', docUrl: `${STD}/fmt/trait.Display.html` },
  { name: 'Debug', kind: 'trait', signature: '#[derive(Debug)]', summary: 'Controls how a value prints with `{:?}`. Almost always derived with `#[derive(Debug)]` for quick inspection.', example: '#[derive(Debug)]\nstruct Item { id: u32 }\nprintln!("{:?}", item);', docUrl: `${STD}/fmt/trait.Debug.html` },
];

export const RUST_REFERENCE_ENTRIES: RustDocEntry[] = [
  ...keywords,
  ...primitives,
  ...types,
  ...variants,
  ...macros,
  ...methods,
  ...concepts,
];

/** Lookup map keyed by the token as written in code (macros keep their `!`). */
export const RUST_REFERENCE: Record<string, RustDocEntry> = (() => {
  const map: Record<string, RustDocEntry> = {};
  for (const e of RUST_REFERENCE_ENTRIES) map[e.name] = e;
  return map;
})();

/**
 * Resolve a hovered/clicked token to a documentation entry.
 * @param word the bare identifier under the cursor (no punctuation)
 * @param followedByBang true if the next character in the source is `!`
 */
export function lookupRustToken(word: string, followedByBang: boolean): RustDocEntry | undefined {
  if (!word) return undefined;
  if (followedByBang) {
    return RUST_REFERENCE[`${word}!`];
  }
  // Prefer an exact match (keywords/types/methods); fall back to the macro form.
  return RUST_REFERENCE[word] ?? RUST_REFERENCE[`${word}!`];
}

/** Build a Markdown hover body for an entry. */
export function renderHoverMarkdown(entry: RustDocEntry): string {
  const lines: string[] = [];
  lines.push(`**\`${entry.name}\`** &nbsp;·&nbsp; _${entry.kind}_`);
  if (entry.signature) {
    lines.push('```rust');
    lines.push(entry.signature);
    lines.push('```');
  }
  lines.push('');
  lines.push(entry.summary);
  if (entry.example) {
    lines.push('');
    lines.push('**Example**');
    lines.push('```rust');
    lines.push(entry.example);
    lines.push('```');
  }
  lines.push('');
  lines.push(`[📖 Open documentation ↗](${entry.docUrl})`);
  lines.push('');
  lines.push('_Ctrl/⌘ + click the token to open the docs._');
  return lines.join('\n');
}
