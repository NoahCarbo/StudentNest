import { useEffect, useState } from 'react'
import '../css/Booking.css'
import TopComponent from './TopComponent'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function Booking() {
	const location=useLocation();
	const navigate=useNavigate()
	const [name,setName]=useState('');
	const [phone_no,setPhone]=useState('');
	// const [id_card,setIDCard]=useState('');
	const [email,setEmail]=useState('')
	// const [agreement,setAgreement]=useState(null);
	const [loading,setLoading]=useState(true);
	const [accessToken,setAccessToken]=useState('');
	const [user,setUser]=useState();
	const [listing,setListing]=useState();
	const [error,setError]=useState('');
	

	useEffect(()=>{
		window.scrollTo(0, 0);
		setListing(location.state.id)
		setAccessToken(localStorage.getItem("access_token"))
		axios
			.get("https://studentnest-eb6a68a9526b.herokuapp.com/account/profile/",{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then((response)=>{
				setName(response.data.name);
				setPhone(response.data.phone_no);
				setUser(response.data.id)
				setLoading(false);
			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})
	},[accessToken])

	const handleSubmit=(e)=>{
		e.preventDefault()
		setLoading(true)
		const userData={
			user,
			name,
			phone_no,
			listing,
			email
		}

		axios
			.post("https://studentnest-eb6a68a9526b.herokuapp.com/booking/booking/",userData,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then(()=>{
				alert("Tour Schedule Confirmed !")
				navigate('/properties')
				setLoading(false)
			})
			.catch((err)=>{
				console.log(err.response.data)
				setError(err.response.data.message)
				console.log(error)
				setLoading(false)
			})
	}
	
  return (
	<div>
		<TopComponent head={"SCHEDULING"}/>
		<div className="booking conatiner">
			{loading?<Spinner color={"#000000"}/>:<div className="booking-main">
						<div className="booking-main-info">
							<div className="booking-main-info-left">
								<img src={location.state.photo_main} alt="" />
							</div>
							<div className="booking-main-info-right">
								<h2>{location.state.title}</h2>
								<p>${location.state.price}</p>
							</div>
						</div>
						<form onSubmit={handleSubmit}>
							<label htmlFor="name">Name</label>
							<input type="text" required name='name' onChange={(e)=>setName(e.target.value)} value={name}/>
							<label htmlFor="phone">Phone Number</label>
							<input type="text" required name='phone' onChange={(e)=>setPhone(e.target.value.slice(0,10))} value={phone_no}/>
							<label htmlFor="idcard">Email</label>
							<input type="email" required name='idcard' onChange={(e)=>setEmail(e.target.value)} value={email}/>
							{/* <label htmlFor="agreement">Agreement</label>
							<input type="file" name='agreement' onChange={(e)=>setAgreement(e.target.files[0])}/> */}
							<button type='submit'>CONFIRM TOUR</button>
						</form>
						{error && <p className='post_error'>{error}</p>}
					</div>
					}
		</div>
	</div>
  )
}
