// scripts/script.js

// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Track scroll events in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_to_section', {
                'event_category': 'Navigation',
                'event_label': sectionId
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your initialization code here
    
    // Make scrollToSection function available globally
    window.scrollToSection = scrollToSection;
    
    console.log('Luminix website scripts loaded successfully!');
});