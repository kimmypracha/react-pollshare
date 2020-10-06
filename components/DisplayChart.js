import {Pie} from 'react-chartjs-2';
import Router from 'next/router';
const scrollStyle = {
    overflow: 'auto',
    height: '350px',
    marginTop:'20px'
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
    const topic = value.topic;
 const questions = value.questions;
 const chartList = questions.map((qData)=>{
     const count = qData.choices.map((item)=>item.count);
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
    <h2> {value.createdBy} </h2>
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