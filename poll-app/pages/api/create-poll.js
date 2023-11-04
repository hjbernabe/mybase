
import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {

    const pollsPath = path.join(process.cwd(), 'database.json');
    const database = JSON.parse(fs.readFileSync(pollsPath, 'utf-8'));

    const newPoll = req.body;

    database.polls.push(newPoll);

    fs.writeFileSync(pollsPath, JSON.stringify(database, null, 2));

    res.status(200).json({ message: 'Poll created successfully' });
  } else {
    res.status(405).end(); 
  }
};
