import db from "@/db";
import { data } from "@/types";
import { RowDataPacket } from "mysql2";

export async function  readData(tg_id: string): Promise<data | null> {
    return new Promise<data | null>((resolve, reject) => {
        const connection = db.getConnection((err, connection) => {
            if (err) {
                return (reject(err))
            }
            connection.query('SELECT * FROM bitopia WHERE tg_id = ?', [tg_id], (err, results: RowDataPacket[]) => {
                if (err) {
                    return reject(err)
                }
                if (results.length === 0) {
                    resolve(null)
                }
                const u_data = results[0]
                try {
                    const d = JSON.parse(u_data.data)
                    resolve(d)
                } catch (error) {
                    reject(new Error('Error parsing json data.'))
                } finally {
                    connection.release();
                }
            })
        })
    })
}

export async function creatData(data: data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const connection = db.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            const serializedData = JSON.stringify(data);
            connection.query('INSERT INTO bitopia (tg_id, data) VALUES (?, ?)', [data.tg_id, serializedData], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve()
            })
        })
    })
}

export async function updateData(data: data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const connection = db.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            const serializedData = JSON.stringify(data);
            connection.query('UPDATE bitopia SET data = ? WHERE tg_id = ?', [serializedData, data.tg_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve()
            })
        })
    })
}