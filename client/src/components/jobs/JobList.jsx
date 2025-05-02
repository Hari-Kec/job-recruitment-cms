import React from 'react';
import PropTypes from 'prop-types';
import JobItem from './JobItem';
import  Alert from '../ui/Alert';
import Loading from '../ui/Loading';

const JobList = ({ jobs, isLoading, error, showActions = false, onDelete }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No jobs found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobItem
          key={job._id}
          job={job}
          showActions={showActions}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  showActions: PropTypes.bool,
  onDelete: PropTypes.func,
};

JobList.defaultProps = {
  isLoading: false,
  error: null,
  showActions: false,
  onDelete: () => {},
};

export default JobList;