import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState , useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from "react-dom/client"
import {ethers} from 'ethers'
import 'bulma/css/bulma.css'
import styles from '../styles/main.module.css'
import tokenContract from '../utils/constants';



function DisneyLand() {
	const [address, setAddress] = useState('connect wallet');
	const [signer, setSigner] = useState();
	const [tkContract, setTkContract] = useState();


	useEffect(() => {
		getCurrentWalletConnected();
		addWalletListener();
	}, [address]);
	
	const connectWalletHandler = async () => {
		if (typeof window.ethereum != 'undefined') {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const accounts = await provider.send("eth_requestAccounts", []);
				setSigner(provider.getSigner());
				setAddress(accounts[0]);
				setTkContract(tokenContract(provider));
		} catch(err) {
			
		}
		} else {
			console.log ('Please install metamask')
		}
	}

	const getCurrentWalletConnected = async () => {
		if (typeof window.ethereum != 'undefined') {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const accounts = await provider.send("eth_accounts", []);
				if (accounts.length > 0){
					setSigner(provider.getSigner());
					setAddress(accounts[0]);
					setTkContract(tokenContract(provider));
				}				
		} catch(err) {
			
		}
		} else {
			console.log ('Please install metamask')
		}
	}

	const addWalletListener = async() => {
		if (typeof window.ethereum != 'undefined') {
			window.ethereum.on('accountChanged', (accounts) => {
				setAddress(accounts[0]);
			})
	}}

	


	return (
		
		<div>
		<Head>
        	<title>DisneyLand</title>
        	<meta name="description" content="The place to play" />
     	 </Head>

		<main className={styles.main}>
		<nav className = 'navbar mt-1 mb-1'>
			<div class='container'>
				<div class='navbar-end'>
					<button onClick={connectWalletHandler} className='button is-danger'>
						{address}
						
					</button>
				</div>
			</div>
		</nav>
		<div>
			<h1 class='has-text-centered'>
				DRAW HARD WIN HARD
			</h1>
		</div>
		<div class="columns is-vcentered is-one-third-widescreen is-three-quarters-mobile">
  			<div class="column has-text-centered">BANK
			  <div>
				<Link href='/bank'>
					<Image src="/building-columns-solid.svg" alt="house" width={225} height={50} />
				</Link>
			  </div>
			</div>
  			<div class="column has-text-centered">PLAYGROUND
			  <div>
				<div>
				   <Link href='/playground'>
					<Image src="/house-solid.svg" alt="house" width={250} height={16} />
					</Link>
					</div>	
				</div>
			</div>
  			<div class="column has-text-centered">SHOP
				<div>
					<Link href='/shop'>
					<Image src="/cart-shopping-solid.svg" alt="shop" width={245} height={16} />
					</Link>
				</div>
			</div>	
			</div>
			<div class="columns is-vcentered is-one-third-widescreen is-three-quarters-mobile">
				<div class="column has-text-centered">
					<h3>
						START HERE 👆🏻
					</h3>
				</div>
				<div class="column has-text-centered">
					
				</div>
				<div class="column has-text-centered">
					
				</div>
			</div>
		</main>
		<footer className={styles.footer}>
			<h3 class='has-text-centered'>
			© Copyright 2022 CoolStudio ❤️
			</h3>
		</footer>


	</div>
	
	
	
	)}


export default DisneyLand;

