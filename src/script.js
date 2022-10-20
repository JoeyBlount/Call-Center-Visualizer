let modal = document.querySelector(".modal-wrapper");
let btn = document.querySelector("button");
let close_btn = document.querySelector(".modal-close");
btn.addEventListener("click", display);
function display() {
  modal.style.display = "block";
  btn.style.display = "none";
  isBtn = false;
  gaps();
}
//  when the user clicks on X button,close the modal
close_btn.addEventListener("click", hide);
// when user clicks anywhere outside the modal, close modal
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    btn.style.display = "block";
    isBtn = true;
  }
});
function hide() {
  modal.style.display = "none";
  btn.style.display = "block";
  isBtn = true;
}
let detail = document.querySelector(".detail-wrapper");
let close1_btn = document.querySelector(".detail-close");
function display1() {
  if (isStable) {
    detail.style.display = "block";
  }
}
close1_btn.addEventListener("click", hide1);
function hide1() {
  detail.style.display = "none";
}

var off; //number of agents offline
var s1; //number of agents available
var s2; //number of agents on a call
var s3; //number of agents on worksheet
var s4; //number of agents on preview task
const c = document.getElementById("myCanvas");
var width = (c.width = window.innerWidth);
var height = (c.height = window.innerHeight);
const ctx = c.getContext("2d");
var agents = []; //stores the agents
var agentsXY = []; //stores relative position on grid
const nCap = 700; //number of max agents
var rad;
var gap1;
var gap2;
var ids = [];
var demostate = 0;
var displayId = 0;
var currentId;
var currentIndex = 0;
var isStable;
var isBtn = true;

function getMousePos(e) {
  var rect = c.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}
function myFunction(e) {
  var x = e.clientX;
  var y = e.clientY;
  var pos = getMousePos(e);
  var statusText = " ";
  isStable = showId(pos, 0);
  if (isStable) {
    if (currentId != null) {
      if (isStable) {
        ctx.strokeStyle = "red";
        ctx.font = "30px Veranda";
        ctx.strokeText(
          agents[currentIndex].id,
          agents[currentIndex].X,
          agents[currentIndex].Y
        );
      }
      document.getElementById("AgId").innerHTML = currentId;
      document.getElementById("AgEm").innerHTML = "DmitryS@gmail.com";
      switch (agents[currentIndex].state) {
        case 1:
          statusText = "Available";
          break;
        case 2:
          statusText = "VoiceCall";
          break;
        case 3:
          statusText = "Worksheet";
          break;
        case 4:
          statusText = "Preview Task";
          break;
        case 0:
          statusText = "Offline";
          break;
      }
      document.getElementById("AgSt").innerHTML = statusText;
    }
  } else {
    clearId();
  }
}
function clearId() {
  document.getElementById("demo").innerHTML = " ";
}
function showId(p, index) {
  var show;
  for (var i = 0; i < ids.length; i++) {
    show = isMouseIn(p, agents[i]);
    if (show == true) {
      currentIndex = i;
      return show;
    }
  }
  return false;
}
function isMouseIn(pos, circ) {
  function pythag(a, b) {
    var newA = a ** 2;
    var newB = b ** 2;
    var c = newA + newB;
    return Math.sqrt(c);
  }
  var tempx = Math.abs(pos.x - circ.X);
  var tempy = Math.abs(pos.y - circ.Y);
  var newR = pythag(tempx, tempy);
  if (newR <= circ.rad) {
    currentId = circ.id;
    return true;
  }
  return false;
}

//background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);

class circle {
  constructor(X, Y, rad) {
    this.X = X; //position
    this.Y = Y; //position
    this.rad = rad; //radius
    this.color = null;
    this.id = null; //agent id
    this.state = null; //agent state
    this.isMouseIn = false;
  }
  clear() {
    ctx.clearRect(
      this.X - this.rad - gap1,
      this.Y - this.rad - gap2,
      this.X + this.rad + gap1,
      this.Y + this.rad + gap2
    );
  }
  circUp(x, y, rad) {
    this.X = x;
    this.Y = y;
    this.rad = rad;
  }
  online(id) {
    this.id = id;
    this.stateChange(1);
  }
  setGrid(gP) {
    this.gridP = gP;
  }
  stateChange(code) {
    this.state = code;
    switch (this.state) {
      case 0:
        this.color = "cornflowerblue";
        off++;
        break;
      case 1:
        this.color = "cyan";
        s1++;
        break;
      case 2:
        this.color = "mediumblue";
        s2++;
        break;
      case 3:
        this.color = "blue";
        s3++;
        break;
      case 4:
        this.color = "midnightblue";
        s4++;
        break;
      default:
        this.color = "#1f1f1f";
    }
    this.update();
  }
  update() {
    this.clear();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.X, this.Y, this.rad, degToRad(0), degToRad(360));
    ctx.fill();
    if ((displayId == 1) & (this.id != null)) {
      ctx.strokeStyle = "white";
      ctx.strokeText(this.id, this.X, this.Y);
    }
    if (isStable) {
      ctx.strokeStyle = "red";
      ctx.font = "30px Veranda";
      ctx.strokeText(
        agents[currentIndex].id,
        agents[currentIndex].X,
        agents[currentIndex].Y
      );
    }
  }
}
function createAgent(x, y, r) {
  agents.push(new circle(x, y, r));
}
function random(n) {
  return Math.floor(Math.random() * n);
}
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function reset() {
  //resets all variables
  width = c.width = window.innerWidth - 40;
  if (isBtn) {
    height = c.height = window.innerHeight - 65;
  } else {
    height = c.height = window.innerHeight - 50;
  }
  gap1 = 1;
  gap2 = 1;
  off = 0;
  s1 = 0;
  s2 = 0;
  s3 = 0;
  s4 = 0;
}
var nRows = 1;
var nCols = 1;
const buffer = 10;
function gaps() {
  //creates the size for each agent
  reset();
  var rad1;
  var rad2;
  if (ids.length + 1 > nRows * nCols) {
    if (agents.length < nCap) {
      if (nCols > (nRows * width) / height) {
        nRows++;
      } else {
        nCols++;
      }
    }
  }
  rad1 = (width - gap1 * (nCols + 1) - buffer) / nCols / 2;
  rad2 = (height - gap2 * (nRows + 1) - buffer) / nRows / 2;
  //to determine which radius will fit both directions
  if (rad1 > rad2) {
    rad = rad2;
    gap1 = (width - buffer - nCols * 2 * rad) / (nCols - 1);
  } else {
    rad = rad1;
    gap2 = (height - buffer - nRows * 2 * rad) / (nRows - 1);
  }
  gapsUpdate();
}
function gapsUpdate() {
  //creates the location for each agent
  var m = rad + buffer / 2;
  for (var p = 0; p < nRows; p++) {
    var n = rad + buffer / 2;
    for (var i = 0; i < nCols; i++) {
      var newGrid = gridSpot(i, p);
      if (agents.length < nCols * nRows) {
        createAgent(n, m, rad);
      }
      if (agentsXY.includes(newGrid) == false) {
        agentsXY.push(newGrid);
        agents[agentsXY.length - 1].setGrid(newGrid);
      }
      agents[agentsXY.indexOf(newGrid)].circUp(n, m, rad);
      n += 2 * rad + gap1;
    }
    m += 2 * rad + gap2;
  }
}
function gridSpot(x, y) {
  var newSpot;
  var cols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "AA",
    "AB",
    "AC",
    "AD",
    "AE",
    "AF",
    "AG",
    "AH",
    "AI",
    "AJ",
    "AK",
    "AL",
    "AM",
    "AN",
    "AO",
    "AP",
    "AQ",
    "AR",
    "AS",
    "AT",
    "AU",
    "AV",
    "AW",
    "AX",
    "AY",
    "AZ",
  ];
  if (x < cols.length) {
    newSpot = cols[x] + y;
  }
  return newSpot;
}

gaps();
function assignAgent() {
  //assigns an id to an empty agent
  var id;
  if (ids.length < nCap) {
    do {
      id = random(nCap);
    } while (ids.includes(id));
    ids.push(id);
    agents[ids.length - 1].online(id);
  }
}
function test() {
  gaps();
  for (var i = 0; i < ids.length; i++) {
    agents[i].update();
  }
  if (demostate == 1) {
    for (var i = 0; i < agents.length; i++) {
      if (agents[i].state == null) {
        //if there is no id, it remains unchanging
        agents[i].stateChange(null);
      } else {
        //if there is an id, it changes accordingly
        agents[i].stateChange(random(5));
      }
    }
    assignAgent();
    //real time state of agent counter
    document.getElementById("offline").innerHTML = off;
    document.getElementById("s0").innerHTML = s1;
    document.getElementById("s1").innerHTML = s2;
    document.getElementById("s2").innerHTML = s3;
    document.getElementById("s3").innerHTML = s4;
    document.getElementById("agents").innerHTML = off + s1 + s2 + s3 + s4;
  }
}
setInterval(test, 250); //speed/rate
function startDemo() {
  if (demostate == 0) {
    demostate = 1;
    document.querySelector("#startBtn").innerHTML = "Stop Demo";
  } else {
    demostate = 0;
    document.querySelector("#startBtn").innerHTML = "Start Demo";
  }
}
function startDisplay() {
  if (displayId == 0) {
    displayId = 1;
    document.querySelector("#idOnBtn").innerHTML = "Turn Off ID";
  } else {
    displayId = 0;
    document.querySelector("#idOnBtn").innerHTML = "Turn On ID";
  }
}
// receiving data from backend and printing in console
fetch("http://localhost:4000/agent/data")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((agent) => {
      console.log(agent.id);
      console.log(agent.state);
      // if id exists run update state
      // updateState(id, state)
      // else
      // newAgent(id, state)
    });
  });
