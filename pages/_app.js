import './main.css';
import UserContext from '../context/UserContext';
import { useReducer } from 'react';

const initialState = {
  username : '',
  password : '',
  currentPoll : null
}
const reducer = (state,action) => {
  switch(action.type){
    case 'signin' : 
      return {username : action.username, password : action.password, ...state}
    case 'signout' :
      return {username : '', password : '', ...state}
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
