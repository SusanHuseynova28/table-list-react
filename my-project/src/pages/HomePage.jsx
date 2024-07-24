import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';


const fetcher = (url) => fetch(url).then((res) => res.json());

function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    function: '',
    review: '',
    email: '',
    date: '',
    id: '',
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const { data } = useSWR('/api/data', fetcher);

  
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const updatedData = [...(data || []), { ...formData, image: file ? file.name : '' }];

 
    if (file) {
      const formDataFile = new FormData();
      formDataFile.append('file', file);
      await fetch('/api/upload', {
        method: 'POST',
        body: formDataFile,
      });
    }

  
    await mutate('/api/data', updatedData, false);

 
    setFormData({ name: '', function: '', review: '', email: '', date: '', id: '' });
    setFile(null);


    navigate('/list');
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="input"
        />
        <input
          type="text"
          name="function"
          value={formData.function}
          onChange={handleChange}
          placeholder="Function"
          className="input"
        />
        <input
          type="text"
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="Review"
          className="input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="ID"
          className="input"
        />

        <div {...getRootProps()} className="upload">
          <input {...getInputProps()} />
          {file ? <p>{file.name}</p> : <p>Upload Image</p>}
        </div>

        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default HomePage;
