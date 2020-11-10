import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router';
import quizService from '../service/quiz-service'

import './GroupRoom.scss';


function GroupRoom() {
  const [data, setData] = useState(null)

  const location = useLocation();

  useEffect(() => {
    // For some reason the param/key object is weird, so we have to extract it the rough way
    const requestedRoomId = location.pathname.split('/').pop();
      const fetchData = async () => {
          const result = await quizService.getRoom(requestedRoomId);
          setData(result);
      };
      fetchData();
  }, []);


  useEffect(() => {
console.log(data)
  },[data])

  return (
    <div className="GroupRoom">
      {
        data &&
        <div>
          
          </div>
      }
    </div>
  );
}

export default GroupRoom;
