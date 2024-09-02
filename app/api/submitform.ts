// pages/api/submitform.ts
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const supabase = createClient();
        const { name, email, phone, cin, rue, postalCode, selectedAnswer } = req.body;

        const { data, error } = await supabase
            .from('castrol_winners')
            .insert([
                { name, email, phone, cin, rue, postalCode, selectedAnswer }
            ]);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ message: "Success", data });
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
