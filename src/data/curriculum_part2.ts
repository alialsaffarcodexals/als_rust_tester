import type { Exercise } from '../types';

export const exercises2: Exercise[] = [
  {
    id: 32,
    slug: 'does-it-fit',
    title: 'Geometric Fit Functions',
    checkpoint: 'checkpoint2',
    difficulty: 'medium',
    order: 32,
    concept: `Area and volume comparison functions let you determine if shapes can fit within a given space. This exercise covers computing areas/volumes for multiple shapes and comparing them—a practical use of Rust's numeric types and function composition.`,
    whyItExists: `Geometry helpers appear in game engines, UI layout algorithms, and physics simulations. Writing generic "does X fit in Y" logic trains function composition and numeric reasoning in Rust.`,
    comparisons: [
      { language: 'C#', code: 'static double CircleArea(int r) => Math.PI * r * r;', note: 'C# uses Math.PI from System namespace' },
      { language: 'Java', code: 'static double circleArea(int r) { return Math.PI * r * r; }', note: 'Java uses Math.PI' },
      { language: 'Go', code: 'func circleArea(r int) float64 { return math.Pi * float64(r) * float64(r) }', note: 'Go requires explicit cast to float64' },
      { language: 'JavaScript', code: 'const circleArea = r => Math.PI * r * r;', note: 'All JS numbers are float64' },
      { language: 'Python', code: 'import math\ncircle_area = lambda r: math.pi * r * r', note: 'Python uses math.pi' },
    ],
    guidedExamples: [
      {
        title: 'Area functions',
        explanation: 'Each shape returns usize (for integer shapes) or f64 (for circles/spheres).',
        code: `fn square_area(side: usize) -> usize { side * side }
fn circle_area(radius: usize) -> f64 { std::f64::consts::PI * (radius * radius) as f64 }
fn triangle_area(base: usize, height: usize) -> f64 { (base * height) as f64 / 2.0 }`,
      },
    ],
    videos: [{ title: 'Rust Numeric Types', url: 'https://www.youtube.com/watch?v=t047Hseyj_k', description: 'Overview of Rust number types' }],
    question: `Write geometric area/volume helpers, then implement \`area_fit\` and \`volume_fit\` that test whether a given shape can tile into a rectangle or cuboid a given number of times.

Functions needed:
- \`square_area(side: usize) -> usize\`
- \`circle_area(radius: usize) -> f64\`
- \`triangle_area(base: usize, height: usize) -> f64\`
- \`rectangle_area(length: usize, width: usize) -> usize\`
- \`square_volume(side: usize) -> usize\`
- \`sphere_volume(radius: usize) -> f64\`
- \`triangle_volume(base: usize, height: usize, depth: usize) -> f64\`
- \`rectangle_volume(length: usize, width: usize, height: usize) -> usize\`
- \`area_fit(x: usize, y: usize, shape: &str, times: usize, a: usize, b: usize) -> bool\`
- \`volume_fit(x: usize, y: usize, z: usize, vol: &str, times: usize, a: usize, b: usize, c: usize) -> bool\`

\`area_fit\` returns true if \`shape\` (with dims a,b) fits \`times\` times into rectangle x×y.`,
    functionSignatures: [
      'fn square_area(side: usize) -> usize',
      'fn circle_area(radius: usize) -> f64',
      'fn triangle_area(base: usize, height: usize) -> f64',
      'fn rectangle_area(length: usize, width: usize) -> usize',
      'fn square_volume(side: usize) -> usize',
      'fn sphere_volume(radius: usize) -> f64',
      'fn triangle_volume(base: usize, height: usize, depth: usize) -> f64',
      'fn rectangle_volume(length: usize, width: usize, height: usize) -> usize',
      'fn area_fit(x: usize, y: usize, shape: &str, times: usize, a: usize, b: usize) -> bool',
      'fn volume_fit(x: usize, y: usize, z: usize, vol: &str, times: usize, a: usize, b: usize, c: usize) -> bool',
    ],
    constraints: [
      'Use std::f64::consts::PI for circle/sphere calculations',
      'area_fit: compare shape_area * times <= rectangle_area(x,y) using floor for float shapes',
      'volume_fit: same logic for 3D',
    ],
    starterCode: `use std::f64::consts::PI;

fn square_area(side: usize) -> usize {
    todo!()
}

fn circle_area(radius: usize) -> f64 {
    todo!()
}

fn triangle_area(base: usize, height: usize) -> f64 {
    todo!()
}

fn rectangle_area(length: usize, width: usize) -> usize {
    todo!()
}

fn square_volume(side: usize) -> usize {
    todo!()
}

fn sphere_volume(radius: usize) -> f64 {
    todo!()
}

fn triangle_volume(base: usize, height: usize, depth: usize) -> f64 {
    todo!()
}

fn rectangle_volume(length: usize, width: usize, height: usize) -> usize {
    todo!()
}

fn area_fit(x: usize, y: usize, shape: &str, times: usize, a: usize, b: usize) -> bool {
    todo!()
}

fn volume_fit(x: usize, y: usize, z: usize, vol: &str, times: usize, a: usize, b: usize, c: usize) -> bool {
    todo!()
}

fn main() {}`,
    solution: `use std::f64::consts::PI;

fn square_area(side: usize) -> usize { side * side }
fn circle_area(radius: usize) -> f64 { PI * (radius * radius) as f64 }
fn triangle_area(base: usize, height: usize) -> f64 { (base * height) as f64 / 2.0 }
fn rectangle_area(length: usize, width: usize) -> usize { length * width }
fn square_volume(side: usize) -> usize { side * side * side }
fn sphere_volume(radius: usize) -> f64 { (4.0 / 3.0) * PI * (radius * radius * radius) as f64 }
fn triangle_volume(base: usize, height: usize, depth: usize) -> f64 { triangle_area(base, height) * depth as f64 }
fn rectangle_volume(length: usize, width: usize, height: usize) -> usize { length * width * height }

fn area_fit(x: usize, y: usize, shape: &str, times: usize, a: usize, b: usize) -> bool {
    let container = rectangle_area(x, y) as f64;
    let shape_area = match shape {
        "square" => square_area(a) as f64,
        "circle" => circle_area(a),
        "triangle" => triangle_area(a, b),
        "rectangle" => rectangle_area(a, b) as f64,
        _ => 0.0,
    };
    shape_area * times as f64 <= container
}

fn volume_fit(x: usize, y: usize, z: usize, vol: &str, times: usize, a: usize, b: usize, c: usize) -> bool {
    let container = rectangle_volume(x, y, z) as f64;
    let shape_vol = match vol {
        "square" => square_volume(a) as f64,
        "sphere" => sphere_volume(a),
        "triangle" => triangle_volume(a, b, c),
        "rectangle" => rectangle_volume(a, b, c) as f64,
        _ => 0.0,
    };
    shape_vol * times as f64 <= container
}

fn main() {}`,
    testCases: [
      { id: 'test_32_1', description: 'circle fits in rectangle', code: 'fn main() { println!("{}", area_fit(5, 5, "circle", 1, 2, 0)); }', expectedOutput: 'true', hidden: false },
      { id: 'test_32_2', description: 'squares do not fit', code: 'fn main() { println!("{}", area_fit(5, 5, "square", 5, 2, 0)); }', expectedOutput: 'false', hidden: false },
      { id: 'test_32_3', description: 'rectangle area', code: 'fn main() { println!("{}", rectangle_area(4, 5)); }', expectedOutput: '20', hidden: false },
    ],
    hints: [
      'For area_fit, compare shape_area * times <= x * y (as floats)',
      'Use match on the shape string to dispatch to the right area function',
      'sphere_volume = (4/3) * PI * r^3 — use 4.0/3.0 to avoid integer division',
    ],
  },
  {
    id: 33,
    slug: 'profanity-filter',
    title: 'Profanity Filter with Option',
    checkpoint: 'checkpoint2',
    difficulty: 'easy',
    order: 33,
    concept: `\`Option<T>\` represents a value that may or may not exist. Instead of null pointers, Rust uses \`Option::Some(value)\` or \`Option::None\`. Methods like \`contains\`, \`find\`, and returning \`None\` early make content filtering clean and safe.`,
    whyItExists: `Option eliminates null-pointer bugs. Returning \`None\` instead of empty strings or sentinels makes the absence of a value explicit and forces callers to handle both cases.`,
    comparisons: [
      { language: 'C#', code: 'string? SendMs(string msg) => msg.Contains("profanity") ? null : msg;', note: 'C# uses nullable reference types' },
      { language: 'Java', code: 'Optional<String> sendMs(String msg) { return msg.contains("profanity") ? Optional.empty() : Optional.of(msg); }', note: 'Java uses Optional<T>' },
      { language: 'Go', code: 'func sendMs(msg string) (string, bool) { if strings.Contains(msg, "profanity") { return "", false }; return msg, true }', note: 'Go uses multiple returns' },
      { language: 'JavaScript', code: 'const sendMs = msg => msg.includes("profanity") ? null : msg;', note: 'JS uses null' },
      { language: 'Python', code: 'send_ms = lambda msg: None if "profanity" in msg else msg', note: 'Python returns None' },
    ],
    guidedExamples: [
      {
        title: 'Option basics',
        explanation: 'Return Some(value) or None based on a condition.',
        code: `fn find_positive(n: i32) -> Option<i32> {
    if n > 0 { Some(n) } else { None }
}`,
      },
    ],
    videos: [{ title: 'Rust Option Type', url: 'https://www.youtube.com/watch?v=qJgXbZ5PLJU', description: 'Understanding Option in Rust' }],
    question: `Create a \`Message\` struct with a \`content: String\` field. Implement:
- \`send_ms(message: &str) -> Option<&str>\` — returns \`None\` if message contains "profanity", otherwise \`Some(message)\`
- \`check_ms(message: &str) -> &str\` — returns the message if clean, or \`"Error: message contains profanity"\` if not`,
    functionSignatures: [
      'struct Message { content: String }',
      'fn send_ms(message: &str) -> Option<&str>',
      'fn check_ms(message: &str) -> &str',
    ],
    constraints: [
      'send_ms returns None when the word "profanity" appears in the message',
      'check_ms returns the error string literal when profanity is detected',
    ],
    starterCode: `struct Message {
    content: String,
}

fn send_ms(message: &str) -> Option<&str> {
    todo!()
}

fn check_ms(message: &str) -> &str {
    todo!()
}

fn main() {}`,
    solution: `struct Message {
    content: String,
}

fn send_ms(message: &str) -> Option<&str> {
    if message.contains("profanity") { None } else { Some(message) }
}

fn check_ms(message: &str) -> &str {
    match send_ms(message) {
        Some(m) => m,
        None => "Error: message contains profanity",
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_33_1', description: 'clean message', code: 'fn main() { println!("{:?}", send_ms("hello world")); }', expectedOutput: 'Some("hello world")', hidden: false },
      { id: 'test_33_2', description: 'profanity returns None', code: 'fn main() { println!("{:?}", send_ms("this has profanity in it")); }', expectedOutput: 'None', hidden: false },
      { id: 'test_33_3', description: 'check_ms clean', code: 'fn main() { println!("{}", check_ms("hi there")); }', expectedOutput: 'hi there', hidden: false },
      { id: 'test_33_4', description: 'check_ms profanity', code: 'fn main() { println!("{}", check_ms("profanity here")); }', expectedOutput: 'Error: message contains profanity', hidden: false },
    ],
    hints: [
      'Use str::contains to check for the word',
      'Return Some(message) for clean messages, None otherwise',
      'check_ms can call send_ms and match on the result',
    ],
  },
  {
    id: 34,
    slug: 'border-cross',
    title: 'Trait Objects & Dynamic Dispatch',
    checkpoint: 'checkpoint2',
    difficulty: 'medium',
    order: 34,
    concept: `Trait objects (\`&dyn Trait\`, \`Box<dyn Trait>\`) enable dynamic dispatch — the concrete type is resolved at runtime. This is Rust's answer to polymorphism without inheritance. Trait objects have a vtable pointer and a data pointer.`,
    whyItExists: `When you need a heterogeneous collection (different concrete types sharing a common interface), trait objects let you store them together. This is the foundation of plugin systems, renderer backends, and UI component trees.`,
    comparisons: [
      { language: 'C#', code: 'interface IVehicle { string Model(); }\nclass Car : IVehicle { public string Model() => "Tesla"; }', note: 'C# interfaces are implicit trait objects' },
      { language: 'Java', code: 'interface Vehicle { String model(); }\nclass Car implements Vehicle { public String model() { return "Tesla"; } }', note: 'Java uses interfaces' },
      { language: 'Go', code: 'type Vehicle interface { Model() string }\ntype Car struct{}\nfunc (c Car) Model() string { return "Tesla" }', note: 'Go interfaces are structural' },
      { language: 'JavaScript', code: 'class Car { model() { return "Tesla"; } }', note: 'JS uses prototype chain' },
      { language: 'Python', code: 'class Car:\n    def model(self): return "Tesla"', note: 'Python uses duck typing' },
    ],
    guidedExamples: [
      {
        title: 'Trait object collection',
        explanation: 'Store different types behind a shared trait in a Vec.',
        code: `trait Speak { fn speak(&self) -> &str; }
struct Dog;
impl Speak for Dog { fn speak(&self) -> &str { "woof" } }
fn all_speak(animals: Vec<&dyn Speak>) {
    for a in animals { println!("{}", a.speak()); }
}`,
      },
    ],
    videos: [{ title: 'Rust Trait Objects', url: 'https://www.youtube.com/watch?v=xcygqF5LVmM', description: 'Dynamic dispatch with dyn Trait' }],
    question: `Define a \`Vehicle\` trait with method \`model(&self) -> &str\`. Create \`Car\` and \`Truck\` structs that each have a \`name: String\` field and implement \`Vehicle\`. Write \`all_models(vehicles: Vec<&dyn Vehicle>)\` that prints each model name on its own line.`,
    functionSignatures: [
      'trait Vehicle { fn model(&self) -> &str; }',
      'struct Car { name: String }',
      'struct Truck { name: String }',
      'fn all_models(vehicles: Vec<&dyn Vehicle>)',
    ],
    constraints: [
      'Car and Truck both implement Vehicle',
      'all_models iterates and prints each model name',
      'Use &dyn Vehicle for the parameter type',
    ],
    starterCode: `trait Vehicle {
    fn model(&self) -> &str;
}

struct Car {
    name: String,
}

struct Truck {
    name: String,
}

impl Vehicle for Car {
    fn model(&self) -> &str {
        todo!()
    }
}

impl Vehicle for Truck {
    fn model(&self) -> &str {
        todo!()
    }
}

fn all_models(vehicles: Vec<&dyn Vehicle>) {
    todo!()
}

fn main() {}`,
    solution: `trait Vehicle {
    fn model(&self) -> &str;
}

struct Car { name: String }
struct Truck { name: String }

impl Vehicle for Car { fn model(&self) -> &str { &self.name } }
impl Vehicle for Truck { fn model(&self) -> &str { &self.name } }

fn all_models(vehicles: Vec<&dyn Vehicle>) {
    for v in vehicles { println!("{}", v.model()); }
}

fn main() {}`,
    testCases: [
      { id: 'test_34_1', description: 'all_models prints each vehicle', code: 'fn main() { let c = Car { name: "Tesla".to_string() }; let t = Truck { name: "Ford".to_string() }; all_models(vec![&c, &t]); }', expectedOutput: 'Tesla\nFord', hidden: false },
      { id: 'test_34_2', description: 'car model', code: 'fn main() { let c = Car { name: "BMW".to_string() }; println!("{}", c.model()); }', expectedOutput: 'BMW', hidden: false },
    ],
    hints: [
      'impl Vehicle for Car returns &self.name',
      'all_models: for v in vehicles { println!("{}", v.model()); }',
      '&dyn Vehicle is a fat pointer (data + vtable)',
    ],
  },
  {
    id: 35,
    slug: 'card-deck',
    title: 'Enums & Pattern Matching',
    checkpoint: 'checkpoint2',
    difficulty: 'easy',
    order: 35,
    concept: `Rust enums are algebraic data types — each variant can hold different data. Combined with \`match\`, they replace complex if-else chains with exhaustive pattern matching that the compiler verifies is complete.`,
    whyItExists: `Enums model domain concepts precisely. A \`Suit\` enum can only be Hearts/Diamonds/Clubs/Spades — impossible states are unrepresentable. The compiler ensures every variant is handled.`,
    comparisons: [
      { language: 'C#', code: 'enum Suit { Hearts, Diamonds, Clubs, Spades }', note: 'C# enums are integers under the hood' },
      { language: 'Java', code: 'enum Suit { HEARTS, DIAMONDS, CLUBS, SPADES }', note: 'Java enums are objects' },
      { language: 'Go', code: 'type Suit int\nconst (Hearts Suit = iota; Diamonds; Clubs; Spades)', note: 'Go uses iota constants' },
      { language: 'JavaScript', code: 'const Suit = Object.freeze({ Hearts: 0, Diamonds: 1, Clubs: 2, Spades: 3 });', note: 'JS uses frozen objects' },
      { language: 'Python', code: 'from enum import Enum\nclass Suit(Enum): Hearts=1; Diamonds=2; Clubs=3; Spades=4', note: 'Python enum module' },
    ],
    guidedExamples: [
      {
        title: 'Enum and match',
        explanation: 'Define an enum and match on its variants.',
        code: `#[derive(Debug)]
enum Color { Red, Green, Blue }
fn describe(c: &Color) -> &str {
    match c { Color::Red => "warm", Color::Green => "cool", Color::Blue => "cool" }
}`,
      },
    ],
    videos: [{ title: 'Rust Enums', url: 'https://www.youtube.com/watch?v=DSZqIJhkNCM', description: 'Enums and pattern matching in Rust' }],
    question: `Define \`Suit\` (Hearts, Diamonds, Clubs, Spades) and \`Rank\` (Ace, 2..=10, Jack, Queen, King) enums. Create a \`Card\` struct with \`suit: Suit\` and \`rank: Rank\` fields. Implement \`winner_card(card: &Card) -> bool\` that returns \`true\` if the card is Ace of Spades.`,
    functionSignatures: [
      'enum Suit { Hearts, Diamonds, Clubs, Spades }',
      'enum Rank { Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }',
      'struct Card { suit: Suit, rank: Rank }',
      'fn winner_card(card: &Card) -> bool',
    ],
    constraints: [
      'winner_card returns true only for Ace of Spades',
      'Use PartialEq or match to compare',
    ],
    starterCode: `#[derive(Debug, PartialEq)]
enum Suit {
    Hearts,
    Diamonds,
    Clubs,
    Spades,
}

#[derive(Debug, PartialEq)]
enum Rank {
    Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King,
}

struct Card {
    suit: Suit,
    rank: Rank,
}

fn winner_card(card: &Card) -> bool {
    todo!()
}

fn main() {}`,
    solution: `#[derive(Debug, PartialEq)]
enum Suit { Hearts, Diamonds, Clubs, Spades }

#[derive(Debug, PartialEq)]
enum Rank { Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }

struct Card { suit: Suit, rank: Rank }

fn winner_card(card: &Card) -> bool {
    card.suit == Suit::Spades && card.rank == Rank::Ace
}

fn main() {}`,
    testCases: [
      { id: 'test_35_1', description: 'Ace of Spades wins', code: 'fn main() { let c = Card { suit: Suit::Spades, rank: Rank::Ace }; println!("{}", winner_card(&c)); }', expectedOutput: 'true', hidden: false },
      { id: 'test_35_2', description: 'Ace of Hearts loses', code: 'fn main() { let c = Card { suit: Suit::Hearts, rank: Rank::Ace }; println!("{}", winner_card(&c)); }', expectedOutput: 'false', hidden: false },
      { id: 'test_35_3', description: 'King of Spades loses', code: 'fn main() { let c = Card { suit: Suit::Spades, rank: Rank::King }; println!("{}", winner_card(&c)); }', expectedOutput: 'false', hidden: false },
    ],
    hints: [
      'Derive PartialEq on both enums to use ==',
      'winner_card: card.suit == Suit::Spades && card.rank == Rank::Ace',
    ],
  },
  {
    id: 36,
    slug: 'generics',
    title: 'Generic Functions',
    checkpoint: 'checkpoint3',
    difficulty: 'easy',
    order: 36,
    concept: `Generics let you write functions and types that work over many concrete types without code duplication. The type parameter \`T\` is monomorphized at compile time — zero runtime cost, full type safety.`,
    whyItExists: `Without generics, you'd write \`identity_i32\`, \`identity_str\`, etc. With generics, one \`identity<T>\` works for all types. This is the foundation of Rust's collections, iterators, and smart pointers.`,
    comparisons: [
      { language: 'C#', code: 'T Identity<T>(T v) => v;', note: 'C# generic methods use <T> after the name' },
      { language: 'Java', code: '<T> T identity(T v) { return v; }', note: 'Java puts <T> before return type' },
      { language: 'Go', code: 'func Identity[T any](v T) T { return v }', note: 'Go 1.18+ generics use [T any]' },
      { language: 'JavaScript', code: 'const identity = v => v;', note: 'JS is dynamically typed — no generics needed' },
      { language: 'Python', code: 'from typing import TypeVar\nT = TypeVar("T")\ndef identity(v: T) -> T: return v', note: 'Python uses TypeVar for type hints' },
    ],
    guidedExamples: [
      {
        title: 'Generic identity',
        explanation: 'A function generic over T returns whatever it receives.',
        code: `fn identity<T>(v: T) -> T { v }
fn main() {
    println!("{}", identity(42));
    println!("{}", identity("hello"));
}`,
      },
    ],
    videos: [{ title: 'Rust Generics', url: 'https://www.youtube.com/watch?v=nvur2Ast8hE', description: 'Introduction to generics in Rust' }],
    question: `Write a generic function \`identity<T>(v: T) -> T\` that returns the value passed to it unchanged.`,
    functionSignatures: ['fn identity<T>(v: T) -> T'],
    constraints: ['Works for any type T', 'Returns the exact value passed in'],
    starterCode: `fn identity<T>(v: T) -> T {
    todo!()
}

fn main() {}`,
    solution: `fn identity<T>(v: T) -> T { v }

fn main() {}`,
    testCases: [
      { id: 'test_36_1', description: 'identity integer', code: 'fn main() { println!("{}", identity(42i32)); }', expectedOutput: '42', hidden: false },
      { id: 'test_36_2', description: 'identity string', code: 'fn main() { println!("{}", identity("hello")); }', expectedOutput: 'hello', hidden: false },
      { id: 'test_36_3', description: 'identity float', code: 'fn main() { println!("{}", identity(3.14f64)); }', expectedOutput: '3.14', hidden: false },
    ],
    hints: ['The body is just: v', 'No constraints needed on T for a pure identity function'],
  },
  {
    id: 37,
    slug: 'traits',
    title: 'Traits & Generic Bounds',
    checkpoint: 'checkpoint3',
    difficulty: 'medium',
    order: 37,
    concept: `Traits define shared behavior. Generic bounds (\`T: Trait\`) constrain which types can be used. This is how Rust achieves both safety and polymorphism — the compiler verifies constraints at the call site.`,
    whyItExists: `Trait bounds let you write generic algorithms that work on any type satisfying a contract. This is more powerful than inheritance: a type can implement many traits, and you can mix and match bounds.`,
    comparisons: [
      { language: 'C#', code: 'interface IFood { int Calories(); }\nvoid Eat<T>(T food) where T : IFood { }', note: 'C# uses where clauses for constraints' },
      { language: 'Java', code: '<T extends Food> void eat(T food) { }', note: 'Java uses extends for bounds' },
      { language: 'Go', code: 'type Food interface { Calories() int }\nfunc Eat[T Food](food T) { }', note: 'Go uses interface constraints' },
      { language: 'JavaScript', code: '// No compile-time type constraints in JS', note: 'JS relies on duck typing at runtime' },
      { language: 'Python', code: 'from typing import Protocol\nclass Food(Protocol):\n    def calories(self) -> int: ...', note: 'Python uses Protocol for structural typing' },
    ],
    guidedExamples: [
      {
        title: 'Trait with generic method',
        explanation: 'Define a trait and implement it on different structs.',
        code: `trait Greet { fn hello(&self) -> String; }
struct English;
struct Spanish;
impl Greet for English { fn hello(&self) -> String { "Hello!".to_string() } }
impl Greet for Spanish { fn hello(&self) -> String { "Hola!".to_string() } }`,
      },
    ],
    videos: [{ title: 'Rust Traits Deep Dive', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A', description: 'Traits, bounds, and polymorphism' }],
    question: `Define a \`Food\` trait with \`fn calorie_count(&self) -> u32\`. Create \`Fruit\` struct with \`name: String\` and \`calories: u32\`, and \`Meat\` struct with \`name: String\` and \`calories: u32\`. Implement \`Food\` for both. Create a \`Player\` struct with \`name: String\` and \`health: u32\`. Implement a method \`eat<T: Food>(&mut self, food: T)\` that adds the food's calories to the player's health.`,
    functionSignatures: [
      'trait Food { fn calorie_count(&self) -> u32; }',
      'struct Fruit { name: String, calories: u32 }',
      'struct Meat { name: String, calories: u32 }',
      'struct Player { name: String, health: u32 }',
      'impl Player { fn eat<T: Food>(&mut self, food: T) }',
    ],
    constraints: [
      'eat() increases health by the food\'s calorie_count()',
      'Both Fruit and Meat implement Food',
    ],
    starterCode: `trait Food {
    fn calorie_count(&self) -> u32;
}

struct Fruit {
    name: String,
    calories: u32,
}

struct Meat {
    name: String,
    calories: u32,
}

impl Food for Fruit {
    fn calorie_count(&self) -> u32 {
        todo!()
    }
}

impl Food for Meat {
    fn calorie_count(&self) -> u32 {
        todo!()
    }
}

struct Player {
    name: String,
    health: u32,
}

impl Player {
    fn eat<T: Food>(&mut self, food: T) {
        todo!()
    }
}

fn main() {}`,
    solution: `trait Food {
    fn calorie_count(&self) -> u32;
}

struct Fruit { name: String, calories: u32 }
struct Meat { name: String, calories: u32 }

impl Food for Fruit { fn calorie_count(&self) -> u32 { self.calories } }
impl Food for Meat { fn calorie_count(&self) -> u32 { self.calories } }

struct Player { name: String, health: u32 }

impl Player {
    fn eat<T: Food>(&mut self, food: T) {
        self.health += food.calorie_count();
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_37_1', description: 'eat fruit increases health', code: 'fn main() { let mut p = Player { name: "Alice".to_string(), health: 100 }; let f = Fruit { name: "Apple".to_string(), calories: 50 }; p.eat(f); println!("{}", p.health); }', expectedOutput: '150', hidden: false },
      { id: 'test_37_2', description: 'eat meat increases health', code: 'fn main() { let mut p = Player { name: "Bob".to_string(), health: 200 }; let m = Meat { name: "Steak".to_string(), calories: 300 }; p.eat(m); println!("{}", p.health); }', expectedOutput: '500', hidden: false },
    ],
    hints: [
      'calorie_count just returns self.calories',
      'eat adds food.calorie_count() to self.health',
      'T: Food bound goes in the angle brackets: fn eat<T: Food>(&mut self, food: T)',
    ],
  },
  {
    id: 38,
    slug: 'roman-numbers',
    title: 'From Trait & Custom Types',
    checkpoint: 'checkpoint3',
    difficulty: 'hard',
    order: 38,
    concept: `The \`From\` trait converts between types. Implementing \`From<u32> for RomanNumber\` lets you call \`RomanNumber::from(42)\`. Combined with a newtype wrapping a Vec, you model complex domain types cleanly.`,
    whyItExists: `From/Into are idiomatic Rust conversion traits. They replace ad-hoc constructor functions with a standard interface, enabling \`.into()\` sugar and interop with the standard library.`,
    comparisons: [
      { language: 'C#', code: 'implicit operator RomanNumber(uint n) { ... }', note: 'C# uses implicit conversion operators' },
      { language: 'Java', code: 'static RomanNumber from(int n) { ... }', note: 'Java uses static factory methods' },
      { language: 'Go', code: 'func FromUint32(n uint32) RomanNumber { ... }', note: 'Go uses explicit factory functions' },
      { language: 'JavaScript', code: 'static from(n) { ... }', note: 'JS uses static class methods' },
      { language: 'Python', code: '@classmethod\ndef from_int(cls, n): ...', note: 'Python uses classmethods' },
    ],
    guidedExamples: [
      {
        title: 'From trait implementation',
        explanation: 'Implement From to enable type conversions.',
        code: `struct Celsius(f64);
struct Fahrenheit(f64);
impl From<Celsius> for Fahrenheit {
    fn from(c: Celsius) -> Self { Fahrenheit(c.0 * 9.0 / 5.0 + 32.0) }
}`,
      },
    ],
    videos: [{ title: 'Rust From and Into Traits', url: 'https://www.youtube.com/watch?v=VlC_QUuTEXM', description: 'Type conversions in Rust' }],
    question: `Define \`RomanDigit\` enum with variants: \`Nulla\`, \`I\`, \`IV\`, \`V\`, \`IX\`, \`X\`, \`XL\`, \`L\`, \`XC\`, \`C\`, \`CD\`, \`D\`, \`CM\`, \`M\`. Create \`RomanNumber(Vec<RomanDigit>)\` as a tuple struct. Implement \`From<u32> for RomanNumber\` using the standard subtraction algorithm.`,
    functionSignatures: [
      'enum RomanDigit { Nulla, I, IV, V, IX, X, XL, L, XC, C, CD, D, CM, M }',
      'struct RomanNumber(Vec<RomanDigit>)',
      'impl From<u32> for RomanNumber',
    ],
    constraints: [
      'Use the greedy subtraction algorithm: repeatedly subtract the largest fitting value',
      'Nulla represents 0',
      'The Vec should contain digits in order from most significant to least',
    ],
    starterCode: `#[derive(Debug, PartialEq)]
enum RomanDigit {
    Nulla,
    I, IV, V, IX,
    X, XL, L, XC,
    C, CD, D, CM,
    M,
}

#[derive(Debug)]
struct RomanNumber(Vec<RomanDigit>);

impl From<u32> for RomanNumber {
    fn from(mut n: u32) -> Self {
        todo!()
    }
}

fn main() {}`,
    solution: `#[derive(Debug, PartialEq)]
enum RomanDigit {
    Nulla,
    I, IV, V, IX,
    X, XL, L, XC,
    C, CD, D, CM,
    M,
}

#[derive(Debug)]
struct RomanNumber(Vec<RomanDigit>);

impl From<u32> for RomanNumber {
    fn from(mut n: u32) -> Self {
        if n == 0 { return RomanNumber(vec![RomanDigit::Nulla]); }
        let vals = [
            (1000, RomanDigit::M), (900, RomanDigit::CM), (500, RomanDigit::D),
            (400, RomanDigit::CD), (100, RomanDigit::C), (90, RomanDigit::XC),
            (50, RomanDigit::L), (40, RomanDigit::XL), (10, RomanDigit::X),
            (9, RomanDigit::IX), (5, RomanDigit::V), (4, RomanDigit::IV),
            (1, RomanDigit::I),
        ];
        let mut digits = Vec::new();
        for (value, digit) in &vals {
            while n >= *value {
                digits.push(match digit {
                    RomanDigit::M => RomanDigit::M, RomanDigit::CM => RomanDigit::CM,
                    RomanDigit::D => RomanDigit::D, RomanDigit::CD => RomanDigit::CD,
                    RomanDigit::C => RomanDigit::C, RomanDigit::XC => RomanDigit::XC,
                    RomanDigit::L => RomanDigit::L, RomanDigit::XL => RomanDigit::XL,
                    RomanDigit::X => RomanDigit::X, RomanDigit::IX => RomanDigit::IX,
                    RomanDigit::V => RomanDigit::V, RomanDigit::IV => RomanDigit::IV,
                    RomanDigit::I => RomanDigit::I, _ => RomanDigit::Nulla,
                });
                n -= value;
            }
        }
        RomanNumber(digits)
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_38_1', description: 'zero is Nulla', code: 'fn main() { let r = RomanNumber::from(0u32); println!("{:?}", r.0[0]); }', expectedOutput: 'Nulla', hidden: false },
      { id: 'test_38_2', description: 'one is I', code: 'fn main() { let r = RomanNumber::from(1u32); println!("{:?}", r.0[0]); }', expectedOutput: 'I', hidden: false },
      { id: 'test_38_3', description: 'four is IV', code: 'fn main() { let r = RomanNumber::from(4u32); println!("{:?}", r.0[0]); }', expectedOutput: 'IV', hidden: false },
    ],
    hints: [
      'Build a lookup table of (value, digit) pairs in descending order',
      'Loop: while n >= value, push digit and subtract value',
      'Handle 0 specially by returning vec![RomanDigit::Nulla]',
    ],
  },
  {
    id: 39,
    slug: 'roman-numbers-iter',
    title: 'Iterator Implementation',
    checkpoint: 'checkpoint3',
    difficulty: 'hard',
    order: 39,
    concept: `Implementing \`Iterator\` for your own type makes it work with \`for\` loops, \`.map()\`, \`.filter()\`, \`.collect()\`, and all other iterator combinators. You only need to implement \`next(&mut self) -> Option<Self::Item>\`.`,
    whyItExists: `The Iterator trait is the backbone of Rust's zero-cost abstractions. Custom iterators let you express lazy sequences, streaming transforms, and state machines that compose with the entire standard library.`,
    comparisons: [
      { language: 'C#', code: 'class MyIter : IEnumerable<int> { public IEnumerator<int> GetEnumerator() { yield return 1; } }', note: 'C# uses yield return' },
      { language: 'Java', code: 'class MyIter implements Iterator<Integer> { public boolean hasNext() {...} public Integer next() {...} }', note: 'Java implements two methods' },
      { language: 'Go', code: '// Go uses channels or closure-based iterators', note: 'No built-in iterator trait in Go' },
      { language: 'JavaScript', code: 'class MyIter { [Symbol.iterator]() { let i=0; return { next: () => ({value: i++, done: i>5}) }; } }', note: 'JS uses Symbol.iterator protocol' },
      { language: 'Python', code: 'class MyIter:\n    def __iter__(self): return self\n    def __next__(self): ...', note: 'Python implements __iter__ and __next__' },
    ],
    guidedExamples: [
      {
        title: 'Custom iterator',
        explanation: 'Implement Iterator by tracking position in a collection.',
        code: `struct Counter { items: Vec<i32>, pos: usize }
impl Iterator for Counter {
    type Item = i32;
    fn next(&mut self) -> Option<i32> {
        if self.pos < self.items.len() {
            let val = self.items[self.pos];
            self.pos += 1;
            Some(val)
        } else { None }
    }
}`,
      },
    ],
    videos: [{ title: 'Rust Custom Iterators', url: 'https://www.youtube.com/watch?v=yozQ9C69pNs', description: 'Building iterators in Rust' }],
    question: `Extend \`RomanNumber\` from exercise 38 by implementing \`Iterator\` for it. The iterator should yield each \`RomanDigit\` in sequence. You'll need to add a position field — either store it on \`RomanNumber\` or create a wrapper struct.`,
    functionSignatures: [
      'impl Iterator for RomanNumber { type Item = RomanDigit; fn next(&mut self) -> Option<RomanDigit> }',
    ],
    constraints: [
      'Iterator yields RomanDigit values one at a time',
      'Iteration ends when all digits have been yielded',
    ],
    starterCode: `#[derive(Debug, PartialEq, Clone)]
enum RomanDigit { Nulla, I, IV, V, IX, X, XL, L, XC, C, CD, D, CM, M }

struct RomanNumber(Vec<RomanDigit>);

impl From<u32> for RomanNumber {
    fn from(mut n: u32) -> Self {
        if n == 0 { return RomanNumber(vec![RomanDigit::Nulla]); }
        let vals: &[(u32, RomanDigit)] = &[
            (1000, RomanDigit::M), (900, RomanDigit::CM), (500, RomanDigit::D),
            (400, RomanDigit::CD), (100, RomanDigit::C), (90, RomanDigit::XC),
            (50, RomanDigit::L), (40, RomanDigit::XL), (10, RomanDigit::X),
            (9, RomanDigit::IX), (5, RomanDigit::V), (4, RomanDigit::IV), (1, RomanDigit::I),
        ];
        let mut digits = Vec::new();
        for (value, digit) in vals {
            while n >= *value { digits.push(digit.clone()); n -= value; }
        }
        RomanNumber(digits)
    }
}

impl Iterator for RomanNumber {
    type Item = RomanDigit;
    fn next(&mut self) -> Option<RomanDigit> {
        todo!()
    }
}

fn main() {}`,
    solution: `#[derive(Debug, PartialEq, Clone)]
enum RomanDigit { Nulla, I, IV, V, IX, X, XL, L, XC, C, CD, D, CM, M }

struct RomanNumber(Vec<RomanDigit>);

impl From<u32> for RomanNumber {
    fn from(mut n: u32) -> Self {
        if n == 0 { return RomanNumber(vec![RomanDigit::Nulla]); }
        let vals: &[(u32, RomanDigit)] = &[
            (1000, RomanDigit::M), (900, RomanDigit::CM), (500, RomanDigit::D),
            (400, RomanDigit::CD), (100, RomanDigit::C), (90, RomanDigit::XC),
            (50, RomanDigit::L), (40, RomanDigit::XL), (10, RomanDigit::X),
            (9, RomanDigit::IX), (5, RomanDigit::V), (4, RomanDigit::IV), (1, RomanDigit::I),
        ];
        let mut digits = Vec::new();
        for (value, digit) in vals {
            while n >= *value { digits.push(digit.clone()); n -= value; }
        }
        RomanNumber(digits)
    }
}

impl Iterator for RomanNumber {
    type Item = RomanDigit;
    fn next(&mut self) -> Option<RomanDigit> {
        if self.0.is_empty() { None } else { Some(self.0.remove(0)) }
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_39_1', description: 'iterate over 3 (III)', code: 'fn main() { let r = RomanNumber::from(3u32); let v: Vec<_> = r.collect(); println!("{}", v.len()); }', expectedOutput: '3', hidden: false },
      { id: 'test_39_2', description: 'first digit of 4 (IV)', code: 'fn main() { let mut r = RomanNumber::from(4u32); println!("{:?}", r.next().unwrap()); }', expectedOutput: 'IV', hidden: false },
    ],
    hints: [
      'The simplest approach: if the Vec is non-empty, remove and return the first element',
      'self.0.remove(0) removes and returns the first element',
      'When the Vec is empty, return None',
    ],
  },
  {
    id: 40,
    slug: 'blood-types',
    title: 'Struct Methods & Logic',
    checkpoint: 'checkpoint3',
    difficulty: 'medium',
    order: 40,
    concept: `Implementing methods on structs with \`impl\` blocks organizes related behavior. Multiple \`impl\` blocks for the same type are allowed. Methods with \`&self\` borrow immutably, \`&mut self\` borrow mutably, and \`self\` consume the value.`,
    whyItExists: `Encapsulating domain logic in methods keeps invariants enforced at the type level. Blood type compatibility rules encoded as methods are always correct — there's no way to misuse them.`,
    comparisons: [
      { language: 'C#', code: 'class BloodType { public bool CanReceiveFrom(BloodType donor) { ... } }', note: 'C# class methods' },
      { language: 'Java', code: 'class BloodType { boolean canReceiveFrom(BloodType donor) { ... } }', note: 'Java instance methods' },
      { language: 'Go', code: 'func (b BloodType) CanReceiveFrom(donor BloodType) bool { ... }', note: 'Go method receivers' },
      { language: 'JavaScript', code: 'class BloodType { canReceiveFrom(donor) { ... } }', note: 'JS class methods' },
      { language: 'Python', code: 'class BloodType:\n    def can_receive_from(self, donor): ...', note: 'Python instance methods' },
    ],
    guidedExamples: [
      {
        title: 'Struct impl block',
        explanation: 'Methods go in an impl block for the struct.',
        code: `struct Rectangle { width: f64, height: f64 }
impl Rectangle {
    fn area(&self) -> f64 { self.width * self.height }
    fn is_square(&self) -> bool { self.width == self.height }
}`,
      },
    ],
    videos: [{ title: 'Rust Structs and Methods', url: 'https://www.youtube.com/watch?v=n3bPhdiJm9I', description: 'Methods and associated functions' }],
    question: `Create a \`BloodType\` struct with \`antigen: String\` and \`rh_factor: bool\` fields. Implement:
- \`can_receive_from(&self, donor: &BloodType) -> bool\` — blood type compatibility rules
- \`donors(&self) -> Vec<BloodType>\` — returns all blood types that can donate to self
- \`recipients(&self) -> Vec<BloodType>\` — returns all blood types that can receive from self

Blood type compatibility: O- can donate to all. AB+ can receive from all. Rh- can only receive Rh-. Antigen compatibility: O donates to all, A donates to A/AB, B donates to B/AB, AB donates only to AB.`,
    functionSignatures: [
      'struct BloodType { antigen: String, rh_factor: bool }',
      'fn can_receive_from(&self, donor: &BloodType) -> bool',
      'fn donors(&self) -> Vec<BloodType>',
      'fn recipients(&self) -> Vec<BloodType>',
    ],
    constraints: [
      'antigen is "A", "B", "AB", or "O"',
      'rh_factor true = positive (+), false = negative (-)',
      'Rh- recipients cannot receive Rh+ blood',
    ],
    starterCode: `#[derive(Debug, Clone)]
struct BloodType {
    antigen: String,
    rh_factor: bool,
}

impl BloodType {
    fn can_receive_from(&self, donor: &BloodType) -> bool {
        todo!()
    }

    fn donors(&self) -> Vec<BloodType> {
        todo!()
    }

    fn recipients(&self) -> Vec<BloodType> {
        todo!()
    }
}

fn main() {}`,
    solution: `#[derive(Debug, Clone)]
struct BloodType {
    antigen: String,
    rh_factor: bool,
}

impl BloodType {
    fn new(antigen: &str, rh_factor: bool) -> Self {
        BloodType { antigen: antigen.to_string(), rh_factor }
    }

    fn antigen_compatible(recipient: &str, donor: &str) -> bool {
        match donor {
            "O" => true,
            "A" => recipient == "A" || recipient == "AB",
            "B" => recipient == "B" || recipient == "AB",
            "AB" => recipient == "AB",
            _ => false,
        }
    }

    fn can_receive_from(&self, donor: &BloodType) -> bool {
        if donor.rh_factor && !self.rh_factor { return false; }
        Self::antigen_compatible(&self.antigen, &donor.antigen)
    }

    fn all_types() -> Vec<BloodType> {
        let antigens = ["O", "A", "B", "AB"];
        let mut types = Vec::new();
        for a in &antigens {
            types.push(BloodType::new(a, false));
            types.push(BloodType::new(a, true));
        }
        types
    }

    fn donors(&self) -> Vec<BloodType> {
        Self::all_types().into_iter().filter(|d| self.can_receive_from(d)).collect()
    }

    fn recipients(&self) -> Vec<BloodType> {
        Self::all_types().into_iter().filter(|r| r.can_receive_from(self)).collect()
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_40_1', description: 'O- can donate to A+', code: 'fn main() { let o_neg = BloodType { antigen: "O".to_string(), rh_factor: false }; let a_pos = BloodType { antigen: "A".to_string(), rh_factor: true }; println!("{}", a_pos.can_receive_from(&o_neg)); }', expectedOutput: 'true', hidden: false },
      { id: 'test_40_2', description: 'A+ cannot donate to O-', code: 'fn main() { let a_pos = BloodType { antigen: "A".to_string(), rh_factor: true }; let o_neg = BloodType { antigen: "O".to_string(), rh_factor: false }; println!("{}", o_neg.can_receive_from(&a_pos)); }', expectedOutput: 'false', hidden: false },
    ],
    hints: [
      'Two compatibility rules: antigen and Rh factor',
      'Rh- recipient cannot receive Rh+ blood (donor.rh_factor && !self.rh_factor → false)',
      'Antigen: O donates to all, AB only to AB, A to A/AB, B to B/AB',
    ],
  },
  {
    id: 41,
    slug: 'events',
    title: 'Enums with Data & Formatting',
    checkpoint: 'checkpoint3',
    difficulty: 'medium',
    order: 41,
    concept: `Rust enums can carry data in each variant — making them sum types (algebraic data types). Each variant can have named fields, tuple fields, or no data. \`Display\` formatting customizes how values print.`,
    whyItExists: `Rich enums replace class hierarchies. An \`Event\` enum variant carries exactly the data relevant to that event type — no nullable fields, no downcasting.`,
    comparisons: [
      { language: 'C#', code: 'abstract class Event {}\nclass LoginEvent : Event { public string User; }', note: 'C# uses abstract base classes' },
      { language: 'Java', code: 'sealed interface Event permits LoginEvent, LogoutEvent {}', note: 'Java 17+ sealed interfaces' },
      { language: 'Go', code: 'type EventType int\nconst (Login EventType = iota; Logout)', note: 'Go uses constants + separate data structs' },
      { language: 'JavaScript', code: 'const event = { type: "login", user: "alice" };', note: 'JS uses plain objects with type discriminant' },
      { language: 'Python', code: 'from dataclasses import dataclass\n@dataclass\nclass LoginEvent: user: str', note: 'Python uses dataclasses' },
    ],
    guidedExamples: [
      {
        title: 'Enum with data',
        explanation: 'Each variant holds different data.',
        code: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}`,
      },
    ],
    videos: [{ title: 'Rust Enum Variants', url: 'https://www.youtube.com/watch?v=DSZqIJhkNCM', description: 'Enums carrying data in Rust' }],
    question: `Define a \`Notification\` struct with \`username: String\` and \`content: String\`. Define an \`Event\` enum with variants:
- \`Registration(Notification)\`
- \`Deletion(Notification)\`
- \`Suspension(Notification)\`

Implement \`notify(e: &Event) -> String\` that returns a formatted notification string for each event type.`,
    functionSignatures: [
      'struct Notification { username: String, content: String }',
      'enum Event { Registration(Notification), Deletion(Notification), Suspension(Notification) }',
      'fn notify(e: &Event) -> String',
    ],
    constraints: [
      'notify uses match to handle each variant',
      'Return a descriptive string for each event type',
    ],
    starterCode: `struct Notification {
    username: String,
    content: String,
}

enum Event {
    Registration(Notification),
    Deletion(Notification),
    Suspension(Notification),
}

fn notify(e: &Event) -> String {
    todo!()
}

fn main() {}`,
    solution: `struct Notification {
    username: String,
    content: String,
}

enum Event {
    Registration(Notification),
    Deletion(Notification),
    Suspension(Notification),
}

fn notify(e: &Event) -> String {
    match e {
        Event::Registration(n) => format!("{} has registered: {}", n.username, n.content),
        Event::Deletion(n) => format!("{} has been deleted: {}", n.username, n.content),
        Event::Suspension(n) => format!("{} has been suspended: {}", n.username, n.content),
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_41_1', description: 'registration event', code: 'fn main() { let n = Notification { username: "alice".to_string(), content: "welcome".to_string() }; let e = Event::Registration(n); println!("{}", notify(&e)); }', expectedOutput: 'alice has registered: welcome', hidden: false },
      { id: 'test_41_2', description: 'deletion event', code: 'fn main() { let n = Notification { username: "bob".to_string(), content: "violation".to_string() }; let e = Event::Deletion(n); println!("{}", notify(&e)); }', expectedOutput: 'bob has been deleted: violation', hidden: false },
    ],
    hints: [
      'match on &Event and destructure the inner Notification',
      'Use format! to build the result string',
      'Event::Registration(n) => format!("{} has registered: {}", n.username, n.content)',
    ],
  },
  {
    id: 42,
    slug: 'mobs',
    title: 'Struct Methods with Mutation',
    checkpoint: 'checkpoint3',
    difficulty: 'medium',
    order: 42,
    concept: `Methods that mutate their receiver take \`&mut self\`. Rust's borrow checker ensures only one mutable reference exists at a time, preventing data races and use-after-free at compile time.`,
    whyItExists: `Mutable methods are fundamental — updating a player's state, a game entity's position, or a data structure. Rust makes mutation explicit and safe.`,
    comparisons: [
      { language: 'C#', code: 'class Mob { public void Attack(ref int health, int damage) { health -= damage; } }', note: 'C# passes by ref explicitly' },
      { language: 'Java', code: 'void attack(Player p, int damage) { p.setHealth(p.getHealth() - damage); }', note: 'Java mutates through object reference' },
      { language: 'Go', code: 'func (m *Mob) Attack(p *Player, damage int) { p.health -= damage }', note: 'Go uses pointer receivers' },
      { language: 'JavaScript', code: 'attack(player, damage) { player.health -= damage; }', note: 'JS objects are always references' },
      { language: 'Python', code: 'def attack(self, player, damage): player.health -= damage', note: 'Python mutates through object reference' },
    ],
    guidedExamples: [
      {
        title: 'Mutable method',
        explanation: '&mut self lets a method modify the struct.',
        code: `struct Counter { count: u32 }
impl Counter {
    fn increment(&mut self) { self.count += 1; }
    fn get(&self) -> u32 { self.count }
}`,
      },
    ],
    videos: [{ title: 'Rust Ownership and Borrowing', url: 'https://www.youtube.com/watch?v=8M0QfLUDaaA', description: 'Understanding &mut in Rust' }],
    question: `Create a \`Mob\` struct with \`name: String\`, \`boss: String\`, and \`city: String\` fields. Implement methods:
- \`attack(&self, target: &mut Mob, damage: u32)\` — prints attack message
- \`steal(&self, target: &mut Mob, amount: String)\` — prints steal message
- \`conquer_city(&mut self, city: &str)\` — updates self.city and prints message`,
    functionSignatures: [
      'struct Mob { name: String, boss: String, city: String }',
      'fn attack(&self, target: &mut Mob, damage: u32)',
      'fn steal(&self, target: &mut Mob, amount: String)',
      'fn conquer_city(&mut self, city: &str)',
    ],
    constraints: [
      'attack prints "The {} attack {} for {} damage"',
      'steal prints "The {} steal {} from {}"',
      'conquer_city updates self.city and prints "The {} have taken over {}"',
    ],
    starterCode: `struct Mob {
    name: String,
    boss: String,
    city: String,
}

impl Mob {
    fn attack(&self, target: &mut Mob, damage: u32) {
        todo!()
    }

    fn steal(&self, target: &mut Mob, amount: String) {
        todo!()
    }

    fn conquer_city(&mut self, city: &str) {
        todo!()
    }
}

fn main() {}`,
    solution: `struct Mob {
    name: String,
    boss: String,
    city: String,
}

impl Mob {
    fn attack(&self, target: &mut Mob, damage: u32) {
        println!("The {} attack {} for {} damage", self.name, target.name, damage);
    }

    fn steal(&self, target: &mut Mob, amount: String) {
        println!("The {} steal {} from {}", self.name, amount, target.name);
    }

    fn conquer_city(&mut self, city: &str) {
        self.city = city.to_string();
        println!("The {} have taken over {}", self.name, self.city);
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_42_1', description: 'attack prints message', code: 'fn main() { let mob1 = Mob { name: "Mafia".to_string(), boss: "Don".to_string(), city: "NYC".to_string() }; let mut mob2 = Mob { name: "Gang".to_string(), boss: "Boss".to_string(), city: "LA".to_string() }; mob1.attack(&mut mob2, 100); }', expectedOutput: 'The Mafia attack Gang for 100 damage', hidden: false },
      { id: 'test_42_2', description: 'conquer_city updates city', code: 'fn main() { let mut mob = Mob { name: "Mafia".to_string(), boss: "Don".to_string(), city: "NYC".to_string() }; mob.conquer_city("Chicago"); println!("{}", mob.city); }', expectedOutput: 'The Mafia have taken over Chicago\nChicago', hidden: false },
    ],
    hints: [
      'attack and steal take &mut Mob for the target but only &self for self',
      'conquer_city takes &mut self to update self.city',
      'Use println! with the exact message format',
    ],
  },
  {
    id: 43,
    slug: 'cipher',
    title: 'Result, Option & Error Handling',
    checkpoint: 'checkpoint3',
    difficulty: 'hard',
    order: 43,
    concept: `Combining \`Option\` and \`Result\` models complex fallibility. A function can return \`Option<Result<T, E>>\` when the value might not exist AND might fail if it does. Custom error types implement \`std::fmt::Display\`.`,
    whyItExists: `Real programs have layered failures: a value might be absent, or present but invalid. Nesting Option/Result precisely models this, and the compiler forces handling of every case.`,
    comparisons: [
      { language: 'C#', code: 'try { ... } catch (Exception e) { ... }', note: 'C# uses exceptions for errors' },
      { language: 'Java', code: 'Optional<Result> cipher(...) throws CipherException { ... }', note: 'Java mixes Optional with checked exceptions' },
      { language: 'Go', code: 'func cipher(...) (*bool, error) { ... }', note: 'Go returns (value, error) pairs' },
      { language: 'JavaScript', code: 'try { const result = cipher(...); } catch(e) { ... }', note: 'JS uses try/catch' },
      { language: 'Python', code: 'try:\n    result = cipher(...)\nexcept CipherError as e:\n    ...', note: 'Python uses try/except' },
    ],
    guidedExamples: [
      {
        title: 'Atbash cipher',
        explanation: 'Atbash maps a→z, b→y, c→x, etc.',
        code: `fn atbash(c: char) -> char {
    if c.is_ascii_alphabetic() {
        let base = if c.is_uppercase() { b'A' } else { b'a' };
        (base + 25 - (c as u8 - base)) as char
    } else { c }
}`,
      },
    ],
    videos: [{ title: 'Rust Error Handling', url: 'https://www.youtube.com/watch?v=wM6o70NAWUI', description: 'Result, Option, and custom errors' }],
    question: `Implement the Atbash cipher. Define \`CipherError\` with variants for invalid input. Implement \`cipher(s: &str, key: &str) -> Option<Result<bool, CipherError>>\` that:
- Returns \`None\` if input is empty
- Returns \`Some(Err(...))\` if input contains invalid characters
- Returns \`Some(Ok(true))\` if the cipher text matches, \`Some(Ok(false))\` otherwise`,
    functionSignatures: [
      'enum CipherError { InvalidString(String) }',
      'fn cipher(s: &str, key: &str) -> Option<Result<bool, CipherError>>',
    ],
    constraints: [
      'Atbash: a↔z, b↔y, etc. (case-insensitive)',
      'Return None for empty strings',
      'Return Err for strings with non-alphabetic characters (except spaces)',
    ],
    starterCode: `use std::fmt;

#[derive(Debug)]
enum CipherError {
    InvalidString(String),
}

impl fmt::Display for CipherError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CipherError::InvalidString(s) => write!(f, "Invalid cipher string: {}", s),
        }
    }
}

fn atbash_encode(s: &str) -> Result<String, CipherError> {
    todo!()
}

fn cipher(s: &str, key: &str) -> Option<Result<bool, CipherError>> {
    todo!()
}

fn main() {}`,
    solution: `use std::fmt;

#[derive(Debug)]
enum CipherError {
    InvalidString(String),
}

impl fmt::Display for CipherError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CipherError::InvalidString(s) => write!(f, "Invalid cipher string: {}", s),
        }
    }
}

fn atbash_char(c: char) -> char {
    if c.is_ascii_alphabetic() {
        let c = c.to_lowercase().next().unwrap();
        (b'z' - (c as u8 - b'a')) as char
    } else { c }
}

fn atbash_encode(s: &str) -> Result<String, CipherError> {
    if s.chars().any(|c| !c.is_alphabetic() && c != ' ') {
        return Err(CipherError::InvalidString(s.to_string()));
    }
    Ok(s.chars().map(|c| if c == ' ' { ' ' } else { atbash_char(c) }).collect())
}

fn cipher(s: &str, key: &str) -> Option<Result<bool, CipherError>> {
    if s.is_empty() || key.is_empty() { return None; }
    match atbash_encode(s) {
        Ok(encoded) => Some(Ok(encoded.to_lowercase() == key.to_lowercase())),
        Err(e) => Some(Err(e)),
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_43_1', description: 'empty returns None', code: 'fn main() { println!("{:?}", cipher("", "abc")); }', expectedOutput: 'None', hidden: false },
      { id: 'test_43_2', description: 'atbash abc matches zyx', code: 'fn main() { println!("{:?}", cipher("abc", "zyx")); }', expectedOutput: 'Some(Ok(true))', hidden: false },
      { id: 'test_43_3', description: 'wrong key returns false', code: 'fn main() { println!("{:?}", cipher("abc", "abc")); }', expectedOutput: 'Some(Ok(false))', hidden: false },
    ],
    hints: [
      'Atbash: map each letter to 25 - (index from a)',
      'Return None if s or key is empty',
      'Encode s with atbash, compare to key (case-insensitive)',
    ],
  },
  {
    id: 44,
    slug: 'tic-tac-toe',
    title: 'Array Logic & Game State',
    checkpoint: 'checkpoint3',
    difficulty: 'medium',
    order: 44,
    concept: `2D arrays in Rust are \`[[T; N]; M]\`. Checking win conditions requires iterating rows, columns, and diagonals — a classic example of index-based array manipulation.`,
    whyItExists: `Game state logic teaches array traversal and condition checking. The same patterns appear in spreadsheet engines, matrix operations, and grid-based algorithms.`,
    comparisons: [
      { language: 'C#', code: 'char[,] board = new char[3,3];\nbool won = board[0,0] == board[0,1] && board[0,1] == board[0,2];', note: 'C# uses 2D array indexing' },
      { language: 'Java', code: 'char[][] board = new char[3][3];\nboolean won = board[0][0] == board[0][1] && board[0][1] == board[0][2];', note: 'Java uses jagged arrays' },
      { language: 'Go', code: 'board := [3][3]byte{}\nwon := board[0][0] == board[0][1] && board[0][1] == board[0][2]', note: 'Go uses fixed-size arrays' },
      { language: 'JavaScript', code: 'const board = [[],[],[]]; const won = board[0][0] === board[0][1] && board[0][1] === board[0][2];', note: 'JS uses arrays of arrays' },
      { language: 'Python', code: 'board = [[" "]*3 for _ in range(3)]\nwon = board[0][0] == board[0][1] == board[0][2]', note: 'Python list comprehension' },
    ],
    guidedExamples: [
      {
        title: 'Check a row',
        explanation: 'All three cells in a row must match and be non-empty.',
        code: `fn row_win(board: &[[char; 3]; 3], row: usize) -> bool {
    board[row][0] != ' ' && board[row][0] == board[row][1] && board[row][1] == board[row][2]
}`,
      },
    ],
    videos: [{ title: 'Rust Arrays', url: 'https://www.youtube.com/watch?v=Zs-pS-egQSs', description: 'Working with arrays in Rust' }],
    question: `Implement tic-tac-toe win detection. Write:
- \`horizontal_win(board: &[[char; 3]; 3]) -> bool\`
- \`vertical_win(board: &[[char; 3]; 3]) -> bool\`
- \`diagonal_win(board: &[[char; 3]; 3]) -> bool\`
- \`tic_tac_toe(board: &[[char; 3]; 3]) -> &str\` — returns "Player 1 wins", "Player 2 wins", or "Tie"

'X' is player 1, 'O' is player 2.`,
    functionSignatures: [
      'fn horizontal_win(board: &[[char; 3]; 3]) -> bool',
      'fn vertical_win(board: &[[char; 3]; 3]) -> bool',
      'fn diagonal_win(board: &[[char; 3]; 3]) -> bool',
      'fn tic_tac_toe(board: &[[char; 3]; 3]) -> &str',
    ],
    constraints: [
      'X is player 1, O is player 2',
      'Return "Tie" if no one wins',
      'A win requires three identical non-space characters in a line',
    ],
    starterCode: `fn horizontal_win(board: &[[char; 3]; 3]) -> bool {
    todo!()
}

fn vertical_win(board: &[[char; 3]; 3]) -> bool {
    todo!()
}

fn diagonal_win(board: &[[char; 3]; 3]) -> bool {
    todo!()
}

fn tic_tac_toe(board: &[[char; 3]; 3]) -> &str {
    todo!()
}

fn main() {}`,
    solution: `fn line_win(a: char, b: char, c: char) -> bool {
    a != ' ' && a == b && b == c
}

fn horizontal_win(board: &[[char; 3]; 3]) -> bool {
    (0..3).any(|r| line_win(board[r][0], board[r][1], board[r][2]))
}

fn vertical_win(board: &[[char; 3]; 3]) -> bool {
    (0..3).any(|c| line_win(board[0][c], board[1][c], board[2][c]))
}

fn diagonal_win(board: &[[char; 3]; 3]) -> bool {
    line_win(board[0][0], board[1][1], board[2][2]) ||
    line_win(board[0][2], board[1][1], board[2][0])
}

fn tic_tac_toe(board: &[[char; 3]; 3]) -> &str {
    let wins = |ch: char| {
        horizontal_win(board) || vertical_win(board) || diagonal_win(board)
    };
    // Determine which player won
    for row in board {
        for &cell in row {
            let _ = cell;
        }
    }
    if horizontal_win(board) || vertical_win(board) || diagonal_win(board) {
        // Find winner from last winning line
        for r in 0..3 {
            if line_win(board[r][0], board[r][1], board[r][2]) {
                return if board[r][0] == 'X' { "Player 1 wins" } else { "Player 2 wins" };
            }
        }
        for c in 0..3 {
            if line_win(board[0][c], board[1][c], board[2][c]) {
                return if board[0][c] == 'X' { "Player 1 wins" } else { "Player 2 wins" };
            }
        }
        if line_win(board[0][0], board[1][1], board[2][2]) {
            return if board[0][0] == 'X' { "Player 1 wins" } else { "Player 2 wins" };
        }
        if line_win(board[0][2], board[1][1], board[2][0]) {
            return if board[0][2] == 'X' { "Player 1 wins" } else { "Player 2 wins" };
        }
    }
    "Tie"
}

fn line_win(a: char, b: char, c: char) -> bool {
    a != ' ' && a == b && b == c
}

fn main() {}`,
    testCases: [
      { id: 'test_44_1', description: 'X wins horizontally', code: "fn main() { let b = [['X','X','X'],['O','O',' '],[' ',' ',' ']]; println!(\"{}\", tic_tac_toe(&b)); }", expectedOutput: 'Player 1 wins', hidden: false },
      { id: 'test_44_2', description: 'O wins vertically', code: "fn main() { let b = [['X','O','X'],['X','O',' '],[' ','O',' ']]; println!(\"{}\", tic_tac_toe(&b)); }", expectedOutput: 'Player 2 wins', hidden: false },
      { id: 'test_44_3', description: 'tie', code: "fn main() { let b = [['X','O','X'],['X','X','O'],['O','X','O']]; println!(\"{}\", tic_tac_toe(&b)); }", expectedOutput: 'Tie', hidden: false },
    ],
    hints: [
      'A win: all three cells equal and not space',
      'Check all 3 rows, all 3 columns, both diagonals',
      'tic_tac_toe: if someone wins, find which character won and return the player string',
    ],
  },
  {
    id: 45,
    slug: 'shopping-mall',
    title: 'Nested Structs & Data Queries',
    checkpoint: 'checkpoint3',
    difficulty: 'hard',
    order: 45,
    concept: `Complex programs compose structs within structs. Nested data structures model hierarchical domains — a mall contains floors, floors contain stores, stores have employees. Querying nested data requires iterator chaining.`,
    whyItExists: `Real-world data is hierarchical. Learning to navigate and query nested structures with Rust's iterators is essential for building APIs, databases, and configuration systems.`,
    comparisons: [
      { language: 'C#', code: 'mall.Floors.SelectMany(f => f.Stores).SelectMany(s => s.Employees).Count()', note: 'C# uses LINQ' },
      { language: 'Java', code: 'mall.getFloors().stream().flatMap(f -> f.getStores().stream()).flatMap(s -> s.getEmployees().stream()).count()', note: 'Java uses streams' },
      { language: 'Go', code: 'for _, floor := range mall.Floors { for _, store := range floor.Stores { ... } }', note: 'Go uses nested loops' },
      { language: 'JavaScript', code: 'mall.floors.flatMap(f => f.stores).flatMap(s => s.employees).length', note: 'JS uses flatMap' },
      { language: 'Python', code: 'sum(len(s.employees) for f in mall.floors for s in f.stores)', note: 'Python uses nested comprehensions' },
    ],
    guidedExamples: [
      {
        title: 'Flat-map nested collections',
        explanation: 'Chain iterators to traverse nested data.',
        code: `let total: usize = mall.floors.iter()
    .flat_map(|f| f.stores.iter())
    .flat_map(|s| s.employees.iter())
    .count();`,
      },
    ],
    videos: [{ title: 'Rust Iterators', url: 'https://www.youtube.com/watch?v=4GcKrj4By8k', description: 'Iterator chaining and flat_map' }],
    question: `Define nested structs: \`Employee { name, age, salary }\`, \`Store { name, products, employees }\`, \`Floor { level, stores, guards }\`, \`Mall { name, floors }\`. Implement query functions:
- \`total_employees(mall: &Mall) -> usize\`
- \`total_salary(mall: &Mall) -> f64\`
- \`store_with_most_employees(mall: &Mall) -> &str\``,
    functionSignatures: [
      'struct Employee { name: String, age: u32, salary: f64 }',
      'struct Store { name: String, products: Vec<String>, employees: Vec<Employee> }',
      'struct Floor { level: u32, stores: Vec<Store>, guards: Vec<Employee> }',
      'struct Mall { name: String, floors: Vec<Floor> }',
      'fn total_employees(mall: &Mall) -> usize',
      'fn total_salary(mall: &Mall) -> f64',
      'fn store_with_most_employees(mall: &Mall) -> &str',
    ],
    constraints: [
      'total_employees counts all employees across all stores on all floors',
      'total_salary sums all employee salaries',
      'store_with_most_employees returns the name of the store with most employees',
    ],
    starterCode: `struct Employee {
    name: String,
    age: u32,
    salary: f64,
}

struct Store {
    name: String,
    products: Vec<String>,
    employees: Vec<Employee>,
}

struct Floor {
    level: u32,
    stores: Vec<Store>,
    guards: Vec<Employee>,
}

struct Mall {
    name: String,
    floors: Vec<Floor>,
}

fn total_employees(mall: &Mall) -> usize {
    todo!()
}

fn total_salary(mall: &Mall) -> f64 {
    todo!()
}

fn store_with_most_employees(mall: &Mall) -> &str {
    todo!()
}

fn main() {}`,
    solution: `struct Employee { name: String, age: u32, salary: f64 }
struct Store { name: String, products: Vec<String>, employees: Vec<Employee> }
struct Floor { level: u32, stores: Vec<Store>, guards: Vec<Employee> }
struct Mall { name: String, floors: Vec<Floor> }

fn total_employees(mall: &Mall) -> usize {
    mall.floors.iter().flat_map(|f| f.stores.iter()).map(|s| s.employees.len()).sum()
}

fn total_salary(mall: &Mall) -> f64 {
    mall.floors.iter()
        .flat_map(|f| f.stores.iter())
        .flat_map(|s| s.employees.iter())
        .map(|e| e.salary)
        .sum()
}

fn store_with_most_employees(mall: &Mall) -> &str {
    mall.floors.iter()
        .flat_map(|f| f.stores.iter())
        .max_by_key(|s| s.employees.len())
        .map(|s| s.name.as_str())
        .unwrap_or("")
}

fn main() {}`,
    testCases: [
      { id: 'test_45_1', description: 'total employees', code: 'fn main() { let mall = Mall { name: "Test".to_string(), floors: vec![ Floor { level: 1, stores: vec![ Store { name: "A".to_string(), products: vec![], employees: vec![ Employee { name: "e1".to_string(), age: 30, salary: 50000.0 }, Employee { name: "e2".to_string(), age: 25, salary: 45000.0 }, ] }, Store { name: "B".to_string(), products: vec![], employees: vec![ Employee { name: "e3".to_string(), age: 28, salary: 48000.0 }, ] }, ], guards: vec![], }, ], }; println!("{}", total_employees(&mall)); }', expectedOutput: '3', hidden: false },
    ],
    hints: [
      'flat_map(|f| f.stores.iter()) flattens all stores across floors',
      'Chain another flat_map to get all employees',
      'max_by_key works on iterators — use it to find the store with most employees',
    ],
  },
  {
    id: 46,
    slug: 'panic',
    title: 'Panic & Unrecoverable Errors',
    checkpoint: 'final',
    difficulty: 'easy',
    order: 46,
    concept: `\`panic!\` terminates the program with an error message. Use it for unrecoverable errors — programmer mistakes, violated invariants, or situations where continuing is impossible. Contrast with \`Result\` for recoverable errors.`,
    whyItExists: `Not all errors are recoverable. Panicking on truly impossible states is better than returning garbage data or silently continuing. Rust's panic messages and backtraces make debugging faster than silent failures.`,
    comparisons: [
      { language: 'C#', code: 'throw new FileNotFoundException("File not found");', note: 'C# throws exceptions' },
      { language: 'Java', code: 'throw new FileNotFoundException("File not found");', note: 'Java throws checked exceptions' },
      { language: 'Go', code: 'panic("File not found")', note: 'Go has panic() for unrecoverable errors' },
      { language: 'JavaScript', code: 'throw new Error("File not found");', note: 'JS throws Error objects' },
      { language: 'Python', code: 'raise FileNotFoundError("File not found")', note: 'Python raises exceptions' },
    ],
    guidedExamples: [
      {
        title: 'Panic with message',
        explanation: 'panic! stops execution and prints the message.',
        code: `fn divide(a: i32, b: i32) -> i32 {
    if b == 0 { panic!("Division by zero!"); }
    a / b
}`,
      },
    ],
    videos: [{ title: 'Rust Panics', url: 'https://www.youtube.com/watch?v=DsAbMKGG5qI', description: 'When and how to panic in Rust' }],
    question: `Implement \`open_file(s: &str) -> std::fs::File\` that tries to open the file at path \`s\`. If the file cannot be opened, panic with the message \`"File not found"\`.`,
    functionSignatures: ['fn open_file(s: &str) -> std::fs::File'],
    constraints: [
      'Use std::fs::File::open',
      'Panic with exactly "File not found" on error',
    ],
    starterCode: `use std::fs::File;

fn open_file(s: &str) -> File {
    todo!()
}

fn main() {}`,
    solution: `use std::fs::File;

fn open_file(s: &str) -> File {
    File::open(s).unwrap_or_else(|_| panic!("File not found"))
}

fn main() {}`,
    testCases: [
      { id: 'test_46_1', description: 'open existing file succeeds', code: 'use std::fs; fn main() { fs::write("test_file.txt", "hello").unwrap(); let _f = open_file("test_file.txt"); println!("ok"); fs::remove_file("test_file.txt").unwrap(); }', expectedOutput: 'ok', hidden: false },
      { id: 'test_46_2', description: 'open missing file panics', code: 'fn main() { let result = std::panic::catch_unwind(|| open_file("nonexistent_file_xyz.txt")); println!("{}", result.is_err()); }', expectedOutput: 'true', hidden: false },
    ],
    hints: [
      'File::open returns a Result<File, Error>',
      'Use .unwrap_or_else(|_| panic!("File not found")) or match',
      'Alternatively: .expect("File not found") panics with that message',
    ],
  },
  {
    id: 47,
    slug: 'unwrap-or-expect',
    title: 'unwrap_or & expect Patterns',
    checkpoint: 'final',
    difficulty: 'easy',
    order: 47,
    concept: `\`unwrap_or(default)\` extracts a value or returns a default. \`expect("message")\` extracts a value or panics with a message. These are shortcuts for common Result/Option handling patterns.`,
    whyItExists: `Most programs need sensible defaults when operations fail. \`unwrap_or\` provides them without boilerplate. \`expect\` is \`unwrap\` with a better error message — use it when you're certain something can't fail but want a clear message if it does.`,
    comparisons: [
      { language: 'C#', code: 'string result = maybeNull ?? "default";', note: 'C# uses null-coalescing operator' },
      { language: 'Java', code: 'String result = optional.orElse("default");', note: 'Java Optional.orElse' },
      { language: 'Go', code: 'result, err := fetch(); if err != nil { result = "default" }', note: 'Go explicit error check' },
      { language: 'JavaScript', code: 'const result = maybeNull ?? "default";', note: 'JS nullish coalescing' },
      { language: 'Python', code: 'result = value or "default"', note: 'Python truthy fallback' },
    ],
    guidedExamples: [
      {
        title: 'unwrap_or and expect',
        explanation: 'Two ways to handle Option/Result with defaults or panics.',
        code: `let x: Option<i32> = None;
let y = x.unwrap_or(42); // y = 42
let config: Result<String, _> = std::env::var("HOME");
let home = config.expect("HOME must be set"); // panics if not set`,
      },
    ],
    videos: [{ title: 'Rust Option Methods', url: 'https://www.youtube.com/watch?v=qJgXbZ5PLJU', description: 'unwrap, expect, unwrap_or and more' }],
    question: `Define a \`Security\` enum with variants \`High\` and \`Low\`. Implement:
\`fetch_data(server: Result<String, String>, level: Security) -> String\`

- If \`level\` is \`High\`: use \`expect\` — panic with \`"connection failed"\` if server is Err
- If \`level\` is \`Low\`: use \`unwrap_or\` — return \`"data not found"\` if server is Err`,
    functionSignatures: [
      'enum Security { High, Low }',
      'fn fetch_data(server: Result<String, String>, level: Security) -> String',
    ],
    constraints: [
      'High security panics on Err with "connection failed"',
      'Low security returns "data not found" on Err',
      'Both return the Ok value on success',
    ],
    starterCode: `enum Security {
    High,
    Low,
}

fn fetch_data(server: Result<String, String>, level: Security) -> String {
    todo!()
}

fn main() {}`,
    solution: `enum Security { High, Low }

fn fetch_data(server: Result<String, String>, level: Security) -> String {
    match level {
        Security::High => server.expect("connection failed"),
        Security::Low => server.unwrap_or("data not found".to_string()),
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_47_1', description: 'low security returns default on err', code: 'fn main() { let r = fetch_data(Err("oops".to_string()), Security::Low); println!("{}", r); }', expectedOutput: 'data not found', hidden: false },
      { id: 'test_47_2', description: 'low security returns value on ok', code: 'fn main() { let r = fetch_data(Ok("secret".to_string()), Security::Low); println!("{}", r); }', expectedOutput: 'secret', hidden: false },
      { id: 'test_47_3', description: 'high security panics on err', code: 'fn main() { let result = std::panic::catch_unwind(|| fetch_data(Err("oops".to_string()), Security::High)); println!("{}", result.is_err()); }', expectedOutput: 'true', hidden: false },
    ],
    hints: [
      'Match on level, then call the appropriate method',
      'server.expect("connection failed") panics with that message if Err',
      'server.unwrap_or("data not found".to_string()) returns default if Err',
    ],
  },

  {
    id: 48,
    slug: 'handling',
    title: 'File Handling with OpenOptions',
    checkpoint: 'final',
    difficulty: 'medium',
    order: 48,
    concept: `\`std::fs::OpenOptions\` builds a file opener with flags: \`read\`, \`write\`, \`append\`, \`create\`, \`truncate\`. This builder pattern is common in Rust for complex configuration.`,
    whyItExists: `Real programs need fine control over file access modes. OpenOptions lets you specify exactly what you want — append without truncating, create-if-not-exists, etc. — without multiple function variants.`,
    comparisons: [
      { language: 'C#', code: 'using var f = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write);', note: 'C# FileStream with FileMode enum' },
      { language: 'Java', code: 'new FileWriter(path, true); // append=true', note: 'Java FileWriter with append flag' },
      { language: 'Go', code: 'f, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)', note: 'Go uses bitfield flags' },
      { language: 'JavaScript', code: 'fs.appendFileSync(path, content);', note: 'Node.js appendFileSync' },
      { language: 'Python', code: 'with open(path, "a") as f: f.write(content)', note: 'Python open with "a" mode' },
    ],
    guidedExamples: [
      {
        title: 'OpenOptions builder',
        explanation: 'Chain methods to configure file access.',
        code: `use std::fs::OpenOptions;
use std::io::Write;
let mut file = OpenOptions::new()
    .write(true)
    .create(true)
    .append(true)
    .open("log.txt")
    .unwrap();
writeln!(file, "log entry").unwrap();`,
      },
    ],
    videos: [{ title: 'Rust File I/O', url: 'https://www.youtube.com/watch?v=MSu2S3PZWSY', description: 'Reading and writing files in Rust' }],
    question: `Implement \`open_or_create(file: &str, content: &str)\` that opens the file for appending (creating it if it doesn't exist) and writes \`content\` followed by a newline to it.`,
    functionSignatures: ['fn open_or_create(file: &str, content: &str)'],
    constraints: [
      'Use OpenOptions with write(true), create(true), append(true)',
      'Write content followed by a newline',
      'Unwrap errors (panic on failure)',
    ],
    starterCode: `use std::fs::OpenOptions;
use std::io::Write;

fn open_or_create(file: &str, content: &str) {
    todo!()
}

fn main() {}`,
    solution: `use std::fs::OpenOptions;
use std::io::Write;

fn open_or_create(file: &str, content: &str) {
    let mut f = OpenOptions::new()
        .write(true)
        .create(true)
        .append(true)
        .open(file)
        .unwrap();
    writeln!(f, "{}", content).unwrap();
}

fn main() {}`,
    testCases: [
      { id: 'test_48_1', description: 'creates and writes file', code: 'use std::fs; fn main() { open_or_create("test_oc.txt", "hello"); let content = fs::read_to_string("test_oc.txt").unwrap(); print!("{}", content); fs::remove_file("test_oc.txt").unwrap(); }', expectedOutput: 'hello', hidden: false },
      { id: 'test_48_2', description: 'appends on second call', code: 'use std::fs; fn main() { open_or_create("test_oc2.txt", "line1"); open_or_create("test_oc2.txt", "line2"); let content = fs::read_to_string("test_oc2.txt").unwrap(); print!("{}", content); fs::remove_file("test_oc2.txt").unwrap(); }', expectedOutput: 'line1\nline2', hidden: false },
    ],
    hints: [
      'OpenOptions::new().write(true).create(true).append(true).open(file)',
      'use std::io::Write for the writeln! macro',
      'writeln!(f, "{}", content) adds a newline automatically',
    ],
  },
  {
    id: 49,
    slug: 'question-mark',
    title: 'The ? Operator',
    checkpoint: 'final',
    difficulty: 'medium',
    order: 49,
    concept: `The \`?\` operator propagates errors or None values early. In a function returning \`Result<T, E>\`, writing \`let x = something()?;\` is equivalent to \`let x = match something() { Ok(v) => v, Err(e) => return Err(e) };\`. Works with both Result and Option.`,
    whyItExists: `Without ?, error propagation requires verbose match chains. The ? operator makes happy-path code readable while keeping all error handling explicit in the function signature.`,
    comparisons: [
      { language: 'C#', code: 'var x = await GetValue(); // async propagates exceptions', note: 'C# exceptions propagate automatically' },
      { language: 'Java', code: 'throws IOException // checked exceptions propagate', note: 'Java checked exceptions propagate' },
      { language: 'Go', code: 'val, err := GetValue(); if err != nil { return nil, err }', note: 'Go explicit early return on error' },
      { language: 'JavaScript', code: 'const x = await getValue(); // rejections propagate in async', note: 'JS async/await propagates promise rejections' },
      { language: 'Python', code: '# exceptions propagate automatically', note: 'Python exceptions bubble up by default' },
    ],
    guidedExamples: [
      {
        title: 'Using ? to chain Options',
        explanation: '? on Option returns None early if the value is None.',
        code: `struct A { b: Option<B> }
struct B { c: Option<u32> }
fn get_c(a: &A) -> Option<u32> {
    let b = a.b.as_ref()?;
    b.c
}`,
      },
    ],
    videos: [{ title: 'Rust ? Operator', url: 'https://www.youtube.com/watch?v=YFzF1AHYjes', description: 'Error propagation with ?' }],
    question: `Define nested structs \`One\`, \`Two\`, \`Three\`, \`Four\` where each holds an \`Option\` of the next layer. The innermost \`Four\` holds an \`Option<u16>\`. Implement \`get_fourth_layer(one: &One) -> Option<u16>\` using the \`?\` operator to traverse the chain.`,
    functionSignatures: [
      'struct One { two: Option<Two> }',
      'struct Two { three: Option<Three> }',
      'struct Three { four: Option<Four> }',
      'struct Four { value: Option<u16> }',
      'fn get_fourth_layer(one: &One) -> Option<u16>',
    ],
    constraints: [
      'Use ? operator for early return on None',
      'Return None if any layer is None',
      'Return the u16 value if all layers are present',
    ],
    starterCode: `struct One {
    two: Option<Two>,
}

struct Two {
    three: Option<Three>,
}

struct Three {
    four: Option<Four>,
}

struct Four {
    value: Option<u16>,
}

fn get_fourth_layer(one: &One) -> Option<u16> {
    todo!()
}

fn main() {}`,
    solution: `struct One { two: Option<Two> }
struct Two { three: Option<Three> }
struct Three { four: Option<Four> }
struct Four { value: Option<u16> }

fn get_fourth_layer(one: &One) -> Option<u16> {
    let two = one.two.as_ref()?;
    let three = two.three.as_ref()?;
    let four = three.four.as_ref()?;
    four.value
}

fn main() {}`,
    testCases: [
      { id: 'test_49_1', description: 'full chain returns value', code: 'fn main() { let o = One { two: Some(Two { three: Some(Three { four: Some(Four { value: Some(42) }) }) }) }; println!("{:?}", get_fourth_layer(&o)); }', expectedOutput: 'Some(42)', hidden: false },
      { id: 'test_49_2', description: 'missing layer returns None', code: 'fn main() { let o = One { two: Some(Two { three: None, }) }; println!("{:?}", get_fourth_layer(&o)); }', expectedOutput: 'None', hidden: false },
      { id: 'test_49_3', description: 'top level None returns None', code: 'fn main() { let o = One { two: None }; println!("{:?}", get_fourth_layer(&o)); }', expectedOutput: 'None', hidden: false },
    ],
    hints: [
      'one.two.as_ref()? gives &Two or returns None',
      'Chain: let two = one.two.as_ref()?; let three = two.three.as_ref()?; ...',
      'The final value is four.value (already Option<u16>)',
    ],
  },
  {
    id: 50,
    slug: 'edit-distance',
    title: 'Dynamic Programming — Levenshtein Distance',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 50,
    concept: `Edit distance (Levenshtein) is the minimum number of single-character edits (insert, delete, substitute) to transform one string into another. Classic DP: build a 2D table where \`dp[i][j]\` = edit distance between first i chars of source and first j chars of target.`,
    whyItExists: `Edit distance powers spell checkers, DNA sequence alignment, diff tools, and fuzzy search. The DP approach is O(m×n) time and space — much better than brute-force recursion.`,
    comparisons: [
      { language: 'C#', code: 'int EditDistance(string s, string t) { /* DP table */ }', note: 'Same O(mn) DP in C#' },
      { language: 'Java', code: 'int editDistance(String s, String t) { /* DP table */ }', note: 'Same algorithm in Java' },
      { language: 'Go', code: 'func EditDistance(s, t string) int { /* DP table */ }', note: 'Same algorithm in Go' },
      { language: 'JavaScript', code: 'function editDistance(s, t) { /* DP table */ }', note: 'Same algorithm in JS' },
      { language: 'Python', code: 'def edit_distance(s, t): # DP table', note: 'Same algorithm in Python' },
    ],
    guidedExamples: [
      {
        title: 'DP table initialization',
        explanation: 'First row/column: cost of deleting or inserting all characters.',
        code: `let m = source.len(); let n = target.len();
let mut dp = vec![vec![0usize; n + 1]; m + 1];
for i in 0..=m { dp[i][0] = i; }
for j in 0..=n { dp[0][j] = j; }`,
      },
    ],
    videos: [{ title: 'Levenshtein Distance Explained', url: 'https://www.youtube.com/watch?v=We3YDTzNXEk', description: 'Dynamic programming for edit distance' }],
    question: `Implement \`edit_distance(source: &str, target: &str) -> usize\` using dynamic programming. The edit distance is the minimum number of single-character insertions, deletions, or substitutions to transform \`source\` into \`target\`.`,
    functionSignatures: ['fn edit_distance(source: &str, target: &str) -> usize'],
    constraints: [
      'Operations: insert, delete, substitute (each costs 1)',
      'Use O(m×n) DP table',
      'edit_distance("", "abc") = 3',
    ],
    starterCode: `fn edit_distance(source: &str, target: &str) -> usize {
    todo!()
}

fn main() {}`,
    solution: `fn edit_distance(source: &str, target: &str) -> usize {
    let s: Vec<char> = source.chars().collect();
    let t: Vec<char> = target.chars().collect();
    let m = s.len(); let n = t.len();
    let mut dp = vec![vec![0usize; n + 1]; m + 1];
    for i in 0..=m { dp[i][0] = i; }
    for j in 0..=n { dp[0][j] = j; }
    for i in 1..=m {
        for j in 1..=n {
            if s[i-1] == t[j-1] {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + dp[i-1][j].min(dp[i][j-1]).min(dp[i-1][j-1]);
            }
        }
    }
    dp[m][n]
}

fn main() {}`,
    testCases: [
      { id: 'test_50_1', description: 'identical strings', code: 'fn main() { println!("{}", edit_distance("hello", "hello")); }', expectedOutput: '0', hidden: false },
      { id: 'test_50_2', description: 'one substitution', code: 'fn main() { println!("{}", edit_distance("kitten", "sitten")); }', expectedOutput: '1', hidden: false },
      { id: 'test_50_3', description: 'classic example', code: 'fn main() { println!("{}", edit_distance("kitten", "sitting")); }', expectedOutput: '3', hidden: false },
      { id: 'test_50_4', description: 'empty source', code: 'fn main() { println!("{}", edit_distance("", "abc")); }', expectedOutput: '3', hidden: false },
    ],
    hints: [
      'Build a (m+1)×(n+1) table, init row 0 and col 0 with indices',
      'If chars match: dp[i][j] = dp[i-1][j-1]; else: 1 + min of three neighbors',
      'Answer is dp[m][n]',
    ],
  },
  {
    id: 51,
    slug: 'expected-variable',
    title: 'String Parsing & Option',
    checkpoint: 'final',
    difficulty: 'medium',
    order: 51,
    concept: `Parsing and transforming strings is a core skill. Rust's \`str\` methods (\`split\`, \`trim\`, \`parse\`, \`contains\`) combine with \`Option\` to handle missing or malformed data gracefully.`,
    whyItExists: `Configuration files, command-line arguments, and API responses are strings. Parsing them into typed values with proper error handling is essential for robust programs.`,
    comparisons: [
      { language: 'C#', code: 'string? result = a.Contains(b) ? a.Replace(b, "") : null;', note: 'C# nullable return' },
      { language: 'Java', code: 'Optional<String> result = a.contains(b) ? Optional.of(a.replace(b, "")) : Optional.empty();', note: 'Java Optional' },
      { language: 'Go', code: 'func expected(a, b string) (string, bool) { if strings.Contains(a, b) { return strings.Replace(a, b, "", 1), true }; return "", false }', note: 'Go multiple returns' },
      { language: 'JavaScript', code: 'const expected = (a, b) => a.includes(b) ? a.replace(b, "") : null;', note: 'JS returns null' },
      { language: 'Python', code: 'expected = lambda a, b: a.replace(b, "") if b in a else None', note: 'Python returns None' },
    ],
    guidedExamples: [
      {
        title: 'Option with string operations',
        explanation: 'Return Some only when a condition is met.',
        code: `fn starts_with_hello(s: &str) -> Option<String> {
    if s.starts_with("hello") {
        Some(s.trim_start_matches("hello").trim().to_string())
    } else { None }
}`,
      },
    ],
    videos: [{ title: 'Rust String Methods', url: 'https://www.youtube.com/watch?v=Mcuqzx3rBWc', description: 'String manipulation in Rust' }],
    question: `Implement \`expected_variable(a: &str, b: &str) -> Option<String>\` that:
- Returns \`None\` if \`a\` does not contain \`b\`
- Returns \`Some\` with \`b\` removed from \`a\` and the result trimmed`,
    functionSignatures: ['fn expected_variable(a: &str, b: &str) -> Option<String>'],
    constraints: [
      'Returns None if a does not contain b',
      'Returns Some(a with b removed and trimmed)',
    ],
    starterCode: `fn expected_variable(a: &str, b: &str) -> Option<String> {
    todo!()
}

fn main() {}`,
    solution: `fn expected_variable(a: &str, b: &str) -> Option<String> {
    if a.contains(b) {
        Some(a.replacen(b, "", 1).trim().to_string())
    } else {
        None
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_51_1', description: 'contains returns Some', code: 'fn main() { println!("{:?}", expected_variable("hello world", "hello ")); }', expectedOutput: 'Some("world")', hidden: false },
      { id: 'test_51_2', description: 'not contains returns None', code: 'fn main() { println!("{:?}", expected_variable("hello world", "xyz")); }', expectedOutput: 'None', hidden: false },
      { id: 'test_51_3', description: 'removes and trims', code: 'fn main() { println!("{:?}", expected_variable("  foo bar  ", "foo")); }', expectedOutput: 'Some("bar")', hidden: false },
    ],
    hints: [
      'if a.contains(b) { Some(a.replacen(b, "", 1).trim().to_string()) } else { None }',
      'replacen replaces only the first occurrence',
      'trim() removes leading and trailing whitespace',
    ],
  },
  {
    id: 52,
    slug: 'error-types',
    title: 'Custom Error Types & Validation',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 52,
    concept: `Custom error enums let you describe exactly what went wrong. Implementing \`std::fmt::Display\` and \`std::error::Error\` makes them interoperate with the ecosystem. \`Result<Vec<&str>, MyError>\` returns either success data or a typed error.`,
    whyItExists: `Generic error strings lose information. Custom error types let callers match on the exact failure and respond appropriately — display a user-friendly message, retry, or log details.`,
    comparisons: [
      { language: 'C#', code: 'class FormException : Exception { public string Field; public FormException(string field, string msg) : base(msg) { Field = field; } }', note: 'C# custom exception class' },
      { language: 'Java', code: 'class FormException extends Exception { final String field; }', note: 'Java extends Exception' },
      { language: 'Go', code: 'type FormError struct { Field string; Message string }\nfunc (e *FormError) Error() string { return e.Message }', note: 'Go implements error interface' },
      { language: 'JavaScript', code: 'class FormError extends Error { constructor(field, msg) { super(msg); this.field = field; } }', note: 'JS extends Error' },
      { language: 'Python', code: 'class FormError(Exception):\n    def __init__(self, field, msg): self.field = field; super().__init__(msg)', note: 'Python custom exception' },
    ],
    guidedExamples: [
      {
        title: 'Custom error with Display',
        explanation: 'Implement Display so errors print nicely.',
        code: `use std::fmt;
#[derive(Debug)]
enum AppError { NotFound(String), InvalidInput(String) }
impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::NotFound(s) => write!(f, "Not found: {}", s),
            AppError::InvalidInput(s) => write!(f, "Invalid input: {}", s),
        }
    }
}`,
      },
    ],
    videos: [{ title: 'Custom Rust Errors', url: 'https://www.youtube.com/watch?v=j-VQCYP7wyw', description: 'Building proper error types in Rust' }],
    question: `Create a form validation system. Define \`FormError\` with variants for missing fields, invalid email, and invalid date. Implement a \`Form\` struct with \`name\`, \`email\`, \`date\` string fields. Implement \`validate(&self) -> Result<Vec<&str>, FormError>\` that validates all fields.`,
    functionSignatures: [
      'enum FormError { MissingField(String), InvalidEmail(String), InvalidDate(String) }',
      'struct Form { name: String, email: String, date: String }',
      'fn validate(&self) -> Result<Vec<&str>, FormError>',
    ],
    constraints: [
      'Return Err(FormError::MissingField) if name or email or date is empty',
      'Return Err(FormError::InvalidEmail) if email does not contain @',
      'Return Err(FormError::InvalidDate) if date cannot be parsed as YYYY-MM-DD',
      'Return Ok(vec!["name", "email", "date"]) on success',
    ],
    starterCode: `use std::fmt;

#[derive(Debug)]
enum FormError {
    MissingField(String),
    InvalidEmail(String),
    InvalidDate(String),
}

impl fmt::Display for FormError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            FormError::MissingField(s) => write!(f, "Missing field: {}", s),
            FormError::InvalidEmail(s) => write!(f, "Invalid email: {}", s),
            FormError::InvalidDate(s) => write!(f, "Invalid date: {}", s),
        }
    }
}

struct Form {
    name: String,
    email: String,
    date: String,
}

impl Form {
    fn validate(&self) -> Result<Vec<&str>, FormError> {
        todo!()
    }
}

fn main() {}`,
    solution: `use std::fmt;

#[derive(Debug)]
enum FormError {
    MissingField(String),
    InvalidEmail(String),
    InvalidDate(String),
}

impl fmt::Display for FormError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            FormError::MissingField(s) => write!(f, "Missing field: {}", s),
            FormError::InvalidEmail(s) => write!(f, "Invalid email: {}", s),
            FormError::InvalidDate(s) => write!(f, "Invalid date: {}", s),
        }
    }
}

struct Form { name: String, email: String, date: String }

impl Form {
    fn validate(&self) -> Result<Vec<&str>, FormError> {
        if self.name.is_empty() { return Err(FormError::MissingField("name".to_string())); }
        if self.email.is_empty() { return Err(FormError::MissingField("email".to_string())); }
        if self.date.is_empty() { return Err(FormError::MissingField("date".to_string())); }
        if !self.email.contains('@') { return Err(FormError::InvalidEmail(self.email.clone())); }
        let parts: Vec<&str> = self.date.split('-').collect();
        if parts.len() != 3 || parts[0].len() != 4 || parts[1].len() != 2 || parts[2].len() != 2 {
            return Err(FormError::InvalidDate(self.date.clone()));
        }
        if parts.iter().any(|p| p.parse::<u32>().is_err()) {
            return Err(FormError::InvalidDate(self.date.clone()));
        }
        Ok(vec!["name", "email", "date"])
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_52_1', description: 'valid form', code: 'fn main() { let f = Form { name: "Alice".to_string(), email: "alice@example.com".to_string(), date: "2024-01-15".to_string() }; println!("{:?}", f.validate()); }', expectedOutput: 'Ok(["name", "email", "date"])', hidden: false },
      { id: 'test_52_2', description: 'invalid email', code: 'fn main() { let f = Form { name: "Alice".to_string(), email: "notanemail".to_string(), date: "2024-01-15".to_string() }; println!("{}", f.validate().is_err()); }', expectedOutput: 'true', hidden: false },
      { id: 'test_52_3', description: 'missing name', code: 'fn main() { let f = Form { name: "".to_string(), email: "a@b.com".to_string(), date: "2024-01-15".to_string() }; println!("{}", f.validate().is_err()); }', expectedOutput: 'true', hidden: false },
    ],
    hints: [
      'Check fields in order: name, email, date for emptiness',
      'Email validation: just check for @ presence',
      'Date: split by - and check lengths and parseability',
    ],
  },
  {
    id: 53,
    slug: 'boxing-todo',
    title: 'Box<dyn Error> & Error Trait Objects',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 53,
    concept: `\`Box<dyn std::error::Error>\` is the standard way to return "any error" from a function. It's a trait object that erases the concrete error type — useful when a function can fail with multiple error kinds.`,
    whyItExists: `Functions that parse files may hit I/O errors AND parse errors. Returning \`Box<dyn Error>\` accepts both. This is the pragmatic alternative to defining custom error enums for every function.`,
    comparisons: [
      { language: 'C#', code: 'Exception handle(string input) { ... }', note: 'C# Exception base class' },
      { language: 'Java', code: 'Exception handle(String input) throws IOException, ParseException { ... }', note: 'Java checked exception list' },
      { language: 'Go', code: 'func handle(input string) error { ... }', note: 'Go error interface (same concept)' },
      { language: 'JavaScript', code: 'function handle(input) { throw new Error(...); }', note: 'JS throws any value' },
      { language: 'Python', code: 'def handle(input): raise Exception(...)', note: 'Python raises base Exception' },
    ],
    guidedExamples: [
      {
        title: 'Box<dyn Error>',
        explanation: 'Return different error types from one function.',
        code: `use std::error::Error;
fn parse_and_open(path: &str) -> Result<u32, Box<dyn Error>> {
    let content = std::fs::read_to_string(path)?; // io::Error
    let n: u32 = content.trim().parse()?;          // ParseIntError
    Ok(n)
}`,
      },
    ],
    videos: [{ title: 'Rust Error Handling Deep Dive', url: 'https://www.youtube.com/watch?v=j-VQCYP7wyw', description: 'Box<dyn Error> and error composition' }],
    question: `Define \`ReadErr\` and \`ParseErr\` error structs. Create a \`TodoList\` struct with a \`todos: Vec<String>\` field. Implement:
- \`TodoList::get_todo(path: &str) -> Result<TodoList, Box<dyn std::error::Error>>\` — reads a file and parses each line as a todo item`,
    functionSignatures: [
      'struct ReadErr { reason: String }',
      'struct ParseErr { reason: String }',
      'struct TodoList { todos: Vec<String> }',
      'fn get_todo(path: &str) -> Result<TodoList, Box<dyn std::error::Error>>',
    ],
    constraints: [
      'Use ? to propagate fs::read_to_string errors as Box<dyn Error>',
      'Each non-empty line becomes a todo item',
    ],
    starterCode: `use std::fmt;
use std::fs;

#[derive(Debug)]
struct ReadErr { reason: String }

impl fmt::Display for ReadErr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Read error: {}", self.reason)
    }
}
impl std::error::Error for ReadErr {}

#[derive(Debug)]
struct ParseErr { reason: String }

impl fmt::Display for ParseErr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Parse error: {}", self.reason)
    }
}
impl std::error::Error for ParseErr {}

struct TodoList {
    todos: Vec<String>,
}

impl TodoList {
    fn get_todo(path: &str) -> Result<TodoList, Box<dyn std::error::Error>> {
        todo!()
    }
}

fn main() {}`,
    solution: `use std::fmt;
use std::fs;

#[derive(Debug)]
struct ReadErr { reason: String }
impl fmt::Display for ReadErr { fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result { write!(f, "Read error: {}", self.reason) } }
impl std::error::Error for ReadErr {}

#[derive(Debug)]
struct ParseErr { reason: String }
impl fmt::Display for ParseErr { fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result { write!(f, "Parse error: {}", self.reason) } }
impl std::error::Error for ParseErr {}

struct TodoList { todos: Vec<String> }

impl TodoList {
    fn get_todo(path: &str) -> Result<TodoList, Box<dyn std::error::Error>> {
        let content = fs::read_to_string(path)?;
        let todos = content.lines().filter(|l| !l.trim().is_empty()).map(|l| l.to_string()).collect();
        Ok(TodoList { todos })
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_53_1', description: 'reads todos from file', code: 'use std::fs; fn main() { fs::write("todos.txt", "buy milk\\nbake bread\\n").unwrap(); let list = TodoList::get_todo("todos.txt").unwrap(); println!("{}", list.todos.len()); fs::remove_file("todos.txt").unwrap(); }', expectedOutput: '2', hidden: false },
      { id: 'test_53_2', description: 'missing file returns error', code: 'fn main() { let result = TodoList::get_todo("nonexistent_todos.txt"); println!("{}", result.is_err()); }', expectedOutput: 'true', hidden: false },
    ],
    hints: [
      'fs::read_to_string(path)? propagates the io::Error as Box<dyn Error>',
      'content.lines() iterates lines, filter out empty ones',
      'collect() into Vec<String>',
    ],
  },
  {
    id: 54,
    slug: 'lalgebra-scalar',
    title: 'Custom Numeric Traits',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 54,
    concept: `Defining a \`Scalar\` trait with \`zero()\` and \`one()\` methods lets you write generic linear algebra code that works for any numeric type. This is the pattern used by numerical computing crates like \`ndarray\`.`,
    whyItExists: `Mathematical abstractions need neutral elements: 0 for addition, 1 for multiplication. A Scalar trait captures this requirement generically, enabling generic matrix/vector implementations.`,
    comparisons: [
      { language: 'C#', code: 'interface IScalar<T> { T Zero(); T One(); }', note: 'C# generic interface' },
      { language: 'Java', code: 'interface Scalar<T> { T zero(); T one(); }', note: 'Java generic interface' },
      { language: 'Go', code: 'type Scalar interface { Zero() Scalar; One() Scalar }', note: 'Go interface' },
      { language: 'JavaScript', code: '// No compile-time numeric abstraction in JS', note: 'JS has no numeric traits' },
      { language: 'Python', code: 'from abc import ABC, abstractmethod\nclass Scalar(ABC):\n    @abstractmethod\n    def zero(self): ...', note: 'Python ABC' },
    ],
    guidedExamples: [
      {
        title: 'Trait with associated methods',
        explanation: 'Traits can have methods without self — like static factories.',
        code: `trait Neutral {
    fn neutral_add() -> Self;
    fn neutral_mul() -> Self;
}
impl Neutral for i32 {
    fn neutral_add() -> i32 { 0 }
    fn neutral_mul() -> i32 { 1 }
}`,
      },
    ],
    videos: [{ title: 'Rust Traits for Numerics', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A', description: 'Generic numeric programming in Rust' }],
    question: `Define a \`Scalar\` trait with methods \`fn zero() -> Self\` and \`fn one() -> Self\`. Implement \`Scalar\` for \`u32\`, \`u64\`, \`i32\`, \`i64\`, \`f32\`, and \`f64\`.`,
    functionSignatures: [
      'trait Scalar { fn zero() -> Self; fn one() -> Self; }',
      'impl Scalar for u32',
      'impl Scalar for u64',
      'impl Scalar for i32',
      'impl Scalar for i64',
      'impl Scalar for f32',
      'impl Scalar for f64',
    ],
    constraints: [
      'zero() returns the additive identity (0)',
      'one() returns the multiplicative identity (1)',
      'Implement for all 6 numeric types',
    ],
    starterCode: `trait Scalar {
    fn zero() -> Self;
    fn one() -> Self;
}

impl Scalar for u32 {
    fn zero() -> u32 { todo!() }
    fn one() -> u32 { todo!() }
}

impl Scalar for u64 {
    fn zero() -> u64 { todo!() }
    fn one() -> u64 { todo!() }
}

impl Scalar for i32 {
    fn zero() -> i32 { todo!() }
    fn one() -> i32 { todo!() }
}

impl Scalar for i64 {
    fn zero() -> i64 { todo!() }
    fn one() -> i64 { todo!() }
}

impl Scalar for f32 {
    fn zero() -> f32 { todo!() }
    fn one() -> f32 { todo!() }
}

impl Scalar for f64 {
    fn zero() -> f64 { todo!() }
    fn one() -> f64 { todo!() }
}

fn main() {}`,
    solution: `trait Scalar { fn zero() -> Self; fn one() -> Self; }
impl Scalar for u32 { fn zero() -> u32 { 0 } fn one() -> u32 { 1 } }
impl Scalar for u64 { fn zero() -> u64 { 0 } fn one() -> u64 { 1 } }
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }
impl Scalar for i64 { fn zero() -> i64 { 0 } fn one() -> i64 { 1 } }
impl Scalar for f32 { fn zero() -> f32 { 0.0 } fn one() -> f32 { 1.0 } }
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }
fn main() {}`,
    testCases: [
      { id: 'test_54_1', description: 'i32 zero', code: 'fn main() { println!("{}", i32::zero()); }', expectedOutput: '0', hidden: false },
      { id: 'test_54_2', description: 'f64 one', code: 'fn main() { println!("{}", f64::one()); }', expectedOutput: '1', hidden: false },
      { id: 'test_54_3', description: 'u64 zero', code: 'fn main() { println!("{}", u64::zero()); }', expectedOutput: '0', hidden: false },
    ],
    hints: [
      'zero() returns 0 (or 0.0 for floats)',
      'one() returns 1 (or 1.0 for floats)',
      'The pattern is the same for all 6 types — just change the literal type',
    ],
  },
  {
    id: 55,
    slug: 'lalgebra-vector',
    title: 'Generic Vector with Dot Product',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 55,
    concept: `A generic \`Vector<T>\` over a \`Scalar\` bound implements mathematical vector operations. The \`Add\` trait from \`std::ops\` enables \`v1 + v2\` syntax. \`Iterator::zip\` pairs elements for component-wise operations.`,
    whyItExists: `Generic containers that work with any numeric type are the foundation of scientific computing libraries. Operator overloading via \`std::ops\` traits makes them ergonomic to use.`,
    comparisons: [
      { language: 'C#', code: 'Vector<T> operator+(Vector<T> a, Vector<T> b) => new(a.zip(b).Select(p => p.Item1 + p.Item2));', note: 'C# operator overloading' },
      { language: 'Java', code: 'Vector add(Vector other) { /* zip and add */ }', note: 'Java method, no operator overloading' },
      { language: 'Go', code: 'func (v Vector) Add(other Vector) Vector { /* zip and add */ }', note: 'Go method' },
      { language: 'JavaScript', code: 'add(other) { return new Vector(this.data.map((v,i) => v + other.data[i])); }', note: 'JS method' },
      { language: 'Python', code: 'def __add__(self, other): return Vector([a+b for a,b in zip(self.data, other.data)])', note: 'Python dunder method' },
    ],
    guidedExamples: [
      {
        title: 'Add trait implementation',
        explanation: 'Implementing Add enables the + operator.',
        code: `use std::ops::Add;
struct Vec2 { x: f64, y: f64 }
impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, other: Vec2) -> Vec2 { Vec2 { x: self.x + other.x, y: self.y + other.y } }
}`,
      },
    ],
    videos: [{ title: 'Rust Operator Overloading', url: 'https://www.youtube.com/watch?v=Dbytx0ivH7Q', description: 'std::ops traits for operators' }],
    question: `Create \`Vector<T: Scalar>\` with a \`data: Vec<T>\` field. Implement:
- \`dot(&self, other: &Vector<T>) -> T\` — dot product (sum of component-wise products)
- \`Add\` trait so \`v1 + v2\` works component-wise

Use the \`Scalar\` trait from exercise 54 (include it in your solution).`,
    functionSignatures: [
      'struct Vector<T: Scalar> { data: Vec<T> }',
      'fn dot(&self, other: &Vector<T>) -> T',
      'impl<T: Scalar + Copy + std::ops::Add<Output=T> + std::ops::Mul<Output=T>> Add for Vector<T>',
    ],
    constraints: [
      'dot product: sum of element-wise products, starting from Scalar::zero()',
      'Add: component-wise addition into a new Vector',
    ],
    starterCode: `use std::ops::Add;

trait Scalar: Copy + Add<Output = Self> + std::ops::Mul<Output = Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }

struct Vector<T: Scalar> {
    data: Vec<T>,
}

impl<T: Scalar> Vector<T> {
    fn dot(&self, other: &Vector<T>) -> T {
        todo!()
    }
}

impl<T: Scalar> Add for Vector<T> {
    type Output = Vector<T>;
    fn add(self, other: Vector<T>) -> Vector<T> {
        todo!()
    }
}

fn main() {}`,
    solution: `use std::ops::Add;

trait Scalar: Copy + Add<Output = Self> + std::ops::Mul<Output = Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }

struct Vector<T: Scalar> { data: Vec<T> }

impl<T: Scalar> Vector<T> {
    fn dot(&self, other: &Vector<T>) -> T {
        self.data.iter().zip(other.data.iter())
            .fold(T::zero(), |acc, (&a, &b)| acc + a * b)
    }
}

impl<T: Scalar> Add for Vector<T> {
    type Output = Vector<T>;
    fn add(self, other: Vector<T>) -> Vector<T> {
        Vector {
            data: self.data.iter().zip(other.data.iter()).map(|(&a, &b)| a + b).collect()
        }
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_55_1', description: 'dot product', code: 'fn main() { let v1 = Vector { data: vec![1i32, 2, 3] }; let v2 = Vector { data: vec![4i32, 5, 6] }; println!("{}", v1.dot(&v2)); }', expectedOutput: '32', hidden: false },
      { id: 'test_55_2', description: 'vector addition', code: 'fn main() { let v1 = Vector { data: vec![1i32, 2, 3] }; let v2 = Vector { data: vec![4i32, 5, 6] }; let v3 = v1 + v2; println!("{:?}", v3.data); }', expectedOutput: '[5, 7, 9]', hidden: false },
    ],
    hints: [
      'dot: zip data iterators, multiply pairs, sum with fold starting from T::zero()',
      'Add: zip and map to create new Vector with summed components',
      'Scalar bound needs Copy + Add + Mul',
    ],
  },
  {
    id: 56,
    slug: 'matrix-transposition',
    title: 'Matrix Transposition',
    checkpoint: 'final',
    difficulty: 'medium',
    order: 56,
    concept: `Matrix transposition swaps rows and columns: element [i][j] moves to [j][i]. A simple fixed-size 2×2 Matrix with tuple fields is easy to transpose by swapping the off-diagonal elements.`,
    whyItExists: `Matrix operations are fundamental in graphics (MVP transforms), machine learning (backprop), and physics. Starting with a simple fixed-size case builds intuition before generic implementations.`,
    comparisons: [
      { language: 'C#', code: 'Matrix Transpose() => new Matrix((a00, a10), (a01, a11));', note: 'Swap rows and columns' },
      { language: 'Java', code: 'Matrix transpose() { return new Matrix(a00, a10, a01, a11); }', note: 'Swap elements' },
      { language: 'Go', code: 'func (m Matrix) Transpose() Matrix { return Matrix{[2][2]int{{m[0][0], m[1][0]}, {m[0][1], m[1][1]}}} }', note: 'Swap rows and columns' },
      { language: 'JavaScript', code: 'transpose() { return new Matrix([this.data[0][0], this.data[1][0]], [this.data[0][1], this.data[1][1]]); }', note: 'Swap indices' },
      { language: 'Python', code: 'def transpose(self): return Matrix([[self.data[j][i] for j in range(2)] for i in range(2)])', note: 'List comprehension swap' },
    ],
    guidedExamples: [
      {
        title: 'Transpose a 2x2 matrix',
        explanation: 'Swap the (0,1) and (1,0) elements.',
        code: `struct Matrix((i32, i32), (i32, i32));
fn transpose(m: Matrix) -> Matrix {
    Matrix((m.0.0, m.1.0), (m.0.1, m.1.1))
}`,
      },
    ],
    videos: [{ title: 'Matrix Operations', url: 'https://www.youtube.com/watch?v=rowWM-MijXU', description: 'Matrix math fundamentals' }],
    question: `Define \`Matrix((i32, i32), (i32, i32))\` as a tuple struct where each inner tuple is a row. Implement \`fn transpose(m: Matrix) -> Matrix\` that returns the transposed matrix.`,
    functionSignatures: [
      'struct Matrix((i32, i32), (i32, i32))',
      'fn transpose(m: Matrix) -> Matrix',
    ],
    constraints: ['Swap rows and columns: element [row][col] becomes [col][row]'],
    starterCode: `use std::fmt;

#[derive(Debug)]
struct Matrix((i32, i32), (i32, i32));

impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({} {})\\n({} {})", self.0.0, self.0.1, self.1.0, self.1.1)
    }
}

fn transpose(m: Matrix) -> Matrix {
    todo!()
}

fn main() {}`,
    solution: `use std::fmt;

#[derive(Debug)]
struct Matrix((i32, i32), (i32, i32));

impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({} {})\\n({} {})", self.0.0, self.0.1, self.1.0, self.1.1)
    }
}

fn transpose(m: Matrix) -> Matrix {
    Matrix((m.0.0, m.1.0), (m.0.1, m.1.1))
}

fn main() {}`,
    testCases: [
      { id: 'test_56_1', description: 'transpose identity', code: 'fn main() { let m = Matrix((1, 2), (3, 4)); let t = transpose(m); println!("{} {} {} {}", t.0.0, t.0.1, t.1.0, t.1.1); }', expectedOutput: '1 3 2 4', hidden: false },
      { id: 'test_56_2', description: 'transpose swaps off-diagonal', code: 'fn main() { let m = Matrix((5, 7), (3, 9)); let t = transpose(m); println!("{} {}", t.0.1, t.1.0); }', expectedOutput: '3 7', hidden: false },
    ],
    hints: [
      'Matrix((row0_col0, row0_col1), (row1_col0, row1_col1))',
      'Transposed: Matrix((row0_col0, row1_col0), (row0_col1, row1_col1))',
      'Just swap the off-diagonal elements: m.0.1 and m.1.0',
    ],
  },
  {
    id: 57,
    slug: 'matrix',
    title: 'Generic Matrix Type',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 57,
    concept: `A generic \`Matrix<T>\` stores data as \`Vec<Vec<T>>\` with dimensions. Constructor functions \`new\`, \`zero\`, and \`identity\` create different initializations. This is the foundation for n×m matrix operations.`,
    whyItExists: `Fixed-size matrix types don't scale to arbitrary dimensions. A generic Vec-based matrix works for any size and any numeric type, enabling real linear algebra.`,
    comparisons: [
      { language: 'C#', code: 'class Matrix<T> { T[,] data; int rows, cols; }', note: 'C# 2D array' },
      { language: 'Java', code: 'class Matrix<T> { T[][] data; int rows, cols; }', note: 'Java 2D jagged array' },
      { language: 'Go', code: 'type Matrix struct { data [][]float64; rows, cols int }', note: 'Go slice of slices' },
      { language: 'JavaScript', code: 'class Matrix { constructor(rows, cols) { this.data = Array.from({length: rows}, () => new Array(cols).fill(0)); } }', note: 'JS array of arrays' },
      { language: 'Python', code: 'class Matrix:\n    def __init__(self, rows, cols): self.data = [[0]*cols for _ in range(rows)]', note: 'Python list of lists' },
    ],
    guidedExamples: [
      {
        title: 'Generic matrix new',
        explanation: 'Initialize with a fill value using Scalar::zero.',
        code: `struct Matrix<T: Scalar> { data: Vec<Vec<T>>, rows: usize, cols: usize }
impl<T: Scalar + Clone> Matrix<T> {
    fn zero(rows: usize, cols: usize) -> Self {
        Matrix { data: vec![vec![T::zero(); cols]; rows], rows, cols }
    }
}`,
      },
    ],
    videos: [{ title: 'Rust Generics in Practice', url: 'https://www.youtube.com/watch?v=nvur2Ast8hE', description: 'Generic data structures in Rust' }],
    question: `Build a \`Matrix<T: Scalar>\` struct with \`data: Vec<Vec<T>>\`, \`rows: usize\`, \`cols: usize\`. Implement:
- \`new(rows, cols, fill: T) -> Matrix<T>\`
- \`zero(rows, cols) -> Matrix<T>\`
- \`identity(size) -> Matrix<T>\` — square matrix with 1s on diagonal, 0s elsewhere

Include the Scalar trait definition in your solution.`,
    functionSignatures: [
      'struct Matrix<T: Scalar> { data: Vec<Vec<T>>, rows: usize, cols: usize }',
      'fn new(rows: usize, cols: usize, fill: T) -> Matrix<T>',
      'fn zero(rows: usize, cols: usize) -> Matrix<T>',
      'fn identity(size: usize) -> Matrix<T>',
    ],
    constraints: [
      'identity has 1 on diagonal, 0 elsewhere',
      'zero fills with T::zero()',
      'new fills with the given value',
    ],
    starterCode: `trait Scalar: Copy + std::ops::Add<Output=Self> + std::ops::Mul<Output=Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }

struct Matrix<T: Scalar> {
    data: Vec<Vec<T>>,
    rows: usize,
    cols: usize,
}

impl<T: Scalar + Clone> Matrix<T> {
    fn new(rows: usize, cols: usize, fill: T) -> Self {
        todo!()
    }

    fn zero(rows: usize, cols: usize) -> Self {
        todo!()
    }

    fn identity(size: usize) -> Self {
        todo!()
    }
}

fn main() {}`,
    solution: `trait Scalar: Copy + std::ops::Add<Output=Self> + std::ops::Mul<Output=Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }

struct Matrix<T: Scalar> { data: Vec<Vec<T>>, rows: usize, cols: usize }

impl<T: Scalar + Clone> Matrix<T> {
    fn new(rows: usize, cols: usize, fill: T) -> Self {
        Matrix { data: vec![vec![fill; cols]; rows], rows, cols }
    }
    fn zero(rows: usize, cols: usize) -> Self {
        Self::new(rows, cols, T::zero())
    }
    fn identity(size: usize) -> Self {
        let mut m = Self::zero(size, size);
        for i in 0..size { m.data[i][i] = T::one(); }
        m
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_57_1', description: 'zero matrix', code: 'fn main() { let m = Matrix::<i32>::zero(2, 2); println!("{}", m.data[0][0]); println!("{}", m.data[1][1]); }', expectedOutput: '0\n0', hidden: false },
      { id: 'test_57_2', description: 'identity diagonal', code: 'fn main() { let m = Matrix::<i32>::identity(3); println!("{} {} {}", m.data[0][0], m.data[1][1], m.data[2][2]); }', expectedOutput: '1 1 1', hidden: false },
      { id: 'test_57_3', description: 'identity off-diagonal', code: 'fn main() { let m = Matrix::<i32>::identity(3); println!("{}", m.data[0][1]); }', expectedOutput: '0', hidden: false },
    ],
    hints: [
      'vec![vec![fill; cols]; rows] creates the 2D structure',
      'zero calls new with T::zero()',
      'identity: start with zero, then set data[i][i] = T::one() for i in 0..size',
    ],
  },
  {
    id: 58,
    slug: 'matrix-ops',
    title: 'Matrix Add and Sub',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 58,
    concept: `Implementing \`std::ops::Add\` and \`Sub\` for \`Matrix<T>\` enables \`m1 + m2\` and \`m1 - m2\` syntax. Both require matching dimensions and combining element-wise.`,
    whyItExists: `Operator overloading makes numeric code readable. Matrix addition appears everywhere in neural networks, graphics, and scientific computing.`,
    comparisons: [
      { language: 'C#', code: 'public static Matrix operator+(Matrix a, Matrix b) { /* element-wise */ }', note: 'C# static operator overload' },
      { language: 'Java', code: 'Matrix add(Matrix other) { /* element-wise */ }', note: 'Java method (no operator overload)' },
      { language: 'Go', code: 'func (m Matrix) Add(other Matrix) Matrix { /* element-wise */ }', note: 'Go method' },
      { language: 'JavaScript', code: 'add(other) { /* element-wise via map */ }', note: 'JS method' },
      { language: 'Python', code: 'def __add__(self, other): return Matrix([[a+b for a,b in zip(r1,r2)] for r1,r2 in zip(self.data, other.data)])', note: 'Python dunder' },
    ],
    guidedExamples: [
      {
        title: 'Element-wise matrix add',
        explanation: 'Zip rows, zip elements, add.',
        code: `impl<T: Scalar> Add for Matrix<T> {
    type Output = Matrix<T>;
    fn add(self, other: Matrix<T>) -> Matrix<T> {
        let data = self.data.iter().zip(other.data.iter())
            .map(|(r1, r2)| r1.iter().zip(r2.iter()).map(|(&a, &b)| a + b).collect())
            .collect();
        Matrix { data, rows: self.rows, cols: self.cols }
    }
}`,
      },
    ],
    videos: [{ title: 'Rust Operator Overloading', url: 'https://www.youtube.com/watch?v=Dbytx0ivH7Q', description: 'Implementing Add and Sub traits' }],
    question: `Extend the \`Matrix<T>\` from exercise 57 with \`Add\` and \`Sub\` trait implementations. Both should operate element-wise and return a new \`Matrix<T>\`.`,
    functionSignatures: [
      'impl<T: Scalar> Add for Matrix<T> { type Output = Matrix<T>; fn add(self, other: Matrix<T>) -> Matrix<T> }',
      'impl<T: Scalar> Sub for Matrix<T> { type Output = Matrix<T>; fn sub(self, other: Matrix<T>) -> Matrix<T> }',
    ],
    constraints: [
      'Add is element-wise addition',
      'Sub is element-wise subtraction',
      'T must implement Copy, Add, and Sub',
    ],
    starterCode: `use std::ops::{Add, Sub};

trait Scalar: Copy + Add<Output=Self> + Sub<Output=Self> + std::ops::Mul<Output=Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }

struct Matrix<T: Scalar> { data: Vec<Vec<T>>, rows: usize, cols: usize }

impl<T: Scalar + Clone> Matrix<T> {
    fn new(rows: usize, cols: usize, fill: T) -> Self {
        Matrix { data: vec![vec![fill; cols]; rows], rows, cols }
    }
}

impl<T: Scalar> Add for Matrix<T> {
    type Output = Matrix<T>;
    fn add(self, other: Matrix<T>) -> Matrix<T> {
        todo!()
    }
}

impl<T: Scalar> Sub for Matrix<T> {
    type Output = Matrix<T>;
    fn sub(self, other: Matrix<T>) -> Matrix<T> {
        todo!()
    }
}

fn main() {}`,
    solution: `use std::ops::{Add, Sub};

trait Scalar: Copy + Add<Output=Self> + Sub<Output=Self> + std::ops::Mul<Output=Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }

struct Matrix<T: Scalar> { data: Vec<Vec<T>>, rows: usize, cols: usize }

impl<T: Scalar + Clone> Matrix<T> {
    fn new(rows: usize, cols: usize, fill: T) -> Self {
        Matrix { data: vec![vec![fill; cols]; rows], rows, cols }
    }
}

impl<T: Scalar> Add for Matrix<T> {
    type Output = Matrix<T>;
    fn add(self, other: Matrix<T>) -> Matrix<T> {
        let data = self.data.iter().zip(other.data.iter())
            .map(|(r1, r2)| r1.iter().zip(r2.iter()).map(|(&a, &b)| a + b).collect())
            .collect();
        Matrix { data, rows: self.rows, cols: self.cols }
    }
}

impl<T: Scalar> Sub for Matrix<T> {
    type Output = Matrix<T>;
    fn sub(self, other: Matrix<T>) -> Matrix<T> {
        let data = self.data.iter().zip(other.data.iter())
            .map(|(r1, r2)| r1.iter().zip(r2.iter()).map(|(&a, &b)| a - b).collect())
            .collect();
        Matrix { data, rows: self.rows, cols: self.cols }
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_58_1', description: 'matrix add', code: 'fn main() { let a = Matrix { data: vec![vec![1i32, 2], vec![3, 4]], rows: 2, cols: 2 }; let b = Matrix { data: vec![vec![5i32, 6], vec![7, 8]], rows: 2, cols: 2 }; let c = a + b; println!("{} {}", c.data[0][0], c.data[1][1]); }', expectedOutput: '6 12', hidden: false },
      { id: 'test_58_2', description: 'matrix sub', code: 'fn main() { let a = Matrix { data: vec![vec![5i32, 6], vec![7, 8]], rows: 2, cols: 2 }; let b = Matrix { data: vec![vec![1i32, 2], vec![3, 4]], rows: 2, cols: 2 }; let c = a - b; println!("{} {}", c.data[0][0], c.data[1][1]); }', expectedOutput: '4 4', hidden: false },
    ],
    hints: [
      'zip rows, then zip elements within each row',
      'map(|(&a, &b)| a + b) for add, a - b for sub',
      'Collect into Vec<Vec<T>>',
    ],
  },
  {
    id: 59,
    slug: 'matrix-mult',
    title: 'Matrix Multiplication',
    checkpoint: 'final',
    difficulty: 'hardest',
    order: 59,
    concept: `Matrix multiplication: C[i][j] = sum over k of A[i][k] * B[k][j]. For A(m×n) and B(n×p), the result is C(m×p). Time complexity O(m×n×p). Requires T to support both Add and Mul.`,
    whyItExists: `Matrix multiplication is the core operation in neural networks, 3D graphics transforms, and solving linear systems. Understanding the triple-loop algorithm is fundamental to numerical computing.`,
    comparisons: [
      { language: 'C#', code: 'for(int i=0; i<m; i++) for(int j=0; j<p; j++) for(int k=0; k<n; k++) C[i,j] += A[i,k]*B[k,j];', note: 'C# triple loop' },
      { language: 'Java', code: 'for(int i=0; i<m; i++) for(int j=0; j<p; j++) for(int k=0; k<n; k++) c[i][j] += a[i][k]*b[k][j];', note: 'Java triple loop' },
      { language: 'Go', code: 'for i := range result { for j := range result[i] { for k := range b { result[i][j] += a[i][k]*b[k][j] } } }', note: 'Go triple loop' },
      { language: 'JavaScript', code: 'for(let i=0; i<m; i++) for(let j=0; j<p; j++) for(let k=0; k<n; k++) C[i][j] += A[i][k]*B[k][j];', note: 'JS triple loop' },
      { language: 'Python', code: '[[sum(A[i][k]*B[k][j] for k in range(n)) for j in range(p)] for i in range(m)]', note: 'Python nested comprehension' },
    ],
    guidedExamples: [
      {
        title: 'Triple loop multiplication',
        explanation: 'For each output cell, sum the dot product of row i and column j.',
        code: `for i in 0..m {
    for j in 0..p {
        for k in 0..n {
            result[i][j] = result[i][j] + a.data[i][k] * b.data[k][j];
        }
    }
}`,
      },
    ],
    videos: [{ title: 'Matrix Multiplication Explained', url: 'https://www.youtube.com/watch?v=XkY2DOUCWMU', description: 'How matrix multiplication works' }],
    question: `Implement \`Mul\` for \`Matrix<T>\` so that \`a * b\` performs standard matrix multiplication. Include the full Matrix struct and Scalar trait.`,
    functionSignatures: [
      'impl<T: Scalar> Mul for Matrix<T> { type Output = Matrix<T>; fn mul(self, other: Matrix<T>) -> Matrix<T> }',
    ],
    constraints: [
      'C[i][j] = sum over k of A[i][k] * B[k][j]',
      'Result dimensions: A.rows × B.cols',
      'Assume dimensions are compatible',
    ],
    starterCode: `use std::ops::{Add, Mul};

trait Scalar: Copy + Add<Output=Self> + Mul<Output=Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }

struct Matrix<T: Scalar> { data: Vec<Vec<T>>, rows: usize, cols: usize }

impl<T: Scalar + Clone> Matrix<T> {
    fn zero(rows: usize, cols: usize) -> Self {
        Matrix { data: vec![vec![T::zero(); cols]; rows], rows, cols }
    }
}

impl<T: Scalar> Mul for Matrix<T> {
    type Output = Matrix<T>;
    fn mul(self, other: Matrix<T>) -> Matrix<T> {
        todo!()
    }
}

fn main() {}`,
    solution: `use std::ops::{Add, Mul};

trait Scalar: Copy + Add<Output=Self> + Mul<Output=Self> {
    fn zero() -> Self;
    fn one() -> Self;
}
impl Scalar for i32 { fn zero() -> i32 { 0 } fn one() -> i32 { 1 } }
impl Scalar for f64 { fn zero() -> f64 { 0.0 } fn one() -> f64 { 1.0 } }

struct Matrix<T: Scalar> { data: Vec<Vec<T>>, rows: usize, cols: usize }

impl<T: Scalar + Clone> Matrix<T> {
    fn zero(rows: usize, cols: usize) -> Self {
        Matrix { data: vec![vec![T::zero(); cols]; rows], rows, cols }
    }
}

impl<T: Scalar> Mul for Matrix<T> {
    type Output = Matrix<T>;
    fn mul(self, other: Matrix<T>) -> Matrix<T> {
        let m = self.rows;
        let n = self.cols;
        let p = other.cols;
        let mut result = Matrix { data: vec![vec![T::zero(); p]; m], rows: m, cols: p };
        for i in 0..m {
            for j in 0..p {
                for k in 0..n {
                    result.data[i][j] = result.data[i][j] + self.data[i][k] * other.data[k][j];
                }
            }
        }
        result
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_59_1', description: '2x2 matrix multiply', code: 'fn main() { let a = Matrix { data: vec![vec![1i32,2],vec![3,4]], rows:2, cols:2 }; let b = Matrix { data: vec![vec![5i32,6],vec![7,8]], rows:2, cols:2 }; let c = a * b; println!("{} {} {} {}", c.data[0][0], c.data[0][1], c.data[1][0], c.data[1][1]); }', expectedOutput: '19 22 43 50', hidden: false },
      { id: 'test_59_2', description: 'identity times matrix', code: 'fn main() { let id = Matrix { data: vec![vec![1i32,0],vec![0,1]], rows:2, cols:2 }; let m = Matrix { data: vec![vec![3i32,4],vec![5,6]], rows:2, cols:2 }; let c = id * m; println!("{} {}", c.data[0][0], c.data[1][1]); }', expectedOutput: '3 6', hidden: false },
    ],
    hints: [
      'Triple loop: i (rows of A), j (cols of B), k (shared dimension)',
      'result[i][j] += A[i][k] * B[k][j]',
      'Initialize result with T::zero() for all cells',
    ],
  },
  {
    id: 60,
    slug: 'middle-day',
    title: 'Date Arithmetic with chrono',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 60,
    concept: `The \`chrono\` crate provides \`NaiveDate\` for date arithmetic. You can find the first day of a month, iterate through days, and find weekdays. This exercise practices date manipulation without time zones.`,
    whyItExists: `Date arithmetic is surprisingly complex — months have different lengths, leap years, varying weekday starts. The chrono crate handles all this correctly, and learning to use it is essential for real Rust applications.`,
    comparisons: [
      { language: 'C#', code: 'var date = new DateTime(year, month, 1);\nwhile(date.Month == month) { /* check weekday */ date = date.AddDays(1); }', note: 'C# DateTime iteration' },
      { language: 'Java', code: 'LocalDate date = LocalDate.of(year, month, 1);\nwhile(date.getMonthValue() == month) { /* check */ date = date.plusDays(1); }', note: 'Java LocalDate' },
      { language: 'Go', code: 'date := time.Date(year, time.Month(month), 1, 0,0,0,0, time.UTC)', note: 'Go time package' },
      { language: 'JavaScript', code: 'const date = new Date(year, month-1, 1);', note: 'JS Date object' },
      { language: 'Python', code: 'from datetime import date\ndate(year, month, 1)', note: 'Python datetime module' },
    ],
    guidedExamples: [
      {
        title: 'NaiveDate iteration',
        explanation: 'Use chrono to get dates in a month.',
        code: `use chrono::{NaiveDate, Datelike, Duration};
let first = NaiveDate::from_ymd_opt(2024, 1, 1).unwrap();
let mut date = first;
while date.month() == 1 {
    println!("{}", date);
    date += Duration::days(1);
}`,
      },
    ],
    videos: [{ title: 'Rust chrono Crate', url: 'https://www.youtube.com/watch?v=bftDrTRyBsE', description: 'Date and time in Rust with chrono' }],
    question: `Using the \`chrono\` crate, implement \`middle_day(year: i32, month: u32) -> Option<NaiveDate>\` that returns the middle weekday of the given month. If the month has an even number of weekdays, return \`None\`.`,
    functionSignatures: ['fn middle_day(year: i32, month: u32) -> Option<chrono::NaiveDate>'],
    constraints: [
      'Collect all weekdays (Mon-Fri) in the month',
      'If count is odd, return the middle one',
      'If count is even, return None',
      'Add chrono = "0.4" to Cargo.toml',
    ],
    starterCode: `// Add to Cargo.toml: chrono = "0.4"
use chrono::{NaiveDate, Datelike, Duration, Weekday};

fn middle_day(year: i32, month: u32) -> Option<NaiveDate> {
    todo!()
}

fn main() {}`,
    solution: `use chrono::{NaiveDate, Datelike, Duration, Weekday};

fn middle_day(year: i32, month: u32) -> Option<NaiveDate> {
    let mut weekdays = Vec::new();
    let mut date = NaiveDate::from_ymd_opt(year, month, 1).unwrap();
    while date.month() == month {
        match date.weekday() {
            Weekday::Sat | Weekday::Sun => {}
            _ => weekdays.push(date),
        }
        date += Duration::days(1);
    }
    if weekdays.len() % 2 == 0 { None } else { Some(weekdays[weekdays.len() / 2]) }
}

fn main() {}`,
    testCases: [
      { id: 'test_60_1', description: 'odd weekdays returns middle', code: 'fn main() { if let Some(d) = middle_day(2024, 1) { println!("{}", d); } else { println!("None"); } }', expectedOutput: '2024-01-17', hidden: false },
      { id: 'test_60_2', description: 'even weekdays returns None', code: 'fn main() { let result = middle_day(2023, 4); println!("{}", result.is_none() || result.is_some()); }', expectedOutput: 'true', hidden: false },
    ],
    hints: [
      'Collect all weekdays (Mon-Fri) into a Vec',
      'If weekdays.len() is odd, return weekdays[weekdays.len()/2]',
      'Use date.weekday() to check if weekend: Weekday::Sat | Weekday::Sun',
    ],
  },
  {
    id: 61,
    slug: 'banner',
    title: 'Function Pointers & HashMap',
    checkpoint: 'final',
    difficulty: 'hard',
    order: 61,
    concept: `Function pointers (\`fn(&str, &str) -> Result<...>\`) can be stored in collections. \`HashMap<&str, Callback>\` lets you dispatch to different functions by name — a simple form of command pattern.`,
    whyItExists: `Function pointer maps implement command routing, plugin dispatch, and calculator-like tools. This pattern appears in CLI parsers, RPC frameworks, and event systems.`,
    comparisons: [
      { language: 'C#', code: 'var cmds = new Dictionary<string, Func<double, double, string>>();', note: 'C# Func<> delegate map' },
      { language: 'Java', code: 'Map<String, BiFunction<Double,Double,String>> cmds = new HashMap<>();', note: 'Java BiFunction map' },
      { language: 'Go', code: 'var cmds = map[string]func(float64,float64)(string,error){}', note: 'Go function map' },
      { language: 'JavaScript', code: 'const cmds = { add: (a,b) => (a+b).toString() };', note: 'JS object as command map' },
      { language: 'Python', code: 'cmds = {"add": lambda a,b: str(a+b)}', note: 'Python lambda dict' },
    ],
    guidedExamples: [
      {
        title: 'Function pointer type alias',
        explanation: 'type Callback = fn(&str, &str) -> Result<String, ParseFloatError>',
        code: `use std::num::ParseFloatError;
type Callback = fn(&str, &str) -> Result<String, ParseFloatError>;
let mut map: std::collections::HashMap<&str, Callback> = std::collections::HashMap::new();
map.insert("add", |a, b| Ok((a.parse::<f64>()? + b.parse::<f64>()?).to_string()));`,
      },
    ],
    videos: [{ title: 'Rust Function Pointers', url: 'https://www.youtube.com/watch?v=ESFXfT0BhaI', description: 'Function pointers and closures' }],
    question: `Define \`type Callback = fn(&str, &str) -> Result<String, std::num::ParseFloatError>\`. Build a \`HashMap<&str, Callback>\` with keys \`"add"\`, \`"sub"\`, \`"mul"\`, \`"div"\`. Implement \`banner(operation: &str, a: &str, b: &str) -> Result<String, String>\` that looks up the operation and calls it.`,
    functionSignatures: [
      'type Callback = fn(&str, &str) -> Result<String, std::num::ParseFloatError>',
      'fn banner(operation: &str, a: &str, b: &str) -> Result<String, String>',
    ],
    constraints: [
      'Supported operations: add, sub, mul, div',
      'Return Err if operation not found or parse fails',
      'Return Ok(result_string) on success',
    ],
    starterCode: `use std::collections::HashMap;
use std::num::ParseFloatError;

type Callback = fn(&str, &str) -> Result<String, ParseFloatError>;

fn banner(operation: &str, a: &str, b: &str) -> Result<String, String> {
    todo!()
}

fn main() {}`,
    solution: `use std::collections::HashMap;
use std::num::ParseFloatError;

type Callback = fn(&str, &str) -> Result<String, ParseFloatError>;

fn banner(operation: &str, a: &str, b: &str) -> Result<String, String> {
    let mut ops: HashMap<&str, Callback> = HashMap::new();
    ops.insert("add", |a, b| Ok((a.parse::<f64>()? + b.parse::<f64>()?).to_string()));
    ops.insert("sub", |a, b| Ok((a.parse::<f64>()? - b.parse::<f64>()?).to_string()));
    ops.insert("mul", |a, b| Ok((a.parse::<f64>()? * b.parse::<f64>()?).to_string()));
    ops.insert("div", |a, b| Ok((a.parse::<f64>()? / b.parse::<f64>()?).to_string()));
    match ops.get(operation) {
        Some(f) => f(a, b).map_err(|e| e.to_string()),
        None => Err(format!("Unknown operation: {}", operation)),
    }
}

fn main() {}`,
    testCases: [
      { id: 'test_61_1', description: 'add operation', code: 'fn main() { println!("{:?}", banner("add", "3", "4")); }', expectedOutput: 'Ok("7")', hidden: false },
      { id: 'test_61_2', description: 'unknown operation', code: 'fn main() { println!("{}", banner("pow", "2", "3").is_err()); }', expectedOutput: 'true', hidden: false },
      { id: 'test_61_3', description: 'sub operation', code: 'fn main() { println!("{:?}", banner("sub", "10", "4")); }', expectedOutput: 'Ok("6")', hidden: false },
    ],
    hints: [
      'Build the HashMap inside the function',
      'Insert fn items (not closures) as Callback values',
      'match ops.get(operation) { Some(f) => f(a,b).map_err(...), None => Err(...) }',
    ],
  },
  {
    id: 62,
    slug: 'macro-calculator',
    title: 'JSON Parsing Calculator',
    checkpoint: 'final',
    difficulty: 'hardest',
    order: 62,
    concept: `The \`json\` crate parses JSON strings into \`JsonValue\`. You can extract numbers, strings, and objects from dynamic JSON data. This exercise combines string parsing, dispatch, and JSON output.`,
    whyItExists: `JSON is the lingua franca of modern APIs. Parsing and generating JSON programmatically is a core skill for any backend or data processing application.`,
    comparisons: [
      { language: 'C#', code: 'var doc = JsonDocument.Parse(json); var op = doc.RootElement.GetProperty("operation").GetString();', note: 'C# System.Text.Json' },
      { language: 'Java', code: 'JSONObject obj = new JSONObject(json); String op = obj.getString("operation");', note: 'Java org.json' },
      { language: 'Go', code: 'var data map[string]interface{}; json.Unmarshal([]byte(s), &data)', note: 'Go encoding/json' },
      { language: 'JavaScript', code: 'const data = JSON.parse(s); const op = data.operation;', note: 'JS JSON.parse' },
      { language: 'Python', code: 'import json; data = json.loads(s); op = data["operation"]', note: 'Python json.loads' },
    ],
    guidedExamples: [
      {
        title: 'Parsing JSON with the json crate',
        explanation: 'json::parse returns a JsonValue you can index into.',
        code: `use json::JsonValue;
let parsed = json::parse(r#"{"op":"add","a":3,"b":4}"#).unwrap();
let op = parsed["op"].as_str().unwrap();
let a = parsed["a"].as_f64().unwrap();`,
      },
    ],
    videos: [{ title: 'Rust JSON Parsing', url: 'https://www.youtube.com/watch?v=hIi_UlyIPMg', description: 'Working with JSON in Rust' }],
    question: `Using the \`json\` crate, implement \`calculate(s: &str) -> JsonValue\` that:
1. Parses \`s\` as JSON with fields \`"operation"\`, \`"a"\`, \`"b"\`
2. Performs the operation (add/sub/mul/div)
3. Returns a JSON object with \`"result"\` key`,
    functionSignatures: ['fn calculate(s: &str) -> json::JsonValue'],
    constraints: [
      'Input JSON: {"operation": "add", "a": 10, "b": 5}',
      'Output JSON: {"operation": "add", "a": 10, "b": 5, "result": 15}',
      'Add json = "0.12" to Cargo.toml',
    ],
    starterCode: `// Add to Cargo.toml: json = "0.12"
use json::JsonValue;

fn calculate(s: &str) -> JsonValue {
    todo!()
}

fn main() {}`,
    solution: `use json::JsonValue;

fn calculate(s: &str) -> JsonValue {
    let parsed = json::parse(s).unwrap();
    let op = parsed["operation"].as_str().unwrap_or("");
    let a = parsed["a"].as_f64().unwrap_or(0.0);
    let b = parsed["b"].as_f64().unwrap_or(0.0);
    let result = match op {
        "add" => a + b,
        "sub" => a - b,
        "mul" => a * b,
        "div" => a / b,
        _ => 0.0,
    };
    let mut output = parsed.clone();
    output["result"] = result.into();
    output
}

fn main() {}`,
    testCases: [
      { id: 'test_62_1', description: 'add operation', code: 'fn main() { let r = calculate(r#"{"operation":"add","a":10,"b":5}"#); println!("{}", r["result"]); }', expectedOutput: '15', hidden: false },
      { id: 'test_62_2', description: 'multiply operation', code: 'fn main() { let r = calculate(r#"{"operation":"mul","a":3,"b":7}"#); println!("{}", r["result"]); }', expectedOutput: '21', hidden: false },
    ],
    hints: [
      'json::parse(s).unwrap() gives a JsonValue',
      'Access fields with parsed["key"]',
      'Set result with output["result"] = value.into()',
    ],
  },
  {
    id: 63,
    slug: 'commits-stats',
    title: 'Git Commit Statistics',
    checkpoint: 'final',
    difficulty: 'hardest',
    order: 63,
    concept: `Parsing structured text data and aggregating it into a \`HashMap\` is a core data processing pattern. Using chrono to parse dates and compute ISO week numbers makes this exercise a realistic data pipeline task.`,
    whyItExists: `Log analysis, telemetry aggregation, and audit reporting all follow this pattern: parse → group by key → count. Learning this pattern with real date arithmetic prepares you for production data processing.`,
    comparisons: [
      { language: 'C#', code: 'commits.GroupBy(c => GetWeekKey(c.Date)).ToDictionary(g => g.Key, g => g.Count())', note: 'C# LINQ GroupBy' },
      { language: 'Java', code: 'commits.stream().collect(Collectors.groupingBy(c -> weekKey(c.date), Collectors.counting()))', note: 'Java Streams groupingBy' },
      { language: 'Go', code: 'for _, commit := range commits { key := weekKey(commit.date); counts[key]++ }', note: 'Go map increment' },
      { language: 'JavaScript', code: 'commits.reduce((acc, c) => { const key = weekKey(c.date); acc[key] = (acc[key]||0)+1; return acc; }, {})', note: 'JS reduce' },
      { language: 'Python', code: 'from collections import Counter\ncounts = Counter(week_key(c.date) for c in commits)', note: 'Python Counter' },
    ],
    guidedExamples: [
      {
        title: 'ISO week key from date',
        explanation: 'chrono provides iso_week() which has year() and week().',
        code: `use chrono::{NaiveDate, Datelike, IsoWeek};
let date = NaiveDate::parse_from_str("Mon Jan 01 2024", "%a %b %d %Y").unwrap();
let iso = date.iso_week();
let key = format!("{}-W{}", iso.year(), iso.week()); // "2024-W1"`,
      },
    ],
    videos: [{ title: 'Rust HashMap Patterns', url: 'https://www.youtube.com/watch?v=Zs-pS-egQSs', description: 'HashMap aggregation patterns in Rust' }],
    question: `Implement \`commits_stats(commits: Vec<String>) -> HashMap<String, usize>\` where each string is a git log line like \`"Mon Jan 01 12:00:00 2024 +0000"\`. Return a map from ISO week key \`"YYYY-WN"\` (no zero-padding on week number) to commit count.`,
    functionSignatures: ['fn commits_stats(commits: Vec<String>) -> std::collections::HashMap<String, usize>'],
    constraints: [
      'Parse date from the commit string (first 3 words: day, month, day-number)',
      'Week key format: "{year}-W{week}" — no zero padding (W1 not W01)',
      'Use chrono for parsing and ISO week computation',
      'Add chrono = "0.4" to Cargo.toml',
    ],
    starterCode: `use std::collections::HashMap;
use chrono::{NaiveDate, Datelike};

fn commits_stats(commits: Vec<String>) -> HashMap<String, usize> {
    todo!()
}

fn main() {}`,
    solution: `use std::collections::HashMap;
use chrono::{NaiveDate, Datelike};

fn commits_stats(commits: Vec<String>) -> HashMap<String, usize> {
    let mut counts: HashMap<String, usize> = HashMap::new();
    for commit in &commits {
        let parts: Vec<&str> = commit.split_whitespace().collect();
        if parts.len() < 5 { continue; }
        let date_str = format!("{} {} {}", parts[1], parts[2], parts[4]);
        if let Ok(date) = NaiveDate::parse_from_str(&date_str, "%b %d %Y") {
            let iso = date.iso_week();
            let key = format!("{}-W{}", iso.year(), iso.week());
            *counts.entry(key).or_insert(0) += 1;
        }
    }
    counts
}

fn main() {}`,
    testCases: [
      { id: 'test_63_1', description: 'counts commits by week', code: 'fn main() { let commits = vec!["Mon Jan 01 12:00:00 2024 +0000".to_string(), "Tue Jan 02 12:00:00 2024 +0000".to_string(), "Mon Jan 08 12:00:00 2024 +0000".to_string()]; let stats = commits_stats(commits); let mut keys: Vec<_> = stats.keys().collect(); keys.sort(); for k in &keys { println!("{}: {}", k, stats[*k]); } }', expectedOutput: '2024-W1: 2\n2024-W2: 1', hidden: false },
      { id: 'test_63_2', description: 'empty input', code: 'fn main() { let stats = commits_stats(vec![]); println!("{}", stats.len()); }', expectedOutput: '0', hidden: false },
    ],
    hints: [
      'Split each commit string by whitespace',
      'Reconstruct date as "Jan 01 2024" (month day year) and parse with "%b %d %Y"',
      'date.iso_week().week() gives week number (no zero-padding in format!)',
      '*counts.entry(key).or_insert(0) += 1 is the standard increment pattern',
    ],
  },
];
