import React, { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import { useApi } from '@/hooks/useApi';

const AdminUsersPage = () => {
  const { fetchData, deleteData } = useApi();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchData('/admin/users');
        setUsers(data);
      } catch (err) {
        setError('无法加载用户列表');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [fetchData]);

  const handleDelete = async (userId) => {
    if (window.confirm('确定要删除此用户吗？')) {
      try {
        await deleteData(`/admin/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError('删除用户失败');
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">用户管理</h1>
        {loading ? (
          <div className="text-center py-10">加载中...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">邮箱</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">组织</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">角色</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.organization || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminUsersPage;