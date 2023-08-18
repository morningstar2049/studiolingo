import Image from "next/image";

function Header() {
  return (
    <>
      <header className="hidden animate-appear bg-white h-[110px] sm:flex justify-around items-center">
        <Image
          src="/lingo-logo-svg.svg"
          alt="lingo-logo"
          width={150}
          height={150}
        />
        <div className="flex gap-3">
          <a href="https://www.facebook.com/studiolingo" target="_blank">
            <Image
              src="/facebook-green.svg"
              alt="facebook-green"
              width={55}
              height={55}
            />
          </a>
          <a href="https://www.instagram.com/studio_lingo/" target="_blank">
            <Image
              src="/instagram-green.svg"
              alt="instagram-green"
              width={55}
              height={55}
            />
          </a>
          <a href="https://www.tiktok.com/@studio.lingo" target="_blank">
            <Image
              src="/tiktok-green.svg"
              alt="tikTok-green"
              width={50}
              height={50}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/studio-lingo/"
            target="_blank"
          >
            <Image
              src="/linkedin-green.svg"
              alt="linkedin-green"
              width={50}
              height={50}
            />
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
