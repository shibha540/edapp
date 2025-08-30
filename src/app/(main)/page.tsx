
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { problems } from "@/lib/data";
import { ProblemCard } from "@/components/problem-card";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { toast } = useToast();

  const handlePostProblemClick = () => {
    toast({
      title: "Feature not implemented",
      description: "You'll be able to post a problem soon!",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Community Problems</h1>
        <Button className="flex items-center gap-2" onClick={handlePostProblemClick}>
          <PlusCircle className="h-4 w-4" />
          <span>Post a Problem</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </>
  );
}
