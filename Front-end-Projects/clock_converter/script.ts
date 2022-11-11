
// timeConversion converts a AM/PM time
// to its military equivalent
// requires s is a valid time string of format
// hh:mm:ssAM or hh:mm:ssPM 
function timeConversion(s: string): string {

    // get selection element
    const selection = document.getElementById("AM_PM") as HTMLSelectElement;

    // count number of hour digits were inputted
    var hour_digit_count: number = 0;
    for (var i: number = 0 ; s[i] != " " ; i++){
        hour_digit_count++;
    }
    
    // If time was in pm and not 12
    // convert the time to military
    if (selection.value === "PM" && s.substring(0,2) != "12"){

        // build hours
        if (hour_digit_count === 2) {
            var hours: number = Number(s.substring(0,2));
        }
        else{
            var hours: number = Number(s.substring(0,1));
        }

        // increment by 12 for military time conversion
        hours += 12;

        // create new string
        // if only 1 hour digit was entered
        if (hour_digit_count != 2){
            s = hours + s.substring(1);
        }
        // if a number with 
        else{
            s = hours + s.substring(2);
        }
    }
    // fix user input if hours did not have 2 digits
    else if (hour_digit_count != 2){
        s = "0" + s;
    }
    
    return s;
}

// returns the passed input field id's
// currenttly entered value as a string
// requires id is a valid input field id
function get_value(id: string): string {
    const input = document.getElementById(id) as HTMLInputElement;
    const time_value = input.value;

    return time_value;
}

// gets input field value and asigns its
// conversion to the heading
function assign_value(): void{
    // converts time that is in the the input field
    const intial_time: string = get_value("main_input");
    const am_pm_element = document.getElementById("AM_PM") as HTMLInputElement;
    const am_pm_value: string = am_pm_element.value;
    var converted_time: string;

    if (intial_time.length === 12){
        converted_time = timeConversion(intial_time);

        // assigns converted time to heading
        const military_time_element = document.getElementById("result_value");
        military_time_element.innerHTML = converted_time;

        // get rid of helper text
        const helper_text_element = document.getElementById("result_helper_text");
        helper_text_element.innerHTML = intial_time + " " + am_pm_value + " in military time is:";
    }
}

function auto_format(): void{
    const input_element = document.getElementById("main_input") as HTMLInputElement;
    const input_string: string = input_element.value;
    const len: number = input_string.length;
    var new_value: string;

    // if input field is empty
    if (len === 0){
        // show helper text
        const helper_text_element = document.getElementById("result_helper_text");
        helper_text_element.innerHTML = "Please enter a time for conversion";
    }
    else if (len === 3 || len === 8){
        new_value = input_string.substring(0, len-1) + " : " + input_string[len-1];
        input_element.value = new_value;
    }
}

// auto format user input on keyup
const input = document.getElementById("main_input");
input.addEventListener("keyup", auto_format);
input.addEventListener("emptied", auto_format);

// button event listner 
// on click the value in the input field gets converted
// and assigned to the heading
const button = document.getElementById("converter");
button.addEventListener("click", assign_value);









    

