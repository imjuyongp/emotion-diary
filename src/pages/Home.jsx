import { useState, useContext } from "react"
import { DiaryStateContext } from "../App"

import Header from "../components/Header"
import Button from "../components/Button"
import DiaryList from "../components/DiaryList"

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date( // 이번달의 가장 첫번째 시작하는 시간
    pivotDate.getFullYear(), 
    pivotDate.getMonth(), 
    1, // 일
    0, // 시
    0, // 분
    0 // 초
  ).getTime();

  const endTime = new Date( // 이번달의 가장 마지막 시간
    pivotDate.getFullYear(),
    pivotDate.getMonth() +1,
    0,
    23,
    59,
    59
  ).getTime();

  // 이번달에 작성된 일기만 필터링
  return data.filter((item) => beginTime <= item.createdDate && endTime >= item.createdDate)
}

const Home = () => {

  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);
  // console.log(monthlyData);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return <div>
    <Header title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
      leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
      rightChild={<Button onClick={onIncreaseMonth} text={">"} />}  
    />
    <DiaryList data={monthlyData} />
  </div>
}

export default Home;