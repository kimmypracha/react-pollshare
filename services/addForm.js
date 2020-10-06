import {db} from '../firebase';
async function addForm(value,username){
    value = {
        ...value,
        createdAt : Date.now(),
        createdBy : username,
        voted: 0
    }
    console.log(JSON.stringify(value,null,2));
    const res = await db.collection('poll').add(value);
    console.log("Add data id : " + res.id);
}
export default addForm;