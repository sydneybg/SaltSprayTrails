import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import 'Navigation.css';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(); //for hidding the dropdown

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const handleClick = (e) => {
    if (!ulRef.current.contains(e.target)) {
      closeMenu();
    }
  };

  return (
    <>
      <button onClick={openMenu}>
        <FaUserCircle />
      </button>
            <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
      {showMenu && (
        <div onClick={handleClick} className="menu-backdrop" />
      )}
    </>
  );
}

export default ProfileButton;
