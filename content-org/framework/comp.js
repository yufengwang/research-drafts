// @ts-nocheck
'use strict';

const e = React.createElement;
const createRoot = ReactDOM.createRoot
const render = ReactDOM.render


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

/*function Counter() {
  const [state, setState] = React.useState(1);
  const [data, setData] = React.useState([{ id: 1, name: 'a' }, { id: 2, name: 'b' }])
  React.useEffect(() => {
    console.log('state')
  }, [state])
  return (
    <div>
      <h1 onClick={() => setState((c) => c + 1)}>
        <span>Count:</span>
        <b>{state}</b>
      </h1>
      <h2>hello</h2>
      <ul>
        {data.map((el) => {
          return <li key={el.id}> {el.name}</li>
        })}
      </ul>
    </div>
  );
} */

function Counter() {

  const [state, setState] = React.useState(1);

  const [data, setData] = React.useState([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ]);

  React.useEffect(() => {
    console.log('state');
  }, [state]);

  const handleClick = () => {
    setState((c) => c + 1)
    setState(10)
    setState(c => c + 2)

  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      { onClick: handleClick },
      React.createElement('span', null, 'Count:'),
      React.createElement('b', null, state)
    ),
    React.createElement('h2', null, 'hello'),
    React.createElement(
      'ul',
      null,
      data.map((el) => {
        return React.createElement('li', { key: el.id }, el.name);
      })
    )
  );
}



const element = /*#__PURE__*/ React.createElement(Counter, null);

// const domContainer = document.querySelector("#root");
const container = document.getElementById("root");
// const container = document.getElementById('app');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(element);

ReactDOM.render(element, container)

// ReactDOM.hydrate(e(Counter), root);
// ReactDOM.render(e(Counter), root);
