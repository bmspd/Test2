let ballR = 27;
let ballsAmount = 100;
let boxesArray = [];
let mySvg = document.getElementById('svgArea');
let buttonStart = document.getElementById('start');

let sortNumber = document.getElementById('sort');
let restartButton = document.getElementById("restart");
let ballsArray = []

buttonStart.onclick = sortBubbles;
sortNumber.onclick = bubbleSort;
restartButton.onclick = oneMoreTime;

function sortBubbles() {
    let inputNumber = document.getElementById('input');
    let isnum = /^\d+$/.test(inputNumber.value);
    if (!isnum)
        {
            alert("Введено некоректное число!")
            inputNumber.value = "";
            return;
        }
    ballsAmount = parseInt(inputNumber.value) 
    buttonStart.disabled = true; 
    inputNumber.disabled = true;
    sortNumber.disabled = false;
    if (ballsAmount > 154)
            ballR = Math.floor(Math.sqrt((mySvg.clientWidth * mySvg.clientWidth)  / (ballsAmount * 4.5)));

    for (let i = 0; i<ballsAmount;i++)
    {
        let r = generateNum(0, 255);
        let g = generateNum(0, 255);
        let b = generateNum(0, 255);
        ballsArray[i] = new Circle(ballR,{x:generateNum(50, 750), y:generateNum(50, 750)},r,g,b, 'rgba(' + r + ','+g+','+b+')')
        ballsArray[i].oldPlace = i;
        ballsArray[i].draw();
   
}
fillBoxesArray();
for (let i = 0; i < ballsArray.length; i++)
{   

    ballsArray[i].translate((boxesArray[i].x - ballR), (boxesArray[i].y - ballR));
    ballsArray[i].draw();
} 
 }

function generateNum(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function Circle(radius = 10, location, r =0, g=0,b=0,fill = 'black', stroke = 'transparent') {
    this.radius = radius;
    this.location = location || {x: 100, y: 100};
    this.fill = fill;
    this.stroke = stroke;
    this.r = r;
    this.g = g;
    this.b = b;
    this.oldPlace = 0;
    this.id = (Math.random() * 25500);
    this.draw = function () {
        if (mySvg.getElementById(this.id)) mySvg.getElementById(this.id).remove();
        mySvg.innerHTML += `<circle cx="${this.location.x}" cy="${this.location.y}" 
        r="${this.radius}" fill="${this.fill}" stroke="${this.stroke}" id="${this.id}"/> `;
    }
    this.translate = function(x, y) {
        this.location.x = x;
        this.location.y = y;
    }
}

function bubbleSort()
{
    sortNumber.disabled = true;
    for (let i = 0; i < ballsArray.length; i++)
    {
        for (let j = 0; j < ballsArray.length - i - 1; j++)
        {
            if (ballsArray[j].r > ballsArray[j + 1].r)
                    swapFoo(ballsArray, j, j + 1);

            else if (ballsArray[j].r === ballsArray[j + 1].r && ballsArray[j].g > ballsArray[j + 1].g)
                    swapFoo(ballsArray, j, j + 1);

            else if (ballsArray[j].r === ballsArray[j + 1].r && ballsArray[j].g === ballsArray[j + 1].g
                && ballsArray[j].b > ballsArray[j + 1].b)
                    swapFoo(ballsArray, j, j + 1);

        }
    }
    for (let i = 0; i < ballsArray.length; i++)
        swapDOM(ballsArray[i].oldPlace + 1, i + 1);
    restartButton.disabled = false;    

}


function swapDOM(i, j)
{
    let temp = Math.floor(mySvg.clientWidth / (2 * ballR));
    let object1 = mySvg.querySelectorAll("circle")[i - 1];
    
    let obj1MoveX = boxesArray[j - 1].x - boxesArray[i - 1].x;
    let obj1MoveY = boxesArray[j - 1].y - boxesArray[i - 1].y; 
    

    object1.style.setProperty('--x', `${obj1MoveX}px`);
    object1.style.setProperty('--y', `${obj1MoveY}px`);
    object1.style.transform = `translate(${obj1MoveX}px, ${obj1MoveY}px)`;
    object1.style.animation = 'translating 5s';
}


function swapFoo(array, x, y)
{

    let temp = array[x];
    array[x] = array[y];
    array[y] = temp;
}

function setCoordinates(x, y)
{
    return {
        x: x, y:y
    };
}



function fillBoxesArray () {
    let temp = Math.floor(mySvg.clientWidth / (2 * ballR))
    let x0 =  Math.floor(mySvg.clientWidth / temp);
    let x = x0;
    let y = x0
    for (let i = 0; i < ballsAmount; i++)
    {
        boxesArray[i] = setCoordinates(x, y)
        x += x0;
        if ((i + 1) % temp == 0 && (i + 1) / temp > 0 )
            {
                y = x0 * (((i + 1) / temp) + 1)
                x = x0;
            }
    }
}


function oneMoreTime() {
    document.location.reload();
}