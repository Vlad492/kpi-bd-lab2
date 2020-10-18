import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { serverURL } from '../config'

export default function RemoveBook(props) {

    const [titles, setTitles] = useState(['hello'])
    const [readers, setReaders] = useState(['hello'])
    const [selectTitle, setSelectTitle] = useState('')
    const [selectReader, setSelectReader] = useState('')
   
    useEffect(() => {
        fetch(serverURL + '/api/getFreeTitles').then((res) => res.json()).then((res) =>{
            setTitles(res)
            setSelectTitle(res[0])
        })
        fetch(serverURL + '/api/getReaders').then((res) => res.json()).then((res) =>{
            setReaders(res)
            setSelectReader(res[0])
        })
    }, [])

    const submit = (e) =>{
        e.preventDefault()
        fetch(serverURL+'/api/takeBook',{
            method : 'PUT',
            headers : {
                'Content-type' : 'application/json'
            } ,
            body: JSON.stringify({holder: selectReader, title : selectTitle})
        }).then(res => props.update())
        
    }


    return (
        <Form onSubmit={submit}>
            <h3>Take a book</h3>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control as="select" onChange={(e => setSelectTitle(e.target.value))}>
                    {titles.map((elem, index) => <option key = {index}>{elem}</option>)}
                 

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reader</Form.Label>
                <Form.Control as="select" onChange={(e => setSelectReader(e.target.value))}>

                {readers.map((elem, index) => <option key = {index}>{elem}</option>)}

                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}