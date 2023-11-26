import React, { useState } from 'react';
import { Form, FloatingLabel, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import studentRegister from 'service/student-register-service';

function RegisterStudent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pantehrid, setPantehrid] = useState(0);
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [gradYear, setGradYear] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        id: 0,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        pantehrid,
        degree,
        major,
        grad_year: gradYear,
      };
      const response = await studentRegister(data);
      console.log(response);
      // Redirect to the index page after successful registration
      navigate('/');
      // Display success message
      setMessage(response);
    } catch (error: any) {
      console.error(error);
      // Display error message
      setError(error.message || 'An error occurred');
    }
  };

  // Hide success and error messages when the user interacts with the page
  const handlePageClick = () => {
    setMessage('');
    setError('');
  };

  // Attach the click event listener when the component mounts
  React.useEffect(() => {
    document.addEventListener('click', handlePageClick);

    // Detach the click event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, []);

  return (
    <div className='container'>
      <Card className='mt-2'>
        <Card.Header as='h5'>Student Registration</Card.Header>
        <Card.Body>
          {message != '' && (
            <Alert variant='success' onClose={() => setMessage('')} dismissible>
              {message}
              Redirecting to the index page...
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
                <FloatingLabel controlId='inputPantehrid' label='Pantehrid'>
                  <Form.Control
                    type='number'
                    placeholder='12345'
                    value={pantehrid}
                    onChange={(e) => setPantehrid(Number(e.target.value))}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputFirstName' label='First Name'>
                  <Form.Control
                    type='text'
                    placeholder='John'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId='inputLastName' label='Last Name'>
                  <Form.Control
                    type='text'
                    placeholder='Doe'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputDegree' label='Degree'>
                  <Form.Control
                    type='text'
                    placeholder='Bachelor'
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputMajor' label='Major'>
                  <Form.Control
                    type='text'
                    placeholder='Computer Science'
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputGradYear' label='Graduation Year'>
                  <Form.Control
                    type='number'
                    placeholder='2023'
                    value={gradYear}
                    onChange={(e) => setGradYear(Number(e.target.value))}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <FloatingLabel controlId='inputEmail4' label='Username'>
                  <Form.Control
                    type='text'
                    placeholder='username'
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

export default RegisterStudent;
