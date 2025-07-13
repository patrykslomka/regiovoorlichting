import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/activities.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read activities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const activities = JSON.parse(data);
    const newActivity = await request.json();
    
    const maxId = activities.length > 0 ? Math.max(...activities.map((a: any) => a.id)) : 0;
    newActivity.id = maxId + 1;
    
    activities.push(newActivity);
    fs.writeFileSync(dataPath, JSON.stringify(activities, null, 2));
    
    return NextResponse.json(newActivity);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const activities = JSON.parse(data);
    const updatedActivity = await request.json();
    
    const index = activities.findIndex((a: any) => a.id === updatedActivity.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }
    
    activities[index] = updatedActivity;
    fs.writeFileSync(dataPath, JSON.stringify(activities, null, 2));
    
    return NextResponse.json(updatedActivity);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    const data = fs.readFileSync(dataPath, 'utf8');
    const activities = JSON.parse(data);
    
    const filteredActivities = activities.filter((a: any) => a.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(filteredActivities, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
  }
}