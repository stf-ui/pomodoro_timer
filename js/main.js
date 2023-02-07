// 現在時刻を表示する用(おまけなのでいったんこのままで放置)
const clock = () => {
  let present = new Date();
  let hh = present.getHours();
  let mm = present.getMinutes();

  hh = hh < 10? "0"+ hh:hh;
  mm = mm < 10? "0"+ mm:mm;

  let result = document.getElementById("result");
  result.textContent = hh + ":" + mm;
}
// 実行
window.setInterval(clock,1000);

// 一桁なら二桁に直す関数
const doubleNum = (num) => {
  if( num < 10 ) {
    num = "0" + num
  }
  return num;
}
// ミリ秒に計算
const toSecond = (sec) => {
  sec = sec*60;
  return sec;
}



// タイマーカウントダウン用
let pomodoroTarget = toSecond(25);
let pomodoroRestTarget = toSecond(5);
let pomodoroTimer;
let pomodoroRestTimer;
// 変数
let timerBtn_start = document.getElementsByClassName("workStartBtn");
let timerBtn_start_arr = Array.from(timerBtn_start);
let timerBtn_trig = document.getElementsByClassName("triggerBtn");
let timerBtn_trig_arr = Array.from(timerBtn_trig);
let timerBtn_tgr = document.getElementsByClassName("tgrBtn");
let timerBtn_tgr_arr = Array.from(timerBtn_tgr);
let closeBtn = document.getElementById('restStopBtn');
const timerBell = document.getElementById("timerAudio");
const setTimerBtn_start = document.getElementById("startBtn");
const setTimerBtn_stop = document.getElementById("stopBtn");
const breakTimeModal = document.getElementById("modalTwo");


const countdownTimer = () => {
  let s = pomodoroTarget % 60;
  let m = Math.floor(pomodoroTarget % 3600 / 60);
  document.getElementById("timer_m").textContent = doubleNum(m);
  document.getElementById("timer_s").textContent = doubleNum(s);
  pomodoroTarget--;
  console.log(doubleNum(s));
  if(pomodoroTarget < 0){
    clearInterval(pomodoroTimer);
    pomodoroTarget = toSecond(25);
    setTimerBtn_start.disabled = false;
    // breakTimeModal.style.display = "block";
    breakTimeModal.classList.add("d-block");
    restTimer();
  }
}

// 休憩用タイマー
const countdownRestTimer = () => {
  let s = pomodoroRestTarget % 60;
  let m = Math.floor(pomodoroRestTarget % 3600 / 60);

  pomodoroRestTarget--;
  document.getElementById("timer_l_m").textContent = doubleNum(m);
  document.getElementById("timer_l_s").textContent = doubleNum(s);
  console.log(doubleNum(s));
  if( pomodoroRestTarget < 0){
    pomodoroRestTarget = toSecond(5);
    clearInterval(pomodoroRestTimer);
    console.log("休憩終了");
    timerBell.play();
  }
}
const restTimer = () => {
  pomodoroRestTimer = setInterval(()=>{
    countdownRestTimer();
  },1000);
  console.log("作業休憩！");
  timerBell.play();
}

// プレビュー画像を表示させる
const previewImage = (obj) => {
  let fileReader = new FileReader();
	fileReader.onload = () => {
		document.getElementById('preview').src = fileReader.result;
    document.getElementById('preview_bg').src = fileReader.result;
	}
	fileReader.readAsDataURL(obj.files[0]);
}

// 開始前にデフォルト値を設定
timerBtn_start_arr.forEach((e) => e.addEventListener('click', () => {
  pomodoroTimer = setInterval(() => {
    countdownTimer();
  }, 1000);
  timerBtn_start_arr.disabled = false;
  console.log("作業開始！");
}));


// モーダル制御用
  timerBtn_trig_arr.forEach((e) => e.addEventListener('click', () => {
    let modal = e.getAttribute('data-modal');
    document.getElementById(modal).style.display = "none";
    alert("モーダル消えるよ");
  }));

// クリックイベント

// 作業開始
setTimerBtn_start.addEventListener('click', (e) => {
  e.target.parentNode.style.display = "none";
  setTimerBtn_stop.parentNode.style.display = "block";
});

// 作業停止
setTimerBtn_stop.addEventListener('click',(e) => {
  clearInterval(pomodoroTimer);
  e.target.parentNode.style.display = "none";
  setTimerBtn_start.parentNode.style.display = "block";
  // 検証用
  console.log("作業終了！");
});

// 作業終了
closeBtn.addEventListener("click",() => {
  alert("作業終了！お疲れでしたー");
  window.close();
});



