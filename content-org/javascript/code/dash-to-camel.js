function dashToCamel(str) {
    const reg = /-([a-z]{1})/i
    let result
    while (result = reg.exec(str)) {
        str = str.replace(result[0], result[1].toUpperCase())
        console.log(result, str)
    }
    return str
}

/**
   * 有赞 问题 2
   * 将一个json数据的所有key从下划线改为驼峰
   *
   * @param {object | array} value 待处理对象或数组
   * @returns {object | array} 处理后的对象或数组
   */

const testData = {
    a_bbb: 123,
    a_g: [1, 2, 3, 4],
    a_d: {
        s: 2,
        s_d: 3,
    },
    a_f: [
        1,
        2,
        3,
        {
            a_g: 5,
        },
    ],
    a_d_s: 1,
};

const parseObj = (json) => {
    const toCamel = (str) => {
        return str.replace(/_([a-z])/g, function (match, p1) {
            return p1.toUpperCase()
        })
    }
    const isPrimtive = (val) => {
        return typeof val !== 'object'
    }

    const parse = (obj) => {
        let res = Array.isArray(obj) ? [] : {}
        for (let [key, val] of Object.entries(obj)) {
            if (/_/.test(key)) {
                res[toCamel(key)] = isPrimtive(val) ? val : parse(val)
            } else {
                res[key] = isPrimtive(val) ? val : parse(val)
            }
        }
        return res
    }

    return parse(json)

}

export default {}