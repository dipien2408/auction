import { MailOutline, PermIdentity, Publish } from "@mui/icons-material";
import "./user.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function User() {
	const location = useLocation();
  const userId = location.pathname.split("/")[2];
	const user = useSelector((state) =>
    state.userList.users.find((user) => user._id === userId)
  );

	const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(user.password);
	const [isAdmin, setIsAdmin] = useState(user.isAdmin);
	const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
	const [isDisable, setIsDisable] = useState(false);
	const [isReset, setIsReset] = useState(false);
	const dispatch = useDispatch();

	const handlePassword = () => {
		const confirm = window.confirm("Are you sure you want to reset this user password?");
		if(confirm) {
			setPassword(user.username);
			setIsDisable(true);
			setIsReset(true);
		}	
	};

	const handleAdmin = (value) => {
		if(value !== isAdmin) {
			const confirm = window.confirm("Are you sure you want to change this user's admin rights?");
    	if(confirm) {
      	setIsAdmin(value);
    	}
			console.log(isAdmin);
		}	
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !email) {
      return alert("Missing information!");
    } 
		if(!file) {
			const newUser = isReset ? {username, email, password, isAdmin, img: user.img} : {username, email, isAdmin, img: user.img};
			updateUser(userId, newUser, dispatch);
			setSuccess(true);
		} else {
			const fileName = new Date().getTime() + file.name;
			const storage = getStorage(app);
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);

			// Register three observers:
			// 1. 'state_changed' observer, called any time the state changes
			// 2. Error observer, called on failure
			// 3. Completion observer, called on successful completion
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
						default:
					}
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						const newUser = isReset ? { username, email, password, isAdmin, img: downloadURL }: { username, email, isAdmin, img: downloadURL };
						updateUser(userId, newUser, dispatch);
						setSuccess(true);
					});
				}
			);
		}    
  };

	return (
		<div className="user">
			<div className="userTitleContainer">
				<h1 className="userTitle">Edit User</h1>
			</div>
			<div className="userContainer">
				<div className="userShow">
					<div className="userShowTop">
						<img src={user.img} 
							alt="" className="userShowImage" />
						<div className="userShowTopTitle">
							<span className="userShowUserName">{user.username}</span>
						</div>
					</div>
					<div className="userShowBottom">
						<span className="userShowTitle">Account Detail</span>
						<div className="userShowInfo">
							<PermIdentity className="userShowIcon"/>
							<span className="userShowInfoTitle">{user._id}</span>
						</div>
						<span className="userShowTitle">Contact Detail</span>
						<div className="userShowInfo">
							<MailOutline className="userShowIcon"/>
							<span className="userShowInfoTitle">{user.email}</span>
						</div>
					</div>
				</div>
				<div className="userUpdate">
					<span className="userUpdateTitle">Edit</span>
					<form className="userUpdateForm" onSubmit={handleSubmit}>
						<div className="userUpdateLeft">
							<div className="userUpdateItem">
								<label>Username</label>
								<input type="text" placeholder={user.username} className="userUpdateInput" onChange={(e) => setUsername(e.target.value)}/>
							</div>
							<div className="userUpdateItem">
								<label>Email</label>
								<input type="text" placeholder={user.email} className="userUpdateInput" onChange={(e) => setEmail(e.target.value)}/>
							</div>
							<div className="userUpdateItem">
								<label>Admin</label>
								<select name="isAdmin" id="isAdmin" onChange={e => handleAdmin(e.target.value)} value={isAdmin}>
									<option value="false">No</option>
									<option value="true">Yes</option>
								</select>
							</div>
							<div className="userUpdateItem">
								<label onClick={handlePassword} style={{textDecoration: "underline", cursor: "pointer"}} disabled={isDisable}>Set default password?</label>
							</div>
						</div>
						<div className="userUpdateRight">
							<div className="userUpdateUpload">
								<img src={file ? URL.createObjectURL(file) : user.img} alt="" className="userUpdateImage" />
								<label htmlFor="file">
									<Publish className="userUpdateIcon"/>
								</label>
								<input type="file" id="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
							</div>
							<button className="userUpdateButton" type="submit">Update</button>
							{success && (
							<span style={{color: "green", textAlign: "center"}}>
								User has been updated...
							</span>            
          	)}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
