import React from 'react';
import VotingCard from './VotingCard';

const VotingList = ({ items }) => {
  return (
    <div className="space-y-6">
      {items.map(item => (
        <VotingCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default VotingList;