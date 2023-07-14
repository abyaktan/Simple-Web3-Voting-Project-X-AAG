import { ethers, providers } from 'ethers';

// Connect to the Ethereum network using the MetaMask provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

export default provider;
