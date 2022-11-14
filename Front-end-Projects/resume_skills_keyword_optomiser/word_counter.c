#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
#include <string.h>

struct word_count {
    char word[20];
    int count;
    int len;
    int max_len;
};

struct word_list {
    char words[100000][20];
    int counts[100000];
    int len;
};

// init_word initialises (sets to zero) all values in word_count structure
void init_word(struct word_count *word_ptr) {
    word_ptr->max_len = 1;
    word_ptr->len = 0;
    word_ptr->count = 0;
    word_ptr->word[0] = 0;
}

// init_list initialises (sets to zero) all values in word_list structure
void init_list(struct word_list *list_ptr) {
    list_ptr->len = 0;
    for (int i = 0; i < 100000 ; i++){
        list_ptr->words[i][0] = 0;
        list_ptr->counts[i] = 0;
    }
}

// identify_word returns true if it
// finds a word in the given string from given starting point.
// it then adds this first word from given string to the word_count struct
bool identify_word(struct word_count *word_ptr, char str[], int length, int start_point){

    int i;
    int true_length = length+1; // (taking into account string null terminator)

    // transfer word characters from start point to end of word
    for (i = start_point; i < true_length ; i++){
        
        // assign str's word characters to my word in word_count struct
        word_ptr->word[i - start_point] = str[i];

        // word end is met when we reach a special character
        if ((str[i] < 65) || (str[i] > 90 && str[i] < 97) || (str[i] > 122)){
            word_ptr->word[i - start_point] = '\0';
            break;
        }
    }
    
    if(strcmp(word_ptr->word,"") != 0){ // if the word is not nothing
        word_ptr->max_len = (i - start_point); // length with null terminator
        word_ptr->len = (i - start_point) - 1; // length without null terminator
        return true;
    }
    return false;
}

// count_occurences counts how many times the passed 
// structure's word is found in the passed string.
int count_occurences(struct word_count *word_ptr, char str[], int length){

    char current_word[20] = {};
    int true_length = length + 1; // length including null terminator
    int count = 0;

    // search str linearly for words
    // if the word currently being seen 
    // matches the one in our structure
    // add one to our structure's count
    for (int i = 0; i < true_length ; i++){

        for (int sub_start = i; sub_start < true_length ; sub_start++){
            
            // transfer each word char to current word
            current_word[sub_start - i] = str[sub_start];

            // word end is met when we reach a special character
            if ((str[sub_start] < 65) || (str[sub_start] > 90 && str[sub_start] < 97) || (str[sub_start] > 122)){
                current_word[sub_start - i] = '\0';
                i = sub_start;
                break;
            }
        }
        //printf("%s\n\n", current_word);

        // compare the current word and the word in structure
        // if they are the same add 1 to the structure's word count
        if (strcmp(current_word,word_ptr->word) == 0){
            count ++;
        }  
    }

    return count;
}

// in_list returns true if the word in the
// word struct is found in the list struct
// if not it returns false
bool in_list(struct word_count * word_ptr, struct word_list * list_ptr){

    for (int i = 0; i < 100000; i++){
        if (strcmp(word_ptr->word,list_ptr->words[i]) == 0){
            return true;
        }
    }
    return false;
}

// append_list append word in word_count struct to word_list struct
void append_list(struct word_count *word_ptr, struct word_list *list_ptr){
    
    // copy the current word to the list
    strcpy(list_ptr->words[list_ptr->len], word_ptr->word);

    // copy current words count to the list
    list_ptr->counts[list_ptr->len] = word_ptr->count;

    // increment len and assign null to new len
    list_ptr->len += 1;
}

// create_list takes in a word_list structure pointer,
// a string, and a start_point and creates a list in word_list
// that has all the words present in the string and their counts
void create_list(struct word_list *list_ptr, char str[]){

    // create structure variable
    // create pointer to the structure type element
    struct word_count current_word;
    struct word_count * word_ptr = &current_word;

    // initialise parsing elements
    init_list(list_ptr);
    int length = strlen(str);
    int start_point = 0;

    while (start_point < length){

        // initialise word
        init_word(word_ptr);

        // get first word and update start point
        bool found_word = identify_word(word_ptr,str,length,start_point);
        start_point += word_ptr->max_len;

        if (found_word == true){

            // count word occurences and assign 
            // the count to word_count structure
            word_ptr->count = count_occurences(word_ptr,str,length);
            
            // if the word in word struct is not in
            // word_list append word to list
            if (in_list(word_ptr,list_ptr) == false){
                append_list(word_ptr,list_ptr);
            }
        }
    }
}

// swap_list_item swaps the 2 list items and the indexes that were passed
void swap_list_item(struct word_list *list_ptr, int index_a, int index_b){

     // set temp
    int temp_count = list_ptr->counts[index_a];
    char temp_word[20] = "";
    strcpy(temp_word, list_ptr->words[index_a]);

    // copy element before pivot (count and word) to current location
    list_ptr->counts[index_a] = list_ptr->counts[index_b];
    strcpy(list_ptr->words[index_a], list_ptr->words[index_b]);

    // copy element before pivot (count and word) to current location
    list_ptr->counts[index_b] = temp_count;
    strcpy(list_ptr->words[index_b], temp_word);
}

// quicksort_list_range sort the list in ascending order from given range
void qsort_list_range(struct word_list *list_ptr, int start_index, int end_index){

    if (start_index >= end_index){
        return;
    }

    int pivot_index = end_index;
    // iterate through list
    for (int i = start_index; i < pivot_index; i++){
        // if element with a higher
        // count then our pivots is found
        while (list_ptr->counts[i] > list_ptr->counts[pivot_index]){
            // if the two elements are sequencial
            // a direct swap is possible so swap
            if (i == pivot_index-1){
                swap_list_item(list_ptr,pivot_index,i);
            }
            // if they are not sequencial
            // make space for the swap then swap
            else{
                swap_list_item(list_ptr,pivot_index,pivot_index-1);
                pivot_index--;
                swap_list_item(list_ptr,pivot_index+1,i);
            }
        }
    }
    qsort_list_range(list_ptr,start_index,pivot_index-1);
    qsort_list_range(list_ptr,pivot_index+1,end_index);
}

// qsort_list sorts passed list from index 0 to index len-1 of the list
void qsort_list(struct word_list *list_ptr){
    qsort_list_range(list_ptr,0,list_ptr->len-1);
}

// reverse_list reverses the order the elements in the list are orgnised
void reverse_list(struct word_list *list_ptr){
    
    for (int i = 0; i < (list_ptr->len/2); i++){
        swap_list_item(list_ptr,i,list_ptr->len-1-i);
    }
}

int main() {

    char str1[] = "Hey this program takes in the string you input here and returns a list with the word and how many times it was used in the string. *Note, this a the precursor to a project i have coming up!";
    
    // create structure variable
    // create pointer to the structure type element
    struct word_list list;
    struct word_list * list_ptr = &list;

    create_list(list_ptr, str1);
    qsort_list(list_ptr);
    reverse_list(list_ptr);

    // print the list and its length
    printf("\n\nOccurences\tWords\n\n");
    for (int i = 0; i < list_ptr->len ; i++){
        printf("[%d]\t", list_ptr->counts[i]);
        printf("\t- %s\n", list_ptr->words[i]);
    }
    printf("\n\nNumber of unique words used: %d\n\n", list_ptr->len);

    return 0;
}