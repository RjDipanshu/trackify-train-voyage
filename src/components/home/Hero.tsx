
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stations = [
  { value: "ndls", label: "New Delhi (NDLS)" },
  { value: "cstm", label: "Mumbai CST (CSTM)" },
  { value: "mas", label: "Chennai Central (MAS)" },
  { value: "hwh", label: "Howrah (HWH)" },
  { value: "bza", label: "Vijayawada (BZA)" },
  { value: "sbc", label: "Bengaluru (SBC)" }
];

const trainClasses = [
  { value: "all", label: "All Classes" },
  { value: "1A", label: "AC First Class (1A)" },
  { value: "2A", label: "AC 2 Tier (2A)" },
  { value: "3A", label: "AC 3 Tier (3A)" },
  { value: "SL", label: "Sleeper (SL)" },
  { value: "CC", label: "Chair Car (CC)" },
  { value: "2S", label: "Second Sitting (2S)" }
];

const Hero = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [trainClass, setTrainClass] = useState("all");

  const handleSearch = () => {
    // Ideally we would validate the form first
    navigate(`/search?from=${from}&to=${to}&date=${date ? format(date, "yyyy-MM-dd") : ""}&class=${trainClass}`);
  };

  // Function to swap from and to stations
  const swapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-train-primary via-train-secondary to-train-accent opacity-90"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32 text-white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find & Track Your Train</h1>
          <p className="text-lg md:text-xl opacity-90">
            Real-time tracking, seat availability, and comprehensive train information at your fingertips.
          </p>
        </div>
        
        {/* Search Box */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl text-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger id="from" className="w-full">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((station) => (
                    <SelectItem key={station.value} value={station.value}>
                      {station.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Swap button */}
            <div className="md:hidden flex justify-center my-2">
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={swapStations}
                className="rounded-full h-8 w-8 p-0 rotate-90"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="flex">
                <Select value={to} onValueChange={setTo} className="w-full">
                  <SelectTrigger id="to">
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station.value} value={station.value}>
                        {station.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Swap button for desktop */}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={swapStations}
                  className="ml-2 hidden md:flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <Select value={trainClass} onValueChange={setTrainClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {trainClasses.map((cls) => (
                    <SelectItem key={cls.value} value={cls.value}>
                      {cls.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleSearch}
            className="w-full bg-train-accent hover:bg-opacity-90 text-white"
            size="lg"
          >
            Search Trains
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
