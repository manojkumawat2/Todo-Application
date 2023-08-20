const User = require("../models/user.model");
const { getAccessTokenFromRequest } = require("../utils/getSetAccessToken");
const { setValue, getValue } = require('../utils/redis');

module.exports.authorizeRequest = async (req, res, next) => {
    const { accessToken } = getAccessTokenFromRequest(req);

    if (!accessToken) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    const { userId } = accessToken;

    try {
        const userCacheKey = `user-session-${userId}`;
        let user = JSON.parse(await getValue(userCacheKey));

        if (!user) {
            user = await User.findByPk(userId);
            await setValue(userCacheKey, JSON.stringify(user));
        }

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Oops! Something went wrong. Please try again in a moment' });
    }
}
