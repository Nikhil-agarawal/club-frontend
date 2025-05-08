import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReferenceNotes.css';

function ReferenceNotesForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission logic here
    if (title === '' || url === '') {
      alert('Please enter both Title and URL');
      return;
    }
    navigate(`/saved-data?title=${title}&url=${url}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='reference-form-container'>
        <h2>Reference Notes Form</h2>
        <div>
          <label htmlFor="title">Title:</label>
            <input type='text' placeholder='Enter the title' value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div>
          <label htmlFor="content">Url:</label>
            <input type='url' placeholder='Url' value={url} onChange={(event) => setUrl(event.target.value)} />
            {/* {url && <a href={url} target='_blank' rel='noopener noreferrer'>{url}</a>} */}
          </div>
          <button className='reference-form-save'>
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default ReferenceNotesForm;
