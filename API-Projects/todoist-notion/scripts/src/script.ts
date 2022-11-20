
import dotenv = require("dotenv"); // key environment
import { Task, TodoistApi } from "@doist/todoist-api-typescript"; // todoist api
import { Client } from "@notionhq/client"; // notion api

// {
//     "and": [
//       {
//         "property": "Done",
//         "checkbox": {
//           "equals": true
//         }
//       }, 
//       {
//         "or": [
//           {
//             "property": "Tags",
//             "contains": "A"
//           },
//           {
//             "property": "Tags",
//             "contains": "B"
//           }
//         ]
//       }
//     ]
//   }



const response = await notion.pages.create({
    "cover": {
        "type": "external",
        "external": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
        }
    },
    "icon": {
        "type": "emoji",
        "emoji": "🥬"
    },
    "parent": {
        "type": "database_id",
        "database_id": "d9824bdc-8445-4327-be8b-5b47500af6ce"
    },
    "properties": {
        "Name": {
            "title": [
                {
                    "text": {
                        "content": "Tuscan kale"
                    }
                }
            ]
        },
        "Description": {
            "rich_text": [
                {
                    "text": {
                        "content": "A dark green leafy vegetable"
                    }
                }
            ]
        },
        "Food group": {
            "select": {
                "name": "🥬 Vegetable"
            }
        }
    },
    "children": [
        {
            "object": "block",
            "heading_2": {
                "rich_text": [
                    {
                        "text": {
                            "content": "Lacinato kale"
                        }
                    }
                ]
            }
        },
        {
            "object": "block",
            "paragraph": {
                "rich_text": [
                    {
                        "text": {
                            "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                            "link": {
                                "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
                            }
                        },
                        "href": "https://en.wikipedia.org/wiki/Lacinato_kale"
                    }
                ],
                "color": "default"
            }
        }
    ]
});
async function addTasktoNotion() {
    
    const taskList:Array<Task> = await todoistApi.getTasks();

    // iterate through todoist's active tasks
    for (let i = 0; i < taskList.length; i++) {
        
        const task:Task = taskList[i];
        
        // if task is not yet completed check that it
        // is present in notion database
        if (task.isCompleted === false) {

            const notionDatabaseSearchResult = await notionApi.databases.query({
                database_id: databaseId,
                filter: {
                    "and": [{
                        "property": "URL",
                            "url": {
                                "equals" : task.url
                            }
                    }]
                }
            });

            if (notionDatabaseSearchResult.results.length === 0) {
                let newNotionTask = notionApi.pages.create({
                    "parent": {
                        "type": "database_id",
                        "database_id": databaseId
                    },
                    "properties": {
                        "Name": {
                            "title": [{
                                "text": {
                                    "content": task.content
                                }
                            }]
                        },
                        "ID": {
                            "URL": {
                                "text": {
                                    "content": task.url
                                }
                            }
                        }
                    },
                    "children": [{
                        "object": "block",
                        "paragraph": {
                            "rich_text": [{
                                "text": {
                                    "content": task.description
                                }
                            }]
                        }
                    }]
                });
            }
        }

        
    }
}

async function addTasktoTodoist() {
    return await notionApi.databases.retrieve({database_id: databaseId});
}

// get keys from environment
dotenv.config();
const todoistKey:string = String(process.env.TODOISTKEY);
const notionKey:string = String(process.env.NOTIONKEY);
const databaseId:string = String(process.env.DATABASEID)


// start api with auth key
const todoistApi: TodoistApi = new TodoistApi(todoistKey);
const notionApi: Client = new Client({auth: notionKey});

// 
// fetchTodoistTasks().then( taskList => {
//     console.log(taskList);
// })


// retrieveNotionDatabse().then( databaseItems => {
//     console.log(databaseItems);
// })

