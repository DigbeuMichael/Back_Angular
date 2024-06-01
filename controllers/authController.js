const bcrypt = require('bcrypt');
const User = require('../models/users'); // Importer le modèle
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function hello(req,res){
    res.send('Hello World');
}

async function registerUser(req, res) {
    const { username, email, password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({userId : newUser._id}, process.env.SECRET_KEY, {expiresIn:'12h'})
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'Utilisateur enregistré avec succès.', token });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ error: 'Le nom d\'utilisateur ou l\'e-mail existe déjà.' });
      } else {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
      }
    }
  }

  async function loginUser(req, res) {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe invalide.' });
      return;
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe invalide.' });
      return;
    }
    const token = jwt.sign({userId : user._id}, process.env.SECRET_KEY, {expiresIn:'12h'})
    res.status(200).json({ user: { username: user.username, email: user.email },token });
  }

module.exports = { registerUser,loginUser,hello};