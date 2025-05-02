import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../components/ui';

const ForgotPassword = ({ onSubmit, isLoading, error, success }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;