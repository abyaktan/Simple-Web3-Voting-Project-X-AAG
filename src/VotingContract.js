import { ethers } from 'ethers';
import provider from "./ethereum";

// The address of the deployed Voting contract
const contractAddress = '0x7B3eeF97dCee81fFBB7e60ca7a762Be552999f84';

// The ABI (Application Binary Interface) of the Voting contract
const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "ballotId",
                    "type": "uint256"
                }
            ],
            "name": "BallotClosed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "ballotId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string[]",
                    "name": "options",
                    "type": "string[]"
                }
            ],
            "name": "BallotCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_ballotId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_option",
                    "type": "string"
                }
            ],
            "name": "castVote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_ballotId",
                    "type": "uint256"
                }
            ],
            "name": "closeBallot",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "createBallot",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "ballotId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "option",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "voter",
                    "type": "address"
                }
            ],
            "name": "VoteCasted",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "ballotCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ballots",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isClosed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_ballotId",
                    "type": "uint256"
                }
            ],
            "name": "getBallotOptions",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_ballotId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_option",
                    "type": "string"
                }
            ],
            "name": "getVoteCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
];

// Create an instance of the Voting contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export default contract;
