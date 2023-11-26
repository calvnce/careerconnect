import { BASE_URL } from 'config';
import Student from 'models/student';

async function studentUpdate(data: Student) {
  const { id, first_name, last_name, pantehrid, degree, major, grad_year } = data;
  const url = `${BASE_URL}/student/${id}/update/`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        pantehrid,
        degree,
        major,
        grad_year,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Update failed: ${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    // Log the error here
    console.error(error);
    throw new Error('An unexpected error occurred during student info update.');
  }
}

export default studentUpdate;
