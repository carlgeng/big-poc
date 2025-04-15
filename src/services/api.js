import { getStoredToken } from './storage';  

const BASE_URL = '/api';  

async function handleResponse(response) {  
  const contentType = response.headers.get('content-type');  
  const isJson = contentType && contentType.includes('application/json');  
  
  const data = isJson ? await response.json() : await response.text();  
  
  if (!response.ok) {  
    const error = (data && data.message) || response.statusText;  
    throw new Error(error);  
  }  
  
  return data;  
}  

async function fetchWithAuth(url, options = {}) {  
  const token = getStoredToken();  
  
  const headers = {  
    'Content-Type': 'application/json',  
    ...options.headers,  
  };  
  
  if (token) {  
    headers['Authorization'] = `Bearer ${token}`;  
  }  
  
  const config = {  
    ...options,  
    headers,  
  };  
  
  try {  
    const response = await fetch(url, config);  
    return await handleResponse(response);  
  } catch (error) {  
    console.error('API request failed:', error);  
    throw error;  
  }  
}  

export const api = {  
  get: (endpoint) => {  
    return fetchWithAuth(`${BASE_URL}${endpoint}`, {  
      method: 'GET',  
    });  
  },  
  
  post: (endpoint, data) => {  
    return fetchWithAuth(`${BASE_URL}${endpoint}`, {  
      method: 'POST',  
      body: JSON.stringify(data),  
    });  
  },  
  
  put: (endpoint, data) => {  
    return fetchWithAuth(`${BASE_URL}${endpoint}`, {  
      method: 'PUT',  
      body: JSON.stringify(data),  
    });  
  },  
  
  delete: (endpoint) => {  
    return fetchWithAuth(`${BASE_URL}${endpoint}`, {  
      method: 'DELETE',  
    });  
  },  
  
  patch: (endpoint, data) => {  
    return fetchWithAuth(`${BASE_URL}${endpoint}`, {  
      method: 'PATCH',  
      body: JSON.stringify(data),  
    });  
  },  
  
  // 特殊请求，例如文件上传  
  upload: (endpoint, formData) => {  
    const token = getStoredToken();  
    
    const headers = {};  
    if (token) {  
      headers['Authorization'] = `Bearer ${token}`;  
    }  
    
    return fetchWithAuth(`${BASE_URL}${endpoint}`, {  
      method: 'POST',  
      headers,  
      body: formData,  
    });  
  },  
};  

export default api;