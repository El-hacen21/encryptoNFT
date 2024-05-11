import './Gallery.css'
import { getFileIcon, formatFileSize, downloadFile, ActionButtonHelper } from './Helpers';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Pagination, } from 'react-bootstrap';
import * as contract from '../Blockchain/contract';
import { decryptFile, getEncryptedFileCidHash, DecryptedFileMetaData } from '../Utils/utils'
import { deserializeEncryptedKeyParts } from '../Utils/other'
import { importCryptoKey } from '../Utils/keyencrypt'
import { useFhevm } from '../Contexts/FhevmContext';
import { useNFTs, NFTContent } from '../Contexts/NFTContext';
import { toast } from 'react-toastify'
import { ArrowClockwise, Download } from 'react-bootstrap-icons';
import { getSignature } from '../../fhevmjs';

export const Gallery = () => {
    const [page, setPage] = useState(0);
    const { instance, createInstance } = useFhevm();
    const [myTotalNFTs, setMyTotalNFTs] = useState(0);
    const [totalNFTsSharedWithMe, setTotalNFTsSharedWithMe] = useState(0);

    const ITEMS_PERPAGE = 5; // Cannot be zero

    const [showGallery, setShowGallery] = useState(false);
    const { nfts, removeNFT, updateNFTs } = useNFTs();

    const [nftsSharedWithMe, setNFTsSharedWithMe] = useState<NFTContent[]>([]);

    const handleShare = async (tokenId: number, to: string) => {
        const response = await contract.shareToken(to, tokenId);

        if (response) {
            toast.success(`The NFT#${tokenId} has been share with : ${to.substring(0, 8)}`);

        } else {
            toast.error(`Could not send the NFT#${tokenId}!`);
        }
    };

    const handleSharedWith = async (tokenId: number) => {
        // setIsShareWithModalOpen(true);

        // const response = await contract.shareToken(to, tokenId);

        // if (response) {
        //     toast.success(`The NFT#${tokenId} has been share with : ${to.substring(0, 8)}`);

        // } else {
    };

    const handleTransfer = async (tokenId: number, to: string) => {
        const response = await contract.transferToken(tokenId, to);

        if (response) {
            toast.success(`The NFT#${tokenId} has been transfered and will be no more accessible!`);

            // Update the gallery display
            removeNFT(tokenId);
        } else {
            toast.error(`Could not transfer the NFT#${tokenId}!`);
        }
    };


    const handleDelete = async (tokenId: number) => {
        const response = await contract.burnToken(tokenId);

        if (response) {
            toast.success(`The NFT#${tokenId} has been deleted and will be no more accessible!`);

            //Update the gallery display
            removeNFT(tokenId);
        } else {
            toast.error(`Could not delete the NFT#${tokenId}!`);
        }

    };

    useEffect(() => {
        if (!instance) {
            createInstance().catch(console.error);
        }
    }, [instance, createInstance, page]);


    const displayGallery = async (): Promise<void> => {
        setShowGallery(true);
        if (nfts) {
            displayMyNFTs();
        } else {
            toast.info('You have no NFTs to display!');
            return;
        }
        displaySharedWithMeNFTs();
    }

    const displayMyNFTs = async (): Promise<void> => {

        if (!instance) {
            console.error('Instance is not ready');
            return;
        }

        try {
            // Fetch total number of NFTs to manage pagination or UI elements
            const total = await contract.getSupply();
            setMyTotalNFTs(total);

            if (total <= 0) {
                toast.info('You have no NFTs to display!');
                return;
            }

            // Fetch My tokens
            const myNFTs = await contract.getTokensInRange(0, 5); // Adjust the pagination as needed

            const account = await contract.getAccount();
            if (!account) throw new Error("Account retrieval failed.");

            const reencryption = await getSignature(contract.contractAddress, account);

            const updatedNFTs = await Promise.all(myNFTs.map(async (token) => {
                const decryptedFile = await accessFile(token.cidHash,
                    reencryption.publicKey, reencryption.signature, token.tokenId); // Decrypt each file
                return {
                    id: Number(token.tokenId),
                    file: decryptedFile.file
                };
            }));

            // Update context with new tokens
            updateNFTs(updatedNFTs);
            toast.success('Gallery updated successfully!');
            // console.log("updatedTokens :: ", updatedNFTs);

        } catch (error) {
            console.error("Error during NFT fetch or decryption:", error);
        }
    };


    const displaySharedWithMeNFTs = async (): Promise<void> => {

        try {
            const totalShareWith = await contract.getSharedWithSupply();
            setTotalNFTsSharedWithMe(totalShareWith);

            if (totalShareWith <= 0) {
                toast.info('You have no NFTs shared with you to display!');
                return;
            }

            const nftsSharedWithMe = await contract.getSharedTokensInRange(0, totalShareWith);

            const account = await contract.getAccount();
            if (!account) throw new Error("Account retrieval failed.");

            const reencryption = await getSignature(contract.contractAddress, account);

            const updatedTokens = await Promise.all(nftsSharedWithMe.map(async (token) => {
                const decryptedFile = await accessFile(token.cidHash, reencryption.publicKey, reencryption.signature, token.tokenId); // Decrypt each file
                return {
                    id: Number(token.tokenId),
                    file: decryptedFile.file
                };
            }));

            setNFTsSharedWithMe(updatedTokens);
            toast.success('Shared NFTs updated successfully!');

        } catch (error) {
            console.error("Error during NFT fetch or decryption:", error);
        }
    };



    const accessFile = async (cidHash: string, publicKey: any, signature: any, tokenId: number): Promise<DecryptedFileMetaData> => {
        if (!instance) throw new Error("Intance retrieval failed.");

        const encryptedFile = await getEncryptedFileCidHash(cidHash);
        if (!encryptedFile) throw new Error("Dencrypting data failed.");

        const encryptedKeys = deserializeEncryptedKeyParts(encryptedFile.encryptedFileKey);


        const reEncryptedFileKey = await contract.reencrypt(tokenId, encryptedKeys, publicKey, signature);
        let decryptedKey: bigint[] = [];

        reEncryptedFileKey.forEach((element) => {
            if (element) {
                const result = instance.decrypt(contract.contractAddress, element);
                decryptedKey.push(result);
            }
        });

        const fileKey = await importCryptoKey(decryptedKey);
        const decryptedFile = await decryptFile(encryptedFile, fileKey);
        return decryptedFile;
    };


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
                                        onClick={() => displayMyNFTs()}
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
                                        {/* Action button */}
                                        <ActionButtonHelper
                                            onDownload={() => downloadFile(token.file)}
                                            onShare={(to) => handleShare(token.id, to)}
                                            onSharedWith={() => handleSharedWith(token.id)}
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
                                        onClick={() => displaySharedWithMeNFTs()}
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


