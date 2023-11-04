import pollsData from '../../database.json';

export default (req, res) => {
  res.status(200).json({ polls: pollsData.polls });
};
