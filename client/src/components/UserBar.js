import FilterBar from './FilterBar';
import Results from './Results'; 

function UserBar(){
  return(
    <div className="user-bar">
      <FilterBar/>
      <Results/>
    </div>
  );
}
export default UserBar;