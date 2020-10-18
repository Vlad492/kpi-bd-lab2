import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { serverURL } from '../config'

export default function AddNBooks(props) {
   
    const [number, setNumber] = useState(0)
    const submit = (e) => {
        e.preventDefault()
        let config = { number }
        console.log(config)
        fetch(`${serverURL}/api/addBooks/${number}`,{
            method : 'POST'
        }).then(res =>  props.update())


    }
    

    return (
        <Form onSubmit={submit}>
             <h3>Add a books</h3>
            <Form.Group>
                <Form.Label>Number of books</Form.Label>
                <Form.Control type="number" placeholder="Enter number of books" value={number} onChange={(e) => setNumber(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}