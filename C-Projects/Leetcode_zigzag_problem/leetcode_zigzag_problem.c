
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

// init_list initializes a list structure
void init_list(struct zigzag_list * list_ptr);

// append_list appends the zigzag list
struct zigzag_list * append_list(struct zigzag_list * list_ptr, char str, int row, int col);

// bubble sorts list rows
void bubble_sort_row(struct zigzag_list *list_ptr, int start_index,int end_index);

// bubble sorts list cols
void bubble_sort_col(struct zigzag_list *list_ptr, int start_index,int end_index);

// sorts rows whilst keeping the columns in relative order (zigzag order)
void combo_sort(struct zigzag_list *list_ptr);

// creates zigzag list
struct zigzag_list * create_list(char str[], int numRows);

// swap_list_item swaps the 2 list items at the indexes that were passed
void swap_list_item(struct zigzag_list *list_ptr, int index_a, int index_b);

// print_listprints the passed list
void print_list(struct zigzag_list *list_ptr);