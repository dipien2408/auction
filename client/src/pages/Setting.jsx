import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { userRequest } from "../requestMethods";
import {PhotoCamera} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update, logout } from "../redux/apiCalls";
import { reset } from "../redux/cartRedux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div``;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #EFF1F5;
	background-size: cover;
`;

const FormWrapper =styled.div`
	padding: 20px;
	-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75); 
	box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
	border-radius: 5px;
	height: 600px;
	width: 600px;
	background-color: #ffff;
	margin: 20px 0px;
`;

const Form = styled.form`
	width: 100%;
`;

const TitleItem = styled.div`
	font-size: 20px;
	margin-top: 20px;
	margin-left: 51px;
`;

const Input = styled.input`
	color: gray;
	margin: 10px 0;
	height: 30px;
	border: none;
	border-bottom: 1px solid lightgray;
	width: 500px;
	margin-left: 50px;
	&:focus {
    outline: none;
  }
`;

const ProfilePic = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px 0;
	justify-content: center;
	position: relative;
`;

const UserImg = styled.img`
	width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
	margin:10px 0px;
`

const Label = styled.label``;

const UploadIcon = styled.div`
	background-color: #EFF1F5;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: absolute;
	font-size: 10px;
	top: 78%;
	left: 54%;
	border-radius: 50%;
	height: 30px;
	width: 30px;
`;

const SettingButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 15px 50px;
`;
const Delete = styled.span`
	color: red;
	font-size: 12px;
	cursor: pointer;
	margin: 20px 0px;
	width: 100px;
`;

const Update = styled.button`
	width: 150px;
	border: none;
	border-radius: 10px;
	color: white;
	background-color: teal;
	cursor: pointer;
	padding: 10px;
`;

const Success = styled.span`
color: green;
textAlign: center;
marginTop: 20px;
`;

const FileInput = styled.input``;

const Setting = () => {
	const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);

	const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !email || !password) {
      return alert("Missing information!");
    } else {
			const updatedUser = {
				username,
				email,
				password,
			};
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
						const newUser = { updatedUser, img: downloadURL };
						update(dispatch, newUser, user._id);
						setSuccess(true);
					});
				}
			);
		}    
  };
	
	const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this account?");
    if(confirm) {
      try {
        await userRequest.delete(`/users/${user._id}`);
        handleLogout();
        window.location.replace("/");
      } catch (err) {}
    }   
  };

	const handleLogout = () => {
    logout(dispatch);
    dispatch(reset());
  }

	return (
		<Container>
			<Navbar/>
			<Wrapper>
				<FormWrapper>
					<Form onSubmit={handleSubmit}>
						<ProfilePic>
							<TitleItem style={{marginRight:"50px"}}>Profile Picture</TitleItem>
							<UserImg src={file ? URL.createObjectURL(file) : user.img}/>
							<Label htmlFor="file">
								<UploadIcon>
									<PhotoCamera  style={{color: "black"}}/>
								</UploadIcon>
							</Label>
							<FileInput type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }}>	
							</FileInput>
						</ProfilePic>
						<TitleItem>Username</TitleItem>
						<Input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
						<TitleItem>Email</TitleItem>
						<Input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
						<TitleItem >Password</TitleItem>
						<Input type="password" placeholder={user.password} onChange={(e) => setPassword(e.target.value)}/>
						<SettingButton>
							<Update type="submit">Update</Update>
							<Delete onClick={handleDelete}>Delete</Delete>
						</SettingButton>
						{success && (
							<Success>
								Profile has been updated...
							</Success>            
          	)}    
					</Form>
				</FormWrapper>
			</Wrapper>
			<Newsletter/>
			<Footer/>
		</Container>
	);
};

export default Setting;


