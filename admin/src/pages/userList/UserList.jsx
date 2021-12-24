import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userList.users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if(confirm) {
      deleteUser(id, dispatch);
    }
  };

  const columns = [
      { field: '_id', headerName: 'ID', width: 90 },
      {
          field: "user",
          headerName: "User",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="userListUser">
                <img className="userListImage" src={params.row.img} alt="" />
                {params.row.username}
              </div>
            );
          },
        },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'isAdmin', headerName: 'Admin', width: 120 },
      { field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params) => {
            return(
              <>
                  <Link to={"/user/" + params.row._id}>
                      <button className="userListEdit">Edit</button>
                  </Link>
                  <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
              </>
            )
        }
      }
  ];
    
  return (
      <div className="userList">
          <DataGrid rows={users} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={8} rowsPerPageOptions={[5]} checkboxSelection/>
      </div>
  )
}
