document.addEventListener('DOMContentLoaded', async () => {

    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // Remove any "show" classes to reset the page position
    const pageWrapperOnLoad = document.getElementById('page-wrapper');
    if (pageWrapperOnLoad) {
        pageWrapperOnLoad.classList.remove('show-projects', 'show-about', 'show-contacts', 'show-resume');
    }

    // Corrected location for videoPaths
    const videoPaths = {
        sunny: 'videos/sunny_fox.webp',
        raining: 'videos/rainy_fox.webp',
    };

    async function updateWeatherAndBackground() {
        // Randomly select one of the two backgrounds
        const isRaining = Math.random() < 0.5; // 50% chance of being "raining"
        if (isRaining) {
            await setBackground(videoPaths.raining);
        } else {
            await setBackground(videoPaths.sunny);
        }
        hideLoader(); // remove loading screen once everything is done
    }


    function hideLoader() {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500); // fade out
        }
    }

    // This is the corrected function
    function setBackground(videoSrc) {
        return new Promise((resolve) => {
            const backgroundImage = document.getElementById('background-image');
            const body = document.body;

            body.classList.remove('raining-weather', 'sunny-weather');

            // Corrected check: now compares the video source string
            if (videoSrc === videoPaths.raining) {
                body.classList.add('raining-weather');
            } else {
                body.classList.add('sunny-weather');
            }

            backgroundImage.src = videoSrc;

            // resolve once the image actually finishes loading
            backgroundImage.onload = () => resolve();
        });
    }


    updateWeatherAndBackground();

    // Manually scroll to the top of the page
    window.scrollTo(0, 0);
    const foxCharacterContainer = document.getElementById('fox-character-container');
    const catShirt = document.getElementById('fox-shirt');

    const dialogueBoxProjects = document.getElementById('dialogue-box'); // Existing dialogue box for projects page
    const computerMonitor = document.getElementById('computer-monitor');
    const pageWrapper = document.getElementById('page-wrapper');

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


        if (fox) {
            foxJump();
        }
        overlay.classList.add('animate');

        setTimeout(() => {
            if (fox) {
                 // Only hide the fox if we are transitioning away from it (e.g., to 'about')
                if (targetClass !== 'show-projects') {
                    fox.style.opacity = 0;
                }
            }

            const onFoxEnterEnd = () => {
                if (fox) {
                    fox.classList.remove('fox-entering');
                }
            };

            pageWrapper.classList.remove('show-projects', 'show-about', 'show-contacts', 'show-resume');
            if (targetClass) {
                pageWrapper.classList.add(targetClass);
            }

            if (targetClass === 'show-about') {
                if (fox) {
                    fox.style.opacity = 1;
                    // Hide the dialogue box on the 'about' page
                    dialogueBoxHome.style.opacity = '0';
                    dialogueBoxHome.style.visibility = 'hidden';
                }
            } else if (targetClass === 'show-projects') {
                if (fox) {
                     // Ensure fox is visible on projects page
                    fox.style.opacity = 1;
                }
            } else { // This is for the homepage
                setTimeout(() => {
                    if (fox) {
                        fox.style.opacity = 1;
                        fox.classList.add('fox-entering');
                        fox.addEventListener('animationend', onFoxEnterEnd, { once: true });
                    }
                }, 50);
            }

            overlay.classList.remove('animate');
        }, 800);
    }


    const shirtImages = ['images/shirt 1.png', 'images/shirt 2.png', 'images/shirt 3.png'];
    let currentShirtIndex = 0;



    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent default spacebar behavior
            if (foxCharacterContainer) {
                foxJump();
            }
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
        const dialogueBox = targetElement.closest('.page-section').id === 'homepage-section' ? dialogueBoxHome : dialogueBoxProjects;
        dialogueBox.textContent = text;
        dialogueBox.style.opacity = '1';
        dialogueBox.style.visibility = 'visible';
    };

    const hideDialogue = (targetElement) => {
        let dialogueBox = targetElement.closest('#homepage-section') ? dialogueBoxHome : dialogueBoxProjects;

        if (dialogueBox) {
            dialogueBox.style.opacity = '0';
            dialogueBox.style.visibility = 'hidden';
        }
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

        catShirt.addEventListener('mouseout', () => hideDialogue(catShirt));
        catShirt.src = shirtImages[currentShirtIndex];
    }



    if (computerMonitor) {
        computerMonitor.addEventListener('mouseover', () => showDialogue("📂Check out my work", computerMonitor));
        computerMonitor.addEventListener('mouseout', () => hideDialogue(computerMonitor));
        computerMonitor.addEventListener('click', () => {
            transitionToPage('show-projects'); // This is the new line
        });
    }


    if (resumeSign) {
        resumeSign.addEventListener('mouseover', () => showDialogue("💼 Check out my resume!", resumeSign));
        resumeSign.addEventListener('mouseout', () => hideDialogue(resumeSign));
    }


    if (catPicture) {
        catPicture.addEventListener('mouseover', () => showDialogue("🦊Learn more about me🦊", catPicture));
        catPicture.addEventListener('mouseout', () => hideDialogue(catPicture));
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
            hideDialogue(guitar);
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
        speaker.addEventListener('mouseout', () => hideDialogue(speaker));
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
        flower.addEventListener('mouseout', () => hideDialogue(flower));
        flower.addEventListener('animationend', () => {
            flower.classList.remove('hopping');
        });
    }
    // Social media dialogues


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
            element.addEventListener('mouseout', () => hideDialogue(element));
        }
    });


    const dialogueBoxHome = document.getElementById('dialogue-box-home');
    if (dialogueBoxHome) {
        dialogueBoxHome.textContent = "Welcome to my portfolio! 👋";
        dialogueBoxHome.style.opacity = '1';
        dialogueBoxHome.style.visibility = 'visible';
    }

});
