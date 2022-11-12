// timeConversion converts a AM/PM time
// to its military equivalent
// requires input_value is a valid time string of format:
// hh:mm:ssAM or hh:mm:ssPM 
function timeConversion(input_value, select_value) {
    // count number of hour digits were inputted
    var hour_digit_count = 0;
    for (var i = 0; input_value[i] != " "; i++) {
        hour_digit_count++;
    }
    // If time was in pm
    // convert the time to military
    if (select_value === "PM") {
        // get hours number
        // substring slice to get depends on 
        // the amount of digits initially entered 
        // Ex. input = 12:00:00 get substring from 0 to 2 (12)
        // Ex. input = 1:00:00 get substring from 0 to 1 (1)
        var input_hours = void 0;
        if (hour_digit_count === 2) {
            input_hours = Number(input_value.substring(0, 2));
        }
        else {
            input_hours = Number(input_value.substring(0, 1));
        }
        // convert the hours to millitary time by
        // incrementing the number by 12
        input_hours += 12;
        // if after incrementring the hours number === 24
        // then change it to 00
        if (input_hours === 24) {
            input_value = "00" + input_value.substring(2);
        }
        // if only 1 hour digit was entered
        else if (hour_digit_count != 2) {
            input_value = input_hours + input_value.substring(1);
        }
        // if 2 hour digit2 were entered
        else {
            input_value = input_hours + input_value.substring(2);
        }
    }
    // fix user input if hours did not have 2 digits
    else if (hour_digit_count != 2) {
        input_value = "0" + input_value;
    }
    return input_value;
}
// valid_input_check returns true if the user input was:
// - a number smaller than the max regular time (12:59:59 or 125959)
// - user inputed enough characters (>=11)
// - the hours section of the input is >= 01
// - the minutes and second sections of the input are < 60
function valid_input_check(input, select) {
    var input_value = input.value;
    var input_len = input_value.length;
    // remove all the extra letters in the input
    // 11 : 11 : 11 -> 111111
    // only remove 2 colons
    // only remove 4 spaces
    // if there are more then the input was invalid
    for (var spa_rep_count = 0; spa_rep_count < 4; spa_rep_count++) {
        input_value = input_value.replace(/\s/, '');
    }
    for (var col_rep_count = 0; col_rep_count < 2; col_rep_count++) {
        input_value = input_value.replace(':', '');
    }
    // get numerical value of parsed/reworked user input
    var input_val_num = Number(input_value);
    // check input was a number smaller than the 
    // max regular time (12:59:59 or 125959)
    if (125959 >= input_val_num && input_val_num >= 0) {
        // check user has inputed enough characters 
        // to constitute a full time input
        if (input_len >= 11) {
            // check the time inputted is a valid regular time value
            // the smallest number you can have in the hours section
            // for regular time is: 01. For minutes and seconds it is: 00
            // therefore the smallest acceptable input is 10000 or 1:00:00
            if (input_val_num >= 10000) {
                // initialise temp letiable for manipulation
                var temp_n = input_val_num;
                // checks minutes and seconds are below 60
                // if they are not return false
                while (temp_n > 0) {
                    if (Math.floor((temp_n % 100) / 10) > 5) {
                        input.style.backgroundColor = "#ff5656";
                        select.style.backgroundColor = "#ff5656";
                        console.log("invalid input: " + input_value + "minutes or seconds are too high");
                        return false;
                    }
                    temp_n /= 100;
                }
                // if minutes and seconds are below 60
                // return true
                input.style.backgroundColor = "white";
                select.style.backgroundColor = "white";
                console.log("Valid input");
                return true;
            }
            // if the full time has been entered and the 
            // value is too low to be a valid time
            // return false and colour input box red
            else {
                input.style.backgroundColor = "#ff5656";
                select.style.backgroundColor = "#ff5656";
                console.log("invalid input, number to low for regular time: " + input_value + "becomes" + input_val_num);
                return false;
            }
        }
        // if the input field is empty colour select and input white
        // but return false
        else if (input_value === '') {
            input.style.backgroundColor = "white";
            select.style.backgroundColor = "white";
        }
        // if the input is a number but the user hasn't 
        // entered enough digit for a full time yet 
        // keep input box white but return false
        else {
            input.style.backgroundColor = "white";
            select.style.backgroundColor = "white";
            console.log("invalid input full time hasn't be entered yet: " + input_value + "becomes" + input_val_num);
            return false;
        }
    }
    // If the input is not a number or is out of range (n > 125959)
    // color input box red and return false
    else {
        input.style.backgroundColor = "#ff5656";
        select.style.backgroundColor = "#ff5656";
        console.log("invalid input: " + input_value);
        return false;
    }
}
// assign_value gets input field value
// checks if it valid by calling valid_input_check on it
// if valid it converts it by calling timeConversion on the input
// then it assigns that input to the DOM military_time_element
// lastly it updates the DOM helper_text_element to present the military time
function assign_value(input, select) {
    var input_value = input.value;
    var select_value = select.value;
    // if the input was valid
    // convert it by calling timeConversion on the input time
    // and assign the new converted value to the military_time_element
    if (valid_input_check(input, select)) {
        var converted_input_value = timeConversion(input_value, select_value);
        // assigns converted time to military time heading element
        // and override helper text element to give context to the conversion
        // xx : xx : xx xx is xx : xx : xx in military time
        var military_time_element = document.getElementById("result_value");
        military_time_element.innerHTML = converted_input_value;
        var helper_text_element = document.getElementById("result_helper_text");
        helper_text_element.innerHTML = input_value + " " + select_value + " in military time is:";
    }
}
// auto_format formats user input to: HH : MM : SS syntax
function auto_format(input) {
    var input_value = input.value;
    var input_len = input_value.length;
    // initialise the letiable that will house
    // the formated version of the input
    var new_value;
    // when length of input is 3 or 8 insert " : " styling to input field
    if (input_len === 3 || input_len === 8) {
        if (input_value[input_len - 1] === ":") {
            new_value = input_value.substring(0, input_len - 1) + " " + input_value[input_len - 1] + " ";
        }
        else {
            new_value = input_value.substring(0, input_len - 1) + " : " + input_value[input_len - 1];
        }
        input.value = new_value;
    }
}
// main() start /////////////////////////////////////////////////////////////////////////////////////////////////////////
// get DOM input and select elements
var input = document.getElementById("main_input");
var select = document.getElementById("AM_PM");
// colour input and select elements approprietly on focus and blur (inverse of focus)
input.addEventListener("focus", function () {
    input.style.border = "3px solid #ffb23c";
    input.style.borderRight = "0";
    input.style.outline = "0";
    select.style.borderTop = "3px solid #ffb23c";
    select.style.borderBottom = "3px solid #ffb23c";
    select.style.borderRight = "3px solid #ffb23c";
});
input.addEventListener("blur", function () {
    input.style.border = "1px solid #ffb23c";
    input.style.borderRight = "0";
    input.style.outline = "0";
    select.style.borderTop = "1px solid #ffb23c";
    select.style.borderBottom = "1px solid #ffb23c";
    select.style.borderRight = "0px solid transparent";
});
// auto format, and check user input validity on keydown and keyup respectively
input.addEventListener("keypress", function () { return auto_format(input); });
input.addEventListener("keyup", function () { return valid_input_check(input, select); });
// when input is emptied run input check to see re-colour input box
input.addEventListener("emptied", function () { return valid_input_check(input, select); });
// on button click the value in the input field gets converted
// and assigned to the heading
var button = document.getElementById("converter");
button.addEventListener("click", function () { return assign_value(input, select); });
//# sourceMappingURL=script.js.map