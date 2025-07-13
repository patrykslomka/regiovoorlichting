import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/events.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const events = JSON.parse(data);
    const newEvent = await request.json();
    
    const maxId = events.length > 0 ? Math.max(...events.map((e: any) => e.id)) : 0;
    newEvent.id = maxId + 1;
    
    events.push(newEvent);
    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
    
    return NextResponse.json(newEvent);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const events = JSON.parse(data);
    const updatedEvent = await request.json();
    
    const index = events.findIndex((e: any) => e.id === updatedEvent.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    events[index] = updatedEvent;
    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    const data = fs.readFileSync(dataPath, 'utf8');
    const events = JSON.parse(data);
    
    const filteredEvents = events.filter((e: any) => e.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(filteredEvents, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}