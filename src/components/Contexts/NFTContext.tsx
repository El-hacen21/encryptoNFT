import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface NFTDetails {
    id: number;
    file: File;
}

interface NFTContextType {
    nfts: NFTDetails[];
    addNFT: (nft: NFTDetails) => void;
    updateNFTs: (nfts: NFTDetails[]) => void;
    removeNFT: (id: number) => void; 
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

export const NFTProvider: React.FC<ProviderProps> = ({ children }) => {
    const [nfts, setNfts] = useState<NFTDetails[]>([]);

    // Adds a new NFT to the list
    const addNFT = (nft: NFTDetails) => {
        setNfts((prevNfts) => [...prevNfts, nft]);
    };

    // Updates the entire NFT list
    const updateNFTs = (nfts: NFTDetails[]) => {
        setNfts(nfts);
    };

    // Removes an NFT by ID
    const removeNFT = (id: number) => {
        setNfts((prevNfts) => prevNfts.filter((nft) => nft.id !== id));
    };

    return (
        <NFTContext.Provider value={{ nfts, addNFT, updateNFTs, removeNFT }}>
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
