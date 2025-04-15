import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import NeedCard from '@/components/needs/NeedCard';
import VerificationWidget from '@/components/blockchain/VerificationWidget';
import { useApi } from '@/hooks/useApi';

const NeedDetailPage = () => {
  const { id } = useParams();
  const { fetchData } = useApi();
  const [need, setNeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNeed = async () => {
      try {
        const data = await fetchData(`/needs/${id}`);
        setNeed(data);
      } catch (err) {
        setError('无法加载需求详情');
      } finally {
        setLoading(false);
      }
    };
    loadNeed();
  }, [id, fetchData]);

  if (loading) return <Layout><div className="text-center py-10">加载中...</div></Layout>;
  if (error) return <Layout><div className="text-center text-red-500 py-10">{error}</div></Layout>;
  if (!need) return <Layout><div className="text-center py-10">需求不存在</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/needs" className="text-primary hover:underline mb-4 inline-block">
          ← 返回需求列表
        </Link>
        <div className="max-w-3xl mx-auto">
          <NeedCard need={need} />
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">详细信息</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">临床影响</h3>
                <p className="text-gray-600">{need.impact || '未提供'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">当前解决方案</h3>
                <p className="text-gray-600">{need.currentSolution || '未提供'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">期望结果</h3>
                <p className="text-gray-600">{need.desiredOutcome || '未提供'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">目标人群</h3>
                <p className="text-gray-600">{need.targetPopulation || '未提供'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">可用资源</h3>
                <p className="text-gray-600">{need.resources || '未提供'}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <VerificationWidget recordType="need" recordId={id} title={need.title} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NeedDetailPage;