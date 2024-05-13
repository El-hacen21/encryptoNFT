// Import ethers from ethers.js
import { ethers, Signer, Contract, BrowserProvider } from 'ethers';
import contractABI from './ABI.json';

export const contractAddress = '0xb74D8eD6F68A5c0a6c25C31A09484a7475901086';

// Declare global variables for provider, signer, and contract
let provider: BrowserProvider | null;
let signer: Signer | null;
let contract: Contract | null;

// Function to initialize provider and signer asynchronously
async function initializeProviderAndSigner() {
	try {
		if (typeof window.ethereum !== 'undefined') {
			provider = new ethers.BrowserProvider(window.ethereum);
			await window.ethereum.request({ method: "eth_requestAccounts" });
			signer = await provider.getSigner();
			contract = new ethers.Contract(contractAddress, contractABI, signer);
		} else {
			console.warn('MetaMask or Web3 provider not found. Please install or enable it.');
			provider = null;
			signer = null;
			contract = null;
		}
	} catch (error) {
		console.error('Error initializing Web3 provider:', error);
		provider = null;
		signer = null;
		contract = null;
	}
}

// Call the function to initialize provider and signer
initializeProviderAndSigner();




// Create a contract instance with a signer, which enables sending transactions
// const contract = new ethers.Contract(contractAddress, contractABI, signer);

export async function getAccount(): Promise<string | null> {
	if (provider && signer)
		try {
			await provider.send("eth_requestAccounts", []);
			const account = await signer.getAddress();
			if (!account) {
				console.error("No accessible accounts. Make sure MetaMask is connected.");
				return null;
			}
			return account;
		} catch (error) {
			console.error("Could not get access to accounts:", error);
			return null;
		}
	return null;
}


//  token details to improve readability and maintainability
export interface TokenDetails {
	tokenId: number;
	cidHash: string;
};


async function getEvent(
	tx: any,
	eventName: string,
) {
	const receipt = await tx.wait();
	if (receipt?.logs) {
		for (const log of receipt.logs) {
			const event = contract?.interface.parseLog(log);
			if (event?.name === eventName) {
				return event;
			}
		}
	}

	return null;
}

export async function mintToken(cidHash: string, encryptedKeyHash: string): Promise<TokenDetails> {
	try {
		const txResponse = await contract?.mintToken(cidHash, encryptedKeyHash);

		const tokenMintedEvent = await getEvent(txResponse, 'TokenMinted');
		if (!tokenMintedEvent) throw new Error('TokenMinted event not found.');


		const tokenId: number = Number(tokenMintedEvent.args[0]);

		return { tokenId: tokenId, cidHash: cidHash };
	} catch (error) {
		console.error('Error in contract.mintToken:', error);
		throw error;
	}
}


/**
 * Fetches a specific number of tokens starting from the given index.
 *
 * @param start The starting index to fetch tokens.
 * @param count The number of tokens to fetch starting from the `start` index.
 * @returns An array of `TokenDetails` containing token IDs and their cidHashs.
 */
export async function getTokensInRange(start: number, count: number): Promise<TokenDetails[]> {
	try {
		// Use the start index and count to determine the range to fetch
		const end = start + count;

		// Call the smart contract to fetch tokens in this range
		const result = await contract?.getTokensInRange(start, end);

		// Expect result to be an array of arrays: [token IDs, cidHashs]
		const tokenIds: number[] = result[0];
		const cidHashs: string[] = result[1];

		// Map token IDs to their corresponding cidHashs to form an array of TokenDetails
		const tokens: TokenDetails[] = tokenIds.map((tokenId, index) => ({
			tokenId,
			cidHash: cidHashs[index]
		}));

		return tokens;
	} catch (error) {
		console.error('Error contract.getTokensInRange:', error);
		return [];
	}
}

export async function getSharedTokensInRange(start: number, count: number): Promise<TokenDetails[]> {
	try {
		// Calculate the end index based on the start index and the number of tokens to fetch
		const end = start + count;

		// Call the smart contract to fetch shared tokens within the specified range
		const result = await contract?.getSharedTokensInRange(start, end);

		// Expect result to be an array of arrays: [token IDs, cidHashs]
		const tokenIds: number[] = result[0];
		const cidHashs: string[] = result[1];

		// Map token IDs to their corresponding CID hashes to create an array of TokenDetails
		const tokens: TokenDetails[] = tokenIds.map((tokenId, index) => ({
			tokenId,
			cidHash: cidHashs[index]
		}));

		return tokens;
	} catch (error) {
		console.error('Error in fetching shared tokens:', error);
		return [];
	}
}

export async function getSharedWithAddresses(tokenId: number): Promise<string[]> {

	try {
		const addresses: string[] = await contract?.getSharedWithAddresses(tokenId);
		return addresses;
	} catch (error) {
		console.error('Error fetching shared addresses:', error);
		return [];
	}
}


export async function transferToken(tokenId: number, to: string,): Promise<Boolean> {
	try {
		// Call the contract's transferToken function
		const tx = await contract?.transferToken(tokenId, to);

		// Wait for transaction confirmation
		await tx.wait();

		return true;
	} catch (error) {
		console.error('Error transferring token:', error);
		return false;
	}
}


export async function shareToken(to: string, tokenId: number): Promise<boolean> {
	try {
		// Ensure the array is not empty
		if (to.length === 0) {
			throw new Error('Recipient list cannot be empty.');
		}

		// Call the contract's `shareToken` function with the array of addresses
		const tx = await contract?.shareToken(tokenId, to);

		// Wait for the transaction to confirm
		await tx.wait();

		return true;
	} catch (error) {
		console.error('Error contract.shareToken:', error);
		return false;
	}
}



export async function burnToken(tokenId: number): Promise<Boolean> {
	try {
		// Call the contract's burnToken function
		const tx = await contract?.burnToken(tokenId);
		console.log('Transaction hash:', tx.hash);

		// Wait for transaction confirmation
		await tx.wait();

		return true;
	} catch (error) {
		console.error('Error contract.burnToken :', error);
		return false;
	}
}


export async function getSupply(): Promise<number> {
	try {
		const totalNFTs = await contract?.getSupply();

		return Number(totalNFTs);
	} catch (error) {
		console.error("Failed to fetch the total number of NFTs:", error);
		throw error;
	}
};


export async function getSharedWithSupply(): Promise<number> {
	try {
		const totalSharedWithNFTs = await contract?.getSharedWithSupply();

		return Number(totalSharedWithNFTs);
	} catch (error) {
		console.error("Failed to fetch the total number of NFTs shared: ", error);
		throw error;
	}
};



export async function reencrypt(tokenId: number, encryptedFileKey: Uint8Array[],
	publicKey: Uint8Array | undefined,
	signature: string | undefined,

): Promise<string[]> {

	try {
		const data = await contract?.reencrypt(tokenId, encryptedFileKey, publicKey, signature);

		if (!data) {
			console.error('No return for contract.reencrypt');
			return [];
		}

		return data;
	} catch (error) {
		console.error('Error fetching contract.reencrypt :', error);
		return [];
	}
}

export async function revokeTokenAccess(tokenId: number, userAddress: string): Promise<Boolean> {

	try {
		const tx = await contract?.revokeTokenAccess(tokenId, userAddress);
		await tx.wait();
		return true;
	} catch (error) {
		console.error('Error revoking access:', error);
		return false;
	}
}

export async function revokeAllSharedAccess(tokenId: number): Promise<Boolean> {

	try {
		const tx = await contract?.revokeAllSharedAccess(tokenId);
		await tx.wait();
		return true;
	} catch (error) {
		console.error('Error revoking all shared access:', error);
		return false;
	}
}




