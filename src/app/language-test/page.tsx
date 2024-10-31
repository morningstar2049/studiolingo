import LevelTestWrapper from "./LevelTestWrapper";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return null;
  }
  const response = await fetch(`${apiUrl}/api/lang-test`);
  const { levelTest }: TLevelTest = await response.json();

  return (
    <div className="p-4 w-full flex items-center justify-center h-[calc(100vh-110px)]">
      <LevelTestWrapper levelTest={levelTest} />
    </div>
  );
}
