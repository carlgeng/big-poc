import React, { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import { useApi } from '@/hooks/useApi';

const YearbookPage = () => {
  const { fetchData } = useApi();
  const [yearbooks, setYearbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadYearbooks = async () => {
      try {
        const data = await fetchData('/yearbooks');
        setYearbooks(data);
      } catch (err) {
        setError('无法加载年鉴数据');
      } finally {
        setLoading(false);
      }
    };
    loadYearbooks();
  }, [fetchData]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">年度报告</h1>
        {loading ? (
          <div className="text-center py-10">加载中...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : yearbooks.length === 0 ? (
          <div className="text-center py-10">暂无年鉴</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yearbooks.map(yearbook => (
              <div key={yearbook.id} className="card p-6">
                <h3 className="text-xl font-semibold mb-2">{yearbook.title}</h3>
                <p className="text-gray-600 mb-4">{yearbook.description}</p>
                <a href={yearbook.pdfUrl} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  下载年鉴
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default YearbookPage;