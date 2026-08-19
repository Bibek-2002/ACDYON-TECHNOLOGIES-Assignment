document.addEventListener("DOMContentLoaded", function(){

    let score = document.querySelector(".score-number");

    if(score){

        let number = 0;

        let scoreAnimation = setInterval(function(){

            number++;

            score.textContent = number + "%";

            if(number >= 82){

                clearInterval(scoreAnimation);

            }

        }, 20);

    }


    let sections = document.querySelectorAll(
        ".how-it-work, .product-showcase, .features, .final-section"
    );


    sections.forEach(function(section){

        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    });


    function showSections(){

        sections.forEach(function(section){

            let position =
                section.getBoundingClientRect().top;

            if(position < window.innerHeight - 100){

                section.style.opacity = "1";
                section.style.transform = "translateY(0)";

            }

        });

    }


    window.addEventListener("scroll", function(){

        showSections();

    });


    showSections();


    // 1. Mobile Menu Toggle
    let toggleBtn = document.querySelector(".navbar-toggle-btn");
    let mobileMenu = document.getElementById("mobileMenu");

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleBtn.classList.toggle("active");
            mobileMenu.classList.toggle("open");
        });

        // Close menu if user clicks outside of it
        document.addEventListener("click", function(e) {
            if (!mobileMenu.contains(e.target) && e.target !== toggleBtn) {
                toggleBtn.classList.remove("active");
                mobileMenu.classList.remove("open");
            }
        });

        // Close menu when clicking on any mobile menu link
        let mobileMenuLinks = mobileMenu.querySelectorAll("a");
        mobileMenuLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                toggleBtn.classList.remove("active");
                mobileMenu.classList.remove("open");
            });
        });
    }

    // 2. Easter Egg: Hover Secret on the Score Ring
    let scoreRing = document.querySelector(".score-ring");
    let scoreCaption = document.querySelector(".score-caption");
    let isHovering = false;
    let scoreInterval = null;

    if (scoreRing && score && scoreCaption) {
        scoreRing.style.cursor = "pointer";
        scoreRing.style.transition = "border-color 0.5s ease, transform 0.3s ease, box-shadow 0.5s ease";

        scoreRing.addEventListener("mouseenter", function() {
            isHovering = true;
            scoreRing.style.transform = "scale(1.08)";
            scoreRing.style.borderColor = "#FBBF24"; // Gold color
            scoreRing.style.boxShadow = "0 0 20px rgba(251, 191, 36, 0.6)";
            scoreCaption.textContent = "Instant Hire! 🌟";
            scoreCaption.style.color = "#FBBF24";
            scoreCaption.style.fontWeight = "bold";

            // Animate score from current text to 100
            clearInterval(scoreInterval);
            let currentVal = parseInt(score.textContent) || 82;
            scoreInterval = setInterval(function() {
                if (currentVal < 100) {
                    currentVal++;
                    score.textContent = currentVal + "%";
                } else {
                    clearInterval(scoreInterval);
                    triggerEmojis(); // Spawn emoji celebration
                }
            }, 15);
        });

        scoreRing.addEventListener("mouseleave", function() {
            isHovering = false;
            scoreRing.style.transform = "scale(1)";
            scoreRing.style.borderColor = "grey";
            scoreRing.style.boxShadow = "none";
            scoreCaption.textContent = "Match Score";
            scoreCaption.style.color = "grey";
            scoreCaption.style.fontWeight = "normal";

            // Animate score back to 82
            clearInterval(scoreInterval);
            let currentVal = parseInt(score.textContent) || 100;
            scoreInterval = setInterval(function() {
                if (currentVal > 82) {
                    currentVal--;
                    score.textContent = currentVal + "%";
                } else {
                    clearInterval(scoreInterval);
                }
            }, 15);
        });
    }

    function triggerEmojis() {
        const emojis = ["🎉", "🚀", "🌟", "💼", "✨", "💯"];
        const container = document.querySelector(".score-panel");
        if (!container || !scoreRing) return;

        for (let i = 0; i < 15; i++) {
            const emojiEl = document.createElement("span");
            emojiEl.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emojiEl.style.position = "absolute";
            emojiEl.style.fontSize = Math.random() * 15 + 15 + "px";
            emojiEl.style.pointerEvents = "none";
            emojiEl.style.userSelect = "none";
            emojiEl.style.zIndex = "100";

            // Random start position around the score-ring
            const rect = scoreRing.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const startX = rect.left - containerRect.left + rect.width / 2 + (Math.random() - 0.5) * 80;
            const startY = rect.top - containerRect.top + rect.height / 2 + (Math.random() - 0.5) * 80;

            emojiEl.style.left = startX + "px";
            emojiEl.style.top = startY + "px";

            // Set styles for transition
            emojiEl.style.transition = "transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 1s ease";
            container.appendChild(emojiEl);

            // Trigger animation in next frame
            requestAnimationFrame(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const targetX = Math.cos(angle) * distance;
                const targetY = Math.sin(angle) * distance - 50; // drift upward slightly

                emojiEl.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
                emojiEl.style.opacity = "0";
            });

            // Clean up
            setTimeout(() => {
                emojiEl.remove();
            }, 1000);
        }
    }

    // 3. Easter Egg: Konami Code
    const konamiCode = [
        "ArrowUp", "ArrowUp",
        "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight",
        "ArrowLeft", "ArrowRight",
        "b", "a"
    ];
    let konamiIndex = 0;

    window.addEventListener("keydown", function(e) {
        const key = e.key;
        const expectedKey = konamiCode[konamiIndex];

        if (key.toLowerCase() === expectedKey.toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            // Reset index but check if the key pressed matches the first key of the sequence
            konamiIndex = (key.toLowerCase() === konamiCode[0].toLowerCase()) ? 1 : 0;
        }
    });

    function activateEasterEgg() {
        // Create a beautiful overlay modal
        const overlay = document.createElement("div");
        overlay.className = "easter-egg-overlay";
        overlay.innerHTML = `
            <div class="easter-egg-modal">
                <h2>👾 CHEAT CODE ACTIVATED 👾</h2>
                <p>Welcome to <strong>ApplyWise Elite Mode</strong>!</p>
                <div class="elite-badge">🥇 GOD MODE ENABLED</div>
                <p class="desc">All jobs analyzed will now automatically receive a 100% Match Score, and recruiters will immediately accept your resume.</p>
                <button class="close-easter-egg">Awesome! Let's Go 🚀</button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Style the overlay
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.5s ease";

        // Style the modal inside
        const modal = overlay.querySelector(".easter-egg-modal");
        modal.style.background = "linear-gradient(135deg, #1e1b4b, #311042)";
        modal.style.border = "2px solid #fbbf24";
        modal.style.borderRadius = "20px";
        modal.style.padding = "40px 30px";
        modal.style.textAlign = "center";
        modal.style.maxWidth = "450px";
        modal.style.width = "90%";
        modal.style.boxShadow = "0 0 30px rgba(251, 191, 36, 0.4)";
        modal.style.transform = "scale(0.8)";
        modal.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

        // Title styling
        const h2 = modal.querySelector("h2");
        h2.style.fontFamily = "Georgia, serif";
        h2.style.color = "#fbbf24";
        h2.style.fontSize = "26px";
        h2.style.marginBottom = "15px";
        h2.style.textShadow = "0 0 10px rgba(251, 191, 36, 0.6)";

        // Text styling
        const ps = modal.querySelectorAll("p");
        ps.forEach(p => {
            p.style.color = "#e4e4e7";
            p.style.fontSize = "15px";
            p.style.lineHeight = "1.5";
            p.style.margin = "10px 0";
        });

        // Badge styling
        const badge = modal.querySelector(".elite-badge");
        badge.style.display = "inline-block";
        badge.style.background = "#fbbf24";
        badge.style.color = "#000";
        badge.style.fontWeight = "bold";
        badge.style.padding = "8px 16px";
        badge.style.borderRadius = "50px";
        badge.style.fontSize = "14px";
        badge.style.margin = "15px 0";
        badge.style.letterSpacing = "1px";

        // Button styling
        const btn = modal.querySelector(".close-easter-egg");
        btn.style.background = "linear-gradient(180deg, #38bdf8, #818cf8)";
        btn.style.color = "#000";
        btn.style.border = "none";
        btn.style.padding = "12px 25px";
        btn.style.borderRadius = "50px";
        btn.style.cursor = "pointer";
        btn.style.fontWeight = "bold";
        btn.style.marginTop = "20px";
        btn.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
        btn.style.boxShadow = "0 4px 14px rgba(56, 189, 248, 0.4)";

        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "scale(1.05)";
            btn.style.boxShadow = "0 6px 20px rgba(56, 189, 248, 0.6)";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "scale(1)";
            btn.style.boxShadow = "0 4px 14px rgba(56, 189, 248, 0.4)";
        });

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.style.opacity = "1";
            modal.style.transform = "scale(1)";
        });

        // Close event
        const closeBtn = modal.querySelector(".close-easter-egg");
        closeBtn.addEventListener("click", () => {
            overlay.style.opacity = "0";
            modal.style.transform = "scale(0.8)";
            setTimeout(() => {
                overlay.remove();
            }, 500);
        });

        // Make all CTA buttons rainbow and spin the score ring
        const scoreRingEl = document.querySelector(".score-ring");
        if (scoreRingEl) {
            scoreRingEl.style.transition = "transform 1.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)";
            scoreRingEl.style.transform = "rotate(360deg) scale(1.1)";
            setTimeout(() => {
                scoreRingEl.style.transform = "rotate(360deg) scale(1)";
            }, 1500);
        }

        document.querySelectorAll(".btn-analyzejob").forEach(el => {
            el.style.background = "linear-gradient(90deg, #ff007f, #7f00ff, #00f0ff, #ff007f)";
            el.style.backgroundSize = "300% 300%";
            el.style.animation = "rainbowFlow 3s linear infinite";
            el.style.color = "#ffffff";
            el.style.fontWeight = "bold";
            el.style.boxShadow = "0 0 20px rgba(127, 0, 255, 0.6)";
        });

        // Inject rainbow animation keyframes if not present
        if (!document.getElementById("rainbow-keyframes")) {
            const style = document.createElement("style");
            style.id = "rainbow-keyframes";
            style.innerHTML = `
                @keyframes rainbowFlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }

        // Fire a massive burst of emojis from random coordinates
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                spawnScreenEmoji();
            }, i * 100);
        }
    }

    function spawnScreenEmoji() {
        const emojis = ["👾", "✨", "👑", "🔮", "🍕", "🎮", "🦄", "🌈", "🔥", "⚡"];
        const emoji = document.createElement("span");
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = "fixed";
        emoji.style.fontSize = Math.random() * 24 + 16 + "px";
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.top = "100vh";
        emoji.style.zIndex = "10000";
        emoji.style.pointerEvents = "none";
        emoji.style.transition = "transform 3s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 3s ease";
        document.body.appendChild(emoji);

        requestAnimationFrame(() => {
            const drift = (Math.random() - 0.5) * 200;
            emoji.style.transform = `translate(${drift}px, -110vh) rotate(${Math.random() * 360}deg)`;
            emoji.style.opacity = "0";
        });

        setTimeout(() => {
            emoji.remove();
        }, 3000);
    }
});