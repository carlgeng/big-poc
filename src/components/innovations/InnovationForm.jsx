import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';

const InnovationForm = ({ initialData = null, onCancel }) => {
  const isEditing = !!initialData;
  const navigate = useNavigate();
  const { postData, putData } = useApi();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'technology',
    solutionDetails: initialData?.solutionDetails || '',
    relatedNeedId: initialData?.relatedNeedId || '',
    potentialImpact: initialData?.potentialImpact || '',
    implementationPlan: initialData?.implementationPlan || '',
    isConfidential: initialData?.isConfidential || false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = '请输入方案标题';
    if (!formData.description) newErrors.description = '请输入方案描述';
    if (!formData.solutionDetails) newErrors.solutionDetails = '请输入解决方案详情';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
        await putData(`/innovations/${initialData.id}`, formData);
        navigate(`/innovations/${initialData.id}`);
      } else {
        const result = await postData('/innovations', formData);
        navigate(`/innovations/${result.id}`);
      }
    } catch (error) {
      setErrors({ submit: '提交失败，请重试' });
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'technology', label: '医疗技术' },
    { value: 'device', label: '医疗设备' },
    { value: 'software', label: '医疗软件' },
    { value: 'process', label: '流程优化' },
    { value: 'other', label: '其他' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? '编辑创新方案' : '提交创新方案'}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">类别 *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">描述 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`form-input ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          <div>
            <label htmlFor="solutionDetails" className="block text-sm font-medium text-gray-700 mb-1">解决方案详情 *</label>
            <textarea
              id="solutionDetails"
              name="solutionDetails"
              value={formData.solutionDetails}
              onChange={handleChange}
              rows={4}
              className={`form-input ${errors.solutionDetails ? 'border-red-500' : ''}`}
            />
            {errors.solutionDetails && <p className="mt-1 text-sm text-red-500">{errors.solutionDetails}</p>}
          </div>
          <div>
            <label htmlFor="relatedNeedId" className="block text-sm font-medium text-gray-700 mb-1">关联需求ID</label>
            <input
              type="text"
              id="relatedNeedId"
              name="relatedNeedId"
              value={formData.relatedNeedId}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="potentialImpact" className="block text-sm font-medium text-gray-700 mb-1">潜在影响</label>
            <textarea
              id="potentialImpact"
              name="potentialImpact"
              value={formData.potentialImpact}
              onChange={handleChange}
              rows={3}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="implementationPlan" className="block text-sm font-medium text-gray-700 mb-1">实施计划</label>
            <textarea
              id="implementationPlan"
              name="implementationPlan"
              value={formData.implementationPlan}
              onChange={handleChange}
              rows={3}
              className="form-input"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isConfidential"
              name="isConfidential"
              checked={formData.isConfidential}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="isConfidential" className="ml-2 text-sm text-gray-700">机密方案</label>
          </div>
          {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="btn-secondary">取消</button>
            <button type="submit" disabled={loading} className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? '提交中...' : isEditing ? '保存' : '提交'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InnovationForm;