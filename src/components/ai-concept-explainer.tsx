
'use client';

import { useState, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BrainCircuit, Loader2, AlertCircle, Sparkles, Lightbulb, ListChecks } from 'lucide-react';
import { explainConcept, type ExplainConceptOutput } from '@/ai/flows/concept-explainer';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function AIConceptExplainer() {
  const [result, setResult] = useState<ExplainConceptOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [concept, setConcept] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!concept) {
      setError('Please enter a concept to explain.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await explainConcept({ concept });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          AI Concept Explainer
        </CardTitle>
        <CardDescription>
          Enter a concept, and our AI will break it down for you with a simple explanation, an analogy, and key takeaways.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="concept">Concept</Label>
            <Input 
              id="concept" 
              type="text" 
              placeholder="e.g., Photosynthesis, Neural Networks, etc." 
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={isLoading || !concept}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Explaining...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Explain Concept
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
          {result && (
            <div className="space-y-4">
              <Alert variant="default" className="bg-background">
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>
                      <p className="prose prose-sm dark:prose-invert">{result.explanation}</p>
                  </AlertDescription>
              </Alert>
              <Alert variant="default" className="bg-background">
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Analogy</AlertTitle>
                  <AlertDescription>
                     <p className="prose prose-sm dark:prose-invert">{result.analogy}</p>
                  </AlertDescription>
              </Alert>
              <Alert variant="default" className="bg-background">
                  <ListChecks className="h-4 w-4" />
                  <AlertTitle>Key Takeaways</AlertTitle>
                  <AlertDescription>
                    <ul className="prose prose-sm dark:prose-invert list-disc pl-5">
                      {result.keyTakeaways.map((takeaway, index) => (
                        <li key={index}>{takeaway}</li>
                      ))}
                    </ul>
                  </AlertDescription>
              </Alert>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
