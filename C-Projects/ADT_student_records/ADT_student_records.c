
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
#include <string.h>

struct snode {
    int id;
    char * name;
    struct snode * next;
};

struct slist {
    struct snode * front;
};

/**
 * It creates a new list of students.
 * note: caller must free using free_list
 * @return A pointer to a struct slist
 */
struct slist * create_list(){

    struct slist * new_list_ptr = malloc(sizeof(struct slist));
    new_list_ptr->front = NULL;

    return new_list_ptr;
}

/**
 * `create_node` dynamically creates a new node with the given params
 * requires node is freed
 * 
 * @param name the name of the student
 * @param id the id of the node
 * @param next the next node in the list
 * 
 * @return A pointer to a struct snode
 */
struct snode * create_node(char * name, int id, struct snode * next){

    int len = strlen(name) + 1;
    struct snode * new_node = malloc(sizeof(struct snode));
    new_node->name = malloc(len*sizeof(char));

    strcpy(new_node->name, name);
    new_node->id = id;
    new_node->next = next;

    return new_node;
}

/**
 * It iterates through the list until it finds a node with the same id as the one we want to insert, if
 * it finds one it returns false, otherwise it creates a new node and sets it to be the front of the
 * list
 * 
 * @param id the id of the student to be inserted
 * @param name the name of the student to be added
 * @param lst a pointer to a list
 * 
 * @return if a student with that id is already in the list then return false , 
 * otherwise lst is modified and true
 */
bool insert_student(int id, char name[], struct slist * lst){

    // create pointer to front
    struct snode * current_node = lst->front;
     
    // iterate through the list until last node is reached
    // if the current node's id matches the one we want to 
    // insert return false
    while (current_node){
        if (current_node->id == id){
            return false;
        }
        current_node = current_node->next;
    }
    
    // create new node
    current_node = create_node(name,id,lst->front);

    // set it to be the front
    lst->front = current_node;

    return true;
}

/**
 * Iterate through the list until the node with the given id is found, then delete it
 * 
 * @param id the id of the student to remove
 * @param lst a pointer to a list
 * 
 * @return true is returned if successful and false otherwise
 */
bool remove_student(int id, struct slist * lst){

    // if the list is empty there's nothing to delete
    if (!lst->front){
        return false;
    }

    struct snode * current_node = lst->front;

    // iterate through the list until last node is reached (do not reach null)
    // if the front node or the next node's id matches the one we want to 
    // delete - delete it and return true
    while (1){
        if (current_node == lst->front && current_node->id == id){
            lst->front = lst->front->next;
            free(current_node);
            return true;
        }
        else if (current_node->next->id == id){
            struct snode * node_to_delete = current_node->next;
            current_node->next = node_to_delete->next;
            free(node_to_delete);
            return true;
        }
        else if (current_node->next->next){
            current_node = current_node->next;
        }
        else{
            break;
        }
    }

    // if the id was never found return false
    return false;
}

/**
 * The function iterates through the list, and if the id of the current node matches the id we're
 * looking for, it returns the name associated with that node
 * 
 * @param id the id of the student we're looking for
 * @param lst a pointer to the list
 * 
 * @return A pointer to the name of the student with the given id.
 */
char * find_student(int id, struct slist * lst){

    // nothing to find if no node in the list
    if (!lst->front){
        return NULL;
    }

    struct snode * current_node = lst->front;

    // iterate through the list
    // if node id matches id we're looking for
    // return name associated with that node
    while (current_node){
        
        if (current_node->id == id){
            int needed_len = strlen(current_node->name)+1;
            char * name = malloc(needed_len*sizeof(char));
            strcpy(name,current_node->name);
            return name;
        }

        current_node = current_node->next;
    }
    
    return NULL;
}

/**
 * It frees the memory allocated to the list.
 * 
 * @param lst a pointer to the list structure
 */
void free_list(struct slist * lst){

    // free space allocated to the name of each node
    // then free each node
    // keep doing so as long as a node exists
    while (lst->front){
        struct snode * previous_node = lst->front;
        lst->front = lst->front->next;

        free(previous_node->name);
        previous_node->name = NULL;

        free(previous_node);
        previous_node = NULL;
    }

    // free containing (list) structure
    free(lst);
    lst = NULL;
}

int main(){

    /* It creates a new list of students and adds 5 students to it. */
    struct slist * lst = create_list();
    insert_student(8572952,"Jane",lst);
    insert_student(00010001,"Don",lst);
    insert_student(12121212,"Chris",lst);
    insert_student(12282727,"Chris",lst);
    insert_student(110005137,"Ryan",lst);

    /* Checking that the function find_student returns NULL when the id is not in the list. */
    assert(find_student(121012912, lst) == NULL);

    /* Checking that the function find_student returns the name of the student with the given id. */
    char * student_name = find_student(8572952, lst);
    assert(strcmp(student_name, "Jane") == 0);
    free(student_name);



    /* Checking that the function insert_student returns false if the id is already in the list. */
    assert(insert_student(110005137,"Dave",lst) == false);


    /* Checking that the student is not in the list, then inserting the student, then checking that the
    student is in the list. */
    assert(find_student(110105137,lst) == NULL); // student not in list
    assert(insert_student(110105137,"Dave",lst) == true); // student inserted
    student_name = find_student(110105137,lst);
    assert(strcmp(student_name, "Dave") == 0); // student now in list
    free(student_name);



    /* It's checking that the function remove_student returns false if the id is not in the list. */
    assert(remove_student(11111111,lst) == false);

 
    // check remove student removes student if the id is in the list and positioned at the front
    student_name = find_student(110105137,lst);
    assert(strcmp(student_name, "Dave") == 0); // student in list
    assert(remove_student(110105137,lst) == true); // student removed
    assert(find_student(110105137,lst) == NULL); // student no longer in list
    free(student_name);

    // check remove student removes student if the id is in the list anywhere other than the front
    student_name = find_student(00010001,lst);
    assert(strcmp(student_name, "Don") == 0); // student in list
    assert(remove_student(00010001,lst) == true); // student removed
    assert(find_student(00010001,lst) == NULL); // student no longer in list
    free(student_name);

    
    /* It's freeing the memory allocated to the list. */
    free_list(lst);

    return 0;
}