/* ==========================================================================
   🎂 KÉT SẮT NÀNG THƠ — INTERACTIVE LOGIC & SOUND ENGINE
   ========================================================================== */

/* ==========================================================================
   1. CONFIGURATION OBJECT
   ========================================================================== */
const CONFIG = {
    girlName: "Nguyễn Ngọc Ánh", // Tên bạn nữ
    secretCode: ["2", "4", "1", "0"], // Mật mã 4 số mở két sắt

    // 9 hình ảnh chất lượng cao cho Chiếc Gương Thần (Captcha)
    captchaPhotos: [
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=500&h=500&fit=crop&crop=face"
    ],

    // 3 Tấm ảnh Polaroid 3D & Lời nhắn bí mật ở mặt sau
    polaroids: [
        {
            img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=600&fit=crop",
            label: "Nụ cười rạng ngời nhất 💕",
            secret: "Nụ cười của em chính là điều dịu dàng nhất sưởi ấm cả thế giới này ✨"
        },
        {
            img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=600&fit=crop",
            label: "Khoảnh khắc tỏa sáng 🌟",
            secret: "Dù ở bất kỳ đâu, em vẫn luôn là vì tinh tú lấp lánh và nổi bật nhất 🌸"
        },
        {
            img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=600&fit=crop",
            label: "Bản độc quyền vô giá 👑",
            secret: "Trên thế gian 8 tỷ người, chỉ có một em duy nhất — và em là điều vô giá nhất! 💖"
        }
    ],

    // 3 Thẻ đặc quyền Gacha VIP
    vouchers: [
        "🏆 THẺ LUÔN ĐÚNG — Em luôn luôn đúng trong mọi cuộc trò chuyện, vĩnh viễn không hết hạn!",
        "🧋 THẺ BAO TRÀ SỮA TRỌN ĐỜI — Được bao trà sữa full topping bất cứ lúc nào thèm, không giới hạn số ly!",
        "💎 THẺ KHO BÁU ƯỚC NGUYỆN — Một điều ước bất kỳ sẽ được thực hiện ngay lập tức vô điều kiện!"
    ],

    // Bức thư chúc mừng sinh nhật thiêng liêng ở cuối trang
    finalLetter: `Gửi người con gái tuyệt vời nhất thế gian! 🌸

Chúc mừng sinh nhật tuổi mới của em! Cảm ơn định mệnh đã mang em đến và thắp sáng cuộc sống này bằng những nụ cười trong veo, bằng sự ấm áp và trái tim dịu dàng của em.

Chúc em tuổi mới luôn rực rỡ như hoa mùa xuân, luôn bình an, hạnh phúc và chạm tay đến mọi giấc mơ mà em ấp ủ. Nhớ rằng, dù thế giới ngoài kia có bộn bề ra sao, em vẫn luôn là công chúa nhỏ được yêu thương và nâng niu nhất!

Happy Birthday Nàng Thơ Của Anh! 🎂✨💖`
};

/* ==========================================================================
   2. APPLICATION STATE
   ========================================================================== */
let currentScreenIndex = 0;
let unlockedSlots = [false, false, false, false];
let selectedCaptchaIndexes = new Set();
let flippedPolaroidIndexes = new Set();
let openedGachaBoxes = new Set();
let isCandleExtinguished = false;

// Audio & Mic Context
let isMusicActive = false;
let audioMelodyTimeout = null;
let micAudioStream = null;
let micAudioContext = null;

/* ==========================================================================
   3. INITIALIZATION ON DOM READY
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // 1. Cập nhật tên bạn nữ
    document.getElementById("topbar-name").textContent = CONFIG.girlName;

    // 2. Tạo hiệu ứng không gian lơ lửng (Petals & Stars)
    generateSakuraPetals();
    generateSparklingStars();

    // 3. Render mã QR nghệ thuật Hologram
    renderArtisticQRCode();

    // 4. Render Captcha 9 ô ảnh
    renderCaptchaGrid();

    // 5. Render 3 Polaroid 3D
    renderPolaroidCards();

    // 6. Gán các sự kiện tương tác
    attachEventListeners();

    // 7. Kiểm tra tự động đăng nhập khi quét camera (VIP Login via URL query)
    checkVipLoginParameter();
}

/* ==========================================================================
   4. ATMOSPHERIC PARTICLES GENERATOR
   ========================================================================== */
function generateSakuraPetals() {
    const container = document.getElementById("petal-container");
    const icons = ["🌸", "💗", "✨", "💖", "🎀", "🌺", "💕"];
    const petalCount = 18;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("span");
        petal.className = "floating-petal";
        petal.textContent = icons[i % icons.length];

        const leftPos = Math.random() * 100;
        const animDuration = 7 + Math.random() * 8;
        const animDelay = Math.random() * 10;
        const drift = (Math.random() - 0.5) * 100;
        const rotation = (Math.random() - 0.5) * 720;
        const size = 14 + Math.random() * 16;

        petal.style.left = `${leftPos}%`;
        petal.style.fontSize = `${size}px`;
        petal.style.animationDuration = `${animDuration}s`;
        petal.style.animationDelay = `${animDelay}s`;
        petal.style.setProperty("--drift", `${drift}px`);
        petal.style.setProperty("--rot", `${rotation}deg`);

        container.appendChild(petal);
    }
}

function generateSparklingStars() {
    const layer = document.getElementById("sparkle-layer");
    const starCount = 20;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("span");
        star.className = "twinkle-star";
        star.textContent = "✦";

        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 3;
        const size = 10 + Math.random() * 12;

        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.fontSize = `${size}px`;
        star.style.setProperty("--p-dur", `${duration}s`);
        star.style.animationDelay = `${delay}s`;

        layer.appendChild(star);
    }
}

/* ==========================================================================
   5. MÀN HÌNH 0: QR CODE NGHỆ THUẬT & ĐĂNG NHẬP VIP
   ========================================================================== */
function renderArtisticQRCode() {
    // Địa chỉ trang hiện tại cộng thêm param VIP
    const qrTargetUrl = window.location.origin + window.location.pathname + "?vip_login=true";

    // Trái tim SVG màu hồng lấp lánh đặt ở tâm QR
    const heartSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <path d="M50 88 C25 65 5 50 5 30 C5 15 17 5 30 5 C38 5 45 9 50 16 C55 9 62 5 70 5 C83 5 95 15 95 30 C95 50 75 65 50 88Z" 
                  fill="#d81b60" stroke="#ffd54f" stroke-width="4"/>
        </svg>
    `;
    const heartDataUrl = "data:image/svg+xml;base64," + btoa(heartSvg.trim());

    // Khởi tạo QRCodeStyling với gradient hồng ruby sang trọng
    const qrStyling = new QRCodeStyling({
        width: 210,
        height: 210,
        type: "canvas",
        data: qrTargetUrl,
        image: heartDataUrl,
        dotsOptions: {
            color: "#d81b60",
            type: "extra-rounded",
            gradient: {
                type: "linear",
                rotation: 45,
                colorStops: [
                    { offset: 0, color: "#d81b60" },
                    { offset: 0.5, color: "#ec407a" },
                    { offset: 1, color: "#8e24aa" }
                ]
            }
        },
        cornersSquareOptions: {
            color: "#ad1457",
            type: "extra-rounded"
        },
        cornersDotOptions: {
            color: "#ad1457",
            type: "dot"
        },
        backgroundOptions: {
            color: "#fff9fb"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 6,
            imageSize: 0.35
        }
    });

    const container = document.getElementById("qr-code-render");
    qrStyling.append(container);
}

// Kiểm tra nếu người dùng quét từ Camera điện thoại có kèm ?vip_login=true
function checkVipLoginParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("vip_login") === "true") {
        setTimeout(() => {
            triggerSparkleConfetti();
            startMusicSynthesizer();
            navigateToScreen(1);
        }, 800);
    }
}

// Hiệu ứng thanh tiến trình quét từ 0% đến 100% trong 0.8 giây
function executeScanProcess() {
    const progressWrap = document.getElementById("unlock-progress-wrap");
    const progressFill = document.getElementById("unlock-progress-fill");
    const progressText = document.getElementById("unlock-progress-text");

    progressWrap.style.display = "flex";
    let progress = 0;
    const duration = 800;
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const scanInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(scanInterval);

            progressFill.style.width = "100%";
            progressText.textContent = "✨ Xác thực công chúa thành công!";

            setTimeout(() => {
                triggerSparkleConfetti();
                startMusicSynthesizer();
                navigateToScreen(1);
            }, 400);
        } else {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Đang mở cổng kỳ diệu... ${Math.round(progress)}%`;
        }
    }, intervalTime);
}

/* ==========================================================================
   6. MÀN HÌNH 1: CHIẾC GƯƠNG THẦN (CAPTCHA 9 ẢNH)
   ========================================================================== */
function renderCaptchaGrid() {
    const grid = document.getElementById("captcha-grid");

    CONFIG.captchaPhotos.forEach((photoUrl, index) => {
        const cell = document.createElement("div");
        cell.className = "mirror-cell";
        cell.setAttribute("data-index", index);

        const img = document.createElement("img");
        img.src = photoUrl;
        img.alt = `Nhan sắc nàng thơ ${index + 1}`;
        img.loading = "lazy";

        cell.appendChild(img);

        cell.addEventListener("click", () => {
            if (cell.classList.contains("selected")) {
                cell.classList.remove("selected");
                selectedCaptchaIndexes.delete(index);
            } else {
                cell.classList.add("selected");
                selectedCaptchaIndexes.add(index);
                playChimeSound(659.25, 0.15); // Âm thanh nốt nhạc khi chọn
            }
            updateCaptchaFeedback();
        });

        grid.appendChild(cell);
    });
}

function updateCaptchaFeedback() {
    const feedback = document.getElementById("captcha-feedback");
    const count = selectedCaptchaIndexes.size;

    if (count === 0) {
        feedback.className = "mirror-feedback";
        feedback.textContent = "Chạm vào ảnh để chọn những khoảnh khắc rạng rỡ nhất ✨";
    } else if (count < 3) {
        feedback.className = "mirror-feedback";
        feedback.textContent = `Đã chọn ${count}/3 tấm — Chọn thêm chút nữa nhé! 💖`;
    } else {
        feedback.className = "mirror-feedback success";
        feedback.textContent = `Đã chọn ${count} tấm xinh đẹp! Bấm nút bên dưới để xác nhận nào! 👑`;
    }
}

function confirmCaptchaSelection() {
    const feedback = document.getElementById("captcha-feedback");

    if (selectedCaptchaIndexes.size < 3) {
        feedback.className = "mirror-feedback error";
        feedback.textContent = "Hãy chạm chọn ít nhất 3 bức ảnh xinh nhất nhé! 💗";
        return;
    }

    // Luôn luôn vượt qua 100% vì góc nào cũng xinh
    feedback.className = "mirror-feedback success";
    feedback.textContent = "Chính xác 100%! Không có bức nào sai vì góc nào nàng cũng rạng ngời! 🥰";

    unlockSecretSlot(0);

    setTimeout(() => {
        navigateToScreen(2);
    }, 1300);
}

/* ==========================================================================
   7. MÀN HÌNH 2: BẢO TÀNG KÝ ỨC (POLAROID 3D & WRAPPED)
   ========================================================================== */
function renderPolaroidCards() {
    const container = document.getElementById("polaroid-container");
    const randomAngles = [-2, 2, -1.5];

    CONFIG.polaroids.forEach((item, index) => {
        const frame = document.createElement("div");
        frame.className = "polaroid-frame";
        frame.setAttribute("data-index", index);

        const inner = document.createElement("div");
        inner.className = "polaroid-inner";

        // Mặt trước
        const front = document.createElement("div");
        front.className = "polaroid-front";
        front.style.setProperty("--angle", `${randomAngles[index % 3]}deg`);

        const tape = document.createElement("div");
        tape.className = "polaroid-tape";

        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.label;
        img.loading = "lazy";

        const caption = document.createElement("div");
        caption.className = "polaroid-caption";
        caption.textContent = item.label;

        front.appendChild(tape);
        front.appendChild(img);
        front.appendChild(caption);

        // Mặt sau
        const back = document.createElement("div");
        back.className = "polaroid-back";

        const seal = document.createElement("div");
        seal.className = "wax-seal";
        seal.textContent = "💌";

        const text = document.createElement("div");
        text.className = "secret-handwriting";
        text.textContent = item.secret;

        back.appendChild(seal);
        back.appendChild(text);

        inner.appendChild(front);
        inner.appendChild(back);
        frame.appendChild(inner);

        // Sự kiện lật 3D khi chạm
        frame.addEventListener("click", () => {
            frame.classList.toggle("flipped");
            playChimeSound(783.99, 0.25);

            if (frame.classList.contains("flipped")) {
                flippedPolaroidIndexes.add(index);
                triggerSmallConfetti();
            } else {
                flippedPolaroidIndexes.delete(index);
            }

            checkPolaroidAlbumProgress();
        });

        container.appendChild(frame);
    });
}

function checkPolaroidAlbumProgress() {
    const counterText = document.getElementById("polaroid-counter-text");
    const nextBtn = document.getElementById("btn-next-to-gacha");
    const flippedCount = flippedPolaroidIndexes.size;

    counterText.textContent = `Đã khám phá ${flippedCount}/3 bức ảnh ký ức 💌`;

    if (flippedCount >= 3) {
        counterText.textContent = "✨ Nàng đã mở toàn bộ ký ức! Chìa khóa thứ 2 đã mở! ✨";
        unlockSecretSlot(1);

        nextBtn.classList.remove("btn-disabled");
        nextBtn.removeAttribute("disabled");
        nextBtn.innerHTML = `
            <span class="btn-icon">🎁</span>
            <span class="btn-text">Tiếp Tục Rút Quà Đặc Quyền</span>
            <span class="btn-icon">✨</span>
        `;
    }
}

/* ==========================================================================
   8. MÀN HÌNH 3: RƯƠNG GACHA PHA LÊ (3 VOUCHERS)
   ========================================================================== */
function handleOpenGacha(index) {
    if (openedGachaBoxes.has(index)) {
        return;
    }

    openedGachaBoxes.add(index);
    playChimeSound(1046.5, 0.35); // Âm thanh chuông vàng

    // Làm mờ hộp quà đã mở
    const boxElements = document.querySelectorAll(".gacha-item");
    boxElements[index].classList.add("opened");

    // Thêm thẻ voucher vào danh sách bên dưới
    const voucherList = document.getElementById("voucher-cards-list");
    const voucherIcons = ["🏆", "🧋", "💎"];

    const card = document.createElement("div");
    card.className = "vip-voucher-ticket";

    const iconSpan = document.createElement("span");
    iconSpan.className = "ticket-icon";
    iconSpan.textContent = voucherIcons[index];

    const textSpan = document.createElement("span");
    textSpan.className = "ticket-text";
    textSpan.textContent = CONFIG.vouchers[index];

    card.appendChild(iconSpan);
    card.appendChild(textSpan);
    voucherList.appendChild(card);

    triggerSmallConfetti();

    // Mở đủ 3 hộp -> mở ô mật mã thứ 3
    if (openedGachaBoxes.size >= 3) {
        unlockSecretSlot(2);

        const nextBtn = document.getElementById("btn-next-to-cake");
        nextBtn.classList.remove("btn-disabled");
        nextBtn.removeAttribute("disabled");
        nextBtn.innerHTML = `
            <span class="btn-icon">🎂</span>
            <span class="btn-text">Đến Nghi Thức Thổi Nến Cuối Cùng</span>
            <span class="btn-icon">🎉</span>
        `;
    }
}

/* ==========================================================================
   9. MÀN HÌNH 4: THỔI NẾN MICROPHONE & MỞ TOANG KÉT SẮT
   ========================================================================== */
function activateMicrophoneForCandle() {
    const btnLabel = document.getElementById("mic-btn-label");
    const meter = document.getElementById("mic-meter");
    const meterFill = document.getElementById("meter-fill");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            micAudioStream = stream;
            meter.style.display = "block";
            btnLabel.textContent = "Đang lắng nghe... Hãy thổi thật mạnh vào mic!";

            micAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = micAudioContext.createMediaStreamSource(stream);
            const analyser = micAudioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            function analyzeSound() {
                if (isCandleExtinguished) return;

                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                const averageVolume = sum / dataArray.length;

                // Cập nhật thanh hiển thị volume âm thanh
                meterFill.style.width = `${Math.min(100, averageVolume * 2)}%`;

                // Ngưỡng phát hiện tiếng thổi nến (> 48)
                if (averageVolume > 48) {
                    extinguishCandleCeremony();
                    return;
                }

                requestAnimationFrame(analyzeSound);
            }

            analyzeSound();
        }).catch((err) => {
            console.warn("Microphone không thể truy cập:", err);
            btnLabel.textContent = "Micro bị chặn — Chạm vào nến để thổi nhé!";
            // Tự động fallback sau 3 giây nếu chặn
            setTimeout(() => {
                if (!isCandleExtinguished) {
                    extinguishCandleCeremony();
                }
            }, 3000);
        });
    } else {
        btnLabel.textContent = "Hãy chạm thẳng vào ngọn nến nhé!";
    }
}

function stopMicrophoneTracking() {
    if (micAudioStream) {
        micAudioStream.getTracks().forEach((track) => track.stop());
        micAudioStream = null;
    }
    if (micAudioContext) {
        micAudioContext.close();
        micAudioContext = null;
    }
}

function extinguishCandleCeremony() {
    if (isCandleExtinguished) return;
    isCandleExtinguished = true;
    stopMicrophoneTracking();

    // 1. Tắt ngọn lửa
    document.getElementById("flame-element").classList.add("extinguished");
    document.getElementById("flame-glow").classList.add("extinguished");

    // 2. Tạo hiệu ứng khói trắng bay lên
    emitSmokeParticles();

    // 3. Mở ô mật mã thứ 4
    unlockSecretSlot(3);

    // 4. Bắn pháo confetti 4 đợt liên tiếp ăn mừng
    triggerGrandFinaleConfetti();

    // 5. Ẩn nút thổi, hiện hộp két sắt kho báu
    document.getElementById("blow-action-area").style.display = "none";
    document.getElementById("candle-instructions").textContent = "✨ Ước nguyện đã được gửi tới các vì sao! ✨";

    setTimeout(() => {
        revealFinalTreasure();
    }, 1400);
}

function emitSmokeParticles() {
    const candleTarget = document.getElementById("candle-interact");

    for (let i = 0; i < 8; i++) {
        const smoke = document.createElement("div");
        smoke.className = "smoke-particle";
        smoke.style.left = `${45 + (Math.random() - 0.5) * 20}%`;
        smoke.style.top = "-15px";
        smoke.style.animationDelay = `${i * 0.1}s`;

        candleTarget.appendChild(smoke);

        setTimeout(() => {
            if (smoke.parentNode) {
                smoke.parentNode.removeChild(smoke);
            }
        }, 1600);
    }
}

function revealFinalTreasure() {
    const finalBox = document.getElementById("final-box-reveal");
    const codeRow = document.getElementById("final-code-display");
    const letterContent = document.getElementById("final-letter-content");

    codeRow.innerHTML = "";
    CONFIG.secretCode.forEach((digit) => {
        const cube = document.createElement("div");
        cube.className = "code-cube";
        cube.textContent = digit;
        codeRow.appendChild(cube);
    });

    letterContent.textContent = CONFIG.finalLetter;
    finalBox.style.display = "flex";

    // Cuộn mượt mà xuống xem thư
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

function restartJourney() {
    navigateToScreen(0);
}

/* ==========================================================================
   10. CHUYỂN MÀN HÌNH & MỞ Ô MẬT MÃ (SLOT UNLOCK)
   ========================================================================== */
function navigateToScreen(targetIndex) {
    const allScreens = document.querySelectorAll(".screen");

    allScreens.forEach((scr) => {
        if (scr.classList.contains("active")) {
            scr.classList.remove("active");
            scr.classList.add("fade-out");

            setTimeout(() => {
                scr.classList.remove("fade-out");
                scr.style.display = "none";
            }, 400);
        }
    });

    setTimeout(() => {
        const targetScreen = document.getElementById(`screen-${targetIndex}`);
        targetScreen.style.display = "block";

        void targetScreen.offsetWidth; // Trigger reflow
        targetScreen.classList.add("active");
        currentScreenIndex = targetIndex;

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
}

function unlockSecretSlot(slotIndex) {
    if (unlockedSlots[slotIndex]) return;
    unlockedSlots[slotIndex] = true;

    const slot = document.getElementById(`slot-${slotIndex}`);
    slot.classList.add("unlocked");
    slot.querySelector(".gem-inner").textContent = CONFIG.secretCode[slotIndex];

    triggerSmallConfetti();
    playChimeSound(880.00, 0.3);
}

/* ==========================================================================
   11. PHÁO GIẤY CONFETTI & HIỆU ỨNG RỰC RỠ
   ========================================================================== */
function triggerSparkleConfetti() {
    confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff2d78", "#ec407a", "#fbbf24", "#ffd54f", "#8e24aa", "#ffffff"],
        ticks: 140,
        gravity: 0.9,
        scalar: 1.15
    });
}

function triggerSmallConfetti() {
    confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.5 },
        colors: ["#d81b60", "#ec407a", "#fbbf24"],
        ticks: 70,
        gravity: 1,
        scalar: 0.9
    });
}

function triggerGrandFinaleConfetti() {
    const colors = ["#ff2d78", "#ec407a", "#ffd54f", "#f59e0b", "#8e24aa", "#ffffff"];
    let count = 0;

    const confettiInterval = setInterval(() => {
        confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.55 + (count % 2 === 0 ? 0.05 : -0.05) },
            colors: colors,
            ticks: 160,
            gravity: 0.85,
            scalar: 1.2
        });
        count++;
        if (count >= 4) {
            clearInterval(confettiInterval);
        }
    }, 350);
}

/* ==========================================================================
   12. BỘ TẠO NHẠC SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
function attachEventListeners() {
    // Screen 0: Quét QR
    document.getElementById("btn-start-scan").addEventListener("click", executeScanProcess);
    document.getElementById("qr-target-box").addEventListener("click", executeScanProcess);

    // Screen 1: Xác nhận gương
    document.getElementById("btn-confirm-mirror").addEventListener("click", confirmCaptchaSelection);

    // Screen 2: Chuyển màn 3
    document.getElementById("btn-next-to-gacha").addEventListener("click", () => {
        navigateToScreen(3);
    });

    // Screen 3: Chuyển màn 4
    document.getElementById("btn-next-to-cake").addEventListener("click", () => {
        navigateToScreen(4);
    });

    // Screen 4: Thổi nến mic & chạm nến
    document.getElementById("btn-activate-mic").addEventListener("click", activateMicrophoneForCandle);
    document.getElementById("candle-interact").addEventListener("click", () => {
        if (!isCandleExtinguished) {
            extinguishCandleCeremony();
        }
    });

    // Top Bar: Bật tắt nhạc
    document.getElementById("music-btn").addEventListener("click", toggleMusicState);
}

function toggleMusicState() {
    if (isMusicActive) {
        stopMusicSynthesizer();
    } else {
        startMusicSynthesizer();
    }
}

function startMusicSynthesizer() {
    if (isMusicActive) return;
    isMusicActive = true;

    const musicBtn = document.getElementById("music-btn");
    musicBtn.classList.add("playing");

    playMusicBoxSequence();
}

function stopMusicSynthesizer() {
    isMusicActive = false;

    const musicBtn = document.getElementById("music-btn");
    musicBtn.classList.remove("playing");

    if (audioMelodyTimeout) {
        clearTimeout(audioMelodyTimeout);
        audioMelodyTimeout = null;
    }
}

// Chuỗi giai điệu Happy Birthday nhẹ nhàng kiểu hộp nhạc thần tiên
function playMusicBoxSequence() {
    const melodyNotes = [
        { f: 523.25, d: 0.35 },
        { f: 659.25, d: 0.35 },
        { f: 783.99, d: 0.35 },
        { f: 1046.5, d: 0.50 },
        { f: 783.99, d: 0.35 },
        { f: 659.25, d: 0.35 },
        { f: 523.25, d: 0.50 },
        { f: 587.33, d: 0.35 },
        { f: 698.46, d: 0.35 },
        { f: 880.00, d: 0.35 },
        { f: 783.99, d: 0.50 },
        { f: 659.25, d: 0.35 },
        { f: 523.25, d: 0.60 }
    ];

    let noteIndex = 0;

    function nextNote() {
        if (!isMusicActive) return;

        const note = melodyNotes[noteIndex % melodyNotes.length];
        playChimeSound(note.f, note.d);

        noteIndex++;
        const pauseTime = (noteIndex % melodyNotes.length === 0) ? 800 : 60;
        audioMelodyTimeout = setTimeout(nextNote, note.d * 1000 + pauseTime);
    }

    nextNote();
}

function playChimeSound(freq, duration) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.05);

        osc.onended = () => ctx.close();
    } catch (e) {
        // Trình duyệt chưa cho phép audio interaction
    }
}
