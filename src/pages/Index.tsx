
import { ParticleField } from "../components/ParticleField";
import { ScrollProgress } from "../components/ScrollProgress";
import Act1 from "../components/Act1_Liquid_B3.jsx";
// import { Act1 } from "../components/Act1";
import  Act2  from "../components/Act2_Liquid_Discovery.jsx";
import  Act3  from "../components/Act3_Liquid_Pulse.jsx";
import { Act4 } from "../components/Act4";
import { Act5 } from "../components/Act5";

const Index = () => {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <ScrollProgress />
      <ParticleField />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="text-center z-10 max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            In Code I Found Myself
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            A cinematic journey through the making of a creative developer
          </p>
          <div className="animate-bounce">
            <div className="w-1 h-12 sm:h-16 bg-gradient-to-b from-purple-400 to-transparent rounded-full mx-auto" />
          </div>
        </div>
      </div>

      {/* Story Acts */}
      <Act1 />
      <Act2 />
      <Act3 />
      <Act4 />
      <Act5 />
    </div>
  );
};

export default Index;
