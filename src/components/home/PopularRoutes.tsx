
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const popularRoutes = [
  {
    from: "New Delhi (NDLS)",
    to: "Mumbai CST (CSTM)",
    fromCode: "ndls",
    toCode: "cstm",
    trainCount: 15,
    duration: "17h 30m"
  },
  {
    from: "Mumbai CST (CSTM)",
    to: "Bengaluru (SBC)",
    fromCode: "cstm",
    toCode: "sbc",
    trainCount: 12,
    duration: "20h 45m"
  },
  {
    from: "Chennai Central (MAS)",
    to: "Howrah (HWH)",
    fromCode: "mas",
    toCode: "hwh",
    trainCount: 10,
    duration: "26h 15m"
  },
  {
    from: "Bengaluru (SBC)",
    to: "New Delhi (NDLS)",
    fromCode: "sbc",
    toCode: "ndls",
    trainCount: 8,
    duration: "33h 20m"
  }
];

const PopularRoutes = () => {
  const navigate = useNavigate();
  
  const handleRouteSelect = (fromCode: string, toCode: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formattedDate = tomorrow.toISOString().split('T')[0];
    
    navigate(`/search?from=${fromCode}&to=${toCode}&date=${formattedDate}&class=all`);
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-train-primary mb-4">
            Popular Routes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the most traveled train routes across the country with comprehensive schedule information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-train-primary font-medium">{route.from}</div>
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                    <div className="text-train-primary font-medium">{route.to}</div>
                  </div>
                  
                  <div className="flex justify-between mb-4 text-sm text-gray-600">
                    <div>{route.trainCount} Trains</div>
                    <div>Avg. {route.duration}</div>
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      onClick={() => handleRouteSelect(route.fromCode, route.toCode)}
                      variant="outline" 
                      className="w-full border-train-accent text-train-accent hover:bg-train-accent hover:text-white"
                    >
                      View Trains
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
