/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Image from 'next/image';

const NextImage = (props) => {
  const { alt, src, fallbackSrc = '/img/fallback.svg', ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      key={imgSrc}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default NextImage;
