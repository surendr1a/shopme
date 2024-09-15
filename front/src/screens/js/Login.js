import React,{useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Navbar from '../../components/js/Navbar';

export default function Login() {

  const [credentials, setcredentials] = useState({  email: "", password: ""  });
let navigate = useNavigate();
  const handlesubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("https://shop-production-09d5.up.railway.app/api/enteruser", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
    //   console.log(json);
      if (json.success) {
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
         
      }
      else{
        alert("Enter valid credentials");
      }
      
  };

  const onChange = (event) => {
      setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div> 
      <div>
        <Navbar/>
      </div>
      <div>
      <div className="container">
                <form onSubmit={handlesubmit} className='form'>
                   
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                   
                    <button type="submit" className="m-3 btn btn-primary">Login</button>
                    <Link to='/signup' className='m-3 btn btn-danger'>New User</Link>
                </form>
            </div>
       </div>
       </div>
  )
}
