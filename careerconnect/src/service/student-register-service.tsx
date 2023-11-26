import { BASE_URL } from 'config';
import { ROLES } from 'models/roles';
import Student from 'models/student';

async function studentRegister(data: Student) {
  const url = `${BASE_URL}/signup/student/`;
  const { first_name, last_name, pantehrid, degree, major, grad_year, username, password } = data;
  const role = ROLES['student'];
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        pantehrid,
        role,
        degree,
        major,
        grad_year,
        username,
        password,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(`Signup failed: ${response.status} - ${errorData.message}`);
    }
  } catch (error) {
    // Log the error here
    console.error(error);
    throw new Error('An unexpected error occurred during student registration.');
  }
}

export default studentRegister;
