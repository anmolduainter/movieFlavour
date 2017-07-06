let genresArray=[];
let popularListArray=[];
let poster=[];
let apiKey="1bea819d085cd31666686e6a0592572c";
let genre_url="https://api.themoviedb.org/3/genre/movie/list?api_key="+apiKey+"&language=en-US"
let url1="http://api.themoviedb.org/3/search/movie?query=%22John%20Wick%22&api_key="+apiKey;
let poster_url="http://image.tmdb.org/t/p/w185";
let popularUrl="https://api.themoviedb.org/3/movie/top_rated?api_key="+apiKey+"&language=en-US&page=";
let popularUrlPageNo=1;
let container;
let ButtonLike;
let ButtonNotLike;
let movieForward;
let posterTraversal=0;
let countButtonClick=0;
let fixedBack;

let BtnStarted;

$(function(){


    BtnStarted=$('#started')
    container=$('.container');
    fixedBack=$('#fixed');
    BtnStarted.click(function(){

        container.empty();
        fixedBack.css('background','black')
        localStorage.clear('genres');
        getGenres();
        PopularMoviesList(popularUrlPageNo);


    });

});




function PopularMoviesList(pageNo){


    popularUrlPageNo=pageNo;

    $.ajax({
        type:'GET',
        url:popularUrl+pageNo,
        async: false,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {

      //      console.log(json.results[1].id)

            for(i in json.results){
                let a=[];
                let title=json.results[i].title;
                let posterPath=json.results[i].poster_path;
                for(i1 in json.results[i].genre_ids){
                    a.push(json.results[i].genre_ids[i1]);
                }
                popularListArray.push(new popularListObj(title,posterPath,a));
            }

            console.log(popularListArray);

            tasteDOM(posterTraversal);
        },
        error: function(e) {
            console.log(e.message);
        }
    })


}


function localSave(obj){

    localStorage.setItem('genres',JSON.stringify(obj))

}




function getGenres(){

    $.ajax({
        type:'GET',
        url:genre_url,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {

            for(i in json.genres){

                let id=json.genres[i].id;
                let name=json.genres[i].name;
                genresArray.push(new genres(id,name));

            }

          //  localSave(genresArray)

        },
        error: function(e) {
            console.log(e.message);
        }
    })


}


function genres(id,name,taste=0){
    this.id=id;
    this.name=name;
    this.taste=taste;
}

function popularListObj(title,poster,genres){
    this.title=title;
    this.poster=poster;
    this.genres=genres;
}

function tasteDOM(i){

    if (posterTraversal==popularListArray.length-1){

        posterTraversal=0;
        // i=posterTraversal;
        popularListArray=[];

        PopularMoviesList(popularUrlPageNo+1);

    }
    else{

        posterTraversal=i;

    }


  //  console.log(posterTraversal);


    let body=$(`

   <div class="row">
        <div class="col text-center">
            <div>
                <img id="poster_image" src=${poster_url+popularListArray[i].poster} height="300px">
                <br>
                <br>
                <h2>${popularListArray[i].title}</h2>
            </div>
        </div>

    </div>
    <div class="row">
        <div class="col text-center">
            <div class="jumbotron">
                <button class="btn btn-danger" id="notLike"><i class="fa fa-thumbs-down fa-5x" aria-hidden="true"></i></button>
                <br>
                <br>
                <h4>Not Like</h4>
            </div>
        </div>
            <div class="col text-center">
                <div class="jumbotron">
                    <button class="btn btn-primary" id="Like"><i class="fa fa-thumbs-up fa-5x" aria-hidden="true"></i></button>
                    <br>
                    <br>
                    <h4>Like</h4>
                </div>
            </div>

        </div>




    `)

    container.append(body)


    ButtonLike=$('#Like');
    ButtonNotLike=$('#notLike');

    ButtonLike.click(function(){

        poster.push(popularListArray[i].poster);

        for(i1 in popularListArray) {

            for (i2 in genresArray) {

                if (genresArray[i2].id == popularListArray[i].genres[i1]){

                    genresArray[i2].taste++;

                }

            }

        }

        container.empty();
        tasteDOM(posterTraversal+1);
       // console.log(genresArray)
        countButtonClick=countButtonClick+1;
        console.log(countButtonClick);
        if(countButtonClick==16){
           // localSave(genresArray)
            getResult();

        }

    })


    ButtonNotLike.click(function(){
        container.empty();
        tasteDOM(posterTraversal+1);
    })

}


function getResult(){

    console.log(genresArray);

    let first;
    let firstName;
    let firstId;
    let second;
    let secondName;
    let secondId;
    let third;
    let thirdName;
    let thirdId;
    let fourth;
    let fourthName;
    let FourthId;
    let nameArray=[];
    let name='';

    console.log(genresArray);

    for (i in genresArray){

        if (genresArray[i].taste>2){
            console.log(genresArray[i].name);
            nameArray.push(genresArray[i].name);
            genreLast.push(genresArray[i].id);
        }

    }
    name=nameArray.join(",");
    console.log(name);

    localSave(genreLast);

    container.empty();


    let body=$(`
    
          <div class="row">
          <div class="thumbnail text-center">
            <img src=${poster_url+poster[0]}   height="300px" >
            <img src=${poster_url+poster[1]}   height="300px">
            <img src=${poster_url+poster[2]}   height="300px">
            <img src=${poster_url+poster[3]}   height="300px">
            <img src=${poster_url+poster[4]}   height="300px">
            <img src=${poster_url+poster[5]}   height="300px">
            <img src=${poster_url+poster[6]}   height="300px">
            <img src=${poster_url+poster[7]}   height="300px">
            <img src=${poster_url+poster[8]}   height="300px">
            <img src=${poster_url+poster[9]}   height="300px">
            <img src=${poster_url+poster[10]}  height="300px">
            <img src=${poster_url+poster[11]}  height="300px">
            <img src=${poster_url+poster[12]}  height="300px">
            <img src=${poster_url+poster[13]}  height="300px">
            <img src=${poster_url+poster[14]}  height="300px">
            <img src=${poster_url+poster[15]}  height="300px">
            <div class="caption">
                <h1>So According to Me</h1>
                <h2>Flavour of Yours are</h2>
                <br>
                <h2>${name}</h2>
                <button class="btn btn-warning" id="movieForward"><i class="fa fa-angle-double-right fa-4x"></i></button>
            </div>
        </div>
      </div>

     `);


    container.append(body);

    movieForward=$('#movieForward');

    movieForward.click(function(){
        window.open("movie.html","_self")
    });

}

let genreLast=[];
