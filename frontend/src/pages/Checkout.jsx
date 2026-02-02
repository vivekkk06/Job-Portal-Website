import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useContext } from "react";
import { PlanContext } from "../context/PlanContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { upgradePlan } = useContext(PlanContext);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  function handlePayment(e) {
    e.preventDefault();
    setLoading(true);

    // Fake delay for realism
    setTimeout(() => {
      upgradePlan("PRO");
      alert("🎉 Payment Successful! PRO plan activated.");
      navigate("/");
    }, 1500);
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Complete Your Purchase
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>PRO Plan</span>
              <span>₹499 / month</span>
            </div>

            <div className="flex justify-between mb-3 text-gray-500">
              <span>Taxes</span>
              <span>Included</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹499</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-6">
              Payment Method
            </h2>

            {/* Payment Selector */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`px-4 py-2 rounded-lg border ${
                  paymentMethod === "card"
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300"
                }`}
              >
                Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`px-4 py-2 rounded-lg border ${
                  paymentMethod === "upi"
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300"
                }`}
              >
                UPI
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">

              {paymentMethod === "card" && (
                <>
                  <input
                    placeholder="Card Number"
                    className="w-full border px-4 py-3 rounded-xl"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="MM/YY"
                      className="border px-4 py-3 rounded-xl"
                      required
                    />
                    <input
                      placeholder="CVC"
                      className="border px-4 py-3 rounded-xl"
                      required
                    />
                  </div>

                  <input
                    placeholder="Cardholder Name"
                    className="w-full border px-4 py-3 rounded-xl"
                    required
                  />
                </>
              )}

              {paymentMethod === "upi" && (
                <input
                  placeholder="Enter UPI ID (example@upi)"
                  className="w-full border px-4 py-3 rounded-xl"
                  required
                />
              )}

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Pay ₹499"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}
