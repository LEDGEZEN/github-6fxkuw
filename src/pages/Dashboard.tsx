import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const iconMap: { [key: string]: React.ReactNode } = {
  BarChart: <BarChart className="w-12 h-12 text-blue-400" />,
  PieChart: <PieChart className="w-12 h-12 text-green-400" />,
  TrendingUp: <TrendingUp className="w-12 h-12 text-red-400" />,
};

const Dashboard: React.FC = () => {
  const { projects } = useAppContext();
  const highlightedProjects = projects.slice(0, 3);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Sports Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlightedProjects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center mb-4">{iconMap[project.icon]}</div>
            <h2 className="text-xl font-semibold text-center text-gray-100">{project.title}</h2>
            <p className="mt-2 text-gray-400 text-center">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;