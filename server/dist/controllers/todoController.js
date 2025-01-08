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
exports.getTodos = exports.createTodo = void 0;
const db_1 = __importDefault(require("../config/db"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    try {
        const todo = yield db_1.default.todo.create({
            data: {
                title,
                description,
                userId,
                done: false
            }
        });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    console.log(userId);
    try {
        const todos = yield db_1.default.todo.findMany({ where: { userId: Number(userId) } });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getTodos = getTodos;
