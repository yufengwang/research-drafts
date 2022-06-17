const obj = {
    name: '1',
    fn() {
        return this.name
    },
    fn1: () => {

        return this.name
    }
}
console.log(this)
console.log(obj.fn())

// console.log(obj.fn1())Ï


let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList: () => {
        this.students.forEach(
            student => console.log(this.title + ': ' + student)
        );
    }
};

group.showList();
export default obj
