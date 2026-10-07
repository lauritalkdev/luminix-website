// =========================================================
// LUMINIX WEBSITE
// scripts/script.js
// =========================================================

"use strict";


// =========================================================
// 1. SMOOTH SCROLLING
// =========================================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    trackEvent("scroll_to_section", {
        event_category: "Navigation",
        event_label: sectionId
    });
}

window.scrollToSection = scrollToSection;


// =========================================================
// 2. GOOGLE ANALYTICS HELPER
// =========================================================

function trackEvent(eventName, parameters = {}) {
    if (typeof window.gtag === "function") {
        window.gtag("event", eventName, parameters);
    }
}


// =========================================================
// 3. HEADER SCROLL STATE
// =========================================================

function initializeHeader() {
    const header = document.getElementById("site-header");

    if (!header) return;

    const updateHeader = () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


// =========================================================
// 4. MOBILE NAVIGATION
// =========================================================

function initializeMobileMenu() {
    const menuButton =
        document.getElementById("mobile-menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    if (!menuButton || !mobileMenu) return;


    function openMenu() {
        mobileMenu.classList.add("open");
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    }


    function closeMenu() {
        mobileMenu.classList.remove("open");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    }


    function toggleMenu() {
        const isOpen =
            mobileMenu.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    menuButton.addEventListener(
        "click",
        toggleMenu
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 820) {
                closeMenu();
            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("open")
            ) {
                closeMenu();
                menuButton.focus();
            }

        }
    );
}


// =========================================================
// 5. INTERNAL NAVIGATION
// =========================================================

function initializeInternalLinks() {

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                trackEvent(
                    "navigation_click",
                    {
                        event_category:
                            "Navigation",

                        event_label:
                            targetId.replace(
                                "#",
                                ""
                            )
                    }
                );

            }
        );

    });
}


// =========================================================
// 6. REVEAL ANIMATIONS
// =========================================================

function initializeRevealAnimations() {

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const revealElements = [
        ...document.querySelectorAll(
            ".section-heading"
        ),

        ...document.querySelectorAll(
            ".solution-card"
        ),

        ...document.querySelectorAll(
            ".featured-product"
        ),

        ...document.querySelectorAll(
            ".project-card"
        ),

        ...document.querySelectorAll(
            ".audience-card"
        ),

        ...document.querySelectorAll(
            ".why-card"
        ),

        ...document.querySelectorAll(
            ".process-step"
        ),

        ...document.querySelectorAll(
            ".contact-copy"
        ),

        ...document.querySelectorAll(
            ".contact-form-wrapper"
        )
    ];


    if (!revealElements.length) return;


    revealElements.forEach(
        (element) => {
            element.classList.add("reveal");
        }
    );


    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            (element) => {
                element.classList.add(
                    "revealed"
                );
            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, revealObserver) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "revealed"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {
            observer.observe(element);
        }
    );
}


// =========================================================
// 7. EXTERNAL PROJECT / PRODUCT TRACKING
// =========================================================

function initializeProjectTracking() {

    const portfolioLinks =
        document.querySelectorAll(
            'a[href*="ebongeric.com/portfolio/"]'
        );


    portfolioLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                const url =
                    link.getAttribute("href");


                trackEvent(
                    "portfolio_project_click",
                    {
                        event_category:
                            "Portfolio",

                        event_label:
                            url
                    }
                );

            }
        );

    });

}


// =========================================================
// 8. CONTACT LINK TRACKING
// =========================================================

function initializeContactTracking() {

    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                trackEvent(
                    "email_click",
                    {
                        event_category:
                            "Contact",

                        event_label:
                            link.getAttribute(
                                "href"
                            )
                    }
                );

            }
        );

    });

}


// =========================================================
// 9. CONTACT FORM
// =========================================================

function initializeContactForm() {

    const form =
        document.getElementById(
            "contact-form"
        );

    if (!form) return;


    const submitButton =
        document.getElementById(
            "submit-button"
        );

    const buttonText =
        document.getElementById(
            "button-text"
        );

    const loadingSpinner =
        document.getElementById(
            "loading-spinner"
        );

    const formMessage =
        document.getElementById(
            "form-message"
        );

    const emailField =
        document.getElementById(
            "email"
        );

    const replyToField =
        document.getElementById(
            "reply-to"
        );


    function setLoading(isLoading) {

        if (!submitButton) return;


        submitButton.disabled =
            isLoading;


        if (buttonText) {

            buttonText.textContent =
                isLoading
                    ? "Sending..."
                    : "Send Project Enquiry";

        }


        if (loadingSpinner) {

            loadingSpinner.classList.toggle(
                "visible",
                isLoading
            );

        }

    }


    function showMessage(
        message,
        type
    ) {

        if (!formMessage) return;


        formMessage.textContent =
            message;


        formMessage.className =
            `form-message visible ${type}`;


        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    function clearMessage() {

        if (!formMessage) return;


        formMessage.textContent = "";

        formMessage.className =
            "form-message";

    }


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearMessage();


            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }


            if (
                emailField &&
                replyToField
            ) {

                replyToField.value =
                    emailField.value.trim();

            }


            const formData =
                new FormData(form);


            setLoading(true);


            try {

                const response =
                    await fetch(
                        form.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Form submission failed."
                    );

                }


                showMessage(
                    "Thank you. Your enquiry has been sent successfully. We'll review it and get back to you.",
                    "success"
                );


                trackEvent(
                    "contact_form_submission",
                    {
                        event_category:
                            "Lead Generation",

                        event_label:
                            formData.get(
                                "inquiry-type"
                            ) || "General"
                    }
                );


                form.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                showMessage(
                    "We couldn't send your enquiry right now. Please try again, or email us directly at contact@luminix.space.",
                    "error"
                );

            } finally {

                setLoading(false);

            }

        }
    );

}


// =========================================================
// 10. CURRENT YEAR
// =========================================================

function initializeCurrentYear() {

    const yearElement =
        document.getElementById(
            "current-year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


// =========================================================
// 11. INITIALIZE WEBSITE
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeHeader();

        initializeMobileMenu();

        initializeInternalLinks();

        initializeRevealAnimations();

        initializeProjectTracking();

        initializeContactTracking();

        initializeContactForm();

        initializeCurrentYear();


        console.log(
            "Luminix website initialized successfully."
        );

    }
);