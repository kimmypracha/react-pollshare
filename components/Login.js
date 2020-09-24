import React, { useContext } from 'react';
import {Formik, Field} from 'formik';
import UserContext from '../context/UserContext';
import Router from 'next/router';
function Login(){
        const {userData,dispatch} = useContext(UserContext);
        return (
            <Formik initialValues={{
                username: '',
                password: ''
            }}
                    onSubmit={(values)=>{
                        dispatch({type:'signin',
                                  username: values.username,
                                  password: values.password});
                        console.log('submit work!');
                        console.log('The value is : ');
                        console.log(JSON.stringify(values,null,2));
                        Router.push('/profile');
                    }}>
            {({values,handleSubmit})=>(
            <div>
            <h1> Log In</h1>
            <p><Field name="username"  placeholder="Username or Email" /></p>
              <p><Field type='password' name="password" placeholder="Password"/></p>
             
             <p className="remember_me">
            <label>
                 <label>
                  <input type="checkbox" name="checkbox" id="remember_me" value="1"/>
                  Remember me
                </label>
            </label>
            </p>
            <p className="submit">
            <input type="button" name="commit" value="Login" onClick={handleSubmit} />
            </p>
            <pre> {JSON.stringify(userData,null,2)}</pre>
            </div>)}
            </Formik>
        );
}

export default Login;

