var myGamePiece = new Array();
var happySrc = "images/smiley.gif";
var sadSrc = "images/angry.gif";
var maxDist = 30; // Ajustado la distancia de colisión a un valor adecuado

var myGameArea = {
  timer: 0,
  running: true,
  intervalId: null,
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.context.font = "12px serif";
    
    // Evitar duplicar el canvas si se presiona el botón múltiples veces
    if (!document.body.contains(this.canvas)) {
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
    
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function flatlander(width, height, x, y, isHappy) {
  this.image = new Image();
  this.isHappy = isHappy;
  if (isHappy) {
    this.happyPoints = 1;
    this.image.src = happySrc;
  } else {
    this.happyPoints = -1;
    this.image.src = sadSrc;
  }
  this.width = width;
  this.height = height;
  this.speedX = (Math.random() - 0.5) * 4;
  this.speedY = (Math.random() - 0.5) * 4;
  this.x = x;
  this.y = y;
  
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fillText(this.happyPoints, this.x, this.y - 5);
  };
  
  this.newPos = function (canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebote horizontal
    if (this.x + this.width >= canvasWidth) {
      this.x = canvasWidth - this.width;
      this.speedX = -this.speedX;
    } else if (this.x <= 0) {
      this.x = 0;
      this.speedX = -this.speedX;
    }

    // Rebote vertical
    if (this.y + this.height >= canvasHeight) {
      this.y = canvasHeight - this.height;
      this.speedY = -this.speedY;
    } else if (this.y <= 0) {
      this.y = 0;
      this.speedY = -this.speedY;
    }
  };

  this.moreHappy = function () {
    this.happyPoints++;
    if (this.happyPoints >= 0 && !this.isHappy) {
      this.isHappy = true;
      this.image.src = happySrc;
    }
  };

  this.lessHappy = function () {
    this.happyPoints--;
    if (this.happyPoints < 0 && this.isHappy) {
      this.isHappy = false;
      this.image.src = sadSrc;
    }
  };

  this.checkSurroundings = function (other) {
    var x = Math.pow(this.x - other.x, 2);
    var y = Math.pow(this.y - other.y, 2);
    return Math.sqrt(x + y);
  };
}

function startGame() {
  myGamePiece = [];
  myGameArea.timer = 0;
  myGameArea.running = true;

  var n = parseInt(document.getElementById("num").value, 10);
  var m = parseInt(document.getElementById("sad").value, 10);

  if (isNaN(n) || isNaN(m) || n <= 0) {
    window.alert("Please enter valid numbers.");
    return;
  }

  if (m > n) {
    window.alert("Can not have more sad than individuals.");
    return;
  }

  var createdSad = 0;
  for (var i = 0; i < n; i++) {
    var nX = Math.random() * (800 - 30);
    var nY = Math.random() * (600 - 30);
    
    // Crear primero los m individuos tristes, el resto felices
    var isSad = createdSad < m;
    if (isSad) createdSad++;

    var gamePiece = new flatlander(30, 30, nX, nY, !isSad);
    myGamePiece.push(gamePiece);
  }
  
  myGameArea.start();
}

function updateGameArea() {
  if (myGameArea.running) {
    myGameArea.clear();
    for (var i = 0; i < myGamePiece.length; i++) {
      myGamePiece[i].newPos(myGameArea.canvas.width, myGameArea.canvas.height);
      myGamePiece[i].update();
    }
    
    var tmpFocus, d;
    var happy = 0;
    var sad = 0;
    
    for (var i = 0; i < myGamePiece.length; i++) {
      tmpFocus = myGamePiece[i];
      for (var j = i + 1; j < myGamePiece.length; j++) {
        d = tmpFocus.checkSurroundings(myGamePiece[j]);
        if (d < maxDist) {
          // Si entra en contacto con otro sujeto, ambos se afectan mutuamente
          if (myGamePiece[j].isHappy) {
            tmpFocus.moreHappy();
          } else {
            tmpFocus.lessHappy();
          }

          if (tmpFocus.isHappy) {
            myGamePiece[j].moreHappy();
          } else {
            myGamePiece[j].lessHappy();
          }
        }
      }
      
      if (tmpFocus.isHappy) {
        happy++;
      } else {
        sad++;
      }
    }
    
    myGameArea.timer++;
    document.getElementById("happyIndividuals").textContent = "Happy: " + happy;
    document.getElementById("sadIndividuals").textContent = "Sad: " + sad;

    if (happy === 0 || sad === 0) {
      var msg;
      myGameArea.running = false;
      if (happy === 0) msg = "Absolute sadness.... SAD!";
      else msg = "Absolute happiness reached.... Hurray!!";
      document.getElementById("timer").textContent =
        "Time: " + myGameArea.timer + "       " + msg;
    } else {
      document.getElementById("timer").textContent = "Time: " + myGameArea.timer;
    }
  }
}