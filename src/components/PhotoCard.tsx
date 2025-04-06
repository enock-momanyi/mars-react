import Image from "next/image";

export default function PhotoCard({
  camera_name,
  earth_date,
  img_url,
  openPhoto,
}: {
  camera_name: string;
  earth_date: string;
  img_url: string;
  openPhoto?: () => void;
}) {
  return (
    <div>
      <div>
        <Image
          src={img_url}
          width={500}
          height={500}
          alt={`Mars ${camera_name} ${earth_date}`}
          onClick={openPhoto}
          className="cursor-pointer"
        />
      </div>
      <div>
        <span>{camera_name}</span>
        <span>{earth_date}</span>
      </div>
    </div>
  );
}
