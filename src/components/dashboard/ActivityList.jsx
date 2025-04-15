import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';

const ActivityList = () => {
  const { fetchData } = useApi();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchData('/activities?limit=5');
        setActivities(data);
      } catch (err) {
        console.error('Failed to load activities:', err);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, [fetchData]);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">最近活动</h3>
      {loading ? (
        <div className="text-center">加载中...</div>
      ) : activities.length === 0 ? (
        <div className="text-center text-gray-500">暂无活动</div>
      ) : (
        <ul className="space-y-3">
          {activities.map(activity => (
            <li key={activity.id} className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
              <div>
                <p className="text-gray-800">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityList;