let c = document.getElementById("can");
let ctx = c.getContext("2d");

// lage et nytt objekt som vi kaller en figur
function Figure(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.drawBackground = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, c.width, c.height);
        ctx.fill();
        ctx.stroke();
    }
    this.drawRoad = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 250, 60);
        ctx.fill();
        ctx.stroke();
    }
    this.drawWheel = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    // Simulering av bevegelsen til hjulene på bussen
    // Hjulene tegnes på nytt og på nytt
    this.updateWheel = function() {
        if (this.x < -90) {
            this.x = 290;
        }
        this.x -= 1.5838;
        this.drawWheel();
    }
    this.drawBus = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.fillRect(this.x, this.y, 100, 40);
        ctx.fill();
        ctx.stroke();
    }
    this.updateBus = function() {
        if (this.x < -110) {
            this.x = 270;
        }
        this.x -= 1.5838;
        this.drawBus();
    }
    this.drawSun = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    this.updateSun = function() {
        if (this.x > 270) {
            this.x = -20;
        }
        this.x += 0.2420;
        this.drawSun();
    }
    this.changeColor = function(newColor) {
        this.color = newColor;
        this.drawSun();
    }
    // Endre farge på sola når man hovrer over.
    // Dette regnes ut ved å se på avstanden fra musa til midten av sirkelen
    // Radiusen til sirkelen er 15
    this.hoverSun = function(xmouse, ymouse) {
        const distance =
        Math.sqrt(
        ( (xmouse - this.x) * (xmouse - this.x) )
        +
        ( (ymouse - this.y) * (ymouse - this.y) )
        );
        if (distance < 15) {
            this.changeColor('orange');
            return true;
        } else {
            this.changeColor('yellow');
            return false;
        }
    }
}
// Initialisering av de forskjellige canvas-elementene
let background = new Figure(0, 0, "rgb(129, 205, 249)");
background.drawBackground();
let road = new Figure(0, 190, 'grey')
road.drawRoad();
let bus = new Figure(270, 145, '#FED000');
bus.drawBus();
let wheel1 = new Figure(350, 190, 'black');
wheel1.drawWheel();
let wheel2 = new Figure(290, 190, 'black');
wheel2.drawWheel();
let sun = new Figure(-20, 16, 'yellow');
sun.drawSun();

// legg til en lytter til canvas elementene slik at de registrer hvor man musa beveger seg
c.addEventListener('mousemove', (event) => {
    const rect = c.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sun.hoverSun(x, y)
});

// requestAnimationFrame gjør at koden under den vil kjøre igjen og igjen
// Dette bruker vi til å lage en animasjon
function updateFigures() {
    requestAnimationFrame(updateFigures);
    ctx.clearRect(0 , 0, c.width, c.height)
    background.drawBackground();
    road.drawRoad();
    bus.updateBus();
    wheel1.updateWheel();
    wheel2.updateWheel();
    sun.updateSun();
}
updateFigures()

// ^ Kilder: https://www.youtube.com/watch?v=yq2au9EfeRQ&ab_channel=ChrisCourses og
//           https://www.youtube.com/watch?v=xbdJf9MRL7A&ab_channel=BananaCoding 

// SVG: endre farge til sola når man hovrer over
// Kilde: https://stackoverflow.com/questions/58010405/hover-effect-with-jquery-not-changing-to-default-background-color
$(document).ready(function() {
    $("#sun").mouseover(function() {
        $(this).css('fill', 'orange');
    });
    $("#sun").mouseout(function() {
        $(this).css('fill', 'yellow');
    });
});

let documentation = true;

// onclick funksjon for knapp til å skjule og vise dokumentasjonen
function show_hide() {
    if (documentation == false) {
        document.getElementById("text").style.display="block";
        return documentation=true;
    }
    else {
        document.getElementById("text").style.display="none";
        return documentation=false;
    }
}