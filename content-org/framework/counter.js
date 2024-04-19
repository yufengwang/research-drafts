// @ts-nocheck
function Counter() {
    const [state, setState] = React.useState(1);
    const [data, setData] = React.useState([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
    ]);
    React.useEffect(() => {
        console.log('state');
    }, [state]);
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            { onClick: () => setState((c) => c + 1) },
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