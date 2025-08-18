document.addEventListener('DOMContentLoaded', () => {

    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // Remove any "show" classes to reset the page position
    const pageWrapperOnLoad = document.getElementById('page-wrapper');
    if (pageWrapperOnLoad) {
        pageWrapperOnLoad.classList.remove('show-projects', 'show-about', 'show-contacts', 'show-resume');
    }

    // Manually scroll to the top of the page
    window.scrollTo(0, 0);
    const foxCharacterContainer = document.getElementById('fox-character-container');
    const catShirt = document.getElementById('fox-shirt');
    const dialogueBox = document.getElementById('dialogue-box');
    const computerMonitor = document.getElementById('computer-monitor');
    const pageWrapper = document.getElementById('page-wrapper');
    const socialIcons = document.querySelectorAll('.social-icon');
    const resumeSign = document.getElementById('resume-sign');
    const catPicture = document.getElementById('cat-picture');
    const guitar = document.getElementById('guitar');
    const speaker = document.getElementById('speaker');
    const flower = document.getElementById('flower');
    const backgroundMusic = document.getElementById('background-music');

    const hamburgerButton = document.getElementById('hamburger-button');
    const navMenu = document.getElementById('nav-menu');
    const closeButton = document.getElementById('close-button');
    const homeButton = document.getElementById('home-button');
    const aboutButton = document.getElementById('about-button');
    const projectsButton = document.getElementById('projects-button');


    // PASTE THIS AT THE VERY TOP OF n_test.js
    // This is the corrected function
    // This is the corrected function
    function transitionToPage(targetClass) {
        const overlay = document.getElementById('transition-overlay');
        const pageWrapper = document.getElementById('page-wrapper');
        const fox = document.getElementById('fox-character-container');

        foxJump();
        overlay.classList.add('animate');

        setTimeout(() => {
            fox.style.opacity = 0;

            // CORRECTED ORDER: The function is defined *before* it is used.
            const onFoxEnterEnd = () => {
                fox.classList.remove('fox-entering');
            };
            fox.removeEventListener('animationend', onFoxEnterEnd); // Now this is safe to call

            pageWrapper.classList.remove('show-projects', 'show-about', 'show-contacts', 'show-resume');
            if (targetClass) {
                pageWrapper.classList.add(targetClass);
            }

            if (targetClass === 'show-about') {
                fox.style.opacity = 1;
            } else {
                setTimeout(() => {
                    fox.style.opacity = 1;
                    fox.classList.add('fox-entering');
                    fox.addEventListener('animationend', onFoxEnterEnd, { once: true });
                }, 50);
            }

            overlay.classList.remove('animate');
        }, 800);
    }


    const shirtImages = ['images/shirt 1.png', 'images/shirt 2.png', 'images/shirt 3.png'];
    let currentShirtIndex = 0;

    // Timer for the fox's special dialogue
    let foxHoverTimer;

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent default spacebar behavior
            foxJump();
        }
    });

    function foxJump() {
        // Add jumping class
        foxCharacterContainer.classList.add('jumping');

        // Remove after animation completes
        foxCharacterContainer.addEventListener('animationend', () => {
            foxCharacterContainer.classList.remove('jumping');
        }, { once: true });

    }


    const showDialogue = (text, targetElement) => {
        dialogueBox.textContent = text;
        dialogueBox.style.opacity = '1';
        dialogueBox.style.visibility = 'visible';
        // You can add more complex positioning here if needed
    };

    const hideDialogue = () => {
        dialogueBox.style.opacity = '0';
        dialogueBox.style.visibility = 'hidden';
    };

    if (catShirt) {
        // Shirt click functionality
        catShirt.addEventListener('click', () => {
            currentShirtIndex = (currentShirtIndex + 1) % shirtImages.length;
            catShirt.src = shirtImages[currentShirtIndex];
            showDialogue("💥Click me to change my shirt", catShirt);
        });

        // Move hover events to the shirt instead of container
        catShirt.addEventListener('mouseover', () => {
            showDialogue("💥Click me to change my shirt", catShirt);
        });

        catShirt.addEventListener('mouseout', hideDialogue);
        catShirt.src = shirtImages[currentShirtIndex];
    }



    if (computerMonitor) {
        computerMonitor.addEventListener('mouseover', () => showDialogue("📂Check out my work", computerMonitor));
        computerMonitor.addEventListener('mouseout', hideDialogue);
        computerMonitor.addEventListener('click', () => {
            transitionToPage('show-projects'); // This is the new line
        });
    }


    if (resumeSign) {
        resumeSign.addEventListener('mouseover', () => showDialogue("💼 Check out my resume!", resumeSign));
        resumeSign.addEventListener('mouseout', hideDialogue);
    }


    if (catPicture) {
        catPicture.addEventListener('mouseover', () => showDialogue("🦊Learn more about me🦊", catPicture));
        catPicture.addEventListener('mouseout', hideDialogue);
        catPicture.addEventListener('click', () => {
            transitionToPage('show-about'); // This is the new line
        });
    }

    if (guitar) {
        const guitarSound = new Audio('music/guitar_sound.mp3');

        // Hover animation (visual only)
        guitar.addEventListener('mouseenter', () => {
            showDialogue("🖼️Thats just for decoration", guitar);
            guitar.classList.add('hover-tilt'); // Add this class to your CSS
        });

        guitar.addEventListener('mouseleave', () => {
            hideDialogue();
            guitar.classList.remove('hover-tilt');
        });

        // Click sound effect
        guitar.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default behavior
            guitarSound.play();
        });
    }

    if (speaker && backgroundMusic) {
        speaker.addEventListener('mouseover', () => showDialogue("🎵Turn on the music?", speaker));
        speaker.addEventListener('mouseout', hideDialogue);
        speaker.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
            } else {
                backgroundMusic.pause();
            }
        });
    }

    if (flower) {
        flower.addEventListener('mouseover', () => {
            showDialogue("🌸The flower loves the song", flower);
            flower.classList.add('hopping');
        });
        flower.addEventListener('mouseout', hideDialogue);
        flower.addEventListener('animationend', () => {
            flower.classList.remove('hopping');
        });
    }
    // Social media dialogues
    document.querySelectorAll('#linkedin-icon, #github-icon, #discord-icon').forEach(icon => {
        let message;
        if (icon.id === 'linkedin-icon') message = "My LinkedIn";
        if (icon.id === 'discord-icon') message = "My Discord";
        if (icon.id === 'github-icon') message = "My GitHub repos";

        icon.addEventListener('mouseover', () => showDialogue(message, icon));
        icon.addEventListener('mouseout', hideDialogue);
    });

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', () => navMenu.classList.add('open'));
        closeButton.addEventListener('click', () => navMenu.classList.remove('open'));
    }

    const closeMenu = () => navMenu.classList.remove('open');

    // 2. Home Button -> Homepage
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            transitionToPage(null); // Use null to go to the homepage
            closeMenu();
        });
    }

    // 3. About Button -> About Page
    if (aboutButton) {
        aboutButton.addEventListener('click', () => {
            transitionToPage('show-about');
            closeMenu();
        });
    }

    // 4. Work Button -> Work/Projects Page
    if (projectsButton) {
        projectsButton.addEventListener('click', () => {
            transitionToPage('show-projects');
            closeMenu();
        });
    }

    // Note: We assume the resume page is not in the nav menu, 
    // but if it is, you would add a block for it here just like the others.
    const socialLogos = {
        '#linkedin-icon': "🌐Follow me on Linkedin",
        '#discord-icon': "You can find me on Discord: the_silent_reaper23",
        '#github-icon': "😅Don't judge my GH stats"
    };
    backgroundMusic.volume = 0.1;



    Object.entries(socialLogos).forEach(([selector, message]) => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('mouseover', () => showDialogue(message, element));
            element.addEventListener('mouseout', hideDialogue);
        }
    });

    // --- START: WEATHER WIDGET ---
    // (Delete this whole function to remove the feature)
    function fetchWeather() {
        // Coordinates for Kochi, Kerala, India
        const latitude = 9.93;
        const longitude = 76.26;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;


        const weatherWidget = document.getElementById('weather-widget');

        // Helper function to pick an emoji based on the weather code
        function getWeatherIcon(wmoCode) {
            if (wmoCode === 0) return '☀️'; // Clear sky
            if (wmoCode >= 1 && wmoCode <= 3) return '⛅️'; // Mainly clear, partly cloudy
            if (wmoCode >= 45 && wmoCode <= 48) return '🌫️'; // Fog
            if (wmoCode >= 51 && wmoCode <= 67) return '🌧️'; // Rain
            if (wmoCode >= 71 && wmoCode <= 77) return '❄️'; // Snow
            if (wmoCode >= 80 && wmoCode <= 82) return '🌦️'; // Rain showers
            if (wmoCode >= 95 && wmoCode <= 99) return '⛈️'; // Thunderstorm
            return '🌍'; // Default
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = Math.round(data.current.temperature_2m);
                const wmoCode = data.current.weather_code;
                const icon = getWeatherIcon(wmoCode);

                weatherWidget.innerHTML = `
                <span class="icon">${icon}</span>
                <span class="temp">${temp}°C</span>
            `;
                weatherWidget.classList.add('visible'); // Fade it in
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                weatherWidget.style.display = 'none'; // Hide widget on error
            });
    }
    fetchWeather();
});

