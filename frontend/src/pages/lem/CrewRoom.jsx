import CrewLayout from "../../components/crew/CrewLayout";
import RoomChat from "../../components/crew/RoomChat";
import { useLocation } from 'react-router-dom';

const CrewRoom = () => {
  const { state } = useLocation();
  const transaction = state?.transactionData;

  return (
    <div className="flex flex-col bg-neutral-900 h-screen overflow-hidden">
      <div className="shrink-0">
        <CrewLayout transaction={transaction} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <RoomChat transaction={transaction} />
      </div>
    </div>
  );
};

export default CrewRoom;

/*
import MealCrewLayout from "../../components/lem/MealCrewLayout";
import RoomChat from "../../components/lem/RoomChat";
import { useLocation } from 'react-router-dom';

const CrewRoom = () => {
  const { state } = useLocation();
  const transaction = state?.transactionData;

  return (
    <div className="flex flex-col bg-neutral-900 h-screen overflow-hidden">
      <div className="shrink-0">
        <MealCrewLayout transaction={transaction} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <RoomChat transaction={transaction} />
      </div>
    </div>
  );
};

export default CrewRoom;
*/
