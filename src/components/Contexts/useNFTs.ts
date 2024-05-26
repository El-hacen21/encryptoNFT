import { useContext } from 'react';
import { NFTContext, NFTContextType } from './NFTContext';

export const useNFTs = (): NFTContextType => {
    const context = useContext(NFTContext);
    if (context === undefined) {
        throw new Error('useNFTs must be used within a NFTProvider');
    }
    return context;
};
