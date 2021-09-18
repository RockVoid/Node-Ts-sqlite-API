import sqlite3 from 'sqlite3';

const DATABASE_FILE_PATH = process.env.DATABASE_FILE_PATH;

if (!DATABASE_FILE_PATH) {
  throw new Error(`Database ${DATABASE_FILE_PATH} doesn't exists!`);
}

const dbConnection = () => {
  let db = new sqlite3.Database(DATABASE_FILE_PATH);
  return db;
} 

export const dbQuery = async (query: string, params?: any[]) => {
  let db = dbConnection();
  return new Promise<any>((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
  .finally(() => {
    db.close();
  })
}

export const dbQueryFirst = async (query: string, params?: any[]) => {
  const retorno = await dbQuery(query, params);
  return retorno[0];
}
