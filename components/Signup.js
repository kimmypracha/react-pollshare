const Signup = () => {
    return (
      <div>
      <h1>Sign up</h1>
       <p><input type="Username" name="txtUsername" value="" placeholder="Username or Email" /></p>
        <p><input type="Password" name="txtPassword" value="" placeholder="Password"/></p>
        <p><input type="Firstname" name="txtFristname" value="" placeholder="Firstname"/></p>
        <p><input type="Lastname" name="txtLastname" value="" placeholder="Lastname"/></p>
        <p className="submit">
        <input type="button" name="commit" value="Create account" />
        </p>  
        </div>
    );
}

export default Signup;