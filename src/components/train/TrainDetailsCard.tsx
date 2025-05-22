
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock } from "lucide-react";

type TrainDetailsCardProps = {
  trainId: string;
};

// Mock detailed train data
const trainDetails = {
  id: "12301",
  name: "Rajdhani Express",
  number: "12301",
  from: {
    station: "New Delhi",
    code: "NDLS",
    time: "16:55",
    date: "Day 1",
    platform: 3
  },
  to: {
    station: "Mumbai CST",
    code: "CSTM",
    time: "10:25",
    date: "Day 2",
    platform: 5
  },
  duration: "17h 30m",
  distance: "1,383 km",
  status: "On Time",
  trainType: "Rajdhani",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  classes: ["1A", "2A", "3A"],
  progress: 65, // percentage of journey completed (if train is running)
  currentLocation: "Approaching Surat Junction",
  lastUpdated: "10 minutes ago",
  nextStop: "Surat Junction (ST) - ETA 15 mins"
};

const TrainDetailsCard = ({ trainId }: TrainDetailsCardProps) => {
  // In a real app, you'd fetch train details using the trainId
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-2xl font-bold text-train-primary flex items-center gap-2">
              {trainDetails.name}
              <span className="text-lg text-gray-500">({trainDetails.number})</span>
            </CardTitle>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <Clock className="h-4 w-4" /> {trainDetails.duration} • {trainDetails.distance}
            </p>
          </div>
          <div>
            <Badge
              className={`${
                trainDetails.status === "On Time"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {trainDetails.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Tabs defaultValue="overview">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="liveStatus" className="flex-1">Live Status</TabsTrigger>
            <TabsTrigger value="availability" className="flex-1">Availability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="space-y-6">
              {/* Journey Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Departure */}
                <div className="md:col-span-5 text-center md:text-left">
                  <div className="text-sm text-gray-500">{trainDetails.from.date}</div>
                  <div className="text-2xl font-bold">{trainDetails.from.time}</div>
                  <div className="text-lg font-medium">{trainDetails.from.station} ({trainDetails.from.code})</div>
                  <div className="text-sm mt-1">Platform {trainDetails.from.platform}</div>
                </div>
                
                {/* Journey line */}
                <div className="md:col-span-2 flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-train-primary"></div>
                    <div className="h-16 w-0.5 bg-gray-300 my-1"></div>
                    <div className="h-4 w-4 rounded-full bg-train-accent"></div>
                  </div>
                </div>
                
                {/* Arrival */}
                <div className="md:col-span-5 text-center md:text-right">
                  <div className="text-sm text-gray-500">{trainDetails.to.date}</div>
                  <div className="text-2xl font-bold">{trainDetails.to.time}</div>
                  <div className="text-lg font-medium">{trainDetails.to.station} ({trainDetails.to.code})</div>
                  <div className="text-sm mt-1">Platform {trainDetails.to.platform}</div>
                </div>
              </div>
              
              {/* Runs on */}
              <div>
                <div className="text-sm font-medium mb-2">Runs on</div>
                <div className="flex space-x-2">
                  {trainDetails.days.map((day) => (
                    <Badge 
                      key={day} 
                      variant="outline" 
                      className={`${
                        trainDetails.days.includes(day) 
                          ? "bg-train-accent/10 text-train-accent border-train-accent/30" 
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Classes */}
              <div>
                <div className="text-sm font-medium mb-2">Classes available</div>
                <div className="flex space-x-2">
                  {trainDetails.classes.map((cls) => (
                    <Badge key={cls} variant="secondary">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="liveStatus" className="mt-0">
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Current location</div>
                <div className="font-medium">{trainDetails.currentLocation}</div>
                <div className="text-sm text-gray-500 mt-3">Next station</div>
                <div className="font-medium">{trainDetails.nextStop}</div>
                <div className="text-xs text-gray-500 mt-1">Last updated {trainDetails.lastUpdated}</div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>{trainDetails.from.code}</span>
                  <span>Journey progress</span>
                  <span>{trainDetails.to.code}</span>
                </div>
                <Progress value={trainDetails.progress} className="h-2" />
              </div>
              
              <div className="rounded-lg bg-blue-50 p-4 text-sm">
                <p className="font-medium text-blue-800 mb-1">Live tracking information</p>
                <p className="text-blue-700">
                  Live train tracking data is simulated in this demo. In a production app, this would 
                  connect to real-time train location APIs.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="availability" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-3 font-medium text-gray-700 pb-2 border-b">
                <div>Class</div>
                <div>Availability</div>
                <div>Fare</div>
              </div>
              
              <div className="grid grid-cols-3 items-center py-2 border-b border-dashed">
                <div>
                  <div className="font-medium">AC First Class</div>
                  <div className="text-sm text-gray-500">1A</div>
                </div>
                <div>
                  <Badge className="bg-green-100 text-green-800">
                    Available 12
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">₹4,250</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 items-center py-2 border-b border-dashed">
                <div>
                  <div className="font-medium">AC 2 Tier</div>
                  <div className="text-sm text-gray-500">2A</div>
                </div>
                <div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    RAC 14
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">₹2,515</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 items-center py-2">
                <div>
                  <div className="font-medium">AC 3 Tier</div>
                  <div className="text-sm text-gray-500">3A</div>
                </div>
                <div>
                  <Badge className="bg-red-100 text-red-800">
                    WL 5
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">₹1,765</div>
                </div>
              </div>
              
              <div className="rounded-lg bg-amber-50 p-4 text-sm mt-4">
                <p className="font-medium text-amber-800 mb-1">About availability</p>
                <p className="text-amber-700">
                  Availability shown here is simulated. In a production app, this would 
                  fetch real-time availability data from railway APIs.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrainDetailsCard;
