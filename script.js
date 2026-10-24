/* ==========================================================================
   🎂 AESTHETIC MULTI-SCENE LOGIC (3 UNIQUE BACKGROUNDS & 3D CAKE)
   ========================================================================== */

const CONFIG = {
    girlName: "Nguyễn Ngọc Ánh",

    // Polaroid Memories (Trang 2)
    memories: [
        {
            img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop",
            caption: "“Nụ cười của em luôn là điều dịu dàng nhất sưởi ấm anh.”",
            rot: -2
        },
        {
            img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop",
            caption: "“Chúc em một tuổi mới luôn rực rỡ và bình yên như chính em.”",
            rot: 2
        }
    ],

    // Thẻ đặc quyền (Vouchers VIP)
    vouchers: [
        {
            icon: "☕",
            text: "Thẻ Bao Trà Sữa — Có hiệu lực bất cứ lúc nào em thèm hoặc thấy mệt mỏi."
        },
        {
            icon: "🤍",
            text: "Thẻ Luôn Được Cưng Chiều — Em luôn luôn đúng trong mọi cuộc trò chuyện."
        },
        {
            icon: "✨",
            text: "Thẻ Một Điều Ước — Một điều ước bất kỳ sẽ được thực hiện vô điều kiện."
        }
    ],

    // Bức thư sinh nhật sau khi thổi nến 3D
    finalLetter: `Gửi người con gái anh yêu nhất,

Chúc mừng sinh nhật em! Cảm ơn em vì đã đến bên anh, mang theo nụ cười trong trẻo và sự ấm áp sưởi ấm những ngày tháng qua.

Tuổi mới, anh chỉ mong em luôn an yên, luôn tự tin bước tiếp trên con đường em chọn, và nụ cười rạng rỡ ấy sẽ không bao giờ tắt trên môi. Dù ngày mai có ra sao, anh vẫn luôn ở đây, đồng hành và yêu thương em nhiều hơn mỗi ngày.

Happy Birthday Công Chúa Của Anh! 🎂✨💖`
};

/* Application State */
let currentPage = 1;
let isMusicPlaying = false;
let musicNoteTimeout = null;
let threeScene, threeCamera, threeRenderer, cakeGroup, flameMesh, flameLight;
let isCandleBlown = false;

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // 1. Tên bạn nữ
    document.getElementById("display-girl-name").textContent = CONFIG.girlName;

    // 2. Khởi tạo hiệu ứng động cho 3 Background riêng biệt
    setupPage1Background();
    setupPage2Background();
    setupPage3Background();

    // 3. Render mã QR nghệ thuật
    renderAestheticQR();

    // 4. Render nội dung trang 2
    renderPage2Content();

    // 5. Gán sự kiện nút bấm & 3D Card Tilt
    setupEvents();
    setupInvitationTilt();
}

/* ==========================================================================
   🌌 3 HỆ THỐNG BACKGROUND CHÂN THẬT
   ========================================================================== */
// Trang 1: Bụi vàng bay lên trong nắng sớm
function setupPage1Background() {
    const container = document.getElementById("particles-p1");
    const symbols = ["✦", "✧", "⋆", "•", "✨"];
    const count = 16;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("span");
        star.className = "p1-dust";
        star.textContent = symbols[i % symbols.length];

        const left = Math.random() * 100;
        const dur = 5 + Math.random() * 7;
        const delay = Math.random() * 6;
        const size = 10 + Math.random() * 10;

        star.style.left = `${left}%`;
        star.style.setProperty("--dur", `${dur}s`);
        star.style.animationDelay = `${delay}s`;
        star.style.fontSize = `${size}px`;

        container.appendChild(star);
    }
}

// Trang 2: Quả cầu Bokeh hoàng hôn & Cánh hoa rơi
function setupPage2Background() {
    const bokehWrap = document.getElementById("bokeh-wrap");
    const petalsWrap = document.getElementById("petals-p2");

    // Bokeh Orbs
    for (let i = 0; i < 9; i++) {
        const orb = document.createElement("div");
        orb.className = "bokeh-orb";
        const size = 60 + Math.random() * 90;
        const left = Math.random() * 90;
        const top = Math.random() * 85;
        const dur = 6 + Math.random() * 8;

        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${left}%`;
        orb.style.top = `${top}%`;
        orb.style.setProperty("--b-dur", `${dur}s`);
        orb.style.animationDelay = `${i * -1.2}s`;

        bokehWrap.appendChild(orb);
    }

    // Floating Petals
    const icons = ["🌸", "💮", "🌺"];
    for (let i = 0; i < 10; i++) {
        const petal = document.createElement("span");
        petal.className = "p2-petal";
        petal.textContent = icons[i % icons.length];

        const left = Math.random() * 100;
        const dur = 6 + Math.random() * 6;
        const delay = Math.random() * 8;
        const size = 14 + Math.random() * 12;

        petal.style.left = `${left}%`;
        petal.style.setProperty("--p-dur", `${dur}s`);
        petal.style.animationDelay = `${delay}s`;
        petal.style.fontSize = `${size}px`;

        petalsWrap.appendChild(petal);
    }
}

// Trang 3: Bầu trời đêm sao nhấp nháy
function setupPage3Background() {
    const starfield = document.getElementById("stars-p3");
    const starCount = 38;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star-point";

        const size = 2 + Math.random() * 3.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const dur = 2 + Math.random() * 3.5;
        const delay = Math.random() * 3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.setProperty("--s-dur", `${dur}s`);
        star.style.animationDelay = `${delay}s`;

        starfield.appendChild(star);
    }
}

// Chuyển đổi Background tương ứng với từng Trang
function switchBackground(pageIndex) {
    document.body.setAttribute("data-page", pageIndex);

    const layers = document.querySelectorAll(".bg-layer");
    layers.forEach((layer, idx) => {
        if (idx + 1 === pageIndex) {
            layer.classList.add("active");
        } else {
            layer.classList.remove("active");
        }
    });
}

/* ==========================================================================
   💌 TRANG 1: RENDER MÃ QR & 3D TILT TƯƠNG TÁC
   ========================================================================== */
function renderAestheticQR() {
    const qrUrl = window.location.origin + window.location.pathname + "?vip=true";

    const heartSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <path d="M50 88 C25 65 5 50 5 30 C5 15 17 5 30 5 C38 5 45 9 50 16 C55 9 62 5 70 5 C83 5 95 15 95 30 C95 50 75 65 50 88Z" 
                  fill="#c98897" stroke="#ffffff" stroke-width="6"/>
        </svg>
    `;
    const heartData = "data:image/svg+xml;base64," + btoa(heartSvg.trim());

    const qrCode = new QRCodeStyling({
        width: 196,
        height: 196,
        type: "canvas",
        data: qrUrl,
        image: heartData,
        dotsOptions: {
            color: "#a6586b",
            type: "extra-rounded",
            gradient: {
                type: "linear",
                rotation: 45,
                colorStops: [
                    { offset: 0, color: "#a6586b" },
                    { offset: 1, color: "#dfb387" }
                ]
            }
        },
        cornersSquareOptions: {
            color: "#a6586b",
            type: "extra-rounded"
        },
        cornersDotOptions: {
            color: "#dfb387",
            type: "dot"
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 4,
            imageSize: 0.35
        }
    });

    qrCode.append(document.getElementById("qr-code-slot"));

    // Check query URL ?vip=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("vip") === "true") {
        setTimeout(() => {
            goToPage(2);
            startSoftPianoMusic();
        }, 600);
    }
}

// Hiệu ứng nghiêng 3D (Tilt) chân thật khi di chuột / chạm vào thiệp
function setupInvitationTilt() {
    const card = document.getElementById("invitation-tilt-card");
    if (!card) return;

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const tiltX = (y / (rect.height / 2)) * -6;
        const tiltY = (x / (rect.width / 2)) * 6;

        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
}

/* ==========================================================================
   📸 TRANG 2: POLAROIDS & VOUCHERS
   ========================================================================== */
function renderPage2Content() {
    const polaroidContainer = document.getElementById("polaroid-row");
    polaroidContainer.innerHTML = "";

    CONFIG.memories.forEach((item) => {
        const card = document.createElement("div");
        card.className = "polaroid-item";
        card.style.setProperty("--rot", `${item.rot || 0}deg`);

        card.innerHTML = `
            <div class="polaroid-img-wrap">
                <img src="${item.img}" alt="Kỷ niệm" loading="lazy">
            </div>
            <p class="polaroid-text">${item.caption}</p>
        `;

        polaroidContainer.appendChild(card);
    });

    const voucherContainer = document.getElementById("voucher-list");
    voucherContainer.innerHTML = "";

    CONFIG.vouchers.forEach((v) => {
        const ticket = document.createElement("div");
        ticket.className = "voucher-ticket";

        ticket.innerHTML = `
            <span class="v-icon">${v.icon}</span>
            <span class="v-content">${v.text}</span>
        `;

        voucherContainer.appendChild(ticket);
    });
}

/* ==========================================================================
   🎂 TRANG 3: BÁNH KEM 3D THREE.JS ĐÊM SAO DẠ TIỆC
   ========================================================================== */
function initThreeJSCake() {
    const container = document.getElementById("cake-3d-container");
    if (!container || threeRenderer) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 350;

    // Scene
    threeScene = new THREE.Scene();

    // Camera
    threeCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    threeCamera.position.set(0, 4.5, 9);
    threeCamera.lookAt(0, 0.5, 0);

    // Renderer
    threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    threeRenderer.setSize(width, height);
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeRenderer.shadowMap.enabled = true;
    threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(threeRenderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    threeScene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    threeScene.add(dirLight);

    // Warm Candle Glow Light
    flameLight = new THREE.PointLight(0xffb74d, 2.5, 9);
    flameLight.position.set(0, 2.5, 0);
    threeScene.add(flameLight);

    // Cake Group
    cakeGroup = new THREE.Group();
    threeScene.add(cakeGroup);

    build3DCakeGeometry();

    // Touch rotation
    setupCakeTouchRotation(container);

    // Loop
    animateThree();
}

function build3DCakeGeometry() {
    // Materials
    const goldPlateMat = new THREE.MeshStandardMaterial({
        color: 0xffdf85,
        roughness: 0.25,
        metalness: 0.8
    });

    const creamMat = new THREE.MeshStandardMaterial({
        color: 0xfffcf7,
        roughness: 0.45,
        metalness: 0.05
    });

    const pinkTierMat = new THREE.MeshStandardMaterial({
        color: 0xf5cad3,
        roughness: 0.45,
        metalness: 0.05
    });

    const strawberryMat = new THREE.MeshStandardMaterial({
        color: 0xdf2945,
        roughness: 0.3,
        metalness: 0.15
    });

    const pearlSugarMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.3
    });

    const candleMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3
    });

    // --- Plate ---
    const plateGeo = new THREE.CylinderGeometry(3.3, 3.0, 0.16, 48);
    const plate = new THREE.Mesh(plateGeo, goldPlateMat);
    plate.position.y = -1.0;
    plate.receiveShadow = true;
    cakeGroup.add(plate);

    // --- Tier 1 (Bottom) ---
    const tier1Geo = new THREE.CylinderGeometry(2.65, 2.65, 1.1, 48);
    const tier1 = new THREE.Mesh(tier1Geo, pinkTierMat);
    tier1.position.y = -0.4;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeGroup.add(tier1);

    // Drip Ring 1 (Sugar Pearls around Tier 1)
    const countPearls = 22;
    for (let i = 0; i < countPearls; i++) {
        const angle = (i / countPearls) * Math.PI * 2;
        const pearlGeo = new THREE.SphereGeometry(0.08, 12, 12);
        const pearl = new THREE.Mesh(pearlGeo, pearlSugarMat);
        pearl.position.set(Math.cos(angle) * 2.68, -0.9, Math.sin(angle) * 2.68);
        cakeGroup.add(pearl);
    }

    // --- Tier 2 (Middle) ---
    const tier2Geo = new THREE.CylinderGeometry(1.95, 1.95, 0.95, 48);
    const tier2 = new THREE.Mesh(tier2Geo, creamMat);
    tier2.position.y = 0.5;
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    cakeGroup.add(tier2);

    // --- Tier 3 (Top) ---
    const tier3Geo = new THREE.CylinderGeometry(1.25, 1.25, 0.75, 48);
    const tier3 = new THREE.Mesh(tier3Geo, pinkTierMat);
    tier3.position.y = 1.25;
    tier3.castShadow = true;
    tier3.receiveShadow = true;
    cakeGroup.add(tier3);

    // --- Strawberries on Tier 2 Edge ---
    const strawGeo = new THREE.ConeGeometry(0.18, 0.35, 16);
    const countStraw = 8;
    for (let i = 0; i < countStraw; i++) {
        const angle = (i / countStraw) * Math.PI * 2;
        const straw = new THREE.Mesh(strawGeo, strawberryMat);
        straw.position.set(Math.cos(angle) * 1.6, 1.05, Math.sin(angle) * 1.6);
        straw.rotation.x = Math.PI;
        cakeGroup.add(straw);
    }

    // --- Candle Stick ---
    const candleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.85, 16);
    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.set(0, 1.95, 0);
    candle.castShadow = true;
    cakeGroup.add(candle);

    // --- Candle Flame 3D ---
    const flameGeo = new THREE.SphereGeometry(0.13, 16, 16);
    flameGeo.scale(1, 2.2, 1);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa22 });
    flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, 2.5, 0);
    cakeGroup.add(flameMesh);
}

function setupCakeTouchRotation(container) {
    let isDragging = false;
    let previousX = 0;

    const onStart = (clientX) => {
        isDragging = true;
        previousX = clientX;
    };

    const onMove = (clientX) => {
        if (!isDragging || !cakeGroup) return;
        const deltaX = clientX - previousX;
        cakeGroup.rotation.y += deltaX * 0.009;
        previousX = clientX;
    };

    const onEnd = () => { isDragging = false; };

    container.addEventListener("touchstart", (e) => onStart(e.touches[0].clientX), { passive: true });
    window.addEventListener("touchmove", (e) => { if (e.touches && e.touches[0]) onMove(e.touches[0].clientX); }, { passive: true });
    window.addEventListener("touchend", onEnd);

    container.addEventListener("mousedown", (e) => onStart(e.clientX));
    window.addEventListener("mousemove", (e) => onMove(e.clientX));
    window.addEventListener("mouseup", onEnd);
}

function animateThree() {
    requestAnimationFrame(animateThree);

    if (cakeGroup) {
        cakeGroup.rotation.y += 0.003;
    }

    if (flameMesh && !isCandleBlown) {
        const time = Date.now() * 0.015;
        const scaleFlicker = 1 + Math.sin(time) * 0.12;
        flameMesh.scale.set(scaleFlicker, scaleFlicker * 2.2, scaleFlicker);
        if (flameLight) {
            flameLight.intensity = 2.2 + Math.sin(time * 2) * 0.5;
        }
    }

    if (threeRenderer && threeScene && threeCamera) {
        threeRenderer.render(threeScene, threeCamera);
    }
}

/* ==========================================================================
   🕯️ THỔI NẾN BÁNH KEM 3D
   ========================================================================== */
function executeBlowCandle() {
    if (isCandleBlown) return;
    isCandleBlown = true;

    // 1. Tắt ngọn lửa và ánh sáng nến
    if (flameMesh) cakeGroup.remove(flameMesh);
    if (flameLight) threeScene.remove(flameLight);

    // 2. Ẩn nút thổi & cập nhật tiêu đề
    document.getElementById("candle-controls").style.display = "none";
    document.getElementById("cake-headline").textContent = "✨ Nguyện Ước Đã Được Gửi Tới Các Vì Sao ✨";
    document.getElementById("cake-subline").textContent = "Chúc công chúa của anh một sinh nhật ngập tràn hạnh phúc và bình yên!";

    // 3. Bắn pháo hoa Confetti hoàng gia đêm sao
    triggerLuxuryConfetti();

    // 4. Mở lá thư sinh nhật
    setTimeout(() => {
        const letterModal = document.getElementById("letter-modal");
        document.getElementById("final-letter-text").textContent = CONFIG.finalLetter;
        letterModal.style.display = "block";

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }, 1200);
}

function triggerLuxuryConfetti() {
    const colors = ["#ffdf85", "#dfb387", "#c98897", "#ffffff", "#f5cad3", "#ba68c8"];
    
    confetti({
        particleCount: 100,
        spread: 85,
        origin: { y: 0.6 },
        colors: colors
    });

    setTimeout(() => {
        confetti({
            particleCount: 110,
            spread: 110,
            origin: { y: 0.5 },
            colors: colors
        });
    }, 400);

    setTimeout(() => {
        confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.55 },
            colors: colors
        });
    }, 850);
}

/* ==========================================================================
   🔄 ĐIỀU HƯỚNG TRANG & CHUYỂN NỀN
   ========================================================================== */
function goToPage(targetPage) {
    const currentPageEl = document.getElementById(`page-${currentPage}`);
    const targetPageEl = document.getElementById(`page-${targetPage}`);

    if (currentPageEl) {
        currentPageEl.classList.remove("active");
        currentPageEl.classList.add("fade-out");

        setTimeout(() => {
            currentPageEl.classList.remove("fade-out");
            currentPageEl.style.display = "none";
        }, 400);
    }

    // Chuyển background
    switchBackground(targetPage);

    setTimeout(() => {
        targetPageEl.style.display = "block";
        void targetPageEl.offsetWidth; // Reflow
        targetPageEl.classList.add("active");
        currentPage = targetPage;

        window.scrollTo({ top: 0, behavior: "smooth" });

        if (targetPage === 3) {
            setTimeout(initThreeJSCake, 200);
        }
    }, 450);
}

/* ==========================================================================
   🎵 WEB AUDIO API: PIANO HAPPY BIRTHDAY
   ========================================================================== */
function setupEvents() {
    document.getElementById("btn-open-gift").addEventListener("click", () => {
        goToPage(2);
        startSoftPianoMusic();
    });

    document.getElementById("qr-tap-trigger").addEventListener("click", () => {
        goToPage(2);
        startSoftPianoMusic();
    });

    document.getElementById("btn-go-to-cake").addEventListener("click", () => {
        goToPage(3);
    });

    document.getElementById("btn-blow-candle").addEventListener("click", executeBlowCandle);

    const cakeContainer = document.getElementById("cake-3d-container");
    cakeContainer.addEventListener("dblclick", executeBlowCandle);

    document.getElementById("music-btn").addEventListener("click", toggleMusic);
}

function toggleMusic() {
    if (isMusicPlaying) {
        stopSoftPianoMusic();
    } else {
        startSoftPianoMusic();
    }
}

function startSoftPianoMusic() {
    if (isMusicPlaying) return;
    isMusicPlaying = true;

    document.getElementById("music-btn").classList.add("playing");
    playSoftHappyBirthdayLoop();
}

function stopSoftPianoMusic() {
    isMusicPlaying = false;
    document.getElementById("music-btn").classList.remove("playing");

    if (musicNoteTimeout) {
        clearTimeout(musicNoteTimeout);
        musicNoteTimeout = null;
    }
}

function playSoftHappyBirthdayLoop() {
    const melody = [
        { f: 261.63, d: 0.4 },
        { f: 261.63, d: 0.2 },
        { f: 293.66, d: 0.5 },
        { f: 261.63, d: 0.5 },
        { f: 349.23, d: 0.5 },
        { f: 329.63, d: 0.9 },

        { f: 261.63, d: 0.4 },
        { f: 261.63, d: 0.2 },
        { f: 293.66, d: 0.5 },
        { f: 261.63, d: 0.5 },
        { f: 392.00, d: 0.5 },
        { f: 349.23, d: 0.9 },

        { f: 261.63, d: 0.4 },
        { f: 261.63, d: 0.2 },
        { f: 523.25, d: 0.5 },
        { f: 440.00, d: 0.5 },
        { f: 349.23, d: 0.5 },
        { f: 329.63, d: 0.5 },
        { f: 293.66, d: 0.9 }
    ];

    let index = 0;

    function playNext() {
        if (!isMusicPlaying) return;

        const note = melody[index % melody.length];
        playPianoTone(note.f, note.d);

        index++;
        const gap = (index % melody.length === 0) ? 1200 : 80;
        musicNoteTimeout = setTimeout(playNext, note.d * 1000 + gap);
    }

    playNext();
}

function playPianoTone(freq, duration) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.05);

        osc.onended = () => ctx.close();
    } catch (e) {
        // Ignored
    }
}
