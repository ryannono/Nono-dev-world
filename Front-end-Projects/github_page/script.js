// accomplish what loadscript couldn't (because of placement in html)
if (initial_state === "dark") {
    var darkmodeToggle_1 = document.getElementById("dark");
    darkmodeToggle_1.src = "Images/DarkMode-on.svg";
    var lightmodeToggle_1 = document.getElementById("light");
    lightmodeToggle_1.src = "Images/LightMode-off.svg";
    var toggleText = document.getElementById("toggle_text");
    toggleText.textContent = "Toggle to light mode";
}
// on button click for each respective toggle switch swap
var darkmodeToggle = document.getElementById("dark");
var lightmodeToggle = document.getElementById("light");
// head was declared in loading script -> refers to html "head" element
// swapToDark change the theme to dark theme (see loadingscript)
darkmodeToggle.addEventListener("click", function () {
    var style = document.getElementById("lightmode");
    if (style) {
        swapToDark();
    }
});
lightmodeToggle.addEventListener("click", function () {
    var style = document.getElementById("darkmode");
    if (style) {
        swapToLight();
    }
});
