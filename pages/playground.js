import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { ReactDOM } from 'react'
import {ethers} from 'ethers'
import 'bulma/css/bulma.css'
import styles from '../styles/main.module.css'
import { render } from 'react-dom'

function Playground() {
	

	const Input = ({number}) => (
		<input number={number}
		class='input is-info has-background-light column is-one-quarter-widescreen mr-6' placeholder='How much you dare to put'/>
	)

	const playerWindowHandler = () => {
		document.querySelector('#player').classList.add('is-active')
	}

	const playerCancleHandler = () => {
		document.querySelector('#player').classList.remove('is-active')
	}

	const rulesHandler = () => {
		document.querySelector('#rules').classList.add('is-active')
	}

	const rulesCancleHandler = () => {
		document.querySelector('#rules').classList.remove('is-active')
	}

	const resultHandler = () => {
		document.querySelector('#result').classList.add('is-active')
	}

	const resultCancleHandler = () => {
		document.querySelector('#result').classList.remove('is-active')
	}

	const voteHandler = () => {
		document.querySelector('#vote').classList.add('is-active')
	}

	const voteCancleHandler = () => {
		document.querySelector('#vote').classList.remove('is-active')
	}

	const tipHandler = () => {
		document.querySelector('#tips').classList.add('is-active')
	}

	const tipCancleHandler = () => {
		document.querySelector('#tips').classList.remove('is-active')
	}
	
	
	const enterHandler = () => {
			
		}



	return (
		<div>
			<Head>
        	<title>Play</title>
        	<meta nameName="description" content="The place to win" />
     	 </Head>
		
		<main className={styles.playMainPage}>
		<div className='columns is-vcentered '>
		<div className='column is-one-third-widescreen is-three-quarters-mobile'>
		<aside class="menu p-4">
  			<p class="menu-label my-5">
    			Instruction
  			</p>
  			<ul className="menu-list">
    			<li className='my-4'><a onClick={playerWindowHandler}>Players</a></li>
    			<li className='my-4'><a onClick={rulesHandler}>How To Play</a></li>
				<li className='my-4'><a onClick={resultHandler}>Result</a></li>
				<li className='my-4'><a onClick={voteHandler}>Vote</a></li>
				<li className='my-4 is-size-4'><a onClick={tipHandler}>🚩</a></li>
  			</ul>
		</aside>
		</div>
							

		<div id='player' className="modal">
			<div class="modal-background"></div>
 				<div class="modal-card">
    				<header class="modal-card-head">
      					<p class="modal-card-title">Here's the instructions</p>
     		 		</header>
   				 	<section class="modal-card-body">
						You won't be playing this game alone. <br/> Other players would join you, or maybe they are already in. <br/> You don't know who are they and how many players are there.
   					</section>
   					 <footer class="modal-card-foot">
     					<button onClick={playerCancleHandler} class="button is-success">Got it</button>
      				 </footer>
  				</div>
 		</div>

		 <div id='rules' className="modal">
			<div class="modal-background"></div>
 				<div class="modal-card">
    				<header class="modal-card-head">
      					<p class="modal-card-title">Here's the instructions</p>
     		 		</header>
   				 	<section class="modal-card-body">
						You can choose any whole number amount of token to put into this game. We shall refer the number of token you used as X in the later instruction. The number of total players will be shown as N.
						<Image src="/rules-demo.svg" alt="rules" width={900} height={16}></Image>
   					</section>
   					 <footer class="modal-card-foot">
     					<button onClick={rulesCancleHandler} class="button is-success">Got it</button>
      				 </footer>
  				</div>
 		</div>

		 <div id='result' className="modal">
			<div class="modal-background"></div>
 				<div class="modal-card">
    				<header class="modal-card-head">
      					<p class="modal-card-title">Here's the instructions</p>
     		 		</header>
   				 	<section class="modal-card-body">
						If X(max) &gt; N * X(min) <br/> all tokens go to whoever put X(max), in this case, Player (N-2) <br/> If X(max) &lt; N * X(min) <br/> all tokens will be evenly distributed to all players
						<Image src="/rules-demo.svg" alt="rules" width={900} height={16}></Image>
   					</section>
   					 <footer class="modal-card-foot">
     					<button onClick={resultCancleHandler} class="button is-success">Got it</button>
      				 </footer>
  				</div>
 		</div>

		 <div id='vote' className="modal">
			<div class="modal-background"></div>
 				<div class="modal-card">
    				<header class="modal-card-head">
      					<p class="modal-card-title">Here's the instructions</p>
     		 		</header>
   				 	<section class="modal-card-body">
						After you entered, you need to vote. If two third of players voted YES, <br/>the contract will find the winner, or winners, and send the money rigth away <br/> Otherwise, we shall just wait till YES outnumbers NO
   					</section>
   					 <footer class="modal-card-foot">
     					<button onClick={voteCancleHandler} class="button is-success">Got it</button>
      				 </footer>
  				</div>
 		</div>

		 <div id='tips' className="modal">
			<div class="modal-background"></div>
 				<div class="modal-card">
    				<header class="modal-card-head">
      					<p class="modal-card-title">Small Tips</p>
     		 		</header>
   				 	<section class="modal-card-body">
						You don't know how many tokens will the new comers put in
   					</section>
   					 <footer class="modal-card-foot">
     					<button onClick={tipCancleHandler} class="button is-success">Got it</button>
      				 </footer>
  				</div>
 		</div>

		 <div className='column is-two-third-widescreen is-three-quarters-mobile'>
			<div className='columns is-vcentered mb-6'>
				<Input type='number'/>
				<button onClick={enterHandler} className='button is-danger is-large has-background-light has-text-danger-dark is-inverted column is-one-fifth-widescreen mb-2'>ENTER</button>
			</div>
			<div>
		</div>
		
		<div className=''>
				<p className='is-size-2 pt-6 pb-3'>Do you want the winner be picked up by now?</p>
				<div>
						<button className='button is-medium mx-4'>YES</button>
						<button className='button is-medium mx-4'>No</button>
				</div>
		</div>

		
			</div>
			
			</div>
			<div>
			<h1>Real Time Result Page</h1>
		</div>
		</main>
		</div>
	)
}

export default Playground;





					