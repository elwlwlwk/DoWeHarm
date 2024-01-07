import { useRecoilValue } from "recoil";
import { selectedReceptionState } from "../../../recoil/work/atoms";
import styled from "styled-components";
import { Reputation } from "./Reputation";

export const WorkSpace = () => {
  const reception = useRecoilValue(selectedReceptionState);
  if (!reception) return <WorkSpaceContainer>empty</WorkSpaceContainer>;
  return (
    <WorkSpaceContainer>
      <Reputation reception={reception}></Reputation>
    </WorkSpaceContainer>
  );
};

const WorkSpaceContainer = styled.div``;
