import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import InnovationForm from '@/components/innovations/InnovationForm';

const CreateInnovationPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">提交新的创新方案</h1>
        <InnovationForm
          onCancel={() => navigate('/innovations')}
        />
      </div>
    </Layout>
  );
};

export default CreateInnovationPage;