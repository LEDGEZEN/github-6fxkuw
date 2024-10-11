import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const iconOptions = ['BarChart', 'PieChart', 'TrendingUp', 'Activity', 'Target', 'Users'];

const AddProject: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useAppContext();
  const [newProject, setNewProject] = useState({
    title: '',
    icon: 'BarChart',
    description: '',
    sections: [{ title: '', content: '' }],
    visualsUrls: [''],
  });
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProject);
    navigate('/projects');
  };

  const addSection = () => {
    setNewProject({
      ...newProject,
      sections: [...newProject.sections, { title: '', content: '' }],
    });
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const updatedSections = [...newProject.sections];
    updatedSections[index][field] = value;
    setNewProject({ ...newProject, sections: updatedSections });
  };

  const addVisual = () => {
    setNewProject({
      ...newProject,
      visualsUrls: [...newProject.visualsUrls, ''],
    });
  };

  const updateVisual = (index: number, value: string) => {
    const updatedVisuals = [...newProject.visualsUrls];
    updatedVisuals[index] = value;
    setNewProject({ ...newProject, visualsUrls: updatedVisuals });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Add New Project</h1>
      {isPreview ? (
        <div className="bg-gray-800 p-6 rounded-lg mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-100">{newProject.title}</h2>
          <p className="text-gray-300 mb-4">{newProject.description}</p>
          {newProject.sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-100">{section.title}</h3>
              <p className="text-gray-300">{section.content}</p>
            </div>
          ))}
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setIsPreview(false)}
              className="bg-gray-600 text-gray-100 px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-gray-100 px-4 py-2 rounded hover:bg-green-700 transition duration-300 flex items-center"
            >
              <Check className="mr-2" /> Submit
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setIsPreview(true); }} className="space-y-4">
          <input
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            placeholder="Project Title"
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
            required
          />
          <select
            value={newProject.icon}
            onChange={(e) => setNewProject({ ...newProject, icon: e.target.value })}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          >
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            placeholder="Project Description"
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
            required
          />
          {newProject.sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection(index, 'title', e.target.value)}
                placeholder="Section Title"
                className="w-full p-2 bg-gray-700 text-gray-100 rounded"
              />
              <textarea
                value={section.content}
                onChange={(e) => updateSection(index, 'content', e.target.value)}
                placeholder="Section Content"
                className="w-full p-2 bg-gray-700 text-gray-100 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Section
          </button>
          {newProject.visualsUrls.map((url, index) => (
            <input
              key={index}
              type="url"
              value={url}
              onChange={(e) => updateVisual(index, e.target.value)}
              placeholder="Visual URL"
              className="w-full p-2 bg-gray-700 text-gray-100 rounded"
            />
          ))}
          <button
            type="button"
            onClick={addVisual}
            className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Visual
          </button>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-600 text-gray-100 px-4 py-2 rounded hover:bg-green-700 transition duration-300 flex items-center">
              <Eye className="mr-2" /> Preview
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProject;