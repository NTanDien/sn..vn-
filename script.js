/* ==========================================================================
   🎂 AESTHETIC LUXURY BIRTHDAY ENGINE (THREE.JS 3D CAKE & INTERACTIONS)
   ========================================================================== */

const CONFIG = {
    girlName: "Nguyễn Ngọc Ánh",

    // Polaroid Memories (Trang 2)
    memories: [
        {
            img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop",
            caption: "“Nụ cười của em luôn là điều dịu dàng nhất sưởi ấm anh.”"
        },
        {
            img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop",
            caption: "“Chúc em một tuổi mới luôn rực rỡ và bình yên như chính em.”"
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
    // 1. Hiển thị tên bạn nữ
    document.getElementById("display-girl-name").textContent = CONFIG.girlName;

    // 2. Tạo hạt bụi hoa bay nhẹ
    createSakuraDust();

    // 3. Render mã QR màu Rose-Gold thanh lịch
    renderAestheticQR();

    // 4. Render nội dung trang 2 (Polaroids & Vouchers)
    renderPage2Content();

    // 5. Gán sự kiện nút bấm
    setupEvents();
}

/* ==========================================================================
   🌸 SAKURA DUST PARTICLES
   ========================================================================== */
function createSakuraDust() {
    const container = document.getElementById("petal-dust");
    const icons = ["🌸", "✨", "🤍", "🌷"];
    const count = 12;

    for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.className = "dust-particle";
        span.textContent = icons[i % icons.length];

        const left = Math.random() * 100;
        const dur = 8 + Math.random() * 8;
        const delay = Math.random() * 8;
        const size = 12 + Math.random() * 8;

        span.style.left = `${left}%`;
        span.style.animationDuration = `${dur}s`;
        span.style.animationDelay = `${delay}s`;
        span.style.fontSize = `${size}px`;

        container.appendChild(span);
    }
}

/* ==========================================================================
   💌 TRANG 1: RENDER MÃ QR ROSE-GOLD
   ========================================================================== */
function renderAestheticQR() {
    const qrUrl = window.location.origin + window.location.pathname + "?vip=true";

    // Trái tim SVG tối giản màu Rose Gold
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

    // Check if opened from camera QR
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("vip") === "true") {
        setTimeout(() => {
            goToPage(2);
            startSoftPianoMusic();
        }, 600);
    }
}

/* ==========================================================================
   📸 TRANG 2: POLAROIDS & VOUCHERS
   ========================================================================== */
function renderPage2Content() {
    // 1. Polaroids
    const polaroidContainer = document.getElementById("polaroid-row");
    polaroidContainer.innerHTML = "";

    CONFIG.memories.forEach((item) => {
        const card = document.createElement("div");
        card.className = "polaroid-item";

        card.innerHTML = `
            <div class="polaroid-img-wrap">
                <img src="${item.img}" alt="Kỷ niệm" loading="lazy">
            </div>
            <p class="polaroid-text">${item.caption}</p>
        `;

        polaroidContainer.appendChild(card);
    });

    // 2. Vouchers
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
   🎂 TRANG 3: BÁNH KEM 3D BẰNG THREE.JS (INTERACTIVE WEBGL)
   ========================================================================== */
function initThreeJSCake() {
    const container = document.getElementById("cake-3d-container");
    if (!container || threeRenderer) return; // Tránh khởi tạo 2 lần

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 340;

    // 1. Scene
    threeScene = new THREE.Scene();

    // 2. Camera
    threeCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    threeCamera.position.set(0, 4.5, 9);
    threeCamera.lookAt(0, 0.5, 0);

    // 3. Renderer with soft shadow & transparency
    threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    threeRenderer.setSize(width, height);
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeRenderer.shadowMap.enabled = true;
    threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(threeRenderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7f2, 0.9);
    threeScene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    threeScene.add(dirLight);

    // Light from candle
    flameLight = new THREE.PointLight(0xffaa33, 1.8, 8);
    flameLight.position.set(0, 2.5, 0);
    threeScene.add(flameLight);

    // 5. Cake Group
    cakeGroup = new THREE.Group();
    threeScene.add(cakeGroup);

    build3DCakeGeometry();

    // 6. Interaction: Drag to rotate cake 360°
    setupCakeTouchRotation(container);

    // 7. Render Loop
    animateThree();
}

function build3DCakeGeometry() {
    // Materials
    const goldPlateMat = new THREE.MeshStandardMaterial({
        color: 0xdfb387,
        roughness: 0.3,
        metalness: 0.7
    });

    const tierCreamMat = new THREE.MeshStandardMaterial({
        color: 0xfdf7f2,
        roughness: 0.5,
        metalness: 0.05
    });

    const tierPinkMat = new THREE.MeshStandardMaterial({
        color: 0xf5d3db,
        roughness: 0.45,
        metalness: 0.05
    });

    const strawberryMat = new THREE.MeshStandardMaterial({
        color: 0xd93853,
        roughness: 0.3,
        metalness: 0.1
    });

    const candleMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.4
    });

    // --- Plate ---
    const plateGeo = new THREE.CylinderGeometry(3.2, 2.9, 0.15, 48);
    const plate = new THREE.Mesh(plateGeo, goldPlateMat);
    plate.position.y = -1.0;
    plate.receiveShadow = true;
    cakeGroup.add(plate);

    // --- Tier 1 (Bottom) ---
    const tier1Geo = new THREE.CylinderGeometry(2.6, 2.6, 1.1, 48);
    const tier1 = new THREE.Mesh(tier1Geo, tierPinkMat);
    tier1.position.y = -0.4;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeGroup.add(tier1);

    // --- Tier 2 (Middle) ---
    const tier2Geo = new THREE.CylinderGeometry(1.9, 1.9, 0.95, 48);
    const tier2 = new THREE.Mesh(tier2Geo, tierCreamMat);
    tier2.position.y = 0.5;
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    cakeGroup.add(tier2);

    // --- Tier 3 (Top) ---
    const tier3Geo = new THREE.CylinderGeometry(1.2, 1.2, 0.75, 48);
    const tier3 = new THREE.Mesh(tier3Geo, tierPinkMat);
    tier3.position.y = 1.25;
    tier3.castShadow = true;
    tier3.receiveShadow = true;
    cakeGroup.add(tier3);

    // --- Strawberries on Tier 2 ---
    const strawGeo = new THREE.ConeGeometry(0.18, 0.35, 16);
    const countStraw = 8;
    for (let i = 0; i < countStraw; i++) {
        const angle = (i / countStraw) * Math.PI * 2;
        const straw = new THREE.Mesh(strawGeo, strawberryMat);
        straw.position.set(Math.cos(angle) * 1.55, 1.05, Math.sin(angle) * 1.55);
        straw.rotation.x = Math.PI;
        cakeGroup.add(straw);
    }

    // --- Candle Stick ---
    const candleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 16);
    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.set(0, 1.9, 0);
    candle.castShadow = true;
    cakeGroup.add(candle);

    // --- Candle Flame 3D ---
    const flameGeo = new THREE.SphereGeometry(0.12, 16, 16);
    flameGeo.scale(1, 2.2, 1);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa22 });
    flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, 2.45, 0);
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
        cakeGroup.rotation.y += deltaX * 0.008;
        previousX = clientX;
    };

    const onEnd = () => {
        isDragging = false;
    };

    // Touch
    container.addEventListener("touchstart", (e) => onStart(e.touches[0].clientX), { passive: true });
    window.addEventListener("touchmove", (e) => { if (e.touches && e.touches[0]) onMove(e.touches[0].clientX); }, { passive: true });
    window.addEventListener("touchend", onEnd);

    // Mouse
    container.addEventListener("mousedown", (e) => onStart(e.clientX));
    window.addEventListener("mousemove", (e) => onMove(e.clientX));
    window.addEventListener("mouseup", onEnd);
}

function animateThree() {
    requestAnimationFrame(animateThree);

    // Gentle auto-rotation when not interacting
    if (cakeGroup) {
        cakeGroup.rotation.y += 0.003;
    }

    // Flame flickering effect
    if (flameMesh && !isCandleBlown) {
        const time = Date.now() * 0.015;
        const scaleFlicker = 1 + Math.sin(time) * 0.12;
        flameMesh.scale.set(scaleFlicker, scaleFlicker * 2.2, scaleFlicker);
        if (flameLight) {
            flameLight.intensity = 1.6 + Math.sin(time * 2) * 0.4;
        }
    }

    if (threeRenderer && threeScene && threeCamera) {
        threeRenderer.render(threeScene, threeCamera);
    }
}

/* ==========================================================================
   🕯️ INTERACTION: BLOW OUT 3D CANDLE
   ========================================================================== */
function executeBlowCandle() {
    if (isCandleBlown) return;
    isCandleBlown = true;

    // 1. Tắt ngọn lửa 3D và nguồn sáng
    if (flameMesh) {
        cakeGroup.remove(flameMesh);
    }
    if (flameLight) {
        threeScene.remove(flameLight);
    }

    // 2. Ẩn nút thổi
    document.getElementById("candle-controls").style.display = "none";
    document.getElementById("cake-headline").textContent = "✨ Điều Ước Đang Thành Hiện Thực ✨";
    document.getElementById("cake-subline").textContent = "Chúc công chúa của anh một sinh nhật ngập tràn hạnh phúc!";

    // 3. Bắn pháo hoa Confetti sang xịn (Pastel & Gold)
    triggerLuxuryConfetti();

    // 4. Mở bức thư chúc mừng
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
    const colors = ["#dfb387", "#c98897", "#a6586b", "#ffffff", "#f5d3db"];
    
    // Wave 1
    confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors
    });

    // Wave 2
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.5 },
            colors: colors
        });
    }, 400);

    // Wave 3
    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.55 },
            colors: colors
        });
    }, 800);
}

/* ==========================================================================
   🔄 PAGE NAVIGATION
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

    setTimeout(() => {
        targetPageEl.style.display = "block";
        void targetPageEl.offsetWidth; // Reflow
        targetPageEl.classList.add("active");
        currentPage = targetPage;

        window.scrollTo({ top: 0, behavior: "smooth" });

        // Nếu chuyển sang trang 3: Khởi tạo bánh kem 3D
        if (targetPage === 3) {
            setTimeout(initThreeJSCake, 200);
        }
    }, 450);
}

/* ==========================================================================
   🎵 WEB AUDIO API: SOFT PIANO MELODY
   ========================================================================== */
function setupEvents() {
    // Trang 1: Chạm mở quà
    document.getElementById("btn-open-gift").addEventListener("click", () => {
        goToPage(2);
        startSoftPianoMusic();
    });

    document.getElementById("qr-tap-trigger").addEventListener("click", () => {
        goToPage(2);
        startSoftPianoMusic();
    });

    // Trang 2: Chuyển sang Trang 3 (Bánh kem 3D)
    document.getElementById("btn-go-to-cake").addEventListener("click", () => {
        goToPage(3);
    });

    // Trang 3: Thổi nến
    document.getElementById("btn-blow-candle").addEventListener("click", executeBlowCandle);

    // Chạm trực tiếp vào canvas bánh kem cũng kích hoạt thổi nến nếu chưa thổi
    const cakeContainer = document.getElementById("cake-3d-container");
    cakeContainer.addEventListener("dblclick", executeBlowCandle);

    // Music Toggle
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
    // Nốt nhạc Happy Birthday êm dịu
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
