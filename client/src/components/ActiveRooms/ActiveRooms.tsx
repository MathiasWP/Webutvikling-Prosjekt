import React, { useEffect, useState } from 'react';
import quizService from '../../service/quiz-service'
import './ActiveRooms.scss'
import { Link } from 'react-router-dom';



function ActiveRooms() {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const rooms = await quizService.getActiveRooms();
            const availableCategories = await quizService.getCategories();

            setCategories(availableCategories.categories);
            setData(rooms);
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
                            <td>{categories[room.quiz.category].toUpperCase()}</td>
                            <td className={room.players.length > 0 ? 'green' : 'red'}>{room.players.length}</td>
                            <td>
                                <Link to={`/grouproom/${room.id}`} className="join">JOIN</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default ActiveRooms;
