import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';

const NeedForm = ({ initialData = null, onCancel }) => {
  const isEditing = !!initialData;
  const navigate = useNavigate();
  const { postData, putData } = useApi();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'surgery',
    impact: initialData?.impact || '',
    currentSolution: initialData?.currentSolution || '',
    desiredOutcome: initialData?.desiredOutcome || '',
    targetPopulation: initialData?.targetPopulation || '',
    resources: initialData?.resources || '',
    isConfidential: initialData?.isConfidential || false,
    priority: initialData?.priority || 'medium',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = '请输入需求标题';
    if (formData.title && formData.title.length < 5) newErrors.title = '标题至少需要5个字符';
    
    if (!formData.description) newErrors.description = '请输入需求描述';
    if (formData.description && formData.description.length < 20) newErrors.description = '描述至少需要20个字符';
    
    if (!formData.impact) newErrors.impact = '请描述临床影响';
    if (!formData.desiredOutcome) newErrors.desiredOutcome = '请描述期望解决方案';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      if (isEditing) {
        await putData(`/api/needs/${initialData.id}`, formData);
        navigate(`/needs/${initialData.id}`);
      } else {
        const result = await postData('/api/needs', formData);
        navigate(`/needs/${result.id}`);
      }
    } catch (error) {
      console.error('Failed to save need:', error);
      // 可以在这里添加错误处理，例如显示一个通知或警告
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'surgery', label: '外科手术' },
    { value: 'diagnosis', label: '诊断' },
    { value: 'treatment', label: '治疗' },
    { value: 'nursing', label: '护理' },
    { value: 'rehabilitation', label: '康复' },
    { value: 'prevention', label: '预防' },
    { value: 'monitoring', label: '监测' },
    { value: 'other', label: '其他' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? '编辑临床需求' : '提交新的临床需求'}</h2>
        
        <div className="space-y-4">
          {/* 基本信息 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              需求标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring focus:ring-primary/30`}
              placeholder="请输入需求标题"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              需求类别 <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/30"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              需求描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring focus:ring-primary/30`}
              placeholder="请详细描述您的临床需求"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
              临床影响 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="impact"
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.impact ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring focus:ring-primary/30`}
              placeholder="这个需求如何影响临床实践或患者健康？"
            />
            {errors.impact && <p className="mt-1 text-sm text-red-500">{errors.impact}</p>}
          </div>
          
          <div>
            <label htmlFor="currentSolution" className="block text-sm font-medium text-gray-700 mb-1">
              当前解决方案（如有）
            </label>
            <textarea
              id="currentSolution"
              name="currentSolution"
              value={formData.currentSolution}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/30"
              placeholder="当前是如何解决这个问题的？有哪些局限性？"
            />
          </div>
          
          <div>
            <label htmlFor="desiredOutcome" className="block text-sm font-medium text-gray-700 mb-1">
              期望解决方案 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="desiredOutcome"
              name="desiredOutcome"
              value={formData.desiredOutcome}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.desiredOutcome ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring focus:ring-primary/30`}
              placeholder="理想的解决方案应该具备哪些特点？"
            />
            {errors.desiredOutcome && <p className="mt-1 text-sm text-red-500">{errors.desiredOutcome}</p>}
          </div>
          
          <div>
            <label htmlFor="targetPopulation" className="block text-sm font-medium text-gray-700 mb-1">
              目标人群
            </label>
            <input
              type="text"
              id="targetPopulation"
              name="targetPopulation"
              value={formData.targetPopulation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/30"
              placeholder="哪些患者群体会从解决这个需求中受益？"
            />
          </div>
          
          <div>
            <label htmlFor="resources" className="block text-sm font-medium text-gray-700 mb-1">
              可用资源
            </label>
            <textarea
              id="resources"
              name="resources"
              value={formData.resources}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/30"
              placeholder="您或您的组织可以提供哪些资源来支持解决方案开发？"
            />
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              优先级
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/30"
            >
              <option value="high">高 - 紧急需要解决</option>
              <option value="medium">中 - 较为重要</option>
              <option value="low">低 - 可以等待</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isConfidential"
              name="isConfidential"
              checked={formData.isConfidential}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isConfidential" className="ml-2 block text-sm text-gray-700">
              包含机密信息（仅特定用户可见）
            </label>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-6">
            <p className="text-sm text-gray-600 mb-4">
              <span className="text-red-500">*</span> 表示必填字段
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (isEditing ? '保存中...' : '提交中...') : (isEditing ? '保存修改' : '提交需求')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NeedForm;
