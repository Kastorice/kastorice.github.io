(function() {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        if (block.querySelector('.copy-btn')) return;
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        block.appendChild(btn);
        btn.addEventListener('click', () => {
            const code = block.querySelector('code');
            if (!code) return;
            const text = code.innerText || code.textContent;
            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = 'Copied';
                btn.style.background = '#4F8335';
                btn.style.borderColor = '#4F8335';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(() => {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                btn.textContent = 'Copied';
                setTimeout(() => {
                    btn.textContent = 'Copy';
                }, 2000);
            });
        });
    });
})();