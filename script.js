(function() {
    const signatureTextEl = document.getElementById('signatureText');
    const cursorEl = document.getElementById('signatureCursor');

    const signaturePool = [
        "Crafting ideas, one block at a time.",
        "Exploring the vast world of code.",
        "Building bridges between pixels and reality.",
        "Every adventure begins with a single block.",
        "Mining deep into the caverns of creativity.",
        "Redstone circuits and digital dreams.",
        "From spawn point to far lands.",
        "Crafting table of thoughts and stories.",
        "In the realm of infinite possibilities.",
        "Where imagination meets persistence.",
        "Pixel by pixel, building my world.",
        "Surviving and thriving in the code biome.",
        "Enchanting the web with crafted designs.",
        "Beyond the blocks, into the bytes.",
    ];

    function shuffleArray(arr) {
        const shuffled = arr.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    let shuffledPool = shuffleArray(signaturePool);
    let poolIndex = 0;
    let currentText = '';
    let isTyping = false;
    let isDeleting = false;
    let isPausing = false;
    let charIndex = 0;
    let timeoutId = null;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 25;
    const PAUSE_AFTER_TYPE = 2200;
    const PAUSE_AFTER_DELETE = 350;

    function getNextSignature() {
        if (poolIndex >= shuffledPool.length) {
            shuffledPool = shuffleArray(signaturePool);
            poolIndex = 0;
            if (shuffledPool[0] === currentText && shuffledPool.length > 1) {
                [shuffledPool[0], shuffledPool[1]] = [shuffledPool[1], shuffledPool[0]];
            }
        }
        const next = shuffledPool[poolIndex];
        poolIndex++;
        return next;
    }

    function typeCharacter() {
        if (isPausing || isDeleting) return;
        if (charIndex < currentText.length) {
            charIndex++;
            signatureTextEl.textContent = currentText.substring(0, charIndex);
            cursorEl.style.display = 'inline-block';
            timeoutId = setTimeout(typeCharacter, TYPE_SPEED);
        } else {
            isTyping = false;
            isPausing = true;
            cursorEl.style.display = 'inline-block';
            timeoutId = setTimeout(startDeleting, PAUSE_AFTER_TYPE);
        }
    }

    function deleteCharacter() {
        if (isPausing || isTyping) return;
        if (charIndex > 0) {
            charIndex--;
            signatureTextEl.textContent = currentText.substring(0, charIndex);
            cursorEl.style.display = 'inline-block';
            timeoutId = setTimeout(deleteCharacter, DELETE_SPEED);
        } else {
            isDeleting = false;
            signatureTextEl.textContent = '';
            cursorEl.style.display = 'inline-block';
            timeoutId = setTimeout(startTyping, PAUSE_AFTER_DELETE);
        }
    }

    function startDeleting() {
        isPausing = false;
        isDeleting = true;
        cursorEl.style.display = 'inline-block';
        deleteCharacter();
    }

    function startTyping() {
        currentText = getNextSignature();
        charIndex = 0;
        isTyping = true;
        isDeleting = false;
        isPausing = false;
        signatureTextEl.textContent = '';
        cursorEl.style.display = 'inline-block';
        typeCharacter();
    }

    function clearAllTimers() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    const heroSection = document.querySelector('.hero');
    let isHeroVisible = true;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isHeroVisible) {
                isHeroVisible = true;
                isTyping = false;
                isDeleting = false;
                isPausing = false;
                charIndex = 0;
                clearAllTimers();
                signatureTextEl.textContent = '';
                cursorEl.style.display = 'inline-block';
                timeoutId = setTimeout(startTyping, 400);
            } else if (!entry.isIntersecting && isHeroVisible) {
                isHeroVisible = false;
                clearAllTimers();
                isTyping = false;
                isDeleting = false;
                isPausing = false;
            }
        });
    }, { threshold: 0.2 });

    if (heroSection) {
        observer.observe(heroSection);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isHeroVisible) {
            clearAllTimers();
            isTyping = false;
            isDeleting = false;
            isPausing = false;
        } else if (!document.hidden && isHeroVisible && !isTyping && !isDeleting && !isPausing) {
            const currentLength = signatureTextEl.textContent.length;
            if (currentLength === 0) {
                timeoutId = setTimeout(startTyping, 300);
            } else if (currentLength === (currentText || '').length && currentText) {
                isPausing = true;
                timeoutId = setTimeout(startDeleting, PAUSE_AFTER_TYPE);
            }
        }
    });

    function initTypewriter() {
        clearAllTimers();
        signatureTextEl.textContent = '';
        cursorEl.style.display = 'inline-block';
        charIndex = 0;
        isTyping = false;
        isDeleting = false;
        isPausing = false;
        currentText = '';
        shuffledPool = shuffleArray(signaturePool);
        poolIndex = 0;
        timeoutId = setTimeout(startTyping, 500);
    }

    initTypewriter();

    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.blur());
        });
    });

    console.log('%c Kastorice\'s Blog %c Ready.',
        'font-family: "Mojangles", sans-serif; font-size: 14px; color: #5cb843; background: #0d0d0d; padding: 8px 12px; border: 3px solid #4a9e35;',
        'font-family: sans-serif; color: #b0a890;');
    console.log('%c Created by DeepSeek',
        'font-family: "Mojangles", sans-serif; font-size: 10px; color: #8b6b42;');
})();