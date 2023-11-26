import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Logout } from './logout';
import { EmployerProfile } from './employer-profile';

export const EmployerPortal = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('jobs');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const studentRecord = localStorage.getItem('employer_record');
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
        <Tab eventKey='jobs' title='Jobs'>
          Posted Jobs will appear here
        </Tab>
        <Tab eventKey='pubjob' title='Publish Job'>
          Post your jobs here
        </Tab>
        <Tab eventKey='logout' title='Logout'>
          <Logout sessionKey='employer_record' />
          <hr />
          <EmployerProfile />
        </Tab>
      </Tabs>
    </main>
  );
};
