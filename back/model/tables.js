const { Client } = require('pg')
const client = new Client('postgres://postgres:vlad@localhost:5432/lab2')
client.connect().then(() => console.log('PG has been connected'))
const ReworkingData = require('./handlers')
const RD = new ReworkingData


class Books {
    constructor(title) {
        this.title = title
    }
    async create() {
        await client.query(`insert into books (title) values ('${this.title}')`)
        let bookid = await client.query('select bookid from books order by bookid desc limit 1')
        return bookid.rows[0].bookid
    }
    static async getBookId(title) {
        try {
            let res = await client.query(`select bookid from books where title = '${title}'`)
            return res.rows[0].bookid
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async deleteBook(id) {
        try {
            await client.query(`delete from books where bookid = ${id}`)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async getBooks() {
        try {
            let res = await client.query(`select books.bookid,title,holder,name,surname,nationality from books 
                inner join writes on writes.bookid = books.bookid 
                inner join writers on writers.writerid = writes.writerid order by books.bookid`)
            let res2 = await Readers.getReaders()
            return RD.reworkBooks(RD.handleBooks(res.rows, res2))
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async getTitles() {
        try {
            let res = await client.query('select title from books where holder is null')
            return RD.reworkTitles(res.rows)
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async takeBook(bookid, readerid) {
        try {
            await client.query(`update books set holder = ${readerid} where bookid = ${bookid}`)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async addBooks(number) {
        try {
            let titles = await Books.getTitles()
            console.log(titles)
            let writers = await Writers.getWriters()
            console.log(writers)
            for (let i = 0; i < number; i++) {
                let randomTitle = Math.floor(Math.random() * titles.length)
                let randomWriter = Math.floor(Math.random() * writers.length)
                let Book = new Books(titles[randomTitle])
                let bookid = await Book.create()
                let write = new Writes(await Writers.getWriterId(writers[randomWriter]), bookid)
                await write.create()
            }
            return true
        } catch (e) {
            console.log(e)
            return false
        }


    }
}
class Writers {
    static async getWriters() {
        try {
            let res = await client.query('select name, surname from writers')
            return RD.reworkPeople(res.rows)
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async getWriterId(writerString) {
        let writer = writerString.split(" ")
        try {
            let res = await client.query(`select writerid from writers where name = '${writer[0]}' and surname = '${writer[1]}'`)
            return res.rows[0].writerid
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
class Readers {
    constructor(name, surname, age, sex) {
        this.name = name
        this.surname = surname
        this.age = age
        this.sex = sex
    }
    async create() {
        try {
            await client.query(`insert into readers (name,surname,age,sex) values ('${this.name}','${this.surname}', ${this.age}, '${this.sex}')`)
            let id = await client.query('select readerid from readers order by readerid desc limit 1')
            console.log(id.rows[0].readerid)
            await client.query(`insert into abonements (abonementid, expiredin) values (${id.rows[0].readerid},
              '${new Date((new Date().getFullYear() + 1).toString(),
                new Date().getMonth(),
                new Date().getDate()).toLocaleDateString()}')`)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async getReaders() {
        try {
            let res = await client.query('select * from readers')
            return res.rows
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async getReaderId(fio) {
        let reader = fio.split(" ")
        try {
            let res = await client.query(`select readerid from readers where name = '${reader[0]}' and surname = '${reader[1]}'`)
            return res.rows[0].readerid
        } catch (e) {
            console.log(e)
            return false
        }
    }
    static async getReadersArr() {
        try {
            let res = await client.query('select * from readers')
            return RD.reworkPeople(res.rows)
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
class Finder {
    constructor(table, input, name, surname, clear) {
        this.table = table
        this.input = input
        this.name = name
        this.surname = surname
        this.clear = clear
    }
    async finder() {
        console.log(this.table, this.input, this.name, this.surname, this.clear)
        switch (this.table) {
            case 'Readers': {
                return await this.finderReaders()
            }
            case 'Books': {
                if (this.input === '') {
                    return await this.availableBooks()
                } else {
                    return await this.titleBooks()
                }
            }
            case 'Writers': {
                if (this.name && this.surname) {
                    if (this.clear === 'true') {
                        return await this.deleteWriterClear()
                    } else {
                        console.log(2)
                        return await this.deleteWriter()
                    }
                } else {
                    return await this.finderWriters()
                }

            }

        }
    }
    async deleteWriterClear() {
        try {
            let writerid = await client.query(`select writerid from writers where name = '${this.name}' and surname = '${this.surname}'`)
            writerid = writerid.rows[0].writerid
            await client.query(`
                alter table writes 
                DROP constraint writerid;

                alter table writes  add constraint writerid foreign key (writerid) REFERENCES writers(writerid) ON DELETE cascade;
                
                delete from writes where writerid = ${writerid};
                delete from writers where writerid = ${writerid};

                alter table writes 
                DROP constraint writerid;
                alter table writes  add constraint writerid foreign key (writerid) REFERENCES writers(writerid) ON DELETE no action;`)
            console.log('deleted')
            return true

        } catch (e) {
            console.log(e)
            console.log('troubles')
            return false
        }
    }
    async deleteWriter() {
        try {
            await client.query(`delete from writers where name = '${this.name}' and surname = '${this.surname}' `)
            return true

        } catch (e) {
            console.log(e)
            return false
        }
    }
    async finderReaders() {
        try {
            let res = await client.query(`select readers.readerid,name,surname,age,sex,expiredin from readers 
            inner join abonements on abonements.abonementid = readers.readerid`)
            return res.rows
        } catch (e) {
            console.log(e)
            return false
        }
    }
    async finderWriters() {
        try {
            let res = await client.query('select * from writers')
            return res.rows
        } catch (e) {
            console.log(e)
            return false
        }
    }
    async availableBooks() {
        try {
            let res = await client.query('select * from books where holder is null')
            return res.rows
        } catch (e) {
            console.log(e)
            return false
        }
    }
    async titleBooks() {
        try {
            let res = await client.query(`select * from books where title = '${this.input}' order by bookid`)
            return res.rows
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
class Writes {
    constructor(writerid, bookid) {
        this.writerid = writerid
        this.bookid = bookid
    }
    async create() {
        try {
            await client.query(`insert into writes (bookid,writerid) values(${this.bookid},${this.writerid})`)
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
//module.exports = { Writers, Writes, Abonements, Books, Readers,Finder }
module.exports = { Books, Readers, Writers, Writes, Finder }


