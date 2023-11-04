
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Polls() {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    async function fetchPolls() {
      try {
        const response = await fetch('/api/getPolls');
        if (response.status === 200) {
          const data = await response.json();
          setPolls(data.polls);
        } else {
          console.error('Error fetching polls');
        }
      } catch (error) {
        console.error('An error occurred while fetching polls:', error);
      }
    }

    fetchPolls();
  }, []);

  return (
    <div>
      <h1>Polls</h1>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            <p>Question: {poll.question}</p>
            <label htmlFor={`pollOption_${poll.id}`}>Select an option:</label>
            <select
              id={`pollOption_${poll.id}`}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              {poll.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <Link href={`/vote/${poll.id}?option=${selectedOption}`}>
                Vote
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Polls;
