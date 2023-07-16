const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Припустимо, що MongoDB працює на локальному хості за замовчуванням
const dbName = 'phoneTerminal'; // Замініть 'yourDatabaseName' на назву вашої бази даних

async function connectToDB() {
  try {
    const client = await MongoClient.connect(url);
    console.log('Підключено до бази даних MongoDB!');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Помилка підключення до бази даних:', error);
    throw error;
  }
}

module.exports = connectToDB;
