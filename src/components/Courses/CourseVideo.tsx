// Shared course video. Defaults to the promo video embedded after the materials
// paragraph; pass a videoId for a different clip (e.g. the intro video on top).
export default function CourseVideo({
  videoId = "EfRA0MnhFXE",
}: {
  videoId?: string;
}) {
  return (
    <div className="relative w-full my-4 overflow-hidden shadow-lg aspect-video rounded-xl">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Studio Lingo — ინგლისურის კურსი"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
