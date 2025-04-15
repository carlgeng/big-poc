import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { putData } = useApi();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    organization: user?.organization || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await putData('/profile', formData);
      updateProfile(formData);
      alert('资料更新成功');
    } catch (err) {
      setError('更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">个人资料</h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">姓名</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700">组织</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                disabled
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? '保存中...' : '保存更改'}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-secondary"
              >
                退出登录
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;