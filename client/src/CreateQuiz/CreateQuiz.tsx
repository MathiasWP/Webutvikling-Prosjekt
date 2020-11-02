import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import './CreateQuiz.scss';


function CreateQuiz() {
  const { user } = useParams();
  console.log(user)


  return (
    <div className="CreateQuiz">
      
    </div>
  );
}

export default CreateQuiz;
