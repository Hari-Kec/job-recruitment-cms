import React, { useState, useContext } from 'react';

import Loading from '../../components/ui/Loading';
import Alert from '../../components/ui/Alert';
import { AuthContext } from '../../context/AuthContext';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Settings saved successfully!');
    } catch (err) {
      setError('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      
      <form onSubmit={handleSave} className="max-w-lg">
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="mr-2"
            />
            <span>Enable Notifications</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="mr-2"
            />
            <span>Dark Mode</span>
          </label>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Account Actions</h2>
          <button
            type="button"
            onClick={logout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? <Loading size="small" /> : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default Settings;