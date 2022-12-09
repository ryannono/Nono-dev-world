#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
#include <string.h>

struct zigzag_list{
    char * letters;
    int * row;
    int * col;
    int len;
    int max_len;
};

// init_list initializes a list structure
void init_list(struct zigzag_list * list_ptr){
    list_ptr->max_len = 1;
    list_ptr->len = 0;
    list_ptr->col = (int*)malloc(1*sizeof(int));
    list_ptr->row = (int*)malloc(1*sizeof(int));
    list_ptr->letters = (char*)malloc(1*sizeof(char));
}

// append_list appends the zigzag list
struct zigzag_list * append_list(struct zigzag_list * list_ptr, char str, int row, int col){
    
    if (list_ptr->len == list_ptr->max_len){
        list_ptr->max_len *= 2;
        list_ptr->col = (int*)realloc(list_ptr->col,list_ptr->max_len*sizeof(int));
        list_ptr->row = (int*)realloc(list_ptr->row,list_ptr->max_len*sizeof(int));
        list_ptr->letters = (char*)realloc(list_ptr->letters,list_ptr->max_len*sizeof(char));
    }
    
    list_ptr->letters[list_ptr->len] = str;
    list_ptr->row[list_ptr->len] = row;
    list_ptr->col[list_ptr->len] = col;

    list_ptr->len += 1;

    return list_ptr;
}

// bubble sorts list rows
void bubble_sort_row(struct zigzag_list *list_ptr, int start_index,int end_index){

    int swap_counter = -1;

    while (swap_counter != 0){

        swap_counter = 0;

        for (int i = start_index; i+1 < end_index+1; i++){

            if (list_ptr->row[i] > list_ptr->row[i+1]){
                swap_list_item(list_ptr,i,i+1);
                swap_counter++;
            }
    
        }
        
    }
    
}

// bubble sorts list cols
void bubble_sort_col(struct zigzag_list *list_ptr, int start_index,int end_index){

    int swap_counter = -1;

    while (swap_counter != 0){

        swap_counter = 0;

        for (int i = start_index; i+1 < end_index+1; i++){

            if (list_ptr->col[i] > list_ptr->col[i+1]){
                swap_list_item(list_ptr,i,i+1);
                swap_counter++;
            }
    
        }
        
    }
    
}

// sorts rows whilst keeping the columns in relative order (zigzag order)
void combo_sort(struct zigzag_list *list_ptr){

    bubble_sort_row(list_ptr,0,list_ptr->len-1);

    int comp = list_ptr->row[0];
    int i = 0;
    int count = 0;
    int length = list_ptr->len;
    
    // while the value of i hasnt reached a
    // value greater than that of the max row
    while (i < length){
        count = 0;
        // count the number of elements have
        // that same row number
        while (list_ptr->row[count+i] == comp){
            count++;
        }

        bubble_sort_col(list_ptr,i,count-1+i);
        comp = list_ptr->row[count+i];
        i += count;
    }
}

// creates zigzag list
struct zigzag_list * create_list(char str[], int numRows){

    struct zigzag_list * list_ptr = (struct zigzag_list*)malloc(sizeof(struct zigzag_list));
    init_list(list_ptr);

    int current_r = 0;
    int current_c = 0;
    int last_row_index = numRows-1;
    int length = strlen(str);

    int i = 0;

    if (length == 1){
        list_ptr->letters[0] = str[i];
        list_ptr->letters[1] = '\0';
        list_ptr->len=1;
        list_ptr->max_len=2;
        list_ptr->col[0]=0;
        list_ptr->row[0]=0;
    }
    else{
        while(str[i]){
            if (current_r < last_row_index){

                // append element to the list with its rank
                list_ptr = append_list(list_ptr,str[i],current_r,current_c);

                i++;
                current_r++;
            }
            else{
                while (current_r != 0 && i < length){
                    
                    // append element to the list with its rank
                    list_ptr = append_list(list_ptr,str[i],current_r,current_c);

                    i++;
                    current_r--;
                    current_c++;
                }
            }
        }
    }
    list_ptr->letters[list_ptr->len] = '\0';
    combo_sort(list_ptr);

    return list_ptr;
}

// swap_list_item swaps the 2 list items at the indexes that were passed
void swap_list_item(struct zigzag_list *list_ptr, int index_a, int index_b){

     // set temp
    int temp_row = list_ptr->row[index_a];
    int temp_col = list_ptr->col[index_a];
    char temp_letter = list_ptr->letters[index_a];

    // swap a with b
    list_ptr->row[index_a] = list_ptr->row[index_b];
    list_ptr->col[index_a] = list_ptr->col[index_b];
    list_ptr->letters[index_a]= list_ptr->letters[index_b];

    // b with temp(previous a)
    list_ptr->row[index_b] = temp_row;
    list_ptr->col[index_b] = temp_col;
    list_ptr->letters[index_b] = temp_letter;
}

// print_listprints the passed list
void print_list(struct zigzag_list *list_ptr){
    
    printf("\n\n    ZigZag Indices\t\tLetters\n\n");

    for (int i = 0; i < list_ptr->len ; i++){
        printf("\t[%d]", list_ptr->row[i]);
        printf("[%d]\t", list_ptr->col[i]);
        printf("\t\t- %c\n", list_ptr->letters[i]);
    }
}

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