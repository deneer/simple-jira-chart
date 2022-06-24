import { ProvidedZoom } from "@visx/zoom/lib/types";
import { useAtom } from "jotai";
import { resetIssuesAtom, resetJitterAtom } from "../store/atoms/jira.atom";

export type ScatterPlotTopConfigContainerProps = {
  zoom: ProvidedZoom<SVGSVGElement>;
};

function ScatterPlotTopConfigContainer({
  zoom,
}: ScatterPlotTopConfigContainerProps) {
  const [reset, resetJitter] = useAtom(resetJitterAtom);
  const [refresh, refreshIssues] = useAtom(resetIssuesAtom);
  return (
    <div className="w-full flex justify-between mb-2">
      <button
        className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-2 px-4 rounded inline-flex items-center justify-center text-xs"
        onClick={() => refreshIssues(!refresh)}
      >
        Refresh Issues
      </button>
      <div className="flex rounded overflow-hidden">
        <button
          className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-2 px-4 inline-flex items-center justify-center text-sm"
          onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
        >
          -
        </button>
        <button
          className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-2 px-4 inline-flex items-center justify-center text-xs"
          onClick={() => zoom.reset()}
        >
          Reset Zoom
        </button>
        <button
          className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-2 px-4 inline-flex items-center justify-center text-sm"
          onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
        >
          +
        </button>
      </div>

      <button
        className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-2 px-4 rounded inline-flex items-center justify-center text-xs"
        onClick={() => resetJitter(!reset)}
      >
        Refresh Scatter Jittering(점 다시 뿌리기)
      </button>
    </div>
  );
}

export default ScatterPlotTopConfigContainer;
