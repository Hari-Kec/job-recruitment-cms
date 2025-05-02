import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../ui/Loading';
import Alert from '../ui/Alert';
import { formatDate } from '../../utils/helper';

const ApplicationList = ({ applications, isLoading, error, onDelete }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No applications found.</p>
        <Link
          to="/dashboard/jobs"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Browse jobs
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      applied: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-purple-100 text-purple-800',
      interviewed: 'bg-yellow-100 text-yellow-800',
      offered: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
          statusClasses[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Job Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Applied Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {application.job?.title || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.job?.type || ''}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {application.job?.company?.name || 'N/A'}
                </div>
                <div className="text-sm text-gray-500">
                  {application.job?.location || ''}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(application.appliedDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(application.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  to={`/dashboard/applications/${application._id}`}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  View
                </Link>
                <button
                  onClick={() => onDelete(application._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ApplicationList.propTypes = {
  applications: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

ApplicationList.defaultProps = {
  isLoading: false,
  error: null,
};

export default ApplicationList;