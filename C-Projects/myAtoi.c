#include <stdio.h>
#include <assert.h>
#include <stdbool.h>

// opening_statement prints program info and description
// O(1)
void opening_statement(){

    // intro
    // O(1)
    printf("\n---------------------------------------------------------------\n");
    printf("\n* Program name: myAtoi\n");
    printf("\n* Developer : Ryan Nono\n");
    printf("\n* Last updated: Nov 9th 2022\n");
    printf("\n---------------------------------------------------------------\n");

    printf("\nWelcome to myAtoi\n");
    printf("\nParses the C-string input from a user ");
    printf("\ninterpreting numerical values (if present)");
    printf("\nas an integral number,");
    printf("\nwhich is returned as a value of type int");

    printf("\n\n---------------------------------------------------------------\n");
}

// check_negative_sign checks if passed value represents 
// a negative ('-') sign operator 
// returns true if yes and false if not
bool check_negative_sign(int n){
    if (n == 45) {
        return true;
    }
    else{
        return false;
    }
}


long int myAtoi(char s[]){
    
    // initialise function variables
    int digit_count = 0; 
    long int integer_num = 0;
    int sign = 1;

    // iterate through string
    for (int i = 0; s[i] ; i++) {
        
        // a digit's value maps to char number on ascii-48
        int digit = s[i] - 48;

        // if the digit is valid
        if ((digit >= 0) && (digit <= 9)) {

            // build number as digits are validated
            integer_num *= 10;
            integer_num += digit;
            digit_count++;

            // if we are at the first digit in the string
            if (digit_count == 1){
                // check if any char before the digit was a
                // negative sign operator
                for (int j = 0; j < i; j++) {
                    if (check_negative_sign(s[j])){
                        sign = -1;
                    }
                }
            }
        }
    }

    // multiply created integer by the sign in the string
    integer_num *= sign;

    return integer_num;
}

int main(){

    opening_statement();

    char s[] = "-.+  243vve34 34fver31 -1 23 3 ";

    printf("\n\n%li\n\n", myAtoi(s));

    return 0;
}