import type { SolutionStep } from '../types';

// Step-by-step, line-by-line walkthroughs for the Zone01 CP3 exercises (88-109).
// Each step reveals the next chunk of code together with a plain-English
// explanation. Concatenating every step's `code` (joined by newlines) reproduces
// a working solution — the same logic as the verified annotated solutions.
//
// Keyed by slug. Shown via the "Step-by-Step" button on CP3 lessons.

export const zone01Walkthroughs: Record<string, SolutionStep[]> = {
  counting_words: [
    { code: `use std::collections::HashMap;`, explain: `Bring HashMap into scope — we will map each word to the number of times it appears.` },
    { code: `fn counting_words(words: &str) -> HashMap<String, u32> {`, explain: `Declare the function: it borrows the text as a &str and returns a HashMap from word (String) to count (u32).` },
    { code: `    let mut counts: HashMap<String, u32> = HashMap::new();`, explain: `Create an empty, mutable map to accumulate the counts.` },
    { code: `    for word in words.split(|c: char| !c.is_alphanumeric() && c != '\\'') {`, explain: `Split the text on every character that is not a letter or digit, but keep apostrophes so "I'm" stays one word.` },
    { code: `        if word.is_empty() {\n            continue;\n        }`, explain: `Splitting can produce empty pieces (between two separators) — skip those.` },
    { code: `        *counts.entry(word.to_lowercase()).or_insert(0) += 1;`, explain: `Lower-case the word, look up its slot with entry(), insert 0 the first time, and add one. The * dereferences the &mut so we can increment it.` },
    { code: `    }\n    counts\n}`, explain: `Close the loop and return the finished map.` },
  ],

  inv_pyramid: [
    { code: `pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {`, explain: `Signature: take the string v and the size i, and return a Vec holding each line of the pyramid.` },
    { code: `    let mut result = Vec::new();`, explain: `Start with an empty vector to collect the lines.` },
    { code: `    for k in 1..=i {\n        result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));\n    }`, explain: `Ascending side: for each level k from 1 to i, push a line of k spaces followed by v repeated k times.` },
    { code: `    for k in (1..i).rev() {\n        result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));\n    }`, explain: `Descending side: do the same for levels i-1 down to 1, mirroring the top half to complete the pyramid.` },
    { code: `    result\n}`, explain: `Return the finished pyramid — it has 2*i-1 lines.` },
  ],

  nextprime: [
    { code: `pub fn next_prime(nbr: usize) -> usize {`, explain: `Signature: return the next prime greater than or equal to nbr.` },
    { code: `    fn is_prime(n: usize) -> bool {`, explain: `Define a small helper, nested inside, that tests primality.` },
    { code: `        if n < 2 {\n            return false;\n        }`, explain: `0 and 1 are not prime, so reject anything below 2 right away.` },
    { code: `        let mut i = 2;\n        while i * i <= n {`, explain: `Check possible divisors starting at 2. We only need to go up to the square root of n, hence i * i <= n.` },
    { code: `            if n % i == 0 {\n                return false;\n            }\n            i += 1;\n        }`, explain: `If any i divides n evenly, n is composite — return false. Otherwise try the next divisor.` },
    { code: `        true\n    }`, explain: `No divisor found, so n is prime. Close the helper.` },
    { code: `    let mut n = nbr;\n    while !is_prime(n) {\n        n += 1;\n    }\n    n\n}`, explain: `Start at nbr and step upward until is_prime is true, then return that number.` },
  ],

  partial_sums: [
    { code: `pub fn parts_sums(v: &[u64]) -> Vec<u64> {`, explain: `Signature: take a slice of u64 and return the vector of partial sums.` },
    { code: `    let mut sums = Vec::with_capacity(v.len() + 1);`, explain: `There are len + 1 partial sums, so pre-allocate that capacity for the result.` },
    { code: `    for k in (0..=v.len()).rev() {`, explain: `Loop k from len down to 0 (.rev() reverses the range). k is the size of the prefix to sum.` },
    { code: `        sums.push(v[..k].iter().sum());`, explain: `Sum the first k elements and push the total. When k is 0 the slice is empty, giving the trailing 0.` },
    { code: `    }\n    sums\n}`, explain: `Return the collected sums.` },
  ],

  previousprime: [
    { code: `pub fn prev_prime(nbr: u64) -> u64 {`, explain: `Signature: return the largest prime less than or equal to nbr.` },
    { code: `    fn is_prime(n: u64) -> bool {\n        if n < 2 {\n            return false;\n        }`, explain: `The same primality helper — numbers below 2 are not prime.` },
    { code: `        let mut i = 2;\n        while i * i <= n {\n            if n % i == 0 {\n                return false;\n            }\n            i += 1;\n        }\n        true\n    }`, explain: `Check divisors up to the square root of n; a clean divisor means not prime, otherwise it is.` },
    { code: `    let mut n = nbr;\n    loop {`, explain: `Start at nbr and loop downward.` },
    { code: `        if is_prime(n) {\n            return n;\n        }`, explain: `Return as soon as we reach a prime.` },
    { code: `        if n == 0 {\n            return 0;\n        }\n        n -= 1;\n    }\n}`, explain: `Guard against subtracting below 0, otherwise step down and try the next candidate.` },
  ],

  reverse_it: [
    { code: `pub fn reverse_it(v: i32) -> String {`, explain: `Signature: take an i32 and return a String.` },
    { code: `    let abs = (v as i64).abs();`, explain: `Work with the absolute value so the digits reverse without a sign. Widening to i64 first avoids overflow on i32::MIN.` },
    { code: `    let reversed: String = abs.to_string().chars().rev().collect();`, explain: `Convert to text, reverse the characters with .rev(), and collect them into a new String.` },
    { code: `    let sign = if v < 0 { "-" } else { "" };`, explain: `Keep a leading "-" for negative inputs, nothing otherwise. if is an expression, so it yields the chosen text.` },
    { code: `    format!("{}{}{}", sign, reversed, abs)\n}`, explain: `Assemble sign + reversed digits + original number. No semicolon, so this is the return value.` },
  ],

  check_user_name: [
    { code: `pub enum AccessLevel {\n    Guest,\n    Normal,\n    Admin,\n}`, explain: `Define the three access levels as an enum.` },
    { code: `pub struct User {\n    pub name: String,\n    pub access_level: AccessLevel,\n}`, explain: `A User has a public name and an access level. Fields are pub so the test code can build one.` },
    { code: `impl User {\n    pub fn new(name: String, level: AccessLevel) -> Self {\n        User { name, access_level: level }\n    }`, explain: `Start the impl block and add a new constructor that fills in the two fields.` },
    { code: `    pub fn send_name(&self) -> Option<&str> {\n        match self.access_level {\n            AccessLevel::Guest => None,\n            _ => Some(&self.name),\n        }\n    }\n}`, explain: `send_name borrows self and returns None for a Guest, or the name for everyone else.` },
    { code: `pub fn check_user_name(user: &User) -> (bool, &str) {\n    match user.send_name() {\n        Some(name) => (true, name),\n        None => (false, "ERROR: User is guest"),\n    }\n}`, explain: `check_user_name calls send_name and turns the Option into a tuple: a name becomes (true, name); None becomes (false, error message).` },
  ],

  dress_code: [
    { code: `#[derive(Debug, PartialEq, Eq)]\npub enum Jacket {\n    Black,\n    White,\n    Flowers,\n}`, explain: `Define the Jacket choices. We derive Debug/PartialEq/Eq so outfits can be printed and compared.` },
    { code: `#[derive(Debug, PartialEq, Eq)]\npub enum Hat {\n    Snapback,\n    Baseball,\n    Fedora,\n}`, explain: `Define the Hat choices the same way.` },
    { code: `#[derive(Debug, PartialEq, Eq)]\npub struct Outfit {\n    pub jacket: Jacket,\n    pub hat: Hat,\n}`, explain: `An Outfit pairs a jacket with a hat.` },
    { code: `pub fn choose_outfit(formality_level: Option<u32>, invitation_message: Result<&str, &str>) -> Outfit {`, explain: `The function takes an optional formality level and a Result invitation, and returns an Outfit.` },
    { code: `    if formality_level.is_none() && invitation_message.is_err() {\n        return Outfit { jacket: Jacket::Flowers, hat: Hat::Baseball };\n    }`, explain: `Handle the special case first: no formality AND no valid invitation means Flowers + Baseball.` },
    { code: `    let jacket = match formality_level {\n        None => Jacket::Flowers,\n        Some(level) if level > 0 => Jacket::White,\n        _ => Jacket::Black,\n    };`, explain: `Pick the jacket: None -> Flowers, a positive level -> White, otherwise (Some(0)) -> Black.` },
    { code: `    let hat = if invitation_message.is_ok() {\n        Hat::Fedora\n    } else {\n        Hat::Snapback\n    };`, explain: `Pick the hat: a valid (Ok) invitation -> Fedora, otherwise Snapback.` },
    { code: `    Outfit { jacket, hat }\n}`, explain: `Combine the two choices into the returned Outfit.` },
  ],

  get_document_id: [
    { code: `#[derive(Debug, PartialEq, Eq, Clone, Copy)]\npub enum ErrorOffice {\n    OfficeClose(u32),\n    OfficeNotFound(u32),\n    OfficeFull(u32),\n}`, explain: `The error type: each variant carries the id of the office that produced it.` },
    { code: `#[derive(PartialEq, Eq, Clone, Copy)]\npub struct OfficeOne { pub next_office: Result<OfficeTwo, ErrorOffice> }\n#[derive(PartialEq, Eq, Clone, Copy)]\npub struct OfficeTwo { pub next_office: Result<OfficeThree, ErrorOffice> }`, explain: `Each office holds a Result pointing to the next office, or an error. Here are the first two.` },
    { code: `#[derive(PartialEq, Eq, Clone, Copy)]\npub struct OfficeThree { pub next_office: Result<OfficeFour, ErrorOffice> }\n#[derive(PartialEq, Eq, Clone, Copy)]\npub struct OfficeFour { pub document_id: Result<u32, ErrorOffice> }`, explain: `The third office points to the fourth, and the fourth finally holds the document id (or an error).` },
    { code: `impl OfficeOne {\n    pub fn get_document_id(&self) -> Result<u32, ErrorOffice> {\n        self.next_office?.next_office?.next_office?.document_id\n    }\n}`, explain: `The ? operator unwraps each Ok and walks to the next office; the moment it meets an Err it returns that error. The last field is the document_id Result itself.` },
  ],

  negative_spelling: [
    { code: `pub fn negative_spell(n: i64) -> String {`, explain: `Signature: spell a (negative) number in English words.` },
    { code: `    if n >= 0 {\n        return "error: positive number".to_string();\n    }`, explain: `This exercise only handles negatives, so reject zero and positives with an error string.` },
    { code: `    format!("minus {}", spell((-n) as u64))\n}`, explain: `Negate to get a positive magnitude, spell that, and prefix it with "minus".` },
    { code: `fn spell(n: u64) -> String {\n    let ones = [\n        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",\n        "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",\n        "sixteen", "seventeen", "eighteen", "nineteen",\n    ];\n    let tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];`, explain: `A helper that spells a non-negative number. Two lookup tables cover 0-19 and the tens words.` },
    { code: `    if n < 20 {\n        return ones[n as usize].to_string();\n    }`, explain: `Numbers below 20 are a direct table lookup.` },
    { code: `    if n < 100 {\n        let t = tens[(n / 10) as usize];\n        return if n % 10 == 0 {\n            t.to_string()\n        } else {\n            format!("{}-{}", t, ones[(n % 10) as usize])\n        };\n    }`, explain: `For 20-99: take the tens word, and if there is a remainder join it with a hyphen, e.g. forty-five.` },
    { code: `    if n < 1_000 {\n        let h = format!("{} hundred", ones[(n / 100) as usize]);\n        return if n % 100 == 0 { h } else { format!("{} {}", h, spell(n % 100)) };\n    }`, explain: `For hundreds: say "X hundred", then recursively spell whatever is left.` },
    { code: `    if n < 1_000_000 {\n        let th = format!("{} thousand", spell(n / 1_000));\n        return if n % 1_000 == 0 { th } else { format!("{} {}", th, spell(n % 1_000)) };\n    }`, explain: `For thousands: spell the count of thousands, add "thousand", then recurse on the remainder.` },
    { code: `    let m = format!("{} million", spell(n / 1_000_000));\n    if n % 1_000_000 == 0 { m } else { format!("{} {}", m, spell(n % 1_000_000)) }\n}`, explain: `The same idea one more level up, for millions.` },
  ],

  queens: [
    { code: `#[derive(Debug, Clone, Copy)]\npub struct ChessPosition {\n    pub rank: usize,\n    pub file: usize,\n}`, explain: `A board position is a rank (row) and file (column). Copy makes it cheap to pass around.` },
    { code: `impl ChessPosition {\n    pub fn new(rank: usize, file: usize) -> Option<Self> {\n        if rank < 8 && file < 8 {\n            Some(ChessPosition { rank, file })\n        } else {\n            None\n        }\n    }\n}`, explain: `new validates the coordinates: only positions on the 8x8 board return Some, otherwise None.` },
    { code: `#[derive(Debug, Clone, Copy)]\npub struct Queen {\n    pub position: ChessPosition,\n}`, explain: `A Queen simply wraps a position.` },
    { code: `impl Queen {\n    pub fn new(position: ChessPosition) -> Self {\n        Queen { position }\n    }`, explain: `Its constructor stores the given position.` },
    { code: `    pub fn can_attack(self, other: Self) -> bool {\n        let (r1, f1) = (self.position.rank as i64, self.position.file as i64);\n        let (r2, f2) = (other.position.rank as i64, other.position.file as i64);\n        r1 == r2 || f1 == f2 || (r1 - r2).abs() == (f1 - f2).abs()\n    }\n}`, explain: `Two queens attack if they share a rank, a file, or a diagonal. A diagonal means the row distance equals the column distance. We cast to i64 so the subtraction can go negative before .abs().` },
  ],

  rpn: [
    { code: `pub fn rpn(expr: &str) -> f64 {`, explain: `Function signature. In the real 01-edu exercise, main() reads exactly one argument via std::env::args() and either prints the numeric result or "Error". Here we wrap that logic as a function for testing.` },
    { code: `    let mut stack: Vec<f64> = Vec::new();`, explain: `The core data structure: a stack of numbers. As we scan the expression left to right, operands are pushed onto the stack; operators pop two values, compute, and push the result.` },
    { code: `    for token in expr.split_whitespace() {`, explain: `split_whitespace() handles any amount of spaces between tokens — this satisfies the spec requirement that "extra spaces must be ignored".` },
    { code: `        match token {\n            "+" | "-" | "*" | "/" | "%" => {`, explain: `All five required operators (+, -, *, /, %) are recognised in one arm. The % is modulo — required by the spec but often forgotten.` },
    { code: `                if stack.len() < 2 { panic!("Error"); }\n                let b = stack.pop().unwrap();\n                let a = stack.pop().unwrap();`, explain: `Guard: there must be at least two operands on the stack before we can apply an operator — otherwise the expression is invalid. Pop b first (top of stack), then a. Order matters for - and /.` },
    { code: `                let result = match token {\n                    "+" => a + b,\n                    "-" => a - b,\n                    "*" => a * b,\n                    "/" => a / b,\n                    "%" => a % b,\n                    _ => unreachable!(),\n                };\n                stack.push(result);\n            }`, explain: `Apply the operator to a and b and push the result back onto the stack. The _ arm is unreachable because the outer match already guarantees only these five operators reach here.` },
    { code: `            num => {\n                match num.parse::<f64>() {\n                    Ok(n) => stack.push(n),\n                    Err(_) => panic!("Error"),\n                }\n            }\n        }\n    }`, explain: `Any token that is not an operator must be a number. If parse fails (e.g. "ksd"), the expression is invalid. In the real exercise this prints "Error"; here we panic with the same message.` },
    { code: `    if stack.len() == 1 {\n        stack.pop().unwrap()\n    } else {\n        panic!("Error")\n    }\n}`, explain: `After processing all tokens, a valid RPN expression leaves exactly one value on the stack — that is the result. Zero values (empty expression) or more than one value (e.g. "1 2 3 4 +") both mean the input was invalid.` },
  ],

  scytale_decoder: [
    { code: `pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {`, explain: `Signature: decode a scytale cipher, returning None when the input is invalid.` },
    { code: `    if s.is_empty() || letters_per_turn == 0 {\n        return None;\n    }`, explain: `An empty message or zero columns cannot be decoded, so bail out with None.` },
    { code: `    let len = s.chars().count();\n    if len % letters_per_turn != 0 {\n        return None;\n    }`, explain: `The letters must fill a clean rectangle; if the length is not divisible by the column count, return None.` },
    { code: `    let rows = len / letters_per_turn;\n    let chars: Vec<char> = s.chars().collect();\n    let mut result = String::with_capacity(len);`, explain: `Work out how many rows there are, collect the characters for indexing, and prepare the output string.` },
    { code: `    for col in 0..letters_per_turn {\n        for row in 0..rows {\n            result.push(chars[row * letters_per_turn + col]);\n        }\n    }`, explain: `The cipher was written row by row; to undo it we read the grid column by column.` },
    { code: `    Some(result)\n}`, explain: `Return the decoded text wrapped in Some.` },
  ],

  matrix_display: [
    { code: `use std::fmt;`, explain: `We need std::fmt to implement the Display trait.` },
    { code: `#[derive(Debug, Clone)]\npub struct Matrix(pub Vec<Vec<i32>>);`, explain: `A tuple struct wrapping rows of numbers (a Vec of Vec<i32>).` },
    { code: `impl Matrix {\n    pub fn new(slice: &[&[i32]]) -> Self {\n        Matrix(slice.iter().map(|row| row.to_vec()).collect())\n    }\n}`, explain: `new copies each borrowed row into an owned Vec and wraps them in a Matrix.` },
    { code: `impl fmt::Display for Matrix {\n    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {`, explain: `Implement Display so that printing a Matrix produces the desired layout.` },
    { code: `        let lines: Vec<String> = self\n            .0\n            .iter()\n            .map(|row| {\n                let cells: Vec<String> = row.iter().map(|n| n.to_string()).collect();\n                format!("({})", cells.join(" "))\n            })\n            .collect();`, explain: `Turn each row into a string like "(1 2 3)": stringify the numbers, join them with spaces, and wrap in parentheses.` },
    { code: `        write!(f, "{}", lines.join("\\n"))\n    }\n}`, explain: `Join the row strings with newlines and write the whole thing to the formatter.` },
  ],

  office_worker: [
    { code: `#[derive(Debug, PartialEq, Eq)]\npub struct OfficeWorker {\n    pub name: String,\n    pub age: u32,\n    pub role: WorkerRole,\n}`, explain: `A worker has a name, an age, and a role.` },
    { code: `#[derive(Debug, PartialEq, Eq)]\npub enum WorkerRole {\n    Admin,\n    User,\n    Guest,\n}`, explain: `The role is one of three variants.` },
    { code: `impl From<&str> for WorkerRole {\n    fn from(s: &str) -> Self {\n        match s {\n            "admin" => WorkerRole::Admin,\n            "user" => WorkerRole::User,\n            _ => WorkerRole::Guest,\n        }\n    }\n}`, explain: `Implement From<&str> for the role so a lowercase word converts to the right variant.` },
    { code: `impl From<&str> for OfficeWorker {\n    fn from(s: &str) -> Self {\n        let parts: Vec<&str> = s.split(',').collect();\n        OfficeWorker {\n            name: parts[0].to_string(),\n            age: parts[1].parse().unwrap(),\n            role: WorkerRole::from(parts[2]),\n        }\n    }\n}`, explain: `Implement From<&str> for the worker: split "name,age,role" on commas, parse the age, and convert the role with the impl above.` },
  ],

  organize_garage: [
    { code: `use std::ops::Add;`, explain: `We require the values to support + , which is the Add trait.` },
    { code: `#[derive(Debug, PartialEq, Eq)]\npub struct Garage<T> {\n    pub left: Option<T>,\n    pub right: Option<T>,\n}`, explain: `A generic Garage holds an optional value on the left and on the right.` },
    { code: `impl<T: Add<Output = T> + Copy> Garage<T> {`, explain: `The methods need T to be addable and Copy (so we can read a value without moving it).` },
    { code: `    pub fn move_to_right(&mut self) {\n        if let Some(l) = self.left {\n            self.right = Some(match self.right {\n                Some(r) => r + l,\n                None => l,\n            });\n            self.left = None;\n        }\n    }`, explain: `Move the left value over: if the right side already holds something, add them; otherwise the value just lands there. Then clear the left.` },
    { code: `    pub fn move_to_left(&mut self) {\n        if let Some(r) = self.right {\n            self.left = Some(match self.left {\n                Some(l) => l + r,\n                None => r,\n            });\n            self.right = None;\n        }\n    }\n}`, explain: `The mirror image: move the right value into the left, summing if needed, then clear the right.` },
  ],

  blood_types_s: [
    { code: `#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]\npub enum Antigen { A, AB, B, O }\n\n#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]\npub enum RhFactor { Positive, Negative }`, explain: `A blood type is built from an antigen (A, AB, B, O) and an Rh factor (+ or -).` },
    { code: `#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]\npub struct BloodType {\n    pub antigen: Antigen,\n    pub rh_factor: RhFactor,\n}`, explain: `Combine those two into the BloodType struct.` },
    { code: `impl BloodType {\n    pub fn can_receive_from(self, other: Self) -> bool {`, explain: `Start the impl with the core rule: can self safely receive blood from other?` },
    { code: `        let antigen_ok = match other.antigen {\n            Antigen::O => true,\n            Antigen::A => matches!(self.antigen, Antigen::A | Antigen::AB),\n            Antigen::B => matches!(self.antigen, Antigen::B | Antigen::AB),\n            Antigen::AB => self.antigen == Antigen::AB,\n        };`, explain: `Antigen rule: O has no antigen so everyone accepts it; A and B are accepted by themselves and by AB; AB is only accepted by AB.` },
    { code: `        let rh_ok = self.rh_factor == RhFactor::Positive || other.rh_factor == RhFactor::Negative;\n        antigen_ok && rh_ok\n    }`, explain: `Rh rule: an Rh- donor works for anyone; an Rh+ donor only works for an Rh+ recipient. Both rules must hold.` },
    { code: `    pub fn donors(self) -> Vec<Self> {\n        Self::all().into_iter().filter(|&other| self.can_receive_from(other)).collect()\n    }\n\n    pub fn recipients(self) -> Vec<Self> {\n        Self::all().into_iter().filter(|&other| other.can_receive_from(self)).collect()\n    }`, explain: `donors keeps every type self can receive from; recipients keeps every type that can receive from self.` },
    { code: `    fn all() -> Vec<Self> {\n        let mut types = Vec::new();\n        for antigen in [Antigen::A, Antigen::AB, Antigen::B, Antigen::O] {\n            for rh_factor in [RhFactor::Positive, RhFactor::Negative] {\n                types.push(BloodType { antigen, rh_factor });\n            }\n        }\n        types\n    }\n}`, explain: `A helper that lists all eight blood types by pairing every antigen with every Rh factor.` },
  ],

  format_me: [
    { code: `use std::fmt;`, explain: `Display lives in std::fmt.` },
    { code: `pub struct Park {\n    pub name: Option<String>,\n    pub park_type: ParkType,\n    pub address: Option<String>,\n    pub cap: Option<String>,\n    pub state: Option<String>,\n}`, explain: `A Park has a type plus four optional text fields.` },
    { code: `pub enum ParkType {\n    Garden,\n    Forest,\n    Playground,\n}`, explain: `The park type is one of three variants.` },
    { code: `impl fmt::Display for ParkType {\n    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {\n        let text = match self {\n            ParkType::Garden => "garden",\n            ParkType::Forest => "forest",\n            ParkType::Playground => "playground",\n        };\n        write!(f, "{}", text)\n    }\n}`, explain: `Displaying a ParkType prints its name in lowercase.` },
    { code: `impl fmt::Display for Park {\n    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {\n        write!(\n            f,\n            "{} - {}, {}, {} - {}",\n            self.park_type,\n            self.name.as_deref().unwrap_or("No name"),\n            self.address.as_deref().unwrap_or("No address"),\n            self.cap.as_deref().unwrap_or("No cap"),\n            self.state.as_deref().unwrap_or("No state"),\n        )\n    }\n}`, explain: `Displaying a Park uses the format string, and for each optional field as_deref().unwrap_or(...) substitutes a "No <field>" placeholder when it is None.` },
  ],

  moving_targets: [
    { code: `#[derive(Debug, PartialEq, Eq)]\npub struct Target {\n    pub size: u32,\n    pub xp: u32,\n}`, explain: `The value stored in the list: a Target with a size and xp.` },
    { code: `pub struct Field {\n    head: Link,\n}\n\ntype Link = Option<Box<Node>>;\n\nstruct Node {\n    elem: Target,\n    next: Link,\n}`, explain: `Field is a singly linked stack. Link is an optional boxed Node, and each Node holds a Target plus the next Link. Box gives the recursive type a known size.` },
    { code: `impl Field {\n    pub fn new() -> Self {\n        Field { head: None }\n    }`, explain: `A new Field starts empty (head is None).` },
    { code: `    pub fn push(&mut self, target: Target) {\n        let node = Box::new(Node { elem: target, next: self.head.take() });\n        self.head = Some(node);\n    }`, explain: `push makes a new node whose next is the old head (take() leaves None behind), then sets it as the new head.` },
    { code: `    pub fn pop(&mut self) -> Option<Target> {\n        self.head.take().map(|node| {\n            self.head = node.next;\n            node.elem\n        })\n    }`, explain: `pop takes the head out; if there was one, the head becomes its next and we return the contained Target.` },
    { code: `    pub fn peek(&self) -> Option<&Target> {\n        self.head.as_ref().map(|node| &node.elem)\n    }\n\n    pub fn peek_mut(&mut self) -> Option<&mut Target> {\n        self.head.as_mut().map(|node| &mut node.elem)\n    }\n}`, explain: `peek hands back a reference to the head Target without removing it; peek_mut gives a mutable reference so it can be edited in place.` },
  ],

  car_rental: [
    { code: `use std::cell::{Ref, RefCell, RefMut};`, explain: `RefCell provides interior mutability — changing data through a shared &self. Ref/RefMut are its borrow guards.` },
    { code: `#[derive(Debug, Default, PartialEq, Eq)]\npub struct Car {\n    pub color: String,\n    pub plate: String,\n}`, explain: `A Car with a color and plate. Default lets us produce an empty Car later.` },
    { code: `#[derive(Debug)]\npub struct RentalBusiness {\n    pub car: RefCell<Car>,\n}`, explain: `The business stores its Car inside a RefCell so it can change even when the business is not mutable.` },
    { code: `impl RentalBusiness {\n    pub fn rent_car(&self) -> Ref<'_, Car> {\n        self.car.borrow()\n    }`, explain: `rent_car hands out a shared (read-only) borrow of the Car.` },
    { code: `    pub fn sell_car(&self) -> Car {\n        self.car.take()\n    }`, explain: `sell_car takes the Car out, leaving a default Car behind, and returns the one that was sold.` },
    { code: `    pub fn repair_car(&self) -> RefMut<'_, Car> {\n        self.car.borrow_mut()\n    }`, explain: `repair_car hands out a mutable borrow, so the caller can change the Car in place.` },
    { code: `    pub fn change_car(&self, new_car: Car) {\n        *self.car.borrow_mut() = new_car;\n    }\n}`, explain: `change_car replaces the whole Car by writing through a mutable borrow.` },
  ],

  drop_the_blog: [
    { code: `use std::cell::{Cell, RefCell};\nuse std::rc::Rc;`, explain: `Cell and RefCell give interior mutability; Rc is needed by the usage example (shared ownership).` },
    { code: `#[derive(Debug, Clone, Eq, PartialEq)]\npub struct Blog {\n    pub drops: Cell<usize>,\n    pub states: RefCell<Vec<bool>>,\n}`, explain: `The Blog counts dropped articles (drops) and tracks each article's dropped/not-dropped state. Both sit in cells so they can change through a shared &self.` },
    { code: `impl Blog {\n    pub fn new() -> Self {\n        Blog { drops: Cell::new(0), states: RefCell::new(Vec::new()) }\n    }`, explain: `A fresh Blog has zero drops and no articles yet.` },
    { code: `    pub fn new_article(&self, body: String) -> (usize, Article<'_>) {\n        let id = self.new_id();\n        self.states.borrow_mut().push(false);\n        (id, Article::new(id, body, self))\n    }`, explain: `Creating an article reserves the next id, records its state as not-dropped, and returns the id together with a new Article that borrows this Blog.` },
    { code: `    pub fn new_id(&self) -> usize {\n        self.states.borrow().len()\n    }\n\n    pub fn is_dropped(&self, id: usize) -> bool {\n        self.states.borrow()[id]\n    }`, explain: `The next id is just how many articles exist; is_dropped looks up a single state.` },
    { code: `    pub fn add_drop(&self, id: usize) {\n        if self.states.borrow()[id] {\n            panic!("{} is already dropped", id);\n        }\n        self.states.borrow_mut()[id] = true;\n        self.drops.set(self.drops.get() + 1);\n    }\n}`, explain: `add_drop marks an article dropped and bumps the counter, panicking if it was already dropped.` },
    { code: `#[derive(Debug, Clone, Eq, PartialEq)]\npub struct Article<'a> {\n    pub id: usize,\n    pub body: String,\n    pub parent: &'a Blog,\n}`, explain: `An Article knows its id, its body, and holds a reference back to the Blog it belongs to.` },
    { code: `impl<'a> Article<'a> {\n    pub fn new(id: usize, body: String, parent: &'a Blog) -> Self {\n        Article { id, body, parent }\n    }\n\n    pub fn discard(self) {}\n}`, explain: `new just stores the fields. discard takes the Article by value; doing nothing here means it goes out of scope and is dropped, which triggers the Drop impl next.` },
    { code: `impl<'a> Drop for Article<'a> {\n    fn drop(&mut self) {\n        self.parent.add_drop(self.id);\n    }\n}`, explain: `When an Article is dropped, Rust runs this automatically — it tells the parent Blog to record the drop.` },
  ],

  lunch_queue: [
    { code: `#[derive(Debug, Clone)]\npub struct Queue {\n    pub node: Link,\n}\n\npub type Link = Option<Box<Person>>;`, explain: `The Queue points at its first node. Link is an optional boxed Person — Box makes the recursive type sized.` },
    { code: `#[derive(Debug, Clone)]\npub struct Person {\n    pub name: String,\n    pub discount: i32,\n    pub next_person: Link,\n}`, explain: `Each Person stores their details and a link to the next Person.` },
    { code: `impl Queue {\n    pub fn new() -> Queue {\n        Queue { node: None }\n    }`, explain: `A new Queue is empty.` },
    { code: `    pub fn add(&mut self, name: String, discount: i32) {\n        let person = Box::new(Person { name, discount, next_person: self.node.take() });\n        self.node = Some(person);\n    }`, explain: `add inserts a new Person at the front, linking them to the previous front.` },
    { code: `    pub fn invert_queue(&mut self) {\n        let mut prev: Link = None;\n        let mut current = self.node.take();\n        while let Some(mut boxed) = current {\n            current = boxed.next_person.take();\n            boxed.next_person = prev;\n            prev = Some(boxed);\n        }\n        self.node = prev;\n    }`, explain: `invert_queue reverses the list: walk it node by node, flipping each next pointer to the node behind it.` },
    { code: `    pub fn rm(&mut self) -> Option<(String, i32)> {\n        if self.node.is_none() {\n            return None;\n        }\n        if self.node.as_ref().unwrap().next_person.is_none() {\n            let person = self.node.take().unwrap();\n            return Some((person.name, person.discount));\n        }`, explain: `rm removes in FIFO order, which means removing the tail (the first person added). Handle the empty list and the single-element list first.` },
    { code: `        let mut current = self.node.as_mut().unwrap();\n        while current.next_person.as_ref().unwrap().next_person.is_some() {\n            current = current.next_person.as_mut().unwrap();\n        }\n        let last = current.next_person.take().unwrap();\n        Some((last.name, last.discount))\n    }`, explain: `Otherwise walk to the second-to-last node, detach the last one, and return its details.` },
    { code: `    pub fn search(&self, name: &str) -> Option<(&String, &i32)> {\n        let mut current = self.node.as_ref();\n        while let Some(person) = current {\n            if person.name == name {\n                return Some((&person.name, &person.discount));\n            }\n            current = person.next_person.as_ref();\n        }\n        None\n    }\n}`, explain: `search walks the list and returns references to the first matching person's details, or None if nobody matches.` },
  ],
};
