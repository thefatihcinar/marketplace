import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, theMessage}) => {
    return (
        <Alert variant={variant}>
            {theMessage}
        </Alert>
    )
}

Message.defaultProps = {
    variant: "info",
    theMessage: " "
}

export default Message
