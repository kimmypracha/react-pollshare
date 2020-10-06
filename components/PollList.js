import {db} from '../firebase';
import React, {useState, useEffect} from 'react';
import ListComponent from './ListComponent';
import List from '@material-ui/core/List';

export default (props) => {
    const [poll, setPoll] = useState(null);
    var displayPoll = null;
    useEffect(()=>{
        db.collection('poll')
          .get()
          .then(snapshot => {
              const data = snapshot.docs.map(doc => ({id:doc.id , ...doc.data()}));
              console.log(data);
              setPoll(data);
          })
    },[])
    
    if(poll){
        displayPoll = poll.filter(props.filter).map(data => {
            console.log(data);
            console.log("Change Display Please!");
            return (<ListComponent data={data}/>);
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
            <button onClick={()=>{console.log(poll)}}> Refresh </button>
        </div>
    )
}