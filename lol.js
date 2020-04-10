let blackjackgame = {
    'you': {'scorespan': '#your-score','div': '#your-box','score':0},
    'dealer': {'scorespan': '#dealer-score','div': '#dealer-box','score':0},
    'card': ['2','3','4','5','6','7','8','9','10','j','q','k','a'],
    'cardsmap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'j':10,'q':10,'k':10,'a':[1,11]},
    'wins' : 0,
    'losses':0,
    'draws':0,
    'isstand':false,
    'turnsover':false,
};

const you = blackjackgame['you'];
const dealer = blackjackgame['dealer'];
document.querySelector('#hit').addEventListener('click',blackjackhit);
const hitsound = new Audio('swish.m4a');
const winsound = new Audio('cash.mp3');
const lostsound = new Audio('aww.mp3');
document.querySelector('#deal').addEventListener('click',blackjackdeal);
document.querySelector('#stand').addEventListener('click',dealerlogic);


function showcard(card,activeplayer){
    if (activeplayer['score']<=21){
      let cardimage = document.createElement('img');
       cardimage.src = `${card}.png`
      document.querySelector(activeplayer['div']).appendChild(cardimage);
     hitsound.play();
    }
};

function blackjackhit(){
   if(blackjackgame['isstand']=== false){
      let card = randomcard();
     showcard(card,you);
      updatescore(card,you);
     showscore(you);
   }
}

function blackjackdeal(){
    if(blackjackgame['turnsover']===true){
        blackjackgame['isstand'] = false;
            let yourimages = document.querySelector('#your-box').querySelectorAll('img');
            let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');

            for(i=0; i < yourimages.length; i++){
                yourimages[i].remove();
            }
            for(i=0; i < dealerimages.length; i++){
                dealerimages[i].remove();
            }
        you['score'] = 0;
        dealer['score'] = 0;
        document.querySelector('#your-score').textContent = 0;
        document.querySelector('#your-score').style.color = 'white';
        document.querySelector('#dealer-score').textContent = 0;
        document.querySelector('#dealer-score').style.color = 'white';
        document.querySelector('#result').textContent = "Let's play";
        document.querySelector('#result').style.color = 'black';

        blackjackgame['turnsover']=true;
        }
        
};

function randomcard(){
    let randomindex = Math.floor(Math.random()*13);
    return blackjackgame['card'][randomindex];
}

 function updatescore(card,activeplayer){
     if(card ==='a'){
         if(activeplayer['score']+blackjackgame['cardsmap'][card[1] <=21]){
             activeplayer['score'] += blackjackgame['cardsmap'][card][1];
         }else{
            activeplayer['score'] += blackjackgame['cardsmap'][card][0];  
         }
     }else{
    activeplayer['score'] += blackjackgame['cardsmap'][card];}
  }

function showscore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scorespan']).textContent = 'Bust!';
        document.querySelector(activeplayer['scorespan']).style.color = 'red';

    }else{
    document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
 async function dealerlogic(){
    blackjackgame['isstand'] = true;
   while(dealer['score']<16 && blackjackgame['isstand']===true){
        let card = randomcard();
        showcard(card,dealer);
        updatescore(card,dealer);
        showscore(dealer);
        await sleep(1000);
   }
   
        blackjackgame['turnsover'] = true;
        let winner = computewinner();
        showresult(winner);
   
   
}

function computewinner(){
    let winner;
  if(you['score']<=21){
      if (you['score'] > dealer['score'] || (dealer['score']>21)){
        winner = you;
        blackjackgame['wins']++;
     }
     else if(you['score']<dealer['score']){
        winner = dealer;
        blackjackgame['losses']++;
     }
     else if(you['score'] === dealer['score']){
        blackjackgame['draws']++;
      }
    } else if(you['score']>21 && dealer['score'] <=21){
        winner = dealer;
        blackjackgame['losses']++;
    }
    else if(you['score']>21&& dealer['score']>21){
        blackjackgame['draws']++;
    }
    
    return winner;
}

function showresult(winner){
    let message,messageColor;
 
  if(blackjackgame['turnsover']===true){  
        if(winner === you){
            document.querySelector('#wins').textContent = blackjackgame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winsound.play();
        }
        else if(winner === dealer){
            document.querySelector('#losses').textContent = blackjackgame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lostsound.play();
        }
        else{
            document.querySelector('#draws').textContent = blackjackgame['draws'];
            message = 'You Drew!';
            
        }

        document.querySelector('#result').textContent = message;
        document.querySelector('#result').style.color= messageColor;
     } 

}