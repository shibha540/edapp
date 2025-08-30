
'use client';

import { useParams } from 'next/navigation';
import { problems, type Problem } from '@/lib/data';
import { ProblemCard } from '@/components/problem-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const mockSolutions = [
  {
    id: 'sol1',
    user: { name: 'Expert Coder', avatar: 'https://i.pravatar.cc/150?u=expert' },
    content: 'You should definitely use the `useCallback` hook to memoize the function that you pass to your FlatList items. This prevents re-renders and will improve performance.',
    isAccepted: true,
  },
  {
    id: 'sol2',
    user: { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=jane' },
    content: 'Also make sure your images have a fixed width and height to prevent them from re-calculating their size on render. This is a common performance bottleneck.',
    isAccepted: false,
  },
];

export default function ProblemDetailsPage() {
  const params = useParams();
  const problemId = params.id as string;

  const problem = problems.find((p) => p.id === problemId);

  if (!problem) {
    return <p>Problem not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-0">
          <ProblemCard problem={problem} isDetailPage />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Solutions ({mockSolutions.length})</CardTitle>
          <CardDescription>
            Here are the solutions provided by the community. The accepted solution is marked with a green check.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockSolutions.map((solution, index) => (
            <div key={solution.id}>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={solution.user.avatar} />
                  <AvatarFallback>{solution.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{solution.user.name}</p>
                    {solution.isAccepted && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Accepted Solution</span>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-2">{solution.content}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                       <MessageSquare className="mr-2 h-4 w-4" /> Comment
                    </Button>
                  </div>
                </div>
              </div>
              {index < mockSolutions.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
