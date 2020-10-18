import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { serverURL } from '../config'

export default function Finder(props) {
    const [show, setShow] = useState(false);
    const [modalType,setModalType] = useState(false)

    useEffect(() => {
        fetch(serverURL + '/api/getWriters').then((res) => res.json()).then((res) => {
            setWriter(res[0])
            setWriterSelect(res)
        })
    }, [])
    const handleClose = () => {
        if(modalType){
            let writerParse = writer.split(' ')
            fetch(serverURL + `/api/finder/?table=Writers&name=${writerParse[0]}&surname=${writerParse[1]}&clear=true`).then((res) => res.json()).then((res) => {
                console.log(res)
                if (res === true) {
                    setModalMessage('Deleted successful')
                    props.update()
                } else {
                    setModalMessage('Something went wrong')
                }
                setShow(true)
            })
            setModalType(false)
            props.update()
        }else{
            setShow(false)
        }
        setModalType(false)
        
    };
    const handleShow = () => setShow(true);
    const [modalMessage, setModalMessage] = useState('')
    const [text, setText] = useState('')
    const [writer, setWriter] = useState('')
    const [writerSelect, setWriterSelect] = useState([])
    const [fields] = useState(['Get available books', 'Get readers', 'Get books by title', 'Get writers', 'Delete writer'])
    const [select, setSelect] = useState(fields[0])
    const abstraction = {
        'Get available books': '/api/finder?table=Books&input=',
        'Get readers': '/api/finder?table=Readers',
        'Get books by title': `/api/finder?table=Books&input=${text}`,
        'Get writers': '/api/finder?table=Writers'
       
    }

    const submit = (e) => {
        e.preventDefault()
        if (select === 'Delete writer') {
            console.log(select,writer)
            let writerParse = writer.split(' ')
            console.log(writerParse[0])
            fetch(serverURL + `/api/finder/?table=Writers&name=${writerParse[0]}&surname=${writerParse[1]}&clear=false`).then((res) => res.json()).then((res) => {
                if (res.delete === true) {
                    setModalMessage('Deleted successful')
                    props.update()
                } else {
                    setModalMessage('This writer have books in library. Do you want delete this books too?')
                    setModalType(true)
                }
                setShow(true)
            })
        } else {
            fetch(serverURL + abstraction[select]).then((res) => res.json()).then((res) => {
                console.log(res)
                props.updateModal(res)
            })
        }

    }


    return (
        <>
            <Form onSubmit={submit}>
                <h3>Finder</h3>
                <Form.Group>
                    <Form.Label>Text</Form.Label>

                    {(select === 'Get books by title') ? <Form.Control type="text" placeholder="Enter text" value={text} onChange={(e) => setText(e.target.value)} /> : <Form.Control type="text" placeholder="Enter text" value={text} onChange={(e) => setText(e.target.value)} disabled />}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    {(select === 'Delete writer') ? (
                        <Form.Control as="select" value = {writer} onChange={(e) => setWriter(e.target.value)}>
                            {writerSelect.map((elem, index) => <option key={index}>{elem}</option>)}
                        </Form.Control>):(
                             <Form.Control as="select" value={writer} disabled onChange={(e) => setSelect(e.target.value)}>
                             {writerSelect.map((elem, index) => <option key={index}>{elem}</option>)}
     
                         </Form.Control>
                        )}

                </Form.Group>
                <Form.Group>
                    <Form.Label>Column</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelect(e.target.value)}>
                        {fields.map((elem, index) => <option key={index}>{elem}</option>)}

                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Yes
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}