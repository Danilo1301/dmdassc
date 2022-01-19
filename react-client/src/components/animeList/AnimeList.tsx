import * as React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AnimePage from "./AnimePage";
import New from "./New";

export interface Anime {
  id: string
  name: string
  watchedEpisodes: number 
  totalEpisodes: number 
  watchedOvas: number 
  totalOvas: number 
  nextEpisodeDate?: number 
}

const requestAnimes = function(callback: (animes: Anime[]) => void) {

  const requestOptions = {
    method: 'GET',
    //headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify({ title: 'React Hooks POST Request Example' })
  };

  fetch('/api/animelist/animes', requestOptions)
    .then(response => response.json())
    .then((animes: Anime[]) => {

      callback(animes);
  });

  /*
  fetch('/api/animelist/animes', requestOptions)
      .then(response => response.json())
      .then(data => {

        console.log(data)

      });
      */

}

const onClickAnime = function(id: string) {
  console.log("onClickAnime", id)

  location.href = "/animelist/anime/" + id
}


const Anime = function(props) {
  const anime: Anime = props.data;

  const totalOvas = anime.totalOvas;
  const watchedOvas = anime.watchedOvas;
  const totalEpisodes = anime.totalEpisodes;
  const watchedEpisodes = anime.watchedEpisodes;

  const onGoing: boolean = totalEpisodes == 0;

  const imageSrc = "";

  let badgeStyle = "warning";
  let badgeText = "Assistindo";
  
  if(onGoing) {
    badgeStyle = "info";
    badgeText = "Novo episódio 19/01";
  } else {
    if(watchedEpisodes == totalEpisodes) {

      badgeText = "Assistido";
      badgeStyle = "success";

      if(totalOvas > 0 && totalOvas > watchedOvas) {
        badgeStyle = "warning";
        badgeText = "Incompleto";
      }
    }

    if(watchedEpisodes == 0) {
      badgeStyle = "secondary";
      badgeText = "Não assistido";
    }
  }

  const description = (
    <>
      <div>
        <span className={"badge bg-" + badgeStyle}> { badgeText } </span>
      </div>

      <div> { watchedEpisodes } { onGoing ? "" : " / " + totalEpisodes} episódios assistidos </div>
      
      { totalOvas > 0 ? (
          <div>{watchedOvas} / {totalOvas} OVAs</div>
        ) : ("")
      }

    </>
  );

  return (
    <>
      <div className="border p-2" onClick={() => onClickAnime(anime.id)}>
        <div className="row">
          <div className="col-auto">
            <div className="bg-light" style={ {width: 64, height: 64} }>
              { imageSrc != "" ? (
                  <img src={imageSrc} width="100%" height="100%"></img>
                ) : ("")
              }
            </div>
          </div>
          <div className="col">
            <b> { anime.name } </b>
            { description }
          </div>
          
        </div>
      </div>
    </>
  );
}

let requestedData: boolean = false;

const List = function()
{
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  if(!requestedData) {
    requestedData = true;

    requestAnimes(animes => {
      setAnimeList(animes)
  
      console.log("setAnimeList")
    })
  }
  
 
  
  const handleNew = () => {
    
    const requestOptions = {
      method: 'GET',
      //headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
  
    fetch('/api/animelist/new', requestOptions)
      .then(response => response.json())
      .then((data) => {
  
        
        console.log(data)
        onClickAnime(data.id)
        
    });

  }


  return (
    <>
      <div className="jumbotron text-center">
        
      </div>

     

      <div className="container">
        
        <button className="col-auto btn-sm btn-primary mt-3 mb-3" onClick={handleNew}>Adicionar anime</button>
      {
        animeList.map(anime => <Anime data={anime}/> )
      }
        
            
      </div>
    </>
    
  );
}

const AnimeList = function()
{
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/new" element={<New />} />
        <Route path="/anime/:id" element={<AnimePage />} />
      </Routes>
    </>
  );
}

export default AnimeList;
