/**
 * Created by anmol on 5/7/17.
 */

let apiKey="1bea819d085cd31666686e6a0592572c";
let url="https://api.themoviedb.org/3/genre/"
let url1="/movies?api_key="+apiKey+"&language=en-US&include_adult=false&sort_by=created_at.asc";
let poster_url="http://image.tmdb.org/t/p/w185"
let idArray=[];
let dataArray=[];
let container;
let preload;
let counter;
let id;
let imageString="";
$(function(){



    container=$('.container-fluid');

    preload=$('#preloaded');
    counter=0;
    id=setInterval(frame,1000);

   getLocalIDS();

   console.log(idArray);

   for(let i=0;i<idArray.length;i++){

           getDATA(idArray[i])

   }

   // setTimeout(function(){
   //
   //     console.log(dataArray);
   //     if (dataArray==[]){
   //         alert("please refresh");
   //     }
   //     else{
   //         processImages();
   //     }
   //
   // },3000)

});


function frame(){

    if(counter==100){
        clearInterval(id);
        preload.empty();
        processImages();
    }
    else{
        counter+=25;
    }
}

function getDATA(id){

    $.ajax({
        type:'GET',
        url:url+id+url1,
        async: false,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {

            console.log(json);

          for(i in json.results){

              let title=json.results[i].title;
              let poster=json.results[i].poster_path;
              let overview=json.results[i].overview;
              let releaseDate=json.results[i].release_date

              dataArray.push(new objcData(title,poster,overview,releaseDate))

          }

        },
        error: function(e) {
            console.log(e.message);
        }
    })


}


function getLocalIDS(){

    idArray=JSON.parse(localStorage.getItem('genres'));

}

function objcData(title,poster,overview,releaseDate){
    this.title=title;
    this.poster=poster;
    this.overview=overview;
    this.releaseDate=releaseDate;
}

function processImages(){

     for(i in dataArray){

         let a=`<img  class="imageDetails" id="movieDetails${+i+1}" src="`+poster_url+dataArray[i].poster+`" height="220px">`;

         imageString=imageString+a;

     }

     putintoDOM();
}

function putintoDOM(){

    let body=$(`
   
    <div class="row">
     <div class="col text-center">
         <div class="jumbotron">
             <h1>These Movies suits your flavour</h1>
          </div>
     </div>
   </div>
    <div class="row">
        <div class="col text-center">
           ${imageString}
        </div>
    </div>
   `);

    container.append(body)
    let image=$('img');
    image.hover(imageInside,imageOutside)
}

function imageInside(ev){

    console.log($(ev.target).attr('id'))

    let a=$(ev.target);

    let b=$(`<h1>HELLO</h1>`)
    // a.css('transform','rotateY(180deg)').css('transition','transform 2s').css('perspective','200px');

    a.css('z-index','1').css('height','500px');

}

function imageOutside(ev){

    let a=$(ev.target);
    console.log($(ev.target).attr('id'))
    // a.css('transform','rotateY(180deg)').css('transition','transform 2s').css('perspective','200px')
}