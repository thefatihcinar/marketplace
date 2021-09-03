import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{
                width: '75px',
                height: '75px',
                margin: 'auto',
                display: 'block'
            }}
        >
           <span class="sr-only">Loading...</span> 
        </Spinner>
    )
}

export default Loader
