import React, { useEffect, useState } from 'react';
import quizService from '../../service/quiz-service'
import './ActiveRooms.scss'
import { useHistory } from 'react-router-dom';



function ActiveRooms() {
    const [data, setData] = useState([])
    const history = useHistory();


    useEffect(() => {
        const fetchData = async () => {
            const result = await  quizService.getActiveRooms();

            setData(result);
        };
        fetchData();
    }, []);


  return (
    <div className="activerooms">
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
                <tr>
                    <td>{room.name}</td>
                    <td>{room.quiz.category}</td>
                    <td>{room.players.length}</td>
                    <td><button onClick={() => {history.push('/grouproom/' + room.id)}}>JOIN</button></td>
                </tr>
              ))}
            </tbody>

        </table>
   </div>
  );
}

export default ActiveRooms;
