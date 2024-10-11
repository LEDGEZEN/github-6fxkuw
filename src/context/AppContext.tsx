import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Section {
  title: string;
  content: string;
}

interface Project {
  id: number;
  title: string;
  icon: string;
  description: string;
  sections: Section[];
  visualsUrls: string[];
  order: number;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

interface AppContextType {
  projects: Project[];
  blogPosts: BlogPost[];
  isAuthenticated: boolean;
  login: (password: string) => void;
  logout: () => void;
  addProject: (project: Omit<Project, 'id' | 'order'>) => void;
  removeProject: (id: number) => void;
  reorderProjects: (id: number, newOrder: number) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  removeBlogPost: (id: number) => void;
  editBlogPost: (id: number, updatedPost: Omit<BlogPost, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "NBA Player Performance Analysis",
      icon: "BarChart",
      description: "In-depth analysis of NBA player statistics and performance metrics.",
      sections: [
        { title: "Methodology", content: "We used advanced statistical models..." },
        { title: "Key Findings", content: "Our analysis revealed significant correlations between..." },
      ],
      visualsUrls: [
        "https://via.placeholder.com/400x300?text=NBA+Stats+Chart",
        "https://via.placeholder.com/400x300?text=Player+Performance+Graph",
      ],
      order: 1,
    },
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "The Rise of Data Analytics in Sports",
      date: "2023-03-15",
      excerpt: "Exploring how data-driven decisions are reshaping the sports industry...",
      content: `
        <h2>The Data Revolution in Sports</h2>
        <p>In recent years, the sports industry has witnessed a significant shift towards data-driven decision-making. This article explores the profound impact of analytics on various aspects of modern sports, from player recruitment to in-game strategies.</p>
        <h3>Key Areas of Impact</h3>
        <ul>
          <li>Player Performance Evaluation</li>
          <li>Team Strategy and Tactics</li>
          <li>Injury Prevention and Management</li>
          <li>Fan Engagement and Marketing</li>
        </ul>
        <p>As we delve deeper into each of these areas, we'll see how analytics is revolutionizing the way sports are played, managed, and experienced.</p>
      `
    },
    // ... (keep other blog posts)
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (password: string) => {
    // In a real application, you would validate the password against a secure backend
    if (password === "demo123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addProject = (project: Omit<Project, 'id' | 'order'>) => {
    setProjects(prev => [...prev, { ...project, id: prev.length + 1, order: prev.length + 1 }]);
  };

  const removeProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const reorderProjects = (id: number, newOrder: number) => {
    setProjects(prev => {
      const projectToMove = prev.find(p => p.id === id);
      if (!projectToMove) return prev;

      const updatedProjects = prev.filter(p => p.id !== id);
      updatedProjects.splice(newOrder - 1, 0, { ...projectToMove, order: newOrder });

      return updatedProjects.map((p, index) => ({ ...p, order: index + 1 }));
    });
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    setBlogPosts(prev => [...prev, { ...post, id: prev.length + 1 }]);
  };

  const removeBlogPost = (id: number) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  const editBlogPost = (id: number, updatedPost: Omit<BlogPost, 'id'>) => {
    setBlogPosts(prev => prev.map(post => post.id === id ? { ...updatedPost, id } : post));
  };

  return (
    <AppContext.Provider value={{
      projects,
      blogPosts,
      isAuthenticated,
      login,
      logout,
      addProject,
      removeProject,
      reorderProjects,
      addBlogPost,
      removeBlogPost,
      editBlogPost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};