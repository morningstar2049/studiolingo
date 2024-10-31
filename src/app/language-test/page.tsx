import LevelTestWrapper from "./LevelTestWrapper";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return null;
  }
  const response = await fetch(`${apiUrl}/api/lang-test`, {
    cache: "no-cache",
  });
  const { levelTest }: TLevelTest = await response.json();

  return (
    <div className="p-4 flex items-center justify-center h-auto sm:h-[calc(100vh-110px)]">
      <LevelTestWrapper levelTest={levelTest} />
    </div>
  );
}
