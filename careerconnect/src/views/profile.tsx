import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import studentUpdate from 'service/update-profile-service';

export const Profile = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const studentRecordItem = localStorage.getItem('student_record');
  let studentRecord = null;
  if (studentRecordItem) {
    studentRecord = JSON.parse(studentRecordItem);
  }
  if (!studentRecord) {
    navigate('/');
  }
  const record = studentRecord?.record ?? '';
  const id = record.id;

  const [username, setUsername] = useState(record.user);
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(record.first_name);
  const [lastName, setLastName] = useState(record.last_name);
  const [pantehrid, setPantehrid] = useState(record.pantehrid);
  const [degree, setDegree] = useState(record.degree);
  const [major, setMajor] = useState(record.major);
  const [gradYear, setGradYear] = useState(record.grad_year);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        id,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        pantehrid,
        degree,
        major,
        grad_year: gradYear,
      };
      const response = await studentUpdate(data);
      console.log(response);
      // Display success message
      setMessage(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  useEffect(() => {
    document.addEventListener('click', handlePageClick);

    // Detach the click event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, []);

  return (
    <div className='container'>
      <Card className='mt-2'>
        <Card.Header as='h5'>Basic information</Card.Header>
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
                <FloatingLabel controlId='inputId' label='Student Id'>
                  <Form.Control type='number' value={id} disabled />
                </FloatingLabel>
              </Col>
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
                    value={gradYear}
                    onChange={(e) => setGradYear(Number(e.target.value))}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled
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
                    disabled
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
