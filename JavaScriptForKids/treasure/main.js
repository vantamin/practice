'use strict';
// 0부터 size 사이의 무작위 수를 하나 고릅니다
var getRandomNumber = function (size) {
  return Math.floor(Math.random() * size);
};
// 클릭 event와 taget 사이의 거리를  계산합니다
var getDistance = function (event, target) {
  var diffX = event.offsetX - target.x;
  var diffY = event.offsetY - target.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
};
// 거리를 나타내는 문자열을 반환합니다
var getDistanceHint = function (distance) {
  if (distance < 10) {
    return '바로 앞입니다!';
  } else if (distance < 20) {
    return '정말 가까워요';
  } else if (distance < 40) {
    return '가까워요';
  } else if (distance < 80) {
    return '멀지는 않아요';
  } else if (distance < 160) {
    return '멀어요';
  } else if (distance < 320) {
    return '꽤 멀어요';
  } else if (distance < 640) {
    return '너~~~~무 멀어요!';
  } else {
    return '정말 정말 멀다구요!';
  }
};
// 변수를 설정합니다
var width = $('#map').width();
var height = $('#map').height();
var clicks = 0;
var clickLimit = 50;
// 위치를 무작위로 고릅니다
var target = {
  x: getRandomNumber(width),
  y: getRandomNumber(height),
};
// img 엘리먼트에 클릭 핸들러를 추가합니다
$('#map').click(function (event) {
  clicks++;
  if (clicks > clickLimit) {
    alert('GAME OVER');
    return;
  }
  // 클릭 event와 target 사이의 거리를 구합니다
  var distance = getDistance(event, target);
  // 거리를 힌트 문자열로 바꿉니다
  var distanceHint = getDistanceHint(distance);
  // #distance 엘리먼트에 힌트를 표시합니다
  $('#distance').text(distanceHint);
  // 남은 클릭 수 표시하기
  $('#clicks-remaining').text(clickLimit - clicks);
  // 아주 가깝게 클릭했다면 보물을 찾았다고 말합니다
  if (distance < 8) {
    alert(clicks + '번 클릭해서 보물을 찾았습니다!');
  }
});
