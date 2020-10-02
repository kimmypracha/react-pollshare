import DisplayForm from '../components/DisplayForm';
import {withRouter} from 'next/router';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
export default () => {
    const {userData, dispatch} = useContext(UserContext);
    return (<main><DisplayForm value={userData.currentPoll}/></main>)
    //return (<h1> {JSON.stringify(userData.currentPoll,null,2)}</h1>)
}