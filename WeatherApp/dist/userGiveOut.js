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
Object.defineProperty(exports, "__esModule", { value: true });
const userservice_1 = require("./userservice");
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = document.getElementById('userList');
        if (!userList) {
            console.error('userList Element nicht gefunden');
            return;
        }
        try {
            const users = yield (0, userservice_1.getUsers)();
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.id}: ${user.name}`;
                userList.appendChild(listItem);
            });
        }
        catch (error) {
            console.error('Fehler beim Laden der User:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', loadUsers);
