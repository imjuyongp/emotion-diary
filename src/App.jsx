import './App.css'
import { useReducer, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Notfound from './pages/Notfound'
import Edit from './pages/Edit'

// 임시 일기 데이터
const mockData = [
  {
    id: 1,
    createdData : new Date().getTime(),
    emotionId : 1,
    content : "1번 일기 내용"
  },
  {
    id: 2,
    createdData : new Date().getTime(),
    emotionId : 2,
    content : "2번 일기 내용"
  },
];

function reducer(state, action) {
  switch(action.type) {
    case "CREATE": 
      return [action.data, ...state]
    case "UPDATE":
      return state.map((item)=>String(item.id) === String(action.data.id) ? action.data : item);
    case "DELETE":
      // filter 메서드 : 조건식에 만족하는 요소만 골라서 새로운 배열을 만들어줌
      return state.filter((item) => String(item.id) !== String(action.id)); // item.id와 action.id가 같은 것들은 빼고 리턴해줌 (삭제효과)
    default :
      return state;
  }
}


function App() {

  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); // 1, 2번은 mockData에서 임시로 사용중이므로 3번부터 시작하도록 초기화

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type : "CREATE",
      data : {
        id : idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  }

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch(
      {
        type : "UPDATE",
        data : {
          id,
          createdDate,
          emotionId,
          content
        }
      }
    )
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type : "DELETE",
      id,
    })
  }

  return (
    <>
    <button onClick={() => {
      onCreate(new Date().getTime(), 1, "hello");
    }}>일기 추가 테스트</button>

    <button onClick={() => {
      onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다")
    }}>일기 수정 테스트</button>

    <button onClick={() => {
      onDelete(1);
    }}>일기 삭제 테스트</button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  )
}

export default App
