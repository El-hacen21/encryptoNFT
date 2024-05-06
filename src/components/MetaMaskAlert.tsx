import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const MetaMaskAlertModal: React.FC = () => {
    const [show, setShow] = useState<boolean>(true);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>MetaMask Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This application requires MetaMask to work correctly. Please install or enable MetaMask to proceed.</p>
                <a
                    href="https://metamask.io/download.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Download MetaMask
                </a>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
