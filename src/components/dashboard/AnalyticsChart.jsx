import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsChart = () => {
  const { fetchData } = useApi();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchData('/analytics');
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: '需求提交',
              data: data.needs,
              borderColor: '#0078FF',
              backgroundColor: 'rgba(0, 120, 255, 0.2)',
              fill: true,
            },
            {
              label: '方案提交',
              data: data.innovations,
              borderColor: '#f9a825',
              backgroundColor: 'rgba(249, 168, 37, 0.2)',
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error('Failed to load analytics:', err);
      }
    };
    loadAnalytics();
  }, [fetchData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '平台活动趋势',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">活动趋势</h3>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="text-center">加载中...</div>
      )}
    </div>
  );
};

export default AnalyticsChart;