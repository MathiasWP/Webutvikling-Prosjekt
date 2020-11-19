import { isInaccessible } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import quizService from '../service/quiz-service';
import './QuizDetails.scss';
import firebase from 'firebase'



function UpdateQuizSuccess() {





    return (
        <div className="UpdateSucces">

            <h1>Your quiz is updated!</h1>

        </div>
    )


}


export default UpdateQuizSuccess;