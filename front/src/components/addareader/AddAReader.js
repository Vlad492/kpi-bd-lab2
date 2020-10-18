import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { serverURL } from '../config'

export default function AddBook(props) {
    
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState(0)
    const [select, setSelect] = useState('Male')
    const submit = (e) => {
        let config = {name,surname,age,sex : select}
        fetch(serverURL+'/api/addReader',{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(config)
        }).then((res)=>props.updateReaders())
        console.log(config)

    }

    return (
        <Form onSubmit={submit}>
            <h3>Add a reader</h3>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} maxLength = '19' />
            </Form.Group>
            <Form.Group>
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Enter surname" value={surname} onChange={(e) => setSurname(e.target.value)} maxLength = '19'/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Sex</Form.Label>
                <Form.Control as="select" onChange={(e) => setSelect(e.target.value)}>
                   
                    <option>Male</option>
                    <option>Female</option>

                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}