import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      toast.success(`File "${droppedFile.name}" uploaded successfully!`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success(`File "${selectedFile.name}" uploaded successfully!`);
    }
  };

  return (
    <section id="upload-section" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Upload Your Dataset
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Upload your question paper dataset to begin the AI-powered analysis
        </p>

        <Card 
          className={`border-2 transition-all duration-300 ${
            isDragging 
              ? "border-primary shadow-glow bg-card/50" 
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              {!file ? (
                <>
                  <div className="p-6 rounded-full bg-gradient-glow">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">Drop your dataset here</p>
                    <p className="text-muted-foreground">
                      Support for CSV, Excel, JSON files
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-sm text-muted-foreground">OR</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <label htmlFor="file-upload">
                    <Button variant="glow" size="lg" className="cursor-pointer" asChild>
                      <span>
                        Browse Files
                      </span>
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </>
              ) : (
                <>
                  <div className="p-6 rounded-full bg-gradient-glow">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xl font-semibold">
                      <FileText className="w-5 h-5" />
                      {file.name}
                    </div>
                    <p className="text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      variant="glow" 
                      size="lg"
                      onClick={() => toast.info("Analysis feature coming soon!")}
                    >
                      Analyze Dataset
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => {
                        setFile(null);
                        toast.info("File removed");
                      }}
                    >
                      Remove File
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default UploadSection;
