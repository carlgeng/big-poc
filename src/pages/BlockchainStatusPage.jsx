import React, { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import { useBlockchain } from '@/hooks/useBlockchain';

const BlockchainStatusPage = () => {
  const { status, fetchBlockchainStatus } = useBlockchain();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlockchainStatus().catch(err => setError('无法获取区块链状态'));
  }, [fetchBlockchainStatus]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">区块链状态</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          {status.loading ? (
            <div className="text-center">加载中...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">连接状态</p>
                <p className={`font-medium ${status.connected ? 'text-green-600' : 'text-red-600'}`}>
                  {status.connected ? '已连接' : '未连接'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">当前区块高度</p>
                <p className="font-medium">{status.blockHeight}</p>
              </div>
              <div>
                <p className="text-gray-600">最后区块时间</p>
                <p className="font-medium">
                  {status.lastBlockTime ? new Date(status.lastBlockTime).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">节点数量</p>
                <p className="font-medium">{status.peerCount}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlockchainStatusPage;