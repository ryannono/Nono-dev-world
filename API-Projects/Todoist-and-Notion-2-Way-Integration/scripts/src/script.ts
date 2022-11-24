
import dotenv = require("dotenv"); // key environment
import { DueDate, Task, TodoistApi } from "@doist/todoist-api-typescript"; // todoist api
import { Client } from "@notionhq/client"; // notion api
import { getPageProperty, GetPagePropertyResponse, DatePropertyItemObjectResponse, NumberPropertyItemObjectResponse, PageObjectResponse, PartialPageObjectResponse, PropertyItemListResponse, PropertyItemObjectResponse, QueryDatabaseResponse, RichTextItemResponse, RichTextPropertyItemObjectResponse, TextRichTextItemResponse, TitlePropertyItemObjectResponse, UrlPropertyItemObjectResponse, CreatePageResponse, UpdatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { stringify } from "querystring";

// get keys from environment
dotenv.config();
const todoistKey:string = String(process.env.TODOISTKEY);
const notionKey:string = String(process.env.NOTIONKEY);
const databaseId:string = String(process.env.DATABASEID)


// start apis with auth keys
const todoistApi: TodoistApi = new TodoistApi(todoistKey);
const notionApi: Client = new Client({auth: notionKey});


// searchNotion queries notion for an ID and returns
// true if an element was found with the ID and false if not
async function IDSearchNotion(todoistID:number): Promise<PageObjectResponse> {
    
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

    return searchResults.results[0] as PageObjectResponse
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

// getNotionDueProperty return notions status
// property for the passed page
function getNotionStatusProperty(pageObject: PageObjectResponse): boolean{
    let propertiesObject = pageObject.properties as object;
    let map = objectToMap(propertiesObject);
    let checkboxContent = map.get("Status").checkbox as boolean;
    return checkboxContent;
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

// getNotionTitleProperty return notions title
// property for the passed page
function getNotionTitleProperty(pageObject: PageObjectResponse){
    let propertiesObject = pageObject.properties as object;
    let map = objectToMap(propertiesObject);
    let titleobject = map.get("Task").title as object;
    let text = objectToMap(objectToMap(titleobject).get("0")).get("plain_text");
    return text;
}

async function notionTasksPast24hours() {
    
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

    return queryResponse.results as Array<PageObjectResponse>;
}

async function notionNeedsUpdateTasks() {
    
    const queryResponse: QueryDatabaseResponse = await notionApi.databases.query({
        database_id: databaseId,
        filter: {
                "property": "Sync status",
                "select": {
                    "equals": "NeedsUpdate"
                }
        }
    });

    return queryResponse.results as Array<PageObjectResponse>;
}

// swapNotionSyncStatus swap the sync status from the passed page 
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

// newNotionTask creates a new page in the notion
// database matching the values in the todoist task
async function newNotionTask(todoistTask: Task){
    
    // If a due date exists create a new page with a
    // due date if not create a page without one
    const newNotionPage: CreatePageResponse = await notionApi.pages.create({

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
                    number : Number(todoistTask.id)
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
    
    const pageID = newNotionPage.id;
    if (todoistTask.due?.date != null && todoistTask.due.date != undefined) {
        notionApi.pages.update({
            page_id: pageID,
            "properties":{

                "Due":{
                    "date" : {
                        "start" : todoistTask.due.date
                    }
                },
            }
        })
    }
    
    return newNotionPage as PageObjectResponse;
}

// newNotionTask creates a new page in the notion
// database matching the values in the todoist task
async function updateNotionTask(notionPageID:string, todoistTask: Task) {
    
    // If a due date exists create a new page with a
    // due date if not create a page without one
    const updatedNotionPage: UpdatePageResponse = await notionApi.pages.update({
        page_id : notionPageID,
        "properties": {

                "Task": {
                    "title": [{
                        "text": { 
                            "content": todoistTask.content
                        }
                    }]
                },
                "TodoistID": {
                    number : Number(todoistTask.id)
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

    const pageID:string = updatedNotionPage.id;
    if (todoistTask.due?.date != null && todoistTask.due.date != undefined) {
        notionApi.pages.update({
            page_id: pageID,
            "properties":{

                "Due":{
                    "date" : {
                        "start" : todoistTask.due.date
                    }
                },
            }
        })
    }

    return updatedNotionPage as PageObjectResponse;
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

function myTodoistIndexOf(ID:string){
    
    let index:number;

    if (IDs.todoistTaskIDs.includes(String(ID))) {
        index = IDs.todoistTaskIDs.indexOf(String(ID));
    }
    else{
        index = IDs.todoistTaskIDs.length;
        IDs.todoistTaskIDs[index] = String(ID);
    }

    return index;
}

function myNotionIndexOf(ID:string){
    
    let index:number;

    if (IDs.notionPageIDs.includes(String(ID))) {
        index = IDs.notionPageIDs.indexOf(String(ID));
    }
    else{
        index = IDs.notionPageIDs.length;
        IDs.notionPageIDs[index] = String(ID);
    }

    return index;
}

async function checkTodoistCompletion(lastCheckedTodoistIndex:number, taskList:Array<Task>){
    
    if (lastCheckedTodoistIndex != 0 && taskList.length < lastCheckedTodoistIndex+1){

        for (let i = 0; i < IDs.todoistTaskIDs.length; i++) {
            const todoistID = IDs.todoistTaskIDs[i];
            let todoistTask = await todoistApi.getTask(todoistID);
            

            if (todoistTask.isCompleted){
                updateNotionTask(IDs.notionPageIDs[i],todoistTask);
            }
        }
        lastCheckedTodoistIndex = taskList.length-1
    }
    return lastCheckedTodoistIndex;
}

// notionUpToDateCheck checks if notion has the latest
// todoist tasks in its database. If it doesnt they are added.
async function notionUpToDateCheck(lastCheckedTodoistIndex: number) {

    console.log(lastCheckedTodoistIndex);

    // get list of todoist *active tasks created today
    let timeWindow: string = "created after: -24hours";
    const taskList:Array<Task> = await todoistApi.getTasks({filter: timeWindow});

    // check if a task was completed in todoist
    lastCheckedTodoistIndex = await checkTodoistCompletion(lastCheckedTodoistIndex,taskList);
    
    // check there exists tasks created today
    if (taskList.length > 0) {

        for (let i:number = lastCheckedTodoistIndex; i < taskList.length; i++) {
            
            const todoistTask: Task = taskList[i];
            const todoistID:number = Number(todoistTask.id);
            const notionPage: PageObjectResponse = await IDSearchNotion(todoistID);
            
            // if element not in notion yet create the notion page
            // and add its ID to the structure at the same index as 
            // it's Todoist counterpart
            if (!notionPage) {
                
                let notionPageID:string = (await newNotionTask(todoistTask)).id;
                
                let index:number = myTodoistIndexOf(String(todoistID))
                IDs.notionPageIDs[index] = notionPageID;
            }

            if (i === taskList.length-1) {
                return i;
            }
        }
    }
    // if there is no element in the
    // task list then the last checked is 0

    return 0;
    
}

async function notionUpdatesCheck() {
    
    // search for tasks identified to need to be updated
    const pageList = await notionNeedsUpdateTasks() as Array<PageObjectResponse>;

    // if any are present update them and amend their update indicator
    if (pageList.length != 0) {
        
        for (let i = 0; i < pageList.length; i++) {

            const notionPage = pageList[i] as PageObjectResponse;

            let notionTodoistID: string = getNotionTodoistIDProperty(notionPage);
            let notionPageID: string = notionPage.id;

            if (notionTodoistID === "false") {
                todoistUpToDateCheck(0);
            }
            else{
                updateTodoistTask(notionTodoistID,notionPage);
            }

            if (getNotionStatusProperty(notionPage)){
                todoistApi.closeTask(notionTodoistID);
            }

            swapNotionSyncStatus(notionPageID);
        }
    }
}

// todoistUpToDateCheck check if all new tasks from notion are present in todoist
// if not it adds them. The funtion also adds todoist's ID information on to the 
// notion database once the new task is created.
async function todoistUpToDateCheck(lastCheckedNotionIndex: number){
    
    // get notion tasks created in the past 24 hours
    let taskList = await notionTasksPast24hours() as Array<PageObjectResponse>;

    // if tasks were created in the past 24 hours
    if (taskList.length > 0) {
        
        // iterate through all the unchecked tasks
        for (let i = lastCheckedNotionIndex; i < taskList.length; i++) {

            // if notion task doesn't have an associated todoist ID
            // then it hasn't been synced to TodoIst yet so add it
            // with the appropriate values to todoist
            const notionPage = taskList[i];
            let notionTodoistID:number = getNotionTodoistIDProperty(notionPage).length;

            if (!notionTodoistID) {

                // create new Todoist task
                let todoistTask: Task = await newTodoistTask(notionPage)
                    
                // update notion task to have todoist id and url
                let notionPageId = notionPage.id;
                updateNotionTask(notionPageId,todoistTask);

                // add newly created task id to the structure
                let index:number = myNotionIndexOf(notionPageId);
                IDs.todoistTaskIDs[index] = todoistTask.id;
            }

            // if we've reached the last element
            // return it's index
            if (i === taskList.length-1) {
                return i;
            }
        }
    }
    // if no tasks were created in the past 24 hours
    // return 0
    return 0;
}

async function todoistUpdatesCheck() {
    
    // get priority 3 task list from todoist
    const taskList = await todoistApi.getTasks({filter : "p3"}) as Array<Task>;

    // if the list has tasks
    if (taskList.length) {

        // iterate rhough them
        for (let i = 0; i < taskList.length; i++) {

            const todoistTask = taskList[i] as Task;
            let todoistID:string = todoistTask.id;

            // find matching notion page and update it
            // if page doesn't exit make sure notion is up to date
            const notionPage = await IDSearchNotion(Number(todoistID));

            if (!notionPage) {
                notionUpToDateCheck(0);
            }
            else{
                updateNotionTask(notionPage.id,todoistTask);
            }
            
            // update task priority bak to level 1
            todoistApi.updateTask(todoistID,{priority : 1}) 
        }
    }
}

async function storeCurrentSyncedTasks() {
    
    const todoistTaskList = await todoistApi.getTasks();
    for (let i = 0; i < todoistTaskList.length; i++) {
        const todoistTask:Task = todoistTaskList[i];
        let todoistID = todoistTask.id;

        IDs.todoistTaskIDs[i] = todoistID;
        IDs.notionPageIDs[i] = (await IDSearchNotion(Number(todoistID))).id;
    }

    // console.log(IDs.todoistTaskIDs);
    // console.log(IDs.notionPageIDs);
}

let latestNotionIndex:number = 0;
let latestTodoistIndex:number = 0;

const IDs = {
    todoistTaskIDs : [] as Array<string>,
    notionPageIDs : [] as Array<string>
}

storeCurrentSyncedTasks();

// let minute:number = 60 * 1000;
// // min interval == 5 seconds
setInterval(() => {
    notionUpToDateCheck(latestNotionIndex)
        .then((value) => latestNotionIndex = value)
        .then(() => notionUpdatesCheck());
    todoistUpToDateCheck(latestTodoistIndex)
       .then((value) => latestTodoistIndex = value)
       .then(() => todoistUpdatesCheck());
}, 5000);

