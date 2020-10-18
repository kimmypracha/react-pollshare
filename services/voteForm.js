import {db} from '../firebase';
async function voteForm(data, values){ // topic, username, answers
    console.log("Vote Form!")
    console.log(JSON.stringify(values,null,2));
    //const data = await db.collection('poll').where('topic','==',values.topic).get();
    //console.log("receive data : " + data.docs());
    data.questions.forEach((element,index,arr) => {
        if(typeof values.answers[index].values === 'string'){
        var idx = element.choices.findIndex((value)=> value.answer === values.answers[index].values)
        arr[index].choices[idx].count += 1; // Edit this later
        arr[index].choices[idx].history.push(Date.now());
        }else{
         values.answers[index].values.forEach((item)=>{
             var idx = element.choices.findIndex((value)=> value.answer === item);
             arr[index].choices[idx].count += 1; // Edit this later for same
             arr[index].choices[idx].history.push(Date.now());
         })
        }
    });
    data.voted += 1;
    data.voter.push(values.username);
    const id = data.id;
    console.log("Before delete");
    console.log(JSON.stringify(data,null,2));
    delete data.id;
    console.log("After delete");
    console.log(JSON.stringify(data,null,2));
    console.log("End Vote Form");
    // Then update this ... 
    db.collection('poll').doc(id).set(data);
    console.log("Update Successfully")
}
export default voteForm;