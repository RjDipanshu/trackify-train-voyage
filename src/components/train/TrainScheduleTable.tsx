
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock schedule data
const scheduleData = [
  {
    day: 1,
    station: "New Delhi",
    code: "NDLS",
    arrival: "--:--",
    departure: "16:55",
    distance: "0 km",
    platform: 3,
    haltTime: "--",
    status: "Departed"
  },
  {
    day: 1,
    station: "Mathura Junction",
    code: "MTJ",
    arrival: "18:45",
    departure: "18:47",
    distance: "141 km",
    platform: 2,
    haltTime: "2 min",
    status: "On Time"
  },
  {
    day: 1,
    station: "Kota Junction",
    code: "KOTA",
    arrival: "22:47",
    departure: "22:52",
    distance: "465 km",
    platform: 1,
    haltTime: "5 min",
    status: "On Time"
  },
  {
    day: 2,
    station: "Ratlam Junction",
    code: "RTM",
    arrival: "02:05",
    departure: "02:10",
    distance: "726 km",
    platform: 4,
    haltTime: "5 min",
    status: "On Time"
  },
  {
    day: 2,
    station: "Vadodara Junction",
    code: "BRC",
    arrival: "05:32",
    departure: "05:37",
    distance: "994 km",
    platform: 3,
    haltTime: "5 min",
    status: "Upcoming"
  },
  {
    day: 2,
    station: "Surat",
    code: "ST",
    arrival: "07:18",
    departure: "07:20",
    distance: "1,152 km",
    platform: 2,
    haltTime: "2 min",
    status: "Upcoming"
  },
  {
    day: 2,
    station: "Mumbai Central",
    code: "CSTM",
    arrival: "10:25",
    departure: "--:--",
    distance: "1,383 km",
    platform: 5,
    haltTime: "--",
    status: "Upcoming"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Departed":
      return <Badge className="bg-gray-100 text-gray-800">Departed</Badge>;
    case "On Time":
      return <Badge className="bg-green-100 text-green-800">On Time</Badge>;
    case "Upcoming":
      return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
    case "Delayed":
      return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const TrainScheduleTable = () => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="py-3">Day</TableHead>
            <TableHead>Station</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead className="hidden sm:table-cell">Halt</TableHead>
            <TableHead className="hidden md:table-cell">Platform</TableHead>
            <TableHead className="hidden lg:table-cell">Distance</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((stop, index) => (
            <TableRow key={index} className={index === 4 ? "bg-blue-50" : ""}>
              <TableCell className="font-medium">{stop.day}</TableCell>
              <TableCell>
                <div className="font-medium">{stop.station}</div>
                <div className="text-sm text-gray-500">{stop.code}</div>
              </TableCell>
              <TableCell>{stop.arrival}</TableCell>
              <TableCell>{stop.departure}</TableCell>
              <TableCell className="hidden sm:table-cell">{stop.haltTime}</TableCell>
              <TableCell className="hidden md:table-cell">{stop.platform}</TableCell>
              <TableCell className="hidden lg:table-cell">{stop.distance}</TableCell>
              <TableCell className="text-right">{getStatusBadge(stop.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainScheduleTable;
