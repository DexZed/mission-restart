
# Ticket System

React-based Customer Support Zone designed to display customer tickets, track progress, and mark them as resolved.




## Assignment Q/A

### What is JSX, and why is it used?

#### **JSX** is a **syntax extension for JavaScript** that allows developers to write HTML-like markup directly within their JavaScript code. It is primarily used with libraries like React to describe what the user interface should look like in a more intuitive and declarative way. Although its not mandatory to use it.

### What is the difference between State and Props?

#### Properties, **props** are read-only inputs passed from parent to child components to configure them, while **state** is a mutable, internal data storage managed within a component to track changes that trigger re-renders. Props are immutable by the child, whereas state can be changed by the component itself.

### What is the useState hook, and how does it work?

#### The **useState** hook is a fundamental function in React that allows functional components to manage local, dynamic data and trigger re-renders when that data changes. It makes components interactive and responsive to user input and other events. 

##### The useState hook works by leveraging React's internal mechanisms to preserve data between component re-renders: 
- Initialization: Call **useState** with an initial value when the component first renders.
- Returns a Pair: **useState** returns an array with two elements, which are typically destructured for easy access:
- **state**: The current value of the state variable.
- **setState**: A function that updates the state to a new value.
- Triggering Re-renders: When the **setState** function is called with a new value, React is notified that the state has changed.
- React then queues a re-render of that specific component to reflect the new state value in the UI.
- The state update is asynchronous and does not immediately change the value within the current function execution. The updated value will only be available in the next render of the component.

### How can you share state between components in React?

#### State can be shared between components using several methods
- Lifting State Up: Move the state from the individual components to their closest common parent.
- Context API: Context API solves the problem of "prop drilling," where we have to pass props through many layers of intermediate components that don't need the data themselves.
- External State Management Libraries: Redux, MobX, Zustand

### How is event handling done in React?

#### Event handling in React is similar to handling events in plain HTML, but with key syntax differences and the use of a synthetic event system. 
- Syntax: CamelCase Naming, Passing Functions and Defining Handlers
- The Synthetic Event System: It uses event delegation, where a single, top-level event listener is attached to the root of the React application for each event type.