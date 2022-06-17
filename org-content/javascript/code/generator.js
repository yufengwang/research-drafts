export const gen = () => {
  let val = 0;
  return {
    next: () => {
      return { value: val === 3 ? 3 : val++, done: val === 3 ? true : false };
    },
  };
};

const g = gen();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
