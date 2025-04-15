import React, { createContext, useState } from 'react';  
import {   
  getRecord,   
  verifyData,   
  getTransactionHistory,  
  getBlockchainStatus  
} from '@/services/blockchain';  

export const BlockchainContext = createContext();  

export const BlockchainProvider = ({ children }) => {  
  const [status, setStatus] = useState({  
    connected: false,  
    blockHeight: 0,  
    lastBlockTime: null,  
    peerCount: 0,  
    loading: true,  
  });  

  const getBlockchainRecord = async (recordType, recordId) => {  
    try {  
      return await getRecord(recordType, recordId);  
    } catch (error) {  
      console.error(`Failed to get blockchain record: ${error.message}`);  
      throw error;  
    }  
  };  

  const verifyRecord = async (recordType, recordId) => {  
    try {  
      return await verifyData(recordType, recordId);  
    } catch (error) {  
      console.error(`Failed to verify record: ${error.message}`);  
      throw error;  
    }  
  };  

  const getHistory = async (params) => {  
    try {  
      return await getTransactionHistory(params);  
    } catch (error) {  
      console.error(`Failed to get transaction history: ${error.message}`);  
      throw error;  
    }  
  };  

  const fetchBlockchainStatus = async () => {  
    try {  
      setStatus(prev => ({ ...prev, loading: true }));  
      const data = await getBlockchainStatus();  
      setStatus({  
        connected: data.connected,  
        blockHeight: data.blockHeight,  
        lastBlockTime: data.lastBlockTime,  
        peerCount: data.peerCount,  
        loading: false,  
      });  
      return data;  
    } catch (error) {  
      console.error(`Failed to get blockchain status: ${error.message}`);  
      setStatus(prev => ({   
        ...prev,   
        connected: false,  
        loading: false   
      }));  
      throw error;  
    }  
  };  

  const value = {  
    status,  
    getBlockchainRecord,  
    verifyRecord,  
    getTransactionHistory: getHistory,  
    fetchBlockchainStatus,  
  };  

  return (  
    <BlockchainContext.Provider value={value}>  
      {children}  
    </BlockchainContext.Provider>  
  );  
};