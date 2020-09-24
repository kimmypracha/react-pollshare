import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {useRouter} from 'next/router';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
const header = {
    fontSize : '14px'
}
const author = {
    fontSize : '12px',
    float: 'right'
}
const styles = {
    listStyle : 'none'
}
export default (props) => {
    const router = useRouter();
    const {userData,dispatch} = useContext(UserContext);
    return (
    <div>
    <ListItem button component="a" onClick={() => {
        dispatch({type: 'selectpoll',
                  currentPoll : props.data});
        router.push('/displayPage');
    }}>
        <ListItemText primary={props.data.topic} secondary={props.data.createdBy}/>
    </ListItem>
    <Divider/>
    </div>)
}