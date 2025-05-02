import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helper';

const JobItem = ({ job, showActions = false, onDelete }) => {
  const getTypeBadge = () => {
    const typeClasses = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      contract: 'bg-purple-100 text-purple-800',
      internship: 'bg-yellow-100 text-yellow-800',
      remote: 'bg-gray-100 text-gray-800',
    };

    return (
      <span
        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
          typeClasses[job.type] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {job.title}
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-gray-600 mr-2">{job.company?.name}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 ml-2">{job.location}</span>
          </div>
        </div>
        <div className="flex items-center">
          {getTypeBadge()}
          {job.salary && (
            <span className="ml-2 text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
              {job.salary}
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 text-gray-600 line-clamp-2">
        {job.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Posted: {formatDate(job.createdAt)}
        </div>

        {showActions && (
          <div className="space-x-2">
            <Link
              to={`/dashboard/jobs/edit/${job._id}`}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(job._id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        )}

        {!showActions && (
          <Link
            to={`/jobs/${job._id}`}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  onDelete: PropTypes.func,
};

JobItem.defaultProps = {
  showActions: false,
  onDelete: () => {},
};

export default JobItem;