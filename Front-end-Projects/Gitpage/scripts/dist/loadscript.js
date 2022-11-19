"use strict";
const darkThemePreference = window.matchMedia("(prefers-color-scheme: dark)");
let darkmodeState = localStorage.getItem("darkmode");
let currentTheme = "light";
if ((darkThemePreference.matches || darkmodeState === "enabled") && darkmodeState != "disabled") {
    let style = document.getElementById("lightmode");
    style.href = "styles/darkmode.css";
    style.id = "darkmode";
    currentTheme = "dark";
}
