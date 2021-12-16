import { useCallback } from "react";
import HighDpiCanvas from "../common/HighDpiCanvas";
import PageOverlayCanvas from "./PageOverlayCanvas";

function PageContainer({ width, pageHandle }) {
  const height = (width / pageHandle.width) * pageHandle.height;
  const style = { width: `${width}px`, height: `${height}px` };

  const renderPage = useCallback(
    (canvasContext) => {
      pageHandle.render(canvasContext);
    },
    [pageHandle]
  );

  return (
    <div className="page-container" style={style}>
      <HighDpiCanvas width={width} height={height} render={renderPage} />
      <PageOverlayCanvas
        width={width}
        height={height}
        pageWidth={pageHandle.width}
      />
    </div>
  );
}

export default PageContainer;
