"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function ProductImage({
  src,
  alt,
  className = "",
  width = 40,
  height = 40,
}: ProductImageProps) {
  console.log("Rendering ProductImage with src:", src, "alt:", alt, "width:", width, "height:", height);
  const [error, setError] = useState(false);
  // Always use backend URL for product images if not a full URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  if (!src || error) {
    return (
      <Image
        src="/placeholder.svg"
        alt={alt}
        width={width}
        height={height}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={`${API_URL}/${src}`}
      alt={alt}
      width={width}
      height={height}
      className="object-cover transition-transform duration-200 ease-out"
      style={{
        userSelect: 'none'
      }}
      draggable={false}
      onError={() => setError(true)}
    />
    // <img
    //   src={fullImageUrl}
    //   alt={alt}
    //   width={width}
    //   height={height}
    //   className={`h-full w-full object-cover ${className}`}
    //   onError={() => setError(true)}
    // />
  );
}
