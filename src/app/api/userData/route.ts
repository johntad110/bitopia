import { readData, creatData } from "@/lib/actions/user/read";
import { data } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { tg_id, first_name, last_name, username, language_code, photo_url } = body
    if (!tg_id) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
    }

    try {
        const user_data = await readData(tg_id)
        if (!user_data) { // Save user in the database...and return
            const u_data: data = {
                tg_id: tg_id,
                first_name: first_name || 'unknown',
                last_name: last_name || 'unknown',
                username: username || 'unknown',
                language_code: language_code || 'unknown',
                photo_url: photo_url || 'unknown',
                bitopia_points: 0,
                bitopia_friends: [],
                level: 0,
                tasks: [],
                rank: 0,

            }
            await creatData(u_data);
            return new Response(JSON.stringify({
                userData: u_data,
                message: 'Successful.'
            }), {
                status: 200
            })
        }

        return new Response(JSON.stringify({
            userData: user_data,
            message: 'Successful.'
        }),
            { status: 200 },
        );
    } catch (error) {
        console.error('Error ', error)
        return new Response(JSON.stringify({
            message: 'Something went wrong.'
        }), {
            status: 500
        })
    }
}