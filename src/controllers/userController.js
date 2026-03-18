const db = require("../config/db");

// GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json({
      success: true,
      message: "Berhasil mengambil daftar pengguna",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Name and email are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Berhasil menambahkan pengguna baru",
        data: { id: result.insertId, name, email },
      });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "name and email are required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id],
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      message: "Berhasil memperbarui data pengguna",
      data: { id: Number(id), name, email },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "Berhasil menghapus pengguna" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
