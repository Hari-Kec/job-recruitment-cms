import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/applications';
import ApplicationList from '../../components/applications/ApplicationList';
import { toast } from 'react-hot-toast';

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get('/api/applications');
        setApplications(data.data);
      } catch (error) {
        toast.error('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/api/applications/${id}/status`, { status });
      setApplications(applications.map(app => 
        app._id === id ? { ...app, status } : app
      ));
      toast.success('Application status updated');
    } catch (error) {
      toast.error('Failed to update application');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.role === 'candidate' ? 'My Applications' : 'Job Applications'}
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <ApplicationList 
          applications={applications} 
          role={user?.role}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default Applications;