/* ==========================================================================
   🎂 ULTRA-LUXURY AESTHETIC ENGINE (MULTI-SCENE & 3D INTERACTIVE CAKE)
   ========================================================================== */

const CONFIG = {
    girlName: "Nguyễn Ngọc Ánh",

    // Polaroid Memories (Trang 2)
    memories: [
        {
            img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop",
            caption: "“Nụ cười của em luôn là ánh sáng đẹp nhất sưởi ấm anh.”",
            secret: "Dù ngày mưa hay ngày nắng, chỉ cần nhìn thấy em cười là mọi muộn phiền đều tan biến hết! 🌸",
            rot: -2
        },
        {
            img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop",
            caption: "“Chúc em một tuổi mới luôn rực rỡ và bình yên như chính em.”",
            secret: "Mong em luôn được yêu thương, được nâng niu và luôn là phiên bản hạnh phúc nhất của chính mình! 💖",
            rot: 2
        }
    ],

    // 3 Thẻ đặc quyền VIP
    vouchers: [
        {
            icon: "🧋",
            text: "Thẻ Bao Trà Sữa Trọn Đời — Có hiệu lực bất cứ lúc nào em thèm hoặc thấy mệt mỏi, không giới hạn số ly!"
        },
        {
            icon: "👑",
            text: "Thẻ Luôn Được Cưng Chiều — Em luôn luôn đúng trong mọi cuộc tranh luận, miễn trừ mọi hình phạt hờn dỗi!"
        },
        {
            icon: "💎",
            text: "Thẻ Một Điều Ước Thần Kỳ — Một điều ước bất kỳ sẽ được thực hiện ngay lập tức vô điều kiện!"
        }
    ],

    // Bức thư sinh nhật sau khi thổi nến 3D
    finalLetter: `Gửi người con gái anh yêu thương nhất,

Chúc mừng sinh nhật tuổi mới của em! Cảm ơn định mệnh đã mang em đến bên anh, mang theo nụ cười trong veo và trái tim dịu dàng sưởi ấm những ngày tháng qua.

Bước sang tuổi mới, anh chỉ mong em luôn an yên, luôn tự tin tỏa sáng trên con đường em chọn, và nụ cười rạng rỡ ấy sẽ không bao giờ tắt trên môi. Nhớ rằng, dù thế giới ngoài kia có bộn bề ra sao, em vẫn luôn là công chúa nhỏ được anh yêu thương và nâng niu nhất!

Happy Birthday Nàng Thơ Của Anh! 🎂✨💖`
};

/* Application State */
let currentPage = 1;
let isMusicPlaying = false;
let musicNoteTimeout = null;
let threeScene, threeCamera, threeRenderer, cakeGroup, flameMesh, flameLight;
let isCandleBlown = false;
let micAudioStream = null;
let micAudioContext = null;

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // 1. Tên bạn nữ
    document.getElementById("display-girl-name").textContent = CONFIG.girlName;

    // 2. Khởi tạo 3 Background độc bản
    setupPage1Background();
    setupPage2Background();
    setupPage3Background();

    // 3. Render mã QR nghệ thuật
    renderAestheticQR();

    // 4. Render nội dung trang 2 (Polaroids & Vouchers)
    renderPage2Content();

    // 5. Gán sự kiện nút bấm & 3D Tilt thiệp mời
    setupEvents();
    setupInvitationTilt();
}

/* ==========================================================================
   🌌 3 HỆ THỐNG BACKGROUND CHÂN THẬT
   ========================================================================== */
function setupPage1Background() {
    const container = document.getElementById("particles-p1");
    const symbols = ["✦", "✧", "⋆", "•", "✨"];
    const count = 18;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("span");
        star.className = "p1-dust";
        star.textContent = symbols[i % symbols.length];

        const left = Math.random() * 100;
        const dur = 5 + Math.random() * 7;
        const delay = Math.random() * 6;
        const size = 10 + Math.random() * 12;

        star.style.left = `${left}%`;
        star.style.setProperty("--dur", `${dur}s`);
        star.style.animationDelay = `${delay}s`;
        star.style.fontSize = `${size}px`;

        container.appendChild(star);
    }
}

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
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement("span");
        petal.className = "p2-petal";
        petal.textContent = icons[i % icons.length];

        const left = Math.random() * 100;
        const dur = 6 + Math.random() * 6;
        const delay = Math.random() * 8;
        const size = 14 + Math.random() * 14;

        petal.style.left = `${left}%`;
        petal.style.setProperty("--p-dur", `${dur}s`);
        petal.style.animationDelay = `${delay}s`;
        petal.style.fontSize = `${size}px`;

        petalsWrap.appendChild(petal);
    }
}

function setupPage3Background() {
    const starfield = document.getElementById("stars-p3");
    const starCount = 42;

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
   💌 TRANG 1: RENDER MÃ QR & TIẾN TRÌNH QUÉT
   ========================================================================== */
function renderAestheticQR() {
    const qrUrl = window.location.origin + window.location.pathname + "?vip=true";

    const heartSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <path d="M50 88 C25 65 5 50 5 30 C5 15 17 5 30 5 C38 5 45 9 50 16 C55 9 62 5 70 5 C83 5 95 15 95 30 C95 50 75 65 50 88Z" 
                  fill="#c98897" stroke="#ffffff" stroke-width="5"/>
        </svg>
    `;
    const heartData = "data:image/svg+xml;base64," + btoa(heartSvg.trim());

    const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
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

function runScanProcess() {
    const scanBox = document.getElementById("scan-progress-box");
    const fill = document.getElementById("scan-progress-fill");
    const text = document.getElementById("scan-progress-text");

    scanBox.style.display = "flex";
    let progress = 0;
    const duration = 750;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
        progress += step;
        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);
            fill.style.width = "100%";
            text.textContent = "✨ Cánh cổng kỳ diệu đã mở!";

            setTimeout(() => {
                goToPage(2);
                startSoftPianoMusic();
            }, 350);
        } else {
            fill.style.width = `${progress}%`;
            text.textContent = `Đang mở cánh cổng... ${Math.round(progress)}%`;
        }
    }, intervalTime);
}

function setupInvitationTilt() {
    const card = document.getElementById("invitation-card");
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
   📸 TRANG 2: POLAROIDS 3D & GOLDEN VOUCHERS
   ========================================================================== */
function renderPage2Content() {
    // 1. Polaroid Gallery
    const polaroidContainer = document.getElementById("polaroid-gallery");
    polaroidContainer.innerHTML = "";

    CONFIG.memories.forEach((item, index) => {
        const wrap = document.createElement("div");
        wrap.className = "polaroid-card-wrap";
        wrap.setAttribute("data-index", index);

        wrap.innerHTML = `
            <div class="polaroid-card-inner">
                <!-- Mặt trước -->
                <div class="polaroid-face polaroid-face-front" style="--rot: ${item.rot || 0}deg">
                    <div class="washi-tape-decor"></div>
                    <img class="polaroid-photo" src="${item.img}" alt="Kỷ niệm" loading="lazy">
                    <p class="polaroid-quote">${item.caption}</p>
                </div>
                <!-- Mặt sau -->
                <div class="polaroid-face polaroid-face-back">
                    <span class="back-stamp">💌</span>
                    <p class="back-secret-note">${item.secret}</p>
                </div>
            </div>
        `;

        wrap.addEventListener("click", () => {
            wrap.classList.toggle("flipped");
            playChimeSound(659.25, 0.2);
        });

        polaroidContainer.appendChild(wrap);
    });

    // 2. 3 Golden VIP Privilege Vouchers
    const voucherContainer = document.getElementById("voucher-list");
    voucherContainer.innerHTML = "";

    CONFIG.vouchers.forEach((v, idx) => {
        const ticket = document.createElement("div");
        ticket.className = "golden-ticket-item";

        ticket.innerHTML = `
            <span class="gt-icon">${v.icon}</span>
            <span class="gt-content">${v.text}</span>
        `;

        ticket.addEventListener("click", () => {
            ticket.classList.toggle("claimed");
            playChimeSound(880.00, 0.25);
            triggerMiniConfetti();
        });

        voucherContainer.appendChild(ticket);
    });
}

/* ==========================================================================
   🎂 TRANG 3: BÁNH KEM 3D THREE.JS (INTERACTIVE WEBGL)
   ========================================================================== */
function initThreeJSCake() {
    const container = document.getElementById("cake-3d-container");
    if (!container || threeRenderer) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 360;

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

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.25);
    threeScene.add(ambientLight);

    // Directional Key Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    threeScene.add(dirLight);

    // Warm Candle Glow Light
    flameLight = new THREE.PointLight(0xffb74d, 2.6, 9.5);
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
        metalness: 0.85
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

    // Sugar Pearls around Tier 1
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
   🎤 THỔI NẾN BẰNG MICROPHONE HOẶC CHẠM
   ========================================================================== */
function activateMicrophoneBlow() {
    const hintText = document.getElementById("blow-hint-text");
    const meterWrap = document.getElementById("blow-meter");
    const meterFill = document.getElementById("blow-meter-fill");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            micAudioStream = stream;
            meterWrap.style.display = "block";
            hintText.textContent = "Đang lắng nghe... Thổi thật mạnh vào micro nhé!";

            micAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = micAudioContext.createMediaStreamSource(stream);
            const analyser = micAudioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            function listenToBlow() {
                if (isCandleBlown) return;

                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                const avgVolume = sum / dataArray.length;
                meterFill.style.width = `${Math.min(100, avgVolume * 2.2)}%`;

                if (avgVolume > 48) {
                    stopMicrophoneStream();
                    executeBlowCandle();
                    return;
                }

                requestAnimationFrame(listenToBlow);
            }

            listenToBlow();
        }).catch((err) => {
            console.log("Mic blocked:", err);
            executeBlowCandle();
        });
    } else {
        executeBlowCandle();
    }
}

function stopMicrophoneStream() {
    if (micAudioStream) {
        micAudioStream.getTracks().forEach((track) => track.stop());
        micAudioStream = null;
    }
    if (micAudioContext) {
        micAudioContext.close();
        micAudioContext = null;
    }
}

function executeBlowCandle() {
    if (isCandleBlown) return;
    isCandleBlown = true;
    stopMicrophoneStream();

    // 1. Tắt ngọn lửa 3D
    if (flameMesh) cakeGroup.remove(flameMesh);
    if (flameLight) threeScene.remove(flameLight);

    // 2. Ẩn nút thổi
    document.getElementById("candle-controls").style.display = "none";
    document.getElementById("cake-headline").textContent = "✨ Nguyện Ước Đã Được Gửi Tới Các Vì Sao ✨";
    document.getElementById("cake-subline").textContent = "Chúc công chúa của anh một tuổi mới ngập tràn hạnh phúc và bình yên!";

    // 3. Bắn pháo hoa Confetti hoàng gia 4 đợt liên tiếp
    triggerGrandFireworks();

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

function triggerGrandFireworks() {
    const colors = ["#ffdf85", "#dfb387", "#c98897", "#ffffff", "#f5cad3", "#ba68c8"];
    let wave = 0;

    const fireInterval = setInterval(() => {
        confetti({
            particleCount: 85,
            spread: 90,
            origin: { y: 0.55 + (wave % 2 === 0 ? 0.05 : -0.05) },
            colors: colors
        });
        wave++;
        if (wave >= 4) {
            clearInterval(fireInterval);
        }
    }, 380);
}

function triggerMiniConfetti() {
    confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#d4a359", "#c98897", "#ffffff"]
    });
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
    // Trang 1: Chạm mở quà & Quét QR
    document.getElementById("btn-open-gift").addEventListener("click", runScanProcess);
    document.getElementById("qr-tap-trigger").addEventListener("click", runScanProcess);

    // Trang 2: Chuyển sang Trang 3 (Bánh kem 3D)
    document.getElementById("btn-go-to-cake").addEventListener("click", () => {
        goToPage(3);
    });

    // Trang 3: Thổi nến mic & chạm
    document.getElementById("btn-blow-candle").addEventListener("click", activateMicrophoneBlow);
    const cakeContainer = document.getElementById("cake-3d-container");
    cakeContainer.addEventListener("dblclick", executeBlowCandle);

    // Bật tắt nhạc
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
    document.getElementById("music-status").textContent = "Đang phát";
    playSoftHappyBirthdayLoop();
}

function stopSoftPianoMusic() {
    isMusicPlaying = false;
    document.getElementById("music-btn").classList.remove("playing");
    document.getElementById("music-status").textContent = "Giai điệu";

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

function playChimeSound(freq, duration) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.05);

        osc.onended = () => ctx.close();
    } catch (e) {
        // Ignored
    }
}
