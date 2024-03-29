import { useContext, useEffect, useState } from "react";
import {
  PersonReputation,
  ReceptionRow,
  isErrorResponse,
} from "../../../service/types";
import { reputationService } from "../../../service/ReputationService";
import { authService } from "../../../service/AuthService";
import { Button, Flex, Rate, Skeleton, Typography } from "antd";
import styled from "styled-components";
import { ErrorMessage, GRAY } from "../../../styles";
import { NotiContext } from "../../../App";

interface SecondReputationProps {
  reception: ReceptionRow;
  onClose?: () => void;
}

export const SecondReputation = ({
  reception,
  onClose,
}: SecondReputationProps) => {
  const { notify } = useContext(NotiContext);

  const [reputation, setReputation] = useState<PersonReputation>();
  const [characterScore, setCharacterScore] = useState<number>();
  const [revisitScore, setRevisitScore] = useState<number>();
  const [characterWarning, setCharacterWarning] = useState<boolean>(false);
  const [revisitWarning, setRevisitWarning] = useState<boolean>(false);
  useEffect(() => {
    const getReputation = async () => {
      const reputation = await reputationService.getReputation(
        authService.getAuthToken(),
        reception
      );
      setReputation(reputation);
    };
    getReputation();
  }, [reception]);

  if (reputation == null) return <Skeleton active />;

  const reputationLog =
    reputation?.reputationLog?.filter(
      (reputationLog) => reputationLog.rater === authService.user
    ) ?? [];
  const reputationLogNum = reputationLog.length ?? 0;
  const curCharacterScore =
    reputationLog.reduce((acc, cur) => {
      return acc + cur.character;
    }, 0) / reputationLogNum;
  const curRevisitScore =
    reputationLog.reduce((acc, cur) => {
      return acc + cur.revisit;
    }, 0) / reputationLogNum;

  return (
    <>
      <RatingBodyContainer>
        <RatingsContainer gap={"small"}>
          <Rating
            title="My Prev Character"
            score={curCharacterScore}
            displayWarning={characterWarning}
            onRate={(score) => {
              setCharacterScore(score);
              setCharacterWarning(false);
            }}
          />
          <Rating
            title="My Prev Revisit"
            score={curRevisitScore}
            displayWarning={revisitWarning}
            onRate={(score) => {
              setRevisitScore(score);
              setRevisitWarning(false);
            }}
          />
        </RatingsContainer>
      </RatingBodyContainer>
      <RatingFooterContainer justify={"flex-end"} gap={"small"}>
        <Button
          type={"default"}
          onClick={() => {
            // setReputation(undefined);
            onClose && onClose();
          }}
        >
          닫기
        </Button>
        <Button
          type={"primary"}
          onClick={async () => {
            if (!characterScore) {
              setCharacterWarning(true);
            }
            if (!revisitScore) {
              setRevisitWarning(true);
            }

            if (characterScore && revisitScore) {
              try {
                await reputationService.postReputation(
                  authService.getAuthToken(),
                  reception,
                  {
                    rater: authService.user,
                    character: characterScore,
                    revisit: revisitScore,
                  },
                  {
                    isSecondReputation: true,
                  }
                );
              } catch (e) {
                console.log(e);
                if (isErrorResponse(e)) {
                  notify(<ErrorMessage>{e.message}</ErrorMessage>);
                }
              }
              // onClose && onClose();
            }
          }}
        >
          평가
        </Button>
      </RatingFooterContainer>
    </>
  );
};

const RatingBodyContainer = styled.div`
  margin: 10px 0;
`;

const RatingFooterContainer = styled(Flex)``;

const RatingsContainer = styled(Flex)``;

interface RatingProps {
  title: string;
  score: number;
  myScore?: number;
  ratingNum?: number;
  displayWarning?: boolean;
  onRate?: (score: number) => void;
}

export const Rating = ({
  title,
  score,
  myScore,
  ratingNum,
  displayWarning,
  onRate,
}: RatingProps) => {
  return (
    <RatingScoreContainer>
      <RatingTitle>{title}</RatingTitle>
      <RatingRow>
        <RatingScore>
          {isNaN(score)
            ? 0
            : score.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </RatingScore>
        <RatingTotal>/ 10</RatingTotal>
        {ratingNum !== undefined ? <RatingNum>({ratingNum})</RatingNum> : null}
      </RatingRow>
      <RatingRow>
        <Rate
          defaultValue={myScore}
          character={({ index }) => (index ?? 0) + 1}
          count={10}
          onChange={(value) => onRate && onRate(value)}
        />
      </RatingRow>
      <RatingRow>{displayWarning ? "평가를 선택해주세요." : ""}</RatingRow>
    </RatingScoreContainer>
  );
};

const RatingScoreContainer = styled.div`
  border: 1px solid ${GRAY};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const RatingTitle = styled(Typography.Text)`
  font-size: 20px;
  padding: 0 10px;
  font-weight: bold;
`;

const RatingScore = styled.div`
  font-size: 40px;
`;

const RatingTotal = styled.div`
  margin-left: 5px;
  color: ${GRAY};
  font-size: 20px;
`;

const RatingNum = styled.div`
  font-size: 20px;
  margin-left: 5px;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding: 0 10px;
  min-height: 1.2rem;
`;
