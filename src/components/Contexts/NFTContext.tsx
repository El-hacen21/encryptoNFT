// src/components/Contexts/NFTContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

export interface NFTContent {
    id: number;
    file: File;
}

export interface NFTContextType {
    nfts: NFTContent[];
    addNFT: (nft: NFTContent) => void;
    updateNFTs: (nfts: NFTContent[]) => void;
    removeNFT: (id: number) => void;
    removeAllNFTs: () => void; 
}

export const NFTContext = createContext<NFTContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

export const NFTProvider: React.FC<ProviderProps> = ({ children }) => {
    const [nfts, setNfts] = useState<NFTContent[]>([]);

    // Adds a new NFT to the list
    const addNFT = (nft: NFTContent) => {
        setNfts((prevNfts) => [...prevNfts, nft]);
    };

    // Updates the entire NFT list
    const updateNFTs = (nfts: NFTContent[]) => {
        setNfts(nfts);
    };

    // Removes an NFT by ID
    const removeNFT = (id: number) => {
        setNfts((prevNfts) => prevNfts.filter((nft) => nft.id !== id));
    };

    // Removes all NFTs
    const removeAllNFTs = () => {
        setNfts([]);
    };

    return (
        <NFTContext.Provider value={{ nfts, addNFT, updateNFTs, removeNFT, removeAllNFTs }}>
            {children}
        </NFTContext.Provider>
    );
};
