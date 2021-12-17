import React from 'react'
import "./topbar.css"
import { NotificationsNone, Language, Logout } from '@mui/icons-material';
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Topbar() {
	const dispatch = useDispatch();
	const handleClick = () => {
		logout(dispatch);
	}
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Ec-Admin</span>
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
                    <img src="https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=ce2b2793-0e73-4179-afd9-a94c915b01e2" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
