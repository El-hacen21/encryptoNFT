import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

interface SharedAccessModalProps {
  tokenId: number;
  open: boolean;
  onClose: () => void;
}

interface AddressItem {
  address: string;
}

export const SharedWith: React.FC<SharedAccessModalProps> = ({ tokenId, open, onClose }) => {
  const [sharedAddresses, setSharedAddresses] = useState<AddressItem[]>([]);

  const fetchSharedAddresses = async () => {
  
    setSharedAddresses([{ address: '0x123...' }, { address: '0x456...' }]);
  };

  useEffect(() => {
    if (open) {
      fetchSharedAddresses();
    }
  }, [open]);

  const handleRevokeAccess = async (address: string) => {
  
    console.log(`Revoke access for ${address} on token ${tokenId}`);
    setSharedAddresses(prev => prev.filter(item => item.address !== address));
  };

  const handleRevokeAllAccess = async () => {
    console.log(`Revoke all access for token ${tokenId}`);
    setSharedAddresses([]);
  };

  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shared Access for Token #{tokenId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {sharedAddresses.map(item => (
            <ListGroup.Item key={item.address} className="d-flex justify-content-between align-items-center">
              {item.address}
              <Button variant="danger" onClick={() => handleRevokeAccess(item.address)}>Revoke</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleRevokeAllAccess}>Revoke All</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
