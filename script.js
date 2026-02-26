<<<<<<< HEAD
/**
 * Kastorice's Blog - Core Logic
 */

// 1. 打字机动画配置
const signatures = [
    "Life is short, you need Python.", 
    "Talk is cheap. Show me the code.", 
    "Stay hungry, stay foolish.", 
    "赣水之滨，记录生活。"
];
const textElement = document.getElementById("signature-text");
let idx = 0, charIdx = 0, isDeleting = false;

function typeWriter() {
    const current = signatures[idx];
    textElement.innerText = current.substring(0, isDeleting ? charIdx-- : charIdx++);
    
    let speed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIdx > current.length) { 
        speed = 2000; 
        isDeleting = true; 
    }
    else if (isDeleting && charIdx < 0) { 
        isDeleting = false; 
        idx = (idx + 1) % signatures.length; 
        charIdx = 0; 
        speed = 500; 
    }
    setTimeout(typeWriter, speed);
}

// 2. 初始化监听
window.addEventListener('DOMContentLoaded', () => {
    // 启动打字机
    typeWriter();

    // 标题点击回到顶部
    const blogTitle = document.getElementById('blog-title');
    if (blogTitle) {
        blogTitle.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 移动端菜单控制
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', () => navLinks.classList.remove('active'));
    }

    // 主题切换逻辑
    const themeBtn = document.getElementById('theme-toggle-btn');
    const html = document.documentElement;
    
    // 检查本地缓存
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
        });
    }
=======
/**
 * Kastorice's Blog - Core Logic
 */

// 1. 打字机动画配置
const signatures = [
    "Life is short, you need Python.", 
    "Talk is cheap. Show me the code.", 
    "Stay hungry, stay foolish.", 
    "赣水之滨，记录生活。"
];
const textElement = document.getElementById("signature-text");
let idx = 0, charIdx = 0, isDeleting = false;

function typeWriter() {
    const current = signatures[idx];
    textElement.innerText = current.substring(0, isDeleting ? charIdx-- : charIdx++);
    
    let speed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIdx > current.length) { 
        speed = 2000; 
        isDeleting = true; 
    }
    else if (isDeleting && charIdx < 0) { 
        isDeleting = false; 
        idx = (idx + 1) % signatures.length; 
        charIdx = 0; 
        speed = 500; 
    }
    setTimeout(typeWriter, speed);
}

// 2. 初始化监听
window.addEventListener('DOMContentLoaded', () => {
    // 启动打字机
    typeWriter();

    // 标题点击回到顶部
    const blogTitle = document.getElementById('blog-title');
    if (blogTitle) {
        blogTitle.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 移动端菜单控制
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', () => navLinks.classList.remove('active'));
    }

    // 主题切换逻辑
    const themeBtn = document.getElementById('theme-toggle-btn');
    const html = document.documentElement;
    
    // 检查本地缓存
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
        });
    }
>>>>>>> a74fb95998e2dff4e889b866aa1981c0f853fe1a
});