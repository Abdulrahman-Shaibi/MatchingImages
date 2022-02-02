// Grap Dom Elemnts
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link the playerlives text to a varaible
playerLivesCount.textContent = playerLives;

//Generate the data images to slect all images in array form image location and name.
const getData = () =>
[{imgSrc: './imgs/Frame 1.png', name: 'gray'},
{imgSrc: './imgs/Frame 2.png', name: 'red'},{imgSrc: './imgs/Frame 3.png', name: 'orange'},{imgSrc: './imgs/Frame 4.png', name: 'green'},{imgSrc: './imgs/Frame 5.png', name: 'teal'},{imgSrc: './imgs/Frame 6.png', name: 'blue'},{imgSrc: './imgs/Frame 7.png', name: 'purple'},{imgSrc: './imgs/Frame 8.png', name: 'pink'},
{imgSrc: './imgs/Frame 1.png', name: 'gray'},{imgSrc: './imgs/Frame 2.png', name: 'red'},{imgSrc: './imgs/Frame 3.png', name: 'orange'},{imgSrc: './imgs/Frame 4.png', name: 'green'},{imgSrc: './imgs/Frame 5.png', name: 'teal'},{imgSrc: './imgs/Frame 6.png', name: 'blue'},{imgSrc: './imgs/Frame 7.png', name: 'purple'},{imgSrc: './imgs/Frame 8.png', name: 'pink'}
];


//Randomize the images
const randomize = () => {
  const cardData = getData();  
  cardData.sort(() => Math.random() -0.5);
  return cardData;  //After randoming the images it will return its value in the cardData again.
}

//Showing Images Function
const imageGenerator = () => {
    cardData = randomize();
 // Generate the HTML Elemnts
    cardData.forEach((item) => {   //Generating 16 for each images
        // item means looping through each object in the array.
    const image = document.createElement('div');
    const front = document.createElement('img');
    const back = document.createElement('div');
    // Adding class so we can style it
    image.classList = 'image';
    front.classList = 'front';
    back.classList = 'back';
     //Attach the pictures to the images
     front.src = item.imgSrc;  
     image.setAttribute('name', item.name)
    //Attach the images & front & Back in the section
        section.appendChild(image);
        image.appendChild(front);
        image.appendChild(back);

        image.addEventListener("click", (e) => {
        image.classList.toggle("toggleCard");
            checkCards(e);
        })    
    });

        //Check if 2 images are the same
            const checkCards = (e) => {
            const clickedCard = e.target;
            clickedCard.classList.add('flipped');
            const flippedCards = document.querySelectorAll('.flipped')
            const toggleCard = document.querySelectorAll('.toggleCard')
            
            
            // Logic if 2 images are same
            if(flippedCards.length == 2) {
                if  (flippedCards[0].getAttribute('name') === 
                     flippedCards[1].getAttribute('name')
                    )   {
                     console.log('match');
                     flippedCards.forEach((card) => {
                        card.classList.remove("flipped");
                        card.style.pointerEvents = "none";
                       });
                    }   else{
                     console.log("Not Match")
                     flippedCards.forEach((card) => {
                      card.classList.remove("flipped");
                      setTimeout(() => card.classList.remove('toggleCard'), 800)
                     }); 

                     //Timeout is for the delaying the running code reader.
                     playerLives --;                   
                     setTimeout(() => playerLivesCount.textContent = playerLives, 900)
                     // Reaching score Zero
                     if(playerLives === 0){
                        setTimeout(() => restart("👎 🥺 Try Again.."), 500)
                     }  
                    }
                    if(toggleCard.length === 16){
                        restart("😀 You Won..")
                    }
                            
                }
                
            }
            // Checks if won       
};


//Restart Function whene score hits zero
const restart = (text) => {
   let cardData = randomize();
   let front = document.querySelectorAll(".front");
   let images = document.querySelectorAll(".image");
   section.style.pointerEvents ='none';
   cardData.forEach((item, index) => {
      images[index].classList.remove('toggleCard');
      //Randomize
    setTimeout(() => {
        images[index].style.pointerEvents = "all";
        front[index].src = item.imgSrc;
        images[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
    },1000)
   });
   playerLives = 5;
   playerLivesCount.textContent = playerLives;
   setTimeout(() => window.alert(text), 100)
}
imageGenerator();



