"use strict";
const darkThemePreference = window.matchMedia("(prefers-color-scheme: dark)");
let darkmodeState = localStorage.getItem("darkmode");
let currentTheme = "light";
if ((darkmodeState === "dark system preference" || darkmodeState === "enabled")
    || (darkThemePreference.matches && darkmodeState != "disabled")) {
    let style = document.getElementById("lightmode");
    style.href = "styles/darkmode.css";
    style.id = "darkmode";
    currentTheme = "dark";
    localStorage.setItem("darkmode", "dark system preference");
}
