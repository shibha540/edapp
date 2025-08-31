
'use client';

import { useState, type FormEvent, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Loader2, User, Sparkles, Bot } from 'lucide-react';
import { explainConcept, type ExplainConceptOutput } from '@/ai/flows/concept-explainer';
import { followUpOnExplanation } from '@/ai/flows/follow-up-on-explanation';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function AIConceptExplainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    setError('');

    try {
      if (messages.length === 0) {
        // First message
        const response = await explainConcept({ concept: inputValue });
        const aiResponse: Message = { 
          role: 'model', 
          content: `**Explanation:**\n${response.explanation}\n\n**Analogy:**\n${response.analogy}\n\n**Key Takeaways:**\n${response.keyTakeaways.join('\n- ')}`
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        // Follow-up message
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        const response = await followUpOnExplanation({ history, question: inputValue });
        const aiResponse: Message = { role: 'model', content: response.answer };
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto flex flex-col h-[85vh]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          AI Concept Explainer
        </CardTitle>
        <CardDescription>
          Enter a concept, and our AI will break it down for you. You can ask follow-up questions.
        </CardDescription>
      </CardHeader>
      <CardContent ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground">
            <p>Ask about a concept to get started!</p>
            <p className="text-xs">e.g., "Photosynthesis", "Neural Networks"</p>
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
                <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }} />
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a follow-up question or new concept..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            <Sparkles className="mr-2 h-4 w-4" />
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
}
