import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/exams');
        setExams(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h1>Exam List</h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id}>{exam.subjectName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
