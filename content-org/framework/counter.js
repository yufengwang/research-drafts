// @ts-nocheck
function Counter() {
    const [num, setNum] = React.useState(1);

    const [data, setData] = React.useState([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
    ]);

    const handleClick = () => {
        setNum((c) => c + 1)
        setNum(10)
        setNum(c => c + 2)
    }

    React.useEffect(() => {
        console.log('num',num);
    }, [num]);

    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            { onClick: handleClick },
            React.createElement('span', null, 'Count:'),
            React.createElement('b', null, num)
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