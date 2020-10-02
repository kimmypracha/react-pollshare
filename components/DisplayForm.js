import { Field, Formik , Form} from "formik";
import {RadioGroup,FormControlLabel,FormGroup, Radio, Checkbox} from '@material-ui/core';
function FormikAnswerGroup({
    name,
    options,
    control,
    ...props
}){
    console.log("In FormikGroup");
    console.log(options);
    console.log(name);
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
    console.log("In Choice !");
    console.log(options);
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
 console.log("Test Questions!");
 console.log(questions);
 const answerValue = questions.map((qData,index) => {
     return qData.choices[0].answer;
 });
  return(<div>
    <h1> {topic} </h1>
    <h2> {value.createdBy} </h2>
    <hr/>
    <Formik 
    initialValues={{
        answers : answerValue
    }}
    onSubmit= {() =>{
        alert(JSON.stringify(answers,null,2));
    }}>
        {props => (
            <Form>
                {questions.map((qData,index) => (
                    <React.Fragment>
                        <h1>{qData.topic}</h1>
                        <Choice type={qData.type}
                                name={`answers.${index}`}
                                options = {qData.choices} 
                                {...props} />
                    </React.Fragment>
                ))}
            </Form>
        )}
    </Formik>
</div>)
}
export default DisplayForm;