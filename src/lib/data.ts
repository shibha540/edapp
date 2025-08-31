
import type { User } from 'lucide-react';

export type Solution = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  isAccepted: boolean;
};

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
  solutions: Solution[];
};

export const problems: Problem[] = [
  {
    id: '1',
    user: { name: 'Math Enthusiast', avatar: 'https://i.pravatar.cc/150?u=math' },
    category: 'Math',
    title: 'Age Word Problem',
    content: 'The sum of a father and son’s ages is 40. Five years ago, the father was twice the son’s age. Find their current ages.',
    likes: 25,
    commentsCount: 8,
    shares: 3,
    solutions: [
      {
        id: 'sol-math-1',
        user: { name: 'Prof. Algebra', avatar: 'https://i.pravatar.cc/150?u=prof-algebra' },
        content: `Let father’s age = F, son’s age = S.

Given: F + S = 40.

Five years ago: F - 5 = 2(S - 5).

Expand: F - 5 = 2S - 10 ⇒ F = 2S - 5.

Substitute into the sum: (2S - 5) + S = 40 ⇒ 3S - 5 = 40 ⇒ 3S = 45 ⇒ S = 15.

Then F = 2(15) - 5 = 30 - 5 = 25.

**Answer: Father = 25 years, Son = 15 years.**`,
        isAccepted: true,
      }
    ]
  },
  {
    id: '2',
    user: { name: 'Coding Pro', avatar: 'https://i.pravatar.cc/150?u=coder' },
    category: 'Coding',
    title: 'Python Word Frequency',
    content: 'Write a Python function that returns a dictionary of word counts for a sentence, case-insensitive and ignoring punctuation.',
    likes: 42,
    commentsCount: 12,
    shares: 8,
    solutions: [
       {
        id: 'sol-coding-1',
        user: { name: 'Py Coder', avatar: 'https://i.pravatar.cc/150?u=pycoder' },
        content: `Here is the step-by-step implementation:
1) Normalize text to lowercase.
2) Remove punctuation (using str.translate or re).
3) Split on whitespace to get words.
4) Count with a dictionary (or collections.Counter).

\`\`\`python
import string
from collections import Counter

def word_freq(sentence: str) -> dict:
    # 1) lowercase
    s = sentence.lower()
    # 2) strip punctuation
    s = s.translate(str.maketrans('', '', string.punctuation))
    # 3) split
    words = s.split()
    # 4) count
    counts = Counter(words)
    return dict(counts)

# Example
print(word_freq("Hello, hello! Code more; code better."))
# Output: {'hello': 2, 'code': 2, 'more': 1, 'better': 1}
\`\`\`
`,
        isAccepted: true,
      }
    ]
  },
  {
    id: '3',
    user: { name: 'Science Geek', avatar: 'https://i.pravatar.cc/150?u=science' },
    category: 'Science',
    title: 'Chemistry Stoichiometry',
    content: 'How many grams of water are produced when 8 g of hydrogen gas reacts with excess oxygen? (Use: 2H₂ + O₂ → 2H₂O; molar masses H₂ ≈ 2 g/mol, H₂O ≈ 18 g/mol.)',
    likes: 112,
    commentsCount: 25,
    shares: 15,
    solutions: [
      {
        id: 'sol-science-1',
        user: { name: 'Dr. Atom', avatar: 'https://i.pravatar.cc/150?u=atom' },
        content: `1. **Moles of H₂**: n(H₂) = mass / molar mass = 8g / 2g/mol = 4 mol.

2. **Mole Ratio**: From the balanced equation, 2H₂ → 2H₂O, so the mole ratio H₂:H₂O is 2:2 or 1:1.
Therefore n(H₂O) = n(H₂) = 4 mol.

3. **Mass of water**: mass = n × M = 4 mol × 18 g/mol = 72 g.

**Answer: 72 g of water.**`,
        isAccepted: true,
      }
    ]
  },
  {
    id: '4',
    user: { name: 'Career Advisor', avatar: 'https://i.pravatar.cc/150?u=career' },
    category: 'Career',
    title: 'Choosing Between Two Job Offers',
    content: `You have two job offers (A and B). Criteria and weights: Salary 0.4, Growth 0.3, Work–Life Balance 0.2, Location 0.1.
Scores (1–10):
Offer A: Salary 8, Growth 7, WLB 6, Location 9
Offer B: Salary 7, Growth 9, WLB 8, Location 6
Which should you choose?`,
    likes: 8,
    commentsCount: 6,
    shares: 1,
    solutions: [
      {
        id: 'sol-career-1',
        user: { name: 'HR Pro', avatar: 'https://i.pravatar.cc/150?u=hr' },
        content: `This is a classic weighted decision matrix problem. Here is the breakdown:

**Offer A Weighted Score:**
- Salary: 0.4 * 8 = 3.2
- Growth: 0.3 * 7 = 2.1
- WLB: 0.2 * 6 = 1.2
- Location: 0.1 * 9 = 0.9
- **Total Score (A) = 3.2 + 2.1 + 1.2 + 0.9 = 7.4**

**Offer B Weighted Score:**
- Salary: 0.4 * 7 = 2.8
- Growth: 0.3 * 9 = 2.7
- WLB: 0.2 * 8 = 1.6
- Location: 0.1 * 6 = 0.6
- **Total Score (B) = 2.8 + 2.7 + 1.6 + 0.6 = 7.7**

**Conclusion:**
Since 7.7 > 7.4, **Offer B is the better choice** based on your weighted criteria.`,
        isAccepted: true,
      }
    ]
  },
   {
    id: '5',
    user: { name: 'Physics Buff', avatar: 'https://i.pravatar.cc/150?u=physics' },
    category: 'Physics',
    title: 'Projectile Motion',
    content: `A ball is thrown with speed v₀ = 20 m/s at an angle 30° above horizontal. Ignore air resistance; take g = 9.8 m/s². Find: (a) time to max height, (b) max height, (c) total time of flight, (d) range.`,
    likes: 78,
    commentsCount: 14,
    shares: 5,
    solutions: [
      {
        id: 'sol-physics-1',
        user: { name: 'Sir Isaac', avatar: 'https://i.pravatar.cc/150?u=newton' },
        content: `Let's break it down:

**Initial Velocity Components:**
- v₀ₓ = v₀ cos(30°) ≈ 20 × 0.8660 = 17.32 m/s
- v₀ᵧ = v₀ sin(30°) = 20 × 0.5 = 10 m/s

**(a) Time to max height (t_up):**
At max height, vᵧ = 0. Using vᵧ = v₀ᵧ - gt:
0 = 10 - 9.8 * t_up ⇒ t_up = 10 / 9.8 ≈ 1.02 s.

**(b) Max height (H):**
Using H = v₀ᵧ * t_up - 0.5 * g * t_up²:
H = 10 * 1.02 - 0.5 * 9.8 * (1.02)² ≈ 10.2 - 5.1 ≈ 5.10 m.

**(c) Total time of flight (T):**
T = 2 * t_up ≈ 2 * 1.02 ≈ 2.04 s.

**(d) Range (R):**
R = v₀ₓ * T ≈ 17.32 * 2.04 ≈ 35.35 m.

**Answer: t_up ≈ 1.02 s, H ≈ 5.10 m, T ≈ 2.04 s, R ≈ 35.35 m.**`,
        isAccepted: true,
      },
    ]
  }
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

    