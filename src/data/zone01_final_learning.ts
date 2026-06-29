import type { Cp3LearningContent } from '../types';
import { zone01Cp3Learning } from './zone01_cp3_learning';

// ===========================================================================
// Zone01 Final guided-learning content, keyed by exercise slug.
//
// 14 Final slugs are shared with CP3 — they reuse the CP3 journey by spreading
// the CP3 entry and adding a Documentation section + editor hints.
// 16 Final-only slugs (added in a later step) get full original content.
//
// Authoring notes match zone01_cp3_learning.ts (officialDescription uses ~~~
// fences; sideQuiz blanks default to '_____'; documentation lists APIs + links
// (+ optional videos); editorHints are non-spoiler progressive comments seeded
// into the editor).
// ===========================================================================

export const zone01FinalLearning: Record<string, Cp3LearningContent> = {
  // -------------------------------------------------------------------------
  // Shared with CP3 — reuse the full journey, add Documentation + editor hints.
  // -------------------------------------------------------------------------
  counting_words: {
    explanationAr: {
      intro: `هذا التمرين كلاسيكي، وهو يعلّمك أكثر المجموعات نفعاً في البرمجة: خريطة التجزئة.`,
      sections: [
        { heading: `الهدف`, body: `خذ نصاً واذكر كم مرة يظهر كل كلمة، معاملاً الأحرف الكبيرة والصغيرة الكلمةَ نفسها، ومتجاهلاً علامات الترقيم، إلا الفاصلة العليا داخل الكلمة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الخريطة مجموعة تخزّن أزواج مفتاح وقيمة وتتيح البحث عن قيمة بمفتاحها بسرعة كبيرة. وهنا المفتاح كلمة والقيمة عدد مرات ظهورها. والمُكرِّر يتيح المرور على أجزاء النص واحداً تلو الآخر. والدالة entry طريقة أنيقة لإيجاد عدّاد موجود أو بدء عدّاد جديد من صفر.` },
        { heading: `كيف يفكّر الحل`, body: `نقطّع النص إلى كلمات عند كل محرف ليس حرفاً ولا رقماً ولا فاصلة عليا. ولكل كلمة نحوّلها إلى أحرف صغيرة كي تُحسب الكلمة بحالتيها معاً، ثم نزيد عدّادها في الخريطة واحداً. الصورة الذهنية ورقة إحصاء، فكلما رأيت كلمة أضفت علامة جديدة بجانبها.` },
        { heading: `انتبه`, body: `يبرز فخّان للمبتدئ. الأول نسيان جعل المقارنة غير حسّاسة لحالة الأحرف، فتُحسب الكلمة بحالتيها منفصلتين. والثاني الأجزاء الفارغة التي قد ينتجها التقطيع بين فاصلين، فنتخطّاها كي لا تصير كلمة فارغة زائفة. والفاصلة العليا هي الحالة الدقيقة، إذ يجب أن تبقى داخل الكلمات وأن تُتجاهل في غير ذلك.` },
        { heading: `تذكّر`, body: `النمط entry للمفتاح، ثم or_insert بصفر، ثم زيادة واحد، هو الطريقة المعيارية لعدّ الأشياء في خريطة. فكّر هكذا: جِد أو أنشئ، ثم زِد.` },
      ],
      walkthrough: [
        { code: `let mut counts: HashMap<String, u32> = HashMap::new();`, explain: `ننشئ خريطة فارغة تربط كل كلمة، وهي نص، بعدد مرات رؤيتها، وهو رقم. وهي قابلة للتغيير لأننا سنحدّث العدّادات باستمرار.` },
        { code: `for word in words.split(|c: char| !c.is_alphanumeric() && c != '\\'') {`, explain: `تقطّع split النص عند كل موضع يكون فيه الاختبار بين العمودين صحيحاً، أي حيث يكون المحرف ليس حرفاً ولا رقماً ولا فاصلة عليا. فتصبح علامات الترقيم والمسافات نقاط قطع وتتساقط الكلمات.` },
        { code: `if word.is_empty() {\n    continue;\n}`, explain: `حين يتجاور فاصلان يُنتج التقطيع جزءاً فارغاً، فنتخطّاه بـ continue كي لا يُحسب نص فارغ ككلمة.` },
        { code: `*counts.entry(word.to_lowercase()).or_insert(0) += 1;`, explain: `تبحث entry عن الكلمة بأحرفها الصغيرة، وتنشئها بادئةً من صفر إن كانت جديدة عبر or_insert صفر. ثم تصل النجمة إلى العدّاد الفعلي لنزيده واحداً. هذا السطر الواحد يُنشئ ويزيد معاً.` },
      ],
    },
    explanation: {
      intro: `This exercise is a classic, and it teaches the single most useful collection in programming: the hash map.`,
      sections: [
        { heading: `The goal`, body: `Take a piece of text and report how many times each word appears, treating uppercase and lowercase as the same word and ignoring punctuation, except for an apostrophe inside a word.` },
        { heading: `Concepts you need`, body: `A HashMap is a collection that stores key and value pairs and lets you look a value up by its key very quickly. Here the key is a word and the value is its count. An iterator lets us walk through pieces of the text one by one. The entry method is a neat way to either find an existing count or start a new one at zero.` },
        { heading: `How the solution thinks`, body: `We slice the text into words wherever we hit a character that is not a letter, digit, or apostrophe. For each word we lower case it so that Hello and hello count together, then we bump its counter in the map by one. The mental picture is a tally sheet, where every time you see a word you add one more mark next to it.` },
        { heading: `Watch out for`, body: `Two beginner traps stand out. First, forgetting to make the comparison case insensitive, which would count Hello and hello separately. Second, the empty pieces that splitting can produce between two separators, which we skip so they do not become a fake empty word. The apostrophe is the tricky edge case, because it must stay inside words like it is, but otherwise be ignored.` },
        { heading: `Remember this`, body: `The pattern entry of key, or insert zero, then add one, is the standard way to count things in a map. Think find or create, then increment.` },
      ],
      walkthrough: [
        { code: `let mut counts: HashMap<String, u32> = HashMap::new();`, explain: `We create an empty map that will pair each word, a String, with how many times we have seen it, a number. It is mutable because we will keep updating the counts.` },
        { code: `for word in words.split(|c: char| !c.is_alphanumeric() && c != '\\'') {`, explain: `split cuts the text into pieces wherever the little test in the bars is true, that is wherever a character is neither a letter or digit nor an apostrophe. So punctuation and spaces become the cut points and the words fall out.` },
        { code: `if word.is_empty() {\n    continue;\n}`, explain: `When two separators sit next to each other, splitting produces an empty piece. We skip those with continue so an empty string never gets counted as a word.` },
        { code: `*counts.entry(word.to_lowercase()).or_insert(0) += 1;`, explain: `entry looks up the lower cased word, and or insert zero creates it starting at zero if it is new. The star then reaches the actual counter so we can add one to it. This single line both creates and increments.` },
      ],
    },
    expectedIO: {
      input: `words: &str`,
      output: `HashMap<String, u32>`,
      behavior: `Counts how often each word appears — case-insensitive, punctuation ignored, but an apostrophe inside a word (like "it's") is kept.`,
      examples: [
        { input: `"Hello, world!"`, output: `{"hello": 1, "world": 1}` },
        { input: `"Batman, BATMAN, batman, Stop stop"`, output: `{"batman": 3, "stop": 2}` },
        { input: `"it's IT'S"`, output: `{"it's": 2}`, note: `apostrophe kept` },
      ],
    },
    ...zone01Cp3Learning.counting_words,
    documentation: {
      apis: [
        { name: 'str::split', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.split', note: 'split on a char or a predicate closure' },
        { name: 'char::is_alphanumeric', url: 'https://doc.rust-lang.org/std/primitive.char.html#method.is_alphanumeric', note: 'keep letters/digits, drop punctuation' },
        { name: 'str::to_lowercase', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.to_lowercase', note: 'case-insensitive keys' },
        { name: 'HashMap::entry', url: 'https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry', note: 'insert-or-update a counter' },
      ],
      links: [
        { title: 'Rust By Example — HashMap', url: 'https://doc.rust-lang.org/rust-by-example/std/hash.html' },
        { title: 'The Book — Storing keys with associated values', url: 'https://doc.rust-lang.org/book/ch08-03-hash-maps.html' },
      ],
      videos: [{ title: 'Vectors and Hash Maps', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=ic9WEuto-gE' }],
    },
    editorHints: [
      'Split on every character that is NOT a letter/digit, but keep the apostrophe in words like "it\'s".',
      'Skip empty pieces that appear between consecutive separators.',
      'Lowercase each word before counting, and use entry(word).or_insert(0).',
    ],
  },

  reverse_it: {
    explanationAr: {
      intro: `يمزج هذا التمرين التفكير العددي بالتفكير النصّي، وهي مهارة ستستعملها كثيراً.`,
      sections: [
        { heading: `الهدف`, body: `بإعطاء عدد صحيح، أعِد نصاً هو أرقام العدد معكوسة يتبعها العدد الأصلي، مع إبقاء إشارة السالب في المقدّمة إن كان العدد سالباً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الأعداد والنصوص أنواع مختلفة في رست، لذا نحوّل بينها. الدالة to_string تحوّل العدد إلى نص. وchars وrev تتيحان المرور على المحارف بالعكس. والماكرو format يبني نصاً جديداً بوضع القيم في قالب. والدالة abs تعطي القيمة المطلقة فتُسقط أي إشارة سالب.` },
        { heading: `كيف يفكّر الحل`, body: `نعمل على العدد بلا إشارته كي لا تختلط السالب بالأرقام. نعكس تلك الأرقام بقلب ترتيب المحارف. ثم نلصق ثلاثة أجزاء: الإشارة إن وُجدت، والأرقام المعكوسة، والأرقام الأصلية. الصورة الذهنية أخذ أرقام العدد وتصويرها ثم قلب نسخة ولصق النسختين جنباً إلى جنب.` },
        { heading: `انتبه`, body: `فخّ دقيق هو العدد الأكثر سلبية، إذ لا تتّسع قيمته المطلقة في النوع نفسه، فنحوّل إلى عدد أوسع أولاً لتفادي تجاوز السعة. وينسى المبتدئون أيضاً أن العكس يُبقي الأصفار، فعددٌ ينتهي بصفر يكتسب صفراً في مقدّمة الجزء المعكوس، وهذا متوقّع هنا.` },
        { heading: `تذكّر`, body: `افصل الإشارة، وحوّل الأرقام كنص، ثم أعِد التركيب. تصبح الأعداد سهلة إعادة الترتيب حين تعاملها كسلاسل محارف.` },
      ],
      walkthrough: [
        { code: `let abs = (v as i64).abs();`, explain: `نوسّع العدد إلى نوع أكبر ونأخذ قيمته المطلقة فنُسقط الإشارة. والتوسيع أولاً يتفادى تجاوز السعة عند أكثر مدخل سلبية.` },
        { code: `let reversed: String = abs.to_string().chars().rev().collect();`, explain: `نحوّل العدد إلى نص، ونمرّ على محارفه بالعكس، ونجمعها في نص جديد. تلك هي الأرقام مقلوبة.` },
        { code: `let sign = if v < 0 { "-" } else { "" };`, explain: `إن كان العدد الأصلي سالباً نتذكّر إشارة سالب، وإلا جزءاً فارغاً. هذا يُبقي الإشارة خارج معالجة الأرقام حتى النهاية.` },
        { code: `format!("{}{}{}", sign, reversed, abs)`, explain: `يبني الماكرو format النص النهائي بملء الفراغات الثلاثة بالإشارة والأرقام المعكوسة والأرقام الأصلية بالترتيب. ولعدم وجود فاصلة منقوطة، يُعاد هذا النص.` },
      ],
    },
    explanation: {
      intro: `This exercise mixes number thinking with text thinking, which is a skill you will use a lot.`,
      sections: [
        { heading: `The goal`, body: `Given a whole number, return a string that is the number's digits reversed, followed by the original number, with a minus sign kept at the very front if the number was negative.` },
        { heading: `Concepts you need`, body: `Numbers and text are different types in Rust, so we convert between them. The method to string turns a number into text. chars and rev let us walk the characters backwards. The format macro builds a new string by slotting values into a template. The abs method gives the absolute value, dropping any minus sign.` },
        { heading: `How the solution thinks`, body: `We work with the number without its sign so the minus does not get tangled into the digits. We reverse those digits by flipping the character order. Then we glue three parts together: the sign if there was one, the reversed digits, and the original digits. The mental picture is taking the number's digits, photocopying them, flipping one copy, and taping the two copies side by side.` },
        { heading: `Watch out for`, body: `A subtle trap is the most negative number, whose absolute value does not fit back into the same signed type, so we convert to a wider integer first to avoid overflow. Beginners also forget that reversing keeps zeros, so a number ending in zero gains a leading zero in the reversed part, which is expected here.` },
        { heading: `Remember this`, body: `Separate the sign, transform the digits as text, then reassemble. Numbers become easy to rearrange once you treat them as strings of characters.` },
      ],
      walkthrough: [
        { code: `let abs = (v as i64).abs();`, explain: `We widen the number to a larger integer type and take its absolute value, dropping the sign. Widening first avoids an overflow on the most negative possible input.` },
        { code: `let reversed: String = abs.to_string().chars().rev().collect();`, explain: `We turn the number into text, walk its characters in reverse order, and collect them into a new string. That is the digits flipped around.` },
        { code: `let sign = if v < 0 { "-" } else { "" };`, explain: `If the original number was negative we remember a minus sign, otherwise an empty piece. This keeps the sign out of the digit juggling until the very end.` },
        { code: `format!("{}{}{}", sign, reversed, abs)`, explain: `The format macro builds the final string by filling the three slots with the sign, the reversed digits, and the original digits in order. With no semicolon, this string is returned.` },
      ],
    },
    expectedIO: {
      input: `v: i32`,
      output: `String`,
      behavior: `Returns the reversed digits followed by the original number; a negative sign stays at the front.`,
      examples: [
        { input: `123`, output: `"321123"` },
        { input: `-123`, output: `"-321123"`, note: `sign kept in front` },
        { input: `50`, output: `"0550"`, note: `zeros preserved` },
      ],
    },
    ...zone01Cp3Learning.reverse_it,
    documentation: {
      apis: [
        { name: 'i32::abs', url: 'https://doc.rust-lang.org/std/primitive.i32.html#method.abs', note: 'work on the magnitude' },
        { name: 'str::chars', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars', note: 'iterate characters' },
        { name: 'Iterator::rev', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.rev', note: 'reverse the order' },
        { name: 'Iterator::collect', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect', note: 'rebuild a String' },
      ],
      links: [
        { title: 'Rust By Example — Iterators', url: 'https://doc.rust-lang.org/rust-by-example/trait/iter.html' },
        { title: 'format! macro', url: 'https://doc.rust-lang.org/std/macro.format.html' },
      ],
      videos: [{ title: 'Iterators in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=4GcKrj4By8k' }],
    },
    editorHints: [
      'Take the absolute value first so the minus sign does not get reversed.',
      'Reverse the digit characters with chars().rev().collect().',
      'Assemble sign + reversed digits + original number with format!.',
    ],
  },

  inv_pyramid: {
    explanationAr: {
      intro: `هذا التمرين عن تحويل نمط عدّ إلى أشكال مرسومة بالنص.`,
      sections: [
        { heading: `الهدف`, body: `ابنِ شكل معيّن على هيئة قائمة من السطور. كل سطر مسافات يتبعها رمز مكرّر، وتكبر السطور من تكرار واحد حتى حجم مختار ثم تصغر عائدةً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `المدى مثل من واحد حتى رقم وشاملاً له يتيح للحلقة العدّ عبر الأرقام. والدالة repeat تصنع نصاً بنسخ جزء عدة مرات، وهي مثالية للمسافات وللرمز معاً. وندفع كل سطر منتهٍ إلى متجه، وهو قائمة قابلة للنمو.` },
        { heading: `كيف يفكّر الحل`, body: `الشكل متناظر، لذا نبنيه في مرورين. في الأول نعدّ صاعدين فيكبر كل سطر قليلاً ويزداد إزاحةً. وفي الثاني نعدّ نازلين فنعكس النصف الأول لإكمال الشكل. ولكل سطر تساوي الإزاحة وعدد الرموز رقمَ الخطوة الحالية. الصورة الذهنية صعود درج من الرموز ثم نزول الجانب الآخر.` },
        { heading: `انتبه`, body: `أخطاء الفرق بواحد هي الفخّ الكلاسيكي هنا، خصوصاً في النصف النازل حيث يجب أن يتوقف المدى قبل تكرار سطر القمة. واستعمال مدى شامل في الصعود ومدى معكوس غير شامل في النزول يضبط التناظر تماماً.` },
        { heading: `تذكّر`, body: `الأشكال المتناظرة أسهل بحلقتين، واحدة تعدّ صاعدة وأخرى نازلة. والدالة repeat تحوّل العدد إلى مسافات أو رموز فوراً.` },
      ],
      walkthrough: [
        { code: `let mut result = Vec::new();`, explain: `نبدأ قائمة فارغة قابلة للنمو ستحمل كل سطر منتهٍ من الشكل.` },
        { code: `for k in 1..=i {\n    result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));\n}`, explain: `بالعدّ من واحد حتى الحجم، يكون كل سطر k مسافات يتبعها الرمز مكرّراً k مرات، فتكبر السطور وتزداد إزاحةً. وندفع كل واحد إلى القائمة.` },
        { code: `for k in (1..i).rev() {\n    result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));\n}`, explain: `الآن نعدّ نازلين من تحت القمة بقليل حتى واحد، فنعكس النصف الأول، والمدى المعكوس هو ما يصنع أسفل الشكل. وتضمين الحجم كان سيكرّر السطر الأعرض مرتين.` },
        { code: `result`, explain: `نُعيد قائمة السطور المنتهية، ويطبعها المُستدعي سطراً سطراً لرؤية الشكل.` },
      ],
    },
    explanation: {
      intro: `This exercise is about turning a counting pattern into shapes made of text.`,
      sections: [
        { heading: `The goal`, body: `Build a diamond shape as a list of text lines. Each line is some spaces followed by a repeated symbol, and the lines grow from one repeat up to a chosen size, then shrink back down again.` },
        { heading: `Concepts you need`, body: `A range like one up to and including i lets a loop count through numbers. The repeat method makes a string by copying a piece several times, which is perfect for both the spaces and the symbol. We push each finished line into a vector, which is a growable list.` },
        { heading: `How the solution thinks`, body: `The shape is symmetric, so we build it in two passes. First we count up, making each line a little wider and a little more indented. Then we count down, mirroring the first half to complete the diamond. For every line, the indentation and the number of symbols both equal the current step number. The mental picture is climbing up a staircase of symbols and then walking back down the other side.` },
        { heading: `Watch out for`, body: `Off by one mistakes are the classic trap here, especially in the shrinking half, where the range must stop before repeating the peak line. Using an inclusive range for the way up and a reversed, exclusive range for the way down gets the mirror exactly right.` },
        { heading: `Remember this`, body: `Symmetric shapes are easiest as two loops, one counting up and one counting down. The repeat method turns a count into spaces or symbols instantly.` },
      ],
      walkthrough: [
        { code: `let mut result = Vec::new();`, explain: `We start an empty growable list that will hold each finished line of the shape.` },
        { code: `for k in 1..=i {\n    result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));\n}`, explain: `Counting from one up to i, each line is k spaces followed by the symbol repeated k times, so the lines get wider and more indented. We push each one onto the list.` },
        { code: `for k in (1..i).rev() {\n    result.push(format!("{}{}", " ".repeat(k), v.repeat(k)));\n}`, explain: `Now we count down from just below the peak back to one, mirroring the first half, and the reversed range is what makes the bottom of the diamond. Including i would repeat the widest line twice.` },
        { code: `result`, explain: `We return the finished list of lines, and the caller prints them one per line to see the diamond.` },
      ],
    },
    expectedIO: {
      input: `v: String, i: usize`,
      output: `Vec<String>  (the lines)`,
      behavior: `Builds a centered diamond: rows grow from 1 to i repeats of v, then shrink back to 1, each indented by its row number.`,
      examples: [
        { input: `"x", 3`, output: ` x\n  xx\n   xxx\n  xx\n x` },
        { input: `"x", 2`, output: ` x\n  xx\n x` },
        { input: `"o", 1`, output: ` o`, note: `single row` },
      ],
    },
    ...zone01Cp3Learning.inv_pyramid,
    documentation: {
      apis: [
        { name: 'str::repeat', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.repeat', note: 'k copies of a string' },
        { name: 'Range / RangeInclusive', url: 'https://doc.rust-lang.org/std/ops/struct.RangeInclusive.html', note: '1..=i ascending levels' },
        { name: 'Iterator::rev', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.rev', note: '(1..i).rev() for the descending half' },
        { name: 'Vec::push', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.push', note: 'collect each line' },
      ],
      links: [
        { title: 'format! macro', url: 'https://doc.rust-lang.org/std/macro.format.html' },
        { title: 'The Book — Control flow (loops)', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html' },
      ],
    },
    editorHints: [
      'At level k, the line is k spaces followed by the string repeated k times.',
      'Build the ascending half with 1..=i, then mirror it with (1..i).rev().',
      'Push each formatted line into the result Vec and return it.',
    ],
  },

  nextprime: {
    explanationAr: {
      intro: `يعلّمك هذا التمرين كيف تطرح سؤالاً بنعم أو لا عن عدد، ثم تبحث عن العدد التالي الذي تكون إجابته نعم.`,
      sections: [
        { heading: `الهدف`, body: `بإعطاء عدد بداية، جِد أصغر عدد أولي أكبر من أو يساوي ذلك العدد. وإن كانت البداية أولية فهي الجواب.` },
        { heading: `المفاهيم التي تحتاجها`, body: `العدد الأولي عدد صحيح أكبر من واحد قواسمه الوحيدة هي واحد ونفسه. ولاختبار الأولية نفحص هل يقسمه أي عدد أصغر بلا باقٍ، باستخدام عامل الباقي المكتوب بعلامة النسبة المئوية الذي يعطي ما يتبقّى بعد القسمة. والدالة المساعدة تتيح تسمية فحص الأولية وإعادة استعماله.` },
        { heading: `كيف يفكّر الحل`, body: `نفصل المشكلة إلى جزأين. أولاً دالة صغيرة تجيب هل هذا العدد أولي. وثانياً حلقة تبدأ من العدد المعطى وتظل تصعد بواحد حتى تقول تلك الدالة نعم. وفكرة مهمة للكفاءة: لاختبار أولية عدد يكفي تجربة القواسم حتى جذره التربيعي، لأن أي عامل أكبر سيكون له شريك أصغر من الجذر. الصورة الذهنية المشي للأمام عدداً عدداً وطرق كل باب وسؤال هل أنت أولي حتى يقول أحدهم نعم.` },
        { heading: `انتبه`, body: `كثيراً ما يفحص المبتدئ القواسم حتى العدد نفسه، وهو أبطأ بكثير من التوقف عند الجذر التربيعي. والأعداد دون اثنين ليست أولية أبداً، فعلى الدالة المساعدة رفضها. ومن الفخاخ نسيان أن البداية قد تكون أولية أصلاً، فالجواب قد يكون البداية نفسها.` },
        { heading: `تذكّر`, body: `قسّم المشكلات الصعبة إلى دالة بنعم أو لا وحلقة بحث. ولاختبار الأولية، تكفي القواسم حتى الجذر التربيعي فقط.` },
      ],
      walkthrough: [
        { code: `fn is_prime(n: usize) -> bool {`, explain: `دالة مساعدة معرّفة داخل دالتنا. ومنح فحص الأولية اسماً خاصاً يجعل البحث الرئيسي أوضح.` },
        { code: `if n < 2 {\n    return false;\n}`, explain: `صفر وواحد ليسا أوليين بالتعريف، فنرفضهما فوراً قبل أي قسمة.` },
        { code: `let mut i = 2;\nwhile i * i <= n {\n    if n % i == 0 {\n        return false;\n    }\n    i += 1;\n}`, explain: `نجرّب كل قاسم محتمل بدءاً من اثنين. والشرط i في i أصغر من أو يساوي n يعني أننا لا نتجاوز الجذر التربيعي، وهو كل ما يلزم. وإن قسمه أي قاسم بلا باقٍ فالعدد ليس أولياً.` },
        { code: `let mut n = nbr;\nwhile !is_prime(n) {\n    n += 1;\n}\nn`, explain: `بدءاً من العدد المعطى، نصعد بواحد ما دام الحالي ليس أولياً، ثم نُعيد أول عدد يكون أولياً.` },
      ],
    },
    explanation: {
      intro: `This exercise teaches you how to ask a yes or no question about a number and then search for the next number that answers yes.`,
      sections: [
        { heading: `The goal`, body: `Given a starting number, find the smallest prime number that is greater than or equal to it. If the start is already prime, that is the answer.` },
        { heading: `Concepts you need`, body: `A prime number is a whole number greater than one whose only divisors are one and itself. To test for primeness we check whether any smaller number divides it evenly, using the remainder operator, written with a percent sign, which gives what is left over after division. A helper function lets us name and reuse the primeness check.` },
        { heading: `How the solution thinks`, body: `We separate the problem into two parts. First, a small function that answers is this number prime. Second, a loop that starts at the given number and keeps stepping up by one until that function says yes. A key efficiency idea is that to check if a number is prime we only need to try divisors up to its square root, because any larger factor would have a partner smaller than the square root. The mental picture is walking forward number by number, knocking on each door and asking are you prime, until one says yes.` },
        { heading: `Watch out for`, body: `Beginners often check divisors all the way up to the number itself, which is far slower than stopping at the square root. Numbers below two are never prime, so the helper must reject them. Forgetting that the start might already be prime is another trap, since the answer can be the start itself.` },
        { heading: `Remember this`, body: `Split hard problems into a yes or no helper plus a search loop. To test primeness, only divisors up to the square root matter.` },
      ],
      walkthrough: [
        { code: `fn is_prime(n: usize) -> bool {`, explain: `A helper function defined inside our function. Giving the primeness test its own name makes the main search read clearly.` },
        { code: `if n < 2 {\n    return false;\n}`, explain: `Zero and one are not prime by definition, so we reject them immediately before doing any division.` },
        { code: `let mut i = 2;\nwhile i * i <= n {\n    if n % i == 0 {\n        return false;\n    }\n    i += 1;\n}`, explain: `We try each possible divisor starting at two. The condition i times i less than or equal to n means we only go up to the square root, which is all that is needed. If any divisor leaves no remainder, the number is not prime.` },
        { code: `let mut n = nbr;\nwhile !is_prime(n) {\n    n += 1;\n}\nn`, explain: `Starting at the given number, we step up by one as long as the current number is not prime, then return the first one that is.` },
      ],
    },
    expectedIO: {
      input: `nbr: usize`,
      output: `usize`,
      behavior: `Returns the smallest prime greater than or equal to nbr.`,
      examples: [
        { input: `4`, output: `5` },
        { input: `11`, output: `11`, note: `already prime → itself` },
        { input: `14`, output: `17` },
      ],
    },
    ...zone01Cp3Learning.nextprime,
    documentation: {
      apis: [
        { name: 'Rem (%) operator', url: 'https://doc.rust-lang.org/std/ops/trait.Rem.html', note: 'test divisibility with n % i == 0' },
        { name: 'while loops', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html#looping-through-a-collection-with-for', note: 'search loop' },
      ],
      links: [
        { title: 'The Book — Functions', url: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html' },
        { title: 'Rust By Example — Primitives', url: 'https://doc.rust-lang.org/rust-by-example/primitives.html' },
      ],
    },
    editorHints: [
      'Write a small is_prime helper: reject n < 2, then test divisors.',
      'Only check divisors up to the square root: while i * i <= n.',
      'From nbr, step upward until is_prime returns true.',
    ],
  },

  partial_sums: {
    explanationAr: {
      intro: `هذا التمرين مدخل لطيف إلى الشرائح وإلى جمع أجزاء من قائمة.`,
      sections: [
        { heading: `الهدف`, body: `بإعطاء قائمة أعداد، أنتج مجاميع بادئاتها المتقلّصة: مجموع القائمة كاملة، ثم المجموع بدون العنصر الأخير، وهكذا نزولاً حتى المجموع الفارغ الذي هو صفر.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الشريحة عرض مُستعار لجزء من قائمة، يُكتب بأقواس مربعة ومدى. والتعبير v حتى k يعني أول k عناصر. والدالة sum على المُكرِّر تجمع كل العناصر التي ينتجها. ويمكن عكس المدى ليعدّ نزولاً.` },
        { heading: `كيف يفكّر الحل`, body: `لكل طول من القائمة الكاملة نزولاً إلى صفر، نأخذ ذلك العدد من العناصر من المقدّمة ونجمعها. والعدّ نزولاً يعطينا المجاميع من الأكبر إلى الأصغر، منتهياً بالقائمة الفارغة التي مجموعها صفر. الصورة الذهنية قطع العدد الأخير من القائمة مراراً وتدوين المجموع الجديد في كل مرة.` },
        { heading: `انتبه`, body: `من الالتباسات الشائعة ماذا يكون المجموع الفارغ، لكن جمع لا شيء في رست يعطي صفراً، وهو بالضبط الإدخال الأخير الذي نريده. وحجز السعة للنتيجة لمسة كفاءة بسيطة لا إلزام. والخلط في أي طرف تتقلّص منه هو الفخّ المنطقي الأبرز.` },
        { heading: `تذكّر`, body: `الشريحة حتى k هي أول k عناصر، وجمع شريحة فارغة هو صفر. والعدّ نزولاً عبر الطول يُنتج كل مجاميع البادئات بالترتيب.` },
      ],
      walkthrough: [
        { code: `let mut sums = Vec::with_capacity(v.len() + 1);`, explain: `نصنع قائمة النتيجة، ملمّحين أنها ستحمل إدخالاً لكل طول من الكاملة حتى الفارغة. وتلميح السعة يتفادى إعادة تنمية القائمة عند الدفع.` },
        { code: `for k in (0..=v.len()).rev() {`, explain: `هنا يعدّ k نزولاً من الطول الكامل إلى صفر، وكل k هو كم عنصراً من المقدّمة سنجمعه هذه المرة.` },
        { code: `sums.push(v[..k].iter().sum());`, explain: `الشريحة v حتى k هي أول k عناصر، وiter يمرّ عليها وsum يجمعها. ندفع ذلك المجموع إلى النتيجة، وحين يكون k صفراً تكون الشريحة فارغة فالمجموع صفر.` },
      ],
    },
    explanation: {
      intro: `This exercise is a gentle introduction to slices and to summing parts of a list.`,
      sections: [
        { heading: `The goal`, body: `Given a list of numbers, produce the sums of its shrinking prefixes: the total of the whole list, then the total without the last element, and so on, all the way down to the empty sum, which is zero.` },
        { heading: `Concepts you need`, body: `A slice is a borrowed view into part of a list, written with square brackets and a range. The expression v up to k means the first k elements. An iterator's sum method adds up all the items it produces. A range can be reversed so the loop counts downward.` },
        { heading: `How the solution thinks`, body: `For each length from the full list down to zero, we take that many elements from the front and add them up. Counting the length downward gives us the totals from largest to smallest, ending with the empty list whose sum is zero. The mental picture is repeatedly chopping the last number off the list and writing down the new total each time.` },
        { heading: `Watch out for`, body: `A frequent confusion is what an empty sum should be, but in Rust summing nothing gives zero, which is exactly the final entry we want. Reserving capacity for the result is a small efficiency nicety, not a requirement. Mixing up which end you shrink from is the main logic trap.` },
        { heading: `Remember this`, body: `A slice up to k is the first k items, and summing an empty slice is zero. Counting the length down produces every prefix total in order.` },
      ],
      walkthrough: [
        { code: `let mut sums = Vec::with_capacity(v.len() + 1);`, explain: `We make the result list, hinting it will hold one entry per length from the full list down to empty. The capacity hint just avoids regrowing the list as we push.` },
        { code: `for k in (0..=v.len()).rev() {`, explain: `Here k counts downward from the full length to zero, and each k is how many elements from the front we will add this time.` },
        { code: `sums.push(v[..k].iter().sum());`, explain: `The slice v up to k is the first k elements, iter walks them, and sum adds them up. We push that total onto the result, and when k is zero the slice is empty so the sum is zero.` },
      ],
    },
    expectedIO: {
      input: `v: &[u64]`,
      output: `Vec<u64>`,
      behavior: `Sums of the shrinking prefixes: the total, then drop the last element each time, down to the empty sum (always ends in 0).`,
      examples: [
        { input: `[1, 2, 3, 4, 5]`, output: `[15, 10, 6, 3, 1, 0]` },
        { input: `[10, 20]`, output: `[30, 10, 0]` },
        { input: `[]`, output: `[0]`, note: `empty slice → [0]` },
      ],
    },
    ...zone01Cp3Learning.partial_sums,
    documentation: {
      apis: [
        { name: 'slice indexing v[..k]', url: 'https://doc.rust-lang.org/std/primitive.slice.html', note: 'prefix sub-slice' },
        { name: 'Iterator::sum', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.sum', note: 'total a slice' },
        { name: 'Vec::with_capacity', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.with_capacity', note: 'pre-allocate len+1' },
      ],
      links: [
        { title: 'Rust By Example — Slices', url: 'https://doc.rust-lang.org/rust-by-example/primitives/array.html' },
        { title: 'The Book — Vectors', url: 'https://doc.rust-lang.org/book/ch08-01-vectors.html' },
      ],
    },
    editorHints: [
      'There are len+1 results, ending with a trailing 0.',
      'For each prefix size k, sum v[..k] with .iter().sum().',
      'Iterate k from len down to 0 (use (0..=v.len()).rev()).',
    ],
  },

  previousprime: {
    explanationAr: {
      intro: `هذه الصورة المعكوسة لإيجاد العدد الأولي التالي، فالبحث هنا نزولاً لا صعوداً.`,
      sections: [
        { heading: `الهدف`, body: `بإعطاء عدد، جِد أكبر عدد أولي أصغر من أو يساوي ذلك العدد. وإن كان العدد نفسه أولياً فهو الجواب.` },
        { heading: `المفاهيم التي تحتاجها`, body: `كما سبق، العدد الأولي عدد صحيح فوق واحد يقبل القسمة على واحد ونفسه فقط. نعيد استعمال دالة فحص الأولية وعامل الباقي. والحلقة تتيح النزول خطوة خطوة، وعلينا الحذر من النزول تحت الصفر مع الأعداد بلا إشارة.` },
        { heading: `كيف يفكّر الحل`, body: `نبدأ من العدد المعطى وننزل خطوة خطوة، سائلين عند كل وقفة هل هذا أولي. وأول واحد يقول نعم هو جوابنا. الصورة الذهنية هي بحث طرق الأبواب نفسه كما في العدد التالي لكن بالمشي للوراء، ونحرس القاع أيضاً كي لا نطرح تحت الصفر.` },
        { heading: `انتبه`, body: `مع الأعداد بلا إشارة، طرح واحد من صفر سيُحدث خطأً، لذا نتوقف عند الصفر عمداً. وكما في العدد التالي، فحص القواسم حتى الجذر التربيعي فقط يُبقيه سريعاً، والأعداد دون اثنين ليست أولية أبداً.` },
        { heading: `تذكّر`, body: `حلقات البحث تعمل في أي اتجاه. ومع الأعداد بلا إشارة، احرس دائماً من النزول تحت الصفر قبل أن تطرح.` },
      ],
      walkthrough: [
        { code: `fn is_prime(n: u64) -> bool {`, explain: `دالة فحص الأولية نفسها كما سبق، مكتوبة للنوع بلا إشارة بسعة 64 بت المستخدم هنا.` },
        { code: `let mut n = nbr;\nloop {`, explain: `نبدأ من العدد المعطى ونفتح حلقة مفتوحة سنخرج منها بأنفسنا فور أن نجد أولياً أو نبلغ القاع.` },
        { code: `if is_prime(n) {\n    return n;\n}`, explain: `فور أن يكون العدد الحالي أولياً نُعيده، وبما أننا ننزل فهذا أكبر عدد أولي لا يتجاوز البداية.` },
        { code: `if n == 0 {\n    return 0;\n}\nn -= 1;`, explain: `قبل النزول نفحص الصفر، لأن طرح واحد من صفر بلا إشارة سيُحدث خطأً. وإلا ننزل خطوة واحدة ونعيد المحاولة.` },
      ],
    },
    explanation: {
      intro: `This is the mirror image of finding the next prime, searching downward instead of upward.`,
      sections: [
        { heading: `The goal`, body: `Given a number, find the largest prime that is less than or equal to it. If the number itself is prime, that is the answer.` },
        { heading: `Concepts you need`, body: `As before, a prime is a whole number above one divisible only by one and itself. We reuse a primeness helper and the remainder operator. A loop lets us step downward, and we must be careful not to step below zero with unsigned numbers.` },
        { heading: `How the solution thinks`, body: `We start at the given number and walk downward one step at a time, asking at each stop is this prime. The first one that says yes is our answer. The mental picture is the same door knocking search as next prime, but walking backwards, and we also guard the bottom so we never try to subtract below zero.` },
        { heading: `Watch out for`, body: `With unsigned numbers, subtracting one from zero would crash, so we stop at zero deliberately. As with next prime, only checking divisors up to the square root keeps it fast, and numbers below two are never prime.` },
        { heading: `Remember this`, body: `Search loops can run in either direction. With unsigned numbers, always guard against going below zero before you subtract.` },
      ],
      walkthrough: [
        { code: `fn is_prime(n: u64) -> bool {`, explain: `The same primeness helper as before, written for the unsigned 64 bit type used here.` },
        { code: `let mut n = nbr;\nloop {`, explain: `We start at the given number and begin an open ended loop that we will exit ourselves once we find a prime or hit the floor.` },
        { code: `if is_prime(n) {\n    return n;\n}`, explain: `As soon as the current number is prime we return it, and since we move downward this is the largest prime not above the start.` },
        { code: `if n == 0 {\n    return 0;\n}\nn -= 1;`, explain: `Before stepping down we check for zero, because subtracting one from an unsigned zero would crash. Otherwise we move one step lower and try again.` },
      ],
    },
    expectedIO: {
      input: `nbr: u64`,
      output: `u64`,
      behavior: `Returns the largest prime less than or equal to nbr.`,
      examples: [
        { input: `34`, output: `31` },
        { input: `13`, output: `13`, note: `already prime → itself` },
        { input: `20`, output: `19` },
      ],
    },
    ...zone01Cp3Learning.previousprime,
    documentation: {
      apis: [
        { name: 'Rem (%) operator', url: 'https://doc.rust-lang.org/std/ops/trait.Rem.html', note: 'divisibility test' },
        { name: 'u64', url: 'https://doc.rust-lang.org/std/primitive.u64.html', note: 'beware unsigned underflow' },
      ],
      links: [
        { title: 'The Book — Functions', url: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html' },
        { title: 'Integer overflow', url: 'https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-overflow' },
      ],
    },
    editorHints: [
      'Reuse the same is_prime helper (square-root bound).',
      'Search downward from nbr instead of upward.',
      'Guard against u64 underflow: stop before subtracting from 0.',
    ],
  },

  scytale_decoder: {
    explanationAr: {
      intro: `يعيد هذا التمرين بناء شيفرة قديمة ويعلّمك حساب المواقع بعناية.`,
      sections: [
        { heading: `الهدف`, body: `فُكّ رسالة شُفّرت بكتابتها في شبكة وقراءتها عمودياً. يُعطى لك النص المشفّر وعدد الأحرف في كل لفّة، وعليك إعادة بناء الأصل، أو إعادة لا شيء إن كان المدخل لا يكوّن شبكة كاملة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `Option تعبّر عن نتيجة ربما لا شيء للمدخل غير الصالح. ونعامل النص كشبكة بعدد أعمدة معروف، حيث عدد الصفوف هو الطول الكلي مقسوماً على الأعمدة. والقراءة عند الموقع صف في الأعمدة زائد العمود تتيح القفز إلى أي خلية في شبكة مسطّحة.` },
        { heading: `كيف يفكّر الحل`, body: `كتب المشفّر الرسالة عبر الصفوف وقرأها نزولاً في الأعمدة، ولفكّها نعكس ذلك: نقرأ عبر الأعمدة ونزولاً في الصفوف بالترتيب الصحيح. أولاً نرفض المدخلات التي لا تكوّن شبكة كاملة، أي النص الفارغ أو طولاً لا يقبل القسمة على الأعمدة. ثم نزور كل عمود من أعلى لأسفل جامعين المحارف في الجواب. الصورة الذهنية إعادة بناء ورقة قُرئت عموداً عموداً، بإعادة وضع الأحرف في شبكتها.` },
        { heading: `انتبه`, body: `الصيغة صف في عدد الأحرف لكل لفّة زائد العمود هي قلب التمرين، وخطأ ترتيب الضرب يخلط النتيجة. والتحقق من الطول أولاً يمنع القراءة خارج المدى. وعدّ المحارف لا البايتات مهمّ إن لم يكن النص أحرفاً إنجليزية بسيطة.` },
        { heading: `تذكّر`, body: `يمكن لقائمة مسطّحة أن تتصرّف كشبكة عبر الموقع يساوي صف في العرض زائد العمود. وتحقّق دائماً من ملاءمة البيانات للشبكة قبل القراءة منها.` },
      ],
      walkthrough: [
        { code: `if s.is_empty() || letters_per_turn == 0 {\n    return None;\n}`, explain: `النص الفارغ أو عدد أعمدة صفر لا يكوّنان شبكة صالحة، فننسحب مبكّراً بـ None.` },
        { code: `let len = s.chars().count();\nif len % letters_per_turn != 0 {\n    return None;\n}`, explain: `إن لم يقبل الطول القسمة على عدد الأعمدة بالتساوي، فلن تملأ الأحرف مستطيلاً نظيفاً، فهذا المدخل غير صالح ونُعيد None.` },
        { code: `let rows = len / letters_per_turn;\nlet chars: Vec<char> = s.chars().collect();\nlet mut result = String::with_capacity(len);`, explain: `نحسب كم صفاً للشبكة، ونجمع المحارف في قائمة يمكن الوصول إليها بالموقع، ونُهيّئ نصاً فارغاً لبناء الجواب.` },
        { code: `for col in 0..letters_per_turn {\n    for row in 0..rows {\n        result.push(chars[row * letters_per_turn + col]);\n    }\n}`, explain: `لكل عمود نمشي على كل صف، والصيغة صف في الأعمدة زائد العمود تجد تلك الخلية في القائمة المسطّحة. ودفعها بهذا الترتيب يعيد بناء الرسالة الأصلية.` },
        { code: `Some(result)`, explain: `نُعيد النص المفكوك مغلّفاً بـ Some للدلالة على النجاح.` },
      ],
    },
    explanation: {
      intro: `This exercise recreates an ancient cipher and teaches careful index arithmetic.`,
      sections: [
        { heading: `The goal`, body: `Decode a message that was scrambled by writing it in a grid and reading down the columns. You are given the scrambled text and how many letters were on each wrap, and you must rebuild the original, or return nothing if the input does not fit a clean grid.` },
        { heading: `Concepts you need`, body: `Option expresses the maybe nothing result for invalid input. We treat the text as a grid with a known number of columns, where the number of rows is the total length divided by the columns. Reading at position row times columns plus column lets us jump to any cell in a flattened grid.` },
        { heading: `How the solution thinks`, body: `The encoder wrote the message across rows and read it down columns, so to decode we do the reverse: read across columns and down rows in the right order. First we reject inputs that cannot form a complete grid, namely empty text or a length not divisible by the columns. Then we visit each column top to bottom, collecting characters into the answer. The mental picture is rebuilding a sheet of paper that was read out column by column, by laying the letters back into their grid.` },
        { heading: `Watch out for`, body: `The formula row times letters per turn plus column is the heart of the exercise, and getting the multiplication order wrong scrambles the result. Validating the length first prevents reading out of range. Counting characters rather than bytes matters if the text is not plain ASCII.` },
        { heading: `Remember this`, body: `A flat list can act like a grid using index equals row times width plus column. Always validate that the data fits the grid before indexing into it.` },
      ],
      walkthrough: [
        { code: `if s.is_empty() || letters_per_turn == 0 {\n    return None;\n}`, explain: `Empty text or a zero column count cannot form a valid grid, so we bail out early with None.` },
        { code: `let len = s.chars().count();\nif len % letters_per_turn != 0 {\n    return None;\n}`, explain: `If the length does not divide evenly by the column count, the letters would not fill a clean rectangle, so this input is invalid and we return None.` },
        { code: `let rows = len / letters_per_turn;\nlet chars: Vec<char> = s.chars().collect();\nlet mut result = String::with_capacity(len);`, explain: `We compute how many rows the grid has, gather the characters into a list we can index, and prepare an empty string to build the answer.` },
        { code: `for col in 0..letters_per_turn {\n    for row in 0..rows {\n        result.push(chars[row * letters_per_turn + col]);\n    }\n}`, explain: `For each column we walk down every row, and the formula row times columns plus column finds that cell in the flat list. Pushing them in this order rebuilds the original message.` },
        { code: `Some(result)`, explain: `We return the decoded text wrapped in Some to signal success.` },
      ],
    },
    expectedIO: {
      input: `s: String, letters_per_turn: usize`,
      output: `Option<String>`,
      behavior: `Decodes a scytale cipher by reading the text column by column. Returns None if the text is empty or its length isn't divisible by letters_per_turn.`,
      examples: [
        { input: `"abcdef", 2`, output: `Some("acebdf")` },
        { input: `"abcdef", 3`, output: `Some("adbecf")` },
        { input: `"", 3`, output: `None`, note: `empty → None` },
      ],
    },
    ...zone01Cp3Learning.scytale_decoder,
    documentation: {
      apis: [
        { name: 'str::chars / count', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars', note: 'count characters, not bytes' },
        { name: 'Iterator::collect (Vec<char>)', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect', note: 'index the grid' },
        { name: 'Option', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'None for invalid input' },
      ],
      links: [
        { title: 'Rust By Example — Option', url: 'https://doc.rust-lang.org/rust-by-example/std/option.html' },
        { title: 'The Book — Strings', url: 'https://doc.rust-lang.org/book/ch08-02-strings.html' },
      ],
    },
    editorHints: [
      'Return None for empty input, zero columns, or a length not divisible by the column count.',
      'Collect chars into a Vec so you can index the grid by (row, col).',
      'Decode by reading the grid column by column: index = row * cols + col.',
    ],
  },

  rpn: {
    explanationAr: {
      intro: `يبني هذا التمرين آلة حاسبة صغيرة ويعلّمك المكدّس، وهو من أهم هياكل البيانات.`,
      sections: [
        { heading: `الهدف`, body: `قيّم تعبيراً مكتوباً بالترميز البولندي العكسي، حيث يأتي العامل بعد عددَيه، وأعِد النتيجة العددية.` },
        { heading: `المفاهيم التي تحتاجها`, body: `المكدّس قائمة تضيف إلى أعلاها وتزيل منه فقط، كرصّة أطباق. والدالة push تضيف إلى الأعلى وpop تزيل من الأعلى. ونقطّع النص إلى رموز عند المسافات، وparse تحوّل الرمز العددي إلى رقم فعلي. وmatch يختار كوداً مختلفاً حسب الرمز.` },
        { heading: `كيف يفكّر الحل`, body: `نقرأ الرموز من اليسار إلى اليمين. يُدفع الرقم إلى المكدّس. أما العامل فينتزع العددين العلويين، يدمجهما، ويدفع الناتج. وحين تنفد الرموز تكون القيمة الوحيدة الباقية على المكدّس هي الجواب. الصورة الذهنية كومة أرقام، وكل عامل يغرف العددين العلويين، يجري الحساب، ويُسقط الناتج في الأعلى.` },
        { heading: `انتبه`, body: `الترتيب مهمّ للطرح والقسمة، لأن العدد الثاني المنتزَع هو المعامل الأيسر بما أنه دُفع أولاً. والانتزاع بترتيب خاطئ يعطي إجابات خاطئة بصمت. والتعبير سليم البناء يترك دائماً رقماً واحداً على المكدّس في النهاية.` },
        { heading: `تذكّر`, body: `في الترميز البولندي العكسي تنتظر الأرقام على مكدّس حتى يستهلك عاملٌ العددين العلويين. انتزع b أولاً ثم a، واحسب a عاملاً b.` },
      ],
      walkthrough: [
        { code: `pub fn rpn(expr: &str) -> f64 {\n    let mut stack: Vec<f64> = Vec::new();`, explain: `ننشئ مكدّساً فارغاً من الأعداد العشرية. والمتجه المستعمل من طرفه فقط يتصرّف تماماً كمكدّس.` },
        { code: `for token in expr.split_whitespace() {`, explain: `نكسر التعبير إلى رموز عند كل مسافة ونعالج كل واحد بدوره.` },
        { code: `"+" | "-" | "*" | "/" | "%" => {\n    let b = stack.pop().unwrap();\n    let a = stack.pop().unwrap();`, explain: `حين يكون الرمز عاملاً، ننتزع العددين العلويين. الأول المنتزَع b دُفع أخيراً فهو المعامل الأيمن، وa هو المعامل الأيسر.` },
        { code: `stack.push(match token {\n    "+" => a + b,\n    "-" => a - b,\n    "*" => a * b,\n    "/" => a / b,\n    "%" => a % b,\n    _ => unreachable!(),\n});`, explain: `نحسب a مدموجاً مع b حسب أيّ عامل كان، ثم ندفع الناتج عائداً إلى المكدّس لتستعمله العوامل اللاحقة.` },
        { code: `num => stack.push(num.parse::<f64>().unwrap()),`, explain: `أي رمز ليس عاملاً هو رقم، فنحلّله إلى قيمة عشرية وندفعه إلى المكدّس.` },
        { code: `stack.pop().unwrap()`, explain: `بعد معالجة كل الرموز، تكون القيمة الوحيدة الباقية على المكدّس هي الجواب النهائي الذي نُعيده.` },
      ],
    },
    explanation: {
      intro: `This exercise builds a tiny calculator and teaches the stack, one of the most important data structures.`,
      sections: [
        { heading: `The goal`, body: `Evaluate an expression written in reverse Polish notation, where the operator comes after its two numbers, and return the numeric result.` },
        { heading: `Concepts you need`, body: `A stack is a list where you only add to and remove from the top, like a stack of plates. The push method adds to the top and pop removes from the top. We split the text into tokens on spaces, and parse turns a numeric token into an actual number. A match chooses different code based on the token.` },
        { heading: `How the solution thinks`, body: `We read tokens left to right. A number gets pushed onto the stack. An operator pops the top two numbers, combines them, and pushes the result back. When the tokens run out, the single value left on the stack is the answer. The mental picture is a pile of numbers where each operator scoops the top two off, does the math, and drops the result back on top.` },
        { heading: `Watch out for`, body: `Order matters for subtraction and division, because the second number popped is the left operand, since it was pushed first. Popping in the wrong order silently gives wrong answers. A well formed expression always leaves exactly one number on the stack at the end.` },
        { heading: `Remember this`, body: `In reverse Polish notation, numbers wait on a stack until an operator consumes the top two. Pop b first, then a, and compute a operator b.` },
      ],
      walkthrough: [
        { code: `pub fn rpn(expr: &str) -> f64 {\n    let mut stack: Vec<f64> = Vec::new();`, explain: `We create an empty stack of decimal numbers. A vector used only from its end behaves exactly like a stack.` },
        { code: `for token in expr.split_whitespace() {`, explain: `We break the expression into tokens wherever there are spaces and handle each one in turn.` },
        { code: `"+" | "-" | "*" | "/" | "%" => {\n    let b = stack.pop().unwrap();\n    let a = stack.pop().unwrap();`, explain: `When the token is an operator, we pop the top two numbers. The first one popped, b, was pushed last, so it is the right operand, and a is the left operand.` },
        { code: `stack.push(match token {\n    "+" => a + b,\n    "-" => a - b,\n    "*" => a * b,\n    "/" => a / b,\n    "%" => a % b,\n    _ => unreachable!(),\n});`, explain: `We compute a combined with b according to which operator it was, then push the result back onto the stack for later operators to use.` },
        { code: `num => stack.push(num.parse::<f64>().unwrap()),`, explain: `Any token that is not an operator is a number, so we parse it into a decimal value and push it onto the stack.` },
        { code: `stack.pop().unwrap()`, explain: `After all tokens are processed, the one remaining value on the stack is the final answer, which we return.` },
      ],
    },
    expectedIO: {
      input: `expr: &str  (space-separated postfix tokens)`,
      output: `f64`,
      behavior: `Evaluates a Reverse Polish (postfix) expression. Supports + - * / %.`,
      examples: [
        { input: `"3 4 +"`, output: `7` },
        { input: `"5 1 2 + 4 * + 3 -"`, output: `14` },
        { input: `"10 2 /"`, output: `5` },
      ],
    },
    ...zone01Cp3Learning.rpn,
    documentation: {
      apis: [
        { name: 'std::env::args', url: 'https://doc.rust-lang.org/std/env/fn.args.html', note: 'read the command-line argument' },
        { name: 'str::split_whitespace', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.split_whitespace', note: 'ignore extra spaces' },
        { name: 'str::parse', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.parse', note: 'parse operands to i64' },
        { name: 'Vec (as a stack)', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.pop', note: 'push/pop operands' },
      ],
      links: [
        { title: 'The Book — Accepting command line arguments', url: 'https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html' },
        { title: 'Reverse Polish notation', url: 'https://en.wikipedia.org/wiki/Reverse_Polish_notation' },
      ],
      videos: [{ title: 'Build a Rust CLI — Command Line Arguments', channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=_T4sE6NEcV0' }],
    },
    editorHints: [
      'Use a Vec<i64> as a stack: push numbers, pop two for each operator.',
      'Handle all five operators +, -, *, /, % (modulo is easy to forget).',
      'Print "Error" for a bad token, too few operands, or != 1 value left at the end.',
    ],
  },

  blood_types_s: {
    explanationAr: {
      intro: `يُنمذج هذا التمرين مجالاً من الواقع، وهو التبرّع بالدم، باستخدام enum والدوال.`,
      sections: [
        { heading: `الهدف`, body: `مثّل فصائل الدم وأجب عن أسئلة التوافق: من يمكنه أن يستقبل من فصيلة معطاة، ومن يمكنه أن يتبرّع لها، وهل تستطيع فصيلة محدّدة الاستقبال من أخرى.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الـ enum يسرد الاحتمالات الثابتة لقيمة، فـ Antigen إحدى A أو AB أو B أو O، وRhFactor إما Positive أو Negative. والبنية تجمعهما في فصيلة كاملة. والدالة المرتبطة بنوع تُستدعى بنقطة. والماكرو matches طريقة سريعة لاختبار هل قيمة إحدى عدة حالات.` },
        { heading: `كيف يفكّر الحل`, body: `كل القواعد تتلخّص في دالة جوهرية واحدة، can_receive_from، تفحص شرطين مستقلّين: قاعدة المستضدّ وقاعدة عامل ريسوس. وحالما يوجد هذا الحكم الواحد، تصبح donors وrecipients مجرد مرشّحات على قائمة كل الفصائل الثماني، تطرح السؤال في اتجاه أو آخر. الصورة الذهنية حَكَم واحد يعرف القواعد، وقائمتان تُبنيان بسؤال الحَكَم عن كل فصيلة ممكنة.` },
        { heading: `انتبه`, body: `قاعدتا المستضدّ وريسوس منفصلتان ويجب تحقّقهما معاً، لذا تُجمعان بـ و. ونقطة دقيقة هي الاتجاه: recipients تسأل من يستطيع الاستقبال منّي، بينما donors تسأل ممّن أستطيع الاستقبال، لذا يستدعي المرشّحان can_receive_from بمعاملين متبادلين. واشتقاق السمات الصحيحة، كالقدرة على المقارنة والطباعة، لازم للاختبارات.` },
        { heading: `تذكّر`, body: `ابنِ حقيقة صغيرة واحدة، can_receive_from، ثم عبّر عن كل شيء آخر بدلالتها. والـ enum يجعل مجموعة خيارات ثابتة آمنة وواضحة.` },
      ],
      walkthrough: [
        { code: `pub enum Antigen { A, AB, B, O }`, explain: `جزء المستضدّ من الفصيلة لا يكون إلا إحدى هذه القيم الأربع المسمّاة، وهو ما يلتقطه الـ enum بدقة.` },
        { code: `pub struct BloodType {\n    pub rh_factor: RhFactor,\n    pub antigen: Antigen,\n}`, explain: `الفصيلة الكاملة تقرن عامل ريسوس بمستضدّ. وترتيب الحقول هنا يتحكّم أيضاً في كيفية طباعتها، وهو ما تفحصه الاختبارات.` },
        { code: `pub fn can_receive_from(self, other: Self) -> bool {`, explain: `هذه القاعدة الوحيدة التي يُبنى عليها كل شيء: هل يستطيع مريض من هذه الفصيلة الاستقبال بأمان من الفصيلة الأخرى.` },
        { code: `let antigen_ok = match other.antigen {\n    Antigen::O => true,\n    Antigen::A => matches!(self.antigen, Antigen::A | Antigen::AB),\n    Antigen::B => matches!(self.antigen, Antigen::B | Antigen::AB),\n    Antigen::AB => self.antigen == Antigen::AB,\n};`, explain: `قاعدة المستضدّ مكتوبة حسب فصيلة المتبرّع. فـ O تعطي للجميع، وA تعطي لـ A أو AB، وB لـ B أو AB، وAB لـ AB فقط. والماكرو matches يفحص هل مستضدّ المستقبِل ضمن المسموح.` },
        { code: `let rh_ok = self.rh_factor == RhFactor::Positive || other.rh_factor == RhFactor::Negative;\nantigen_ok && rh_ok`, explain: `قاعدة ريسوس: المستقبِل الموجب يقبل أي شيء، والمتبرّع السالب يقبله الجميع. ويجب تحقّق قاعدتي المستضدّ وريسوس معاً فنجمعهما بـ و.` },
        { code: `pub fn recipients(self) -> Vec<Self> {\n    Self::all().into_iter().filter(|&other| other.can_receive_from(self)).collect()\n}`, explain: `المستقبِلون هم كل فصيلة تستطيع الاستقبال منّي، فنرشّح قائمة كل الفصائل، مُبقين ما تكون فيه other قادرة على الاستقبال من self. ودالة donors هي الفكرة نفسها بسؤال معكوس.` },
      ],
    },
    explanation: {
      intro: `This exercise models a real world domain, blood donation, using enums and methods.`,
      sections: [
        { heading: `The goal`, body: `Represent blood types and answer compatibility questions: who can receive from a given type, who can donate to it, and whether one specific type can receive from another.` },
        { heading: `Concepts you need`, body: `An enum lists the fixed possibilities for a value, so Antigen is one of A, AB, B, or O, and RhFactor is Positive or Negative. A struct combines them into a full blood type. A method is a function attached to a type, called with a dot. The matches macro is a quick way to test if a value is one of several cases.` },
        { heading: `How the solution thinks`, body: `All the rules reduce to one core method, can receive from, which checks two independent conditions: the antigen rule and the Rh rule. Once that single judgement exists, donors and recipients are just filters over the list of all eight blood types, asking the question in one direction or the other. The mental picture is one referee who knows the rules, and two lists built by asking the referee about every possible type.` },
        { heading: `Watch out for`, body: `The antigen and Rh rules are separate and both must hold, so they are combined with and. A subtle point is direction: recipients asks who can receive from me, while donors asks who I can receive from, so the two filters call can receive from with the arguments swapped. Deriving the right traits, like the ability to compare and to be printed, is needed for the tests.` },
        { heading: `Remember this`, body: `Build one small truth, can receive from, then express everything else in terms of it. Enums make a fixed set of options safe and clear.` },
      ],
      walkthrough: [
        { code: `pub enum Antigen { A, AB, B, O }`, explain: `The antigen part of a blood type can only be one of these four named values, which an enum captures exactly.` },
        { code: `pub struct BloodType {\n    pub rh_factor: RhFactor,\n    pub antigen: Antigen,\n}`, explain: `A full blood type pairs an Rh factor with an antigen. The field order here also controls how it prints, which the tests check.` },
        { code: `pub fn can_receive_from(self, other: Self) -> bool {`, explain: `This is the single rule everything else is built on: can a patient of this type safely receive blood from the other type.` },
        { code: `let antigen_ok = match other.antigen {\n    Antigen::O => true,\n    Antigen::A => matches!(self.antigen, Antigen::A | Antigen::AB),\n    Antigen::B => matches!(self.antigen, Antigen::B | Antigen::AB),\n    Antigen::AB => self.antigen == Antigen::AB,\n};`, explain: `The antigen rule, written per donor type. O can give to anyone, A can give to A or AB, B to B or AB, and AB only to AB. The matches macro checks if the receiver's antigen is among the allowed ones.` },
        { code: `let rh_ok = self.rh_factor == RhFactor::Positive || other.rh_factor == RhFactor::Negative;\nantigen_ok && rh_ok`, explain: `The Rh rule: a positive receiver accepts anything, and a negative donor is accepted by anyone. Both the antigen rule and the Rh rule must hold, so we combine them with and.` },
        { code: `pub fn recipients(self) -> Vec<Self> {\n    Self::all().into_iter().filter(|&other| other.can_receive_from(self)).collect()\n}`, explain: `Recipients are every type that can receive from me, so we filter the full list of types, keeping those where other can receive from self. The donors method is the same idea with the question reversed.` },
      ],
    },
    expectedIO: {
      input: `BloodType { antigen, rh_factor }  + its methods`,
      output: `recipients()/donors(): Vec<BloodType> · can_receive_from(o): bool`,
      behavior: `Model blood-type compatibility: recipients() = who can receive this type, donors() = who it can receive from, can_receive_from(o) checks one pair (ABO + Rh rules).`,
      examples: [
        { input: `O+ .can_receive_from(O+)`, output: `true` },
        { input: `O+ .can_receive_from(O-)`, output: `true` },
        { input: `O- .can_receive_from(O+)`, output: `false`, note: `Rh+ donor → Rh- recipient not allowed` },
      ],
    },
    ...zone01Cp3Learning.blood_types_s,
    documentation: {
      apis: [
        { name: 'matches! macro', url: 'https://doc.rust-lang.org/std/macro.matches.html', note: 'test several enum variants at once' },
        { name: 'Iterator::filter', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter', note: 'donors / recipients' },
        { name: 'derive(PartialEq, Eq)', url: 'https://doc.rust-lang.org/std/cmp/trait.PartialEq.html', note: 'compare blood types' },
      ],
      links: [
        { title: 'The Book — Enums', url: 'https://doc.rust-lang.org/book/ch06-00-enums.html' },
        { title: 'Rust By Example — match', url: 'https://doc.rust-lang.org/rust-by-example/flow_control/match.html' },
      ],
      videos: [{ title: 'Enums and Pattern Matching', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=DSZqIJhkNCM' }],
    },
    editorHints: [
      'Compatibility has two independent rules: antigen and Rh factor — both must hold.',
      'O is the universal donor antigen; AB is the universal recipient.',
      'donors() and recipients() are mirror filters over all eight blood types.',
    ],
  },

  office_worker: {
    explanationAr: {
      intro: `يعلّمك هذا التمرين التحويلات، أي تحويل نص عادي إلى قيمة مركّبة كاملة.`,
      sections: [
        { heading: `الهدف`, body: `حوّل نصاً مفصولاً بفواصل مثل اسم، عمر، دور إلى قيمة OfficeWorker مركّبة، حيث يصير نصّ الدور فئة دور صحيحة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `البنية تحمل حقول الموظّف، والـ enum يسرد الأدوار الممكنة. والسمة From تصف كيف تبني نوعاً من آخر، وتنفيذها يتيح كتابة تحويلات تُقرأ بسلاسة. والدالة split تكسر النص عند فاصل، وparse تحوّل النص إلى رقم.` },
        { heading: `كيف يفكّر الحل`, body: `ننفّذ تحويلين. الأول يحوّل كلمة الدور إلى قيمة enum للدور، مع جعل الكلمات غير المعروفة ضيفاً افتراضياً. والثاني يقسّم السطر كاملاً إلى أجزائه الثلاثة ويبني الموظّف، محلّلاً العمر ومعيداً استعمال تحويل الدور. الصورة الذهنية خطّ تجميع، يدخله النص الخام، يُقطّع إلى أجزاء، ويُركّب كل جزء في الخانة الصحيحة من الموظّف المنتهي.` },
        { heading: `انتبه`, body: `يجب أن يطابق ترتيب الأجزاء المفصولة بفواصل كيف تقرأها، فالجزء الأول الاسم والثاني العمر والثالث الدور. وتحليل العمر قد يفشل على مدخل سيّئ، وهذه النسخة البسيطة تفترض ألا يحدث ذلك. وتوفير دور افتراضي معقول يمنع المدخلات المجهولة من كسر التحويل.` },
        { heading: `تذكّر`, body: `نفّذ From لتمنح نوعك طريقة نظيفة قابلة لإعادة الاستعمال ليُبنى من شيء آخر. وsplit ثم الوصول بالموقع هو الوصفة الأساسية لتحليل نص مفصول بسيط.` },
      ],
      walkthrough: [
        { code: `pub struct OfficeWorker {\n    pub name: String,\n    pub age: u32,\n    pub role: WorkerRole,\n}`, explain: `القيمة المنتهية تجمع اسماً وعمراً ودوراً تحت نوع واحد.` },
        { code: `pub enum WorkerRole {\n    Admin,\n    User,\n    Guest,\n}`, explain: `الدور مقيّد بهذه الاحتمالات المسمّاة، وهو ما يفرضه الـ enum.` },
        { code: `impl From<&str> for WorkerRole {\n    fn from(s: &str) -> Self {\n        match s {\n            "admin" => WorkerRole::Admin,\n            "user" => WorkerRole::User,\n            _ => WorkerRole::Guest,\n        }\n    }\n}`, explain: `يربط هذا التحويل كلمة الدور بقيمة دور، وحالة الشرطة السفلية تجعل أي كلمة غير معروفة تؤول إلى Guest افتراضياً.` },
        { code: `let parts: Vec<&str> = s.split(',').collect();\nOfficeWorker {\n    name: parts[0].to_string(),\n    age: parts[1].parse().unwrap(),\n    role: WorkerRole::from(parts[2]),\n}`, explain: `نقسّم السطر عند الفواصل إلى ثلاثة أجزاء، ثم نبني الموظّف: الجزء الأول الاسم، والثاني يُحلَّل إلى رقم للعمر، والثالث يُحوَّل إلى دور.` },
      ],
    },
    explanation: {
      intro: `This exercise teaches conversions, turning a plain string into a fully structured value.`,
      sections: [
        { heading: `The goal`, body: `Turn a comma separated string like name, age, role into a structured OfficeWorker value, where the role text becomes a proper role category.` },
        { heading: `Concepts you need`, body: `A struct holds the worker's fields, and an enum lists the possible roles. The From trait describes how to build one type from another, and implementing it lets us write conversions that read naturally. The split method breaks a string on a separator, and parse turns text into a number.` },
        { heading: `How the solution thinks`, body: `We implement two conversions. One turns a role word into a role enum value, defaulting unknown words to a guest. The other splits the whole line into its three parts and builds the worker, parsing the age and reusing the role conversion. The mental picture is an assembly line, where raw text goes in, gets cut into pieces, and each piece is fitted into the right slot of the finished worker.` },
        { heading: `Watch out for`, body: `The order of the comma separated parts must match how you read them, so the first piece is the name, the second the age, the third the role. Parsing the age can fail on bad input, which this simple version assumes will not happen. Providing a sensible default role keeps unknown inputs from breaking the conversion.` },
        { heading: `Remember this`, body: `Implement From to give your type a clean, reusable way to be built from something else. Split, then index, is the basic recipe for parsing simple delimited text.` },
      ],
      walkthrough: [
        { code: `pub struct OfficeWorker {\n    pub name: String,\n    pub age: u32,\n    pub role: WorkerRole,\n}`, explain: `The finished value groups a name, an age, and a role together under one type.` },
        { code: `pub enum WorkerRole {\n    Admin,\n    User,\n    Guest,\n}`, explain: `The role is restricted to these named possibilities, which an enum enforces.` },
        { code: `impl From<&str> for WorkerRole {\n    fn from(s: &str) -> Self {\n        match s {\n            "admin" => WorkerRole::Admin,\n            "user" => WorkerRole::User,\n            _ => WorkerRole::Guest,\n        }\n    }\n}`, explain: `This conversion maps a role word to a role value, and the underscore case makes any unrecognized word default to Guest.` },
        { code: `let parts: Vec<&str> = s.split(',').collect();\nOfficeWorker {\n    name: parts[0].to_string(),\n    age: parts[1].parse().unwrap(),\n    role: WorkerRole::from(parts[2]),\n}`, explain: `We split the line on commas into three parts, then build the worker: the first part is the name, the second is parsed into a number for the age, and the third is converted into a role.` },
      ],
    },
    expectedIO: {
      input: `&str  ("name,age,role")  via  OfficeWorker::from`,
      output: `OfficeWorker { name, age, role }`,
      behavior: `Parse a "name,age,role" string into an OfficeWorker; the role text maps to a WorkerRole enum variant.`,
      examples: [
        { input: `"Manuel,23,admin"`, output: `OfficeWorker { name: "Manuel", age: 23, role: Admin }` },
        { input: `"Jean Jacques,44,guest"`, output: `OfficeWorker { name: "Jean Jacques", age: 44, role: Guest }`, note: `spaces in name kept` },
      ],
    },
    ...zone01Cp3Learning.office_worker,
    documentation: {
      apis: [
        { name: 'From / Into', url: 'https://doc.rust-lang.org/std/convert/trait.From.html', note: 'ergonomic conversions from &str' },
        { name: 'str::split', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.split', note: 'break "name,age,role"' },
        { name: 'str::parse', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.parse', note: 'parse the age field' },
      ],
      links: [
        { title: 'Rust By Example — From and Into', url: 'https://doc.rust-lang.org/rust-by-example/conversion/from_into.html' },
        { title: 'The Book — Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html' },
      ],
    },
    editorHints: [
      'Implement From<&str> for the role: map "admin"/"user" and default everything else to Guest.',
      'Implement From<&str> for the worker by splitting on commas.',
      'Parse the age string into a number with .parse().',
    ],
  },

  matrix_display: {
    explanationAr: {
      intro: `يعلّمك هذا التمرين كيف تتحكّم في طريقة طباعة نوعك الخاص بتنفيذ السمة Display.`,
      sections: [
        { heading: `الهدف`, body: `اصنع نوع مصفوفة يُظهر عند طباعته كل صف في سطره الخاص محاطاً بقوسين، والأعداد مفصولة بمسافات.` },
        { heading: `المفاهيم التي تحتاجها`, body: `السمة مجموعة سلوكيات مشتركة يمكن لنوع تنفيذها، وDisplay هي التي تتحكّم في شكل القيمة عند طباعتها بالماكرو العادي. والماكرو write يرسل النص إلى المنسّق. والمرور على الصفوف ووصل النصوص يتيح بناء كل سطر ثم خياطتها معاً.` },
        { heading: `كيف يفكّر الحل`, body: `لكل صف نحوّل أعداده إلى نص، نصلها بمسافات، ونحيط الكل بقوسين. ثم نصل كل نصوص الصفوف بأسطر جديدة كي يقع كل صف في سطره، ونكتب ذلك إلى المنسّق. الصورة الذهنية تنسيق صف واحد في كل مرة ثم تكديس الصفوف.` },
        { heading: `انتبه`, body: `تنفيذ Display يعني الكتابة إلى المنسّق وإعادة نتيجته، لا الطباعة مباشرة. واستعمال write لا writeln في السطر الأخير يتفادى سطراً فارغاً زائداً. والوصل بأسطر جديدة، لا طباعة كل صف على حدة، يُبقي المخرج دقيقاً.` },
        { heading: `تذكّر`, body: `نفّذ Display لتقرّر كيف يظهر نوعك عند الطباعة. ابنِ القطع الصغيرة، الخلايا، إلى أكبر، الصفوف، ثم صِل الصفوف.` },
      ],
      walkthrough: [
        { code: `pub struct Matrix(pub Vec<Vec<i32>>);`, explain: `بنية وترية تغلّف قائمة من الصفوف، حيث كل صف نفسه قائمة أعداد. ويُوصل حقلها الوحيد بنقطة صفر.` },
        { code: `pub fn new(slice: &[&[i32]]) -> Self {\n    Matrix(slice.iter().map(|row| row.to_vec()).collect())\n}`, explain: `مُنشئ مريح ينسخ كل صف مُستعار إلى قائمة مملوكة، فيبني المصفوفة من الشرائح.` },
        { code: `impl fmt::Display for Matrix {\n    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {`, explain: `تنفيذ Display يعني كتابة دالة fmt هذه التي تتلقّى منسّقاً تكتب فيه النص وتُعيد هل نجحت الكتابة.` },
        { code: `let lines: Vec<String> = self.0.iter()\n    .map(|row| {\n        let cells: Vec<String> = row.iter().map(|n| n.to_string()).collect();\n        format!("({})", cells.join(" "))\n    })\n    .collect();`, explain: `لكل صف نحوّل أعداده إلى نص، نصلها بمسافات مفردة، ونحيط الناتج بقوسين، فينتج سطر منسّق واحد لكل صف.` },
        { code: `write!(f, "{}", lines.join("\\n"))`, explain: `نصل أسطر الصفوف بأسطر جديدة كي يقع كل صف في سطره، ونكتب الكتلة كاملةً إلى المنسّق. واستعمال write لا writeln يتفادى سطراً فارغاً إضافياً في النهاية.` },
      ],
    },
    explanation: {
      intro: `This exercise teaches you how to control how your own type prints by implementing the Display trait.`,
      sections: [
        { heading: `The goal`, body: `Make a matrix type that, when printed, shows each row on its own line wrapped in parentheses, with the numbers separated by spaces.` },
        { heading: `Concepts you need`, body: `A trait is a shared set of behaviours a type can implement, and Display is the one that controls how a value looks when printed with the normal print macro. The write macro sends text into the formatter. Mapping over rows and joining strings lets us build each line and stitch them together.` },
        { heading: `How the solution thinks`, body: `For each row we turn its numbers into text, join them with spaces, and wrap the whole thing in parentheses. Then we join all the row strings with newlines so each row sits on its own line, and write that to the formatter. The mental picture is formatting one row at a time, then stacking the rows.` },
        { heading: `Watch out for`, body: `Implementing Display means writing into the formatter and returning its result, not printing directly. Using write rather than writeln on the final line avoids a trailing blank line. Joining with newlines, rather than printing each row separately, keeps the output exact.` },
        { heading: `Remember this`, body: `Implement Display to decide how your type appears in print. Build small pieces, the cells, into bigger ones, the rows, then join the rows.` },
      ],
      walkthrough: [
        { code: `pub struct Matrix(pub Vec<Vec<i32>>);`, explain: `A tuple struct wrapping a list of rows, where each row is itself a list of numbers. The single field is reached as dot zero.` },
        { code: `pub fn new(slice: &[&[i32]]) -> Self {\n    Matrix(slice.iter().map(|row| row.to_vec()).collect())\n}`, explain: `A convenient constructor that copies each borrowed row into an owned list, building the matrix from slices.` },
        { code: `impl fmt::Display for Matrix {\n    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {`, explain: `Implementing Display means writing this fmt method, which receives a formatter to write text into and returns whether writing succeeded.` },
        { code: `let lines: Vec<String> = self.0.iter()\n    .map(|row| {\n        let cells: Vec<String> = row.iter().map(|n| n.to_string()).collect();\n        format!("({})", cells.join(" "))\n    })\n    .collect();`, explain: `For each row we turn its numbers into text, join them with single spaces, and wrap the result in parentheses, producing one formatted line per row.` },
        { code: `write!(f, "{}", lines.join("\\n"))`, explain: `We join the row lines with newlines so each row is on its own line, and write the whole block to the formatter. Using write, not writeln, avoids an extra blank line at the end.` },
      ],
    },
    expectedIO: {
      input: `Matrix(Vec<Vec<i32>>)  built via Matrix::new(&[&[i32]])`,
      output: `Display — each row as "(a b c)"`,
      behavior: `Implement Display so the matrix prints one row per line, values space-separated inside parentheses.`,
      examples: [
        { input: `Matrix::new(&[&[1, 2, 3], &[4, 5, 6], &[7, 8, 9]])`, output: `(1 2 3)\n(4 5 6)\n(7 8 9)` },
        { input: `Matrix::new(&[&[1, 2], &[3, 4]])`, output: `(1 2)\n(3 4)` },
        { input: `Matrix::new(&[&[1]])`, output: `(1)`, note: `single cell` },
      ],
    },
    ...zone01Cp3Learning.matrix_display,
    documentation: {
      apis: [
        { name: 'std::fmt::Display', url: 'https://doc.rust-lang.org/std/fmt/trait.Display.html', note: 'custom {} printing' },
        { name: 'write! macro', url: 'https://doc.rust-lang.org/std/macro.write.html', note: 'write into the formatter' },
        { name: 'slice::join / Iterator', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.join', note: 'join cells and rows' },
      ],
      links: [
        { title: 'Rust By Example — Display', url: 'https://doc.rust-lang.org/rust-by-example/hello/print/print_display.html' },
        { title: 'std::fmt module', url: 'https://doc.rust-lang.org/std/fmt/' },
      ],
      videos: [{ title: 'Traits in Rust', channel: 'Tensor Programming', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A' }],
    },
    editorHints: [
      'Implement Display and write into the formatter with write!(f, ...), never println!.',
      'Turn each row into "(a b c)": stringify the numbers and join with spaces.',
      'Join the row strings with newlines, with no trailing newline.',
    ],
  },

  queens: {
    explanationAr: {
      intro: `يُنمذج هذا التمرين ملكات الشطرنج ويعلّمك التحقّق وحيلة هندسية أنيقة للأقطار.`,
      sections: [
        { heading: `الهدف`, body: `ضع ملكتين على رقعة شطرنج وقرّر هل تستطيعان مهاجمة بعضهما، وهو ما يحدث حين تتشاركان صفاً أو عموداً أو قطراً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `البنية تحمل الموقع كرتبة وملفّ، وهما كلمتا الشطرنج للصف والعمود. وإعادة Option من المُنشئ تتيح رفض المواقع التي تقع خارج الرقعة. ودالة القيمة المطلقة ومساواة بسيطة تمنحاننا اختبار القطر.` },
        { heading: `كيف يفكّر الحل`, body: `أولاً نتأكّد أن الموقع على الرقعة، فنُعيد لا شيء إن لم يكن كذلك. ثم يفحص اختبار الهجوم ثلاثة أمور: نفس الرتبة، أو نفس الملفّ، أو نفس المسافة رأسياً وأفقياً. وهذا الشرط الأخير هو الجزء الذكي، لأن مربّعين يقعان على قطر تماماً حين يتساوى فرق رتبتيهما مع فرق ملفّيهما. الصورة الذهنية ملكة تطلق خطوطاً مستقيمة عرضاً ونزولاً وقطرياً، وتسأل هل تقع الملكة الأخرى على أي من تلك الخطوط.` },
        { heading: `انتبه`, body: `باستعمال مواقع بلا إشارة، قد يحدث الطرح نقصاً تحت الصفر، لذا نحوّل إلى أعداد بإشارة قبل أخذ الفروق. واختبار القطر يقارن الفروق المطلقة، لأن الملكتين قد تكونان بأي ترتيب. والتحقّق من حدود الرقعة في المُنشئ يمنع وجود مواقع مستحيلة أصلاً.` },
        { heading: `تذكّر`, body: `مربّعان قطريان حين تساوي فجوة الرتبة فجوة الملفّ. وحوّل إلى أعداد بإشارة قبل الطرح لتفادي النقص تحت الصفر.` },
      ],
      walkthrough: [
        { code: `pub fn new(rank: usize, file: usize) -> Option<Self> {\n    if rank < 8 && file < 8 {\n        Some(ChessPosition { rank, file })\n    } else {\n        None\n    }\n}`, explain: `لا ينجح المُنشئ إلا للإحداثيات على الرقعة ثمانية في ثمانية، فيُعيد الموقع داخل Some، أو None لأي شيء خارجها.` },
        { code: `pub fn can_attack(self, other: Self) -> bool {`, explain: `الدالة التي تجيب هل تستطيع هذه الملكة وأخرى مهاجمة بعضهما.` },
        { code: `let (r1, f1) = (self.position.rank as i64, self.position.file as i64);\nlet (r2, f2) = (other.position.rank as i64, other.position.file as i64);`, explain: `نستخرج إحداثيات الملكتين ونحوّلهما إلى أعداد بإشارة كي لا تُحدث الطروحات القادمة نقصاً تحت الصفر.` },
        { code: `r1 == r2 || f1 == f2 || (r1 - r2).abs() == (f1 - f2).abs()`, explain: `تهاجمان إن تشاركتا رتبة، أو ملفّاً، أو وقعتا على قطر. واختبار القطر صحيح حين تساوي الفجوة الرأسية الفجوة الأفقية. وهذه القيمة المنطقية هي قيمة الإرجاع.` },
      ],
    },
    explanation: {
      intro: `This exercise models chess queens and teaches validation plus a neat geometric trick for diagonals.`,
      sections: [
        { heading: `The goal`, body: `Place two queens on a chess board and decide whether they can attack each other, which happens when they share a row, a column, or a diagonal.` },
        { heading: `Concepts you need`, body: `A struct holds a position as a rank and file, the chess words for row and column. Returning an Option from the constructor lets us reject positions that fall off the board. The absolute value function and a simple equality give us the diagonal test.` },
        { heading: `How the solution thinks`, body: `First we make sure a position is on the board, returning nothing if it is not. Then the attack test checks three things: same rank, same file, or the same distance apart vertically and horizontally. That last condition is the clever part, because two squares are on a diagonal exactly when the difference in their rows equals the difference in their columns. The mental picture is a queen shooting straight lines across, down, and diagonally, and asking whether the other queen sits on any of those lines.` },
        { heading: `Watch out for`, body: `Using unsigned positions, subtracting can underflow, so we convert to signed numbers before taking differences. The diagonal check compares absolute differences, because the queens could be in either order. Validating the board bounds in the constructor keeps impossible positions from ever existing.` },
        { heading: `Remember this`, body: `Two squares are diagonal when the row gap equals the column gap. Convert to signed numbers before subtracting to avoid underflow.` },
      ],
      walkthrough: [
        { code: `pub fn new(rank: usize, file: usize) -> Option<Self> {\n    if rank < 8 && file < 8 {\n        Some(ChessPosition { rank, file })\n    } else {\n        None\n    }\n}`, explain: `The constructor only succeeds for coordinates on the eight by eight board, returning the position inside Some, or None for anything off the board.` },
        { code: `pub fn can_attack(self, other: Self) -> bool {`, explain: `The method that answers whether this queen and another can attack each other.` },
        { code: `let (r1, f1) = (self.position.rank as i64, self.position.file as i64);\nlet (r2, f2) = (other.position.rank as i64, other.position.file as i64);`, explain: `We pull out both queens' coordinates and convert them to signed numbers so the upcoming subtractions cannot underflow.` },
        { code: `r1 == r2 || f1 == f2 || (r1 - r2).abs() == (f1 - f2).abs()`, explain: `They attack if they share a rank, share a file, or sit on a diagonal. The diagonal test is true when the vertical gap equals the horizontal gap. This boolean is the return value.` },
      ],
    },
    expectedIO: {
      input: `two Queens at board positions (rank, file)`,
      output: `can_attack(other): bool`,
      behavior: `Two queens can attack each other if they share a rank, a file, or a diagonal.`,
      examples: [
        { input: `Queen(2, 2).can_attack(Queen(0, 4))`, output: `true`, note: `same diagonal` },
        { input: `Queen(1, 2).can_attack(Queen(0, 4))`, output: `false` },
        { input: `Queen(3, 1).can_attack(Queen(3, 7))`, output: `true`, note: `same rank` },
      ],
    },
    ...zone01Cp3Learning.queens,
    documentation: {
      apis: [
        { name: 'Option (constructor)', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'None for off-board squares' },
        { name: 'i64::abs', url: 'https://doc.rust-lang.org/std/primitive.i64.html#method.abs', note: 'diagonal distance' },
        { name: 'derive(Clone, Copy)', url: 'https://doc.rust-lang.org/std/marker/trait.Copy.html', note: 'cheap position values' },
      ],
      links: [
        { title: 'Rust By Example — Option', url: 'https://doc.rust-lang.org/rust-by-example/std/option.html' },
        { title: 'Eight queens puzzle', url: 'https://en.wikipedia.org/wiki/Eight_queens_puzzle' },
      ],
    },
    editorHints: [
      'ChessPosition::new returns Some only when rank and file are both < 8.',
      'Cast coordinates to i64 before subtracting so the difference can go negative.',
      'Queens attack on the same rank, file, or diagonal (equal absolute differences).',
    ],
  },

  drop_the_blog: {
    explanationAr: {
      intro: `هذا تمرين متقدّم عن الملكية، وقابلية التغيير الداخلية، ولحظة إتلاف القيمة.`,
      sections: [
        { heading: `الهدف`, body: `ابنِ مدوّنة تتعقّب مقالاتها، واجعل كل مقال يُبلّغ المدوّنة تلقائياً حين يُسقَط، أي حين يخرج من النطاق ويُتلَف.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الملكية تعني أن لكل قيمة مالكاً واضحاً تُنظَّف حين يزول مالكها. والسمة Drop تتيح تشغيل كود في لحظة التنظيف تلك بالضبط. وCell وRefCell توفّران قابلية التغيير الداخلية، أي طريقة لتغيير البيانات حتى عبر مرجع مشترك، وهو ما نحتاجه لأن المقالات تحمل مرجعاً مشتركاً فقط للمدوّنة. وCell تحمل قيمة بسيطة قابلة للنسخ، بينما RefCell تحرس شيئاً أكبر.` },
        { heading: `كيف يفكّر الحل`, body: `يحمل كل مقال معرّفه ومرجعاً مشتركاً عائداً إلى مدوّنته. وتحتفظ المدوّنة بعدّاد للإسقاطات وقائمة بأي المقالات أُسقطت. وحين يُتلَف مقال، تستدعي رست كود الإسقاط تلقائياً، فيُخبر المدوّنة لتعلّم ذلك المعرّف وتزيد العدّاد. الصورة الذهنية كل مقال يمسك خيطاً عائداً إلى أبيه، ويشدّ ذلك الخيط وهو يختفي كي تعلم المدوّنة.` },
        { heading: `انتبه`, body: `هذا متقدّم فعلاً، فلا تقلق إن بدا صعباً. والفكرة المفتاح أن الإسقاط يجري تلقائياً ولا تستدعيه أنت بنفسك أبداً. وقابلية التغيير الداخلية لازمة لأنك لا تستطيع عادةً تغيير شيء عبر مرجع مشترك. وتجاهل المقال ببساطة يدعه يخرج من النطاق، وهو ما يُطلق الإسقاط.` },
        { heading: `تذكّر`, body: `السمة Drop هي خطّافك إلى لحظة التنظيف. وCell وRefCell تتيحان لك التغيير عبر مرجع مشترك حين تمنع قواعد الملكية ذلك لولاهما.` },
      ],
      walkthrough: [
        { code: `pub struct Blog {\n    pub drops: Cell<usize>,\n    pub states: RefCell<Vec<bool>>,\n}`, explain: `تخزّن المدوّنة عدّاد إسقاطات في Cell وقائمة أعلام مُسقَطة في RefCell. وكلا الغلافين يتيح التغيير حتى حين تكون المدوّنة مشتركة لا مملوكة من المقالات.` },
        { code: `pub fn new_article(&self, body: String) -> (usize, Article<'_>) {\n    let id = self.new_id();\n    self.states.borrow_mut().push(false);\n    (id, Article::new(id, body, self))\n}`, explain: `إنشاء مقال يمنحه المعرّف التالي، يسجّله كغير مُسقَط بعد، ويُعيد مقالاً يحمل مرجعاً لهذه المدوّنة. واستدعاء borrow_mut يفتح RefCell مؤقتاً كي ندفع.` },
        { code: `self.states.borrow_mut()[id] = true;\nself.drops.set(self.drops.get() + 1);`, explain: `حين تُخبَر بأن مقالاً أُسقط، تعلّم المدوّنة ذلك المعرّف كمُسقَط وتزيد عدّادها واحداً، قارئةً وكاتبةً Cell بـ get وset.` },
        { code: `impl<'a> Drop for Article<'a> {\n    fn drop(&mut self) {\n        self.parent.add_drop(self.id);\n    }\n}`, explain: `هذا قلب التمرين. حين يُتلَف مقال، تستدعي رست دالة drop هذه تلقائياً، فتُبلّغ معرّف المقال عائداً إلى المدوّنة. ولا تستدعيها أنت بنفسك أبداً.` },
      ],
    },
    explanation: {
      intro: `This is an advanced exercise about ownership, interior mutability, and the moment a value is destroyed.`,
      sections: [
        { heading: `The goal`, body: `Build a blog that tracks its articles, and have each article automatically report back to the blog when it is dropped, that is, when it goes out of scope and is destroyed.` },
        { heading: `Concepts you need`, body: `Ownership means each value has a clear owner and is cleaned up when the owner goes away. The Drop trait lets you run code at that exact cleanup moment. Cell and RefCell provide interior mutability, a way to change data even through a shared reference, which we need because the articles only hold a shared reference to the blog. A Cell holds a simple copyable value, while a RefCell guards something larger.` },
        { heading: `How the solution thinks`, body: `Each article carries its id and a shared reference back to its blog. The blog keeps a counter of drops and a list of which articles have been dropped. When an article is destroyed, Rust automatically calls our drop code, which tells the blog to mark that id and bump the counter. The mental picture is every article holding a string back to its parent, and tugging that string as it disappears so the blog knows.` },
        { heading: `Watch out for`, body: `This is genuinely advanced, so do not worry if it feels hard. The key insight is that drop runs automatically and you never call it yourself. Interior mutability is needed because you cannot normally change something through a shared reference. Discarding an article simply lets it go out of scope, which triggers the drop.` },
        { heading: `Remember this`, body: `The Drop trait is your hook into the cleanup moment. Cell and RefCell let you mutate through a shared reference when ownership rules would otherwise forbid it.` },
      ],
      walkthrough: [
        { code: `pub struct Blog {\n    pub drops: Cell<usize>,\n    pub states: RefCell<Vec<bool>>,\n}`, explain: `The blog stores a drop counter in a Cell and a list of dropped flags in a RefCell. Both wrappers allow changes even when the blog is only shared, not owned, by the articles.` },
        { code: `pub fn new_article(&self, body: String) -> (usize, Article<'_>) {\n    let id = self.new_id();\n    self.states.borrow_mut().push(false);\n    (id, Article::new(id, body, self))\n}`, explain: `Creating an article gives it the next id, records it as not yet dropped, and hands back an article that holds a reference to this blog. The borrow mut call temporarily unlocks the RefCell so we can push.` },
        { code: `self.states.borrow_mut()[id] = true;\nself.drops.set(self.drops.get() + 1);`, explain: `When told an article was dropped, the blog marks that id as dropped and increases its counter by one, reading and writing the Cell with get and set.` },
        { code: `impl<'a> Drop for Article<'a> {\n    fn drop(&mut self) {\n        self.parent.add_drop(self.id);\n    }\n}`, explain: `This is the heart of the exercise. When an article is destroyed, Rust automatically calls this drop method, which reports the article's id back to the blog. You never call it yourself.` },
      ],
    },
    expectedIO: {
      input: `Blog + Article handles (new_article, discard, is_dropped, drops)`,
      output: `is_dropped(id): bool · drops: Cell<usize> counter`,
      behavior: `A blog tracks its articles. Discarding (dropping) an article marks it dropped and bumps the shared drop counter; is_dropped(id) reports a given article's state.`,
      examples: [
        { input: `new_article → discard → (is_dropped(id), id, &drops)`, output: `(true, 0, Cell { value: 1 })` },
        { input: `discard a 2nd article → (is_dropped(id1), id1, &drops)`, output: `(true, 1, Cell { value: 2 })` },
        { input: `3rd article still alive via Rc clone`, output: `(false, 2, Cell { value: 2 }, 1)`, note: `not dropped` },
      ],
    },
    ...zone01Cp3Learning.drop_the_blog,
    documentation: {
      apis: [
        { name: 'std::ops::Drop', url: 'https://doc.rust-lang.org/std/ops/trait.Drop.html', note: 'run code at end of scope' },
        { name: 'std::cell::Cell', url: 'https://doc.rust-lang.org/std/cell/struct.Cell.html', note: 'mutate a Copy counter via &self' },
        { name: 'std::cell::RefCell', url: 'https://doc.rust-lang.org/std/cell/struct.RefCell.html', note: 'mutate the states vec via &self' },
      ],
      links: [
        { title: 'The Book — Interior mutability', url: 'https://doc.rust-lang.org/book/ch15-05-interior-mutability.html' },
        { title: 'The Book — Running code on cleanup with Drop', url: 'https://doc.rust-lang.org/book/ch15-03-drop.html' },
      ],
      videos: [{ title: 'Smart Pointers & Interior Mutability', channel: 'Jon Gjengset', url: 'https://www.youtube.com/watch?v=8O0Nt9qY_vo' }],
    },
    editorHints: [
      'Store the counter in a Cell and the per-article state in a RefCell for interior mutability.',
      'Article holds a reference to its parent Blog (a lifetime parameter).',
      'Implement Drop for Article so dropping it records the drop on the parent.',
    ],
  },

  lunch_queue: {
    explanationAr: {
      intro: `يبني هذا التمرين قائمة مترابطة يدوياً، وهي أفضل طريقة لفهم المؤشّرات والملكية فهماً حقيقياً.`,
      sections: [
        { heading: `الهدف`, body: `ابنِ طابوراً من الأشخاص كقائمة مترابطة، حيث يشير كل شخص إلى التالي، وادعم الإضافة والإزالة والبحث وعكس السلسلة كاملةً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `القائمة المترابطة سلسلة تحمل فيها كل عقدة قيمة ورابطاً إلى العقدة التالية. والرابط هو Option من عقدة مغلّفة بـ Box، حيث يضع Box العقدة على الكومة وتتيح Option أن تكون نهاية السلسلة لا شيء. والدالة take تنتزع قيمة وتترك مكانها لا شيء، وهي أساسية لتحريك العقد بأمان.` },
        { heading: `كيف يفكّر الحل`, body: `إضافة شخص تصنع عقدة جديدة رابطها التالي هو المقدّمة القديمة، ثم تجعلها المقدّمة الجديدة، وهي دفعة سريعة عند الرأس. والعكس يمشي على السلسلة قالباً كل رابط تالٍ ليشير للخلف. والإزالة من النهاية تمشي إلى الآخر وتفصله. والبحث يمشي على السلسلة مقارناً الأسماء. الصورة الذهنية سلسلة ورقية من أشخاص ممسكين أيديهم، حيث تفكّ وتعيد ربط الأيدي بعناية لإعادة الترتيب.` },
        { heading: `انتبه`, body: `تجعل الملكية القوائم المترابطة شهيرة الصعوبة في رست، لأنه لا يمكن أن يكون لعقدة واحدة مالكان. والدالة take هي الأداة المفتاح، إذ تتيح نقل عقدة من رابط وترك لا شيء مكانها كي يبقى فاحص الاستعارة راضياً. والعكس يحتاج ثلاثة مؤشّرات، السابق والحالي والتالي، كي لا تفقد بقية السلسلة.` },
        { heading: `تذكّر`, body: `العقدة المترابطة قيمة زائد رابط إلى التالي، والرابط عقدة اختيارية مغلّفة. واستخدم take لتحريك العقد دون كسر قواعد الملكية.` },
      ],
      walkthrough: [
        { code: `pub struct Queue {\n    pub node: Link,\n}\n\npub type Link = Option<Box<Person>>;`, explain: `الطابور مجرد رابط واحد إلى أول شخص. والرابط إما لا شيء، وهو النهاية الفارغة، أو شخص مغلّف على الكومة.` },
        { code: `pub struct Person {\n    pub name: String,\n    pub discount: i32,\n    pub next_person: Link,\n}`, explain: `كل شخص يحمل بياناته ورابطاً إلى الشخص التالي، وهو ما يكوّن السلسلة.` },
        { code: `pub fn add(&mut self, name: String, discount: i32) {\n    let person = Box::new(Person { name, discount, next_person: self.node.take() });\n    self.node = Some(person);\n}`, explain: `نبني شخصاً جديداً رابطه التالي هو المقدّمة الحالية، المنتزَعة بـ take، ثم نجعل الشخص الجديد المقدّمة. هذا يضيف عند رأس السلسلة.` },
        { code: `pub fn invert_queue(&mut self) {\n    let mut prev: Link = None;\n    let mut current = self.node.take();\n    while let Some(mut boxed) = current {\n        current = boxed.next_person.take();\n        boxed.next_person = prev;\n        prev = Some(boxed);\n    }\n    self.node = prev;\n}`, explain: `العكس يمشي على السلسلة بثلاثة روابط. نفصل العقدة التالية، نوجّه العقدة الحالية للخلف نحو السابقة، ثم نتقدّم. وفي النهاية تكون السابقة هي المقدّمة الجديدة. والدالة take هي ما يتيح لنا نقل العقد دون انتهاك الملكية.` },
        { code: `pub fn search(&self, name: &str) -> Option<(&String, &i32)> {\n    let mut current = self.node.as_ref();\n    while let Some(person) = current {\n        if person.name == name {\n            return Some((&person.name, &person.discount));\n        }\n        current = person.next_person.as_ref();\n    }\n    None\n}`, explain: `نمشي على السلسلة باستعارة كل عقدة بـ as_ref، مقارنين الأسماء. فإن وجدنا تطابقاً أعدنا مراجع إلى بياناته، وإلا بلغنا النهاية وأعدنا None.` },
      ],
    },
    explanation: {
      intro: `This exercise builds a linked list by hand, which is the best way to truly understand pointers and ownership.`,
      sections: [
        { heading: `The goal`, body: `Build a queue of people as a linked list, where each person points to the next, and support adding, removing, searching, and reversing the whole chain.` },
        { heading: `Concepts you need`, body: `A linked list is a chain where each node holds a value and a link to the next node. A link is an Option of a boxed node, where Box puts the node on the heap and Option allows the end of the chain to be nothing. The take method swaps a value out and leaves nothing behind, which is essential for safely moving nodes around.` },
        { heading: `How the solution thinks`, body: `Adding a person makes a new node whose next link is the old front, then makes it the new front, which is a quick push at the head. Reversing walks the chain, flipping each next link to point backward. Removing the last person walks to the end and detaches it. Searching walks the chain comparing names. The mental picture is a paper chain of people holding hands, where you carefully unlink and relink hands to rearrange them.` },
        { heading: `Watch out for`, body: `Ownership makes linked lists famously tricky in Rust, because you cannot have two owners of the same node. The take method is the key tool, letting you move a node out of a link and leave nothing there so the borrow checker stays happy. Reversing requires three pointers, previous, current, and next, so you do not lose the rest of the chain.` },
        { heading: `Remember this`, body: `A linked node is a value plus a link to the next, and a link is an optional boxed node. Use take to move nodes without breaking ownership rules.` },
      ],
      walkthrough: [
        { code: `pub struct Queue {\n    pub node: Link,\n}\n\npub type Link = Option<Box<Person>>;`, explain: `The queue is just a single link to the first person. A Link is either nothing, the empty end, or a boxed person stored on the heap.` },
        { code: `pub struct Person {\n    pub name: String,\n    pub discount: i32,\n    pub next_person: Link,\n}`, explain: `Each person holds their data and a link to the next person, which is what forms the chain.` },
        { code: `pub fn add(&mut self, name: String, discount: i32) {\n    let person = Box::new(Person { name, discount, next_person: self.node.take() });\n    self.node = Some(person);\n}`, explain: `We build a new person whose next link is the current front, taken out with take, then make the new person the front. This adds at the head of the chain.` },
        { code: `pub fn invert_queue(&mut self) {\n    let mut prev: Link = None;\n    let mut current = self.node.take();\n    while let Some(mut boxed) = current {\n        current = boxed.next_person.take();\n        boxed.next_person = prev;\n        prev = Some(boxed);\n    }\n    self.node = prev;\n}`, explain: `Reversing walks the chain with three links. We detach the next node, point the current node backward at the previous one, then advance. At the end, previous is the new front. The take method is what lets us move nodes without violating ownership.` },
        { code: `pub fn search(&self, name: &str) -> Option<(&String, &i32)> {\n    let mut current = self.node.as_ref();\n    while let Some(person) = current {\n        if person.name == name {\n            return Some((&person.name, &person.discount));\n        }\n        current = person.next_person.as_ref();\n    }\n    None\n}`, explain: `We walk the chain by borrowing each node with as ref, comparing names. If we find a match we return references to its data, otherwise we reach the end and return None.` },
      ],
    },
    expectedIO: {
      input: `Queue (linked list) + add(name, discount), rm(), search(name), invert_queue()`,
      output: `rm()/search(): Option<(String, i32)> · Debug prints the chain`,
      behavior: `A singly-linked queue of people: add appends to the back, rm removes the front, search finds a person by name, invert_queue reverses the order.`,
      examples: [
        { input: `add Marie/Monica/Ana/Alice; search("Marie")`, output: `Some(("Marie", 20))` },
        { input: `search("someone")`, output: `None`, note: `not in the queue` },
        { input: `rm()`, output: `Some(("Marie", 20))`, note: `removes the front` },
      ],
    },
    ...zone01Cp3Learning.lunch_queue,
    documentation: {
      apis: [
        { name: 'Option::take', url: 'https://doc.rust-lang.org/std/option/enum.Option.html#method.take', note: 'move a node out, leaving None' },
        { name: 'Box<T>', url: 'https://doc.rust-lang.org/std/boxed/struct.Box.html', note: 'size the recursive Person type' },
        { name: 'Option::as_ref / as_mut', url: 'https://doc.rust-lang.org/std/option/enum.Option.html#method.as_ref', note: 'walk the list by reference' },
      ],
      links: [
        { title: 'The Book — Box and recursive types', url: 'https://doc.rust-lang.org/book/ch15-01-box.html' },
        { title: 'Learning Rust With Entirely Too Many Linked Lists', url: 'https://rust-unofficial.github.io/too-many-lists/' },
      ],
      videos: [{ title: 'Smart Pointers & Interior Mutability', channel: 'Jon Gjengset', url: 'https://www.youtube.com/watch?v=8O0Nt9qY_vo' }],
    },
    editorHints: [
      'The queue is a singly linked list of Option<Box<Person>>; add() inserts at the front.',
      'Use Option::take() to move nodes out of &mut self without fighting the borrow checker.',
      'rm() is FIFO — remove the oldest (the tail); invert_queue() reverses the next pointers.',
    ],
  },

  // -------------------------------------------------------------------------
  // NEW Final-only slugs — full guided content.
  // -------------------------------------------------------------------------
  count_factorial_steps: {
    explanationAr: {
      intro: `المضروب هو ناتج ضرب 1 في 2 في 3 وهكذا. وهذا التمرين يعكس الفكرة، إذ ينطلق من الناتج ليكتشف من أين جاء.`,
      sections: [
        { heading: `الهدف`, body: `يُعطى لك رقم ويُطرح السؤال: هل هذا الرقم مضروبٌ لعددٍ ما، وإن كان كذلك فلأي عدد؟ مثلاً 720 هو مضروب 6، لأن حاصل ضرب الأعداد من 1 إلى 6 يساوي 720، فتُعيد 6. وإن لم يكن الرقم مضروباً لأي عدد فإنك تُعيد صفراً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الحلقة تكرّر تنفيذ كتلة من الكود مرات عديدة. والمتغيّر القابل للتغيير هو متغيّر يُسمح لك بتعديله أثناء عمل الحلقة، ويُعلَّم بالكلمة mut. ومضروب العدد يعني ضرب كل الأعداد الصحيحة من 1 حتى ذلك العدد. سنعيد بناء المضاريب خطوة بخطوة ونترقّب التطابق.` },
        { heading: `كيف يفكّر الحل`, body: `بدل التخمين، نُنمّي حاصل ضرب متزايداً: 1، ثم 1 في 2، ثم في 3، ونعدّ عدد الخطوات. نتوقف فور أن يبلغ الحاصل الهدف أو يتجاوزه. فإن وقف عند الهدف تماماً كان عدد الخطوات هو الجواب، وإن تجاوزه فالهدف ليس مضروباً أصلاً فنُعيد صفراً. الصورة الذهنية هي صعود درج المضاريب حتى تقف على الرقم أو تتخطّاه.` },
        { heading: `انتبه`, body: `الرقمان 0 و1 حالة خاصة، إذ إن مضروب 0 ومضروب 1 كلاهما يساوي 1، ويعتبرهما التمرين صفر خطوات فنُعيد صفراً مبكّراً. ومن الأخطاء الشائعة استعمال نوع عددي صغير جداً، لأن المضاريب تكبر بسرعة هائلة وتتجاوز السعة، ولذلك نستخدم النوع الكبير u64.` },
        { heading: `تذكّر`, body: `ابنِ ثم قارن. حين يسأل التمرين هل تنتمي قيمة إلى متتالية، يكون توليد المتتالية حتى تبلغ القيمة أو تتجاوزها أسهل من العمل بالعكس.` },
      ],
      walkthrough: [
        { code: `if factorial <= 1 {\n    return 0;\n}`, explain: `يعالج هذا السطر الحالتين الصغيرتين الخاصتين، فمضروب 0 ومضروب 1 كلاهما يساوي 1 ويعدّهما التمرين صفر خطوات. والإرجاع المبكّر يُبقي الحلقة الرئيسية بسيطة.` },
        { code: `let mut product = 1u64;\nlet mut i = 1u64;`, explain: `نُهيّئ قيمتين قابلتين للتغيير: product يحمل المضروب الذي نبنيه ويبدأ من واحد، وi يعدّ كم عدداً ضربنا. واللاحقة u64 تعني أنهما عددان صحيحان بلا إشارة بسعة 64 بت، تكفي للمضاريب سريعة النمو.` },
        { code: `while product < factorial {\n    i += 1;\n    product *= i;\n}`, explain: `ما دام حاصلنا أصغر من الهدف، ننتقل إلى العدد التالي ونضربه. هذا بالضبط بناء مضروب بعد آخر، وتتوقف الحلقة لحظة بلوغ الحاصل الهدف أو تجاوزه.` },
        { code: `if product == factorial { i } else { 0 }`, explain: `بعد الحلقة، إن وقف حاصلنا على الهدف تماماً فإن i هو عدد الخطوات فنُعيده، وإلا فقد تجاوزناه أي أن الهدف ليس مضروباً فنُعيد صفراً. ولا توجد فاصلة منقوطة، لذا فهذه قيمة إرجاع الدالة.` },
      ],
    },
    explanation: {
      intro: `A factorial is what you get when you multiply 1 times 2 times 3 and so on. This exercise runs that idea backwards.`,
      sections: [
        { heading: `The goal`, body: `You are handed a number and asked a question: is this number a factorial, and if so, of what? For example 720 is 6 factorial, because 1 times 2 times 3 times 4 times 5 times 6 equals 720, so you must return 6. If the number is not a factorial at all, you return 0.` },
        { heading: `Concepts you need`, body: `A loop repeats a block of code many times. A mutable variable is one you are allowed to change as the loop runs, marked with the keyword mut. The factorial of n means multiplying every whole number from 1 up to n. We will rebuild factorials step by step and watch for a match.` },
        { heading: `How the solution thinks`, body: `Instead of guessing, we grow a running product: 1, then 1 times 2, then times 3, and so on, counting how many steps we took. We stop as soon as the product reaches or passes the target. If it landed exactly on the target, the number of steps is our answer. If it overshot, the target was never a factorial, so we return 0. The mental picture is climbing factorial stairs until you either land on the number or step over it.` },
        { heading: `Watch out for`, body: `The numbers 0 and 1 are special, because both 0 factorial and 1 factorial equal 1, and the exercise treats these as zero steps, so we return 0 early. A common mistake is using a too small integer type, because factorials grow extremely fast and overflow quickly, which is why we use the large u64 type.` },
        { heading: `Remember this`, body: `Build up, then compare. When a problem asks whether a value belongs to a sequence, it is often easier to generate the sequence until you reach or pass the value than to work backwards.` },
      ],
      walkthrough: [
        { code: `if factorial <= 1 {\n    return 0;\n}`, explain: `This handles the special small cases up front, since both zero factorial and one factorial equal one, and the exercise counts those as zero steps. Returning early also keeps the main loop simple.` },
        { code: `let mut product = 1u64;\nlet mut i = 1u64;`, explain: `We set up two changeable values: product holds the factorial we are building, starting at one, and i counts how many numbers we have multiplied in. The little u64 marker says these are 64 bit unsigned integers, big enough for fast growing factorials.` },
        { code: `while product < factorial {\n    i += 1;\n    product *= i;\n}`, explain: `As long as our product is still smaller than the target, we step to the next number and multiply it in. This is exactly building one factorial after another, and the loop stops the moment product reaches or passes the target.` },
        { code: `if product == factorial { i } else { 0 }`, explain: `After the loop, if our product landed exactly on the target then i is how many steps it took, so we return it. Otherwise we overshot, which means the target was never a factorial, so we return zero. There is no semicolon, so this is the function's return value.` },
      ],
    },
    expectedIO: {
      input: `factorial: u64`,
      output: `u64`,
      behavior: `Given a number that is a factorial, return the n where n! == factorial. Return 0 when the input isn't a factorial.`,
      examples: [
        { input: `720`, output: `6`, note: `6! = 720` },
        { input: `6`, output: `3`, note: `3! = 6` },
        { input: `13`, output: `0`, note: `not a factorial` },
      ],
    },
    overview: {
      whatYouBuild:
        'A function that, given a factorial value, returns how many multiplications produced it — i.e. the n in n!. If the value is not a factorial, or is 0 or 1, it returns 0.',
      inputOutput:
        'Input: a u64 factorial. Output: a u64 step count. 720 -> 6 (6!), 6 -> 3 (3!), 13 -> 0 (not a factorial).',
      constraints: [
        '0 and 1 return 0.',
        'A value that is not exactly some n! returns 0.',
        'Rebuild the factorial by multiplying 1*2*3*... and count the steps.',
      ],
      commonMistakes: [
        'Returning the loop counter even when the product overshot the target (not a factorial).',
        'Off-by-one in the step count (the multiply by i is step i).',
        'Forgetting the 0/1 edge cases.',
      ],
    },
    officialDescription: `## count_factorial_steps

Create a function count_factorial_steps that receives a factorial number and counts how many multiplications are necessary to reach it. If the argument is not a factorial, or it is 0 or 1, the function returns 0.

The factorial of a number is the product of all integers from 1 to that number, e.g. 6! = 1*2*3*4*5*6 = 720, so the factorial steps of 720 are 6.

### Expected function

~~~
pub fn count_factorial_steps(factorial: u64) -> u64
~~~

### Usage

count_factorial_steps(720) = 6, count_factorial_steps(13) = 0, count_factorial_steps(6) = 3.`,
    objectives: {
      learn: ['Rebuild a value with a multiplying loop.', 'Detect a non-factorial by overshoot.', 'Handle edge cases up front.'],
      whyExists: 'It connects factorials to iteration and teaches careful loop termination and validation.',
      rustSkills: ['loops', 'integer math', 'validation'],
    },
    conceptIds: ['recursion', 'error_handling'],
    conceptNotes: {
      recursion: 'Factorials are the classic recursion example; here we rebuild one iteratively and count the multiplications.',
      error_handling: 'A value that is not exactly some n! is rejected by returning 0.',
    },
    similar: {
      title: 'Powers of two',
      prompt:
        'Write a function that returns how many times you can double 1 to reach n (or 0 if n is not a power of two). Same "rebuild and count, reject on overshoot" pattern.',
      starter: `pub fn steps_to_pow2(n: u64) -> u64 {
    // double from 1, counting steps, until you reach or pass n
    todo!()
}`,
      hint: 'Keep a product and a counter; stop when product >= n; return the count only if product == n.',
      concepts: ['recursion', 'error_handling'],
      solution: `pub fn steps_to_pow2(n: u64) -> u64 {
    if n < 1 { return 0; }
    let mut p = 1u64; let mut steps = 0u64;
    while p < n { p *= 2; steps += 1; }
    if p == n { steps } else { 0 }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Handle the trivial inputs first. Fill the condition that returns 0 immediately.',
        template: `if _____ {
    return 0;
}`,
        accepted: ['factorial <= 1'],
        acceptedPatterns: ['^factorial\\s*<=\\s*1$'],
        hints: ['0! and 1! are both 1.', 'Reject factorial <= 1.'],
        explanation: 'Per the spec, 0 and 1 return 0, so we bail out before the loop.',
        whatYouLearned: 'Guard edge cases before the main logic.',
        conceptId: 'error_handling',
      },
      {
        prompt: 'Rebuild the factorial. Fill the line that grows the product on each step.',
        template: `while product < factorial {
    i += 1;
    _____;
}`,
        accepted: ['product *= i'],
        acceptedPatterns: ['^product\\s*\\*=\\s*i$'],
        hints: ['Multiply the running product by the new i.', 'product *= i.'],
        explanation: 'Each step multiplies the product by the next integer i, rebuilding 1*2*3*...',
        whatYouLearned: 'A running product reconstructs a factorial step by step.',
        conceptId: 'recursion',
      },
      {
        kind: 'choice',
        prompt: 'count_factorial_steps(13) should return what, and why?',
        options: ['0, because 13 is not a factorial', '13, because it is the input', '6, because 6! = 720', '1, because 1! = 1'],
        correct: [0],
        why: [
          '13 lies between 6 (3!) and 24 (4!), so no n! equals 13 — return 0.',
          'The function returns a step count, not the input.',
          '720, not 13, has 6 steps.',
          '13 is not 1.',
        ],
        hints: ['Is 13 equal to any factorial?', '3! = 6 and 4! = 24.'],
        explanation: 'The product jumps 1, 2, 6, 24 — it never equals 13, so the function returns 0.',
        whatYouLearned: 'Non-factorials are detected when the product overshoots without matching.',
        conceptId: 'error_handling',
      },
      {
        kind: 'bug',
        prompt: 'This returns the wrong answer for non-factorials. Click the mistake.',
        code: `while product < factorial {
    i += 1;
    product *= i;
}
return i;`,
        bugs: [{ line: 5, token: 'i' }],
        hints: [
          'What if the product overshot the target?',
          'You must confirm product == factorial before returning i.',
        ],
        explanation: 'Returning i unconditionally reports a step count even for non-factorials. Return i only if product == factorial, otherwise 0.',
        whatYouLearned: 'Validate the result before returning it.',
        conceptId: 'error_handling',
      },
      {
        kind: 'order',
        prompt: 'Assemble count_factorial_steps. One fragment does not belong.',
        scaffold: `pub fn count_factorial_steps(factorial: u64) -> u64 {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
    [ slot 4 ]
}`,
        fragments: [
          'if factorial <= 1 { return 0; }',
          'let mut product = 1u64; let mut i = 1u64;',
          'while product < factorial { i += 1; product *= i; }',
          'if product == factorial { i } else { 0 }',
        ],
        distractors: ['return factorial;'],
        hints: ['Edge case, then set up, then multiply-loop, then the validated answer.', 'The last line must check product == factorial.'],
        explanation: 'Reject 0/1, set product and i to 1, multiply up until product reaches factorial, then return i only if it matched exactly.',
        whatYouLearned: 'Validate-setup-loop-return is a robust shape for "rebuild and count".',
        conceptId: 'recursion',
      },
    ],
    documentation: {
      apis: [
        { name: 'u64 arithmetic', url: 'https://doc.rust-lang.org/std/primitive.u64.html', note: 'multiply the running product' },
        { name: 'while loops', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html', note: 'rebuild the factorial' },
      ],
      links: [
        { title: 'The Book — Control flow', url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html' },
        { title: 'Factorial (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Factorial' },
      ],
    },
    editorHints: [
      'Return 0 immediately for factorial <= 1.',
      'Multiply a running product by 2, 3, 4, ... counting each step.',
      'Only return the count if the product landed exactly on the target.',
    ],
  },

  matrix_multiplication: {
    explanationAr: {
      intro: `هذه أول تجربة لك في بناء نوع بيانات خاص بك في لغة رست ومنحه سلوكاً.`,
      sections: [
        { heading: `الهدف`, body: `المصفوفة 2×2 هي مجرد أربعة أعداد مرتّبة في صفّين. تُعرّف نوعاً يحملها، ثم تكتب دالة تضرب كل عدد من هذه الأربعة في العدد القياسي نفسه وتُعيد مصفوفة جديدة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `البنية نوع مخصّص يجمع قيماً مترابطة. والبنية الوترية بنية بلا أسماء لحقولها، فتصل إليها بالموقع باستخدام نقطة صفر ونقطة واحد وهكذا. والعدد القياسي هو رقم واحد تضرب فيه كل شيء. وسطر derive يطلب من رست أن يكتب تلقائياً بعض السلوك القياسي لنوعنا مثل القابلية للطباعة والمقارنة.` },
        { heading: `كيف يفكّر الحل`, body: `تُخزَّن المصفوفة كصفّين، وكل صفّ زوج من الأعداد، فالكل زوج من الأزواج. لضربها نصل إلى كل عدد من الأربعة بموقعه، نضربه في العدد القياسي، ونضع الناتج في مصفوفة جديدة تماماً. لا نغيّر الأصل بل نبني نسخة جديدة. الصورة الذهنية شبكة تلمس كل خلية فيها مرة واحدة وتضربها.` },
        { heading: `انتبه`, body: `أكبر فخّ للمبتدئ نسيان أن هذه بنية وترية، فالوصول إلى الحقول يكون بالموقع مثل m نقطة 0 نقطة 0، لا بالأسماء مثل m نقطة a. والقالب لا يتضمّن النوع، فعليك تعريفه بنفسك. وتذكّر اشتقاق Debug ليمكن طباعة المصفوفة، وEq لتمكن مقارنتها.` },
        { heading: `تذكّر`, body: `الوصول بالموقع يُقرأ من الخارج إلى الداخل. فـ m نقطة 0 هو الصف الأول، وm نقطة 0 نقطة 0 هو العدد الأول في ذلك الصف.` },
      ],
      walkthrough: [
        { code: `#[derive(Debug, PartialEq, Eq)]\npub struct Matrix((i32, i32), (i32, i32));`, explain: `يُعرّف هذا نوع Matrix بنيةً وترية تحمل زوجين من الأعداد الصحيحة هما الصفّان. وسطر derive يطلب توليد القدرة على الطباعة والمقارنة اللتين تعتمد عليهما الاختبارات. وبدون تعريف هذا النوع لن يُترجَم الكود أصلاً.` },
        { code: `pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {`, explain: `تأخذ الدالة Matrix بالقيمة وعدداً صحيحاً للضرب، وتَعِد بإرجاع Matrix. والأخذ بالقيمة يعني أننا نملكها داخل الدالة فنبني نتيجتنا بحرية.` },
        { code: `Matrix(\n    (m.0.0 * multiplier, m.0.1 * multiplier),\n    (m.1.0 * multiplier, m.1.1 * multiplier),\n)`, explain: `نبني مصفوفة جديدة. التعبير m نقطة 0 نقطة 0 يصل إلى العدد الأول في الصف الأول، ونضرب كلاً من الأعداد الأربعة في المُضاعِف. ولعدم وجود فاصلة منقوطة فإن هذه المصفوفة الجديدة هي ما تُعيده الدالة.` },
      ],
    },
    explanation: {
      intro: `This is your first taste of building your own data type in Rust and giving it behaviour.`,
      sections: [
        { heading: `The goal`, body: `A two by two matrix is just four numbers arranged in two rows. You define a type to hold them, then write a function that multiplies every one of those four numbers by the same scalar and returns a new matrix.` },
        { heading: `Concepts you need`, body: `A struct is a custom type that groups related values together. A tuple struct is a struct whose fields have no names and are reached by position instead, using dot zero, dot one, and so on. A scalar is just a single number you multiply everything by. The derive line asks Rust to automatically write some standard behaviour for our type, like being printable and comparable.` },
        { heading: `How the solution thinks`, body: `The matrix is stored as two rows, and each row is a pair of numbers, so the whole thing is a pair of pairs. To scale it, we reach into each of the four numbers by its position, multiply it by the scalar, and place the result into a brand new matrix. We never change the original, we build a fresh one. The mental picture is a grid where you touch every cell once and multiply it.` },
        { heading: `Watch out for`, body: `The biggest beginner trap is forgetting that this is a tuple struct, so the fields are reached by position like m dot 0 dot 0, not by names like m dot a. The starter does not include the type, so you must define it yourself. Also remember to derive Debug so the matrix can be printed and Eq so it can be compared.` },
        { heading: `Remember this`, body: `Position based access reads as outer dot inner. m dot 0 is the first row, and m dot 0 dot 0 is the first number in that first row.` },
      ],
      walkthrough: [
        { code: `#[derive(Debug, PartialEq, Eq)]\npub struct Matrix((i32, i32), (i32, i32));`, explain: `This defines our Matrix type as a tuple struct holding two pairs of integers, which are the two rows. The derive line tells Rust to generate the ability to print it and compare it, which the tests rely on. Without defining this type the function would not even compile.` },
        { code: `pub fn multiply(m: Matrix, multiplier: i32) -> Matrix {`, explain: `The function takes a Matrix by value and a single integer to multiply by, and promises to give back a Matrix. Taking it by value means we own it inside the function and can build our result freely.` },
        { code: `Matrix(\n    (m.0.0 * multiplier, m.0.1 * multiplier),\n    (m.1.0 * multiplier, m.1.1 * multiplier),\n)`, explain: `We construct a new Matrix. The expression m dot 0 dot 0 reaches the first number of the first row, and we multiply each of the four numbers by the multiplier. Because there is no semicolon, this new matrix is what the function returns.` },
      ],
    },
    expectedIO: {
      input: `m: Matrix, multiplier: i32`,
      output: `Matrix`,
      behavior: `Multiply every element of the 2x2 matrix by the scalar and return a new Matrix.`,
      constraints: `Matrix is a tuple struct of two rows: Matrix((i32, i32), (i32, i32)); derive Debug, PartialEq, Eq.`,
      examples: [
        { input: `Matrix((1, 3), (4, 5)), 3`, output: `Matrix((3, 9), (12, 15))` },
        { input: `Matrix((1, -1), (0, 5)), -2`, output: `Matrix((-2, 2), (0, -10))` },
        { input: `Matrix((7, 7), (7, 7)), 0`, output: `Matrix((0, 0), (0, 0))`, note: `scalar 0` },
      ],
    },
    overview: {
      whatYouBuild:
        'A 2x2 Matrix modeled as a tuple struct of two tuples, plus a multiply function that scales every number in it by a scalar and returns a new Matrix.',
      inputOutput:
        'Input: a Matrix (e.g. Matrix((1, 3), (4, 5))) and an i32 multiplier. Output: a new Matrix with each of its four numbers multiplied. multiply(Matrix((1, 3), (4, 5)), 3) = Matrix((3, 9), (12, 15)).',
      constraints: [
        'Define Matrix as a tuple struct of two tuples: struct Matrix((i32, i32), (i32, i32)).',
        'Matrix must derive Debug, PartialEq and Eq.',
        'Scale all four numbers (m.0.0, m.0.1, m.1.0, m.1.1) by the same scalar; return a new Matrix.',
      ],
      commonMistakes: [
        'Forgetting to define the Matrix struct (the starter only has the function).',
        'Using named fields like m.a instead of tuple indexing (m.0.0, m.0.1, m.1.0, m.1.1).',
        'Scaling only some of the numbers.',
      ],
    },
    officialDescription: `## matrix_multiplication

- Define a struct named Matrix as a tuple of two tuples; each nested tuple holds two i32.
- Create a function named multiply that receives a Matrix and an i32 and returns the Matrix with every number multiplied by the second argument.

Matrix must implement Debug, PartialEq and Eq (use derive). Remember you are defining a library, so public items must be marked pub.

### Expected items

~~~
#[derive(Debug, PartialEq, Eq)]
pub struct Matrix((i32, i32), (i32, i32));

pub fn multiply(m: Matrix, multiplier: i32) -> Matrix
~~~

### Usage

multiply(Matrix((1, 3), (4, 5)), 3) prints Matrix((3, 9), (12, 15)).`,
    objectives: {
      learn: ['Define a tuple struct and derive traits on it.', 'Index nested tuples with .0.0 syntax.', 'Build and return a new value rather than mutating.'],
      whyExists: 'A gentle introduction to tuple structs, derives, and tuple indexing.',
      rustSkills: ['tuple structs', 'derive', 'arithmetic'],
    },
    conceptIds: ['structs', 'matrices'],
    conceptNotes: {
      structs: 'Matrix is a tuple struct: struct Matrix((i32, i32), (i32, i32)). Access its parts by position — m.0 and m.1 are the rows, m.0.0 is the first number of the first row.',
      matrices: 'A 2x2 matrix stored as two rows; scalar multiplication scales every entry by the same number.',
    },
    similar: {
      title: 'Scale a point',
      prompt: 'Given a tuple struct Point(i32, i32), write scale(p, k) returning a new Point with both numbers multiplied by k. Same tuple-struct indexing as Matrix.',
      starter: `#[derive(Debug, PartialEq, Eq)]
pub struct Point(i32, i32);

pub fn scale(p: Point, k: i32) -> Point {
    todo!()
}`,
      hint: 'Index with p.0 and p.1: Point(p.0 * k, p.1 * k).',
      concepts: ['structs'],
      solution: `#[derive(Debug, PartialEq, Eq)]
pub struct Point(i32, i32);

pub fn scale(p: Point, k: i32) -> Point {
    Point(p.0 * k, p.1 * k)
}`,
    },
    sideQuiz: [
      {
        prompt: 'Define the Matrix type. Fill the tuple-struct body (two tuples of two i32).',
        template: `#[derive(Debug, PartialEq, Eq)]
pub struct Matrix(_____);`,
        accepted: ['(i32, i32), (i32, i32)'],
        acceptedPatterns: ['^\\(i32,\\s*i32\\),\\s*\\(i32,\\s*i32\\)$'],
        hints: ['Two rows, each a pair of i32.', 'It is two tuples: (i32, i32), (i32, i32).'],
        explanation: 'Matrix is a tuple struct of two (i32, i32) tuples — the two rows of the 2x2 matrix.',
        whatYouLearned: 'A tuple struct groups fixed, positional fields under a name.',
        conceptId: 'structs',
      },
      {
        kind: 'choice',
        prompt: 'What must Matrix derive, per the spec (and the {:?} usage)?',
        options: ['Debug, PartialEq, Eq', 'Clone, Copy', 'Display, Hash', 'nothing'],
        correct: [0],
        why: [
          'The usage prints with {:?} (needs Debug); the spec also requires PartialEq and Eq.',
          'Clone/Copy are not required here.',
          'Display/Hash are not needed.',
          'At minimum Debug is required for the {:?} print.',
        ],
        hints: ['The test prints the matrix with {:?}.', 'The spec lists three traits.'],
        explanation: 'derive(Debug, PartialEq, Eq) gives the {:?} printing the test uses plus the equality the spec requires.',
        whatYouLearned: 'derive adds standard behavior (printing, comparison) to your struct.',
        conceptId: 'structs',
      },
      {
        prompt: 'Scale the first number of the first row. Fill the indexed access.',
        template: `Matrix(
    (_____ * multiplier, m.0.1 * multiplier),
    (m.1.0 * multiplier, m.1.1 * multiplier),
)`,
        accepted: ['m.0.0'],
        acceptedPatterns: ['^m\\.0\\.0$'],
        hints: ['m.0 is the first row; .0 again is its first number.', 'Use m.0.0.'],
        explanation: 'Tuple structs are indexed by position: m.0 is the first row tuple, and m.0.0 is its first number.',
        whatYouLearned: 'Index nested tuples with chained .N, e.g. m.0.0.',
        conceptId: 'structs',
      },
      {
        kind: 'bug',
        prompt: 'This uses the wrong field syntax for a tuple struct. Click the mistake.',
        code: `Matrix(
    (m.a * multiplier, m.0.1 * multiplier),
    (m.1.0 * multiplier, m.1.1 * multiplier),
)`,
        bugs: [{ line: 2, token: 'a' }],
        hints: ['Tuple structs have no named fields.', 'Use positional indexing instead of m.a.'],
        explanation: 'A tuple struct has no field named a; the first number is m.0.0, not m.a.',
        whatYouLearned: 'Tuple-struct fields are positional (m.0.0), not named (m.a).',
        conceptId: 'structs',
      },
    ],
    documentation: {
      apis: [
        { name: 'Tuple structs', url: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html#using-tuple-structs-without-named-fields-to-create-different-types', note: 'struct Matrix((i32,i32),(i32,i32))' },
        { name: 'derive(Debug, PartialEq, Eq)', url: 'https://doc.rust-lang.org/book/ch05-02-example-structs.html#adding-useful-functionality-with-derived-traits', note: 'printing and comparison' },
        { name: 'Tuple indexing', url: 'https://doc.rust-lang.org/rust-by-example/primitives/tuples.html', note: 'm.0.0, m.0.1, m.1.0, m.1.1' },
      ],
      links: [
        { title: 'The Book — Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html' },
        { title: 'Rust By Example — Structures', url: 'https://doc.rust-lang.org/rust-by-example/custom_types/structs.html' },
      ],
      videos: [{ title: 'Structs in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=n3bPhdiJm9I' }],
    },
    editorHints: [
      'Define the Matrix tuple struct: #[derive(Debug, PartialEq, Eq)] pub struct Matrix((i32, i32), (i32, i32));',
      'Index the nested tuples with m.0.0, m.0.1, m.1.0, m.1.1.',
      'Build and return a new Matrix(...), multiplying every number by the multiplier.',
    ],
  },

  min_and_max: {
    explanationAr: {
      intro: `أحياناً تكون أبسط المهام في جوهرها بحثاً عن الأداة الصحيحة في المكتبة القياسية.`,
      sections: [
        { heading: `الهدف`, body: `بإعطاء ثلاثة أعداد، أعِد الأصغر والأكبر معاً مغلّفين في قيمة واحدة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الصفّ المرتّب مجموعة ثابتة الحجم من القيم تُكتب بين قوسين، وتتيح للدالة إرجاع أكثر من شيء دفعة واحدة. وتمنحنا المكتبة القياسية دالتين جاهزتين هما cmp min وcmp max تقارنان قيمتين وتُعيدان الأصغر أو الأكبر.` },
        { heading: `كيف يفكّر الحل`, body: `لإيجاد أصغر ثلاثة أعداد، نوجد أولاً أصغر اثنين منها، ثم نقارن الناتج بالثالث. والفكرة نفسها معكوسة تُوجِد الأكبر. وأخيراً نحزم الجوابين في صفّ مرتّب. الصورة الذهنية بطولة صغيرة تتواجه فيها الأعداد اثنين اثنين حتى يبقى الفائز.` },
        { heading: `انتبه`, body: `قد يحاول المبتدئ كتابة سلسلة طويلة من جُمل if فتتشابك المقارنات، واستعمال min وmax الجاهزتين يُبقي الأمر واضحاً وصحيحاً. والحالة الخاصة حين تتساوى الأعداد الثلاثة تعمل أيضاً، لأن أصغر وأكبر المتساويين هو العدد نفسه.` },
        { heading: `تذكّر`, body: `لمقارنة ثلاثة أشياء، قارن اثنين ثم قارن الفائز بالثالث. وإرجاع صفّ مرتّب هو كيف تقول دالة رست إليك جوابان معاً.` },
      ],
      walkthrough: [
        { code: `let min = std::cmp::min(nb_1, std::cmp::min(nb_2, nb_3));`, explain: `الاستدعاء الداخلي يجد أصغر العددين الثاني والثالث، والخارجي يقارن الناتج بالأول، فتكون النتيجة أصغر الثلاثة.` },
        { code: `let max = std::cmp::max(nb_1, std::cmp::max(nb_2, nb_3));`, explain: `الشكل نفسه تماماً لكن باستخدام max، فيجد أكبر الأعداد الثلاثة.` },
        { code: `(min, max)`, explain: `نضع الجوابين في صفّ مرتّب، الأصغر أولاً ثم الأكبر، ونُعيده. والقوسان مع الفاصلة هما ما يجعل هذا نتيجة واحدة من قيمتين.` },
      ],
    },
    explanation: {
      intro: `Sometimes the simplest tasks are really about finding the right tool in the standard library.`,
      sections: [
        { heading: `The goal`, body: `Given three numbers, return both the smallest and the largest, packaged together in a single value.` },
        { heading: `Concepts you need`, body: `A tuple is a fixed size group of values, written in parentheses, that lets a function return more than one thing at once. The standard library gives us ready made functions, cmp min and cmp max, that compare two values and hand back the smaller or the larger one.` },
        { heading: `How the solution thinks`, body: `To find the smallest of three numbers, we first find the smaller of two of them, then compare that result against the third. The same idea, flipped, finds the largest. Finally we bundle the two answers into a tuple. The mental picture is a small tournament where numbers face off two at a time until a winner remains.` },
        { heading: `Watch out for`, body: `A beginner might try to write a long chain of if statements and get the comparisons tangled. Using the built in min and max keeps it clear and correct. The edge case where all three numbers are equal still works, because the smaller and larger of equal numbers is that same number.` },
        { heading: `Remember this`, body: `To compare three things, compare two, then compare the winner with the third. Returning a tuple is how a Rust function says here are two answers at once.` },
      ],
      walkthrough: [
        { code: `let min = std::cmp::min(nb_1, std::cmp::min(nb_2, nb_3));`, explain: `The inner call finds the smaller of the second and third numbers, and the outer call compares that against the first, so the final result is the smallest of all three.` },
        { code: `let max = std::cmp::max(nb_1, std::cmp::max(nb_2, nb_3));`, explain: `Exactly the same shape, but using max, so this finds the largest of the three numbers.` },
        { code: `(min, max)`, explain: `We place both answers into a tuple, smallest first and largest second, and return it. The parentheses with a comma are what make this a single two value result.` },
      ],
    },
    expectedIO: {
      input: `nb_1: i32, nb_2: i32, nb_3: i32`,
      output: `(i32, i32)  // (minimum, maximum)`,
      behavior: `Returns a tuple of the smallest and largest of the three numbers.`,
      examples: [
        { input: `9, 2, 4`, output: `(2, 9)` },
        { input: `-3, 7, 0`, output: `(-3, 7)` },
        { input: `5, 5, 5`, output: `(5, 5)`, note: `all equal` },
      ],
    },
    overview: {
      whatYouBuild:
        'A function that returns both the smallest and the largest of three integers as a (min, max) tuple.',
      inputOutput: 'Input: three i32 values. Output: a tuple (min, max).',
      constraints: ['Use std::cmp::min / std::cmp::max (or comparisons).', 'Return them as a tuple in (min, max) order.'],
      commonMistakes: ['Comparing only two of the three values.', 'Swapping the tuple order.'],
    },
    officialDescription: `## min_and_max

Create a function min_and_max that takes three i32 numbers and returns a tuple containing the smallest and the largest of them.

### Expected function

~~~
pub fn min_and_max(nb_1: i32, nb_2: i32, nb_3: i32) -> (i32, i32)
~~~`,
    objectives: {
      learn: ['Compare values with std::cmp::min/max.', 'Chain comparisons over three values.', 'Return a tuple.'],
      whyExists: 'A tiny drill in comparison helpers and tuple returns.',
      rustSkills: ['std::cmp', 'tuples'],
    },
    conceptIds: ['pattern_matching'],
    conceptNotes: {
      pattern_matching: 'std::cmp::min/max pick a value by comparison; chaining handles three inputs.',
    },
    similar: {
      title: 'Middle of three',
      prompt: 'Return the median (middle value) of three integers. Same comparison-chaining idea.',
      starter: `pub fn middle(a: i32, b: i32, c: i32) -> i32 {
    todo!()
}`,
      hint: 'median = a + b + c - min(a, min(b, c)) - max(a, max(b, c)).',
      concepts: ['pattern_matching'],
      solution: `pub fn middle(a: i32, b: i32, c: i32) -> i32 {
    let lo = a.min(b).min(c);
    let hi = a.max(b).max(c);
    a + b + c - lo - hi
}`,
    },
    sideQuiz: [
      {
        prompt: 'Find the smallest of three by chaining. Fill the inner call.',
        template: `let min = std::cmp::min(nb_1, _____);`,
        accepted: ['std::cmp::min(nb_2, nb_3)'],
        acceptedPatterns: ['^std::cmp::min\\(nb_2,\\s*nb_3\\)$'],
        hints: ['Compare nb_1 with the smaller of nb_2 and nb_3.', 'Nest another std::cmp::min.'],
        explanation: 'min(nb_1, min(nb_2, nb_3)) is the smallest of the three.',
        whatYouLearned: 'Chain pairwise comparisons to handle more than two values.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'Which expression returns the result in the required order?',
        options: ['(min, max)', '(max, min)', '[min, max]', '{min, max}'],
        correct: [0],
        why: [
          'A tuple (min, max) matches the return type and order.',
          'That reverses the required order.',
          'Square brackets make an array, not a tuple.',
          'Braces are not tuple syntax here.',
        ],
        hints: ['The return type is (i32, i32).', 'Smallest first, largest second.'],
        explanation: 'The function returns the tuple (min, max) — parentheses, min first.',
        whatYouLearned: 'Tuples group multiple return values in a fixed order.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'This finds the largest incorrectly. Click the mistake.',
        code: `let max = std::cmp::min(nb_1, std::cmp::max(nb_2, nb_3));`,
        bugs: [{ line: 1, token: 'min' }],
        hints: ['You want the biggest, not the smallest.', 'Look at the outer call.'],
        explanation: 'The outer call should be std::cmp::max; using min here can never yield the overall maximum.',
        whatYouLearned: 'Use max (not min) to find the largest.',
        conceptId: 'pattern_matching',
      },
    ],
    documentation: {
      apis: [
        { name: 'std::cmp::min', url: 'https://doc.rust-lang.org/std/cmp/fn.min.html', note: 'smaller of two' },
        { name: 'std::cmp::max', url: 'https://doc.rust-lang.org/std/cmp/fn.max.html', note: 'larger of two' },
        { name: 'Tuples', url: 'https://doc.rust-lang.org/book/ch03-02-data-types.html#the-tuple-type', note: 'return (min, max)' },
      ],
      links: [
        { title: 'Rust By Example — Tuples', url: 'https://doc.rust-lang.org/rust-by-example/primitives/tuples.html' },
        { title: 'std::cmp module', url: 'https://doc.rust-lang.org/std/cmp/' },
      ],
    },
    editorHints: [
      'Chain std::cmp::min twice for the smallest of three.',
      'Chain std::cmp::max twice for the largest.',
      'Return them as the tuple (min, max).',
    ],
  },

  modify_letter: {
    explanationAr: {
      intro: `هذا التمرين في الحقيقة ثلاثة ألغاز نصية صغيرة تتشارك فكرة واحدة: حوّل النص محرفاً محرفاً.`,
      sections: [
        { heading: `الهدف`, body: `اكتب ثلاث دوال. الأولى تحذف كل نسخة من حرف معطى كما هو. والثانية تحذفه متجاهلةً حالة الأحرف. والثالثة تقلب حالة ذلك الحرف أينما ظهر، تاركةً كل ما عداه كما هو.` },
        { heading: `المفاهيم التي تحتاجها`, body: `يمكن النظر إلى النص في رست كسلسلة من المحارف عبر الدالة chars. ومنها تُبقي filter المحارف التي تجتاز اختباراً، وتحوّل map كل محرف إلى آخر، وتجمع collect النتائج في نص جديد. والمُغلَّف هو الدالة الصغيرة المضمّنة المكتوبة بين عمودين التي تحدّد الاختبار أو التحويل.` },
        { heading: `كيف يفكّر الحل`, body: `للحذف نُبقي كل محرف ليس هو الهدف، وهذا ترشيح. وللنسخة غير الحسّاسة للحالة نقارن الصيغ الصغيرة كي يتطابق الحرف الكبير والصغير. وللقلب نحوّل بدل أن نحذف: إن طابق المحرفُ الحرفَ الهدف متجاهلين الحالة قلبنا حالته، وإلا تركناه. الصورة الذهنية حزام ناقل من المحارف، فإما أن تدع كلاً يمرّ، أو تُسقطه، أو تغيّره.` },
        { heading: `انتبه`, body: `من الأخطاء الشائعة مقارنة محرفين مختلفي الحالة مباشرة والاندهاش من عدم تساويهما، ويحلّ ذلك تحويل الطرفين إلى أحرف صغيرة. وآخر محاولة تعديل النص في مكانه، بينما الأنظف والأأمن في رست بناء نص جديد من القديم.` },
        { heading: `تذكّر`, body: `chars، ثم filter أو map، ثم collect. الترشيح يحذف، والتحويل يغيّر، وcollect يعيد التيار نصاً.` },
      ],
      walkthrough: [
        { code: `s.chars().filter(|&c| c != letter).collect()`, explain: `نمرّ على المحارف ونُبقي فقط ما ليس الحرف الهدف، ثم نجمعها في نص جديد. هذا يحذف كل نسخة تطابق الحرف تماماً.` },
        { code: `let target = letter.to_ascii_lowercase();\ns.chars().filter(|c| c.to_ascii_lowercase() != target).collect()`, explain: `بتحويل الهدف وكل محرف إلى أحرف صغيرة قبل المقارنة تُحذف النسختان الكبيرة والصغيرة من الحرف. والمقارنة بلا تحويل ستفوّت إحدى الحالتين.` },
        { code: `s.chars()\n    .map(|c| {\n        if c.to_ascii_lowercase() == target {\n            if c.is_ascii_uppercase() { c.to_ascii_lowercase() } else { c.to_ascii_uppercase() }\n        } else {\n            c\n        }\n    })\n    .collect()`, explain: `هنا نحوّل بدل أن نحذف. إن طابق المحرف الحرف الهدف متجاهلين الحالة قلبنا حالته، وإلا أعدناه كما هو. وتعيد collect بناء النص النهائي.` },
      ],
    },
    explanation: {
      intro: `This exercise is really three small string puzzles that all share one idea: transform a string one character at a time.`,
      sections: [
        { heading: `The goal`, body: `Write three helpers. The first removes every copy of a given letter exactly as written. The second removes it ignoring case. The third flips the case of that letter wherever it appears, leaving everything else untouched.` },
        { heading: `Concepts you need`, body: `A string in Rust can be viewed as a sequence of characters using the chars method. From there, filter keeps only the characters that pass a test, map transforms each character into another, and collect gathers the results back into a new String. A closure is the small inline function, written with bars, that says which test or transformation to apply.` },
        { heading: `How the solution thinks`, body: `For removing, we keep every character that is not the target, which is filtering. For the case insensitive version, we compare the lower cased forms so both A and a match. For swapping, instead of dropping characters we transform them: if a character matches the target letter ignoring case, we flip its case, otherwise we leave it alone. The mental picture is a conveyor belt of characters where you either let each one pass, drop it, or change it.` },
        { heading: `Watch out for`, body: `A common mistake is comparing characters of different cases directly and being surprised that A does not equal a, which lower casing both sides fixes. Another is trying to edit the string in place; in Rust it is cleaner and safer to build a new string from the old one.` },
        { heading: `Remember this`, body: `chars, then filter or map, then collect. Filtering removes, mapping transforms, and collect turns the stream back into a String.` },
      ],
      walkthrough: [
        { code: `s.chars().filter(|&c| c != letter).collect()`, explain: `We walk the characters and keep only those that are not the target letter, then gather them into a new String. This removes every exact copy of the letter.` },
        { code: `let target = letter.to_ascii_lowercase();\ns.chars().filter(|c| c.to_ascii_lowercase() != target).collect()`, explain: `By lower casing both the target and each character before comparing, both the uppercase and lowercase copies of the letter are removed. Comparing without lower casing would miss one of the cases.` },
        { code: `s.chars()\n    .map(|c| {\n        if c.to_ascii_lowercase() == target {\n            if c.is_ascii_uppercase() { c.to_ascii_lowercase() } else { c.to_ascii_uppercase() }\n        } else {\n            c\n        }\n    })\n    .collect()`, explain: `Here we transform instead of remove. If a character matches the target letter ignoring case, we flip its case, otherwise we return it unchanged. collect rebuilds the final String.` },
      ],
    },
    expectedIO: {
      input: `s: &str, letter: char`,
      output: `String`,
      behavior: `Three helpers: remove_letter_sensitive and remove_letter_insensitive delete the letter; swap_letter_case flips the case of every occurrence of it.`,
      examples: [
        { input: `remove_letter_sensitive("Jojhn jis sljeepjjing", 'j')`, output: `"John is sleeping"` },
        { input: `remove_letter_insensitive("JaimA ais swiaAmmingA", 'A')`, output: `"Jim is swimming"`, note: `both cases removed` },
        { input: `swap_letter_case("byE bye", 'e')`, output: `"bye byE"` },
      ],
    },
    overview: {
      whatYouBuild:
        'String functions that remove a chosen letter from a string — one case-sensitive, one case-insensitive (the full subject also includes swapping a letter\'s case).',
      inputOutput: 'Input: a &str and a char. Output: a new String with that letter removed (respecting case or not).',
      constraints: ['ASCII only.', 'remove_letter_sensitive matches exact case; remove_letter_insensitive matches both cases.'],
      commonMistakes: ['Comparing without lowercasing in the insensitive version.', 'Trying to mutate &str instead of building a new String.'],
    },
    officialDescription: `## modify_letter

Implement string functions:

- remove_letter_sensitive(s, letter): remove every occurrence of letter (case-sensitive).
- remove_letter_insensitive(s, letter): remove every occurrence of letter, ignoring case.
- swap_letter_case(s, letter): toggle the case of the chosen letter.

Use ASCII characters only.

### Expected functions

~~~
pub fn remove_letter_sensitive(s: &str, letter: char) -> String
pub fn remove_letter_insensitive(s: &str, letter: char) -> String
~~~

### Usage

remove_letter_sensitive("Jojhn jis sljeepjjing", 'j') = "John is sleeping".`,
    objectives: {
      learn: ['Iterate characters with chars().', 'Keep/drop characters with filter and a closure.', 'collect() back into a String.'],
      whyExists: 'Foundational string processing with iterators and closures.',
      rustSkills: ['iterators', 'closures', 'char methods'],
    },
    conceptIds: ['iterators', 'closures'],
    conceptNotes: {
      iterators: 'chars().filter(...).collect() is the build-a-new-string pattern.',
      closures: 'The filter predicate is a closure deciding which characters to keep.',
    },
    similar: {
      title: 'Keep only vowels',
      prompt: 'Write a function that returns a new String containing only the vowels of the input. Same chars().filter().collect() pattern.',
      starter: `pub fn only_vowels(s: &str) -> String {
    todo!()
}`,
      hint: 's.chars().filter(|c| "aeiouAEIOU".contains(*c)).collect()',
      concepts: ['iterators', 'closures'],
      solution: `pub fn only_vowels(s: &str) -> String {
    s.chars().filter(|c| "aeiouAEIOU".contains(*c)).collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Remove a letter (case-sensitive). Fill the predicate that keeps the other characters.',
        template: `s.chars().filter(|&c| _____).collect()`,
        accepted: ['c != letter'],
        acceptedPatterns: ['^c\\s*!=\\s*letter$'],
        hints: ['Keep characters that are NOT the target.', 'Compare c with letter.'],
        explanation: 'filter keeps characters where the closure is true; here, every character except the target letter.',
        whatYouLearned: 'chars().filter(pred).collect() builds a filtered String.',
        conceptId: 'iterators',
      },
      {
        prompt: 'For the case-insensitive version, normalize before comparing. Fill the method.',
        template: `let target = letter.to_ascii_lowercase();
s.chars().filter(|c| c._____() != target).collect()`,
        accepted: ['to_ascii_lowercase'],
        acceptedPatterns: ['^to_ascii_lowercase$'],
        hints: ['Lowercase both sides before comparing.', 'char has to_ascii_lowercase().'],
        explanation: 'Comparing lowercased characters removes both "A" and "a".',
        whatYouLearned: 'Normalize case on both sides for case-insensitive matching.',
        conceptId: 'iterators',
      },
      {
        kind: 'choice',
        prompt: 'remove_letter_sensitive("aAbA", \'A\') returns what?',
        options: ['"ab"', '"aAbA"', '""', '"AA"'],
        correct: [0],
        why: [
          'Only the uppercase A characters are removed, leaving "ab".',
          'Something is removed, so it is not unchanged.',
          'Lowercase a stays.',
          'The lowercase letters are kept, not removed.',
        ],
        hints: ['Case-sensitive: only exact "A" goes.', 'The two lowercase a... wait, only one lowercase a and one b remain.'],
        explanation: 'Case-sensitive removal drops only the two uppercase A characters, leaving the lowercase a and b: "ab".',
        whatYouLearned: 'Case-sensitive matching distinguishes "A" from "a".',
        conceptId: 'iterators',
      },
      {
        kind: 'bug',
        prompt: 'This insensitive removal is actually case-sensitive. Click the mistake.',
        code: `let target = letter.to_ascii_lowercase();
s.chars().filter(|&c| c != target).collect()`,
        bugs: [{ line: 2, token: 'c' }],
        hints: ['target is lowercased, but c is not.', 'The comparison must lowercase c too.'],
        explanation: 'c is compared raw against a lowercased target, so uppercase matches slip through. Use c.to_ascii_lowercase() != target.',
        whatYouLearned: 'Both sides of a case-insensitive comparison must be normalized.',
        conceptId: 'iterators',
      },
    ],
    documentation: {
      apis: [
        { name: 'str::chars', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.chars', note: 'iterate characters' },
        { name: 'Iterator::filter', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter', note: 'keep matching chars' },
        { name: 'char::to_ascii_lowercase', url: 'https://doc.rust-lang.org/std/primitive.char.html#method.to_ascii_lowercase', note: 'case-insensitive compare' },
      ],
      links: [
        { title: 'Rust By Example — Strings', url: 'https://doc.rust-lang.org/rust-by-example/std/str.html' },
        { title: 'Iterator::collect', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect' },
      ],
      videos: [{ title: 'Iterators in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=4GcKrj4By8k' }],
    },
    editorHints: [
      'Use s.chars().filter(...).collect() to build the new String.',
      'For the sensitive version, keep chars where c != letter.',
      'For the insensitive version, lowercase BOTH c and letter before comparing.',
    ],
  },

  smallest: {
    explanationAr: {
      intro: `هذا التمرين صغير في حجمه، لكنه يعلّمك نمطاً ستستخدمه كثيراً: تحويل مجموعة كاملة من القيم إلى إجابة واحدة.`,
      sections: [
        { heading: `الهدف`, body: `لديك خريطة، وهي جدول يربط بين أسماء تُسمّى المفاتيح وأرقام تُسمّى القيم. مهمتك هي إرجاع أصغر رقم بين كل القيم، مع تجاهل الأسماء تماماً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الخريطة مجموعة تخزّن أزواجاً من مفتاح وقيمة، وتتيح لك البحث عن قيمة عبر مفتاحها بسرعة. المُكرِّر هو تيار من العناصر تمرّ عليها واحداً تلو الآخر. الدالة min تمرّ على المُكرِّر وتُعيد أصغر عنصر تجده. أما Option فهي طريقة لغة رست لتقول ربما توجد قيمة وربما لا توجد، لأن المجموعة الفارغة لا تملك أصغر عنصر.` },
        { heading: `كيف يفكّر الحل`, body: `لا تهمّنا المفاتيح بل الأرقام فقط، لذلك نطلب من الخريطة قيمها أولاً. ثم نوجد أصغر هذه القيم. وبما أن الخريطة الفارغة لا أصغر لها، تُعيد min قيمة من نوع Option، فنوفّر قيمة بديلة هي صفر لتلك الحالة. الصورة الذهنية بسيطة: خذ كل الأرقام ثم اعصرها حتى يبقى أصغرها.` },
        { heading: `انتبه`, body: `من الأخطاء الشائعة عند المبتدئين نسيان أن min تُعيد Option ومحاولة استعمالها كرقم مباشرة، وهو ما سيرفضه المُترجِم. الحالة الخاصة المهمة هي الخريطة الفارغة، فبدون قيمة بديلة قد يتوقف البرنامج بخطأ، أما مع unwrap_or فيُعيد صفراً بأمان.` },
        { heading: `تذكّر`, body: `فكّر هكذا: القيم، ثم الأصغر، ثم عالج الفراغ. معظم مهام إيجاد الأصغر أو الأكبر أو المجموع تتبع الشكل نفسه: حوّل البيانات إلى مُكرِّر، ثم اطوِها بدالة واحدة.` },
      ],
      walkthrough: [
        { code: `h.values()`, explain: `هذا يعطينا مُكرِّراً على الأرقام فقط داخل الخريطة، متجاوزاً المفاتيح. بدونه كنّا سنمرّ على أزواج المفتاح والقيمة ونضطر لاستخراج الرقم من كل زوج بأنفسنا.` },
        { code: `.copied()`, explain: `تُعطينا values مراجع إلى الأرقام. الدالة copied تحوّل كل مرجع إلى رقم مملوك بنسخه، وهو النوع الذي تتوقعه min وقيمة الإرجاع. بدون copied لن تتطابق الأنواع ولن يُترجَم الكود.` },
        { code: `.min()`, explain: `تمرّ min على كامل المُكرِّر وتُعيد أصغر قيمة مغلّفة داخل Option، فتكون Some مع رقم إن وُجدت قيمة واحدة على الأقل، أو None إن كانت الخريطة فارغة.` },
        { code: `.unwrap_or(0)`, explain: `تستخرج unwrap_or الرقم من داخل Option، لكن إن كانت None، أي أن الخريطة فارغة، فإنها تضع صفراً بدلاً من إيقاف البرنامج. هذه هي الطريقة الآمنة للخروج من عالم ربما لا قيمة إلى رقم عادي.` },
      ],
    },
    explanation: {
      intro: `This exercise looks tiny, but it teaches a pattern you will reuse constantly: turning a whole collection into a single answer.`,
      sections: [
        { heading: `The goal`, body: `You are given a HashMap, which is a table that pairs names (called keys) with numbers (called values). Your job is to return the smallest of all the numbers, ignoring the names completely.` },
        { heading: `Concepts you need`, body: `A HashMap stores key and value pairs, a bit like a dictionary where you look something up by name. An iterator is a lazy stream of items that you can walk through one at a time. The method min walks an iterator and returns the smallest item it finds. Option is Rust's way of saying maybe there is a value and maybe there is not, because an empty collection has no smallest item.` },
        { heading: `How the solution thinks`, body: `We do not care about the keys, only the numbers, so first we ask the map for just its values. Then we find the minimum of those values. Because an empty map has no minimum, min hands back an Option, so we provide a fallback of zero for that case. The mental picture is simple: take every number, then squeeze them all down to the smallest one.` },
        { heading: `Watch out for`, body: `A common beginner mistake is forgetting that min returns an Option and trying to use it directly as a number, which the compiler will refuse. The important edge case is an empty map: without a fallback your program could panic, but with unwrap_or it safely returns zero instead.` },
        { heading: `Remember this`, body: `Think values, then min, then handle empty. Most find the smallest, largest, or sum tasks follow this same shape: turn the data into an iterator, then collapse it with a single method.` },
      ],
      walkthrough: [
        { code: `h.values()`, explain: `This gives an iterator over just the numbers in the map, skipping the keys. Without it we would be walking over key and value pairs and would have to dig the number out of each one ourselves.` },
        { code: `.copied()`, explain: `values hands us references to the numbers, written as ampersand i32. copied turns each reference into a plain owned i32 by copying it, which is the type that min and our return value expect. Without copied the types would not line up and the code would not compile.` },
        { code: `.min()`, explain: `min walks the whole iterator and returns the smallest value, wrapped in an Option. It is Some of a number when there was at least one value, or None when the map was empty.` },
        { code: `.unwrap_or(0)`, explain: `unwrap_or pulls the number out of the Option, but if it is None, meaning the map was empty, it substitutes zero instead of crashing. This is the safe way to step out of the maybe missing world and back into a plain number.` },
      ],
    },
    expectedIO: {
      input: `h: HashMap<&str, i32>`,
      output: `i32`,
      behavior: `Returns the smallest value stored in the map.`,
      examples: [
        { input: `{"Cat": 122, "Dog": 333, "Elephant": 334, "Gorilla": 14}`, output: `14` },
        { input: `{"a": -5, "b": -2, "c": -10}`, output: `-10`, note: `negatives` },
        { input: `{"only": 42}`, output: `42`, note: `single entry` },
      ],
    },
    overview: {
      whatYouBuild: 'A function that returns the smallest value stored in a HashMap of name -> value.',
      inputOutput: 'Input: a HashMap<&str, i32>. Output: the smallest i32 value (0 for an empty map).',
      constraints: ['Look at the values, not the keys.', 'Handle the empty map without panicking.'],
      commonMistakes: ['Iterating keys instead of values.', 'Calling unwrap() on an empty map (panics).'],
    },
    officialDescription: `## smallest

Create a function smallest that takes a HashMap of &str to i32 and returns the smallest value it contains.

### Expected function

~~~
pub fn smallest(h: HashMap<&str, i32>) -> i32
~~~`,
    objectives: {
      learn: ['Iterate a map\'s values.', 'Find a minimum with Iterator::min.', 'Default safely on an empty collection.'],
      whyExists: 'Practices HashMap iteration and the Option returned by min.',
      rustSkills: ['HashMap', 'iterators', 'Option'],
    },
    conceptIds: ['collections', 'iterators'],
    conceptNotes: {
      collections: 'HashMap::values() yields the stored i32s.',
      iterators: 'min() returns an Option because the iterator could be empty.',
    },
    similar: {
      title: 'Largest value',
      prompt: 'Return the largest value in a HashMap<&str, i32> (0 if empty). Same values().max() pattern.',
      starter: `use std::collections::HashMap;
pub fn largest(h: HashMap<&str, i32>) -> i32 {
    todo!()
}`,
      hint: 'h.values().copied().max().unwrap_or(0)',
      concepts: ['collections', 'iterators'],
      solution: `use std::collections::HashMap;
pub fn largest(h: HashMap<&str, i32>) -> i32 {
    h.values().copied().max().unwrap_or(0)
}`,
    },
    sideQuiz: [
      {
        prompt: 'Iterate the map\'s values. Fill the accessor.',
        template: `let result = h._____().copied().min().unwrap_or(0);`,
        accepted: ['values'],
        acceptedPatterns: ['^values$'],
        hints: ['You want the stored numbers, not the names.', 'HashMap has values().'],
        explanation: 'values() yields the i32 values; copied() turns &i32 into i32 so min() can compare owned values.',
        whatYouLearned: 'Use values() to iterate a map\'s values.',
        conceptId: 'collections',
      },
      {
        kind: 'choice',
        prompt: 'Why does min() need unwrap_or(0) here?',
        options: [
          'min() returns Option, which is None for an empty map',
          'min() can panic',
          'unwrap_or speeds it up',
          'min() returns a Result',
        ],
        correct: [0],
        why: [
          'An empty iterator has no minimum, so min() returns None; unwrap_or supplies 0.',
          'min() does not panic.',
          'It is about correctness, not speed.',
          'min() returns Option, not Result.',
        ],
        hints: ['What if the map is empty?', 'min() of nothing is None.'],
        explanation: 'min() returns Option<i32>; unwrap_or(0) provides a sensible default when the map is empty.',
        whatYouLearned: 'min()/max() return Option to handle the empty case.',
        conceptId: 'iterators',
      },
      {
        kind: 'bug',
        prompt: 'This looks at the wrong part of the map. Click the mistake.',
        code: `let result = h.keys().copied().min().unwrap_or(0);`,
        bugs: [{ line: 1, token: 'keys' }],
        hints: ['We want the smallest value, not key.', 'Check the accessor.'],
        explanation: 'keys() iterates the &str names; we need values() to find the smallest i32.',
        whatYouLearned: 'keys() vs values(): pick the right one.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'HashMap::values', url: 'https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.values', note: 'iterate values' },
        { name: 'Iterator::min', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.min', note: 'smallest (Option)' },
        { name: 'Option::unwrap_or', url: 'https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or', note: 'default for empty' },
      ],
      links: [
        { title: 'The Book — Hash maps', url: 'https://doc.rust-lang.org/book/ch08-03-hash-maps.html' },
        { title: 'Rust By Example — Iterators', url: 'https://doc.rust-lang.org/rust-by-example/trait/iter.html' },
      ],
    },
    editorHints: [
      'Iterate values() (not keys()).',
      'Use min() to find the smallest — it returns an Option.',
      'unwrap_or(0) handles the empty map.',
    ],
  },

  prime_checker: {
    explanationAr: {
      intro: `هذا التمرين في جوهره عن طريقة رست في وصف إجابات غنية باستخدام enum وOption وResult.`,
      sections: [
        { heading: `الهدف`, body: `صنّف عدداً. إن تعذّر تصنيفه، مثل صفر أو واحد، أعِد لا شيء. وإلا فقل هل هو أولي، وإن لم يكن فاشرح السبب: إما أنه زوجي، أو أن له قاسماً أصغر محدّداً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الـ enum نوع يكون إحدى عدة حالات مسمّاة، ونوعنا PrimeErr له الحالتان Even وDivider، حيث تحمل Divider العدد القاسم. وOption تعني ربما قيمة، بحالتيها Some وNone. وResult تعني نجاحاً أو فشلاً، بحالتيها Ok وErr. وتعشيش Result داخل Option يتيح لقيمة إرجاع واحدة التعبير عن ثلاث نتائج مختلفة.` },
        { heading: `كيف يفكّر الحل`, body: `نستبعد الحالات من الأبسط إلى الأخصّ. الأعداد التي لا يمكن الحكم عليها تُعيد None. والعدد الأولي الأصغر، وهو اثنان، نعمٌ مباشرة. وأي عدد زوجي آخر يفشل بسبب Even. وللباقي نختبر القواسم الفردية حتى الجذر التربيعي، وأول واحد يصلح يُذكر كسبب. وإن لم يصلح أيٌّ منها فالعدد أولي. الصورة الذهنية سلسلة مناخل، كل منخل يمسك نوعاً معيناً من الأعداد، وتسقط الأوليّة حتى النهاية.` },
        { heading: `انتبه`, body: `يربك شكلُ نوع الإرجاع المبتدئين، فاقرأه هكذا: ربما، ثم نجاح أو فشل. واختبار القواسم الفردية فقط بعد معالجة اثنين صحيح وأسرع. ونسيان حالة None لصفر وواحد خطأ شائع.` },
        { heading: `تذكّر`, body: `Option تقول هل هناك إجابة أصلاً، وResult تقول هل تلك الإجابة نجاح أم فشل. واجمع بينهما لتصف عدة نتائج في قيمة واحدة.` },
      ],
      walkthrough: [
        { code: `pub enum PrimeErr {\n    Even,\n    Divider(usize),\n}`, explain: `نوع خطأ خاص بنا له حالتان. Even مجرد علامة، بينما تحمل Divider عدداً هو القاسم الذي يثبت أن القيمة ليست أولية.` },
        { code: `if nb <= 1 {\n    return None;\n}\nif nb == 2 {\n    return Some(Ok(2));\n}`, explain: `صفر وواحد لا يمكن تصنيفهما فنُعيد None. واثنان هو أصغر عدد أولي فنُبلّغ بالنجاح فوراً.` },
        { code: `if nb % 2 == 0 {\n    return Some(Err(PrimeErr::Even));\n}`, explain: `أي عدد آخر لا باقي له عند القسمة على اثنين هو زوجي، فنفشل بسبب Even.` },
        { code: `let mut i = 3;\nwhile i * i <= nb {\n    if nb % i == 0 {\n        return Some(Err(PrimeErr::Divider(i)));\n    }\n    i += 2;\n}`, explain: `نختبر القواسم الفردية من ثلاثة حتى الجذر التربيعي، متقدّمين باثنين لتخطّي الزوجية. وأول قاسم يصلح يُبلَّغ داخل حالة Divider.` },
        { code: `Some(Ok(nb))`, explain: `إن لم يُوجد قاسم فالعدد أولي، فنغلّفه بالنجاح. ولعدم وجود فاصلة منقوطة، فهذه قيمة إرجاع الدالة.` },
      ],
    },
    explanation: {
      intro: `This exercise is really about Rust's way of describing rich answers using enums, Option, and Result.`,
      sections: [
        { heading: `The goal`, body: `Classify a number. If it cannot be classified, like zero or one, return nothing. Otherwise say whether it is prime, and if it is not, explain why: either it is even, or it has a specific smallest divider.` },
        { heading: `Concepts you need`, body: `An enum is a type that can be one of several named cases, and ours, PrimeErr, has the cases Even and Divider, where Divider carries the number that divides. Option means maybe a value, with the cases Some and None. Result means success or failure, with the cases Ok and Err. Nesting Result inside Option lets one return value express three different outcomes.` },
        { heading: `How the solution thinks`, body: `We rule out cases from simplest to most specific. Numbers that cannot be judged return None. The smallest prime, two, is a direct yes. Any other even number fails with the Even reason. For the rest, we test odd dividers up to the square root, and the first one that fits is reported as the reason. If none fit, the number is prime. The mental picture is a series of sieves, each catching a particular kind of number, with primes falling through to the end.` },
        { heading: `Watch out for`, body: `The shape of the return type confuses beginners, so read it as maybe, then success or failure. Only testing odd dividers after handling two is both correct and faster. Forgetting the None case for zero and one is a common miss.` },
        { heading: `Remember this`, body: `Option says whether there is an answer at all, and Result says whether that answer is success or failure. Combine them to describe several outcomes in one value.` },
      ],
      walkthrough: [
        { code: `pub enum PrimeErr {\n    Even,\n    Divider(usize),\n}`, explain: `Our own error type with two cases. Even is a plain marker, while Divider carries a number, the divider that proves the value is not prime.` },
        { code: `if nb <= 1 {\n    return None;\n}\nif nb == 2 {\n    return Some(Ok(2));\n}`, explain: `Zero and one cannot be classified, so we return None. Two is the smallest prime, so we report success right away.` },
        { code: `if nb % 2 == 0 {\n    return Some(Err(PrimeErr::Even));\n}`, explain: `Any other number with no remainder when divided by two is even, so we fail with the Even reason.` },
        { code: `let mut i = 3;\nwhile i * i <= nb {\n    if nb % i == 0 {\n        return Some(Err(PrimeErr::Divider(i)));\n    }\n    i += 2;\n}`, explain: `We test odd dividers from three up to the square root, stepping by two to skip even numbers. The first divider that fits is reported inside the Divider case.` },
        { code: `Some(Ok(nb))`, explain: `If no divider was found, the number is prime, so we wrap it in success. With no semicolon, this is the function's return value.` },
      ],
    },
    expectedIO: {
      input: `nb: usize`,
      output: `Option<Result<usize, PrimeErr>>`,
      behavior: `Some(Ok(n)) if prime; Some(Err(Even)) if even; Some(Err(Divider(d))) for an odd composite (smallest divisor d); None when it can't be classified (0 or 1).`,
      examples: [
        { input: `2`, output: `Some(Ok(2))` },
        { input: `14`, output: `Some(Err(Even))`, note: `even` },
        { input: `9`, output: `Some(Err(Divider(3)))`, note: `odd composite` },
        { input: `1`, output: `None`, note: `not classifiable` },
      ],
    },
    overview: {
      whatYouBuild:
        'A function that classifies a number: None for inputs <= 1, otherwise a Result that is Ok(n) for primes, Err(Even) for even numbers, or Err(Divider(d)) with the smallest odd divider.',
      inputOutput: 'Input: a usize. Output: Option<Result<usize, PrimeErr>>. 2 -> Some(Ok(2)); 14 -> Some(Err(Even)); 9 -> Some(Err(Divider(3))); 1 -> None.',
      constraints: ['<= 1 returns None.', 'Even numbers (except 2) return Err(Even).', 'Otherwise return the smallest odd divider, or Ok(n) if prime.', 'Should be reasonably optimized (check to the square root).'],
      commonMistakes: ['Forgetting the None case for <= 1.', 'Treating 2 as Even.', 'Scanning all numbers instead of stopping at the square root.'],
    },
    officialDescription: `## prime_checker

Create a function prime_checker that takes a usize and checks if it is prime.

The result is None if the argument is <= 1. Otherwise it returns a Result: Ok(usize) if prime, or Err(PrimeErr). PrimeErr is Even if the number is a multiple of two, or Divider(usize) where the usize is the smallest divider.

### Expected items

~~~
#[derive(PartialEq, Eq, Debug)]
pub enum PrimeErr { Even, Divider(usize) }

pub fn prime_checker(nb: usize) -> Option<Result<usize, PrimeErr>>
~~~

### Usage

prime_checker(2) = Some(Ok(2)), prime_checker(14) = Some(Err(Even)), prime_checker(2147483647) = Some(Ok(2147483647)).`,
    objectives: {
      learn: ['Combine Option and Result in one return type.', 'Model errors with an enum.', 'Optimize a primality test to the square root.'],
      whyExists: 'A rich exercise in nested Option/Result modelling and efficient looping.',
      rustSkills: ['Option', 'Result', 'enums', 'algorithms'],
    },
    conceptIds: ['option', 'result', 'enums', 'error_handling'],
    conceptNotes: {
      option: 'The outer Option encodes "out of range" (<= 1) as None.',
      result: 'The inner Result is Ok(prime) or Err(PrimeErr).',
      enums: 'PrimeErr carries the failure reason (Even or the divider).',
    },
    similar: {
      title: 'Classify even/odd/zero',
      prompt: 'Write a function returning an enum Sign { Zero, Even, Odd } describing a usize. Practices enum returns and branching.',
      starter: `pub enum Sign { Zero, Even, Odd }
pub fn classify(n: usize) -> Sign {
    todo!()
}`,
      hint: 'match on n == 0, then n % 2.',
      concepts: ['enums', 'pattern_matching'],
      solution: `pub enum Sign { Zero, Even, Odd }
pub fn classify(n: usize) -> Sign {
    if n == 0 { Sign::Zero } else if n % 2 == 0 { Sign::Even } else { Sign::Odd }
}`,
    },
    sideQuiz: [
      {
        kind: 'choice',
        prompt: 'What is the correct return type for prime_checker?',
        options: [
          'Option<Result<usize, PrimeErr>>',
          'Result<usize, PrimeErr>',
          'Option<usize>',
          'Result<Option<usize>, PrimeErr>',
        ],
        correct: [0],
        why: [
          'None for <= 1, otherwise a Result(Ok/Err) — an Option wrapping a Result.',
          'Misses the None (<= 1) case.',
          'Cannot express the Even/Divider error.',
          'The nesting is backwards: <= 1 is the Option layer, not the Result layer.',
        ],
        hints: ['Two layers: in-range? then prime?', 'Outer Option, inner Result.'],
        explanation: 'The <= 1 case is None; everything else is a Result, so the type is Option<Result<usize, PrimeErr>>.',
        whatYouLearned: 'Nest Option and Result to model two independent outcomes.',
        conceptId: 'option',
      },
      {
        prompt: 'Reject the out-of-range inputs. Fill the value returned for nb <= 1.',
        template: `if nb <= 1 {
    return _____;
}`,
        accepted: ['None'],
        acceptedPatterns: ['^None$'],
        hints: ['<= 1 is not classified as prime or not.', 'Return None.'],
        explanation: 'Per the spec, inputs of 1 or less return None (outside the prime question).',
        whatYouLearned: 'None marks an input outside the meaningful range.',
        conceptId: 'option',
      },
      {
        prompt: 'Report an even number. Fill the value for a multiple of two (after handling 2).',
        template: `if nb % 2 == 0 {
    return Some(Err(PrimeErr::_____));
}`,
        accepted: ['Even'],
        acceptedPatterns: ['^Even$'],
        hints: ['The variant for multiples of two.', 'PrimeErr::Even.'],
        explanation: 'Even numbers greater than 2 fail with Err(PrimeErr::Even).',
        whatYouLearned: 'Enum variants name each failure reason.',
        conceptId: 'enums',
      },
      {
        kind: 'choice',
        prompt: 'What does prime_checker(9) return?',
        options: ['Some(Err(Divider(3)))', 'Some(Err(Even))', 'Some(Ok(9))', 'None'],
        correct: [0],
        why: [
          '9 is odd and divisible by 3 — the smallest divider is 3.',
          '9 is odd, not even.',
          '9 is not prime (3 * 3).',
          '9 is greater than 1, so not None.',
        ],
        hints: ['9 is odd; what divides it?', '3 * 3 = 9.'],
        explanation: '9 is odd, and the first odd divisor found is 3, so it returns Some(Err(PrimeErr::Divider(3))).',
        whatYouLearned: 'The smallest divider is the first odd factor found.',
        conceptId: 'result',
      },
      {
        kind: 'bug',
        prompt: 'This primality loop is slow and can mis-handle 2. Click the inefficiency in the bound.',
        code: `let mut i = 3;
while i < nb {
    if nb % i == 0 { return Some(Err(PrimeErr::Divider(i))); }
    i += 2;
}`,
        bugs: [{ line: 2, token: 'nb' }],
        hints: ['How far do you really need to check divisors?', 'A divisor pairs with one below the square root.'],
        explanation: 'Scanning while i < nb is O(n). Stop at the square root: while i * i <= nb. (The spec asks for an optimized solution.)',
        whatYouLearned: 'Bound divisor checks by the square root for efficiency.',
        conceptId: 'error_handling',
      },
    ],
    documentation: {
      apis: [
        { name: 'Option<Result<T, E>>', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'nested outcome type' },
        { name: 'enum with data', url: 'https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html', note: 'PrimeErr::Divider(usize)' },
        { name: 'Rem (%)', url: 'https://doc.rust-lang.org/std/ops/trait.Rem.html', note: 'divisibility test' },
      ],
      links: [
        { title: 'Rust By Example — Result', url: 'https://doc.rust-lang.org/rust-by-example/error/result.html' },
        { title: 'The Book — Enums', url: 'https://doc.rust-lang.org/book/ch06-00-enums.html' },
      ],
      videos: [{ title: "Use and Understand Rust's Result Type", channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=s7z_sdPBwFg' }],
    },
    editorHints: [
      'Return None for nb <= 1; handle 2 as the only even prime.',
      'Reject other even numbers with Err(PrimeErr::Even).',
      'Scan odd divisors only up to the square root; the first one found is Divider(i), else Ok(nb).',
    ],
  },

  profanity_filter: {
    explanationAr: {
      intro: `تمرين قصير عن التحقّق من المدخلات والإبلاغ عن النجاح أو الفشل بوضوح.`,
      sections: [
        { heading: `الهدف`, body: `افحص رسالة. إن كانت فارغة أو تحتوي كلمة ممنوعة، ارفضها بخطأ. وإلا اقبلها وأعِد الرسالة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `Result هو نوع النجاح أو الفشل في رست، حيث تحمل Ok القيمة الجيدة وتحمل Err الخطأ. والدالة contains تخبرك هل يحوي النص جزءاً معيناً من الكلام. والدالة is_empty تخبرك هل النص بلا أي محارف.` },
        { heading: `كيف يفكّر الحل`, body: `نطرح سؤالين رافضين: هل الرسالة فارغة، أم تحتوي الكلمة الممنوعة. إن كان أيٌّ منهما صحيحاً نُعيد خطأً. وإلا نُعيد الرسالة مغلّفة بـ Ok. الصورة الذهنية حارس على باب يردّ كل من جاء خالي اليدين أو يحمل ممنوعاً، ويسمح لمن سواهم بالمرور.` },
        { heading: `انتبه`, body: `إرجاع الرسالة نفسها داخل Ok، لا نسخة منها، يُبقي النص المُستعار نفسه، ولهذا تربط بصمة الدالة المدخل والمخرج معاً. وقد ينسى المبتدئ حالة الفراغ ويفحص الكلمة الممنوعة فقط.` },
        { heading: `تذكّر`, body: `استخدم Result حين قد تفشل العملية. Ok تعني إليك قيمتك، وErr تعني إليك ما حدث من خطأ.` },
      ],
      walkthrough: [
        { code: `if message.is_empty() || message.contains("stupid") {\n    Err("ERROR: illegal")\n} else {\n    Ok(message)\n}`, explain: `العمودان يعنيان أو، فإن كانت الرسالة فارغة أو تحتوي الكلمة الممنوعة نُعيد خطأً. وفي كل حالة أخرى نُعيد الرسالة الأصلية مغلّفة بـ Ok. وجملة if كاملةً هي قيمة الإرجاع.` },
      ],
    },
    explanation: {
      intro: `A short exercise about validating input and reporting success or failure cleanly.`,
      sections: [
        { heading: `The goal`, body: `Check a message. If it is empty or contains a banned word, reject it with an error. Otherwise accept it and hand the message back.` },
        { heading: `Concepts you need`, body: `Result is Rust's success or failure type, with Ok carrying the good value and Err carrying an error. The contains method tells you whether a string holds a given piece of text. The is empty method tells you whether a string has no characters.` },
        { heading: `How the solution thinks`, body: `We ask two rejecting questions: is the message empty, or does it contain the forbidden word. If either is true we return an error. Otherwise we return the message wrapped in Ok. The mental picture is a bouncer at a door who turns away anyone empty handed or carrying something banned, and lets everyone else through.` },
        { heading: `Watch out for`, body: `Returning the message itself inside Ok, rather than a copy, keeps the same borrowed text, which is why the signature ties the input and output together. A beginner might forget the empty case and only check for the banned word.` },
        { heading: `Remember this`, body: `Use Result when an operation can fail. Ok means here is your value, and Err means here is what went wrong.` },
      ],
      walkthrough: [
        { code: `if message.is_empty() || message.contains("stupid") {\n    Err("ERROR: illegal")\n} else {\n    Ok(message)\n}`, explain: `The two bars mean or, so if the message is empty or contains the banned word, we return an error. In every other case we return the original message wrapped in Ok. This whole if expression is the return value.` },
      ],
    },
    expectedIO: {
      input: `message: &str`,
      output: `Result<&str, &str>`,
      behavior: `Ok(message) if the message is clean; Err("ERROR: illegal") if it contains a banned word or is empty.`,
      examples: [
        { input: `"hello there"`, output: `Ok("hello there")` },
        { input: `"you are stupid"`, output: `Err("ERROR: illegal")`, note: `contains profanity` },
        { input: `""`, output: `Err("ERROR: illegal")`, note: `empty message` },
      ],
    },
    overview: {
      whatYouBuild: 'A message validator that returns the text on success or an error string when the message is empty or contains a banned word.',
      inputOutput: 'Input: a &str message. Output: Result<&str, &str> — Ok(message) or Err("ERROR: illegal").',
      constraints: ['Empty input -> Err("ERROR: illegal").', 'Contains "stupid" -> Err("ERROR: illegal").', 'Otherwise Ok(message).'],
      commonMistakes: ['Panicking instead of returning an Err.', 'Mismatching the exact error text.', 'Forgetting the empty-string case.'],
    },
    officialDescription: `## profanity_filter

Create a function check_ms that takes a &str and returns Result<&str, &str>.

- Return Err("ERROR: illegal") if the input is empty.
- Return Err("ERROR: illegal") if the input contains the word "stupid".
- Otherwise return Ok(message).

### Expected function

~~~
pub fn check_ms(message: &str) -> Result<&str, &str>
~~~

### Usage

check_ms("hello there") = Ok("hello there"), check_ms("") = Err("ERROR: illegal"), check_ms("you are stupid") = Err("ERROR: illegal").`,
    objectives: {
      learn: ['Return Result instead of panicking.', 'Test substrings with contains.', 'Branch into Ok/Err.'],
      whyExists: 'A clean introduction to recoverable errors via Result.',
      rustSkills: ['Result', 'string search', 'error handling'],
    },
    conceptIds: ['result', 'error_handling'],
    conceptNotes: {
      result: 'Ok carries the valid message; Err carries the rejection reason.',
      error_handling: 'Validation returns an Err value rather than panicking.',
    },
    similar: {
      title: 'Non-empty validator',
      prompt: 'Write a function that returns Ok(name) if a name is non-empty, else Err("empty"). Same Result branching.',
      starter: `pub fn check_name(name: &str) -> Result<&str, &str> {
    todo!()
}`,
      hint: 'if name.is_empty() { Err("empty") } else { Ok(name) }',
      concepts: ['result', 'error_handling'],
      solution: `pub fn check_name(name: &str) -> Result<&str, &str> {
    if name.is_empty() { Err("empty") } else { Ok(name) }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Detect the banned word. Fill the method that tests for a substring.',
        template: `if message.is_empty() || message._____("stupid") {
    return Err("ERROR: illegal");
}`,
        accepted: ['contains'],
        acceptedPatterns: ['^contains$'],
        hints: ['You want to know if a substring is present.', 'str has contains().'],
        explanation: 'contains("stupid") is true when the banned word appears anywhere in the message.',
        whatYouLearned: 'str::contains tests for a substring.',
        conceptId: 'result',
      },
      {
        prompt: 'On success, return the message. Fill the Result variant.',
        template: `_____(message)`,
        accepted: ['Ok'],
        acceptedPatterns: ['^Ok$'],
        hints: ['Success is the Ok side.', 'Wrap the message in Ok.'],
        explanation: 'A valid message is returned as Ok(message).',
        whatYouLearned: 'Ok(value) is the success side of a Result.',
        conceptId: 'result',
      },
      {
        kind: 'choice',
        prompt: 'What does check_ms("") return?',
        options: ['Err("ERROR: illegal")', 'Ok("")', 'None', 'a panic'],
        correct: [0],
        why: [
          'Empty input is explicitly rejected with the error string.',
          'Empty is not Ok.',
          'The function returns Result, not Option.',
          'It returns an Err value, it does not panic.',
        ],
        hints: ['Empty input is one of the rejection cases.', 'It returns an Err, not Ok.'],
        explanation: 'The empty string triggers the first guard, returning Err("ERROR: illegal").',
        whatYouLearned: 'Handle the empty-input edge case explicitly.',
        conceptId: 'error_handling',
      },
      {
        kind: 'bug',
        prompt: 'This validator crashes instead of reporting an error. Click the mistake.',
        code: `if message.contains("stupid") {
    panic!("ERROR: illegal");
}
Ok(message)`,
        bugs: [{ line: 2, token: 'panic' }],
        hints: ['The function returns a Result for a reason.', 'Errors should be values, not crashes.'],
        explanation: 'panic! aborts the program; a banned word should instead return Err("ERROR: illegal") so the caller can handle it.',
        whatYouLearned: 'Return Err values; reserve panic for unrecoverable bugs.',
        conceptId: 'error_handling',
      },
    ],
    documentation: {
      apis: [
        { name: 'str::contains', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.contains', note: 'detect the banned word' },
        { name: 'str::is_empty', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.is_empty', note: 'reject empty input' },
        { name: 'Result', url: 'https://doc.rust-lang.org/std/result/enum.Result.html', note: 'Ok / Err return' },
      ],
      links: [
        { title: 'The Book — Recoverable errors with Result', url: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html' },
        { title: 'Rust By Example — Result', url: 'https://doc.rust-lang.org/rust-by-example/error/result.html' },
      ],
    },
    editorHints: [
      'Reject empty input and any message containing "stupid".',
      'Both rejections return Err("ERROR: illegal") (exact text).',
      'Otherwise return Ok(message).',
    ],
  },

  insertion_sort: {
    explanationAr: {
      intro: `يتيح لك هذا التمرين مشاهدة خوارزمية فرز تعمل خطوة بخطوة.`,
      sections: [
        { heading: `الهدف`, body: `افرز قائمة أعداد بخوارزمية الفرز بالإدراج، لكن نفّذ عدداً معطىً من التمريرات فقط، مغيّراً القائمة في مكانها. وتنفيذ ما يكفي من التمريرات يفرزها كاملةً.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الفرز في المكان يعني إعادة ترتيب القائمة نفسها لا بناء جديدة، ولهذا تأخذ الدالة استعارة قابلة للتغيير للشريحة. والفرز بالإدراج يبني منطقة مفروزة في المقدّمة بأخذ العنصر التالي وإزلاقه يساراً متجاوزاً أي جار أكبر. والدالة swap تبادل عنصرين.` },
        { heading: `كيف يفكّر الحل`, body: `تخيّل فرز ورق اللعب في يدك. تأخذ الورقة التالية وتحرّكها يساراً حتى تستقرّ في مكانها الصحيح بين الورق المرتّب. وكل تمريرة خارجية تضع عنصراً واحداً في مكانه الصحيح، ونحدّ عدد التمريرات كي يرى المُستدعي تقدّم الفرز. الصورة الذهنية قسم مرتّب ينمو على اليسار بينما يتقلّص القسم الفوضوي على اليمين.` },
        { heading: `انتبه`, body: `يجب أن تتوقف الحلقة الداخلية عند بلوغ المقدّمة وعند توقف الجار الأيسر عن كونه أكبر، وإلا تجاوزت بداية القائمة. وحدّ عدد التمريرات بواحد أقل من الطول يتفادى عملاً زائداً. والفرز بالإدراج يستغرق زمناً يتناسب تقريباً مع مربّع الطول، فهو أفضل للقوائم الصغيرة.` },
        { heading: `تذكّر`, body: `الفرز بالإدراج يُنمّي مقدّمة مفروزة بإزلاق كل عنصر جديد يساراً إلى مكانه. والفرز في المكان يحتاج استعارة قابلة للتغيير كي تعيد الدالة ترتيب بيانات المُستدعي.` },
      ],
      walkthrough: [
        { code: `let limit = steps.min(slice.len().saturating_sub(1));`, explain: `لا نحتاج تمريرات أكثر من واحد أقل من الطول، فنحدّ الخطوات المطلوبة. وsaturating_sub يتفادى النقص تحت الصفر إن كانت الشريحة فارغة.` },
        { code: `for i in 1..=limit {`, explain: `كل تمريرة تأخذ العنصر في الموقع i وستُزلقه إلى المنطقة المفروزة على يساره.` },
        { code: `let mut j = i;\nwhile j > 0 && slice[j - 1] > slice[j] {\n    slice.swap(j - 1, j);\n    j -= 1;\n}`, explain: `بدءاً من i، نظل نبادل العنصر مع جاره الأيسر ما دام ذلك الجار أكبر ولم نبلغ المقدّمة. هذا يُزلق القيمة يساراً حتى تستقرّ في ترتيبها.` },
      ],
    },
    explanation: {
      intro: `This exercise lets you watch a sorting algorithm work one step at a time.`,
      sections: [
        { heading: `The goal`, body: `Sort a list of numbers using insertion sort, but only perform a given number of passes, changing the list in place. Running enough passes fully sorts it.` },
        { heading: `Concepts you need`, body: `Sorting in place means rearranging the same list rather than building a new one, which is why the function takes a mutable borrow of the slice. Insertion sort builds a sorted region at the front by taking the next element and sliding it left past any larger neighbours. The swap method exchanges two elements.` },
        { heading: `How the solution thinks`, body: `Imagine sorting playing cards in your hand. You take the next card and move it left until it sits in the right spot among the cards you already arranged. Each outer pass places one more element correctly, and we limit how many passes run so the caller can watch the sort progress. The mental picture is a growing tidy section on the left while the messy section on the right shrinks.` },
        { heading: `Watch out for`, body: `The inner loop must stop both when it reaches the front and when the element on the left is no longer larger, or it would run off the start of the list. Capping the number of passes to one less than the length avoids pointless extra work. Insertion sort takes time roughly proportional to the square of the length, so it is best for small lists.` },
        { heading: `Remember this`, body: `Insertion sort grows a sorted front by sliding each new item left into place. In place sorting needs a mutable borrow so the function can rearrange the caller's data.` },
      ],
      walkthrough: [
        { code: `let limit = steps.min(slice.len().saturating_sub(1));`, explain: `We never need more passes than one less than the length, so we cap the requested steps. saturating sub avoids underflow if the slice is empty.` },
        { code: `for i in 1..=limit {`, explain: `Each pass takes the element at position i and will slide it into the sorted region to its left.` },
        { code: `let mut j = i;\nwhile j > 0 && slice[j - 1] > slice[j] {\n    slice.swap(j - 1, j);\n    j -= 1;\n}`, explain: `Starting at i, we keep swapping the element with its left neighbour as long as that neighbour is larger and we have not reached the front. This slides the value left until it sits in order.` },
      ],
    },
    expectedIO: {
      input: `slice: &mut [i32], steps: usize`,
      output: `()  // sorts the slice in place`,
      behavior: `Runs exactly 'steps' iterations of insertion sort on the slice, mutating it in place (steps = len-1 fully sorts it).`,
      examples: [
        { input: `[5, 3, 7, 2, 1, 6, 8, 4], steps = 1`, output: `[3, 5, 7, 2, 1, 6, 8, 4]`, note: `one pass` },
        { input: `[5, 3, 7, 2, 1, 6, 8, 4], steps = 7`, output: `[1, 2, 3, 4, 5, 6, 7, 8]`, note: `len-1 → fully sorted` },
      ],
    },
    overview: {
      whatYouBuild: 'An in-place insertion sort that runs only up to a given number of passes — allowing partial or full sorting.',
      inputOutput: 'Input: &mut [i32] and a steps count. Effect: the slice is sorted in place by up to `steps` outer passes.',
      constraints: ['Sort in place (mutable slice).', 'Run at most `steps` passes (and at most len-1).', 'Each pass inserts one more element into the sorted left part.'],
      commonMistakes: ['Running more passes than `steps`.', 'Index underflow when shifting at the front.', 'Returning a new Vec instead of mutating in place.'],
    },
    officialDescription: `## insertion_sort

Implement insertion_sort on a mutable slice of i32, running iterations of the algorithm up to the number indicated by steps.

Insertion sort takes each element (from index 1) and shifts it left past any larger neighbours until it is in order. The steps parameter limits how many outer iterations run, so the array may be partially or fully sorted.

### Expected function

~~~
pub fn insertion_sort(slice: &mut [i32], steps: usize)
~~~

### Usage

With steps = 1 on [5, 3, 7, 2, 1, 6, 8, 4] -> [3, 5, 7, 2, 1, 6, 8, 4]; with steps = 7 the array is fully sorted.`,
    objectives: {
      learn: ['Mutate a slice in place.', 'Implement insertion sort.', 'Bound the work by a parameter.'],
      whyExists: 'Implementing a sort by hand builds core algorithmic understanding and in-place mutation skills.',
      rustSkills: ['mutable slices', 'sorting', 'loops'],
    },
    conceptIds: ['sorting', 'references'],
    conceptNotes: {
      sorting: 'Insertion sort grows a sorted prefix one element at a time.',
      references: 'A &mut [i32] lets the function reorder the caller\'s data in place.',
    },
    similar: {
      title: 'One bubble pass',
      prompt: 'Write a function that performs a single bubble-sort pass over a &mut [i32] (swap adjacent out-of-order pairs once). Same in-place swap idea.',
      starter: `pub fn bubble_pass(slice: &mut [i32]) {
    todo!()
}`,
      hint: 'for i in 0..slice.len().saturating_sub(1) { if slice[i] > slice[i+1] { slice.swap(i, i+1); } }',
      concepts: ['sorting', 'references'],
      solution: `pub fn bubble_pass(slice: &mut [i32]) {
    for i in 0..slice.len().saturating_sub(1) {
        if slice[i] > slice[i + 1] { slice.swap(i, i + 1); }
    }
}`,
    },
    sideQuiz: [
      {
        prompt: 'Shift an element left into place. Fill the call that swaps neighbours.',
        template: `while j > 0 && slice[j - 1] > slice[j] {
    slice._____(j - 1, j);
    j -= 1;
}`,
        accepted: ['swap'],
        acceptedPatterns: ['^swap$'],
        hints: ['Slices have a method to exchange two indices.', 'slice.swap(a, b).'],
        explanation: 'swap(j-1, j) moves the element one position left while it is smaller than its left neighbour.',
        whatYouLearned: 'slice::swap exchanges two elements in place.',
        conceptId: 'sorting',
      },
      {
        prompt: 'Limit the passes. Fill the bound so we never exceed the slice or `steps`.',
        template: `let limit = steps.min(slice.len()._____(1));`,
        accepted: ['saturating_sub'],
        acceptedPatterns: ['^saturating_sub$'],
        hints: ['len - 1 could underflow on an empty slice.', 'Use saturating_sub(1).'],
        explanation: 'saturating_sub(1) yields len-1 without underflowing to a huge usize when the slice is empty.',
        whatYouLearned: 'saturating_sub avoids unsigned underflow.',
        conceptId: 'references',
      },
      {
        kind: 'choice',
        prompt: 'After insertion_sort(&mut [5,3,7,2,1,6,8,4], 1), what is the array?',
        options: ['[3, 5, 7, 2, 1, 6, 8, 4]', '[1, 2, 3, 4, 5, 6, 7, 8]', '[3, 5, 2, 7, 1, 6, 8, 4]', 'unchanged'],
        correct: [0],
        why: [
          'One pass inserts index 1 (the 3) before the 5; the rest is untouched.',
          'That is the fully sorted result (needs more passes).',
          'Only the first two elements change on pass 1.',
          'Pass 1 does change the array.',
        ],
        hints: ['steps = 1 does a single outer pass.', 'Only element at index 1 is inserted.'],
        explanation: 'The first pass moves the 3 left past the 5, giving [3, 5, 7, ...]; later elements wait for later passes.',
        whatYouLearned: 'Each pass places exactly one more element.',
        conceptId: 'sorting',
      },
      {
        kind: 'order',
        prompt: 'Assemble insertion_sort. One fragment does not belong.',
        scaffold: `pub fn insertion_sort(slice: &mut [i32], steps: usize) {
    [ slot 1 ]
    [ slot 2 ]
}`,
        fragments: [
          'let limit = steps.min(slice.len().saturating_sub(1));',
          'for i in 1..=limit { let mut j = i; while j > 0 && slice[j - 1] > slice[j] { slice.swap(j - 1, j); j -= 1; } }',
        ],
        distractors: ['slice.sort();'],
        hints: ['Compute the pass limit, then run the bounded insertion loop.', 'slice.sort() would ignore the steps parameter.'],
        explanation: 'First clamp the number of passes, then run insertion sort for that many outer iterations. slice.sort() is a distractor — it ignores steps.',
        whatYouLearned: 'A bounded loop gives partial sorting controlled by a parameter.',
        conceptId: 'sorting',
      },
    ],
    documentation: {
      apis: [
        { name: 'slice::swap', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.swap', note: 'exchange two elements' },
        { name: 'usize::saturating_sub', url: 'https://doc.rust-lang.org/std/primitive.usize.html#method.saturating_sub', note: 'safe len - 1' },
        { name: 'Ord::min', url: 'https://doc.rust-lang.org/std/cmp/trait.Ord.html#method.min', note: 'clamp the pass count' },
      ],
      links: [
        { title: 'Insertion sort (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Insertion_sort' },
        { title: 'The Book — Slices', url: 'https://doc.rust-lang.org/book/ch04-03-slices.html' },
      ],
      videos: [{ title: 'Crust of Rust: Sorting Algorithms', channel: 'Jon Gjengset', url: 'https://www.youtube.com/watch?v=h4RkCyJyXmM' }],
    },
    editorHints: [
      'Sort in place through the &mut slice — do not return a new Vec.',
      'Run at most `steps` outer passes (and at most len-1).',
      'Each pass shifts one element left with slice.swap until it is in order.',
    ],
  },

  matrix_determinant: {
    explanationAr: {
      intro: `يحوّل هذا التمرين صيغة رياضية مباشرة إلى كود، ويعلّمك الوصول إلى المصفوفات المتداخلة.`,
      sections: [
        { heading: `الهدف`, body: `احسب مُحدِّد مصفوفة 3×3، وهو رقم واحد يلخّص المصفوفة ويُستعمل في كل أنحاء الجبر الخطي.` },
        { heading: `المفاهيم التي تحتاجها`, body: `المصفوفة ثابتة الحجم تحمل عدداً معلوماً من القيم، ومصفوفة من المصفوفات تعطينا شبكة نصل إليها بقوسين مربّعين، الصف أولاً ثم العمود. ولمُحدِّد مصفوفة 3×3 صيغة معيارية مبنية من حواصل ضرب عناصرها.` },
        { heading: `كيف يفكّر الحل`, body: `نطبّق التفكيك بالعوامل المرافقة على طول الصف العلوي. كل عنصر في الصف العلوي يُضرب في مُحدِّد المصفوفة الصغيرة 2×2 المتبقّية بعد شطب صفّه وعموده، بإشارات زائد وناقص متناوبة. ونكتب تلك الصيغة باستخدام مواقع الشبكة. الصورة الذهنية المسح عبر الصف العلوي، ولكل عنصر الضرب في تقاطع الأعداد الأربعة التي ليست في صفّه ولا عموده.` },
        { heading: `انتبه`, body: `تتناوب الإشارات زائد ثم ناقص ثم زائد عبر الصف العلوي، وخطأ في إشارة يقلب النتيجة. والوصول صف ثم عمود، فـ m من صفر من واحد هو الصف صفر العمود واحد. ولأن الحجم ثابت عند 3×3، يمكننا تثبيت الصيغة بدل حلقة.` },
        { heading: `تذكّر`, body: `اقرأ m من صف من عمود كإحداثيات شبكة. والحدّ الأوسط في مُحدِّد 3×3 يُطرح لا يُجمع.` },
      ],
      walkthrough: [
        { code: `m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])`, explain: `العنصر الأول في الصف العلوي مضروباً في حاصل تقاطع الكتلة 2×2 في الأسفل يميناً. والإشارة الأولى موجبة.` },
        { code: `- m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])`, explain: `ناقص العنصر الثاني في الصف العلوي مضروباً في تقاطعه 2×2 المطابق. وهذا الحدّ الأوسط يُطرح، وهو الجزء السهل أن تخطئ فيه.` },
        { code: `+ m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])`, explain: `زائد العنصر الثالث في الصف العلوي مضروباً في تقاطعه 2×2. وجمع الحدود الثلاثة يعطي المُحدِّد، ولعدم وجود فاصلة منقوطة يُعاد.` },
      ],
    },
    explanation: {
      intro: `This exercise turns a math formula directly into code, and teaches indexing into nested arrays.`,
      sections: [
        { heading: `The goal`, body: `Compute the determinant of a three by three matrix, a single number that summarizes the matrix and is used throughout linear algebra.` },
        { heading: `Concepts you need`, body: `A fixed size array holds a known number of values, and an array of arrays gives us a grid we index with two sets of brackets, row first then column. The determinant of a three by three matrix has a standard formula built from products of its entries.` },
        { heading: `How the solution thinks`, body: `We apply the well known cofactor expansion along the top row. Each top row entry is multiplied by the determinant of the little two by two matrix that remains when you cross out its row and column, with alternating plus and minus signs. We simply write that formula out using the grid positions. The mental picture is sweeping across the top row, and for each entry, multiplying by the cross of the four numbers not in its row or column.` },
        { heading: `Watch out for`, body: `The signs alternate plus, minus, plus across the top row, and getting one wrong flips the result. Indexing is row then column, so m of zero of one is row zero, column one. Because the size is fixed at three by three, we can hard code the formula rather than loop.` },
        { heading: `Remember this`, body: `Read m of row of column as grid coordinates. The middle term of the three by three determinant is subtracted, not added.` },
      ],
      walkthrough: [
        { code: `m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])`, explain: `The first top row entry times the cross product of the bottom right two by two block. The first sign is positive.` },
        { code: `- m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])`, explain: `Minus the second top row entry times its matching two by two cross. This middle term is subtracted, which is the easy part to get wrong.` },
        { code: `+ m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])`, explain: `Plus the third top row entry times its two by two cross. Adding the three terms gives the determinant, and with no semicolon it is returned.` },
      ],
    },
    expectedIO: {
      input: `matrix: [[isize; 3]; 3]`,
      output: `isize`,
      behavior: `Returns the determinant of the 3x3 matrix.`,
      examples: [
        { input: `[[1, 2, 3], [4, 5, 6], [7, 8, 10]]`, output: `-3` },
        { input: `[[2, 0, 0], [0, 3, 0], [0, 0, 4]]`, output: `24`, note: `diagonal → product` },
        { input: `[[1, 0, 0], [0, 1, 0], [0, 0, 1]]`, output: `1`, note: `identity` },
      ],
    },
    overview: {
      whatYouBuild: 'A function that computes the determinant of a 3x3 integer matrix by cofactor expansion along the top row.',
      inputOutput: 'Input: [[isize; 3]; 3]. Output: the determinant as isize. The example matrix gives 35.',
      constraints: ['Use cofactor expansion (or the rule of Sarrus).', 'Mind the alternating + - + signs.', 'A 2x2 determinant is a*d - b*c.'],
      commonMistakes: ['Getting the cofactor signs wrong (the middle term is subtracted).', 'Picking the wrong minor elements.'],
    },
    officialDescription: `## matrix_determinant

Create a function that receives a 3x3 matrix ([[isize; 3]; 3]) and returns its determinant.

A 2x2 determinant |a b / c d| is a*d - b*c. For a 3x3 matrix, expand along the top row: a*det(minor of a) - b*det(minor of b) + c*det(minor of c).

### Expected function

~~~
pub fn matrix_determinant(matrix: [[isize; 3]; 3]) -> isize
~~~

### Example

The determinant of [[1, 2, 4], [2, -1, 3], [4, 0, 1]] is 35.`,
    objectives: {
      learn: ['Index a 2-D array.', 'Apply cofactor expansion.', 'Track the alternating signs.'],
      whyExists: 'Connects nested indexing with a real linear-algebra formula.',
      rustSkills: ['arrays', 'arithmetic', 'algorithms'],
    },
    conceptIds: ['matrices', 'recursion'],
    conceptNotes: {
      matrices: 'm[row][col] indexes the grid; the determinant combines 2x2 minors.',
      recursion: 'A 3x3 determinant is defined in terms of 2x2 determinants — the same idea generalizes recursively.',
    },
    similar: {
      title: '2x2 determinant',
      prompt: 'Write det2(m: [[isize; 2]; 2]) -> isize returning a*d - b*c. This is the building block of the 3x3 case.',
      starter: `pub fn det2(m: [[isize; 2]; 2]) -> isize {
    todo!()
}`,
      hint: 'm[0][0]*m[1][1] - m[0][1]*m[1][0]',
      concepts: ['matrices'],
      solution: `pub fn det2(m: [[isize; 2]; 2]) -> isize {
    m[0][0] * m[1][1] - m[0][1] * m[1][0]
}`,
    },
    sideQuiz: [
      {
        prompt: 'Fill the 2x2 determinant of the minor for the top-left element a (rows 1-2, cols 1-2).',
        template: `let a_term = m[0][0] * (_____);`,
        accepted: ['m[1][1] * m[2][2] - m[1][2] * m[2][1]'],
        acceptedPatterns: ['^m\\[1\\]\\[1\\]\\s*\\*\\s*m\\[2\\]\\[2\\]\\s*-\\s*m\\[1\\]\\[2\\]\\s*\\*\\s*m\\[2\\]\\[1\\]$'],
        hints: ['Delete a\'s row (0) and column (0); the minor is rows 1-2, cols 1-2.', 'Its determinant is e*i - f*h.'],
        explanation: 'The minor for a excludes row 0 and column 0, leaving [[e,f],[h,i]] whose determinant is m[1][1]*m[2][2] - m[1][2]*m[2][1].',
        whatYouLearned: 'A cofactor uses the 2x2 determinant of the remaining minor.',
        conceptId: 'matrices',
      },
      {
        kind: 'choice',
        prompt: 'Cofactor expansion along the top row uses which sign pattern?',
        options: ['+ - +', '+ + +', '- + -', '+ - + - (four terms)'],
        correct: [0],
        why: [
          'For a 3x3, the top-row cofactors alternate plus, minus, plus.',
          'The middle term must be subtracted.',
          'The first term is positive, not negative.',
          'A 3x3 row has three terms, not four.',
        ],
        hints: ['The signs alternate starting with +.', 'Three columns → three signs.'],
        explanation: 'Expanding along row 0: +a*minor - b*minor + c*minor.',
        whatYouLearned: 'Cofactor signs alternate + - + along a row.',
        conceptId: 'matrices',
      },
      {
        kind: 'bug',
        prompt: 'The middle term has the wrong sign. Click the mistake.',
        code: `m[0][0] * (m[1][1]*m[2][2] - m[1][2]*m[2][1])
    + m[0][1] * (m[1][0]*m[2][2] - m[1][2]*m[2][0])
    + m[0][2] * (m[1][0]*m[2][1] - m[1][1]*m[2][0])`,
        bugs: [{ line: 2, token: '+' }],
        hints: ['Remember the + - + pattern.', 'The b term should be subtracted.'],
        explanation: 'The second (b) cofactor must be subtracted: change the leading + on line 2 to a minus.',
        whatYouLearned: 'The middle cofactor is negated.',
        conceptId: 'matrices',
      },
    ],
    documentation: {
      apis: [
        { name: 'Arrays [[T; N]; M]', url: 'https://doc.rust-lang.org/std/primitive.array.html', note: 'fixed-size 2-D matrix' },
        { name: 'isize', url: 'https://doc.rust-lang.org/std/primitive.isize.html', note: 'signed result' },
      ],
      links: [
        { title: 'Determinant (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Determinant' },
        { title: 'Rust By Example — Arrays', url: 'https://doc.rust-lang.org/rust-by-example/primitives/array.html' },
      ],
    },
    editorHints: [
      'Expand along the top row: a*minor - b*minor + c*minor.',
      'Each minor is a 2x2 determinant (e*i - f*h form).',
      'Watch the alternating + - + signs.',
    ],
  },

  order_books: {
    explanationAr: {
      intro: `يعلّمك هذا التمرين كيف تفرز قائمة من عناصرك المركّبة حسب حقل تختاره.`,
      sections: [
        { heading: `الهدف`, body: `بإعطاء كاتب يملك قائمة كتب، أعِد ترتيب تلك القائمة أبجدياً حسب عنوان الكتاب، متجاهلاً حالة الأحرف، مغيّراً قائمة الكاتب في مكانها.` },
        { heading: `المفاهيم التي تحتاجها`, body: `البنية تجمع حقولاً مترابطة، فالكتاب له عنوان وسنة، والكاتب له اسم وقائمة كتب. والدالة sort_by ترتّب قائمة باستخدام مقارنة توفّرها أنت. والمُغلَّف ذو المُعاملين يصف كيف تقارن أي عنصرين. وتحويل العنوانين إلى أحرف صغيرة قبل المقارنة يجعل الفرز غير حسّاس للحالة.` },
        { heading: `كيف يفكّر الحل`, body: `يحتاج الفرز قاعدة لأيّ العنصرين يأتي أولاً. نطلب من sort_by مقارنة كتابين بعنوانيهما بالأحرف الصغيرة، فلا تؤثّر الحالة في الترتيب. وبما أننا نفرز قائمة الكاتب نفسها عبر استعارة قابلة للتغيير، يثبت التغيير. الصورة الذهنية فرش الكتب على طاولة وخلطها حتى تُقرأ العناوين بترتيب المعجم.` },
        { heading: `انتبه`, body: `مقارنة العناوين بلا تحويل إلى أحرف صغيرة ستضع كل الحروف الكبيرة قبل الصغيرة، وهو نادراً ما يتوقّعه الناس. والفرز في المكان يعني حاجتنا إلى استعارة قابلة للتغيير للكاتب، ونسيان ذلك يمنع حفظ التغيير.` },
        { heading: `تذكّر`, body: `الدالة sort_by تأخذ مُغلَّفاً يقارن عنصرين ويُعيد ترتيبهما. ووحّد القيم، مثل تصغير الأحرف، قبل المقارنة لفرز عادل.` },
      ],
      walkthrough: [
        { code: `pub struct Book {\n    pub title: String,\n    pub year: u32,\n}`, explain: `الكتاب يجمع عنواناً وسنة نشر في نوع واحد مسمّى.` },
        { code: `pub struct Writer {\n    pub first_name: String,\n    pub last_name: String,\n    pub books: Vec<Book>,\n}`, explain: `الكاتب يحمل اسماً ويملك قائمة كتب قابلة للنمو، وهي القائمة التي سنفرزها.` },
        { code: `writer.books.sort_by(|a, b| {\n    a.title.to_lowercase().cmp(&b.title.to_lowercase())\n});`, explain: `تعيد sort_by ترتيب الكتب في مكانها. ولأي كتابين a وb، نقارن عنوانيهما بالأحرف الصغيرة، فتكون النتيجة أبجدية وغير حسّاسة للحالة.` },
      ],
    },
    explanation: {
      intro: `This exercise teaches you how to sort a list of your own structured items by a chosen field.`,
      sections: [
        { heading: `The goal`, body: `Given a writer who owns a list of books, reorder that list alphabetically by book title, ignoring case, changing the writer's list in place.` },
        { heading: `Concepts you need`, body: `A struct groups related fields, so a Book has a title and a year, and a Writer has a name and a list of books. The sort by method orders a list using a comparison you provide. A closure with two parameters describes how to compare any two items. Lower casing both titles before comparing makes the sort case insensitive.` },
        { heading: `How the solution thinks`, body: `Sorting needs a rule for which of two items comes first. We tell sort by to compare two books by their lower cased titles, so capitalization does not affect the order. Because we sort the writer's own list through a mutable borrow, the change sticks. The mental picture is laying the books on a table and shuffling them until the titles read in dictionary order.` },
        { heading: `Watch out for`, body: `Comparing titles without lower casing would place all capital letters before lowercase ones, which is rarely what people expect. Sorting in place means we need a mutable borrow of the writer, and forgetting that would stop the change from being saved.` },
        { heading: `Remember this`, body: `The sort by method takes a closure that compares two items and returns their order. Normalize values, like lower casing, before comparing for fair sorting.` },
      ],
      walkthrough: [
        { code: `pub struct Book {\n    pub title: String,\n    pub year: u32,\n}`, explain: `A Book groups a title and a year of publication into one named type.` },
        { code: `pub struct Writer {\n    pub first_name: String,\n    pub last_name: String,\n    pub books: Vec<Book>,\n}`, explain: `A Writer holds a name and owns a growable list of books, which is the list we will sort.` },
        { code: `writer.books.sort_by(|a, b| {\n    a.title.to_lowercase().cmp(&b.title.to_lowercase())\n});`, explain: `The sort by method reorders the books in place. For any two books a and b, we compare their lower cased titles, so the result is alphabetical and case insensitive.` },
      ],
    },
    expectedIO: {
      input: `writer: &mut Writer  (Writer.books: Vec<Book { title, year }>)`,
      output: `()  // sorts writer.books in place`,
      behavior: `Sorts the writer's books alphabetically by title (case-insensitive), in place.`,
      examples: [
        { input: `["Nineteen Eighty-Four", "Animal Farm", "Burmese Days"]`, output: `["Animal Farm", "Burmese Days", "Nineteen Eighty-Four"]` },
        { input: `["banana", "Apple"]`, output: `["Apple", "banana"]`, note: `case-insensitive` },
      ],
    },
    overview: {
      whatYouBuild: 'A function that sorts a writer\'s list of books alphabetically by title, case-insensitively, in place.',
      inputOutput: 'Input: &mut Writer (which owns a Vec<Book>). Effect: writer.books is sorted by title, ignoring case.',
      constraints: ['Sort in place via sort_by.', 'Comparison must be case-insensitive.', 'Order by the book title.'],
      commonMistakes: ['Sorting case-sensitively (uppercase sorts before lowercase).', 'Returning a new Vec instead of mutating in place.'],
    },
    officialDescription: `## order_books

Given a Writer that owns a Vec of Book (each Book has a title and a year), implement order_books to sort the writer's books alphabetically by title, case-insensitively, in place.

### Expected function

~~~
pub fn order_books(writer: &mut Writer)
~~~

### Behavior

After sorting, titles appear in case-insensitive alphabetical order (e.g. Hamlet, MacBeth, Othelo, Romeo and Juliet).`,
    objectives: {
      learn: ['Sort a Vec with sort_by and a comparator closure.', 'Compare strings case-insensitively.', 'Mutate data behind a &mut reference.'],
      whyExists: 'Teaches custom sorting with closures over struct fields.',
      rustSkills: ['sorting', 'closures', 'structs'],
    },
    conceptIds: ['sorting', 'closures', 'structs'],
    conceptNotes: {
      sorting: 'sort_by orders elements using a comparator you provide.',
      closures: 'The comparator closure compares the two books\' titles.',
    },
    similar: {
      title: 'Sort names case-insensitively',
      prompt: 'Sort a Vec<String> of names alphabetically ignoring case, in place. Same sort_by + to_lowercase comparator.',
      starter: `pub fn sort_names(names: &mut Vec<String>) {
    todo!()
}`,
      hint: 'names.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()))',
      concepts: ['sorting', 'closures'],
      solution: `pub fn sort_names(names: &mut Vec<String>) {
    names.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()));
}`,
    },
    sideQuiz: [
      {
        prompt: 'Sort the books by title, ignoring case. Fill the comparator body.',
        template: `writer.books.sort_by(|a, b| {
    _____
});`,
        accepted: ['a.title.to_lowercase().cmp(&b.title.to_lowercase())'],
        acceptedPatterns: ['^a\\.title\\.to_lowercase\\(\\)\\.cmp\\(&b\\.title\\.to_lowercase\\(\\)\\)$'],
        hints: ['Compare the lowercased titles.', 'Use a.title.to_lowercase().cmp(&b.title.to_lowercase()).'],
        explanation: 'cmp returns an Ordering; comparing lowercased titles makes the sort case-insensitive.',
        whatYouLearned: 'sort_by with a comparator orders by any key you choose.',
        conceptId: 'sorting',
      },
      {
        kind: 'choice',
        prompt: 'Why lowercase both titles before comparing?',
        options: [
          'so "apple" and "Apple" sort together (case-insensitive)',
          'to make the sort faster',
          'because cmp does not work on String',
          'to remove punctuation',
        ],
        correct: [0],
        why: [
          'Raw comparison puts all uppercase before lowercase; lowercasing both removes that bias.',
          'It is about ordering, not speed.',
          'cmp works fine on String; the issue is case.',
          'Lowercasing does not remove punctuation.',
        ],
        hints: ['ASCII uppercase sorts before lowercase.', 'Normalize case for a fair comparison.'],
        explanation: 'Without lowercasing, "Zebra" would sort before "apple"; lowercasing both gives true alphabetical order.',
        whatYouLearned: 'Normalize keys for case-insensitive ordering.',
        conceptId: 'sorting',
      },
      {
        kind: 'bug',
        prompt: 'This sort is case-sensitive. Click the change needed (the call that should lowercase).',
        code: `writer.books.sort_by(|a, b| {
    a.title.cmp(&b.title)
});`,
        bugs: [{ line: 2, token: 'cmp' }],
        hints: ['Titles must compare without case.', 'Lowercase both sides before cmp.'],
        explanation: 'Comparing raw titles is case-sensitive; lowercase both first: a.title.to_lowercase().cmp(&b.title.to_lowercase()).',
        whatYouLearned: 'Apply to_lowercase() to both keys for a case-insensitive sort.',
        conceptId: 'sorting',
      },
    ],
    documentation: {
      apis: [
        { name: 'slice::sort_by', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.sort_by', note: 'sort with a comparator' },
        { name: 'str::to_lowercase', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.to_lowercase', note: 'case-insensitive key' },
        { name: 'Ord::cmp', url: 'https://doc.rust-lang.org/std/cmp/trait.Ord.html#tymethod.cmp', note: 'returns an Ordering' },
      ],
      links: [
        { title: 'The Book — Closures', url: 'https://doc.rust-lang.org/book/ch13-01-closures.html' },
        { title: 'std::cmp::Ordering', url: 'https://doc.rust-lang.org/std/cmp/enum.Ordering.html' },
      ],
      videos: [{ title: 'Closures in Rust', channel: "Let's Get Rusty", url: 'https://www.youtube.com/watch?v=kZXJvLfjUS4' }],
    },
    editorHints: [
      'Use writer.books.sort_by(|a, b| ...) to sort in place.',
      'Compare a.title.to_lowercase() with b.title.to_lowercase().',
      'cmp on the lowercased titles gives case-insensitive order.',
    ],
  },

  rot21: {
    explanationAr: {
      intro: `هذا التمرين شيفرة قيصر صغيرة، ويعلّمك أن الأحرف ليست في حقيقتها سوى أرقام.`,
      sections: [
        { heading: `الهدف`, body: `أزِح كل حرف في النص واحداً وعشرين موضعاً للأمام في الأبجدية، ملتفّاً من آخرها إلى أولها، مع الحفاظ على حالة الحرف وترك غير الأحرف كما هو.` },
        { heading: `المفاهيم التي تحتاجها`, body: `لكل محرف رمز عددي، والأحرف متتالية في الترتيب، فيمكننا إجراء حساب عليها. وطرح رمز أول الأبجدية مثلاً يحوّل أول حرف إلى صفر والذي يليه إلى واحد وهكذا. وعامل الباقي على ستة وعشرين يلفّ الناتج عائداً إلى الأبجدية. وmap تحوّل كل محرف وcollect يعيد بناء النص.` },
        { heading: `كيف يفكّر الحل`, body: `لكل حرف نجد موقعه في الأبجدية، نضيف واحداً وعشرين، نلتفّ بالباقي على ستة وعشرين، ثم نحوّله عائداً إلى حرف. ونفعل ذلك على حدة للأحرف الصغيرة والكبيرة كي تُحفظ الحالة، ونمرّر كل ما عداه دون تغيير. الصورة الذهنية قرص لكل حرف تديره للأمام واحداً وعشرين سنّاً، ملتفّاً عند نهاية الأبجدية عائداً إلى بدايتها.` },
        { heading: `انتبه`, body: `نسيان الالتفاف بالباقي سيدفع الأحرف بعد آخر الأبجدية إلى محارف أخرى. ومعالجة الأحرف الصغيرة والكبيرة بحرف ربط خاص بكل منها يُبقي الحالة صحيحة. والأرقام والمسافات وعلامات الترقيم يجب تركها كما هي تماماً.` },
        { heading: `تذكّر`, body: `حوّل الحرف إلى رقم من صفر إلى خمسة وعشرين، أزِح، التفّ بالباقي، ثم حوّل عائداً. الأحرف أرقام متنكّرة.` },
      ],
      walkthrough: [
        { code: `input.chars().map(|c| {`, explain: `نحوّل النص محرفاً محرفاً، وما يصير إليه كل محرف يُجمع في النهاية في النص الجديد.` },
        { code: `if c.is_ascii_lowercase() {\n    (((c as u8 - b'a' + 21) % 26) + b'a') as char\n}`, explain: `للحرف الصغير، يعطي طرح رمز أول حرف موقعَه، نضيف واحداً وعشرين، نلتفّ بالباقي على ستة وعشرين، ثم نعيد إضافة رمز أول حرف ونحوّله إلى محرف. تلك هي الإزاحة مع البقاء صغيراً.` },
        { code: `else if c.is_ascii_uppercase() {\n    (((c as u8 - b'A' + 21) % 26) + b'A') as char\n}`, explain: `الإزاحة نفسها مرتكزة على أول حرف كبير، فتبقى الأحرف الكبيرة كبيرة.` },
        { code: `else { c }\n}).collect()`, explain: `أي شيء ليس حرفاً يُمرَّر دون تغيير، وcollect يجمع كل المحارف المحوّلة في النص النهائي.` },
      ],
    },
    explanation: {
      intro: `This exercise is a small Caesar cipher, and it teaches how letters are really just numbers underneath.`,
      sections: [
        { heading: `The goal`, body: `Shift every letter in the text forward by twenty one places in the alphabet, wrapping around from z back to a, while keeping the upper or lower case and leaving non letters untouched.` },
        { heading: `Concepts you need`, body: `Each character has a numeric code, and letters sit in consecutive order, so we can do arithmetic on them. Subtracting the code of a, for example, turns a into zero, b into one, and so on. The remainder operator, percent twenty six, wraps the result back into the alphabet. map transforms each character and collect rebuilds the string.` },
        { heading: `How the solution thinks`, body: `For each letter we find its position in the alphabet, add twenty one, wrap around using remainder by twenty six, and convert back to a letter. We do this separately for lowercase and uppercase so the case is preserved, and we pass everything else through unchanged. The mental picture is a dial for each letter that you spin forward twenty one notches, looping past z back to a.` },
        { heading: `Watch out for`, body: `Forgetting the wrap around with remainder would push letters past z into other characters. Handling uppercase and lowercase with their own anchor letters keeps the case correct. Digits, spaces, and punctuation must be left exactly as they are.` },
        { heading: `Remember this`, body: `Map a letter to a number from zero to twenty five, shift, wrap with remainder, then map back. Letters are numbers in disguise.` },
      ],
      walkthrough: [
        { code: `input.chars().map(|c| {`, explain: `We transform the text one character at a time, and whatever each character becomes is collected at the end into the new string.` },
        { code: `if c.is_ascii_lowercase() {\n    (((c as u8 - b'a' + 21) % 26) + b'a') as char\n}`, explain: `For a lowercase letter, subtracting the code of a gives its position, we add twenty one, wrap with remainder by twenty six, then add the code of a back and turn it into a character. That is the shift, staying lowercase.` },
        { code: `else if c.is_ascii_uppercase() {\n    (((c as u8 - b'A' + 21) % 26) + b'A') as char\n}`, explain: `The same shift anchored at uppercase A, so uppercase letters stay uppercase.` },
        { code: `else { c }\n}).collect()`, explain: `Anything that is not a letter is passed through unchanged, and collect gathers all the transformed characters into the final string.` },
      ],
    },
    expectedIO: {
      input: `input: &str`,
      output: `String`,
      behavior: `Caesar cipher shifting each letter forward by 21 (a → v); case is preserved and non-letters are left unchanged.`,
      examples: [
        { input: `"a"`, output: `"v"` },
        { input: `"MISS"`, output: `"HDNN"`, note: `uppercase preserved` },
        { input: `"rot21 works!"`, output: `"mjo21 rjmfn!"`, note: `digits/punctuation unchanged` },
      ],
    },
    overview: {
      whatYouBuild: 'A ROT cipher that rotates each ASCII letter 21 positions forward in the alphabet, leaving non-letters unchanged and preserving case.',
      inputOutput: 'Input: a &str. Output: a String with letters shifted by 21. "MISS" -> "HDNN".',
      constraints: ['Only ASCII letters are shifted.', 'Wrap around with modulo 26.', 'Preserve case; pass non-letters through unchanged.'],
      commonMistakes: ['Forgetting to wrap with % 26.', 'Using the wrong base (\'a\' vs \'A\').', 'Shifting non-letter characters.'],
    },
    officialDescription: `## rot21

Implement rot21, which rotates each letter of the input 21 positions to the right in the alphabet, leaving non-letter characters unchanged and preserving case.

### Function signature

~~~
pub fn rot21(input: &str) -> String
~~~

### Examples

'a' -> 'v', "MISS" -> "HDNN", "Testing numbers 1 2 3" -> "Oznodib iphwzmn 1 2 3".`,
    objectives: {
      learn: ['Map over characters.', 'Do modular arithmetic on letter offsets.', 'Preserve case and non-letters.'],
      whyExists: 'A classic cipher that drills character arithmetic and modulo wrap-around.',
      rustSkills: ['chars', 'arithmetic', 'iterators'],
    },
    conceptIds: ['iterators', 'parsing'],
    conceptNotes: {
      iterators: 'chars().map(...).collect() transforms each character into the result String.',
      parsing: 'Each letter is converted to a 0..26 offset, shifted, and converted back.',
    },
    similar: {
      title: 'ROT13',
      prompt: 'Implement rot13 (shift letters by 13). Identical structure to rot21 with a different shift.',
      starter: `pub fn rot13(input: &str) -> String {
    todo!()
}`,
      hint: 'For a lowercase c: (((c as u8 - b\'a\' + 13) % 26) + b\'a\') as char.',
      concepts: ['iterators', 'parsing'],
      solution: `pub fn rot13(input: &str) -> String {
    input.chars().map(|c| {
        if c.is_ascii_lowercase() { (((c as u8 - b'a' + 13) % 26) + b'a') as char }
        else if c.is_ascii_uppercase() { (((c as u8 - b'A' + 13) % 26) + b'A') as char }
        else { c }
    }).collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Shift a lowercase letter by 21 with wrap-around. Fill the modulus.',
        template: `(((c as u8 - b'a' + 21) % _____) + b'a') as char`,
        accepted: ['26'],
        acceptedPatterns: ['^26$'],
        hints: ['How many letters in the alphabet?', 'Wrap with % 26.'],
        explanation: '% 26 keeps the shifted offset within the 26-letter alphabet, wrapping past z back to a.',
        whatYouLearned: 'Modulo wraps an index back into range.',
        conceptId: 'parsing',
      },
      {
        kind: 'choice',
        prompt: 'What does rot21("a") produce?',
        options: ["\"v\"", "\"u\"", "\"b\"", "\"a\""],
        correct: [0],
        why: [
          "a is index 0; 0 + 21 = 21, which is 'v'.",
          "u is index 20, one short.",
          "b would be a shift of 1, not 21.",
          "a unchanged would be a shift of 0 or 26.",
        ],
        hints: ["'a' is offset 0.", '0 + 21 = 21 → the 22nd letter.'],
        explanation: "'a' has offset 0; (0 + 21) % 26 = 21, which maps to 'v'.",
        whatYouLearned: 'Letter arithmetic uses 0-based offsets from the base letter.',
        conceptId: 'parsing',
      },
      {
        kind: 'bug',
        prompt: 'Uppercase letters come out wrong here. Click the mistake.',
        code: `else if c.is_ascii_uppercase() {
    (((c as u8 - b'a' + 21) % 26) + b'A') as char
}`,
        bugs: [{ line: 2, token: "b'a'" }],
        hints: ['Uppercase offsets must be measured from the uppercase base.', "Check the subtraction base."],
        explanation: "For uppercase letters subtract b'A', not b'a'; otherwise the offset is wrong (the gap between 'A' and 'a' is 32).",
        whatYouLearned: 'Anchor letter arithmetic to the correct case base.',
        conceptId: 'parsing',
      },
    ],
    documentation: {
      apis: [
        { name: 'char::is_ascii_lowercase', url: 'https://doc.rust-lang.org/std/primitive.char.html#method.is_ascii_lowercase', note: 'detect letters to shift' },
        { name: 'Iterator::map', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.map', note: 'transform each char' },
        { name: 'as casts (char/u8)', url: 'https://doc.rust-lang.org/rust-by-example/types/cast.html', note: 'char <-> byte arithmetic' },
      ],
      links: [
        { title: 'ROT13 (Wikipedia)', url: 'https://en.wikipedia.org/wiki/ROT13' },
        { title: 'Rust By Example — Casting', url: 'https://doc.rust-lang.org/rust-by-example/types/cast.html' },
      ],
    },
    editorHints: [
      'map over input.chars() and collect into a String.',
      'For each letter, subtract the case base, add 21, take % 26, add the base back.',
      'Leave non-letters unchanged.',
    ],
  },

  display_table: {
    explanationAr: {
      intro: `هذا تمرين تنسيق أكبر يجمع بين القياس والحشو ورسم جدول.`,
      sections: [
        { heading: `الهدف`, body: `اطبع جدولاً برؤوس وصفوف كشبكة مؤطّرة مرتّبة، حيث يكون كل عمود عريضاً بما يكفي لأطول قيمة فيه وتكون كل خلية موسّطة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `تنفيذ Display يتحكّم في طباعة الجدول. ونقيس طول النص بالمحارف، ونبني نصوصاً محشوّة بـ repeat، ونستخدم مُغلَّفاً لتوسيط قيمة داخل عرض ثابت. والماكروان write وwriteln يرسلان الأسطر إلى المنسّق.` },
        { heading: `كيف يفكّر الحل`, body: `نعمل على ثلاث مراحل. أولاً نقيس عرض كل عمود بأخذ أطول قيمة بين رأسه وكل خلاياه. ثانياً نعرّف كيف نوسّط قيمة بحشوها بمسافات على الجانبين. ثالثاً نرسم سطر الرؤوس وسطر فاصل وكل صف جسم باستخدام تلك العروض. الصورة الذهنية نجّار يقيس كل عمود أولاً، ثم يقصّ كل خلية لتلائم، ثم يركّب الصفوف في إطار.` },
        { heading: `انتبه`, body: `القياس بالمحارف لا البايتات مهمّ للرموز التي تأخذ أكثر من بايت. وحين لا يمكن تقسيم الحشو بالتساوي، يجب أن تذهب المسافة الزائدة إلى جانب ثابت. والجدول الفارغ يجب ألا يطبع شيئاً، وهو ما نفحصه أولاً.` },
        { heading: `تذكّر`, body: `نسّق الجداول في ثلاث خطوات: قِس، ثم احشُ، ثم ارسم. وقِس النص دائماً بالمحارف حين تهمّ المحاذاة.` },
      ],
      walkthrough: [
        { code: `if self.headers.is_empty() {\n    return Ok(());\n}`, explain: `الجدول الفارغ لا شيء فيه ليُرسم، فننجح فوراً دون كتابة أي شيء.` },
        { code: `let mut widths: Vec<usize> = self.headers.iter().map(|h| h.chars().count()).collect();\nfor row in &self.body {\n    for (i, cell) in row.iter().enumerate() {\n        widths[i] = widths[i].max(cell.chars().count());\n    }\n}`, explain: `نبدأ عرض كل عمود بطول رأسه، ثم نوسّعه إن كانت أي خلية في ذلك العمود أطول. والعدّ بالمحارف لا البايتات يُبقي المحاذاة صحيحة.` },
        { code: `let center = |s: &str, w: usize| {\n    let pad = w - s.chars().count();\n    let left = pad / 2;\n    format!("{}{}{}", " ".repeat(left), s, " ".repeat(pad - left))\n};`, explain: `مساعد صغير يوسّط قيمة في عرض معطى بتقسيم المسافة المتبقّية بين الجانبين، واضعاً أي مسافة فردية زائدة على اليمين.` },
        { code: `let line = |cells: &[String]| cells.iter().enumerate().map(|(i, c)| center(c, widths[i])).collect::<Vec<_>>().join(" | ");`, explain: `يبني هذا صفاً واحداً من الجدول بتوسيط كل خلية إلى عرض عمودها ووصلها بفاصل الشريط العمودي.` },
        { code: `writeln!(f, "| {} |", line(&self.headers))?;\nlet sep: Vec<String> = widths.iter().map(|w| "-".repeat(w + 2)).collect();\nwriteln!(f, "|{}|", sep.join("+"))?;\nfor row in &self.body {\n    writeln!(f, "| {} |", line(row))?;\n}\nOk(())`, explain: `نكتب سطر الرؤوس، ثم فاصلاً من شُرَط موصولة بعلامات زائد عند حدود الأعمدة، ثم كل صف جسم. وعلامات الاستفهام تمرّر أي خطأ كتابة.` },
      ],
    },
    explanation: {
      intro: `This is a bigger formatting exercise that brings together measuring, padding, and drawing a table.`,
      sections: [
        { heading: `The goal`, body: `Print a table with headers and rows as a tidy bordered grid, where every column is wide enough for its widest value and each cell is centered.` },
        { heading: `Concepts you need`, body: `Implementing Display controls how the table prints. We measure text length in characters, build padded strings with repeat, and use a closure to center a value inside a fixed width. The write and writeln macros send lines to the formatter.` },
        { heading: `How the solution thinks`, body: `We work in three stages. First, measure each column's width by taking the longest of its header and all its cells. Second, define how to center a value by padding it with spaces on both sides. Third, draw the header line, a separator line, and each body row using those widths. The mental picture is a carpenter who first measures every column, then cuts each cell to fit, then assembles the rows into a frame.` },
        { heading: `Watch out for`, body: `Measuring in characters rather than bytes matters for symbols that take more than one byte. When padding cannot be split evenly, the extra space must go on a consistent side. An empty table should print nothing, which we check first.` },
        { heading: `Remember this`, body: `Format tables in three steps: measure, then pad, then draw. Always measure text by characters when alignment matters.` },
      ],
      walkthrough: [
        { code: `if self.headers.is_empty() {\n    return Ok(());\n}`, explain: `An empty table has nothing to draw, so we succeed immediately without writing anything.` },
        { code: `let mut widths: Vec<usize> = self.headers.iter().map(|h| h.chars().count()).collect();\nfor row in &self.body {\n    for (i, cell) in row.iter().enumerate() {\n        widths[i] = widths[i].max(cell.chars().count());\n    }\n}`, explain: `We start each column's width at its header length, then widen it if any cell in that column is longer. Counting characters, not bytes, keeps alignment correct.` },
        { code: `let center = |s: &str, w: usize| {\n    let pad = w - s.chars().count();\n    let left = pad / 2;\n    format!("{}{}{}", " ".repeat(left), s, " ".repeat(pad - left))\n};`, explain: `A small helper that centers a value in a given width by splitting the leftover space between the two sides, putting any odd extra space on the right.` },
        { code: `let line = |cells: &[String]| cells.iter().enumerate().map(|(i, c)| center(c, widths[i])).collect::<Vec<_>>().join(" | ");`, explain: `This builds one row of the table by centering every cell to its column width and joining them with the vertical bar separator.` },
        { code: `writeln!(f, "| {} |", line(&self.headers))?;\nlet sep: Vec<String> = widths.iter().map(|w| "-".repeat(w + 2)).collect();\nwriteln!(f, "|{}|", sep.join("+"))?;\nfor row in &self.body {\n    writeln!(f, "| {} |", line(row))?;\n}\nOk(())`, explain: `We write the header row, then a dashed separator joined with plus signs at the column boundaries, then each body row. The question marks pass along any writing error.` },
      ],
    },
    expectedIO: {
      input: `Table { headers, body }  built via new() / add_row()`,
      output: `Display — a bordered ASCII table`,
      behavior: `Implement Display to render a centered, bordered table; an empty table prints nothing.`,
      examples: [
        { input: `headers ["Name","Age"]; rows ["Bob","30"], ["Alexa","7"]`, output: `| Name  | Age |\n|-------+-----|\n|  Bob  | 30  |\n| Alexa |  7  |` },
        { input: `Table::new()  (empty)`, output: ``, note: `empty → prints nothing` },
      ],
    },
    overview: {
      whatYouBuild: 'A Table type whose Display prints a bordered, column-aligned table: a header row, a separator, and centered data cells whose columns auto-size to the widest content.',
      inputOutput: 'Building blocks: Table::new(), add_row(&[String]); printing with {} produces the formatted table (nothing for an empty table).',
      constraints: ['Each column width = its widest cell.', 'Center text in each cell (offset one left when not exact).', 'Use pipe delimiters and a dash/plus separator.', 'Print nothing when empty.'],
      commonMistakes: ['Not sizing columns to the widest cell.', 'Using println! inside fmt instead of write!.', 'Off-by-one in the centering padding.'],
    },
    officialDescription: `## display_table

Implement a Table (headers + body rows) and its Display so that printing it shows a formatted table:

- A header row and the data rows, separated by pipes, with text centered in each cell.
- A separator line of dashes and plus signs.
- Column widths adjust to the longest element in each column.
- When centering is not exact, offset the text one position to the left.
- Print nothing when the table has no data.

### Expected items

~~~
pub struct Table { pub headers: Vec<String>, pub body: Vec<Vec<String>> }
impl std::fmt::Display for Table { ... }
~~~`,
    objectives: {
      learn: ['Implement Display for a complex layout.', 'Compute per-column widths.', 'Center and pad strings.'],
      whyExists: 'A demanding formatting exercise combining Display, iterators, and string padding.',
      rustSkills: ['Display', 'iterators', 'string formatting'],
    },
    conceptIds: ['display_trait', 'iterators', 'collections'],
    conceptNotes: {
      display_trait: 'write!/writeln! emit each line into the formatter.',
      iterators: 'map + max compute column widths; map + join build each row.',
    },
    similar: {
      title: 'Column widths',
      prompt: 'Given headers and rows (Vec<Vec<String>>), write a function returning a Vec<usize> of each column\'s maximum width. This is the sizing step display_table needs.',
      starter: `pub fn col_widths(headers: &[String], body: &[Vec<String>]) -> Vec<usize> {
    todo!()
}`,
      hint: 'Start widths from header lengths, then take the max with each cell length.',
      concepts: ['iterators', 'collections'],
      solution: `pub fn col_widths(headers: &[String], body: &[Vec<String>]) -> Vec<usize> {
    let mut w: Vec<usize> = headers.iter().map(|h| h.len()).collect();
    for row in body {
        for (i, c) in row.iter().enumerate() { w[i] = w[i].max(c.len()); }
    }
    w
}`,
    },
    sideQuiz: [
      {
        prompt: 'A column is as wide as its widest cell. Fill the update that grows the width.',
        template: `for (i, cell) in row.iter().enumerate() {
    widths[i] = widths[i]._____(cell.len());
}`,
        accepted: ['max'],
        acceptedPatterns: ['^max$'],
        hints: ['Keep the larger of the current width and this cell.', 'usize has a max() method.'],
        explanation: 'widths[i].max(cell.len()) keeps each column at least as wide as its widest cell.',
        whatYouLearned: 'Fold a maximum across values with max().',
        conceptId: 'collections',
      },
      {
        kind: 'choice',
        prompt: 'Inside Display::fmt, how should each line be emitted?',
        options: ['writeln!(f, ...)', 'println!(...)', 'print!(...)', 'format!(...) then drop it'],
        correct: [0],
        why: [
          'writeln! writes a line into the formatter f (what Display must do).',
          'println! goes to stdout, not the formatter.',
          'print! also targets stdout.',
          'format! builds a String but never writes it to f.',
        ],
        hints: ['Display writes into f.', 'You also want a trailing newline per row.'],
        explanation: 'writeln!(f, ...) appends a formatted line to the formatter, which is what printing the Table uses.',
        whatYouLearned: 'Use write!/writeln! into the formatter inside fmt.',
        conceptId: 'display_trait',
      },
      {
        kind: 'bug',
        prompt: 'This Display prints to the wrong place. Click the mistake.',
        code: `fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    println!("{}", self.headers.join(" | "));
    Ok(())
}`,
        bugs: [{ line: 2, token: 'println' }],
        hints: ['Output must go into f.', 'Swap the macro.'],
        explanation: 'println! writes to stdout and ignores f; use writeln!(f, ...) so the text becomes the Table\'s Display output.',
        whatYouLearned: 'fmt must write into the formatter, never to stdout.',
        conceptId: 'display_trait',
      },
    ],
    documentation: {
      apis: [
        { name: 'std::fmt::Display', url: 'https://doc.rust-lang.org/std/fmt/trait.Display.html', note: 'custom {} output' },
        { name: 'write! / writeln!', url: 'https://doc.rust-lang.org/std/macro.writeln.html', note: 'emit lines into the formatter' },
        { name: 'str::repeat', url: 'https://doc.rust-lang.org/std/primitive.str.html#method.repeat', note: 'build padding and separators' },
        { name: 'slice::join', url: 'https://doc.rust-lang.org/std/primitive.slice.html#method.join', note: 'join cells with delimiters' },
      ],
      links: [
        { title: 'Rust By Example — Display', url: 'https://doc.rust-lang.org/rust-by-example/hello/print/print_display.html' },
        { title: 'std::fmt module', url: 'https://doc.rust-lang.org/std/fmt/' },
      ],
      videos: [{ title: 'Traits in Rust', channel: 'Tensor Programming', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A' }],
    },
    editorHints: [
      'First compute each column width as the max of its header and cell lengths.',
      'Center each value in its column; put the extra space on the right when padding is odd.',
      'Emit rows and a dash/plus separator with writeln!(f, ...); print nothing if empty.',
    ],
  },

  filter_table: {
    explanationAr: {
      intro: `يعلّمك هذا التمرين تمرير السلوك إلى دالة باستخدام المُغلَّفات، وإرجاع نتائج اختيارية.`,
      sections: [
        { heading: `الهدف`, body: `أضف مرشّحين إلى جدول. أحدهما يُبقي الأعمدة التي يجتاز رأسها اختباراً، والآخر يُبقي الصفوف التي تجتاز قيمتها في عمود مسمّى اختباراً. وكلٌّ يُعيد جدولاً جديداً، أو لا شيء إن لم يوجد تطابق.` },
        { heading: `المفاهيم التي تحتاجها`, body: `المُغلَّف دالة يمكنك تمريرها كوسيط، ومُعامل عامّ مقيّد بـ Fn يتيح للدالة قبول أي مُغلَّف كهذا. وOption تعبّر عن نتيجة ربما لا شيء. والاستنساخ يصنع نسخاً مملوكة من الأجزاء التي نُبقيها كي لا يعتمد الجدول الجديد على القديم.` },
        { heading: `كيف يفكّر الحل`, body: `للأعمدة، نجد أولاً مواقع الرؤوس التي تجتاز الاختبار، ثم نبني جدولاً جديداً يحوي تلك المواقع فقط من كل صف. وللصفوف، نجد موقع العمود المسمّى، ثم نُبقي الصفوف التي تجتاز قيمتها هناك. وفي الحالتين، إن لم يوجد تطابق نُعيد لا شيء. الصورة الذهنية إستِنسِل، حيث يقرّر الاختبار أي الأعمدة أو الصفوف تظهر من خلاله، وننسخ تلك فقط إلى جدول جديد.` },
        { heading: `انتبه`, body: `بصمة القالب تستخدم نوعاً مجرّداً لن يُترجَم، فيجب أن تكون الدالتان عامّتين على مُغلَّف يأخذ نصاً ويُعيد قيمة منطقية. وإرجاع لا شيء لنتيجة فارغة، لا جدول فارغ، جزء من العقد. واستنساخ القيم المُبقاة يُبقي الجدول الجديد مستقلّاً.` },
        { heading: `تذكّر`, body: `اقبل السلوك كمُعامل مُغلَّف لتجعل الدالة مرنة. وأعِد Option حين قد تكون النتيجة بحقّ لا شيء.` },
      ],
      walkthrough: [
        { code: `pub fn filter_col<F: Fn(&str) -> bool>(&self, filter: F) -> Option<Self> {`, explain: `الدالة عامّة على F، أي مُغلَّف يأخذ نصاً ويُعيد صحيحاً أو خطأ. وهكذا يمرّر المُستدعي الاختبار لأي الأعمدة يُبقي.` },
        { code: `let idxs: Vec<usize> = self.headers.iter().enumerate()\n    .filter(|(_, h)| filter(h))\n    .map(|(i, _)| i)\n    .collect();\nif idxs.is_empty() {\n    return None;\n}`, explain: `نجمع مواقع الرؤوس التي تجتاز الاختبار. وإن لم يجتزها أحد، فلا شيء لإرجاعه، فنُعيد None.` },
        { code: `let headers = idxs.iter().map(|&i| self.headers[i].clone()).collect();\nlet body = self.body.iter()\n    .map(|row| idxs.iter().map(|&i| row[i].clone()).collect())\n    .collect();\nSome(Table { headers, body })`, explain: `نعيد بناء جدول جديد يُبقي مواقع الأعمدة المختارة فقط، في الرؤوس وفي كل صف، مستنسخين كل قيمة مُبقاة، ثم نغلّف النتيجة بـ Some.` },
        { code: `let idx = self.headers.iter().position(|h| h == col_name)?;`, explain: `في filter_row نجد أولاً موقع العمود المسمّى. وعلامة الاستفهام تعني أنه إن لم يوجد العمود تُعيد الدالة None فوراً.` },
      ],
    },
    explanation: {
      intro: `This exercise teaches passing behaviour into a function using closures, and returning optional results.`,
      sections: [
        { heading: `The goal`, body: `Add two filters to a table. One keeps only the columns whose header passes a test, the other keeps only the rows whose value in a named column passes a test. Each returns a new table, or nothing if there is no match.` },
        { heading: `Concepts you need`, body: `A closure is a function you can pass as an argument, and a generic parameter bounded by Fn lets a method accept any such closure. Option expresses the maybe nothing result. Cloning makes owned copies of the parts we keep so the new table does not depend on the old one.` },
        { heading: `How the solution thinks`, body: `For columns, we first find the positions of the headers that pass the test, then build a new table containing only those positions from every row. For rows, we find the position of the named column, then keep only the rows whose value there passes the test. In both cases, if nothing matches we return nothing. The mental picture is a stencil, where the test decides which columns or rows show through, and we copy only those into a fresh table.` },
        { heading: `Watch out for`, body: `The starter signature uses a bare type that will not compile, so the methods must be generic over a closure that takes a string and returns a boolean. Returning nothing for an empty result, rather than an empty table, is part of the contract. Cloning the kept values keeps the new table independent.` },
        { heading: `Remember this`, body: `Accept behaviour as a closure parameter to make a function flexible. Return Option when the result might legitimately be nothing.` },
      ],
      walkthrough: [
        { code: `pub fn filter_col<F: Fn(&str) -> bool>(&self, filter: F) -> Option<Self> {`, explain: `The method is generic over F, any closure that takes a string and returns true or false. That is how the caller hands in the test for which columns to keep.` },
        { code: `let idxs: Vec<usize> = self.headers.iter().enumerate()\n    .filter(|(_, h)| filter(h))\n    .map(|(i, _)| i)\n    .collect();\nif idxs.is_empty() {\n    return None;\n}`, explain: `We collect the positions of the headers that pass the test. If none pass, there is nothing to return, so we hand back None.` },
        { code: `let headers = idxs.iter().map(|&i| self.headers[i].clone()).collect();\nlet body = self.body.iter()\n    .map(|row| idxs.iter().map(|&i| row[i].clone()).collect())\n    .collect();\nSome(Table { headers, body })`, explain: `We rebuild a new table keeping only the chosen column positions, both in the headers and in every row, cloning each kept value, then wrap the result in Some.` },
        { code: `let idx = self.headers.iter().position(|h| h == col_name)?;`, explain: `In filter row we first find the position of the named column. The question mark means if the column does not exist, the method returns None right away.` },
      ],
    },
    expectedIO: {
      input: `&self + a closure: filter_col(|h| ...) / filter_row(col_name, |v| ...)`,
      output: `Option<Table>`,
      behavior: `filter_col keeps the columns whose header passes the closure; filter_row keeps the rows whose value in a named column passes it. Returns None when nothing matches.`,
      examples: [
        { input: `table.filter_col(|h| h == "Name")`, output: `Some(Table { headers: ["Name"], body: [["Adam"], ["Adamaris"], ["Ackerley"]] })` },
        { input: `table.filter_row("Last Name", |v| v == "Philips")`, output: `Some(Table { headers: ["Name", "Last Name", "ID Number"], body: [["Adam", "Philips", "123456789"], ["Ackerley", "Philips", "123456789"]] })` },
        { input: `table.filter_col(|h| h == "Nope")`, output: `None`, note: `no match → None` },
      ],
    },
    overview: {
      whatYouBuild: 'A Table you can filter two ways: filter_col keeps the columns whose header passes a closure; filter_row keeps the rows whose value in a named column passes a closure. Both return Option<Table>.',
      inputOutput: 'Table::new(); add_row(&[String]); filter_col(|header| ...) -> Option<Table> (keep matching columns); filter_row(col_name, |cell| ...) -> Option<Table> (keep matching rows). None when nothing matches.',
      constraints: ['filter_col and filter_row each take a closure (Fn(&str) -> bool).', 'Return Some(table) on a match, None when nothing matches (or the column name is missing).', 'Build a new Table; do not mutate the original.'],
      commonMistakes: ['Declaring the predicate as a bare type T instead of a generic F: Fn(&str) -> bool (the starter ships with the bare T — fix it).', 'Returning an empty Table instead of None when nothing matches.', 'Confusing filter_col (filters columns by header) with filter_row (filters rows by a cell).'],
    },
    officialDescription: `## filter_table

Build a Table (headers + body rows) with new() and add_row, then implement two filters:

- filter_col keeps only the columns whose header satisfies the predicate.
- filter_row keeps only the rows whose value in the named column satisfies the predicate.

Each predicate is a closure taking a &str and returning a bool, and each method returns Option<Table> (None when nothing matches, or when the column name is not found).

### Expected items

~~~
#[derive(Clone, Debug, PartialEq)]
pub struct Table { pub headers: Vec<String>, pub body: Vec<Vec<String>> }
impl Table {
    pub fn new() -> Table
    pub fn add_row(&mut self, row: &[String])
    pub fn filter_col<F: Fn(&str) -> bool>(&self, filter: F) -> Option<Self>
    pub fn filter_row<F: Fn(&str) -> bool>(&self, col_name: &str, filter: F) -> Option<Self>
}
~~~`,
    objectives: {
      learn: ['Accept a closure as a generic parameter (F: Fn(&str) -> bool).', 'Project/filter rows and columns with iterators.', 'Return Option to signal "no match".'],
      whyExists: 'Practices closures-as-parameters, iterator filtering over structured data, and Option results.',
      rustSkills: ['closures', 'iterators', 'generics', 'Option'],
    },
    conceptIds: ['iterators', 'closures', 'collections'],
    conceptNotes: {
      iterators: 'filter_row: body.iter().filter(|row| filter(&row[idx])).cloned().collect(). filter_col projects each row down to the kept column indexes.',
      closures: 'The predicate is any Fn(&str) -> bool, passed as a generic F so any closure works.',
    },
    similar: {
      title: 'Keep even numbers',
      prompt: 'Given a &[i32], return a Vec<i32> of just the even values. Same iter().filter().collect() shape.',
      starter: `pub fn evens(v: &[i32]) -> Vec<i32> {
    todo!()
}`,
      hint: 'v.iter().filter(|&&n| n % 2 == 0).copied().collect()',
      concepts: ['iterators', 'closures'],
      solution: `pub fn evens(v: &[i32]) -> Vec<i32> {
    v.iter().filter(|&&n| n % 2 == 0).copied().collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'filter_col takes any closure that tests a &str. Fill its generic bound.',
        template: `pub fn filter_col<F: _____>(&self, filter: F) -> Option<Self> {`,
        accepted: ['Fn(&str) -> bool'],
        acceptedPatterns: ['^Fn\\(&str\\)\\s*->\\s*bool$'],
        hints: ['It is called as filter(header), passing a &str.', 'A closure from &str to bool: Fn(&str) -> bool.'],
        explanation: 'The predicate is any Fn(&str) -> bool, so the method is generic over F: Fn(&str) -> bool.',
        whatYouLearned: 'Accept a closure as a generic parameter bounded by an Fn trait.',
        conceptId: 'closures',
      },
      {
        kind: 'choice',
        prompt: 'What does filter_col(|h| h == "Name") return?',
        options: [
          'Some(table) with only the columns whose header passes the predicate',
          'Some(table) with only the rows that contain "Name"',
          'the index of the matching column',
          'a Vec of the headers',
        ],
        correct: [0],
        why: [
          'filter_col keeps the columns whose header matches and projects every row down to them.',
          'Filtering rows is filter_row\'s job, not filter_col.',
          'It returns a whole Table (in an Option), not an index.',
          'It returns Option<Table>, not a Vec.',
        ],
        hints: ['_col filters columns, _row filters rows.', 'The predicate is tested against each header.'],
        explanation: 'filter_col selects columns by header; filter_row selects rows by a named column. Both return Option<Table>.',
        whatYouLearned: 'Distinguish column filtering (by header) from row filtering (by cell).',
        conceptId: 'iterators',
      },
      {
        kind: 'bug',
        prompt: 'Nothing matched, but this still returns a table. Click the mistake.',
        code: `if idxs.is_empty() {
    return Some(Table::new());
}`,
        bugs: [{ line: 2, token: 'Some' }],
        hints: ['The signature returns Option for a reason.', 'No match should be None.'],
        explanation: 'When nothing matches, return None — not Some(empty). The Option lets callers detect "no result".',
        whatYouLearned: 'Use None to signal "no match" instead of an empty success value.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'Closures as parameters (Fn)', url: 'https://doc.rust-lang.org/book/ch13-01-closures.html', note: 'F: Fn(&str) -> bool' },
        { name: 'Iterator::filter', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter', note: 'keep matching rows' },
        { name: 'Option', url: 'https://doc.rust-lang.org/std/option/enum.Option.html', note: 'Some(table) / None' },
      ],
      links: [
        { title: 'Rust By Example — Iterators', url: 'https://doc.rust-lang.org/rust-by-example/trait/iter.html' },
        { title: 'The Book — Closures', url: 'https://doc.rust-lang.org/book/ch13-01-closures.html' },
      ],
    },
    editorHints: [
      'Give filter_col/filter_row a generic closure bound: <F: Fn(&str) -> bool> (the starter has a bare T that will not compile).',
      'filter_col keeps columns whose header passes the closure; filter_row keeps rows whose named-column cell passes it.',
      'Return None when nothing matches (or the column name is missing); otherwise Some(new_table).',
    ],
  },

  flat_tree: {
    explanationAr: {
      intro: `هذا تمرين قصير يعلّمك العموميات وحقيقة أن بعض المجموعات مرتّبة دائماً.`,
      sections: [
        { heading: `الهدف`, body: `خذ شجرة بحث متوازنة من العناصر وأعِدها كقائمة عادية مرتّبة.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الـ BTreeSet مجموعة تُبقي عناصرها فريدة ومرتّبة تلقائياً. والدالة العامّة تعمل لأنواع كثيرة دفعةً واحدة، والقيد هنا يتيح تحويل كل عنصر مُستعار إلى مملوك. والمرور على المجموعة ينتج عناصرها بالترتيب.` },
        { heading: `كيف يفكّر الحل`, body: `بما أن الـ BTreeSet مرتّبة أصلاً، فلا شيء لفرزه. نمرّ عليها ببساطة، نصنع نسخة مملوكة من كل عنصر، ونجمعها في قائمة. والحيلة كلها إدراك أن هيكل البيانات قد قام بالترتيب نيابةً عنا. الصورة الذهنية قراءة أسماء من صندوق بطاقات مرتّب أبجدياً سلفاً.` },
        { heading: `انتبه`, body: `تخرج العناصر كمراجع، فعلينا صنع نسخ مملوكة قبل جمعها في قائمة مملوكة. ويحاول المبتدئون أحياناً فرز النتيجة، وهو جهد ضائع لأنها مرتّبة سلفاً. وكتابتها عموميةً تتيح للدالة نفسها العمل للأعداد والنصوص وأي شيء قابل للمقارنة.` },
        { heading: `تذكّر`, body: `الـ BTreeSet مرتّبة ببنائها، فالمرور عليها يعطي ترتيباً مجّاناً. والعموميات تتيح لدالة واحدة خدمة أنواع كثيرة.` },
      ],
      walkthrough: [
        { code: `pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T> {`, explain: `دالة عامّة على أي نوع عنصر T يمكن تحويله إلى نسخة مملوكة من نفسه. تستعير المجموعة وتُعيد قائمة مملوكة.` },
        { code: `tree.iter().map(|x| x.to_owned()).collect()`, explain: `نمرّ على المجموعة، التي تنتج عناصرها بالترتيب، نصنع نسخة مملوكة من كل عنصر، ونجمعها في قائمة. ولا حاجة للفرز لأن المجموعة كانت مرتّبة سلفاً.` },
      ],
    },
    explanation: {
      intro: `This short exercise teaches generics and the fact that some collections are always sorted.`,
      sections: [
        { heading: `The goal`, body: `Take a balanced search tree of items and return them as a plain list in sorted order.` },
        { heading: `Concepts you need`, body: `A BTreeSet is a collection that automatically keeps its items unique and in sorted order. A generic function works for many types at once, and the bound here lets us turn each borrowed item into an owned one. Iterating a set yields its items in order.` },
        { heading: `How the solution thinks`, body: `Because a BTreeSet is already sorted, there is nothing to sort. We simply walk through it, make an owned copy of each item, and collect them into a list. The whole trick is realizing the data structure has done the ordering for us. The mental picture is reading names off an already alphabetized index card box.` },
        { heading: `Watch out for`, body: `The items come out as references, so we must make owned copies before collecting them into an owned list. Beginners sometimes try to sort the result, which is wasted effort since it is already in order. Writing it generically lets the same function work for numbers, strings, or anything comparable.` },
        { heading: `Remember this`, body: `A BTreeSet is sorted by construction, so iterating it gives sorted order for free. Generics let one function serve many types.` },
      ],
      walkthrough: [
        { code: `pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T> {`, explain: `A generic function over any item type T that can be turned into an owned copy of itself. It borrows the set and returns an owned list.` },
        { code: `tree.iter().map(|x| x.to_owned()).collect()`, explain: `We walk the set, which yields items in sorted order, make an owned copy of each, and collect them into a list. No sorting is needed because the set was already ordered.` },
      ],
    },
    expectedIO: {
      input: `tree: &BTreeSet<T>`,
      output: `Vec<T>`,
      behavior: `Returns the set's elements as a sorted Vec (a BTreeSet already iterates in sorted order).`,
      examples: [
        { input: `BTreeSet::from([34, 0, 9, 30])`, output: `[0, 9, 30, 34]` },
        { input: `BTreeSet::from(["Slow", "kill", "will", "Horses"])`, output: `["Horses", "Slow", "kill", "will"]`, note: `uppercase sorts first` },
        { input: `BTreeSet::from([3, 3, 1])`, output: `[1, 3]`, note: `set drops duplicates` },
      ],
    },
    overview: {
      whatYouBuild: 'A generic function that flattens a BTreeSet into a sorted Vec of its elements.',
      inputOutput: 'Input: &BTreeSet<T>. Output: Vec<T> in sorted order. {34,0,9,30} -> [0,9,30,34].',
      constraints: ['A BTreeSet is already sorted — iterate it in order.', 'Return owned values (the bound T: ToOwned<Owned = T> lets you clone each).'],
      commonMistakes: ['Trying to sort manually (the set is already ordered).', 'Returning references instead of owned values.'],
    },
    officialDescription: `## flat_tree

Implement flatten_tree, which takes a reference to a std::collections::BTreeSet and returns a fresh Vec containing the tree's elements in sorted order.

### Expected function

~~~
pub fn flatten_tree<T: ToOwned<Owned = T>>(tree: &BTreeSet<T>) -> Vec<T>
~~~

### Usage

flatten_tree(&BTreeSet::from([34, 0, 9, 30])) = [0, 9, 30, 34].`,
    objectives: {
      learn: ['Iterate a BTreeSet (sorted order).', 'Convert borrowed items to owned with to_owned.', 'Use a generic with a trait bound.'],
      whyExists: 'Introduces ordered sets and generic functions with trait bounds.',
      rustSkills: ['BTreeSet', 'generics', 'iterators'],
    },
    conceptIds: ['collections', 'iterators', 'generics'],
    conceptNotes: {
      collections: 'A BTreeSet keeps elements sorted, so iteration yields them in order.',
      generics: 'The bound T: ToOwned<Owned = T> lets the function clone each element into the Vec.',
    },
    similar: {
      title: 'Set to sorted Vec of i32',
      prompt: 'Write a non-generic function that turns a &BTreeSet<i32> into a sorted Vec<i32>. Same iterate-and-collect idea.',
      starter: `use std::collections::BTreeSet;
pub fn to_vec(set: &BTreeSet<i32>) -> Vec<i32> {
    todo!()
}`,
      hint: 'set.iter().copied().collect()',
      concepts: ['collections', 'iterators'],
      solution: `use std::collections::BTreeSet;
pub fn to_vec(set: &BTreeSet<i32>) -> Vec<i32> {
    set.iter().copied().collect()
}`,
    },
    sideQuiz: [
      {
        prompt: 'Turn each borrowed element into an owned one. Fill the method.',
        template: `tree.iter().map(|x| x._____()).collect()`,
        accepted: ['to_owned'],
        acceptedPatterns: ['^to_owned$'],
        hints: ['iter() yields &T, but the Vec needs T.', 'The bound gives you to_owned().'],
        explanation: 'to_owned() converts &T into an owned T (the bound T: ToOwned<Owned = T> guarantees it), so collect() can build a Vec<T>.',
        whatYouLearned: 'to_owned() produces an owned value from a reference.',
        conceptId: 'generics',
      },
      {
        kind: 'choice',
        prompt: 'What does flatten_tree(&BTreeSet::from([34, 0, 9, 30])) return?',
        options: ['[0, 9, 30, 34]', '[34, 0, 9, 30]', '[34, 30, 9, 0]', 'an unsorted Vec'],
        correct: [0],
        why: [
          'A BTreeSet stores elements sorted, so iteration is ascending.',
          'Insertion order is not preserved by a set.',
          'That is descending; BTreeSet iterates ascending.',
          'It is sorted, because the set is ordered.',
        ],
        hints: ['BTreeSet keeps its elements ordered.', 'Iteration is ascending.'],
        explanation: 'BTreeSet is an ordered set, so iterating it yields sorted values: [0, 9, 30, 34].',
        whatYouLearned: 'BTreeSet iteration is already sorted — no extra sort needed.',
        conceptId: 'collections',
      },
      {
        kind: 'bug',
        prompt: 'This does redundant (and wrong) work. Click the unnecessary call.',
        code: `let mut v: Vec<T> = tree.iter().map(|x| x.to_owned()).collect();
v.sort();`,
        bugs: [{ line: 2, token: 'sort' }],
        hints: ['Where do the elements come from?', 'A BTreeSet is already ordered.'],
        explanation: 'The elements are already sorted by the BTreeSet, so the extra v.sort() is unnecessary (and would also require T: Ord).',
        whatYouLearned: 'Do not re-sort data that is already ordered.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'BTreeSet', url: 'https://doc.rust-lang.org/std/collections/struct.BTreeSet.html', note: 'ordered set' },
        { name: 'ToOwned', url: 'https://doc.rust-lang.org/std/borrow/trait.ToOwned.html', note: 'borrowed -> owned' },
        { name: 'Iterator::collect', url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect', note: 'build the Vec' },
      ],
      links: [
        { title: 'The Book — Generic types and traits', url: 'https://doc.rust-lang.org/book/ch10-00-generics.html' },
        { title: 'std::collections', url: 'https://doc.rust-lang.org/std/collections/' },
      ],
    },
    editorHints: [
      'A BTreeSet iterates in sorted order — no manual sorting needed.',
      'Map each &T to an owned value with to_owned().',
      'collect() into the Vec<T>.',
    ],
  },

  brackets_matching: {
    explanationAr: {
      intro: `هذا التمرين هو مسألة الأقواس المتوازنة الكلاسيكية، وهو أفضل مكان لفهم المكدّس.`,
      sections: [
        { heading: `الهدف`, body: `قرّر هل الأقواس في نص متطابقة ومتداخلة بشكل صحيح. يجب أن تُغلق الأقواس الدائرية والمربّعة والمعقوفة بالترتيب الصحيح، وتُتجاهل المحارف الأخرى.` },
        { heading: `المفاهيم التي تحتاجها`, body: `المكدّس كومة آخر داخل أول خارج لا تلمس فيها إلا الأعلى. ندفع كل قوس فتح إليه، وحين يصل قوس إغلاق يجب أن يكون شريكه الصحيح في الأعلى. وتعبير match يتيح التفاعل بشكل مختلف مع كل نوع محرف.` },
        { heading: `كيف يفكّر الحل`, body: `بالقراءة من اليسار إلى اليمين، يُتذكَّر كل قوس فتح بدفعه على المكدّس. وكل قوس إغلاق يجب أن يطابق قوس الفتح الموجود في الأعلى، فننتزع ونقارن. إن لم يطابق، أو لم يكن ثمّة ما يُنتزع، فالنص غير متوازن. وفي النهاية يجب أن يكون المكدّس فارغاً، أي أن كل فتح أُغلق. الصورة الذهنية رصّة أطباق يجب أن يزيل كل قوس إغلاق الطبق المطابق من الأعلى.` },
        { heading: `انتبه`, body: `قوس إغلاق مع مكدّس فارغ يعني إغلاقات أكثر من اللازم، ويجب أن يفشل. وبقايا فتحٍ في النهاية تعني إغلاقات أقلّ من اللازم، ويفشل أيضاً. والترتيب مهمّ، لأن الإغلاق بترتيب خاطئ، كقوس مربّع يحاول إغلاق دائري، غير صالح حتى لو تساوت الأعداد.` },
        { heading: `تذكّر`, body: `أزواج متطابقة بالترتيب هو بالضبط ما يفحصه المكدّس. ادفع الفتحات، طابق وانتزع عند الإغلاقات، واشترط مكدّساً فارغاً في النهاية.` },
      ],
      walkthrough: [
        { code: `let mut stack: Vec<char> = Vec::new();`, explain: `مكدّس فارغ سيتذكّر أقواس الفتح التي رأيناها ولم نُغلقها بعد.` },
        { code: `'(' | '[' | '{' => stack.push(c),`, explain: `أي قوس فتح يُدفع على المكدّس لينتظر قوس إغلاقه المطابق.` },
        { code: `')' => if stack.pop() != Some('(') { return false; },`, explain: `قوس الإغلاق الدائري يجب أن يجد قوس فتح دائرياً في الأعلى. وتزيل pop الأعلى، فإن لم يكن قوس الفتح المطابق، أو كان المكدّس فارغاً، فالنص غير متوازن ونُعيد false. وحالتا المربّع والمعقوف تعملان بالطريقة نفسها.` },
        { code: `stack.is_empty()`, explain: `بعد مسح كل شيء، يجب أن يكون المكدّس فارغاً. وأي فتحٍ متبقٍّ يعني أنه لم يُغلق أبداً، فالمكدّس الفارغ هو بالضبط شرط توازن الأقواس.` },
      ],
    },
    explanation: {
      intro: `This exercise is the classic balanced brackets problem, and it is the perfect place to understand a stack.`,
      sections: [
        { heading: `The goal`, body: `Decide whether the brackets in a string are correctly matched and nested. Round, square, and curly brackets must each close in the right order, and other characters are ignored.` },
        { heading: `Concepts you need`, body: `A stack is a last in, first out pile where you only touch the top. We push each opening bracket onto it, and when a closing bracket arrives, the correct partner must be on top. The match expression lets us react differently to each kind of character.` },
        { heading: `How the solution thinks`, body: `Reading left to right, every opening bracket is remembered by pushing it on the stack. Every closing bracket must match whatever opening bracket is on top, so we pop and compare. If it does not match, or there was nothing to pop, the string is unbalanced. At the end the stack must be empty, meaning every opener was closed. The mental picture is a stack of plates where each closing bracket must remove the matching plate from the top.` },
        { heading: `Watch out for`, body: `A closing bracket with an empty stack means too many closers, which must fail. Leftover openers at the end mean too few closers, which also fails. The order matters, because closing in the wrong order, like a square bracket trying to close a round one, is invalid even if the counts are equal.` },
        { heading: `Remember this`, body: `Matched pairs in order is exactly what a stack checks. Push openers, match and pop on closers, and require an empty stack at the end.` },
      ],
      walkthrough: [
        { code: `let mut stack: Vec<char> = Vec::new();`, explain: `An empty stack that will remember the opening brackets we have seen but not yet closed.` },
        { code: `'(' | '[' | '{' => stack.push(c),`, explain: `Any opening bracket is pushed onto the stack to wait for its matching closer.` },
        { code: `')' => if stack.pop() != Some('(') { return false; },`, explain: `A closing round bracket must find an opening round bracket on top. pop removes the top, and if it is not the matching opener, or the stack was empty, the string is unbalanced and we return false. The square and curly cases work the same way.` },
        { code: `stack.is_empty()`, explain: `After scanning everything, the stack must be empty. Any leftover opener means it was never closed, so an empty stack is exactly the condition for balanced brackets.` },
      ],
    },
    expectedIO: {
      input: `s: &str`,
      output: `bool`,
      behavior: `True when every (), [], {} is correctly matched and nested; any other character is ignored.`,
      examples: [
        { input: `"(a[b]{c})"`, output: `true` },
        { input: `"(]"`, output: `false`, note: `mismatched pair` },
        { input: `"((("`, output: `false`, note: `unclosed` },
      ],
    },
    overview: {
      whatYouBuild: 'A command-line program that, for each argument, prints "OK" if its brackets are correctly matched/nested, otherwise "Error". Non-bracket characters are ignored.',
      inputOutput: 'Args: any number of strings. For each, print OK or Error. No arguments -> print nothing.',
      constraints: ['Match (), [], {} — an opener must close with its own kind.', 'Ignore all non-bracket characters.', 'A string with no brackets is OK.'],
      commonMistakes: ['Not checking that the popped opener matches the closer type.', 'Forgetting the empty-stack case on a closer.', 'Not handling "no arguments" (print nothing).'],
    },
    officialDescription: `## brackets_matching

Create a program that takes any number of command-line arguments. For each argument, print "OK" if the expression is correctly bracketed, otherwise "Error".

All characters are ignored except the brackets (), [], {}. An opening bracket must be closed by the matching closing bracket. A string with no brackets is correctly bracketed. With no arguments, print nothing.

Use std::env::args() to read the arguments.

### Usage

~~~
$ cargo run '(johndoe)'
OK
$ cargo run '([)]'
Error
~~~`,
    objectives: {
      learn: ['Use a Vec as a stack.', 'Match closers to the correct opener.', 'Read and loop over CLI arguments.'],
      whyExists: 'The canonical stack problem; also practices argv handling.',
      rustSkills: ['stack (Vec)', 'pattern matching', 'CLI args'],
    },
    conceptIds: ['collections', 'pattern_matching', 'cli_args'],
    conceptNotes: {
      collections: 'A Vec<char> stack remembers the open brackets seen so far.',
      pattern_matching: 'A match routes each character to push, pop-and-check, or ignore.',
    },
    similar: {
      title: 'Balanced parentheses',
      prompt: 'Write balanced(s: &str) -> bool that checks only round parentheses () using a counter (no other bracket types). A simpler version of the stack idea.',
      starter: `pub fn balanced(s: &str) -> bool {
    todo!()
}`,
      hint: 'Keep a depth counter; +1 on (, -1 on ); fail if it goes negative; OK if it ends at 0.',
      concepts: ['pattern_matching'],
      solution: `pub fn balanced(s: &str) -> bool {
    let mut depth = 0i32;
    for c in s.chars() {
        if c == '(' { depth += 1; }
        else if c == ')' { depth -= 1; if depth < 0 { return false; } }
    }
    depth == 0
}`,
    },
    sideQuiz: [
      {
        prompt: 'Remember each opener. Fill the action for an opening bracket.',
        template: `match c {
    '(' | '[' | '{' => stack._____(c),
    // closers handled below
    _ => {}
}`,
        accepted: ['push'],
        acceptedPatterns: ['^push$'],
        hints: ['Put the opener on the stack.', 'Vec::push.'],
        explanation: 'Each opening bracket is pushed so a later closer can check it.',
        whatYouLearned: 'A stack records the still-open brackets.',
        conceptId: 'collections',
      },
      {
        prompt: 'A closer must match the most recent opener. Fill the check for ")".',
        template: `')' => if stack.pop() != _____ { return false; },`,
        accepted: ["Some('(')"],
        acceptedPatterns: ["^Some\\('\\('\\)$"],
        hints: ['pop() returns an Option.', 'It must be Some with the matching opener.'],
        explanation: 'pop() returns the last opener (or None if empty); for ")" it must be Some(\'(\'), else the string is unbalanced.',
        whatYouLearned: 'Match each closer to the correct opener via the popped value.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'choice',
        prompt: 'What should "([)]" print, and why?',
        options: [
          'Error, because ")" tries to close "[" (wrong type)',
          'OK, because every bracket has a partner',
          'Error, because there are too many brackets',
          'OK, because the counts are equal',
        ],
        correct: [0],
        why: [
          'After ( [ the next is ), which would close [, but [ needs ] — mismatch.',
          'Counts being equal is not enough; nesting must match.',
          'The count is fine; the nesting is wrong.',
          'Equal counts do not guarantee correct nesting.',
        ],
        hints: ['Brackets must close in the right order.', 'Can ) close [ ?'],
        explanation: '"([)]" is interleaved: ) tries to close [, which is invalid, so it prints Error.',
        whatYouLearned: 'Correct bracketing needs proper nesting, not just equal counts.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'bug',
        prompt: 'This balance check ignores the bracket TYPE. Click the mistake.',
        code: `')' => if stack.pop().is_none() { return false; },
']' => if stack.pop().is_none() { return false; },`,
        bugs: [{ line: 1, token: 'is_none' }],
        hints: ['A ) must close a ( specifically.', 'is_none only checks the stack is non-empty.'],
        explanation: 'is_none() only verifies something was open, not that it was the right kind. Compare the popped value to the matching opener, e.g. != Some(\'(\').',
        whatYouLearned: 'Check the popped opener\'s type, not just that one exists.',
        conceptId: 'pattern_matching',
      },
      {
        kind: 'order',
        prompt: 'Assemble is_balanced. One fragment does not belong.',
        scaffold: `fn is_balanced(s: &str) -> bool {
    [ slot 1 ]
    [ slot 2 ]
    [ slot 3 ]
}`,
        fragments: [
          'let mut stack: Vec<char> = Vec::new();',
          "for c in s.chars() { match c { '(' | '[' | '{' => stack.push(c), ')' => if stack.pop() != Some('(') { return false; }, ']' => if stack.pop() != Some('[') { return false; }, '}' => if stack.pop() != Some('{') { return false; }, _ => {} } }",
          'stack.is_empty()',
        ],
        distractors: ['return s.len() % 2 == 0;'],
        hints: ['Make a stack, scan characters pushing/popping, then check nothing is left open.', 'An even length does not prove balance.'],
        explanation: 'Create the stack, push openers and match closers as you scan, then balanced means the stack is empty. The length-parity fragment is a distractor.',
        whatYouLearned: 'Stack scan + empty-at-end is the bracket-matching algorithm.',
        conceptId: 'collections',
      },
    ],
    documentation: {
      apis: [
        { name: 'Vec::push / Vec::pop', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html#method.pop', note: 'use a Vec as a stack' },
        { name: 'std::env::args', url: 'https://doc.rust-lang.org/std/env/fn.args.html', note: 'read the arguments' },
        { name: 'match', url: 'https://doc.rust-lang.org/book/ch06-02-match.html', note: 'route each character' },
      ],
      links: [
        { title: 'The Book — Command line arguments', url: 'https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html' },
        { title: 'Vec as a stack', url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html' },
      ],
      videos: [{ title: 'Build a Rust CLI — Command Line Arguments', channel: 'Rust Tutorial', url: 'https://www.youtube.com/watch?v=_T4sE6NEcV0' }],
    },
    editorHints: [
      'Use a Vec<char> as a stack; push openers, pop on closers.',
      'A closer must pop its matching opener — check the type, not just non-empty.',
      'Balanced means the stack is empty at the end; ignore non-bracket characters.',
    ],
  },

  brain_fuck: {
    explanationAr: {
      intro: `يبني هذا التمرين مفسّراً للغة برمجة صغيرة، وهو ما يبدو مخيفاً لكنه مجرد حلقة على الأوامر.`,
      sections: [
        { heading: `الهدف`, body: `شغّل برنامج برينفك وأعِد ما يطبعه. تملك برينفك شريط ذاكرة وحفنة من الأوامر بمحرف واحد تحرّك وتغيّر مؤشّراً وخلية.` },
        { heading: `المفاهيم التي تحتاجها`, body: `الشريط مجرد مصفوفة بايتات، وهي ذاكرتنا. ومؤشّر البيانات يقول أي خلية ننظر إليها، وعدّاد البرنامج يقول أي أمر ننفّذ. وmatch يوزّع كل أمر. وأمرا الحلقة، القوسان، يقفزان بعدّاد البرنامج للأمام أو للخلف.` },
        { heading: `كيف يفكّر الحل`, body: `نمشي على الأوامر واحداً واحداً. بعضها يحرّك المؤشّر، وبعضها يزيد أو ينقص من الخلية الحالية، وأمر النقطة يُخرج الخلية كمحرف. والقوسان يكوّنان حلقات: قوس الفتح يقفز للأمام بعد قوس إغلاقه المطابق حين تكون الخلية الحالية صفراً، وقوس الإغلاق يقفز للخلف إلى فاتحه حين لا تكون الخلية صفراً، مع تتبّع التداخل. الصورة الذهنية آلة صغيرة بشريط وإصبع، تتبع تعليمات بسيطة وتدور أحياناً.` },
        { heading: `انتبه`, body: `مطابقة الأقواس المتداخلة هي الجزء الصعب، فنعدّ العمق كي نقفز إلى الشريك الصحيح لا أول واحد نراه. والخلايا تلتفّ عند تجاوز السعة، ولهذا نستخدم الجمع الملتفّ. وثمانية أوامر حقيقية فقط هي المهمّة، وأي محرف آخر يُعامَل كتعليق ويُتجاهل.` },
        { heading: `تذكّر`, body: `المفسّر مجرد حلقة تقرأ أمراً وتتصرّف وفقه. ولمطابقة الأقواس المتداخلة، تتبّع العمق أثناء المسح.` },
      ],
      walkthrough: [
        { code: `let mut tape = [0u8; 2048];\nlet mut ptr = 0usize;\nlet mut pc = 0usize;\nlet mut out = String::new();`, explain: `نُهيّئ الآلة: شريط خلايا ذاكرة كلها تبدأ من صفر، مؤشّر بيانات عند الخلية صفر، عدّاد برنامج عند أول أمر، ونص فارغ لجمع المخرج.` },
        { code: `'>' => ptr += 1,\n'<' => ptr -= 1,\n'+' => tape[ptr] = tape[ptr].wrapping_add(1),\n'-' => tape[ptr] = tape[ptr].wrapping_sub(1),\n'.' => out.push(tape[ptr] as char),`, explain: `الأوامر الأساسية: السهمان يحرّكان المؤشّر، والزائد والناقص يغيّران الخلية الحالية بالتفاف كي لا تتجاوز سعة البايت، والنقطة تُلحق الخلية الحالية كمحرف بالمخرج.` },
        { code: `'[' => if tape[ptr] == 0 {\n    let mut depth = 1;\n    while depth > 0 { pc += 1; if code[pc] == '[' { depth += 1; } else if code[pc] == ']' { depth -= 1; } }\n},`, explain: `قوس الفتح يبدأ حلقة. إن كانت الخلية الحالية صفراً نتخطّى الحلقة كلها بالمسح للأمام حتى الإغلاق المطابق، عادّين العمق كي تُقرَن الأقواس المتداخلة بشكل صحيح.` },
        { code: `']' => if tape[ptr] != 0 {\n    let mut depth = 1;\n    while depth > 0 { pc -= 1; if code[pc] == ']' { depth += 1; } else if code[pc] == '[' { depth -= 1; } }\n},`, explain: `قوس الإغلاق ينهي حلقة. إن لم تكن الخلية الحالية صفراً نقفز للخلف إلى قوس الفتح المطابق، متتبّعين العمق مجدداً، فيتكرّر جسم الحلقة حتى تصير الخلية صفراً.` },
      ],
    },
    explanation: {
      intro: `This exercise builds an interpreter for a tiny programming language, which sounds scary but is just a loop over commands.`,
      sections: [
        { heading: `The goal`, body: `Run a Brainfuck program and return whatever it prints. Brainfuck has a memory tape and a handful of single character commands that move and change a pointer and a cell.` },
        { heading: `Concepts you need`, body: `A tape is just an array of bytes, our memory. A data pointer says which cell we are looking at, and a program counter says which command we are running. A match dispatches each command. The loop commands, the brackets, jump the program counter forward or backward.` },
        { heading: `How the solution thinks`, body: `We walk through the commands one at a time. Some move the pointer, some add or subtract from the current cell, and the dot command outputs the cell as a character. The brackets form loops: an opening bracket skips ahead past its matching close when the current cell is zero, and a closing bracket jumps back to its opener when the cell is not zero, while keeping track of nesting. The mental picture is a tiny machine with a tape and a finger, following simple instructions and occasionally looping.` },
        { heading: `Watch out for`, body: `Matching nested brackets is the hard part, so we count depth in order to jump to the correct partner, not the first one we see. Cells wrap around on overflow, which is why we use wrapping addition. Only the eight real commands matter, and any other character is treated as a comment and ignored.` },
        { heading: `Remember this`, body: `An interpreter is just a loop that reads a command and acts on it. To match nested brackets, track the depth as you scan.` },
      ],
      walkthrough: [
        { code: `let mut tape = [0u8; 2048];\nlet mut ptr = 0usize;\nlet mut pc = 0usize;\nlet mut out = String::new();`, explain: `We set up the machine: a tape of memory cells all starting at zero, a data pointer at cell zero, a program counter at the first command, and an empty string to collect output.` },
        { code: `'>' => ptr += 1,\n'<' => ptr -= 1,\n'+' => tape[ptr] = tape[ptr].wrapping_add(1),\n'-' => tape[ptr] = tape[ptr].wrapping_sub(1),\n'.' => out.push(tape[ptr] as char),`, explain: `The basic commands: the arrows move the pointer, plus and minus change the current cell with wrapping so it never overflows past a byte, and the dot appends the current cell as a character to the output.` },
        { code: `'[' => if tape[ptr] == 0 {\n    let mut depth = 1;\n    while depth > 0 { pc += 1; if code[pc] == '[' { depth += 1; } else if code[pc] == ']' { depth -= 1; } }\n},`, explain: `An opening bracket starts a loop. If the current cell is zero we skip the whole loop by scanning forward to the matching close, counting depth so nested brackets are paired correctly.` },
        { code: `']' => if tape[ptr] != 0 {\n    let mut depth = 1;\n    while depth > 0 { pc -= 1; if code[pc] == ']' { depth += 1; } else if code[pc] == '[' { depth -= 1; } }\n},`, explain: `A closing bracket ends a loop. If the current cell is not zero we jump back to the matching open bracket, again tracking depth, so the loop body repeats until the cell becomes zero.` },
      ],
    },
    expectedIO: {
      input: `code: &str  (Brainfuck source)`,
      output: `String  (whatever the program prints)`,
      behavior: `Interpret the Brainfuck program over a byte tape and return its output. Cells wrap on overflow; '.' emits the current cell as an ASCII char.`,
      examples: [
        { input: `"++++++++[>++++++++<-]>+++++++++."`, output: `"I"`, note: `cell = 73 = 'I'` },
        { input: `"+++++[>+++++++++++++<-]>."`, output: `"A"`, note: `5 x 13 = 65 = 'A'` },
        { input: `"+++"`, output: `""`, note: `no '.' → no output` },
      ],
    },
    overview: {
      whatYouBuild: 'A Brainfuck interpreter: an array of 2048 bytes and a data pointer, executing the program given as the first command-line argument.',
      inputOutput: 'Arg: Brainfuck source (guaranteed valid). Effect: runs it, printing bytes via the "." command.',
      constraints: ['Tape of 2048 bytes, all starting at 0.', 'Commands: > < + - . [ ]; all other characters are comments.', '[ and ] loop while the current cell is non-zero.'],
      commonMistakes: ['Not matching nested [ ] when jumping.', 'Forgetting byte wrap-around (use wrapping_add/sub).', 'Off-by-one in the program counter after a jump.'],
    },
    officialDescription: `## brain_fuck

Build a Brainfuck interpreter using an array of 2048 bytes and a memory pointer. The program is the first command-line argument (guaranteed valid).

Commands:

- > and < move the pointer right and left
- + and - increment and decrement the current byte
- . outputs the current byte as an ASCII character
- [ and ] form a loop that runs while the current byte is non-zero
- all other characters are comments

### Behavior

Running the classic program prints "Hello World!".`,
    objectives: {
      learn: ['Scan and interpret commands with state.', 'Manage a tape, a data pointer, and a program counter.', 'Match nested loop brackets.'],
      whyExists: 'A complete (if tiny) interpreter — the capstone of parsing and stateful iteration.',
      rustSkills: ['parsing', 'arrays', 'control flow', 'CLI args'],
    },
    conceptIds: ['parsing', 'collections', 'cli_args'],
    conceptNotes: {
      parsing: 'The interpreter scans the source once, reacting to each command and jumping for loops.',
      collections: 'A fixed [u8; 2048] tape holds the memory cells.',
    },
    similar: {
      title: 'Run + and - only',
      prompt: 'Write a function that takes a string of only + and - and returns the resulting byte value (starting from 0, wrapping). A mini-interpreter for two commands.',
      starter: `pub fn run_pm(src: &str) -> u8 {
    todo!()
}`,
      hint: 'Fold over chars: + => wrapping_add(1), - => wrapping_sub(1).',
      concepts: ['parsing'],
      solution: `pub fn run_pm(src: &str) -> u8 {
    let mut cell = 0u8;
    for c in src.chars() {
        match c { '+' => cell = cell.wrapping_add(1), '-' => cell = cell.wrapping_sub(1), _ => {} }
    }
    cell
}`,
    },
    sideQuiz: [
      {
        prompt: 'Increment the current cell, wrapping past 255. Fill the method.',
        template: `'+' => tape[ptr] = tape[ptr]._____(1),`,
        accepted: ['wrapping_add'],
        acceptedPatterns: ['^wrapping_add$'],
        hints: ['A byte must wrap from 255 back to 0.', 'Use wrapping_add(1).'],
        explanation: 'wrapping_add(1) increments the byte and wraps 255 -> 0, which is how Brainfuck cells behave.',
        whatYouLearned: 'wrapping_add/sub model byte overflow without panicking.',
        conceptId: 'parsing',
      },
      {
        kind: 'choice',
        prompt: 'What does the "." command do?',
        options: [
          'output the current byte as an ASCII character',
          'move the pointer right',
          'increment the current byte',
          'start a loop',
        ],
        correct: [0],
        why: [
          '"." prints the current cell as a character.',
          '">" moves the pointer right.',
          '"+" increments the byte.',
          '"[" starts a loop.',
        ],
        hints: ['It is the only output command.', 'Think print.'],
        explanation: 'The "." command outputs the byte at the pointer interpreted as ASCII.',
        whatYouLearned: 'Each Brainfuck symbol maps to one tiny operation.',
        conceptId: 'parsing',
      },
      {
        kind: 'bug',
        prompt: 'The "[" handler ignores nested brackets when skipping. Click the part that should track nesting.',
        code: `'[' => if tape[ptr] == 0 {
    while code[pc] != ']' { pc += 1; }
},`,
        bugs: [{ line: 2, token: ']' }],
        hints: ['What if there is a "[" inside the loop body?', 'You must count depth, not stop at the first "]".'],
        explanation: 'Stopping at the first "]" breaks on nested loops; instead track a depth counter, increasing on "[" and decreasing on "]", until it returns to zero.',
        whatYouLearned: 'Matching nested brackets requires a depth counter.',
        conceptId: 'parsing',
      },
      {
        kind: 'order',
        prompt: 'Order the steps of the interpreter\'s main loop body for one command. One fragment does not belong.',
        scaffold: `// inside: while pc < code.len() {
    [ slot 1 ]
    [ slot 2 ]
// }`,
        fragments: [
          "match code[pc] { '>' => ptr += 1, '<' => ptr -= 1, '+' => tape[ptr] = tape[ptr].wrapping_add(1), '-' => tape[ptr] = tape[ptr].wrapping_sub(1), '.' => print!(\"{}\", tape[ptr] as char), '[' => {/* skip if zero */}, ']' => {/* jump back if non-zero */}, _ => {} }",
          'pc += 1;',
        ],
        distractors: ['tape = [0u8; 2048];'],
        hints: ['Handle the current command, then advance the program counter.', 'Re-initializing the tape inside the loop would erase memory.'],
        explanation: 'Each iteration dispatches on the current command, then advances pc. Re-creating the tape inside the loop is a distractor — it would wipe memory every step.',
        whatYouLearned: 'Interpret-then-advance is the heart of a bytecode/loop interpreter.',
        conceptId: 'parsing',
      },
    ],
    documentation: {
      apis: [
        { name: 'u8::wrapping_add / wrapping_sub', url: 'https://doc.rust-lang.org/std/primitive.u8.html#method.wrapping_add', note: 'byte cells wrap' },
        { name: 'arrays [u8; N]', url: 'https://doc.rust-lang.org/std/primitive.array.html', note: 'the 2048-byte tape' },
        { name: 'std::env::args', url: 'https://doc.rust-lang.org/std/env/fn.args.html', note: 'read the source program' },
        { name: 'print! macro', url: 'https://doc.rust-lang.org/std/macro.print.html', note: 'output a byte as a char' },
      ],
      links: [
        { title: 'Brainfuck (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Brainfuck' },
        { title: 'The Book — Command line arguments', url: 'https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html' },
      ],
    },
    editorHints: [
      'Keep a [u8; 2048] tape, a data pointer, and a program counter.',
      'match on each command; use wrapping_add/sub for + and -.',
      'For [ and ], scan to the matching bracket using a depth counter (handles nesting).',
    ],
  },
};
