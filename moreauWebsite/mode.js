document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".logo-dark-white-mode");
    

   
    /****************** Function to Enable Dark Mode *************************/
    function enableDarkMode() {
       

        // Store dark mode in localStorage
        localStorage.setItem("dark-mode", "enabled");
    }

    /****************** Function to Disable Dark Mode *************************/
    function disableDarkMode() {
        
        // Store light mode in localStorage
        localStorage.setItem("dark-mode", "disabled");
    }

    /****************** Check LocalStorage for Dark Mode on Page Load *************************/
    if (localStorage.getItem("dark-mode") === "enabled") {
        enableDarkMode();
       
    } else {
        disableDarkMode();
       
    }

    /****************** Toggle Dark Mode on Click *************************/
    toggleBtn.addEventListener("click", () => {
        console.log("clecked");
        
        // if (mainWrapper.classList.contains("dark-mode-main-container")) {
        //     disableDarkMode();
        // } else {
        //     enableDarkMode();
        // }
    });
});


