import "./todo.scss";
import Header from "../header/Header";
import {ItemsContainer} from "../itemsContainer/ItemsContainer";
function Todo() {
  return (
    <div className="main-container">
        <Header></Header>
          <ItemsContainer></ItemsContainer>
    </div>
  );
}

export default Todo;
