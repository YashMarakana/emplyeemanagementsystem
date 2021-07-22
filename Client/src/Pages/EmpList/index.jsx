/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import ComModal from "../../component/index";
import { EmployeeForm } from "../EmployeeForm/employeForm";
import { getEmp, AddEmp, EditEmp, DeleteItem } from '../../actions/employe'


const EmpList = () => {


  let dispatch = useDispatch();

  const { token } = useSelector(state => state.User);
  let { Empitem, open } = useSelector(state => state.Empdata);
  console.log("rtrf", Empitem);
  console.log("##@#", token);
  const [users, setUsers] = useState({});
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState('');
  const [Img, setImg] = useState('')

  const DispatchEmployeData = async () => {
    dispatch(await getEmp(token))
  }
  useEffect(() => {
    DispatchEmployeData()
  }, [])

  const onChange = (target) => {

    users[`${target.name}`] = target.value;

  }

  const FileOnChange = (e) => {

    let reader = new FileReader();
    setFile(e.target.files[0]);
    reader.addEventListener("load", () => {
      setImg(reader.result);
      console.log("fd", typeof (reader.result));
    });

    reader.readAsDataURL(e.target.files[0])

  }
  console.log("Empitem", Empitem);

  const handleAdd = async (e) => {

    e.preventDefault();
    console.log("users", users);
    let Data = users
    Data.id = uuidv4();
    const formdata = new FormData();  
    formdata.append("file", file)
    formdata.append("fname", users.fname);
    formdata.append("lname", users.lname);
    formdata.append("email", users.email);


    dispatch(await AddEmp(formdata, token))
    Empitem.push(users);
    dispatch({ type: "MODAL" });
    setUsers({})
    setImg('')

  }

  const handleEdit = (user) => {
    setEdit(true);
    dispatch({ type: "MODAL" });
    setUsers(user)
    setImg(`http://localhost:3001/photos/${user.file}`)
  }

  const handleUpdate = async () => {
    debugger
    if (file !== ""){

      const formdata = new FormData();

    formdata.append("file", file);
    formdata.append("fname", users.fname);
    formdata.append("lname", users.lname);
    formdata.append("email", users.email);
   
    console.log("nf", users);
    debugger
    setEdit(false)
    dispatch(await EditEmp(users._id, formdata, token))
    dispatch({ type: "MODAL" })
    } 
   
  else {
  const data = new FormData()

  data.append("fname", users.fname);
  data.append("lname", users.lname);
  data.append("email", users.email);

  debugger
  console.log("uiddd", users._id);
  setEdit(false)
  dispatch(await EditEmp(users._id, data, token))
  dispatch({ type: "MODAL" })
}
    
  }
const handleDelete = async (_id) => {

  if (window.confirm("Are you sure to delete it?")) {
    console.log("deleee", _id);
    dispatch(await DeleteItem(_id))

  }
}
return (
  <div>
    <Button color="primary" onClick={() => dispatch({ type: "MODAL" })} style={{ marginTop: "20px", float: "right" }} size="lg">+</Button>{' '}
    <Table hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Image</th>
          <th>Author</th>
          <th></th>

        </tr>
      </thead>
      <tbody>
        {

          Empitem && Empitem.map((data, index) => {
            console.log("dataitems", data.author);

            return (
              <tr key={index.id} style={{ width: 100 }}>
                <td>{++index}</td>
                <td>{data.fname}</td>
                <td>{data.lname}</td>
                <td>{data.email}</td>
                <td><img src={`http://localhost:3001/photos/${data.file}`} alt="my img" /></td>
                <td>{`${data.author?.fname}${data.author?.lname}`}</td>
                <td>
                  <div className="deledit-wrapper">
                    <i className="fas fa-edit" onClick={() => handleEdit(data)}></i>
                    <i className="fas fa-trash-alt" onClick={() => handleDelete(data._id)}></i>
                  </div>
                </td>
                <td></td>
                <td></td>

              </tr>
            )
          })

        }

      </tbody>
    </Table>
    <ComModal open={open} >
      <EmployeeForm
        edit={edit}
        Img={Img}
        onChange={onChange}
        users={users}
        FileOnChange={FileOnChange}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
      />
    </ComModal>

  </div>
)
}

export default EmpList;