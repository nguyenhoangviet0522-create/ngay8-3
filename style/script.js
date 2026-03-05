window.addEventListener('load', () => {
    function showToast(message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    const defaultMemories = [
        'style/memory/anh1.jpg',
        'style/memory/anh2.jpg',
        'style/memory/anh3.jpg',
        'style/memory/anh4.jpg',
        'style/memory/anh5.jpg',
        'style/memory/anh6.jpg',
        'style/memory/anh7.jpg',
    ];

    const defaultPopupTexts = [
        "Chúc cô ngày 8/3 luôn vui vẻ, xinh đẹp và nhiều sức khỏe",
        "Chúc các bạn nữ ngày 8/3 thật nhiều niềm vui và tiếng cười",
        "Chúc các bạn nữ luôn vui tươi và học tập thật tốt",
        "Chúc các bạn nữ lớp mình luôn tràn đầy năng lượng",
        "Chúc các bạn nữ luôn tự tin và mạnh mẽ trong học tập",
        "Chúc các bạn nữ ngày càng xinh đẹp và thành công",
        "Chúc các bạn nữ luôn đạt nhiều điểm cao",
        "Chúc cô có một ngày 8/3 thật ý nghĩa và nhiều niềm vui",
        "Chúc các bạn nữ luôn chăm ngoan và học giỏi",
        "Cuối cùng, xin chúc tất cả các bạn nữ luôn vui tươi và đạt nhiều thành tích tốt trong học tập"
    ];


    let memories = [...defaultMemories];
    let popupTexts = [...defaultPopupTexts];
    let popupIdx = 0;
    let musicChoice = 1;
    const bgm = document.getElementById('bgm');
    const popSound = document.getElementById('popSound');
    let isPlaying = false;

    function playPop() {
        if (popSound) {
            popSound.currentTime = 0;
            popSound.play().catch(e => console.log("Pop sound play blocked:", e));
        }
    }

    if (bgm && musicChoice !== 1) {
        bgm.src = `./style/nhac (${musicChoice}).mp3`;
    }

    document.addEventListener('click', playPop);

    const startScreen = document.getElementById('startScreen');
    startScreen.addEventListener('click', () => {
        startScreen.classList.add('hide');
        if (!isPlaying && bgm) {
            bgm.play().then(() => {
                isPlaying = true;
            }).catch(e => console.log("Music play blocked:", e));
        }
        setInterval(createFallingImage, 1200);
    });

    const fallingImages = [];
    for (let k = 1; k <= 12; k++) fallingImages.push(`style/img/Anh (${k}).png`);

    const overlay = document.getElementById('overlay');
    const popupImg = document.getElementById('popupImg');
    const popupCaption = document.getElementById('popupCaption');
    const popupText = document.getElementById('popupText');
    const closeBtn = document.querySelector('.popup-close');

    function openPopup(imgSrc, captionText) {
        popupCaption.textContent = captionText || '';
        popupImg.style.display = '';
        popupImg.src = imgSrc || '';
        popupText.textContent = '';
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');
    }

    function closePopup() {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        popupImg.src = '';
    }

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });

    const activePositions = [];
    function createFallingImage() {
        let left;
        const widthPx = window.innerWidth <= 480 ? 40 + Math.random() * 30 : 80 + Math.random() * 40;
        const widthVw = (widthPx / window.innerWidth) * 100;

        let safe = widthVw / 2 + 2; 
        const minDistance = 10;
        let tries = 0;
        do {
            left = safe + Math.random() * (100 - 2 * safe);
            tries++;
        } while (activePositions.some(x => Math.abs(x - left) < minDistance) && tries < 20);

        const el = document.createElement('img');
        el.className = 'falling-img';
        const randomImg = fallingImages[Math.floor(Math.random() * fallingImages.length)];
        el.src = randomImg;
        el.style.left = left + 'vw';
        el.style.width = widthPx + 'px';
        el.style.animationDuration = (8 + Math.random() * 6) + 's';

        el.addEventListener('click', (ev) => {
            playPop();
            const mem = memories[Math.floor(Math.random() * memories.length)];
            const txt = popupTexts[popupIdx % popupTexts.length];

            openPopup(mem, txt);

            popupIdx = (popupIdx + 1) % popupTexts.length;
            ev.stopPropagation();
        });

        const container = document.getElementById('fallingContainer') || document.body;
        container.appendChild(el);
        activePositions.push(left);

        setTimeout(() => {
            el.remove();
            const idx = activePositions.indexOf(left);
            if (idx !== -1) activePositions.splice(idx, 1);
        }, 14000);
    }


    function program(delay = 200) {
        (function () {
            const _b = (s) => decodeURIComponent(escape(atob(s)));
            const _d = [
                "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
                "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
                "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI="
            ];

            setTimeout(() => {
                _d.forEach(x => console.log(_b(x)));
            }, delay);
        })();
    }

    program();

    document.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
});
