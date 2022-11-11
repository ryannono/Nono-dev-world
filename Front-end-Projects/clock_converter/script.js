// timeConversion converts a AM/PM time
// to its military equivalent
// requires s is a valid time string of format
// hh:mm:ssAM or hh:mm:ssPM 
function timeConversion(s) {
    // get selection element
    var selection = document.getElementById("AM_PM");
    // count number of hour digits were inputted
    var hour_digit_count = 0;
    for (var i = 0; s[i] != " "; i++) {
        hour_digit_count++;
    }
    // If time was in pm and not 12
    // convert the time to military
    if (selection.value === "PM") {
        // build hours
        if (hour_digit_count === 2) {
            var hours = Number(s.substring(0, 2));
        }
        else {
            var hours = Number(s.substring(0, 1));
        }
        // increment by 12 for military time conversion
        hours += 12;
        if (hours === 24) {
            s = "00" + s.substring(2);
        }
        // create new string
        // if only 1 hour digit was entered
        else if (hour_digit_count != 2) {
            s = hours + s.substring(1);
        }
        // if a number with 
        else {
            s = hours + s.substring(2);
        }
    }
    // fix user input if hours did not have 2 digits
    else if (hour_digit_count != 2) {
        s = "0" + s;
    }
    return s;
}
// returns the passed input field id's
// currenttly entered value as a string
// requires id is a valid input field id
function get_value(id) {
    var input = document.getElementById(id);
    var time_value = input.value;
    return time_value;
}
// returns true if the user input was comprised of only 
// "", " ", ":", and integers
function valid_input_check(n) {
    var intial_len = n.length;
    // remove all the extra letters in the input
    // 11 : 11 : 11 -> 111111
    // only remove 2 colons
    // only remove 4 spaces
    // if there are more then the input was invalid
    for (var spa_rep_count = 0; spa_rep_count < 4; spa_rep_count++) {
        n = n.replace(/\s/, '');
    }
    for (var col_rep_count = 0; col_rep_count < 2; col_rep_count++) {
        n = n.replace(':', '');
    }
    var input_element = document.getElementById("main_input");
    input_element.style.transition = "all 0.5s";
    input_element.style.transitionTimingFunction = "ease";
    // if n is now a number between 0 and 125959 (12:59:59)
    // then the input was valid
    // colour the input field based on the result
    if (125959 >= Number(n) && Number(n) >= 10000 && intial_len >= 11) {
        input_element.style.backgroundColor = "white";
        var temp_n = Number(n);
        // check minutes and seconds are below 60
        while (temp_n > 0) {
            if (Math.floor((temp_n % 100) / 10) > 5) {
                input_element.style.backgroundColor = "#ff5656";
                console.log("invalid input: " + n);
                return false;
            }
            temp_n /= 100;
        }
        console.log("Valid input: " + Number(n));
        return true;
    }
    else if (Number(n) < 10000 && intial_len >= 11) {
        input_element.style.backgroundColor = "#ff5656";
        console.log("invalid input: " + n);
        return false;
    }
    else if (125959 >= Number(n) && Number(n) >= 0) {
        input_element.style.backgroundColor = "white";
        console.log("invalid input: " + n);
        return false;
    }
    else {
        input_element.style.backgroundColor = "#ff5656";
        console.log("invalid input: " + n);
        return false;
    }
}
// gets input field value and asigns its
// converted value to the military time element
function assign_value() {
    // converts time that is in the the input field
    var intial_time = get_value("main_input");
    var am_pm_element = document.getElementById("AM_PM");
    var am_pm_value = am_pm_element.value;
    var converted_time;
    if (valid_input_check(intial_time)) {
        converted_time = timeConversion(intial_time);
        // assigns converted time to heading
        var military_time_element = document.getElementById("result_value");
        military_time_element.innerHTML = converted_time;
        // get rid of helper text
        var helper_text_element = document.getElementById("result_helper_text");
        helper_text_element.innerHTML = intial_time + " " + am_pm_value + " in military time is:";
    }
}
// formats user input to: HH : MM : SS
function auto_format() {
    var input_element = document.getElementById("main_input");
    var input_string = input_element.value;
    var len = input_string.length;
    var new_value;
    // if input field is empty
    if (len === 0) {
        // show helper text
        var helper_text_element = document.getElementById("result_helper_text");
        helper_text_element.innerHTML = "Please enter a time for conversion";
    }
    else if (len === 3 || len === 8) {
        new_value = input_string.substring(0, len - 1) + " : " + input_string[len - 1];
        input_element.value = new_value;
    }
}
// auto format user input on keyup
// when input is emptied update helper text
var input = document.getElementById("main_input");
input.addEventListener("keydown", auto_format);
input.addEventListener("keyup", function () { return valid_input_check(input.value); });
input.addEventListener("emptied", auto_format);
input.addEventListener("emptied", function () { return valid_input_check(input.value); });
// on button click the value in the input field gets converted
// and assigned to the heading
var button = document.getElementById("converter");
button.addEventListener("click", assign_value);
//# sourceMappingURL=script.js.map