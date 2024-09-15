import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import Navbar from '../../components/js/Navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://shop-production-09d5.up.railway.app/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();

    if (!json.success) {
      if (json.message && json.message.includes("Email already exists")) {
        alert("Email already exists. Try with a new one or login.");
      } else {
        alert("Enter valid credentials");
      }
    } else {
      navigate("/login");
      alert("You're Registered");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className='form'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
            <input type="text" className="form-control" id="geolocation" name='geolocation' value={credentials.geolocation} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
        </form>
      </div>
    </>
  );
};
