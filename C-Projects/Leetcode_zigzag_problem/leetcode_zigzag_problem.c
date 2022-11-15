#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
#include <string.h>

struct letter_list{
    char letters[1000];
    int row[1000];
    int col[1000];
    int len;
    int max_len;
};

void init_list(struct letter_list * list_ptr){
    list_ptr->max_len = 1;
    list_ptr->len = 0;
}

// creates list
void create_list(struct letter_list * list_ptr, char str[], int numRows){

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
                list_ptr->letters[list_ptr->len] = str[i];
                list_ptr->row[list_ptr->len] = current_r;
                list_ptr->col[list_ptr->len] = current_c;

                i++;
                current_r++;
                list_ptr->len += 1;
                list_ptr->max_len += 1;
                list_ptr->letters[list_ptr->max_len] = '\0';
            }
            
            else{
                while (current_r != 0 && i < length){
                    
                    // append element to the list with its rank
                    list_ptr->letters[list_ptr->len] = str[i];
                    list_ptr->row[list_ptr->len] = current_r;
                    list_ptr->col[list_ptr->len] = current_c;

                    i++;
                    current_r--;
                    current_c++;
                    list_ptr->len += 1;
                    list_ptr->max_len += 1;
                    list_ptr->letters[list_ptr->max_len] = '\0';
                }
            }
        }
    }
}

// swap_list_item swaps the 2 list items at the indexes that were passed
void swap_list_item(struct letter_list *list_ptr, int index_a, int index_b){

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
void print_list(struct letter_list *list_ptr){
    
    printf("\n\n    ZigZag Indices\t\tLetters\n\n");

    for (int i = 0; i < list_ptr->len ; i++){
        printf("\t[%d]", list_ptr->row[i]);
        printf("[%d]\t", list_ptr->col[i]);
        printf("\t\t- %c\n", list_ptr->letters[i]);
    }

    printf("\n\nNumber of unique letters used: %d\n\n", list_ptr->len);
}

// bubble sorts list rows
void bubble_sort_row(struct letter_list *list_ptr, int start_index,int end_index){

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
void bubble_sort_col(struct letter_list *list_ptr, int start_index,int end_index){

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

// sorts rows whilst keeping the columns in relative order
void combo_sort(struct letter_list *list_ptr){

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

int main(){

    struct letter_list list;
    struct letter_list * list_ptr = &list;
    

    char * str = "PAYPALISHIRING";
    int numRows = 3;

    if (numRows == 1){
        print_list(list_ptr);
        printf("\nThe answer is: %s\n\n", str);
    }
    else{
        create_list(list_ptr,str,numRows);
        combo_sort(list_ptr);
        print_list(list_ptr);
        printf("\nThe answer is: %s\n\n", list.letters);
    }

    return 0;
}