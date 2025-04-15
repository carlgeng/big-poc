import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import NeedForm from '@/components/needs/NeedForm';
import { useApi } from '@/hooks/useApi';

const EditNeedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        setError('无法加载需求数据');
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
        <h1 className="text-2xl font-bold mb-6">编辑临床需求</h1>
        <NeedForm
          initialData={need}
          onCancel={() => navigate(`/needs/${id}`)}
        />
      </div>
    </Layout>
  );
};

export default EditNeedPage;