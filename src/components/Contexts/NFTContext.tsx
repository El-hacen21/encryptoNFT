import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface NFTContent {
    id: number;
    file: File;
}

interface NFTContextType {
    nfts: NFTContent[];
    addNFT: (nft: NFTContent) => void;
    updateNFTs: (nfts: NFTContent[]) => void;
    removeNFT: (id: number) => void;
    removeAllNFTs: () => void; 
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

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

// Custom hook to use the NFT context
export const useNFTs = (): NFTContextType => {
    const context = useContext(NFTContext);
    if (context === undefined) {
        throw new Error('useNFTs must be used within a NFTProvider');
    }
    return context;
};
