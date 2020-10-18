import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function FinderModal(props) {


    const findMaxLength = () => {
        let length = 1
        let maxIndex = 0
        props.modalTable.forEach((elem, index) => {
            if (Object.keys(elem).length > length) {
                length = Object.keys(elem).length
                maxIndex = index
            }
        })
        return { length, maxIndex }


    }
    let config = findMaxLength()
    return (
        <Modal size='xl' show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Finder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='booksTable'>
                    <header className='bg-dark'>
                        <h4>Library</h4>
                    </header>
                    <div className="books">
                        <header style={{ paddingRight: '15px' }}>
                            {Object.keys(props.modalTable[config.maxIndex]).map((elem, index) => <p style={{ width: 1 / Object.keys(props.modalTable[config.maxIndex]).length * 100 + '%' }} key={index}>{elem.toUpperCase()}</p>)}
                        </header>
                        <div className="booksBody">
                            {props.modalTable.map((elem, index) => <div className='line' key={index}>{Object.values(elem).map((elem, index) => <p key={index} style={{ width: 1 / config.length * 100 + '%' }}>{elem}</p>)}</div>)}

                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    )
}