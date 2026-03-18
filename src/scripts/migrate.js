require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runMigrationAndSeed() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3307,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    const dbName = process.env.DB_NAME || "tugas1_expressjs";
    console.log(`Creating database ${dbName} if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

    await connection.query(`USE \`${dbName}\``);

    console.log('Running migration (creating tables)...');
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
      );
    `;
    await connection.query(createTableQuery);
    console.log('Users table created/verified successfully.');

    console.log('Running seeder (inserting initial data)...');
    
    const [existingUsers] = await connection.query('SELECT COUNT(*) as count FROM users');
    
    if (existingUsers[0].count === 0) {
      const seedQuery = `
        INSERT INTO users (name, email) VALUES 
        ('Admin User', 'admin@example.com'),
        ('Akmal Rafly', 'akmalrafly@gmail.com');
      `;
      await connection.query(seedQuery);
      console.log('Seed data inserted successfully.');
    } else {
      console.log('Users table already contains data, skipping seed.');
    }

    console.log('Migration and seeding completed successfully!');
  } catch (error) {
    console.error('Error during migration/seeding:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

runMigrationAndSeed();
