import { ThemeManager } from './components/index-foot.js';
window.tm = new ThemeManager();
window.onload = window.tm.setupThemeIndicator();
