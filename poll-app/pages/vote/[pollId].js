// pages/vote/[pollId].js

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Vote() {
  const router = useRouter();
  const { pollId, option } = router.query;

  const handleVote = async () => {
    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pollId, selectedOption: option }),
    });

    if (response.status === 200) {
      alert('Vote recorded successfully');
    } else {
      // Handle errors
      alert('Failed to record your vote');
    }
  };

  if (router.isReady) {
    return (
      <div>
        <h1>Make your vote</h1>
        <p>Poll ID: {pollId}</p>
        <p>Selected Option: {option}</p>
        <button onClick={handleVote}>Vote</button>
      </div>
    );
  } else {
    return <p>Incomming...</p>;
  }
}
