import styled from "styled-components";
import { ReceptionRow } from "../../../service/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedReceptionState } from "../../../recoil/work/atoms";
import { receptionService } from "../../../service/ReceptionService";
import { waitingListState } from "../../../recoil/reception/selectors";
import { GRAY } from "../../../styles";

export const WaitingList = () => {
  const waitingList = useRecoilValue(waitingListState);
  return (
    <WaitingListContainer>
      {waitingList.map((waiting, idx) => (
        <WaitingListItem key={idx} {...waiting} />
      ))}
    </WaitingListContainer>
  );
};

const WaitingListItem = ({
  name,
  socialNum1,
  socialNum2,
  regDateTime,
}: ReceptionRow) => {
  const [reception, setReception] = useRecoilState(selectedReceptionState);
  return (
    <ListItemContainer
      onClick={() => {
        const clickedReception = { name, socialNum1, socialNum2, regDateTime };
        if (
          reception &&
          receptionService.isSameRecption(reception, clickedReception)
        ) {
          setReception(null);
        } else {
          setReception({ name, socialNum1, socialNum2, regDateTime });
        }
      }}
      selected={
        reception
          ? receptionService.isSameRecption(reception, {
              name,
              socialNum1,
              socialNum2,
            })
          : false
      }
    >
      <ListItemName>{name}</ListItemName>
      <ListItemSocialNum>
        {socialNum1}-{socialNum2?.substring(0, 1)}
      </ListItemSocialNum>
      {/* <ListItemActions>
        <ItemActionButton
          type={"primary"}
          onClick={() => {
            setReception({ name, socialNum1, socialNum2, regDateTime });
          }}
        >
          보기
        </ItemActionButton>
      </ListItemActions> */}
    </ListItemContainer>
  );
};

const WaitingListContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${GRAY};
`;

const ListItemContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ selected }) => (selected ? GRAY : "#ffffff")};
  cursor: pointer;
`;

const ListItemName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ListItemSocialNum = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

// const ListItemActions = styled.div``;

// const ItemActionButton = styled(Button)``;
