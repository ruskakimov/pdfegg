import { useState } from "react";
import { PdfHandle } from "../pdf-rendering";
import DownloadButton from "./DownloadButton";
import PdfViewer from "./PdfViewer";

import "./EditorPage.css";
import Header from "./Header";
import EditorStateProvider from "./EditorStateProvider";

function EditorPage() {
  const [pdfHandle, setPdfHandle] = useState<PdfHandle | null>(null);

  async function onFileChange(files: FileList | null) {
    if (files === null || files.length === 0) return;

    const buffer = await files[0].arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const newPdfHandle = await PdfHandle.create(bytes);
    setPdfHandle(newPdfHandle);
  }

  return (
    // TODO: State must be linked to a particular pdf.
    <EditorStateProvider>
      <div className="editor-page">
        <Header>
          <h1>pdfegg</h1>
          <input
            type="file"
            name="pdf-input"
            accept=".pdf"
            onChange={(e) => onFileChange(e.target.files)}
          />
          {pdfHandle && <DownloadButton pdfBytes={pdfHandle.bytes} />}
        </Header>

        {pdfHandle && <PdfViewer key={pdfHandle.id} pdfHandle={pdfHandle} />}
      </div>
    </EditorStateProvider>
  );
}

export default EditorPage;
