const jwt = require('jsonwebtoken');

module.exports.getAccessTokenFromRequest = (req) => {
    const maybeToken = req.headers.authorization;

    if (!maybeToken) {
        return {
            accessToken: null,
            error: 'No token found',
        };
    }

    let token;
    try {
        token = jwt.verify(maybeToken, process.env.JWT_TOKEN_PRIVATE_KEY);
    } catch (err) {
        console.log(err);
        return { accessToken: null, err: "Invalid Token" };
    }
    
    return { accessToken: token, err: '' };
}