import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./user.css";

export default function User() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=ce2b2793-0e73-4179-afd9-a94c915b01e2" 
                        alt="" className="userShowImage" />
                        <div className="userShowTopTitle">
                            <span className="userShowUserName">Anna Becker</span>
                            <span className="userShowUserType">Software Engineer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Detail</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">ana00</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">24/12/1999</span>
                        </div>
                        <span className="userShowTitle">Contact Detail</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon"/>
                            <span className="userShowInfoTitle">+1 234 567</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">ana00@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon"/>
                            <span className="userShowInfoTitle">Ny City</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text" placeholder="anna00" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input type="text" placeholder="Anna Becker" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder="ana00@gmail.com" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" placeholder="+1 234 567" className="userUpdateInput"/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder="Ny City" className="userUpdateInput"/>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src="https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=ce2b2793-0e73-4179-afd9-a94c915b01e2" 
                                alt="" className="userUpdateImage" />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon"/>
                                </label>
                                <input type="file" id="file" style={{display: "none"}}/>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
