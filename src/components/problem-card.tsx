import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Problem } from '@/lib/data';
import { Badge } from './ui/badge';

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={problem.user.avatar} alt={problem.user.name} />
          <AvatarFallback>{problem.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{problem.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{problem.user.name}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{problem.content}</p>
        {problem.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={problem.image}
              alt="Problem attachment"
              fill
              className="object-cover"
              data-ai-hint="math problem"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Badge variant="secondary">{problem.category}</Badge>
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-4 text-muted-foreground">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" /> {problem.likes}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> {problem.commentsCount}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" /> {problem.shares}
                </Button>
            </div>
            <Button>View Solutions</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
