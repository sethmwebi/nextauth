import { NextApiRequest, NextApiResponse } from "next"

export default(_req: NextApiRequest, res: NextApiResponse): void => {
	res.status(200).json({name: "Jessica Kemunto", email: "jessicakemunto@gmail.com"})
}