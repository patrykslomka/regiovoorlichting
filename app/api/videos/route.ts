import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/videos.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read videos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const videos = JSON.parse(data);
    const newVideo = await request.json();
    
    const maxId = videos.length > 0 ? Math.max(...videos.map((v: any) => v.id)) : 0;
    newVideo.id = maxId + 1;
    
    videos.push(newVideo);
    fs.writeFileSync(dataPath, JSON.stringify(videos, null, 2));
    
    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const videos = JSON.parse(data);
    const updatedVideo = await request.json();
    
    const index = videos.findIndex((v: any) => v.id === updatedVideo.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    
    videos[index] = updatedVideo;
    fs.writeFileSync(dataPath, JSON.stringify(videos, null, 2));
    
    return NextResponse.json(updatedVideo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    const data = fs.readFileSync(dataPath, 'utf8');
    const videos = JSON.parse(data);
    
    const filteredVideos = videos.filter((v: any) => v.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(filteredVideos, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}