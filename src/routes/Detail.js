/*eslint-disable*/
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Context1 } from "./../App.js";
import React, { useContext } from "react";
import { addItem } from "./../store.js";
import { useDispatch } from "react-redux";

let CuteBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "black" ? "white" : "black")};
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function Detail(props) {
  let { 재고, shop } = useContext(Context1); //보관함 해체 함수
  let { id } = useParams(); //유저가 url파라미터에 입력한거 가져오려면 useParams()
  let 찾은상품 = props.shop.find((x) => x.id == id);
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [탭, 탭변경] = useState(1);
  let [fade2, setFade2] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    let 꺼낸거 = localStorage.getItem("watched"); //localStorage에 watched라는 항목 꺼내서 변수에저장
    꺼낸거 = JSON.parse(꺼낸거); //JSON 자료를 다시 array로 바꿔서 변수에 저장
    꺼낸거.push(찾은상품.id); //array에 []자료추가
    꺼낸거 = new Set(꺼낸거);
    꺼낸거 = Array.from(꺼낸거);
    localStorage.setItem("watched", JSON.stringify(꺼낸거)); //localStorage에 JSON형태로 자료저장
  }, []);

  // useEffect(()=>{
  //     let a = setTimeout(()=>{setAlert(false)}, 2000)
  //     return () => {
  //         clearTimeout(a)
  //     }
  // },[])
  //useEffect실행조건 넣을 수 있는 곳은[] ,count라는 변수가 변할때만 코드가 진행됨

  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  return (
    <div className={"container start " + fade2}>
      <div className="container">
        {alert == true ? (
          <div className="alert alert-warning">2초이내 구매시 할인</div>
        ) : null}
        {count}
        {/* <CuteBtn onClick={()=>{setCount(count+1)}}>장착</CuteBtn>
            <CuteBtn bg="blue" >버튼</CuteBtn>
            <CuteBtn bg="black">버튼</CuteBtn>
            <Box></Box> */}
        <div className="row">
          <div className="col-md-6">
            <img src={"/ob1.jpeg"} alt="상품1" width="60%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{props.shop[id].title}</h4>
            <p>{props.shop[id].content}</p>
            <p>{props.shop[id].price}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(
                  addItem({ id: 3, name: props.shop[id].title, count: 1 }),
                );
              }}
            >
              주문하기
            </button>
          </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                탭변경(0);
              }}
              eventKey="link0"
            >
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                탭변경(1);
              }}
              eventKey="link1"
            >
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                탭변경(2);
              }}
              eventKey="link2"
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭={탭} />
      </div>
    </div>
  );
}

function TabContent({ 탭 }) {
  let [fade, setFade] = useState("");
  let { 재고, shop } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 500);
    setFade("end");
    return () => {
      setFade("");
    }; //cleanupfunction:useEffect사용 실행 전에 실행되는 함수
  }, [탭]);

  return (
    <div className={"start " + fade}>
      {[<div>내용1</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

export default Detail;
