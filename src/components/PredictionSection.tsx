import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const PredictionSection = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  const handlePredict = async () => {
    if (!input.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setIsLoading(true);
    // Simulate AI prediction
    setTimeout(() => {
      setPrediction(
        "Based on the analysis of your dataset and the input provided, the AI predicts that questions related to this topic have a high probability of appearing in the examination. The model has identified key patterns and trends that suggest this area requires focused preparation."
      );
      setIsLoading(false);
      toast.success("Prediction generated successfully!");
    }, 2000);
  };

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Get AI Predictions
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Enter a topic or question to get intelligent predictions
        </p>

        <Card className="border-border p-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Enter your question or topic
              </label>
              <Textarea
                placeholder="E.g., What topics in Machine Learning are likely to appear in the exam?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] bg-background border-border focus:border-primary transition-colors"
              />
            </div>

            <Button
              variant="glow"
              size="lg"
              onClick={handlePredict}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Prediction
                </>
              )}
            </Button>

            {prediction && (
              <Card className="bg-gradient-glow border-primary/30 p-6 animate-fade-in">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-primary-glow flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">AI Prediction</h3>
                    <p className="text-foreground/90 leading-relaxed">{prediction}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PredictionSection;
