import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { AuthContext } from "../context/AuthContext";
import { PlanContext } from "../context/PlanContext";
import { PLANS } from "../config/plans";

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { plan, upgradePlan } = useContext(PlanContext);

  function handleSelect(selectedPlan) {
    if (!user) {
      navigate("/login");
      return;
    }

    if (selectedPlan === "FREE") {
      upgradePlan("FREE");
      alert("Free plan activated 🎉");
    }

    if (selectedPlan === "PRO") {
      navigate("/checkout");
    }

    if (selectedPlan === "ENTERPRISE") {
      navigate("/contact");
    }
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-16 px-6">

        <h1 className="text-4xl font-bold text-center mb-4">
          Pricing Plans
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Simple, transparent pricing.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {Object.values(PLANS).map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-lg p-8 border ${
                plan === item.id
                  ? "border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-bold mb-3">{item.name}</h2>

              <p className="text-3xl font-bold mb-6">
                {item.price === 0
                  ? "₹0"
                  : item.price === "Custom"
                  ? "Custom"
                  : `₹${item.price} / month`}
              </p>

              <ul className="space-y-2 mb-8">
                {item.features.map((f, i) => (
                  <li key={i} className="text-gray-600">
                    ✔ {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(item.id)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                {plan === item.id ? "Current Plan" : "Get Started"}
              </button>
            </div>
          ))}

        </div>
      </div>
    </MainLayout>
  );
}
