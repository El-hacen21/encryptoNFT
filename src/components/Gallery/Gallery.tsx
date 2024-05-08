import './Gallery.css'
import { getFileIcon, formatFileSize, downloadFile, ActionButtonHelper } from './Helpers';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Pagination, } from 'react-bootstrap';
import { burnToken, getTokensInRange, transferToken, tokenOf, getAccount, contractAddress, getSupply, shareToken } from '../Blockchain/contract';
import { decryptFile, getEncryptedFileCidHash, DecryptedFileMetaData} from '../Utils/utils'
import { deserializeEncryptedKeyParts } from '../Utils/other'
import { importCryptoKey } from '../Utils/keyencrypt'
import { useFhevm } from '../Contexts/FhevmContext';
import { useNFTs } from '../Contexts/NFTContext';
import { toast } from 'react-toastify'
import { ArrowClockwise } from 'react-bootstrap-icons';
import { getSignature } from '../../fhevmjs';

export const Gallery = () => {
    const [page, setPage] = useState(0);
    const { instance, createInstance } = useFhevm();
    const [totalItems, setTotalItems] = useState(0);

    const itemsPerPage = 10; // Cannot be zero
    const [showTable, setShowTable] = useState(false);
    const { nfts, removeNFT, updateNFTs } = useNFTs();


    const handleShare = async (tokenId: number, to: string) => {
        const response = await shareToken(to, tokenId);

        if (response) {
            toast.success("The NFT has been sent and will be no more accessible!");

        } else {
            toast.error("Could not send the NFT!");
        }
    };

    const handleTransfer = async (tokenId: number, to: string) => {
        const response = await transferToken(tokenId, to);

        if (response) {
            toast.success("The NFT has been transfered and will be no more accessible!");

            //Update the gallery display
            removeNFT(tokenId);
        } else {
            toast.error("Could not transfer the NFT!");
        }
    };


    const handleDelete = async (tokenId: number) => {
        const response = await burnToken(tokenId);

        if (response) {
            toast.success("The NFT has been deleted and will be no more accessible!");

            //Update the gallery display
            removeNFT(tokenId);
        } else {
            toast.error("Could not delete the NFT!");
        }

    };

    useEffect(() => {
        if (!instance) {
            createInstance().catch(console.error);
        }
    }, [instance, createInstance, page]);



    const displayGallery = async (): Promise<void> => {
        if (nfts) {
            setShowTable(true);
        } else {
            toast.info('You have no NFTs to display!');
            return;
        }

        if (!instance) {
            console.error('Instance is not ready');
            return;
        }

        try {
            // Fetch total number of NFTs to manage pagination or UI elements
            const total = await getSupply();
            setTotalItems(total);

            if (total <= 0) {
                toast.info('You have no NFTs to display!');
                return;
            }

            // Fetch and process NFTs
            const tokensFromContract = await getTokensInRange(0, 5); // Adjust the pagination as needed

            const account = await getAccount();
            if (!account) throw new Error("Account retrieval failed.");

            const reencryption = await getSignature(contractAddress, account);

            const updatedTokens = await Promise.all(tokensFromContract.map(async (token) => {
                const decryptedFile = await reEncryptedFileKey(token.cidHash, reencryption.publicKey, reencryption.signature, token.tokenId); // Decrypt each file
                return {
                    id: Number(token.tokenId),
                    file: decryptedFile.file
                };
            }));

            // Update context with new tokens
            updateNFTs(updatedTokens);
            toast.success('Gallery updated successfully!');
            console.log("updatedTokens :: ", updatedTokens);
        } catch (error) {
            console.error("Error during NFT fetch or decryption:", error);
        }
    };


    const reEncryptedFileKey = async (cidHash: string, publicKey: any, signature: any, tokenId: number): Promise<DecryptedFileMetaData> => {
        if (!instance) throw new Error("Intance retrieval failed.");

        const encryptedFile = await getEncryptedFileCidHash(cidHash);
        if (!encryptedFile) throw new Error("Dencrypting data failed.");

        const encryptedKeys = deserializeEncryptedKeyParts(encryptedFile.encryptedFileKey);

        const data = await tokenOf(publicKey, signature, encryptedKeys, tokenId);
        let decryptedKey: bigint[] = [];

        data.forEach((element) => {
            if (element) {
                const result = instance.decrypt(contractAddress, element);
                decryptedKey.push(result);
            }
        });

        const fileKey = await importCryptoKey(decryptedKey);
        const decryptedFile = await decryptFile(encryptedFile, fileKey);
        console.log("Decrypted file :: : ", decryptedFile);
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
            {!showTable && (
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button className="modern-button" onClick={displayGallery}
                        >
                            Show Private Content
                        </Button>
                    </Col>
                </Row>
            )}


            {showTable && (

                <Table striped hover>
                    <thead>
                        <tr>
                            <th>NFT #</th>
                            <th >Name</th>
                            <th>Size</th>
                            <th className="actions">
                                <button
                                    onClick={() => displayGallery()}
                                    title="Refresh Gallery"
                                    className="icon-button" // Custom CSS class
                                >
                                    <ArrowClockwise />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {nfts.map(token => (
                            <tr key={token.id}>
                                <td>{token.id}</td>

                                <td>{getFileIcon(token.file.type)} {"  "}  {token.file.name}</td>
                                <td className="size">{formatFileSize(token.file.size)}</td>
                                <td>
                                    <ActionButtonHelper
                                        onDownload={() => downloadFile(token.file)}
                                        onShare={(to) => handleShare(token.id, to)}
                                        onTransfer={(to) => handleTransfer(token.id, to)}
                                        onDelete={() => handleDelete(token.id)}
                                        nftNumber={token.id}
                                    />

                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            )}

            <Pagination className="justify-content-center mt-4">
                {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map(number => (
                    <Pagination.Item key={number} active={number + 1 === page} onClick={() => setPage(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>

    );
};


