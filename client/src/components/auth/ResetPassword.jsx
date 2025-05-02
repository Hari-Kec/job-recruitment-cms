import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert } from '../../components/ui';

const ResetPassword = ({ onSubmit, isLoading, error, success }) => {
  const { resetToken } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, resetToken });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            New Password
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
            Confirm New Password
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;