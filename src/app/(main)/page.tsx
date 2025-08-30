
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { problems as initialProblems, type Problem } from "@/lib/data";
import { ProblemCard } from "@/components/problem-card";
import { PostProblemDialog } from '@/components/post-problem-dialog';

export default function DashboardPage() {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNewProblem = (newProblem: Omit<Problem, 'id' | 'likes' | 'commentsCount' | 'shares'>) => {
    const problemToAdd: Problem = {
      id: `problem-${Date.now()}-${Math.random()}`,
      likes: 0,
      commentsCount: 0,
      shares: 0,
      ...newProblem,
    };
    setProblems(prevProblems => [problemToAdd, ...prevProblems]);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Community Problems</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          <span>Post a Problem</span>
        </Button>
      </div>
      <PostProblemDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onProblemSubmit={handleAddNewProblem}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </>
  );
}
