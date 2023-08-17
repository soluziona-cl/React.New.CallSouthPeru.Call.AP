import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function ErrorModal({ show, onHide, error }) {

    return (

        <Modal show={show} onHide={onHide}>

            <Modal.Header closeButton>

                <Modal.Title>Error</Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <p>{error}</p>

                <div></div>

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={onHide}>

                    Cerrar

                </Button>

            </Modal.Footer>

        </Modal>

    );

}



export default ErrorModal;
