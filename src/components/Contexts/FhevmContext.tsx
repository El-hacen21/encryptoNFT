// FhevmContext.tsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { createFhevmInstance, getInstance  } from '../../fhevmjs';  // Ensure path correctness

import {  FhevmInstance } from 'fhevmjs';

export interface IFhevmContext {
  instance: FhevmInstance | null;
  createInstance: () => Promise<void>;
}

export const FhevmContext = createContext<IFhevmContext | undefined>(undefined);

export const FhevmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instance, setInstance] = useState<FhevmInstance | null>(null);

   const initInstance = useCallback(async () => {
    await createFhevmInstance(); // This sets the global instance
    setInstance(getInstance());  // Now fetch it with getInstance
  }, []);

  useEffect(() => {
    void initInstance(); // Call the initInstance function
  }, [initInstance]);

  return (
    <FhevmContext.Provider value={{ instance, createInstance: initInstance }}>
      {children}
    </FhevmContext.Provider>
  );
};


