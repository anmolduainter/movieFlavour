/**
 * Created by anmol on 5/7/17.
 */


// console.log("hello");
let container;
let title;
let releaseDate;
let overview;
let poster;
let youtubeID;
let poster_url="http://image.tmdb.org/t/p/w185";
let urlYou="http://192.168.0.106/YouTube/movieT.php?q=";
let counter;
let id1;
$(function(){

    container=$('.container')

    counter=0;

    id1=setInterval(frame,1000);

    getDATA();

});

function frame(){

    if(counter==100){

        clearInterval(id1);
        container.empty();
        push(youtubeID)

    }else{

        counter+=25;

    }

}

function getDATA(){


    let a= JSON.parse(localStorage.getItem('imageDetails'));

    let id=localStorage.getItem("clicked");

    title=a[id].title;
    releaseDate=a[id].releaseDate;
    poster=a[id].poster;
    overview=a[id].overview;


    getId();
}


function getId(){

    $.ajax({
        type:'GET',
        url:urlYou+title,
        async: false,
        contentType: 'application/json',
        dataType:'jsonp',
        success: function(json) {

            youtubeID=json.id;


        },
        error: function(e) {
            console.log(e.message);
        }
    })

}

function push(id){
    putINTODOM(id);
}

function putINTODOM(id){

    let body=$(`
    
    <div class="row">
    <div class="col text-center">
        <div class="jumbotron">
        <img src="${poster_url+poster}" height="300px">
        </div>
    </div>
    <div class="col text-center">
        <div class="jumbotron">
        <h1>${title}</h1>
        <br>
        <h2>${releaseDate}</h2>
        <br>
        <p>${overview}</p>
        </div>
    </div>
  </div>

    <div class="row">
        <div class="col text-center">
            <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/${id}">
            </iframe>
        </div>
    </div>


    `);


    container.append(body);

}

