import './index.scss';
const BeneficiaryList = ({ data, onEdit, onDelete, onView }) => {
  const headers = ['#', 'Full Name', 'Address', 'Country', 'Pincode'];
  return (
    <>
      {data && <table className="customTableWrap">
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data?.map(({ id, fullName, address, country, pincode }, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 !== 0 ? 'oddRow' : ''}>
              <td key={rowIndex}>{id}</td>
              <td key={rowIndex}>{fullName}</td>
              <td key={rowIndex}>{address}</td>
              <td key={rowIndex}>{country}</td>
              <td key={rowIndex}>{pincode}</td>
              <td>
                <button onClick={() => onEdit(id)} className="actionButton">
                  <i className="fa-regular fa-pen-to-square"></i>{' '}
                </button>
                <button onClick={() => onDelete(id)} className="actionButton">
                  <i className="fa-solid fa-trash-can"></i>{' '}
                </button>
                <button onClick={() => onView(id)} className="actionButton">
                  <i className="fa-solid fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
      {data && data.length === 0 && <div>No data available. </div>}
    </>
  );
};

export default BeneficiaryList;
