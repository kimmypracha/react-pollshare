import {db} from '../firebase';
import React, {useState, useEffect} from 'react';
import ListComponent from './ListComponent';
import List from '@material-ui/core/List';
import {useContext} from 'react';
import UserContext from '../context/UserContext';

export default (props) => {
    const {userData,dispatch} = useContext(UserContext);
    const [poll, setPoll] = useState(null);
    var displayPoll = null;
    const username = userData.username;
    useEffect(()=>{
        db.collection('poll')
          .get()
          .then(snapshot => {
              const data = snapshot.docs.map(doc => ({id:doc.id , ...doc.data()}));
              console.log(data);
              setPoll(data);
          })
    },[])
    const wrap_filter = (data)=>(props.filter(data));
    if(poll){
        displayPoll = poll.filter(wrap_filter).map(data => {
            console.log(data);
            console.log("Change Display Please!");
            return (<ListComponent data={data} chart={props.chart}/>);
        });
        console.log(displayPoll);
    }else{
        console.log("render null");
    }
    return (
        <div className='poll-list'>
            <List>
             {displayPoll}
            </List>
        </div>
    )
}