import State from './State';
import { proxy,useSnapshot } from "valtio"
import axios from 'axios';
export function ImageUpload() {
    // const [imageUrl, setImageUrl] = useState(null);
    const snap=useSnapshot(State)
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
  
      // Upload the image to the server using axios
      axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        // Get the image URL from the server response
        State['imageUrl']=response.data.imageUrl; // Save the image URL in state
      }).catch(error => {
        console.error('Error uploading the file:', error);
      });
    };
  
    return (
      <div className='imageUpload'>
        <input type="file" onChange={handleFileUpload} />
      </div>
    );
  }