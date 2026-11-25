
document.addEventListener("DOMContentLoaded", () => {
    const presentation = document.querySelector("#presentation");
    const slides = Array.from(document.querySelectorAll(".slide"));

    let currentSlide = 0;
    let touchStartX = 0;

    // ==========================================
    // AJ-OVC-2026 — BACKGROUND IMAGE MAPPING
    // ==========================================

    const backgrounds = {
        "01": "bg-01-title.png",
        "02": "bg-02-group-members.jpeg",
        "03": "bg-03-ovarian-cancer.png",
        "04": "bg-04-cancer-types.png",
        "05": "bg-05-risk-factors.png",
        "06": "bg-06-disease-development.png",
        "07": "bg-07-symptoms.jpeg",
        "08": "bg-08-symptom-progression.jpeg",
        "09": "bg-09-stages-overview.png",
        "10": "bg-10-stage-one.jpeg",
        "11": "bg-11-stage-two.jpeg",
        "12": "bg-12-stage-three.jpeg",
        "13": "bg-13-stage-four.jpeg",
        "14": "bg-14-disease-progression.png",
        "15": "bg-15-complications-one.jpeg",
        "16": "bg-16-complications-two.jpeg",
        "17": "bg-17-diagnosis.jpeg",
        "18": "bg-18-examination-imaging.jpeg",
        "19": "bg-19-markers-tissue.jpeg",
        "20": "bg-20-brca-genetics.png",
        "21": "bg-21-genetic-syndromes.jpeg",
        "22": "bg-22-mutations.jpeg",
        "23": "bg-23-treatment.jpeg",
        "24": "bg-24-targeted-therapy.png",
        "25": "bg-25-conclusion.jpeg",
        "26": "bg-26-references.jpeg"
    };

    // Apply the corresponding image to each slide.
    slides.forEach((slide) => {
        const slideNumber = slide.dataset.slide;
        const background = slide.querySelector(".slide-background");
        const filename = backgrounds[slideNumber];

        if (background && filename) {
            background.style.backgroundImage =
                `url("images/backgrounds/${filename}")`;

            background.style.backgroundSize = "cover";
            background.style.backgroundPosition = "center";
            background.style.backgroundRepeat = "no-repeat";
        }
    });
    
    // ==========================================
    // SUPPORTING MEDICAL IMAGE MAPPING
    // AJ-OVC-2026
    // ==========================================

    const supportingImages = {
        // SLIDE 03 — OVARIAN ANATOMY
        "healthy-ovary-versus-cancerous-ovary":
            "ovary_cancer_anatomy.png",

        // SLIDE 18 — TRANSVAGINAL ULTRASOUND
        "transvaginal-ultrasound-ovarian-mass":
            "transvaginal_ultrasound_left_ovarian_cyst.png"
    };

    document.querySelectorAll("[data-visual]").forEach((visual) => {
        if (visual.classList.contains("slide-background")) return;

        const filename = supportingImages[visual.dataset.visual];

        if (!filename) return;

        visual.style.backgroundImage = `url("images/${filename}")`;
        visual.style.backgroundSize = "contain";
        visual.style.backgroundPosition = "center";
        visual.style.backgroundRepeat = "no-repeat";
    });

    // ==========================================
    // SLIDE NAVIGATION
    // ==========================================

    function showSlide(index) {
        if (index < 0 || index >= slides.length) return;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
            slide.setAttribute(
                "aria-hidden",
                i === index ? "false" : "true"
            );
        });

        currentSlide = index;
        updateCounter();
    }

    function updateCounter() {
        const counter = slides[currentSlide]
            .querySelector(".slide-counter");

        if (counter) {
            const current = String(currentSlide + 1).padStart(2, "0");
            const total = String(slides.length).padStart(2, "0");

            counter.textContent = `${current} / ${total}`;
        }
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    function previousSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    // ==========================================
    // KEYBOARD CONTROLS
    // ==========================================

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
            case "PageDown":
            case " ":
                event.preventDefault();
                nextSlide();
                break;

            case "ArrowLeft":
            case "ArrowUp":
            case "PageUp":
                event.preventDefault();
                previousSlide();
                break;

            case "Home":
                showSlide(0);
                break;

            case "End":
                showSlide(slides.length - 1);
                break;
        }
    });

    // ==========================================
    // TOUCHSCREEN SWIPE NAVIGATION
    // ==========================================

    presentation.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    presentation.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }, { passive: true });

    // ==========================================
    // INITIALISE PRESENTATION
    // ==========================================

    showSlide(0);
});
