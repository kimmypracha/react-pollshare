import {useState,useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';
import PollList from './PollList';

export default () => {
    const {userData,dispatch} = useContext(UserContext);
    return (<div className="profile-card">
        <div className="card-header">
        <div className="card-cover">Profile</div>
        <h1 className="card-fullname">{userData.username}</h1>
        {userData.username===""&&<h2 className="card-jobtitle">I can't remember</h2>}
        </div>
        <div>
            <ul>
                <PollList filter={(data)=>data.createdBy===userData.username}/>
            </ul>
        </div>
    </div>
    )
}