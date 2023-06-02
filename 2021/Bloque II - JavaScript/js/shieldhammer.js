//PRIMERO ESCRIBO EL CONTADOR EN HTML DESDE JAVASCRIPT

let bloque=document.getElementById("bloque");
let paragraph=document.createElement("p");
paragraph.id="chrono";
bloque.appendChild(paragraph);

let letters=document.createTextNode("Time to clash weapons: ");
paragraph.appendChild(letters);

let s1=document.createElement("span");
s1.id="misegundos";
let l1=document.createTextNode("00");
s1.appendChild(l1);
paragraph.appendChild(s1);

let letters2=document.createTextNode(":");
paragraph.appendChild(letters2);

let s2=document.createElement("span");
s2.id="segundos";
let l2=document.createTextNode("00");
s2.appendChild(l2);
paragraph.appendChild(s2);

let style=document.createAttribute("style");
style.value="font: bold 18px Arial";
paragraph.setAttributeNode(style);



class Weapon {
    constructor(c2d,filename,l,t) {
        this.canvas2d = c2d;
        this.image = new Image();
        this.image.myparent = this;
        this.image.src = filename;
        this.image.onload = function () {
            let m = this.myparent;
            m.canvas2d.drawImage(this,l,t);
            m.width = this.naturalWidth;
        };
        this.left = l;
        this.top = t;
        this.width;
    };
    clear() {
        let l = this.left, t = this.top;
        let w = this.image.naturalWidth;
        let h = this.image.naturalHeight;
        this.canvas2d.clearRect(l,t,w,h);
    };
    move(n) { 
        this.left += n;
        let i = this.image;
        let l = this.left;
        let t = this.top;
        this.canvas2d.drawImage(i,l,t);
    };

};


let colors = ["cyan","green","gray","blue"];
let cIndex = 0;

let clash = {shield:undefined, mjolnir:undefined};
clash.timer = undefined;

clash.advancing = false;

let ms=document.getElementById("misegundos");
let s=document.getElementById("segundos");

let crono_m=0;
let crono_s=0;

let cambio=false;

let sh,mj;

var canvas = document.getElementById('scene');




clash.changeBackgroungColor = function () {
    const LEAP = 7;
    const LONG_PERIOD = 20;
    const SHORT_PERIOD = 1;
    let period;
    let sh = clash.shield, mj = clash.mjolnir;
    if (sh.left + 2 * sh.width > mj.left)
        period = SHORT_PERIOD;
    else
        period = LONG_PERIOD;
    if (sh.left % period === period - 1) {
        cIndex = (cIndex + LEAP) % colors.length;
        let bg = document.getElementById("battlefield");
        bg.style.backgroundColor = colors[cIndex];
    }
};

clash.advanceWeapons = function () {
    if (!cambio){
        const SHIELD_MOVE = 1;
        const MJOLNIR_MOVE = -2;
        clash.shield.clear();
        clash.mjolnir.clear();
        clash.shield.move(SHIELD_MOVE);
        clash.mjolnir.move(MJOLNIR_MOVE);
        sh = clash.shield, mj = clash.mjolnir;
        if (sh.left + sh.width / 2 > mj.left){
            clearInterval(clash.timer);
            clash.advancing=false;
        
        }
    }
    
    else if (sh.left<=0 && mj.left+mj.width>=canvas.width){
       
        sh.left=0;
        mj.left=canvas.width-mj.width;
    }
    

};

window.setInterval(function(){
    if (clash.advancing){
        if (crono_s==60){
            crono_s=0;
            crono_m++;
            ms.innerHTML=crono_m;
            if(crono_m==60) crono_m=0;
        }
            s.innerHTML=crono_s;
            crono_s++;
            
    }
    }
,30);

window.addEventListener("keydown",function(event){
    if (event.code=== "ArrowRight" && clash.advancing){
        cambio=true;
        HacerCambio();
    }

},true);

window.addEventListener("keyup",function(event){
    if (event.code=== "ArrowRight" && clash.advancing)
        cambio=false;
},true);
    


clash.animate = function () {
    if (clash.advancing){
        clash.advanceWeapons();   
    }
    clash.changeBackgroungColor();

    

};



clash.mouseOverOutCanvas = function () {
    clash.cv.onmouseover = function () {
        clash.advancing = true;
    };
    clash.cv.addEventListener("mouseout", function() {
        clash.advancing = false;
    
    });
    
};

clash.initWeapons = function () {
    clash.cv = document.getElementById("scene");
    let ctx = clash.cv.getContext("2d");
    let sh = "images/CaptainAmericaShield.png";
    clash.shield = new Weapon(ctx,sh,0,260);
    let mj = "images/ThorMjolnir.png";
    clash.mjolnir = new Weapon(ctx,mj,651,250);
};

function initBackground() {
    for (let i = 0 ; i < colors.length ; i += 3) {
        colors.splice(i,0,"light"+colors[i]);
        colors.splice(i+2,0,"dark"+colors[i+1]);
    } // colors === ["lightcyan","cyan","darkcyan","lightgreen","green","darkgreen"...
    let decIndex = Math.random() * colors.length;
    cIndex = Math.floor(decIndex);
    let bg=document.getElementById("battlefield");
    bg.style.backgroundColor = colors[cIndex];
};

function entryPoint() {
    initBackground();
    clash.initWeapons();
    clash.mouseOverOutCanvas();
  
    const T = 1000 / 50; // 20 ms
    
    clash.timer = setInterval(clash.animate,T);
    
};
function HacerCambio () {

    
    const SHIELD_CMOVE = -1;
    const MJOLNIR_CMOVE = 2;

   

    clash.shield.clear();
    clash.mjolnir.clear();
    clash.shield.move(SHIELD_CMOVE);
    clash.mjolnir.move(MJOLNIR_CMOVE);
   
};

// Entry point
window.onload = entryPoint;
