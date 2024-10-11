import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BlogPostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useAppContext();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return <div className="text-center text-2xl text-gray-100">Blog post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-gray-100">{post.title}</h1>
      <div className="flex items-center text-gray-400 mb-8">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{post.date}</span>
      </div>
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default BlogPostDetails;