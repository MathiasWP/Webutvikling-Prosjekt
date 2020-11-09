import React, { useEffect, useState } from 'react';
import quizService from '../../service/quiz-service'
import './ActiveRooms.scss'
import { Link } from 'react-router-dom';



function ActiveRooms() {
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const result = await quizService.getActiveRooms();

            setData(result);
        };
        fetchData();
    }, []);


  return (
    <div className="activerooms">
        <h2>Active grouprooms:</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Players</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
             {data.map(room => (
                <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.quiz.category}</td>
                    <td>{room.players.length}</td>
                    <td>
                    <Link to={`/grouproom/${room.id}`}>JOIN</Link>
                    </td>
                </tr>
              ))}
            </tbody>

        </table>
   </div>
  );
}

export default ActiveRooms;
