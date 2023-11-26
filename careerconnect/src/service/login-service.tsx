import { BASE_URL } from 'config';
import LogIn from 'models/login';

async function login(logIn: LogIn) {
  const url = `${BASE_URL}/login/`;
  const { username, password } = logIn;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(`Login failed: ${response.status} - ${errorData.message}`);
    }
  } catch (error) {
    // Log the error here
    console.error(error);
    throw new Error('An unexpected error occurred during login.');
  }
}

export default login;
