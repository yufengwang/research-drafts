const s1 = "get-element-by-id"; // getElementById
function dashToCamel(str) {
    const reg = /-([a-z]{1})/i
    let result
    while(result = reg.exec(str)) {
        str = str.replace(result[0],  result[1].toUpperCase())
        console.log(result, str)
    }
    return str
}

const result = dashToCamel(s1)

console.log(result)

module.exports = dashToCamel
