import { useState, useEffect } from 'react';

interface TimeRecord {
  checkInTime: string;
  checkOutTime: string;
  timeDuration: string;
}

// Type guard to check if an object is of type TimeRecord
const isTimeRecord = (record: unknown): record is TimeRecord => {
  return (
    typeof record === 'object' &&
    record !== null &&
    typeof (record as TimeRecord).checkInTime === 'string' &&
    typeof (record as TimeRecord).checkOutTime === 'string' &&
    typeof (record as TimeRecord).timeDuration === 'string'
  );
};

const Records: React.FC = () => {
  const [records, setRecords] = useState<TimeRecord[]>([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
      try {
        // Safely parse the JSON data from localStorage
        const parsedRecords: unknown = JSON.parse(savedRecords);

        // Validate if parsedRecords is an array of TimeRecord
        if (Array.isArray(parsedRecords) && parsedRecords.every(isTimeRecord)) {
          setRecords(parsedRecords as TimeRecord[]);
        } else {
          console.error("Invalid records format in localStorage");
        }
      } catch (error) {
        console.error("Failed to parse records from localStorage:", error);
      }
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
        {records.length === 0 ? (
          <li>No records available</li>
        ) : (
          records.map((record, index) => (
            <li key={index}>
              <p>Check-in: {record.checkInTime}</p>
              <p>Duration: {record.timeDuration}</p>
              <p>Check-out: {record.checkOutTime}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Records;
