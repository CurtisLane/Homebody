import React, { useContext } from 'react'
import BodyContext from "../../utils/BodyContext";
import Cookies from "js-cookie";
import './style.css'

const Navbar = () => {

  const {userState} = useContext(BodyContext)
  const userName = userState.firstName ? userState.firstName : ""
  const profileImage = userState.profileImage ? userState.profileImage : ""

    const logout = () => {
      Cookies.remove("user");
      BodyContext.setAuth(false);
    };

    

    return (

      <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
        <div>
        <img src="/house-light.png" className="logoHouse" alt=""></img>
        <img src="/muscle1-light.png" className="bicepLeft" alt=""></img>
        <img src="/muscle2-light.png" className="bicepRight" alt=""></img>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <a className="navbar-brand mt-1 mr-2" href= '/profile'><img className="profilePic" src={profileImage}></img></a>
            <a className="nav-item nav-link pt-4 pr-2 nameColor" href='/profile'>{userName}</a>
            <a className="nav-item nav-link pt-4 nameColor" href="/">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link pt-4" href="/profile">Saved Workouts</a>
            <a type="button" className="nav-item nav-link pt-4" href="/" onClick={logout}>Logout</a>
          </div>
        </div>
      </nav>

    )
    
};
  
export default Navbar;