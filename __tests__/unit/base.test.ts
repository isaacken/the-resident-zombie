import truncate from '../utils/truncate';
import db from '../../src/config/database';

describe('base tests', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should work', async () => {
    
  });

  afterAll(async () => {
    db.destroy();
  });
});


