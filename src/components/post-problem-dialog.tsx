
'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Problem } from '@/lib/data';

interface PostProblemDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProblemSubmit: (newProblem: Omit<Problem, 'id' | 'likes' | 'commentsCount' | 'shares'>) => void;
}

const categories = ["Math", "Coding", "Science", "Career", "General"];

export function PostProblemDialog({ isOpen, onOpenChange, onProblemSubmit }: PostProblemDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) {
      // Basic validation
      alert("Please fill out all fields.");
      return;
    }

    onProblemSubmit({
      title,
      content,
      category,
      user: { // This would typically come from logged-in user data
        name: 'Student',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
      },
    });

    // Reset form and close dialog
    setTitle('');
    setContent('');
    setCategory('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Post a New Problem</DialogTitle>
            <DialogDescription>
              Share your problem with the community. Be specific and provide enough detail for others to help.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., How to solve for x?"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Description
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3"
                placeholder="Describe your problem in detail..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Post Problem</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
