import React, { createContext, useState, useContext } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        location: '',
        role: '',
        sortBy: 'newest',
    });

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};