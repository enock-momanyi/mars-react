import Image from "next/image";

export default function FullPhoto({
  image_url,
  closePhoto,
}: {
  image_url: string;
  closePhoto?: () => void;
}) {
  return (
    <div className="relative w-full h-[50vw] sm:h-[40vw] md:h-[30vw] lg:h-[25vw]">
      <button
        onClick={closePhoto}
        className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-2 z-10"
      >
        X
      </button>
      <Image
        src={image_url}
        fill
        alt="Mars Image"
        className="object-cover rounded-2xl"
      />
    </div>
  );
}
