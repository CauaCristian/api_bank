const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const validation = require('../repositories/validation');
const config = require('../../config');

const createToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            document: user.document,
            email: user.email
        },
        config.secret,
        {
            expiresIn: 86400
        }
    );
};

exports.register = async (userData) => {
    const {name, document, email, password, type } = userData;

    if (!name) throw new Error("Name invalid");
    if (!password) throw new Error("Password invalid");
    if (!validation.validateType(type)) throw new Error("Type invalid. Use MERCHANT or COMMON");
    if (!validation.validateDocument(document)) throw new Error("Document invalid");
    if (!validation.validateEmail(email)) throw new Error("Email invalid");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        document,
        email,
        password: hashedPassword,
        type,
        balance: 0.00
    });

    const token = createToken(user);
    return { user, token };
};

exports.login = async (loginData) => {
    const { document, password } = loginData;

    const user = await userModel.findOne({ where: { document } });
    if (!user) throw new Error("Document invalid");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Password invalid");

    user.password = undefined;
    const token = createToken(user);
    return { user, token };
};
