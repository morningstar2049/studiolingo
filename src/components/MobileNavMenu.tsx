"use client";

interface Props {
  translate: number;
}

export default function MobileNavMenu(props: Props) {
  return (
    <>
      <div
        className={`h-[100vh] bg-lingo-green translate-x-[${props.translate}%] transition-transform ease-in duration-500`}
      >
        <div className="flex flex-col">
          <div>კურსები</div>
          <div>კორპორაციული</div>
          <div>ჩვენი გუნდი</div>
          <div>შეფასებები</div>
        </div>
      </div>
    </>
  );
}
