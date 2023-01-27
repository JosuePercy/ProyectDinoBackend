import { connection } from "../../../database/connection";
import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

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
  request: NextApiRequest,
  response: NextApiResponse
) {
  await cors(request, response);

  switch (request.method) {
    case "GET":
      return getLitApi(request, response);

    default:
      return response.status(400).json({
        field: 400,
        message: "Bad request",
      });
  }
}

const getLitApi = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { id } = request.query;
  // Consultando juguete
  const query = `select 
                    juguetes.id, 
                    juguetes.name, 
                    juguetes.image, 
                    juguetes.description, 
                    juguetes.precio, 
                    juguetes.descuento, 
                    juguetes.stock, 
                    juguetes.telefono, 
                    juguetes.whtssap, 
                    juguetes.status, 
                    juguetes.dateRegister, 
                    juguetes.idTienda,
                    tienda.name as tienda_name
                from juguetes
                inner join tienda
                  on tienda.id = juguetes.idtienda 
                where juguetes.id = $1`;
  const value = [id];
  const responseDB = await connection.query(query, value);

  // Consultando detalle del juguete
  const queryDetalle = `select 
                            alto, 
                            ancho, 
                            profundidad, 
                            color, 
                            material, 
                            peso, 
                            sonidos, 
                            edad_minima_recomendada
                        from juguetesdetalle
                        where idjuguetes = $1`;
  const valueDetalle = [id];
  const responseDBDetalle = await connection.query(queryDetalle, valueDetalle);

  let objResponse = {
    ...responseDB.rows[0],
    detalles: {
      ...responseDBDetalle.rows[0],
    },
  };

  return response.status(200).json(objResponse);
};
