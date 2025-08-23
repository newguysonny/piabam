
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EscrowCard = ({ transaction }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/crew-room/${transaction.id}`, {
      state: { transactionData: transaction }
    },{ state: { fromApp: true } });
  };

  return (
    <div className="border-b border-gray-200 last:border-0 p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">
            {transaction.title} 
            <span className="text-gray-500 font-normal"> by {transaction.host}</span>
          </h3>
          <p className="text-sm text-gray-500">{transaction.date}</p>
          <p className="text-sm mt-1">{transaction.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          transaction.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {transaction.status}
        </span>
      </div>
      <div className="flex justify-end mt-2 space-x-2">
        <button 
          onClick={handleViewDetails}
          className="text-sm text-purple-600 hover:text-purple-800"
        >
          View Details
        </button>
        {transaction.status === 'Active' && (
          <button className="text-sm text-red-600 hover:text-red-800">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

EscrowCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default EscrowCard;








/*
import PropTypes from 'prop-types';

const EscrowCard = ({ transaction }) => {
  return (
    <div className="border-b border-gray-200 last:border-0 p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          {/* Combined title with "by [host]" /}
          <h3 className="font-medium">
            {transaction.title} 
            <span className="text-gray-500 font-normal"> by {transaction.host}</span>
          </h3>
          <p className="text-sm text-gray-500">{transaction.date}</p>
          <p className="text-sm mt-1">{transaction.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          transaction.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {transaction.status}
        </span>
      </div>
      <div className="flex justify-end mt-2 space-x-2">
        <button className="text-sm text-purple-600 hover:text-purple-800">
          View Details
        </button>
        {transaction.status === 'Active' && (
          <button className="text-sm text-red-600 hover:text-red-800">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

EscrowCard.propTypes = {
  transaction: PropTypes.shape({
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default EscrowCard;


*/
