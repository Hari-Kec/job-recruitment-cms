import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/jobs';
import { toast } from 'react-hot-toast';

const JobForm = ({ job, companies }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: job?.title || '',
    description: job?.description || '',
    requirements: job?.requirements || [],
    skillsRequired: job?.skillsRequired || [],
    location: job?.location || '',
    type: job?.type || 'full-time',
    salary: job?.salary || { min: '', max: '', currency: 'USD' },
    company: job?.company || '',
    status: job?.status || 'open',
    deadline: job?.deadline || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.split(',') });
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      salary: { ...formData.salary, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (job) {
        await api.put(`/api/jobs/${job._id}`, formData);
        toast.success('Job updated successfully');
      } else {
        await api.post('/api/jobs', formData);
        toast.success('Job created successfully');
      }
      navigate('/dashboard/jobs');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements (comma separated)
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={2}
            value={formData.requirements.join(',')}
            onChange={handleArrayChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700">
            Skills Required (comma separated)
          </label>
          <textarea
            id="skillsRequired"
            name="skillsRequired"
            rows={2}
            value={formData.skillsRequired.join(',')}
            onChange={handleArrayChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700">
            Min Salary
          </label>
          <input
            type="number"
            name="min"
            id="minSalary"
            value={formData.salary.min}
            onChange={handleSalaryChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">
            Max Salary
          </label>
          <input
            type="number"
            name="max"
            id="maxSalary"
            value={formData.salary.max}
            onChange={handleSalaryChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.salary.currency}
            onChange={handleSalaryChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <select
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/dashboard/jobs')}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default JobForm;