import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useAppContext();
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return <div className="text-center text-2xl text-gray-100">Project not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-gray-100">{project.title}</h1>
      <p className="text-xl text-gray-300 mb-8">{project.description}</p>
      
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">Project Visuals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {project.visualsUrls.map((visual, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img src={visual} alt={`Visual ${index + 1}`} className="w-full h-auto rounded" />
            <p className="mt-2 text-gray-300 text-center">Visual {index + 1}</p>
          </div>
        ))}
      </div>
      
      {project.sections.map((section, index) => (
        <div key={index} className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{section.title}</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;