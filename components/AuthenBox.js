import {useState} from 'react';
import Login from './Login';
import Signup from './Signup';
function AuthenBox(){
        const [authenType, setAuthenType] = useState('login');
        var temporary_jsx = (<h1>Sorry, this feature is not available right now.</h1>);
        if(authenType === 'login'){
            temporary_jsx = <Login/>;
        }else if(authenType === 'signup'){
            temporary_jsx = (<Signup/>);
        }
        return (<main>
            {temporary_jsx}
          <footer>
                <a value='login' onClick={e => setAuthenType('login')}>Login</a>
                <a value='signup' onClick={e => setAuthenType('nosignup')} disabled>Sign up</a>
            </footer>
        </main>)
}

export default AuthenBox;