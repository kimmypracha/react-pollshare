import {Pie} from 'react-chartjs-2';
import Router from 'next/router';
import { TextField ,Button} from '@material-ui/core';
import {Formik, Form ,Field} from 'formik';
import {useState, useReducer} from 'react';
const scrollStyle = {
    overflow: 'auto',
    height: '270px',
    marginTop:'10px'
}
const rightStyle = {
    float : 'right'
}
function ChartComponent({count,label}){
  return <Pie 
             data={{
                 labels: label,
                 datasets: count
             }}/>
}
function DisplayChart({value}){
    if(value === null) return <h1> This page is unavailable</h1>;
    const [startTime, setStart] = useState(value.createdAt);
    const [endTime, setEnd] = useState(Date.now());
    const [votecnt, setcnt] = useState(value.voted);
    //const [, forceUpdate] = useReducer(x => x + 1, 0);
    const topic = value.topic;
    const questions = value.questions;
    const voter = value.voter;
    const chartList = questions.map((qData)=>{
    const count = qData.choices.map((item)=>item.history.filter((t)=> (startTime<=t && t<=endTime)).length);
    const label = qData.choices.map((item)=>item.answer);
    const datasets = [{
         data : count,
         backgroundColor: ['yellow','blue','pink','green','orange','red','purple','brown','gray']
    }]
     console.log("Display Chart!");
     console.log(datasets);
     return (
       <React.Fragment>
        <h3> {qData.topic} </h3>
       <ChartComponent count={datasets} label={label}/>
       <hr/>
       </React.Fragment>
     )
 })
  return(<div>
    <h1> {topic} </h1>
    <h3>
    <span> By {value.createdBy} </span>
    <span style={rightStyle}>  Voted : {votecnt} </span>
    </h3>
    <Formik initialValues={
            {
                start: new Date(startTime).toISOString().slice(0,10), // Date Format
                end : new Date(endTime).toISOString().slice(0,10) // Date Format
            }
        }
               onSubmit={
                   (values)=>{
                      setStart(new Date(values.start).getTime()); // timestamp
                      setEnd(new Date(values.end).getTime());// timestamp
                      setcnt(voter.filter((data)=>(startTime<=data.date && data.date<=endTime)).length);
                      //forceUpdate();
                      console.log("Set Time Value!");
                   }
               }>
            {({handleSubmit})=>(
            <Form>
                <Field label='Start' name='start' type='date' as={TextField}/>
                <Field label='End' name='end' type='date' as={TextField}/>
                <Button onClick={handleSubmit}> Submit </Button>
            </Form>)
            }
        </Formik>
    <hr/>
    <div style={scrollStyle}>
         {chartList}
    </div>
    <footer style={{'margin-top':'20px'}}>
            <a value='cancel' onClick={()=>Router.back()}>Back</a>
    </footer>
    </div>)
}

export default DisplayChart;