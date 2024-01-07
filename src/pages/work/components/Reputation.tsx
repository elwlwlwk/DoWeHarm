import { useEffect, useState } from "react";
import { reputationService } from "../../../service/ReputationService";
import { PersonReputation, ReceptionRow } from "../../../service/types";
import { authService } from "../../../service/AuthService";

interface ReputationProps {
  reception: ReceptionRow;
}

export const Reputation = ({ reception }: ReputationProps) => {
  const [, setReputation] = useState<PersonReputation>();
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
  return <div>Reputation</div>;
};
