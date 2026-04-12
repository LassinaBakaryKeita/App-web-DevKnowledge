const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Génère un token JWT valable 3 jours
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'VOTRE_PHRASE_SECRETE_ICI', {
        expiresIn: 3 * 24 * 60 * 60
    });
};

// Inscription
module.exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);

        res.status(201).json({
            user: user._id,
            userName: user.name,
            token,
            message: 'Inscription réussie !'
        });
    } catch (err) {
        console.log('Erreur inscription :', err);
        res.status(400).json({ error: "Erreur lors de l'inscription" });
    }
};

// Connexion
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Email non enregistré' });
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }

        const token = createToken(user._id);
        res.status(200).json({
            user: user._id,
            userName: user.name,
            token
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Déconnexion
module.exports.logout = async (req, res) => {
    res.send('Déconnexion réussie');
};