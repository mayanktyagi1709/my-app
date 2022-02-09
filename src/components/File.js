import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import localforage from "localforage";

const File = ({ per_page }) => {
  const [items, setItems] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemLength, setItemLength] = useState([]);

  const saveData = (data) => {
    localforage.setItem("user", data);
  };

  const getData = () => {
    return axios(
      `https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=${pageNumber}&per_page=${per_page}`
    ).then(({ data }) => {
      console.log(data);
      // setItemLength(data.events);
      setTotalItems(data.meta.total);
      saveData(data.events);
      return JSON.stringify(data, null, 2);
    });
  };

  useEffect(() => {
    getData().then((data) => {
      setItems(data);
    });
  }, []);

  const getMoreData = () => {
    return axios(
      `https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=${
        pageNumber + 1
      }&per_page=${per_page}`
    ).then(({ data }) => {
      setPageNumber(pageNumber + 1);
      setItemLength(itemLength.concat(data.events));
      setTotalItems(data.meta.total);

      return JSON.stringify(data, null, 2);
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={itemLength.length}
        next={getMoreData}
        hasMore={itemLength.length !== totalItems}
        // loader={<h4>Loading...</h4>}
      >
        <pre>{items}</pre>
      </InfiniteScroll>
    </>
  );
};

export default File;
