import api from './auth';

export const getCompanies = async () => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompany = async (id) => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCompany = async (companyData, token) => {
  try {
    const response = await api.post('/companies', companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (id, companyData, token) => {
  try {
    const response = await api.put(`/companies/${id}`, companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCompany = async (id, token) => {
  try {
    const response = await api.delete(`/companies/${id}`, {
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
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};