'use client';

import { useState, useRef, type ChangeEvent, type FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, Upload, Loader2, AlertCircle } from 'lucide-react';
import { aiPoweredHintsForProblems } from '@/ai/flows/ai-powered-hints-for-problems';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function AIHintGenerator() {
  const [hints, setHints] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Free memory when the component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setHints('');
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setError('');
    setHints('');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string;
          const response = await aiPoweredHintsForProblems({ problemImage: base64data });
          setHints(response.hints);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
        setIsLoading(false);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          AI-Powered Hints
        </CardTitle>
        <CardDescription>
          Upload an image of a math problem or code error, and our AI will provide helpful hints to get you started.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problem-image">Problem Image</Label>
            <Input id="problem-image" type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="file:text-primary file:font-semibold"/>
          </div>
          {preview && (
            <div className="relative w-full aspect-video overflow-hidden rounded-lg border">
              <Image src={preview} alt="Problem preview" fill className="object-contain" data-ai-hint="problem preview" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={isLoading || !file}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Hints...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Get Hints
              </>
            )}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {hints && (
            <Alert variant="default" className="bg-accent">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Here are your hints!</AlertTitle>
                <AlertDescription>
                    <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: hints.replace(/\n/g, '<br />') }} />
                </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
