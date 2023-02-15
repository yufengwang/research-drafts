"use strict";

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

function Counter() {
  const [state, setState] = React.useState(2);
  const [str, setString] = React.useState('foo');


  function handleClick() {
    setState(state + 1);
    setString('bar')
  }

  return e(
    "h1",
    {
      onClick: handleClick,
    },
    "Count is: ",
    state,
    " " + str
  );
}

// const domContainer = document.querySelector("#root");
const container = document.getElementById("root");
// const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(e(Counter));
// ReactDOM.hydrate(e(Counter), root);
// ReactDOM.render(e(Counter), root);
