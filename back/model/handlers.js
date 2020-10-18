module.exports = class ReworkingData {
    reworkBooks(input) {
        input = input.map((elem) => {
            elem.authors = [`${elem.name} ${elem.surname}`]
            delete elem.name
            delete elem.surname
            return elem
        })
        for (let i = 0; i < input.length - 1; i++) {
            if (input[i].bookid === input[i + 1].bookid) {
                input[i].authors.push(...input[i + 1].authors)
                input.splice(i + 1, 1)
            }

        }
        return input

    }
    reworkTitles(input){
        return input.map((elem)=> elem.title)
    }
    reworkPeople(input) {
        return input.map((elem) => `${elem.name} ${elem.surname}`)
    }
    reworkReaders(input) {
        return input.map((elem) => {
            elem.expiredin = elem.expiredin.toLocaleDateString()
            return elem
        })
    }
    reworkBooksToArray(input) {
        let arr = []
        input.forEach(element => {
            arr.push(element.title)
        })
        return arr
    }
    handleBooks(res, res2) {
        res.map((elem) => {
            if (elem.holder !== null) {
                let result = res2.filter((element,) => {
                   
                    if (elem.holder === element.readerid) {
                        return true
                    } else {
                        return false
                    }
                })
                elem.holder = `${result[0].name} ${result[0].surname}`
                return elem
            } else {
                return elem
            }
        })
        return res
    }
}



