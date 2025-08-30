
'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, ArrowRight } from 'lucide-react';
import type { Problem } from '@/lib/data';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ProblemCard({ problem, isDetailPage = false }: { problem: Problem, isDetailPage?: boolean }) {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(problem.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const showToast = (feature: string) => {
    toast({
      title: 'Feature not implemented',
      description: `The ${feature} functionality will be available soon!`,
    });
  };

  return (
    <Card className={cn("flex flex-col", isDetailPage && "border-0 shadow-none")}>
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
        <div className="w-full flex justify-between items-center text-sm">
            <div className="flex gap-1 text-muted-foreground">
                <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleLike}>
                    <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} /> {likes}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => showToast('comments')}>
                    <MessageCircle className="h-4 w-4" /> {problem.commentsCount}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => showToast('sharing')}>
                    <Share2 className="h-4 w-4" /> {problem.shares}
                </Button>
            </div>
            {!isDetailPage && (
              <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
                <Link href={`/problem/${problem.id}`}>View <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
