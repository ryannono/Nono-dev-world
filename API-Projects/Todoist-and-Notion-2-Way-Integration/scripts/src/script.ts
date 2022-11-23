
import dotenv = require("dotenv"); // key environment
import { DueDate, Task, TodoistApi } from "@doist/todoist-api-typescript"; // todoist api
import { Client } from "@notionhq/client"; // notion api
import { getPageProperty, GetPagePropertyResponse, DatePropertyItemObjectResponse, NumberPropertyItemObjectResponse, PageObjectResponse, PartialPageObjectResponse, PropertyItemListResponse, PropertyItemObjectResponse, QueryDatabaseResponse, RichTextItemResponse, RichTextPropertyItemObjectResponse, TextRichTextItemResponse, TitlePropertyItemObjectResponse, UrlPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { stringify } from "querystring";

// get keys from environment
dotenv.config();
const todoistKey:string = String(process.env.TODOISTKEY);
const notionKey:string = String(process.env.NOTIONKEY);
const databaseId:string = String(process.env.DATABASEID)


// start apis with auth keys
const todoistApi: TodoistApi = new TodoistApi(todoistKey);
const notionApi: Client = new Client({auth: notionKey});


// newNotionTask creates a new page in the notion
// database matching the values in the todoist task
async function newNotionTask(todoistTask: Task): Promise<void> {
    
    // If a due date exists create a new page with a
    // due date if not create a page without one
    let dueDate = todoistTask.due
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
                    "Due":{
                        "date" : {
                            "start" : dueDate.date
                        }
                    },
                    "TodoistID": {
                        "rich_text": [{
                            "type" : "text",
                            "text": {
                                "content" : todoistTask.id
                            }
                        }]
                    },
                    "Status":{
                        "checkbox" : todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    },
                    "Description": {
                        "rich_text": [{
                            "type" : "text",
                            "text": {
                                "content" : todoistTask.description
                            }
                        }]
                    },
                    "Sync status" : {
                        select : {
                            "name" : "Updated"
                        }
                    },
                    
            }

        });
    }
    else{
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
                    "TodoistID":{
                        "number" : Number(todoistTask.id)
                    },
                    "Status":{
                        "checkbox" : todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    },
                    "Description": {
                        "rich_text": [{
                            "type" : "text",
                            "text": {
                                "content" : todoistTask.description
                            }
                        }]
                    },
                    "Sync status" : {
                        select : {
                            "name" : "Updated"
                        }
                    }
                    
            },
    
        });
    }
}

// newNotionTask creates a new page in the notion
// database matching the values in the todoist task
async function updateNotionTask(notionPageID:string, todoistTask: Task): Promise<void> {
    
    // If a due date exists create a new page with a
    // due date if not create a page without one
    let dueDate = todoistTask.due
    if (dueDate != null) {
        notionApi.pages.update({
            page_id : notionPageID,
            "properties": {

                    "Task": {
                        "title": [{
                            "text": { 
                                "content": todoistTask.content
                            }
                        }]
                    },
                    "Due":{
                        "date" : {
                            "start" : dueDate.date
                        }
                    },
                    "TodoistID": {
                        "rich_text": [{
                            "type" : "text",
                            "text": {
                                "content" : todoistTask.id
                            }
                        }]
                    },
                    "Status":{
                        "checkbox" : todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    },
                    "Description": {
                        "rich_text": [{
                            "type" : "text",
                            "text": {
                                "content" : todoistTask.description
                            }
                        }]
                    },
                    "Sync status" : {
                        select : {
                            "name" : "Updated"
                        }
                    },
                    
            }

        });
    }
    else{
        notionApi.pages.update({
            page_id : notionPageID,
            "properties": {
    
                    "Task": {
                        "title": [{
                            "text": { 
                                "content": todoistTask.content
                            }
                        }]
                    },
                    "TodoistID":{
                        "number" : Number(todoistTask.id)
                    },
                    "Status":{
                        "checkbox" : todoistTask.isCompleted
                    },
                    "URL": {
                        "url": todoistTask.url
                    },
                    "Description": {
                        "rich_text": [{
                            "type" : "text",
                            "text": {
                                "content" : todoistTask.description
                            }
                        }]
                    },
                    "Sync status" : {
                        select : {
                            "name" : "Updated"
                        }
                    }
                    
            },
    
        });
    }
}

// searchNotion queries notion for an ID and returns
// true if an element was found with the ID and false if not
async function IDSearchNotion(todoistID:number): Promise<boolean> {
    
    const searchResults: QueryDatabaseResponse = await notionApi.databases.query({
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

    //console.log(searchResults);

    if (searchResults.results.length === 0) {
        //console.log("yup");
        return false
    }
    return true
}

// notionUpToDateCheck checks if notion has the latest
// todoist tasks in its database. If it doesnt they are added.
async function notionUpToDateCheck(lastCheckedTodoistIndex: number): Promise<number> {
    
    if (lastCheckedTodoistIndex === -1) {
        lastCheckedTodoistIndex = 0;
    }

    // get list of todoist tasks created today
    const taskList:Array<Task> = await todoistApi.getTasks({
        filter: "created after: -24hours"
    });

    // get newest (last element in tasklist) task in
    // todoist and check if it is in notion
    let latestElement:Task = taskList[taskList.length-1];
    if (latestElement != undefined) {

        let upToDate:boolean = await IDSearchNotion(Number(latestElement.id));
        // if task was not found then notion is not up to
        // date so go through all the tasks and add all the
        // ones that aren't in notion yet
        if (upToDate === false) {
            
            for (let i = lastCheckedTodoistIndex; i < taskList.length; i++) {
                console.log(i);
                const todoistTask: Task = taskList[i];
                const todoistID:number = Number(todoistTask.id);
                const notionSearchResult:boolean = await IDSearchNotion(todoistID);
                
                if (notionSearchResult === false) {
                    newNotionTask(todoistTask);
                }

                if (i === taskList.length-1) {
                    return i;
                }
            }
        }
    }
    
    return taskList.length-1; // no element in list
}

// objectToMap takes in a object and returns it in a map format
function objectToMap(object: any): Map<any,any>{
    const keys = Object.keys(object);
    const map = new Map();
    for (let i = 0; i < keys.length; i++) {
        
        map.set(keys[i], object[keys[i]]);
    }
    return map;
}

// getNotionTitleProperty return notions title
// property for the passed page
function getNotionTitleProperty(pageObject: PageObjectResponse){
    let propertiesObject = pageObject.properties as object;
    let map = objectToMap(propertiesObject);
    let titleobject = map.get("Task").title as object;
    let text = objectToMap(objectToMap(titleobject).get("0")).get("plain_text");
    return text;
}

// getNotionDescriptionProperty return notions description
// property for the passed page
function getNotionDescriptionProperty(pageObject: PageObjectResponse){
    let propertiesObject = pageObject.properties as object;
    let map = objectToMap(propertiesObject);
    let richTextObject = map.get("Description").rich_text as Array<any>;
    if (richTextObject.length === 0) {
        return "";
    }
    let text = objectToMap(objectToMap(richTextObject).get("0")).get("plain_text");
    return text
}

// getNotionDueProperty return notions due
// property for the passed page
function getNotionDueProperty(pageObject: PageObjectResponse){
    let propertiesObject = pageObject.properties as object;
    let map = objectToMap(propertiesObject);
    let dateObject = map.get("Due").date as object;
    if (dateObject === null) {
        return "";
    }
    let date = objectToMap(dateObject).get("start");
    return date;
}

// getNotionTodoistIDProperty return notions TodoistID
// property for the passed page
function getNotionTodoistIDProperty(pageObject: PageObjectResponse){
    let propertiesObject = pageObject.properties as object;
    let map = objectToMap(propertiesObject);
    let number = map.get("TodoistID").number as object;
    return (String(number) === "null") ? "" : String(number);
}

// getNotionTodoistURLProperty return notions URL
// property for the passed page
function getNotionTodoistURLProperty(pageObject: PageObjectResponse){
    let propertiesObject = pageObject.properties as object;
    let map = objectToMap(propertiesObject);
    let richTextObject = map.get("URL").rich_text as Array<any>;
    if (richTextObject.length === 0) {
        return "";
    }
    let url = objectToMap(objectToMap(richTextObject).get("0")).get("plain_text");
    return url
}

// newTodoistTask creates a new todoist task with all the notion values
async function newTodoistTask(notionPageObject: PageObjectResponse) {
    
    let notionTitle = getNotionTitleProperty(notionPageObject);
    let notionDescription = getNotionDescriptionProperty(notionPageObject);
    let notionDue = getNotionDueProperty(notionPageObject);

    let newTask = await todoistApi.addTask({
        content: notionTitle,
        description: notionDescription,
        dueDate: notionDue
    })

    return newTask;
}

async function updateTodoistTask(taskID:string, notionPageObject: PageObjectResponse) {
    
    let notionTitle = getNotionTitleProperty(notionPageObject);
    let notionDescription = getNotionDescriptionProperty(notionPageObject);
    let notionDue = getNotionDueProperty(notionPageObject);

    let newTask = await todoistApi.updateTask(taskID,{
        content: notionTitle,
        description: notionDescription,
        dueDate: notionDue
    })

    return newTask;
}

// todoistUpToDateCheck check if all new tasks from notion are present in todoist
// if not it adds them. The funtion also adds todoist's ID information on to the 
// notion database once the new task is created.
async function todoistUpToDateCheck(lastCheckedNotionIndex: number){
    if (lastCheckedNotionIndex === -1) {
        lastCheckedNotionIndex = 0;
    }
    // get time 24 hours ago
    let timeWindow: Date = new Date;
    timeWindow.setHours(timeWindow.getHours() - 24);
    let isoTimeWindow: string = timeWindow.toISOString();

    // query notion database with past 24 hours filter
    const queryResponse: QueryDatabaseResponse = await notionApi.databases.query({
        database_id: databaseId,
        filter: {
                "timestamp": "created_time",
                "created_time": {
                        "after": isoTimeWindow
                }
        }
    });

    // declare info on notion task list
    let taskList = queryResponse.results as Array<PageObjectResponse>;
    let latestElement = taskList[taskList.length-1] as PageObjectResponse;

    // when a latest element exists
    if (latestElement != undefined) {
        
        for (let i = lastCheckedNotionIndex; i < taskList.length; i++) {
            const element = taskList[i];

            let todoistID = getNotionTodoistIDProperty(element);
            
            // if notion task doesn't have an associated todoist ID
            // then it hasn't been synced to TodoIst yet
            if (todoistID.length === 0) {

                // create new Todoist task
                let newTask: Task = await newTodoistTask(element)
                    
                // update notion task to have todoist id and url
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
                            "url" : createdTodoistURL
                        }
                    }
                })

                if (i === taskList.length-1) {
                    return i;
                }

            }


        }
    }

    return taskList.length-1;
}

async function swapNotionSyncStatus(notionPageID:string) {
    notionApi.pages.update({
        page_id : notionPageID,
        properties : {
            "Sync status" : {
                select : {
                    "name" : "Updated"
                }
            }
        }
    })
}

async function notionUpdatesCheck() {
    
    // search for tasks identified to need to be updated
    const queryResponse: QueryDatabaseResponse = await notionApi.databases.query({
        database_id: databaseId,
        filter: {
                "property": "Sync status",
                "select": {
                    "equals": "NeedsUpdate"
                }
        }
    });

    // if any are present update them and amend their update indicator
    if (queryResponse.results.length != 0) {
        
        for (let i = 0; i < queryResponse.results.length; i++) {
            const element = queryResponse.results[i] as PageObjectResponse;

            let elementTodoistID = getNotionTodoistIDProperty(element);
            let notionPageID = element.id
            await updateTodoistTask(elementTodoistID,element);
            swapNotionSyncStatus(notionPageID);
        }
    }
}

async function todoistUpdatesCheck() {
    
    const queryResponse = await todoistApi.getTasks({
        filter : "p3"
    })

    if (queryResponse.length != 0) {

        for (let i = 0; i < queryResponse.length; i++) {
            const element = queryResponse[i] as Task;
            let taskID = element.id;

            const notionQueryResponse: QueryDatabaseResponse = await notionApi.databases.query({
                database_id: databaseId,
                filter: {
                        "property": "TodoistID",
                        "number" : {
                            "equals" : Number(taskID)
                        }
                }
            });

            let notionPage = notionQueryResponse.results[0] as PageObjectResponse;
            let notionPageID = notionPage.id;

            updateNotionTask(notionPageID,element);
            todoistApi.updateTask(taskID,{
                priority : 1
            })
            
        }
    }
    
}


// For todoist updating function check if a p3 flag was attached to any item
// if a label was attached update all notion's fields to match
// then remove the flag from the item. Do this at the same time as the other functions

// For the notion task updating check that label area is empty if it isn't sync
// updates to todoist and then clear the label property

// periodically check status on incomplete notion tasks - 
// if they are complete in todoist complete them
// Also check completed tasks in notion and make sure they are complete in todoist
let latestNotionIndex:number = 0;
let latestTodoistIndex:number = 0;

let minute:number = 60 * 1000;

// setInterval(() => {
//     notionUpdatesCheck();
//     notionUpToDateCheck(latestNotionIndex)
//         .then((value) => latestNotionIndex = value);
//     todoistUpToDateCheck(latestTodoistIndex)
//         .then((value) => latestTodoistIndex = value);
// }, 1 * minute);

todoistUpdatesCheck();

