import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Typography } from '@mui/material';
import CSVReader from 'react-csv-reader';

const Import = () => {
    const [fileData, setFileData] = useState([]);

    const papaparseOptions = {
        header: true, // Indicates that the CSV has a header row
        dynamicTyping: true,
        skipEmptyLines: true,
    };

    const handleOnFileLoaded = (data) => {
        // Extract data excluding the header
        console.log(data);
        setFileData(data[0]);
    };

    const handleOnError = (error) => {
        console.error('Error occurred while parsing CSV:', error);
    };

    const handleProcessFile = async () => {
        console.log('File data:', fileData);

        try {
            // Send fileData to the server
            const response = await axios.post('http://localhost:3000/users', fileData);

            console.log('File data sent successfully:', response.data);
            alert('File data sent successfully');
            // Handle the response from the server if needed
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    };

    const handleCancel = () => {
        setFileData([]);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Container maxWidth="md">
                <div className="flex flex-col gap-4 p-4">
                    <div className="mx-auto max-w-md flex flex-col items-center justify-center gap-4 text-center">
                        <Typography variant="h4" gutterBottom>
                            Upload a CSV File
                        </Typography>
                        <CSVReader
                            onFileLoaded={handleOnFileLoaded}
                            onError={handleOnError}
                            parserOptions={papaparseOptions}
                            inputId="csvInput"
                            inputName="csvInput"
                            inputStyle={{ color: 'red' }}
                        />
                    </div>
                    {fileData.length > 0 && (
                        <div className="p-4 border rounded-md">
                            <Typography variant="h6" gutterBottom>
                                File Preview
                            </Typography>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        {Object.keys(fileData[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {fileData.map((row, index) => (
                                        <tr key={index}>
                                            {Object.values(row).map((cell, cellIndex) => (
                                                <td key={cellIndex}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="flex justify-center gap-4">
                        <Button variant="contained" color="primary" onClick={handleProcessFile}>
                            Process File
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Import;
