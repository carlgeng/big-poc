import React from 'react';  
import { Link, useLocation } from 'react-router-dom';  
import { useAuth } from '@/hooks/useAuth';  

const Sidebar = () => {  
  const location = useLocation();  
  const { user } = useAuth();  

  const isActive = (path) => location.pathname === path;  

  const navItems = [  
    {   
      path: '/dashboard',   
      label: '控制面板',   
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'   
    },  
    {   
      path: '/needs',   
      label: '临床需求',   
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'   
    },  
    {   
      path: '/innovations',   
      label: '创新方案',   
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'   
    },  
    {   
      path: '/voting',   
      label: '评选投票',   
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'   
    },  
    {   
      path: '/yearbook',   
      label: '年度报告',   
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'   
    },  
    {   
      path: '/events',   
      label: '活动管理',   
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'   
    },  
  ];  

  // 只有管理员可见的选项  
  const adminNavItems = [  
    {   
      path: '/admin/users',   
      label: '用户管理',   
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'   
    },  
    {   
      path: '/admin/blockchain',   
      label: '区块链状态',   
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'   
    },  
  ];  

  return (  
    <aside className="fixed hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 pt-6">  
      <div className="px-6 pb-6 border-b">  
        <div className="flex items-center space-x-3">  
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium text-lg">  
            {user?.name?.charAt(0) || 'U'}  
          </div>  
          <div>  
            <p className="font-medium text-gray-800">{user?.name || '用户'}</p>  
            <p className="text-sm text-gray-500">{user?.organization || '组织'}</p>  
          </div>  
        </div>  
      </div>  

      <nav className="flex-1 overflow-y-auto px-4 pt-6">  
        <ul className="space-y-1">  
          {navItems.map((item) => (  
            <li key={item.path}>  
              <Link  
                to={item.path}  
                className={`flex items-center space-x-2 p-3 rounded-md ${  
                  isActive(item.path)  
                    ? 'bg-primary-light/10 text-primary'  
                    : 'text-gray-700 hover:bg-gray-100'  
                }`}  
              >  
                <svg   
                  className="h-5 w-5"   
                  fill="none"   
                  viewBox="0 0 24 24"   
                  stroke="currentColor"  
                >  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />  
                </svg>  
                <span>{item.label}</span>  
              </Link>  
            </li>  
          ))}  
        </ul>  

        {user?.role === 'admin' && (  
          <>  
            <div className="my-4 border-t border-gray-200"></div>  
            <p className="text-xs uppercase text-gray-500 font-medium px-3 mb-2">管理员功能</p>  
            <ul className="space-y-1">  
              {adminNavItems.map((item) => (  
                <li key={item.path}>  
                  <Link  
                    to={item.path}  
                    className={`flex items-center space-x-2 p-3 rounded-md ${  
                      isActive(item.path)  
                        ? 'bg-primary-light/10 text-primary'  
                        : 'text-gray-700 hover:bg-gray-100'  
                    }`}  
                  >  
                    <svg   
                      className="h-5 w-5"   
                      fill="none"   
                      viewBox="0 0 24 24"   
                      stroke="currentColor"  
                    >  
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />  
                    </svg>  
                    <span>{item.label}</span>  
                  </Link>  
                </li>  
              ))}  
            </ul>  
          </>  
        )}  
      </nav>  

      <div className="p-4 border-t border-gray-200">  
        <div className="flex items-center space-x-2 text-sm">  
          <div className="flex items-center space-x-1 text-green-600">  
            <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>  
            <span>区块链已连接</span>  
          </div>  
          <Link to="/blockchain/status" className="text-primary hover:underline ml-auto">  
            查看状态  
          </Link>  
        </div>  
      </div>  
    </aside>  
  );  
};  

export default Sidebar;