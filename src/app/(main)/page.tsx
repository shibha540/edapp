
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { problems as initialProblems, type Problem } from "@/lib/data";
import { ProblemCard } from "@/components/problem-card";
import { PostProblemDialog } from '@/components/post-problem-dialog';

export default function DashboardPage() {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(initialProblems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = problems.filter(
        (problem) =>
          problem.title.toLowerCase().includes(lowercasedQuery) ||
          problem.content.toLowerCase().includes(lowercasedQuery) ||
          problem.category.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProblems(filtered);
    } else {
      setFilteredProblems(problems);
    }
  }, [searchQuery, problems]);

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
    <div className="space-y-4 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Community Problems</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          <span>Post Problem</span>
        </Button>
      </div>
      {isClient && (
        <PostProblemDialog 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onProblemSubmit={handleAddNewProblem}
        />
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
      {filteredProblems.length === 0 && searchQuery && (
        <div className="text-center col-span-full py-10">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No results found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Your search for &quot;{searchQuery}&quot; did not match any problems.
            </p>
        </div>
      )}
    </div>
  );
}
