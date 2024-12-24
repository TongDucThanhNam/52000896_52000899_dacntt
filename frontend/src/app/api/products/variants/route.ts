import { NextRequest } from 'next/server';


export async function GET() {
    return Response.json({ message: 'Hello World' })
}

export async function POST(request: NextRequest) {
    try {
        const productData = await request.json();

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
            throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
        }

        const response = await fetch(`${backendUrl}/api/products/variants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }

        const result = await response.json();
        return Response.json(result);
    } catch (error) {
        console.error('Error in API route:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

