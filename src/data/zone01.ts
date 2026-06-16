import type { Exercise } from '../types';

export const zone01Exercises: Exercise[] = [
  {
    id: 64,
    slug: 'matrix_multiplication',
    title: 'Matrix Multiplication',
    checkpoint: 'zone01_cp1',
    difficulty: 'easiest',
    order: 1,
    concept: `- Define a \`struct\` named \`Matrix\` as a tuple of two tuples. The nested tuple will contain two \`i32\`.

- Create a **function** named \`multiply\` that receives a \`Matrix\` and an \`i32\` and returns the \`Matrix\` with each number multiplied by the second argument.

\`\`\`rust
pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}
\`\`\`

\`Matrix\` must implement \`Debug\`, \`PartialEq\` and \`Eq\`. You can use \`derive\`.

> Remember that you are defining a library, so any element that can be called from an external crate must be made public.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `- Define a \`struct\` named \`Matrix\` as a tuple of two tuples. The nested tuple will contain two \`i32\`.

- Create a **function** named \`multiply\` that receives a \`Matrix\` and an \`i32\` and returns the \`Matrix\` with each number multiplied by the second argument.

\`\`\`rust
pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}
\`\`\`

\`Matrix\` must implement \`Debug\`, \`PartialEq\` and \`Eq\`. You can use \`derive\`.

> Remember that you are defining a library, so any element that can be called from an external crate must be made public.`,
    functionSignatures: [`pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_64_1',
      description: 'Usage example',
      code: `fn main() {
    let matrix = Matrix((1, 3), (4, 5));
    println!("Original matrix {:?}", matrix);
    println!("Matrix after multiply {:?}", multiply(matrix, 3));
}`,
      expectedOutput: `Original matrix Matrix((1, 3), (4, 5))
Matrix after multiply Matrix((3, 9), (12, 15))`,
      hidden: false,
    }],
    hints: [`Defining a struct — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`, `The Tuple Type — https://doc.rust-lang.org/stable/book/ch03-02-data-types.html`, `Tuples — https://doc.rust-lang.org/rust-by-example/primitives/tuples.html`, `Tuple Structs without Named Fields — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`, `Adding Useful Functionality with Derived Traits — https://doc.rust-lang.org/stable/book/ch05-02-example-structs.html`, `Chapter 7 — https://doc.rust-lang.org/stable/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html`],
  },
  {
    id: 65,
    slug: 'min_and_max',
    title: 'Min And Max',
    checkpoint: 'zone01_cp1',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** named \`min_and_max\` that receives three \`i32\` and returns a \`tuple\` with the minimum and the maximum number received as input.

\`\`\`rust
pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** named \`min_and_max\` that receives three \`i32\` and returns a \`tuple\` with the minimum and the maximum number received as input.

\`\`\`rust
pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}
\`\`\``,
    functionSignatures: [`pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}`],
    constraints: [],
    starterCode: `pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}`,
    solution: '',
    testCases: [{
      id: 'tc_65_1',
      description: 'Usage example',
      code: `fn main() {
    println!("Minimum and maximum are: {:?}", min_and_max(9, 2, 4));
}`,
      expectedOutput: `Minimum and maximum are: (2, 9)`,
      hidden: false,
    }],
    hints: [`The Tuple Type — https://doc.rust-lang.org/stable/book/ch03-02-data-types.html`, `Tuples — https://doc.rust-lang.org/rust-by-example/primitives/tuples.html`, `Tuple Structs without Named Fields — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`],
  },
  {
    id: 66,
    slug: 'reverse_it',
    title: 'Reverse It',
    checkpoint: 'zone01_cp1',
    difficulty: 'easy',
    order: 2,
    concept: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    functionSignatures: [`pub fn reverse_it(v: i32) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn reverse_it(v: i32) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_66_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", reverse_it(123));
    println!("{}", reverse_it(-123));
}`,
      expectedOutput: `321123
-321123`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 67,
    slug: 'smallest',
    title: 'Smallest',
    checkpoint: 'zone01_cp1',
    difficulty: 'easy',
    order: 2,
    concept: `Create a function named \`smallest\` that gets the smallest number in the \`HashMap\`.

If the \`HashMap\` is empty, return the maximum \`i32\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`smallest\` that gets the smallest number in the \`HashMap\`.

If the \`HashMap\` is empty, return the maximum \`i32\`.`,
    functionSignatures: [`pub fn smallest(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn smallest(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_67_1',
      description: 'Usage example',
      code: `fn main() {
    let hash = HashMap::from([
        ("Cat", 122),
        ("Dog", 333),
        ("Elephant", 334),
        ("Gorilla", 14),
    ]);

    println!(
        "The smallest of the elements in the HashMap is {}",
        smallest(hash)
    );
}`,
      expectedOutput: `The smallest of the elements in the HashMap is 14`,
      hidden: false,
    }],
    hints: [`hash maps — https://doc.rust-lang.org/book/ch08-03-hash-maps.html`],
  },
  {
    id: 68,
    slug: 'counting_words',
    title: 'Counting Words',
    checkpoint: 'zone01_cp1',
    difficulty: 'medium',
    order: 3,
    concept: `Create a function named \`counting_words\`, that receives a \`&str\`. It should return each word in the string and the number of times it appears on the string.

Each of the following will count as **one** single word:

- A number like "0" or "1234".
- A word or letter like "a" or "they".
- Two words joined by a single apostrophe like "it's" or "they're".

The function must respect the following rules:

- The count is case insensitive, so that "HELLO", "Hello", and "hello" are 3 uses of the same word.
- All forms of punctuation are to be ignored, except for the apostrophe if used like the example above.
- The words can be separated by any form of ASCII whitespace (e.g. "\\t", "\\n", " ").
- On the resulting HashMap, every word occurrence should be in lowercase.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`counting_words\`, that receives a \`&str\`. It should return each word in the string and the number of times it appears on the string.

Each of the following will count as **one** single word:

- A number like "0" or "1234".
- A word or letter like "a" or "they".
- Two words joined by a single apostrophe like "it's" or "they're".

The function must respect the following rules:

- The count is case insensitive, so that "HELLO", "Hello", and "hello" are 3 uses of the same word.
- All forms of punctuation are to be ignored, except for the apostrophe if used like the example above.
- The words can be separated by any form of ASCII whitespace (e.g. "\\t", "\\n", " ").
- On the resulting HashMap, every word occurrence should be in lowercase.`,
    functionSignatures: [`fn counting_words(words: &str) -> HashMap<String, u32> {
    todo!()
}`],
    constraints: [],
    starterCode: `fn counting_words(words: &str) -> HashMap<String, u32> {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_68_1',
      description: 'Usage example',
      code: `use std::collections::BTreeMap;

fn main() {
    let s1: BTreeMap<_, _> = counting_words("Hello, world!").into_iter().collect();
    println!("{:?}", s1);
    let s2: BTreeMap<_, _> = counting_words("\\u{201c}Two things are infinite: the universe and human stupidity; and I\\u{2019}m not sure about the universe.\\u{201d}\\n    \\u{2015} Albert Einstein ").into_iter().collect();
    println!("{:?}", s2);
    let s3: BTreeMap<_, _> = counting_words("Batman, BATMAN, batman, Stop stop").into_iter().collect();
    println!("{:?}", s3);
}`,
      expectedOutput: `{"hello": 1, "world": 1}
{"about": 1, "albert": 1, "and": 2, "are": 1, "einstein": 1, "human": 1, "i'm": 1, "infinite": 1, "not": 1, "stupidity": 1, "sure": 1, "the": 2, "things": 1, "two": 1, "universe": 2}
{"batman": 3, "stop": 2}`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 69,
    slug: 'inv_pyramid',
    title: 'Inv Pyramid',
    checkpoint: 'zone01_cp1',
    difficulty: 'medium',
    order: 3,
    concept: `Create a function named \`inv_pyramid\` that takes a string and an integer as input and returns a vector of strings.
This function should create a pyramid structure. Each element of the vector must be the given string after indentation represented as spaces.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`inv_pyramid\` that takes a string and an integer as input and returns a vector of strings.
This function should create a pyramid structure. Each element of the vector must be the given string after indentation represented as spaces.`,
    functionSignatures: [`pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    todo!()
}`,
    solution: '',
    testCases: [
      {
        id: 'tc_69_1',
        description: 'Edge case: i = 0 returns empty vec',
        code: `fn main() {
    let result = inv_pyramid("hello".to_string(), 0);
    assert_eq!(result, Vec::<String>::new());
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_69_2',
        description: 'Edge case: i = 1 returns single element with no indentation',
        code: `fn main() {
    let result = inv_pyramid("hello".to_string(), 1);
    assert_eq!(result.len(), 1);
    assert_eq!(result[0], "hello");
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_69_3',
        description: 'Normal case: i = 5, correct number of lines and indentation per line',
        code: `fn main() {
    let result = inv_pyramid("hello".to_string(), 5);
    assert_eq!(result.len(), 5);
    assert_eq!(result[0], "hello");
    assert_eq!(result[1], " hello");
    assert_eq!(result[2], "  hello");
    assert_eq!(result[3], "   hello");
    assert_eq!(result[4], "    hello");
    // each element has exactly j leading spaces
    for (j, s) in result.iter().enumerate() {
        assert_eq!(&s[..j], " ".repeat(j));
    }
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_69_4',
        description: 'Full vec comparison: i = 5 and alternate string',
        code: `fn main() {
    assert_eq!(
        inv_pyramid("hello".to_string(), 5),
        vec![
            "hello".to_string(),
            " hello".to_string(),
            "  hello".to_string(),
            "   hello".to_string(),
            "    hello".to_string(),
        ]
    );
    assert_eq!(
        inv_pyramid("abc".to_string(), 3),
        vec![
            "abc".to_string(),
            " abc".to_string(),
            "  abc".to_string(),
        ]
    );
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
    ],
    hints: [],
  },
  {
    id: 70,
    slug: 'partial_sums',
    title: 'Partial Sums',
    checkpoint: 'zone01_cp1',
    difficulty: 'medium',
    order: 3,
    concept: `Create a function named \`parts_sums\`, that receives a slice of \`u64\`, and returns a vector with the partial sums of the received array.

This is how partial sums work:

1- First you split the array in its partitions:

\`\`\`sh
[1, 2, 3, 4, 5]
      |
      V
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2]
[1]
[]
\`\`\`

2- Then you add each partition together:

\`\`\`sh
[1, 2, 3, 4, 5] = 15
[1, 2, 3, 4]    = 10
[1, 2, 3]       = 6
[1, 2]          = 3
[1]             = 1
[]              = 0
\`\`\`

3- So, in conclusion:

\`\`\`rs
parts_sums(&[1, 2, 3, 4, 5]) // == [15, 10, 6, 3 ,1, 0]
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`parts_sums\`, that receives a slice of \`u64\`, and returns a vector with the partial sums of the received array.

This is how partial sums work:

1- First you split the array in its partitions:

\`\`\`sh
[1, 2, 3, 4, 5]
      |
      V
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2]
[1]
[]
\`\`\`

2- Then you add each partition together:

\`\`\`sh
[1, 2, 3, 4, 5] = 15
[1, 2, 3, 4]    = 10
[1, 2, 3]       = 6
[1, 2]          = 3
[1]             = 1
[]              = 0
\`\`\`

3- So, in conclusion:

\`\`\`rs
parts_sums(&[1, 2, 3, 4, 5]) // == [15, 10, 6, 3 ,1, 0]
\`\`\``,
    functionSignatures: [`pub fn partial_sums() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn partial_sums() {
    todo!()
}`,
    solution: '',
    testCases: [
      {
        id: 'tc_70_1',
        description: 'Normal case: [1,2,3,4,5] produces shrinking prefix sums ending with 0',
        code: `fn main() {
    assert_eq!(
        parts_sums(&[1, 2, 3, 4, 5]),
        vec![15, 10, 6, 3, 1, 0]
    );
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_70_2',
        description: 'Empty slice returns [0]',
        code: `fn main() {
    assert_eq!(parts_sums(&[]), vec![0u64]);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_70_3',
        description: 'Single element returns [element, 0]',
        code: `fn main() {
    assert_eq!(parts_sums(&[42]), vec![42, 0]);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_70_4',
        description: 'Two elements',
        code: `fn main() {
    assert_eq!(parts_sums(&[1, 2]), vec![3, 1, 0]);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_70_5',
        description: 'All zeros: result is all zeros with length n+1',
        code: `fn main() {
    assert_eq!(parts_sums(&[0, 0, 0]), vec![0, 0, 0, 0]);
    // result always has input.len() + 1 elements
    let r = parts_sums(&[1, 2, 3]);
    assert_eq!(r.len(), 4);
    assert_eq!(*r.last().unwrap(), 0u64);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
    ],
    hints: [],
  },
  {
    id: 71,
    slug: 'insertion_sort',
    title: 'Insertion Sort',
    checkpoint: 'zone01_cp1',
    difficulty: 'hard',
    order: 4,
    concept: `Implement the insertion-sort algorithm by creating a function named \`insertion_sort\`. It should execute the iterations of the algorithm **up to** the number indicated by \`steps\`. See the **Usage** for more information.

The insertion-sort algorithm sorts an array of size \`n\` in ascending order.

1. Iterates over the slice from \`slice[1]\` to \`slice[n]\`.

2. Compares the current element (\`slice[key]\`) to its predecessor (\`slice[key-1]\`).

3. If \`slice[key]\` is smaller than \`slice[key-1]\`, then \`slice[key]\` is compared to \`slice[key-2]\` and so on.

4. All of the elements with values greater than \`slice[key]\` are shifted right to fit \`slice[key]\` into its new position.

A step-by-step example of insertion-sort:

![image.png](Insertion-Sort-demo.png)

**Figure 1** - Step-by-step execution of the algorithm insertion sort`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Implement the insertion-sort algorithm by creating a function named \`insertion_sort\`. It should execute the iterations of the algorithm **up to** the number indicated by \`steps\`. See the **Usage** for more information.

The insertion-sort algorithm sorts an array of size \`n\` in ascending order.

1. Iterates over the slice from \`slice[1]\` to \`slice[n]\`.

2. Compares the current element (\`slice[key]\`) to its predecessor (\`slice[key-1]\`).

3. If \`slice[key]\` is smaller than \`slice[key-1]\`, then \`slice[key]\` is compared to \`slice[key-2]\` and so on.

4. All of the elements with values greater than \`slice[key]\` are shifted right to fit \`slice[key]\` into its new position.

A step-by-step example of insertion-sort:

![image.png](Insertion-Sort-demo.png)

**Figure 1** - Step-by-step execution of the algorithm insertion sort`,
    functionSignatures: [`pub fn insertion_sort(slice: &mut [i32], steps: usize) {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn insertion_sort(slice: &mut [i32], steps: usize) {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_71_1',
      description: 'Usage example',
      code: `fn main() {
    let mut target = [5, 3, 7, 2, 1, 6, 8, 4];
    // executes the first iteration of the algorithm
    insertion_sort(&mut target, 1);
    println!("{:?}", target);

    let mut target = [5, 3, 7, 2, 1, 6, 8, 4];
    // executes len - 1 iterations of the algorithm (sorts the slice)
    let len = target.len() - 1;
    insertion_sort(&mut target, len);
    println!("{:?}", target);
}`,
      expectedOutput: `[3, 5, 7, 2, 1, 6, 8, 4]
[1, 2, 3, 4, 5, 6, 7, 8]`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 72,
    slug: 'rpn',
    title: 'Rpn',
    checkpoint: 'zone01_cp1',
    difficulty: 'hard',
    order: 4,
    concept: `Write a **program** which takes a \`&str\` containing an equation written in \`Reverse Polish Notation\` (RPN). It should evaluate the expression, and print the result on the standard output followed by a newline.

- If the expression is not valid, or if there is not exactly one argument, \`Error\` must be printed on the standard output followed by a newline.

> Extra spaces on the expression should be ignored.

\`Reverse Polish Notation\` is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.

The following operators must be implemented : \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (modulo).

All the given operands must fit in a \`i64\`.

Examples of formulas converted in RPN:

3 + 4 >> 3 4 +

((1 \\* 2) \\* 3) - 4 >> 1 2 \\* 3 \\* 4 - or 3 1 2 \\* \\* 4 -

50 \\* (5 - (10 / 9)) >> 5 10 9 / - 50 \\*

Here is how to evaluate a formula in RPN:

\`\`\`console
1 2 * 3 * 4 -
2 3 * 4 -
6 4 -
2
\`\`\`

Or:

\`\`\`console
3 1 2 * * 4 -
3 2 * 4 -
6 4 -
2
\`\`\`

> Use \`std::env::args()\` to get the program's arguments.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Write a **program** which takes a \`&str\` containing an equation written in \`Reverse Polish Notation\` (RPN). It should evaluate the expression, and print the result on the standard output followed by a newline.

- If the expression is not valid, or if there is not exactly one argument, \`Error\` must be printed on the standard output followed by a newline.

> Extra spaces on the expression should be ignored.

\`Reverse Polish Notation\` is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.

The following operators must be implemented : \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (modulo).

All the given operands must fit in a \`i64\`.

Examples of formulas converted in RPN:

3 + 4 >> 3 4 +

((1 \\* 2) \\* 3) - 4 >> 1 2 \\* 3 \\* 4 - or 3 1 2 \\* \\* 4 -

50 \\* (5 - (10 / 9)) >> 5 10 9 / - 50 \\*

Here is how to evaluate a formula in RPN:

\`\`\`console
1 2 * 3 * 4 -
2 3 * 4 -
6 4 -
2
\`\`\`

Or:

\`\`\`console
3 1 2 * * 4 -
3 2 * 4 -
6 4 -
2
\`\`\`

> Use \`std::env::args()\` to get the program's arguments.`,
    functionSignatures: [`pub fn rpn() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn rpn() {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 73,
    slug: 'nextprime',
    title: 'Nextprime',
    checkpoint: 'zone01_cp2',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** which returns the first prime number which is greater than or equal to the \`u64\` passed as an argument.

The function must be optimized, so as to avoid time-outs.

> We consider that only positive numbers can be prime numbers.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which returns the first prime number which is greater than or equal to the \`u64\` passed as an argument.

The function must be optimized, so as to avoid time-outs.

> We consider that only positive numbers can be prime numbers.`,
    functionSignatures: [`pub fn next_prime(nbr: usize) -> usize {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn next_prime(nbr: usize) -> usize {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_73_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The next prime after 4 is: {}", next_prime(4));
    println!("The next prime after 11 is: {}", next_prime(11));
}`,
      expectedOutput: `The next prime after 4 is: 5
The next prime after 11 is: 11`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 74,
    slug: 'previousprime',
    title: 'Previousprime',
    checkpoint: 'zone01_cp2',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** which returns the biggest prime number which is smaller than the \`u64\` passed as an argument.

If there are no smaller primes, the function should return \`0\`.

> A prime number is a natural number greater than 1 that is a not a product of two smaller natural numbers.
> 4 is not a prime number (so it's called a composite number) because it can be represented as 2 \\* 2. 5 is a prime number as it can only be represented by 5 \\* 1 or 1 \\* 5.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which returns the biggest prime number which is smaller than the \`u64\` passed as an argument.

If there are no smaller primes, the function should return \`0\`.

> A prime number is a natural number greater than 1 that is a not a product of two smaller natural numbers.
> 4 is not a prime number (so it's called a composite number) because it can be represented as 2 \\* 2. 5 is a prime number as it can only be represented by 5 \\* 1 or 1 \\* 5.`,
    functionSignatures: [`pub fn prev_prime(nbr: u64) -> u64  {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn prev_prime(nbr: u64) -> u64  {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_74_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The previous prime number before 34 is: {}", prev_prime(34));
}`,
      expectedOutput: `The previous prime number before 34 is: 31`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 75,
    slug: 'reverse_it',
    title: 'Reverse It',
    checkpoint: 'zone01_cp2',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    functionSignatures: [`pub fn reverse_it(v: i32) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn reverse_it(v: i32) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_75_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", reverse_it(123));
    println!("{}", reverse_it(-123));
}`,
      expectedOutput: `321123
-321123`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 76,
    slug: 'count_factorial_steps',
    title: 'Count Factorial Steps',
    checkpoint: 'zone01_cp2',
    difficulty: 'easy',
    order: 2,
    concept: `Create a **function** named \`count_factorial_steps\` that receives a factorial number and counts how many multiplications are necessary to have this number.

If the argument is not a factorial, or it is equal 0 or 1, then the function should return 0.

\`\`\`rust
pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}
\`\`\`

As a reminder, the factorial of a number is the product of all the integers from 1 to that number.

Example: the factorial of 6 (written 6!) is 1 \\* 2 \\* 3 \\* 4 \\* 5 \\* 6 = 720. As such, the factorial steps of 720 are 6.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** named \`count_factorial_steps\` that receives a factorial number and counts how many multiplications are necessary to have this number.

If the argument is not a factorial, or it is equal 0 or 1, then the function should return 0.

\`\`\`rust
pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}
\`\`\`

As a reminder, the factorial of a number is the product of all the integers from 1 to that number.

Example: the factorial of 6 (written 6!) is 1 \\* 2 \\* 3 \\* 4 \\* 5 \\* 6 = 720. As such, the factorial steps of 720 are 6.`,
    functionSignatures: [`pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_76_1',
      description: 'Usage example',
      code: `fn main() {
    println!(
        "The factorial steps of 720 = {}",
        count_factorial_steps(720)
    );
    println!("The factorial steps of 13 = {}", count_factorial_steps(13));
    println!("The factorial steps of 6 = {}", count_factorial_steps(6));
}`,
      expectedOutput: `The factorial steps of 720 = 6
The factorial steps of 13 = 0
The factorial steps of 6 = 3`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 77,
    slug: 'lucas_number',
    title: 'Lucas Number',
    checkpoint: 'zone01_cp2',
    difficulty: 'easy',
    order: 2,
    concept: `Complete the body of the **function** \`lucas_number\`.

\`\`\`rust
pub fn lucas_number(n: u32) -> u32 {
    todo!()
}
\`\`\`

This function receives a number \`n\` and returns the \`n\`th number in the Lucas Numbers where the \`n\`th number is the sum of the previous two numbers in the series.

The Lucas Numbers start like this: 2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, etc...`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Complete the body of the **function** \`lucas_number\`.

\`\`\`rust
pub fn lucas_number(n: u32) -> u32 {
    todo!()
}
\`\`\`

This function receives a number \`n\` and returns the \`n\`th number in the Lucas Numbers where the \`n\`th number is the sum of the previous two numbers in the series.

The Lucas Numbers start like this: 2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, etc...`,
    functionSignatures: [`pub fn lucas_number(n: u32) -> u32 {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn lucas_number(n: u32) -> u32 {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_77_1',
      description: 'Usage example',
      code: `fn main() {
    println!(
        "The element in the position {} in Lucas Numbers is {}",
        2,
        lucas_number(2)
    );
    println!(
        "The element in the position {} in Lucas Numbers is {}",
        5,
        lucas_number(5)
    );
    println!(
        "The element in the position {} in Lucas Numbers is {}",
        10,
        lucas_number(10)
    );
    println!(
        "The element in the position {} in Lucas Numbers is {}",
        13,
        lucas_number(13)
    );
}`,
      expectedOutput: `The element in the position 2 in Lucas Numbers is 3
The element in the position 5 in Lucas Numbers is 11
The element in the position 10 in Lucas Numbers is 123
The element in the position 13 in Lucas Numbers is 521`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 78,
    slug: 'matrix_determinant',
    title: 'Matrix Determinant',
    checkpoint: 'zone01_cp2',
    difficulty: 'easy',
    order: 2,
    concept: `Create a **function** which receives a 3x3 matrix (\`[[isize; 3]; 3]\`) and returns its determinant \`isize\`.

This is how you calculate a 2x2 matrix determinant:

\`\`\`sh
|a b|
|c d|

a*d - b*c
\`\`\`

To calculate a 3x3 matrix determinant you have to take 'a' and multiply it by the determinant of the matrix you get if you get rid of the 'a' column and the 'a' row. Then you subtract the multiplication of 'b' and the determinant of the matrix you get if you get rid of the 'b' column and row. And finally, you do the same process for 'c' and add it to the previous result.

\`\`\`sh
|a b c|
|d e f|
|g h i|
\`\`\`

![imagem](determinant-of-a-3x3-matrix-formula-3.png)`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which receives a 3x3 matrix (\`[[isize; 3]; 3]\`) and returns its determinant \`isize\`.

This is how you calculate a 2x2 matrix determinant:

\`\`\`sh
|a b|
|c d|

a*d - b*c
\`\`\`

To calculate a 3x3 matrix determinant you have to take 'a' and multiply it by the determinant of the matrix you get if you get rid of the 'a' column and the 'a' row. Then you subtract the multiplication of 'b' and the determinant of the matrix you get if you get rid of the 'b' column and row. And finally, you do the same process for 'c' and add it to the previous result.

\`\`\`sh
|a b c|
|d e f|
|g h i|
\`\`\`

![imagem](determinant-of-a-3x3-matrix-formula-3.png)`,
    functionSignatures: [`pub fn matrix_determinant(matrix: [[isize; 3]; 3]) -> isize {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn matrix_determinant(matrix: [[isize; 3]; 3]) -> isize {
    todo!()
}`,
    solution: '',
    testCases: [
      {
        id: 'tc_78_1',
        description: 'Usage example',
        code: `fn main() {
    let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];
    println!("{}", matrix_determinant(matrix));
}`,
        expectedOutput: `0`,
        hidden: false,
      },
      {
        id: 'tc_78_2',
        description: 'Matrix with negative values',
        code: `fn main() {
    let matrix = [
        [6, 1, 1],
        [4, -2, 5],
        [2, 8, 7],
    ];
    println!("{}", matrix_determinant(matrix));
}`,
        expectedOutput: `-306`,
        hidden: false,
      },
      {
        id: 'tc_78_3',
        description: 'Mixed sign matrix',
        code: `fn main() {
    let matrix = [
        [2, 5, 3],
        [1, -2, -1],
        [1, 3, 4],
    ];
    println!("{}", matrix_determinant(matrix));
}`,
        expectedOutput: `-20`,
        hidden: true,
      },
      {
        id: 'tc_78_4',
        description: 'Identity matrix',
        code: `fn main() {
    let matrix = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ];
    println!("{}", matrix_determinant(matrix));
}`,
        expectedOutput: `1`,
        hidden: true,
      },
      {
        id: 'tc_78_5',
        description: 'Diagonal matrix',
        code: `fn main() {
    let matrix = [
        [3, 0, 0],
        [0, 4, 0],
        [0, 0, 5],
    ];
    println!("{}", matrix_determinant(matrix));
}`,
        expectedOutput: `60`,
        hidden: true,
      },
    ],
    hints: [],
  },
  {
    id: 79,
    slug: 'own_and_return',
    title: 'Own And Return',
    checkpoint: 'zone01_cp2',
    difficulty: 'easy',
    order: 2,
    concept: `Create a struct \`Film\` that has one field \`name\` of type \`String\`.

Create the following two functions:

- Create a function \`take_film_name\`, it will return the name and consume the film (you should not be able to reuse it after you passed it to the function).
- Create a function \`read_film_name\`, it will return the name without consuming the film (you can call the function multiple times with the same argument).`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a struct \`Film\` that has one field \`name\` of type \`String\`.

Create the following two functions:

- Create a function \`take_film_name\`, it will return the name and consume the film (you should not be able to reuse it after you passed it to the function).
- Create a function \`read_film_name\`, it will return the name without consuming the film (you can call the function multiple times with the same argument).`,
    functionSignatures: [`pub struct Film {
    pub name: String,
}

pub fn read_film_name(/* to be implemented */) -> String {
    todo!()
}

pub fn take_film_name(/* to be implemented */) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub struct Film {
    pub name: String,
}

pub fn read_film_name(/* to be implemented */) -> String {
    todo!()
}

pub fn take_film_name(/* to be implemented */) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_79_1',
      description: 'Usage example',
      code: `fn main() {
    let my_film = Film {
        name: "Terminator".to_owned(),
    };

    // println!("{}", take_film_name(my_film));

    println!("{}", read_film_name(&my_film));
    println!("{}", take_film_name(my_film));

    // the order of the print statements is intentional.
    // you can test this exercise properly by uncommenting out the first print statement,
    // you should get a compilation error then if your implementation is correct.
}`,
      expectedOutput: `Terminator
Terminator`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 80,
    slug: 'check_user_name',
    title: 'Check User Name',
    checkpoint: 'zone01_cp2',
    difficulty: 'medium',
    order: 3,
    concept: `Sometimes it is more desirable to catch the failure of some parts of a program instead of just calling panic.

For this exercise you will have to create a tool that manages users' access levels.

You will have to create an \`AccessLevel\` enum which could be \`Guest\`, \`Normal\`, \`Admin\`.

You will also have to create a \`User\` struct which has:

- Fields:
  - \`name\`: \`String\`
  - \`access_level\`: \`AccessLevel\`
- Associated functions:
  - \`new\`: which initializes the struct.
  - \`send_name\`: which takes \`&self\` and returns an \`Option<&str>\` with \`None\` if the user is a \`Guest\` or the \`name\` if the \`AccessLevel\` has any of the other options.

Also implement a function \`check_user_name\` which takes a \`User\`, calls \`send_name\` and returns a \`tuple\` with \`true\` and the user \`name\` if \`send_name\` returns the name or \`false\` and \`"ERROR: User is guest"\` if not.

> Remember to make your fields public!`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Sometimes it is more desirable to catch the failure of some parts of a program instead of just calling panic.

For this exercise you will have to create a tool that manages users' access levels.

You will have to create an \`AccessLevel\` enum which could be \`Guest\`, \`Normal\`, \`Admin\`.

You will also have to create a \`User\` struct which has:

- Fields:
  - \`name\`: \`String\`
  - \`access_level\`: \`AccessLevel\`
- Associated functions:
  - \`new\`: which initializes the struct.
  - \`send_name\`: which takes \`&self\` and returns an \`Option<&str>\` with \`None\` if the user is a \`Guest\` or the \`name\` if the \`AccessLevel\` has any of the other options.

Also implement a function \`check_user_name\` which takes a \`User\`, calls \`send_name\` and returns a \`tuple\` with \`true\` and the user \`name\` if \`send_name\` returns the name or \`false\` and \`"ERROR: User is guest"\` if not.

> Remember to make your fields public!`,
    functionSignatures: [`pub enum AccessLevel {}

pub struct User {}

impl User {
    pub fn new(name: String, level: AccessLevel) -> Self {
        todo!()
    }

    pub fn send_name(&self) -> Option<&str> {
        todo!()
    }
}

pub fn check_user_name(user: &User) -> (bool, &str) {
    todo!()
}`],
    constraints: [],
    starterCode: `pub enum AccessLevel {}

pub struct User {}

impl User {
    pub fn new(name: String, level: AccessLevel) -> Self {
        todo!()
    }

    pub fn send_name(&self) -> Option<&str> {
        todo!()
    }
}

pub fn check_user_name(user: &User) -> (bool, &str) {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_80_1',
      description: 'Usage example',
      code: `fn main() {
    let user0 = User::new("Didier".to_owned(), AccessLevel::Admin);
    println!("{:?}", check_user_name(&user0));

    let user1 = User::new("Mary".to_owned(), AccessLevel::Normal);
    println!("{:?}", check_user_name(&user1));

    let user2 = User::new("John".to_owned(), AccessLevel::Guest);
    println!("{:?}", check_user_name(&user2));
}`,
      expectedOutput: `(true, "Didier")
(true, "Mary")
(false, "ERROR: User is guest")`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 81,
    slug: 'dress_code',
    title: 'Dress Code',
    checkpoint: 'zone01_cp2',
    difficulty: 'medium',
    order: 3,
    concept: `Create a function called \`choose_outfit\` that receives the following input:

- A \`formality_level\` as an \`Option<u32>\`.
- An \`invitation_message\` as a \`Result<&str, &str>\`.

The function will return a struct \`Outfit\` which contains:

- \`jacket\`, an \`enum\` \`Jacket\` that contains \`Black\`, \`White\` and \`Flowers\`.
- \`hat\`, an \`enum\` \`Hat\` that contains \`Snapback\`, \`Baseball\`, \`Fedora\`.

\`\`\`rust
#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}
\`\`\`

For the \`jacket\`:

- The jacket should be \`Flowers\` when the \`formality_level\` is \`None\`.
- The jacket should be \`White\` when the \`formality_level\` is more than 0.
- Otherwise, it should be \`Black\`.

For the \`hat\`:

- If the \`invitation_message\` is \`Ok()\` it should be \`Fedora\`.
- Otherwise, it should be \`Snapback\`.

In the specific case where \`formality_level\` is \`None\` and \`invitation_message\` is not \`Ok()\` then the \`jacket\` should be \`Flowers\` and the \`hat\` should be \`Baseball\`.

Remember that all the \`enum\` and \`struct\` used must be \`pub\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function called \`choose_outfit\` that receives the following input:

- A \`formality_level\` as an \`Option<u32>\`.
- An \`invitation_message\` as a \`Result<&str, &str>\`.

The function will return a struct \`Outfit\` which contains:

- \`jacket\`, an \`enum\` \`Jacket\` that contains \`Black\`, \`White\` and \`Flowers\`.
- \`hat\`, an \`enum\` \`Hat\` that contains \`Snapback\`, \`Baseball\`, \`Fedora\`.

\`\`\`rust
#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}
\`\`\`

For the \`jacket\`:

- The jacket should be \`Flowers\` when the \`formality_level\` is \`None\`.
- The jacket should be \`White\` when the \`formality_level\` is more than 0.
- Otherwise, it should be \`Black\`.

For the \`hat\`:

- If the \`invitation_message\` is \`Ok()\` it should be \`Fedora\`.
- Otherwise, it should be \`Snapback\`.

In the specific case where \`formality_level\` is \`None\` and \`invitation_message\` is not \`Ok()\` then the \`jacket\` should be \`Flowers\` and the \`hat\` should be \`Baseball\`.

Remember that all the \`enum\` and \`struct\` used must be \`pub\`.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}`,
    solution: '',
    testCases: [{
      id: 'tc_81_1',
      description: 'Usage example',
      code: `fn main() {
    println!(
        "My outfit will be: {:?}",
        choose_outfit(Some(0), Ok("Dear friend, ..."))
    );
}`,
      expectedOutput: `My outfit will be: Outfit { jacket: Black, hat: Fedora }`,
      hidden: false,
    }],
    hints: [`patterns — https://doc.rust-lang.org/book/ch18-00-patterns.html`],
  },
  {
    id: 82,
    slug: 'get_document_id',
    title: 'Get Document Id',
    checkpoint: 'zone01_cp2',
    difficulty: 'medium',
    order: 3,
    concept: `Create the following structures which will help you get the \`document_id\` of the document you need.

- \`OfficeOne\`: \`next_office\` as type \`Result<OfficeTwo, ErrorOffice>\`.
- \`OfficeTwo\`: \`next_office\` as type \`Result<OfficeThree, ErrorOffice>\`.
- \`OfficeThree\`: \`next_office\` as type \`Result<OfficeFour, ErrorOffice>\`.
- \`OfficeFour\`: \`document_id\` as type \`Result<u32, ErrorOffice>\`.

\`ErrorOffice\` is an \`enum\` with \`OfficeClose(u32)\`, \`OfficeNotFound(u32)\` or \`OfficeFull(u32)\`.

The \`u32\` is the \`id\` of the office generating the error.

Beside the structures, you must create a **function** named \`get_document_id\`, and associate it to the \`OfficeOne\` structure.

This **function** should return the \`Result\` value in the \`OfficeFour\` structure or the first \`Err\` it finds in the chain.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create the following structures which will help you get the \`document_id\` of the document you need.

- \`OfficeOne\`: \`next_office\` as type \`Result<OfficeTwo, ErrorOffice>\`.
- \`OfficeTwo\`: \`next_office\` as type \`Result<OfficeThree, ErrorOffice>\`.
- \`OfficeThree\`: \`next_office\` as type \`Result<OfficeFour, ErrorOffice>\`.
- \`OfficeFour\`: \`document_id\` as type \`Result<u32, ErrorOffice>\`.

\`ErrorOffice\` is an \`enum\` with \`OfficeClose(u32)\`, \`OfficeNotFound(u32)\` or \`OfficeFull(u32)\`.

The \`u32\` is the \`id\` of the office generating the error.

Beside the structures, you must create a **function** named \`get_document_id\`, and associate it to the \`OfficeOne\` structure.

This **function** should return the \`Result\` value in the \`OfficeFour\` structure or the first \`Err\` it finds in the chain.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum ErrorOffice {
    OfficeClose(u32),
    OfficeNotFound(u32),
    OfficeFull(u32),
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeOne {
    pub next_office: Result<OfficeTwo, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeTwo {
    pub next_office: Result<OfficeThree, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeThree {
    pub next_office: Result<OfficeFour, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeFour {
    pub document_id: Result<u32, ErrorOffice>,
}

impl OfficeOne {
    pub fn get_document_id(&self) -> Result<u32, ErrorOffice> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum ErrorOffice {
    OfficeClose(u32),
    OfficeNotFound(u32),
    OfficeFull(u32),
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeOne {
    pub next_office: Result<OfficeTwo, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeTwo {
    pub next_office: Result<OfficeThree, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeThree {
    pub next_office: Result<OfficeFour, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeFour {
    pub document_id: Result<u32, ErrorOffice>,
}

impl OfficeOne {
    pub fn get_document_id(&self) -> Result<u32, ErrorOffice> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_82_1',
      description: 'Usage example',
      code: `fn main() {
    let office_ok = OfficeOne {
        next_office: Ok(OfficeTwo {
            next_office: Ok(OfficeThree {
                next_office: Ok(OfficeFour {
                    document_id: Ok(13),
                }),
            }),
        }),
    };

    let office_closed = {
        OfficeOne {
            next_office: Ok(OfficeTwo {
                next_office: Err(ErrorOffice::OfficeClose(23)),
            }),
        }
    };

    match office_ok.get_document_id() {
        Ok(id) => println!("Found a document with id {}", id),
        Err(err) => println!("Error: {:?}", err),
    };

    match office_closed.get_document_id() {
        Ok(id) => println!("Found a document with id {}", id),
        Err(err) => println!("Error: {:?}", err),
    };
}`,
      expectedOutput: `Found a document with id 13
Error: OfficeClose(23)`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 83,
    slug: 'order_books',
    title: 'Order Books',
    checkpoint: 'zone01_cp2',
    difficulty: 'hard',
    order: 4,
    concept: `Build a module named \`library\` which contains two sub-modules:

- \`writers\`: which contains:
  - \`Writer\`: a structure with:
    - \`first_name\`: \`String\`
    - \`last_name\`: \`String\`
    - \`books\`: \`Vec<Book>\`
- \`books\`: which contains:
  - \`Book\`: a structure with:
    - \`title\`: \`String\`
    - \`year\`: \`u32\` as its year of publication

A function \`order_books\` should be created outside of the previous modules which receives a \`Writer\`, and orders the set of books alphabetically (case insensitive!).`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Build a module named \`library\` which contains two sub-modules:

- \`writers\`: which contains:
  - \`Writer\`: a structure with:
    - \`first_name\`: \`String\`
    - \`last_name\`: \`String\`
    - \`books\`: \`Vec<Book>\`
- \`books\`: which contains:
  - \`Book\`: a structure with:
    - \`title\`: \`String\`
    - \`year\`: \`u32\` as its year of publication

A function \`order_books\` should be created outside of the previous modules which receives a \`Writer\`, and orders the set of books alphabetically (case insensitive!).`,
    functionSignatures: [`pub fn order_books() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn order_books() {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 84,
    slug: 'prime_checker',
    title: 'Prime Checker',
    checkpoint: 'zone01_cp2',
    difficulty: 'hard',
    order: 4,
    concept: `Create a **function** \`prime_checker\` that takes an \`usize\` and check if it is a prime number.

The result will be \`None\` if the argument is less than or equal to one, otherwise it will return a \`Result\`.
If the \`usize\` is prime, the function will return an \`Ok(usize)\`. For any other case it will return an \`Err(PrimeErr)\`.
The \`enum\` \`PrimeErr\` will be \`Even\` if the number is a multiple of two, or \`Divider(usize)\` where the \`usize\` is the smallest divider of the number.

> Your solution should be optimized to a certain degree.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** \`prime_checker\` that takes an \`usize\` and check if it is a prime number.

The result will be \`None\` if the argument is less than or equal to one, otherwise it will return a \`Result\`.
If the \`usize\` is prime, the function will return an \`Ok(usize)\`. For any other case it will return an \`Err(PrimeErr)\`.
The \`enum\` \`PrimeErr\` will be \`Even\` if the number is a multiple of two, or \`Divider(usize)\` where the \`usize\` is the smallest divider of the number.

> Your solution should be optimized to a certain degree.`,
    functionSignatures: [`#[derive(PartialEq, Eq, Debug)]
pub enum PrimeErr {
    Even,
    Divider(usize),
}

pub fn prime_checker(nb: usize) ->  /* Implement return type here */ {
    todo!()
}`],
    constraints: [],
    starterCode: `#[derive(PartialEq, Eq, Debug)]
pub enum PrimeErr {
    Even,
    Divider(usize),
}

pub fn prime_checker(nb: usize) ->  /* Implement return type here */ {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_84_1',
      description: 'Usage example',
      code: `fn main() {
    println!("Is {} prime? {:?}", 2, prime_checker(2));
    println!("Is {} prime? {:?}", 14, prime_checker(14));
    println!("Is {} prime? {:?}", 2147483647, prime_checker(2147483647));
}`,
      expectedOutput: `Is 2 prime? Some(Ok(2))
Is 14 prime? Some(Err(Even))
Is 2147483647 prime? Some(Ok(2147483647))`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 85,
    slug: 'queens',
    title: 'Queens',
    checkpoint: 'zone01_cp2',
    difficulty: 'hard',
    order: 5,
    concept: `In a chess game, a queen can attack pieces which are on the same rank (row), file (column), or diagonal.

The purpose of this exercise is to find out if two queens can attack each other.

The position of a chess piece on a chessboard will be represented by the struct \`ChessPosition\`. You must implement the associated function \`new\` which will return the position if it is valid, otherwise it will return \`None\`.

> Remember, chessboards have 8 files and 8 ranks (0 to 7).

You will create the \`Queen\` struct with the associate function \`can_attack\`, which will return \`true\` if the queens can attack each other or not. You also need to implement the function \`new\` which creates a new \`Queen\` with a \`ChessPosition\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `In a chess game, a queen can attack pieces which are on the same rank (row), file (column), or diagonal.

The purpose of this exercise is to find out if two queens can attack each other.

The position of a chess piece on a chessboard will be represented by the struct \`ChessPosition\`. You must implement the associated function \`new\` which will return the position if it is valid, otherwise it will return \`None\`.

> Remember, chessboards have 8 files and 8 ranks (0 to 7).

You will create the \`Queen\` struct with the associate function \`can_attack\`, which will return \`true\` if the queens can attack each other or not. You also need to implement the function \`new\` which creates a new \`Queen\` with a \`ChessPosition\`.`,
    functionSignatures: [`#[derive(Debug, Clone, Copy)]
pub struct ChessPosition {
    pub rank: usize,
    pub file: usize,
}

impl ChessPosition {
    pub fn new(rank: usize, file: usize) -> Option<Self> {
        todo!()
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Queen {
    pub position: ChessPosition,
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        todo!()
    }

    pub fn can_attack(self, other: Self) -> bool {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, Clone, Copy)]
pub struct ChessPosition {
    pub rank: usize,
    pub file: usize,
}

impl ChessPosition {
    pub fn new(rank: usize, file: usize) -> Option<Self> {
        todo!()
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Queen {
    pub position: ChessPosition,
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        todo!()
    }

    pub fn can_attack(self, other: Self) -> bool {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_85_1',
      description: 'Usage example',
      code: `fn main() {
    let white_queen = Queen::new(ChessPosition::new(2, 2).unwrap());
    let black_queen = Queen::new(ChessPosition::new(0, 4).unwrap());

    println!(
        "Is it possible for the queens to attack each other? {}",
        white_queen.can_attack(black_queen)
    );

    let white_queen = Queen::new(ChessPosition::new(1, 2).unwrap());
    let black_queen = Queen::new(ChessPosition::new(0, 4).unwrap());

    println!(
        "Is it possible for the queens to attack each other? {}",
        white_queen.can_attack(black_queen)
    );
}`,
      expectedOutput: `Is it possible for the queens to attack each other? true
Is it possible for the queens to attack each other? false`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 86,
    slug: 'rot21',
    title: 'Rot21',
    checkpoint: 'zone01_cp2',
    difficulty: 'hard',
    order: 4,
    concept: `The purpose of this exercise is to create a \`rot21\` function that works like the ROT13 cipher.

This function will receive a \`string\` and will rotate each letter of that \`string\` 21 times to the right.

The function should only rotate **ASCII letters**. Everything should remain the unchanged.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `The purpose of this exercise is to create a \`rot21\` function that works like the ROT13 cipher.

This function will receive a \`string\` and will rotate each letter of that \`string\` 21 times to the right.

The function should only rotate **ASCII letters**. Everything should remain the unchanged.`,
    functionSignatures: [`pub fn rot21(input: &str) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn rot21(input: &str) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_86_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The letter \\"a\\" becomes: {}", rot21("a"));
    println!("The letter \\"m\\" becomes: {}", rot21("m"));
    println!("The word \\"MISS\\" becomes: {}", rot21("MISS"));
    println!("Your cypher will be: {}", rot21("Testing numbers 1 2 3"));
    println!("Your cypher will be: {}", rot21("rot21 works!"));
}`,
      expectedOutput: `The letter "a" becomes: v
The letter "m" becomes: h
The word "MISS" becomes: HDNN
Your cypher will be: Oznodib iphwzmn 1 2 3
Your cypher will be: mjo21 rjmfn!`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 87,
    slug: 'scytale_decoder',
    title: 'Scytale Decoder',
    checkpoint: 'zone01_cp2',
    difficulty: 'hard',
    order: 4,
    concept: `Create a **function** which **decodes** a scytale cipher (also known as spartan cipher).

Your function will receive a \`String\` representing the ciphered message, and a \`usize\` representing the number of letters per turn of the strip around the cylinder.

> If the ciphered message is empty or the letters per turn are 0 the function will return \`None\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which **decodes** a scytale cipher (also known as spartan cipher).

Your function will receive a \`String\` representing the ciphered message, and a \`usize\` representing the number of letters per turn of the strip around the cylinder.

> If the ciphered message is empty or the letters per turn are 0 the function will return \`None\`.`,
    functionSignatures: [`pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 88,
    slug: 'counting_words',
    title: 'Counting Words',
    checkpoint: 'zone01_cp3',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a function named \`counting_words\`, that receives a \`&str\`. It should return each word in the string and the number of times it appears on the string.

Each of the following will count as **one** single word:

- A number like "0" or "1234".
- A word or letter like "a" or "they".
- Two words joined by a single apostrophe like "it's" or "they're".

The function must respect the following rules:

- The count is case insensitive, so that "HELLO", "Hello", and "hello" are 3 uses of the same word.
- All forms of punctuation are to be ignored, except for the apostrophe if used like the example above.
- The words can be separated by any form of ASCII whitespace (e.g. "\\t", "\\n", " ").
- On the resulting HashMap, every word occurrence should be in lowercase.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`counting_words\`, that receives a \`&str\`. It should return each word in the string and the number of times it appears on the string.

Each of the following will count as **one** single word:

- A number like "0" or "1234".
- A word or letter like "a" or "they".
- Two words joined by a single apostrophe like "it's" or "they're".

The function must respect the following rules:

- The count is case insensitive, so that "HELLO", "Hello", and "hello" are 3 uses of the same word.
- All forms of punctuation are to be ignored, except for the apostrophe if used like the example above.
- The words can be separated by any form of ASCII whitespace (e.g. "\\t", "\\n", " ").
- On the resulting HashMap, every word occurrence should be in lowercase.`,
    functionSignatures: [`fn counting_words(words: &str) -> HashMap<String, u32> {
    todo!()
}`],
    constraints: [],
    starterCode: `fn counting_words(words: &str) -> HashMap<String, u32> {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_88_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{:?}", counting_words("Hello, world!"));
    println!("{:?}", counting_words("\u{201c}Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\u{201d}
    ― Albert Einstein "));
    println!("{:?}", counting_words("Batman, BATMAN, batman, Stop stop"));
}`,
      expectedOutput: `{"world": 1, "hello": 1}
{"are": 1, "about": 1, "stupidity": 1, "human": 1, "infinite": 1, "i'm": 1, "things": 1, "einstein": 1, "albert": 1, "sure": 1, "the": 2, "not": 1, "universe": 2, "and": 2, "two": 1}
{"stop": 2, "batman": 3}`,
      hidden: false,
    },
    {
      id: 'tc_88_2',
      description: 'Counts are case-insensitive — checked by content (HashMap order is not guaranteed)',
      code: `fn main() {
    let m = counting_words("the cat the dog the bird");
    assert_eq!(m.get("the"), Some(&3));
    assert_eq!(m.get("cat"), Some(&1));
    assert_eq!(m.len(), 4);
    let b = counting_words("Batman, BATMAN, batman, Stop stop");
    assert_eq!(b.get("batman"), Some(&3));
    assert_eq!(b.get("stop"), Some(&2));
    assert_eq!(b.len(), 2);
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 89,
    slug: 'inv_pyramid',
    title: 'Inv Pyramid',
    checkpoint: 'zone01_cp3',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a function named \`inv_pyramid\` that takes a string and an integer as input and returns a vector of strings.
This function should create a pyramid structure. Each element of the vector must be the given string after indentation represented as spaces.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`inv_pyramid\` that takes a string and an integer as input and returns a vector of strings.
This function should create a pyramid structure. Each element of the vector must be the given string after indentation represented as spaces.`,
    functionSignatures: [`pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    todo!()
}`,
    solution: '',
    testCases: [
      {
        id: 'tc_89_1',
        description: 'Edge case: i = 0 returns empty vec',
        code: `fn main() {
    let result = inv_pyramid("hello".to_string(), 0);
    assert_eq!(result, Vec::<String>::new());
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_89_2',
        description: 'Edge case: i = 1 returns single element with no indentation',
        code: `fn main() {
    let result = inv_pyramid("hello".to_string(), 1);
    assert_eq!(result.len(), 1);
    assert_eq!(result[0], "hello");
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_89_3',
        description: 'Normal case: i = 5, correct number of lines and indentation per line',
        code: `fn main() {
    let result = inv_pyramid("hello".to_string(), 5);
    assert_eq!(result.len(), 5);
    assert_eq!(result[0], "hello");
    assert_eq!(result[1], " hello");
    assert_eq!(result[2], "  hello");
    assert_eq!(result[3], "   hello");
    assert_eq!(result[4], "    hello");
    for (j, s) in result.iter().enumerate() {
        assert_eq!(&s[..j], " ".repeat(j));
    }
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_89_4',
        description: 'Full vec comparison: i = 5 and alternate string',
        code: `fn main() {
    assert_eq!(
        inv_pyramid("hello".to_string(), 5),
        vec![
            "hello".to_string(),
            " hello".to_string(),
            "  hello".to_string(),
            "   hello".to_string(),
            "    hello".to_string(),
        ]
    );
    assert_eq!(
        inv_pyramid("abc".to_string(), 3),
        vec![
            "abc".to_string(),
            " abc".to_string(),
            "  abc".to_string(),
        ]
    );
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
    ],
    hints: [],
  },
  {
    id: 90,
    slug: 'nextprime',
    title: 'Nextprime',
    checkpoint: 'zone01_cp3',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** which returns the first prime number which is greater than or equal to the \`u64\` passed as an argument.

The function must be optimized, so as to avoid time-outs.

> We consider that only positive numbers can be prime numbers.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which returns the first prime number which is greater than or equal to the \`u64\` passed as an argument.

The function must be optimized, so as to avoid time-outs.

> We consider that only positive numbers can be prime numbers.`,
    functionSignatures: [`pub fn next_prime(nbr: usize) -> usize {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn next_prime(nbr: usize) -> usize {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_90_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The next prime after 4 is: {}", next_prime(4));
    println!("The next prime after 11 is: {}", next_prime(11));
}`,
      expectedOutput: `The next prime after 4 is: 5
The next prime after 11 is: 11`,
      hidden: false,
    },
    {
      id: 'tc_90_2',
      description: 'Returns the number itself when already prime; smallest prime is 2',
      code: `fn main() {
    assert_eq!(next_prime(14), 17);
    assert_eq!(next_prime(1), 2);
    assert_eq!(next_prime(0), 2);
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 91,
    slug: 'partial_sums',
    title: 'Partial Sums',
    checkpoint: 'zone01_cp3',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a function named \`parts_sums\`, that receives a slice of \`u64\`, and returns a vector with the partial sums of the received array.

This is how partial sums work:

1- First you split the array in its partitions:

\`\`\`sh
[1, 2, 3, 4, 5]
      |
      V
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2]
[1]
[]
\`\`\`

2- Then you add each partition together:

\`\`\`sh
[1, 2, 3, 4, 5] = 15
[1, 2, 3, 4]    = 10
[1, 2, 3]       = 6
[1, 2]          = 3
[1]             = 1
[]              = 0
\`\`\`

3- So, in conclusion:

\`\`\`rs
parts_sums(&[1, 2, 3, 4, 5]) // == [15, 10, 6, 3 ,1, 0]
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`parts_sums\`, that receives a slice of \`u64\`, and returns a vector with the partial sums of the received array.

This is how partial sums work:

1- First you split the array in its partitions:

\`\`\`sh
[1, 2, 3, 4, 5]
      |
      V
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2]
[1]
[]
\`\`\`

2- Then you add each partition together:

\`\`\`sh
[1, 2, 3, 4, 5] = 15
[1, 2, 3, 4]    = 10
[1, 2, 3]       = 6
[1, 2]          = 3
[1]             = 1
[]              = 0
\`\`\`

3- So, in conclusion:

\`\`\`rs
parts_sums(&[1, 2, 3, 4, 5]) // == [15, 10, 6, 3 ,1, 0]
\`\`\``,
    functionSignatures: [`pub fn parts_sums(v: &[u64]) -> Vec<u64> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn parts_sums(v: &[u64]) -> Vec<u64> {
    todo!()
}`,
    solution: '',
    testCases: [
      {
        id: 'tc_91_1',
        description: 'Normal case: [1,2,3,4,5] produces shrinking prefix sums ending with 0',
        code: `fn main() {
    assert_eq!(
        parts_sums(&[1, 2, 3, 4, 5]),
        vec![15, 10, 6, 3, 1, 0]
    );
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_91_2',
        description: 'Empty slice returns [0]',
        code: `fn main() {
    assert_eq!(parts_sums(&[]), vec![0u64]);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_91_3',
        description: 'Single element returns [element, 0]',
        code: `fn main() {
    assert_eq!(parts_sums(&[42]), vec![42, 0]);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_91_4',
        description: 'Two elements',
        code: `fn main() {
    assert_eq!(parts_sums(&[1, 2]), vec![3, 1, 0]);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_91_5',
        description: 'All zeros: result is all zeros with length n+1',
        code: `fn main() {
    assert_eq!(parts_sums(&[0, 0, 0]), vec![0, 0, 0, 0]);
    let r = parts_sums(&[1, 2, 3]);
    assert_eq!(r.len(), 4);
    assert_eq!(*r.last().unwrap(), 0u64);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
    ],
    hints: [],
  },
  {
    id: 92,
    slug: 'previousprime',
    title: 'Previousprime',
    checkpoint: 'zone01_cp3',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** which returns the biggest prime number which is smaller than the \`u64\` passed as an argument.

If there are no smaller primes, the function should return \`0\`.

> A prime number is a natural number greater than 1 that is a not a product of two smaller natural numbers.
> 4 is not a prime number (so it's called a composite number) because it can be represented as 2 \\* 2. 5 is a prime number as it can only be represented by 5 \\* 1 or 1 \\* 5.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which returns the biggest prime number which is smaller than the \`u64\` passed as an argument.

If there are no smaller primes, the function should return \`0\`.

> A prime number is a natural number greater than 1 that is a not a product of two smaller natural numbers.
> 4 is not a prime number (so it's called a composite number) because it can be represented as 2 \\* 2. 5 is a prime number as it can only be represented by 5 \\* 1 or 1 \\* 5.`,
    functionSignatures: [`pub fn prev_prime(nbr: u64) -> u64  {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn prev_prime(nbr: u64) -> u64  {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_92_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The previous prime number before 34 is: {}", prev_prime(34));
}`,
      expectedOutput: `The previous prime number before 34 is: 31`,
      hidden: false,
    },
    {
      id: 'tc_92_2',
      description: 'Returns the number itself when already prime; smallest prime is 2',
      code: `fn main() {
    assert_eq!(prev_prime(20), 19);
    assert_eq!(prev_prime(13), 13);
    assert_eq!(prev_prime(2), 2);
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 93,
    slug: 'reverse_it',
    title: 'Reverse It',
    checkpoint: 'zone01_cp3',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    functionSignatures: [`pub fn reverse_it(v: i32) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn reverse_it(v: i32) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_93_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", reverse_it(123));
    println!("{}", reverse_it(-123));
}`,
      expectedOutput: `321123
-321123`,
      hidden: false,
    },
    {
      id: 'tc_93_2',
      description: 'Single digit and a negative number with a leading minus sign',
      code: `fn main() {
    assert_eq!(reverse_it(7), "77");
    assert_eq!(reverse_it(-45), "-5445");
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 94,
    slug: 'check_user_name',
    title: 'Check User Name',
    checkpoint: 'zone01_cp3',
    difficulty: 'easy',
    order: 2,
    concept: `Sometimes it is more desirable to catch the failure of some parts of a program instead of just calling panic.

For this exercise you will have to create a tool that manages users' access levels.

You will have to create an \`AccessLevel\` enum which could be \`Guest\`, \`Normal\`, \`Admin\`.

You will also have to create a \`User\` struct which has:

- Fields:
  - \`name\`: \`String\`
  - \`access_level\`: \`AccessLevel\`
- Associated functions:
  - \`new\`: which initializes the struct.
  - \`send_name\`: which takes \`&self\` and returns an \`Option<&str>\` with \`None\` if the user is a \`Guest\` or the \`name\` if the \`AccessLevel\` has any of the other options.

Also implement a function \`check_user_name\` which takes a \`User\`, calls \`send_name\` and returns a \`tuple\` with \`true\` and the user \`name\` if \`send_name\` returns the name or \`false\` and \`"ERROR: User is guest"\` if not.

> Remember to make your fields public!`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Sometimes it is more desirable to catch the failure of some parts of a program instead of just calling panic.

For this exercise you will have to create a tool that manages users' access levels.

You will have to create an \`AccessLevel\` enum which could be \`Guest\`, \`Normal\`, \`Admin\`.

You will also have to create a \`User\` struct which has:

- Fields:
  - \`name\`: \`String\`
  - \`access_level\`: \`AccessLevel\`
- Associated functions:
  - \`new\`: which initializes the struct.
  - \`send_name\`: which takes \`&self\` and returns an \`Option<&str>\` with \`None\` if the user is a \`Guest\` or the \`name\` if the \`AccessLevel\` has any of the other options.

Also implement a function \`check_user_name\` which takes a \`User\`, calls \`send_name\` and returns a \`tuple\` with \`true\` and the user \`name\` if \`send_name\` returns the name or \`false\` and \`"ERROR: User is guest"\` if not.

> Remember to make your fields public!`,
    functionSignatures: [`pub enum AccessLevel {}

pub struct User {}

impl User {
    pub fn new(name: String, level: AccessLevel) -> Self {
        todo!()
    }

    pub fn send_name(&self) -> Option<&str> {
        todo!()
    }
}

pub fn check_user_name(user: &User) -> (bool, &str) {
    todo!()
}`],
    constraints: [],
    starterCode: `pub enum AccessLevel {}

pub struct User {}

impl User {
    pub fn new(name: String, level: AccessLevel) -> Self {
        todo!()
    }

    pub fn send_name(&self) -> Option<&str> {
        todo!()
    }
}

pub fn check_user_name(user: &User) -> (bool, &str) {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_94_1',
      description: 'Usage example',
      code: `fn main() {
    let user0 = User::new("Didier".to_owned(), AccessLevel::Admin);
    println!("{:?}", check_user_name(&user0));

    let user1 = User::new("Mary".to_owned(), AccessLevel::Normal);
    println!("{:?}", check_user_name(&user1));

    let user2 = User::new("John".to_owned(), AccessLevel::Guest);
    println!("{:?}", check_user_name(&user2));
}`,
      expectedOutput: `(true, "Didier")
(true, "Mary")
(false, "ERROR: User is guest")`,
      hidden: false,
    },
    {
      id: 'tc_94_2',
      description: 'send_name returns None only for Guest; check_user_name reports the error string',
      code: `fn main() {
    let g = User::new("Zoe".to_owned(), AccessLevel::Guest);
    assert_eq!(g.send_name(), None);
    assert_eq!(check_user_name(&g), (false, "ERROR: User is guest"));
    let a = User::new("Sam".to_owned(), AccessLevel::Admin);
    assert_eq!(a.send_name(), Some("Sam"));
    assert_eq!(check_user_name(&a), (true, "Sam"));
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [],
  },
  {
    id: 95,
    slug: 'dress_code',
    title: 'Dress Code',
    checkpoint: 'zone01_cp3',
    difficulty: 'easy',
    order: 2,
    concept: `Create a function called \`choose_outfit\` that receives the following input:

- A \`formality_level\` as an \`Option<u32>\`.
- An \`invitation_message\` as a \`Result<&str, &str>\`.

The function will return a struct \`Outfit\` which contains:

- \`jacket\`, an \`enum\` \`Jacket\` that contains \`Black\`, \`White\` and \`Flowers\`.
- \`hat\`, an \`enum\` \`Hat\` that contains \`Snapback\`, \`Baseball\`, \`Fedora\`.

\`\`\`rust
#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}
\`\`\`

For the \`jacket\`:

- The jacket should be \`Flowers\` when the \`formality_level\` is \`None\`.
- The jacket should be \`White\` when the \`formality_level\` is more than 0.
- Otherwise, it should be \`Black\`.

For the \`hat\`:

- If the \`invitation_message\` is \`Ok()\` it should be \`Fedora\`.
- Otherwise, it should be \`Snapback\`.

In the specific case where \`formality_level\` is \`None\` and \`invitation_message\` is not \`Ok()\` then the \`jacket\` should be \`Flowers\` and the \`hat\` should be \`Baseball\`.

Remember that all the \`enum\` and \`struct\` used must be \`pub\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function called \`choose_outfit\` that receives the following input:

- A \`formality_level\` as an \`Option<u32>\`.
- An \`invitation_message\` as a \`Result<&str, &str>\`.

The function will return a struct \`Outfit\` which contains:

- \`jacket\`, an \`enum\` \`Jacket\` that contains \`Black\`, \`White\` and \`Flowers\`.
- \`hat\`, an \`enum\` \`Hat\` that contains \`Snapback\`, \`Baseball\`, \`Fedora\`.

\`\`\`rust
#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}
\`\`\`

For the \`jacket\`:

- The jacket should be \`Flowers\` when the \`formality_level\` is \`None\`.
- The jacket should be \`White\` when the \`formality_level\` is more than 0.
- Otherwise, it should be \`Black\`.

For the \`hat\`:

- If the \`invitation_message\` is \`Ok()\` it should be \`Fedora\`.
- Otherwise, it should be \`Snapback\`.

In the specific case where \`formality_level\` is \`None\` and \`invitation_message\` is not \`Ok()\` then the \`jacket\` should be \`Flowers\` and the \`hat\` should be \`Baseball\`.

Remember that all the \`enum\` and \`struct\` used must be \`pub\`.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq)]
pub struct Outfit {
    pub jacket: Jacket,
    pub hat: Hat,
}`,
    solution: '',
    testCases: [{
      id: 'tc_95_1',
      description: 'Usage example',
      code: `fn main() {
    println!(
        "My outfit will be: {:?}",
        choose_outfit(Some(0), Ok("Dear friend, ..."))
    );
}`,
      expectedOutput: `My outfit will be: Outfit { jacket: Black, hat: Fedora }`,
      hidden: false,
    },
    {
      id: 'tc_95_2',
      description: 'Covers White jacket, the None+Err special case, and Snapback hat',
      code: `fn main() {
    assert_eq!(choose_outfit(Some(5), Ok("hi")), Outfit { jacket: Jacket::White, hat: Hat::Fedora });
    assert_eq!(choose_outfit(None, Err("no")), Outfit { jacket: Jacket::Flowers, hat: Hat::Baseball });
    assert_eq!(choose_outfit(Some(0), Err("no")), Outfit { jacket: Jacket::Black, hat: Hat::Snapback });
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [`patterns — https://doc.rust-lang.org/book/ch18-00-patterns.html`],
  },
  {
    id: 96,
    slug: 'get_document_id',
    title: 'Get Document Id',
    checkpoint: 'zone01_cp3',
    difficulty: 'easy',
    order: 2,
    concept: `Create the following structures which will help you get the \`document_id\` of the document you need.

- \`OfficeOne\`: \`next_office\` as type \`Result<OfficeTwo, ErrorOffice>\`.
- \`OfficeTwo\`: \`next_office\` as type \`Result<OfficeThree, ErrorOffice>\`.
- \`OfficeThree\`: \`next_office\` as type \`Result<OfficeFour, ErrorOffice>\`.
- \`OfficeFour\`: \`document_id\` as type \`Result<u32, ErrorOffice>\`.

\`ErrorOffice\` is an \`enum\` with \`OfficeClose(u32)\`, \`OfficeNotFound(u32)\` or \`OfficeFull(u32)\`.

The \`u32\` is the \`id\` of the office generating the error.

Beside the structures, you must create a **function** named \`get_document_id\`, and associate it to the \`OfficeOne\` structure.

This **function** should return the \`Result\` value in the \`OfficeFour\` structure or the first \`Err\` it finds in the chain.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create the following structures which will help you get the \`document_id\` of the document you need.

- \`OfficeOne\`: \`next_office\` as type \`Result<OfficeTwo, ErrorOffice>\`.
- \`OfficeTwo\`: \`next_office\` as type \`Result<OfficeThree, ErrorOffice>\`.
- \`OfficeThree\`: \`next_office\` as type \`Result<OfficeFour, ErrorOffice>\`.
- \`OfficeFour\`: \`document_id\` as type \`Result<u32, ErrorOffice>\`.

\`ErrorOffice\` is an \`enum\` with \`OfficeClose(u32)\`, \`OfficeNotFound(u32)\` or \`OfficeFull(u32)\`.

The \`u32\` is the \`id\` of the office generating the error.

Beside the structures, you must create a **function** named \`get_document_id\`, and associate it to the \`OfficeOne\` structure.

This **function** should return the \`Result\` value in the \`OfficeFour\` structure or the first \`Err\` it finds in the chain.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum ErrorOffice {
    OfficeClose(u32),
    OfficeNotFound(u32),
    OfficeFull(u32),
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeOne {
    pub next_office: Result<OfficeTwo, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeTwo {
    pub next_office: Result<OfficeThree, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeThree {
    pub next_office: Result<OfficeFour, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeFour {
    pub document_id: Result<u32, ErrorOffice>,
}

impl OfficeOne {
    pub fn get_document_id(&self) -> Result<u32, ErrorOffice> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum ErrorOffice {
    OfficeClose(u32),
    OfficeNotFound(u32),
    OfficeFull(u32),
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeOne {
    pub next_office: Result<OfficeTwo, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeTwo {
    pub next_office: Result<OfficeThree, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeThree {
    pub next_office: Result<OfficeFour, ErrorOffice>,
}

#[derive(PartialEq, Eq, Clone, Copy)]
pub struct OfficeFour {
    pub document_id: Result<u32, ErrorOffice>,
}

impl OfficeOne {
    pub fn get_document_id(&self) -> Result<u32, ErrorOffice> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_96_1',
      description: 'Usage example',
      code: `fn main() {
    let office_ok = OfficeOne {
        next_office: Ok(OfficeTwo {
            next_office: Ok(OfficeThree {
                next_office: Ok(OfficeFour {
                    document_id: Ok(13),
                }),
            }),
        }),
    };

    let office_closed = {
        OfficeOne {
            next_office: Ok(OfficeTwo {
                next_office: Err(ErrorOffice::OfficeClose(23)),
            }),
        }
    };

    match office_ok.get_document_id() {
        Ok(id) => println!("Found a document with id {}", id),
        Err(err) => println!("Error: {:?}", err),
    };

    match office_closed.get_document_id() {
        Ok(id) => println!("Found a document with id {}", id),
        Err(err) => println!("Error: {:?}", err),
    };
}`,
      expectedOutput: `Found a document with id 13
Error: OfficeClose(23)`,
      hidden: false,
    },
    {
      id: 'tc_96_2',
      description: 'Returns the deepest id, or the first error encountered in the chain',
      code: `fn main() {
    let ok = OfficeOne { next_office: Ok(OfficeTwo { next_office: Ok(OfficeThree { next_office: Ok(OfficeFour { document_id: Ok(999) }) }) }) };
    assert_eq!(ok.get_document_id(), Ok(999));
    let e3 = OfficeOne { next_office: Ok(OfficeTwo { next_office: Ok(OfficeThree { next_office: Err(ErrorOffice::OfficeNotFound(7)) }) }) };
    assert_eq!(e3.get_document_id(), Err(ErrorOffice::OfficeNotFound(7)));
    let e4 = OfficeOne { next_office: Ok(OfficeTwo { next_office: Ok(OfficeThree { next_office: Ok(OfficeFour { document_id: Err(ErrorOffice::OfficeFull(99)) }) }) }) };
    assert_eq!(e4.get_document_id(), Err(ErrorOffice::OfficeFull(99)));
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [],
  },
  {
    id: 97,
    slug: 'negative_spelling',
    title: 'Negative Spelling',
    checkpoint: 'zone01_cp3',
    difficulty: 'medium',
    order: 3,
    concept: `In this exercise, you'll create the function \`negative_spell\` that will spell a negative number.

Here are some examples of what your function should return:

- \`-1\` -> \`"minus one"\`
- \`-14\` -> \`"minus fourteen"\`
- \`-348\` -> \`"minus three hundred forty-eight"\`
- \`-1002\` -> \`"minus one thousand two"\`

> Only negative numbers will be accepted, up to \`"minus one million"\`.
> If a positive number is passed the function should return \`"error: positive number"\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `In this exercise, you'll create the function \`negative_spell\` that will spell a negative number.

Here are some examples of what your function should return:

- \`-1\` -> \`"minus one"\`
- \`-14\` -> \`"minus fourteen"\`
- \`-348\` -> \`"minus three hundred forty-eight"\`
- \`-1002\` -> \`"minus one thousand two"\`

> Only negative numbers will be accepted, up to \`"minus one million"\`.
> If a positive number is passed the function should return \`"error: positive number"\`.`,
    functionSignatures: [`pub fn negative_spell(n: i64) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn negative_spell(n: i64) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_97_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", negative_spell(-1234));
    println!("{}", negative_spell(100));
}`,
      expectedOutput: `minus one thousand two hundred thirty-four
error: positive number`,
      hidden: false,
    },
    {
      id: 'tc_97_2',
      description: 'Hyphenated tens, round hundreds, and the positive-number error',
      code: `fn main() {
    assert_eq!(negative_spell(-45), "minus forty-five");
    assert_eq!(negative_spell(-100), "minus one hundred");
    assert_eq!(negative_spell(5), "error: positive number");
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: false,
    }],
    hints: [`patterns — https://doc.rust-lang.org/book/ch18-00-patterns.html`],
  },
  {
    id: 98,
    slug: 'queens',
    title: 'Queens',
    checkpoint: 'zone01_cp3',
    difficulty: 'medium',
    order: 3,
    concept: `In a chess game, a queen can attack pieces which are on the same rank (row), file (column), or diagonal.

The purpose of this exercise is to find out if two queens can attack each other.

The position of a chess piece on a chessboard will be represented by the struct \`ChessPosition\`. You must implement the associated function \`new\` which will return the position if it is valid, otherwise it will return \`None\`.

> Remember, chessboards have 8 files and 8 ranks (0 to 7).

You will create the \`Queen\` struct with the associate function \`can_attack\`, which will return \`true\` if the queens can attack each other or not. You also need to implement the function \`new\` which creates a new \`Queen\` with a \`ChessPosition\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `In a chess game, a queen can attack pieces which are on the same rank (row), file (column), or diagonal.

The purpose of this exercise is to find out if two queens can attack each other.

The position of a chess piece on a chessboard will be represented by the struct \`ChessPosition\`. You must implement the associated function \`new\` which will return the position if it is valid, otherwise it will return \`None\`.

> Remember, chessboards have 8 files and 8 ranks (0 to 7).

You will create the \`Queen\` struct with the associate function \`can_attack\`, which will return \`true\` if the queens can attack each other or not. You also need to implement the function \`new\` which creates a new \`Queen\` with a \`ChessPosition\`.`,
    functionSignatures: [`#[derive(Debug, Clone, Copy)]
pub struct ChessPosition {
    pub rank: usize,
    pub file: usize,
}

impl ChessPosition {
    pub fn new(rank: usize, file: usize) -> Option<Self> {
        todo!()
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Queen {
    pub position: ChessPosition,
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        todo!()
    }

    pub fn can_attack(self, other: Self) -> bool {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, Clone, Copy)]
pub struct ChessPosition {
    pub rank: usize,
    pub file: usize,
}

impl ChessPosition {
    pub fn new(rank: usize, file: usize) -> Option<Self> {
        todo!()
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Queen {
    pub position: ChessPosition,
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        todo!()
    }

    pub fn can_attack(self, other: Self) -> bool {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_98_1',
      description: 'Usage example',
      code: `fn main() {
    let white_queen = Queen::new(ChessPosition::new(2, 2).unwrap());
    let black_queen = Queen::new(ChessPosition::new(0, 4).unwrap());

    println!(
        "Is it possible for the queens to attack each other? {}",
        white_queen.can_attack(black_queen)
    );

    let white_queen = Queen::new(ChessPosition::new(1, 2).unwrap());
    let black_queen = Queen::new(ChessPosition::new(0, 4).unwrap());

    println!(
        "Is it possible for the queens to attack each other? {}",
        white_queen.can_attack(black_queen)
    );
}`,
      expectedOutput: `Is it possible for the queens to attack each other? true
Is it possible for the queens to attack each other? false`,
      hidden: false,
    },
    {
      id: 'tc_98_2',
      description: 'Attacks along rank, file and diagonal; off-board positions are None',
      code: `fn main() {
    let a = Queen::new(ChessPosition::new(3, 3).unwrap());
    assert!(a.can_attack(Queen::new(ChessPosition::new(3, 7).unwrap())));
    assert!(a.can_attack(Queen::new(ChessPosition::new(0, 3).unwrap())));
    assert!(a.can_attack(Queen::new(ChessPosition::new(5, 5).unwrap())));
    assert!(!a.can_attack(Queen::new(ChessPosition::new(4, 6).unwrap())));
    assert!(ChessPosition::new(8, 0).is_none());
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [],
  },
  {
    id: 99,
    slug: 'rpn',
    title: 'Rpn',
    checkpoint: 'zone01_cp3',
    difficulty: 'medium',
    order: 3,
    concept: `Write a **program** which takes a \`&str\` containing an equation written in \`Reverse Polish Notation\` (RPN). It should evaluate the expression, and print the result on the standard output followed by a newline.

- If the expression is not valid, or if there is not exactly one argument, \`Error\` must be printed on the standard output followed by a newline.

> Extra spaces on the expression should be ignored.

\`Reverse Polish Notation\` is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.

The following operators must be implemented : \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (modulo).

All the given operands must fit in a \`i64\`.

Examples of formulas converted in RPN:

3 + 4 >> 3 4 +

((1 \\* 2) \\* 3) - 4 >> 1 2 \\* 3 \\* 4 - or 3 1 2 \\* \\* 4 -

50 \\* (5 - (10 / 9)) >> 5 10 9 / - 50 \\*

Here is how to evaluate a formula in RPN:

\`\`\`console
1 2 * 3 * 4 -
2 3 * 4 -
6 4 -
2
\`\`\`

Or:

\`\`\`console
3 1 2 * * 4 -
3 2 * 4 -
6 4 -
2
\`\`\`

> Use \`std::env::args()\` to get the program's arguments.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Write a **program** which takes a \`&str\` containing an equation written in \`Reverse Polish Notation\` (RPN). It should evaluate the expression, and print the result on the standard output followed by a newline.

- If the expression is not valid, or if there is not exactly one argument, \`Error\` must be printed on the standard output followed by a newline.

> Extra spaces on the expression should be ignored.

\`Reverse Polish Notation\` is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.

The following operators must be implemented : \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (modulo).

All the given operands must fit in a \`i64\`.

Examples of formulas converted in RPN:

3 + 4 >> 3 4 +

((1 \\* 2) \\* 3) - 4 >> 1 2 \\* 3 \\* 4 - or 3 1 2 \\* \\* 4 -

50 \\* (5 - (10 / 9)) >> 5 10 9 / - 50 \\*

Here is how to evaluate a formula in RPN:

\`\`\`console
1 2 * 3 * 4 -
2 3 * 4 -
6 4 -
2
\`\`\`

Or:

\`\`\`console
3 1 2 * * 4 -
3 2 * 4 -
6 4 -
2
\`\`\`

> Use \`std::env::args()\` to get the program's arguments.`,
    functionSignatures: [`pub fn rpn(expr: &str) -> f64 {
    todo!()
}`],
    constraints: [],
    starterCode: `// In this trainer, implement RPN as a function that evaluates the
// expression and returns the numeric result (operands fit in f64).
pub fn rpn(expr: &str) -> f64 {
    todo!()
}`,
    solution: '',
    testCases: [
      {
        id: 'tc_99_1',
        description: 'Simple addition: 3 4 + = 7',
        code: `fn main() {
    assert_eq!(rpn("3 4 +"), 7.0);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_99_2',
        description: 'Nested expression: 5 1 2 + 4 * + 3 - = 14',
        code: `fn main() {
    assert_eq!(rpn("5 1 2 + 4 * + 3 -"), 14.0);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_99_3',
        description: 'Multiplication then addition: 2 3 4 * + = 14',
        code: `fn main() {
    assert_eq!(rpn("2 3 4 * +"), 14.0);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: true,
      },
      {
        id: 'tc_99_4',
        description: 'Division: 10 2 / = 5',
        code: `fn main() {
    assert_eq!(rpn("10 2 /"), 5.0);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: true,
      },
    ],
    hints: [],
  },
  {
    id: 100,
    slug: 'scytale_decoder',
    title: 'Scytale Decoder',
    checkpoint: 'zone01_cp3',
    difficulty: 'medium',
    order: 3,
    concept: `Create a **function** which **decodes** a scytale cipher (also known as spartan cipher).

Your function will receive a \`String\` representing the ciphered message, and a \`usize\` representing the number of letters per turn of the strip around the cylinder.

> If the ciphered message is empty or the letters per turn are 0 the function will return \`None\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which **decodes** a scytale cipher (also known as spartan cipher).

Your function will receive a \`String\` representing the ciphered message, and a \`usize\` representing the number of letters per turn of the strip around the cylinder.

> If the ciphered message is empty or the letters per turn are 0 the function will return \`None\`.`,
    functionSignatures: [`pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    todo!()
}`,
    solution: '',
    testCases: [
      {
        id: 'tc_100_1',
        description: 'Decode with 2 letters per turn (6 chars, 3 rows)',
        code: `fn main() {
    assert_eq!(
        scytale_decoder("abcdef".to_string(), 2),
        Some("acebdf".to_string())
    );
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_100_2',
        description: 'Decode with 3 letters per turn (6 chars, 2 rows)',
        code: `fn main() {
    assert_eq!(
        scytale_decoder("abcdef".to_string(), 3),
        Some("adbecf".to_string())
    );
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: false,
      },
      {
        id: 'tc_100_3',
        description: 'Empty message returns None',
        code: `fn main() {
    assert_eq!(scytale_decoder("".to_string(), 3), None);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: true,
      },
      {
        id: 'tc_100_4',
        description: 'Zero letters per turn returns None',
        code: `fn main() {
    assert_eq!(scytale_decoder("abc".to_string(), 0), None);
    println!("ok");
}`,
        expectedOutput: `ok`,
        hidden: true,
      },
    ],
    hints: [],
  },
  {
    id: 101,
    slug: 'matrix_display',
    title: 'Matrix Display',
    checkpoint: 'zone01_cp3',
    difficulty: 'hard',
    order: 4,
    concept: `Complete the \`Matrix\` struct below.

You will need to create the \`new\` associated function which initializes the struct.

You will also need to implement the \`std::fmt::Display\` trait, so that it prints like the example in the usage.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Complete the \`Matrix\` struct below.

You will need to create the \`new\` associated function which initializes the struct.

You will also need to implement the \`std::fmt::Display\` trait, so that it prints like the example in the usage.`,
    functionSignatures: [`use std::fmt;

#[derive(Debug, Clone)]
pub struct Matrix(pub Vec<Vec<i32>>);

impl Matrix {
    pub fn new(slice: &[&[i32]]) -> Self {
        todo!()
    }
}

impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `use std::fmt;

#[derive(Debug, Clone)]
pub struct Matrix(pub Vec<Vec<i32>>);

impl Matrix {
    pub fn new(slice: &[&[i32]]) -> Self {
        todo!()
    }
}

impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_101_1',
      description: 'Usage example',
      code: `fn main() {
    let matrix = Matrix::new(&[&[1, 2, 3], &[4, 5, 6], &[7, 8, 9]]);
    println!("{}", matrix);
}`,
      expectedOutput: `(1 2 3)
(4 5 6)
(7 8 9)`,
      hidden: false,
    },
    {
      id: 'tc_101_2',
      description: 'Non-square matrix with negative numbers, checked via Display',
      code: `fn main() {
    let m = Matrix::new(&[&[10, -2], &[0, 7]]);
    assert_eq!(format!("{}", m), "(10 -2)\n(0 7)");
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [],
  },
  {
    id: 102,
    slug: 'office_worker',
    title: 'Office Worker',
    checkpoint: 'zone01_cp3',
    difficulty: 'hard',
    order: 4,
    concept: `Create a structure \`OfficeWorker\` with the following public fields:

- \`name\` as \`String\`.
- \`age\` as \`u32\`.
- \`role\` as \`WorkerRole\`.

Create an enum \`WorkerRole\` which can be \`Admin\`, \`User\` or \`Guest\`.

Implement the trait \`From<&str>\` for both \`OfficeWorker\` and \`WorkerRole\`.
For \`OfficeWorker\` the string will have the format \`{name},{age},{role}\`.
For \`WorkerRole\` the format of the string will be \`{role}\` in lowercase.

> Invalid inputs won't be tested.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a structure \`OfficeWorker\` with the following public fields:

- \`name\` as \`String\`.
- \`age\` as \`u32\`.
- \`role\` as \`WorkerRole\`.

Create an enum \`WorkerRole\` which can be \`Admin\`, \`User\` or \`Guest\`.

Implement the trait \`From<&str>\` for both \`OfficeWorker\` and \`WorkerRole\`.
For \`OfficeWorker\` the string will have the format \`{name},{age},{role}\`.
For \`WorkerRole\` the format of the string will be \`{role}\` in lowercase.

> Invalid inputs won't be tested.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq)]
pub struct OfficeWorker {
}

#[derive(Debug, PartialEq, Eq)]
pub enum WorkerRole {
}

impl From<&str> for OfficeWorker {
    fn from(s: &str) -> Self {
        todo!()
    }
}

impl From<&str> for WorkerRole {
    fn from(s: &str) -> Self {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq)]
pub struct OfficeWorker {
}

#[derive(Debug, PartialEq, Eq)]
pub enum WorkerRole {
}

impl From<&str> for OfficeWorker {
    fn from(s: &str) -> Self {
        todo!()
    }
}

impl From<&str> for WorkerRole {
    fn from(s: &str) -> Self {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_102_1',
      description: 'Usage example',
      code: `fn main() {
    println!("New worker: {:?}", OfficeWorker::from("Manuel,23,admin"));
    println!(
        "New worker: {:?}",
        OfficeWorker::from("Jean Jacques,44,guest")
    );
}`,
      expectedOutput: `New worker: OfficeWorker { name: "Manuel", age: 23, role: Admin }
New worker: OfficeWorker { name: "Jean Jacques", age: 44, role: Guest }`,
      hidden: false,
    },
    {
      id: 'tc_102_2',
      description: 'From<&str> parses fields and the role for OfficeWorker and WorkerRole',
      code: `fn main() {
    assert_eq!(OfficeWorker::from("Alice,30,user"), OfficeWorker { name: "Alice".to_string(), age: 30, role: WorkerRole::User });
    assert_eq!(WorkerRole::from("admin"), WorkerRole::Admin);
    assert_eq!(WorkerRole::from("guest"), WorkerRole::Guest);
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [],
  },
  {
    id: 103,
    slug: 'organize_garage',
    title: 'Organize Garage',
    checkpoint: 'zone01_cp3',
    difficulty: 'hard',
    order: 4,
    concept: `Create a structure \`Garage\` with generic values. It must derive at least \`Debug\`, \`PartialEq\`, and \`Eq\`, and will have the following public fields:

- \`left\` as \`Option<T>\`.
- \`right\` as \`Option<T>\`.

It will implement the following public methods:

- \`move_to_right\`: Moves the values from left to right.
- \`move_to_left\`: Moves the values from right to left.

> The generic type will need to have \`Add\` and \`Copy\` traits implemented.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a structure \`Garage\` with generic values. It must derive at least \`Debug\`, \`PartialEq\`, and \`Eq\`, and will have the following public fields:

- \`left\` as \`Option<T>\`.
- \`right\` as \`Option<T>\`.

It will implement the following public methods:

- \`move_to_right\`: Moves the values from left to right.
- \`move_to_left\`: Moves the values from right to left.

> The generic type will need to have \`Add\` and \`Copy\` traits implemented.`,
    functionSignatures: [`use std::ops::Add;

#[derive(Debug, PartialEq, Eq)]
pub struct Garage<T> {
    pub left: Option<T>,
    pub right: Option<T>,
}

impl<T: Add<Output = T> + Copy> Garage<T> {
    pub fn move_to_right(&mut self) {
        todo!()
    }

    pub fn move_to_left(&mut self) {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `use std::ops::Add;

#[derive(Debug, PartialEq, Eq)]
pub struct Garage<T> {
    pub left: Option<T>,
    pub right: Option<T>,
}

impl<T: Add<Output = T> + Copy> Garage<T> {
    pub fn move_to_right(&mut self) {
        todo!()
    }

    pub fn move_to_left(&mut self) {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_103_1',
      description: 'Usage example',
      code: `fn main() {
    let mut garage = Garage {
        left: Some(5),
        right: Some(2),
    };

    println!("{:?}", garage);
    garage.move_to_right();
    println!("{:?}", garage);
    garage.move_to_left();
    println!("{:?}", garage);
}`,
      expectedOutput: `Garage { left: Some(5), right: Some(2) }
Garage { left: None, right: Some(7) }
Garage { left: Some(7), right: None }`,
      hidden: false,
    },
    {
      id: 'tc_103_2',
      description: 'Moving into an empty side, and summing into an occupied side',
      code: `fn main() {
    let mut g = Garage { left: Some(3), right: None };
    g.move_to_right();
    assert_eq!(g, Garage { left: None, right: Some(3) });
    g.move_to_left();
    assert_eq!(g, Garage { left: Some(3), right: None });
    let mut h = Garage { left: Some(10), right: Some(20) };
    h.move_to_right();
    assert_eq!(h, Garage { left: None, right: Some(30) });
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [],
  },
  {
    id: 104,
    slug: 'blood_types_s',
    title: 'Blood Types S',
    checkpoint: 'zone01_cp3',
    difficulty: 'hard',
    order: 5,
    concept: `Use the following table to define the methods asked:

| Blood Types | Donate Blood to  | Receive Blood From |
| ----------- | ---------------- | ------------------ |
| A+          | A+, AB+          | A+, A-, O+, O-     |
| O+          | O+, A+, B+, AB+  | O+, O-             |
| B+          | B+, AB+          | B+, B-, O+, O-     |
| AB+         | AB+              | Everyone           |
| A-          | A+, A-, AB+, AB- | A-, O-             |
| O-          | Everyone         | O-                 |
| B-          | B+, B-, AB+, AB- | B-, O-             |
| AB-         | AB+, AB-         | AB-, A-, B-, O-    |

Implement three methods for \`BloodType\`:

- \`can_receive_from\`: returns \`true\` if \`self\` **can** receive blood from \`other\` blood type.
- \`donors\`: which returns all the blood types that can give blood to \`self\`.
- \`recipients\`: which returns all the blood types that can receive blood from \`self\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Use the following table to define the methods asked:

| Blood Types | Donate Blood to  | Receive Blood From |
| ----------- | ---------------- | ------------------ |
| A+          | A+, AB+          | A+, A-, O+, O-     |
| O+          | O+, A+, B+, AB+  | O+, O-             |
| B+          | B+, AB+          | B+, B-, O+, O-     |
| AB+         | AB+              | Everyone           |
| A-          | A+, A-, AB+, AB- | A-, O-             |
| O-          | Everyone         | O-                 |
| B-          | B+, B-, AB+, AB- | B-, O-             |
| AB-         | AB+, AB-         | AB-, A-, B-, O-    |

Implement three methods for \`BloodType\`:

- \`can_receive_from\`: returns \`true\` if \`self\` **can** receive blood from \`other\` blood type.
- \`donors\`: which returns all the blood types that can give blood to \`self\`.
- \`recipients\`: which returns all the blood types that can receive blood from \`self\`.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum Antigen {
    A,
    AB,
    B,
    O,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum RhFactor {
    Positive,
    Negative,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub struct BloodType {
    pub antigen: Antigen,
    pub rh_factor: RhFactor,
}

impl BloodType {
    pub fn can_receive_from(self, other: Self) -> bool {
        todo!()
    }

    pub fn donors(self) -> Vec<Self> {
        todo!()
    }

    pub fn recipients(self) -> Vec<Self> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum Antigen {
    A,
    AB,
    B,
    O,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum RhFactor {
    Positive,
    Negative,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub struct BloodType {
    pub antigen: Antigen,
    pub rh_factor: RhFactor,
}

impl BloodType {
    pub fn can_receive_from(self, other: Self) -> bool {
        todo!()
    }

    pub fn donors(self) -> Vec<Self> {
        todo!()
    }

    pub fn recipients(self) -> Vec<Self> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_104_1',
      description: 'O+ can receive only from O+/O-; recipient and donor counts',
      code: `fn main() {
    let o_pos = BloodType { antigen: Antigen::O, rh_factor: RhFactor::Positive };
    assert!(o_pos.can_receive_from(BloodType { antigen: Antigen::O, rh_factor: RhFactor::Positive }));
    assert!(o_pos.can_receive_from(BloodType { antigen: Antigen::O, rh_factor: RhFactor::Negative }));
    assert!(!o_pos.can_receive_from(BloodType { antigen: Antigen::A, rh_factor: RhFactor::Positive }));
    assert_eq!(o_pos.recipients().len(), 4);
    assert_eq!(o_pos.donors().len(), 2);
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: false,
    },
    {
      id: 'tc_104_2',
      description: 'O- is the universal donor and AB+ the universal recipient',
      code: `fn main() {
    let o_neg = BloodType { antigen: Antigen::O, rh_factor: RhFactor::Negative };
    let ab_pos = BloodType { antigen: Antigen::AB, rh_factor: RhFactor::Positive };
    assert_eq!(o_neg.recipients().len(), 8);
    assert_eq!(ab_pos.donors().len(), 8);
    assert_eq!(o_neg.donors(), vec![o_neg]);
    assert!(ab_pos.can_receive_from(o_neg));
    assert!(!o_neg.can_receive_from(ab_pos));
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 105,
    slug: 'format_me',
    title: 'Format Me',
    checkpoint: 'zone01_cp3',
    difficulty: 'hard',
    order: 5,
    concept: `In this exercise you will implement the trait \`Display\` for the structure \`Park\` and the enum \`ParkType\`.

Here are the public fields and possible variants for the two types:

- \`Park\`:
  - \`name\` as \`Option<String>\`
  - \`park_type\` as \`ParkType\`
  - \`address\` as \`Option<String>\`
  - \`cap\` as \`Option<String>\`
  - \`state\` as \`Option<String>\`
- \`ParkType\`:
  - \`Garden\`
  - \`Forest\`
  - \`Playground\`

On implementing the \`Display\` trait for \`Park\`, you should display the park's fields using the following format: \`{park_type} - {name}, {address}, {cap} - {state}\`. If any of the fields \`name\`, \`address\`, \`cap\` or \`state\` are missing, display \`No name\`, \`No address\`, \`No cap\`, or \`No state\` respectively instead.

On implementing the \`Display\` trait for \`ParkType\`, you should display the park type as a string, in all lowercase.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `In this exercise you will implement the trait \`Display\` for the structure \`Park\` and the enum \`ParkType\`.

Here are the public fields and possible variants for the two types:

- \`Park\`:
  - \`name\` as \`Option<String>\`
  - \`park_type\` as \`ParkType\`
  - \`address\` as \`Option<String>\`
  - \`cap\` as \`Option<String>\`
  - \`state\` as \`Option<String>\`
- \`ParkType\`:
  - \`Garden\`
  - \`Forest\`
  - \`Playground\`

On implementing the \`Display\` trait for \`Park\`, you should display the park's fields using the following format: \`{park_type} - {name}, {address}, {cap} - {state}\`. If any of the fields \`name\`, \`address\`, \`cap\` or \`state\` are missing, display \`No name\`, \`No address\`, \`No cap\`, or \`No state\` respectively instead.

On implementing the \`Display\` trait for \`ParkType\`, you should display the park type as a string, in all lowercase.`,
    functionSignatures: [`use std::fmt;

pub struct Park {
    pub name: Option<String>,
    pub park_type: ParkType,
    pub address: Option<String>,
    pub cap: Option<String>,
    pub state: Option<String>,
}

pub enum ParkType {
    Garden,
    Forest,
    Playground,
}

impl fmt::Display for Park {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}

impl fmt::Display for ParkType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `use std::fmt;

pub struct Park {
    pub name: Option<String>,
    pub park_type: ParkType,
    pub address: Option<String>,
    pub cap: Option<String>,
    pub state: Option<String>,
}

pub enum ParkType {
    Garden,
    Forest,
    Playground,
}

impl fmt::Display for Park {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}

impl fmt::Display for ParkType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_105_1',
      description: 'Usage example',
      code: `fn main() {
    println!(
        "{}",
        Park {
            name: Some("Les Tuileries".to_owned()),
            park_type: ParkType::Garden,
            address: Some("Pl. de la Concorde".to_owned()),
            cap: Some("75001".to_owned()),
            state: Some("France".to_owned())
        }
    );
    println!(
        "{}",
        Park {
            name: None,
            park_type: ParkType::Playground,
            address: None,
            cap: None,
            state: None
        }
    );
}`,
      expectedOutput: `garden - Les Tuileries, Pl. de la Concorde, 75001 - France
playground - No name, No address, No cap - No state`,
      hidden: false,
    },
    {
      id: 'tc_105_2',
      description: 'Forest park with missing address and state, plus a bare ParkType',
      code: `fn main() {
    let p = Park {
        name: Some("Hyde".to_owned()),
        park_type: ParkType::Forest,
        address: None,
        cap: Some("W2".to_owned()),
        state: None,
    };
    assert_eq!(format!("{}", p), "forest - Hyde, No address, W2 - No state");
    assert_eq!(format!("{}", ParkType::Playground), "playground");
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [],
  },
  {
    id: 106,
    slug: 'moving_targets',
    title: 'Moving Targets',
    checkpoint: 'zone01_cp3',
    difficulty: 'hard',
    order: 5,
    concept: `You will have a linked list of \`Target\` named \`Field\`.

You will handle recursive types and ownership and implement the following **associated functions**:

- \`new\`: which will initialize the \`Field\` with \`head\` set to \`None\`.
- \`push\`: which receives a \`Target\` and add it as a \`Node\` at the head of the list.
- \`pop\`: which returns the last added \`Target\` wrapped in an \`Option\` and removes it from the list.
- \`peek\`: which returns the last added \`Target\` as a reference wrapped in an \`Option\` but does not remove it from the list.
- \`peek_mut\`: which returns the last added \`Target\` as a mutable reference wrapped in an \`Option\` and also does not remove it from the list.

You must also implement a type named \`Link\`. This will be the connection between the \`Field\` and \`Target\` structures. This will be a recursion type, and it must point to \`None\` if there is no \`Target\` to point to.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `You will have a linked list of \`Target\` named \`Field\`.

You will handle recursive types and ownership and implement the following **associated functions**:

- \`new\`: which will initialize the \`Field\` with \`head\` set to \`None\`.
- \`push\`: which receives a \`Target\` and add it as a \`Node\` at the head of the list.
- \`pop\`: which returns the last added \`Target\` wrapped in an \`Option\` and removes it from the list.
- \`peek\`: which returns the last added \`Target\` as a reference wrapped in an \`Option\` but does not remove it from the list.
- \`peek_mut\`: which returns the last added \`Target\` as a mutable reference wrapped in an \`Option\` and also does not remove it from the list.

You must also implement a type named \`Link\`. This will be the connection between the \`Field\` and \`Target\` structures. This will be a recursion type, and it must point to \`None\` if there is no \`Target\` to point to.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq)]
pub struct Target {
    pub size: u32,
    pub xp: u32,
}

pub struct Field {
    head: Link,
}

type Link = // To be implemented

struct Node {
    elem: Target,
    next: Link,
}

impl Field {
    pub fn new() -> Self {
        todo!()
    }

    pub fn push(&mut self, target: Target) {
        todo!()
    }

    pub fn pop(&mut self) -> Option<Target> {
        todo!()
    }

    pub fn peek(&self) -> Option<&Target> {
        todo!()
    }

    pub fn peek_mut(&mut self) -> Option<&mut Target> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq)]
pub struct Target {
    pub size: u32,
    pub xp: u32,
}

pub struct Field {
    head: Link,
}

type Link = // To be implemented

struct Node {
    elem: Target,
    next: Link,
}

impl Field {
    pub fn new() -> Self {
        todo!()
    }

    pub fn push(&mut self, target: Target) {
        todo!()
    }

    pub fn pop(&mut self) -> Option<Target> {
        todo!()
    }

    pub fn peek(&self) -> Option<&Target> {
        todo!()
    }

    pub fn peek_mut(&mut self) -> Option<&mut Target> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_106_1',
      description: 'Usage example',
      code: `fn main() {
    let mut field = Field::new();

    println!("{:?}", field.pop());
    field.push(Target { size: 12, xp: 2 });
    println!("{:?}", *field.peek().unwrap());
    field.push(Target { size: 24, xp: 4 });
    println!("{:?}", field.pop());
    let last_target = field.peek_mut().unwrap();
    *last_target = Target { size: 2, xp: 0 };
    println!("{:?}", field.pop());
}`,
      expectedOutput: `None
Target { size: 12, xp: 2 }
Some(Target { size: 24, xp: 4 })
Some(Target { size: 2, xp: 0 })`,
      hidden: false,
    },
    {
      id: 'tc_106_2',
      description: 'LIFO order, peek does not remove, peek_mut edits in place',
      code: `fn main() {
    let mut f = Field::new();
    assert_eq!(f.peek(), None);
    f.push(Target { size: 1, xp: 1 });
    f.push(Target { size: 2, xp: 2 });
    f.push(Target { size: 3, xp: 3 });
    assert_eq!(f.peek(), Some(&Target { size: 3, xp: 3 }));
    assert_eq!(f.pop(), Some(Target { size: 3, xp: 3 }));
    assert_eq!(f.pop(), Some(Target { size: 2, xp: 2 }));
    if let Some(t) = f.peek_mut() { t.xp = 99; }
    assert_eq!(f.pop(), Some(Target { size: 1, xp: 99 }));
    assert_eq!(f.pop(), None);
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [`Box\\<T\\> — https://doc.rust-lang.org/book/ch15-01-box.html`, `Linked lists in Rust — https://rust-unofficial.github.io/too-many-lists/index.html`],
  },
  {
    id: 107,
    slug: 'car_rental',
    title: 'Car Rental',
    checkpoint: 'zone01_cp3',
    difficulty: 'hardest',
    order: 6,
    concept: `Create a struct named \`Car\` and another one named \`RentalBusiness\`.

The scope of the exercise will be to modify and operate on the \`Car\` in the \`RentalBusiness\` even if this element is not declared as mutable, introducing the concept of interior mutability.

To accomplish that, you will create some methods for \`RentalBusiness\` that will return the field \`car\` in many different ways.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a struct named \`Car\` and another one named \`RentalBusiness\`.

The scope of the exercise will be to modify and operate on the \`Car\` in the \`RentalBusiness\` even if this element is not declared as mutable, introducing the concept of interior mutability.

To accomplish that, you will create some methods for \`RentalBusiness\` that will return the field \`car\` in many different ways.`,
    functionSignatures: [`use std::cell::{Ref, RefCell, RefMut};

#[derive(Debug, Default, PartialEq, Eq)]
pub struct Car {
    pub color: String,
    pub plate: String,
}

#[derive(Debug)]
pub struct RentalBusiness {
    pub car: RefCell<Car>,
}

impl RentalBusiness {
    pub fn rent_car(&self) -> Ref<'_, Car> {
        todo!()
    }

    pub fn sell_car(&self) -> Car {
        todo!()
    }

    pub fn repair_car(&self) -> RefMut<'_, Car> {
        todo!()
    }

    pub fn change_car(&self, new_car: Car) {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `use std::cell::{Ref, RefCell, RefMut};

#[derive(Debug, Default, PartialEq, Eq)]
pub struct Car {
    pub color: String,
    pub plate: String,
}

#[derive(Debug)]
pub struct RentalBusiness {
    pub car: RefCell<Car>,
}

impl RentalBusiness {
    pub fn rent_car(&self) -> Ref<'_, Car> {
        todo!()
    }

    pub fn sell_car(&self) -> Car {
        todo!()
    }

    pub fn repair_car(&self) -> RefMut<'_, Car> {
        todo!()
    }

    pub fn change_car(&self, new_car: Car) {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_107_1',
      description: 'Usage example',
      code: `fn main() {
    let car_rental = RentalBusiness {
        car: RefCell::new(Car {
            color: "red".to_string(),
            plate: "AAA".to_string(),
        }),
    };

    println!("{:?}", car_rental.rent_car());
    println!("{:?}", car_rental.repair_car());

    {
        let mut car = car_rental.repair_car();
        car.color = "blue".to_string();
    }

    println!("{:?}", car_rental.rent_car());

    car_rental.change_car(Car {
        color: "pink".to_string(),
        plate: "WWW".to_string(),
    });

    println!("{:?}", car_rental.rent_car());

    println!("{:?}", car_rental.sell_car());
    println!("{:?}", car_rental.sell_car());
}`,
      expectedOutput: `Car { color: "red", plate: "AAA" }
Car { color: "red", plate: "AAA" }
Car { color: "blue", plate: "AAA" }
Car { color: "pink", plate: "WWW" }
Car { color: "pink", plate: "WWW" }
Car { color: "", plate: "" }`,
      hidden: false,
    },
    {
      id: 'tc_107_2',
      description: 'Interior mutability: repair mutates, change replaces, sell leaves the default',
      code: `fn main() {
    let biz = RentalBusiness { car: RefCell::new(Car { color: "green".to_string(), plate: "ZZZ".to_string() }) };
    assert_eq!(biz.rent_car().plate, "ZZZ");
    biz.repair_car().color = "black".to_string();
    assert_eq!(biz.rent_car().color, "black");
    biz.change_car(Car { color: "white".to_string(), plate: "111".to_string() });
    assert_eq!(*biz.rent_car(), Car { color: "white".to_string(), plate: "111".to_string() });
    let sold = biz.sell_car();
    assert_eq!(sold, Car { color: "white".to_string(), plate: "111".to_string() });
    assert_eq!(*biz.rent_car(), Car::default());
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [`std::cell::RefCell — https://doc.rust-lang.org/std/cell/struct.RefCell.html`, `Struct std::rc::Rc — https://doc.rust-lang.org/std/rc/struct.Rc.html`],
  },
  {
    id: 108,
    slug: 'drop_the_blog',
    title: 'Drop The Blog',
    checkpoint: 'zone01_cp3',
    difficulty: 'hardest',
    order: 6,
    concept: `Define the following structures:

- \`Blog\`: containing:
  - \`drops\` that will save the number of dropped articles.
  - \`states\` that will save the state of multiple articles. If the article is not dropped, the state will be \`false\`, otherwise it will be \`true\`.

- \`Article\`: containing:
  - \`id\` as \`usize\`.
  - \`body\` as \`String\`.
  - \`parent\` as a link to the structure \`Blog\`. (Tip: this should be a reference).

You'll need to also add the following associated functions to the structures:

- \`Blog\`:
  - \`new\` that creates an empty blog.
  - \`new_article\` that receives a \`String\` for the body and returns a tuple with the \`id\` and a new \`Article\`.
  - \`is_dropped\` that receives an \`id\` and returns a \`bool\` that indicates the state of the article.
  - \`new_id\` which returns a \`usize\` representing the length of the \`states\` vector. (Which is also the first available id).
  - \`add_drop\` which is **called by the \`Drop\` trait**. It will receive an \`id\` that will be used to change the state of the article. If the state of that article is \`true\` then it will panic with the message \`"X is already dropped"\`, where \`X\` represents the \`id\`). Otherwise it should change the state to \`true\` and increment the \`drops\` field by 1.

- \`Article\`:
  - \`new\` that initializes a new article.
  - \`discard\` that drops the article.

> You must implement \`Drop\` for \`Article\`. In this trait you must call the function \`add_drop\` so that the state of the article changes.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Define the following structures:

- \`Blog\`: containing:
  - \`drops\` that will save the number of dropped articles.
  - \`states\` that will save the state of multiple articles. If the article is not dropped, the state will be \`false\`, otherwise it will be \`true\`.

- \`Article\`: containing:
  - \`id\` as \`usize\`.
  - \`body\` as \`String\`.
  - \`parent\` as a link to the structure \`Blog\`. (Tip: this should be a reference).

You'll need to also add the following associated functions to the structures:

- \`Blog\`:
  - \`new\` that creates an empty blog.
  - \`new_article\` that receives a \`String\` for the body and returns a tuple with the \`id\` and a new \`Article\`.
  - \`is_dropped\` that receives an \`id\` and returns a \`bool\` that indicates the state of the article.
  - \`new_id\` which returns a \`usize\` representing the length of the \`states\` vector. (Which is also the first available id).
  - \`add_drop\` which is **called by the \`Drop\` trait**. It will receive an \`id\` that will be used to change the state of the article. If the state of that article is \`true\` then it will panic with the message \`"X is already dropped"\`, where \`X\` represents the \`id\`). Otherwise it should change the state to \`true\` and increment the \`drops\` field by 1.

- \`Article\`:
  - \`new\` that initializes a new article.
  - \`discard\` that drops the article.

> You must implement \`Drop\` for \`Article\`. In this trait you must call the function \`add_drop\` so that the state of the article changes.`,
    functionSignatures: [`use std::cell::{RefCell, Cell};

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Blog {
    pub drops: Cell<usize>,
    pub states: RefCell<Vec<bool>>
}

impl Blog {
    pub fn new() -> Self {
        todo!()
    }

    pub fn new_article(&self, body: String) -> (usize, Article<'_>) {
        todo!()
    }

    pub fn new_id(&self) -> usize {
        todo!()
    }

    pub fn is_dropped(&self, id: usize) -> bool {
        todo!()
    }

    pub fn add_drop(&self, id: usize) {
        todo!()
    }
}

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Article<'a> {

}

impl<'a> Article<'a> {
    pub fn new(id: usize, body: String, parent: &'a Blog) -> Self {
        todo!()
    }

    pub fn discard(self) {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `use std::cell::{RefCell, Cell};

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Blog {
    pub drops: Cell<usize>,
    pub states: RefCell<Vec<bool>>
}

impl Blog {
    pub fn new() -> Self {
        todo!()
    }

    pub fn new_article(&self, body: String) -> (usize, Article<'_>) {
        todo!()
    }

    pub fn new_id(&self) -> usize {
        todo!()
    }

    pub fn is_dropped(&self, id: usize) -> bool {
        todo!()
    }

    pub fn add_drop(&self, id: usize) {
        todo!()
    }
}

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Article<'a> {

}

impl<'a> Article<'a> {
    pub fn new(id: usize, body: String, parent: &'a Blog) -> Self {
        todo!()
    }

    pub fn discard(self) {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_108_1',
      description: 'Usage example',
      code: `fn main() {
    let blog = Blog::new();
    let (id, article) = blog.new_article(String::from("Winter is coming"));
    let (id1, article1) = blog.new_article(String::from("The story of the universe"));

    article.discard();

    println!("{:?}", (blog.is_dropped(id), id, &blog.drops));

    article1.discard();
    println!("{:?}", (blog.is_dropped(id1), id1, &blog.drops));

    let (id2, article2) = blog.new_article(String::from("How to cook 101"));
    let article2 = Rc::new(article2);
    let article2_clone = article2.clone();

    drop(article2_clone);

    println!(
        "{:?}",
        (
            blog.is_dropped(id2),
            id2,
            &blog.drops,
            Rc::strong_count(&article2)
        )
    );
}`,
      expectedOutput: `(true, 0, Cell { value: 1 })
(true, 1, Cell { value: 2 })
(false, 2, Cell { value: 2 }, 1)`,
      hidden: false,
    },
    {
      id: 'tc_108_2',
      description: 'discard records the drop state and increments the counter (no Rc needed)',
      code: `fn main() {
    let blog = Blog::new();
    assert_eq!(blog.new_id(), 0);
    let (i0, a0) = blog.new_article(String::from("first"));
    let (i1, a1) = blog.new_article(String::from("second"));
    assert_eq!((i0, i1), (0, 1));
    assert_eq!(blog.new_id(), 2);
    assert!(!blog.is_dropped(0));
    a1.discard();
    assert!(blog.is_dropped(1));
    assert!(!blog.is_dropped(0));
    assert_eq!(blog.drops.get(), 1);
    a0.discard();
    assert_eq!(blog.drops.get(), 2);
    assert!(blog.is_dropped(0));
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [`Trait std::ops::Drop — https://doc.bccnsoft.com/docs/rust-1.36.0-docs-html/std/ops/trait.Drop.html`, `Struct std::cell::RefCell — https://doc.rust-lang.org/std/cell/struct.RefCell.html`, `Interior Mutability — https://doc.rust-lang.org/book/ch15-05-interior-mutability.html`],
  },
  {
    id: 109,
    slug: 'lunch_queue',
    title: 'Lunch Queue',
    checkpoint: 'zone01_cp3',
    difficulty: 'hardest',
    order: 6,
    concept: `You will need to create an API, so that a program can organize a queue of people.

The program requires the following functions. Add them as associated functions to the \`Queue\` structure:

- \`new\`: which will initialize the \`Queue\`.
- \`add\`: which adds a person to the queue.
- \`invert_queue\`: which reverses the queue.
- \`rm\`: which removes the person who finished ordering their food. The removal should respect the FIFO method (first in first out). It should return the person's details (as \`(name, discount)\`).
- \`search\`: which returns the details for a given person's \`name\` (as \`(name, discount)\`).

You must also create a type named \`Link\`. This will be the connection of the structures \`Queue\` and \`Person\`. This will be a recursion type, and must point to \`None\` if there is no \`Person\` to point to.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `You will need to create an API, so that a program can organize a queue of people.

The program requires the following functions. Add them as associated functions to the \`Queue\` structure:

- \`new\`: which will initialize the \`Queue\`.
- \`add\`: which adds a person to the queue.
- \`invert_queue\`: which reverses the queue.
- \`rm\`: which removes the person who finished ordering their food. The removal should respect the FIFO method (first in first out). It should return the person's details (as \`(name, discount)\`).
- \`search\`: which returns the details for a given person's \`name\` (as \`(name, discount)\`).

You must also create a type named \`Link\`. This will be the connection of the structures \`Queue\` and \`Person\`. This will be a recursion type, and must point to \`None\` if there is no \`Person\` to point to.`,
    functionSignatures: [`#[derive(Debug, Clone)]
pub struct Queue {
    pub node: Link,
}

pub type Link =

#[derive(Debug, Clone)]
pub struct Person {
    pub name: String,
    pub discount: i32,
    pub next_person: Link,
}

impl Queue {
    pub fn new() -> Queue {
        todo!()
    }

    pub fn add(&mut self, name: String, discount: i32) {
        todo!()
    }

    pub fn invert_queue(&mut self) {
        todo!()
    }

    pub fn rm(&mut self) -> Option<(String, i32)> {
        todo!()
    }

    pub fn search(&self, name: &str) -> Option<(&String, &i32)> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, Clone)]
pub struct Queue {
    pub node: Link,
}

pub type Link =

#[derive(Debug, Clone)]
pub struct Person {
    pub name: String,
    pub discount: i32,
    pub next_person: Link,
}

impl Queue {
    pub fn new() -> Queue {
        todo!()
    }

    pub fn add(&mut self, name: String, discount: i32) {
        todo!()
    }

    pub fn invert_queue(&mut self) {
        todo!()
    }

    pub fn rm(&mut self) -> Option<(String, i32)> {
        todo!()
    }

    pub fn search(&self, name: &str) -> Option<(&String, &i32)> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_109_1',
      description: 'Usage example',
      code: `fn main() {
    let mut list = Queue::new();
    list.add(String::from("Marie"), 20);
    list.add(String::from("Monica"), 15);
    list.add(String::from("Ana"), 5);
    list.add(String::from("Alice"), 35);
    println!("{:?}", list);

    println!("{:?}", list.search("Marie"));
    println!("{:?}", list.search("Alice"));
    println!("{:?}", list.search("someone"));

    println!("removed {:?}", list.rm());
    println!("list {:?}", list);
    list.invert_queue();
    println!("invert {:?}", list);
}`,
      expectedOutput: `Queue { node: Some(Person { name: "Alice", discount: 35, next_person: Some(Person { name: "Ana", discount: 5, next_person: Some(Person { name: "Monica", discount: 15, next_person: Some(Person { name: "Marie", discount: 20, next_person: None }) }) }) }) }
Some(("Marie", 20))
Some(("Alice", 35))
None
removed Some(("Marie", 20))
list Queue { node: Some(Person { name: "Alice", discount: 35, next_person: Some(Person { name: "Ana", discount: 5, next_person: Some(Person { name: "Monica", discount: 15, next_person: None }) }) }) }
invert Queue { node: Some(Person { name: "Monica", discount: 15, next_person: Some(Person { name: "Ana", discount: 5, next_person: Some(Person { name: "Alice", discount: 35, next_person: None }) }) }) }`,
      hidden: false,
    },
    {
      id: 'tc_109_2',
      description: 'FIFO removal order, search hits and misses, invert on a single element',
      code: `fn main() {
    let mut q = Queue::new();
    assert_eq!(q.rm(), None);
    q.add("A".to_string(), 1);
    q.add("B".to_string(), 2);
    q.add("C".to_string(), 3);
    assert_eq!(q.search("B"), Some((&"B".to_string(), &2)));
    assert_eq!(q.search("nope"), None);
    assert_eq!(q.rm(), Some(("A".to_string(), 1)));
    assert_eq!(q.rm(), Some(("B".to_string(), 2)));
    q.invert_queue();
    assert_eq!(q.rm(), Some(("C".to_string(), 3)));
    assert_eq!(q.rm(), None);
    println!("ok");
}`,
      expectedOutput: `ok`,
      hidden: true,
    }],
    hints: [`enum — https://doc.rust-lang.org/rust-by-example/custom_types/enum.html`, `Box — https://doc.rust-lang.org/book/ch15-01-box.html`, `std::option — https://doc.rust-lang.org/std/option/`],
  },
  {
    id: 110,
    slug: 'count_factorial_steps',
    title: 'Count Factorial Steps',
    checkpoint: 'zone01_final',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** named \`count_factorial_steps\` that receives a factorial number and counts how many multiplications are necessary to have this number.

If the argument is not a factorial, or it is equal 0 or 1, then the function should return 0.

\`\`\`rust
pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}
\`\`\`

As a reminder, the factorial of a number is the product of all the integers from 1 to that number.

Example: the factorial of 6 (written 6!) is 1 \\* 2 \\* 3 \\* 4 \\* 5 \\* 6 = 720. As such, the factorial steps of 720 are 6.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** named \`count_factorial_steps\` that receives a factorial number and counts how many multiplications are necessary to have this number.

If the argument is not a factorial, or it is equal 0 or 1, then the function should return 0.

\`\`\`rust
pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}
\`\`\`

As a reminder, the factorial of a number is the product of all the integers from 1 to that number.

Example: the factorial of 6 (written 6!) is 1 \\* 2 \\* 3 \\* 4 \\* 5 \\* 6 = 720. As such, the factorial steps of 720 are 6.`,
    functionSignatures: [`pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn count_factorial_steps(factorial: u64) -> u64 {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_110_1',
      description: 'Usage example',
      code: `fn main() {
    println!(
        "The factorial steps of 720 = {}",
        count_factorial_steps(720)
    );
    println!("The factorial steps of 13 = {}", count_factorial_steps(13));
    println!("The factorial steps of 6 = {}", count_factorial_steps(6));
}`,
      expectedOutput: `The factorial steps of 720 = 6
The factorial steps of 13 = 0
The factorial steps of 6 = 3`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 111,
    slug: 'matrix_multiplication',
    title: 'Matrix Multiplication',
    checkpoint: 'zone01_final',
    difficulty: 'easiest',
    order: 1,
    concept: `- Define a \`struct\` named \`Matrix\` as a tuple of two tuples. The nested tuple will contain two \`i32\`.

- Create a **function** named \`multiply\` that receives a \`Matrix\` and an \`i32\` and returns the \`Matrix\` with each number multiplied by the second argument.

\`\`\`rust
pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}
\`\`\`

\`Matrix\` must implement \`Debug\`, \`PartialEq\` and \`Eq\`. You can use \`derive\`.

> Remember that you are defining a library, so any element that can be called from an external crate must be made public.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `- Define a \`struct\` named \`Matrix\` as a tuple of two tuples. The nested tuple will contain two \`i32\`.

- Create a **function** named \`multiply\` that receives a \`Matrix\` and an \`i32\` and returns the \`Matrix\` with each number multiplied by the second argument.

\`\`\`rust
pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}
\`\`\`

\`Matrix\` must implement \`Debug\`, \`PartialEq\` and \`Eq\`. You can use \`derive\`.

> Remember that you are defining a library, so any element that can be called from an external crate must be made public.`,
    functionSignatures: [`pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_111_1',
      description: 'Usage example',
      code: `fn main() {
    let matrix = Matrix((1, 3), (4, 5));
    println!("Original matrix {:?}", matrix);
    println!("Matrix after multiply {:?}", multiply(matrix, 3));
}`,
      expectedOutput: `Original matrix Matrix((1, 3), (4, 5))
Matrix after multiply Matrix((3, 9), (12, 15))`,
      hidden: false,
    }],
    hints: [`Defining a struct — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`, `The Tuple Type — https://doc.rust-lang.org/stable/book/ch03-02-data-types.html`, `Tuples — https://doc.rust-lang.org/rust-by-example/primitives/tuples.html`, `Tuple Structs without Named Fields — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`, `Adding Useful Functionality with Derived Traits — https://doc.rust-lang.org/stable/book/ch05-02-example-structs.html`, `Chapter 7 — https://doc.rust-lang.org/stable/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html`],
  },
  {
    id: 112,
    slug: 'min_and_max',
    title: 'Min And Max',
    checkpoint: 'zone01_final',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** named \`min_and_max\` that receives three \`i32\` and returns a \`tuple\` with the minimum and the maximum number received as input.

\`\`\`rust
pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** named \`min_and_max\` that receives three \`i32\` and returns a \`tuple\` with the minimum and the maximum number received as input.

\`\`\`rust
pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}
\`\`\``,
    functionSignatures: [`pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}`],
    constraints: [],
    starterCode: `pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32) {
}`,
    solution: '',
    testCases: [{
      id: 'tc_112_1',
      description: 'Usage example',
      code: `fn main() {
    println!("Minimum and maximum are: {:?}", min_and_max(9, 2, 4));
}`,
      expectedOutput: `Minimum and maximum are: (2, 9)`,
      hidden: false,
    }],
    hints: [`The Tuple Type — https://doc.rust-lang.org/stable/book/ch03-02-data-types.html`, `Tuples — https://doc.rust-lang.org/rust-by-example/primitives/tuples.html`, `Tuple Structs without Named Fields — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`],
  },
  {
    id: 113,
    slug: 'counting_words',
    title: 'Counting Words',
    checkpoint: 'zone01_final',
    difficulty: 'easy',
    order: 2,
    concept: `Create a function named \`counting_words\`, that receives a \`&str\`. It should return each word in the string and the number of times it appears on the string.

Each of the following will count as **one** single word:

- A number like "0" or "1234".
- A word or letter like "a" or "they".
- Two words joined by a single apostrophe like "it's" or "they're".

The function must respect the following rules:

- The count is case insensitive, so that "HELLO", "Hello", and "hello" are 3 uses of the same word.
- All forms of punctuation are to be ignored, except for the apostrophe if used like the example above.
- The words can be separated by any form of ASCII whitespace (e.g. "\\t", "\\n", " ").
- On the resulting HashMap, every word occurrence should be in lowercase.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`counting_words\`, that receives a \`&str\`. It should return each word in the string and the number of times it appears on the string.

Each of the following will count as **one** single word:

- A number like "0" or "1234".
- A word or letter like "a" or "they".
- Two words joined by a single apostrophe like "it's" or "they're".

The function must respect the following rules:

- The count is case insensitive, so that "HELLO", "Hello", and "hello" are 3 uses of the same word.
- All forms of punctuation are to be ignored, except for the apostrophe if used like the example above.
- The words can be separated by any form of ASCII whitespace (e.g. "\\t", "\\n", " ").
- On the resulting HashMap, every word occurrence should be in lowercase.`,
    functionSignatures: [`fn counting_words(words: &str) -> HashMap<String, u32> {
    todo!()
}`],
    constraints: [],
    starterCode: `fn counting_words(words: &str) -> HashMap<String, u32> {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_113_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{:?}", counting_words("Hello, world!"));
    println!("{:?}", counting_words("\u{201c}Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\u{201d}
    ― Albert Einstein "));
    println!("{:?}", counting_words("Batman, BATMAN, batman, Stop stop"));
}`,
      expectedOutput: `{"world": 1, "hello": 1}
{"are": 1, "about": 1, "stupidity": 1, "human": 1, "infinite": 1, "i'm": 1, "things": 1, "einstein": 1, "albert": 1, "sure": 1, "the": 2, "not": 1, "universe": 2, "and": 2, "two": 1}
{"stop": 2, "batman": 3}`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 114,
    slug: 'modify_letter',
    title: 'Modify Letter',
    checkpoint: 'zone01_final',
    difficulty: 'easy',
    order: 2,
    concept: `Create a **function** \`remove_letter_sensitive\` that returns a string without the letter specified as argument.

Create a **function** \`remove_letter_insensitive\` that returns a string without the letter specified as argument (ignoring case).

Create a **function** \`swap_letter_case\` that returns a string swapping the case for the chosen letter.

> Our tests will only use ASCII characters.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** \`remove_letter_sensitive\` that returns a string without the letter specified as argument.

Create a **function** \`remove_letter_insensitive\` that returns a string without the letter specified as argument (ignoring case).

Create a **function** \`swap_letter_case\` that returns a string swapping the case for the chosen letter.

> Our tests will only use ASCII characters.`,
    functionSignatures: [`pub fn remove_letter_sensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn remove_letter_insensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn swap_letter_case(s: &str, letter: char) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn remove_letter_sensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn remove_letter_insensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn swap_letter_case(s: &str, letter: char) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_114_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", remove_letter_sensitive("Jojhn jis sljeepjjing", 'j'));
    println!(
        "{}",
        remove_letter_insensitive("JaimA ais swiaAmmingA", 'A')
    );
    println!("{}", swap_letter_case("byE bye", 'e'));
}`,
      expectedOutput: `John is sleeping
Jim is swimming
bye byE`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 115,
    slug: 'reverse_it',
    title: 'Reverse It',
    checkpoint: 'zone01_final',
    difficulty: 'easy',
    order: 2,
    concept: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`reverse_it\`, that takes a number. It should return a string with the number reversed, followed by the original number. If the number is negative, a \`-\` should be added to the beginning of the string.`,
    functionSignatures: [`pub fn reverse_it(v: i32) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn reverse_it(v: i32) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_115_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", reverse_it(123));
    println!("{}", reverse_it(-123));
}`,
      expectedOutput: `321123
-321123`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 116,
    slug: 'smallest',
    title: 'Smallest',
    checkpoint: 'zone01_final',
    difficulty: 'easy',
    order: 2,
    concept: `Create a function named \`smallest\` that gets the smallest number in the \`HashMap\`.

If the \`HashMap\` is empty, return the maximum \`i32\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`smallest\` that gets the smallest number in the \`HashMap\`.

If the \`HashMap\` is empty, return the maximum \`i32\`.`,
    functionSignatures: [`pub fn smallest(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn smallest(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_116_1',
      description: 'Usage example',
      code: `fn main() {
    let hash = HashMap::from([
        ("Cat", 122),
        ("Dog", 333),
        ("Elephant", 334),
        ("Gorilla", 14),
    ]);

    println!(
        "The smallest of the elements in the HashMap is {}",
        smallest(hash)
    );
}`,
      expectedOutput: `The smallest of the elements in the HashMap is 14`,
      hidden: false,
    }],
    hints: [`hash maps — https://doc.rust-lang.org/book/ch08-03-hash-maps.html`],
  },
  {
    id: 117,
    slug: 'inv_pyramid',
    title: 'Inv Pyramid',
    checkpoint: 'zone01_final',
    difficulty: 'medium',
    order: 3,
    concept: `Create a function named \`inv_pyramid\` that takes a string and an integer as input and returns a vector of strings.
This function should create a pyramid structure. Each element of the vector must be the given string after indentation represented as spaces.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`inv_pyramid\` that takes a string and an integer as input and returns a vector of strings.
This function should create a pyramid structure. Each element of the vector must be the given string after indentation represented as spaces.`,
    functionSignatures: [`pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn inv_pyramid(v: String, i: usize) -> Vec<String> {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 118,
    slug: 'nextprime',
    title: 'Nextprime',
    checkpoint: 'zone01_final',
    difficulty: 'medium',
    order: 3,
    concept: `Create a **function** which returns the first prime number which is greater than or equal to the \`u64\` passed as an argument.

The function must be optimized, so as to avoid time-outs.

> We consider that only positive numbers can be prime numbers.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which returns the first prime number which is greater than or equal to the \`u64\` passed as an argument.

The function must be optimized, so as to avoid time-outs.

> We consider that only positive numbers can be prime numbers.`,
    functionSignatures: [`pub fn next_prime(nbr: usize) -> usize {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn next_prime(nbr: usize) -> usize {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_118_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The next prime after 4 is: {}", next_prime(4));
    println!("The next prime after 11 is: {}", next_prime(11));
}`,
      expectedOutput: `The next prime after 4 is: 5
The next prime after 11 is: 11`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 119,
    slug: 'partial_sums',
    title: 'Partial Sums',
    checkpoint: 'zone01_final',
    difficulty: 'medium',
    order: 3,
    concept: `Create a function named \`parts_sums\`, that receives a slice of \`u64\`, and returns a vector with the partial sums of the received array.

This is how partial sums work:

1- First you split the array in its partitions:

\`\`\`sh
[1, 2, 3, 4, 5]
      |
      V
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2]
[1]
[]
\`\`\`

2- Then you add each partition together:

\`\`\`sh
[1, 2, 3, 4, 5] = 15
[1, 2, 3, 4]    = 10
[1, 2, 3]       = 6
[1, 2]          = 3
[1]             = 1
[]              = 0
\`\`\`

3- So, in conclusion:

\`\`\`rs
parts_sums(&[1, 2, 3, 4, 5]) // == [15, 10, 6, 3 ,1, 0]
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`parts_sums\`, that receives a slice of \`u64\`, and returns a vector with the partial sums of the received array.

This is how partial sums work:

1- First you split the array in its partitions:

\`\`\`sh
[1, 2, 3, 4, 5]
      |
      V
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2]
[1]
[]
\`\`\`

2- Then you add each partition together:

\`\`\`sh
[1, 2, 3, 4, 5] = 15
[1, 2, 3, 4]    = 10
[1, 2, 3]       = 6
[1, 2]          = 3
[1]             = 1
[]              = 0
\`\`\`

3- So, in conclusion:

\`\`\`rs
parts_sums(&[1, 2, 3, 4, 5]) // == [15, 10, 6, 3 ,1, 0]
\`\`\``,
    functionSignatures: [`pub fn partial_sums() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn partial_sums() {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 120,
    slug: 'previousprime',
    title: 'Previousprime',
    checkpoint: 'zone01_final',
    difficulty: 'medium',
    order: 3,
    concept: `Create a **function** which returns the biggest prime number which is smaller than the \`u64\` passed as an argument.

If there are no smaller primes, the function should return \`0\`.

> A prime number is a natural number greater than 1 that is a not a product of two smaller natural numbers.
> 4 is not a prime number (so it's called a composite number) because it can be represented as 2 \\* 2. 5 is a prime number as it can only be represented by 5 \\* 1 or 1 \\* 5.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which returns the biggest prime number which is smaller than the \`u64\` passed as an argument.

If there are no smaller primes, the function should return \`0\`.

> A prime number is a natural number greater than 1 that is a not a product of two smaller natural numbers.
> 4 is not a prime number (so it's called a composite number) because it can be represented as 2 \\* 2. 5 is a prime number as it can only be represented by 5 \\* 1 or 1 \\* 5.`,
    functionSignatures: [`pub fn prev_prime(nbr: u64) -> u64  {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn prev_prime(nbr: u64) -> u64  {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_120_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The previous prime number before 34 is: {}", prev_prime(34));
}`,
      expectedOutput: `The previous prime number before 34 is: 31`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 121,
    slug: 'prime_checker',
    title: 'Prime Checker',
    checkpoint: 'zone01_final',
    difficulty: 'medium',
    order: 3,
    concept: `Create a **function** \`prime_checker\` that takes an \`usize\` and check if it is a prime number.

The result will be \`None\` if the argument is less than or equal to one, otherwise it will return a \`Result\`.
If the \`usize\` is prime, the function will return an \`Ok(usize)\`. For any other case it will return an \`Err(PrimeErr)\`.
The \`enum\` \`PrimeErr\` will be \`Even\` if the number is a multiple of two, or \`Divider(usize)\` where the \`usize\` is the smallest divider of the number.

> Your solution should be optimized to a certain degree.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** \`prime_checker\` that takes an \`usize\` and check if it is a prime number.

The result will be \`None\` if the argument is less than or equal to one, otherwise it will return a \`Result\`.
If the \`usize\` is prime, the function will return an \`Ok(usize)\`. For any other case it will return an \`Err(PrimeErr)\`.
The \`enum\` \`PrimeErr\` will be \`Even\` if the number is a multiple of two, or \`Divider(usize)\` where the \`usize\` is the smallest divider of the number.

> Your solution should be optimized to a certain degree.`,
    functionSignatures: [`#[derive(PartialEq, Eq, Debug)]
pub enum PrimeErr {
    Even,
    Divider(usize),
}

pub fn prime_checker(nb: usize) ->  /* Implement return type here */ {
    todo!()
}`],
    constraints: [],
    starterCode: `#[derive(PartialEq, Eq, Debug)]
pub enum PrimeErr {
    Even,
    Divider(usize),
}

pub fn prime_checker(nb: usize) ->  /* Implement return type here */ {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_121_1',
      description: 'Usage example',
      code: `fn main() {
    println!("Is {} prime? {:?}", 2, prime_checker(2));
    println!("Is {} prime? {:?}", 14, prime_checker(14));
    println!("Is {} prime? {:?}", 2147483647, prime_checker(2147483647));
}`,
      expectedOutput: `Is 2 prime? Some(Ok(2))
Is 14 prime? Some(Err(Even))
Is 2147483647 prime? Some(Ok(2147483647))`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 122,
    slug: 'profanity_filter',
    title: 'Profanity Filter',
    checkpoint: 'zone01_final',
    difficulty: 'medium',
    order: 3,
    concept: `Generally it is more desirable to catch the failure of some parts of a program instead of panicking.

For this exercise you will have to create a message blocker.

You will need to create a **function** named \`check_ms\` which accepts a string and returns a \`Result\`. It should return an error with the message \`"ERROR: illegal"\` if the message is either empty or contains the word \`stupid\`. Otherwise, it should return the content of the message.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Generally it is more desirable to catch the failure of some parts of a program instead of panicking.

For this exercise you will have to create a message blocker.

You will need to create a **function** named \`check_ms\` which accepts a string and returns a \`Result\`. It should return an error with the message \`"ERROR: illegal"\` if the message is either empty or contains the word \`stupid\`. Otherwise, it should return the content of the message.`,
    functionSignatures: [`pub fn check_ms(message: &str) -> Result<&str, &str> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn check_ms(message: &str) -> Result<&str, &str> {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_122_1',
      description: 'Usage example',
      code: `fn main() {
    ["hello there", "", "you are stupid", "stupid"]
        .into_iter()
        .for_each(|m| println!("{:?}", check_ms(m)));
}`,
      expectedOutput: `Ok("hello there")
Err("ERROR: illegal")
Err("ERROR: illegal")
Err("ERROR: illegal")`,
      hidden: false,
    }],
    hints: [`Result Definition — https://doc.rust-lang.org/stable/book/ch09-02-recoverable-errors-with-result.html?highlight=result#recoverable-errors-with-result`],
  },
  {
    id: 123,
    slug: 'scytale_decoder',
    title: 'Scytale Decoder',
    checkpoint: 'zone01_final',
    difficulty: 'medium',
    order: 3,
    concept: `Create a **function** which **decodes** a scytale cipher (also known as spartan cipher).

Your function will receive a \`String\` representing the ciphered message, and a \`usize\` representing the number of letters per turn of the strip around the cylinder.

> If the ciphered message is empty or the letters per turn are 0 the function will return \`None\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which **decodes** a scytale cipher (also known as spartan cipher).

Your function will receive a \`String\` representing the ciphered message, and a \`usize\` representing the number of letters per turn of the strip around the cylinder.

> If the ciphered message is empty or the letters per turn are 0 the function will return \`None\`.`,
    functionSignatures: [`pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn scytale_decoder(s: String, letters_per_turn: usize) -> Option<String> {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 124,
    slug: 'insertion_sort',
    title: 'Insertion Sort',
    checkpoint: 'zone01_final',
    difficulty: 'hard',
    order: 4,
    concept: `Implement the insertion-sort algorithm by creating a function named \`insertion_sort\`. It should execute the iterations of the algorithm **up to** the number indicated by \`steps\`. See the **Usage** for more information.

The insertion-sort algorithm sorts an array of size \`n\` in ascending order.

1. Iterates over the slice from \`slice[1]\` to \`slice[n]\`.

2. Compares the current element (\`slice[key]\`) to its predecessor (\`slice[key-1]\`).

3. If \`slice[key]\` is smaller than \`slice[key-1]\`, then \`slice[key]\` is compared to \`slice[key-2]\` and so on.

4. All of the elements with values greater than \`slice[key]\` are shifted right to fit \`slice[key]\` into its new position.

A step-by-step example of insertion-sort:

![image.png](Insertion-Sort-demo.png)

**Figure 1** - Step-by-step execution of the algorithm insertion sort`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Implement the insertion-sort algorithm by creating a function named \`insertion_sort\`. It should execute the iterations of the algorithm **up to** the number indicated by \`steps\`. See the **Usage** for more information.

The insertion-sort algorithm sorts an array of size \`n\` in ascending order.

1. Iterates over the slice from \`slice[1]\` to \`slice[n]\`.

2. Compares the current element (\`slice[key]\`) to its predecessor (\`slice[key-1]\`).

3. If \`slice[key]\` is smaller than \`slice[key-1]\`, then \`slice[key]\` is compared to \`slice[key-2]\` and so on.

4. All of the elements with values greater than \`slice[key]\` are shifted right to fit \`slice[key]\` into its new position.

A step-by-step example of insertion-sort:

![image.png](Insertion-Sort-demo.png)

**Figure 1** - Step-by-step execution of the algorithm insertion sort`,
    functionSignatures: [`pub fn insertion_sort(slice: &mut [i32], steps: usize) {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn insertion_sort(slice: &mut [i32], steps: usize) {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_124_1',
      description: 'Usage example',
      code: `fn main() {
    let mut target = [5, 3, 7, 2, 1, 6, 8, 4];
    // executes the first iteration of the algorithm
    insertion_sort(&mut target, 1);
    println!("{:?}", target);

    let mut target = [5, 3, 7, 2, 1, 6, 8, 4];
    // executes len - 1 iterations of the algorithm (sorts the slice)
    let len = target.len() - 1;
    insertion_sort(&mut target, len);
    println!("{:?}", target);
}`,
      expectedOutput: `[3, 5, 7, 2, 1, 6, 8, 4]
[1, 2, 3, 4, 5, 6, 7, 8]`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 125,
    slug: 'matrix_determinant',
    title: 'Matrix Determinant',
    checkpoint: 'zone01_final',
    difficulty: 'hard',
    order: 4,
    concept: `Create a **function** which receives a 3x3 matrix (\`[[isize; 3]; 3]\`) and returns its determinant \`isize\`.

This is how you calculate a 2x2 matrix determinant:

\`\`\`sh
|a b|
|c d|

a*d - b*c
\`\`\`

To calculate a 3x3 matrix determinant you have to take 'a' and multiply it by the determinant of the matrix you get if you get rid of the 'a' column and the 'a' row. Then you subtract the multiplication of 'b' and the determinant of the matrix you get if you get rid of the 'b' column and row. And finally, you do the same process for 'c' and add it to the previous result.

\`\`\`sh
|a b c|
|d e f|
|g h i|
\`\`\`

![imagem](determinant-of-a-3x3-matrix-formula-3.png)`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which receives a 3x3 matrix (\`[[isize; 3]; 3]\`) and returns its determinant \`isize\`.

This is how you calculate a 2x2 matrix determinant:

\`\`\`sh
|a b|
|c d|

a*d - b*c
\`\`\`

To calculate a 3x3 matrix determinant you have to take 'a' and multiply it by the determinant of the matrix you get if you get rid of the 'a' column and the 'a' row. Then you subtract the multiplication of 'b' and the determinant of the matrix you get if you get rid of the 'b' column and row. And finally, you do the same process for 'c' and add it to the previous result.

\`\`\`sh
|a b c|
|d e f|
|g h i|
\`\`\`

![imagem](determinant-of-a-3x3-matrix-formula-3.png)`,
    functionSignatures: [`pub fn matrix_determinant(matrix: [[isize; 3]; 3]) -> isize {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn matrix_determinant(matrix: [[isize; 3]; 3]) -> isize {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 126,
    slug: 'order_books',
    title: 'Order Books',
    checkpoint: 'zone01_final',
    difficulty: 'hard',
    order: 4,
    concept: `Build a module named \`library\` which contains two sub-modules:

- \`writers\`: which contains:
  - \`Writer\`: a structure with:
    - \`first_name\`: \`String\`
    - \`last_name\`: \`String\`
    - \`books\`: \`Vec<Book>\`
- \`books\`: which contains:
  - \`Book\`: a structure with:
    - \`title\`: \`String\`
    - \`year\`: \`u32\` as its year of publication

A function \`order_books\` should be created outside of the previous modules which receives a \`Writer\`, and orders the set of books alphabetically (case insensitive!).`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Build a module named \`library\` which contains two sub-modules:

- \`writers\`: which contains:
  - \`Writer\`: a structure with:
    - \`first_name\`: \`String\`
    - \`last_name\`: \`String\`
    - \`books\`: \`Vec<Book>\`
- \`books\`: which contains:
  - \`Book\`: a structure with:
    - \`title\`: \`String\`
    - \`year\`: \`u32\` as its year of publication

A function \`order_books\` should be created outside of the previous modules which receives a \`Writer\`, and orders the set of books alphabetically (case insensitive!).`,
    functionSignatures: [`pub fn order_books() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn order_books() {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 127,
    slug: 'rot21',
    title: 'Rot21',
    checkpoint: 'zone01_final',
    difficulty: 'hard',
    order: 4,
    concept: `The purpose of this exercise is to create a \`rot21\` function that works like the ROT13 cipher.

This function will receive a \`string\` and will rotate each letter of that \`string\` 21 times to the right.

The function should only rotate **ASCII letters**. Everything should remain the unchanged.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `The purpose of this exercise is to create a \`rot21\` function that works like the ROT13 cipher.

This function will receive a \`string\` and will rotate each letter of that \`string\` 21 times to the right.

The function should only rotate **ASCII letters**. Everything should remain the unchanged.`,
    functionSignatures: [`pub fn rot21(input: &str) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn rot21(input: &str) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_127_1',
      description: 'Usage example',
      code: `fn main() {
    println!("The letter \\"a\\" becomes: {}", rot21("a"));
    println!("The letter \\"m\\" becomes: {}", rot21("m"));
    println!("The word \\"MISS\\" becomes: {}", rot21("MISS"));
    println!("Your cypher will be: {}", rot21("Testing numbers 1 2 3"));
    println!("Your cypher will be: {}", rot21("rot21 works!"));
}`,
      expectedOutput: `The letter "a" becomes: v
The letter "m" becomes: h
The word "MISS" becomes: HDNN
Your cypher will be: Oznodib iphwzmn 1 2 3
Your cypher will be: mjo21 rjmfn!`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 128,
    slug: 'rpn',
    title: 'Rpn',
    checkpoint: 'zone01_final',
    difficulty: 'hard',
    order: 4,
    concept: `Write a **program** which takes a \`&str\` containing an equation written in \`Reverse Polish Notation\` (RPN). It should evaluate the expression, and print the result on the standard output followed by a newline.

- If the expression is not valid, or if there is not exactly one argument, \`Error\` must be printed on the standard output followed by a newline.

> Extra spaces on the expression should be ignored.

\`Reverse Polish Notation\` is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.

The following operators must be implemented : \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (modulo).

All the given operands must fit in a \`i64\`.

Examples of formulas converted in RPN:

3 + 4 >> 3 4 +

((1 \\* 2) \\* 3) - 4 >> 1 2 \\* 3 \\* 4 - or 3 1 2 \\* \\* 4 -

50 \\* (5 - (10 / 9)) >> 5 10 9 / - 50 \\*

Here is how to evaluate a formula in RPN:

\`\`\`console
1 2 * 3 * 4 -
2 3 * 4 -
6 4 -
2
\`\`\`

Or:

\`\`\`console
3 1 2 * * 4 -
3 2 * 4 -
6 4 -
2
\`\`\`

> Use \`std::env::args()\` to get the program's arguments.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Write a **program** which takes a \`&str\` containing an equation written in \`Reverse Polish Notation\` (RPN). It should evaluate the expression, and print the result on the standard output followed by a newline.

- If the expression is not valid, or if there is not exactly one argument, \`Error\` must be printed on the standard output followed by a newline.

> Extra spaces on the expression should be ignored.

\`Reverse Polish Notation\` is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.

The following operators must be implemented : \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (modulo).

All the given operands must fit in a \`i64\`.

Examples of formulas converted in RPN:

3 + 4 >> 3 4 +

((1 \\* 2) \\* 3) - 4 >> 1 2 \\* 3 \\* 4 - or 3 1 2 \\* \\* 4 -

50 \\* (5 - (10 / 9)) >> 5 10 9 / - 50 \\*

Here is how to evaluate a formula in RPN:

\`\`\`console
1 2 * 3 * 4 -
2 3 * 4 -
6 4 -
2
\`\`\`

Or:

\`\`\`console
3 1 2 * * 4 -
3 2 * 4 -
6 4 -
2
\`\`\`

> Use \`std::env::args()\` to get the program's arguments.`,
    functionSignatures: [`pub fn rpn() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn rpn() {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 129,
    slug: 'blood_types_s',
    title: 'Blood Types S',
    checkpoint: 'zone01_final',
    difficulty: 'hard',
    order: 5,
    concept: `Use the following table to define the methods asked:

| Blood Types | Donate Blood to  | Receive Blood From |
| ----------- | ---------------- | ------------------ |
| A+          | A+, AB+          | A+, A-, O+, O-     |
| O+          | O+, A+, B+, AB+  | O+, O-             |
| B+          | B+, AB+          | B+, B-, O+, O-     |
| AB+         | AB+              | Everyone           |
| A-          | A+, A-, AB+, AB- | A-, O-             |
| O-          | Everyone         | O-                 |
| B-          | B+, B-, AB+, AB- | B-, O-             |
| AB-         | AB+, AB-         | AB-, A-, B-, O-    |

Implement three methods for \`BloodType\`:

- \`can_receive_from\`: returns \`true\` if \`self\` **can** receive blood from \`other\` blood type.
- \`donors\`: which returns all the blood types that can give blood to \`self\`.
- \`recipients\`: which returns all the blood types that can receive blood from \`self\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Use the following table to define the methods asked:

| Blood Types | Donate Blood to  | Receive Blood From |
| ----------- | ---------------- | ------------------ |
| A+          | A+, AB+          | A+, A-, O+, O-     |
| O+          | O+, A+, B+, AB+  | O+, O-             |
| B+          | B+, AB+          | B+, B-, O+, O-     |
| AB+         | AB+              | Everyone           |
| A-          | A+, A-, AB+, AB- | A-, O-             |
| O-          | Everyone         | O-                 |
| B-          | B+, B-, AB+, AB- | B-, O-             |
| AB-         | AB+, AB-         | AB-, A-, B-, O-    |

Implement three methods for \`BloodType\`:

- \`can_receive_from\`: returns \`true\` if \`self\` **can** receive blood from \`other\` blood type.
- \`donors\`: which returns all the blood types that can give blood to \`self\`.
- \`recipients\`: which returns all the blood types that can receive blood from \`self\`.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum Antigen {
    A,
    AB,
    B,
    O,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum RhFactor {
    Positive,
    Negative,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub struct BloodType {
    pub antigen: Antigen,
    pub rh_factor: RhFactor,
}

impl BloodType {
    pub fn can_receive_from(self, other: Self) -> bool {
        todo!()
    }

    pub fn donors(self) -> Vec<Self> {
        todo!()
    }

    pub fn recipients(self) -> Vec<Self> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum Antigen {
    A,
    AB,
    B,
    O,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub enum RhFactor {
    Positive,
    Negative,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Copy)]
pub struct BloodType {
    pub antigen: Antigen,
    pub rh_factor: RhFactor,
}

impl BloodType {
    pub fn can_receive_from(self, other: Self) -> bool {
        todo!()
    }

    pub fn donors(self) -> Vec<Self> {
        todo!()
    }

    pub fn recipients(self) -> Vec<Self> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_129_1',
      description: 'Usage example',
      code: `fn main() {
    let blood_type = BloodType {
        antigen: Antigen::O,
        rh_factor: RhFactor::Positive,
    };

    println!("recipients of O+ {:?}", blood_type.recipients());
    println!("donors of O+ {:?}", blood_type.donors());

    let another_blood_type = BloodType {
        antigen: Antigen::O,
        rh_factor: RhFactor::Positive,
    };

    println!(
        "donors of O+ can receive from {:?} {}",
        another_blood_type,
        blood_type.can_receive_from(another_blood_type)
    );
}`,
      expectedOutput: `recipients of O+ [BloodType { rh_factor: Positive, antigen: A }, BloodType { rh_factor: Positive, antigen: AB }, BloodType { rh_factor: Positive, antigen: B }, BloodType { rh_factor: Positive, antigen: O }]
donors of O+ [BloodType { rh_factor: Positive, antigen: O }, BloodType { rh_factor: Negative, antigen: O }]
donors of O+ can receive from BloodType { rh_factor: Positive, antigen: O } true`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 130,
    slug: 'office_worker',
    title: 'Office Worker',
    checkpoint: 'zone01_final',
    difficulty: 'hard',
    order: 5,
    concept: `Create a structure \`OfficeWorker\` with the following public fields:

- \`name\` as \`String\`.
- \`age\` as \`u32\`.
- \`role\` as \`WorkerRole\`.

Create an enum \`WorkerRole\` which can be \`Admin\`, \`User\` or \`Guest\`.

Implement the trait \`From<&str>\` for both \`OfficeWorker\` and \`WorkerRole\`.
For \`OfficeWorker\` the string will have the format \`{name},{age},{role}\`.
For \`WorkerRole\` the format of the string will be \`{role}\` in lowercase.

> Invalid inputs won't be tested.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a structure \`OfficeWorker\` with the following public fields:

- \`name\` as \`String\`.
- \`age\` as \`u32\`.
- \`role\` as \`WorkerRole\`.

Create an enum \`WorkerRole\` which can be \`Admin\`, \`User\` or \`Guest\`.

Implement the trait \`From<&str>\` for both \`OfficeWorker\` and \`WorkerRole\`.
For \`OfficeWorker\` the string will have the format \`{name},{age},{role}\`.
For \`WorkerRole\` the format of the string will be \`{role}\` in lowercase.

> Invalid inputs won't be tested.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq)]
pub struct OfficeWorker {
}

#[derive(Debug, PartialEq, Eq)]
pub enum WorkerRole {
}

impl From<&str> for OfficeWorker {
    fn from(s: &str) -> Self {
        todo!()
    }
}

impl From<&str> for WorkerRole {
    fn from(s: &str) -> Self {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq)]
pub struct OfficeWorker {
}

#[derive(Debug, PartialEq, Eq)]
pub enum WorkerRole {
}

impl From<&str> for OfficeWorker {
    fn from(s: &str) -> Self {
        todo!()
    }
}

impl From<&str> for WorkerRole {
    fn from(s: &str) -> Self {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_130_1',
      description: 'Usage example',
      code: `fn main() {
    println!("New worker: {:?}", OfficeWorker::from("Manuel,23,admin"));
    println!(
        "New worker: {:?}",
        OfficeWorker::from("Jean Jacques,44,guest")
    );
}`,
      expectedOutput: `New worker: OfficeWorker { name: "Manuel", age: 23, role: Admin }
New worker: OfficeWorker { name: "Jean Jacques", age: 44, role: Guest }`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 131,
    slug: 'matrix_display',
    title: 'Matrix Display',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 6,
    concept: `Complete the \`Matrix\` struct below.

You will need to create the \`new\` associated function which initializes the struct.

You will also need to implement the \`std::fmt::Display\` trait, so that it prints like the example in the usage.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Complete the \`Matrix\` struct below.

You will need to create the \`new\` associated function which initializes the struct.

You will also need to implement the \`std::fmt::Display\` trait, so that it prints like the example in the usage.`,
    functionSignatures: [`use std::fmt;

#[derive(Debug, Clone)]
pub struct Matrix(pub Vec<Vec<i32>>);

impl Matrix {
    pub fn new(slice: &[&[i32]]) -> Self {
        todo!()
    }
}

impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `use std::fmt;

#[derive(Debug, Clone)]
pub struct Matrix(pub Vec<Vec<i32>>);

impl Matrix {
    pub fn new(slice: &[&[i32]]) -> Self {
        todo!()
    }
}

impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_131_1',
      description: 'Usage example',
      code: `fn main() {
    let matrix = Matrix::new(&[&[1, 2, 3], &[4, 5, 6], &[7, 8, 9]]);
    println!("{}", matrix);
}`,
      expectedOutput: `(1 2 3)
(4 5 6)
(7 8 9)`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 132,
    slug: 'queens',
    title: 'Queens',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 6,
    concept: `In a chess game, a queen can attack pieces which are on the same rank (row), file (column), or diagonal.

The purpose of this exercise is to find out if two queens can attack each other.

The position of a chess piece on a chessboard will be represented by the struct \`ChessPosition\`. You must implement the associated function \`new\` which will return the position if it is valid, otherwise it will return \`None\`.

> Remember, chessboards have 8 files and 8 ranks (0 to 7).

You will create the \`Queen\` struct with the associate function \`can_attack\`, which will return \`true\` if the queens can attack each other or not. You also need to implement the function \`new\` which creates a new \`Queen\` with a \`ChessPosition\`.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `In a chess game, a queen can attack pieces which are on the same rank (row), file (column), or diagonal.

The purpose of this exercise is to find out if two queens can attack each other.

The position of a chess piece on a chessboard will be represented by the struct \`ChessPosition\`. You must implement the associated function \`new\` which will return the position if it is valid, otherwise it will return \`None\`.

> Remember, chessboards have 8 files and 8 ranks (0 to 7).

You will create the \`Queen\` struct with the associate function \`can_attack\`, which will return \`true\` if the queens can attack each other or not. You also need to implement the function \`new\` which creates a new \`Queen\` with a \`ChessPosition\`.`,
    functionSignatures: [`#[derive(Debug, Clone, Copy)]
pub struct ChessPosition {
    pub rank: usize,
    pub file: usize,
}

impl ChessPosition {
    pub fn new(rank: usize, file: usize) -> Option<Self> {
        todo!()
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Queen {
    pub position: ChessPosition,
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        todo!()
    }

    pub fn can_attack(self, other: Self) -> bool {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Debug, Clone, Copy)]
pub struct ChessPosition {
    pub rank: usize,
    pub file: usize,
}

impl ChessPosition {
    pub fn new(rank: usize, file: usize) -> Option<Self> {
        todo!()
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Queen {
    pub position: ChessPosition,
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        todo!()
    }

    pub fn can_attack(self, other: Self) -> bool {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_132_1',
      description: 'Usage example',
      code: `fn main() {
    let white_queen = Queen::new(ChessPosition::new(2, 2).unwrap());
    let black_queen = Queen::new(ChessPosition::new(0, 4).unwrap());

    println!(
        "Is it possible for the queens to attack each other? {}",
        white_queen.can_attack(black_queen)
    );

    let white_queen = Queen::new(ChessPosition::new(1, 2).unwrap());
    let black_queen = Queen::new(ChessPosition::new(0, 4).unwrap());

    println!(
        "Is it possible for the queens to attack each other? {}",
        white_queen.can_attack(black_queen)
    );
}`,
      expectedOutput: `Is it possible for the queens to attack each other? true
Is it possible for the queens to attack each other? false`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 133,
    slug: 'display_table',
    title: 'Display Table',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 7,
    concept: `Define the \`Table\` struct below, and implement the associated functions \`new\` and \`add_row\`. You can see how they should work from the usage.

Implement the \`std::fmt::Display\` trait for the \`Table\` structure so that the table is printed like in the usage. The length of each column must adjust to the longest element of the column, and the element must be centered in the "cell" when possible. If the element cannot be exactly centered, it must be offset one byte to the left of the center, as can be seen in the example output.

If the table is empty \`println!\` must not print anything.

> Our tests will always assume that, when calling \`add_row\`, the row has the same correct size as the headers.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Define the \`Table\` struct below, and implement the associated functions \`new\` and \`add_row\`. You can see how they should work from the usage.

Implement the \`std::fmt::Display\` trait for the \`Table\` structure so that the table is printed like in the usage. The length of each column must adjust to the longest element of the column, and the element must be centered in the "cell" when possible. If the element cannot be exactly centered, it must be offset one byte to the left of the center, as can be seen in the example output.

If the table is empty \`println!\` must not print anything.

> Our tests will always assume that, when calling \`add_row\`, the row has the same correct size as the headers.`,
    functionSignatures: [`#[derive(Clone, Debug, PartialEq)]
pub struct Table {
    pub headers: Vec<String>,
    pub body: Vec<Vec<String>>,
}

impl fmt::Display for Table {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        todo!()
    }
}

impl Table {
    pub fn new() -> Table {
        todo!()
    }

    pub fn add_row(&mut self, row: &[String]) {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Clone, Debug, PartialEq)]
pub struct Table {
    pub headers: Vec<String>,
    pub body: Vec<Vec<String>>,
}

impl fmt::Display for Table {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        todo!()
    }
}

impl Table {
    pub fn new() -> Table {
        todo!()
    }

    pub fn add_row(&mut self, row: &[String]) {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_133_1',
      description: 'Usage example',
      code: `fn main() {
    let mut table = Table::new();
    println!("{}", table);
    table.headers = vec![
        String::from("Model"),
        String::from("Piece N°"),
        String::from("In Stock"),
        String::from("Description"),
    ];
    table.add_row(&[
        String::from("model 1"),
        String::from("43-EWQE304"),
        String::from("30"),
        String::from("Piece for x"),
    ]);
    table.add_row(&[
        String::from("model 2"),
        String::from("98-QCVX5433"),
        String::from("100000000"),
        String::from("-"),
    ]);
    table.add_row(&[
        String::from("model y"),
        String::from("78-NMNH"),
        String::from("60"),
        String::from("nothing"),
    ]);
    println!("{}", table);
}`,
      expectedOutput: `|  Model  |  Piece N°   | In Stock  | Description |
|---------+-------------+-----------+-------------|
| model 1 | 43-EWQE304  |    30     | Piece for x |
| model 2 | 98-QCVX5433 | 100000000 |      -      |
| model y |   78-NMNH   |    60     |   nothing   |`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 134,
    slug: 'drop_the_blog',
    title: 'Drop The Blog',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 7,
    concept: `Define the following structures:

- \`Blog\`: containing:
  - \`drops\` that will save the number of dropped articles.
  - \`states\` that will save the state of multiple articles. If the article is not dropped, the state will be \`false\`, otherwise it will be \`true\`.

- \`Article\`: containing:
  - \`id\` as \`usize\`.
  - \`body\` as \`String\`.
  - \`parent\` as a link to the structure \`Blog\`. (Tip: this should be a reference).

You'll need to also add the following associated functions to the structures:

- \`Blog\`:
  - \`new\` that creates an empty blog.
  - \`new_article\` that receives a \`String\` for the body and returns a tuple with the \`id\` and a new \`Article\`.
  - \`is_dropped\` that receives an \`id\` and returns a \`bool\` that indicates the state of the article.
  - \`new_id\` which returns a \`usize\` representing the length of the \`states\` vector. (Which is also the first available id).
  - \`add_drop\` which is **called by the \`Drop\` trait**. It will receive an \`id\` that will be used to change the state of the article. If the state of that article is \`true\` then it will panic with the message \`"X is already dropped"\`, where \`X\` represents the \`id\`). Otherwise it should change the state to \`true\` and increment the \`drops\` field by 1.

- \`Article\`:
  - \`new\` that initializes a new article.
  - \`discard\` that drops the article.

> You must implement \`Drop\` for \`Article\`. In this trait you must call the function \`add_drop\` so that the state of the article changes.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Define the following structures:

- \`Blog\`: containing:
  - \`drops\` that will save the number of dropped articles.
  - \`states\` that will save the state of multiple articles. If the article is not dropped, the state will be \`false\`, otherwise it will be \`true\`.

- \`Article\`: containing:
  - \`id\` as \`usize\`.
  - \`body\` as \`String\`.
  - \`parent\` as a link to the structure \`Blog\`. (Tip: this should be a reference).

You'll need to also add the following associated functions to the structures:

- \`Blog\`:
  - \`new\` that creates an empty blog.
  - \`new_article\` that receives a \`String\` for the body and returns a tuple with the \`id\` and a new \`Article\`.
  - \`is_dropped\` that receives an \`id\` and returns a \`bool\` that indicates the state of the article.
  - \`new_id\` which returns a \`usize\` representing the length of the \`states\` vector. (Which is also the first available id).
  - \`add_drop\` which is **called by the \`Drop\` trait**. It will receive an \`id\` that will be used to change the state of the article. If the state of that article is \`true\` then it will panic with the message \`"X is already dropped"\`, where \`X\` represents the \`id\`). Otherwise it should change the state to \`true\` and increment the \`drops\` field by 1.

- \`Article\`:
  - \`new\` that initializes a new article.
  - \`discard\` that drops the article.

> You must implement \`Drop\` for \`Article\`. In this trait you must call the function \`add_drop\` so that the state of the article changes.`,
    functionSignatures: [`use std::cell::{RefCell, Cell};

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Blog {
    pub drops: Cell<usize>,
    pub states: RefCell<Vec<bool>>
}

impl Blog {
    pub fn new() -> Self {
        todo!()
    }

    pub fn new_article(&self, body: String) -> (usize, Article<'_>) {
        todo!()
    }

    pub fn new_id(&self) -> usize {
        todo!()
    }

    pub fn is_dropped(&self, id: usize) -> bool {
        todo!()
    }

    pub fn add_drop(&self, id: usize) {
        todo!()
    }
}

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Article<'a> {

}

impl<'a> Article<'a> {
    pub fn new(id: usize, body: String, parent: &'a Blog) -> Self {
        todo!()
    }

    pub fn discard(self) {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `use std::cell::{RefCell, Cell};

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Blog {
    pub drops: Cell<usize>,
    pub states: RefCell<Vec<bool>>
}

impl Blog {
    pub fn new() -> Self {
        todo!()
    }

    pub fn new_article(&self, body: String) -> (usize, Article<'_>) {
        todo!()
    }

    pub fn new_id(&self) -> usize {
        todo!()
    }

    pub fn is_dropped(&self, id: usize) -> bool {
        todo!()
    }

    pub fn add_drop(&self, id: usize) {
        todo!()
    }
}

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Article<'a> {

}

impl<'a> Article<'a> {
    pub fn new(id: usize, body: String, parent: &'a Blog) -> Self {
        todo!()
    }

    pub fn discard(self) {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_134_1',
      description: 'Usage example',
      code: `fn main() {
    let blog = Blog::new();
    let (id, article) = blog.new_article(String::from("Winter is coming"));
    let (id1, article1) = blog.new_article(String::from("The story of the universe"));

    article.discard();

    println!("{:?}", (blog.is_dropped(id), id, &blog.drops));

    article1.discard();
    println!("{:?}", (blog.is_dropped(id1), id1, &blog.drops));

    let (id2, article2) = blog.new_article(String::from("How to cook 101"));
    let article2 = Rc::new(article2);
    let article2_clone = article2.clone();

    drop(article2_clone);

    println!(
        "{:?}",
        (
            blog.is_dropped(id2),
            id2,
            &blog.drops,
            Rc::strong_count(&article2)
        )
    );
}`,
      expectedOutput: `(true, 0, Cell { value: 1 })
(true, 1, Cell { value: 2 })
(false, 2, Cell { value: 2 }, 1)`,
      hidden: false,
    }],
    hints: [`Trait std::ops::Drop — https://doc.bccnsoft.com/docs/rust-1.36.0-docs-html/std/ops/trait.Drop.html`, `Struct std::cell::RefCell — https://doc.rust-lang.org/std/cell/struct.RefCell.html`, `Interior Mutability — https://doc.rust-lang.org/book/ch15-05-interior-mutability.html`],
  },
  {
    id: 135,
    slug: 'filter_table',
    title: 'Filter Table',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 7,
    concept: `- Define the associated functions for the \`Table\` struct:
  - \`new\`: which creates a new empty table.
  - \`add_rows\`: which adds a new row to the table from a slice of strings.
  - \`filter_cols\`: which receives a closure and returns a table with all the columns that yielded true when applying that closure. The closure will receive a \`&str\` and return a \`bool\` value. \`T\` is a placeholder for the type of the closure. Change it to the correct type.
  - \`filter_rows\`: which receives a closure and returns a table with all the rows that yielded true when applied to the elements of the selected column. The closure will receive a \`&str\` and return a \`bool\` value. \`T\` is a placeholder for the type of the closure. Change it to the correct type.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `- Define the associated functions for the \`Table\` struct:
  - \`new\`: which creates a new empty table.
  - \`add_rows\`: which adds a new row to the table from a slice of strings.
  - \`filter_cols\`: which receives a closure and returns a table with all the columns that yielded true when applying that closure. The closure will receive a \`&str\` and return a \`bool\` value. \`T\` is a placeholder for the type of the closure. Change it to the correct type.
  - \`filter_rows\`: which receives a closure and returns a table with all the rows that yielded true when applied to the elements of the selected column. The closure will receive a \`&str\` and return a \`bool\` value. \`T\` is a placeholder for the type of the closure. Change it to the correct type.`,
    functionSignatures: [`#[derive(Clone, Debug, PartialEq)]
pub struct Table {
    pub headers: Vec<String>,
    pub body: Vec<Vec<String>>,
}

impl Table {
    pub fn new() -> Table {
        todo!()
    }

    pub fn add_row(&mut self, row: &[String]) {
        todo!()
    }

    pub fn filter_col(&self, filter: T) -> Option<Self> {
        todo!()
    }

    pub fn filter_row(&self, col_name: &str, filter: T) -> Option<Self> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `#[derive(Clone, Debug, PartialEq)]
pub struct Table {
    pub headers: Vec<String>,
    pub body: Vec<Vec<String>>,
}

impl Table {
    pub fn new() -> Table {
        todo!()
    }

    pub fn add_row(&mut self, row: &[String]) {
        todo!()
    }

    pub fn filter_col(&self, filter: T) -> Option<Self> {
        todo!()
    }

    pub fn filter_row(&self, col_name: &str, filter: T) -> Option<Self> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_135_1',
      description: 'Usage example',
      code: `fn main() {
    let mut table = Table::new();
    table.headers = vec![
        "Name".to_string(),
        "Last Name".to_string(),
        "ID Number".to_string(),
    ];
    table.add_row(&[
        "Adam".to_string(),
        "Philips".to_string(),
        "123456789".to_string(),
    ]);
    table.add_row(&[
        "Adamaris".to_string(),
        "Shelby".to_string(),
        "1111123456789".to_string(),
    ]);
    table.add_row(&[
        "Ackerley".to_string(),
        "Philips".to_string(),
        "123456789".to_string(),
    ]);

    println!("{:?}", table.filter_col(|col| col == "Name"));
    println!(
        "{:?}",
        table.filter_row("Last Name", |lastname| lastname == "Philips")
    );
}`,
      expectedOutput: `Some(Table { headers: ["Name"], body: [["Adam"], ["Adamaris"], ["Ackerley"]] })
Some(Table { headers: ["Name", "Last Name", "ID Number"], body: [["Adam", "Philips", "123456789"], ["Ackerley", "Philips", "123456789"]] })`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 136,
    slug: 'flat_tree',
    title: 'Flat Tree',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 8,
    concept: `Create the \`flatten_tree\` **function** which receives a \`std::collections::BTreeSet\` and returns a new \`Vec\` with the elements of the binary tree in order.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create the \`flatten_tree\` **function** which receives a \`std::collections::BTreeSet\` and returns a new \`Vec\` with the elements of the binary tree in order.`,
    functionSignatures: [`pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T> {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T> {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_136_1',
      description: 'Usage example',
      code: `fn main() {
    let tree = BTreeSet::from([34, 0, 9, 30]);
    println!("{:?}", flatten_tree(&tree));

    let tree = BTreeSet::from(["Slow", "kill", "will", "Horses"]);
    println!("{:?}", flatten_tree(&tree));
}`,
      expectedOutput: `[0, 9, 30, 34]
["Horses", "Slow", "kill", "will"]`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 137,
    slug: 'brackets_matching',
    title: 'Brackets Matching',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 9,
    concept: `Create a **program** that takes an undefined number of command-line arguments. For each argument, if the expression is correctly bracketed, the program prints \`OK\` to the standard output, otherwise it prints \`Error\` followed by a newline.

All characters are ignored except for the following brackets:

- parentheses \`(\` and \`)\`.
- square brackets \`[\` and \`]\`.
- curly braces \`{\` and \`}\`.

Opening brackets must only be closed by the corresponding closing bracket. For example, a curly brace cannot close a square bracket.

A \`String\` which does not contain any brackets is considered to be correctly bracketed.

If there are no arguments, the program must print nothing.

You'll need to get the command line arguments somehow, and this will get you started:

\`\`\`rust
fn main() {
    let args = std::env::args().collect::<Vec<_>>();

    //...
}

\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **program** that takes an undefined number of command-line arguments. For each argument, if the expression is correctly bracketed, the program prints \`OK\` to the standard output, otherwise it prints \`Error\` followed by a newline.

All characters are ignored except for the following brackets:

- parentheses \`(\` and \`)\`.
- square brackets \`[\` and \`]\`.
- curly braces \`{\` and \`}\`.

Opening brackets must only be closed by the corresponding closing bracket. For example, a curly brace cannot close a square bracket.

A \`String\` which does not contain any brackets is considered to be correctly bracketed.

If there are no arguments, the program must print nothing.

You'll need to get the command line arguments somehow, and this will get you started:

\`\`\`rust
fn main() {
    let args = std::env::args().collect::<Vec<_>>();

    //...
}

\`\`\``,
    functionSignatures: [`pub fn brackets_matching() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn brackets_matching() {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  {
    id: 138,
    slug: 'brain_fuck',
    title: 'Brain Fuck',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 9,
    concept: `Write a \`Brainfuck\` interpreter program.
The source code will be given as the first argument.
The code will always be valid.
\`Brainfuck\` is a minimalist language. It consists of an array of bytes (in this exercise as many as 2048 bytes) all initialized with zero, and with a pointer to its first byte.

Every operator consists of a single character :

- '>' increment the pointer
- '<' decrement the pointer
- '+' increment the pointed byte
- '-' decrement the pointed byte
- '.' print the pointed byte on standard output
- '[' go to the matching ']' if the pointed byte is 0 (loop start)
- ']' go to the matching '[' if the pointed byte is not 0 (loop end)

Any other character is a comment.

> Use \`std::env::args()\` to get the program's arguments.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Write a \`Brainfuck\` interpreter program.
The source code will be given as the first argument.
The code will always be valid.
\`Brainfuck\` is a minimalist language. It consists of an array of bytes (in this exercise as many as 2048 bytes) all initialized with zero, and with a pointer to its first byte.

Every operator consists of a single character :

- '>' increment the pointer
- '<' decrement the pointer
- '+' increment the pointed byte
- '-' decrement the pointed byte
- '.' print the pointed byte on standard output
- '[' go to the matching ']' if the pointed byte is 0 (loop start)
- ']' go to the matching '[' if the pointed byte is not 0 (loop end)

Any other character is a comment.

> Use \`std::env::args()\` to get the program's arguments.`,
    functionSignatures: [`pub fn brain_fuck() {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn brain_fuck() {
    todo!()
}`,
    solution: '',
    testCases: [],
    hints: [],
  },
  // ── Exam-1 missing exercises ─────────────────────────────────────────────
  {
    id: 139,
    slug: 'division_and_remainder',
    title: 'Division And Remainder',
    checkpoint: 'zone01_cp1',
    difficulty: 'easiest',
    order: 1,
    concept: `Create a **function** named \`divide\` that receives two \`i32\` and returns a \`tuple\`. The first element is the result of the integer division between the two numbers, and the second is the remainder of the division.

\`\`\`rust
pub fn divide(x: i32, y: i32) -> (i32, i32) {
}
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** named \`divide\` that receives two \`i32\` and returns a \`tuple\`. The first element is the result of the integer division between the two numbers, and the second is the remainder of the division.

\`\`\`rust
pub fn divide(x: i32, y: i32) -> (i32, i32) {
}
\`\`\``,
    functionSignatures: [`pub fn divide(x: i32, y: i32) -> (i32, i32) {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn divide(x: i32, y: i32) -> (i32, i32) {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_139_1',
      description: 'Usage example',
      code: `fn main() {
    let x = 9;
    let y = 4;
    let (division, remainder) = divide(x, y);
    println!(
        "{}/{}: division = {}, remainder = {}",
        x, y, division, remainder
    );
}`,
      expectedOutput: `9/4: division = 2, remainder = 1`,
      hidden: false,
    }],
    hints: [`The Tuple Type — https://doc.rust-lang.org/stable/book/ch03-02-data-types.html`, `Tuples — https://doc.rust-lang.org/rust-by-example/primitives/tuples.html`],
  },
  {
    id: 140,
    slug: 'matrix_transposition',
    title: 'Matrix Transposition',
    checkpoint: 'zone01_cp1',
    difficulty: 'easiest',
    order: 1,
    concept: `- Define a \`struct\` named \`Matrix\` as a tuple of 2 tuples. The nested tuple will contain 2 \`i32\`s.

- Create a **function** named \`transpose\` that calculates the transposition of a 2x2 matrix.

\`\`\`rust
pub fn transpose(m: Matrix) -> Matrix {
}
\`\`\`

The transposition of a matrix switches the columns to rows, and the rows to columns. For example:

\`\`\`
( a b )   __ transposition __>   ( a c )
( c d )                          ( b d )
\`\`\`

\`Matrix\` must implement \`Debug\`, \`PartialEq\` and \`Eq\`. You can use \`derive\`.

> Remember that you are defining a library, so any element that can be called from an external crate must be made public.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `- Define a \`struct\` named \`Matrix\` as a tuple of 2 tuples. The nested tuple will contain 2 \`i32\`s.

- Create a **function** named \`transpose\` that calculates the transposition of a 2x2 matrix.

\`\`\`rust
pub fn transpose(m: Matrix) -> Matrix {
}
\`\`\`

The transposition of a matrix switches the columns to rows, and the rows to columns. For example:

\`\`\`
( a b )   __ transposition __>   ( a c )
( c d )                          ( b d )
\`\`\`

\`Matrix\` must implement \`Debug\`, \`PartialEq\` and \`Eq\`. You can use \`derive\`.`,
    functionSignatures: [`#[derive(Debug, PartialEq, Eq)]
pub struct Matrix(pub (i32, i32), pub (i32, i32));

pub fn transpose(m: Matrix) -> Matrix {
    todo!()
}`],
    constraints: [],
    starterCode: `#[derive(Debug, PartialEq, Eq)]
pub struct Matrix(pub (i32, i32), pub (i32, i32));

pub fn transpose(m: Matrix) -> Matrix {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_140_1',
      description: 'Usage example',
      code: `fn main() {
    let matrix = Matrix((1, 3), (4, 5));
    println!("Original matrix {:?}", matrix);
    println!("Transpose matrix {:?}", transpose(matrix));
}`,
      expectedOutput: `Original matrix Matrix((1, 3), (4, 5))
Transpose matrix Matrix((1, 4), (3, 5))`,
      hidden: false,
    }],
    hints: [`Defining a struct — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`, `Tuple Structs without Named Fields — https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html`, `Adding Useful Functionality with Derived Traits — https://doc.rust-lang.org/stable/book/ch05-02-example-structs.html`],
  },
  {
    id: 141,
    slug: 'bigger',
    title: 'Bigger',
    checkpoint: 'zone01_cp1',
    difficulty: 'easy',
    order: 2,
    concept: `Create a function named \`bigger\` that gets the biggest positive number in the \`HashMap\`.

\`\`\`rust
pub fn bigger(h: HashMap<&str, i32>) -> i32 {
}
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a function named \`bigger\` that gets the biggest positive number in the \`HashMap\`.

\`\`\`rust
pub fn bigger(h: HashMap<&str, i32>) -> i32 {
}
\`\`\``,
    functionSignatures: [`pub fn bigger(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`],
    constraints: [],
    starterCode: `use std::collections::HashMap;

pub fn bigger(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_141_1',
      description: 'Usage example',
      code: `fn main() {
    let mut hash = HashMap::new();
    hash.insert("Daniel", 122);
    hash.insert("Ashley", 333);
    hash.insert("Katie", 334);
    hash.insert("Robert", 14);

    println!("The biggest of the elements in the HashMap is {}", bigger(hash));
}`,
      expectedOutput: `The biggest of the elements in the HashMap is 334`,
      hidden: false,
    }],
    hints: [`hash maps — https://doc.rust-lang.org/book/ch08-03-hash-maps.html`],
  },
  {
    id: 142,
    slug: 'capitalizing',
    title: 'Capitalizing',
    checkpoint: 'zone01_cp1',
    difficulty: 'easy',
    order: 2,
    concept: `Complete the \`capitalize_first\` **function** which converts the first letter of the string to uppercase.

Complete the \`title_case\` **function** which converts the first letter of each word in a string to uppercase.

Complete the \`change_case\` **function** which converts the uppercase letters of a string into lowercase, and the lowercase to uppercase.

\`\`\`rust
pub fn capitalize_first(input: &str) -> String {
}

pub fn title_case(input: &str) -> String {
}

pub fn change_case(input: &str) -> String {
}
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Complete the \`capitalize_first\` **function** which converts the first letter of the string to uppercase.

Complete the \`title_case\` **function** which converts the first letter of each word in a string to uppercase.

Complete the \`change_case\` **function** which converts the uppercase letters of a string into lowercase, and the lowercase to uppercase.`,
    functionSignatures: [`pub fn capitalize_first(input: &str) -> String {
    todo!()
}

pub fn title_case(input: &str) -> String {
    todo!()
}

pub fn change_case(input: &str) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn capitalize_first(input: &str) -> String {
    todo!()
}

pub fn title_case(input: &str) -> String {
    todo!()
}

pub fn change_case(input: &str) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_142_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", capitalize_first("joe is missing"));
    println!("{}", title_case("jill is leaving A"));
    println!("{}", change_case("heLLo THere"));
}`,
      expectedOutput: `Joe is missing
Jill Is Leaving A
HEllO thERE`,
      hidden: false,
    }],
    hints: [],
  },
  {
    id: 143,
    slug: 'modify_letter',
    title: 'Modify Letter',
    checkpoint: 'zone01_cp1',
    difficulty: 'easy',
    order: 2,
    concept: `Create a **function** \`remove_letter_sensitive\` that returns a string without the letter specified as argument.

Create a **function** \`remove_letter_insensitive\` that returns a string without the letter specified as argument (ignoring case).

Create a **function** \`swap_letter_case\` that returns a string swapping the case for the chosen letter.

\`\`\`rust
pub fn remove_letter_sensitive(s: &str, letter: char) -> String {
}

pub fn remove_letter_insensitive(s: &str, letter: char) -> String {
}

pub fn swap_letter_case(s: &str, letter: char) -> String {
}
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** \`remove_letter_sensitive\` that returns a string without the letter specified as argument.

Create a **function** \`remove_letter_insensitive\` that returns a string without the letter specified as argument (ignoring case).

Create a **function** \`swap_letter_case\` that returns a string swapping the case for the chosen letter.`,
    functionSignatures: [`pub fn remove_letter_sensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn remove_letter_insensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn swap_letter_case(s: &str, letter: char) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn remove_letter_sensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn remove_letter_insensitive(s: &str, letter: char) -> String {
    todo!()
}

pub fn swap_letter_case(s: &str, letter: char) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_143_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{}", remove_letter_sensitive("Jjoje jis sljeepjjing", 'j'));
    println!("{}", remove_letter_insensitive("JaimA ais swiaAmmingA", 'A'));
    println!("{}", swap_letter_case("byE bye", 'e'));
}`,
      expectedOutput: `Joe is sleeping
Jim is swimming
bye byE`,
      hidden: false,
    }],
    hints: [],
  },
  // ── Exam-2 missing exercises ─────────────────────────────────────────────
  {
    id: 144,
    slug: 'scytale_cipher',
    title: 'Scytale Cipher',
    checkpoint: 'zone01_cp2',
    difficulty: 'hard',
    order: 5,
    concept: `Create a **function** which creates a scytale cipher (also known as spartan cipher).

In practice, it is represented by a strip wrapped around a cylinder. The message is written across the loops of the strip (not along the strip). The message becomes *coded* if the radius of the cylinder changes, or the strip is removed from the cylinder.

Your function should recreate the scytale cipher, so that the \`String\` represents the message, and the \`u32\` represents the number of times the strip is wrapped around the cylinder.

### Example

**size 6:** \`"scytale Code"\` -> \`"sec yCtoadle"\`

\`\`\`console
--------------------------------
  |s|  |c|  |y|  |t|  |a|  |l|
  |e|  | |  |C|  |o|  |d|  |e|
--------------------------------
\`\`\`

**size 8:** \`"scytale Code"\` -> \`"sCcoydtea l e"\`

\`\`\`console
------------------------------------------
  |s|  |c|  |y|  |t|  |a|  |l|  |e|  | |
  |C|  |o|  |d|  |e|  | |  | |  | |  | |
------------------------------------------
\`\`\``,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `Create a **function** which creates a scytale cipher (also known as spartan cipher).

The \`String\` represents the message, and the \`u32\` represents the number of times the strip is wrapped around the cylinder.

**size 6:** \`"scytale Code"\` -> \`"sec yCtoadle"\`

**size 8:** \`"scytale Code"\` -> \`"sCcoydtea l e"\``,
    functionSignatures: [`pub fn scytale_cipher(message: String, i: u32) -> String {
    todo!()
}`],
    constraints: [],
    starterCode: `pub fn scytale_cipher(message: String, i: u32) -> String {
    todo!()
}`,
    solution: '',
    testCases: [{
      id: 'tc_144_1',
      description: 'Usage example',
      code: `fn main() {
    println!("{:?}", scytale_cipher(String::from("scytale Code"), 6));
    println!("{:?}", scytale_cipher(String::from("scytale Code"), 8));
}`,
      expectedOutput: `"sec yCtoadle"
"sCcoydtea l e"`,
      hidden: false,
    }],
    hints: [],
  },
  // ── Exam-4 missing exercises ─────────────────────────────────────────────
  {
    id: 145,
    slug: 'lunch_queue',
    title: 'Lunch Queue',
    checkpoint: 'zone01_final',
    difficulty: 'hardest',
    order: 6,
    concept: `You will need to create an _API_, so that a program can organize a queue of people.

The program requires the following functions. Add them as associated functions to the \`Queue\` structure:

- \`new\`: which will initialize the \`Queue\`.
- \`add\`: which adds a person to the queue.
- \`invert_queue\`: which reverses the queue.
- \`rm\`: which removes the person who finished ordering their food. The removal should respect the FIFO method (first in first out). It should return the person's details.
- \`search\`: which returns the details for a given person's \`name\`.

You must also create a type named \`Link\`. This will be the connection of the structures \`Queue\` and \`Person\`. This will be a recursion type, and must point to \`None\` if there is no \`Person\` to point to.`,
    whyItExists: 'Zone01 / Reboot01 checkpoint exercise.',
    comparisons: [],
    guidedExamples: [],
    videos: [],
    question: `You will need to create an _API_, so that a program can organize a queue of people.

The program requires the following functions as associated functions on the \`Queue\` structure:

- \`new\`: initialize the \`Queue\`.
- \`add\`: adds a person to the queue.
- \`invert_queue\`: reverses the queue.
- \`rm\`: removes the first person (FIFO) and returns their details.
- \`search\`: returns the details for a given person's \`name\`.

Also create a type \`Link\` — a recursion type that connects \`Queue\` and \`Person\`, pointing to \`None\` if no \`Person\` exists.`,
    functionSignatures: [`pub struct Queue {
    pub node: Link,
}

pub type Link = Option<Box<Person>>;

#[derive(Debug)]
pub struct Person {
    pub discount: i32,
    pub name: String,
    pub next_person: Link,
}

impl Queue {
    pub fn new() -> Queue {
        todo!()
    }

    pub fn add(&mut self, name: String, discount: i32) {
        todo!()
    }

    pub fn invert_queue(&mut self) {
        todo!()
    }

    pub fn rm(&mut self) -> Option<(String, i32)> {
        todo!()
    }

    pub fn search(&self, name: &str) -> Option<(String, i32)> {
        todo!()
    }
}`],
    constraints: [],
    starterCode: `pub struct Queue {
    pub node: Link,
}

pub type Link = Option<Box<Person>>;

#[derive(Debug)]
pub struct Person {
    pub discount: i32,
    pub name: String,
    pub next_person: Link,
}

impl Queue {
    pub fn new() -> Queue {
        todo!()
    }

    pub fn add(&mut self, name: String, discount: i32) {
        todo!()
    }

    pub fn invert_queue(&mut self) {
        todo!()
    }

    pub fn rm(&mut self) -> Option<(String, i32)> {
        todo!()
    }

    pub fn search(&self, name: &str) -> Option<(String, i32)> {
        todo!()
    }
}`,
    solution: '',
    testCases: [{
      id: 'tc_145_1',
      description: 'Usage example',
      code: `fn main() {
    let mut list = Queue::new();
    list.add(String::from("Marie"), 20);
    list.add(String::from("Monica"), 15);
    list.add(String::from("Ana"), 5);
    list.add(String::from("Alice"), 35);
    println!("{:?}", list);

    println!("{:?}", list.search("Marie"));
    println!("{:?}", list.search("Alice"));
    println!("{:?}", list.search("someone"));

    println!("removed {:?}", list.rm());
    println!("list {:?}", list);
    list.invert_queue();
    println!("invert {:?}", list);
}`,
      expectedOutput: `Queue { node: Some(Person { name: "Alice", discount: 35, next_person: Some(Person { name: "Ana", discount: 5, next_person: Some(Person { name: "Monica", discount: 15, next_person: Some(Person { name: "Marie", discount: 20, next_person: None }) }) }) }) }
Some(("Marie", 20))
Some(("Alice", 35))
None
removed Some(("Marie", 20))
list Queue { node: Some(Person { name: "Alice", discount: 35, next_person: Some(Person { name: "Ana", discount: 5, next_person: Some(Person { name: "Monica", discount: 15, next_person: None }) }) }) }
invert Queue { node: Some(Person { name: "Monica", discount: 15, next_person: Some(Person { name: "Ana", discount: 5, next_person: Some(Person { name: "Alice", discount: 35, next_person: None }) }) }) }`,
      hidden: false,
    }],
    hints: [`enum — https://doc.rust-lang.org/rust-by-example/custom_types/enum.html`, `Box — https://doc.rust-lang.org/book/ch15-01-box.html`, `std::option — https://doc.rust-lang.org/std/option/`],
  },
];
