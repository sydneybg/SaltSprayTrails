
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to="/my-locations">My Locations</NavLink>
        </li>
        <li>
          <NavLink to="/my-collections">My Collections</NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </>
    );
  }

  return (
    <nav>
      <div className="nav-left">
        <NavLink to="/">
          <div className="logo-container">
            <span className="logo-placeholder">Logo</span>
            <span className="app-name">Salt&apos;n&apos;Swim</span>
          </div>
        </NavLink>
      </div>
      <div className="nav-center">
        <input
          type="text"
          placeholder="Search..."
          onClick={() => alert('Feature coming soon')}
        />
      </div>
      <ul className="nav-right">
      <li>
          <NavLink to="/locations">All Locations</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
