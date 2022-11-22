
import dotenv = require("dotenv"); // key environment
import { Task, TodoistApi } from "@doist/todoist-api-typescript"; // todoist api
import { Client } from "@notionhq/client"; // notion api
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

// get keys from environment
dotenv.config();
const todoistKey:string = String(process.env.TODOISTKEY);
const notionKey:string = String(process.env.NOTIONKEY);
const databaseId:string = String(process.env.DATABASEID)


// start api with auth key
const todoistApi: TodoistApi = new TodoistApi(todoistKey);
const notionApi: Client = new Client({auth: notionKey});


// newNotionTask creates a new page in the notion
// database matching the values in the todoist task
async function newNotionTask(todoistTask: Task){
    
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
                    "Due date":{
                        "date" : {
                            "start" : dueDate.date
                        }
                    },
                    "ID":{
                        "number" : Number(todoistTask.id)
                    },
                    "Status":{
                        "checkbox" : todoistTask.isCompleted
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
                    "ID":{
                        "number" : Number(todoistTask.id)
                    },
                    "Status":{
                        "checkbox" : todoistTask.isCompleted
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
}

// searchNotion queries notion for an ID and returns
// true if an element was found with the ID and false if not
async function IDSearchNotion(ID:number) {
    
    const searchResults: QueryDatabaseResponse = await notionApi.databases.query({
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

    //console.log(searchResults);

    if (searchResults.results.length === 0) {
        //console.log("yup");
        return false
    }
    return true
}

// notionUpToDateCheck checks if notion has the latest
// todoist tasks in its database. If it doesnt they are added.
async function notionUpToDateCheck() {
    
    // get list of todoist tasks created today
    const taskList:Array<Task> = await todoistApi.getTasks({
        filter: "created: today"
    });
    console.log(taskList);

    // get newest (last element in tasklist) task in
    // todoist and check if it is in notion
    let latestElement:Task = taskList[taskList.length-1];
    let upToDate:boolean = await IDSearchNotion(Number(latestElement.id));
    
    // if task was not found then notion is not up to
    // date so go through all the tasks and add all the
    // ones that aren't in notion yet
    if (upToDate === false) {
        
        for (let i = 0; i < taskList.length; i++) {
            
            const todoistTask: Task = taskList[i];
            const ID:number = Number(todoistTask.id);
            const notionSearchResult:boolean = await IDSearchNotion(ID);
            
            if (notionSearchResult === false) {
                newNotionTask(todoistTask);
            }
        }
    }
    

}

// async function addTasktoTodoist() {
//     return await notionApi.databases.retrieve({database_id: databaseId});
// }



// let date = new Date("2011-08-12T20:17:46.384Z")
// todoistToNotion(date).then( taskList => {
//     console.log(taskList);
// })
notionUpToDateCheck();


// retrieveNotionDatabse().then( databaseItems => {
//     console.log(databaseItems);
// })

