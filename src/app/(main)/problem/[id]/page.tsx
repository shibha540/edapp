
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

export default function ProblemDetailsPage() {
  const params = useParams();
  const problemId = params.id as string;

  const problem = problems.find((p) => p.id === problemId);

  if (!problem) {
    return <p>Problem not found.</p>;
  }

  const solutions = problem.solutions || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-0">
          <ProblemCard problem={problem} isDetailPage />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Solutions ({solutions.length})</CardTitle>
          <CardDescription>
            Here are the solutions provided by the community. The accepted solution is marked with a green check.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {solutions.map((solution, index) => (
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
                  <div className="prose prose-sm dark:prose-invert mt-2" dangerouslySetInnerHTML={{ __html: solution.content.replace(/\n/g, '<br />').replace(/`([^`]+)`/g, '<code>$1</code>') }} />

                  <div className="mt-4 flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                       <MessageSquare className="mr-2 h-4 w-4" /> Comment
                    </Button>
                  </div>
                </div>
              </div>
              {index < solutions.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

    