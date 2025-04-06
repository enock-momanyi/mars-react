'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import FullPhoto from '@/components/FullPhoto';
import PhotoCard from '@/components/PhotoCard';
import { rovers, rover_cameras, RoverType } from '@/rovers';
import { PhotoManifest, RoverForm, RoverPhoto } from '@/types';

export default function Rover() {
  const [roverManifest, setRoverManifest] = useState<PhotoManifest | null>(null);
  const [dateFormart, setDateFormart] = useState<number>(1);
  const [formData, setFormData] = useState<RoverForm>({
    sol: -1,
    earth_date: '',
    camera: '',
    page: 1,
  });
  const [roverPhotos, setRoverPhotos] = useState<RoverPhoto[] | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const pathname = usePathname();
  const rover: RoverType = pathname.slice(7) as RoverType;
  const isRoverValid = rovers.includes(rover);

  useEffect(() => {
    const manifest = async () => {
      try {
        const { data, status } = await axios.get(`/api/manifest?rover=${rover}`);
        if (status === 200) {
          setRoverManifest(data);
        }
      } catch (error) {
        console.error('Error fetching manifest', error);
      }
    };
    manifest();
  }, [rover]);

  const handleDateFormatClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setDateFormart(Number(e.currentTarget.value));
  };

  const handleGetPhotos = () => {
    const getPhotos = async () => {
      const date_format_string =
        formData.sol === -1
          ? `earth_date=${formData.earth_date}`
          : `sol=${formData.sol}`;
      const path = formData.sol === -1 ? 'earthPhotos' : 'solPhotos';
      const url = `/api/${path}?rover=${rover}&${date_format_string}&camera=${formData.camera}&page=${formData.page}`;
      try {
        const { data, status } = await axios.get(url);
        if (status === 200) {
          setRoverPhotos(data.photos);
        }
      } catch (error) {
        console.error('Error fetching photos', error);
      }
    };

    if (
      ((formData.sol === -1 && formData.earth_date.length !== 0) ||
        (formData.sol !== -1 && formData.earth_date.length === 0)) &&
      formData.camera.length !== 0
    ) {
      getPhotos();
    }
  };

  const openPhoto = (imgUrl: string) => {
    setSelectedPhoto(imgUrl);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-[auto,1fr] gap-4 h-screen p-4">
      {/* Left Side: Table and Photo Grid */}
      <div className="col-span-1 flex flex-col">
        {/* Table Section */}
        <div className="overflow-auto mb-4">
          <table className="w-full border border-dashed">
            <thead className="border-b border-dashed">
              <tr>
                <th className="border-r border-dashed">Name</th>
                <th className="border-r border-dashed">Landing Date</th>
                <th className="border-r border-dashed">Launch Date</th>
                <th className="border-r border-dashed">Status</th>
                <th className="border-r border-dashed">Max Sol</th>
                <th className="border-r border-dashed">Max Date</th>
                <th className="border-r border-dashed">Total Photos</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border-r border-dashed">{roverManifest?.photo_manifest.name}</td>
                <td className="border-r border-dashed">{roverManifest?.photo_manifest.landing_date}</td>
                <td className="border-r border-dashed">{roverManifest?.photo_manifest.launch_date}</td>
                <td className="border-r border-dashed">{roverManifest?.photo_manifest.status}</td>
                <td className="border-r border-dashed">{roverManifest?.photo_manifest.max_sol}</td>
                <td className="border-r border-dashed">{roverManifest?.photo_manifest.max_date}</td>
                <td className="border-r border-dashed">{roverManifest?.photo_manifest.total_photos}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Photo Grid Section */}
        <div className="flex-1 overflow-y-auto">
          {roverPhotos && (
            <div className="grid grid-cols-2 gap-4">
              {roverPhotos.map((rp, ind) => (
                <div key={ind}>
                  <PhotoCard
                    camera_name={rp.camera.full_name}
                    earth_date={rp.earth_date}
                    img_url={rp.img_src}
                    openPhoto={() => openPhoto(rp.img_src)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Right Side: Form */}
      <div className="col-span-1 overflow-auto">
        <form className="flex flex-col gap-2.5">
          <div className="flex gap-1.5">
            <input
              type="radio"
              name="date_format"
              id="sol"
              value={1}
              defaultChecked
              onClick={handleDateFormatClick}
            />
            <label htmlFor="sol">Sol</label>
            <input
              type="radio"
              name="date_format"
              id="earth_date"
              value={2}
              onClick={handleDateFormatClick}
            />
            <label htmlFor="earth_date">Earth Date</label>
          </div>
          <div>
            <label htmlFor="sol_value" className="inline-block w-2/12">
              Sol
            </label>
            <input
              type="number"
              name="sol_value"
              id="sol_value"
              className="border"
              disabled={dateFormart === 2}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sol: Number(e.target.value),
                  earth_date: '',
                })
              }
            />
          </div>
          <div>
            <label htmlFor="earth_date_value" className="inline-block w-2/12">
              Earth Date
            </label>
            <input
              type="date"
              name="earth_date_value"
              id="earth_date_value"
              className="border"
              disabled={dateFormart === 1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  earth_date: e.target.value,
                  sol: -1,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="camera" className="inline-block w-2/12">
              Camera
            </label>
            <select
              name="camera"
              id="camera"
              onChange={(e) =>
                setFormData({ ...formData, camera: e.target.value })
              }
            >
              <option value="">--Please choose an option--</option>
              {rover_cameras[rover].map((rv, i) => (
                <option value={rv} key={i}>
                  {rv}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="page" className="inline-block w-2/12">
              Page
            </label>
            <input
              type="number"
              name="page"
              id="page"
              defaultValue={1}
              className="border"
              onChange={(e) =>
                setFormData({ ...formData, page: Number(e.target.value) })
              }
            />
          </div>
          <button
            className="border hover:bg-amber-100"
            type="button"
            onClick={handleGetPhotos}
          >
            Get Photos
          </button>
        </form>
      </div>

      {/* Modal Popup */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closePhoto} // Clicking the backdrop closes the modal
        >
            <FullPhoto image_url={selectedPhoto} closePhoto={closePhoto} />
        </div>
      )}
    </div>
  );
}
