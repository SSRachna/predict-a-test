import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2, Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";

interface DatasetRow {
  [key: string]: string | number;
}

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState<DatasetRow[]>([]);
  const [isValidFormat, setIsValidFormat] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  const requiredColumns = ["question", "topic", "year", "difficulty", "marks", "type"];

  const downloadSampleDataset = () => {
    const sampleData = [
      {
        question: "Explain supervised learning and its applications",
        topic: "Machine Learning",
        year: 2023,
        difficulty: "Medium",
        marks: 5,
        type: "Short Answer",
        chapter: "Chapter 3"
      },
      {
        question: "What is a linked list? Explain with example",
        topic: "Data Structures",
        year: 2022,
        difficulty: "Easy",
        marks: 2,
        type: "MCQ",
        chapter: "Chapter 1"
      },
      {
        question: "Derive the backpropagation algorithm",
        topic: "Neural Networks",
        year: 2024,
        difficulty: "Hard",
        marks: 10,
        type: "Essay",
        chapter: "Chapter 7"
      },
      {
        question: "Implement binary search algorithm",
        topic: "Algorithms",
        year: 2023,
        difficulty: "Medium",
        marks: 7,
        type: "Programming",
        chapter: "Chapter 4"
      },
      {
        question: "Explain the concept of overfitting",
        topic: "Machine Learning",
        year: 2024,
        difficulty: "Easy",
        marks: 3,
        type: "Short Answer",
        chapter: "Chapter 2"
      }
    ];

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_question_paper_dataset.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Sample dataset downloaded!");
  };

  const validateDataset = (data: DatasetRow[]) => {
    if (!data || data.length === 0) {
      setIsValidFormat(false);
      setValidationMessage("Dataset is empty");
      return false;
    }

    const columns = Object.keys(data[0]);
    const missingColumns = requiredColumns.filter(col => !columns.includes(col));

    if (missingColumns.length > 0) {
      setIsValidFormat(false);
      setValidationMessage(`Missing required columns: ${missingColumns.join(", ")}`);
      return false;
    }

    setIsValidFormat(true);
    setValidationMessage(`✓ Valid dataset with ${data.length} questions`);
    return true;
  };

  const parseFile = (selectedFile: File) => {
    if (selectedFile.name.endsWith('.csv')) {
      Papa.parse(selectedFile, {
        header: true,
        complete: (results) => {
          const data = results.data as DatasetRow[];
          setPreviewData(data.slice(0, 5)); // Show first 5 rows
          validateDataset(data);
        },
        error: (error) => {
          toast.error("Error parsing CSV file");
          console.error(error);
        }
      });
    } else if (selectedFile.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setPreviewData(Array.isArray(data) ? data.slice(0, 5) : []);
          validateDataset(Array.isArray(data) ? data : []);
        } catch (error) {
          toast.error("Invalid JSON format");
          setIsValidFormat(false);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      toast.info("Excel files will be supported soon. Please use CSV for now.");
    }
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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      parseFile(droppedFile);
      toast.success(`File "${droppedFile.name}" uploaded successfully!`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseFile(selectedFile);
      toast.success(`File "${selectedFile.name}" uploaded successfully!`);
    }
  };

  return (
    <section id="upload-section" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              Upload Your Dataset
            </h2>
            <p className="text-muted-foreground text-lg">
              Upload your question paper dataset to begin the AI-powered analysis
            </p>
          </div>
          <Button 
            variant="outline" 
            size="lg"
            onClick={downloadSampleDataset}
            className="border-primary/50 hover:bg-primary/10 mt-4 md:mt-0"
          >
            <Download className="w-5 h-5" />
            Download Sample
          </Button>
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
                  <Card className={`p-4 ${isValidFormat ? 'bg-primary/10 border-primary/30' : 'bg-destructive/10 border-destructive/30'}`}>
                    <div className="flex items-center gap-2">
                      {isValidFormat ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-destructive" />
                      )}
                      <span className={isValidFormat ? 'text-primary' : 'text-destructive'}>
                        {validationMessage}
                      </span>
                    </div>
                  </Card>

                  <div className="flex gap-4">
                    <Button 
                      variant="glow" 
                      size="lg"
                      disabled={!isValidFormat}
                      onClick={() => toast.info("Analysis feature coming soon!")}
                    >
                      Analyze Dataset
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => {
                        setFile(null);
                        setPreviewData([]);
                        setIsValidFormat(true);
                        setValidationMessage("");
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

        {previewData.length > 0 && (
          <Card className="border-primary/30 mt-8 animate-fade-in">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Dataset Preview (First 5 rows)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      {Object.keys(previewData[0]).map((key) => (
                        <th key={key} className="text-left p-3 font-semibold text-sm">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                        {Object.values(row).map((value, cellIdx) => (
                          <td key={cellIdx} className="p-3 text-sm text-muted-foreground">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default UploadSection;
