

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

let initialView = window.matchMedia("(min-width: 1240px)") as MediaQueryList;

// check if window is of desktop size if it is
// swap image to desktop optimised one
if (initialView.matches) {

    let profilePic = document.getElementById("profile_pic") as HTMLImageElement;
    profilePic.src = "Images/Profile_Picture.svg";
}