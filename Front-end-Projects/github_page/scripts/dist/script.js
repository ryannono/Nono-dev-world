"use strict";
function swapToLight(darkmodeToggle, lightmodeToggle, toggleText) {
    if (currentTheme === "dark") {
        let style = document.getElementById("darkmode");
        style.href = "styles/lightmode.css";
        style.id = "lightmode";
        darkmodeToggle.src = "Images/DarkMode-off.svg";
        lightmodeToggle.src = "Images/LightMode-on.svg";
        toggleText.textContent = "Toggle to dark mode";
        localStorage.setItem("darkmode", "disabled");
        currentTheme = "light";
    }
}
function swapToDark(darkmodeToggle, lightmodeToggle, toggleText) {
    if (currentTheme === "light") {
        let style = document.getElementById("lightmode");
        style.href = "styles/darkmode.css";
        style.id = "darkmode";
        darkmodeToggle.src = "Images/DarkMode-on.svg";
        lightmodeToggle.src = "Images/LightMode-off.svg";
        toggleText.textContent = "Toggle to light mode";
        localStorage.setItem("darkmode", "enabled");
        currentTheme = "dark";
    }
}
let darkmodeToggle = document.getElementById("dark");
let lightmodeToggle = document.getElementById("light");
let toggleText = document.getElementById("toggle_text");
if (currentTheme === "dark") {
    darkmodeToggle.src = "Images/DarkMode-on.svg";
    lightmodeToggle.src = "Images/LightMode-off.svg";
    toggleText.textContent = "Toggle to light mode";
}
darkmodeToggle.addEventListener("click", () => {
    swapToDark(darkmodeToggle, lightmodeToggle, toggleText);
});
lightmodeToggle.addEventListener("click", () => {
    swapToLight(darkmodeToggle, lightmodeToggle, toggleText);
});
window.addEventListener("resize", () => {
    let resizedView = window.matchMedia("(min-width: 1240px)");
    let profilePic = document.getElementById("profile_pic");
    if (resizedView.matches) {
        profilePic.src = "Images/Profile_Picture.svg";
    }
    else {
        profilePic.src = "Images/Profile_Picture_Mobile.png";
    }
});
