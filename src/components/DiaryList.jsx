import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./DiaryList.css"
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const DiaryList = ({data}) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState("latest"); // 정렬 옵션의 기본 값은 최신순

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    // 원본 배열을 그대로 냅두고 정렬된 새로운 배열을 반환
    return data.toSorted((a,b) => {
      if(sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    })
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={()=>nav("/new")} text={"새 일기 쓰기"} type={"POSITIVE"}/>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => <DiaryItem key={item.id} {...item}/>)} 
      </div>
    </div>
  )
}

export default DiaryList;