import { BASE_URL } from 'config';
import Employer from 'models/employer';
import { ROLES } from 'models/roles';

async function employerRegister(data: Employer) {
  const url = `${BASE_URL}/signup/employer/`;
  const { name, contact, industry, username, password } = data;
  const role = ROLES['employer'];
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        role,
        contact,
        industry,
        username,
        password,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(`Registration failed: ${response.status} - ${errorData.message}`);
    }
  } catch (error) {
    // Log the error here
    console.error(error);
    throw new Error('An unexpected error occurred during registration.');
  }
}

export default employerRegister;
