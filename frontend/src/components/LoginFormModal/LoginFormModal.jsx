import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const updateErrors = (field, condition, message) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      if (condition) {
        newErrors[field] = message;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  useEffect(() => {
    if (credential.includes('@')) {
      updateErrors('credential', !validateEmail(credential), "Enter a valid email address.");
    } else {
      updateErrors('credential', credential.length > 0 && credential.length < 4, "Username must be at least 4 characters.");
    }
  }, [credential]);

  useEffect(() => {
    updateErrors('password', password.length > 0 && password.length < 6, "Password must be at least 6 characters long.");
  }, [password]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors({});

  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .catch(async ({ data }) => {
  //       const parsedData = await data.json();

  //       console.log('res', parsedData)

  //       if (data.status === 401) {
  //         setErrors({credential: parsedData.message});
  //       }
  //     });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrors({});

  //   try {
  //     await dispatch(sessionActions.login({ credential, password }));
  //     closeModal();
  //   } catch (error) {
  //     if (error.data) {
  //       const parsedData = await error.data.json();
  //       if (parsedData.errors) {
  //         setErrors(parsedData.errors);
  //       } else if (parsedData.message) {
  //         setErrors({ credential: parsedData.message });
  //       }
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    dispatch(sessionActions.login({ credential, password }))
      .then((res) => {
        if (res.error) {
          setErrors(res.error.errors || { credential: res.error.message });
        } else {
          closeModal();
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };


  const demoLogin = (e) => {
    e.preventDefault();

    dispatch(sessionActions.login({
      credential: "demo@user.io",
      password: 'password'
    }))
    .then(closeModal)
  }

  const isDisabled = Object.keys(errors).length > 0 || !credential || !password;


  return (
    <>
    <div className='login-form'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            placeholder='Enter your username or email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error-message">{errors.credential}</p>}
        <label>
          Password
          <input
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}

          <button className={isDisabled ? "disabled-button" : ""} type="submit" disabled={isDisabled}>Log In</button>
        <div className='demo'>
        <a href="/" onClick={demoLogin}>Demo User</a>
        </div>

      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
