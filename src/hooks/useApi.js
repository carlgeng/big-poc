import { useState, useCallback } from 'react';  
import api from '@/services/api';  

export const useApi = () => {  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  

  const fetchData = useCallback(async (url) => {  
    try {  
      setLoading(true);  
      setError(null);  
      const data = await api.get(url);  
      return data;  
    } catch (err) {  
      setError(err.message || '请求数据失败');  
      throw err;  
    } finally {  
      setLoading(false);  
    }  
  }, []);  

  const postData = useCallback(async (url, payload) => {  
    try {  
      setLoading(true);  
      setError(null);  
      const data = await api.post(url, payload);  
      return data;  
    } catch (err) {  
      setError(err.message || '提交数据失败');  
      throw err;  
    } finally {  
      setLoading(false);  
    }  
  }, []);  

  const putData = useCallback(async (url, payload) => {  
    try {  
      setLoading(true);  
      setError(null);  
      const data = await api.put(url, payload);  
      return data;  
    } catch (err) {  
      setError(err.message || '更新数据失败');  
      throw err;  
    } finally {  
      setLoading(false);  
    }  
  }, []);  

  const deleteData = useCallback(async (url) => {  
    try {  
      setLoading(true);  
      setError(null);  
      const data = await api.delete(url);  
      return data;  
    } catch (err) {  
      setError(err.message || '删除数据失败');  
      throw err;  
    } finally {  
      setLoading(false);  
    }  
  }, []);  

  const uploadFile = useCallback(async (url, formData) => {  
    try {  
      setLoading(true);  
      setError(null);  
      const data = await api.upload(url, formData);  
      return data;  
    } catch (err) {  
      setError(err.message || '上传文件失败');  
      throw err;  
    } finally {  
      setLoading(false);  
    }  
  }, []);  

  return {  
    loading,  
    error,  
    fetchData,  
    postData,  
    putData,  
    deleteData,  
    uploadFile,  
  };  
};  

export default useApi;