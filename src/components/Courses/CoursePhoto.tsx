import Image from "next/image";

// Photo block inside course descriptions (same frame as the course video).
export default function CoursePhoto({
  src = "/course-photo-1.jpg",
  alt = "ინგლისურის გაკვეთილი სტუდიო ლინგოში — მოსწავლეები Cambridge-ის სახელმძღვანელოებით",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <div className="relative w-full my-5 overflow-hidden shadow-lg rounded-xl aspect-[3/2]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
      />
    </div>
  );
}
