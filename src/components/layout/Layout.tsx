import { Outlet } from 'react-router-dom';
import { ChatBot } from '../chatbot/ChatBot';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
export function Layout() { return <div className="min-h-screen"><Sidebar /><main className="md:pl-[260px]"><TopBar /><div className="page-fade p-4 pt-6 md:p-8"><Outlet /></div></main><ChatBot /></div>; }
