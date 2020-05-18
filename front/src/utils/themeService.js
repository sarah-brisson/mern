const ThemeService = {
    getTheme: function() {
        window.localStorage.getItem("isLight")
    },

    setTheme: function(value) {
        window.localStorage.setItem("isLight", value)
    }
};

export default ThemeService;