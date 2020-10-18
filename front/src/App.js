import React from 'react';
import './App.scss';
import { AddBook, AddNBooks, RemoveBook, AddAReader, TakeABook, Finder, Table, FinderModal } from './components/modules'
import { serverURL } from './components/config';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,

      library: [{ ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8, hello: 'hello' },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 }],
      modalTable: [{ ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8, hello: 'hello' },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 },
      { ID: 10, authorID: 4, title: 'Shining', bookHolderID: 8 }]
    }
  }
  handleCloseModal() {
    this.setState({ modal: false })
  }
  handleOpenModal() {
    this.setState({ modal: true })
  }
  updateModal(input) {
    console.log(input.length)
    input.map((elem) => {
      if (elem.authors) {
        elem.authors = elem.authors.join(' and ')
      }
      if (elem.holder !== undefined) {
        if (elem.holder === null) {
          elem.holder = 'Book in library'
        }
      }
      if (elem.alive === true || elem.alive === false) {
        elem.alive = `${elem.alive}`
      }
      if(elem.expiredin){
        elem.expiredin = new Date(elem.expiredin).toLocaleDateString()
      }
      return elem
    })
    if (input.length === 0){
      this.setState({modalTable : [{found: 'Not found'}]})
    }else{
      this.setState({ modalTable: input })
    }
    this.handleOpenModal()

  }
  componentDidMount() {
    this.updateLibrary()
  }
  updateLibrary() {
    fetch(serverURL + '/api/getBooks').then((res) => res.json()).then((res) => {
      res.map((elem) => {
        if (elem.holder === null) {
          elem.holder = new Array('Book in library')
        }
        elem.authors = elem.authors.join(' and ')
        return elem
      })
      if(res.length !== 0){
        this.setState({ library: res })
      }else{
        this.setState({ library: [{found:'Not found'}] })
      }
      
    })
  }
  render() {
    return (
      <>
        <FinderModal show={this.state.modal} onHide={this.handleCloseModal.bind(this)} modalTable={this.state.modalTable} />

        <div className="App">
          <h3>Lab2 KV-83 Hleb Vladyslav</h3>
          <div className='forms'>


            <div className='fullSize form'>
              <AddAReader update={this.updateLibrary.bind(this)} />

            </div>
            <div className='fullSize form'>
              <AddBook update={this.updateLibrary.bind(this)} />
            </div>
            <div className='halfSize form'>
              <div className='fullSize inner'>
                <AddNBooks update={this.updateLibrary.bind(this)} />

              </div>
              <div className='fullSize inner'>
                <Finder update={this.updateLibrary.bind(this)} updateModal={this.updateModal.bind(this)} />

              </div>
            </div>
            <div className='halfSize form'>
              <div className='fullSize inner'>
                <TakeABook update={this.updateLibrary.bind(this)} />

              </div>
              <div className='fullSize inner'>

                <RemoveBook update={this.updateLibrary.bind(this)} />

              </div>
            </div>

          </div>

          <Table books={this.state.library} />

        </div>
      </>
    )
  }
}

export default App;
