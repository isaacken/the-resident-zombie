import db from '../../src/config/database'

const truncate = async () => {
  await db('people').truncate();
}

export default truncate;