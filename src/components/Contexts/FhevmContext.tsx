// FhevmContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createFhevmInstance, getInstance , getSignature } from '../../fhevmjs';  // Ensure path correctness

import {  FhevmInstance } from 'fhevmjs';

interface IFhevmContext {
  instance: FhevmInstance | null;
  createInstance: () => Promise<void>;
}

const FhevmContext = createContext<IFhevmContext | undefined>(undefined);

export const FhevmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instance, setInstance] = useState<FhevmInstance | null>(null);

  const initInstance = useCallback(async () => {
    await createFhevmInstance();  // This sets the global instance
    setInstance(getInstance());   // Now fetch it with getInstance

  }, []);


  useEffect(() => {
  
  }, [initInstance]);

  return (
    <FhevmContext.Provider value={{ instance, createInstance: initInstance }}>
      {children}
    </FhevmContext.Provider>
  );
};

export const useFhevm = (): IFhevmContext => {
  const context = useContext(FhevmContext);
  if (!context) {
    throw new Error('useFhevm must be used within an FhevmProvider');
  }
  return context;
};

