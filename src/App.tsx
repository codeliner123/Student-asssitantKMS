import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ResumeAnalyzer } from './pages/ResumeAnalyzer';
import { SkillAssessment } from './pages/SkillAssessment';
import { GitHubAnalyzer } from './pages/GitHubAnalyzer';
import { CareerRoadmap } from './pages/CareerRoadmap';
import { SkillGraph } from './pages/SkillGraph';
import { JobInsights } from './pages/JobInsights';
export default function App() { return <Routes><Route path="/" element={<Layout />}><Route index element={<Dashboard />} /><Route path="resume" element={<ResumeAnalyzer />} /><Route path="skills" element={<SkillAssessment />} /><Route path="github" element={<GitHubAnalyzer />} /><Route path="roadmap" element={<CareerRoadmap />} /><Route path="skill-graph" element={<SkillGraph />} /><Route path="jobs" element={<JobInsights />} /></Route></Routes>; }
