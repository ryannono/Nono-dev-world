#include <stdio.h>
#include <math.h>
#include <stdbool.h>

// opening_statement prints game info and description
// O(1)
void opening_statement(){

    // intro
    // O(1)
    printf("\n---------------------------------------------------------------\n");
    printf("\n* Program name: Money doubling-time calculator\n");
    printf("\n* Developer : Ryan Nono\n");
    printf("\n* Last updated: March 6th 2022\n");
    printf("\n---------------------------------------------------------------\n");

    printf("\nWelcome to my Doubling-Time Calculator (MDTC)\n");
    printf("\nThis calculator can compute the time to double");
    printf("\nany some of money at a specific rate of return, or");
    printf("\nIt can tell you the rate of return needed for you to");
    printf("\ndouble your money in a specific amount of time\n\n");

}

void Instructions() {
    printf("\nPlease select one of the following items:\n");
    printf("A) - Find time needed to double at a specific rate of return.\n");
    printf("B) - Find needed rate of return to double in amount of specific time.\n");
    printf("X) - Exit\n\n");
}

// ASelection returns true if the selection was 'a' or 'A'
bool ASelection(selection) {
    if ((selection == 'a') || (selection == 'A')) {
        return true;
    }
    return false;
}

// BSelection returns true if the selection was 'b' or 'B'
bool BSelection(selection) {
    if ((selection == 'b') || (selection == 'B')) {
        return true;
    }
    return false;
}

// XSelection returns true if the selection was 'x' or 'X'
bool XSelection(selection) {
    if ((selection == 'x') || (selection == 'X')) {
        return true;
    }
    return false;
}

// game_restart asks the users if they want to play again and
// returns true if user wishes to restart (enters 'y' or 'Y') 
// and false if not (enter 'n' or 'N')
// O(n)
bool calc_restart(){
    
    char restart = 0;
    printf("---------------------------------------------------------------\n");
    printf("\nDo you want to restart the calculator? (Enter Y or N)\n");
    printf("\n- Answer: ");

    while (restart != 'Y' && restart != 'N' && restart != 'y' && restart != 'n'){
        fflush(stdin);
        scanf("%c", &restart);

        if (restart != 'Y' && restart != 'N' && restart != 'y' && restart != 'n'){
            printf("\ninvalid input, please enter: Y or N\n");
            printf("\n- Answer: ");
        }
    }

    return (restart == 'Y' || restart == 'y') ? true : false;
}

int main() {
    
    char selection;
    float input;

    // clear console
    printf("\e[1;1H\e[2J");

    // Welcome, dev info & version info
    opening_statement();
    bool restart_indicator = true;

    // while user has not exited
    while (restart_indicator == true) {
        // Calc options
        Instructions();
        
        // get selection
        printf("Selection: ");
        fflush(stdin);
        scanf(" %c", & selection); 
        
        //Execute selection case
        if (ASelection(selection)) {
                double monthly, yearly, interest, percentage, Mtime;
                int Ytime, Months;

                // Interest input
                printf("\nPlease enter a yearly rate of return percentage: ");
                fflush(stdin);
                scanf("%f ", & input);

                //Interest as percentage
                percentage = input / 100;

                //Monthly interest rate
                monthly = percentage / 12;

                // months needed
                // using log formula the rule of 72 is based on
                Mtime = (log(2))/(log(1 + monthly));

                // years needed rounded
                Ytime = Mtime / 12;
                Months = fmod((Mtime), 12);
                printf("\nThe needed time to double your money at a %.2f%% rate of return is: %d years and %d months\n\n",input, Ytime, Months);

                // see if user wants to restart
                restart_indicator = calc_restart();
            }
        else if (BSelection(selection)) {
                double Mtime, Minterest, Yinterest;

                // Interest input
                printf("\nPlease enter a time in years: ");
                fflush(stdin);
                scanf("%f", & input);

                //convert time in years to months
                Mtime = input * 12;

                //find monthly interest rate
                // using inverse of the log formula the rule of 72 is based on
                Minterest = pow(2,(1/Mtime)) - 1;

                //find yearly interest rate in full percentage
                Yinterest = Minterest * 12 * 100;

                printf("\nThe needed interest rate to double your money in %d years is: %.2f%%\n\n",(int)input, Yinterest);

                // see if user wants to restart
                restart_indicator = calc_restart();
            }
        else if (XSelection(selection)) {
            break;
            }
        else {
                printf("\nYour selection was invalid!\n");
            }
        
    }

    //clear console print program terminated
    printf("\e[1;1H\e[2J");
    printf("---------------------------------------------------------------\n");
    printf("\n*** Doubling-Time Calculator Exited ***\n\n");
    printf("---------------------------------------------------------------\n\n");

    return(0);
}