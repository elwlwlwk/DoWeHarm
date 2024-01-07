import styled from "styled-components";
import { WaitingList } from "./WaitingList";
import { WorkSpace } from "./WorkSpace";
import { GRAY } from "../../../styles";

export const WorkMain = () => {
  return (
    <WorkMainContainer>
      <WorkingSpaceContainer>
        <WorkSpace />
      </WorkingSpaceContainer>
      <WaitingListContainer>
        <WaitingList />
      </WaitingListContainer>
    </WorkMainContainer>
  );
};

const WorkMainContainer = styled.div``;

const WorkingSpaceContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${GRAY};
`;

const WaitingListContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${GRAY};
`;
