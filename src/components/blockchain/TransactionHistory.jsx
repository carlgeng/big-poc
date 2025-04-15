import React, { useEffect, useState } from 'react';
import { useBlockchain } from '@/hooks/useBlockchain';
import { Link } from 'react-router-dom';

const TransactionHistory = () => {
  const { fetchTransactions } = useBlockchain();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError('无法加载交易历史');
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, [fetchTransactions]);

  if (loading) {
    return <div className="text-center py-10">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">区块链交易历史</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-600">暂无交易记录</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  记录ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  交易哈希
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  区块高度
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  时间
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(tx => (
                <tr key={tx.transactionHash}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tx.type === 'need' ? '需求' : '方案'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/${tx.type}s/${tx.recordId}`}
                      className="text-primary hover:underline"
                    >
                      {tx.recordId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tx.transactionHash.slice(0, 10)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{tx.blockHeight}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(tx.timestamp).toLocaleString('zh-CN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;