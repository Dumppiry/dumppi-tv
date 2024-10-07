import { useEffect, useState, ReactNode } from 'react'
import sanityClient from './sanityClient'

const App = () => {
  //const [imageUrls, setImageUrls] = useState<string[]>([])
  const [images, setImages] = useState<ReactNode[]>([])
  const [newImages, setNewImages] = useState<ReactNode[]>([])
  const [autoPlaySpeed, setAutoPlaySpeed] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const createImg = (url: string) => (
    <img
      className={`w-full h-full object-fill
        transition-opacity duration-500 ease-in-out
      `}
      src={`${url}?fm=webp`}
      alt="dumppiTv"
    />
  )

  useEffect(() => {
    const fetchImages = async () => {
      const query = `*[_id == "dumppiTv"][0]{
        autoPlaySpeed,
        "imageUrls": photos[].asset -> url
        }`

      const data = await sanityClient.fetch(query)
      if (images.length === 0) {
        setImages(data.imageUrls.map(createImg))
      } else {
        setNewImages(data.imageUrls.map(createImg))
      }
      setAutoPlaySpeed(data.autoPlaySpeed)
    }
    fetchImages()
    const timer = setInterval(() => {
      fetchImages()
    }, 300 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (images.length === 0) return
    if (newImages.length !== 0) {
      setImages(newImages)
      setNewImages([])
    }

    const timer = setInterval(() => {
      if (newImages.length !== 0 && currentIndex === images.length - 1) {
        setImages(newImages)
        setNewImages([])
        setCurrentIndex(0)
        return
      }
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, autoPlaySpeed * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [images])

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center`}>
      {images[currentIndex]}
    </div>
  )
}

export default App
