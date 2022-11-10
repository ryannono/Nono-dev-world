// timeConversion converts a AM/PM time
// to its military equivalent
// requires s is a valid time string of format
// hh:mm:ssAM or hh:mm:ssPM 
function timeConversion(s) {
    // If time was in pm
    if (s[8] === 'P' && s[0] != '1') {
        // build hours
        var hours = Number(s.substring(0, 2));
        // increment by 12 for military time
        hours += 12;
        // create new string
        if (hours > 9) {
            s = hours + s.substring(2);
        }
        else {
            s = "0" + hours + s.substring(2);
        }
    }
    return s;
}
function get_input() {
    var user_input = prompt("Please enter the AM/PM time: ");
    return user_input;
}
var time = get_input();
var heading = document.getElementById("result_text");
heading.innerHTML = timeConversion(time);
//# sourceMappingURL=script.js.map