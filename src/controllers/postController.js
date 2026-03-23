const db = require('../config/db');

// GET /posts
exports.getAllPosts = async (req, res) => {
  try {
    const query = `
      SELECT posts.*, users.name AS user_name 
      FROM posts 
      JOIN users ON posts.user_id = users.id
    `;
    const [rows] = await db.query(query);
    res.json({
      success: true,
      message: 'Berhasil mengambil daftar postingan',
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// POST /posts
exports.createPost = async (req, res) => {
  const { title, content, user_id } = req.body || {};
  if (!title || !content || !user_id) {
    return res.status(400).json({ success: false, message: 'Title, content, and user_id are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
      [title, content, user_id]
    );

    const [userRows] = await db.query('SELECT name FROM users WHERE id = ?', [user_id]);
    const user_name = userRows.length > 0 ? userRows[0].name : null;

    res.status(201).json({
      success: true,
      message: 'Berhasil menambahkan postingan baru',
      data: { id: result.insertId, title, content, user_id, user_name },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// GET /posts/:id
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT posts.*, users.name AS user_name 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE posts.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({
      success: true,
      message: 'Berhasil mengambil data postingan',
      data: rows[0],
    });
  } catch (error) {
    console.error('Error fetching post by id:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// DELETE /posts/:id
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, message: 'Berhasil menghapus postingan' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// GET /userposts/:id
exports.getPostsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT posts.*, users.name AS user_name 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE posts.user_id = ?
    `;
    const [rows] = await db.query(query, [id]);
    res.json({
      success: true,
      message: 'Berhasil mengambil daftar postingan pengguna',
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching posts by user_id:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
