import { useState } from 'react'
import '../css/ContactUs.css'
import TopComponent from './TopComponent'
import axios from 'axios';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
	const accessToken=localStorage.getItem("access_token");
	const navigate=useNavigate();
	const [name,setName]=useState('');
	const [email,setEmail]=useState('');
	const [query,setQuery]=useState('');
	const [loading,setLoading]=useState(false);
	const [error,setError]=useState(false);

	const handleSubmit=(e)=>{
		e.preventDefault()
		setLoading(true)
		
		const userData={
			name,
			email,
			query
		}
		axios
			.post("https://studentnest-eb6a68a9526b.herokuapp.com/booking/contact/",userData,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then(()=>{
				alert("Thank You for Contacting")
				navigate('/')
				setLoading(false)
			})
			.catch((error)=>{
				console.log(error.response.data)
				setError(true)
				setLoading(false)
			})
	}

  return (
	<div>
		<TopComponent head={"CONTACT US"} body={"Lorem, ipsum dolor sit amet consectetur adipisicing elit."} />
		<div className="contactus container">
			{loading?<Spinner color={"#000000"}/>:<div className="contactus-main">
				<form onSubmit={handleSubmit}>
					<h2>CONTACT US</h2>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="" required  onChange={(e)=>setName(e.target.value)} value={name}/>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="" required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
					<label htmlFor="query">Query</label>
					<textarea name="query" id="" cols="30" required rows="10" onChange={(e)=>setQuery(e.target.value)} value={query}></textarea>
					<button type='submit'>Submit</button>
					{error && <p className='post_error'>Fill all fields or there was a server Error. Try again later.</p>}
				</form>
				<div className="contactus-main-image">
					<img src="https://images.pexels.com/photos/4098374/pexels-photo-4098374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
				</div>
			</div>
			}
		</div>
	</div>
  )
}
