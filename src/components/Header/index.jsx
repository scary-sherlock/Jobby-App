import { Link, withRouter } from 'react-router-dom'
import { FaHome, FaBriefcase, FaSignOutAlt } from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const Header = ({ history }) => {
    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
    }

    return (
        <nav className="header">
            <Link to="/">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                    alt="website logo"
                    className="website-logo"
                />
            </Link>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">
                        <FaHome className="nav-icon" />
                        <span className="nav-text">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/jobs" className="nav-link">
                        <FaBriefcase className="nav-icon" />
                        <span className="nav-text">Jobs</span>
                    </Link>
                </li>
            </ul>
            <button type="button" className="logout-button" onClick={onClickLogout}>
                <FaSignOutAlt className="nav-icon" />
                <span className="nav-text">Logout</span>
            </button>
        </nav>
    )
}

export default withRouter(Header)
