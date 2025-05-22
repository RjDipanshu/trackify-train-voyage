
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const trainClasses = [
  { id: "1A", label: "AC First Class (1A)" },
  { id: "2A", label: "AC 2 Tier (2A)" },
  { id: "3A", label: "AC 3 Tier (3A)" },
  { id: "SL", label: "Sleeper (SL)" },
  { id: "CC", label: "Chair Car (CC)" },
  { id: "2S", label: "Second Sitting (2S)" }
];

const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get current filters from search params
  const currentClass = searchParams.get("class") || "all";
  
  // Selected classes state
  const [selectedClasses, setSelectedClasses] = useState<string[]>(
    currentClass === "all" ? [] : [currentClass]
  );
  
  // Departure time range
  const [departureRange, setDepartureRange] = useState([0, 24]);
  
  // Arrival time range
  const [arrivalRange, setArrivalRange] = useState([0, 24]);
  
  // Handle class selection
  const handleClassChange = (cls: string) => {
    setSelectedClasses((prev) => 
      prev.includes(cls) 
        ? prev.filter((c) => c !== cls)
        : [...prev, cls]
    );
  };
  
  // Apply filters
  const applyFilters = () => {
    // Update the class parameter
    if (selectedClasses.length > 0) {
      searchParams.set("class", selectedClasses.join(","));
    } else {
      searchParams.set("class", "all");
    }
    
    // You could add more parameters here for other filters
    searchParams.set("depFrom", departureRange[0].toString());
    searchParams.set("depTo", departureRange[1].toString());
    searchParams.set("arrFrom", arrivalRange[0].toString());
    searchParams.set("arrTo", arrivalRange[1].toString());
    
    setSearchParams(searchParams);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedClasses([]);
    setDepartureRange([0, 24]);
    setArrivalRange([0, 24]);
    
    // Reset the search params
    const params = new URLSearchParams(searchParams);
    params.set("class", "all");
    params.delete("depFrom");
    params.delete("depTo");
    params.delete("arrFrom");
    params.delete("arrTo");
    
    setSearchParams(params);
  };
  
  // Format time values for display
  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Train Classes */}
          <div>
            <h3 className="font-medium text-lg mb-3">Train Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {trainClasses.map((cls) => (
                <div key={cls.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`class-${cls.id}`} 
                    checked={selectedClasses.includes(cls.id)}
                    onCheckedChange={() => handleClassChange(cls.id)}
                  />
                  <Label htmlFor={`class-${cls.id}`} className="text-sm">
                    {cls.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Departure Time Range */}
          <div>
            <h3 className="font-medium text-lg mb-3">Departure Time</h3>
            <div className="px-2">
              <Slider
                defaultValue={departureRange}
                max={24}
                step={0.5}
                value={departureRange}
                onValueChange={setDepartureRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatTime(departureRange[0])}</span>
                <span>{formatTime(departureRange[1])}</span>
              </div>
            </div>
          </div>
          
          {/* Arrival Time Range */}
          <div>
            <h3 className="font-medium text-lg mb-3">Arrival Time</h3>
            <div className="px-2">
              <Slider
                defaultValue={arrivalRange}
                max={24}
                step={0.5}
                value={arrivalRange}
                onValueChange={setArrivalRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatTime(arrivalRange[0])}</span>
                <span>{formatTime(arrivalRange[1])}</span>
              </div>
            </div>
          </div>
          
          {/* Filter Actions */}
          <div className="flex space-x-3 pt-2">
            <Button 
              onClick={applyFilters}
              className="flex-1 bg-train-accent hover:bg-opacity-90"
            >
              Apply Filters
            </Button>
            <Button 
              onClick={resetFilters}
              variant="outline" 
              className="flex-1 border-gray-300"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
