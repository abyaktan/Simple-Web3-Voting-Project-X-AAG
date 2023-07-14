import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contract from './VotingContract';
import provider from "./ethereum";
import './App.css'

function App() {
    const [ballotCount, setBallotCount] = useState(0);
    const [ballotOptions, setBallotOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadBallotCount();
        loadBallotOptions();
    }, []);

    async function loadBallotCount() {
        try {
            const count = await contract.ballotCount();
            setBallotCount(count.toNumber());
        } catch (error) {
            console.error('Error loading ballot count:', error);
        }
    }

    async function loadBallotOptions() {
        try {
            const options = await contract.getBallotOptions(1); // Replace '1' with the actual ballot ID
            setBallotOptions(options);
        } catch (error) {
            console.error('Error loading ballot options:', error);
        }
    }

    async function castVote() {
        if (selectedOption === '') {
            setErrorMessage('Please select an option');
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage('');

            // Get the signer account
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const signer = provider.getSigner(accounts[0]);

            // Connect the signer to the contract
            const connectedContract = contract.connect(signer);

            // Cast the vote
            await connectedContract.castVote(1, selectedOption); // Replace '1' with the actual ballot ID

            // Refresh the ballot count and options
            await loadBallotCount();
            await loadBallotOptions();

            setSelectedOption('');
        } catch (error) {
            console.error('Error casting vote:', error);
            setErrorMessage('Failed to cast vote');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container">
            <h1 className="title">Voting App</h1>
            <div className="ballot-info">
                <p>Ballot Count: {ballotCount}</p>
                <p>Ballot Options: {ballotOptions.join(', ')}</p>
            </div>

            <div className="cast-vote">
                <h2>Cast Vote</h2>
                <div className="vote-form">
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        disabled={isLoading}
                    >
                        <option value="">Select an option</option>
                        {ballotOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button onClick={castVote} disabled={isLoading}>
                        Cast Vote
                    </button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default App;
