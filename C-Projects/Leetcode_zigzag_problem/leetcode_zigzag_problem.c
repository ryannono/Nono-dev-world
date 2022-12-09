
#include "leetcode_zigzag_problem.h"


int main(){

    char * str = "PAYPALISHIRING";
    int numRows = 3;

    if (numRows == 1){
        printf("\nThe answer is: %s\n\n", str);
    }
    else{
        struct zigzag_list * list_ptr = create_list(str,numRows);
        printf("\nThe answer is: %s\n\n", list_ptr->letters);
        list_ptr = NULL;
        free(list_ptr);
    }

    return 0;
}

// Zigzag list ADT funtion prototypes below//////////////////////////////
// see '.h' file for implementation

/* Initializing the list structure. */
void init_list(struct zigzag_list * list_ptr);

/* Appending the list with the passed character, row and column. */
struct zigzag_list * append_list(struct zigzag_list * list_ptr, char str, int row, int col);

/* Sorting the list by rows in ascending order. */
void bubble_sort_row(struct zigzag_list *list_ptr, int start_index,int end_index);

/* Sorting the list by columns in ascending order. */
void bubble_sort_col(struct zigzag_list *list_ptr, int start_index,int end_index);

/* Sorting the rows whilst keeping the columns in relative order (zigzag order). */
void combo_sort(struct zigzag_list *list_ptr);

/* Creating a zigzag list from the passed string and number of rows. */
struct zigzag_list * create_list(char str[], int numRows);

/* Swapping the 2 list items at the indexes that were passed. */
void swap_list_item(struct zigzag_list *list_ptr, int index_a, int index_b);

/* A function that prints the passed list. */
void print_list(struct zigzag_list *list_ptr);

