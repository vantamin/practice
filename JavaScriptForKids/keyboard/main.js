'use strict';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};
// Ball 생성자
var Ball = function () {
  this.x = width / 2;
  this.y = height / 2;
  this.speed = 5;
  this.size = 10;
  this.xSpeed = 1;
  this.ySpeed = 0;
};
// 속도에 따라 공의 위치 바꾸기
Ball.prototype.move = function () {
  this.x += this.xSpeed * this.speed;
  this.y += this.ySpeed * this.speed;

  if (this.x < 0 || this.x > width) {
    this.xSpeed = -this.xSpeed;
  } else if (this.y < 0 || this.y > height) {
    this.ySpeed = -this.ySpeed;
  }
};
// 현재 위치에 공을 그린다
Ball.prototype.draw = function () {
  circle(this.x, this.y, this.size, true);
};
// 문자열에 따라 공의 방향 설정하기
Ball.prototype.doAction = function (action) {
  if (action === 'up') {
    this.xSpeed = 0;
    this.ySpeed = -1;
  } else if (action === 'down') {
    this.xSpeed = 0;
    this.ySpeed = 1;
  } else if (action === 'left') {
    this.xSpeed = -1;
    this.ySpeed = 0;
  } else if (action === 'right') {
    this.xSpeed = 1;
    this.ySpeed = 0;
  } else if (action === 'stop') {
    this.xSpeed = 0;
    this.ySpeed = 0;
  } else if (action === 'faster') {
    this.speed++;
  } else if (action === 'slower') {
    if (this.speed > 0) {
      this.speed--;
    }
  } else if (action === 'smaller') {
    if (this.size > 0) {
      this.size--;
    }
  } else if (action === 'larger') {
    this.size++;
  }
};
// ball 객체 만들기
var ball = new Ball();
// 키코드를 동작 이름으로 변환하는 객체
var keyActions = {
  32: 'stop',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  88: 'faster',
  90: 'slower',
  67: 'smaller',
  86: 'larger',
};
// 키가 눌릴 때마다 호출되는 keydown 핸들러
$('body').keydown(function (event) {
  var action = keyActions[event.keyCode];
  ball.doAction(action);
});
// 30밀리초마다 호출되는 애니메이션 함수
setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  ball.draw();
  ball.move();
  ctx.strokeRect(0, 0, width, height);
}, 30);
