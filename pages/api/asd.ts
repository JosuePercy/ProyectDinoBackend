// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../database/connection";
import Cors from "cors";

function initMiddleware(middleware: any) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["OPTIONS", "GET"],
  })
);
export default async function Dinos(
  req: NextApiRequest,
  response: NextApiResponse
) {
  await cors(req, response);
  switch (req.method) {
    case "GET":
      return getLisApi(req, response);

    default:
      return response.status(400).json({
        code: 400,
        messenger: "Ocurrio un error en el sistema",
      });
  }
}
const getLisApi = async (req: NextApiRequest, response: NextApiResponse) => {
  const query =
    "select juguetes.id, juguetes.name, juguetes.image,juguetes.precio,juguetes.stock,juguetes.status,juguetes.dateregister  from  juguetes";

  const reponseDB = await connection.query(query);
  // response.status(200).json([]);
  response.status(200).json(reponseDB.rows);
};
