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
  const [error, setError] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // If no image or error loading, show placeholder
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

  // Format the full image URL based on the src value
  const fullImageUrl = src.startsWith("http") ? src : `${baseUrl}${src}`;

  return (
    <img
      src={fullImageUrl}
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}
