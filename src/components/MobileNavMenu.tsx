import Image from "next/image";

interface Props {
  translate: number;
}

export default function MobileNavMenu(props: Props) {
  // ! Tailwind classes need to be hardcoded, computed values don't.
  const translateClass =
    props.translate === 0 ? `translate-x-[0%]` : "translate-x-[101%]";

  return (
    <>
      <div
        style={{ fontFeatureSettings: "'case' on" }}
        className={`h-full fixed left-0 top-[10%] right-0 bottom-0 bg-[#FFFFFE] flex flex-col justify-evenly gap-32 z-100 text-lingo-green text-2xl ${translateClass} transition-transform ease-in duration-500 px-16 overflow-y-hidden`}
      >
        <section className="flex flex-col gap-10 justify-between h-[40%]">
          <div className="cursor-pointer">კურსები</div>
          <div className="cursor-pointer">კორპორაციული</div>
          <div className="cursor-pointer">ჩვენი გუნდი</div>
          <div className="cursor-pointer">შეფასებები</div>
          <div className="cursor-pointer">კონტაქტი</div>
        </section>

        <section className="flex gap-1 h-[10%]">
          <a href="https://www.facebook.com/studiolingo" target="_blank">
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
