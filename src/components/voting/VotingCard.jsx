import React, { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';

const VotingCard = ({ item }) => {
  const { user } = useAuth();
  const { postData } = useApi();
  const [hasVoted, setHasVoted] = useState(item.votedUsers?.includes(user?.id));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVote = async () => {
    if (!user) {
      setError('请先登录');
      return;
    }
    if (hasVoted) return;

    try {
      setLoading(true);
      await postData(`/voting/${item.id}/vote`, {});
      setHasVoted(true);
      item.votes += 1;
    } catch (err) {
      setError('投票失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-gray-500">当前票数: </span>
          <span className="font-medium">{item.votes}</span>
        </div>
        <button
          onClick={handleVote}
          disabled={hasVoted || loading || !user}
          className={`btn-primary ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? '投票中...' : hasVoted ? '已投票' : '投一票'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default VotingCard;