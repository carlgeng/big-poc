import React, { useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import { useAuth } from '@/hooks/useAuth';  
import Layout from '@/components/common/Layout';  

const LoginPage = () => {  
  const [formData, setFormData] = useState({  
    email: '',  
    password: '',  
    rememberMe: false,  
  });  
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(false);  

  const { login } = useAuth();  
  const navigate = useNavigate();  

  const handleChange = (e) => {  
    const { name, value, type, checked } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: type === 'checkbox' ? checked : value,  
    }));  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setError('');  
    
    if (!formData.email || !formData.password) {  
      setError('请输入邮箱和密码');  
      return;  
    }  

    try {  
      setLoading(true);  
      await login(formData.email, formData.password, formData.rememberMe);  
      navigate('/dashboard');  
    } catch (err) {  
      setError(err.message || '登录失败，请检查账号和密码');  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <Layout>  
      <div className="flex justify-center py-12">  
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">  
          <div className="text-center">  
            <h2 className="text-3xl font-bold text-gray-900">登录您的账号</h2>  
            <p className="mt-2 text-gray-600">  
              欢迎回来！请登录您的账号继续访问平台。  
            </p>  
          </div>  

          {error && (  
            <div className="bg-red-50 text-red-600 p-4 rounded-md">  
              {error}  
            </div>  
          )}  

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>  
            <div>  
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">  
                邮箱地址  
              </label>  
              <input  
                id="email"  
                name="email"  
                type="email"  
                autoComplete="email"  
                required  
                value={formData.email}  
                onChange={handleChange}  
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"  
                placeholder="您的邮箱地址"  
              />  
            </div>  

            <div>  
              <div className="flex justify-between items-center">  
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">  
                  密码  
                </label>  
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">  
                  忘记密码？  
                </Link>  
              </div>  
              <input  
                id="password"  
                name="password"  
                type="password"  
                autoComplete="current-password"  
                required  
                value={formData.password}  
                onChange={handleChange}  
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"  
                placeholder="您的密码"  
              />  
            </div>  

            <div className="flex items-center">  
              <input  
                id="rememberMe"  
                name="rememberMe"  
                type="checkbox"  
                checked={formData.rememberMe}  
                onChange={handleChange}  
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"  
              />  
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">  
                保持登录状态  
              </label>  
            </div>  

            <div>  
              <button  
                type="submit"  
                disabled={loading}  
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none ${  
                  loading ? 'opacity-70 cursor-not-allowed' : ''  
                }`}  
              >  
                {loading ? '登录中...' : '登录'}  
              </button>  
            </div>  
          </form>  

          <div className="text-center pt-4 border-t border-gray-200">  
            <p className="text-sm text-gray-600">  
              还没有账号？{' '}  
              <Link to="/register" className="text-primary hover:text-primary-dark font-medium">  
                立即注册  
              </Link>  
            </p>  
          </div>  
        </div>  
      </div>  
    </Layout>  
  );  
};  

export default LoginPage;