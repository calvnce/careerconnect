/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import login from 'service/login-service';

function LoginForm(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response);
      // redirect to the appropriate portal based on the user's role
      if (response.role == 'Student') {
        localStorage.setItem('student_record', JSON.stringify(response));
        navigate('/portal/student');
      } else if (response.role == 'Employer') {
        localStorage.setItem('employer_record', JSON.stringify(response));
        navigate('/portal/employer');
      } else if (response.role == 'Admin') {
        localStorage.setItem('admin_record', JSON.stringify(response));
        navigate('/portal/admin');
      }
      // close the login modal
      props.onHide();
    } catch (error) {
      // display error in the login form
      setError('Login failed. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className='form-group'>
            <FloatingLabel controlId='floatingInput' label='Username' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='doe'
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-describedby='usernameHelpBlock'
              />
              <Form.Text id='usernameHelpBlock' muted>
                Your username is typically your email or a unique identifier.
              </Form.Text>
            </FloatingLabel>
          </div>
          <div className='form-group'>
            <FloatingLabel controlId='floatingPassword' label='Password'>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-describedby='passwordHelpBlock'
              />
              <Form.Text id='passwordHelpBlock' muted>
                Your password must be at least 8 characters long.
              </Form.Text>
            </FloatingLabel>
          </div>
          {error && <p className='text-danger'>{error}</p>}
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Form.Text id='LogInHelpBlock' muted>
          You must have registered with the system to be logged in.
        </Form.Text>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginForm;
