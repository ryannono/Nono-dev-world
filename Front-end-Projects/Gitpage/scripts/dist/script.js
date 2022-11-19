"use strict";
function swapToggles(themeToMatch) {
    let darkmodeToggle = document.getElementById("dark");
    let lightmodeToggle = document.getElementById("light");
    let toggleText = document.getElementById("toggle_text");
    if (themeToMatch === "dark") {
        darkmodeToggle.src = "Images/DarkMode-on.svg";
        lightmodeToggle.src = "Images/LightMode-off.svg";
        toggleText.textContent = "Toggle to light mode";
    }
    else {
        darkmodeToggle.src = "Images/DarkMode-off.svg";
        lightmodeToggle.src = "Images/LightMode-on.svg";
        toggleText.textContent = "Toggle to dark mode";
    }
}
function swapToLight() {
    let style = document.getElementById("darkmode");
    style.href = "styles/lightmode.css";
    style.id = "lightmode";
    localStorage.setItem("darkmode", "disabled");
    currentTheme = "light";
    swapToggles(currentTheme);
}
function swapToDark() {
    let style = document.getElementById("lightmode");
    style.href = "styles/darkmode.css";
    style.id = "darkmode";
    localStorage.setItem("darkmode", "enabled");
    currentTheme = "dark";
    swapToggles(currentTheme);
}
function themeSwap(trigger) {
    if (trigger.id === "dark" && currentTheme === "light") {
        swapToDark();
    }
    else if (trigger.id === "light" && currentTheme === "dark") {
        swapToLight();
    }
}
function addClassListener(className, eventName, funtionToExecute) {
    let targetClass = document.getElementsByClassName(className);
    for (let i = 0; i < targetClass.length; i++) {
        targetClass[i].addEventListener(eventName, () => funtionToExecute(targetClass[i]));
    }
}
function swapProfilePic() {
    let resizedView = window.matchMedia("(min-width: 1240px)");
    let profilePic = document.getElementById("profile_pic");
    if (resizedView.matches) {
        profilePic.src = "Images/Profile_Picture.svg";
    }
    else {
        profilePic.src = "Images/Profile_Picture_Mobile.png";
    }
}
function themedCVDownload() {
    if (currentTheme === "dark") {
        downloadButton.href = "https://github.com/ryannono/Resume/raw/main/Ryan-Nono-Resume-Winter2023-Dark_compressed.pdf";
    }
    else {
        downloadButton.href = "https://github.com/ryannono/Resume/raw/main/Ryan-Nono-Resume-Winter2023-Light_compressed.pdf";
    }
}
swapProfilePic();
window.addEventListener("resize", swapProfilePic);
if (currentTheme === "dark") {
    swapToggles(currentTheme);
}
addClassListener("mode_toggle", "click", themeSwap);
let downloadButton = document.getElementById("resume_button");
downloadButton.addEventListener("click", themedCVDownload);
