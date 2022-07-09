const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

c.fillStyle ='black';
c.fillRect(0 , 0 , canvas.width, canvas.height)
const gravity = 0.7;

const background = new images({
    position:{
        x:0,
        y:0
    },
    imageSrc : './img/background.png'
}
)

const shop = new images({
    position:{
        x:600,
        y:128
    },
    imageSrc : './img/shop.png',
    scale : 2.76,
    frameMax:6 
}
)


const player = new sprite({
    position :{
    x: 0 ,
    y : 0
},
velocity : 
{
    x: 0,
    y: 0
},
offset :{
    x : 0,
    y : 0
},
color : 'green',
imageSrc : './img/shadowhunter/Idle.png',
frameMax : 8,
scale:2.76,
offset:{
    x: 200,
    y: 188
},
sprites :{
    idle:{
        imageSrc : './img/shadowhunter/Idle.png',
        frameMax : 8  
    },
    run:{
        imageSrc : './img/shadowhunter/Run.png',
        frameMax : 8 
    },
    jump:{
        imageSrc : './img/shadowhunter/Jump.png',
        frameMax : 2
    },
    fall:{
        imageSrc : './img/shadowhunter/Fall.png', 
        frameMax : 2
    },
    attack1:{
        imageSrc : './img/shadowhunter/Attack2.png',
        frameMax: 6
    },
    takeHit:{
        imageSrc : './img/shadowhunter/Take Hit - white silhouette.png',
        frameMax : 4

    },
    dead:{
        imageSrc : './img/shadowhunter/Death.png',
        frameMax : 6

    }
},
attackBox :{
   offset: { x: 100,
    y: 50
   },
   width : 200,
   height : 50
},



})


const enemy = new sprite({
position:{
    x: 900,
    y: 100},
velocity:{
    x: 0,
    y: 0
},
offset:{
    x: -50,
    y: 0
},
color : 'blue',
imageSrc : './kenji/Idle.png',
frameMax : 4,
scale:2.76,
offset:{
    x: 200,
    y: 200
},
sprites :{
    idle:{
        imageSrc : './kenji/Idle.png',
        frameMax : 4  
    },
    run:{
        imageSrc : './kenji/Run.png',
        frameMax : 8 
    },
    jump:{
        imageSrc : './kenji/Jump.png',
        frameMax : 2
    },
    fall:{
        imageSrc : './kenji/Fall.png', 
        frameMax : 2
    },
    attack1:{
        imageSrc : './kenji/Attack1.png',
        frameMax: 4
    },
    takeHit:{
        imageSrc : './kenji/Take hit.png',
        frameMax: 3
    },
    dead:{
        imageSrc : './kenji/Death.png',
        frameMax: 7
    },
},
attackBox :{
    offset: { x: -150,
     y: 50
    },
    width : 200,
    height : 50
 },
})


const keys = {
    a:{
        pressed : false
    },
    d:{
        pressed : false
    },
    ArrowRight:{
        pressed : false
    },
    ArrowLeft:{
        pressed : false
    },
    w:{
        pressed : false
    }
}

checkTime()



function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update();
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0 , canvas.width , canvas.height)
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    // player movement
    player.switchSprite('idle')
    if(keys.a.pressed == true && player.lastKey == 'a'){
       player.switchSprite('run')
        player.velocity.x = -5
    }else if(keys.d.pressed == true && player.lastKey == 'd'){
        player.switchSprite('run')
        player.velocity.x = 5
    }
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }
    //enemy movement
    enemy.switchSprite('idle')
    if(keys.ArrowRight.pressed == true && enemy.lastKey == 'ArrowRight'){
       enemy.velocity.x = 5
       enemy.switchSprite('run')
    }else if(keys.ArrowLeft.pressed == true && enemy.lastKey == 'ArrowLeft'){
       enemy.velocity.x = -5
       enemy.switchSprite('run')
    }
    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }
    if(collison({
        rectangle1: player,
        rectangle2 : enemy
    }) && player.isAttacking && player.currentFrame == 4){
       enemy.hit()
        player.isAttacking = false;
       
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

     if(player.isAttacking && player.currentFrame == 4){
        player.isAttacking = false
     }

    if(collison({
        rectangle1: enemy,
        rectangle2 : player
    }) && enemy.isAttacking &&
    enemy.currentFrame == 2){
        player.hit()
        enemy.isAttacking = false;
        
        document.querySelector('#playerHealth').style.width = player.health + '%'
        
    }
    if(enemy.isAttacking && enemy.currentFrame == 2){
        enemy.isAttacking = false
     }
    if(player.health <= 0 || enemy.health <=0)
    checkWinner({player , enemy , timer})

}
animate();



window.addEventListener('keydown', () => {
   if(!player.dead){
    switch(event.key){
    case 'a' :
        keys.a.pressed = true
        player.lastKey = 'a'
        break

    case 'd' :
        keys.d.pressed = true
        player.lastKey = 'd'
        break
    case 'w' :
        keys.w.pressed = true
        player.velocity.y = -20
        break
    case ' ' :
        player.attack() 
        
        break
   }
}
   if(!enemy.dead){
   switch(event.key){
    case 'ArrowDown' :
        enemy.attack()
        break
    case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
    
    case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
    case 'ArrowUp' :
            keys.w.pressed = true
            enemy.velocity.y = -20
            break
   }
   }
}

)
window.addEventListener('keyup', () => {
    switch(event.key){
     case 'a' :
         keys.a.pressed = false
         break
 
     case 'd' :
         keys.d.pressed = false
         break
    case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break
    
    case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            break         
    }
 
 })