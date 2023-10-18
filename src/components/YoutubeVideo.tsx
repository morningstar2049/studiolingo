type TYoutubeVideoProps = {
  src: string;
};

function YoutubeVideo({ src }: TYoutubeVideoProps) {
  return (
    <iframe
      className="aspect-video sm:m-auto sm:w-[50%]"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

export default YoutubeVideo;
