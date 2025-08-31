
'use client';

import { useState, useRef, type ChangeEvent, type FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lightbulb, Upload, Loader2, AlertCircle, Bot, User, Sparkles } from 'lucide-react';
import { aiPoweredHintsForProblems } from '@/ai/flows/ai-powered-hints-for-problems';
import { followUpOnExplanation } from '@/ai/flows/follow-up-on-explanation';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';

type Message = {
  role: 'user' | 'model';
  content: string;
  imagePreview?: string;
};

export function AIHintGenerator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [imagePreviewForInput, setImagePreviewForInput] = useState('');

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreviewForInput(objectUrl);
    }
  };

  const resetInput = () => {
      setFile(null);
      setImagePreviewForInput('');
      setInputValue('');
      if(fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file && !inputValue.trim()) {
      setError('Please upload an image for a new problem or type a follow-up question.');
      return;
    }

    setIsLoading(true);
    setError('');

    let newUserMessage: Message;

    if (file) {
      newUserMessage = { role: 'user', content: 'Here is my problem:', imagePreview: imagePreviewForInput };
      setMessages(prev => [...prev, newUserMessage]);

      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          try {
            const base64data = reader.result as string;
            const response = await aiPoweredHintsForProblems({ problemImage: base64data });
            const aiResponse: Message = { role: 'model', content: response.hints };
            setMessages(prev => [...prev, aiResponse]);
            resetInput();
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

    } else { // It's a follow up question
        newUserMessage = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, newUserMessage]);
        resetInput();

        try {
            const history = messages.map(m => ({ role: m.role, content: m.content }));
            const response = await followUpOnExplanation({ history, question: inputValue });
            const aiResponse: Message = { role: 'model', content: response.answer };
            setMessages(prev => [...prev, aiResponse]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }
  };

  return (
    <Card className="max-w-2xl mx-auto flex flex-col h-[85vh]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          AI-Powered Hints
        </CardTitle>
        <CardDescription>
          Upload an image of a problem to get hints, then ask follow-up questions.
        </CardDescription>
      </CardHeader>
       <CardContent ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground">
            <p>Upload an image of a problem to get started!</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'model' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
            )}
            <div className={`rounded-lg px-4 py-2 max-w-[85%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {message.imagePreview && (
                <div className="relative w-48 aspect-video overflow-hidden rounded-md border mb-2">
                    <Image src={message.imagePreview} alt="Problem preview" fill className="object-contain" />
                </div>
              )}
              <p className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }} />
            </div>
             {message.role === 'user' && (
              <Avatar className="h-8 w-8">
                  <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
            </div>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a follow-up question..."
                disabled={isLoading || !!file}
                hidden={!!file}
            />
             <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isLoading} className={messages.length > 0 ? 'hidden' : ''}>
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload Image</span>
            </Button>
             <Input id="problem-image" type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />

            {imagePreviewForInput && (
                 <div className="relative w-24 aspect-square overflow-hidden rounded-md border p-1">
                    <Image src={imagePreviewForInput} alt="Input preview" fill className="object-contain" />
                 </div>
            )}
          
          <Button type="submit" disabled={isLoading || (!file && !inputValue.trim())}>
            <Sparkles className="mr-2 h-4 w-4" />
            {file ? 'Get Hints' : 'Send'}
          </Button>
        </form>
         {messages.length > 0 && !file && (
             <Button variant="outline" className="w-full mt-2" onClick={() => {
                 setMessages([]);
                 resetInput();
             }}>Start New Problem</Button>
         )}
      </div>
    </Card>
  );
}
