import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  Alert from '../../components/ui/Alert';
import Loading from '../../components/ui/Loading';
import { createJob, updateJob, getJob } from '../../api/jobs';
import { getCompanies } from '../../api/companies';
import { useAuth } from '../../context/AuthContext';

const JobForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    company: '',
    type: 'full-time',
    requirements: ''
  });
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoadingCompanies(true);
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch companies');
      } finally {
        setIsLoadingCompanies(false);
      }
    };

    const fetchJob = async () => {
      if (!isEditMode) return;
      setIsLoading(true);
      try {
        const job = await getJob(id);
        setFormData({
          title: job.title,
          description: job.description,
          location: job.location,
          salary: job.salary,
          company: job.company._id,
          type: job.type,
          requirements: job.requirements.join('\n')
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
    if (isEditMode) fetchJob();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(req => req.trim() !== '')
      };

      if (isEditMode) {
        await updateJob(id, jobData, user.token);
        setSuccess('Job updated successfully!');
      } else {
        await createJob(jobData, user.token);
        setSuccess('Job created successfully!');
      }

      setTimeout(() => {
        navigate('/dashboard/jobs');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} job`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Job' : 'Create Job'}
      </h1>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="salary">
            Salary
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="company">
            Company
          </label>
          <select
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            disabled={isLoadingCompanies}
          >
            <option value="">Select a company</option>
            {companies.map(company => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="type">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="requirements">
            Requirements (one per line)
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading || isLoadingCompanies}
        >
          {isLoading ? <Loading size="small" /> : isEditMode ? 'Update Job' : 'Create Job'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;