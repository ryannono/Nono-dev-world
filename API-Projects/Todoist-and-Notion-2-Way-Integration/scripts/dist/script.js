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
        return searchResults.results[0];
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
function getNotionStatusProperty(pageObject) {
    let propertiesObject = pageObject.properties;
    let map = objectToMap(propertiesObject);
    let checkboxContent = map.get("Status").checkbox;
    return checkboxContent;
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
function getNotionTitleProperty(pageObject) {
    let propertiesObject = pageObject.properties;
    let map = objectToMap(propertiesObject);
    let titleobject = map.get("Task").title;
    let text = objectToMap(objectToMap(titleobject).get("0")).get("plain_text");
    return text;
}
function notionTasksPast24hours() {
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
        return queryResponse.results;
    });
}
function notionNeedsUpdateTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryResponse = yield notionApi.databases.query({
            database_id: databaseId,
            filter: {
                "property": "Sync status",
                "select": {
                    "equals": "NeedsUpdate"
                }
            }
        });
        return queryResponse.results;
    });
}
function swapNotionSyncStatus(notionPageID) {
    return __awaiter(this, void 0, void 0, function* () {
        notionApi.pages.update({
            page_id: notionPageID,
            properties: {
                "Sync status": {
                    select: {
                        "name": "Updated"
                    }
                }
            }
        });
    });
}
function newNotionTask(todoistTask) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const newNotionPage = yield notionApi.pages.create({
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
                    number: Number(todoistTask.id)
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
                },
                "Sync status": {
                    select: {
                        "name": "Updated"
                    }
                },
            }
        });
        const pageID = newNotionPage.id;
        if (((_a = todoistTask.due) === null || _a === void 0 ? void 0 : _a.date) != null && todoistTask.due.date != undefined) {
            notionApi.pages.update({
                page_id: pageID,
                "properties": {
                    "Due": {
                        "date": {
                            "start": todoistTask.due.date
                        }
                    },
                }
            });
        }
        return newNotionPage;
    });
}
function updateNotionTask(notionPageID, todoistTask) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const updatedNotionPage = yield notionApi.pages.update({
            page_id: notionPageID,
            "properties": {
                "Task": {
                    "title": [{
                            "text": {
                                "content": todoistTask.content
                            }
                        }]
                },
                "TodoistID": {
                    number: Number(todoistTask.id)
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
                },
                "Sync status": {
                    select: {
                        "name": "Updated"
                    }
                },
            }
        });
        const pageID = updatedNotionPage.id;
        if (((_a = todoistTask.due) === null || _a === void 0 ? void 0 : _a.date) != null && todoistTask.due.date != undefined) {
            notionApi.pages.update({
                page_id: pageID,
                "properties": {
                    "Due": {
                        "date": {
                            "start": todoistTask.due.date
                        }
                    },
                }
            });
        }
        return updatedNotionPage;
    });
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
function updateTodoistTask(taskID, notionPageObject) {
    return __awaiter(this, void 0, void 0, function* () {
        let notionTitle = getNotionTitleProperty(notionPageObject);
        let notionDescription = getNotionDescriptionProperty(notionPageObject);
        let notionDue = getNotionDueProperty(notionPageObject);
        let newTask = yield todoistApi.updateTask(taskID, {
            content: notionTitle,
            description: notionDescription,
            dueDate: notionDue
        });
        return newTask;
    });
}
function myTodoistIndexOf(ID) {
    let index;
    if (IDs.todoistTaskIDs.includes(String(ID))) {
        index = IDs.todoistTaskIDs.indexOf(String(ID));
    }
    else {
        index = IDs.todoistTaskIDs.length;
        IDs.todoistTaskIDs[index] = String(ID);
    }
    return index;
}
function myNotionIndexOf(ID) {
    let index;
    if (IDs.notionPageIDs.includes(String(ID))) {
        index = IDs.notionPageIDs.indexOf(String(ID));
    }
    else {
        index = IDs.notionPageIDs.length;
        IDs.notionPageIDs[index] = String(ID);
    }
    return index;
}
function checkTodoistCompletion(lastCheckedTodoistIndex, taskList) {
    return __awaiter(this, void 0, void 0, function* () {
        if (lastCheckedTodoistIndex != 0 && taskList.length < lastCheckedTodoistIndex + 1) {
            for (let i = 0; i < IDs.todoistTaskIDs.length; i++) {
                const todoistID = IDs.todoistTaskIDs[i];
                let todoistTask = yield todoistApi.getTask(todoistID);
                if (todoistTask.isCompleted) {
                    updateNotionTask(IDs.notionPageIDs[i], todoistTask);
                }
            }
            lastCheckedTodoistIndex = taskList.length - 1;
        }
        return lastCheckedTodoistIndex;
    });
}
function notionUpToDateCheck(lastCheckedTodoistIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(lastCheckedTodoistIndex);
        let timeWindow = "created after: -24hours";
        const taskList = yield todoistApi.getTasks({ filter: timeWindow });
        lastCheckedTodoistIndex = yield checkTodoistCompletion(lastCheckedTodoistIndex, taskList);
        if (taskList.length > 0) {
            for (let i = lastCheckedTodoistIndex; i < taskList.length; i++) {
                const todoistTask = taskList[i];
                const todoistID = Number(todoistTask.id);
                const notionPage = yield IDSearchNotion(todoistID);
                if (!notionPage) {
                    let notionPageID = (yield newNotionTask(todoistTask)).id;
                    let index = myTodoistIndexOf(String(todoistID));
                    IDs.notionPageIDs[index] = notionPageID;
                }
                if (i === taskList.length - 1) {
                    return i;
                }
            }
        }
        return 0;
    });
}
function notionUpdatesCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        const pageList = yield notionNeedsUpdateTasks();
        if (pageList.length != 0) {
            for (let i = 0; i < pageList.length; i++) {
                const notionPage = pageList[i];
                let notionTodoistID = getNotionTodoistIDProperty(notionPage);
                let notionPageID = notionPage.id;
                if (notionTodoistID === "false") {
                    todoistUpToDateCheck(0);
                }
                else {
                    updateTodoistTask(notionTodoistID, notionPage);
                }
                if (getNotionStatusProperty(notionPage)) {
                    todoistApi.closeTask(notionTodoistID);
                }
                swapNotionSyncStatus(notionPageID);
            }
        }
    });
}
function todoistUpToDateCheck(lastCheckedNotionIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let taskList = yield notionTasksPast24hours();
        if (taskList.length > 0) {
            for (let i = lastCheckedNotionIndex; i < taskList.length; i++) {
                const notionPage = taskList[i];
                let notionTodoistID = getNotionTodoistIDProperty(notionPage).length;
                if (!notionTodoistID) {
                    let todoistTask = yield newTodoistTask(notionPage);
                    let notionPageId = notionPage.id;
                    updateNotionTask(notionPageId, todoistTask);
                    let index = myNotionIndexOf(notionPageId);
                    IDs.todoistTaskIDs[index] = todoistTask.id;
                }
                if (i === taskList.length - 1) {
                    return i;
                }
            }
        }
        return 0;
    });
}
function todoistUpdatesCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskList = yield todoistApi.getTasks({ filter: "p3" });
        if (taskList.length) {
            for (let i = 0; i < taskList.length; i++) {
                const todoistTask = taskList[i];
                let todoistID = todoistTask.id;
                const notionPage = yield IDSearchNotion(Number(todoistID));
                if (!notionPage) {
                    notionUpToDateCheck(0);
                }
                else {
                    updateNotionTask(notionPage.id, todoistTask);
                }
                todoistApi.updateTask(todoistID, { priority: 1 });
            }
        }
    });
}
function storeCurrentSyncedTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const todoistTaskList = yield todoistApi.getTasks();
        for (let i = 0; i < todoistTaskList.length; i++) {
            const todoistTask = todoistTaskList[i];
            let todoistID = todoistTask.id;
            IDs.todoistTaskIDs[i] = todoistID;
            IDs.notionPageIDs[i] = (yield IDSearchNotion(Number(todoistID))).id;
        }
    });
}
let latestNotionIndex = 0;
let latestTodoistIndex = 0;
const IDs = {
    todoistTaskIDs: [],
    notionPageIDs: []
};
storeCurrentSyncedTasks();
setInterval(() => {
    notionUpToDateCheck(latestNotionIndex)
        .then((value) => latestNotionIndex = value)
        .then(() => notionUpdatesCheck());
    todoistUpToDateCheck(latestTodoistIndex)
        .then((value) => latestTodoistIndex = value)
        .then(() => todoistUpdatesCheck());
}, 5000);
