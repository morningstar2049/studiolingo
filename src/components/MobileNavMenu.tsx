"use client";
import Image from "next/image";

interface Props {
  translate: number;
}

export default function MobileNavMenu(props: Props) {
  const translateClass =
    props.translate === 0 ? "translate-x-[0%]" : "translate-x-[100%]";

  return (
    <>
      <div
        style={{ fontFeatureSettings: "'case' on" }}
        className={`h-[calc(100vh-80px)] bg-white flex flex-col justify-around gap-32 z-10 text-lingo-green text-2xl ${translateClass} transition-transform ease-in duration-500 px-16`}
      >
        <section className="flex flex-col gap-10 justify-between h-[30%] py-6">
          <div>კურსები</div>
          <div>კორპორაციული</div>
          <div>ჩვენი გუნდი</div>
          <div>შეფასებები</div>
        </section>

        <section className="flex">
          <a>
            <Image
              src="/facebook-green.svg"
              alt="facebook-green"
              width={40}
              height={40}
            />
          </a>
          <a href="https://www.instagram.com/studio_lingo/" target="_blank">
            <Image
              src="/instagram-green.svg"
              alt="instagram-green"
              width={40}
              height={40}
            />
          </a>
          <a href="https://www.tiktok.com/@studio.lingo" target="_blank">
            <Image
              src="/tiktok-green.svg"
              alt="tikTok-green"
              width={40}
              height={40}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/studio-lingo/"
            target="_blank"
          >
            <Image
              src="/linkedin-green.svg"
              alt="linkedin-green"
              width={40}
              height={40}
            />
          </a>
        </section>
      </div>
    </>
  );
}
