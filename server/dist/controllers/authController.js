"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi");
    const { username, password } = req.body;
    try {
        const user = yield db_1.default.user.findUnique({
            where: { username }
        });
        if (!user) {
            res.status(400).json({ message: "invalid username or password" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "invalid username or password" });
            return;
        }
        res.status(200).json({ message: "login successfull", userId: user.id
        });
    }
    catch (error) {
        const errorMessage = error.message || "An unknown error occurred";
        res.status(500).json({ message: "an error occured", error: errorMessage });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, firstName, lastName, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: "name and email is required" });
    }
    try {
        const existingUser = yield db_1.default.user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            res.status(400).json({ message: "the user already exist" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield db_1.default.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                username
            }
        });
        res.status(200).json({ message: "user is created successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
});
exports.signup = signup;
