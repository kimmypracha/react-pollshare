import { Field, Formik , Form} from "formik";
import {RadioGroup,FormControlLabel,FormGroup, Radio, Checkbox} from '@material-ui/core';
import Router from 'next/router';
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
        console.log(choices);
        return (
            <div>
                <h1>Hello </h1>
                <RadioGroup>
                    {choices}
                </RadioGroup>
            </div>
        )
    }
    return (
        <FormGroup>
            <h1>Hi!</h1>
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
        answers : answerValue,
        textH : "hello"
    }}
    onSubmit= {(values) =>{
        console.log("Submit!");
        console.log(values.answers);
        //alert(JSON.stringify(answers,null,2));
    }}>
        {props => (
            <React.Fragment>
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
            <footer style={{'margin-top':'0px'}}>
            <a value='cancel' onClick={()=>Router.back()}>Cancel</a>
            <a value='' onClick={props.handleSubmit}>Submit</a>
            </footer>
            </React.Fragment>
        )}
    </Formik>
</div>)
}
export default DisplayForm;