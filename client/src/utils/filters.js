export const filterInternshipsByLocation = (internships, location) => {
    return internships.filter(internship => internship.location.toLowerCase().includes(location.toLowerCase()));
};

export const filterInternshipsByRole = (internships, role) => {
    return internships.filter(internship => internship.role.toLowerCase().includes(role.toLowerCase()));
};

export const sortInternshipsByDate = (internships) => {
    return internships.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
};