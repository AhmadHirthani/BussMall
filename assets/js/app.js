'use-strict';

let imgArray = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg' ,'breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const rightImage = document.getElementById( 'rightImage' );
const centerImage = document.getElementById( 'centerImage' );

let leftImageIndex = 0;
let rightImageIndex = 0;
let centerImageIndex = 0;
const clickCounter = 25;

function BusMall( name ) {
  this.name = name;
  this.image = `./assets/img/${name}`;
  this.clicks = 0;
  this.shown = 0;
  BusMall.all.push( this );
}

BusMall.all = [];
BusMall.counter = 0;

for( let i = 0; i < imgArray.length; i++ ) {
  new BusMall( imgArray[i] );
}

function renderNewBusMall() {
  let leftIndex = randomNumber( 0, BusMall.all.length - 1 );
  leftImage.src = BusMall.all[leftIndex].image;
  leftImage.alt = BusMall.all[leftIndex].name;
  leftImageIndex = leftIndex;

  let rightIndex;
  let centerIndex;
  do {
    rightIndex = randomNumber( 0,BusMall.all.length - 1 );
    centerIndex = randomNumber( 0,BusMall.all.length - 1 );

  } while ( leftIndex === rightIndex || leftIndex === centerIndex || centerIndex === rightIndex );
  rightImage.src = BusMall.all[rightIndex].image;
  rightImage.alt = BusMall.all[rightIndex].name;
  rightImageIndex = rightIndex;


  centerImage.src = BusMall.all[centerIndex].image;
  centerImage.alt = BusMall.all[centerIndex].name;
  centerImageIndex = centerIndex;

  BusMall.all[leftIndex].shown++;
  BusMall.all[rightIndex].shown++;
  BusMall.all[centerIndex].shown++;


  // rightImage.src = BusMall.all[0].image;
}

function handelClick( event ) {

  if( BusMall.counter < clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'centerImage' ) {
      if( clickedElement.id === 'leftImage' ) {
        BusMall.all[leftImageIndex].clicks++;
      }

      if( clickedElement.id === 'rightImage' ) {
        BusMall.all[rightImageIndex].clicks++;
      }

      if( clickedElement.id === 'centerImage' ){
        BusMall.all[centerImageIndex].clicks++;
      }

      BusMall.counter++;
      renderNewBusMall();

      console.log( BusMall.all );
    }
  }
}

imageSection.addEventListener( 'click', handelClick );

console.log( BusMall.all );

// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}


// const result = document.getElementById( 'result' );
// result.addEventListener( 'submit', function ( event ) {
//   event.preventDefault();

//   const Name = event.target.Name.value;
//   const leftImage = event.target.leftImage.value;
//   const rightImage = event.target.rightImage.value;
//   const centerImage = event.target.centerImage.value;
//   const bus = new BusMall( Name, leftImage, rightImage, centerImage );

//   result.reset();
//   bus.randomCustomer();
//   bus.renderNewBusMall();

//   console.log( BusMall.all );

// } );

renderNewBusMall();
