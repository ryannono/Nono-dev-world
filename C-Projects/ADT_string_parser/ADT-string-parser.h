#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
#include <string.h>
#include <stdarg.h>

struct word_count {
    char * word;
    int count;
    int len;
    int max_len;
};

struct word_list {
    char ** words;
    int * counts;
    int len;
    int max_word_len;
    int max_list_len;
};

// init_word initialises the word the pointer passed points to
// O(1)
void init_word(struct word_count *word_ptr) {
    word_ptr->max_len = 1;
    word_ptr->len = 0;
    word_ptr->count = 0;
    word_ptr->word= (char *)malloc(1*sizeof(char));
}

// init_list initialises the list the pointer passed points to
// O(1)
void init_list(struct word_list *list_ptr) {
    list_ptr->len = 0;
    list_ptr->max_list_len = 1;
    list_ptr->max_word_len = 1;
    list_ptr->counts = (int *)malloc(1 * sizeof(int));
    list_ptr->words = (char **)malloc(1 * sizeof(char*));
}

// decapitalize takes a string and returns a pointer to a string
// with the contents decapitalised
// O(n)
char * decapitalize(char * str){
    
    for (int i = 0; str[i] ; i++){
        // if letter is upper case change to lower case
        // before assigning to the structure
        if (str[i] >= 65 && str[i] <= 90){
            str[i] += 32;
        }
    }

    return str;
}

// identify_word returns a pointer to the first word found in 
// the string passed within the bounds passed
// O(logn)
struct word_count * identify_word(char str[], int length, int start_point){

    int i;
    int true_length = length+1; // (taking into account string null terminator)
    struct word_count * word_ptr = (struct word_count *)malloc(sizeof(struct word_count));
    init_word(word_ptr);
    
    // transfer word characters from start point to end of word
    for (i = start_point; i < true_length ; i++){
        
        // assign str's word characters to my word in word_count struct
        if (word_ptr->len == word_ptr->max_len){
            word_ptr->max_len *= 2;
            word_ptr->word = (char *)realloc(word_ptr->word, word_ptr->max_len*sizeof(char));
        }

        // word end is met when we reach a special character
        if ((str[i] < 65) || (str[i] > 90 && str[i] < 97) || (str[i] > 122)){
            word_ptr->word[i - start_point] = '\0';
            break;
        }

        word_ptr->word[i - start_point] = str[i];
        word_ptr->len += 1;
    }


    return word_ptr;
}

// count_occurences counts how many times a passed 
// substring (the substring being a word) is found in the passed string.
// O(n^2)
int count_occurences(char * sub_str, char str[], int length){

    char * current_word;
    int current_len = 0;
    int current_max_len = 1;
    current_word = (char *)malloc(current_max_len*sizeof(char));

    int count = 0;

    // search str linearly for words
    // if the word currently being seen 
    // matches the one in our structure
    // add one to our structure's count
    for (int i = 0; i < str[i] ; i++){

        for (int sub_start = i; sub_start < str[i] ; sub_start++){
            
            // transfer each word char to current word
            if (current_len == current_max_len){
                current_max_len *= 2;
                current_word = (char *)realloc(current_word, current_max_len * sizeof(char));
            }

            // word end is met when we reach a special character
            if ((str[sub_start] < 65) || (str[sub_start] > 90 && str[sub_start] < 97) || (str[sub_start] > 122)){
                current_word[sub_start - i] = '\0';
                i = sub_start; //word up to substart has been evaluated no need to go over it again
                break;
            }

            current_word[sub_start - i] = str[sub_start];
            current_len++;
        }
        
        // compare the current word and the word in structure
        // if they are the same add 1 to the structure's word count
        if (strcmp(current_word,sub_str) == 0){
            count ++;
        }  
    }
    current_word = NULL;
    free(current_word);

    return count;
}

// in_list_check returns true if the passed is found
// in the passed list,if not it returns false
// O(n^2)
bool in_list_check(char * word, struct word_list * list_ptr){
    
    for (int i = 0; i < list_ptr->len; i++){
        if (strcmp(word,list_ptr->words[i]) == 0 ){
            return true;
        }
    }
    
    return false;
}

// append_list appends(adds to the end) word_count structure element to the word list
// O(n)
struct word_list * append_list(struct word_count *word_ptr, struct word_list *list_ptr){
    
    // If the length of the list has reached the 
    // size of memory (max_list_len) that was 
    // originally allocated double it by reallocating
    // set max_list_len to 2*max_list_len to keep 
    // track of allocated memory
    if (list_ptr->len == list_ptr->max_list_len){
        list_ptr->max_list_len *= 2;
        list_ptr->words = (char **)realloc(list_ptr->words,list_ptr->max_list_len*sizeof(char*));
        list_ptr->counts = (int *)realloc(list_ptr->counts,list_ptr->max_list_len*sizeof(int));
    }

    // if the length of the word is greater 
    // then the max word length of the list
    // reallocate list to store more space 
    if (word_ptr->len >= list_ptr->max_word_len){
        
        list_ptr->max_word_len += word_ptr->len;
        *list_ptr->words = (char *)realloc(*list_ptr->words, sizeof(list_ptr->max_word_len*sizeof(char)));
    }

    // set initiali memory size for the next pointer
    // copy string to that pointer
    list_ptr->words[list_ptr->len] = (char *)malloc(list_ptr->max_word_len*sizeof(char));
    strcpy(list_ptr->words[list_ptr->len], word_ptr->word);
    
    // copy current words count to the list
    list_ptr->counts[list_ptr->len] = word_ptr->count;
    

    // increment len and assign null to new len
    list_ptr->len += 1;

    return list_ptr;
}

// create_list takes in a string and returns a pointer to a Word_list that has acces
// to every word and their count in the passed string
// O(n^2)
struct word_list * create_list(char str[]){

    // create list pointer and allocate memory
    // initialise parsing elements
    struct word_list * list_ptr = (struct word_list *)malloc(sizeof(struct word_list));
    init_list(list_ptr);
    int length = strlen(str);
    int start_point = 0;

    while (start_point < length){

        // get rid of capitals
        // get first word and update start point
        str = decapitalize(str);
        struct word_count * word_ptr = identify_word(str,length,start_point);
        start_point += word_ptr->len+1;

        if (word_ptr->len != 0){

            // count word occurences and assign 
            // the count to word_count structure
            word_ptr->count = count_occurences(word_ptr->word,str,length);
            
            // if the word in our word struct is not in
            // our word_list append the word to the list
            if (in_list_check(word_ptr->word,list_ptr) == false){
                list_ptr = append_list(word_ptr,list_ptr);
            }
        }
        word_ptr = NULL;
        free(word_ptr);
    }
    return list_ptr;
}

// swap_list_item swaps the 2 items t the given indices in the passed list
// O(1)
void swap_list_item(struct word_list *list_ptr, int index_a, int index_b){

     // set temp
    int temp_count = list_ptr->counts[index_a];
    char * temp_word = (char *)malloc(strlen(list_ptr->words[index_a])*sizeof(char));
    strcpy(temp_word, list_ptr->words[index_a]);

    // swap a with b
    list_ptr->counts[index_a] = list_ptr->counts[index_b];
    strcpy(list_ptr->words[index_a], list_ptr->words[index_b]);

    // b with temp(previous a)
    list_ptr->counts[index_b] = temp_count;
    strcpy(list_ptr->words[index_b], temp_word);

    temp_word = NULL;
    free(temp_word);
}

// quicksort_list_range sorts the list in ascending order from given range
// ~O(n^2)
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

// reverse_list reverses the order of the elements in the passed list
// O(n)
void reverse_list(struct word_list *list_ptr){
    
    for (int i = 0; i < (list_ptr->len/2); i++){
        swap_list_item(list_ptr,i,list_ptr->len-1-i);
    }
}

// qsort_list sorts in ascending order the passed list from index 0 
// to index len-1 of the list
// if the argument 'r' or "R" (114 or 82), is passed it also reverses the list
// effectively sorting in descending order
// ~O(n^2)
void qsort_list(struct word_list *list_ptr, ...){

    qsort_list_range(list_ptr,0,list_ptr->len-1);

    va_list pargs; 
    va_start(pargs, list_ptr);
    
    if (va_arg(pargs, int) == 114 || va_arg(pargs, int) == 82){
        reverse_list(list_ptr);
    }
}

// print_list prints the passed list
// O(n)
void print_list(struct word_list *list_ptr){
    
    printf("\n\nOccurences\tWords\n\n");

    for (int i = 0; i < list_ptr->len ; i++){
        printf("[%d]\t", list_ptr->counts[i]);
        printf("\t- %s\n", list_ptr->words[i]);
    }

    printf("\n\nNumber of unique words used: %d\n\n", list_ptr->len);
}

// get_string takes in an unlimited(dynamically allocates memory)
// amount of input from the user untill they press enter and
// returns a pointer to this string
char * get_string(){

    char * string_input = (char *)malloc(1*sizeof(char));
    int len = 0;
    int max_len = 1;
    int i = 0;
    
    fflush(stdin);
    while ((string_input[i] = getchar()) != '\n'){
        len++;
        i++;
        if (len == max_len){
            max_len *= 2;
            string_input = (char *)realloc(string_input, max_len*sizeof(char));
        }
    }

    return string_input;
}
