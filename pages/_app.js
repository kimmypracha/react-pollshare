import './main.css';
import UserContext from '../context/UserContext';
import { useReducer } from 'react';
const initialState = {
  username : '',
  password : '',
  currentPoll : null
}
const reducer = (state,action) => {
  console.log("Reducer here!");
  console.log(state);
  console.log(action);
  switch(action.type){
    case 'signin' : 
      return {...state, username : action.username, password : action.password}
    case 'signout' :
      return {...state, username : '', password : ''}
    case 'selectpoll' :
      return {...state, currentPoll: action.currentPoll}
    case 'clearpoll' :
      return {...state, currentPoll: null}
  }
}
export default function MyApp({ Component, pageProps }) {
    const [userData, dispatch] = useReducer(reducer,initialState);
    return (
    <UserContext.Provider value = {{userData,dispatch}}>
    <Component {...pageProps} />
    </UserContext.Provider>)
}
