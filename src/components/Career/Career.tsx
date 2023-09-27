import Link from "next/link";
import Button from "../Button";

function Career() {
  return (
    <div
      id="career"
      className="flex flex-col justify-center gap-10 mt-20 scroll-m-[230px]"
    >
      <h1
        style={{ fontFeatureSettings: "'case' on" }}
        className="mx-auto mb-10 text-2xl font-bold text-lingo-green sm:text-3xl"
      >
        შემოუერთდი ჩვენ გუნდს!
      </h1>
      <iframe
        className="aspect-video sm:m-auto sm:w-[50%]"
        src="https://www.youtube.com/embed/wFeKM5Woe84"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <Link href={"/vacancies"} className="flex justify-center">
        <Button extraStyles="px-10">იხილეთ ვაკანსიები</Button>
      </Link>
    </div>
  );
}

export default Career;
