import { FileEarmarkPdf, FileEarmarkImage, FileEarmarkPlay, FileEarmarkWord, FileEarmark, ThreeDotsVertical, } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import { Dropdown, OverlayTrigger, Tooltip, Modal, Button, Form } from 'react-bootstrap';



export function getFileIcon(mimeType: string) {
    switch (mimeType) {
        case 'application/pdf':
            return <FileEarmarkPdf />;
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
            return <FileEarmarkImage />;
        case 'video/mp4':
            return <FileEarmarkPlay />;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return <FileEarmarkWord />;
        default:
            return <FileEarmark />;
    }
}


export function downloadFile(file: File): void {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
}



export function formatFileSize(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



interface ActionButtonProps {
    onDownload: () => void;
    onSend: (recipientAddress: string) => void;
    onTransfer: (recipientAddress: string) => void;
    onDelete: () => void;
    nftNumber?: number;
}

export const ActionButtonHelper: React.FC<ActionButtonProps> = ({ onDownload, onSend, onTransfer, onDelete, nftNumber = null }) => {
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState<string>('');
    const [recipientAddress, setRecipientAddress] = useState<string>('');

    const handleConfirm = (type: string) => {
        setActionType(type);
        setShowModal(true);
    };

    // Perform the desired action after confirmation
    const performAction = () => {
        setShowModal(false);
        if (actionType === 'Share') {
            onSend(recipientAddress);
        } else if (actionType === 'Transfer') {
            onTransfer(recipientAddress);
        } else if (actionType === 'Delete') {
            onDelete();
        }
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
                            Send
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

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {actionType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {nftNumber !== null ? (
                        <p>Are you sure you want to {actionType.toLowerCase()} NFT #{nftNumber}?</p>
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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant='primary' onClick={performAction}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
