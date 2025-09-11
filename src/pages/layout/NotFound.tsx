import { TypingAnimation } from "@/components/magicui/typing-animation";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 p-4 lg:p-0 text-center">
      <TypingAnimation className="text-4xl text-gray-500 text-wrap">
        Halaman Tidak Ditemukan
      </TypingAnimation>
    </div>
  );
}

export default NotFound;
