"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const CheckIn: React.FC = () => {
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleCheckIn = async () => {
    const now = new Date();
    setCheckInTime(now);
    setTimer(setInterval(() => {
      const elapsed = new Date(new Date().getTime() - now.getTime());
      setDuration(elapsed.toISOString().substr(11, 8));
    }, 1000));
    await axios.post('/api/checkin', { checkInTime: now });
  };

  const handleCheckOut = async () => {
    if (timer) clearInterval(timer);
    const checkOutTime = new Date();
    const timeDuration = new Date(checkOutTime.getTime() - (checkInTime?.getTime() || 0));
    setDuration(timeDuration.toISOString().substr(11, 8));

    await axios.post('/api/checkout', { checkOutTime, timeDuration: duration });

    setCheckInTime(null);
    setTimer(null);
  };

  return (
    <div>
      {checkInTime ? (
        <>
          <p>Checked in at: {checkInTime.toLocaleTimeString()}</p>
          <p>Time Count: {duration || '00:00:00'}</p>
          <button onClick={handleCheckOut}>Check Out</button>
        </>
      ) : (
        <button onClick={handleCheckIn}>Check In</button>
      )}
    </div>
  );
};

export default CheckIn;
