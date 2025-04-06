'use client';

import { rovers } from "@/rovers";
import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter();
  const handleClick = (roverName: string) => {
    router.push(`/rover/${roverName}`)
  }
  return (
      <div className="grid grid-cols-2 h-7/12 w-7/12 place-items-center border-2 border-zinc-600">
        {
          rovers.map((rover, index) => (
            <div 
              key={index} 
              className="border-2  border-dotted w-[95%] h-[95%] flex items-center 
              justify-center hover:bg-amber-100 hover:z-10 hover:cursor-pointer"
              onClick={() => handleClick(rover)}
            >
              {rover}
            </div>
          ))
        }
      </div> 
  );
}
