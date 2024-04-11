import React, { useState, useEffect } from 'react';
import { Avatar as MuiAvatar, Card as MuiCard, CardContent as MuiCardContent, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Display = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch students data from the backend API
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setStudents(response.data); // Assuming the response contains an array of student objects
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []); // Empty dependency array ensures the effect runs only once after the component mounts

     // Function to format date of birth
     const formatDateOfBirth = (dob) => {
        const date = new Date(dob);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="px-4 mx-auto max-w-7xl flex items-center justify-center mt-8">
            <div className="w-full grid gap-4">
                {students.map((student, index) => (
                    <Link to={`/students/${student.id}`} key={index}>
                    <MuiCard>
                        <MuiCardContent className="flex items-center p-4 gap-4">
                            <MuiAvatar sx={{ width: 48, height: 48 }}>
                                {student.first_name.charAt(0).toUpperCase()}
                            </MuiAvatar>
                            <div className="grid gap-1.5">
                                <Typography variant="h6">{`${student.first_name} ${student.last_name}`}</Typography>
                                <Typography variant="body2" color="text.secondary">{`Gender: ${student.gender}, Date of Birth: ${formatDateOfBirth(student.date_of_birth)}`}</Typography>
                            </div>
                        </MuiCardContent>
                    </MuiCard>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Display;
