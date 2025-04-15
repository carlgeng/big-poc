import React from 'react';  
import { Link } from 'react-router-dom';  
import Layout from '@/components/common/Layout';  

const Home = () => {  
  const features = [  
    {  
      title: '收集临床需求',  
      description: '从医院、政府、学校、企业等收集真实医疗临床需求，并进行系统化管理',  
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'  
    },  
    {  
      title: '科学评选排序',  
      description: '通过专家投票与公开评选，按照重要性与紧迫度对临床需求进行排序',  
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'  
    },  
    {  
      title: '征集创新方案',  
      description: '针对优先级较高的临床需求，广泛征集创新解决方案和想法',  
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'  
    },  
    {  
      title: '年度报告发布',  
      description: '定期出版临床需求和创新方案年鉴，分享最新医疗领域挑战与进展',  
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'  
    },  
    {  
      title: '区块链存证',  
      description: '使用区块链技术确保评选过程透明、结果可信，提供全程数据可溯源性',  
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'  
    },  
    {  
      title: '活动与资源对接',  
      description: '举办各类线上线下活动，促进各方资源对接，共同攻克医疗挑战',  
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'  
    },  
  ];  

  return (  
    <Layout>  
      {/* Hero Section */}  
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white">  
        <div className="absolute inset-0 bg-black opacity-30"></div>  
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">  
          <div className="max-w-3xl">  
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">  
              连接医疗需求与创新思维  
            </h1>  
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">  
              我们的平台汇集医院、政府、学校、企业等多方力量，共同发现临床急需，推动医疗创新，  
              解决实际医疗挑战，改善患者健康。  
            </p>  
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">  
              <Link to="/needs" className="btn-primary">  
                浏览临床需求  
              </Link>  
              <Link to="/register" className="btn-secondary">  
                立即加入我们  
              </Link>  
            </div>  
          </div>  
        </div>  
      </section>  

      {/* Features */}  
      <section className="py-16 bg-white">  
        <div className="container mx-auto px-4">  
          <div className="text-center mb-16">  
            <h2 className="text-3xl font-bold mb-4">平台功能与特点</h2>  
            <p className="text-gray-600 max-w-2xl mx-auto">  
              我们的平台集需求收集、科学评选、方案征集、资源对接于一体，  
              以去中心化的区块链技术确保全过程透明可信。  
            </p>  
          </div>  

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">  
            {features.map((feature, index) => (  
              <div key={index} className="bg-gray-50 rounded-lg p-8 transition-all hover:shadow-lg">  
                <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center mb-6">  
                  <svg   
                    className="w-6 h-6 text-primary"   
                    fill="none"   
                    viewBox="0 0 24 24"   
                    stroke="currentColor"  
                  >  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />  
                  </svg>  
                </div>  
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>  
                <p className="text-gray-600">{feature.description}</p>  
              </div>  
            ))}  
          </div>  
        </div>  
      </section>  

      {/* Statistics */}  
      <section className="py-16 bg-gray-100">  
        <div className="container mx-auto px-4">  
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">  
            <div className="text-center">  
              <p className="text-4xl font-bold text-primary mb-2">2,500+</p>  
              <p className="text-gray-600">临床需求收集</p>  
            </div>  
            <div className="text-center">  
              <p className="text-4xl font-bold text-primary mb-2">800+</p>  
              <p className="text-gray-600">创新方案提交</p>  
            </div>  
            <div className="text-center">  
              <p className="text-4xl font-bold text-primary mb-2">150+</p>  
              <p className="text-gray-600">合作医疗机构</p>  
            </div>  
            <div className="text-center">  
              <p className="text-4xl font-bold text-primary mb-2">50+</p>  
              <p className="text-gray-600">成功转化案例</p>  
            </div>  
          </div>  
        </div>  
      </section>  

      {/* CTA */}  
      <section className="py-16 bg-primary text-white">  
        <div className="container mx-auto px-4 text-center">  
          <h2 className="text-3xl font-bold mb-4">立即加入我们的创新社区</h2>  
          <p className="text-white/90 max-w-2xl mx-auto mb-8">  
            无论您是医疗专业人士、研究人员、企业家还是政府机构代表，  
            都可以在平台上分享临床需求、提出创新想法，共同推动医疗技术进步。  
          </p>  
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">  
            <Link to="/register" className="bg-white text-primary font-medium px-6 py-3 rounded-md shadow-lg hover:bg-gray-100 transition-colors">  
              注册账号  
            </Link>  
            <Link to="/needs" className="border border-white text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors">  
              浏览需求库  
            </Link>  
          </div>  
        </div>  
      </section>  
    </Layout>  
  );  
};  

export default Home;