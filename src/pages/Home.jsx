import { useState } from "react";
import { useNavigate } from "react-router";
import { Zap, Lightbulb, ShieldCheck } from "lucide-react";
import LocationModal from "../components/LocationModal";

const Home = () => {
  // const [click, setClick] = useState(false);
  // State to control location modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Data array for bottom feature cards
  const features = [
    {
      icon: Zap,
      title: "Instant weather",
      description: "Live conditions for any city",
    },
    {
      icon: Lightbulb,
      title: "Smart tips",
      description: "A suggestion for your day",
    },
    {
      icon: ShieldCheck,
      title: "No signup",
      description: "Free and always available",
    },
  ];

  // Handle city search submission from modal
  const handleSearch = (cityName) => {
    setIsModalOpen(false);
    // Navigate to weather page with city name state
    navigate("/weather", { state: { location: { name: cityName } } });
  };

  // Handle geolocation button click from modal
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setIsModalOpen(false);
          // Navigate to weather page with latitude and longitude state
          navigate("/weather", {
            state: { location: { name: "Current Location", lat, lon } },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please check permissions.");
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorative animated gradient blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>

      {/* Top small badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-xs font-semibold text-slate-600 mb-6">
        <span className="text-blue-500">⚡</span> Free weather advice, no signup
      </div>

      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-3 text-center">
        <span className="text-gray-400">Cloudy </span>
        <span className="text-green-400">Weather</span>
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 text-center">
        Know the weather. Know what to carry.
      </h2>

      {/* Description text */}
      <p className="text-slate-500 text-sm md:text-base text-center max-w-xl mb-8 leading-relaxed">
        Check the weather in your city and get a simple, smart suggestion for
        your day — whether it's an umbrella, a water bottle, or warm clothes.
      </p>

      {/* Main Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 transition-all cursor-pointer mb-10"
      >
        Check My Weather &rarr;
      </button>

      {/* Three Feature Cards Grid (Bottom Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {features.map(({ icon: Icon, title, description }, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 flex items-center gap-4 text-left transition-transform hover:-translate-y-1 duration-200"
          >
            <div className="p-3 bg-blue-600 text-white rounded-2xl flex-shrink-0 shadow-md shadow-blue-500/20">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-0.5">
                {title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Location Search Modal Component */}
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
      />
    </div>
  );
};

export default Home;
