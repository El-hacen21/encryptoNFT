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
                    <li>Connect your wallet to the application by clicking on "Connect Wallet".</li>
                </ul>

                <h3>2. Minting Your First NFT</h3>
                <ol>
                    <li>Go to the "Mint" section of the application.</li>
                    <li>Upload the file you wish to mint as an NFT.</li>
                </ol>

                <h3>3. Managing Your NFTs</h3>
                <ul>
                    <li>In the "Gallery" section, view all NFTs that you have minted.</li>
                    <li>Click on any NFT to access detailed options. From here, you can:
                        <ul>
                            <li>Transfer ownership to another user.</li>
                            <li>Share: grant a specific user access to the NFT.</li>
                            <li>Manage sharing permissions, including:
                                <ul>
                                    <li>Viewing the list of users with whom the NFT is shared.</li>
                                    <li>Revoking access for specific users.</li>
                                    <li>Removing sharing permissions for all users simultaneously.</li>
                                </ul>
                            </li>
                            <li>Delete the NFT if necessary.</li>
                        </ul>
                    </li>
                </ul>

                <h3>Need Help?</h3>
                <p>
                    If you need further details, feel free to check our <a href="https://github.com/El-hacen21/zama_bounty/">documentation</a>.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};


export default HowItWorksModal;
