import api from './api';  

// 获取区块链上的记录  
export const getRecord = async (recordType, recordId) => {  
  try {  
    return await api.get(`/blockchain/records/${recordType}/${recordId}`);  
  } catch (error) {  
    if (error.message === 'Record not found') {  
      return null;  
    }  
    throw error;  
  }  
};  

// 验证区块链上的数据是否与当前系统数据一致  
export const verifyData = async (recordType, recordId) => {  
  try {  
    return await api.post(`/blockchain/verify`, { recordType, recordId });  
  } catch (error) {  
    console.error('Blockchain verification error:', error);  
    throw error;  
  }  
};  

// 获取交易历史  
export const getTransactionHistory = async (params = {}) => {  
  try {  
    const queryParams = new URLSearchParams();  
    
    if (params.page) queryParams.append('page', params.page);  
    if (params.limit) queryParams.append('limit', params.limit);  
    if (params.recordType) queryParams.append('recordType', params.recordType);  
    if (params.recordId) queryParams.append('recordId', params.recordId);  
    if (params.userId) queryParams.append('userId', params.userId);  
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';  
    
    return await api.get(`/blockchain/transactions${query}`);  
  } catch (error) {  
    console.error('Failed to fetch transaction history:', error);  
    throw error;  
  }  
};  

// 获取区块链状态  
export const getBlockchainStatus = async () => {  
  try {  
    return await api.get('/blockchain/status');  
  } catch (error) {  
    console.error('Failed to fetch blockchain status:', error);  
    throw error;  
  }  
};  

// 将记录上链（仅管理员或有权限的用户）  
export const publishToBlockchain = async (recordType, recordId) => {  
  try {  
    return await api.post('/blockchain/publish', {  
      recordType,  
      recordId  
    });  
  } catch (error) {  
    console.error('Failed to publish to blockchain:', error);  
    throw error;  
  }  
};  

export default {  
  getRecord,  
  verifyData,  
  getTransactionHistory,  
  getBlockchainStatus,  
  publishToBlockchain  
};