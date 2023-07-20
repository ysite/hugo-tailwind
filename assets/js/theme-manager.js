export function getThemeState() {
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export class ThemeManager {
  constructor() {
    this.themeDarkIcon = document.getElementById("theme-toggle-dark");
    this.themeLightIcon = document.getElementById("theme-toggle-light");
    this.themeSystemIcon = document.getElementById("theme-toggle-system");
  }

  setThemeVisibility(themeParameter) {
    switch (themeParameter) {
      case "system":
        this.themeSystemIcon.classList.toggle("hidden");
        break;
      case "light":
        this.themeLightIcon.classList.toggle("hidden");
        break;
      case "dark":
        this.themeDarkIcon.classList.toggle("hidden");
        break;
    }
  }

  changeTheme() {
    if (!this.themeSystemIcon.classList.contains("hidden")) {
      this.themeSystemIcon.classList.toggle("hidden");
      this.themeLightIcon.classList.toggle("hidden");
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (!this.themeLightIcon.classList.contains("hidden")) {
      this.themeLightIcon.classList.toggle("hidden");
      this.themeDarkIcon.classList.toggle("hidden");
      localStorage.setItem("color-theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (!this.themeDarkIcon.classList.contains("hidden")) {
      this.themeDarkIcon.classList.toggle("hidden");
      this.themeSystemIcon.classList.toggle("hidden");
      localStorage.removeItem("color-theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
    } else {
      /* default fallback to system preference */
      this.themeSystemIcon.classList.remove("hidden");
      this.themeLightIcon.classList.add("hidden");
      this.themeDarkIcon.classList.add("hidden");
      localStorage.removeItem("color-theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
    }
  }

  setupThemeIndicator() {
    let themeParameter;

    /* load theme variable from local storage */
    if (localStorage.getItem("color-theme") === "dark") {
      themeParameter = "dark";
    } else if (localStorage.getItem("color-theme") === "light") {
      themeParameter = "light";
    } else {
      themeParameter = "system";
    }

    this.setThemeVisibility(themeParameter);
  }
}
