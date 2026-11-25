document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar scroll effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        // Close mobile menu when clicking any nav link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    // 3. Platform Switcher: Web Page vs. Admin App (Dynamic Explanations & Mobile Screenshots)
    const switchButtons = document.querySelectorAll(".platform-switch-btn");
    const paneWeb = document.getElementById("pane-web");
    const paneAdmin = document.getElementById("pane-admin");

    function setActivePlatform(platform) {
        // Toggle active button states
        switchButtons.forEach(btn => {
            if (btn.getAttribute("data-platform") === platform) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Toggle explanation & mobile screenshot showcase panes
        if (platform === "admin") {
            if (paneWeb) paneWeb.classList.remove("active");
            if (paneAdmin) paneAdmin.classList.add("active");
        } else {
            if (paneAdmin) paneAdmin.classList.remove("active");
            if (paneWeb) paneWeb.classList.add("active");
        }
    }

    switchButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const platform = btn.getAttribute("data-platform");
            setActivePlatform(platform);
        });
    });

    // 4. Copy Web App Link Utility
    const copyBtn = document.getElementById("btn-copy-url");
    const urlInput = document.getElementById("web-app-url");

    if (copyBtn && urlInput) {
        copyBtn.addEventListener("click", async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(urlInput.value);
                } else {
                    // Fallback for older browsers
                    urlInput.select();
                    document.execCommand("copy");
                }
                
                const originalText = copyBtn.textContent;
                copyBtn.textContent = "Copied! ✓";
                copyBtn.classList.add("copied");

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove("copied");
                }, 2000);
            } catch (err) {
                console.error("Failed to copy URL:", err);
            }
        });
    }

    // 5. Ensure clicking on `#web-qr` switches to the Web Page view if Admin is currently open
    const webQrLinks = document.querySelectorAll('a[href="#web-qr"]');
    webQrLinks.forEach(link => {
        link.addEventListener("click", () => {
            setActivePlatform("web");
        });
    });

    // 6. Safe Image Fallback Initializer (Guarantees zero broken image icons if assets are not yet dropped in)
    const allCustomImages = document.querySelectorAll('.custom-app-logo, .mobile-screen-img, .team-avatar-img, .hero-app-logo');
    allCustomImages.forEach(img => {
        // Check if image is already broken on load
        if (img.complete && img.naturalWidth === 0) {
            img.style.display = 'none';
            if (img.nextElementSibling) {
                img.nextElementSibling.style.display = 'flex';
            }
        }

        img.addEventListener('error', () => {
            img.style.display = 'none';
            if (img.nextElementSibling) {
                img.nextElementSibling.style.display = 'flex';
            }
        });
    });
});
