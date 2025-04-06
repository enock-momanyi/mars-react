import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const rover = searchParams.get('rover');
    const earth_date = searchParams.get('earth_date');
    const camera = searchParams.get('camera');
    const page = searchParams.get('page');

    const api = axios.create({
        baseURL: process.env.API_URL,
        params: {
            api_key: process.env.API_KEY
        }
    });
    const response = await api.get(`/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&camera=${camera}&page=${page}`);

    return NextResponse.json(response.data);
}