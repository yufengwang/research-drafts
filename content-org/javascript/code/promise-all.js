// 手写promise all

const myPromiseAll = (promises) => {
    return new Promise((resolve, reject) => {
        let count = 0;
        let result = [];
        const len = promises.lenght;
        promises.forEach((p, i) => {
            Promise.resolve(p).then((res) => {
                count++;
                result[i] = res
                if (count === len) {
                    resolve(result)
                }


            }).catch(reject)
        })

    })

}