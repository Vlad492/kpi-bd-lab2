const { Books, Writers, Writes, Readers, Finder } = require('../../model/tables')


class Controller {
    static async getBooks(req, res) {
        let response = await Books.getBooks()
        res.status(200).json(response)
    }
    static async getReaders(req, res) {
        let response = await Readers.getReadersArr()
        res.status(200).json(response)
    }
    static async getWriters(req, res) {
        let response = await Writers.getWriters()
        res.status(200).json(response)

    }
    static async getFreeTitles(req, res) {
        let response = await Books.getTitles()
        res.status(200).json(response)
    }
    static async finder(req, res) {
        console.log(req.query)
        const FR = new Finder(req.query.table, req.query.input, req.query.name, req.query.surname,req.query.clear)
        let response = await FR.finder()
        res.status(201).json(response)
    }
    static async addReader(req, res) {
        let reader = new Readers(req.body.name, req.body.surname, req.body.age, req.body.sex)
        if (await reader.create()) {
            res.status(201).json()
        } else {
            res.status(403).json()
        }
    }
    static async addBooks(req, res) {
        let response = await Books.addBooks(req.params.number)
        if (response) {
            res.status(201).json()
        } else {
            res.status(403).json()
        }
    }
    static async deleteBook(req, res) {
        if (Books.deleteBook(req.params.id)) {
            res.status(201).json()
        } else {
            res.status(403).json()
        }
    }
    static async takeBook(req, res) {
        let readerid = await Readers.getReaderId(req.body.holder)
        let bookid = await Books.getBookId(req.body.title)
        await Books.takeBook(bookid, readerid)
        res.status(201).json()
    }
    static async addBook(req, res) {
        let book = new Books(req.body.title)
        let bookid = await book.create()
        let writerid = await Writers.getWriterId(req.body.writer)
        let write = new Writes(writerid, bookid)
        await write.create()
        res.status(201).json()
    }
}





module.exports = Controller

