import React, { useState } from 'react';
import { Form, FloatingLabel, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import employerRegister from 'service/employer-register-service';

function RegisterEmployer() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        id: 0,
        name,
        contact,
        industry,
        username,
        password,
      };
      const response = await employerRegister(data);
      console.log(response);
      // Display success message
      setShowSuccess(true);

      // Hide success message after a few seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Route user to index page '/'
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      // Display error message
      setError(error);

      // Hide error message after a few seconds
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='container'>
      <Card className='mt-2'>
        <Card.Header as='h5'>Employer Registration</Card.Header>
        <Card.Body>
          {showSuccess && (
            <Alert variant='success' onClose={() => setShowSuccess(false)} dismissible>
              Registration successful! Redirecting to the index page...
            </Alert>
          )}
          {error && (
            <Alert variant='danger' onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputName' label='Name'>
                  <Form.Control
                    type='text'
                    placeholder='Suns Limited'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId='inputContact' label='Contact'>
                  <Form.Control
                    type='text'
                    placeholder='+2478455545'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputIndustry' label='Industry'>
                  <Form.Control
                    type='text'
                    placeholder='Telecominication'
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputUsername' label='Username'>
                  <Form.Control
                    type='text'
                    placeholder='jdoe'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId='inputPassword4' label='Password'>
                  <Form.Control
                    type='password'
                    placeholder='******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button type='submit' variant='primary'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterEmployer;
