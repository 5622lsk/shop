import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import bg from "./images/main.jpeg";
import { lazy, Suspense, useEffect, useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import TabsExample from "./routes/Detail.js";
import axios from "axios";
import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";

export let Context1 = createContext(); //contextAPI 셋팅

// import Cart from './routes/Cart.js';
// import Detail from './routes/Detail.js';
const Detail = lazy(() => import("./routes/Detail.js")); //필요해질 때 import해줌
const Cart = lazy(() => import("./routes/Cart.js"));

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  // let obj = {name : 'kim'}
  // JSON.stringify(obj)
  // localStorage.setItem('data', JSON.stringify(obj))
  // let 꺼낸거 = localStorage.getItem('data')
  // JSON.parse
  // console.log(꺼낸거);

  let [재고] = useState([10, 11, 12]);
  let [shop, setShop] = useState(data);
  let navigate = useNavigate(); //페이지 이동 도와주는 useNavigate()

  let result = useQuery(
    ["작명"],
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
    { staleTime: 2000 },
  );

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light" className="">
        <Container>
          <Navbar.Brand href="#home">HeyShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* { result.isLoading ? '로딩중' : result.data.name } */}
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className="main-bg"
                  style={{ backgroundImage: "url(" + bg + ")" }}
                ></div>

                <div className="container">
                  <div className="row">
                    {shop.map((a, i) => {
                      return <Card shop={shop[i]} i={i} key={i}></Card>;
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((결과) => {
                        let copy = [...shop, ...결과.data]; //...:괄호 벗겨주는 문법{},{},{}
                        setShop(copy);
                      })
                      .catch(() => {
                        console.log("요청실패했습니다.");
                      });
                  }}
                >
                  더보기
                </button>
              </>
            }
          />

          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고, shop }}>
                <Detail shop={shop} />{" "}
                {/* <-여기 안에 모든 컴포넌트는 재고,shop사용가능*/}
              </Context1.Provider>
            }
          />

          {/* nested routes */}
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버입니다</div>} />
            <Route path="location" element={<div>위치정보입니다</div>} />
          </Route>

          <Route path="/cart" element={<Cart />}></Route>

          <Route path="*" element={<div>없는페이지입니다</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}
{
  /* 컴포넌트 만들기 */
}
function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"/ob" + props.i + ".jpeg"}
        alt="상품1"
        style={{
          width: "80%",
          height: "300px",
          objectFit: "cover",
        }}
      />
      <h4>{props.shop.title}</h4>
      <p>{props.shop.price}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet> {/* 어디에 About/member 보여줄지 위치 */}
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>Today's Event</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
