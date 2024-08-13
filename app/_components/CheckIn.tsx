"use client"
import { useState, useEffect } from 'react';

const formatTime = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return `${day}/${month} ${time}`;
};

const calculateDuration = (start: Date, end: Date): string => {
  const diff = end.getTime() - start.getTime();

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};

const CheckIn: React.FC = () => {
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedCheckInTime = localStorage.getItem('checkInTime');
    if (savedCheckInTime) {
      setCheckInTime(savedCheckInTime);
      const startTime = new Date(savedCheckInTime);
      setTimer(setInterval(() => {
        const now = new Date();
        setDuration(calculateDuration(startTime, now));
      }, 1000));
    }
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    const formattedTime = formatTime(now);
    setCheckInTime(formattedTime);
    localStorage.setItem('checkInTime', now.toISOString());

    setTimer(setInterval(() => {
      const elapsed = calculateDuration(now, new Date());
      setDuration(elapsed);
    }, 1000));
  };

  const handleCheckOut = () => {
    if (timer) clearInterval(timer);

    const now = new Date();
    const checkOutTime = formatTime(now);
    const startTime = new Date(checkInTime!);
    const timeDuration = calculateDuration(startTime, now);

    localStorage.setItem('checkOutTime', checkOutTime);
    localStorage.setItem('timeDuration', timeDuration);

    setCheckInTime(null);
    setDuration(null);
    setTimer(null);

    // Save the record to a list
    const records:any = JSON.parse(localStorage.getItem('records') || '[]');
    records.push({
      checkInTime: localStorage.getItem('checkInTime'),
      checkOutTime,
      timeDuration,
    });
    localStorage.setItem('records', JSON.stringify(records));

    localStorage.removeItem('checkInTime');
  };

  const handleClearRecords = () => {
    localStorage.removeItem('records');
    alert('Records cleared'); // Optionally notify the user
  };

  return (
    <div>
      {checkInTime ? (
        <>
          <p>Checked in at: {checkInTime}</p>
          <p>Time Count: {duration || '00:00'}</p>
          <button onClick={handleCheckOut}>Check Out</button>
        </>
      ) : (
        <button onClick={handleCheckIn}>Check In</button>
      )}
      <button onClick={handleClearRecords}>Clear Records</button>
    </div>
  );
};

export default CheckIn;
