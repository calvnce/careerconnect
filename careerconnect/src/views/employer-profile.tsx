import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const EmployerProfile = () => {
  const navigate = useNavigate();

  const data = localStorage.getItem('employer_record');
  let employerRecord = null;
  if (data) {
    employerRecord = JSON.parse(data);
  }
  if (!employerRecord) {
    navigate('/');
  }
  const record = employerRecord?.record ?? '';

  return (
    <div className='container'>
      <Card className='cute-card mt-2'>
        <Card.Header as='h5'>Account Details</Card.Header>
        <Card.Body>
          {record && (
            <>
              <p className='mt-2'>
                Id: <span className='text-muted text-decoration-underline'>{record.id}</span>
              </p>

              <p className='mt-2'>
                Name:{' '}
                <span className='text-muted text-decoration-underline'>{record.company_name}</span>
              </p>
              <p></p>
              <p className='mt-2'>
                Contact:{' '}
                <span className='text-muted text-decoration-underline'>
                  {record.contact_person_name}
                </span>
              </p>
              <p></p>
              <p className='mt-2'>
                Industry:{' '}
                <span className='text-muted text-decoration-underline'>{record.industry}</span>
              </p>
              <p className='mt-2'>
                Account username:{' '}
                <span className='text-muted text-decoration-underline'>{record.user}</span>
              </p>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
