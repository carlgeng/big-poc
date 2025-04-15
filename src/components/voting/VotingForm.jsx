import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';

const VotingForm = ({ initialData = null, onCancel }) => {
  const isEditing = !!initialData;
  const navigate = useNavigate();
  const { postData, putData } = useApi();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    relatedNeedId: initialData?.relatedNeedId || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = '请输入投票标题';
    if (!formData.description) newErrors.description = '请输入投票描述';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        await putData(`/voting/${initialData.id}`, formData);
        navigate('/voting');
      } else {
        const result = await postData('/voting', formData);
        navigate('/voting');
      }
    } catch (error) {
      setErrors({ submit: '提交失败，请重试' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? '编辑投票' : '创建投票'}
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            投票标题 *
          </label>
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            描述 *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`form-input ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="relatedNeedId" className="block text-sm font-medium text-gray-700 mb-1">
            关联需求ID
          </label>
          <input
            type="text"
            id="relatedNeedId"
            name="relatedNeedId"
            value={formData.relatedNeedId}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="btn-secondary">
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? '提交中...' : isEditing ? '保存' : '创建'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VotingForm;