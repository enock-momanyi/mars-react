export interface Rover {
    name: string,
    landing_date: string,
    launch_date: string,
    status: string,
    max_sol: number,
    max_date: string,
    total_photos: number,
    photos: Photos[]
}

export interface Photos{
    sol: number,
    earth_date: string,
    total_photos: number,
    cameras: string[]
}
export interface PhotoManifest{
    photo_manifest: Rover
}

export interface RoverPhoto{
    id: number,
    sol: number,
    camera: {id: number,name: string, rover_id: number, full_name: string},
    img_src: string,
    earth_date: string,
    rover: {id: number, name: string, landing_date: string, launch_date: string, status: string}
}

export interface RoverForm{
    sol: number,
    earth_date: string,
    camera: string,
    page: number
}