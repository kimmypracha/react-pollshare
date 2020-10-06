import DisplayChart from '../components/DisplayChart';
import {withRouter} from 'next/router';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
export default () => {
    const {userData, dispatch} = useContext(UserContext);
    return (<main><DisplayChart value={userData.currentPoll}/></main>)
    //return (<h1> {JSON.stringify(userData.currentPoll,null,2)}</h1>)
}