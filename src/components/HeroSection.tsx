import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <Brain className="w-12 h-12 text-primary-glow animate-pulse" />
          <Sparkles className="w-8 h-8 text-accent animate-pulse" />
        </div>
        
        <h1 className="mb-6 text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
          AI Question Paper Predictor
        </h1>
        
        <p className="mb-8 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Leverage advanced AI to predict and analyze question patterns from your dataset.
          Upload your data and get intelligent predictions instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button 
            variant="glow" 
            size="lg" 
            onClick={scrollToUpload}
            className="text-lg"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg border-primary/50 hover:bg-primary/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
