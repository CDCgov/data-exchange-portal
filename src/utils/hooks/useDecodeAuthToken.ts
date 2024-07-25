import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { dataStreamsAtom } from "src/state/dataStreams";
import { mockDataStreamsWithRoutes } from "src/mocks/data/dataStreams";

const useDecodeAuthToken = () => {
  const setDataStreams = useSetRecoilState(dataStreamsAtom);

  useEffect(() => {
    // TODO: Look for B2C token in local storage
    const token = true;
    if (token) {
      // TODO: Make JWT decode function using jwt_decode
      const decoded = mockDataStreamsWithRoutes;
      if (decoded) {
        setDataStreams(decoded);
      }
    }
  }, [setDataStreams]);
};

export default useDecodeAuthToken;
