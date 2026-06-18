export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SharedModalProps {
  index: number;
  images?: GalleryImage[];
  currentPhoto?: GalleryImage;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export const animationVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export function range(start: number, end: number): number[] {
  const output: number[] = [];
  for (let i = start; i < end; i += 1) {
    output.push(i);
  }
  return output;
}

export function tripImagesToGallery(images: string[]): GalleryImage[] {
  return images.map((src, i) => ({
    id: i,
    src,
    alt: `Foto ${i + 1}`,
    width: 1280,
    height: 853,
  }));
}
