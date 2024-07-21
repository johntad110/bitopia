import { readData, updateData } from "@/lib/actions/user/read";
import { data } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { tg_id, points, remainingEnergy } = body;

    if (!tg_id) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
    }

    try {
        const user_data = await readData(tg_id);
        if (user_data) {
            const newUserData: data = {
                ...user_data,
                bitopia_points: points,
                remaining_energy: remainingEnergy
            }
            await updateData(newUserData)
            return new Response(JSON.stringify({ message: 'Successfully updated data' }), { status: 201 })
        } else {
            console.log('No user data: ', tg_id);
            return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
        }
    } catch (error) {
        console.error('Error ', error)
        return new Response(JSON.stringify({ message: 'Something went wrong.' }), { status: 500 })
    }
}