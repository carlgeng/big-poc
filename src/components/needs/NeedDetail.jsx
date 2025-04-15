import React from 'react';
import { Link } from 'react-router-dom';
import VerificationWidget from '../blockchain/VerificationWidget';

const NeedDetail = ({ need }) => {
  if (!need) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4">{need.title}</h2>
        <p className="text-gray-600 mb-4">{need.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">类别</p>
            <p className="font-medium">{need.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">优先级</p>
            <p className="font-medium">{need.priority}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">提交者</p>
            <p className="font-medium">{need.submitter}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">组织</p>
            <p className="font-medium">{need.organization || '无'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">创建时间</p>
            <p className="font-medium">
              {new Date(need.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">状态</p>
            <p className="font-medium">{need.status}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">临床影响</h3>
            <p className="text-gray-600">{need.impact || '未提供'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">当前解决方案</h3>
            <p className="text-gray-600">{need.currentSolution || '未提供'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">期望结果</h3>
            <p className="text-gray-600">{need.desiredOutcome || '未提供'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">目标人群</h3>
            <p className="text-gray-600">{need.targetPopulation || '未提供'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">可用资源</h3>
            <p className="text-gray-600">{need.resources || '未提供'}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <VerificationWidget recordType="need" recordId={need.id} title={need.title} />
      </div>
      <Link to="/needs" className="btn-secondary mt-4 inline-block">
        返回需求列表
      </Link>
    </div>
  );
};

export default NeedDetail;