#include "ADT-string-parser.h"

int main() {

    //get input (string) from user
    printf("\nPlease input a string: ");
    char * str = get_string();
    
    // create a word list from string
    // sort it from most used words to least
    // and print it
    struct word_list * list_ptr = create_list(str);
    qsort_list(list_ptr,'r');
    print_list(list_ptr);

    // free memory
    list_ptr = NULL;
    free(list_ptr);
    
    return 0;
}

// List abstract data type prototypes and definitions below ////////////////////////////////////
// see "ADT-string-parser.h" for implementation

// init_list initialises the list the pointer passed points to
// O(1)
void init_list(struct word_list *list_ptr);

// decapitalize takes a string and returns a pointer to a string
// with the contents decapitalised
// O(n)
char * decapitalize(char * str);

// identify_word returns a pointer to the first word found in 
// the string passed within the bounds passed
// O(logn)
struct word_count * identify_word(char str[], int length, int start_point);

// count_occurences counts how many times a passed 
// substring (the substring being a word) is found in the passed string.
// O(n^2)
int count_occurences(char * sub_str, char str[], int length);

// in_list_check returns true if the passed is found
// in the passed list,if not it returns false
// O(n^2)
bool in_list_check(char * word, struct word_list * list_ptr);

// append_list appends(adds to the end) word element to the word list
// O(n)
struct word_list * append_list(struct word_count *word_ptr, struct word_list *list_ptr);

// create_list takes in a string and returns a pointer to a Word_list that has acces
// to every word and their count in the passed string
// O(n^2)
struct word_list * create_list(char str[]);

// swap_list_item swaps the 2 items t the given indices in the passed list
// O(1)
void swap_list_item(struct word_list *list_ptr, int index_a, int index_b);

// quicksort_list_range sorts the list in ascending order from given range
// ~O(n^2)
void qsort_list_range(struct word_list *list_ptr, int start_index, int end_index);

// reverse_list reverses the order of the elements in the passed list
// O(n)
void reverse_list(struct word_list *list_ptr);

// qsort_list sorts in ascending order the passed list from index 0 
// to index len-1 of the list
// if the argument 'r' or "R" (114 or 82), is passed it also reverses the list
// effectively sorting in descending order
// ~O(n^2)
void qsort_list(struct word_list *list_ptr, ...);

// print_list prints the passed list
// O(n)
void print_list(struct word_list *list_ptr);

// get_string takes in an unlimited(dynamically allocates memory)
// amount of input from the user untill they press enter and
// returns a pointer to this string
// O(n)
char * get_string();