
'use client';

import {useState, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Loader2, Sparkles, Upload} from 'lucide-react';
import {generatePersonalizedCompliment} from '@/ai/flows/generate-personalized-compliment';
import {useToast} from '@/hooks/use-toast';
import Image from 'next/image';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export function ComplimentGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compliment, setCompliment] = useState<string | null>(null);
  const {toast} = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCompliment(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please select an image to generate a compliment.',
      });
      return;
    }

    setIsLoading(true);
    setCompliment(null);

    try {
      const imageUri = await fileToBase64(selectedFile);
      const result = await generatePersonalizedCompliment({imageUri});
      setCompliment(result.compliment);
    } catch (error) {
      console.error('Error generating compliment:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate a compliment. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Sparkles className="text-accent" />A little extra sparkle...
        </CardTitle>
        <CardDescription className="font-body">
          Want another compliment? Upload a photo and let our romantic AI tell
          you something sweet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="photo-upload" className="sr-only">
            Upload a Photo
          </Label>
          <div
            className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-primary/30 p-2 transition-colors hover:bg-muted/50"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center py-4 text-center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="mb-3 h-20 w-20 rounded-full border-2 border-primary/50 object-cover"
                />
              ) : (
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
              )}
              <p className="mb-1 font-body text-sm text-muted-foreground">
                {selectedFile ? (
                  <span className="font-semibold">{selectedFile.name}</span>
                ) : (
                  <span>
                    <span className="font-semibold">Click to upload</span>
                  </span>
                )}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>
          <Input
            id="photo-upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !selectedFile}
          className="w-full transform shadow-lg transition-transform hover:-translate-y-0.5 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Compliment
        </Button>

        {isLoading && (
          <div className="p-4 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-accent" />
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Crafting the perfect words...
            </p>
          </div>
        )}

        {compliment && !isLoading && (
          <div className="mt-4 animate-fade-in rounded-lg border border-primary/50 bg-background p-4 text-center shadow-inner">
            <p className="font-body italic text-foreground">"{compliment}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
