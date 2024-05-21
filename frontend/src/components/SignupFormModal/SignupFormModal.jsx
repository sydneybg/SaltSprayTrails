import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSignedUp, setIsSignedUp] = useState(false);

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
    updateErrors('email', email && !validateEmail(email), "Please enter a valid email address.");
  }, [email]);

  useEffect(() => {
    updateErrors('username', username && username.length < 4, "Username must be at least 4 characters long.");
  }, [username]);

  useEffect(() => {
    updateErrors('password', password && password.length < 6, "Password must be at least 6 characters long.");
    updateErrors('confirmPassword', password && confirmPassword && password !== confirmPassword, "Confirm Password must match the Password.");
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (!email) formErrors.email = "Email is required.";
    if (!username) formErrors.username = "Username is required.";
    if (!firstName) formErrors.firstName = "First name is required.";
    if (!lastName) formErrors.lastName = "Last name is required.";
    if (!password) formErrors.password = "Password is required.";
    if (!confirmPassword) formErrors.confirmPassword = "Confirm password is required.";

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      dispatch(
        sessionActions.signup({ email, username, firstName, lastName, password })
      )
      .then(() => {
        closeModal();
        setIsSignedUp(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(prevErrors => ({ ...prevErrors, ...data.errors }));
        }
      });
    }
  };

  const isDisabled = Object.keys(errors).length > 0 || !email || !username || !firstName || !lastName || !password || !confirmPassword;

  if (isSignedUp) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <div className='signup-form'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <label>
            Username
            <input
              type="text"
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p>{errors.username}</p>}
          <label>
            First Name
            <input
              type="text"
              placeholder='Enter your first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p>{errors.firstName}</p>}
          <label>
            Last Name
            <input
              type="text"
              placeholder='Enter your last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p>{errors.lastName}</p>}
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
          {errors.password && <p>{errors.password}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <button className={isDisabled ? "disabled-button" : ""} type="submit" disabled={isDisabled}>Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
