import React, { useState } from 'react';
import axios from 'axios';

const CreateExam = () => {
  const [subjectName, setSubjectName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleCreateExam = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/exams', {
        subjectName,
        startTime,
        endTime
      });
      console.log(response.data);
      alert("Tạo thành công!");
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây
    }
  };

  return (
    <div>
      <h1>Create New Exam</h1>
      <input type="text" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
      <input type="datetime-local" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="datetime-local" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <button onClick={handleCreateExam}>Create Exam</button>
    </div>
  );
};

export default CreateExam;
