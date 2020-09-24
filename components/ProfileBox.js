import React, {useState, useEffect, useContext} from 'react';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import Router from 'next/router';
import UserContext from '../context/UserContext';

export default () => {
    const {userData,dispatch} = useContext(UserContext); 
    const [page, setPage] = useState('Home');
    useEffect(()=>{
        if(page === 'Logout'){
            dispatch({type:'signout'})
            Router.push('/');
        }
    },[page])
    var displayPage = (<h1>Page you request is unavailable</h1>);
        if(page === 'Home'){
            displayPage = (<HomePage/>);
        }
        if(page === 'Profile'){
            displayPage = (<ProfilePage/>);
        }
        if(page === 'Logout'){
            displayPage = (<h1>Log out process</h1>);
        }

    return (
    <main>
     {displayPage}
    <footer>
        <a onClick={()=>setPage('Home')}>Home</a>
        <a onClick={()=>setPage('Profile')}>Profile</a>
        <a onClick={()=>setPage('Logout')}>Log out</a>
    </footer>
</main>
    )
}

