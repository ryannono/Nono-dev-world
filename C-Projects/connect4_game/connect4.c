#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
#include <string.h>

// opening_statement prints game info and description
// O(1)
void opening_statement(){

    // intro
    // O(1)
    printf("\n---------------------------------------------------------------\n");
    printf("\n* Program name: Connect 4\n");
    printf("\n* Developer : Ryan Nono\n");
    printf("\n* Last updated: Nov 9th 2022\n");
    printf("\n---------------------------------------------------------------\n");

    printf("\nWelcome to the Connect 4 game\n");
    printf("\nBoth players begin with 21 identical pieces,");
    printf("\nthe first player to achieve a line of four connected pieces wins.");
    printf("\nIf all 42 spaces are played and no one has four pieces in a row,");
    printf("\nthe game is drawn.\n");

}

/**
 * This function prints the board with a bounding box
 * 
 * @param board the board to print
 */
void print_board(char board[6][7]){
    
    // O(1)
    printf("\n");

    // print board
    // with bounding box
    // O(n*m)
    for (int r = 0; r < 7; r++){
        for (int c = 0; c < 7; c++){
            
            // if at first column
            if (c == 0){
                if (r == 6){
                    //tab + column count
                    printf("|\t\t\t%d ", c+1);
                }
                else{
                    // tab + value
                    printf("|\t\t\t%c ", board[r][c]);
                }
            }

            // if at row index 6 print column count
            else if (r == 6){
                // if last column
                if (c == 6){
                    printf("%d\t\t\t      |", c+1);
                }
                else{
                    printf("%d ", c+1);
                }
            }

            // if at last column
            else if (c == 6){
                if (r == 5){
                    // print value + new line + additional new line for column count
                    printf("%c\t\t\t      |\n|\t\t\t\t\t\t\t      |\n", board[r][c]);
                }
                else{
                    // print value + new line
                    printf("%c\t\t\t      |\n", board[r][c]);
                }
            }
            
            // else print value
            else{
                printf("%c ", board[r][c]);
            }
        }
    }
}

/**
 * We check for a win by checking for a horizontal, vertical, or diagonal win
 * 
 * @param board a 2D array of chars, representing the board.
 * @param player the player who is currently playing
 * 
 * @return A boolean value.
 */
bool check_win(char board[6][7] , char player){


    // horizontal check
    // O(n*m)
    for (int r = 5; r > -1; r--){
        for ( int c = 0; c+3 < 7 ; c++){
            if ((board[r][c] == player) && (board[r][c+1] == player) && 
                (board[r][c+2] == player) && (board[r][c+3] == player)){
                return true;
            }
        }
    }

    
    // vertical check
    // O(n*m)
    for (int c = 0; c < 7; c++){
        for ( int r = 5; r-3 > -1 ; r--){
            if ((board[r][c] == player) && (board[r-1][c] == player) && 
                (board[r-2][c] == player) && (board[r-3][c] == player)){
                return true;
            }
        }
    }
    
    // diagonal  check
    // O(n*(2m)) = O(n*m)
    for (int r = 5; r > -1; r--){


        // upwards right
        // O(n)
        for ( int c = 0; c+3 < 7 && r-3 > -1 ; c++){
            if ((board[r][c] == player) && (board[r-1][c+1] == player) && 
                (board[r-2][c+2] == player) && (board[r-3][c+3] == player)){
                return true;
            }
        }

        // upwards left
        // O(n)
        for ( int c2 = 6; c2-3 > -1 && r-3 > -1 ; c2--){
            if ((board[r][c2] == player) && (board[r-1][c2-1] == player) && 
                (board[r-2][c2-2] == player) && (board[r-3][c2-3] == player)){
                return true;
            }
        }
    }
    

    return false;
}

/**
 * This function tests the check_win function by creating a board with a horizontal, vertical, and two
 * diagonal wins, and then testing the check_win function on each of them
 */
void test_check_win(){
    
    char boardH_F[6][7] = {
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        'X','O','X','X','O','X','X'};

    char boardH_T[6][7] = {
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        'X','X','X','X','O','X','X'};

    char boardV_F[6][7] = {
        'X','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        'X','-','-','-','-','-','-'};

    char boardV_T[6][7] = {
        'X','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        'X','-','-','-','-','-','-'};

    char boardUL_F[6][7] = {
        'X','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','X','-','-','-','-',
        '-','-','-','X','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','X','-'};

    char boardUL_T[6][7] = {
        'X','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','X','-','-','-','-',
        '-','-','-','X','-','-','-',
        '-','-','-','-','X','-','-',
        '-','-','-','-','-','X','-'};

    char boardUR_F[6][7] = {
        '-','-','-','-','-','-','X',
        '-','-','-','X','-','X','-',
        '-','-','-','-','X','-','-',
        '-','X','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        '-','-','-','-','-','-','-'};

    char boardUR_T[6][7] = {
        '-','-','-','-','-','-','X',
        '-','-','-','X','-','X','-',
        '-','-','X','-','X','-','-',
        '-','X','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        '-','-','-','-','-','-','-'};

    // check_win tests
    char player1 = 'X';

    assert(check_win(boardH_F, player1) == false);
    assert(check_win(boardH_T, player1) == true);

    assert(check_win(boardV_F, player1) == false);
    assert(check_win(boardV_T, player1) == true);

    assert(check_win(boardUL_F, player1) == false);
    assert(check_win(boardUL_T, player1) == true);

    assert(check_win(boardUR_F, player1) == false);
    assert(check_win(boardUR_T, player1) == true);

}

/**
 * `valid_column` returns true if the column is between 1 and 7, inclusive, and false otherwise.
 * 
 * @param column The column number of the chess board.
 * 
 * @return A boolean value.
 */
bool valid_column(int column){
    return (column > 0 && column < 8) ? true : false;
}


/**
 * This function takes in a board, a column, and a player, and places the player in the first open spot
 * in the column, if there is one.
 * 
 * @param board the game board
 * @param column the column to place the piece in
 * @param player the player who is making the move
 * 
 * @return A boolean value
 */
bool make_move(char board[6][7] , int column , char player){

    // start at bottom of column
    // move up until an open spot is found
    // place player in that spot
    // if no open spot can be found return false
    // O(n)
    for (int r = 6; r >= 0 ; r--){
        if (board[r][column] == '-'){
            board[r][column] = player;
            return true;
        }
    }

    return false; 
}

// test_make_move checks make move is working properly
// O(n*m)
void test_make_move(){

    char board[6][7] = {
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-'};

    char board1[6][7] = {
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        'X','-','-','-','-','-','-'};

    // check the move was made
    assert(make_move(board, 0, 'X') == true);
    
    // check if the boards are the same
    // (move made at the right spot)
    for (int r = 0; r < 6 ; r++){
        for (int c = 0; c < 7; c++){
            assert(board1[r][c] == board[r][c]);
        }
    }    

    char board2[6][7] = {
        'O','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        'O','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        'O','-','-','-','-','-','-',
        'X','-','-','-','-','-','-'};

    char board3[6][7] = {
        'O','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        'O','-','-','-','-','-','-',
        'X','-','-','-','-','-','-',
        'O','-','-','-','-','-','-',
        'X','-','-','-','-','-','-'};

    // check the move was made
    assert(make_move(board2, 0, 'X') == false); 

    // check if the boards are the same
    // (move made at the right spot)
    for (int r = 0; r < 6 ; r++){
        for (int c = 0; c < 7; c++){
            assert(board2[r][c] == board3[r][c]);
        }
    }

}

// player_number returns the numeral value corresponding to the player's symbol
// 'X' == player 1, and 'O' == player 2
// requires current_player is either 'X' or 'O'
// O(1)
int player_number(const char current_player){
    
    if (current_player == 'X'){
            return 1;
        }
        else{
            return 2;
        }
}

/**
 * `max_moves` returns true if the maximum amount of moves have been played and the board is full
 * 
 * @param current_count the current amount of moves played
 * 
 * @return a boolean value.
 */
bool max_moves(int current_count){
    return (current_count == 42) ? true : false;
}

/**
 * This function swaps the current player from X to O or O to X
 * 
 * @param current_player This is the current player's symbol.
 */
void player_swap(char * current_player){

    if (*current_player == 'X'){
        *current_player = 'O';
    }
    else{
        *current_player = 'X';
    }
    
}

/**
 * This function asks the user if they want to play again, and returns true if they do, and false if
 * they don't
 * 
 * @return A boolean value.
 */
bool game_restart(){
    
    char restart = 0;
    printf("---------------------------------------------------------------\n");
    printf("\nDo you want to play again? (Enter Y or N)\n");
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

/**
 * It initialises the board to be a 6x7 array of '-' characters
 * 
 * @param board This is the board that we are going to be using.
 */
void board_initialiser(char board[6][7]){

    for (int r = 0; r < 6; r++){
        for (int c = 0; c < 7; c++){
            board[r][c] = '-';
        }
    }
}

int main(){

    test_check_win();
    test_make_move();

    char board[6][7] = {
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-',
        '-','-','-','-','-','-','-'};

    bool restart_indicator = true;
    int game_count = 0;

    /* The main game loop. It is responsible for the following:
            - Initialising the game board
            - Printing the game board
            - Taking in user input
            - Checking if the input is valid
            - Checking if the input resulted in a win
            - Checking if the input resulted in a draw
            - Asking if the user wishes to play again
            - Exiting the game if the user wishes to quit */
    while (restart_indicator == true){
        
        //clear console
        printf("\e[1;1H\e[2J");

        // if first game let users know how game works
        if (game_count == 0){
            // intro message
            opening_statement();
            game_count++;
        }

        // print starting board
        printf("\n---------------------------------------------------------------\n");
        printf("\n|\t\t Here is the starting board:                  |\n|\t\t\t\t\t\t\t      |");
        print_board(board);

        // intialise game variables
        char current_player = 'X';
        bool win_indicator = false;
        bool draw_indicator = false;
        int input_attempt_count = 0;
        int move_count = 0;

       /* This while Loop: takes in a column as input, checks if the input is
       valid, and if it is valid it makes the move. If the move is valid it checks if the move
       resulted in a win, if it did not it checks if the max amount of moves were played, if they
       were not it swaps the players and continues the game. If the move did result in a win it
       prints the winning player's number and asks if the users wish to play again. If the move is
       not valid it lets the user know with a message and restarts the loop */
        while (win_indicator == false && draw_indicator == false){
            
            // translate the 'current_player' symbol to 
            // corresponding player number
            int player_num = player_number(current_player);

            // take in a column as input
            int column_input = 0;
            if (input_attempt_count == 0){
                printf("\n\n---------------------------------------------------------------\n");
                printf("\nPlayer %d, please select a free column from 1 to 7\n", player_num);
                printf("\n(Note: Enter '100' if you wish to quit the game)\n");
            }
            printf("\n\n- Column choice: ");
            fflush(stdin);
            scanf("%d", &column_input);
            
            // check if user wanted to quit
            if (column_input == 100){
                printf("\n---------------------------------------------------------------\n");
                printf("\nThe game was exited by player %d\n\n", player_num);
                exit(EXIT_FAILURE);
            }
            
            // if user didn't want to quit, check if the input is valid
            else if (valid_column(column_input) && 
                    make_move(board, column_input-1, current_player)){
                
                //reset input attempt count because the input was valid
                input_attempt_count = 0;

                // if the move is valid increment 'move_count'
                // clear current console
                // and print the new board
                move_count++;
                printf("\e[1;1H\e[2J");
                printf("\n---------------------------------------------------------------\n");
                print_board(board);

                // check if the move resulted in a win
                win_indicator = check_win(board, current_player);

                if (win_indicator == false){

                    // if the move did not result in a win 
                    // check if the max amount of moves were played
                    if (max_moves(move_count)){
                        
                        // if the max amount of moves were played
                        // we have a draw
                        // ask if users wish to play again
                        draw_indicator = true;
                        printf("\n\n---------------------------------------------------------------\n");
                        printf("\nOof nice try guys, the game is a draw!\n\n");
                        board_initialiser(board);
                        restart_indicator = game_restart();
                    }

                    else{
                        // if the max amount of moves were not played
                        // swap the players and let the game continue
                        player_swap(&current_player);
                    }
                }

                // if the move resulted in a win 
                // print the winning player's number
                // ask if users wish to play again
                else{
                    printf("\n\n---------------------------------------------------------------\n");
                    printf("\nCongrats Player %d, you win!\n\n", player_num);
                    board_initialiser(board);
                    restart_indicator = game_restart();
                }
            }

            // if the move is not valid let the 
            // user know with a message 
            // increment the attempt count and re-start the loop
            else{
                input_attempt_count++;
                printf("\nInput was invalid");
            }
        }
    }

    /* Printing the message "The game was exited" */
    printf("\n---------------------------------------------------------------\n");
    printf("\nThe game was exited\n\n");

    return 0;
}