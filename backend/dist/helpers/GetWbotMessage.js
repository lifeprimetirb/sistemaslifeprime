"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWbotMessage = void 0;
const GetTicketWbot_1 = __importDefault(require("./GetTicketWbot"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const GetMessagesService_1 = __importDefault(require("../services/MessageServices/GetMessagesService"));
const GetWbotMessage = async (ticket, messageId) => {
    const getSock = await (0, GetTicketWbot_1.default)(ticket);
    let limit = 20;
    const fetchWbotMessagesGradually = async () => {
        if (getSock.type === "legacy") {
            const wbot = getSock;
            const chatMessages = await wbot.fetchMessagesFromWA(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, limit);
            const msgFound = chatMessages.find(msg => msg.key.id === messageId);
            if (!msgFound && limit < 400) {
                limit += 50;
                return fetchWbotMessagesGradually();
            }
            return msgFound;
        }
        if (getSock.type === "md") {
            const msgFound = await (0, GetMessagesService_1.default)({
                id: messageId
            });
            return msgFound;
        }
        return null;
    };
    try {
        const msgFound = await fetchWbotMessagesGradually();
        if (!msgFound) {
            throw new Error("Cannot found message within 100 last messages");
        }
        return msgFound;
    }
    catch (err) {
        console.log(err);
        throw new AppError_1.default("ERR_FETCH_WAPP_MSG");
    }
};
exports.GetWbotMessage = GetWbotMessage;
exports.default = exports.GetWbotMessage;
