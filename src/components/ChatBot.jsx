import { motion } from 'framer-motion'
import '../css/ChatBot.css'
import bot from '../assets/bot.png'
import send from '../assets/send.svg'
import topArrow from '../assets/topArrow.svg'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
export default function ChatBot() {

	const accessToken=localStorage.getItem("access_token");
	const [open,setOpen]=useState(false);
	const [input,setInput]=useState('');
	const [data,setData]=useState("Ask Me Something");
	const [loading,setLoading]=useState(false);


const handleChatBot=()=>{
	setLoading(true)
	axios
		.get(`https://studentnest-eb6a68a9526b.herokuapp.com/chatbot/chatbot/${input}/`,{
			headers: {
				'Authorization':`Bearer ${accessToken}`
			}
		})
		.then((response)=>{
			// console.log(response);
			setInput('');
			setData(response.data.answer)
			setLoading(false)
		})
		.catch((error)=>{
			setData(error.response.data.answer)
			setInput('');
			console.log(error)
			setLoading(false)
		})
}
  return (
	<div>
		<motion.div className="chatbot" animate={{y:open?0:440}}>
			<div className="chatbot-top" onClick={()=>setOpen(!open)}>
				<div className="chatbot-top-main">
					<div className="chatbot-top-image">
						<img src={bot} alt="" />
					</div>
					<h1>ChatBot</h1>
				</div>
				<motion.img src={topArrow} alt="" animate={{rotate:!open?0:180}}/>
			</div>
			<div className="chatbot-mid">
			{loading?<BeatLoader color={"#000000"}
        loading={true}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"/>:<div className="chatbot-mid-main">
					<div className="chatbot-mid-main-top">
						<img src={bot} alt="" />
						<p>ChatBot :</p>
					</div>
					<p>{data}</p>
				</div>}
			</div>
			<div className="chatbot-bottom">
				<input type="text" placeholder='Ask Chatbot' value={input} onChange={(e)=>setInput(e.target.value)}/>
				<img src={send} alt="" onClick={handleChatBot}/>
			</div>
		</motion.div>
	</div>
  )
}
