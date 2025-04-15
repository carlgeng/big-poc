import React from 'react';
import { useBlockchain } from '@/hooks/useBlockchain';

const BlockchainStatus = () => {
  const { status, loading, error } = useBlockchain();

  if (loading) {
    return <div className="text-center">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">区块链状态</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">连接状态</p>
          <p className={`font-medium ${status.connected ? 'text-green-600' : 'text-red-600'}`}>
            {status.connected ? '已连接' : '未连接'}
          </p>
        </div>
        <div>
          <p className="text-gray-600">当前区块高度</p>
          <p className="font-medium">{status.blockHeight || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600">最后区块时间</p>
          <p className="font-medium">
            {status.lastBlockTime
              ? new Date(status.lastBlockTime).toLocaleString('zh-CN')
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-gray-600">节点数量</p>
          <p className="font-medium">{status.peerCount || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default BlockchainStatus;