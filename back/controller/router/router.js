const express = require('express')
const router = express.Router()
const Controller = require('../controller/controller')

router.route('/api/getBooks').get((req, res) => {
    Controller.getBooks(req, res)
})
router.route('/api/getWriters').get((req, res) => {
    Controller.getWriters(req, res)
})
router.route('/api/getReaders').get((req, res) => {
    Controller.getReaders(req, res)
})
router.route('/api/getFreeTitles').get((req, res) => {
    Controller.getFreeTitles(req, res)
})
router.route('/api/finder').get((req, res) => {
    Controller.finder(req, res)
})
router.route('/api/addReader').post((req, res) => {
   Controller.addReader(req, res)
})
router.route('/api/addBooks/:number').post(async (req, res) => {
    Controller.addBooks(req, res)
})
router.route('/api/deleteBook/:id').delete((req, res) => {
    Controller.deleteBook(req, res)
})
router.route('/api/takeBook').put((req, res) => {
    Controller.takeBook(req, res)
})
router.route('/api/addBook').post((req, res) => {
    Controller.addBook(req, res)
})

module.exports = router



