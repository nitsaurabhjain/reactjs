## React JS
ReactJS is JavaScript library used for building UI application on component based architecture. 
### Create React App
* Create create app manually
```js
$npm init
"dependencies": {
    "react": "^16.4.2",
    "react-dom": "^16.4.2"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-cli": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.6.0",
    "webpack-cli": "^2.0.14",
    "webpack-dev-server": "^3.1.3"
  }
```
* Create react app by CLI tool
```js
$npm install create-react-app -g
create-react-app my-app
```
### JSX
* It's a JavaScript extension where we write html like syntax inside JavaScript
* HTML like syntax are know as React element
* React elements are immutable
* React Only Updates What’s Necessary
* With our knowledge so far, the only way to update the UI is to create a new  element, and pass it to ReactDOM.render().
* When react element is big, we split it in multiple lines for readability, while  doing this it is also recommended wrapping it in parentheses to avoid the pitfalls of automatic semicolon insertion.
```js
const reactElement = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
---
Component
---
* Conceptually, component is  functions or class, it accept arbitrary inputs (called “props”) and returns a React elements describing what should appear on the screen.
*  Always start component names with a capital letter because React treats <Welcome/> as a component and <welcome/> as html tag.
* All React components must act like pure functions with respect to their props
* A good rule of thumb is that if a part of app  code is used several places/times (Button, Panel, alert, notification etc), or is complex enough on its own then it's a good time to break it in component
 ```js
class Clock extends React.Component {
   constructor(props) {
     super(props);
     this.state = {date: new Date()};
   }
   componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
### React has two type of component 
 1. **stateless component** (Functional component):
 Better to use stateless component if we need to render the data only to avoid overhead of class
```js
let Profile = props => {
        <div>
           name: {props.name}
     	   age: {props.age}
        </div> 

}
export default Profile;
```
2.  **Stateful Components**
Stateful components are always class components.It has an state that get initialize in constructor.
```js
// Here is an excerpt from the counter example
constructor(props) {`
super``(props);
this``.state = { count: 0 };
}
```

Note: You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for stateless functional components to avoid extra overhead of class
**But**
However, as of React v16, there are no performance benefits from using stateless functional components over class components. 

---

### Props
In React **_props_** are short for properties that are _passed to React Components_ on creation using a naming convention similar to HTML-tag attributes.
````js
<Element reactProp = "1" />
````
---
### State
* In react  state is an observable object, when it's changes the respective component is re-rendered 
* The only place where you can assign `this.state` is the constructor.
*   Other then constructor Do Not Modify State Directly, Instead, use `setState()`
* setState is async function so if we need to calculate the new state value that depends on previous state then use then use 
```js

this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
* Once the state is changed ie setState function is called, React calls the  render function of of same component to update the component.
* * setState concate the state not update.
* Lift the state up to closest common ancestor if more then one component require it. by this we achieve kind of two way binding.
*  
```js
//Wrong
this.state.comment = 'Hello';
//Right
this.setState({comment: 'Hello'});
```
* this.setState may be called asynchronously so do not rely on below
 ```js
// Wrong 
this.setState({
  counter: this.state.counter + this.props.increment,
});
```  
* Fix
 ```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
* __state__ updates are merged, means it does not remove any existing property of state after calling setState function.
* A component may choose to pass its state down as props to its child components:
```js
<FormattedDate date={this.state.date} />
```
### state vs props
|state|props  |
|--|--|
|state is observable object |props are immutable|
|state is updated by event handlers|props are set by parent component`
|state can only be used in Class Components|props don’t have this limitation|

### Handling Event

* Event handling in React is slightly diff from DOM event handling
* In React you cannot prevent default behavior
```js
//Event Handling in DOM
<button onclick="activateLasers()">
  Activate Lasers
</button>
//Event handling in React
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
*  We need to call `preventDefault`  explicitly
```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <button href="#" onClick={handleClick}>
      Click me
    </button>
  );
}
```
* Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}`, you should bind that method
```js 
this.handleClick =  this.handleClick.bind(this); and call
onClick={this.handleClick}
//or
onClick={() => this.handleClick()}
```
* Passing Arguments to Event Handlers
 
```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
//or
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
### Conditional Rendering
```js
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

### List and Keys
```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
* Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:
* A good rule of thumb is that elements inside the `map()` call need keys.

### Form
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const form  = (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
    return form;
  }
}
```
### Higher order component
A Higher Order Component is just a React Component that takes another component as an argument and return another one
```js
import React from 'react';

const withSecretToLife = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          secretToLife={42}
        />
      );
    }
  }  
  return HOC;
};
export default withSecretToLife;
```
### Utalize propsTypes:
```js
import PropTypes from 'prop-types';
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
Greeting.propTypes = {
  name: PropTypes.string
};
Greeting.defaultProps = {
   name: 'saurabh',
   age : 32,
   gender: 'male'
}
```

### ref
> The ref is used to get the ref of a dom element. generally it is avoided but can be used when we need to get perticular  DOM element.
```js
  class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
	this.focusTextInput = this.focusTextInput.bind(this);
  }
   focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.inputRef.current.focus();
  }

 render() {
    // tell React that we want to associate the <input> ref
    // with the `inputRef` that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.inputRef} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
### Performance.
* Pass the key when we loop the component. ex
```js
 ullistitems = items.map((item, index) =>{
 return (<ul key= {index}>item</ul>)
 })
```
* By calling shouldComponentUpdate()
 > Most of the time we use React.PureComponent instead of shouldComponentUpdate. Basically React.PureComponent does the cello comparision of state and pros and if it's all are same then component will not be re-render and if not same then it will be rerendered
```js
shouldComponentUpdate(nextProps, nextState) {
   if(this.props.name ===nextProps.name){
     return false;
   }else{
   return true;
   }
}
```
 Note: If we see some complex logic inside shouldComponentUpdate then better not to use it and re-render the component because it is always called and performance is reduced.
### CSS styling
* instead of class use className in Component
#### Type of CSS
1. inline //not a good approach but still used.
```js
const profileStyle = {borderStyle: solid, color:blue} //this whole can be extracted in a spe .js file
<div  style = {profileStyle}>Profile Text</div>
```
2. Moduler (external)
> Create a seprate css file and import it in component

```css
.myCss{
border: solid blue;
color: black;
}
```
```js
import appCss from './App.css' //used when we need to write css for specific component.
import './App.css' // This is used when we need cascading also.
<div className = 'appCss.myCSS'> // respect to specific component.
<div className = 'myCSS'> // performs the cascading also
``` 
3. By using library example 'style-jsx'
```js
npm install style-jsx --save
```
## Code-Splitting
> To avoid winding up with a large bundle, it’s good to start “splitting” your bundle.
Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user.
We can use two below approach to split our code.
1. Router Based.
2. Component Based

**The best way to introduce code-splitting into your app is through the dynamic `import()`**

```js
// install below to use dynamic import since dynamic import is not a part of ECAScript standard.
npm install babel-plugin-syntax-dynamic-import --save-dev
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```
### React Loadable
[React Loadable](https://github.com/thejameskyle/react-loadable) wraps dynamic imports in a nice, React-friendly API for introducing code splitting into your app at a given component.
```js
// npm install react-loadable --save
import Loadable from 'react-loadable';
const LoadableOtherComponent = Loadable({
  loader: () => import('./OtherComponent'),
  loading: () => <div>Loading...</div>,
});
const MyComponent = () => (
  <LoadableOtherComponent/>
);
``` 

### Composition vs inharitance
* we use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.
* Composition give you all the flexibility you need 
* Remember we can pass any value into React Component including primitive, function, React element and React Component by props.
 ---
### How import works
It works on JavaScript differed concept.
```js
var arr = [1,2,3,4];
var [a, b, c, d] = arr;
var obj = {name: 'saurabh', sname: 'jain'};
var {name,sname} = obj;
//same thing happen here
import {fn1, fn2} from 'mylib'; 
```
* class always run in 'use strict' mode
* React support only one-way data flow
* React virtual DOM is a light weight and it is actually  in-memory representation of actual DOM.

### Online Editor
codePen