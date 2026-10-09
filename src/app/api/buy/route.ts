import {getItems, buyItems} from "../../../lib/db/items";

export async function GET(request: Request) { 
    // Get a list of items that the store has
    const items = await getItems(); // Replace with your actual logic to fetch items
    return new Response(JSON.stringify(items), { status: 200 });
}

export async function POST(request: Request) {
    // Buy an item(s), but dont do decrement or calculation logic here
    const transaction = await buyItems(request); // Boolean success or failure of purchase
    if (transaction) {
        return new Response("Thanks for your business!", {status: 200});
    } else {
        return new Response("Transaction Failed! We may be out of stock or items were incorrect", {status: 401});
    }
}