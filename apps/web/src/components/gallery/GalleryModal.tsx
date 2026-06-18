"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { type GalleryImage } from "./utils";
import GallerySharedModal from "./GallerySharedModal";

interface GalleryModalProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function GalleryModal({ images, initialIndex, onClose }: GalleryModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  function changePhotoId(newVal: number) {
    setDirection(newVal > index ? 1 : -1);
    setIndex(newVal);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index + 1 < images.length) changePhotoId(index + 1);
      if (e.key === "ArrowLeft" && index > 0) changePhotoId(index - 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        ref={overlayRef}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      <GallerySharedModal
        index={index}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={onClose}
        navigation={true}
      />
    </div>
  );
}
