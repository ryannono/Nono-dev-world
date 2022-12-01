
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

// create_list() returns an empty newly -created list of students
// note: caller must free using free_list
struct slist * create_list(){

    struct slist * new_list_ptr = malloc(sizeof(struct slist));
    new_list_ptr->front = NULL;

    return new_list_ptr;
}

// create_node dynamically creates a new node with the given params 
// requires node is freed
struct snode * create_node(char * name, int id, struct snode * next){

    int len = strlen(name) + 1;
    struct snode * new_node = malloc(sizeof(struct snode));
    new_node->name = malloc(len*sizeof(char));

    strcpy(new_node->name, name);
    new_node->id = id;
    new_node->next = next;

    return new_node;
}

// insert_student(id, name , lst) attempts to add a student with given id and
// name into the given list lst; if a student with that id is already in the
// list then return false , otherwise lst is modified and true is returned
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

// remove_student(id, lst) attempts to remove a student with given id from the
// given list and free the memory allocated to that student; true is returned
// if successful and false otherwise
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

// find_student(id, lst) returns the name of the student with given id in the
// given list lst in a dynamically -allocated string (that the caller must
// free) or NULL if no student has that id
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

// free_list (lst) deallocates all memory associated with the given list lst
// including the memory used by the student records in the list
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

    struct slist * lst = create_list();

    insert_student(8572952,"Jane",lst);
    insert_student(00010001,"Don",lst);
    insert_student(12121212,"Chris",lst);
    insert_student(12282727,"Chris",lst);
    insert_student(110005137,"Ryan",lst);

    // find student returns null
    // when id is not in list
    assert(find_student(121012912, lst) == NULL);

    // find student works
    // when id is in list
    char * student_name = find_student(8572952, lst);
    assert(strcmp(student_name, "Jane") == 0);
    free(student_name);



    // check insert student returns
    // false if id already in list
    assert(insert_student(110005137,"Dave",lst) == false);

    // check insert student adds student
    // when the id is not yet in the list
    assert(find_student(110105137,lst) == NULL); // student not in list
    assert(insert_student(110105137,"Dave",lst) == true); // student inserted
    student_name = find_student(110105137,lst);
    assert(strcmp(student_name, "Dave") == 0); // student now in list
    free(student_name);



    // check remove student returns
    // null if id not in list
    assert(remove_student(11111111,lst) == false);

    // check remove student removes
    // student if the id is in the list
    // and positioned at the front
    student_name = find_student(110105137,lst);
    assert(strcmp(student_name, "Dave") == 0); // student in list
    assert(remove_student(110105137,lst) == true); // student removed
    assert(find_student(110105137,lst) == NULL); // student no longer in list
    free(student_name);

    // check remove student removes
    // student if the id is in the list
    // anywhere other than the front
    student_name = find_student(00010001,lst);
    assert(strcmp(student_name, "Don") == 0); // student in list
    assert(remove_student(00010001,lst) == true); // student removed
    assert(find_student(00010001,lst) == NULL); // student no longer in list
    free(student_name);

    
    free_list(lst);

    return 0;
}