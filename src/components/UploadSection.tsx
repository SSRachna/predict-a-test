import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const UploadSection = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 20 * 1024 * 1024; // 20MB
    
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload PDF or image files (JPG, PNG, WEBP)");
      return false;
    }
    
    if (file.size > maxSize) {
      toast.error("File size must be less than 20MB");
      return false;
    }
    
    return true;
  };

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
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(validateFile);
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} question paper(s) uploaded successfully!`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = selectedFiles.filter(validateFile);
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} question paper(s) uploaded successfully!`);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  return (
    <section id="upload-section" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Upload Question Papers
          </h2>
          <p className="text-muted-foreground text-lg">
            Upload your past question papers (PDF or images) for AI-powered analysis and prediction
          </p>
        </div>

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
              {files.length === 0 ? (
                <>
                  <div className="p-6 rounded-full bg-gradient-glow">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">Drop your question papers here</p>
                    <p className="text-muted-foreground">
                      Support for PDF and image files (JPG, PNG, WEBP)
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload multiple papers to improve prediction accuracy
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
                    accept=".pdf,image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                  />
                </>
              ) : (
                <>
                  <div className="p-6 rounded-full bg-gradient-glow">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold">
                      {files.length} Question Paper{files.length > 1 ? 's' : ''} Uploaded
                    </p>
                    <p className="text-muted-foreground">
                      Total size: {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="w-full space-y-2 max-h-60 overflow-y-auto">
                    {files.map((file, idx) => (
                      <Card key={idx} className="p-4 bg-primary/5 border-primary/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {file.type === 'application/pdf' ? (
                              <FileText className="w-5 h-5 text-primary" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-primary" />
                            )}
                            <div className="text-left">
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(idx)}
                            className="text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="glow" 
                      size="lg"
                      onClick={() => toast.info("AI Analysis coming soon! This will extract questions and predict patterns.")}
                    >
                      Analyze Papers
                    </Button>
                    <label htmlFor="file-upload-more">
                      <Button variant="outline" size="lg" className="cursor-pointer" asChild>
                        <span>Add More Papers</span>
                      </Button>
                    </label>
                    <input
                      id="file-upload-more"
                      type="file"
                      accept=".pdf,image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                    />
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
