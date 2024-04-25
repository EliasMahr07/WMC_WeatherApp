/* globals Chart:false */

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('../db/database.db', (err) => {
  if(err) {
    console.error(err.message)
  }
  console.log('Connected to the database.')
  db.close((err) => {
    if(err) {
      console.error(err.message)
    }
  })
  console.log('Database connection closed.')
})