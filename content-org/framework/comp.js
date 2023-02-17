'use strict';

const e = React.createElement;
const createRoot =ReactDOM.createRoot


class LikeButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { name: ["foo"] };
    this.handleClick = this.handleClick.bind(this);
    // this.handleClick = _.debounce(this.handleClick.bind(this), 2000);
  }

  handleClick(e) {
    // console.log(e);
    const { name } = this.state;
    name.push("bar");
    console.log(name)
    this.setState({ name });
  }

  render() {
    console.log(this.state.name);
    return e(
      "button",
      { onClick: this.handleClick },
      this.state.name.join(", ")
    );
  }
}

// function Counter() {
//   const [state, setState] = React.useState(1);
//   return (
//     <div>
//       <h1 onClick={() => setState((c) => c + 1)}>
//         <span>Count:</span>
//         <b>{state}</b>
//       </h1>
//       <h2>hello</h2>
//     </div>
//   );
// }


function Counter() {
  const [state, setState] = React.useState(1);
  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    /*#__PURE__*/ React.createElement(
      'h1',
      {
        onClick: () => setState((c) => c + 1),
      },
      /*#__PURE__*/ React.createElement('span', null, 'Count:'),
      /*#__PURE__*/ React.createElement('b', null, state)
    ),
    /*#__PURE__*/ React.createElement('h2', null, 'hello')
  );
}
const element = /*#__PURE__*/ React.createElement(Counter, null);

// const domContainer = document.querySelector("#root");
const container = document.getElementById("root");
// const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(element);
// ReactDOM.hydrate(e(Counter), root);
// ReactDOM.render(e(Counter), root);
