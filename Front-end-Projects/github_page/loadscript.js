function swapToLight() {
    var style = document.getElementById("darkmode");
    if (style) {
        style.href = "styles_light.css";
        style.id = "lightmode";
        var darkmodeToggle_1 = document.getElementById("dark");
        darkmodeToggle_1.src = "Images/DarkMode-off.svg";
        var lightmodeToggle_1 = document.getElementById("light");
        lightmodeToggle_1.src = "Images/LightMode-on.svg";
        var toggleText = document.getElementById("toggle_text");
        toggleText.textContent = "Toggle to dark mode";
        localStorage.setItem("darkmode", null);
    }
}
function swapToDark() {
    var style = document.getElementById("lightmode");
    if (style) {
        style.href = "styles_dark.css";
        style.id = "darkmode";
        var darkmodeToggle_2 = document.getElementById("dark");
        darkmodeToggle_2.src = "Images/DarkMode-on.svg";
        var lightmodeToggle_2 = document.getElementById("light");
        lightmodeToggle_2.src = "Images/LightMode-off.svg";
        var toggleText = document.getElementById("toggle_text");
        toggleText.textContent = "Toggle to light mode";
        localStorage.setItem("darkmode", "enabled");
    }
}
var darkThemePreference = window.matchMedia("(prefers-color-scheme: dark)");
var darkmodeState = localStorage.getItem("darkmode");
var initial_state = "light";
// check locale storage and system preferences for page theme
if (darkThemePreference.matches || darkmodeState === "enabled") {
    initial_state = "dark";
    swapToDark();
}
