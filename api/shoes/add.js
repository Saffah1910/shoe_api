import pgPromise from 'pg-promise';
import shoeApiQuery from '../../../services/query.js';

const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise({});
const db = pgp(connectionString);
const shoeQuery = shoeApiQuery(db);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { color, brand, price, size, in_stock, image_url } = req.body;
      const shoeInfo = [color, brand, price, size, in_stock, image_url];

      await shoeQuery.addShoeToStock(shoeInfo);

      res.status(201).json({ message: 'New shoe added to the stock' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
