'use strict';
// 캔버스 설정하기
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 캔버스 엘리먼트의 너비와 높이 가져오기
var width = canvas.width;
var height = canvas.height;
// 너비와 높이를 블록 단위로 계산하기
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
// 점수의 초기 값을 0으로 설정하기
var score = 0;
// 경계선 그리기
var drawBorder = function () {
  ctx.fillStyle = 'Gray';
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};
// 점수를 왼쪽 상단에 그리기
var drawScore = function () {
  ctx.font = '20px Courier';
  ctx.fillStyle = 'Black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Score: ' + score, blockSize, blockSize);
};
// 인터벌 반복을 취소하고 Game Over 표시하기
var gameOver = function () {
  playing = false;
  ctx.font = '60px Courier';
  ctx.fillStyle = 'Black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Game Over', width / 2, height / 2);
};
// 원 그리기
var circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};
// Block 생성자
var Block = function (col, row) {
  this.col = col;
  this.row = row;
};
// 블록 위치에 사각형 그리기
Block.prototype.drawSquare = function (color) {
  var x = this.col * blockSize;
  var y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};
// 블록 위치에 원 그리기
Block.prototype.drawCircle = function (color) {
  var centerX = this.col * blockSize + blockSize / 2;
  var centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};
// 이 블록이 다른 블록과 같은 위치에 있는지 확인하기
Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};
// Snake 생성자
var Snake = function () {
  this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
  this.direction = 'right';
  this.nextDirection = 'right';
};
// 뱀의 몸을 구성하는 부분을 사각형으로 그리기
Snake.prototype.draw = function () {
  this.segments[0].drawSquare('LimeGreen');
  var isEventSegment = false;
  for (var i = 1; i < this.segments.length; i++) {
    if (isEventSegment) {
      this.segments[i].drawSquare('Blue');
    } else {
      this.segments[i].drawSquare('Yellow');
    }
    isEventSegment = !isEventSegment;
  }
};
// 머리를 새로 만든 후 뱀 제일 앞에 추가하고 뱀을 현재 방향으로 옮기기
Snake.prototype.move = function () {
  var head = this.segments[0];
  var newHead;
  this.direction = this.nextDirection;
  if (this.direction === 'right') {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === 'down') {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === 'left') {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === 'up') {
    newHead = new Block(head.col, head.row - 1);
  }
  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }
  this.segments.unshift(newHead);
  if (newHead.equal(apple.position)) {
    score++;
    animationTime -= 5;
    apple.move(this.segments);
  } else {
    this.segments.pop();
  }
};
// 뱀의 새 머리가 벽이나 자기 몸과 충돌하지 않았는지 확인하기
Snake.prototype.checkCollision = function (head) {
  var leftCollision = head.col === 0;
  var topCollision = head.row === 0;
  var rightCollision = head.col === widthInBlocks - 1;
  var bottomCollision = head.row === heightInBlocks - 1;
  var wallCollision =
    leftCollision || topCollision || rightCollision || bottomCollision;
  var selfCollision = false;
  for (var i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }
  return wallCollision || selfCollision;
};
// 키보드 입력에 따라 뱀의 다음 방향 설정하기
Snake.prototype.setDirection = function (newDirection) {
  if (this.direction === 'up' && newDirection === 'down') {
    return;
  } else if (this.direction === 'right' && newDirection === 'left') {
    return;
  } else if (this.direction === 'down' && newDirection === 'up') {
    return;
  } else if (this.direction === 'left' && newDirection === 'right') {
    return;
  }
  this.nextDirection = newDirection;
};
// Apple 생성자
var Apple = function () {
  this.position = new Block(10, 10);
};
// 사과의 현재 위치에 원 그리기
Apple.prototype.draw = function () {
  this.position.drawCircle('LimeGreen');
};
// 사과를 새로운 임의의 위치로 옮기기
Apple.prototype.move = function (occupiedBlocks) {
  var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randomCol, randomRow);
  for (var i = 0; i < occupiedBlocks.length; i++) {
    if (this.position.equal(occupiedBlocks[i])) {
      this.move(occupiedBlocks);
      return;
    }
  }
};
// 뱀 객체와 사과 객체 만들기
var snake = new Snake();
var apple = new Apple();
var playing = true;
var animationTime = 100;
var gameLoop = function () {
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
  if (playing) {
    setTimeout(gameLoop, animationTime);
  }
};
gameLoop();
// 키코드를 방향 문자열로 변환하는 객체
var directions = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};
// 키가 눌렸을 때 방향을 제어하기 위한 keydown 핸들러
$('body').keydown(function (event) {
  var newDirection = directions[event.keyCode];
  if (newDirection !== undefined) {
    snake.setDirection(newDirection);
  }
});
