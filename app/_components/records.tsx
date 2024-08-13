import { useState, useEffect } from 'react';

interface TimeRecord {
  checkInTime: string;
  checkOutTime: string;
  timeDuration: string;
}

const Records: React.FC = () => {
  const [records, setRecords] = useState<TimeRecord[]>([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
      const parsedRecords: TimeRecord[] = JSON.parse(savedRecords);
      setRecords(parsedRecords);
    }
  }, []);

  const handleClearRecords = () => {
    localStorage.removeItem('records');
    setRecords([]); // Clear the records from the state
  };

  return (
    <div>
      <h1>Time Records</h1>
      <button onClick={handleClearRecords}>Clear Records</button>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <p>Check-in: {record.checkInTime}</p>
            <p>Duration: {record.timeDuration}</p>
            <p>Check-out: {record.checkOutTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Records;
