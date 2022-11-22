
import dotenv = require("dotenv"); // key environment
import { Task, TodoistApi } from "@doist/todoist-api-typescript"; // todoist api
import { Client } from "@notionhq/client"; // notion api
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

// async function getTodoistLatestUpdateTime(previousLatestTaskTime: string) {
    
//     if (previousLatestTaskTime != "none") {
//         const timeDifference = 1;
//         const latestUpdateTime: string = await todoistApi.getTasks();
//     }
    
// }

// newNotionTask creates a new page in the notion
// database matching the values in the todoist task
async function newNotionTask(todoistTask: Task){
    
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

// searchNotion queries notion for an ID and returns
// true if an element was found with the ID and false if not
async function searchNotion(ID:number) {
    
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

async function todoistToNotion(lastCheckedDate: Date) {
    
    // get all tasks 
    const taskList:Array<Task> = await todoistApi.getTasks({
        filter: "created: today"
    });
    console.log(taskList);

    let latestElement:Task = taskList[taskList.length-1];
    let latestElementDate = new Date(latestElement.createdAt);
    if (latestElementDate > lastCheckedDate) {
        newNotionTask(latestElement);
    }



    

}

// async function addTasktoTodoist() {
//     return await notionApi.databases.retrieve({database_id: databaseId});
// }

// get keys from environment
dotenv.config();
const todoistKey:string = String(process.env.TODOISTKEY);
const notionKey:string = String(process.env.NOTIONKEY);
const databaseId:string = String(process.env.DATABASEID)


// start api with auth key
const todoistApi: TodoistApi = new TodoistApi(todoistKey);
const notionApi: Client = new Client({auth: notionKey});

// let date = new Date("2011-08-12T20:17:46.384Z")
// todoistToNotion(date).then( taskList => {
//     console.log(taskList);
// })
searchNotion(12);


// retrieveNotionDatabse().then( databaseItems => {
//     console.log(databaseItems);
// })

