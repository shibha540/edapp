import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ClipboardList, GraduationCap, Megaphone, ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/lib/data';

const iconMap = {
  'Job Opening': Briefcase,
  'Internship': ClipboardList,
  'Scholarship': GraduationCap,
  'Education News': Megaphone,
};

export function NewsCard({ item }: { item: NewsItem }) {
  const Icon = iconMap[item.type];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-primary" />
          <CardTitle className="text-lg">{item.title}</CardTitle>
        </div>
        <CardDescription>
          {item.type} {item.company && `at ${item.company}`} &middot; {item.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
