import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Row from "./row"


export default function App() {
  const [store, setStore] = useState({ songs: [] })
  const [song, setSong] = useState(null)
  const [currentSong, setCurrentSong] = useState(null)
  const player = useRef(null)
  const getAllSongs = async (url) => {
    try {
      const all = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await all.json()
      setStore({ ...store, songs: data })
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleNextSong = () => {
    if (currentSong == null && store.songs !== []) {
      setCurrentSong(0)
      setSong("https://assets.breatheco.de/apis/sound/" + store.songs[0].url)

    }
    else if (store.songs !== [] && currentSong < store.songs.length - 1) {
      setCurrentSong(currentSong + 1)
      setSong("https://assets.breatheco.de/apis/sound/" + store.songs[currentSong].url)
    }
    else if (store.songs !== [] && currentSong == store.songs.length - 1) {
      setCurrentSong(0)
      setSong("https://assets.breatheco.de/apis/sound/" + store.songs[0].url)
    }
  }
  const handlePreviousSong = () => {
    if (currentSong == null && store.songs !== []) {
      setCurrentSong(store.songs.length - 1)
      setSong("https://assets.breatheco.de/apis/sound/" + store.songs[0].url)

    }
    else if (store.songs !== [] && currentSong > 0) {
      setCurrentSong(currentSong - 1)
      setSong("https://assets.breatheco.de/apis/sound/" + store.songs[currentSong].url)
    }
    else if (store.songs !== [] && currentSong === 0) {
      setCurrentSong(store.songs.length - 1)
      setSong("https://assets.breatheco.de/apis/sound/" + store.songs[currentSong].url)
    }
  }
  const handlePlay = () => {
    if (player.current.paused) {
      player.current.load()
      player.current.play()
    }
    else {
      player.current.pause()
    }
  }
  useEffect(() => {
    getAllSongs("https://assets.breatheco.de/apis/sound/songs")
  }, [])
  useEffect(() => {
    if (player !== null) {
      player.current.src = song
      player.current.load()
      player.current.play()
    }
  }, [currentSong])

  return (
    <div className="container-fluid">
      {/* list */}
      <div className="row">
        <div className="col">
          <ul class="list-group">
            {
              store.songs !== [] ?
                store.songs.map((elem, i) => {
                  return (
                    <Row elem={elem} key={i} i={i} setSong={setSong} setCurrentSong={setCurrentSong} currentSong={currentSong} />
                  )
                })
                : <span>Cargando!!!</span>
            }
            <audio ref={player} controls="true" ></audio>

          </ul>
        </div>
      </div>
      {/* controls */}
      <div className="row d-flex justify-content-between controls">
        <div className="col-2"><i class="btn btn-block btn-dark fas fa-step-backward" onClick={() => { handlePreviousSong() }}></i></div>
        <div className="col-2"><i class="btn btn-block btn-dark fas fa-play" onClick={() => { handlePlay() }}></i></div>
        <div className="col-2"><i class="btn btn-block btn-dark fas fa-step-forward" onClick={() => { handleNextSong() }} ></i></div>
      </div>
    </div>
  )
}


