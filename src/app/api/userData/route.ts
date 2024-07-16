import { readData, creatData } from "@/lib/actions/user/read";
import { data } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { tg_id, first_name, last_name, username, language_code, photo_url } = body

    if (!tg_id) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
    }

    const user_data = await readData(tg_id)

    if (!user_data) { // Save user in the database...and return
        try {
            const u_data: data = {
                tg_id: tg_id,
                first_name: first_name,
                last_name: last_name,
                username: username,
                language_code: language_code,
                photo_url: photo_url,
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
        } catch (error) {
            return new Response(JSON.stringify({
                message: 'Something went wrong.'
            }), {
                status: 500
            })
        }
    }

    return new Response(JSON.stringify({
        userData: user_data,
        message: 'Successful.'
    }),
        { status: 200 },
    );
}