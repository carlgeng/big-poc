import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import NeedForm from '@/components/needs/NeedForm';

const CreateNeedPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">提交新的临床需求</h1>
        <NeedForm
          onCancel={() => navigate('/needs')}
        />
      </div>
    </Layout>
  );
};

export default CreateNeedPage;