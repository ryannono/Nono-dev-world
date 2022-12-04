
// swapToggles gets swap the theme toggles and the corresponding
// text to match the passed theme
// Ex. theme passed is white -> light toggle will be turned on
//     and dark toggle will be turned off 
function swapToggles(themeToMatch:string) : void{

    let darkmodeToggle = document.getElementById("dark") as HTMLImageElement;
    let lightmodeToggle = document.getElementById("light") as HTMLImageElement;
    let toggleText = document.getElementById("toggle_text") as HTMLParagraphElement;
    
    if (themeToMatch === "dark") {
        darkmodeToggle.src = "Images/DarkMode-on.svg";
        lightmodeToggle.src = "Images/LightMode-off.svg";
        toggleText.textContent = "Toggle to light mode"
    }
    else{
        darkmodeToggle.src = "Images/DarkMode-off.svg";
        lightmodeToggle.src = "Images/LightMode-on.svg";
        toggleText.textContent = "Toggle to dark mode";
    }
}

// swapToLight switches to the light css theme
function swapToLight () :void {
    
    let style = document.getElementById("darkmode") as HTMLLinkElement;
    style.href = "styles/lightmode.css";
    style.id = "lightmode";

    localStorage.setItem("darkmode", "disabled");
    currentTheme = "light";
    swapToggles(currentTheme);
}

// swapToDark switches to the dark css theme
function swapToDark (): void {
    
    let style = document.getElementById("lightmode") as HTMLLinkElement;
    style.href = "styles/darkmode.css";
    style.id = "darkmode";

    localStorage.setItem("darkmode", "enabled");
    currentTheme = "dark";
    swapToggles(currentTheme);
}

// theme swap identifies if the theme should be
// swapped to light, dark on no change based on
// which toggle was pressed and the current theme
function themeSwap (trigger: HTMLElement) : void{

    if (trigger.id === "dark" && currentTheme === "light") {

        swapToDark();
    }
    else if (trigger.id === "light" && currentTheme === "dark"){

        swapToLight();
    }
}

// addClassListener adds an the "eventName" passed event trigger
// to every item in the passed "className" class to trigger a 
// "functionToExecute"
function addClassListener(className:string, eventName:string, funtionToExecute: Function) : void {
    
    let targetClass = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < targetClass.length; i++) {

        targetClass[i].addEventListener(eventName, () => funtionToExecute(targetClass[i]));
    }

}

// swapProfilePic swaps from smaller png profile
// pic (for mobile) to large svg if the screen size
// is detected to be desktop
function swapProfilePic () : void {
    
    let resizedView = window.matchMedia("(min-width: 1240px)") as MediaQueryList;
    let profilePic = document.getElementById("profile_pic") as HTMLImageElement;

    if (resizedView.matches) {

        profilePic.src = "Images/Profile_Picture.svg";
    }
    else{
        profilePic.src = "Images/Profile_Picture_Mobile.png";
    }
}

// themedCVDownload changes cv download link to match current theme
// Ex. you are on the light theme, and press "download resume", the
//     the downloaded resume will be the lightmode version
function themedCVDownload ():void {

    if (currentTheme === "dark") {
        downloadButton.href = "https://github.com/ryannono/Resume/raw/main/Ryan-Nono-Resume-Winter2023-Dark_compressed.pdf";
    }
    else{
        downloadButton.href = "https://github.com/ryannono/Resume/raw/main/Ryan-Nono-Resume-Winter2023-Light_compressed.pdf";
    }
}

// check if window is of desktop size on first load
// and on window resize if it is
// swap image to desktop optimised one
swapProfilePic();
window.addEventListener("resize", swapProfilePic);

// accomplish rest of dark theme load that loadscript.js
// couldn't (because of placement in html)
// and listen for future toggle clicks (theme swap requests) 
if (currentTheme === "dark") {
    swapToggles(currentTheme);
}
addClassListener("mode_toggle","click",themeSwap);

//depending on light or dark mode download appropriate resume
let downloadButton = document.getElementById("resume_button") as HTMLLinkElement;
downloadButton.addEventListener("click", themedCVDownload);