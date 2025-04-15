import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">抱歉，页面不存在</p>
        <Link to="/" className="btn-primary">
          返回首页
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;