import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { getSharedWithAddresses, revokeTokenAccess, revokeAllSharedAccess, getMaxUsersToRemove } from '../Blockchain/contract';
import { formatAddress } from './helpers';
import { toast } from 'react-toastify'

interface SharedAccessModalProps {
  tokenId: number;
  open: boolean;
  onClose: () => void;
}

const fetchSharedAddresses = async (tokenId: number) => {
  const addresses = await getSharedWithAddresses(tokenId);
  return addresses;
};

export const SharedWith: React.FC<SharedAccessModalProps> = ({ tokenId, open, onClose }) => {
  const [sharedAddresses, setSharedAddresses] = useState<string[]>([]);


  const loadSharedAddresses = useCallback(async () => {
    try {
      const addresses = await fetchSharedAddresses(tokenId);
      setSharedAddresses(addresses);
    } catch (error) {
      console.error('Error fetching shared addresses:', error);
    }
  }, [tokenId]);

  useEffect(() => {
    if (open) {
      void loadSharedAddresses();  // Using void to handle the promise
    }
  }, [open, loadSharedAddresses]);

  const handleRevokeAccess = async (address: string) => {
    const isSuccessRevoke = await revokeTokenAccess(tokenId, address);

    if (isSuccessRevoke) {
      toast.success(`Revoke access for ${formatAddress(address)} on NFT#${tokenId} has succeeded!`);
      setSharedAddresses(prev => prev.filter(item => item !== address));
    }

  };

  const handleRevokeAllAccess = async () => {
    if (sharedAddresses.length == 0) {
      toast.error(`No shared access for NFT#${tokenId} !`);
    } else {
      const maxToRemove = await getMaxUsersToRemove();
      const isSuccessRevokeAll = await revokeAllSharedAccess(tokenId, maxToRemove);
      if (isSuccessRevokeAll) {
        toast.success(`Revoke all access for token NFT#${tokenId} has succeeded!`);
        setSharedAddresses([]);
      }
    }
  };

  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shared With for NFT#{tokenId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {sharedAddresses.map(address => (
            <ListGroup.Item key={address} className="d-flex justify-content-between align-items-center">
              {formatAddress(address)}
              <Button variant="danger" onClick={() => handleRevokeAccess(address)}>Revoke</Button>
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
