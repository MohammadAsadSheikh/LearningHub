export type LessonContent = {
  summary: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export const lessonContent: Record<string, LessonContent> = {
  "rn-lesson-1": {
    summary:
      "Understand React Native and how it helps you build mobile applications for iOS and Android.",
    sections: [
      {
        heading: "What is React Native?",
        body: "React Native is a framework for building native mobile user interfaces using React and JavaScript. It lets you share much of your application code between iOS and Android.",
      },
      {
        heading: "How does it work?",
        body: "You build interfaces using components such as View and Text. React Native connects these components to native platform UI elements.",
      },
      {
        heading: "Key takeaway",
        body: "React Native combines React's component-based approach with native mobile application capabilities.",
      },
    ],
  },
  "rn-lesson-2": {
    summary: "Learn how components, props, and state work together.",
    sections: [
      {
        heading: "Components",
        body: "Components are reusable building blocks of a React Native interface. A component can represent a button, card, screen, or another part of your UI.",
      },
      {
        heading: "Props",
        body: "Props pass information from a parent component to a child component. They should be treated as read-only by the receiving component.",
      },
      {
        heading: "State",
        body: "State stores information that can change over time. Updating state triggers React to render the relevant UI again.",
      },
    ],
  },
  "rn-lesson-3": {
    summary: "Build responsive layouts for iOS and Android.",
    sections: [
      {
        heading: "Flexbox",
        body: "React Native uses Flexbox for layout. Properties such as flex, flexDirection, justifyContent, and alignItems help position elements.",
      },
      {
        heading: "Spacing",
        body: "Use padding and margin to create consistent spacing. Shared design tokens help maintain a consistent visual style.",
      },
      {
        heading: "Platform differences",
        body: "Test layouts on both iOS and Android because fonts, system UI, and platform behaviors can differ.",
      },
    ],
  },
  "rn-lesson-4": {
    summary: "Understand navigation between mobile screens.",
    sections: [
      {
        heading: "Screen navigation",
        body: "A navigation stack manages screens and supports navigating forward and returning to previous screens.",
      },
      {
        heading: "Passing parameters",
        body: "Navigation parameters allow a screen to receive information, such as a course or item ID, from the previous screen.",
      },
      {
        heading: "Best practice",
        body: "Keep navigation types explicit with TypeScript so route names and their parameters remain consistent.",
      },
    ],
  },
  "js-lesson-1": {
    summary: "Understand JavaScript variables and common data types.",
    sections: [
      {
        heading: "Variables",
        body: "Use const by default, and let when a variable needs reassignment. Avoid var in modern JavaScript unless there is a specific reason.",
      },
      {
        heading: "Data types",
        body: "JavaScript includes primitive types such as string, number, boolean, undefined, bigint, symbol, and null, along with objects.",
      },
      {
        heading: "Key takeaway",
        body: "Understanding types and variable scope helps prevent bugs in application logic.",
      },
    ],
  },
  "js-lesson-2": {
    summary: "Work with arrays and objects in JavaScript.",
    sections: [
      {
        heading: "Arrays",
        body: "Arrays store ordered collections. Methods such as map, filter, find, and reduce help transform and inspect data.",
      },
      {
        heading: "Objects",
        body: "Objects store information as key-value pairs. Use property access and destructuring to work with their values.",
      },
      {
        heading: "Practice",
        body: "Try transforming an array of course objects into a list of course titles using map.",
      },
    ],
  },
  "js-lesson-3": {
    summary: "Learn functions, lexical scope, and closures.",
    sections: [
      {
        heading: "Functions",
        body: "Functions package reusable logic. JavaScript supports function declarations, function expressions, and arrow functions.",
      },
      {
        heading: "Lexical scope",
        body: "Lexical scope determines which variables a function can access based on where the function is defined.",
      },
      {
        heading: "Closures",
        body: "A closure allows a function to retain access to variables from its surrounding lexical scope.",
      },
    ],
  },
  "js-lesson-4": {
    summary: "Handle asynchronous operations with promises and async/await.",
    sections: [
      {
        heading: "Promises",
        body: "A Promise represents the eventual success or failure of an asynchronous operation. Use then and catch to handle its result.",
      },
      {
        heading: "Async and await",
        body: "An async function returns a Promise. The await keyword makes asynchronous code easier to read, and try/catch can handle failures.",
      },
      {
        heading: "API requests",
        body: "When fetching data from an API, handle loading, success, and error states so your UI remains predictable.",
      },
    ],
  },
  "redux-lesson-1": {
    summary: "Understand centralized state management with Redux.",
    sections: [
      {
        heading: "Why Redux?",
        body: "Redux provides a predictable way to manage shared application state when multiple components need access to the same data.",
      },
      {
        heading: "The data flow",
        body: "Components dispatch actions, reducers calculate updated state, and subscribed components render the latest values.",
      },
      {
        heading: "When to use it",
        body: "Redux is useful when application state is shared or complex enough that local component state becomes difficult to manage.",
      },
    ],
  },
  "redux-lesson-2": {
    summary: "Create a Redux store using Redux Toolkit.",
    sections: [
      {
        heading: "The store",
        body: "The Redux store holds your application's shared state and provides a consistent place to access it.",
      },
      {
        heading: "Configure the store",
        body: "Redux Toolkit's configureStore simplifies store setup, reducer registration, and development defaults.",
      },
      {
        heading: "React Native integration",
        body: "Wrap your application with React Redux's Provider so components can access the store.",
      },
    ],
  },
  "redux-lesson-3": {
    summary: "Manage state updates using slices and reducers.",
    sections: [
      {
        heading: "Slices",
        body: "createSlice groups a state section with its reducer logic and automatically generates action creators.",
      },
      {
        heading: "Reducers",
        body: "Reducers describe how state changes in response to actions. Redux Toolkit uses Immer to support safe, draft-based updates.",
      },
      {
        heading: "Best practice",
        body: "Keep state updates predictable and avoid putting unrelated application logic into one large slice.",
      },
    ],
  },
  "redux-lesson-4": {
    summary: "Connect Redux state to React Native components.",
    sections: [
      {
        heading: "Reading state",
        body: "Use useSelector to read the relevant portion of the Redux store inside a component.",
      },
      {
        heading: "Dispatching actions",
        body: "Use useDispatch to dispatch actions when a user interacts with your application.",
      },
      {
        heading: "Keep components focused",
        body: "Select only the state your component needs and keep UI responsibilities separate from state-management logic.",
      },
    ],
  },
};
