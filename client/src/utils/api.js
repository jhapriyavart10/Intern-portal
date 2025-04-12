import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true // This is important for cookies/authentication
  });
  
  // Interceptor for handling token refresh, etc. if needed
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle error or token refresh logic here
      return Promise.reject(error);
    }
  );

export const fetchInternships = async () => {
    try {
        const response = await axios.get(`${API_URL}/internships`);
        return response.data;
    } catch (error) {
        console.error('Error fetching internships:', error);
        throw error;
    }
};

export const createInternship = async (internshipData) => {
    try {
        const response = await axios.post(`${API_URL}/internships`, internshipData);
        return response.data;
    } catch (error) {
        console.error('Error creating internship:', error);
        throw error;
    }
};

export const applyForInternship = async (applicationData) => {
    try {
        const response = await axios.post(`${API_URL}/applications`, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error applying for internship:', error);
        throw error;
    }
};

export const fetchApplications = async (internshipId) => {
    try {
        const response = await axios.get(`${API_URL}/applications?internshipId=${internshipId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
};
// Add this function above the default export

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Add login function as well since you'll likely need it
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Add this function to your api.js file

export const getInternshipPostings = async () => {
    try {
      // This assumes your backend requires authentication and 
      // returns only internships created by the logged-in employer
      const response = await api.get(`${API_URL}/internships/employer`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employer internship postings:', error);
      
      // For development purposes, return mock data
      return [
        {
          id: '1',
          title: 'Frontend Developer Intern',
          company: 'Tech Solutions Inc',
          location: 'New York',
          applicants: 5
        },
        {
          id: '2',
          title: 'Backend Developer Intern',
          company: 'Tech Solutions Inc',
          location: 'Remote',
          applicants: 3
        }
      ];
    }
  };

export default api;
