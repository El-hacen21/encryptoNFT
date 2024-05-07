// Import ethers from ethers.js
import { ethers } from 'ethers';
import contractABI from './ABI.json';

export const contractAddress = '0xfD053150831BaEEfc80A9A707272EF483EC01696';

async function initializeProviderAndSigner() {
	try {
		// Check if the Web3 provider is injected (like MetaMask)
		if (typeof window.ethereum !== 'undefined') {
			// Setup the provider using ethers.js provider an Web3
			const provider = new ethers.BrowserProvider(window.ethereum);

			// Request account access if needed
			await provider.send("eth_requestAccounts", []);

			// Retrieve the signer (current account)
			const signer = await provider.getSigner();
			console.log('Signer Address:', await signer.getAddress());

			// Now the `provider` and `signer` are available for use
			return { provider, signer };
		} else {
			// Handle the case where a Web3 provider is not found
			console.warn('MetaMask or Web3 provider not found. Please install or enable it.');
		}
	} catch (error) {
		console.error('Error initializing Web3 provider:', error);
	}

	// Return null to signify the failure to initialize the provider/signer
	return { provider: null, signer: null };
}


const { provider, signer } = await initializeProviderAndSigner();



// Create a contract instance with a signer, which enables sending transactions
const contract = new ethers.Contract(contractAddress, contractABI, signer);

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


// Define a type for the token details to improve readability and maintainability
export interface TokenDetails {
	tokenId: number;  // or number, depending on how token IDs are handled in your contract
	cidHash: string;
};


async function getEvent(
	tx: any,
	eventName: string,
) {
	const receipt = await tx.wait();
	if (receipt?.logs) {
		for (const log of receipt.logs) {
			const event = contract.interface.parseLog(log);
			if (event?.name === eventName) {
				return event;
			}
		}
	}

	return null;
}

export async function mintToken(cidHash: string): Promise<TokenDetails> {
	try {
		const txResponse = await contract.mintToken(cidHash);

		const tokenMintedEvent = await getEvent(txResponse, 'TokenMinted');
		if (!tokenMintedEvent) throw new Error('TokenMinted event not found.');

		/**
		 * The `tokenId` and `cidHashOutput=cidHash` variables are used to optimize how the gallery updates after the minting process.
		 * Once the token is minted, it will be displayed directly in the gallery without the need to invoke a function on the contract to update the display.
		 */

		const tokenId: number = Number(tokenMintedEvent.args[0]); // Convert from BigNumber if needed
		const cidHashOutput: string = tokenMintedEvent.args[1];

		return { tokenId: tokenId, cidHash: cidHashOutput }; // Return as a structured object
	} catch (error) {
		console.error('Error minting token:', error);
		throw error;
	}
}


/**
 * Fetches a specific number of tokens starting from the given index.
 *
 * @param start The starting index to fetch tokens.
 * @param count The number of tokens to fetch starting from the `start` index.
 * @returns An array of `TokenDetails` containing token IDs and their URIs.
 */
export async function getTokensInRange(start: number, count: number): Promise<TokenDetails[]> {
	try {
		// Use the start index and count to determine the range to fetch
		const end = start + count;

		// Call the smart contract to fetch tokens in this range
		const result = await contract.getTokensInRange(start, end);

		// Expect result to be an array of arrays: [token IDs, URIs]
		const tokenIds: number[] = result[0];
		const cidHashs: string[] = result[1];

		// Map token IDs to their corresponding URIs to form an array of TokenDetails
		const tokens: TokenDetails[] = tokenIds.map((tokenId, index) => ({
			tokenId,
			cidHash: cidHashs[index]
		}));

		return tokens;
	} catch (error) {
		console.error('Error fetching tokens:', error);
		return [];
	}
}




export async function transferToken(to: string, tokenId: number): Promise<Boolean> {
	try {
		// Call the contract's transferToken function
		const tx = await contract.transferToken(to, tokenId);
		console.log('Transaction hash:', tx.hash);

		// Wait for transaction confirmation
		await tx.wait();

		return true;
	} catch (error) {
		console.error('Error transferring token:', error);
		return false;
	}
}


// /**
//  * Shares a token with multiple recipients.
//  *
//  * @param to An array of recipient addresses to share the token with.
//  * @param tokenId The ID of the token to be shared.
//  * @returns `true` if the transaction succeeds, `false` otherwise.
//  */
// export async function shareToken(to: string[], tokenId: number): Promise<boolean> {
// 	try {
// 		// Ensure the array is not empty
// 		if (to.length === 0) {
// 			throw new Error('Recipient list cannot be empty.');
// 		}

// 		// Call the contract's `shareToken` function with the array of addresses
// 		const tx = await contract.shareToken(tokenId, to);
// 		console.log('Transaction hash:', tx.hash);

// 		// Wait for the transaction to confirm
// 		await tx.wait();

// 		return true;
// 	} catch (error) {
// 		console.error('Error sharing token:', error);
// 		return false;
// 	}
// }



export async function burnToken(tokenId: number): Promise<Boolean> {
	try {
		// Call the contract's burnToken function
		const tx = await contract.burnToken(tokenId);
		console.log('Transaction hash:', tx.hash);

		// Wait for transaction confirmation
		await tx.wait();

		return true;
	} catch (error) {
		console.error('Error burning token:', error);
		return false;
	}
}



export async function getSupply(): Promise<number> {
	try {
		const totalNFTs = await contract.getSupply();

		// Output the total number of NFTs
		console.log(`Total NFTs: ${totalNFTs.toString()}`);
		return Number(totalNFTs);
	} catch (error) {
		console.error("Failed to fetch the total number of NFTs:", error);
		throw error;
	}
};


export async function tokenOf(
	publicKey: Uint8Array | undefined,
	signature: string | undefined,
	nftEncryptionKey: Uint8Array[]
): Promise<string[]> {

	try {
		const data = await contract.tokenOf(publicKey, signature, nftEncryptionKey);

		console.log('Reencrypted key component:', data);
		if (!data) {
			console.error('No data for the reencrypted key component.');
			return [];
		}

		return data;
	} catch (error) {
		console.error('Error fetching data from the contract:', error);
		return [];
	}
}
