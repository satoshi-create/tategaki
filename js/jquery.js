$(window).load(function () {
  // // 1スクロールの移動距離
  // var speed = 30;
  // $(document).mousewheel(function (event, mov) {
  //   //  スクロール後の位置の算出
  //   var moving = $(this).scrollLeft() - mov * speed;
  //   // スクロールする
  //   $(this).scrollLeft(moving);
  //   // 縦スクロールさせない
  //   return false;
  // });
  var speed = 50;
  //マウスホイールで横移動
  $("html").mousewheel(function (event, mov) {
    //ie firefox
    $(this).scrollLeft($(this).scrollLeft() - mov * speed);
    //webkit
    $("body").scrollLeft($("body").scrollLeft() - mov * speed);
    //return false(縦スクロール付加)にするとUnable to preventDefault...というエラーがでたため、処理を書き換え
    return true;
  });
});
