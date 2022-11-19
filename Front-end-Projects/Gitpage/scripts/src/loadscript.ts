

const darkThemePreference = window.matchMedia("(prefers-color-scheme: dark)") as MediaQueryList;
let darkmodeState = localStorage.getItem("darkmode");
let currentTheme: string = "light";

// check locale storage and system preferences for page theme
if ((darkThemePreference.matches || darkmodeState === "enabled") && darkmodeState != "disabled") {
    
    let style = document.getElementById("lightmode") as HTMLLinkElement;

    style.href = "styles/darkmode.css";
    style.id = "darkmode";
    currentTheme = "dark";
}