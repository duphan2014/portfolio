// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const flyoutMenu = document.getElementById('flyout-menu');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-menu');
    const flyoutHeaderSearch = document.getElementById('flyout-header-search');

    // Function to open the menu
    function openMenu() {
        hamburger.classList.add('active');
        flyoutMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close the menu
    function closeMenu() {
        hamburger.classList.remove('active');
        flyoutMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    flyoutHeaderSearch.addEventListener('focus', function() {
        flyoutHeaderSearch.value = "";
    });

    flyoutHeaderSearch.addEventListener('blur', function () {
        flyoutHeaderSearch.value = "Search";
    });
    
    // Event listeners
    hamburger.addEventListener('click', function() {
        if (flyoutMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking the close button
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when clicking on overlay
    overlay.addEventListener('click', closeMenu);

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && flyoutMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.flyout-nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});