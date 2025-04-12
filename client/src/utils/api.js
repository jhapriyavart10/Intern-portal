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
        const response = await api.get('/internships');
        
        // If API returns empty array, use dummy data instead
        if (!response.data || !response.data.length) {
            console.log('API returned no internships, using dummy data');
            return getDummyInternships();
        }
        
        return response.data;
    } catch (error) {
        console.error('Error fetching internships:', error);
        // Return dummy data if API call fails
        return getDummyInternships();
    }
};
const getDummyInternships = () => {
return [
    {
        _id: '1',
        title: 'Frontend Developer Intern',
        company: 'Tech Innovations Inc',
        location: 'Remote',
        description: 'Join our team to build cutting-edge web applications using React and modern JavaScript frameworks. You\'ll work directly with senior developers on real client projects.',
        requirements: 'Knowledge of HTML, CSS, JavaScript, and React. Portfolio of projects preferred.',
        stipend: '₹15,000 - ₹20,000 per month',
        duration: '6 months',
        deadline: '2025-05-30',
        postedDate: '2025-04-01',
        skills: ['React', 'JavaScript', 'CSS', 'HTML'],
        openPositions: 2
    },
    {
        _id: '2',
        title: 'Machine Learning Research Intern',
        company: 'AI Solutions',
        location: 'Bangalore',
        description: 'Work on innovative ML projects to solve real-world problems. You\'ll be involved in data preprocessing, model development, and evaluation.',
        requirements: 'Strong background in mathematics, statistics, and Python programming. Experience with ML libraries like TensorFlow or PyTorch.',
        stipend: '₹25,000 per month',
        duration: '3 months',
        deadline: '2025-05-15',
        postedDate: '2025-03-20',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
        openPositions: 1
    },
    {
        _id: '3',
        title: 'Digital Marketing Intern',
        company: 'GrowthX Marketing',
        location: 'Mumbai',
        description: 'Gain hands-on experience in digital marketing campaigns, social media management, and content creation for various brands.',
        requirements: 'Basic knowledge of digital marketing concepts. Good communication and writing skills.',
        stipend: '₹12,000 per month',
        duration: '4 months',
        deadline: '2025-05-20',
        postedDate: '2025-04-05',
        skills: ['Social Media', 'Content Writing', 'SEO', 'Analytics'],
        openPositions: 3
    }
    // Other dummy internships...
];
};


export const createInternship = async (internshipData) => {
    try {
        const response = await api.post('/internships', internshipData); // Use api instead of axios
        return response.data;
    } catch (error) {
        console.error('Error creating internship:', error);
        throw error;
    }
};

export const applyForInternship = async (applicationData) => {
    try {
        const response = await api.post(`/applications`, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error applying for internship:', error);
        throw error;
    }
};

// Change this function:

export const fetchApplications = async (internshipId) => {
    try {
        const response = await api.get(`/applications?internshipId=${internshipId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        // Return dummy data for development
        return [
            {
                _id: 'app1',
                applicantName: 'John Doe',
                applicantEmail: 'john@example.com',
                resume: 'resume_link.pdf',
                coverLetter: 'I am interested in this position...',
                status: 'pending'
            },
            {
                _id: 'app2',
                applicantName: 'Jane Smith',
                applicantEmail: 'jane@example.com',
                resume: 'resume_link.pdf',
                coverLetter: 'I have relevant experience in...',
                status: 'reviewing'
            }
        ];
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post(`/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Add login function as well since you'll likely need it
export const loginUser = async (credentials) => {
    try {
        const response = await api.post(`/auth/login`, credentials);
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
