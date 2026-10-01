const container = document.getElementById('pattern');
const colors = ['#6AFFB7', '#D1FFE9', '#C1CFDA', '#D9D9D9', '#A6D3E2', '#F6BCE5'];
let patternCount = 0;
//first pattern
function addBox(rotation, color, xPosition, yPosition) {
    const box = document.createElement('div');
    box.style.position = 'absolute';
    box.style.width = '5px';
    box.style.height = '26px';
    box.style.backgroundColor = color;
    box.style.left = xPosition + 'px';
    box.style.top = yPosition + 'px';
    box.style.transition = 'transform 0.1s ease-in';

    const baseTransform = `rotate(${rotation}deg)`;
    box.style.transform = baseTransform;

    box.addEventListener('mouseenter', () => {
        box.style.transform = `${baseTransform} scale(5)`;
        box.style.zIndex = '10';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = baseTransform;
        box.style.zIndex = '1';
    });
    return box;
}
//click generate pattern
function generatePattern() {
    const newPattern = document.createElement('div');
    const stepX = 20; //space in between horizontal
    const stepY = 12; //space vertical
    const patternWidth = 900;
    const patternHeight = 10; //bigger
    newPattern.style.position = 'relative'; //absolute
    newPattern.style.width = `${patternWidth}px`;
    newPattern.style.height = `${patternHeight}px`;
    newPattern.style.top = `${patternCount * patternHeight}px`;
    newPattern.style.left = '0px';

    let count = 0;

    for (let x = 0; x < patternWidth; x = x + stepX) {
        for (let y = 0; y < patternHeight; y = y + stepY) {
            const color = colors[count % colors.length];
            const rotation = count * 25;

            const box = addBox(rotation, color, x, y);
            newPattern.appendChild(box);

            count = count + 1;
        }
    }

    document.body.appendChild(newPattern);
    patternCount = patternCount + 1;
}

window.addEventListener('click', () => {
    generatePattern();
});
