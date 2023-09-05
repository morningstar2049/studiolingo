import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

function Header() {
  return (
    <>
      <header className="hidden animate-appear bg-[#fff] h-[110px] sm:flex justify-evenly items-center shadow-md">
        <Link href="/">
          <Image
            src="/lingo-logo-svg.svg"
            alt="lingo-logo"
            width={150}
            height={150}
          />
        </Link>
        <div className="flex gap-3 w-1/2 justify-end">
          <Link href="/register" className="flex items-center">
            <Button extraStyles="mr-5">რეგისტრაცია</Button>
          </Link>
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
