import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import { useFhevm } from '../Contexts/FhevmContext';

import './Connect.css';
import { Copy } from 'react-bootstrap-icons';

const AUTHORIZED_CHAIN_ID = ['0x1f49', '0x1f4a', '0x1f4b', '0x2328'];

export const Connect: React.FC<{
  children: (account: string, provider: any) => React.ReactNode;
}> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [validNetwork, setValidNetwork] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);


  // Use the context to access the FHEVM instance
  const { instance, createInstance } = useFhevm();

  const refreshAccounts = (accounts: string[]) => {
    setAccount(accounts[0] || '');
    setConnected(accounts.length > 0);
  };

  const hasValidNetwork = async (): Promise<boolean> => {
    const currentChainId: string = await window.ethereum.request({ method: 'eth_chainId' });
    return AUTHORIZED_CHAIN_ID.includes(currentChainId.toLowerCase());
  };

  const refreshNetwork = useCallback(async () => {
    if (await hasValidNetwork()) {
      if (!instance) {
        await createInstance();
      }
      setValidNetwork(true);
    } else {
      setValidNetwork(false);
    }
  }, [instance, createInstance]);

  const refreshProvider = (eth: Eip1193Provider) => {
    const p = new BrowserProvider(eth);
    setProvider(p);
    return p;
  };

  useEffect(() => {
    const eth = window.ethereum;
    if (!eth) {
      setError('No wallet has been found');
      //Display a modal
      const [, setShowMetaMaskModal] = useState<boolean>(false);

      useEffect(() => {
        // Check for MetaMask or any Web3 provider
        if (typeof window.ethereum === 'undefined') {
          setShowMetaMaskModal(true);
        }
      }, []);
      return;
    }

    const p = refreshProvider(eth);

    p.send('eth_accounts', [])
      .then(async (accounts: string[]) => {
        refreshAccounts(accounts);
        await refreshNetwork();
      })
      .catch(() => {
        // Handle error appropriately
      });
    eth.on('accountsChanged', refreshAccounts);
    eth.on('chainChanged', refreshNetwork);

  }, [refreshNetwork]);

  const connect = async () => {
    if (!provider) {
      return;
    }
    const accounts: string[] = await provider.send('eth_requestAccounts', []);

    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setConnected(true);
      if (!(await hasValidNetwork())) {
        await switchNetwork();
      }
    }

  };

  const switchNetwork = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AUTHORIZED_CHAIN_ID[0] }],
      });
    } catch (e) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: AUTHORIZED_CHAIN_ID[0],
            rpcUrls: ['https://devnet.zama.ai/'],
            chainName: 'Zama Devnet',
            nativeCurrency: {
              name: 'ZAMA',
              symbol: 'ZAMA',
              decimals: 18,
            },
            blockExplorerUrls: ['https://main.explorer.zama.ai'],
          },
        ],
      });
    }
    await refreshNetwork();
  }, [refreshNetwork]);

  const child = useMemo(() => {
    if (!account || !provider) return null;

    if (!validNetwork) {
      return (
        <div className="Connect__warning">
          <p>You're not on the correct network. Please switch to Zama Devnet.</p>
          <button className="Connect__button" onClick={switchNetwork}>
            Switch Network
          </button>
        </div>
      );
    }

    return children(account, provider);
  }, [account, provider, validNetwork, children, switchNetwork]);


  if (error) {
    return <p className="Connect__error">No wallet has been found.</p>;
  }


  const [copySuccess, setCopySuccess] = useState<string>('Click to Copy');

  // Function to copy the address to the clipboard
  const copyAddressToClipboard = (account: string) => {
    navigator.clipboard.writeText(account)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess('Click to Copy'), 2000); // Reset after 2 seconds
      })
      .catch(() => setCopySuccess('Copy Failed'));
  };


  const connectInfos = (
    <div className="Connect__info">
      {!connected ? (
        <button className="Connect__button" onClick={connect}>
          Connect Wallet
        </button>
      ) : (
        <span onClick={() => copyAddressToClipboard(account)} title={copySuccess}> Connected: {account.substring(0, 5)}...{account.substring(account.length - 4)} <Copy /> </span>
      )}
    </div>
  );

  return (
    <>
      {connectInfos}
      <div className="Connect__child">{child}</div>
    </>
  );
};
