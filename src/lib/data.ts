import type { User } from 'lucide-react';

export type Problem = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  category: string;
  title: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  shares: number;
};

export const problems: Problem[] = [
  {
    id: '1',
    user: { name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    category: 'Math',
    title: 'Calculus Integration Problem',
    content: 'I\'m stuck on this integral. Can someone help me find the integral of (3x^2 + 2x - 1) / (x^3 + x^2 - x - 1)? I\'ve tried partial fractions but I keep getting stuck.',
    image: 'https://picsum.photos/600/400?random=1',
    likes: 15,
    commentsCount: 4,
    shares: 2,
  },
  {
    id: '2',
    user: { name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    category: 'Coding',
    title: 'React Native FlatList performance issues',
    content: 'My FlatList in React Native is very slow when rendering a large dataset of images. What are the best practices for optimization? I am already using `initialNumToRender` and `windowSize`.',
    likes: 42,
    commentsCount: 12,
    shares: 8,
  },
  {
    id: '3',
    user: { name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    category: 'Science',
    title: 'Understanding General Relativity',
    content: 'What is the intuitive explanation for why gravity is not a force but a curvature of spacetime? I\'ve read the basics but I\'m looking for a deeper, more intuitive understanding.',
    likes: 112,
    commentsCount: 25,
    shares: 15,
  },
  {
    id: '4',
    user: { name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
    category: 'Career',
    title: 'Resume feedback for a junior developer role',
    content: 'Could someone take a look at my resume? I\'m applying for junior frontend developer positions and would appreciate any feedback on how to make it stronger.',
    image: 'https://picsum.photos/600/400?random=2',
    likes: 8,
    commentsCount: 6,
    shares: 1,
  },
];

export type NewsItem = {
  id: string;
  type: 'Job Opening' | 'Internship' | 'Scholarship' | 'Education News';
  title: string;
  description: string;
  date: string;
  company?: string;
};

export const news: NewsItem[] = [
  {
    id: '1',
    type: 'Job Opening',
    title: 'Software Engineer, Frontend at TechCorp',
    description: 'TechCorp is looking for a talented frontend engineer with 2+ years of experience in React and TypeScript to join our dynamic team.',
    date: '3 days ago',
    company: 'TechCorp',
  },
  {
    id: '2',
    type: 'Internship',
    title: 'Data Science Summer Internship at InnovateAI',
    description: 'A 3-month paid internship for students passionate about machine learning and data analysis. Gain hands-on experience with real-world projects.',
    date: '1 week ago',
    company: 'InnovateAI',
  },
  {
    id: '3',
    type: 'Scholarship',
    title: 'Future Leaders in STEM Scholarship',
    description: 'A $10,000 scholarship for undergraduate students pursuing a degree in a STEM field. Application deadline is December 15th.',
    date: '2 weeks ago',
  },
  {
    id: '4',
    type: 'Education News',
    title: 'National Exam Dates Announced for 2025',
    description: 'The National Testing Agency has released the official schedule for the upcoming national entrance examinations for engineering and medical colleges.',
    date: '1 month ago',
  },
];

export type LeaderboardUser = {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  badges: string[];
};

export const leaderboardUsers: LeaderboardUser[] = [
  { rank: 1, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', points: 12540, badges: ['Top Helper', 'Math Whiz', '100+ Solutions'] },
  { rank: 2, name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', points: 11820, badges: ['Code Master', 'Weekly Top Solver'] },
  { rank: 3, name: 'Grace Hopper', avatar: 'https://i.pravatar.cc/150?u=gracehopper', points: 9980, badges: ['Bug Hunter', 'Community Star'] },
  { rank: 4, name: 'Alan Turing', avatar: 'https://i.pravatar.cc/150?u=alanturing', points: 8500, badges: ['Code Cracker'] },
  { rank: 5, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 7650, badges: ['First 10 Solutions'] },
  { rank: 6, name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', points: 6200, badges: [] },
  { rank: 7, name: 'Isaac Newton', avatar: 'https://i.pravatar.cc/150?u=isaacnewton', points: 5430, badges: ['Physics Guru'] },
];
