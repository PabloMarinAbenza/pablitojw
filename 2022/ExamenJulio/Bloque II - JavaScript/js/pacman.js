window.onload = start;

let game = {
    pacmanSize: 35, // radius
    pacmans: [],
    angleRange: 60, // when mouth is fully open (degrees)
    shiftX: 5, // translation; how much to move each "step"
    // 9a
    pacmanCount: 0,
    canvas: null,
};

class Pacman
{
    /*
    
    7a 
    
    */
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.angle = 0;
    }
    /* 
    
    7b
    
    */
    move(shiftX, angleRange){
        this.x += shiftX;
        this.angle = Math.random()*angleRange*Math.PI/180;      //Convertimos el angulo angleRange en radianes
    }
    draw(ctx)
    {
        ctx.globalAlpha = 0.4;
        ctx.fillStyle="green";
        /* 7c - Para dibujar el pacman tienes que dibujar:
            + su arco superior en sentido horario
            + una línea hasta C
            + ir hasta (x-r, y), sin dibujar: ctx.moveTo(this.x-this.r, this.y)
            + su arco inferior en sentido contrario al horario
            + otra línea hasta C
        */
       ctx.beginPath();
       ctx.arc(this.x, this.y, this.r, Math.PI, -this.angle/2);
       ctx.lineTo(this.x, this.y);
       ctx.moveTo(this.x-this.r, this.y);
       ctx.arc(this.x, this.y, this.r, Math.PI, +this.angle/2, true);
       ctx.lineTo(this.x, this.y);
       ctx.stroke();
       ctx.fill();
    }

    /*

    7d

    */
    isAboutToLeave(cv){
        return this.x > cv.width;
    }
}

function createPacman(cv)
{
    /* 
    
    8a 
    
    */

    let pacman = new Pacman(Math.random()*cv.width, Math.random()*cv.height, game.pacmanSize);
    game.pacmans.push(pacman);

    // 9a

    game.pacmanCount ++;
}

function movePacmans()
{
    /*

    8b

    */

    game.pacmans.forEach((pacman, i) => {
        pacman.move(game.shiftX, game.angleRange);
        if (pacman.isAboutToLeave(game.canvas)) {
            game.pacmans.splice(i, 1);
        }
    });
}

function cleanCanvas(cv)
{
    // 8c
    let ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
}

function drawPacmans(cv)
{
    /* 
    
    8d 
    
    */
    let ctx = cv.getContext('2d');
    cleanCanvas(cv);
    game.pacmans.forEach((pacman) => {
        pacman.draw(ctx);
    });
}

function displayCounts()
{
    /* 
    
    9b 
    
    */

    document.getElementById('totalPacmans').innerHTML = game.pacmanCount;
    document.getElementById('livingPacmans').innerHTML = game.pacmans.length;
}

function update(canvas)
{
    movePacmans(); // move all pacmans
    drawPacmans(canvas); // draw all pacmans   
    displayCounts(); // update pacman counts
}

function start()
{   
    // 10a

    game.canvas = document.getElementById('pacman');
    
    // 10b

    setInterval(function() {
        createPacman(game.canvas);
    }, 3000);

    // 10c

    setInterval(function(){
        movePacmans();
        drawPacmans(game.canvas);
        displayCounts();
    }, 1000/7);
}   
