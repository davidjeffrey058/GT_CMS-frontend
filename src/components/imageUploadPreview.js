import { useState } from "react";

export default function ImageUploadPreview() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-content-center mb-3">
      
      <div className="image-preview">
        {image ? (
            <div className="preview-placeholder">
                <img
                width={150}
                src={image}
                alt="Preview"
                />

                <div className="flex btn btn-secondary" onClick={() => setImage(null)}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </div>
                
            </div>
          
        ) : (
            <div >
                
                <input 
                style={{display: 'none'}}
                    id="img-slt"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                <label htmlFor="img-slt">
                    <span className="material-symbols-outlined">
                        add_a_photo
                    </span>
                </label>
            </div>
          
        )}
      </div>
    </div>
  );
}