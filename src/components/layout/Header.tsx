
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, TrainFront, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <TrainFront size={24} className="text-train-accent" />
            <span className="font-bold text-xl hidden md:inline-block">TrainTracker</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-1 md:space-x-4">
          <Link to="/search">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Search size={18} />
              <span className="hidden md:inline-block">Search</span>
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <User size={18} />
              <span className="hidden md:inline-block">Login</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
