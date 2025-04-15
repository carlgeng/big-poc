import React, { useState, useEffect } from 'react';  
import { useBlockchain } from '@/hooks/useBlockchain';  

const VerificationWidget = ({ recordType, recordId, title }) => {  
  const { getBlockchainRecord, verifyRecord } = useBlockchain();  
  const [record, setRecord] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [verificationResult, setVerificationResult] = useState(null);  
  const [isVerifying, setIsVerifying] = useState(false);  
  const [isExpanded, setIsExpanded] = useState(false);  

  useEffect(() => {  
    const fetchRecord = async () => {  
      try {  
        setLoading(true);  
        const data = await getBlockchainRecord(recordType, recordId);  
        setRecord(data);  
        setError(null);  
      } catch (err) {  
        setError('无法获取区块链记录');  
        console.error(err);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchRecord();  
  }, [recordType, recordId, getBlockchainRecord]);  

  const handleVerify = async () => {  
    try {  
      setIsVerifying(true);  
      const result = await verifyRecord(recordType, recordId);  
      setVerificationResult(result);  
    } catch (err) {  
      setError('验证过程中出错');  
      console.error(err);  
    } finally {  
      setIsVerifying(false);  
    }  
  };  

  const formatTimestamp = (timestamp) => {  
    return new Date(timestamp).toLocaleString('zh-CN', {  
      year: 'numeric',  
      month: '2-digit',  
      day: '2-digit',  
      hour: '2-digit',  
      minute: '2-digit',  
      second: '2-digit'  
    });  
  };  

  return (  
    <div className="bg-white rounded-lg shadow overflow-hidden">  
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">  
        <div className="flex items-center">  
          <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />  
          </svg>  
          <h3 className="font-medium text-gray-900">区块链验证</h3>  
        </div>  
        <button  
          onClick={() => setIsExpanded(!isExpanded)}  
          className="text-gray-500 hover:text-gray-700 focus:outline-none"  
        >  
          <svg   
            className={`w-5 h-5 transform ${isExpanded ? 'rotate-180' : ''}`}   
            fill="none"   
            viewBox="0 0 24 24"   
            stroke="currentColor"  
          >  
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />  
          </svg>  
        </button>  
      </div>  
      
      {isExpanded && (  
        <div className="p-4">  
          {loading ? (  
            <div className="flex justify-center py-4">  
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">  
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>  
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>  
              </svg>  
            </div>  
          ) : error ? (  
            <div className="text-red-500 text-center py-4">  
              {error}  
            </div>  
          ) : record ? (  
            <div className="space-y-4">  
              <div className="grid grid-cols-2 gap-4 text-sm">  
                <div>  
                  <p className="text-gray-500">记录类型</p>  
                  <p className="font-medium">{recordType === 'need' ? '临床需求' : recordType === 'innovation' ? '创新方案' : recordType === 'vote' ? '投票' : '记录'}</p>  
                </div>  
                <div>  
                  <p className="text-gray-500">链上存储时间</p>  
                  <p className="font-medium">{formatTimestamp(record.timestamp)}</p>  
                </div>  
                <div>  
                  <p className="text-gray-500">区块高度</p>  
                  <p className="font-medium">{record.blockHeight}</p>  
                </div>  
                <div>  
                  <p className="text-gray-500">交易哈希</p>  
                  <p className="font-medium truncate">{record.transactionHash}</p>  
                </div>  
              </div>  
              
              <div className="pt-2">  
                <button  
                  onClick={handleVerify}  
                  disabled={isVerifying}  
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none ${isVerifying ? 'opacity-70 cursor-not-allowed' : ''}`}  
                >  
                  {isVerifying ? (  
                    <>  
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">  
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>  
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>  
                      </svg>  
                      验证中...  
                    </>  
                  ) : '验证数据真实性'}  
                </button>  
              </div>  
              
              {verificationResult && (  
                <div className={`mt-4 p-3 rounded-md ${verificationResult.verified ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>  
                  <div className="flex">  
                    {verificationResult.verified ? (  
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />  
                      </svg>  
                    ) : (  
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />  
                      </svg>  
                    )}  
                    <span className="font-medium">  
                      {verificationResult.verified ? '数据验证成功！' : '数据验证失败！'}  
                    </span>  
                  </div>  
                  <p className="text-sm mt-1">{verificationResult.message}</p>  
                </div>  
              )}  
            </div>  
          ) : (  
            <div className="text-center py-4 text-gray-500">  
              该记录尚未上链  
            </div>  
          )}  
        </div>  
      )}  
      
      {!isExpanded && record && (  
        <div className="px-4 py-2 flex items-center text-sm">  
          <span className="inline-flex items-center text-green-600 mr-2">  
            <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>  
            已上链  
          </span>  
          <span className="text-gray-500">  
            {formatTimestamp(record.timestamp)}  
          </span>  
        </div>  
      )}  
    </div>  
  );  
};  

export default VerificationWidget;