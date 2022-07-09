
class images{
    constructor({position , imageSrc, scale=1 , frameMax = 1, offset ={x:0, y:0}}){
        this.position = position
        this.image = new Image()
        this.height = 150
        this.width = 50
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.currentFrame = 0
        this.frameElasped = 0
        this.frameHold = 5
        this.offset = offset

    }

    draw(){
     c.drawImage(
        this.image,
        this.currentFrame * (this.image.width / this.frameMax),
        0,
        this.image.width / this.frameMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y- this.offset.y,
        (this.image.width * this.scale)/ this.frameMax,
        this.image.height * this.scale)
    }
    animate(){
        this.frameElasped++
        if(this.frameElasped % this.frameHold == 0){
        if(this.currentFrame<this.frameMax-1){
            this.currentFrame++
        }else{
            this.currentFrame=0
        }
    }
    }
    update(){
       
        this.draw()
        this.animate()

    }
}






class sprite extends images{
    constructor({position, velocity, color ,offset={x : 0, y: 0}, imageSrc, scale=1 , frameMax = 1, sprites,
    attackBox = {offset:{}, width : undefined,  height : undefined}}){
        super({
            position, 
            scale,
            imageSrc,
            frameMax,
            offset,
            sprites,
            
        })
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 150;
        this.lastKey
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            offset : attackBox.offset,
            height : attackBox.height,
            width : attackBox.width
        }
        this.color = color;
        this.isAttacking
        this.health = 100
        this.currentFrame = 0
        this.frameElasped = 0
        this.frameHold = 5
        this.sprites = sprites
        this.dead = false

        for(const images in this.sprites){
         sprites[images].image = new Image()
         sprites[images].image.src = sprites[images].imageSrc
        }
    }

    update(){
        this.draw();
        if(!this.dead) this.animate();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y


        // attackbox 
        // c.fillRect(this.attackBox.position.x , this.attackBox.position.y, this.attackBox.width, this.attackBox.height)



        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height-96){
            this.velocity.y = 0;
            this.position.y = 330
        }else{
            this.velocity.y += gravity;
        }

        if(this.position.y <= 0){
            this.position.y = 5
        }

 
        }
        attack(){
            this.switchSprite('attack1')
            this.isAttacking = true;
            
        }
        hit(){
            this.health -=20
            if(this.health<= 0){
                this.switchSprite('dead')
            }else{
                this.switchSprite('takeHit')
            }

        }

        switchSprite(images) {
            if(this.image == this.sprites.dead.image){
                if(this.currentFrame == this.sprites.dead.frameMax - 1)
                 this.dead = true
                return
            }
            if(this.image === this.sprites.attack1.image &&
                this.currentFrame < this.sprites.attack1.frameMax - 1) return
            if(this.image === this.sprites.takeHit.image &&
                this.currentFrame < this.sprites.takeHit.frameMax - 1) return 
            switch(images){
                case 'idle' :
             if(this.image !== this.sprites.idle.image){
               this.image = this.sprites.idle.image
               this.frameMax = this.sprites.idle.frameMax
               this.currentFrame = 0
             }
               break;
               case 'run' :
                if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.frameMax = this.sprites.run.frameMax
                this.currentFrame = 0
                }
                break;
                case 'jump' :
                if(this.image !== this.sprites.jump.image){
                this.image = this.sprites.jump.image
                this.frameMax = this.sprites.jump.frameMax
                this.currentFrame = 0
                }
                break
                case 'fall' :
                if(this.image !== this.sprites.fall.image){
                 this.image = this.sprites.fall.image
                this.frameMax = this.sprites.fall.frameMax
                this.currentFrame = 0
                }
                 break
                 case 'attack1' :
                if(this.image !== this.sprites.attack1.image){
                 this.image = this.sprites.attack1.image
                this.frameMax = this.sprites.attack1.frameMax
                this.currentFrame = 0
                }
                 break
                 case 'takeHit' :
                    if(this.image !== this.sprites.takeHit.image){
                     this.image = this.sprites.takeHit.image
                    this.frameMax = this.sprites.takeHit.frameMax
                    this.currentFrame = 0
                    }
                     break
                     case 'dead' :
                        if(this.image !== this.sprites.dead.image){
                         this.image = this.sprites.dead.image
                        this.frameMax = this.sprites.dead.frameMax
                        this.currentFrame = 0
                        }
                         break
        
        
            }
        }

    }

