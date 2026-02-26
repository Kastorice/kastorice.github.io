document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 代码块复制与隔离包装逻辑
    const codeBlocks = document.querySelectorAll('.post-content pre');
    codeBlocks.forEach(pre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const btn = document.createElement('button');
        btn.innerText = 'Copy';
        btn.className = 'copy-button';
        
        btn.onclick = () => {
            const codeText = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                btn.innerText = 'Copied!';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.innerText = 'Copy';
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 2000);
            });
        };
        wrapper.appendChild(btn);
    });

    // 2. 主题切换联动 Prism 高亮
    const prismLink = document.getElementById('prism-theme-link');
    if (prismLink) {
        const updatePrismTheme = (theme) => {
            prismLink.href = (theme === 'dark') 
                ? 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css' 
                : 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
        };
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updatePrismTheme(initialTheme);
        new MutationObserver(() => {
            updatePrismTheme(document.documentElement.getAttribute('data-theme'));
        }).observe(document.documentElement, { attributes: true });
    }

    // 3. 返回顶部功能
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) btt.classList.add('show');
            else btt.classList.remove('show');
        });
        btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});