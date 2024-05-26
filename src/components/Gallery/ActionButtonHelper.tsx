import React, { useState } from 'react';
import { Dropdown, OverlayTrigger, Tooltip, Modal, Button, Form } from 'react-bootstrap';
import { SharedWith } from './SharedWith';
import { ThreeDotsVertical} from 'react-bootstrap-icons';


interface ActionButtonProps {
    onDownload: () => void;
    onShare: (recipientAddress: string) => void;
    onTransfer: (recipientAddress: string) => void;
    onDelete: () => void;
    tokenId?: number;
}

export const ActionButtonHelper: React.FC<ActionButtonProps> = ({ onDownload, onShare, onTransfer, onDelete, tokenId = 0 }) => {
    const [showCofirmModal, setShowCofirmModal] = useState(false);
    const [showSharedWithModal, setShowSharedWithModal] = useState(false);
    const [actionType, setActionType] = useState<string>('');
    const [recipientAddress, setRecipientAddress] = useState<string>('');


    const handleConfirm = (type: string) => {
        setActionType(type);
        setShowCofirmModal(true);
    };

    // Perform the desired action after confirmation
    const performAction = () => {
        setShowCofirmModal(false);
        if (actionType === 'Share') {
            onShare(recipientAddress);
        }

        else if (actionType === 'Transfer') {
            onTransfer(recipientAddress);
        } else if (actionType === 'Delete') {
            onDelete();
        }
    };

    const handleSharedWith = () => {
        setShowSharedWithModal(true);
        // onSharedWith(tokenId);

    };


    // Custom tooltip rendering
    const renderTooltip = (props: any, message: string) => (
        <Tooltip {...props}>{message}</Tooltip>
    );

    // Custom dropdown toggle component
    const CustomToggle = React.forwardRef<HTMLDivElement, any>(({ onClick }, ref) => (
        <div
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="custom-toggle"
            title="Actions"
        >
            <ThreeDotsVertical />
        </div>
    ));

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} />

                <Dropdown.Menu>
                    <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, 'Download')}>
                        <Dropdown.Item onClick={onDownload}>
                            Download
                        </Dropdown.Item>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, 'Share')}>
                        <Dropdown.Item onClick={() => handleConfirm('Share')}>
                            Share
                        </Dropdown.Item>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, 'Shared With')}>
                        <Dropdown.Item onClick={() => handleSharedWith()}>
                            Shared With
                        </Dropdown.Item>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, 'Transfer')}>
                        <Dropdown.Item onClick={() => handleConfirm('Transfer')}>
                            Transfer
                        </Dropdown.Item>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, 'Delete')}>
                        <Dropdown.Item onClick={() => handleConfirm('Delete')}>
                            Delete
                        </Dropdown.Item>
                    </OverlayTrigger>
                </Dropdown.Menu>
            </Dropdown>

            <SharedWith tokenId={tokenId} open={showSharedWithModal} onClose={() => setShowSharedWithModal(false)} />

            <Modal show={showCofirmModal} onHide={() => setShowCofirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {actionType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {tokenId !== null ? (
                        <p>Are you sure you want to {actionType.toLowerCase()} NFT #{tokenId}?</p>
                    ) : (
                        <p>Are you sure you want to {actionType.toLowerCase()} this item?</p>
                    )}

                    {(actionType === 'Share' || actionType === 'Transfer') && (
                        <Form.Group>
                            <Form.Label>Recipient Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="0x123..."
                                value={recipientAddress}
                                onChange={(e) => setRecipientAddress(e.target.value)}
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCofirmModal(false)}>Cancel</Button>
                    <Button variant='primary' onClick={performAction}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
