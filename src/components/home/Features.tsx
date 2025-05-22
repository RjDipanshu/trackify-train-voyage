
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, MapPin, Calendar } from "lucide-react";

const features = [
  {
    title: "Smart Train Search",
    description: "Find trains between stations with intuitive filters for date and class preferences.",
    icon: <Search className="h-8 w-8 text-train-accent" />
  },
  {
    title: "Real-Time Tracking",
    description: "Track current train locations accurately with delay information and ETA updates.",
    icon: <MapPin className="h-8 w-8 text-train-accent" />
  },
  {
    title: "Live Seat Availability",
    description: "Check real-time seat availability across different classes and quotas.",
    icon: <Calendar className="h-8 w-8 text-train-accent" />
  },
  {
    title: "Detailed Schedules",
    description: "Access comprehensive train schedules with timings, platforms, and intermediate stops.",
    icon: <Clock className="h-8 w-8 text-train-accent" />
  }
];

const Features = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-train-primary mb-4">
          Everything You Need For Train Travel
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our platform provides all the tools you need to plan your journey efficiently and stay informed throughout your trip.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="mb-4">{feature.icon}</div>
              <CardTitle className="text-xl font-bold text-train-primary">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
