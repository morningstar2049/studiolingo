function CorporateVideo() {
  return (
    <>
      <iframe
        className="aspect-video sm:m-auto sm:w-[50%]"
        src="https://www.youtube.com/embed/vfEb3P8jmeM?si=7hLr5hpTUKPhfSYU"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
}

export default CorporateVideo;
