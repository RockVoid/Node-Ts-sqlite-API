import { dbQuery, dbQueryFirst } from "../services/db";

export type Product = {
  id: number,
  name: string,
  price: number,
}

const getProduct = async (id: number) => {
  const retorno = await dbQueryFirst(`SELECT * FROM Product WHERE id = ?`, [id]);
  return retorno[0] as Product | undefined;
}

const insertProduct = async (product: Product) => {
  await dbQuery(`INSERT INTO Product (name, price) VALUES (?, ?)`, [product.name, product.price]);
  let retorno = await dbQuery(`SELECT seq AS id from sqlite_sequence WHERE name = 'Product'`);
  return retorno[0].id;
}

const updateProduct = async (product: Product) => {
  await dbQuery(`
    UPDATE Product
    SET name = ?, price = ? 
    WHERE id = ?`, 
    [product.name, product.price, product.id]
  );
  return getProduct(product.id);
}

const deleteProduct = async (id: number) => await dbQuery(`DELETE FROM Product WHERE id = ?`, [id]);

const listProducts = async () => {
  const retorno = await dbQuery(`SELECT * FROM Product`);
  return retorno as Product[];
}

export const productModel = {
  insertProduct,
  deleteProduct,
  updateProduct,
  listProducts,
  getProduct,
}