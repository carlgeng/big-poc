import React, { useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import { useAuth } from '@/hooks/useAuth';  

const Header = () => {  
  const { user, logout, isAuthenticated } = useAuth();  
  const navigate = useNavigate();  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  

  const handleLogout = () => {  
    logout();  
    navigate('/login');  
  };  

  return (  
    <header className="bg-white shadow-md">  
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">  
        <Link to="/" className="flex items-center space-x-2">  
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />  
          <span className="text-xl font-bold text-primary">医疗创新平台</span>  
        </Link>  

        {/* Desktop Navigation */}  
        <nav className="hidden md:flex space-x-6">  
          <Link to="/" className="nav-link">首页</Link>  
          <Link to="/needs" className="nav-link">临床需求</Link>  
          <Link to="/innovations" className="nav-link">创新方案</Link>  
          <Link to="/voting" className="nav-link">需求评选</Link>  
          <Link to="/yearbook" className="nav-link">年度报告</Link>  
          <Link to="/events" className="nav-link">活动</Link>  
        </nav>  

        <div className="hidden md:flex items-center space-x-4">  
          {isAuthenticated ? (  
            <div className="relative group">  
              <button   
                className="flex items-center space-x-2 focus:outline-none"  
                onClick={() => setIsMenuOpen(!isMenuOpen)}  
              >  
                <span className="font-medium text-gray-700">{user?.name || '用户'}</span>  
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />  
                </svg>  
              </button>  
              
              {isMenuOpen && (  
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">  
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">控制面板</Link>  
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人设置</Link>  
                  <button   
                    onClick={handleLogout}   
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"  
                  >  
                    退出登录  
                  </button>  
                </div>  
              )}  
            </div>  
          ) : (  
            <>  
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">登录</Link>  
              <Link to="/register" className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-md">  
                注册  
              </Link>  
            </>  
          )}  
        </div>  

        {/* Mobile Menu Button */}  
        <button   
          className="md:hidden rounded-md p-2 focus:outline-none"  
          onClick={() => setIsMenuOpen(!isMenuOpen)}  
        >  
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />  
          </svg>  
        </button>  
      </div>  

      {/* Mobile Navigation */}  
      {isMenuOpen && (  
        <div className="md:hidden bg-white pb-3 px-4">  
          <nav className="flex flex-col space-y-3">  
            <Link to="/" className="nav-link">首页</Link>  
            <Link to="/needs" className="nav-link">临床需求</Link>  
            <Link to="/innovations" className="nav-link">创新方案</Link>  
            <Link to="/voting" className="nav-link">需求评选</Link>  
            <Link to="/yearbook" className="nav-link">年度报告</Link>  
            <Link to="/events" className="nav-link">活动</Link>  
            
            {isAuthenticated ? (  
              <>  
                <Link to="/dashboard" className="nav-link">控制面板</Link>  
                <Link to="/profile" className="nav-link">个人设置</Link>  
                <button   
                  onClick={handleLogout}   
                  className="text-left text-gray-700 hover:text-primary py-2"  
                >  
                  退出登录  
                </button>  
              </>  
            ) : (  
              <div className="flex space-x-4 pt-2">  
                <Link to="/login" className="text-primary hover:text-primary-dark font-medium">登录</Link>  
                <Link to="/register" className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-md">  
                  注册  
                </Link>  
              </div>  
            )}  
          </nav>  
        </div>  
      )}  
    </header>  
  );  
};  

export default Header;