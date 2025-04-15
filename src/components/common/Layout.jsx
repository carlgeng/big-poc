import React from 'react';  
import Header from './Header';  
import Footer from './Footer';  
import Sidebar from './Sidebar';  
import { useAuth } from '@/hooks/useAuth';  

const Layout = ({ children }) => {  
  const { isAuthenticated } = useAuth();  

  return (  
    <div className="flex flex-col min-h-screen bg-gray-50">  
      <Header />  
      
      <div className="flex flex-1">  
        {isAuthenticated && (  
          <Sidebar />  
        )}  
        
        <main className={`flex-1 p-4 md:p-6 ${isAuthenticated ? 'md:ml-64' : ''}`}>  
          {children}  
        </main>  
      </div>  
      
      <Footer />  
    </div>  
  );  
};  

export default Layout;
