import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';

type ImageSize = {
  width: number;
  height: number;
}

const RandomImage: FC<ImageSize> = ( {width, height} ) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      if (imageUrl) return;
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            headers: {
              Authorization: `Client-ID pgdgMEIBG84di5KV4MUkPZHWCjJjY--UzLuTAnNC7-c`,
            },
          }
        );
        setImageUrl(response.data.urls.regular);
      } catch (error) {
        console.error('Error fetching the image', error);
      }
    };

    fetchRandomImage();
  }, [imageUrl]);

  return (
    <div
      className="text-black rounded-lg border-rose-900 text-center overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Random Unsplash"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <p className='text-white'>Loading...</p>
      )}
    </div>
  );
};

export default RandomImage;
