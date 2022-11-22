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
dotenv.config();
const todoistKey = String(process.env.TODOISTKEY);
const notionKey = String(process.env.NOTIONKEY);
const databaseId = String(process.env.DATABASEID);
const todoistApi = new todoist_api_typescript_1.TodoistApi(todoistKey);
const notionApi = new client_1.Client({ auth: notionKey });
function newNotionTask(todoistTask) {
    return __awaiter(this, void 0, void 0, function* () {
        let dueDate = todoistTask.due;
        if (dueDate != null) {
            notionApi.pages.create({
                "parent": {
                    "type": "database_id",
                    "database_id": databaseId
                },
                "properties": {
                    "Task": {
                        "title": [{
                                "text": {
                                    "content": todoistTask.content
                                }
                            }]
                    },
                    "Due date": {
                        "date": {
                            "start": dueDate.date
                        }
                    },
                    "ID": {
                        "number": Number(todoistTask.id)
                    },
                    "Status": {
                        "checkbox": todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    }
                },
                "children": [{
                        "object": "block",
                        "paragraph": {
                            "rich_text": [{
                                    "text": {
                                        "content": todoistTask.description
                                    }
                                }]
                        }
                    }]
            });
        }
        else {
            notionApi.pages.create({
                "parent": {
                    "type": "database_id",
                    "database_id": databaseId
                },
                "properties": {
                    "Task": {
                        "title": [{
                                "text": {
                                    "content": todoistTask.content
                                }
                            }]
                    },
                    "ID": {
                        "number": Number(todoistTask.id)
                    },
                    "Status": {
                        "checkbox": todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    }
                },
                "children": [{
                        "object": "block",
                        "paragraph": {
                            "rich_text": [{
                                    "text": {
                                        "content": todoistTask.description
                                    }
                                }]
                        }
                    }]
            });
        }
    });
}
function IDSearchNotion(ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchResults = yield notionApi.databases.query({
            database_id: databaseId,
            filter: {
                and: [{
                        property: "ID",
                        number: {
                            equals: ID
                        }
                    }]
            }
        });
        if (searchResults.results.length === 0) {
            return false;
        }
        return true;
    });
}
function notionUpToDateCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskList = yield todoistApi.getTasks({
            filter: "created: today"
        });
        console.log(taskList);
        let latestElement = taskList[taskList.length - 1];
        let upToDate = yield IDSearchNotion(Number(latestElement.id));
        if (upToDate === false) {
            for (let i = 0; i < taskList.length; i++) {
                const todoistTask = taskList[i];
                const ID = Number(todoistTask.id);
                const notionSearchResult = yield IDSearchNotion(ID);
                if (notionSearchResult === false) {
                    newNotionTask(todoistTask);
                }
            }
        }
    });
}
notionUpToDateCheck();
