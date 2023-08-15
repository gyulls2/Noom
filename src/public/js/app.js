const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });

  //socket.emit()
  // 첫번째 인자: event이름의 text, emit과 서버의 on은 같은 이름(string)이어야 한다.
  // 두번째 인자: 보내고 싶은 payload
  // 세번째 인자: 서버에서 호출하는 function

  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
