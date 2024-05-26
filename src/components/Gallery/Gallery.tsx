import './Gallery.css';
import { getFileIcon, formatFileSize, downloadFile, formatAddress } from './helpers';
import { ActionButtonHelper } from './ActionButtonHelper';
import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Table, Button, Pagination } from 'react-bootstrap';
import * as contract from '../Blockchain/contract';
import { decryptFile, getCiphFileCidHash, DecryptedFileMetaData } from '../Utils/utils';
import { importCryptoKey } from '../Utils/keyencrypt';
import { useFhevm } from '../Contexts/useFhevm';
import { NFTContent } from '../Contexts/NFTContext';
import { useNFTs } from '../Contexts/useNFTs';
import { toast } from 'react-toastify';
import { ArrowClockwise, Download } from 'react-bootstrap-icons';
import { getSignature } from '../../fhevmjs';

export const Gallery = () => {
    const [page, setPage] = useState(0);
    const { instance, createInstance } = useFhevm();
    const [myTotalNFTs, setMyTotalNFTs] = useState(0);
    const [totalNFTsSharedWithMe, setTotalNFTsSharedWithMe] = useState(0);
    const [showGallery, setShowGallery] = useState(false);
    const { nfts, removeNFT, updateNFTs, removeAllNFTs } = useNFTs();
    const [nftsSharedWithMe, setNFTsSharedWithMe] = useState<NFTContent[]>([]);
    const [account, setAccount] = useState<string>('');

    const ITEMS_PERPAGE = 5;

    const handleShare = useCallback(async (tokenId: number, to: string) => {
        const response = await contract.shareToken(to, tokenId);
        if (response) {
            toast.success(`The NFT#${tokenId} has been shared with: ${formatAddress(to)}`);
        } else {
            toast.error(`Could not share NFT #${tokenId}! Please check if it is already shared with ${formatAddress(to)}.`);
        }
    }, []);

    const handleTransfer = useCallback(async (tokenId: number, to: string) => {
        const response = await contract.transferToken(to, tokenId);
        if (response) {
            toast.success(`The NFT#${tokenId} has been transferred and will be no more accessible!`);
            removeNFT(tokenId);
        } else {
            toast.error(`Could not transfer the NFT#${tokenId}!`);
        }
    }, [removeNFT]);

    const handleDelete = useCallback(async (tokenId: number) => {
        const maxToRemove = await contract.getMaxUsersToRemove();
        const response = await contract.burnToken(tokenId, maxToRemove);
        if (response) {
            toast.success(`The NFT#${tokenId} has been deleted and will be no more accessible!`);
            removeNFT(tokenId);
        } else {
            toast.error(`Could not delete the NFT#${tokenId}!`);
        }
    }, [removeNFT]);

    useEffect(() => {
        if (!instance) {
            createInstance().catch(console.error);
        }
    }, [instance, createInstance]);


    const fetchAccount = useCallback(async () => {
        try {
            const fetchedAccount = await contract.getAccount();
            if (fetchedAccount) {
                setAccount(fetchedAccount);
                return fetchedAccount;
            }
        } catch (error) {
            console.error(error);
            toast.info('Please connect to continue.');
        }
        return '';
    }, []);

    useEffect(() => {
        const initializeAccount = async () => {
            const fetchedAccount = await fetchAccount();
            if (fetchedAccount) {
                setAccount(fetchedAccount);
            }
        };

        void initializeAccount();
    }, [fetchAccount]);



    const accessFile = useCallback(async (cidHash: string, publicKey: Uint8Array, signature: string, tokenId: number): Promise<DecryptedFileMetaData> => {
        try {
            if (!instance) throw new Error('Instance retrieval failed.');

            const ciphFile = await getCiphFileCidHash(cidHash);
            if (!ciphFile) throw new Error('Decrypting data failed.');

            const reEncryptedFileKey = await contract.reencrypt(tokenId, publicKey, signature);
            const decryptedKey: bigint[] = [];

            for (const element of reEncryptedFileKey) {
                if (element) {
                    const result = instance.decrypt(contract.contractAddress, element);
                    decryptedKey.push(result);
                }
            }

            const fileKey = await importCryptoKey(decryptedKey);
            const decryptedFile = await decryptFile(ciphFile, fileKey);
            return decryptedFile;
        } catch (error) {
            toast.error(`Error while trying to access the NFT#${tokenId}. Could not fetch ${cidHash}`);
            throw error;
        }
    }, [instance]);

    const displayMyNFTs = useCallback(async (currentAccount: string) => {
        if (!currentAccount) return;

        try {
            if (!instance) throw new Error('Instance retrieval failed.');

            const total = await contract.getSupply();
            setMyTotalNFTs(total);

            if (total <= 0) {
                toast.info('You have no NFTs to display!');
                removeAllNFTs();
                return;
            }

            const myNFTs = await contract.getTokensInRange(0, ITEMS_PERPAGE);
            const reencryption = await getSignature(contract.contractAddress, currentAccount);

            const updatedNFTs = await Promise.all(
                myNFTs.map(async (token) => {
                    const decryptedFile = await accessFile(token.cidHash, reencryption.publicKey, reencryption.signature, token.tokenId);
                    return {
                        id: Number(token.tokenId),
                        file: decryptedFile.file,
                    };
                })
            );

            updateNFTs(updatedNFTs);
            toast.success('Gallery updated successfully!');
        } catch (error) {
            console.error('Error displaying NFTs:', error);
            toast.error('Error displaying NFTs.');
        }
    }, [instance, updateNFTs, removeAllNFTs, accessFile]);

    const displaySharedWithMeNFTs = useCallback(async (currentAccount: string) => {
        if (!currentAccount) return;

        try {
            const totalShareWith = await contract.getSharedWithSupply();
            setTotalNFTsSharedWithMe(totalShareWith);

            if (totalShareWith <= 0) {
                toast.info('You have no NFTs shared with you to display!');
                setNFTsSharedWithMe([]);
                return;
            }

            const nftsSharedWithMe = await contract.getSharedTokensInRange(0, totalShareWith);
            const reencryption = await getSignature(contract.contractAddress, currentAccount);

            const updatedTokens = await Promise.all(
                nftsSharedWithMe.map(async (token) => {
                    const decryptedFile = await accessFile(token.cidHash, reencryption.publicKey, reencryption.signature, token.tokenId);
                    return {
                        id: Number(token.tokenId),
                        file: decryptedFile.file,
                    };
                })
            );

            setNFTsSharedWithMe(updatedTokens);
            toast.success('Shared NFTs updated successfully!');
        } catch (error) {
            console.error('Error displaying shared NFTs:', error);
            toast.error('Error displaying shared NFTs.');
        }
    }, [accessFile]);

    const displayGallery = useCallback(async () => {
        let currentAccount = account;
        if (!currentAccount) {
            currentAccount = await fetchAccount();
            if (currentAccount) {
                setAccount(currentAccount);
            }
        }

        if (!currentAccount) {
            toast.info('Please connect to continue.');
            return; // Exit if no account is fetched
        }

        setShowGallery(true);

        try {
            await Promise.all([displayMyNFTs(currentAccount), displaySharedWithMeNFTs(currentAccount)]);
        } catch (error) {
            console.error('Error displaying gallery:', error);
            toast.error('Error displaying gallery.');
        }
    }, [account, fetchAccount, displayMyNFTs, displaySharedWithMeNFTs]);



    return (
        <Container className="mt-4 gallery-container" id="gallery">
            <Row className="mb-4">
                <Col>
                    <hr className="header-divider" />
                    <h1 className="gallery-header">My NFTs Gallery</h1>
                    <hr className="header-divider" />
                </Col>


            </Row>
            {!showGallery && (
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button className="modern-button" onClick={() => displayGallery()}
                        >
                            Show Private Content
                        </Button>
                    </Col>
                </Row>
            )}


            {showGallery && (
                <div>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th className="nft-num">NFT #</th>
                                <th className="name">Name</th>
                                <th className="size">Size</th>
                                <th className="actions">
                                    <button
                                        onClick={() => displayMyNFTs(account)}
                                        title="Refresh Gallery"
                                        className="icon-button" // Custom CSS class
                                    >
                                        <ArrowClockwise />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Your NFTs data */}
                            {nfts.map(token => (
                                <tr key={token.id}>
                                    <td>{token.id}</td>
                                    <td>{getFileIcon(token.file.type)} {token.file.name}</td>
                                    <td >{formatFileSize(token.file.size)}</td>
                                    <td >
                                        <ActionButtonHelper
                                            onDownload={() => downloadFile(token.file)}
                                            onShare={(to) => handleShare(token.id, to)}
                                            onTransfer={(to) => handleTransfer(token.id, to)}
                                            onDelete={() => handleDelete(token.id)}
                                            tokenId={token.id}
                                        />

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </Table>

                    <Pagination className="justify-content-center mt-4">
                        {[...Array(Math.ceil(myTotalNFTs / ITEMS_PERPAGE)).keys()].map(number => (
                            <Pagination.Item key={number} active={number + 1 === page} onClick={() => setPage(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>

                    <h3 className='shared-separator'>NFTs Shared With Me</h3>
                    <Table striped hover>
                        {/* Reusing the <thead> section */}
                        <thead>
                            <tr>
                                <th className="nft-num"></th>
                                <th className="name"></th>
                                <th className="size"></th>
                                <th className="actions">
                                    <button
                                        onClick={() => displaySharedWithMeNFTs(account)}
                                        title="Refresh Gallery"
                                        className="icon-button" // Custom CSS class
                                    >
                                        <ArrowClockwise />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* NFTs shared with you data */}
                            {nftsSharedWithMe.map(token => (
                                <tr key={token.id}>
                                    <td>{token.id}</td>
                                    <td>{getFileIcon(token.file.type)} {token.file.name}</td>
                                    <td >{formatFileSize(token.file.size)}</td>
                                    <td >
                                        <Download onClick={() => downloadFile(token.file)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination className="justify-content-center mt-4">
                        {[...Array(Math.ceil(totalNFTsSharedWithMe / ITEMS_PERPAGE)).keys()].map(number => (
                            <Pagination.Item key={number} active={number + 1 === page} onClick={() => setPage(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>

            )
            }

        </Container >

    );
};


