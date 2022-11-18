function swapToLight (darkmodeToggle: HTMLImageElement,lightmodeToggle: HTMLImageElement,toggleText: HTMLParagraphElement) {
    
    if (currentTheme === "dark") {

        let style = document.getElementById("darkmode") as HTMLLinkElement;
        style.href = "styles/lightmode.css";
        style.id = "lightmode";

        darkmodeToggle.src = "Images/DarkMode-off.svg";
        lightmodeToggle.src = "Images/LightMode-on.svg";
        toggleText.textContent = "Toggle to dark mode";
        localStorage.setItem("darkmode", "disabled");
        currentTheme = "light";
    }
}

function swapToDark (darkmodeToggle: HTMLImageElement,lightmodeToggle: HTMLImageElement,toggleText: HTMLParagraphElement) {
    
    if (currentTheme === "light") {

        let style = document.getElementById("lightmode") as HTMLLinkElement;
        style.href = "styles/darkmode.css";
        style.id = "darkmode";

        darkmodeToggle.src = "Images/DarkMode-on.svg";
        lightmodeToggle.src = "Images/LightMode-off.svg";
        toggleText.textContent = "Toggle to light mode"
        localStorage.setItem("darkmode", "enabled");
        currentTheme = "dark";
    } 
}

// on button click for each respective toggle switch swap
let darkmodeToggle = document.getElementById("dark") as HTMLImageElement;
let lightmodeToggle = document.getElementById("light") as HTMLImageElement;
let toggleText = document.getElementById("toggle_text") as HTMLParagraphElement;

// accomplish what loadscript couldn't (because of placement in html)
if (currentTheme === "dark") {
    darkmodeToggle.src = "Images/DarkMode-on.svg";
    lightmodeToggle.src = "Images/LightMode-off.svg";
    toggleText.textContent = "Toggle to light mode";
}

// head was declared in loading script -> refers to html "head" element
// swapToDark change the theme to dark theme (see loadingscript)
darkmodeToggle.addEventListener("click", () => {
        swapToDark(darkmodeToggle,lightmodeToggle,toggleText);
});

lightmodeToggle.addEventListener("click", () => {
        swapToLight(darkmodeToggle,lightmodeToggle,toggleText);
});


// check if newly resized window is desktop size, if it is
// swap image for desktop optimised one
window.addEventListener("resize", () => {

    let resizedView = window.matchMedia("(min-width: 1240px)") as MediaQueryList;
    let profilePic = document.getElementById("profile_pic") as HTMLImageElement;

    if (resizedView.matches) {

        profilePic.src = "Images/Profile_Picture.svg";
    }
    else{
        profilePic.src = "Images/Profile_Picture_Mobile.png";
    }
})