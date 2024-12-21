import './App.css'
// import VIDEOS from './data/videos.json'
import VideoList from './components/videoList'
import type { Video } from './model/video'
import { useState, useEffect } from 'react'

function App () {
  const [videos, setVideos] = useState<Video[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/wildiney/laratube/master/src/data/videos.json')
        if (!response.ok) {
          throw new Error("Erro ao carregar dados")
        }
        const data = await response.json()
        setVideos(data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("Erro desconhecido")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])



  return (
    <>
      <header>
        <svg height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 461.001 461.001" xmlSpace="preserve">
          <g>
            <path style={{ fill: '#F61C0D' }} d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
    c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
    C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
    c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
          </g>
        </svg>
        <h1>LaraTube</h1>
      </header>
      {error ? <p>{error}</p> : null}
      {loading ? <p>Carregando...</p> : <VideoList videos={videos} />}
    </>
  )
}

export default App


