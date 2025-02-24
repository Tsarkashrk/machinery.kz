import { X } from 'lucide-react'
import { useState } from 'react'

export default function InputFile() {
  const [images, setImages] = useState<string[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages(imageUrls)
    }
  }

  const handleClearImages = () => {
    setImages([])
  }

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="file-upload">
      <div className="file-upload__wrapper">
        <div className="file-upload__preview">
          {images.map((src, index) => (
            <div key={index} className="file-upload__image-container">
              <img src={src} alt={`Selected ${index}`} className="file-upload__image" />
              <button className="file-upload__delete" onClick={() => handleDeleteImage(index)}>
                <X />
              </button>
            </div>
          ))}
        </div>
        <div className="file-upload__buttons">
          <input className="file-upload__input" type="file" id="fileInput" multiple accept="image/*" onChange={handleFileChange} />
          <label className="file-upload__button" htmlFor="fileInput">
            + Add Pictures
          </label>
          {images.length > 0 && (
            <button className="file-upload__clear" onClick={handleClearImages}>
              Clear Photos
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
