import { LogoutProps } from 'models/logout-prop';
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const Logout = ({ sessionKey }: LogoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(sessionKey);
    navigate('/');
  };

  return (
    <div className='container'>
      <button className='btn btn-outline-primary' type='button' onClick={handleLogout}>
        <IoLogOutOutline /> Logout
      </button>
    </div>
  );
};
