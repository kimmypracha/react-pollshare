import DisplayForm from '../components/DisplayForm';
import {withRouter} from 'next/router';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
export default () => {
    const {userData, dispatch} = useContext(UserContext);
    return (<DisplayForm value={userData.currentPoll}/>)
    //return (<h1> {JSON.stringify(userData.currentPoll,null,2)}</h1>)
}