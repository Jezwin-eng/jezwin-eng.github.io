document.addEventListener('DOMContentLoaded', () => {
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
    const contactsButton = document.getElementById('contacts-button');

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
            pageWrapper.classList.add('show-projects');
        });
    }
    
    if (resumeSign) {
        resumeSign.addEventListener('mouseover', () => showDialogue("💼I'm looking for a job", resumeSign));
        resumeSign.addEventListener('mouseout', hideDialogue);
        resumeSign.addEventListener('click', () => {
            pageWrapper.classList.remove('show-projects', 'show-about', 'show-contacts');
            pageWrapper.classList.add('show-resume');
        });
    }

    if (catPicture) {
        catPicture.addEventListener('mouseover', () => showDialogue("🦊Learn more about me🦊", catPicture));
        catPicture.addEventListener('mouseout', hideDialogue);
        catPicture.addEventListener('click', () => {
            pageWrapper.classList.remove('show-projects', 'show-contacts', 'show-resume');
            pageWrapper.classList.add('show-about');
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
    if (hamburgerButton && closeButton) {
        hamburgerButton.addEventListener('click', () => {
            document.body.classList.add('menu-open');
            navMenu.classList.add('open');
        });
        closeButton.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
            navMenu.classList.remove('open');
        });
    }

    const navigateAndClose = () => {
        pageWrapper.classList.remove('show-projects', 'show-about', 'show-contacts', 'show-resume');
        document.body.classList.remove('menu-open');
        navMenu.classList.remove('open');
    };

    if (homeButton) {
        homeButton.addEventListener('click', navigateAndClose);
    }
    if (aboutButton) {
        aboutButton.addEventListener('click', () => {
            pageWrapper.classList.remove('show-projects', 'show-contacts', 'show-resume');
            pageWrapper.classList.add('show-about');
            navigateAndClose();
        });
    }
    if (projectsButton) {
        projectsButton.addEventListener('click', () => {
            pageWrapper.classList.remove('show-about', 'show-contacts', 'show-resume');
            pageWrapper.classList.add('show-projects');
            navigateAndClose();
        });
    }
    if (contactsButton) {
        contactsButton.addEventListener('click', () => {
            pageWrapper.classList.remove('show-projects', 'show-about', 'show-resume');
            pageWrapper.classList.add('show-contacts');
            navigateAndClose();
        });
    }
    const socialLogos = {
    '#linkedin-icon': "🌐Follow me on Linkedin",
    '#discord-icon': "☠️Enter at own risk",
    '#github-icon': "😅Don't judge my GH stats"
};
backgroundMusic.volume = 0.07; 

  

Object.entries(socialLogos).forEach(([selector, message]) => {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener('mouseover', () => showDialogue(message, element));
        element.addEventListener('mouseout', hideDialogue);
    }
});
});
