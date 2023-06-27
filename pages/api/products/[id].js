import { getProductById } from "../../../services/productServices";

export default function handler(request, response) {
  const { id } = request.query;
  const poduct = getProductById(id);
  response.status(200).json(poduct);
}
