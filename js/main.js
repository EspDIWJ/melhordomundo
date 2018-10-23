var game = {
    width: 2,
    height: 4,
    player: {name: 'player 1', score: 0, ballsUsed: [] },   
    cards: [ 
    {number: 1, heading: 'Start As An Amateur', subheading: 'Very few people have the humility to start as amateurs. They procrastinate doing the work they want in the name of perfectionism. '}, 
    {number: 2, heading: 'Get Coaching/Education', subheading: 'Take your dreams seriously. Most people don’t. Take them serious enough to become amazing and move beyond mediocre. Get education and coaching.'}, 
    {number: 3, heading: 'Stop Living The Broken Rules Everyone Else Is Living', subheading: 'When everyone else is zigging, that’s when you zag. Darren Hardy says you should run “toward the thing everyone else is running from” in order to stand out from the crowd.'}, 
    {number: 4, heading: 'Be Consistent Until You Have A Break Through', subheading: 'If this is what you love doing, you’ll do it regardless of the outcome. In fact, obsession with a particular outcome will keep you from attaining your desired results. Your work will be forced rather than organically lived.'}, 
    {number: 5, heading: 'Structure Your Entire Life To Optimize Your Performance', subheading: 'In order to become a creative master, you must focus your efforts on outputs by leveraging your subconscious mind. While you’re away from your work, like sleeping, spending time with friends, or other activities, your subconscious is working through and mulling over the problems you’re trying to solve.'}, 
    {number: 6, heading: 'Allow Time For Recovery', subheading: 'Your ability to work at a high level is like fitness. If you never took a break between sets, you wouldn’t be able to build strength, stamina, and endurance. However, not all “rest” produces recovery. Certain things are more soothing than others.'}, 
    {number: 7, heading: 'Have A Pre-Performance Routine That Gets You In Flow', subheading: 'The purpose of the pre-performance routine is to alter your emotional state. Most people experience emotional resistance before engaging in a task, like say, writing.'}, 
    {number: 8, heading: 'Embrace Fear And Suffering', subheading: 'When you begin feeling uncomfortable, that’s when you start feeling good. That’s when you’re growing. No pain no gain. That’s your happy place. That’s where most people stop. But not you.'}, 
            ],
    gameover: false
}

startGame();

function startGame () {
    var gamespaceDiv = document.getElementById('gamespace');
    var counter = 0;
    for (var i = 0; i < game.height; i++) {
        var card = document.createElement('div');
        card.className = 'playingField d-md-flex flex-md-equal w-100 my-md-3 pl-md-3';
        gamespaceDiv.appendChild(card);
        for (var j = 0; j < game.width; j++) {
            var playingFieldDiv = document.getElementsByClassName('playingField');
            playingFieldDiv[i].innerHTML += createElement(game.cards[counter].heading, game.cards[counter].subheading, game.cards[counter].number );
            
            counter++;
        }
    }

    var playingFieldDiv = document.getElementsByClassName('playingPiece');
    for (var i = 0; i < playingFieldDiv.length; i++) {
        
        if (i == 0) {
            playingFieldDiv[i].name = 'black';
        } else {
            playingFieldDiv[i].name = 'other';

        }
        playingFieldDiv[i].selected = false;
    }
}

function elementAction(card) {
    if (!card.selected) {
        card.selected = true;
        card.className='bg-primary playingPiece mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden';
        
        
        checkWinner();
    } else {
        $(card).attr('data-toggle', '');
    }
}

function createElement(headline, subheading, number) {
    return '<div data-toggle="modal" data-target="#exampleModalCenter" onclick="elementAction(this)" onmouseover="mouseEnterCard(this)" onmouseleave="mouseLeaveCard(this)" class="playingPiece bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"> <div class="my-3 p-3"> <h2 class="display-5">' + headline + '</h2> <p class="lead">' + subheading +'</p></div><div class="bg-dark shadow-sm mx-auto" style="background-image: url(./img/thumb' + number + '.jpg); background-size:100%; width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div></div>';
}

function mouseEnterCard(card) {
    if (!card.selected) {
        card.className = 'bg-dark playingPiece text-white mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'; 
    }   
}

function mouseLeaveCard(card) {
    if (!card.selected) {
        card.className = 'bg-light playingPiece mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden';
    }
}

function createModal(title, text, showButton) {
    if (showButton) {
        return '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalCenterTitle">' + title +'</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div><div class="modal-body"> ' + text +' </div><div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Continue</button> </div></div></div></div>'

    } else {
        return '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalCenterTitle">' + title +'</h5>  </div><div class="modal-body"> ' + text +' </div> </div></div></div>'
    }
}
function checkWinner() {
    var pieces = document.getElementsByClassName('playingPiece');
    var winningPieces = [];
    
    for (var i = 0; i < pieces.length; i ++) {
        console.log(i + ': ' + pieces[i].name);
    }
    if (pieces[0].selected == true && pieces[1].selected == true && pieces[2].selected == true ) {
        winningPieces.push(pieces[0], pieces[1], pieces[2]);
        
    }
    if ( pieces[0].selected == true && pieces[3].selected == true && pieces[6].selected == true ) {
        winningPieces.push( pieces[0], pieces[3], pieces[6] ) ;
        
    }

    if ( pieces[0].selected == true && pieces[4].selected == true  ) {
        winningPieces.push( pieces[0], pieces[4]) ;
        
    }

    if ( pieces[1].selected == true && pieces[4].selected == true && pieces[7].selected == true ) {
        winningPieces.push( pieces[1], pieces[4], pieces[7] ) ;
        
    }

    if ( pieces[2].selected == true && pieces[5].selected == true ) {
        winningPieces.push( pieces[2], pieces[5] ) ;
        
    }

    if ( pieces[2].selected == true && pieces[4].selected == true && pieces[6].selected == true) {
        winningPieces.push( pieces[2], pieces[4], pieces[6] ) ;
        
    }

    if ( pieces[3].selected == true && pieces[4].selected == true && pieces[5].selected == true ) {
        winningPieces.push( pieces[3], pieces[4], pieces[5] ) ;
        
    }    

    if ( pieces[6].selected == true && pieces[7].selected == true ) {
        winningPieces.push( pieces[6], pieces[7] ) ;
        
    }

    var blackTrigger = false;
    var whiteTrigger = false;

    for (var i = 0; i < winningPieces.length; i++ ) {
        if (winningPieces[i].name == 'black') {
            blackTrigger = true;
        }  else if (winningPieces.length == 2) {
            whiteTrigger = true;
        } 
    }  
    
    var modal = document.getElementById('modal');
    if (blackTrigger) { 
        modal.innerHTML = createModal('Oh no! You have been accused of sexual abuse and lost your career!', '<img width=100%; src="img/modal2.jpg" />');
    } else if (whiteTrigger) {
        modal.innerHTML = createModal('Congratulations! You have paied the judges and became best player in the world!', '<img width=100%; src="img/modal4.jpg" />');
    } else if (winningPieces.length == 3) {
        modal.innerHTML = createModal('You have won, congratulations!', '<img width=100%; src="img/modal3.jpg" />', true);
    } else { 
        modal.innerHTML = createModal('You have made progress, keep going!', '<img width=100%; src="img/modal1.jpg" />', true);
       
        }
}