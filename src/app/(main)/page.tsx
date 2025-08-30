import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { problems } from "@/lib/data";
import { ProblemCard } from "@/components/problem-card";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Community Problems</h1>
        <Button className="flex items-center gap-2">
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
