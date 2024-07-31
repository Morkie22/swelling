import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-image: url("./lymphedemassistant.jpg"); /* Update this path to your actual image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Label = styled.label`
  margin: 10px 0;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
`;

const Select = styled.select`
  padding: 8px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  margin-top: 20px;
  max-width: 300px;
`;

const Footer = styled.footer`
  background-color: #007bff;
  color: white;
  padding: 10px 0;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const App = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    duration: '',
    location: '',
    pain: '',
    skinChanges: '',
    history: ''
  });
  const [assessment, setAssessment] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (formData.duration === 'chronic' && formData.skinChanges === 'present' && formData.history === 'lymphedema') {
      result = 'Lymphedema likely. Consider referral to a specialist.';
    } else {
      result = 'Swelling likely due to other causes. Further investigation needed.';
    }
    setAssessment(result);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container>
      <div>
        <Title>Lymphedema Assistant</Title>
        <Form onSubmit={handleSubmit}>
          <Label>
            Age:
            <Input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </Label>
          <Label>
            Gender:
            <Select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </Label>
          <Label>
            Duration of Swelling:
            <Select name="duration" value={formData.duration} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="acute">Acute</option>
              <option value="chronic">Chronic</option>
            </Select>
          </Label>
          <Label>
            Location of Swelling:
            <Input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </Label>
          <Label>
            Pain:
            <Select name="pain" value={formData.pain} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </Label>
          <Label>
            Skin Changes:
            <Select name="skinChanges" value={formData.skinChanges} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </Select>
          </Label>
          <Label>
            History of Lymphedema:
            <Select name="history" value={formData.history} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </Label>
          <Label>
            Upload Image:
            <div {...getRootProps()} style={{ border: '2px dashed #ddd', padding: '20px', cursor: 'pointer' }}>
              <input {...getInputProps()} />
              {image ? <ImagePreview src={image} alt="Preview" /> : <p>Drag 'n' drop an image, or click to select one</p>}
            </div>
          </Label>
          <Button type="submit">Submit</Button>
        </Form>
        {assessment && <p>Assessment: {assessment}</p>}
      </div>
      <Footer>
        <p>&copy; 2024 by NBG</p>
      </Footer>
    </Container>
  );
};

export default App;
