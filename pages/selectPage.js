import Router  from "next/router";
import {useContext} from 'react';
import UserContext from '../context/UserContext';
export default ()=>{
    const {userData,dispatch} = useContext(UserContext);
    if(userData.currentPoll === null){
        return (
            <main>
                <h1> Invalid Page </h1>
            </main>
        );
    }
    const display = [];
    const log = [];
    if(!userData.currentPoll.voter.includes(userData.username)){
     display.push(<a onClick={()=>Router.push('/displayPage')}> Vote</a>)
    }else{
        log.push(<h3 style={{color:'red'}}> - You already voted this poll</h3>);
    }
    if(userData.username === userData.currentPoll.createdBy || userData.currentPoll.type!=='private'){
     display.push(<a onClick={()=>Router.push('/chartPage')}> Summary</a>);
    }
    display.push(<a onClick={()=>Router.back()}>Cancel</a>)
return (
    <main>
    <h2> Please select your options </h2>
    {log}
    <footer>
        {display}
    </footer>
</main>
    )
}