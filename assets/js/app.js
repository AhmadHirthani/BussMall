'use-strict';

let imgArray = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg' ,'breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

const leftImage = document.getElementById( 'leftImage' );
const rightImage = document.getElementById( 'rightImage' );
const centerImage = document.getElementById( 'centerImage' );
const button = document.getElementById( 'res' );

let leftImageIndex = 0;
let rightImageIndex = 0;
let centerImageIndex = 0;
const clickCounter = 25;


function BusMall( name ,img ) {
  this.name = name;
  this.image = `./assets/img/${img}`;
  this.clicks = 0;
  this.shown = 0;
  BusMall.all.push( this );
}

BusMall.all = [];
BusMall.counter = 0;


function getName( fileName ){
  return fileName.split( '.' ).slice( 0, -1 ).join( '.' );
}

for( let i = 0; i < imgArray.length; i++ ) {
  new BusMall( getName( imgArray[i] ),imgArray[i] );
}

let indexs = [];


function renderNewBusMall() {
  let index = randomNumber( 0, BusMall.all.length - 1 );
  leftImage.src = BusMall.all[index].image;
  leftImage.alt = BusMall.all[index].name;
  leftImageIndex = index;
  indexs.push( index );

  let rightIndex;
  let centerIndex;
  do {
    rightIndex = randomNumber( 0,BusMall.all.length - 1 );
    centerIndex = randomNumber( 0,BusMall.all.length - 1 );

  } while ( index === rightIndex || index === centerIndex || centerIndex === rightIndex );
  indexs.push( rightIndex );
  indexs.push( centerIndex );
  rightImage.src = BusMall.all[rightIndex].image;
  rightImage.alt = BusMall.all[rightIndex].name;
  rightImageIndex = rightIndex;


  centerImage.src = BusMall.all[centerIndex].image;
  centerImage.alt = BusMall.all[centerIndex].name;
  centerImageIndex = centerIndex;

  BusMall.all[index].shown++;
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

    }

  }

  removeEventListener( 'click',handelClick );

  localStorage.setItem( 'Items', JSON.stringify( BusMall.all ) );

  button.addEventListener( 'click',handelButton );

}


function handelButton( ){
  const parentElement = document.getElementById( 'ul' );

  for( let i = 0;i < BusMall.all.length;i++ ){
    const li = document.createElement( 'li' );
    parentElement.appendChild( li );
    li.textContent = `${BusMall.all[i].name} is clicked ${BusMall.all[i].clicks} and shown ${BusMall.all[i].shown}`;
  }

  renderChart();


  button.removeEventListener( 'click',handelButton );
  button.innerText = 'reset';
  button.onclick = function(){
    location.reload();
  };
}



rightImage.addEventListener( 'click',handelClick );
leftImage.addEventListener( 'click',handelClick );
centerImage.addEventListener( 'click',handelClick );


// Helper function
function randomNumber( min, max ) {
  let index2 = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  for( let i = 0; i < indexs.length;i++ ){
    if( index2 === indexs[i] ){
      index2 = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
  }return ( index2 );
}


renderNewBusMall();

button.addEventListener( 'click', renderChart );


function renderChart() {

  let nameArray = [];
  let clicksArray = [];
  let showsArray = [];

  for( let i = 0; i < BusMall.all.length; i++ ) {
    nameArray.push( BusMall.all[i].name );
    clicksArray.push( BusMall.all[i].clicks );
    showsArray.push( BusMall.all[i].shown );

  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# of Votes',
          data: clicksArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3
        },
        {
          label: '# of shows',
          data: showsArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}
function getData() {
  const data = localStorage.getItem( 'ul' );
  if( data ) {
    const objData = JSON.parse( data );
    BusMall.all = objData;
    renderNewBusMall();
  }
}
getData();
