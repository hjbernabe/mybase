import { users } from '../../database.json';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  } else {
    res.status(405).end(); 
  }
};
