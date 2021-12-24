import React from 'react'
import "./topbar.css"
import { NotificationsNone, Language, Logout } from '@mui/icons-material';
import { logout } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Topbar() {
	const user = useSelector((state) => state.user.currentUser); 
	const dispatch = useDispatch();
	const handleClick = () => {
		logout(dispatch);
	}
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link className="link" to="/">
                        <span className="logo">Ec-Admin</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Logout onClick={handleClick}/>
                    </div>
                    <img src={user.img} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
