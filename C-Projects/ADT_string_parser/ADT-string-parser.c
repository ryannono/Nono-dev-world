#include "ADT-string-parser.h"

// init_word initialises the word the pointer passed points to
// O(1)
void init_word(struct word_count *word_ptr);

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

// count_occurences counts how many times a passed 
// substring (the substring being a word) is found in the passed string.
// O(n^2)
int count_occurences(char * sub_str, char str[], int length);

int main() {

    //get input (string) from user
    printf("\nPlease input a string: ");
    char * str = my_scanf();
    
    // create a word list from string
    // sort it from most used words to least
    // and print it
    struct word_list * list_ptr = create_list(str);
    qsort_list(list_ptr,'r');
    print_list(list_ptr);

    // reset list
    init_list(list_ptr);
  
    
    return 0;
}