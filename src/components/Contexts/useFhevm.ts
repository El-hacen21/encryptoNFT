import { useContext } from 'react';
import { IFhevmContext, FhevmContext } from './FhevmContext';

export const useFhevm = (): IFhevmContext => {
    const context = useContext(FhevmContext);
    if (!context) {
      throw new Error('useFhevm must be used within an FhevmProvider');
    }
    return context;
  };
  