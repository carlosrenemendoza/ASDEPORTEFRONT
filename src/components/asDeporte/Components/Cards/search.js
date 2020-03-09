export const searchBy = (words,array,config)=>{
    let results = []
    let all = array
    all.forEach((e) => {
        let found = 0
        let keys = Object.keys(e)
        keys.forEach((key) => {
            if ((e[key] ? (e[key] + '').toLowerCase().indexOf(words.toLowerCase()) : -1) >= 0) found += 1
        })
        if (found !== 0) results.push(e)
    })
    return results
}
