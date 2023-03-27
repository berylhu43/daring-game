import Head from 'next/head'
import Image from 'next/image'
import React, { useState} from 'react'
import {ethers} from 'ethers'
import 'bulma/css/bulma.css'
import styles from '../styles/main.module.css'

import DisneyLand from './wallet'

import tokenContract from '../utils/constants';
import { getContractAddress } from 'ethers/lib/utils'

function Bank() {
	const [tkcontract, setTkContract] = useState();
	const [provider, setProvider] = useState();
	const [signer, setSigner] = useState();


	// const connectToMetamask = async() => {
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum)
	// 	const accounts = await provider.send("eth_requestAccounts", []);
	// 	this.setState({ selectedAddress: accounts[0] })
	//   }
	
	const getTokenContract = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		setSigner(provider.getSigner());
		setTkContract(tokenContract(provider));
	}




	const numberOfToken = () => {

	}

	const redeemHandler = async() => {
		try{
			
				getTokenContract();
			
			const tokenContractWithSigner = tokenContract(provider).connect(signer);
			const resp = await tokenContractWithSigner.redeem();
			console.error(resp);
		} catch(err) {
			console.error(err.message);
		}
	};


	const buyHandler = async() => {
		try{
			getTokenContract();
			const tokenContractWithSigner = tkcontract.connect(signer);
			const buySomeToken = await tokenContractWithSigner.sendEth({ value: ethers.utils.parseEther("0.01") });
		} catch(err) {
			console.error(err.message);
		}

	};

	const Input = ({number}) => (
		<input number={number}
		class='input is-info has-background-light' placeholder='Value will be transfer to '/>
	);
	

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
					<p>You have {numberOfToken} tokens</p>
				</div>
			</div>
		</nav>
		<div class='has-text-centered p-6'>
		<h2 class='is-size-2 px-6'>get your 10 free tokens</h2>
			<p class='pb-6'>just for the first round 😘</p>
			<button onClick={redeemHandler} class='button is-medium'>REDEEM</button>

		</div>
		<div class='has-text-centered'>
			<h2 class='is-size-3 px-6'>Need More Token?</h2>
			<p class='pt-3 pb-5'>with 1 ETH, you can get 1000000 tokens</p>
			<div className={styles.buyBox}>
			<Input number = 'number'/>
			<button onClick ={buyHandler} class='button is-medium'>BUY</button>
			</div>
		</div>
		</main>
		</div>
	)}

export default Bank;

