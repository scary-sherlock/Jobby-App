import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Cookies from 'js-cookie';
import './index.css';

const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
};

class Profile extends Component {
    state = {
        profileData: {},
        apiStatus: apiStatusConstants.initial,
    };

    componentDidMount() {
        this.getProfileData();
    }

    getProfileData = async () => {
        this.setState({ apiStatus: apiStatusConstants.loading });

        const apiUrl = 'https://apis.ccbp.in/profile';
        const jwtToken = Cookies.get('jwt_token');
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };

        const response = await fetch(apiUrl, options);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                profileData: data.profile_details,
                apiStatus: apiStatusConstants.success,
            });
        } else {
            this.setState({ apiStatus: apiStatusConstants.failure });
        }
    };

    onRetry = () => {
        this.getProfileData();
    };

    renderProfileContent = () => {
        const { apiStatus, profileData } = this.state;
        const { name, profile_image_url: profileImageUrl, short_bio: shortBio } = profileData;

        switch (apiStatus) {
            case apiStatusConstants.loading:
                return (
                    <div className="loader-container" data-testid="loader">
                        <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
                    </div>
                );
            case apiStatusConstants.success:
                return (
                    <div className="profile-container">
                        <img src={profileImageUrl} alt="profile" className="profile-image" />
                        <h2 className="profile-name">{name}</h2>
                        <p className="profile-bio">{shortBio}</p>
                    </div>
                );
            case apiStatusConstants.failure:
                return (
                    <div className="failure-container">
                        <p>Failed to load profile data</p>
                        <button type="button" className="retry-button" onClick={this.onRetry}>
                            Retry
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    render() {
        return <div>{this.renderProfileContent()}</div>;
    }
}

export default Profile;
