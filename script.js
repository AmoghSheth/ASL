document.addEventListener('DOMContentLoaded', () => {
    const letterGrid = document.querySelector('.letter-grid');
    const modal = document.getElementById('letterModal');
    const modalImg = document.getElementById('modalLetterImage');
    const modalTitle = document.getElementById('modalLetterTitle');
    const closeButton = document.querySelector('.close-button');

    if (letterGrid) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        letters.forEach(letter => {
            const letterCard = document.createElement('div');
            letterCard.className = 'letter-card';
            
            
            const letterText = document.createElement('span');
            letterText.textContent = letter;
            letterText.className = 'letter-text';
            
            
            const img = document.createElement('img');
            const imgPath = `signlang/${letter.toLowerCase()}.png`;
            img.src = imgPath;
            img.alt = `Sign for letter ${letter}`;
            img.className = 'letter-image';
            img.style.display = 'none';
            
            
            letterCard.addEventListener('click', () => {
                modalImg.src = imgPath;
                modalTitle.textContent = `Letter ${letter}`;
                modal.style.display = 'block';
            });


            letterCard.addEventListener('mouseenter', () => {
                letterText.style.display = 'none';
                img.style.display = 'block';
            });

            letterCard.addEventListener('mouseleave', () => {
                letterText.style.display = 'block';
                img.style.display = 'none';
            });

            img.onerror = () => {
                console.error(`Failed to load image: ${imgPath}`);
            };
            
            letterCard.appendChild(letterText);
            letterCard.appendChild(img);
            letterGrid.appendChild(letterCard);
        });

        
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

       
        initCamera();
    }
});

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.getElementById('camera-feed');
        if (videoElement) {
            videoElement.srcObject = stream;
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}

function showCorrectFeedback() {
    const badge = document.querySelector('.correct-badge');
    badge.classList.add('show');
    setTimeout(() => {
        badge.classList.remove('show');
    }, 2000);
} 
