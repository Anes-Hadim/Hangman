function restart(){
  document.querySelector('.end_game').innerHTML=retry;
  hidden='';
  trys=6;
  pre_guess=[];
  random();
}

const retry=document.querySelector('.end_game').innerHTML;
const words=['hangman','javascript','HTML','yacine','houssem','Abdellah','Rayan','la3ziz','tarek','pascal','computer','science','chatgpt','programing','Algeria'];
let computerchoise;
let hidden='';
let guess='';
let trys=6;
let pre_guess=[];
random();

function random() {
   computerchoise=Math.floor(Math.random()*words.length);
   word_display();
   try_hint_display();
}

function word_display() {
  for(let i=0;i<words[computerchoise].length;i++) {
    hidden+='-'
  }
  document.querySelector('.word').innerHTML=`word : ${hidden}`;
}

function try_hint_display() {
  document.querySelector('.hint').innerHTML=`Hint : it is a ${words[computerchoise].length} letter word`;
  document.querySelector('.js_trys').innerHTML=`Attempts left : ${trys}`;
}

function enter(event) {
  if (event.key==='Enter') {
    user_guess();
  }
}

function user_guess() {
  const input=document.querySelector('.user_input');
  guess=input.value;
  input.value='';
  is_right();
}

function is_right() {
  let j=0;
  if (guess.length===1) {
    for(let i=0;i<words[computerchoise].length;i++) {
      if (guess[0].toUpperCase()===words[computerchoise][i].toUpperCase()) {
         hidden=win(i);
      } else {
        j++
      }
    }
    if (j===words[computerchoise].length) {
      pre_guess.push(guess);
      document.querySelector('.previeus').innerHTML=`Wrong guesses : ${pre_guess}`;
      lost();
    }
  } else {
    if (guess.toUpperCase()===words[computerchoise].toUpperCase()) {
      hidden=words[computerchoise];
    } else {
      pre_guess.push(guess);
      document.querySelector('.previeus').innerHTML=`Wrong guesses : ${pre_guess}`;
      lost();
    }
  }
  document.querySelector('.word').innerHTML=`word : ${hidden}`;
  if (hidden===words[computerchoise]) {
    document.querySelector('.end_game').innerHTML=`<p>You won, the word was ${words[computerchoise]}</p>
    <button onclick="restart();">retry?</button>`;
  }
}

function win(i) {
  let new_hidden='';
  for(let j=0;j<words[computerchoise].length;j++) {
    if (j !== i && hidden[j] == '-' ) {
      new_hidden+='-';
    } else {
      new_hidden+=words[computerchoise][j];
    }
  }
  return new_hidden;
}

function lost() {
  trys--;
  document.querySelector('.js_trys').innerHTML=`Attempts left : ${trys}`;
  if (trys===0) {
    document.querySelector('.end_game').innerHTML=`<p>You lost, the word was ${words[computerchoise]}</p>
    <button  onclick="restart();">retry?</button>`;
  }
}