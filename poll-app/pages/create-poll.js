import { useState } from 'react';
import { useRouter } from 'next/router';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const router = useRouter();

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleCreatePoll = async () => {
    const newPoll = {
      id: String(new Date().getTime()),
      question,
      options,
      votes: Array(options.length).fill(0), 
    };

    const response = await fetch('/api/create-poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPoll),
    });

    if (response.status === 200) {
      router.push('/polls'); 
    } else {
      alert('Error during poll creation');
    }
  };

  return (
    <div>
      <h1>Create a Poll</h1>
      <input
        type="text"
        placeholder="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const updatedOptions = [...options];
              updatedOptions[index] = e.target.value;
              setOptions(updatedOptions);
            }}
          />
        </div>
      ))}
      <button onClick={handleAddOption}>Add Option / </button>


      <button onClick={handleCreatePoll}> Create Poll</button>
    </div>
  );
};

export default CreatePoll;
