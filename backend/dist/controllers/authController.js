"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminUsername = 'admin@gmail.com';
const adminPassword = 'Admin@123';
const login = (req, res) => {
    const { username, password } = req.body;
    if (username === adminUsername && password === adminPassword) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token: token,
        });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map