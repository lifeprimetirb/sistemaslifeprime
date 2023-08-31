"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Queue_1 = __importDefault(require("../../models/Queue"));
const User_1 = __importDefault(require("../../models/User"));
const ShowQueuesByUserService = async (userId, companyId) => {
    const queues = await Queue_1.default.findAll({
        include: [
            {
                model: User_1.default,
                as: "users",
                attributes: [],
                where: {
                    id: userId
                },
                required: true,
                duplicating: false
            }
        ]
    });
    if (queues.filter(q => q.companyId !== companyId).length > 0) {
        throw new AppError_1.default("Não é possível consultar registros de outra empresa");
    }
    return queues;
};
exports.default = ShowQueuesByUserService;
