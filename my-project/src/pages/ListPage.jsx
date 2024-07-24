import React from 'react';
import useSWR, { mutate } from 'swr';


const fetcher = (url) => fetch(url).then((res) => res.json());

function ListPage() {
  const { data } = useSWR('/api/data', fetcher);

  const handleDelete = async (id) => {
    
    await fetch(`/api/data/${id}`, {
      method: 'DELETE',
    });

    
    const updatedData = data.filter((item) => item.id !== id);
    mutate('/api/data', updatedData, false);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Function</th>
            <th>Review</th>
            <th>Email</th>
            <th>Date</th>
            <th>ID</th>
            <th>Actions</th> {}
          </tr>
        </thead>
        <tbody>
          {data && data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.function}</td>
              <td>{item.review}</td>
              <td>{item.email}</td>
              <td>{item.date}</td>
              <td>{item.id}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-red" 
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;
