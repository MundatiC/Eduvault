import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar as MuiAvatar, Card as MuiCard, CardContent as MuiCardContent, CardHeader as MuiCardHeader, Typography, Button } from '@mui/material';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';

const calculateAge = (dateOfBirthString) => {
    const dob = new Date(dateOfBirthString);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    if (
        now.getMonth() < dob.getMonth() ||
        (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
    ) {
        age--;
    }
    return age;
};

const SingleStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                const studentData = response.data[0];
                const age = calculateAge(studentData.date_of_birth);
                setStudent({ ...studentData, age });
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudent();
    }, [id]);

    const exportToSpreadsheet = () => {
        if (student) {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet([student]);
            XLSX.utils.book_append_sheet(wb, ws, 'Student Data');
            XLSX.writeFile(wb, 'student_data.xlsx');
        }
    };

    return (
        <div className="px-4 mx-auto max-w-7xl flex flex-col items-center justify-center mt-8">
            {student && (
                <MuiCard className="w-full max-w-sm">
                    <div className="flex items-center justify-center p-6">
                        <MuiAvatar className="rounded-full" sx={{ width: 96, height: 96 }}>
                            {`${student.first_name.charAt(0)}${student.last_name.charAt(0)}`}
                        </MuiAvatar>
                    </div>
                    <MuiCardHeader
                        title={student.first_name}
                        subheader={`${student.age}-year-old ${student.gender}`}
                        className="text-center"
                    />
                    <MuiCardContent className="text-center">
                        <Typography variant="body1" className="text-sm/relaxed">
                            {`Loves playing the guitar and dreams of becoming a professional musician.`}
                        </Typography>
                    </MuiCardContent>
                </MuiCard>
            )}
            <Button onClick={exportToSpreadsheet} variant="contained" color="primary" className="mt-6" style={{ marginTop: '20px', backgroundColor: '#6A8165', color: 'white' }}>
                Export as Spreadsheet
            </Button>
            {student && (
                <CSVLink
                    data={[student]}
                    filename={'student_data.csv'}
                    className="mt-4"
                >
                    <Button variant="contained" color="primary" className="mt-4" style={{ backgroundColor: '#6A8165', color: 'white', }}>
                        Export as CSV
                    </Button>
                </CSVLink>
            )}
        </div>
    );
};

export default SingleStudent;
