// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const flyoutMenu = document.getElementById('flyout-menu');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-menu');
    const flyoutHeaderSearch = document.getElementById('flyout-header-search');
    const headerSearch = document.getElementsByClassName('header-search')[0];
    const headerSearchIcon = document.getElementById('search');
    const headerSearchBox = document.getElementById('header-search-box');

    function openSearch() {
        headerSearch.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        overlay.classList.add('active');
    }
    
    function closeSearch() {
        headerSearch.classList.remove('active');
        document.body.style.overflow = '';
    }


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

    headerSearchBox.addEventListener('focus', function() {
        headerSearchBox.value = "";
    });

    headerSearchBox.addEventListener('blur', function () {
        headerSearchBox.value = "Search The Age";
    });
    
    // Event listeners
    hamburger.addEventListener('click', function() {
        if (flyoutMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    headerSearchIcon.addEventListener('click', function() {
        if (headerSearch.classList.contains('active')) {
            closeSearch();
        } else {
            openSearch();
        }
    });

    // Close menu when clicking the close button
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        closeMenu();
        closeSearch();
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && flyoutMenu.classList.contains('active')) {
            closeMenu();
        }
        if (e.key === 'Escape' && headerSearch.classList.contains('active')) {
            closeSearch();
        }
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.flyout-nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

const RSS_URL = `https://www.theage.com.au/rss/feed.xml`;

fetch(RSS_URL)
    .then(response=>response.text())
    .then(str=>new window.DOMParser().parseFromString(str,"text/xml"))
    .then(data => {
        console.log(data);
        const items = data.querySelectorAll("item");
        let html = ``;
        items.forEach(el => {
            html += `
                <div class="article">
                    <h2>
                        <a href="${el.querySelector("link").innerHTML}"
                            target="_blank" rel="noopener">
                            ${el.querySelector("title").innerHTML}
                        </a>
                    </h2>
                    <p>
                        ${el.querySelector("description").innerHTML}
                    </p>
                </div>
            `;
        });
        //document.body.insertAdjacentHTML("beforeend", html);
        document.getElementsByClassName("main-news")[0].insertAdjacentHTML("beforeend", html);

        const pubDate = data.querySelectorAll("pubDate")[0];
        document.getElementById("current-date-time").textContent = pubDate.textContent;
    })
    .catch((err) => {
        document.getElementsByClassName("main-news")[0].insertAdjacentHTML("beforeend", `<div>Failed to fetch RSS. Reload page to try again.</div>`)
    });