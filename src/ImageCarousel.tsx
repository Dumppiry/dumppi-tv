import { useEffect, useState } from 'react'

type ImageCarouselProps = {
  imageUrls: string[]
  autoPlaySpeed: number
}

const ImageCarousel = ({ imageUrls, autoPlaySpeed }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      )
    }, autoPlaySpeed * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return <div>{imageUrls[currentIndex]}</div>
}

export default ImageCarousel
