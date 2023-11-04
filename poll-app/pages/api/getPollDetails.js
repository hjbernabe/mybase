import pollsData from '../../database.json';

export default (req, res) => {
  const pollId = req.query.pollId;
  const poll = pollsData.polls.find((p) => p.id === pollId);

  if (poll) {
    res.status(200).json(poll);
  } else {
    res.status(404).json({ message: 'Poll not found' });
  }
};
