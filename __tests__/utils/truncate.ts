import db from '../../src/config/database'

const truncate = async () => {
  // const tables = await db('sqlite_master').where('type', 'table');
  // return Promise.all(tables.map(async (table) => {
  //   await db(table.name).truncate();
  //   return;
  // }));

  await db('users').truncate();
}

export default truncate;