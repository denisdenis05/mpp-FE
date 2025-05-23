import styled from "styled-components";

export const UploadContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 9px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 16px;
`;

export const FileInput = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;
  border: 2px dashed #9a8282;
  border-radius: 9px;
  margin-bottom: 16px;
  font-size: 1rem;
  color: #9a8282;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f5f5;
  }

  input {
    display: none;
  }
`;

export const UploadButton = styled.button`
  background-color: #9a8282;
  color: white;
  height: 40px;
  width: 120px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-family: inherit;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #8c7171;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 24px;
  width: 100%;
`;

export const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 0.95rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const DownloadButton = styled.button`
  background-color: #9a8282;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background-color: #8c7171;
  }
`;
