import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Profile } from './profile';
import { Logout } from './logout';

export const StudentPortal = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const studentRecord = localStorage.getItem('student_record');
    if (studentRecord) {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className='container mt-1'>
      <Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k ?? '')} className='mb-3'>
        <Tab eventKey='home' title='Upcoming career fairs'>
          Upcoming career fairs will show here
        </Tab>
        <Tab eventKey='contact' title='My Career fairs'>
          Tab content for Contact
        </Tab>
        <Tab eventKey='profile' title='Profile'>
          <Logout sessionKey='student_record' />
          <Profile />
        </Tab>
      </Tabs>
    </main>
  );
};
