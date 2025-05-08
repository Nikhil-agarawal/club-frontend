import { useLocation } from 'react-router-dom';
import "./NotesSummary.css"

function SavedDataPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const url = searchParams.get('url');

  return (
    <div className='summary-form-container'>
      <h2 className='summary-form-header'>Saved Data</h2>
      <h3>Title : {title}</h3>
      <h3 >URL : <a className='summary-form-url' href={url} target='_blank' rel='noopener noreferrer'>{url}</a></h3>
    </div>
  );
}

export default SavedDataPage;