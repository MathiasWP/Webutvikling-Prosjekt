import { isInaccessible } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import quizService from '../service/quiz-service';
import './CreateQuiz.scss';
import firebase from 'firebase'



function CreateQuizSuccess() {





    return (
        <div className="SubmitSuccess">

            <h1>SUCCESS!</h1>

        </div>
    )


}


export default CreateQuizSuccess;