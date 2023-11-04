import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const databasePath = path.join(process.cwd(), 'database.json');
      const databaseData = JSON.parse(fs.readFileSync(databasePath, 'utf-8'));

      const isEmailInUse = databaseData.users.some((user) => user.email === email);
      if (isEmailInUse) {
        res.status(400).json({ message: 'Email is already in use' });
        return;
      }

      const newUser = {
        id: String(new Date().getTime()),
        email,
        password, 
      };

      databaseData.users.push(newUser);

      fs.writeFileSync(databasePath, JSON.stringify(databaseData, null, 2));

      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end();
  }
};
