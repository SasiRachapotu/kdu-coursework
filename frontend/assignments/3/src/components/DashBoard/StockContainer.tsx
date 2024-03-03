import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import StockItem from "./StockItem";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "../../redux/thunk/getStocks";
import { RootState, itemsDispatch } from "../../redux/store";
import ExploreStockContainer from "./ExploreStockContainer";

// Styled Components
const StockContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  @media (max-width: 450px) {
    font-size: 14px;
    width:100%
  }
`;

const SubContainer = styled.div`
  width: 92%;
  border: 2px solid black;
  border-radius: 1rem;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  @media (max-width: 450px) {
    font-size: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 2px solid black;
`;

const RightHeader = styled.div`
  display: flex;
  width: 200px;
  @media (max-width: 450px) {
    flex: 0.75;
  }
`;

const BasePrice = styled.div`
  margin-right: 1rem;
  flex: 2;

  @media (max-width: 450px) {
    flex: 1;
  }
`;

const Stocks = styled.div`
  padding: 1rem;
  flex: 1;
`;

const PaginatedFooter = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const StyledPagination = styled(Pagination)`
@media (max-width: 450px) {
  font-size: 12px !important;
}
`;

const CompanyTitle = styled.div`
@media (max-width: 450px) {
  flex:1
}
`;

const StockContainer = () => {
  const stocksDispatch = useDispatch<itemsDispatch>();
  const allStocks = useSelector((store: RootState) => store.stocks.stocks);
  const pageCount = Math.ceil(allStocks.length / 6);
  const [currPage, setCurrPage] = useState<number>(1);
  const exploreState = useSelector(
    (state: RootState) => state.stocks.exploreState
  );

  useEffect(() => {
    stocksDispatch(getStocks());
  }, [stocksDispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrPage(page);
  };

  return (
    <StockContainerWrapper>
      {exploreState !== "explore" ? (
        <ExploreStockContainer />
      ) : (
        <SubContainer>
          <Header>
          <CompanyTitle>Company</CompanyTitle>
            <RightHeader>
              <BasePrice>Base Price</BasePrice>
              <div className="Watchlist">Watchlist</div>
            </RightHeader>
          </Header>
          <Stocks>
            {allStocks.slice((currPage - 1) * 6, currPage * 6).map((stock) => (
              <StockItem key={stock.stock_name} stock={stock} />
            ))}
          </Stocks>
          <PaginatedFooter>
            <StyledPagination
              count={pageCount}
              color="primary"
              onChange={handlePageChange}
            />
          </PaginatedFooter>
        </SubContainer>
      )}
    </StockContainerWrapper>
  );
};

export default StockContainer;
