function checkWinner({player , enemy , timer}){
    clearTimeout(timer)
    document.querySelector('#text').style.display = 'flex';
    if(player.health === enemy.health){
        document.querySelector('#text').innerHTML = 'Tie'
    }
    else if(player.health > enemy.health){
        document.querySelector('#text').innerHTML = 'Player 1 wins'
    }
    else if(player.health < enemy.health){
        document.querySelector('#text').innerHTML = 'Player 2 wins'
    }
}
let time = 60
let timer
function checkTime(){
      if(time > 0){
        time--
        timer = setTimeout(checkTime, 1000)
        document.querySelector('.timer').innerHTML = time
      }
      if(time == 0){
        checkWinner({player , enemy})
       
      }


}
function collison({rectangle1 , rectangle2}){
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}