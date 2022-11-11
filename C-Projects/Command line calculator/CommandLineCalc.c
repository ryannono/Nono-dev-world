#include <stdio.h>
#include <math.h>

// Instructions prints calculator instructions on screen
void Instructions() {
    printf("\nPlease select one of the following items:\n");
    printf("B) - Binary Mathematical Operations such as addition and subtraction.\n");
    printf("U) - Unary Mathematical Operations, such as square root, and log.\n");
    printf("A) - Advances Mathematical Operations, using variables, arrays.\n");
    printf("V) - Define variables and assign them values.\n");
    printf("X) - Exit\n\n");
}

// BinaryCases  takes in 2 numbers and an operator and 
// execute the corresponding Mathematical calculation
// and prints it on screen
void BinaryCases(char operator, float num1, float num2) {
    double result;
    int intResult;

    switch (operator) {
    
    case '+':
        result = num1 + num2;
        if (fmod(result,1) == 0) {
            intResult = (int)result;
            printf("\nThe result is: %d\n\n",intResult);
            }
        else {
            printf("\nThe result is: %lf\n\n",result);
            }
        break;

    case '-':
        result = num1 - num2;
        if (fmod(result,1) == 0) {
            intResult = (int)result;
            printf("\nThe result is: %d\n\n",intResult);
            }
        else {
            printf("\nThe result is: %lf\n\n",result);
            }
        break;

    case '*':
        result = num1 * num2;
        if (fmod(result,1) == 0) {
            intResult = (int)result;
            printf("\nThe result is: %d\n\n",intResult);
            }
        else {
            printf("\nThe result is: %lf\n\n",result);
            }
        break;

    case '/':
        result = num1 / num2;
        if (fmod(result,1) == 0) {
            intResult = (int)result;
            printf("\nThe result is: %d\n\n",intResult);
            }
        else {
            printf("\nThe result is: %lf\n\n",result);
            }
        break;

    case '%':
        result = (int)num1 % (int)num2;
        if (fmod(result,1) == 0) {
            intResult = (int)result;
            printf("\nThe result is: %d\n\n",intResult);
            }
        else {
            printf("\nThe result is: %lf\n\n",result);
            }
        break;

    case '^':
        result = pow(num1, num2);
        if (fmod(result,1) == 0) {
            intResult = (int)result;
            printf("\nThe result is: %d\n\n",intResult);
            }
        else {
            printf("\nThe result is: %lf\n\n",result);
            }
        break;
    
    default:
        printf("\nYour inputs were invalid!\n\n");
        break;
    }
}

//  Selection definitions

int BSelection(selection) {
    if ((selection == 'b') || (selection == 'B')) {
        return(1);
    }
    return(0);
}

int USelection(selection) {
    if ((selection == 'u') || (selection == 'U')) {
        return(1);
    }
    return(0);
}

int ASelection(selection) {
    if ((selection == 'a') || (selection == 'A')) {
        return(1);
    }
    return(0);
}

int VSelection(selection) {
    if ((selection == 'v') || (selection == 'V')) {
        return(1);
    }
    return(0);
}

int XSelection(selection) {
    if ((selection == 'x') || (selection == 'X')) {
        return(1);
    }
    return(0);
}

int main() {

    // Clear console
    printf("\e[1;1H\e[2J");

    char selection, operator;
    double num1, num2;

    // show Welcome, dev info & version info
    // if it is your first calculation of the session
    printf("\nWelcome to my Command-Line Calculator (CLC)\n");
    printf("Developer: Ryan Nono\n");
    printf("Version: 1\n");
    printf("Date: Feb 17th 2022\n");

    while (1) {

        // Calc options
        Instructions();
        
        // get selection
        printf("Selection: ");
        scanf(" %c", & selection); 
        
        //Execute selection case
        if (BSelection(selection)) {
                
                // Number & operator input
                printf("\nPlease enter the first number: ");
                scanf("%lf", & num1);

                printf("\nPlease enter the operation ( + , - , * , /, %%, ^): ");
                scanf(" %c", &operator);

                printf("\nPlease enter the second number: ");
                scanf("%lf", & num2);

                //Execute operator case
                BinaryCases(operator, num1, num2);

                //seperation
                printf("____________________________________________________________________\n");
            }
        else if (USelection(selection)) {
                printf("\n***This feature is not yet available***\n\n");
                
                //seperation
                printf("____________________________________________________________________\n");
            }
        else if (ASelection(selection)) {
                printf("\n***This feature is not yet available***\n\n");
                
                //seperation
                printf("____________________________________________________________________\n");
            }
        else if (VSelection(selection)) {
                printf("\n***This feature is not yet available***\n\n");
                
                //seperation
                printf("____________________________________________________________________\n");
            }
        else if (XSelection(selection)) {
                break;
            }
        else {
                printf("\nYour selection was invalid!\n");
                
                //seperation
                printf("____________________________________________________________________\n");
            }
    }

    //clear console print program terminated
    printf("\e[1;1H\e[2J");
    printf("\n*** Command-Line Calculator Exited ***\n\n");

    return(0);
}
