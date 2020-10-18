import React from 'react'
import './Table.scss'

export default function Table(props) {


    const findMaxLength = () => {
        let length = 1
        let maxIndex = 0
        props.books.forEach((elem, index) => {
            if (Object.keys(elem).length > length) {
                length = Object.keys(elem).length
                maxIndex = index
            }
        })
        return { length, maxIndex }


    }
    let config = findMaxLength()
    return (
        <div className='booksTable'>
            <header className='bg-dark'>
                <h4>Library</h4>
            </header>
            <div className="books">
                <header style={{ paddingRight: '15px' }}>
                    {Object.keys(props.books[config.maxIndex]).map((elem, index) => <p style={{ width: 1 / config.length * 100 + '%' }} key={index}>{elem.toUpperCase()}</p>)}
                </header>
                <div className="booksBody">
                    {props.books.map((elem, index) => <div className='line' key={index}>{Object.values(elem).map((elem, index) => <p key={index} style={{ width: 1 / config.length * 100 + '%' }}>{elem}</p>)}</div>)}

                </div>
            </div>

        </div>
    )
}
