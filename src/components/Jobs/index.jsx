import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner';
import Profile from '../Profile';
import Header from '../Header';
import JobItem from '../JobItem';
import './index.css';

const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
    noJobs: 'NO_JOBS',
};

class Jobs extends Component {
    state = {
        jobsData: [],
        employmentTypes: [],
        minimumPackage: '',
        searchQuery: '',
        apiStatus: apiStatusConstants.initial,
    };

    componentDidMount() {
        this.getJobs();
    }

    getJobs = async () => {
        const { employmentTypes, minimumPackage, searchQuery } = this.state;
        this.setState({ apiStatus: apiStatusConstants.loading });

        const employmentTypeQuery = employmentTypes.join(',');
        const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${minimumPackage}&search=${searchQuery}`;
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
            const updatedData = data.jobs.map(job => ({
                companyLogoUrl: job.company_logo_url,
                employmentType: job.employment_type,
                id: job.id,
                jobDescription: job.job_description,
                location: job.location,
                packagePerAnnum: job.package_per_annum,
                rating: job.rating,
                title: job.title,
            }))
            this.setState({
                jobsData: updatedData,
                apiStatus: data.jobs.length > 0 ? apiStatusConstants.success : apiStatusConstants.noJobs,
            });
        } else {
            this.setState({ apiStatus: apiStatusConstants.failure });
        }
    };

    onRetry = () => {
        this.getJobs();
    };

    onSearchChange = event => {
        this.setState({ searchQuery: event.target.value });
    };

    onSearchSubmit = () => {
        this.getJobs();
    };

    onEmploymentTypeChange = event => {
        const { value } = event.target;
        this.setState(prevState => {
            const { employmentTypes } = prevState;
            const isAlreadySelected = employmentTypes.includes(value);

            return {
                employmentTypes: isAlreadySelected
                    ? employmentTypes.filter(type => type !== value)
                    : [...employmentTypes, value],
            };
        }, this.getJobs);
    };

    onSalaryRangeChange = event => {
        this.setState({ minimumPackage: event.target.value }, this.getJobs);
    };

    renderLoader = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
        </div>
    );

    renderJobsList = () => {
        const { jobsData } = this.state;
        return (
            <ul className="jobs-list">
                {jobsData.map(job => (
                    <JobItem key={job.id} job={job} />
                ))}
            </ul>
        );
    };

    renderNoJobsView = () => (
        <div className="no-jobs-container">
            <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs" className="no-jobs-img" />
            <p className="no-jobs-text">No Jobs Found</p>
        </div>
    );

    renderFailureView = () => (
        <div className="failure-container">
            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" className="failure-img" />
            <p className="failure-text">Oops! Something Went Wrong</p>
            <button type="button" className="retry-button" onClick={this.onRetry}>Retry</button>
        </div>
    );

    renderJobContent = () => {
        const { apiStatus } = this.state;

        switch (apiStatus) {
            case apiStatusConstants.loading:
                return this.renderLoader();
            case apiStatusConstants.success:
                return this.renderJobsList();
            case apiStatusConstants.failure:
                return this.renderFailureView();
            case apiStatusConstants.noJobs:
                return this.renderNoJobsView();
            default:
                return null;
        }
    };

    render() {
        const { searchQuery } = this.state;
        const { employmentTypesList, salaryRangesList } = this.props;

        return (
            <>
                <Header />
                <div className="jobs-container">
                    <div className="left-column">
                        <Profile />
                        <hr />
                        <div className="filters-container">
                            <div className="filter-group">
                                <p className="filter-label">Type of Employment</p>
                                {employmentTypesList.map(type => (
                                    <div key={type.employmentTypeId}>
                                        <input
                                            type="checkbox"
                                            id={type.employmentTypeId}
                                            value={type.employmentTypeId}
                                            onChange={this.onEmploymentTypeChange}
                                        />
                                        <label htmlFor={type.employmentTypeId}>{type.label}</label>
                                    </div>
                                ))}
                            </div>
                            <br />
                            <div className="filter-group">
                                <p className="filter-label">Salary Range</p>
                                {salaryRangesList.map(range => (
                                    <div key={range.salaryRangeId}>
                                        <input
                                            type="radio"
                                            id={range.salaryRangeId}
                                            name="salary"
                                            value={range.salaryRangeId}
                                            onChange={this.onSalaryRangeChange}
                                        />
                                        <label htmlFor={range.salaryRangeId}>{range.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={this.onSearchChange}
                                className="search-input"
                            />
                            <button type="button" className="search-button" data-testid="searchButton" onClick={this.onSearchSubmit}>
                                <BsSearch />
                            </button>
                        </div>
                        {this.renderJobContent()}
                    </div>
                </div>
            </>
        );
    }
}

export default Jobs;
