import styles from "./rankTable.module.css";
import RankList from "./rankList";
import { useEffect } from "react";

function rankTable(props: any) {
  return (
    <div className={`${styles.rankcontainer}`}>
      <div className={`${styles.ranktitle}`}>Rank</div>
      <div className={`${styles.rankbackground}`}>
        {/* 랭크 리스트 들어갈곳*/}
        <RankList
          num={"1🥇"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"2🥈"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"3🥉"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"4 "}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"5 "}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"6 "}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"7 "}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"8 "}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"9 "}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"10"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"11"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"12"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"13"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"14"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"15"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
        <RankList
          num={"16"}
          name={"nick name"}
          winnum={"0001"}
          losenum={"0000"}
          point={"0000"}
        />
      </div>
    </div>
  );
}

export default rankTable;
