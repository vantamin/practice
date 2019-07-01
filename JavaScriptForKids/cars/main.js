'use strict';
var Car = function (x, y) {
  this.x = x;
  this.y = y;
  this.draw();
};
Car.prototype.draw = function () {
  var carHtml = '<img src="http://nostarch.com/images/car.png">';
  this.carElement = $(carHtml);
  this.carElement.css({
    position: 'absolute',
    left: this.x,
    top: this.y,
  });
  $('body').append(this.carElement);
};
Car.prototype.moveRight = function (distance) {
  this.x += distance;
  this.carElement.css({
    left: this.x,
    top: this.y,
  });
};
Car.prototype.moveLeft = function (distance) {
  this.x -= distance;
  this.carElement.css({
    left: this.x,
    top: this.y,
  });
};
Car.prototype.moveUp = function (distance) {
  this.y -= distance;
  this.carElement.css({
    left: this.x,
    top: this.y,
  });
};
Car.prototype.moveDown = function (distance) {
  this.y += distance;
  this.carElement.css({
    left: this.x,
    top: this.y,
  });
};
var tesla = new Car(20, 20);
var nissan = new Car(100, 200);
setInterval(function () {
  tesla.moveRight(Math.random() * 5);
  nissan.moveRight(Math.random() * 5);
}, 30);