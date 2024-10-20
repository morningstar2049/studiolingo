import LevelTest from "./LevelTest";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/lang-test`);
  const { levelTest }: TLevelTest = await response.json();

  return (
    <div className="p-4 w-full flex items-center justify-center h-[calc(100vh-110px)]">
      <LevelTest levelTest={levelTest} />
    </div>
  );
}
