import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, PieChart, TrendingUp, Activity, Target, Users, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const iconMap: { [key: string]: React.ReactNode } = {
  BarChart: <BarChart className="w-8 h-8 text-blue-400" />,
  PieChart: <PieChart className="w-8 h-8 text-green-400" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-red-400" />,
  Activity: <Activity className="w-8 h-8 text-yellow-400" />,
  Target: <Target className="w-8 h-8 text-purple-400" />,
  Users: <Users className="w-8 h-8 text-indigo-400" />,
};

const Projects: React.FC = () => {
  const { projects, isAuthenticated, removeProject, reorderProjects } = useAppContext();

  const handleRemove = (id: number) => {
    if (window.confirm('Are you sure you want to remove this project?')) {
      removeProject(id);
    }
  };

  const handleMoveUp = (id: number, currentOrder: number) => {
    if (currentOrder > 1) {
      reorderProjects(id, currentOrder - 1);
    }
  };

  const handleMoveDown = (id: number, currentOrder: number) => {
    if (currentOrder < projects.length) {
      reorderProjects(id, currentOrder + 1);
    }
  };

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProjects.map((project) => (
          <div key={project.id} className="relative">
            <Link to={`/projects/${project.id}`}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-center justify-center mb-4">
                  {iconMap[project.icon as keyof typeof iconMap]}
                </div>
                <h2 className="text-xl font-semibold text-center text-gray-100">{project.title}</h2>
                <p className="mt-2 text-gray-400 text-center">{project.description}</p>
              </div>
            </Link>
            {isAuthenticated && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleMoveUp(project.id, project.order)}
                  className="p-1 bg-gray-700 rounded hover:bg-gray-600 transition duration-300"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4 text-gray-300" />
                </button>
                <button
                  onClick={() => handleMoveDown(project.id, project.order)}
                  className="p-1 bg-gray-700 rounded hover:bg-gray-600 transition duration-300"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4 text-gray-300" />
                </button>
                <button
                  onClick={() => handleRemove(project.id)}
                  className="p-1 bg-red-600 rounded hover:bg-red-700 transition duration-300"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4 text-gray-100" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {isAuthenticated && (
        <div className="mt-8 text-center">
          <Link to="/add-project" className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            Add New Project
          </Link>
        </div>
      )}
    </div>
  );
};

export default Projects;