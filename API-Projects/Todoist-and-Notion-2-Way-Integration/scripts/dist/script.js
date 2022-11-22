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
                    "Due": {
                        "date": {
                            "start": dueDate.date
                        }
                    },
                    "TodoistID": {
                        "rich_text": [{
                                "type": "text",
                                "text": {
                                    "content": todoistTask.id
                                }
                            }]
                    },
                    "Status": {
                        "checkbox": todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    },
                    "Description": {
                        "rich_text": [{
                                "type": "text",
                                "text": {
                                    "content": todoistTask.description
                                }
                            }]
                    }
                }
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
                    "TodoistID": {
                        "number": Number(todoistTask.id)
                    },
                    "Status": {
                        "checkbox": todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    },
                    "Description": {
                        "rich_text": [{
                                "type": "text",
                                "text": {
                                    "content": todoistTask.description
                                }
                            }]
                    }
                },
            });
        }
    });
}
function IDSearchNotion(todoistID) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchResults = yield notionApi.databases.query({
            database_id: databaseId,
            filter: {
                and: [{
                        property: "TodoistID",
                        number: {
                            equals: todoistID
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
function notionUpToDateCheck(lastCheckedTodoistIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskList = yield todoistApi.getTasks({
            filter: "created after: -24hours"
        });
        let latestElement = taskList[taskList.length - 1];
        console.log(latestElement);
        if (latestElement != undefined) {
            let upToDate = yield IDSearchNotion(Number(latestElement.id));
            if (upToDate === false) {
                for (let i = lastCheckedTodoistIndex; i < taskList.length; i++) {
                    console.log(i);
                    const todoistTask = taskList[i];
                    const todoistID = Number(todoistTask.id);
                    const notionSearchResult = yield IDSearchNotion(todoistID);
                    if (notionSearchResult === false) {
                        newNotionTask(todoistTask);
                    }
                    if (i === taskList.length - 1) {
                        return i;
                    }
                }
            }
        }
        return taskList.length - 1;
    });
}
function objectToMap(object) {
    const keys = Object.keys(object);
    const map = new Map();
    for (let i = 0; i < keys.length; i++) {
        map.set(keys[i], object[keys[i]]);
    }
    return map;
}
function getNotionTitleProperty(pageObject) {
    let propertiesObject = pageObject.properties;
    let map = objectToMap(propertiesObject);
    let titleobject = map.get("Task").title;
    let text = objectToMap(objectToMap(titleobject).get("0")).get("plain_text");
    return text;
}
function getNotionDescriptionProperty(pageObject) {
    let propertiesObject = pageObject.properties;
    let map = objectToMap(propertiesObject);
    let richTextObject = map.get("Description").rich_text;
    if (richTextObject.length === 0) {
        return "";
    }
    let text = objectToMap(objectToMap(richTextObject).get("0")).get("plain_text");
    return text;
}
function getNotionDueProperty(pageObject) {
    let propertiesObject = pageObject.properties;
    let map = objectToMap(propertiesObject);
    let dateObject = map.get("Due").date;
    if (dateObject === null) {
        return "";
    }
    let date = objectToMap(dateObject).get("start");
    return date;
}
function getNotionTodoistIDProperty(pageObject) {
    let propertiesObject = pageObject.properties;
    let map = objectToMap(propertiesObject);
    let number = map.get("TodoistID").number;
    return (String(number) === "null") ? "" : String(number);
}
function getNotionTodoistURLProperty(pageObject) {
    let propertiesObject = pageObject.properties;
    let map = objectToMap(propertiesObject);
    let richTextObject = map.get("URL").rich_text;
    if (richTextObject.length === 0) {
        return "";
    }
    let url = objectToMap(objectToMap(richTextObject).get("0")).get("plain_text");
    return url;
}
function newTodoistTask(notionPageObject) {
    return __awaiter(this, void 0, void 0, function* () {
        let notionTitle = getNotionTitleProperty(notionPageObject);
        let notionDescription = getNotionDescriptionProperty(notionPageObject);
        let notionDue = getNotionDueProperty(notionPageObject);
        let newTask = yield todoistApi.addTask({
            content: notionTitle,
            description: notionDescription,
            dueDate: notionDue
        });
        return newTask;
    });
}
function todoistUpToDateCheck(lastCheckedNotionIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let timeWindow = new Date;
        timeWindow.setHours(timeWindow.getHours() - 24);
        let isoTimeWindow = timeWindow.toISOString();
        const queryResponse = yield notionApi.databases.query({
            database_id: databaseId,
            filter: {
                "timestamp": "created_time",
                "created_time": {
                    "after": isoTimeWindow
                }
            }
        });
        let taskList = queryResponse.results;
        let latestElement = taskList[taskList.length - 1];
        if (latestElement != undefined) {
            for (let i = lastCheckedNotionIndex; i < taskList.length; i++) {
                const element = taskList[i];
                let todoistID = getNotionTodoistIDProperty(element);
                if (todoistID.length === 0) {
                    let newTask = yield newTodoistTask(element);
                    let createdTodoistID = newTask.id;
                    let createdTodoistURL = newTask.url;
                    let currentNotionPageId = element.id;
                    notionApi.pages.update({
                        page_id: currentNotionPageId,
                        properties: {
                            "TodoistID": {
                                "number": Number(createdTodoistID)
                            },
                            "URL": {
                                "url": createdTodoistURL
                            }
                        }
                    });
                    if (i === taskList.length - 1) {
                        return i;
                    }
                }
            }
        }
        return taskList.length - 1;
    });
}
let latestNotionIndex = 0;
let latestTodoistIndex = 0;
todoistUpToDateCheck(latestNotionIndex);
