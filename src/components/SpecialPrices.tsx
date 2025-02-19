import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  addSpecialPrice,
  getUserSpecialPrice,
  getSpecialPrices,
  deleteSpecialPrice,
  getProducts,
  updateSpecialPrice,
} from "../api/api";
import EditModal from "./EditModal";
import { EditProduct, Product, UserProduct } from "../interfaces/interfaces";

const SpecialPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [specialPrice, setSpecialPrice] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedProduct, setEditedProduct] = useState<EditProduct>({
    name: "",
    originalPrice: "",
    specialPrice: 0,
    specialPriceId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !productId || !specialPrice) return;

    await addSpecialPrice({
      userId,
      productId,
      specialPrice: Number(specialPrice),
    });
    Swal.fire({
      title: "Precio especial agregado!",
      icon: "success",
      draggable: true,
    });
    const updatedSpecialPrices = await getSpecialPrices(userId);
    setUserProducts(updatedSpecialPrices);
    const updatedUsers = await getUserSpecialPrice();
    setUsers(updatedUsers);
    setUserId("");
    setProductId("");
    setSpecialPrice("");
  };

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

  const deletePrice = async (id: string) => {
    try {
      Swal.fire({
        title: "Estas seguro que desea eliminar este precio especial?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Precio especial eliminado!", "", "success");
          await deleteSpecialPrice(id);
          setUserProducts((prevProducts) =>
            prevProducts.filter((p) => p.specialPriceId !== id)
          );
          const updatedUsers = await getUserSpecialPrice();
          setUsers(updatedUsers);
        } else if (result.isDenied) {
          Swal.fire("No eliminaste el precio especial!", "", "error");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (product: UserProduct) => {
    setEditedProduct({
      name: product.name,
      originalPrice: product.originalPrice.toString(),
      specialPrice: product.specialPrice,
      specialPriceId: product.specialPriceId,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (newPrice: number) => {
    if (!editedProduct.specialPriceId) return;

    try {
      await updateSpecialPrice(editedProduct.specialPriceId, newPrice);
      Swal.fire({
        title: "Precio actualizado correctamente!",
        icon: "success",
        draggable: true,
      });
      setIsModalOpen(false);
      setUserProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.specialPriceId === editedProduct.specialPriceId
            ? { ...product, specialPrice: newPrice }
            : product
        )
      );
    } catch (error) {
      console.error("Error actualizando el precio:", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const productsData = await getProducts();
        const users = await getUserSpecialPrice();
        setUsers(users);
        setProducts(productsData);
      } catch (error) {
        console.error("Error trayendo a los usuarios: ", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container mx-auto mt-8 gap-4 flex flex-col">
      <h2 className="text-5xl">Agregar Precio Especial</h2>
      <div className="flex justify-center items-center gap-2">
        <h2>Usuarios :</h2>
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
      <div className="flex gap-10">
        <div className="gap-4 flex flex-col">
          <h2 className="text-xl">Lista de productos disponibles: </h2>
          {products &&
            products.map((product) => (
              <div key={product._id} className="border-b">
                <p>ID: {product._id}</p>
                <p>Nombre: {product.name}</p>
                <p>Nombre: {product.category}</p>
                <p>Precio: ${product.price}</p>
              </div>
            ))}
        </div>
        <div className="w-[400px] h-[400px] p-[1.5rem] rounded-2xl border">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full justify-around"
          >
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="p-2.5 rounded-sm border"
            />
            <input
              type="text"
              placeholder="ID de Producto"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="p-2.5 rounded-sm border"
            />
            <input
              type="number"
              placeholder="Precio Especial"
              value={specialPrice}
              onChange={(e) => setSpecialPrice(e.target.value)}
              className="p-2.5 rounded-sm border"
            />
            <button type="submit" className="border">
              Guardar
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {userProducts &&
            userProducts.map((product) => (
              <div
                key={product._id}
                className="border p-3 rounded-2xl flex flex-col gap-2 justify-center h-[300px]"
              >
                <h2>{product.name}</h2>
                <h2>Categoria: {product.category}</h2>
                <p>Precio original: ${product.originalPrice}</p>
                <p>Precio especial: ${product.specialPrice}</p>
                <button onClick={() => openModal(product)}>Editar</button>
                <button onClick={() => deletePrice(product.specialPriceId)}>
                  Eliminar
                </button>
              </div>
            ))}
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={editedProduct}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default SpecialPrices;
