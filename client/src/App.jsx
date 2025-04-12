import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import ApplicantDashboard from './pages/ApplicantDashboard';
import InternshipApplications from './components/employers/InternshipApplications';
import CreatePosting from './components/employers/CreatePosting';
import Dashboard from './components/employers/Dashboard';
import CreateInternship from './components/employers/CreateInternship';
import Applications from './components/employers/Applications';
import InternshipList from './components/applicants/InternshipList';
import InternshipDetails from './components/applicants/InternshipDetails';
import ApplicationForm from './components/applicants/ApplicationForm';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <FilterProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
          <Route path="/employer/create-posting" element={<CreatePosting />} />
          <Route path="/employer/dashboard/postings" element={<Dashboard />} />
          <Route path="/employer/dashboard/applications" element={<Applications />} />
          <Route path="/employer/create-internship" element={<CreateInternship />} />
          <Route path="/employer/applications/:id" element={<InternshipApplications />} />
          <Route path="/internships" element={<InternshipList />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/apply/:id" element={<ApplicationForm />} />
        </Routes>
        <Footer />
      </FilterProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

// import React from 'react';

// const App = () => {
//   return (
//     <div>
//       <h1>Internship Portal</h1>
//       <p>Welcome to our application!</p>
//     </div>
//   );
// };

// export default App;