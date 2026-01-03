import { CheckCircle } from "lucide-react";

const OrderSuccess = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl animate-scaleIn">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Order Successful!</h2>
        <p className="text-gray-600 mt-2">
          Your order has been placed successfully.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Invoice downloaded to your device.
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
