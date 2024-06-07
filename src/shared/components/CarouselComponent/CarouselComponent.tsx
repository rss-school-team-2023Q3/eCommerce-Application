import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

interface IImage {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

interface ICarouselComponentProps {
  images: IImage[];
  alt: string | undefined;
}

function CarouselComponent({ images, alt }: ICarouselComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleClickOpen = (slideIndex: number) => {
    setActiveSlide(slideIndex);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Carousel>
        {images?.map((image, index) => (
          <button
            type="button"
            key={image.url}
            onClick={() => handleClickOpen(index)}
            style={{ background: 'none', border: 'none', outline: 'none' }}
          >
            <img
              src={image.url}
              alt={alt}
              style={{ width: '100%', maxWidth: '400px' }}
            />
          </button>
        ))}
      </Carousel>
      <Dialog open={isModalOpen} onClose={handleClose} fullWidth>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{
              position: 'absolute',
              right: '20px',
              top: '10px',
              zIndex: '500',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Carousel index={activeSlide}>
            {images?.map((image) => (
              <img
                key={image.url}
                src={image.url}
                alt={alt}
                style={{ width: '100%' }}
              />
            ))}
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CarouselComponent;
