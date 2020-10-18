import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {serverURL} from '../config'

export default function AddBook(props) {
    const [select, setSelect] = useState('')
    const [authors, setAuthors] = useState([])
    useEffect(()=>{
        fetch(serverURL + '/api/getWriters').then((res)=>res.json()).then((res) =>{
            setAuthors(res)
            setSelect(res[0])
        })
    },[])
    const [title, setTitle] = useState('')
    const submit = (e) => {
        fetch(serverURL+'/api/addBook', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({writer: select, title})
        }).then(res =>  props.update())
        e.preventDefault()
        let config = { title, select }
        console.log(config)

    }

    return (
        <Form onSubmit={submit}>
            <Form.Group>
                <h3>Add a book</h3>
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder="Enter book title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength = '19' />
            </Form.Group>
            <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control as="select" onChange={(e) => setSelect(e.target.value)}>
                    {authors.map((elem, index) => <option key = {index}>{elem}</option>)}

                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}