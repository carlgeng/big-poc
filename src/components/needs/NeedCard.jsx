import React from 'react';  
import { Link } from 'react-router-dom';  

const NeedCard = ({ need }) => {  
  const {  
    id,  
    title,  
    description,  
    category,  
    submitter,  
    organization,  
    createdAt,  
    priority,  
    status,  
    votes  
  } = need;  

  const priorityColors = {  
    high: 'bg-red-100 text-red-800',  
    medium: 'bg-yellow-100 text-yellow-800',  
    low: 'bg-green-100 text-green-800',  
  };  

  const statusColors = {  
    draft: 'bg-gray-100 text-gray-800',  
    published: 'bg-blue-100 text-blue-800',  
    voting: 'bg-purple-100 text-purple-800',  
    selected: 'bg-green-100 text-green-800',  
    archived: 'bg-red-100 text-red-800',  
  };  

  const categoryIcons = {  
    surgery: 'M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z',  
    diagnosis: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',  
    treatment: 'M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75',  
    nursing: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',  
    rehabilitation: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',  
    default: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',  
  };  

  const formatDate = (dateString) => {  
    const date = new Date(dateString);  
    return date.toLocaleDateString('zh-CN', {  
      year: 'numeric',  
      month: '2-digit',  
      day: '2-digit',  
    });  
  };  

  return (  
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">  
      <div className="p-5">  
        <div className="flex items-start justify-between mb-3">  
          <div className="flex items-center">  
            <div className="mr-3 w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center">  
              <svg  
                className="w-5 h-5 text-primary"  
                fill="none"  
                viewBox="0 0 24 24"  
                stroke="currentColor"  
              >  
                <path  
                  strokeLinecap="round"  
                  strokeLinejoin="round"  
                  strokeWidth={2}  
                  d={categoryIcons[category] || categoryIcons.default}  
                />  
              </svg>  
            </div>  
            <div>  
              <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[priority] || 'bg-gray-100 text-gray-800'}`}>  
                {priority === 'high' ? '高优先级' : priority === 'medium' ? '中优先级' : '低优先级'}  
              </span>  
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>  
                {status === 'draft' ? '草稿'   
                  : status === 'published' ? '已发布'   
                  : status === 'voting' ? '投票中'   
                  : status === 'selected' ? '已入选'   
                  : '已归档'}  
              </span>  
            </div>  
          </div>  
          {votes > 0 && (  
            <div className="flex items-center text-gray-500">  
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
                <path  
                  strokeLinecap="round"  
                  strokeLinejoin="round"  
                  strokeWidth={2}  
                  d="M5 15l7-7 7 7"  
                />  
              </svg>  
              <span>{votes}</span>  
            </div>  
          )}  
        </div>  

        <Link to={`/needs/${id}`}>  
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary">{title}</h3>  
        </Link>  
        
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>  
        
        <div className="flex justify-between items-center text-sm">  
          <div className="text-gray-500">  
            {organization && (  
              <span className="inline-block mr-4">{organization}</span>  
            )}  
            <span>提交于 {formatDate(createdAt)}</span>  
          </div>  
          
          <Link  
            to={`/needs/${id}`}  
            className="text-primary hover:text-primary-dark font-medium"  
          >  
            查看详情  
          </Link>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default NeedCard;
