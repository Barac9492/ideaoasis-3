import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'approved';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('ideas')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching ideas:', error);
      return NextResponse.json(
        { error: 'Failed to fetch ideas' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ideas: data });
  } catch (error) {
    console.error('Error in GET /api/ideas:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      source_url,
      source_country,
      original_idea,
      korean_adaptation,
      feasibility_score,
      confidence_score,
      category,
      tags
    } = body;

    // Validate required fields
    if (!title || !description || !source_country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('ideas')
      .insert({
        title,
        description,
        source_url,
        source_country,
        original_idea,
        korean_adaptation,
        feasibility_score,
        confidence_score,
        category,
        tags,
        status: confidence_score >= 0.9 ? 'approved' : 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating idea:', error);
      return NextResponse.json(
        { error: 'Failed to create idea' },
        { status: 500 }
      );
    }

    return NextResponse.json({ idea: data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/ideas:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 