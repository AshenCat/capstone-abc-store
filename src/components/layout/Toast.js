import React from 'react'
import {Toast} from 'react-bootstrap'
import ToastHeader from 'react-bootstrap/ToastHeader'

const Toaster = (props) => {
    return (
        <Toast className="fixed-toaster" onClose={() => props.setShowToast(!props.showToast)} show={props.showToast} delay={3000} autohide>
            <ToastHeader closeButton={false} bsPrefix>
            </ToastHeader>
            <Toast.Body>
                <p>{props.message}</p>
            </Toast.Body>
        </Toast>
    )
}

export default Toaster;