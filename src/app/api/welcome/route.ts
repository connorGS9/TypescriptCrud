

// Folder for endpoints for users entering store (auth / login)

export async function POST(request: Request) {
    const body = await request.json();
    // Handle the login logic here using the `body` data
    console.log("Login request body:", body);
    const success: boolean = loginOrCreate(body);
    return new Response(JSON.stringify({ message: success ? "Login successful" : "Login failed" }), { status: success ? 200 : 401 });
}