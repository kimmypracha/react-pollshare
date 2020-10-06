import { Field, Formik , Form} from "formik";
import {RadioGroup,FormControlLabel,FormGroup, Radio, Checkbox} from '@material-ui/core';
import Router from 'next/router';
import {useContext} from 'react';
import UserContext from '../context/UserContext';
import voteForm from '../services/voteForm';
const scrollStyle = {
    overflow: 'auto',
    height: '350px',
    marginTop:'20px'
}
function FormikAnswerGroup({
    name,
    options,
    control,
    ...props
}){
    if(control == 'radio'){
        const choices = options.map((choice,index) => (
            <FormControlLabel 
                 label={choice.answer}
                 control={
                 <Field name={name} as={Radio} value={choice.answer}/>
                 }
             />
        ));
 //       console.log(choices);
        return (
            <div>
                <RadioGroup>
                    {choices}
                </RadioGroup>
            </div>
        )
    }
    return (
        <FormGroup>
            {
                options.map((choice,index) => (
                    <FormControlLabel 
                                 label={choice.answer}
                                 control={
                                 <Field name={name} as={Checkbox} value={choice.answer}/>
                                 }
                             />
                ))
            }
        </FormGroup>
    )
}
function Choice({type, name, options, ...props}){
    if(type=='radio')
        return (
              <FormikAnswerGroup name={name}
                                 options={options}
                                 control={type}
              />);
    return (
        <FormikAnswerGroup name={name}
                                 options={options}
                                 control={type}
              />);
} 
function DisplayForm({value}){
 if(value === null) return <h1> This page is unavailable</h1>;
 const {userData,dispatch} = useContext(UserContext);
 const topic = value.topic;
 const questions = value.questions;
 const answerValue = questions.map((qData,index) => {
     if(qData.type === 'radio') return {values : ''};
     return {values: []}
 });
  return(<div>
    <h1> {topic} </h1>
    <h2> {value.createdBy} </h2>
    <hr/>
    <Formik 
    initialValues={{
        username: userData.username,
        answers : answerValue
    }}
    onSubmit= {(values) =>{
        console.log("Submit!");
        console.log(values.answers);
        //alert(JSON.stringify(answers,null,2));
        voteForm(value,values);
        alert("You have completed the survey.");
        Router.push('/profile');
    }}>
        {props => (
            <React.Fragment>
            <div style={scrollStyle}>
            <Form>
                {questions.map((qData,index) => (
                    <React.Fragment>
                        <h1>{qData.topic}</h1>
                        <Choice type={qData.type}
                                name={`answers.${index}.values`}
                                options = {qData.choices} 
                                {...props} />
                    </React.Fragment>
                ))}
            </Form>
            </div>
            <footer style={{'margin-top':'20px'}}>
            <a value='cancel' onClick={()=>Router.back()}>Cancel</a>
            <a value='' onClick={props.handleSubmit}>Submit</a>
            </footer>
            </React.Fragment>
        )}
    </Formik>
</div>)
}
export default DisplayForm;