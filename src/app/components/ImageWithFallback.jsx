"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({
    src,
    alt,
    width,
    height,
    className,
}) {
    const fallback = "/images/logo_black.png";
    const [imgSrc, setImgSrc] = useState(src || fallback);
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={className + (isLoaded ? " opacity-100" : " opacity-0")}
            onLoad={() => {
                setIsLoaded(true);
            }}
            onError={() => {
                setImgSrc(fallback);
                setIsLoaded(true);
            }}
        />
    );
}
