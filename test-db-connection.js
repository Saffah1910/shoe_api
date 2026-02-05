import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({});
const db = pgp(process.env.DATABASE_URL);

async function testDB() {
  try {
    const res = await db.any('SELECT NOW()');
    console.log(res);
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
}

testDB();
