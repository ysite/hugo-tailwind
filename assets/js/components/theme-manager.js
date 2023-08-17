export class ThemeManager {
  constructor() {
    this.themeDarkIcon = document.getElementById("theme-toggle-dark");
    this.themeLightIcon = document.getElementById("theme-toggle-light");
  }

  changeTheme() {
    this.themeLightIcon.classList.toggle("hidden");
    this.themeDarkIcon.classList.toggle("hidden");
    if (this.themeLightIcon.classList.contains("hidden")) {
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("color-theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }

  setupThemeIndicator() {
    if (localStorage.getItem("color-theme") === "dark") {
      this.themeLightIcon.classList.toggle("hidden");
    } else {
      this.themeDarkIcon.classList.toggle("hidden");
    }
  }
}
