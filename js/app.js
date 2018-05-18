/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//declaring and initializing variables
let x=0;
let finaltime=0;
let starrate=0;
let cardopen=[];
let matcho=[];
let moves;
let sec=0,min=0,hours=0,t;
let stars=document.getElementsByClassName("fa-star");
let panel=document.querySelector(".deck");
let card=document.getElementsByClassName("card");
let cards=[...card];
let c=cards.length;

document.querySelector(".fa-repeat").addEventListener("click",function(){ location.reload();});

//Shuffle function from http://stackoverflow.com/a/2450976
//function  to shuffle cards
function shuffle(array) 
{
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) 
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Adding EventListeners for all cards
function addlistener()
{
 	for(let i=0;i<c;i++)
 	{
 		cards[i].addEventListener("click", match);

 	}
 }

//function to turn back cards after few seconds
function hidecards()
{
	for(let i=0;i<c;i++)
 	{
		cards[i].classList.remove("show","open","match");
			
	}
}
function showcards()
{
 	for(let j=0;j<c;j++)
 	{
 		cards[j].classList.toggle("open");
 		cards[j].classList.toggle("show");

 	}
 }

function start()
{
	moves=0;
	document.querySelector(".moves").innerHTML=moves;
	cleartime();
	timetaken();
	
	cards=shuffle(cards);
	var array=[];
	for(var i=0;i<cards.length;i++)
	{
		cards.innerHTML=" ";
		array.forEach.call(cards,function(item){panel.appendChild(item);});
	}
	setTimeout(hidecards,0);
	setTimeout(showcards,200);
	setTimeout(hidecards,800);
    //initially displaying all three stars
  	for(var j=0;j<stars.length;j++)
	{
		stars[j].style.visibility="visible";
	}
	addlistener();
  

}

 //To display timer
function timer()
 {
    sec++;
    if (sec >= 60) 
    {
        sec = 0;
        min++;
        if (min >= 60)
        {
            min = 0;
            hours++;
        }
    }
    
    document.querySelector(".timer").textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
    timetaken();
}
function timetaken()
{
	 t = setTimeout(timer, 1000);
	
}
//to decide stars to display based on moves
function displayStars()
{
	if(moves<18)
 	{
 		starrate=3;
 		rating(2);
 	}
 	else if(moves>=18&&moves<26)
 	{
 		starrate=2;
 		rating(1);
 	}
 	else
 	{
 		starrate=1;
 		rating(0);	
 	}
}
//To Display stars based on moves
function rating(rates)
{ 
	for(var i=2;i>rates;i--)
	{
		stars[i].style.visibility="collapse";
		
	}
}
//To check card match
function match()
{		
		
	let list=this.classList;
	console.log(list);
	if(list.length===3)//checking whether the card has already open
 	{
 		alert("card already opened");
 	}
 	else if(list.length===4)//checking whether the card has already matched
 	{
 		alert("you already matched this card");
 	}
 				
	else		
 	{
 		
 		++moves;
 		document.querySelector(".moves").innerHTML=moves;//to display moves
 		displayStars();

 		if(cardopen.length===0)//To show first card
 		{
 			
 			this.classList.toggle("open");
 			this.classList.toggle("show");
 			cardopen.push(this.innerHTML);
 			matcho.push(this);
 		}
 		else if(cardopen.length===1)//To show second card
 		{
 			this.classList.toggle("open");
 			this.classList.toggle("show");
 			cardopen.push(this.innerHTML);
 			matcho.push(this);
 			
 		
 			if(cardopen[0]===cardopen[1])//Checking whether cards match or not
 			{
 				
 				matcho[0].classList.toggle("match");
 				matcho[1].classList.toggle("match");
 				++x; 	                       	
 				if(x===8)
 				{	stoptimer();
 					scoreboard();
 				}
 				
 				matcho=[];
 				cardopen=[];
 				
 			}
 			else//For unmatched cards
 			{
 				setTimeout(function(){
 				console.log(matcho[0]);
 				matcho[0].style.background="yellow";
 				matcho[1].style.background="yellow";
 				},100);
 				function hide()
 				{
 				matcho[0].style.background="";
 				matcho[1].style.background="";
 				matcho[0].classList.remove("open","show");
 				
 				matcho[1].classList.remove("open","show");
 				
 				cardopen=[];
 				matcho=[];
 				}
 				setTimeout(hide,300);
 			}	
 		}
 	}
}
function stoptimer()
{
	clearTimeout(t);
}
function cleartime()//To start the timer from first
{
	sec=0;
	min=0;
	hours=0;
	document.querySelector(".timer").textContent ="00:00:00";
}
 function scoreboard()//To display score of player
 {
 	
 	document.querySelector(".score").style.visibility = "visible";
 	finaltime=document.querySelector(".timer").textContent;
 	document.querySelector("#totaltime").textContent="You Completed the Game in "+finaltime;
 	document.querySelector("#overallscore").textContent="Your Score is: "+starrate+"/3";
 	document.querySelector(".playagain").addEventListener("click",function(){ location.reload();});

 }

 window.addEventListener("load",function(){start();});
 	


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
