"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FindUserFromToken_1 = __importDefault(require("../../services/AuthServices/FindUserFromToken"));
async function decodeUserFromToken(token) {
    const User = await (0, FindUserFromToken_1.default)(token);
    let user = { id: 0, profile: "", superAdmin: false };
    user = {
        id: User.id,
        profile: User.profile,
        superAdmin: User.super,
    };
    return user;
}
exports.default = decodeUserFromToken;
