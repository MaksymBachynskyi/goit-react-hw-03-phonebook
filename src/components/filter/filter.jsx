export const Filter = ({ onFilter }) => {
  return (
    <div>
      <h4>Find contacts by name</h4>
      <input onChange={onFilter}></input>
    </div>
  );
};
