function swapToLight () {
   
    let style = document.getElementById("darkmode") as HTMLLinkElement;
    
    if (style) {

        style.href = "styles_light.css";
        style.id = "lightmode";

        let darkmodeToggle = document.getElementById("dark") as HTMLImageElement;
        darkmodeToggle.src = "Images/DarkMode-off.svg";

        let lightmodeToggle = document.getElementById("light") as HTMLImageElement;
        lightmodeToggle.src = "Images/LightMode-on.svg";

        let toggleText = document.getElementById("toggle_text") as HTMLParagraphElement;
        toggleText.textContent = "Toggle to dark mode"

        localStorage.setItem("darkmode", null);
    }
}

function swapToDark () {

    let style = document.getElementById("lightmode") as HTMLLinkElement;
    
    if (style) {

        style.href = "styles_dark.css";
        style.id = "darkmode";

        let darkmodeToggle = document.getElementById("dark") as HTMLImageElement;
        darkmodeToggle.src = "Images/DarkMode-on.svg";
        
        let lightmodeToggle = document.getElementById("light") as HTMLImageElement;
        lightmodeToggle.src = "Images/LightMode-off.svg";

        let toggleText = document.getElementById("toggle_text") as HTMLParagraphElement;
        toggleText.textContent = "Toggle to light mode"

        localStorage.setItem("darkmode", "enabled");
    } 
}

const darkThemePreference = window.matchMedia("(prefers-color-scheme: dark)") as MediaQueryList;
let darkmodeState = localStorage.getItem("darkmode");
let initial_state: string = "light";

// check locale storage and system preferences for page theme
if (darkThemePreference.matches || darkmodeState === "enabled") {
    initial_state = "dark";
    swapToDark();
}