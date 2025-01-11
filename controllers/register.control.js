import express from "express";
import pg from "pg";
const { Client } = pg;

export async function connectToPostgreSQL() {
  const client = new Client({
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "2003MINUTA",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    database: process.env.DATABASE_NAME || "postgres",
  });

  try {
    await client.connect();
    console.log(
      "Информация о сервере PostgreSQL:",
      client.connectionParameters,
      "\n"
    );
    return client;
  } catch (error) {
    console.error("Ошибка при подключении к PostgreSQL:", error);
    throw error;
  }
}
export class RegistService {
  async checkIfUserExists(username, client) {
    try {
      const result = await client.query(
        "SELECT 1 FROM users WHERE login = $1",
        [username]
      );
      return { exists: result.rows.length > 0, error: null };
    } catch (error) {
      console.error("Ошибка при проверке существования пользователя:", error);
      return { exists: false, error: error.message }; // Возвращаем информацию об ошибке
    }
  }
  async createUser(username, hashedPassword) {
    try {
      const existingUser = await this.checkIfUserExists(username);
      if (existingUser) {
        throw new Error("Пользователь уже существует");
      }

      const result = await this.client.query(
        `INSERT INTO users (login, password_hash) VALUES ($1, $2) RETURNING *`,
        [username, hashedPassword]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);

      throw error;
    }
  }
}
