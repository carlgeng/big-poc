import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import InnovationCard from '@/components/innovations/InnovationCard';
import VerificationWidget from '@/components/blockchain/VerificationWidget';
import { useApi } from '@/hooks/useApi';

const InnovationDetailPage = () => {
  const { id } = useParams();
  const { fetchData } = useApi();
  const [innovation, setInnovation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInnovation = async () => {
      try {
        const data = await fetchData(`/innovations/${id}`);
        setInnovation(data);
      } catch (err) {
        setError('无法加载创新方案详情');
      } finally {
        setLoading(false);
      }
    };
    loadInnovation();
  }, [id, fetchData]);

  if (loading) return <Layout><div className="text-center py-10">加载中...</div></Layout>;
  if (error) return <Layout><div className="text-center text-red-500 py-10">{error}</div></Layout>;
  if (!innovation) return <Layout><div className="text-center py-10">方案不存在</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/innovations" className="text-primary hover:underline mb-4 inline-block">
          ← 返回方案列表
        </Link>
        <div className="max-w-3xl mx-auto">
          <InnovationCard innovation={innovation} />
          <div className="mt-6">
            <VerificationWidget recordType="innovation" recordId={id} title={innovation.title} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InnovationDetailPage;