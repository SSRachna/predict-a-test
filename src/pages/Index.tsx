import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import PredictionSection from "@/components/PredictionSection";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <UploadSection />
      <PredictionSection />
      <FeaturesSection />
      
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 AI Question Paper Predictor. Powered by advanced machine learning.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
