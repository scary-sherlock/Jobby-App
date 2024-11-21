import React from 'react'
import { FaStar, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './index.css'

class JobItem extends React.Component {
    render() {
        const { job } = this.props
        const { companyLogoUrl, title, rating, location, employmentType, packagePerAnnum, jobDescription } = job

        return (
            <Link to={`/jobs/${job.id}`} className="job-item-link">
                <li className="job-item-container">
                    <div className="job-item-header">
                        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
                        <div className="job-item-title-rating">
                            <h3 className="job-title">{title}</h3>
                            <div className="job-rating">
                                <FaStar className="star-icon" />
                                <span>{rating}</span>
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
                    <hr />

                    <p className="job-description">{jobDescription}</p>
                </li>
            </Link>
        )
    }
}

export default JobItem
