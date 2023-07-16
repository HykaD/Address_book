const express = require('express');
const router = express.Router();
const connectToDB = require('../connection');

router.get('/', async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection('phones');
    const users = await collection.find({}).toArray();
    res.render('main', { title: 'Greetings from Pug', users });
  } catch (error) {
    console.error('Помилка отримання користувачів з бази даних:', error);
    res.status(500).send('Помилка сервера');
  }
});

router.post('/add', async (req, res) => {
    try {

      const { last, first, father, org, part, phone, mail, birth } = req.body;
  

      if (!last || !first || !org || !phone || !mail || !birth) {
        return res.status(400).send('Не всі обов\'язкові поля заповнені');
      }
  
      const db = await connectToDB();
      const collection = db.collection('phones'); 
  
      const newRecord = {
        last,
        first,
        father,
        org,
        part,
        phone,
        mail,
        birth
      };
  
      const result = await collection.insertOne(newRecord);
  
      res.status(200).json({ message: 'Запис додано успішно', insertedId: result.insertedId });
    } catch (error) {
      console.error('Помилка при додаванні запису:', error);
      res.status(500).send('Помилка сервера');
    }
  });

  router.post('/delete', async (req, res) => {
    try {
      const { searchQuery } = req.body;
  
      if (!searchQuery) {
        return res.status(400).send('Поле пошуку не заповнене');
      }
  
      const db = await connectToDB();
      const collection = db.collection('phones');
  
      // Виконуємо пошук запису за допомогою пошукового запиту
      const result = await collection.deleteOne({ $text: { $search: searchQuery } });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Запис не знайдено' });
      }
  
      res.status(200).json({ message: 'Запис видалено успішно' });
  
    } catch (error) {
      console.error('Помилка при видаленні запису:', error);
      res.status(500).send('Помилка сервера');
    }
  });
   

module.exports = router;
