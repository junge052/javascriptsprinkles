const container = document.getElementById('pattern');

const colors = [
    '#6AFFB7',
    '#D1FFE9',
    '#C1CFDA',
    '#D9D9D9',
    '#A6D3E2',
    '#F6BCE5'
];

let patternCount = 0;

// sliders
const sizeSlider = document.getElementById('sizeSlider');
const variationSlider = document.getElementById('variationSlider');

let sprinkleSize = 1;
let sprinkleVariation = 0;


//size
sizeSlider.addEventListener('input', () => {
    sprinkleSize = parseFloat(sizeSlider.value);
});


// variation
variationSlider.addEventListener('input', () => {
    sprinkleVariation = parseFloat(variationSlider.value);
});


// CREATE ONE SPRINKLE
function addBox(rotation, color, xPosition, yPosition) {

    const box = document.createElement('div');

    box.classList.add('sprinkle');

    box.style.position = 'absolute';

    // RANDOM VALUES
    const randomSize = Math.random() * 2 - 1;
    const randomRotation = Math.random() * 2 - 1;

    // SIZE
    const variationAmount =
        randomSize * sprinkleVariation;

    const finalScale = Math.max(
        0.2,
        sprinkleSize + variationAmount
    );

    box.style.width = `${5 * finalScale}px`;
    box.style.height = `${25 * finalScale}px`;

    // COLOR
    box.style.backgroundColor = color;

    // POSITION
    box.style.left = `${xPosition}px`;
    box.style.top = `${yPosition}px`;

    // ROTATION
    const rotationVariation =
        randomRotation * sprinkleVariation * 90;

    const finalRotation =
        rotation + rotationVariation;

    box.dataset.rotation = finalRotation;

    const baseTransform =
        `rotate(${finalRotation}deg)`;

    box.style.transform = baseTransform;

    // ANIMATION
    box.style.transition = 'transform 0.1s ease-in';

    // HOVER
    box.addEventListener('mouseenter', () => {
        box.style.transform =
            `rotate(${box.dataset.rotation}deg) scale(5)`;

        box.style.zIndex = '10';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform =
            `rotate(${box.dataset.rotation}deg)`;

        box.style.zIndex = '1';
    });

    return box;
}


// GENERATE PATTERN
function generatePattern() {

    const newPattern =
        document.createElement('div');

    // SPACING
    const stepX = 15;
    const stepY = 12;

    // PATTERN SIZE
    const patternWidth = 1000;
    const patternHeight = 16;

    newPattern.style.position = 'relative';
    newPattern.style.width = `${patternWidth}px`;
    newPattern.style.height = `${patternHeight}px`;
    newPattern.style.left = '0px';

    let count = 0;

    // CREATE SPRINKLES
    for (
        let x = 0;
        x < patternWidth;
        x += stepX
    ) {

        for (
            let y = 0;
            y < patternHeight;
            y += stepY
        ) {

            const color =
                colors[count % colors.length];

            const rotation =
                count * 25;

            const box = addBox(
                rotation,
                color,
                x,
                y
            );

            newPattern.appendChild(box);

            count++;
        }
    }

    container.appendChild(newPattern);

    patternCount++;
}


// CLICK ANYWHERE TO GENERATE
window.addEventListener('click', (event) => {

    // Ignore clicks on controls
    if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'LABEL'
    ) {
        return;
    }

    generatePattern();
});