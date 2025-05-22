
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AppCTA = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="bg-gradient-to-r from-train-primary via-train-secondary to-train-accent rounded-xl overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image/Illustration side */}
          <div className="md:h-96 h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            {/* Animation for train movement */}
            <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 opacity-70">
              <div className="w-24 h-8 bg-white rounded-md animate-train-move">
                <div className="relative w-full h-full">
                  {/* Train windows */}
                  <div className="absolute top-2 left-2 w-3 h-3 bg-train-primary rounded-sm"></div>
                  <div className="absolute top-2 left-7 w-3 h-3 bg-train-primary rounded-sm"></div>
                  <div className="absolute top-2 left-12 w-3 h-3 bg-train-primary rounded-sm"></div>
                  <div className="absolute top-2 left-17 w-3 h-3 bg-train-primary rounded-sm"></div>
                </div>
              </div>
            </div>
            
            {/* Stylized tracks */}
            <div className="absolute bottom-10 left-0 w-full h-2 bg-gray-700"></div>
            <div className="absolute bottom-10 left-0 w-full">
              <div className="flex justify-between">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-800"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content side */}
          <div className="p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Travel Smart with TrainTracker
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get real-time updates, live tracking, and personalized travel recommendations for your train journeys.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <Button size="lg" className="bg-white text-train-primary hover:bg-gray-100">
                Start Tracking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppCTA;
