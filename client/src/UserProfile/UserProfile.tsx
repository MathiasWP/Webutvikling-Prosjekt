import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'

import './UserProfile.scss';

import Input from '../components/Input/Input'

function UserProfile() {
    const { user } = useParams();
    console.log(user)


  return (
    <div className="UserProfile">
        <div id="profile-info">
            <span>
            Username: <Input value="jens"/>
            </span>
            <span>
                Created at: {"<timestamp>"}
            </span>
            <span>
                User-id: {user}
            </span>
        </div>
        <section id="quizes">
            Your quizes:
        </section>
    </div>
  );
}

export default UserProfile;
