window.onload = start;

const R1_SMALL = 12;
const R1_BIG = 30;
const FACTOR_R2_R1 = 1.6;
const PROB_BIG_HOOK = 0.4;
const MOTION_RANGE = [-5, 6];

let hooks = [];

class Hook
{
    /*
        6a
    */

    constructor (x, y, size, ctx){
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
    }

    /*
        6b
    */

    draw(){
        let r = this.size == 'small' ? R1_SMALL : R1_BIG;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, r, Math.PI, Math.PI/2);
        this.ctx.arc(this.x, this.y+r*2.6, r*1.6, Math.PI*3/2, 0, true);
        this.ctx.stroke();
    }

    /*
        6c
    */

    move(){
        this.x += Math.random()*(MOTION_RANGE[1]-MOTION_RANGE[0])+MOTION_RANGE[0];
        this.y += Math.random()*(MOTION_RANGE[1]-MOTION_RANGE[0])+MOTION_RANGE[0];
    }
}

function createHook(event,canvas)
{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    /*
        7a
    */

    let size = Math.random() <= 0.4 ? 'big' : 'small';

    let hook = new Hook(x, y, size, canvas.getContext('2d'));

    hooks.push(hook);
}

function moveHooks()
{
    /*
        7b
    */

    hooks.forEach((hook)=>{
        hook.move();
    });
}

function cleanCanvas(cv)
{
    // 7c
    let ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
}

function drawHooks(canvases)
{
    // clean all canvases
    /*
        7d
    */

    canvases.forEach((cv) => {
        cleanCanvas(cv);
    });
    
    // draw all hooks
    /*
        7d
    */
   
    hooks.forEach((hook) => {
        hook.draw();
    });
}

function moveAndDrawHooks(canvases)
{
    moveHooks(); // move all hooks
    drawHooks(canvases); // draw all hooks   
}

function start()
{   
    let canvases = []/* 8a */
    let hookCvs = document.getElementsByClassName('hooks');

    for (let i = 0; i < hookCvs.length; i++) {
        canvases.push(hookCvs[i]);   
    };

    /*
        8b
    */
    canvases.forEach((cv) => {
        cv.addEventListener('click', function(e){
            createHook(e, cv);
        });
    });

    // 8c

    setInterval(function(){
        moveAndDrawHooks(canvases);
    }, 1000/5);
}

/* 
    9 
*/
function undo(){
    hooks.pop();
}

function deleteAll(){
    hooks.splice(0);
}
