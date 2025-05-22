
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for train results
const mockTrains = [
  {
    id: "12301",
    name: "Rajdhani Express",
    from: "New Delhi",
    to: "Mumbai CST",
    departureTime: "16:55",
    arrivalTime: "10:25",
    duration: "17h 30m",
    classes: ["1A", "2A", "3A"],
    availability: {
      "1A": "Available 12",
      "2A": "RAC 14",
      "3A": "WL 5"
    }
  },
  {
    id: "12951",
    name: "Mumbai Rajdhani",
    from: "New Delhi",
    to: "Mumbai Central",
    departureTime: "17:15",
    arrivalTime: "09:55",
    duration: "16h 40m",
    classes: ["1A", "2A", "3A"],
    availability: {
      "1A": "Available 4",
      "2A": "Available 22",
      "3A": "RAC 8"
    }
  },
  {
    id: "12909",
    name: "Garib Rath Express",
    from: "New Delhi",
    to: "Mumbai Central",
    departureTime: "15:35",
    arrivalTime: "08:10",
    duration: "16h 35m",
    classes: ["3A"],
    availability: {
      "3A": "WL 16"
    }
  },
  {
    id: "12617",
    name: "Mangala Express",
    from: "New Delhi",
    to: "Mumbai CST",
    departureTime: "10:55",
    arrivalTime: "05:30",
    duration: "18h 35m",
    classes: ["SL", "3A", "2A"],
    availability: {
      "SL": "Available 86",
      "3A": "Available 24",
      "2A": "Available 6"
    }
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [trains, setTrains] = useState<typeof mockTrains>([]);
  
  // Get search params
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const trainClass = searchParams.get("class") || "all";
  
  // Simulate loading
  useState(() => {
    setTimeout(() => {
      setTrains(mockTrains);
      setLoading(false);
    }, 1500);
  });
  
  // Format class names for display
  const formatClass = (cls: string) => {
    const classMap: Record<string, string> = {
      "1A": "AC First Class",
      "2A": "AC 2 Tier",
      "3A": "AC 3 Tier",
      "SL": "Sleeper",
      "CC": "Chair Car",
      "2S": "Second Sitting"
    };
    
    return classMap[cls] || cls;
  };
  
  // Determine availability badge color
  const getAvailabilityColor = (status: string) => {
    if (status.includes("Available")) return "bg-green-100 text-green-800";
    if (status.includes("RAC")) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-train-primary mb-2">
          Search Results
        </h2>
        <p className="text-gray-600">
          Showing trains from {from} to {to} on {date || "selected date"}
          {trainClass !== "all" && ` for class ${trainClass}`}
        </p>
      </div>
      
      {loading ? (
        // Loading skeletons
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <Skeleton className="h-6 w-16 mb-1 mx-auto" />
                        <Skeleton className="h-4 w-12 mx-auto" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="text-center">
                        <Skeleton className="h-6 w-16 mb-1 mx-auto" />
                        <Skeleton className="h-4 w-12 mx-auto" />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {trains.map((train) => (
            <Card key={train.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-bold text-lg text-train-primary flex items-center">
                        {train.name}
                        <span className="ml-2 text-sm text-gray-500">({train.id})</span>
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" /> 
                        {train.duration}
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        Daily
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 md:space-x-8 my-4 md:my-0">
                      <div className="text-center">
                        <div className="font-semibold text-lg">{train.departureTime}</div>
                        <div className="text-sm text-gray-600">{train.from}</div>
                      </div>
                      <div className="flex-1 flex items-center max-w-[100px]">
                        <div className="h-[2px] flex-1 bg-gray-300"></div>
                        <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
                        <div className="h-[2px] flex-1 bg-gray-300"></div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-lg">{train.arrivalTime}</div>
                        <div className="text-sm text-gray-600">{train.to}</div>
                      </div>
                    </div>
                    
                    <div>
                      <Button className="bg-train-accent hover:bg-opacity-90">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <div className="flex flex-wrap gap-2">
                      {train.classes.map((cls) => (
                        <div key={cls} className="flex flex-col items-center">
                          <div className="text-xs font-medium mb-1">{formatClass(cls)}</div>
                          <Badge
                            variant="outline"
                            className={getAvailabilityColor(train.availability[cls])}
                          >
                            {train.availability[cls]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {!loading && trains.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚫</div>
          <h3 className="text-2xl font-bold mb-2">No Trains Found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any trains matching your search criteria. Please try different stations or dates.
          </p>
          <Button className="bg-train-primary hover:bg-opacity-90">
            Back to Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
