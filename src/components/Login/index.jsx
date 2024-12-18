import { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import './index.css'

class Login extends Component {
    state = {
        username: '',
        password: '',
        showSubmitError: false,
        errorMsg: '',
    }

    onSubmitSuccess = jwtToken => {
        const { history } = this.props
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        history.replace('/')
    }

    onSubmitFailure = errorMsg => {
        this.setState({ showSubmitError: true, errorMsg })
    }

    submitForm = async event => {
        event.preventDefault()
        const { username, password } = this.state
        const userDetails = { username, password }
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            this.onSubmitSuccess(data.jwt_token)
        } else {
            this.onSubmitFailure(data.error_msg)
        }
    }

    onChangeUsername = event => {
        this.setState({ username: event.target.value })
    }

    onChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    renderPasswordField = () => {
        const { password } = this.state
        return (
            <div className="input-container">
                <label className="input-label" htmlFor="password">
                    PASSWORD
                </label>
                <input
                    type="password"
                    id="password"
                    className="password-input-field"
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Password"
                />
            </div>
        )
    }

    renderUsernameField = () => {
        const { username } = this.state
        return (
            <div className="input-container">
                <label className="input-label" htmlFor="username">
                    USERNAME
                </label>
                <input
                    type="text"
                    id="username"
                    className="username-input-field"
                    value={username}
                    onChange={this.onChangeUsername}
                    placeholder="Username"
                />
            </div>
        )
    }

    render() {
        const { showSubmitError, errorMsg } = this.state
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken !== undefined) {
            return <Redirect to="/" />
        }
        return (
            <div className="login-form-container">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                    className="login-website-logo"
                    alt="website logo"
                />
                <form className="form-container" onSubmit={this.submitForm}>
                    {this.renderUsernameField()}
                    {this.renderPasswordField()}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                    {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                </form>
            </div>
        )
    }
}

export default Login
