
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrainDetailsCard from "@/components/train/TrainDetailsCard";
import TrainScheduleTable from "@/components/train/TrainScheduleTable";
import TrainMapView from "@/components/train/TrainMapView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrainDetailsPage = () => {
  const { trainId } = useParams<{ trainId: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Train Details</h1>
          
          {trainId ? (
            <>
              <TrainDetailsCard trainId={trainId} />
              
              <Tabs defaultValue="schedule" className="mb-8">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="schedule" className="flex-1">Schedule & Route</TabsTrigger>
                  <TabsTrigger value="map" className="flex-1">Live Map</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <TrainScheduleTable />
                  </div>
                </TabsContent>
                <TabsContent value="map">
                  <TrainMapView />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold mb-2">Train Not Found</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find the train you're looking for.
                Please check the train number and try again.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrainDetailsPage;
