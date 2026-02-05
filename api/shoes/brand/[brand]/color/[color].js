import pgPromise from 'pg-promise';
import shoeApiQuery from '../../../services/query.js';

const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise({});
const db = pgp(connectionString);
const shoeQuery = shoeApiQuery(db);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await shoeQuery.getShoesByBrandAndColor(req.query);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
