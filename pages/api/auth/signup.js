import connectMongo from "@/database/conn";

export default async function handler(req, res) {
    connectMongo().catch((error) => res.json({ error: "Connection Failed" }));

    //     only method is accepted
    if (req.method == "POST") {
    }
}
