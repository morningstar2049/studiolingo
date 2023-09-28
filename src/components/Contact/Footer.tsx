import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import ImageWrapper from "../ImageWrapper";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-lingo-black mt-20 grid grid-flow-row md:grid-flow-col place-items-center text-[#fff] text-base md:text-lg py-5 h-[300px] lg:h-[240px]"
    >
      <p>© Studio Lingo - All rights reserved</p>
      <ImageWrapper
        alt="logo-white"
        src="/lingo-logo-white.png"
        fill={true}
        objectFit="contain"
        extraStyles="sm:h-[200px] h-[160px] sm:w-[200px] w-[160px]"
      />
      <div className="flex flex-col gap-3 h-full justify-center">
        <div className="flex gap-2">
          <AiOutlinePhone className="text-[20px] md:text-[22px]" />
          <p className="text-[#fff]">+995 32 2 114 623</p>
        </div>
        <div className="flex gap-2">
          <AiOutlineMail className="text-[20px] md:text-[22px]" />
          <p className="text-[#fff]">info@studiolingo.ge</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
