import { useState, useRef, useCallback } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Upload, Brain, Zap, Camera, FileImage } from 'lucide-react';
import { toast } from 'sonner';

interface ClassificationResult {
  label: string;
  score: number;
}

interface ModelConfig {
  name: string;
  description: string;
  modelId: string;
  icon: React.ReactNode;
}

const MODELS: ModelConfig[] = [
  {
    name: "MobileNetV4",
    description: "Fast general image classification",
    modelId: "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
    icon: <Zap className="h-4 w-4" />
  },
  {
    name: "ResNet50",
    description: "High accuracy image classification",
    modelId: "microsoft/resnet-50",
    icon: <Brain className="h-4 w-4" />
  }
];

export const ImageClassifier = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(MODELS[0]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults([]);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const classifyImage = useCallback(async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsClassifying(true);
    setLoadingProgress(0);
    setResults([]);

    try {
      toast.info("Loading AI model...");
      setLoadingProgress(25);

      const classifier = await pipeline(
        'image-classification',
        selectedModel.modelId,
        { 
          device: 'webgpu',
          progress_callback: (progress: any) => {
            if (progress.status === 'downloading' || progress.status === 'loading') {
              const percent = Math.round((progress.loaded / progress.total) * 100);
              setLoadingProgress(25 + (percent * 0.5));
            }
          }
        }
      );

      setLoadingProgress(75);
      toast.info("Classifying image...");

      const predictions = await classifier(selectedImage, { top_k: 5 });
      
      setLoadingProgress(100);
      setResults(predictions as ClassificationResult[]);
      toast.success("Image classified successfully!");

    } catch (error) {
      console.error('Classification error:', error);
      toast.error("Failed to classify image. Please try again.");
    } finally {
      setIsClassifying(false);
      setLoadingProgress(0);
    }
  }, [selectedImage, selectedModel]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Image Classifier
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload any image and let our advanced neural networks identify what's in it with state-of-the-art accuracy
        </p>
      </div>

      {/* Model Selection */}
      <Card className="border-neural">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Select AI Model
          </CardTitle>
          <CardDescription>
            Choose the neural network architecture for classification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODELS.map((model) => (
              <Button
                key={model.modelId}
                variant={selectedModel.modelId === model.modelId ? "default" : "outline"}
                className="h-auto p-4 justify-start"
                onClick={() => setSelectedModel(model)}
              >
                <div className="flex items-start gap-3">
                  {model.icon}
                  <div className="text-left">
                    <div className="font-semibold">{model.name}</div>
                    <div className="text-sm text-muted-foreground">{model.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload */}
        <Card className="border-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Select an image file to classify (JPEG, PNG, WebP)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Button
              onClick={triggerFileInput}
              variant="outline"
              className="w-full h-32 border-dashed border-2 hover:border-primary/50 transition-colors"
              disabled={isClassifying}
            >
              <div className="flex flex-col items-center gap-2">
                <FileImage className="h-8 w-8 text-muted-foreground" />
                <span>Click to upload image</span>
                <span className="text-sm text-muted-foreground">Max size: 10MB</span>
              </div>
            </Button>

            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg border shadow-neural"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            )}

            {selectedImage && (
              <Button
                onClick={classifyImage}
                disabled={isClassifying}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isClassifying ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Classify Image
                  </div>
                )}
              </Button>
            )}

            {isClassifying && loadingProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing</span>
                  <span>{loadingProgress}%</span>
                </div>
                <Progress value={loadingProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Classification Results
            </CardTitle>
            <CardDescription>
              AI predictions with confidence scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload and classify an image to see results</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={index === 0 ? "default" : "secondary"}
                          className={index === 0 ? "bg-gradient-primary" : ""}
                        >
                          #{index + 1}
                        </Badge>
                        <span className="font-medium capitalize">
                          {result.label.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <span className="text-sm font-mono">
                        {(result.score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={result.score * 100} 
                      className="h-2"
                    />
                    {index < results.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};