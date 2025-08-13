let gameSequence=[];
let userSequence=[];
let highscore=0;

let btns=['red','yellow','green','blue'];

let start=false;
let level=0;
let h2=document.querySelector('h2');

document.addEventListener('keypress', function(){
    if(start==false){
        console.log('game started');
        start=true;
    }
    levelup();
    
})

function gameflash(btn){
    btn.classList.add('flash');

    setTimeout(function(){
        btn.classList.remove('flash');
    },500);
}

function userflash(btn){
    btn.classList.add('userflash');

    setTimeout(function(){
        btn.classList.remove('userflash');
    },200);
}

function levelup(){
    userSequence=[];

    level++;
    if(level>highscore){
        highscore=level;
    }
    
    h2.innerText='Level '+level;

    //random button flash
    let i=Math.floor(Math.random() *4 );

    let randcolor=btns[i];
    let btn=document.querySelector(`.${randcolor}`);
    gameSequence.push(randcolor);
    console.log(gameSequence);
    
    
    gameflash(btn);

}
let buttons=document.querySelectorAll('.btn');

for(let btn of buttons){
    btn.addEventListener('click', btnPress);
}

function check(i){
    
    if(userSequence[i] === gameSequence[i]){
        if(userSequence.length==gameSequence.length){
            setTimeout(levelup,1000);
        }
    }
    else{
         h2.innerHTML=`GAME OVER! Your Score : ${level} <br> High Score :${highscore} <br> Press any key to restart`;
         document.querySelector('body').style.backgroundColor='red';
         setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';
         },150);
         restart();
    }
}

function btnPress(){
    
    let btn=this;
    userflash(btn);

    usercolor=btn.getAttribute('id');
    userSequence.push(usercolor);
    
    check(userSequence.length-1);
}

function restart(){
    start=0;
    level=0;
    gameSequence=[];
    userSequence=[];
}