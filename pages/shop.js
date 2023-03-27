import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import styles from '../styles/main.module.css'



function Shop() {

	


	return (
		<div>
			<Head>
        	<title>Play</title>
        	<meta name="description" content="The place to win" />
     	 </Head>
		
		<main className={styles.shopMain}>
			<div class='p-6 is-vcentered has-text-centered'>
				<button class='button is-danger is-large'>
					Exchange
				</button>
				<h3 className='has-text-centered'>sell your token and get some ETH</h3>
			</div>
			<div className='is-vcentered has-text-centered'>
				<button class='button is-large'>Buy NFT</button>
				<h3>buy NFT for a haunted house experience in the metaverse</h3>
			</div>
		</main>
		</div>
	)
}

export default Shop;





					