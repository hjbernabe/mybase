import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { pollId, selectedOption } = req.body;

    const dbPath = path.join(process.cwd(), 'database.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const pollToUpdate = dbData.polls.find((p) => p.id === pollId);

    if (pollToUpdate) {
      const optionIndex = pollToUpdate.options.indexOf(selectedOption);
      if (optionIndex !== -1) {
        pollToUpdate.votes[optionIndex] += 1;
      } else {
        res.status(400).json({ message: 'Invalid option' });
        return;
      }

      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
      res.status(200).json({ message: 'Vote recorded' });
    } else {
      res.status(404).json({ message: 'Poll not found' });
    }
  } else {
    res.status(405).end(); 
  }
};
