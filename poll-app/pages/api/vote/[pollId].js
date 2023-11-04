
import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  const { pollId } = req.query;

  if (req.method === 'PUT') {
    const { option } = req.query;


    const dbPath = path.join(process.cwd(), 'database.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));


    const poll = dbData.polls.find((p) => p.id === pollId);

    if (poll) {
      const optionIndex = poll.options.indexOf(option);

      if (optionIndex !== -1) {
        poll.votes[optionIndex]++;

        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

        res.status(200).json({ message: 'Vote recorded successfully' });
      } else {
        res.status(400).json({ message: 'Invalid option' });
      }
    } else {
      res.status(404).json({ message: 'Poll not found' });
    }
  } else {
    res.status(405).end(); 
  }
};

