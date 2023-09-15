import Image from "next/image";

type TImageWrapperProps = {
  src: string;
  alt: string;
  objectFit: "contain" | "cover" | "fill";
  fill: boolean;
  extraStyles?: string;
};

function ImageWrapper({
  src,
  alt,
  objectFit,
  fill,
  extraStyles,
}: TImageWrapperProps) {
  return (
    <div className={`relative ${extraStyles}`}>
      <Image src={src} alt={alt} objectFit={objectFit} fill={fill} />
    </div>
  );
}

export default ImageWrapper;
