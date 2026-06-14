import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { setPageTitle } from '../util/methods';


export default function Login({user}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("Login", true);
  }, []);

  useEffect(() => {
    if(user !== null){
      navigate('/');
    }
  }, [user, navigate])
  
  const { login, isLoading, error } = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };


  return (
    <div className='login_container'>
      <div>
        <h1 className='lg_hd'>Welcome to GTCMS</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className='login_form'>
          <h2>Login</h2>
          <label className='input_label' htmlFor="email">Email</label>
          <input className='input'
            style={{marginBottom: '15px'}}
            type="email"
            id="email"
            placeholder="any@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className='input_label' htmlFor="password">Password</label>
          <input className='input'
            style={{marginBottom: '15px'}}
            type="password"
            id="password"
            placeholder="your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className='flex space_btw'>
            <span style={{alignItems: 'center', display: 'flex'}}>
              <input type="checkbox" id="remember" />
                <label style={{
                  marginLeft: '5px',
                  fontSize: '14px',
                  }} htmlFor="remember">Remember me</label>
            </span>
            <Link className='link' to="/forgot-password">Forgot password?</Link>
          </div>
          <br /><br />
          <button className='button primary' 
          type="submit" disabled = {isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </form>
        
      </div>
    </div>
   
  );
}