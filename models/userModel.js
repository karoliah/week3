'use strict';
const promisePool = require('../database/db').promise();

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUserList = async () => {
  try {
    const [rows] = await promisePool.query('SELECT user_id,name,email FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT user_id,name,email FROM wop_user WHERE user_id = ?', [id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertUser = async (user) => {
  try{
    console.log('insert user?', user);
    const [rows] = await promisePool.query('INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
  } catch (e) {
    console.error('updateUser model crash', e.message);
  }
};

const updateUser = async (user) => {
  try{
    console.log('insert user?', user);
    const [rows] = await promisePool.query('UPDATE wop_user SET name = ?, email = ?, password= ? WHERE wop_user.user_id = ?', [user.name, user.email, user.password, user.id]);

  } catch (e) {
    console.error('updateUser model crash', e.message)
  }
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};

module.exports = {
  users,
  getUser,
  getUserLogin,
  insertUser,
  updateUser,
  getUserList,
};