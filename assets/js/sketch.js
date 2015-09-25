var xdg = require('xdg-env');
var fs = require('fs');
var app = {
  'sonidos_dir': xdg.USER_DIRS.MUSIC.replace(/\/$/,'')+"/la-botonera/",
  'sonidos': {},
};
var container, heading, body, btn;


function preload() {
  var is_sound = function(e) {return e.indexOf('.wav') > 0 || e.indexOf('.mp3') > 0 ;};
  fs.readdirSync(app.sonidos_dir)
    .filter(is_sound)
    .map(function(snd){
      app.sonidos[snd] = loadSound(app.sonidos_dir+snd)
    });
}

function setup() {
  createCanvas(0, 0);

  container = createDiv("");
  container.addClass('panel panel-success');

  heading = createDiv("La botonera!!!!");
  heading.addClass('panel panel-heading');
  heading.parent(container);

  body = createDiv("");
  body.addClass('panel panel-body');
  body.parent(container);

  for( var key in app.sonidos ){
    btn = createButton(key, key);
    btn.parent(body);
    btn.addClass("btn btn-default btn-margin");
    btn.mousePressed(playSound);
  }
}

function draw() {
  noLoop();
}

function playSound(e){
  e.preventDefault();
  var snd = this.elt.innerHTML;
  app.sonidos[snd].play();
};
