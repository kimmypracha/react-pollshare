import React, { useContext } from 'react';
import {Formik, FieldArray,Form, useField,Field} from 'formik';
import {TextField, Checkbox, FormControlLabel,Button,InputLabel, Select, MenuItem, FormControl} from '@material-ui/core'; 
import addForm from './addForm';
import Router from 'next/router';
import UserContext from '../context/UserContext';
function RemovableInput(props){
    return (
        <div>
            <Field name={props.name} 
                             placeholder={props.type} as={TextField}/>
            <Button color='secondary' onClick={()=>props.onRemove()}> X </Button> 
        </div>
    )
}
const questionTemplate = {
    topic: '',
    type: 'radio',
    choices: [{
        answer : ''
    }]
};
const styles = {
    position : 'absolute',
    left : '50%',
    top : '20%',
    transform : 'translate(-50%,0%)',
    overflow: 'scroll'    
}
const stdSize = {
    minWidth: 140,
    marginBottom : '10px'
};

const scrollStyle = {
    overflow: 'auto',
    height: '300px',
    marginTop:'0px'
}

export default () => {
    const {userData,dispatch} = useContext(UserContext);
    
    return ((<main>
        <h1> Create Poll </h1> 

        <Formik initialValues={{
            topic : '',
            type: 'private',
            questions : [{
                topic: '',
                type: 'radio',
                choices: [{
                    answer : ''
                }]
            }]
             }}
             onSubmit={(values)=>{
                if(userData.username==='' && userData.password===''){
                    alert("Login First!");
                    Router.push('/');
                }else{
                 addForm(values,userData.username);
                 Router.push('/profile');
                }
             }}>
            {({values, handleSubmit}) => (
                <div>
                <Form style = {styles}>
                    <Field name='topic' placeholder='Poll name' as={TextField}/>
                    <br/><br/>
                    <FormControl style={stdSize}>
                        <InputLabel id='ptype'>Accessibility</InputLabel>
                        <Field labelId='ptype' name='type' as={Select}>
                            <MenuItem value='private'> Private </MenuItem>
                            <MenuItem value='public'> Public </MenuItem>
                        </Field>
                     </FormControl>
                    <FieldArray name='questions'>
                    {({remove,push}) => (
                          <div style={scrollStyle}>
                              {values.questions.length > 0 && 
                               values.questions.map((question,qindex) => {
                                   return (
                                       <div key={qindex}>
                                         <h4>Question  {qindex+1}</h4>
                                         <hr/>
                                         <RemovableInput name={`questions.${qindex}.topic`} 
                                                         type='question'
                                                         onRemove={()=>remove(qindex)}/>
                                         <FormControl style={stdSize}>
                                         <InputLabel id='qtype'>Question Type</InputLabel>
                                         <Field labelId='qtype' name={`questions.${qindex}.type`} as={Select}>
                                             <MenuItem value='radio'> Single Choice </MenuItem>
                                             <MenuItem value='checkbox'> Multiple Choice </MenuItem>
                                         </Field>
                                         </FormControl>
                                         {<FieldArray name={`questions.${qindex}.choices`}>
                                             {({remove,push}) => {
                                                 question = values.questions[qindex];
                                                 return (
                                                     <div>
                                                         {question.choices.map((answer,aindex)=>(
                                                             <RemovableInput key={aindex}
                                                                             name={`questions.${qindex}.choices.${aindex}.answer`}
                                                                             type='answer'
                                                                             onRemove={()=>remove(aindex)}
                                                                             />
                                                         ))}
                                                         <Button color='primary' onClick={()=>push({answer:''})}>Add Answer</Button>
                                                     </div>
                                                 )
                                             }}
                                          </FieldArray>}
                                          <br/>
                                       </div>
                                   )
                               })}
                               <hr/>
                               <Button color='primary' onClick={()=>push(questionTemplate)}> Add Question</Button>
                        </div>      
                    )}
                    </FieldArray>
                </Form>
                <footer style={{'margin-top':'450px'}}>
                <a value='cancel' onClick={()=>Router.push('/profile')}>Cancel</a>
                <a value='' onClick={handleSubmit}>Submit</a>
                </footer>
            </div>
            )}
        
      
        </Formik>
    </main>));
}