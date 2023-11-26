import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavBar from './nav';
import Index from 'views/home';
import Error404NotFound from 'views/notfound';
import RegisterStudent from 'views/student-reg-form';
import RegisterEmployer from 'views/employer-reg-form';
import { StudentPortal } from 'views/student-portal';
import { EmployerPortal } from 'views/employer-portal';

const MainRoutes = () => {
  return (
    <Router>
      <MainNavBar />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/signup/employer' element={<RegisterEmployer />} />
        <Route path='/signup/student' element={<RegisterStudent />} />
        <Route path='/portal/student' element={<StudentPortal />} />
        <Route path='/portal/employer' element={<EmployerPortal />} />
        <Route path='*' element={<Error404NotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
