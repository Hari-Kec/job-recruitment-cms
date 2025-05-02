import api from './auth';

export const getJobs = async () => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJob = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createJob = async (jobData, token) => {
  try {
    const response = await api.post('/jobs', jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateJob = async (id, jobData, token) => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (id, token) => {
  try {
    const response = await api.delete(`/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};