
// timeConversion converts a AM/PM time
// to its military equivalent
// requires s is a valid time string of format
// hh:mm:ssAM or hh:mm:ssPM 
function timeConversion(s: string): string {
    
    // If time was in pm and not 12
    if (s[8] === 'P' && s.substring(0,2) != "12"){

        // build hours
        var hours: number = Number(s.substring(0,2));

        // increment by 12 for military time
        hours += 12;

        // proper functionning check
        console.log(hours);

        // create new string
        if (hours > 9){
            s = hours + s.substring(2);
        }
        else{
            s = "0" + hours + s.substring(2);
        }
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
    const converted_time: string = timeConversion(get_value("main_input"));

    // assigns converted time to heading
    const heading = document.getElementById("result_text");
    heading.innerHTML = converted_time;
}



const button = document.getElementById("converter");
button.addEventListener("click", assign_value);







    

