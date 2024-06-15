import React from 'react'
import '../styles/Cards.css'

function Cards( {title, value="", unit }) {
    return (
        <div >
            <h6>{title}</h6>
            <hr />
            <p>{value} {unit}</p>
        </div>
  )
}

export default Cards