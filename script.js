pause = false;
var mobKills = Number(localStorage.getItem("mobkills"));
var shitbox = document.getElementById("shitbox");
if (Number(localStorage.getItem("coins")) == null) {
  localStorage.setItem("coins", 0);
}
if (Number(localStorage.getItem("mobkills")) == null) {
  localStorage.setItem("mobkills", 0);
  mobKills = Number(0);

}
document.getElementById("mobkillint").innerHTML = mobKills;
function onStart() {

}

var xbutton = document.getElementById("xbutton");
xbutton.addEventListener("click", function(){
  localStorage.clear();
  alert("RESETTED ALL STATS!");
  window.open(window.location.href, "_self");

})

localStorage.setItem("attacklvl", 121);
localStorage.setItem("speedlvl",50000);
if (localStorage.getItem("attacklvl") == null || Number(localStorage.getItem("attacklvl") == 0) || Number(localStorage.getItem("attacklvl") > 3)) {
  localStorage.setItem("attacklvl", 1);
  localStorage.setItem("attackcost", 50);
  localStorage.setItem("attack", 25);
}
if (localStorage.getItem("speedlvl") == null || Number(localStorage.getItem("speedlvl") == 0) || Number(localStorage.getItem("speedlvl") > 3)) {
  localStorage.setItem("speedlvl", 1);
  localStorage.setItem("speedcost", 300);
  localStorage.setItem("moveSpeed", 5)
}

var attack = localStorage.getItem("attack");
var shop = document.getElementById("shop");
shop.style.visibility = "hidden";
var hitbox = false;
document.addEventListener("keydown", function(event) {
  if(dead && event.key.toLowerCase() === "r"){
    let mobs = document.querySelectorAll('.mob1');
    let meds = document.querySelectorAll('.med');
    health = 100;
    document.getElementById("healthint").innerHTML = health;
    pause = false;
    dead = false;
    gameOver.style.visibility = "hidden";
    mobs.forEach(mob => {

      mob.remove();
    });
    meds.forEach(med => {

      med.remove();
    });
  }

  if(event.key.toLowerCase() === "c"){
    if (hitbox == false){
      tip.style.backgroundColor ='red';
      shitbox.style.border = '2px solid red';
      hitbox = true;
      
    }
    else{
      shitbox.style.border ='0px solid red';
      tip.style.backgroundColor = '';
      hitbox = false;
    }
  }
  if(!dead){
  if (event.key.toLowerCase() === "b") {
    if (shop.style.visibility == "hidden") {
      showShop();
      pause = true;
    }
    else {
      hideShop();
      pause = false;
    }
  }
  if (event.key.toLowerCase() === "p") {
    if (pause == false) {
      pause = true
    }
    else {
      pause = false
    }

  }
  }
});

var tip = document.getElementById("tip");

function showShop() {
  shop.classList.remove("closeanim");
  shop.style.visibility = "visible";
  shop.classList.add("shopanim");
  var showw = setTimeout(function() { shop.classList.remove("shopanim") }, 1000)


  shop.contentWindow.document.getElementById("infoone").innerHTML = "LVL: " + Number(localStorage.getItem("attacklvl"));
  shop.contentWindow.document.getElementById("priceone").innerHTML = "$" + Number(localStorage.getItem("attackcost"));
  if (Number(localStorage.getItem("attacklvl")) == 3) {
    shop.contentWindow.document.getElementById("priceone").innerHTML = "More Levels Soon";
  }
  shop.contentWindow.document.getElementById("pricethree").innerHTML = "Not added"

shop.contentWindow.document.getElementById("infotwo").innerHTML = "LVL: " + Number(localStorage.getItem("speedlvl"));
  shop.contentWindow.document.getElementById("pricetwo").innerHTML = "$" + Number(localStorage.getItem("speedcost"));
  shop.contentWindow.document.getElementById("infothree").innerHTML = "Not Added"
  if (Number(localStorage.getItem("speedlvl")) == 3) {
    
    shop.contentWindow.document.getElementById("pricetwo").innerHTML = "More Levels Soon";
  }
}

function hideShop() {
  shop.classList.add("closeanim");
  setTimeout(function() {
    shop.style.visibility = "hidden";
    shop.classList.remove("closeanim");
  }, 1000);
}

var player = document.getElementById("player");
var playercontainer = document.getElementById("playercontainer");
var playerHitbox = player.getBoundingClientRect();

var playerX = playerHitbox.left;
var playerY = playerHitbox.top;
playerX = window.innerWidth / 2;
playerY = window.innerHeight / 2;
var gameOver = document.getElementById("gameover");
gameOver.style.visibility = "hidden";

function centerDiv() {

  player.style.top = Math.max((window.innerHeight - player.clientHeight) / 2, 0) + 'px';
  player.style.left = Math.max((window.innerWidth - player.clientWidth) / 2, 0) + 'px';
  gameOver.style.top = Math.max((window.innerHeight - player.clisentHeight) / 2, 0) + 'px';
  gameOver.style.left = Math.max((window.innerWidth - player.clientWidth+160) / 2, 0) + 'px';
  requestAnimationFrame(centerDiv);
}

// Initial centering
centerDiv();
function showGameOver(){
  gameOver.style.visibility = "visible";
  gameOver.classList.add("gameover");
  setTimeout(function() {
    gameOver.classList.remove("gameover");
  }, 1000);
}
var mobCount = 0;

var background = document.getElementById("background");
var backgroundHitBox = background.getBoundingClientRect();
var backgroundX = backgroundHitBox.left;
var backgroundY = backgroundHitBox.top;

if (localStorage.getItem("moveSpeed") == null) {
  localStorage.setItem("moveSpeed", 5)
}
var moveSpeed = Number(localStorage.getItem("moveSpeed"));
var diagonalmoveSpeed = Number(moveSpeed / Math.sqrt(2));

if (localStorage.getItem("diagonalmoveSpeed") == null) {
  localStorage.setItem("diagonalmoveSpeed", moveSpeed / Math.sqrt(2))
}


let mobs = document.querySelectorAll('.mob1');
let meds = document.querySelectorAll('.med');
const keys = {};
var dead = false;

var coins = Number(localStorage.getItem("coins"));
document.getElementById("coindisplay").innerHTML = "Coins:" + coins;


if (localStorage.getItem("health") == null) {
  localStorage.setItem("health", 100)
}
health = localStorage.getItem("health")
swinging = true
function backgroundmove() {
  if (!pause) {
    background.style.left = backgroundX + "px";
    background.style.top = backgroundY + "px";
    backgroundHitBox = background.getBoundingClientRect();
  }
}
function handleTouchDown(event) {
  keys[event.key.toLowerCase()] = true;
}
function handleTouchUp(event) {
  keys[event.key.toLowerCase()] = false;
}

function moveSword() {
  moveSpeed = localStorage.getItem("moveSpeed");
  diagonalmoveSpeed = Number(moveSpeed / Math.sqrt(2));
  if (!pause) {
    mobs = document.querySelectorAll('.mob1');
    meds = document.querySelectorAll('.med');
    if (keys['d'] && keys['w']) {
      backgroundX -= diagonalmoveSpeed;
      backgroundY += diagonalmoveSpeed;
      mobs.forEach(mob => {

        var mobX = mob.getBoundingClientRect().left;
        var mobY = mob.getBoundingClientRect().top;
        mobX -= diagonalmoveSpeed;
        mobY += diagonalmoveSpeed;
        mob.style.top = mobY + "px";
        mob.style.left = mobX + "px";
      });
      meds.forEach(med => {

        var medX = med.getBoundingClientRect().left;
        var medY = med.getBoundingClientRect().top;
        medX -= diagonalmoveSpeed;
        medY += diagonalmoveSpeed;
        med.style.top = medY + "px";
        med.style.left = medX + "px";
      });
    }
    else if (keys['d'] && keys['s']) {
      backgroundX -= diagonalmoveSpeed;
      backgroundY -= diagonalmoveSpeed;
      mobs.forEach(mob => {

        var mobX = mob.getBoundingClientRect().left;
        var mobY = mob.getBoundingClientRect().top;
        mobX -= diagonalmoveSpeed;
        mobY -= diagonalmoveSpeed;
        mob.style.top = mobY + "px";
        mob.style.left = mobX + "px";
      });
      meds.forEach(med => {

        var medX = med.getBoundingClientRect().left;
        var medY = med.getBoundingClientRect().top;
        medX -= diagonalmoveSpeed;
        medY -= diagonalmoveSpeed;
        med.style.top = medY + "px";
        med.style.left = medX + "px";
      });
    }
    else if (keys['a'] && keys['s']) {
      backgroundX += diagonalmoveSpeed;
      backgroundY -= diagonalmoveSpeed;
      mobs.forEach(mob => {

        var mobX = mob.getBoundingClientRect().left;
        var mobY = mob.getBoundingClientRect().top;
        mobX += diagonalmoveSpeed;
        mobY -= diagonalmoveSpeed;
        mob.style.top = mobY + "px";
        mob.style.left = mobX + "px";
      });
      meds.forEach(med => {

        var medX = med.getBoundingClientRect().left;
        var medY = med.getBoundingClientRect().top;
        medX += diagonalmoveSpeed;
        medY -= diagonalmoveSpeed;
        med.style.top = medY + "px";
        med.style.left = medX + "px";
      });
    }
    else if (keys['a'] && keys['w']) {
      backgroundX += diagonalmoveSpeed;
      backgroundY += diagonalmoveSpeed;
      mobs.forEach(mob => {

        var mobX = mob.getBoundingClientRect().left;
        var mobY = mob.getBoundingClientRect().top;
        mobX += diagonalmoveSpeed;
        mobY += diagonalmoveSpeed;
        mob.style.top = mobY + "px";
        mob.style.left = mobX + "px";
      });
      meds.forEach(med => {

        var medX = med.getBoundingClientRect().left;
        var medY = med.getBoundingClientRect().top;
        medX += diagonalmoveSpeed;
        medY += diagonalmoveSpeed;
        med.style.top = medY + "px";
        med.style.left = medX + "px";
      });
    }

    else if (keys['w']) {
      backgroundY -= -moveSpeed;
      mobs.forEach(mob => {


        var mobY = mob.getBoundingClientRect().top;
        mobY += diagonalmoveSpeed;
        mob.style.top = mobY + "px";

      });
      meds.forEach(med => {


        var medY = med.getBoundingClientRect().top;
        medY -= -moveSpeed;
        med.style.top = medY + "px";

      });
    }
    else if (keys['a']) {
      backgroundX -= -moveSpeed;
      mobs.forEach(mob => {

        var mobX = mob.getBoundingClientRect().left;

        mobX += diagonalmoveSpeed;
        mob.style.left = mobX + "px";
      });
      meds.forEach(med => {

        var medX = med.getBoundingClientRect().left;

        medX -= -moveSpeed;
        med.style.left = medX + "px";
      });
    }
    else if (keys['s']) {
      backgroundY -= moveSpeed;
      mobs.forEach(mob => {


        var mobY = mob.getBoundingClientRect().top;
        mobY -= diagonalmoveSpeed;
        mob.style.top = mobY + "px";

      });
      meds.forEach(med => {


        var medY = med.getBoundingClientRect().top;
        medY -= moveSpeed;
        med.style.top = medY + "px";

      });
    }
    else if (keys['d']) {
      backgroundX -= moveSpeed;
      mobs.forEach(mob => {

        var mobX = mob.getBoundingClientRect().left;

        mobX -= diagonalmoveSpeed;
        mob.style.left = mobX + "px";
      });
      meds.forEach(med => {

        var medX = med.getBoundingClientRect().left;

        medX -= moveSpeed;
        med.style.left = medX + "px";
      });
    }

  }


  document.getElementById("coindisplay").innerHTML = "Coins:" + coins;

  backgroundmove();
  /*mobs.forEach(mob => {
    let mobBoundingRect = mob.getBoundingClientRect();
    let mobCenter = {
      x: mobBoundingRect.left + mobBoundingRect.width / 2,
      y: mobBoundingRect.top + mobBoundingRect.height / 2
    };

    let angle = Math.atan2(playerX - mobCenter.x, - (playerY - mobCenter.y)) * (180 / Math.PI);
    mob.style.transform = `rotate(${angle}deg)`;

  });*/

  requestAnimationFrame(moveSword);

}

window.addEventListener("keydown", handleTouchDown);
window.addEventListener("keyup", handleTouchUp)
moveSword();



let boxCenter = {
  x: window.innerWidth/2,
  y: window.innerHeight/2
};

document.addEventListener("mousemove", e => {
  if (!pause) {
    let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y)) * (180 / Math.PI);
    player.style.transform = `rotate(${angle}deg)`;
  }
})


class Mob {
  constructor(name, maxHealth, health, damageCooldown) {
    this.dead = false;
    this.maxHealth = maxHealth;
    this.health = health; // Initialize health to maximum health
    this.element = document.createElement('div');
    this.damageCooldown = false;
    this.innerHTML = 100;
  }
}

setInterval(createMob, 1000);
if (!pause) {
  updateMobsPosition();
}
function createMob() {
  if (!pause) {
    const mob = new Mob("Mob", 100, 100, false);

    mob.innerHTML = 100;

    var random = Math.floor(Math.random() * 15);
    if (random == 2){
      mob.element.classList.add("med");
    }
    else{
      mob.element.classList.add("mob1");
    }
    
    
    mob.element.id = `mob${mobCount}`;


    let randomX, randomY;
    const margin = 100; // Adjust this value as needed
    const x = Math.random() * (window.innerWidth + 2 * margin) - margin;
    const y = Math.random() * (window.innerHeight + 2 * margin) - margin;
    randomY = y;
    randomX = x;
    mob.element.style.top = `${randomY}px`;
    mob.element.style.left = `${randomX}px`;


    // Add the mob to the document body
    document.body.appendChild(mob.element);

    mobCount++;
  }
}

function updateMobsPosition() {

  let mobs = document.querySelectorAll('.mob1');

  mobs.forEach(mob => {
    moveTowards(mob, playerX, playerY);

  });
  

  requestAnimationFrame(updateMobsPosition);


}
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}


function moveTowards(obj, playerX, playerY) {
  if (!pause) {
    const objStyle = window.getComputedStyle(obj);
    const objX = parseFloat(objStyle.getPropertyValue("left"));
    const objY = parseFloat(objStyle.getPropertyValue("top"));

    const deltaX = playerX - objX;
    const deltaY = playerY - objY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > 0.75) { // Adjust the speed as needed
      const ratio = 0.75 / distance;
      const moveX = deltaX * ratio;
      const moveY = deltaY * ratio;

      obj.style.left = objX + moveX + "px";
      obj.style.top = objY + moveY + "px";
    }
  }
}

document.onclick = function() {
  if (!pause) {
    swinging = true
    if (!shitbox.classList.contains("swinganim")) {
      shitbox.classList.add("swinganim");
    }
    if (!playercontainer.classList.contains("swinganim")) {
      playercontainer.classList.add("swinganim");
      if (!tip.classList.contains("swinganim2")) {
        tip.classList.add("swinganim2")
      }
      setTimeout(function() { playercontainer.classList.remove("swinganim"); tip.classList.remove("swinganim2"); shitbox.classList.remove("swinganim") }, 1000);

      mobs = document.querySelectorAll('.mob1');
      

      mobs.forEach(mob => {
        if (damage(tip, mob)) {
          attack = localStorage.getItem("attack");
          if (!mob.damageCooldown) {
            mob.damageCooldown = false;
          }
          if (!mob.damageCooldown) {

            attack = localStorage.getItem("attack");
            console.log(mob.innerHTML)
            mob.innerHTML = mob.innerHTML - attack;


            mob.damageCooldown = true;
            setTimeout(() => {
              mob.damageCooldown = false;
            }, 1000);

            if (mob.innerHTML <= 0) {
              mobKills+=1;
              localStorage.setItem("mobkills",mobKills);
              document.getElementById("mobkillint").innerHTML = mobKills;
              coins += 2;
              document.getElementById("coindisplay").innerHTML = "Coins:" + coins;
              localStorage.setItem("coins", coins);
              var killsound = new Audio("8-bit-fireball-81148.mp3");
              killsound.play();
              mob.remove();
              mobCount--;
            }
            mob.innerHTML = mob.innerHTML - attack;
          }
        }
      });

    }
  }
}

function checkSwinging() {
  if (swinging) {
    mobs.forEach(mob => {
      if (damage(shitbox, mob)) {
        health -= 5;
        var hitsound = new Audio("hitsound.mp3");
        hitsound.play();
        document.getElementById("healthint").innerHTML = health;

        if (health < 1) {
          pause = true;
          dead = true;
          showGameOver();

        }
      }
    });
    meds.forEach(med =>{
      if (damage(shitbox, med)) {
        if(health<=90){
          health += 10;
          med.remove()
        }
        else if (health!=100){
          health= 100;
          med.remove()
        }
        
        
        var healsound = new Audio("healsound.mp3");
        healsound.play();
        document.getElementById("healthint").innerHTML = health; 

      }
    })
  }
}

// Run the checkSwinging function every 100 milliseconds
setInterval(checkSwinging, 1000);


function buyAttack() {

  attack = Number(localStorage.getItem("attack"));
  coins = Number(localStorage.getItem("coins"));
  if (coins >= localStorage.getItem("attackcost") && localStorage.getItem("attacklvl") < 3) {
    coins = coins - localStorage.getItem("attackcost");
    
    localStorage.setItem("coins", coins);
    attack += 15;
    
    localStorage.setItem("attack", attack);
    alert("You upgraded your Attack Damage! You spent " + localStorage.getItem("speedcost") + " coins.");


    localStorage.setItem("attacklvl", Number(localStorage.getItem("attacklvl")) + 1);

    localStorage.setItem("attackcost", Number(localStorage.getItem("attackcost")) * 2);
    document.getElementById("priceone").innerHTML = "$" + Number(localStorage.getItem("attackcost"));
    if (localStorage.getItem("attacklvl") == 3) {
      document.getElementById("infoone").innerHTML = "MAX";
    }
    else {
      document.getElementById("infoone").innerHTML = "LVL: " + Number(localStorage.getItem("attacklvl"));
    }
  }
}
function buySpeed() {
  moveSpeed = Number(localStorage.getItem("moveSpeed"));
  coins = Number(localStorage.getItem("coins"));
  if (coins >= localStorage.getItem("speedcost") && localStorage.getItem("speedlvl") < 3) {
    coins = coins - localStorage.getItem("speedcost");
    
    localStorage.setItem("coins", coins);
    
    moveSpeed = moveSpeed + 1;
    localStorage.setItem("moveSpeed", moveSpeed);
    diagonalmoveSpeed = Number(moveSpeed / Math.sqrt(2));
    alert("You upgraded your Move Speed! You spent " + localStorage.getItem("speedcost") + " coins.");


    localStorage.setItem("speedlvl", Number(localStorage.getItem("speedlvl")) + 1);

    localStorage.setItem("speedcost", Number(localStorage.getItem("speedcost")) * 4);
    document.getElementById("pricetwo").innerHTML = "$" + Number(localStorage.getItem("speedcost"));
    if (localStorage.getItem("speedlvl") == 3) {
      document.getElementById("infotwo").innerHTML = "MAX";
    }
    else {
      document.getElementById("infotwo").innerHTML = "LVL: " + Number(localStorage.getItem("speedlvl"));
    }
  }
}
function damage(player, mob) {
  if (!pause) {

    if (dead == false) {

      if (mob != null) {
        hitbox1 = player.getBoundingClientRect();
        hitbox2 = mob.getBoundingClientRect();
        return !(
          hitbox1.top > hitbox2.bottom ||
          hitbox1.right < hitbox2.left ||
          hitbox1.bottom < hitbox2.top ||
          hitbox1.left > hitbox2.right
        );
      }
    }
  }
}