import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze your dataset to identify patterns and trends",
  },
  {
    icon: TrendingUp,
    title: "Accurate Predictions",
    description: "Get highly accurate predictions based on historical data and intelligent pattern recognition",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Lightning-fast analysis and predictions delivered in seconds, not minutes",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. We never share or store your sensitive information",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Everything you need for intelligent question paper prediction
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
              >
                <div className="mb-4 p-3 rounded-lg bg-gradient-glow w-fit group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
