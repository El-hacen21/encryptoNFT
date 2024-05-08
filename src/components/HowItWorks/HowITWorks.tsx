import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface HowItWorksModalProps {
    show: boolean;
    onHide: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>How the Application Works</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Introduction</h2>
                <p>
                    Welcome to our application! Here’s a brief guide to help you understand how to use it effectively.
                </p>

                <h3>1. Setting Up</h3>
                <ul>
                    <li>Ensure you have an Ethereum wallet installed, such as MetaMask.</li>
                    <li>Connect your wallet to the application by clicking on "Connect Wallet".</li>
                </ul>

                <h3>2. Minting Your First NFT</h3>
                <ol>
                    <li>Go to the "Mint" section of the application.</li>
                    <li>Upload the file you wish to mint as an NFT.</li>
                </ol>

                <h3>3. Managing Your NFTs</h3>
                <ul>
                    <li>In the "Gallery" section, you can see all the NFTs you've minted.</li>
                    <li>Click on any NFT to view more details or initiate actions like transferring, deleting, or sharing access.</li>
                </ul>

                <h3>4. Transferring or Sending NFTs</h3>
                <ul>
                    <li>Select an NFT and click the "Transfer" button.</li>
                    <li>Enter the recipient’s address and confirm the transaction.</li>
                </ul>

                <h3>Need Help?</h3>
                <p>
                    If you need further assistance, feel free to check our <a href="https://github.com/El-hacen21/zama_bounty/">Documentation</a> or reach out to our support team.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};


export default HowItWorksModal;
