import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { serverURL } from '../config'

export default function RemoveBook(props) {
   
    const [id, setID] = useState(0)
    const submit = (e) => {
        e.preventDefault()
        fetch(`${serverURL}/api/deleteBook/${id}`,{
            method : 'DELETE'
        }).then(res=>props.update())

    }

    return (
        <Form onSubmit={submit}>
             <h3>Remove a book</h3>
            <Form.Group>
                <Form.Label>BookID</Form.Label>
                <Form.Control type="number" placeholder="Enter BookID" value={id} onChange={(e) => setID(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}