import assert from 'assert';
import shoeApiQuery from '../services/query.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import { describe } from 'mocha';

const pgp = pgPromise({})
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);


describe('getAllShoes', () => {
    let dbMock;
  
    beforeEach(() => {
      // Create a mock for the db.any method using sinon
      dbMock = sinon.stub();
    });
  
    afterEach(() => {
      // Restore the original method after each test
      sinon.restore();
    });
  
    it('should return shoes from the database', async () => {
      // Arrange
      const expectedShoes = [{ id: 1, name: 'Shoe1' }, { id: 2, name: 'Shoe2' }];
      dbMock.resolves(expectedShoes);
  
      // Act
      const result = await getAllShoes(dbMock);
  
      // Assert
      expect(result).to.deep.equal(expectedShoes);
      expect(dbMock.calledOnceWithExactly('SELECT * FROM shoes')).to.be.true;
    });
  
    it('should handle errors', async () => {
      // Arrange
      const expectedError = new Error('Database error');
      dbMock.rejects(expectedError);
  
      // Act & Assert
      await expect(getAllShoes(dbMock)).to.be.rejectedWith(expectedError);
      expect(dbMock.calledOnceWithExactly('SELECT * FROM shoes')).to.be.true;
    });
  });
