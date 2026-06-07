// TODO: Replace with real API call
export const mockUser = { name: 'Alex Student', role: 'Computer Science', avatar: 'AS', profileStrength: 68, targetRole: 'Frontend Developer', roleReadiness: 68 };
// TODO: Replace with real API call
export const mockStats = { resumeScore: 78, resumeScoreChange: 12, skillsMatched: 14, skillsTotal: 21, githubActivity: 'Good', githubCommits: 23, learningStreak: 12 };
// TODO: Replace with real API call
export const mockSkillGaps = [
  { name: 'TypeScript', priority: 'High', status: 'missing' },
  { name: 'Testing (Jest)', priority: 'High', status: 'partial' },
  { name: 'React Query', priority: 'Medium', status: 'missing' },
  { name: 'CI/CD Basics', priority: 'Medium', status: 'partial' },
  { name: 'Accessibility (a11y)', priority: 'Low', status: 'partial' },
];
// TODO: Replace with real API call
export const mockRoadmapSteps = [
  { id: 1, label: 'Foundation', status: 'completed' },
  { id: 2, label: 'Core Skills', status: 'completed' },
  { id: 3, label: 'Build & Apply', status: 'in-progress' },
  { id: 4, label: 'Level Up', status: 'upcoming' },
];
// TODO: Replace with real API call
export const mockSkills = [
  { name: 'React', level: 85, category: 'Frontend' }, { name: 'JavaScript', level: 80, category: 'Frontend' },
  { name: 'CSS/Tailwind', level: 75, category: 'Frontend' }, { name: 'TypeScript', level: 30, category: 'Frontend' },
  { name: 'Node.js', level: 60, category: 'Backend' }, { name: 'Git', level: 70, category: 'Tools' },
  { name: 'Testing', level: 25, category: 'Tools' }, { name: 'SQL', level: 55, category: 'Backend' },
];
// TODO: Replace with real API call
export const mockJobs = [
  { title: 'Junior Frontend Developer', company: 'TechCorp', match: 85, salary: '$65k–$80k', tags: ['React', 'TypeScript', 'Remote'] },
  { title: 'UI Engineer', company: 'StartupXYZ', match: 72, salary: '$70k–$90k', tags: ['Vue', 'CSS', 'Hybrid'] },
  { title: 'Frontend Intern', company: 'BigTech Inc', match: 91, salary: '$25/hr', tags: ['React', 'On-site'] },
];
// TODO: Replace with GitHub API
export const mockGithubStats = {
  score: 74,
  commits: [{ day: 'Mon', commits: 3 }, { day: 'Tue', commits: 7 }, { day: 'Wed', commits: 2 }, { day: 'Thu', commits: 6 }, { day: 'Fri', commits: 5 }, { day: 'Sat', commits: 1 }, { day: 'Sun', commits: 2 }],
  languages: [{ name: 'TypeScript', value: 42 }, { name: 'JavaScript', value: 28 }, { name: 'CSS', value: 20 }, { name: 'Python', value: 10 }],
  repos: ['portfolio-react', 'student-dashboard', 'api-practice-tracker'],
};
// TODO: Replace with real API call
export const roadmapPhases = [
  { title: 'Phase 1: Foundation', status: 'completed', tasks: ['Polish resume headline', 'Publish portfolio shell', 'Review semantic HTML'] },
  { title: 'Phase 2: Core Skills', status: 'completed', tasks: ['Finish TypeScript basics', 'Build reusable components', 'Practice Git branching'] },
  { title: 'Phase 3: Build & Apply', status: 'in-progress', tasks: ['Ship two case-study projects', 'Add tests to portfolio', 'Apply to 8 tailored roles weekly'] },
  { title: 'Phase 4: Level Up', status: 'upcoming', tasks: ['Learn performance profiling', 'Contribute to open source', 'Prepare system design stories'] },
];
