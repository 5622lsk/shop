// 컴포넌트 안에서 쓰는 if else문
function Conponent() {
  if (true) {
    return <p>참이면 보여줄 html</p>;
  }
  return null;
}

//JSX에서 쓰는 삼항연산자
function components() {
  return (
    <div>
      {1 === 1 ? (
        <p>참이면 보여줄 HTML</p>
      ) : 2 === 2 ? (
        <p>안녕</p>
      ) : (
        <p>하이</p>
      )}
    </div>
  );
}

//&&연산자 : '왼쪽 오른쪽 둘다 true면 전체를 true로 바꿔주세요' 라고 쓸 때
function Component() {
  return <div>{1 === 1 ? <p>참이면 보여줄 html</p> : null}</div>;
}

function Component() {
  return <div>{1 === 1 && <p>참이면 보여줄 html</p>}</div>;
}

//switch / case문
function Component() {
  var user = "seller";
  switch (user) {
    case "seller":
      return <h4>판매자 로그인</h4>;
    case "customer":
      return <h4>구매자 로그인</h4>;
    default:
      return <h4>그냥 로그인</h4>;
  }
}

function Component() {
  var user = "seller";
  if (user === "seller") {
    return <h4>판매자 로그인</h4>;
  } else if (user === "customer") {
    return <h4>구매자 로그인</h4>;
  } else {
    return <h4>그냥 로그인</h4>;
  }
}

//object
var 탭UI = {
  info: <p>상품정보</p>,
  shipping: <p>배송관련</p>,
  refund: <p>환불약관</p>,
};

function Component() {
  var 현재상태 = "info";
  return <div>{탭UI[현재상태]}</div>;
}
