import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../contexts/user.context'

function Topbar() {
  const [user] = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">MovieAdda</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      {!user && <div className="navbar-nav">
        
            <NavLink to="/login" className="nav-link" href="#">LogIn</NavLink>
        <NavLink to="/signup" className="nav-link" href="#">SignUp</NavLink>
        
      </div>}
    </div>
  </div>
</nav>
  )
}

export default Topbar