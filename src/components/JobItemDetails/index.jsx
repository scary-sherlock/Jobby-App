import React, { Component } from 'react'
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
    state = {
        jobDetails: null,
        similarJobs: [],
        isLoading: true,
        isError: false,
    }

    componentDidMount() {
        this.fetchJobDetails()
    }

    fetchJobDetails = async () => {
        const { match } = this.props
        const jobId = match.params.id
        const url = `https://apis.ccbp.in/jobs/${jobId}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${document.cookie.replace('jwt_token=', '')}`,
            },
        }

        this.setState({ isLoading: true, isError: false })

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                const jobDetails = {
                    companyLogoUrl: data.job_details.company_logo_url,
                    companyWebsiteUrl: data.job_details.company_website_url,
                    employmentType: data.job_details.employment_type,
                    id: data.job_details.id,
                    jobDescription: data.job_details.job_description,
                    skills: data.job_details.skills.map(skill => ({ name: skill.name, imageUrl: skill.image_url })),
                    lifeAtCompany: {
                        description: data.job_details.life_at_company.description,
                        imageUrl: data.job_details.life_at_company.image_url,
                    },
                    location: data.job_details.location,
                    packagePerAnnum: data.job_details.package_per_annum,
                    rating: data.job_details.rating,
                    title: data.job_details.title,
                }
                const similarJobs = data.similar_jobs.map(job =>
                ({
                    companyLogoUrl: job.company_logo_url,
                    employmentType: job.employment_type,
                    id: job.id,
                    jobDescription: job.job_description,
                    location: job.location,
                    rating: job.rating,
                    title: job.title,
                })
                )
                this.setState({
                    jobDetails: jobDetails,
                    similarJobs: similarJobs,
                    isLoading: false,
                })
            } else {
                this.setState({ isLoading: false, isError: true })
            }
        } catch (error) {
            this.setState({ isLoading: false, isError: true })
            throw error
        }
    }

    handleRetry = () => {
        this.fetchJobDetails()
    }

    render() {
        const { jobDetails, similarJobs, isLoading, isError } = this.state

        if (isLoading) {
            return (
                <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
                </div>)
        }

        if (isError) {
            return (
                <div className="error-container">
                    <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" />
                    <p>Something went wrong. Please try again.</p>
                    <button type="button" onClick={this.handleRetry} className="retry-button">
                        Retry
                    </button>
                </div>
            )
        }

        const { companyLogoUrl, companyWebsiteUrl, employmentType, jobDescription, skills, lifeAtCompany, location, packagePerAnnum, rating, title } = jobDetails

        return (
            <>
                <Header />
                <div className="job-details-container">
                    <div className="job-item-container">
                        <div className="job-item-header">
                            <img src={companyLogoUrl} alt="job details company logo" className="company-logo" />
                            <div className="job-item-title-rating">
                                <h3 className="job-title">{title}</h3>
                                <div className="rating-and-weblink">
                                    <div className="job-rating">
                                        <FaStar className="star-icon" />
                                        <span>{rating}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => window.open(companyWebsiteUrl, '_blank')}
                                        className="visit-button"
                                    >
                                        Visit <FaExternalLinkAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="job-details">
                            <div className="job-location">
                                <FaMapMarkerAlt className="icon" />
                                <span>{location}</span>
                            </div>
                            <div className="job-employment-type">
                                <FaBriefcase className="icon" />
                                <span>{employmentType}</span>
                            </div>
                            <div className="job-package">
                                <span>{packagePerAnnum}</span>
                            </div>
                        </div>
                        <p className="job-description">{jobDescription}</p>
                    </div>

                    <h3 className="section-title">Skills</h3>
                    <ul className="skills-list">
                        {skills.map(skill => (
                            <li key={skill.name} className="skill-item">
                                <img src={skill.imageUrl} alt={skill.name} className="skill-icon" />
                                <span>{skill.name}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="life-at-company">
                        <h3>Life at Company</h3>
                        <p>{lifeAtCompany.description}</p>
                        <img src={lifeAtCompany.imageUrl} alt="life at company" className="life-image" />
                    </div>

                    <h3 className="section-title">Similar Jobs</h3>
                    <ul className="similar-jobs-list">
                        {similarJobs.map(job => (
                            <li key={job.id} className="similar-job-item">
                                <img src={job.companyLogoUrl} alt="similar job company logo" className="company-logo" />
                                <h4 className="job-title">{job.title}</h4>
                                <div className="job-rating">
                                    <FaStar className="star-icon" />
                                    <span>{job.rating}</span>
                                </div>
                                <hr />
                                <h4>Description</h4>
                                <p className="job-description">{job.jobDescription}</p>
                                <div className="job-details">
                                    <div className="job-location">
                                        <FaMapMarkerAlt className="icon" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="job-employment-type">
                                        <FaBriefcase className="icon" />
                                        <span>{job.employmentType}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
}

export default JobItemDetails
