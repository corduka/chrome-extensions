const flashcards = [
  // Values and Variables
  {
    category: "Values and Variables",
    question: "What is a variable in JavaScript?",
    answer: "A variable is a container for storing data values.",
  },
  {
    category: "Values and Variables",
    question: "What keywords are used to declare variables?",
    answer: "var, let, and const",
  },
  {
    category: "Values and Variables",
    question: "What is the difference between let and const?",
    answer: "let allows reassignment, const does not.",
  },
  {
    category: "Values and Variables",
    question: "Can you re-declare a variable with let?",
    answer: "No, only var allows re-declaration in the same scope.",
  },

  // Data Types
  {
    category: "Data Types",
    question: "What are JavaScript's 7 primitive data types?",
    answer: "String, Number, Boolean, Null, Undefined, Symbol, BigInt",
  },
  {
    category: "Data Types",
    question: "What is typeof null?",
    answer: "'object' — a known quirk in JavaScript.",
  },
  {
    category: "Data Types",
    question: "What is the result of typeof NaN?",
    answer: "number",
  },
  {
    category: "Data Types",
    question: "Is an array a primitive or non-primitive type?",
    answer: "Non-primitive (object).",
  },

  // Basic Operators
  {
    category: "Basic Operators",
    question: "What does the + operator do with strings?",
    answer: "It concatenates them.",
  },
  {
    category: "Basic Operators",
    question: "What is the result of 2 + '3'?",
    answer: "'23' — the number is coerced to a string.",
  },
  {
    category: "Basic Operators",
    question: "What is the result of '3' - 1?",
    answer: "2 — coercion converts '3' to a number.",
  },
  {
    category: "Basic Operators",
    question: "What does the % operator do?",
    answer: "Returns the remainder of a division.",
  },

  // Template Literals
  {
    category: "Template Literals",
    question: "How do you create a multi-line string with template literals?",
    answer: "Use backticks (`) instead of quotes.",
  },
  {
    category: "Template Literals",
    question: "How do you embed variables in template literals?",
    answer: "Using ${variableName}",
  },

  // If Else Statements
  {
    category: "If Else Statements",
    question: "How do you write an if/else block in JS?",
    answer: "Using if (...) { ... } else { ... }",
  },
  {
    category: "If Else Statements",
    question: "Can you use multiple else-if blocks?",
    answer: "Yes, you can chain as many else-if conditions as needed.",
  },
  {
    category: "If Else Statements",
    question: "What is the result of an if condition that is false?",
    answer: "The else block (if present) runs.",
  },

  // Type Conversion and Coercion
  {
    category: "Type Conversion and Coercion",
    question: "What’s the difference between conversion and coercion?",
    answer: "Conversion is explicit; coercion is implicit.",
  },
  {
    category: "Type Conversion and Coercion",
    question: "What is '5' - 2 in JS?",
    answer: "3 — '5' is coerced to number.",
  },
  {
    category: "Type Conversion and Coercion",
    question: "What is the result of Number('abc')?",
    answer: "NaN",
  },

  // Truthy and Falsy Values
  {
    category: "Truthy and Falsy Values",
    question: "List all falsy values in JS.",
    answer: "0, '', null, undefined, NaN, false",
  },
  {
    category: "Truthy and Falsy Values",
    question: "Is [] truthy or falsy?",
    answer: "Truthy",
  },
  {
    category: "Truthy and Falsy Values",
    question: "Is {} truthy or falsy?",
    answer: "Truthy",
  },

  // Equality Operators
  {
    category: "Equality Operators",
    question: "Difference between == and ===?",
    answer: "== checks value, === checks value and type.",
  },
  {
    category: "Equality Operators",
    question: "What does '1' == 1 return?",
    answer: "true — due to type coercion.",
  },
  {
    category: "Equality Operators",
    question: "What does '1' === 1 return?",
    answer: "false — different types.",
  },

  // Boolean Logic
  {
    category: "Boolean Logic",
    question: "What does && return?",
    answer: "The first falsy or last truthy value.",
  },
  {
    category: "Boolean Logic",
    question: "What does || return?",
    answer: "The first truthy or last falsy value.",
  },
  {
    category: "Boolean Logic",
    question: "What does !true return?",
    answer: "false",
  },

  // Logical Operators
  {
    category: "Logical Operators",
    question: "What is the result of true && false?",
    answer: "false",
  },
  {
    category: "Logical Operators",
    question: "What is the result of false || true?",
    answer: "true",
  },

  // Switch Statement
  {
    category: "Switch Statement",
    question: "When to use a switch instead of if/else?",
    answer: "When comparing a single value to many constants.",
  },
  {
    category: "Switch Statement",
    question: "Do switch statements support fall-through?",
    answer: "Yes, if you omit break.",
  },

  // Ternary Operator
  {
    category: "Ternary Operator",
    question: "What’s the syntax of ternary operator?",
    answer: "condition ? expr1 : expr2",
  },
  {
    category: "Ternary Operator",
    question: "Is ternary operator an expression or a statement?",
    answer: "Expression",
  },

  // Strict Mode
  {
    category: "Strict Mode",
    question: "How do you enable strict mode?",
    answer: "Use 'use strict'; at the top of the file or function.",
  },
  {
    category: "Strict Mode",
    question: "What happens in strict mode with undeclared variables?",
    answer: "It throws an error.",
  },

  // Functions
  {
    category: "Functions",
    question: "What is a function in JS?",
    answer: "A reusable block of code that performs a task.",
  },
  {
    category: "Functions",
    question: "How do you return a value from a function?",
    answer: "Using the return keyword.",
  },

  // Function Declarations and Expressions
  {
    category: "Function Declarations and Expressions",
    question: "Are function declarations hoisted?",
    answer: "Yes",
  },
  {
    category: "Function Declarations and Expressions",
    question: "Are function expressions hoisted?",
    answer: "No",
  },

  // Arrow Functions
  {
    category: "Arrow Functions",
    question: "Do arrow functions have their own this?",
    answer: "No",
  },
  {
    category: "Arrow Functions",
    question: "Can arrow functions be used as constructors?",
    answer: "No",
  },

  // Arrays
  {
    category: "Arrays",
    question: "How do you create an array?",
    answer: "Using square brackets: []",
  },
  {
    category: "Arrays",
    question: "How do you access the last element of an array?",
    answer: "array[array.length - 1]",
  },

  // Basic Array Methods
  {
    category: "Basic Array Methods",
    question: "What does push() do?",
    answer: "Adds one or more elements to the end.",
  },
  {
    category: "Basic Array Methods",
    question: "What does pop() do?",
    answer: "Removes the last element.",
  },

  // map() Method
  {
    category: "map() Method",
    question: "What does map() return?",
    answer: "A new array with transformed values.",
  },
  {
    category: "map() Method",
    question: "Does map() mutate the original array?",
    answer: "No",
  },

  // filter() Method
  {
    category: "filter() Method",
    question: "What does filter() return?",
    answer: "A new array with elements that pass the test function.",
  },
  {
    category: "filter() Method",
    question: "Does filter() change the original array?",
    answer: "No",
  },

  // reduce() Method
  {
    category: "reduce() Method",
    question: "What does reduce() do?",
    answer:
      "It applies a function to each element to reduce the array to a single value.",
  },
  {
    category: "reduce() Method",
    question: "What arguments does reduce() take?",
    answer: "A callback function and an initial value.",
  },

  // Spread and Rest Operators
  {
    category: "Spread/Rest Operator",
    question: "What does the spread operator do?",
    answer: "Expands elements from an array or object.",
  },
  {
    category: "Spread/Rest Operator",
    question: "What does the rest operator do?",
    answer: "Collects remaining elements into an array.",
  },

  // Destructuring
  {
    category: "Destructuring",
    question: "How do you destructure an object?",
    answer: "const {name, age} = person;",
  },
  {
    category: "Destructuring",
    question: "How do you destructure an array?",
    answer: "const [first, second] = arr;",
  },

  // Sort Method
  {
    category: "Sort Method",
    question: "How do you sort numbers correctly in JS?",
    answer: "Use a compare function: arr.sort((a, b) => a - b);",
  },
  {
    category: "Sort Method",
    question: "Does sort() mutate the original array?",
    answer: "Yes",
  },
];
