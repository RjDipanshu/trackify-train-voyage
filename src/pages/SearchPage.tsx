
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  
  // Check if search params exist
  const hasSearchParams = searchParams.has("from") && searchParams.has("to");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 pt-6 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
              <SearchFilters />
            </div>
            <div className="md:col-span-9">
              {hasSearchParams ? (
                <SearchResults />
              ) : (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-2xl font-bold mb-2">Start Searching</h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Use the filters on the left to search for trains between stations.
                    Select your departure and arrival stations to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
