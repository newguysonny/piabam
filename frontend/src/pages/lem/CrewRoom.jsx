import CrewLayout from "../../components/crew/CrewLayout";
import CrewChat from "../../components/crew/CrewChat";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const CrewRoom = () => {
  const { state } = useLocation();
  const transaction = state?.transactionData;
 const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a direct navigation (outside click) or internal navigation
    const isDirectAccess = location.state?.fromApp !== true;
    
    if (isDirectAccess) {
      // Redirect to map only if coming from outside
      navigate(`/map?crew=${id}`, { replace: true });
    }
  }, [id, navigate, location]);
  
  return (
    <div className="flex flex-col bg-neutral-900 h-screen overflow-hidden">
      <div className="shrink-0">
        <CrewLayout transaction={transaction} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <CrewChat transaction={transaction} />
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
