import { useAtom } from "jotai";
import { resetJitterAtom } from "../store/atoms/jira.atom";

function RefreshJitterContainer() {
  const [reset, resetJitter] = useAtom(resetJitterAtom);
  return (
    <button
      className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
      onClick={() => resetJitter(!reset)}
    >
      Refresh Scatter Jittering(점 다시 뿌리기)
    </button>
  );
}

export default RefreshJitterContainer;
