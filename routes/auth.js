require('dotenv').config();
const router = require("express").Router();
const axios = require("axios");

// Initiate GitHub authentication
router.get('/auth/github', (_, res) => {
    return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo%20`);
});

// GitHub auth callback
router.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;

    axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
    }).then(async (response) => {
        const accessToken = response.data.split('&')[0].split('=')[1];
        // Redirect to extension server for passing token
        return res.redirect(`http://localhost:12635/auth/github/token/${accessToken}`);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;