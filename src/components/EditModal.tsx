import React, { useState } from "react";

interface EditPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    originalPrice: string;
    specialPrice: number;
    specialPriceId: string;
  };
  onSave: (newPrice: number) => Promise<void>;
}

const EditModal: React.FC<EditPriceModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
}) => {
  const [newPrice, setNewPrice] = useState<string>("");

  const handleSave = async () => {
    if (!newPrice.trim()) return;
    await onSave(Number(newPrice));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000004f] bg-opacity-50">
      <div className="border-white bg-[#242424] p-10 border h-[400px] w-[300px] justify-between flex flex-col rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{product.name}</h2>
        <p className="text-xl">Precio original: ${product.originalPrice}</p>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <div className="flex justify-around gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
