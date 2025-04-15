import React, { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import { useApi } from '@/hooks/useApi';

const EventsPage = () => {
  const { fetchData } = useApi();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchData('/events');
        setEvents(data);
      } catch (err) {
        setError('无法加载活动列表');
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [fetchData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">活动</h1>
        {loading ? (
          <div className="text-center py-10">加载中...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center py-10">暂无活动</div>
        ) : (
          <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="card p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-gray-500 mb-2">时间: {formatDate(event.date)}</p>
                <p className="text-gray-500 mb-4">地点: {event.location}</p>
                <a href={event.registerUrl} className="btn-primary inline-block">
                  立即报名
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventsPage;