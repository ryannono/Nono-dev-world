
// accomplish what loadscript couldn't (because of placement in html)
if (initial_state === "dark") {
    let darkmodeToggle = document.getElementById("dark") as HTMLImageElement;
    darkmodeToggle.src = "Images/DarkMode-on.svg";
    
    let lightmodeToggle = document.getElementById("light") as HTMLImageElement;
    lightmodeToggle.src = "Images/LightMode-off.svg";

    let toggleText = document.getElementById("toggle_text") as HTMLParagraphElement;
    toggleText.textContent = "Toggle to light mode"
}

// on button click for each respective toggle switch swap
let darkmodeToggle = document.getElementById("dark") as HTMLImageElement;
let lightmodeToggle = document.getElementById("light") as HTMLImageElement;

// head was declared in loading script -> refers to html "head" element
// swapToDark change the theme to dark theme (see loadingscript)
darkmodeToggle.addEventListener("click", () => {

    let style = document.getElementById("lightmode") as HTMLLinkElement;

    if (style){
        swapToDark();
    }
});

lightmodeToggle.addEventListener("click", () => {

    let style = document.getElementById("darkmode") as HTMLLinkElement;

    if (style){
        swapToLight();
    }
});
