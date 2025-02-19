import { useEffect, useState } from "react";
import { getProducts, getSpecialPrices, getUserSpecialPrice } from "../api/api";
import { Product, UserProduct } from "../interfaces/interfaces";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      const users = await getUserSpecialPrice();
      setUsers(users);
      setProducts(productsData);
    };
    fetchData();
  }, []);

  const fetchUserSpecialPrice = async (x: string) => {
    try {
      if (typeof x !== "string" || x.trim() === "") {
        console.error("User ID no válido");
        return;
      }
      const specialPricesData = await getSpecialPrices(x);
      setUserProducts(specialPricesData);
    } catch (error) {
      console.error("Error al buscar el usuario: ", error);
    }
  };

  const calcularAhorro = (original: number, especial: number) => {
    return ((original - especial) / original) * 100;
  };

  return (
    <div className="container mx-auto mt-8 gap-4 flex flex-col">
      <h2 className="text-5xl">Lista de Productos</h2>
      <div className="flex justify-center items-center gap-2">
        <h2>Usuarios con precios especiales:</h2>
        {users.map((user, i) => (
          <div
            key={i}
            onClick={() => fetchUserSpecialPrice(user)}
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <h2>{user}</h2>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => {
          const specialProduct = userProducts.find(
            (p) => p.name === product.name
          );
          return (
            <div
              key={product._id}
              className="border rounded-2xl p-4 flex flex-col gap-2 w-[300px] justify-between bg-[#0000003b] hover:scale-105 transition-all"
            >
              <p className="text-3xl font-bold">{product.name}</p>
              <p className="text-white/50">Categoria: {product.category}</p>
              <p className="">{product.description}</p>
              <div className="flex items-center justify-around">
                {specialProduct ? (
                  <div className="flex flex-col">
                    <p className="text-green-500 text-[2rem] font-bold">
                      ${specialProduct.specialPrice}
                    </p>
                    <p className="line-through text-red-500">
                      ${specialProduct.originalPrice}
                    </p>
                    <p className="text-yellow-500">
                      Ahorras: -
                      {calcularAhorro(
                        specialProduct.originalPrice,
                        specialProduct.specialPrice
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                ) : (
                  <p className="text-[2rem] text-green-500 font-bold">
                    ${product.price}
                  </p>
                )}
                <p>Stock: {product.stock}</p>
              </div>
              <div className="flex justify-center">
                {product.tags.map((tag: string, i: number) => (
                  <div key={i}>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
