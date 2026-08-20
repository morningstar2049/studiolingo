// Shared course intro/promo video, embedded after the materials paragraph.
export default function CourseVideo() {
  return (
    <div className="relative w-full my-4 overflow-hidden shadow-lg aspect-video rounded-xl">
      <iframe
        src="https://www.youtube.com/embed/EfRA0MnhFXE"
        title="Studio Lingo — ინგლისურის კურსი"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
