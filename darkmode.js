document.addEventListener("DOMContentLoaded", function () {
    const darkModeSwitch = document.getElementById("darkModeSwitch");

    // Check if the dark mode switch exists
    if (!darkModeSwitch) {
        console.error("Dark mode switch not found!");
        return;
    }

    // Function to apply the theme
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }

    // Function to check if localStorage is supported
    function isLocalStorageSupported() {
        try {
            const testKey = "__test__";
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Load saved theme or set default
    let isDarkMode = false;
    if (isLocalStorageSupported()) {
        const savedTheme = localStorage.getItem("darkMode");
        if (savedTheme !== null) {
            isDarkMode = savedTheme === "true";
        } else {
            // Set default based on system preference if no saved theme
            isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        applyTheme(isDarkMode);
        darkModeSwitch.checked = isDarkMode;
    } else {
        // Fallback: apply light mode if localStorage isn't supported
        applyTheme(false);
        darkModeSwitch.checked = false;
    }

    // Toggle dark mode on checkbox change
    darkModeSwitch.addEventListener("change", function () {
        const isDark = this.checked;
        applyTheme(isDark);
        if (isLocalStorageSupported()) {
            localStorage.setItem("darkMode", isDark ? "true" : "false");
        }
    });
});