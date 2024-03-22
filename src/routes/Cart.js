/*eslint-disable*/
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store.js";
import { addCount, addItem } from "./../store.js";
import { memo, useMemo, useState } from "react";

function Cart() {
  // let result = 함수();
  // useMemo(()=>{return 함수()}, [state])
  let a = useSelector((state) => {
    return state.stock;
  }); //Redux store가져와줌
  let state = useSelector((state) => state);
  let dispatch = useDispatch(); //dispatch:store.js로 메세지 보내주는 함수
  let [count, setCount] = useState(0);

  return (
    <div>
      {/* <Child count={count}></Child>
            <button onClick={()=>{ setCount(count+1) }}> + </button> */}
      <h6>
        {state.user.name} {state.user.age}의 장바구니
      </h6>
      {/* <button onClick={()=>{ dispatch(increase(100))}}>증가버튼</button>
            <button onClick={() => { dispatch(changeName()) }}>이름 변경</button> */}

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCount(state.cart[i].id)); //addCount가 실행되도록 store.js에 부탁
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Cart;
