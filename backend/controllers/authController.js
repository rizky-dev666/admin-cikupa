const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient');
const SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('pengguna')
    .select('*')
    .eq('email_pengguna', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ message: 'Email tidak ditemukan' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Password salah' });
  }

  const token = jwt.sign({
    id: user.id,
    email: user.email_pengguna,
    level: user.level_pengguna
  }, SECRET, { expiresIn: '2h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false 
  });

  res.json({ message: 'Login berhasil' });
};

exports.checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

exports.getUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET);
    const { data: user, error } = await supabase
      .from('pengguna')
      .select('*')
      .eq('email_pengguna', decoded.email)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email_pengguna,
      nama_pengguna: user.nama_pengguna,
      level: user.level_pengguna,
      foto_pengguna: user.foto_pengguna
    });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax' 
  });
  res.json({ message: 'Logout berhasil' });
};

