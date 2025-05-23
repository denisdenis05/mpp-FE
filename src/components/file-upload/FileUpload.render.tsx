import { useEffect, useState } from "react";
import axios from "axios";
import {
  FileList,
  FileInput,
  Title,
  UploadButton,
  UploadContainer,
  FileItem,
  DownloadButton,
} from "./FileUpload.style";
import { AddButton } from "../admin-table/AdminTable.style";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const fetchFiles = async () => {
    const res = await axios.get("http://localhost:5249/FileS/all");
    setUploadedFiles(res.data);
  };

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5249/Files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFile(null);
    fetchFiles(); // Refresh list
  };

  const downloadFile = async (fileName: string) => {
    const res = await axios.get(
      `http://localhost:5249/Files/download/${fileName}`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <UploadContainer>
      <Title>Upload a File</Title>
      <FileInput>
        {file ? file.name : "Click or drag a file here to upload"}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </FileInput>
      <UploadButton onClick={uploadFile}>Upload</UploadButton>

      <Title>Uploaded Files</Title>
      <FileList>
        {uploadedFiles.map((fileName) => (
          <FileItem key={fileName}>
            {fileName}
            <DownloadButton onClick={() => downloadFile(fileName)}>
              Download
            </DownloadButton>
          </FileItem>
        ))}
      </FileList>
    </UploadContainer>
  );
};

export default FileUpload;
