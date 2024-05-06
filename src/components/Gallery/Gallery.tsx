import './Gallery.css'
import { getFileIcon, formatFileSize, downloadFile, ActionButtonHelper } from './Helpers';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Pagination, } from 'react-bootstrap';
import { burnToken, getMyTokens, shareToken, transferToken, tokenOf, getAccount, contractAddress, getMySupply } from '../Blockchain/contract';
import { EncryptedFile, decryptFile, getEncryptedFileFromCidHash, DecryptedFileMetaData } from '../Utils/utils'
import { deserializeEncryptedKeys } from '../Utils/other'
import { importCryptoKey } from '../Utils/keyencrypt'
import { useFhevm } from '../Contexts/FhevmContext';
import { useNFTs } from '../Contexts/NFTContext';
import { toast } from 'react-toastify'
import { ArrowClockwise } from 'react-bootstrap-icons';


export const Gallery = () => {
    const [page, setPage] = useState(0);
    const { instance, createInstance } = useFhevm();
    const [totalItems, setTotalItems] = useState(0);

    const itemsPerPage = 10; // Cannot be zero
    const [showTable, setShowTable] = useState(false);
    const { nfts, removeNFT, updateNFTs } = useNFTs();



    const handleShare = async (tokenId: number, address: string) => {
        const response = await shareToken([address], tokenId);

        if (response) {
            toast.success("The NFT #" + tokenId + " access has been shared to with : " + address);

        } else {
            toast.error("Could not share the NFT!");
        }
    };

    const handleTransfer = async (tokenId: number, address: string) => {
        const response = await transferToken(address, tokenId);

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
            const total = await getMySupply();
            setTotalItems(total);

            if (total <= 0) {
                toast.info('You have no NFTs to display!');
                return;
            }

            // Fetch and process NFTs
            const tokensFromContract = await getMyTokens(0, 5); // Adjust the pagination as needed
        
            const account = await getAccount();
            if (!account) throw new Error("Account retrieval failed.");

            const reencryption = instance.generatePublicKey({ verifyingContract: contractAddress });
            const params = [account, JSON.stringify(reencryption.eip712)];
            const signature = await window.ethereum.request({
                method: "eth_signTypedData_v4",
                params,
            });
            // instance.setSignature(contractAddress, signature);

            const updatedTokens = await Promise.all(tokensFromContract.map(async (token) => {
                const decryptedFile = await handleDecryption(token.uri, reencryption.publicKey, signature); // Decrypt each file
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


    const handleDecryption = async (cidHash: string, publicKey: any, signature: any): Promise<DecryptedFileMetaData> => {
        if (!instance) throw new Error("Intance retrieval failed.");

        const encryptedFile: EncryptedFile = await getEncryptedFileFromCidHash(cidHash);
        if (!encryptedFile) throw new Error("Dencrypting data failed.");


        console.log("encryptedFile.encryptionKey :: ", encryptedFile.encryptionKey);
        const encryptedKeys = deserializeEncryptedKeys(encryptedFile.encryptionKey);

        const data = await tokenOf(publicKey, signature, encryptedKeys);
        let decryptedKey: bigint[] = [];

        data.forEach((element, index) => {
            if (element) {
                // if (!instance) throw new Error("Intance retrieval failed.");
                const result = instance.decrypt(contractAddress, element);
                decryptedKey.push(result);
                console.log(`Decrypted ${index}: ${result}`);
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
                                        onShare={(address) => handleShare(token.id, address)}
                                        onTransfer={(address) => handleTransfer(token.id, address)}
                                        onDelete={() => handleDelete(token.id)}
                                        nftNumber={token.id}
                                    />

                                </td>
                            </tr>

                        ))}
                        <tr>
                            <td colSpan={4} className="shared-separator">
                                <strong>Shared With Me</strong>
                            </td>
                        </tr>
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


