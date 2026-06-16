import type { Zone01Guide } from '../types';

export const zone01Guides: Record<string, Zone01Guide> = {

  matrix_multiplication: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Struct Field Access',
        description: 'Access fields of a struct using dot notation: `value.field_name`',
        example: 'let x = my_struct.row_a;',
      },
      {
        name: 'Returning a Struct Literal',
        description: 'Build and return a new struct by listing every field explicitly',
        example: 'Matrix { a: 1, b: 2, c: 3, d: 4 }',
      },
    ],
    dataStructures: [
      {
        name: 'Matrix (custom struct)',
        description:
          'A user-defined struct representing a 2×2 matrix. Each field holds one element. Multiply every field by the scalar.',
      },
    ],
    annotatedSolution: `// The Matrix struct has individual fields (e.g. a, b, c, d) for its elements.
// Multiply every field by the scalar 'multiplier' and return a new Matrix.
pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    Matrix {
        a: m.a * multiplier,
        b: m.b * multiplier,
        c: m.c * multiplier,
        d: m.d * multiplier,
    }
}`,
  },

  min_and_max: {
    builtinFunctions: [
      {
        name: 'std::cmp::min',
        signature: 'fn min<T: Ord>(v1: T, v2: T) -> T',
        description: 'Returns the smaller of two values',
        example: 'std::cmp::min(3, 7) // 3',
      },
      {
        name: 'std::cmp::max',
        signature: 'fn max<T: Ord>(v1: T, v2: T) -> T',
        description: 'Returns the larger of two values',
        example: 'std::cmp::max(3, 7) // 7',
      },
    ],
    concepts: [
      {
        name: 'Returning a Tuple',
        description:
          'A function can return multiple values as a tuple (min, max)',
        example: 'fn f() -> (i32, i32) { (1, 2) }',
      },
      {
        name: 'Chaining min/max',
        description:
          'To find the min/max of three values, chain two comparisons: min(a, min(b, c))',
        example: 'let m = std::cmp::min(nb_1, std::cmp::min(nb_2, nb_3));',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
    // Chain two min calls to find the smallest of three numbers
    let min = std::cmp::min(nb_1, std::cmp::min(nb_2, nb_3));
    // Chain two max calls to find the largest of three numbers
    let max = std::cmp::max(nb_1, std::cmp::max(nb_2, nb_3));
    (min, max)
}`,
  },

  reverse_it: {
    builtinFunctions: [
      {
        name: 'i32::abs',
        signature: 'fn abs(self) -> i32',
        description: 'Returns the absolute value (strips the minus sign)',
        example: '(-42_i32).abs() // 42',
      },
      {
        name: '.to_string()',
        signature: 'fn to_string(&self) -> String',
        description: 'Converts a number to its decimal string representation',
        example: '123.to_string() // "123"',
      },
      {
        name: '.chars().rev().collect()',
        signature: '',
        description:
          'Iterator chain: iterate chars → reverse → collect back into a String',
        example: '"hello".chars().rev().collect::<String>() // "olleh"',
      },
    ],
    concepts: [
      {
        name: 'Sign Detection',
        description:
          'Use `v < 0` to detect a negative number; work on its absolute value, then re-attach the minus sign',
        example: 'if v < 0 { /* negative */ }',
      },
      {
        name: 'String Reversal via Iterators',
        description:
          'Convert to String, call `.chars()` to get a char iterator, `.rev()` to reverse it, `.collect()` to rebuild',
        example: 'abs_str.chars().rev().collect::<String>()',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn reverse_it(v: i32) -> String {
    let negative = v < 0;
    // Work with the absolute value so the minus sign doesn't get reversed
    let abs_str = v.abs().to_string();
    // Reverse the characters of the digit string
    let reversed: String = abs_str.chars().rev().collect();
    // Re-attach the minus sign if the original was negative
    if negative {
        format!("-{}", reversed)
    } else {
        reversed
    }
}`,
  },

  smallest: {
    builtinFunctions: [
      {
        name: 'HashMap::values()',
        signature: 'fn values(&self) -> Values<K, V>',
        description: 'Returns an iterator over all values in the map',
        example: 'map.values() // Iterator<Item=&i32>',
      },
      {
        name: '.copied()',
        signature: 'fn copied(self) -> Copied<Self>',
        description:
          'Converts an iterator of &T into an iterator of T by copying each element',
        example: 'map.values().copied() // Iterator<Item=i32>',
      },
      {
        name: '.min()',
        signature: 'fn min(self) -> Option<T>',
        description:
          'Returns the minimum element of an iterator wrapped in Some, or None if empty',
        example: 'vec![3,1,2].into_iter().min() // Some(1)',
      },
      {
        name: '.unwrap()',
        signature: 'fn unwrap(self) -> T',
        description: 'Extracts the value from Some(T), panics on None',
        example: 'Some(5).unwrap() // 5',
      },
    ],
    concepts: [
      {
        name: 'Iterating HashMap Values',
        description:
          'Use `.values()` to skip keys and iterate only the values of a HashMap',
        example: 'for val in map.values() { println!("{}", val); }',
      },
    ],
    dataStructures: [
      {
        name: 'HashMap<&str, i32>',
        description:
          'A key-value map. Use `.values()` to get an iterator over just the i32 values.',
        example: 'let mut m: HashMap<&str, i32> = HashMap::new();',
      },
    ],
    annotatedSolution: `pub fn smallest(h: HashMap<&str, i32>) -> i32 {
    // values() gives &i32, copied() turns them into i32, min() finds the smallest
    h.values().copied().min().unwrap_or(0)
}`,
  },

  counting_words: {
    builtinFunctions: [
      {
        name: 'str::split_whitespace()',
        signature: 'fn split_whitespace(&self) -> SplitWhitespace',
        description:
          'Splits on any whitespace, skipping leading/trailing spaces and consecutive spaces',
        example: '"  hello   world  ".split_whitespace() // ["hello", "world"]',
      },
      {
        name: 'HashMap::entry().or_insert()',
        signature: 'fn entry(&mut self, key: K) -> Entry<K, V>',
        description:
          'Gets the entry for a key; inserts the default if absent. Returns a mutable reference to the value.',
        example: '*map.entry("word".to_string()).or_insert(0) += 1;',
      },
      {
        name: '.to_lowercase()',
        signature: 'fn to_lowercase(&self) -> String',
        description:
          'Returns a new String with all chars converted to lowercase',
        example: '"Hello".to_lowercase() // "hello"',
      },
    ],
    concepts: [
      {
        name: 'Frequency Counting Pattern',
        description:
          'For each word, get-or-create a counter in the map, then increment it. The `entry().or_insert(0)` idiom does both steps.',
        example: '*map.entry(word).or_insert(0) += 1;',
      },
    ],
    dataStructures: [
      {
        name: 'HashMap<String, u32>',
        description:
          'Maps each unique word (owned String) to its occurrence count (u32). Keys grow dynamically.',
        example: 'let mut counts: HashMap<String, u32> = HashMap::new();',
      },
    ],
    annotatedSolution: `fn counting_words(words: &str) -> HashMap<String, u32> {
    let mut map = HashMap::new();
    for word in words.split_whitespace() {
        // Normalize to lowercase so "Hello" and "hello" are the same word
        let key = word.to_lowercase();
        // Get the counter for this word (default 0), then add 1
        *map.entry(key).or_insert(0) += 1;
    }
    map
}`,
  },

  inv_pyramid: {
    builtinFunctions: [
      {
        name: 'str::repeat()',
        signature: 'fn repeat(&self, n: usize) -> String',
        description: 'Creates a new String by repeating the original n times',
        example: '"ab".repeat(3) // "ababab"',
      },
      {
        name: 'Vec::push()',
        signature: 'fn push(&mut self, value: T)',
        description: 'Appends an element to the end of a Vec',
        example: 'rows.push("hello".to_string());',
      },
      {
        name: 'Range rev()',
        signature: 'fn rev(self) -> Rev<Self>',
        description:
          'Reverses a range iterator so you can count down: (1..=n).rev()',
        example: 'for i in (1..=5).rev() { /* 5,4,3,2,1 */ }',
      },
    ],
    concepts: [
      {
        name: 'Inverted Pyramid = Counting Down',
        description:
          'Start at level `i` (widest row) and count down to 1 (narrowest row). Each row repeats the string `level` times.',
        example: 'for level in (1..=i).rev() { result.push(v.repeat(level)); }',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<String>',
        description:
          'A growable list of Strings, one per row of the pyramid. Use push() to append rows.',
        example: 'let mut rows: Vec<String> = Vec::new();',
      },
    ],
    annotatedSolution: `pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    let mut result = Vec::new();
    // Count down from i to 1: widest row first, then narrowing
    for level in (1..=i).rev() {
        // Each row is the string repeated 'level' times
        result.push(v.repeat(level));
    }
    result
}`,
  },

  partial_sums: {
    builtinFunctions: [
      {
        name: '.iter().rev()',
        signature: 'fn rev(self) -> Rev<Self>',
        description: 'Reverses an iterator (walk from the last element to the first)',
        example: 'lst.iter().rev() // iterates right-to-left',
      },
      {
        name: 'Vec::push()',
        signature: 'fn push(&mut self, value: T)',
        description: 'Appends a value to the Vec',
        example: 'result.push(running_sum);',
      },
      {
        name: 'Vec::reverse()',
        signature: 'fn reverse(&mut self)',
        description: 'Reverses the Vec in-place',
        example: 'result.reverse();',
      },
    ],
    concepts: [
      {
        name: 'Suffix Sums',
        description:
          'result[i] = sum of lst[i..]. The last element is always 0 (empty suffix). Walk right-to-left accumulating a running total.',
        example: '[1,2,3] → [6, 5, 3, 0]  (6=1+2+3, 5=2+3, 3=3, 0=empty)',
      },
      {
        name: 'Build-then-Reverse Pattern',
        description:
          'Collect suffix sums in reverse order (easiest to compute), then reverse the Vec at the end.',
        example:
          'for &v in lst.iter().rev() { sum += v; result.push(sum); } result.push(0); result.reverse();',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<u64>',
        description: 'Dynamic array of 64-bit unsigned integers for the suffix sums output',
        example: 'let mut result: Vec<u64> = Vec::new();',
      },
    ],
    annotatedSolution: `pub fn parts_sums(lst: &[u64]) -> Vec<u64> {
    let mut result = Vec::new();
    let mut running_sum: u64 = 0;
    // Walk right-to-left, accumulating the suffix sum at each position
    for &val in lst.iter().rev() {
        running_sum += val;
        result.push(running_sum);
    }
    // The suffix starting after all elements is empty → sum = 0
    result.push(0);
    // We collected in reverse order, so reverse to get result[i] = sum of lst[i..]
    result.reverse();
    result
}`,
  },

  insertion_sort: {
    builtinFunctions: [
      {
        name: 'slice.swap(i, j)',
        signature: 'fn swap(&mut self, a: usize, b: usize)',
        description: 'Swaps two elements in a mutable slice by index',
        example: 'slice.swap(3, 4); // swaps elements at index 3 and 4',
      },
    ],
    concepts: [
      {
        name: 'Insertion Sort Algorithm',
        description:
          'For each step i (from 1 upward), take the element at i and "insert" it into its correct position in the already-sorted prefix [0..i] by swapping leftward.',
        example:
          'for j in (1..=i).rev() { if slice[j] < slice[j-1] { slice.swap(j, j-1); } else { break; } }',
      },
      {
        name: 'Steps Parameter = Partial Sort',
        description:
          'Only perform exactly `steps` insertion iterations, not a full sort. The array is partially sorted after `steps` passes.',
        example: 'for i in 1..=steps { /* one insertion step */ }',
      },
    ],
    dataStructures: [
      {
        name: '&mut [i32]',
        description:
          'A mutable slice — an in-place view into an array. All swaps happen directly on the slice.',
        example: 'fn insertion_sort(slice: &mut [i32], steps: usize)',
      },
    ],
    annotatedSolution: `pub fn insertion_sort(slice: &mut [i32], steps: usize) {
    // Perform exactly 'steps' insertion steps (partial sort)
    for i in 1..=steps {
        // Walk the element at position i leftward until it's in its correct spot
        let mut j = i;
        while j > 0 && slice[j] < slice[j - 1] {
            slice.swap(j, j - 1);
            j -= 1;
        }
    }
}`,
  },

  rpn: {
    builtinFunctions: [
      {
        name: 'Vec::push()',
        signature: 'fn push(&mut self, value: T)',
        description: 'Push a number onto the stack',
        example: 'stack.push(3.0_f64);',
      },
      {
        name: 'Vec::pop()',
        signature: 'fn pop(&mut self) -> Option<T>',
        description: 'Pop the top element off the stack (returns None if empty)',
        example: 'let top = stack.pop().unwrap();',
      },
      {
        name: 'str::parse::<f64>()',
        signature: 'fn parse<F>(&self) -> Result<F, F::Err>',
        description: 'Parses a string slice into a numeric type',
        example: '"3.14".parse::<f64>().unwrap()',
      },
      {
        name: 'str::split_whitespace()',
        signature: 'fn split_whitespace(&self) -> SplitWhitespace',
        description: 'Splits the input into tokens on whitespace',
        example: '"3 4 +".split_whitespace() // ["3", "4", "+"]',
      },
    ],
    concepts: [
      {
        name: 'Reverse Polish Notation (RPN)',
        description:
          'Numbers are pushed onto a stack. When an operator (+, -, *, /) appears, pop two operands, apply the operator, and push the result.',
        example: '"3 4 +" → push 3, push 4, pop both → 3+4=7, push 7',
      },
      {
        name: 'Stack-based Evaluation',
        description:
          'Use a Vec<f64> as a LIFO stack. Numbers → push; operators → pop two, compute, push result.',
        example:
          'if token == "+" { let b = stack.pop().unwrap(); let a = stack.pop().unwrap(); stack.push(a + b); }',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<f64> used as a stack',
        description:
          'A Vec used as a LIFO stack: push() adds to the top, pop() removes from the top.',
        example: 'let mut stack: Vec<f64> = Vec::new();',
      },
    ],
    annotatedSolution: `// RPN evaluator — the exercise likely reads from stdin or takes a &str
pub fn rpn(expr: &str) -> f64 {
    let mut stack: Vec<f64> = Vec::new();
    for token in expr.split_whitespace() {
        match token {
            // For operators: pop two operands (b then a), compute, push result
            "+" => { let b = stack.pop().unwrap(); let a = stack.pop().unwrap(); stack.push(a + b); }
            "-" => { let b = stack.pop().unwrap(); let a = stack.pop().unwrap(); stack.push(a - b); }
            "*" => { let b = stack.pop().unwrap(); let a = stack.pop().unwrap(); stack.push(a * b); }
            "/" => { let b = stack.pop().unwrap(); let a = stack.pop().unwrap(); stack.push(a / b); }
            // Anything else must be a number — parse and push it
            num => stack.push(num.parse::<f64>().unwrap()),
        }
    }
    // The final answer is the only remaining element
    stack.pop().unwrap()
}`,
  },

  nextprime: {
    builtinFunctions: [
      {
        name: '% (modulo operator)',
        signature: 'lhs % rhs -> T',
        description:
          'Returns the remainder after division. If `n % d == 0`, then d evenly divides n.',
        example: '10 % 3 // 1  |  9 % 3 // 0 (divisible)',
      },
    ],
    concepts: [
      {
        name: 'Primality Check',
        description:
          'A number n ≥ 2 is prime if no integer from 2 to √n divides it. Check odd divisors only after handling 2.',
        example:
          'fn is_prime(n: usize) -> bool { if n < 2 { return false; } if n == 2 { return true; } if n % 2 == 0 { return false; } let mut d = 3; while d*d <= n { if n%d==0 { return false; } d+=2; } true }',
      },
      {
        name: 'Finding Next Prime',
        description:
          'Start at nbr and keep incrementing until is_prime returns true. If nbr itself is prime, return it immediately.',
        example: 'let mut n = nbr; while !is_prime(n) { n += 1; } n',
      },
      {
        name: 'Even Number Shortcut',
        description:
          'Only 2 is an even prime. If your starting number is even and > 2, bump to the next odd before entering the loop.',
        example: 'if n > 2 && n % 2 == 0 { n += 1; }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `fn is_prime(n: usize) -> bool {
    if n < 2 { return false; }
    if n == 2 { return true; }
    // Even numbers greater than 2 are never prime
    if n % 2 == 0 { return false; }
    // Only check odd divisors up to √n
    let mut d = 3;
    while d * d <= n {
        if n % d == 0 { return false; }
        d += 2;
    }
    true
}

pub fn next_prime(nbr: usize) -> usize {
    let mut n = nbr;
    // Increment until we land on a prime (nbr itself counts if it's prime)
    while !is_prime(n) {
        n += 1;
    }
    n
}`,
  },

  previousprime: {
    builtinFunctions: [
      {
        name: '% (modulo operator)',
        signature: 'lhs % rhs -> T',
        description: 'Check divisibility: n % d == 0 means d divides n',
        example: '15 % 5 // 0',
      },
    ],
    concepts: [
      {
        name: 'Primality Check',
        description:
          'A number n ≥ 2 is prime if no integer from 2 to √n divides it evenly.',
        example:
          'fn is_prime(n: u64) -> bool { /* check 2, then odd d up to sqrt(n) */ }',
      },
      {
        name: 'Finding Previous Prime',
        description:
          'Start at nbr and keep decrementing until is_prime returns true. Return 2 as the floor — there is no prime below 2.',
        example: 'let mut n = nbr; while n > 2 && !is_prime(n) { n -= 1; } n',
      },
    ],
    dataStructures: [],
    annotatedSolution: `fn is_prime(n: u64) -> bool {
    if n < 2 { return false; }
    if n == 2 { return true; }
    if n % 2 == 0 { return false; }
    let mut d = 3u64;
    while d * d <= n {
        if n % d == 0 { return false; }
        d += 2;
    }
    true
}

pub fn prev_prime(nbr: u64) -> u64 {
    if nbr <= 2 { return 2; }
    let mut n = nbr;
    // Decrement until we find a prime
    while !is_prime(n) {
        n -= 1;
    }
    n
}`,
  },

  count_factorial_steps: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Factorial Sequence',
        description:
          'Factorials: 1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120. Count how many multiplications produce the given factorial.',
        example: 'factorial=24: 1×2=2, 2×3=6, 6×4=24 → 3 steps',
      },
      {
        name: 'Step Counting Loop',
        description:
          'Multiply a product by an increasing multiplier each step and count until you reach the target.',
        example:
          'let mut prod = 1u64; let mut mult = 1u64; let mut count = 0u64; while prod < target { mult += 1; prod *= mult; count += 1; }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn count_factorial_steps(factorial: u64) -> u64 {
    if factorial <= 1 { return 0; }
    let mut product = 1u64;
    let mut multiplier = 1u64;
    let mut steps = 0u64;
    // Multiply by 2, then 3, then 4... and count each step
    while product < factorial {
        multiplier += 1;
        product *= multiplier;
        steps += 1;
    }
    steps
}`,
  },

  lucas_number: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Lucas Sequence',
        description:
          'L(0)=2, L(1)=1, L(n)=L(n-1)+L(n-2). Like Fibonacci but starts with 2, 1 instead of 0, 1.',
        example: 'L: 2, 1, 3, 4, 7, 11, 18, 29, ...',
      },
      {
        name: 'Iterative vs Recursive',
        description:
          'Use two variables and update them in a loop instead of recursion. Avoids O(2^n) stack calls.',
        example:
          'let (mut a, mut b) = (2u32, 1u32); for _ in 2..=n { let next = a + b; a = b; b = next; }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn lucas_number(n: u32) -> u32 {
    // Base cases
    if n == 0 { return 2; }
    if n == 1 { return 1; }
    let (mut prev, mut curr) = (2u32, 1u32);
    // Apply the recurrence L(n) = L(n-1) + L(n-2) iteratively
    for _ in 2..=n {
        let next = prev + curr;
        prev = curr;
        curr = next;
    }
    curr
}`,
  },

  matrix_determinant: {
    builtinFunctions: [],
    concepts: [
      {
        name: '3×3 Determinant Formula',
        description:
          'det(A) = a(ei−fh) − b(di−fg) + c(dh−eg)\nwhere rows are [a,b,c], [d,e,f], [g,h,i].\nThis is cofactor expansion along the first row.',
        example: '[[1,2,3],[4,5,6],[7,8,9]] → det = 0',
      },
      {
        name: '2D Array Indexing',
        description: 'Access element at row r, column c with `matrix[r][c]`',
        example: 'let a = matrix[0][0]; let e = matrix[1][1];',
      },
    ],
    dataStructures: [
      {
        name: '[[isize; 3]; 3]',
        description: 'A fixed-size 3×3 2D array of signed integers. Row-major: matrix[row][col].',
        example: 'let m: [[isize; 3]; 3] = [[1,2,3],[4,5,6],[7,8,9]];',
      },
    ],
    annotatedSolution: `pub fn matrix_determinant(matrix: [[isize; 3]; 3]) -> isize {
    // Destructure rows for readability
    let [a, b, c] = matrix[0];
    let [d, e, f] = matrix[1];
    let [g, h, i] = matrix[2];
    // Cofactor expansion along the first row
    a * (e * i - f * h)
    - b * (d * i - f * g)
    + c * (d * h - e * g)
}`,
  },

  own_and_return: {
    builtinFunctions: [
      {
        name: '.clone()',
        signature: 'fn clone(&self) -> Self',
        description:
          'Makes an owned, independent copy of a value. Use it to return an owned `String` out of a borrowed struct without taking ownership of the struct.',
        example: 'let owned: String = film.name.clone();',
      },
      {
        name: '.to_owned() / .to_string()',
        signature: 'fn to_owned(&self) -> String',
        description:
          'Turns a borrowed `&str` into an owned, heap-allocated `String`. Handy when building a struct from a string literal.',
        example: 'let f = Film { name: "Terminator".to_owned() };',
      },
    ],
    concepts: [
      {
        name: 'Ownership & Move Semantics',
        description:
          'A `String` has a single owner. Passing it (or a struct that contains it) *by value* moves ownership into the function — the original binding can no longer be used afterwards. This is exactly what `take_film_name` does: it consumes the `Film`.',
        example: 'pub fn take_film_name(film: Film) -> String { film.name } // film is moved in and dropped',
      },
      {
        name: 'Borrowing with `&`',
        description:
          'Taking `&Film` (a shared reference) *borrows* the value instead of owning it. The caller keeps the `Film` and can keep using it. You can take as many shared borrows as you like.',
        example: 'pub fn read_film_name(film: &Film) -> String { film.name.clone() }',
      },
      {
        name: 'You cannot move out of a borrow',
        description:
          'From `&Film` you only have read access, so `film.name` (a move) is rejected by the compiler. Return `film.name.clone()` to hand back an owned copy while leaving the borrowed `Film` intact.',
        example: 'film.name.clone() // OK — clone instead of move',
      },
      {
        name: 'Moving a field out of an owned value',
        description:
          'When you *own* the struct (took it by value), you may move a field straight out: `film.name`. This consumes `film`, which is why the value cannot be reused after `take_film_name`.',
        example: 'pub fn take_film_name(film: Film) -> String { film.name }',
      },
    ],
    dataStructures: [
      {
        name: 'Struct',
        description: 'A named collection of typed fields. Here `Film` holds a single owned `String`.',
        example: 'pub struct Film { pub name: String }',
      },
      {
        name: 'String',
        description:
          'An owned, growable, heap-allocated UTF-8 string. It is moved (not copied) by default, so you must clone it to keep the original usable.',
        example: 'let s: String = "hi".to_owned();',
      },
      {
        name: 'Shared reference `&T`',
        description: 'A read-only borrow of a value. Lets a function look at data without taking ownership of it.',
        example: 'fn read(film: &Film) { /* film is borrowed, not owned */ }',
      },
    ],
    annotatedSolution: `// A struct with a single owned String field.
pub struct Film {
    pub name: String,
}

// Borrow the Film through a shared reference: \`&Film\`.
// Because we don't own the Film, we can't move its name out —
// so we hand back an owned *copy* with \`.clone()\`.
// The caller's Film stays valid, so this can be called repeatedly.
pub fn read_film_name(film: &Film) -> String {
    film.name.clone()
}

// Take the Film *by value*: ownership moves into this function.
// We move the \`name\` String straight out of the struct and return it.
// The Film is consumed (dropped) here, so the caller can no longer
// use it — any later use is a compile-time error.
pub fn take_film_name(film: Film) -> String {
    film.name
}`,
  },

  check_user_name: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Enum Definition',
        description:
          'An enum type can be one of several named variants. Each variant may optionally carry data.',
        example: 'pub enum AccessLevel { Admin, Regular, Guest }',
      },
      {
        name: 'match on Enum',
        description:
          'Use `match` to branch on which variant you have. Every variant must be covered (or use `_ =>`)',
        example:
          'match level { AccessLevel::Admin => "admin", AccessLevel::Regular => "user", _ => "guest" }',
      },
      {
        name: 'impl on Enum',
        description: 'You can add methods to an enum the same way as a struct',
        example:
          'impl AccessLevel { pub fn is_admin(&self) -> bool { matches!(self, AccessLevel::Admin) } }',
      },
    ],
    dataStructures: [
      {
        name: 'Enum',
        description:
          'A type that represents one of several mutually exclusive variants. Great for access levels, states, or categories.',
        example: 'enum Status { Active, Inactive, Pending }',
      },
    ],
    annotatedSolution: `pub enum AccessLevel {
    Admin,
    Regular,
    Guest,
}

pub fn check_user_name(name: &str, level: AccessLevel) -> String {
    // Different access levels get different prefixes
    let prefix = match level {
        AccessLevel::Admin   => "admin_",
        AccessLevel::Regular => "regular_",
        AccessLevel::Guest   => "guest_",
    };
    format!("{}{}", prefix, name)
}`,
  },

  dress_code: {
    builtinFunctions: [],
    concepts: [
      {
        name: '#[derive(...)] Macro',
        description:
          '`#[derive(Debug, PartialEq, Eq)]` auto-generates implementations of those traits. PartialEq enables `==` comparisons.',
        example: '#[derive(Debug, PartialEq, Eq)]\nenum Dress { Casual, Formal }',
      },
      {
        name: 'Enum Variants as Values',
        description:
          'Match on enum variants to produce different outputs. The variants represent discrete dress code levels.',
        example: 'match code { DressCode::Formal => 3, DressCode::Casual => 0, ... }',
      },
    ],
    dataStructures: [
      {
        name: 'Enum (with derives)',
        description:
          'An enum with Debug + PartialEq + Eq can be printed and compared with ==',
        example: '#[derive(Debug, PartialEq, Eq)] enum DressCode { Casual, Business, Formal }',
      },
    ],
    annotatedSolution: `#[derive(Debug, PartialEq, Eq)]
pub enum DressCode {
    Casual,
    SmartCasual,
    Business,
    Formal,
}

// Returns a numeric level for the dress code (0 = most casual)
pub fn dress_code_level(code: &DressCode) -> u32 {
    match code {
        DressCode::Casual      => 0,
        DressCode::SmartCasual => 1,
        DressCode::Business    => 2,
        DressCode::Formal      => 3,
    }
}`,
  },

  get_document_id: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Copy Trait',
        description:
          '`#[derive(Clone, Copy)]` makes the enum automatically copyable — it can be passed by value without a move.',
        example: '#[derive(Clone, Copy)]\nenum DocType { Invoice, Receipt }',
      },
      {
        name: 'Enum → Integer Mapping',
        description:
          'Use match to map each enum variant to a unique numeric ID.',
        example:
          'match doc { DocType::Invoice => 1, DocType::Receipt => 2, DocType::Contract => 3 }',
      },
    ],
    dataStructures: [
      {
        name: 'Enum with Clone + Copy',
        description:
          'A lightweight enum whose values are automatically copied rather than moved.',
        example: '#[derive(Debug, PartialEq, Eq, Clone, Copy)] enum Id { A, B, C }',
      },
    ],
    annotatedSolution: `#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum DocType {
    Invoice,
    Receipt,
    Contract,
}

pub fn get_document_id(doc: DocType) -> u32 {
    // Assign a unique ID to each document type variant
    match doc {
        DocType::Invoice  => 1,
        DocType::Receipt  => 2,
        DocType::Contract => 3,
    }
}`,
  },

  order_books: {
    builtinFunctions: [
      {
        name: 'Vec::sort_by()',
        signature: 'fn sort_by<F>(&mut self, compare: F) where F: FnMut(&T, &T) -> Ordering',
        description: 'Sorts the Vec in-place using a custom comparator closure',
        example: 'books.sort_by(|a, b| a.title.cmp(&b.title));',
      },
      {
        name: 'Ord::cmp()',
        signature: 'fn cmp(&self, other: &Self) -> Ordering',
        description: 'Lexicographic comparison: returns Less, Equal, or Greater',
        example: '"apple".cmp("banana") // Less',
      },
      {
        name: '.then_with()',
        signature: 'fn then_with<F>(self, f: F) -> Ordering',
        description: 'Chain a secondary sort key: if the primary result is Equal, apply f()',
        example:
          'a.author.cmp(&b.author).then_with(|| a.title.cmp(&b.title))',
      },
    ],
    concepts: [
      {
        name: 'Sorting with Closures',
        description:
          'Pass a closure to `sort_by` that takes two elements (a, b) and returns an Ordering.',
        example: 'v.sort_by(|a, b| a.field.cmp(&b.field));',
      },
      {
        name: 'Multi-key Sorting',
        description:
          'Chain `.then_with()` to sort by a secondary key when the primary keys are equal.',
        example: 'a.last_name.cmp(&b.last_name).then_with(|| a.first_name.cmp(&b.first_name))',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<Book>',
        description: 'A mutable list of book structs that can be sorted in-place',
        example: 'let mut books: Vec<Book> = vec![...]; books.sort_by(...);',
      },
    ],
    annotatedSolution: `pub fn order_books(mut books: Vec<Book>) -> Vec<Book> {
    // Sort by author first, then by title when authors are the same
    books.sort_by(|a, b| {
        a.author
            .cmp(&b.author)
            .then_with(|| a.title.cmp(&b.title))
    });
    books
}`,
  },

  prime_checker: {
    builtinFunctions: [
      {
        name: '% (modulo)',
        signature: 'lhs % rhs -> T',
        description: 'Remainder after division; n % d == 0 means d divides n',
        example: '15 % 3 // 0  (3 divides 15)',
      },
      {
        name: 'f64::sqrt()',
        signature: 'fn sqrt(self) -> f64',
        description: 'Square root. Use to limit divisor checks to √n.',
        example: '(n as f64).sqrt() as u64',
      },
    ],
    concepts: [
      {
        name: 'Enum with Data (Variant Payload)',
        description:
          'Enum variants can carry data: `NotPrime(u64)` stores the first divisor found.',
        example: 'enum PrimeResult { Prime, NotPrime(u64) }',
      },
      {
        name: 'Primality Check Loop',
        description:
          'For each candidate divisor d from 2 to √n: if n % d == 0, n is not prime and d is its smallest factor.',
        example:
          'for d in 2..=((n as f64).sqrt() as u64) { if n % d == 0 { return PrimeResult::NotPrime(d); } }',
      },
    ],
    dataStructures: [
      {
        name: 'Enum (discriminated union)',
        description:
          'Either Prime (no payload) or NotPrime(smallest_divisor). Returned to the caller to inspect.',
        example: '#[derive(PartialEq, Eq, Debug)] enum PrimeResult { Prime, NotPrime(u64) }',
      },
    ],
    annotatedSolution: `#[derive(PartialEq, Eq, Debug)]
pub enum PrimeResult {
    Prime,
    NotPrime(u64),
}

pub fn prime_checker(n: u64) -> PrimeResult {
    if n < 2 { return PrimeResult::NotPrime(n); }
    // Check every divisor from 2 up to √n
    for d in 2..=((n as f64).sqrt() as u64) {
        if n % d == 0 {
            // Found a divisor — return it as the witness that n is composite
            return PrimeResult::NotPrime(d);
        }
    }
    PrimeResult::Prime
}`,
  },

  queens: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Queens Attack Rule',
        description:
          'Two queens attack each other if they share the same row, the same column, or the same diagonal. Diagonal check: |r1−r2| == |c1−c2|',
        example:
          'let same_diag = (self.row - other.row).abs() == (self.col - other.col).abs();',
      },
      {
        name: 'Struct with Methods',
        description:
          'Define a Queen struct with position fields and add methods in an `impl` block.',
        example:
          'impl Queen { pub fn can_attack(&self, other: Queen) -> bool { ... } }',
      },
    ],
    dataStructures: [
      {
        name: 'Struct',
        description:
          'Holds the (row, col) board position of a queen. Derive Clone, Copy so it can be passed by value easily.',
        example: '#[derive(Debug, Clone, Copy)] struct Queen { row: i32, col: i32 }',
      },
    ],
    annotatedSolution: `#[derive(Debug, Clone, Copy)]
pub struct Queen {
    pub row: i32,
    pub col: i32,
}

impl Queen {
    pub fn new(row: i32, col: i32) -> Queen {
        Queen { row, col }
    }

    pub fn can_attack(&self, other: Queen) -> bool {
        let same_row  = self.row == other.row;
        let same_col  = self.col == other.col;
        // Diagonal: the absolute difference in rows equals the difference in columns
        let same_diag = (self.row - other.row).abs() == (self.col - other.col).abs();
        same_row || same_col || same_diag
    }
}`,
  },

  rot21: {
    builtinFunctions: [
      {
        name: 'char::is_ascii_alphabetic()',
        signature: 'fn is_ascii_alphabetic(self) -> bool',
        description: 'Returns true if the character is an ASCII letter (a-z or A-Z)',
        example: "'a'.is_ascii_alphabetic() // true  '3'.is_ascii_alphabetic() // false",
      },
      {
        name: 'char::is_ascii_lowercase()',
        signature: 'fn is_ascii_lowercase(self) -> bool',
        description: 'Returns true if the character is a lowercase ASCII letter',
        example: "'a'.is_ascii_lowercase() // true  'A'.is_ascii_lowercase() // false",
      },
      {
        name: 'as u8 / as char',
        signature: '',
        description:
          'Cast a char to its ASCII byte value for arithmetic, then cast back to char',
        example: "let byte = 'a' as u8; // 97\n(97u8 + 5) as char // 'f'",
      },
    ],
    concepts: [
      {
        name: 'ROT-N Cipher Formula',
        description:
          'To shift letter c by N: `(c as u8 - base + N) % 26 + base` where base is b\'a\' for lowercase or b\'A\' for uppercase.',
        example: "let shifted = (c as u8 - b'a' + 21) % 26 + b'a';",
      },
      {
        name: 'ROT21 = Shift Backwards 5',
        description:
          'ROT21 shifts forward 21, which is the same as shifting backward 5 (21 + 5 = 26). a→v, z→u, A→V.',
        example: "'a' + 21 positions = 'v'",
      },
      {
        name: 'Iterator map + collect',
        description:
          'Apply a transformation to every character with `.map()`, then collect back into a String.',
        example: 'input.chars().map(|c| transform(c)).collect::<String>()',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn rot21(input: &str) -> String {
    input.chars().map(|c| {
        if c.is_ascii_alphabetic() {
            // Determine the alphabet base for this character's case
            let base = if c.is_ascii_lowercase() { b'a' } else { b'A' };
            // Shift by 21 positions with wrap-around modulo 26
            let shifted = (c as u8 - base + 21) % 26 + base;
            shifted as char
        } else {
            c  // non-alphabetic characters pass through unchanged
        }
    }).collect()
}`,
  },

  scytale_decoder: {
    builtinFunctions: [
      {
        name: 'String::len()',
        signature: 'fn len(&self) -> usize',
        description: 'Returns the number of bytes (= chars for ASCII text)',
        example: '"hello".len() // 5',
      },
      {
        name: '.chars().collect::<Vec<char>>()',
        signature: '',
        description: 'Collect all characters into an indexed Vec for O(1) access by index',
        example: 'let chars: Vec<char> = s.chars().collect();',
      },
    ],
    concepts: [
      {
        name: 'Scytale Cipher — Transposition',
        description:
          'Text is written row-by-row in a grid of `letters_per_turn` columns, then read column-by-column.\nTo decode: know the number of rows = len / letters_per_turn, then read position [row * cols + col].',
        example:
          'Encoded "HLOEL" with 3 cols → grid [[H,L,O],[E,L,?]] → decode by reading cols: "HELLO"',
      },
      {
        name: 'Validity Check → Option<String>',
        description:
          'If the string length is not divisible by letters_per_turn the encoding is invalid → return None.',
        example: 'if len % letters_per_turn != 0 { return None; }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    let len = s.len();
    if letters_per_turn == 0 { return None; }
    // Valid encoded strings have length divisible by letters_per_turn
    if len % letters_per_turn != 0 { return None; }
    let rows = len / letters_per_turn;
    let chars: Vec<char> = s.chars().collect();
    let mut result = String::with_capacity(len);
    // Read the grid column by column to undo the row-by-row encoding
    for col in 0..letters_per_turn {
        for row in 0..rows {
            result.push(chars[row * letters_per_turn + col]);
        }
    }
    Some(result)
}`,
  },

  negative_spelling: {
    builtinFunctions: [
      {
        name: 'i64::abs()',
        signature: 'fn abs(self) -> i64',
        description: 'Returns the absolute value',
        example: '(-42i64).abs() // 42',
      },
      {
        name: 'format!()',
        signature: 'macro format!(fmt, args...) -> String',
        description: 'Creates a formatted String',
        example: 'format!("negative {}", inner_result)',
      },
    ],
    concepts: [
      {
        name: 'Recursive Spelling',
        description:
          'Handle negatives by prepending "negative" and recursing on the absolute value. Handle base cases (0-19, tens) with match/array lookup.',
        example: 'if n < 0 { return format!("negative {}", spell(n.abs())); }',
      },
      {
        name: 'Number-to-Words Mapping',
        description:
          'Use arrays for ones (0-19) and tens (20,30,...90), then compose larger numbers from smaller ones.',
        example:
          'let ones = ["zero","one","two",...]; if n < 20 { return ones[n].to_string(); }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn negative_spell(n: i64) -> String {
    if n == 0 { return "zero".to_string(); }
    if n < 0  { return format!("negative {}", negative_spell(-n)); }

    let ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight",
                "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
                "sixteen", "seventeen", "eighteen", "nineteen"];
    let tens = ["", "", "twenty", "thirty", "forty", "fifty",
                "sixty", "seventy", "eighty", "ninety"];

    if n < 20 { return ones[n as usize].to_string(); }
    if n < 100 {
        let t = tens[n as usize / 10];
        if n % 10 == 0 { return t.to_string(); }
        return format!("{}-{}", t, ones[n as usize % 10]);
    }
    if n < 1000 {
        let rest = n % 100;
        let tail = if rest == 0 { String::new() } else { format!(" {}", negative_spell(rest)) };
        return format!("{} hundred{}", ones[n as usize / 100], tail);
    }
    format!("{}", n)  // extend for larger numbers as needed
}`,
  },

  matrix_display: {
    builtinFunctions: [
      {
        name: 'write!(f, ...)',
        signature: 'macro write!(writer, format, args...) -> fmt::Result',
        description:
          'Writes formatted text to a formatter. Use inside `fmt::Display` implementations.',
        example: 'write!(f, "({}, {})", self.0, self.1)',
      },
    ],
    concepts: [
      {
        name: 'std::fmt::Display Trait',
        description:
          'Implement Display so your type can be printed with `{}`. The required method is `fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result`.',
        example:
          'impl fmt::Display for Matrix {\n  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n    write!(f, "( {} {} )\\n( {} {} )", self.0.0, self.0.1, self.1.0, self.1.1)\n  }\n}',
      },
      {
        name: 'Returning fmt::Result',
        description:
          'The `fmt` method must return `fmt::Result`. Simply return what `write!` returns — it already returns `fmt::Result`.',
        example: 'fn fmt(...) -> fmt::Result { write!(f, "...") }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `use std::fmt;

// Matrix is a tuple struct: two rows, each row is a pair of f32
pub struct Matrix(pub (f32, f32), pub (f32, f32));

impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Print row 1, newline, then row 2
        write!(
            f,
            "( {} {} )\\n( {} {} )",
            self.0 .0, self.0 .1,
            self.1 .0, self.1 .1
        )
    }
}`,
  },

  office_worker: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Struct with Enum Fields',
        description:
          'A struct can contain enum-typed fields to represent categorical attributes.',
        example: 'struct Worker { name: String, role: Role, dept: Dept }',
      },
      {
        name: '#[derive(PartialEq, Eq)]',
        description:
          'Automatically implements equality comparisons so you can use `==` on the type.',
        example: '#[derive(Debug, PartialEq, Eq)] struct Worker { ... }',
      },
    ],
    dataStructures: [
      {
        name: 'Struct with enum fields',
        description:
          'Combine struct and enum types to represent domain entities with categorical properties.',
        example: 'struct OfficeWorker { name: String, role: Role, department: Dept }',
      },
    ],
    annotatedSolution: `#[derive(Debug, PartialEq, Eq)]
pub enum Department { Engineering, HR, Marketing, Finance }

#[derive(Debug, PartialEq, Eq)]
pub enum Role { Manager, Developer, Analyst }

#[derive(Debug, PartialEq, Eq)]
pub struct OfficeWorker {
    pub name: String,
    pub role: Role,
    pub department: Department,
}

impl OfficeWorker {
    pub fn new(name: &str, role: Role, department: Department) -> Self {
        OfficeWorker { name: name.to_string(), role, department }
    }
}`,
  },

  organize_garage: {
    builtinFunctions: [
      {
        name: 'Vec::sort_by_key()',
        signature: 'fn sort_by_key<K, F>(&mut self, f: F)',
        description:
          'Sort in-place by extracting a sortable key from each element. Simpler than sort_by for single-field sorts.',
        example: 'items.sort_by_key(|item| item.name.clone());',
      },
      {
        name: 'Vec::sort_by()',
        signature: 'fn sort_by<F>(&mut self, compare: F)',
        description: 'Sort using a comparator closure that returns Ordering',
        example: 'items.sort_by(|a, b| a.size.cmp(&b.size));',
      },
    ],
    concepts: [
      {
        name: 'In-Place Sorting',
        description: 'sort_by_key and sort_by modify the Vec in-place (no allocation needed)',
        example: 'items.sort_by_key(|i| i.weight);',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<GarageItem>',
        description: 'A mutable list of items. sort_by_key sorts it in-place.',
        example: 'let mut garage: Vec<GarageItem> = vec![...]; garage.sort_by_key(...);',
      },
    ],
    annotatedSolution: `pub fn organize_garage(mut items: Vec<GarageItem>) -> Vec<GarageItem> {
    // Sort items alphabetically by name (adjust field to match the actual struct)
    items.sort_by_key(|item| item.name.clone());
    items
}`,
  },

  blood_types_s: {
    builtinFunctions: [
      {
        name: 'HashSet::contains()',
        signature: 'fn contains<Q>(&self, value: &Q) -> bool',
        description: 'Returns true if the value is in the set',
        example: 'set.contains(&BloodType::A)',
      },
      {
        name: 'HashSet::insert()',
        signature: 'fn insert(&mut self, value: T) -> bool',
        description: 'Adds a value to the set. Returns true if it was new.',
        example: 'set.insert(BloodType::O);',
      },
      {
        name: 'HashSet::intersection()',
        signature: "fn intersection<'a>(&'a self, other: &'a HashSet<T>) -> Intersection",
        description: 'Iterator over values present in both sets',
        example: 'a.intersection(&b).cloned().collect::<HashSet<_>>()',
      },
    ],
    concepts: [
      {
        name: 'Blood Type Compatibility',
        description:
          'ABO rules: O can donate to any; A donates to A, AB; B donates to B, AB; AB donates only to AB.\nRh: Rh-negative can donate to both Rh+ and Rh-; Rh+ can only donate to Rh+.',
        example: 'O- is the universal donor; AB+ is the universal recipient',
      },
      {
        name: 'HashSet for Unique Collections',
        description:
          'Use HashSet when you need a collection of unique elements and fast membership testing.',
        example: 'let compatible: HashSet<BloodType> = HashSet::new();',
      },
    ],
    dataStructures: [
      {
        name: 'HashSet<BloodType>',
        description:
          'An unordered set of unique blood types. Requires Hash + Eq derives on BloodType.',
        example: '#[derive(Debug, PartialEq, Eq, Hash)]\nenum BloodType { A, B, O, AB }',
      },
    ],
    annotatedSolution: `// Blood type compatibility (ABO + Rh factor)
pub fn can_donate(donor: BloodType, recipient: BloodType) -> bool {
    // ABO compatibility: donor ABO must be "compatible" with recipient ABO
    let abo_ok = match (donor.abo, recipient.abo) {
        (ABO::O, _)                         => true, // O gives to anyone
        (ABO::A, ABO::A | ABO::AB)          => true,
        (ABO::B, ABO::B | ABO::AB)          => true,
        (ABO::AB, ABO::AB)                  => true,
        _                                   => false,
    };
    // Rh: negative can donate to both; positive can only donate to positive
    let rh_ok = !donor.rh_positive || recipient.rh_positive;
    abo_ok && rh_ok
}`,
  },

  format_me: {
    builtinFunctions: [
      {
        name: 'write!(f, ...)',
        signature: 'macro write!(writer, fmt, args...) -> fmt::Result',
        description: 'Write formatted text into a formatter inside Display',
        example: 'write!(f, "name: {}, age: {}", self.name, self.age)',
      },
      {
        name: 'writeln!(f, ...)',
        signature: 'macro writeln!(writer, fmt, args...) -> fmt::Result',
        description: 'Like write! but appends a newline character',
        example: 'writeln!(f, "first line")?;',
      },
      {
        name: '? operator',
        signature: '',
        description:
          'Propagates errors: if write! returns Err, the ? immediately returns that Err from fmt()',
        example: 'write!(f, "{}", self.a)?; write!(f, "{}", self.b)',
      },
    ],
    concepts: [
      {
        name: 'std::fmt::Display Trait',
        description:
          'Implementing Display lets your type be printed with `{}`. Method: `fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result`',
        example:
          'impl fmt::Display for Person {\n  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n    write!(f, "{} ({})", self.name, self.age)\n  }\n}',
      },
    ],
    dataStructures: [],
    annotatedSolution: `use std::fmt;

pub struct Person {
    pub name: String,
    pub age: u32,
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Use write! to send formatted text to the formatter
        write!(f, "name: {}, age: {}", self.name, self.age)
    }
}`,
  },

  moving_targets: {
    builtinFunctions: [
      {
        name: 'Box::new()',
        signature: 'fn new(x: T) -> Box<T>',
        description: 'Allocates a value on the heap and returns a pointer to it (Box)',
        example: 'let b = Box::new(5); // heap-allocated 5',
      },
    ],
    concepts: [
      {
        name: 'Recursive Types need Box',
        description:
          'A struct that contains itself directly has infinite size (compile error). Wrap the recursive field in `Box<T>` to make it a fixed-size pointer.',
        example: 'struct Node { value: i32, next: Option<Box<Node>> }',
      },
      {
        name: 'Linked List Pattern',
        description:
          'A "Field" (linked list) is either empty (head = None) or a head node pointing to the rest of the list.',
        example:
          'struct Field { head: Option<Box<Target>> }\nstruct Target { value: i32, next: Option<Box<Target>> }',
      },
      {
        name: 'Ownership in Linked Lists',
        description:
          'Each node owns the next node through `Box`. When a node is dropped, the whole chain is freed recursively.',
        example: 'drop(list); // frees head, which frees next, which frees next, ...',
      },
    ],
    dataStructures: [
      {
        name: 'Box<T>',
        description:
          'A heap-allocated value with single ownership. Required to break the infinite-size cycle in recursive structs.',
        example: 'next: Option<Box<Node>>  // None = end of list, Some(box) = next node',
      },
      {
        name: 'Option<Box<T>>',
        description:
          'Represents either the end of the list (None) or the next node (Some(boxed_node)).',
        example: 'let next: Option<Box<Target>> = None; // end of list',
      },
    ],
    annotatedSolution: `pub struct Target {
    pub val: i32,
    pub next: Option<Box<Target>>,
}

pub struct Field {
    pub head: Option<Box<Target>>,
}

impl Field {
    // Start with an empty list (head = None)
    pub fn new() -> Field {
        Field { head: None }
    }

    // Prepend a value to the front of the list
    pub fn push(&mut self, val: i32) {
        let new_node = Box::new(Target {
            val,
            // The new node's "next" takes ownership of the current head
            next: self.head.take(),
        });
        self.head = Some(new_node);
    }

    // Remove and return the front value
    pub fn pop(&mut self) -> Option<i32> {
        self.head.take().map(|node| {
            self.head = node.next;
            node.val
        })
    }
}`,
  },

  car_rental: {
    builtinFunctions: [
      {
        name: 'RefCell::borrow_mut()',
        signature: 'fn borrow_mut(&self) -> RefMut<T>',
        description:
          'Mutably borrows the RefCell value at runtime. Panics if already borrowed. Use to mutate through &self.',
        example: '*self.mileage.borrow_mut() += distance;',
      },
      {
        name: 'RefCell::borrow()',
        signature: 'fn borrow(&self) -> Ref<T>',
        description: 'Immutably borrows the value. Panics if mutably borrowed.',
        example: 'let m = *self.mileage.borrow();',
      },
      {
        name: 'Cell::get() / Cell::set()',
        signature: 'fn get(&self) -> T  /  fn set(&self, val: T)',
        description: 'Interior mutability for Copy types without borrowing',
        example: 'self.fuel.set(self.fuel.get() - used);',
      },
    ],
    concepts: [
      {
        name: 'Interior Mutability',
        description:
          'RefCell and Cell allow mutation through a shared reference (&self). The borrow rules are checked at runtime instead of compile time.',
        example:
          'struct Car { mileage: RefCell<u32> }\nimpl Car { fn drive(&self, km: u32) { *self.mileage.borrow_mut() += km; } }',
      },
      {
        name: 'When to use RefCell vs Cell',
        description:
          'Cell: for Copy types (integers, booleans) — simpler get/set API.\nRefCell: for non-Copy types (String, Vec) — runtime borrow checking.',
        example: 'Cell<u32> for mileage; RefCell<String> for registration plate',
      },
    ],
    dataStructures: [
      {
        name: 'RefCell<T>',
        description:
          'Enables mutable borrows at runtime through a shared reference. Wrap fields you need to mutate via &self.',
        example: 'struct Car { mileage: RefCell<u32> }',
      },
      {
        name: 'Cell<T: Copy>',
        description:
          'Simpler interior mutability for Copy types. No borrow — just get() and set().',
        example: 'struct Car { rented: Cell<bool> }',
      },
    ],
    annotatedSolution: `use std::cell::{Cell, RefCell};

pub struct Car {
    pub model: String,
    pub mileage: RefCell<u32>, // RefCell because u32 is Copy but we want &self mutation
    pub available: Cell<bool>, // Cell because bool is Copy — simpler API
}

pub struct RentalBusiness {
    pub cars: Vec<Car>,
}

impl Car {
    pub fn new(model: &str) -> Car {
        Car {
            model: model.to_string(),
            mileage: RefCell::new(0),
            available: Cell::new(true),
        }
    }

    // Drive the car — mutates mileage through interior mutability (&self, not &mut self)
    pub fn drive(&self, km: u32) {
        *self.mileage.borrow_mut() += km;
    }

    pub fn rent(&self) {
        self.available.set(false);
    }

    pub fn return_car(&self) {
        self.available.set(true);
    }
}`,
  },

  modify_letter: {
    builtinFunctions: [
      {
        name: 'str::chars()',
        signature: 'fn chars(&self) -> Chars',
        description: 'Returns an iterator over the characters of the string',
        example: '"hello".chars() // h, e, l, l, o',
      },
      {
        name: 'char::eq_ignore_ascii_case()',
        signature: 'fn eq_ignore_ascii_case(&self, other: &char) -> bool',
        description: 'Case-insensitive comparison of two ASCII characters',
        example: "'A'.eq_ignore_ascii_case(&'a') // true",
      },
      {
        name: 'Iterator::filter()',
        signature: 'fn filter<P>(self, predicate: P) -> Filter<Self, P>',
        description: 'Keeps only elements where the closure returns true',
        example: 'chars.filter(|&c| c != \'x\')',
      },
      {
        name: 'Iterator::collect::<String>()',
        signature: '',
        description: 'Collects a char iterator back into a String',
        example: 'chars.filter(...).collect::<String>()',
      },
    ],
    concepts: [
      {
        name: 'Case-Insensitive Letter Removal',
        description:
          'Use `eq_ignore_ascii_case` to remove both the upper and lower case variants of a letter in one filter.',
        example: ".filter(|&c| !c.eq_ignore_ascii_case(&letter))",
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn remove_letter_sensitive(s: &str, letter: char) -> String {
    // Filter out all occurrences of 'letter', regardless of case
    s.chars()
        .filter(|&c| !c.eq_ignore_ascii_case(&letter))
        .collect()
}`,
  },

  profanity_filter: {
    builtinFunctions: [
      {
        name: 'str::contains()',
        signature: 'fn contains<P: Pattern>(&self, pat: P) -> bool',
        description: 'Returns true if the string contains the given pattern/substring',
        example: '"hello world".contains("world") // true',
      },
    ],
    concepts: [
      {
        name: 'Result<T, E>',
        description:
          'Return `Ok(value)` for the success case and `Err(value)` for the failure case. Here: Ok(msg) = clean, Err(msg) = profane.',
        example:
          'fn check(msg: &str) -> Result<&str, &str> { if clean { Ok(msg) } else { Err(msg) } }',
      },
      {
        name: 'Matching on Result',
        description:
          'Callers use `match` or `if let Ok(m) = ...` to handle both outcomes.',
        example:
          'match check_ms(msg) { Ok(m) => println!("clean"), Err(m) => println!("blocked") }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `// Example profanity word list — the exercise may have its own list
const PROFANITY: &[&str] = &["badword1", "badword2"];

pub fn check_ms(message: &str) -> Result<&str, &str> {
    let lower = message.to_lowercase();
    for word in PROFANITY {
        if lower.contains(word) {
            // Message contains profanity — return Err with the original message
            return Err(message);
        }
    }
    // Message is clean
    Ok(message)
}`,
  },

  display_table: {
    builtinFunctions: [
      {
        name: 'write!(f, ...)',
        signature: 'macro write!(writer, fmt, args...) -> fmt::Result',
        description: 'Write formatted text to a formatter',
        example: 'write!(f, "{:<10} ", cell)',
      },
      {
        name: 'Format width specifiers',
        signature: '{:<width}  {:>width}  {:^width}',
        description:
          '`{:<10}` left-aligns in 10 chars, `{:>10}` right-aligns, `{:^10}` centers.',
        example: 'format!("{:<10}", "hi") // "hi        "',
      },
      {
        name: '.max() on iterator',
        signature: 'fn max(self) -> Option<T>',
        description: 'Returns the maximum value from an iterator',
        example: 'col.iter().map(|s| s.len()).max().unwrap_or(0)',
      },
    ],
    concepts: [
      {
        name: 'Aligned Table Formatting',
        description:
          'For each column, compute the max cell width across all rows. Then format each cell padded to that width.',
        example: 'let w = col.iter().map(|s| s.len()).max().unwrap(); format!("{:<width$}", cell, width=w)',
      },
      {
        name: 'fmt::Display for Multi-line Output',
        description:
          'Use multiple write!/writeln! calls inside fmt(). Use ? to propagate errors from each call.',
        example: 'for row in &self.rows { writeln!(f, "{}", row)?; }',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<Vec<String>>',
        description: '2D grid of strings representing table rows and columns',
        example: 'let grid: Vec<Vec<String>> = rows.iter().map(|r| r.cells.clone()).collect();',
      },
    ],
    annotatedSolution: `use std::fmt;

#[derive(Clone, Debug, PartialEq)]
pub struct Table {
    pub headers: Vec<String>,
    pub rows: Vec<Vec<String>>,
}

impl fmt::Display for Table {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Compute the maximum width needed for each column
        let widths: Vec<usize> = self.headers.iter().enumerate().map(|(i, h)| {
            let col_max = self.rows.iter()
                .filter_map(|r| r.get(i))
                .map(|s| s.len())
                .max()
                .unwrap_or(0);
            h.len().max(col_max)
        }).collect();

        // Print the header row
        for (i, h) in self.headers.iter().enumerate() {
            write!(f, "{:<width$} ", h, width = widths[i])?;
        }
        writeln!(f)?;

        // Print each data row
        for row in &self.rows {
            for (i, cell) in row.iter().enumerate() {
                write!(f, "{:<width$} ", cell, width = widths[i])?;
            }
            writeln!(f)?;
        }
        Ok(())
    }
}`,
  },

  drop_the_blog: {
    builtinFunctions: [
      {
        name: 'RefCell::borrow_mut()',
        signature: 'fn borrow_mut(&self) -> RefMut<T>',
        description: 'Get a mutable borrow of the inner value at runtime (panics if already borrowed)',
        example: 'self.posts.borrow_mut().push(post);',
      },
      {
        name: 'Cell::get() / Cell::set()',
        signature: '',
        description: 'Get or set a Copy value without borrowing — no RefMut needed',
        example: 'self.count.set(self.count.get() + 1);',
      },
    ],
    concepts: [
      {
        name: 'Interior Mutability',
        description:
          'RefCell and Cell allow mutation through &self (shared reference), bypassing the normal "only one &mut at a time" rule — checked at runtime instead.',
        example: 'struct Blog { posts: RefCell<Vec<String>>, count: Cell<u32> }',
      },
      {
        name: 'Drop Trait',
        description:
          'Implement the `Drop` trait to run cleanup code automatically when a value goes out of scope.',
        example: 'impl Drop for Blog { fn drop(&mut self) { println!("cleaned up"); } }',
      },
    ],
    dataStructures: [
      {
        name: 'RefCell<T>',
        description:
          'Wraps non-Copy types for interior mutability. Borrow-check happens at runtime.',
        example: 'posts: RefCell<Vec<String>>',
      },
      {
        name: 'Cell<T: Copy>',
        description: 'Wraps Copy types for interior mutability. Cheaper than RefCell for numbers/booleans.',
        example: 'count: Cell<u32>',
      },
    ],
    annotatedSolution: `use std::cell::{Cell, RefCell};

pub struct Blog {
    pub posts: RefCell<Vec<String>>,
    pub post_count: Cell<u32>,
}

impl Blog {
    pub fn new() -> Blog {
        Blog { posts: RefCell::new(Vec::new()), post_count: Cell::new(0) }
    }

    // Mutate through &self using interior mutability
    pub fn add_post(&self, post: String) {
        self.posts.borrow_mut().push(post);
        self.post_count.set(self.post_count.get() + 1);
    }
}

impl Drop for Blog {
    // Runs automatically when a Blog value is dropped / goes out of scope
    fn drop(&mut self) {
        println!("Blog dropped — had {} posts", self.post_count.get());
    }
}`,
  },

  filter_table: {
    builtinFunctions: [
      {
        name: 'Vec::retain()',
        signature: 'fn retain<F>(&mut self, f: F) where F: FnMut(&T) -> bool',
        description: 'Keeps only the elements where the closure returns true (in-place filter)',
        example: 'rows.retain(|r| r.score >= 50);',
      },
      {
        name: '.iter().filter().cloned().collect()',
        signature: '',
        description: 'Functional alternative: filter without modifying the original Vec',
        example: 'let out: Vec<_> = rows.iter().filter(|r| r.active).cloned().collect();',
      },
    ],
    concepts: [
      {
        name: 'In-place vs Functional Filter',
        description:
          '`retain()` mutates the Vec in-place (no allocation). `filter().collect()` creates a new Vec and leaves the original intact.',
        example: 'rows.retain(|r| r.value > 0); // in-place, no allocation',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<Row>',
        description: 'A list of table rows. Use retain() to remove rows that do not meet a condition.',
        example: 'let mut rows: Vec<Row> = vec![...]; rows.retain(|r| condition(r));',
      },
    ],
    annotatedSolution: `#[derive(Clone, Debug, PartialEq)]
pub struct Row {
    pub name: String,
    pub score: u32,
}

pub fn filter_table(mut rows: Vec<Row>, min_score: u32) -> Vec<Row> {
    // Keep only rows that meet the minimum score threshold
    rows.retain(|row| row.score >= min_score);
    rows
}`,
  },

  flat_tree: {
    builtinFunctions: [
      {
        name: 'BTreeSet::iter()',
        signature: 'fn iter(&self) -> Iter<T>',
        description: 'Returns an iterator over elements in sorted order',
        example: 'for item in tree.iter() { ... }',
      },
      {
        name: '.cloned()',
        signature: 'fn cloned(self) -> Cloned<Self>',
        description:
          'Creates an iterator that clones each &T element into an owned T value',
        example: 'tree.iter().cloned() // Iterator<Item=T>',
      },
      {
        name: '.collect()',
        signature: 'fn collect<B: FromIterator<Item>>(self) -> B',
        description: 'Consumes the iterator and gathers elements into a collection',
        example: 'tree.iter().cloned().collect::<Vec<T>>()',
      },
    ],
    concepts: [
      {
        name: 'BTreeSet Already Sorted',
        description:
          'BTreeSet keeps elements in sorted order. Collecting its iterator into a Vec preserves that order — no extra sorting needed.',
        example: 'tree.iter().cloned().collect::<Vec<_>>() // already sorted',
      },
      {
        name: 'ToOwned Trait Bound',
        description:
          '`T: ToOwned<Owned=T>` means T can produce an owned copy of itself. This is satisfied by types that implement Clone.',
        example: 'fn flatten<T: ToOwned<Owned=T>>(tree: &BTreeSet<T>) -> Vec<T>',
      },
    ],
    dataStructures: [
      {
        name: 'BTreeSet<T>',
        description:
          'A sorted set backed by a B-tree. Iteration always yields elements in ascending order.',
        example: 'let mut s: BTreeSet<i32> = BTreeSet::new(); s.insert(3); s.insert(1); // [1,3]',
      },
    ],
    annotatedSolution: `use std::collections::BTreeSet;

pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T> {
    // BTreeSet is already sorted; iter() yields elements in order.
    // cloned() turns &T references into owned T values.
    tree.iter().cloned().collect()
}`,
  },

  brackets_matching: {
    builtinFunctions: [
      {
        name: 'Vec::push()',
        signature: 'fn push(&mut self, value: T)',
        description: 'Push an opening bracket onto the stack',
        example: "stack.push('(');",
      },
      {
        name: 'Vec::pop()',
        signature: 'fn pop(&mut self) -> Option<T>',
        description: 'Pop the top element; returns None if the stack is empty',
        example: "stack.pop() // Some('(') or None",
      },
      {
        name: 'Vec::is_empty()',
        signature: 'fn is_empty(&self) -> bool',
        description: 'Returns true if there are no elements in the Vec',
        example: 'stack.is_empty() // true means all brackets matched',
      },
    ],
    concepts: [
      {
        name: 'Stack-based Bracket Matching',
        description:
          'Push each opening bracket onto a stack. When a closing bracket is seen, pop the stack and verify it matches. At the end, the stack must be empty.',
        example: '"([{}])" → push (, push [, push {, match }, match ], match ) → stack empty = balanced',
      },
      {
        name: 'Matching Pairs',
        description: "Map each closing bracket to its expected opener: ')' expects '(', ']' expects '[', '}' expects '{'",
        example: "')' => if stack.pop() != Some('(') { return false; }",
      },
    ],
    dataStructures: [
      {
        name: 'Vec<char> as Stack',
        description: 'A Vec used as a LIFO stack to track open brackets awaiting their match.',
        example: "let mut stack: Vec<char> = Vec::new();",
      },
    ],
    annotatedSolution: `pub fn brackets_matching(s: &str) -> bool {
    let mut stack: Vec<char> = Vec::new();
    for c in s.chars() {
        match c {
            // Opening brackets go onto the stack
            '(' | '[' | '{' => stack.push(c),
            // Closing brackets must match the top of the stack
            ')' => if stack.pop() != Some('(') { return false; },
            ']' => if stack.pop() != Some('[') { return false; },
            '}' => if stack.pop() != Some('{') { return false; },
            _   => {} // non-bracket characters are ignored
        }
    }
    // All brackets matched only if the stack is empty
    stack.is_empty()
}`,
  },

  brain_fuck: {
    builtinFunctions: [
      {
        name: 'u8::wrapping_add()',
        signature: 'fn wrapping_add(self, rhs: u8) -> u8',
        description: 'Add with overflow wrap-around (0xFF + 1 = 0x00)',
        example: '255u8.wrapping_add(1) // 0',
      },
      {
        name: 'u8::wrapping_sub()',
        signature: 'fn wrapping_sub(self, rhs: u8) -> u8',
        description: 'Subtract with underflow wrap-around (0x00 - 1 = 0xFF)',
        example: '0u8.wrapping_sub(1) // 255',
      },
    ],
    concepts: [
      {
        name: 'BrainFuck Commands',
        description:
          '> move tape right | < move tape left | + increment cell | - decrement cell | . output cell as char | , read input char | [ jump past ] if cell==0 | ] jump back to [ if cell!=0',
        example: '"++++++++++." → increment cell 10 times, print (newline)',
      },
      {
        name: 'Loop Handling ([ and ])',
        description:
          '[ : if current cell is 0, scan forward to the matching ] and skip the loop body.\n] : if current cell is nonzero, scan backward to the matching [ and repeat.',
        example: 'Track depth: [ increments depth, ] decrements; stop when depth reaches 0.',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<u8> as tape',
        description:
          'BrainFuck uses a "tape" of byte cells (classically 30 000 cells, all initialized to 0).',
        example: 'let mut tape: Vec<u8> = vec![0; 30_000];',
      },
      {
        name: 'Vec<char> for code tokens',
        description: 'Collect the program into a Vec<char> so you can index by instruction pointer',
        example: 'let code: Vec<char> = program.chars().collect();',
      },
    ],
    annotatedSolution: `pub fn brain_fuck(program: &str, input: &str) -> String {
    let code: Vec<char> = program.chars().collect();
    let mut tape = vec![0u8; 30_000]; // the memory tape
    let mut ptr = 0usize;             // data pointer (index into tape)
    let mut ip  = 0usize;             // instruction pointer
    let mut input_iter = input.bytes();
    let mut output = String::new();

    while ip < code.len() {
        match code[ip] {
            '>' => ptr += 1,
            '<' => { if ptr > 0 { ptr -= 1; } }
            '+' => tape[ptr] = tape[ptr].wrapping_add(1),
            '-' => tape[ptr] = tape[ptr].wrapping_sub(1),
            '.' => output.push(tape[ptr] as char),
            ',' => tape[ptr] = input_iter.next().unwrap_or(0),
            '[' => if tape[ptr] == 0 {
                // Skip forward to the matching ]
                let mut depth = 1usize;
                while depth > 0 { ip += 1; match code[ip] { '[' => depth+=1, ']' => depth-=1, _ => {} } }
            },
            ']' => if tape[ptr] != 0 {
                // Jump back to the matching [
                let mut depth = 1usize;
                while depth > 0 { ip -= 1; match code[ip] { ']' => depth+=1, '[' => depth-=1, _ => {} } }
            },
            _ => {} // ignore any non-command characters
        }
        ip += 1;
    }
    output
}`,
  },

  division_and_remainder: {
    builtinFunctions: [
      {
        name: '/ (integer division)',
        signature: 'lhs / rhs -> T',
        description: 'Integer division — the result is truncated toward zero',
        example: '7 / 2 // 3  |  -7 / 2 // -3',
      },
      {
        name: '% (remainder / modulo)',
        signature: 'lhs % rhs -> T',
        description: 'Remainder after integer division',
        example: '7 % 2 // 1  |  -7 % 2 // -1',
      },
    ],
    concepts: [
      {
        name: 'Tuple Return',
        description: 'Return both quotient and remainder in a single tuple `(i32, i32)`.',
        example: 'fn divide(x: i32, y: i32) -> (i32, i32) { (x / y, x % y) }',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn divide(x: i32, y: i32) -> (i32, i32) {
    // Return quotient and remainder as a 2-tuple
    (x / y, x % y)
}`,
  },

  matrix_transposition: {
    builtinFunctions: [],
    concepts: [
      {
        name: 'Transposition Rule',
        description:
          'The element at row i, column j moves to row j, column i: result[j][i] = original[i][j].',
        example: '[[1,2],[3,4]] transposed = [[1,3],[2,4]]',
      },
      {
        name: 'New Dimensions',
        description:
          'If the original matrix is rows × cols, the transposed matrix is cols × rows.',
        example: '3×2 matrix transposed = 2×3 matrix',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<Vec<T>> (2D dynamic matrix)',
        description:
          'A Vec of Vecs. Index with matrix[row][col]. The transpose swaps the indices.',
        example: 'let mut result = vec![vec![0; rows]; cols]; result[j][i] = matrix[i][j];',
      },
    ],
    annotatedSolution: `#[derive(Debug, PartialEq, Eq)]
pub struct Matrix {
    pub elements: Vec<Vec<i32>>,
}

pub fn transpose(matrix: &Matrix) -> Matrix {
    let rows = matrix.elements.len();
    let cols = if rows > 0 { matrix.elements[0].len() } else { 0 };
    // Transposed matrix has swapped dimensions: cols × rows
    let mut result = vec![vec![0i32; rows]; cols];
    for i in 0..rows {
        for j in 0..cols {
            // Element at (i,j) goes to (j,i) in the transpose
            result[j][i] = matrix.elements[i][j];
        }
    }
    Matrix { elements: result }
}`,
  },

  bigger: {
    builtinFunctions: [
      {
        name: 'HashMap::iter()',
        signature: 'fn iter(&self) -> Iter<K, V>',
        description: 'Returns an iterator over (key, value) pairs',
        example: 'for (k, v) in map.iter() { ... }',
      },
      {
        name: '.max_by_key()',
        signature: 'fn max_by_key<B, F>(self, f: F) -> Option<T>',
        description:
          'Returns the element that produces the maximum value under the key function f',
        example: 'map.iter().max_by_key(|(_, &v)| v) // entry with largest value',
      },
    ],
    concepts: [
      {
        name: 'Finding the Key of the Max Value',
        description:
          'Use `max_by_key` on the iterator of (key, value) pairs, extracting the value as the comparison key.',
        example: 'map.iter().max_by_key(|(_, &v)| v).map(|(&k, _)| k)',
      },
    ],
    dataStructures: [
      {
        name: 'HashMap<&str, i32>',
        description: 'Key-value map. Iterate with .iter() to compare values and find the max.',
        example: 'let map: HashMap<&str, i32> = HashMap::new();',
      },
    ],
    annotatedSolution: `use std::collections::HashMap;

pub fn bigger(h: HashMap<&str, i32>) -> &str {
    // max_by_key picks the (key, value) pair with the largest value
    h.iter()
        .max_by_key(|(_, &v)| v)
        .map(|(&k, _)| k)      // extract just the key
        .unwrap_or("")          // empty string if the map was empty
}`,
  },

  capitalizing: {
    builtinFunctions: [
      {
        name: 'str::split_whitespace()',
        signature: 'fn split_whitespace(&self) -> SplitWhitespace',
        description: 'Splits on whitespace into word tokens',
        example: '"hello world".split_whitespace() // ["hello", "world"]',
      },
      {
        name: 'str::chars().next()',
        signature: 'fn next(&mut self) -> Option<char>',
        description: 'Gets the first character from the char iterator',
        example: '"hello".chars().next() // Some(\'h\')',
      },
      {
        name: 'char::to_uppercase()',
        signature: 'fn to_uppercase(self) -> ToUppercase',
        description:
          'Returns an iterator (not a char directly). Call .to_string() or .collect::<String>() to get the result.',
        example: "'h'.to_uppercase().to_string() // \"H\"",
      },
      {
        name: 'Chars::as_str()',
        signature: 'fn as_str(&self) -> &str',
        description:
          'Returns the remaining string after the chars that have already been consumed. Useful after .next().',
        example:
          'let mut c = "hello".chars(); c.next(); c.as_str() // "ello"',
      },
    ],
    concepts: [
      {
        name: 'Capitalize First Letter of a Word',
        description:
          'Consume the first char with .next(), uppercase it, then concatenate with the rest via .as_str().',
        example:
          'let mut chars = word.chars(); match chars.next() { Some(f) => f.to_uppercase().to_string() + chars.as_str(), None => String::new() }',
      },
      {
        name: 'join() to reconstruct the sentence',
        description:
          'After collecting capitalized words into a Vec<String>, use .join(" ") to put spaces back in.',
        example: 'words.collect::<Vec<_>>().join(" ")',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn capitalize_first(input: &str) -> String {
    input
        .split_whitespace()
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None       => String::new(),
                // Uppercase the first char, then append the rest of the word unchanged
                Some(first) => first.to_uppercase().to_string() + chars.as_str(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}`,
  },

  scytale_cipher: {
    builtinFunctions: [
      {
        name: 'std::iter::repeat()',
        signature: 'fn repeat<T: Clone>(elt: T) -> Repeat<T>',
        description: 'Returns an infinite iterator that clones the same value repeatedly',
        example: 'std::iter::repeat(\' \').take(5) // 5 spaces',
      },
      {
        name: 'Iterator::chain()',
        signature: 'fn chain<U>(self, other: U) -> Chain<Self, U>',
        description: 'Appends one iterator after another',
        example: 'msg.chars().chain(std::iter::repeat(\' \')) // message then infinite spaces',
      },
      {
        name: 'str::trim_end()',
        signature: 'fn trim_end(&self) -> &str',
        description: 'Removes trailing whitespace',
        example: '"hello   ".trim_end() // "hello"',
      },
    ],
    concepts: [
      {
        name: 'Scytale Cipher (Encoding)',
        description:
          'Write the message row-by-row in a grid of `i` columns (padding with spaces if needed). Then read the grid column-by-column to produce the ciphertext.',
        example: '"HELLO", i=3 → grid [[H,E,L],[L,O, ]] → read cols: "HLE O L"',
      },
      {
        name: 'Padding the Message',
        description:
          'Pad the message to a multiple of `i` by appending spaces, then trim trailing spaces from the final result.',
        example: 'let padded: Vec<char> = msg.chars().chain(repeat(\' \')).take(rows * cols).collect();',
      },
    ],
    dataStructures: [],
    annotatedSolution: `pub fn scytale_cipher(message: String, i: u32) -> String {
    let cols = i as usize;
    if cols == 0 { return message; }
    let len = message.len();
    // Calculate how many rows are needed (round up)
    let rows = (len + cols - 1) / cols;
    // Pad the message with spaces to fill the grid exactly
    let padded: Vec<char> = message
        .chars()
        .chain(std::iter::repeat(' '))
        .take(rows * cols)
        .collect();
    // Read the grid column by column to produce the encoded message
    let mut result = String::new();
    for col in 0..cols {
        for row in 0..rows {
            result.push(padded[row * cols + col]);
        }
    }
    result.trim_end().to_string()
}`,
  },

  lunch_queue: {
    builtinFunctions: [
      {
        name: 'Vec::push()',
        signature: 'fn push(&mut self, value: T)',
        description: 'Append to the back of the Vec (enqueue)',
        example: 'queue.push("Alice".to_string());',
      },
      {
        name: 'Vec::remove(0)',
        signature: 'fn remove(&mut self, index: usize) -> T',
        description:
          'Remove and return the element at index 0 (front of the queue). O(n) but simple.',
        example: 'let first = queue.remove(0);',
      },
      {
        name: 'Vec::is_empty()',
        signature: 'fn is_empty(&self) -> bool',
        description: 'Returns true if the queue has no elements',
        example: 'if queue.is_empty() { println!("empty"); }',
      },
    ],
    concepts: [
      {
        name: 'Queue (FIFO)',
        description:
          'First-In First-Out: new items join the back, served items leave from the front. A Vec with push (back) and remove(0) (front) implements this.',
        example: 'push("A"); push("B"); remove(0) // returns "A"',
      },
      {
        name: 'VecDeque for Efficiency',
        description:
          'VecDeque has O(1) push_back and pop_front. Vec::remove(0) is O(n). For small queues Vec is fine; for large use VecDeque.',
        example:
          'use std::collections::VecDeque; let mut q: VecDeque<String> = VecDeque::new();',
      },
    ],
    dataStructures: [
      {
        name: 'Vec<T> as Queue',
        description: 'Use Vec as a simple queue: push() at back, remove(0) from front.',
        example: 'let mut queue: Vec<String> = Vec::new();',
      },
    ],
    annotatedSolution: `pub struct Queue {
    pub items: Vec<String>,
}

impl Queue {
    pub fn new() -> Queue {
        Queue { items: Vec::new() }
    }

    // Enqueue: add a person to the back of the line
    pub fn push(&mut self, person: String) {
        self.items.push(person);
    }

    // Dequeue: serve the person at the front of the line
    pub fn pop(&mut self) -> Option<String> {
        if self.items.is_empty() {
            None
        } else {
            Some(self.items.remove(0)) // O(n) but straightforward
        }
    }

    pub fn is_empty(&self) -> bool {
        self.items.is_empty()
    }
}`,
  },
};
