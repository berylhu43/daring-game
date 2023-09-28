import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import 'bulma/css/bulma.css'
import styles from '../styles/main.module.css'


import { tokenContract, tokenContractABI, tokenContractAddress } from '../utils/constants.js';


function Bank() {
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	const [userAddress, setUserAddress] = useState("");
	const [numberOfTokens, setNumberOfTokens] = useState(0);
  
	const contractAddress = "0x13f2269Bb73e4570117C29649e8db74aF0A5d3e1"; // Replace with your deployed contract address
	const contractABI = tokenContractABI; // Replace with your contract ABI
  
	useEffect(() => {
	  if (window.ethereum) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(provider);
		const signer = provider.getSigner();
		setSigner(signer);
  
		console.log("Contract ABI:", contractABI);


		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		setContract(contract);
		window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => setUserAddress(accounts[0]))
        .catch((err) => console.error(err));
    } else {
      console.error("Please install MetaMask!");
    }
  }, [contractABI]);

  useEffect(() => {
    if (contract && userAddress) {
      contract.balanceOf(userAddress).then(setNumberOfTokens);
    }
  }, [contract, userAddress]);

  const handleRedeem = async () => {
    try {
      if (contract) {
        const tx = await contract.redeem();
        await tx.wait();
        alert('Redeemed successfully!');
      }
    } catch (error) {
      console.error("Redemption failed", error);
    }
  };

  const handleBuy = async (etherAmount) => {
    try {
      if (contract) {
        const weiAmount = ethers.utils.parseEther(etherAmount.toString());
        const tx = await contract.buyToken({ value: weiAmount });
        await tx.wait();
        alert('Tokens bought successfully!');
      }
    } catch (error) {
      console.error("Buying failed", error);
    }
  };



	return (
		<div>
			<Head>
        	<title>Bank</title>
        	<meta name="get token" content="The place to buy" />
     	 </Head>
		
		<main className={styles.main}>
		<nav className = 'navbar mt-4 mb-2'>
			<div class='container'>
				<div class='navbar-end'>
					<p>You have {numberOfTokens.toString()} tokens</p>
				</div>
			</div>
		</nav>
		<div class='has-text-centered p-6'>
		<h2 class='is-size-2 px-6'>get your 10 free tokens</h2>
			<p class='pb-6'>just for the first round 😘</p>
			<button onClick={handleRedeem} class='button is-medium'>REDEEM</button>

		</div>
		<div class='has-text-centered'>
			<h2 class='is-size-3 px-6'>Need More Token?</h2>
			<p class='pt-3 pb-5'>with 1 ETH, you can get 1000000 tokens</p>
			<div className={styles.buyBox}>
			<input type="number" min="0" step="0.01" placeholder="Enter amount in Ether" id="buyAmount" />
			<button onClick={() => handleBuy(document.getElementById('buyAmount').value)} class='button is-medium'>BUY</button>
			
			</div>
		</div>
		</main>
		</div>
	)}

export default Bank;

