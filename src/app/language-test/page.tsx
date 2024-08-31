import LevelTest from "./LevelTest";

async function page() {
  const response = await fetch("http://localhost:4000/api/lang-test");
  const { levelTest }: TLevelTest = await response.json();

  return (
    <div className="p-5 w-full flex items-center justify-center h-[calc(100vh-110px)]">
      <LevelTest levelTest={levelTest} />
    </div>
  );
}

export default page;
