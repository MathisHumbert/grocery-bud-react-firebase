import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const LoginSignUp = ({ toggleLogin, setToggleLogin }) => {
  const auth = getAuth();

  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // SIGN UP
    if (signUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setToggleLogin(false);
          setFormData(initialState);
          // ALERT
        })
        .catch((error) => {
          console.log(error);
          // ALERT
        });
    }
    // LOGIN
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setToggleLogin(false);
          setFormData(initialState);
          // ALERT
        })
        .catch((error) => {
          console.log(error);
          // ALERT
        });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <aside className={toggleLogin ? 'open' : ''}>
      <form className='section-center aside-container' onSubmit={onSubmit}>
        <h3>{signUp ? 'Sign Up' : 'Login'}</h3>

        {signUp && (
          <div className='form-control'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              className='grocery'
              id='name'
              placeholder='Name'
              value={formData.name}
              onChange={onChange}
            />
          </div>
        )}

        <div className='form-control'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            className='grocery'
            id='email'
            placeholder='Email'
            value={formData.email}
            onChange={onChange}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            className='grocery'
            id='password'
            placeholder='Password'
            value={formData.password}
            onChange={onChange}
          />
        </div>

        <button type='submit' className='login-btn'>
          {signUp ? 'Sign Up' : 'Login'}
        </button>

        <p>
          {signUp ? 'Already Sign Up ? ' : 'No account ? '}{' '}
          <span onClick={() => setSignUp(!signUp)}>
            {signUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </aside>
  );
};

export default LoginSignUp;
