import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert  from '../ui/Alert';

const RegisterForm = ({ onSubmit, isLoading, error }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: 'candidate' // default role
      });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            minLength="6"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="passwordConfirm" className="block text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            minLength="6"
          />
        </div>
        <input
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Full Name"
    required
  />
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
  >
    <option value="candidate">Candidate</option>
    <option value="recruiter">Recruiter</option>
  </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;