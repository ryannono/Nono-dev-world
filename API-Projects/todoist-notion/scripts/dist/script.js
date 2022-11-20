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
const dotenv = require("dotenv");
const todoist_api_typescript_1 = require("@doist/todoist-api-typescript");
const client_1 = require("@notionhq/client");
function fetchTodoistTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield todoistApi.getTasks();
    });
}
function retrieveNotionDatabse() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield notionApi.databases.retrieve({ database_id: databaseId });
    });
}
dotenv.config();
const todoistKey = String(process.env.TODOISTKEY);
const notionKey = String(process.env.NOTIONKEY);
const databaseId = String(process.env.DATABASEID);
const todoistApi = new todoist_api_typescript_1.TodoistApi(todoistKey);
const notionApi = new client_1.Client({ auth: notionKey });
const notionTaskDatabse = retrieveNotionDatabse();
console.log(notionTaskDatabse);
