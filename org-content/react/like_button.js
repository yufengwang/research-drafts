"use strict";

const e = React.createElement;

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
  const [state, setState] = React.useState(1);

  function handleClick() {
    setState(state + 1);
  }

  return e(
    "h1",
    {
      onClick: handleClick,
    },
    "Count: ",
    state
  );
}

// const domContainer = document.querySelector("#root");
const root = document.getElementById("root");
ReactDOM.hydrate(e(Counter), root);
// ReactDOM.render(e(Counter), root);
