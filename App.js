import axios from "axios";
import { useState,useEffect } from "react";

function App(){
const[studentid,setId]=useState('');
const[studentname,setName]=useState('');
const[studentaddress,setAddress]=useState('');
const[mobile,setMobile]=useState('');
const[students,setUsers]=useState([]);


useEffect(()=>
{
    (async()=> await Load())();
},[]);


async function Load(){
    const result=await axios.get("http://localhost:1900/api/v1/student/getall");
    setUsers(result.data);
    console.log(result.data);

}

async function savestudents(event){
    event.preventDefault();

    try{
        await axios.post("http://localhost:1900/api/v1/student/save",
        {
            studentname:studentname,
            studentaddress:studentaddress,
            mobile:mobile
        });

        alert("stotred");
        setId("");
        setName("");
        setAddress("");
        setMobile("");
        Load();

    }
    catch(err){
        alert("faild");
    }
}



    async function editstudent(students){
        setName(students.studentname);
        setAddress(students.studentaddress);
        setMobile(students.mobile);
        setId(students._id);
    }



    async function deletestudent(studentid){
        await axios.delete("http://localhost:1900/api/v1/student/delete/"+studentid);
        alert("dleted");
        Load();

}


async function update(event){
    event.preventDefault();

    try{
        await axios.put("http://localhost:1900/api/v1/student/edit/"+studentid,
        {
            studentname:studentname,
            studentaddress:studentaddress,
            mobile:mobile
        });

        alert("stotred");
        setId("");
        setName("");
        setAddress("");
        setMobile("");
        Load();

    }
    catch(err){
        alert("faild");
    }

}



return(
    <div>

    <h1> Student deatils</h1>
    <div class="container mt-4">
        <form>



            <div class="form-group">
                <label> student name</label>
                <input type="text" class="form-control" value={studentname} onChange={(event)=>
                {
                    setName(event.target.value);
                }}/>

            </div>


            <div class="form-group">
                <label> student address</label>
                <input type="text" class="form-control" value={studentaddress} onChange={(event)=>
                {
                    setAddress(event.target.value);
                }}/>

            </div>




            <div class="form-group">
                <label> mobile</label>
                <input type="text" class="form-control" value={mobile} onChange={(event)=>
                {
                    setMobile(event.target.value);
                }}/>

            </div>

<div>

    <button class="btn btn-primary mt-4" onClick={savestudents}>registore</button>
    <button class="btn btn-warning mt-4" onClick={update}>update</button>

    
</div>


        </form>
    </div>
    <br/>
    <table class="table table-dark" align=" center">
        <thead>
            <tr>
                <th scope="col">studentname</th>
                <th scope="col">studentaddress</th>
                <th scope="col">mobile</th>
                <th scope="col">option</th>
            </tr>
        </thead>

        {students.map(function fn(student){
            return(

            <tbody>
                <tr>
                    <td>{student.studentname}</td>
                    <td>{student.studentaddress}</td>
                    <td>{student.mobile}</td>


                    <td>

                         <button typeof="button" class="btn btn-warning mt-4" onClick={()=>editstudent(student)}>edit</button>
                         <button typeof="button" class="btn btn-danger mt-4" onClick={()=>deletestudent(student._id)}>delete</button>
                    </td>

                </tr>
            </tbody>



       ) })}
    </table>
    </div>
)



    }
    export default App;