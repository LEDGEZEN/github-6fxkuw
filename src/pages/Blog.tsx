import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Check, Edit, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Blog: React.FC = () => {
  const { blogPosts, addBlogPost, removeBlogPost, editBlogPost, isAuthenticated } = useAppContext();
  const [newPost, setNewPost] = useState({ title: '', date: '', excerpt: '', content: '' });
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost !== null) {
      editBlogPost(editingPost, newPost);
      setEditingPost(null);
    } else {
      addBlogPost(newPost);
    }
    setNewPost({ title: '', date: '', excerpt: '', content: '' });
    setIsPreview(false);
  };

  const handleEdit = (post: typeof blogPosts[0]) => {
    setNewPost(post);
    setEditingPost(post.id);
    setIsPreview(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      removeBlogPost(id);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-md relative">
            <h2 className="text-2xl font-semibold mb-2 text-gray-100">{post.title}</h2>
            <div className="flex items-center text-gray-400 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="text-blue-400 hover:underline">Read more</Link>
            {isAuthenticated && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-1 bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
                  title="Edit Post"
                >
                  <Edit className="w-4 h-4 text-gray-100" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-1 bg-red-600 rounded hover:bg-red-700 transition duration-300"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4 text-gray-100" />
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
      {isAuthenticated && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">
            {editingPost !== null ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          {isPreview ? (
            <div className="bg-gray-800 p-6 rounded-lg mb-4">
              <h3 className="text-2xl font-semibold mb-2 text-gray-100">{newPost.title}</h3>
              <div className="flex items-center text-gray-400 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{newPost.date}</span>
              </div>
              <p className="text-gray-300 mb-4">{newPost.excerpt}</p>
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: newPost.content }} />
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
                  <Check className="mr-2" /> {editingPost !== null ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setIsPreview(true); }} className="bg-gray-800 p-6 rounded-lg">
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Blog Post Title"
                className="w-full p-2 mb-4 bg-gray-700 text-gray-100 rounded"
                required
              />
              <input
                type="date"
                value={newPost.date}
                onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-gray-100 rounded"
                required
              />
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                placeholder="Blog Post Excerpt"
                className="w-full p-2 mb-4 bg-gray-700 text-gray-100 rounded"
                required
              />
              <ReactQuill
                theme="snow"
                value={newPost.content}
                onChange={(content) => setNewPost({ ...newPost, content })}
                modules={modules}
                formats={formats}
                className="mb-4 bg-gray-700 text-gray-100 rounded"
              />
              <button type="submit" className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700 transition duration-300 flex items-center">
                <Eye className="mr-2" /> Preview
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;