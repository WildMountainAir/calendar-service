import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const WidgetHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
`;

const Price = styled.span`
  font-size: 22px;
  line-height: 26px;
  font-weight: 600;
`;

const PerNight = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
`;

const Star = styled.span`
  color: #92174D;
  font-size: 0.6em;
  line-height: 18px;
  vertical-align: top;
`;

const Score = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding-left: 4px;
`;

const Count = styled.span`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  padding-left: 4px;
  color: rgb(113, 113, 113);
`;

const WidgetHeader = ({ headerInfo }) => (
  <WidgetHeaderWrapper>
    <div>
      <Price id="priceForHarris">{`$${headerInfo.lowestPrice}`}</Price>
      <PerNight> / night</PerNight>
    </div>
    <div>
      <Star><FontAwesomeIcon icon={faStar} /></Star>
      <Score>{headerInfo.rating}</Score>
      <Count>{`(${headerInfo.reviews})`}</Count>
    </div>
  </WidgetHeaderWrapper>
);

export default memo(WidgetHeader);

WidgetHeader.propTypes = {
  headerInfo: PropTypes.objectOf(PropTypes.number),
};

WidgetHeader.defaultProps = {
  headerInfo: {
    lowestPrice: 236,
    rating: 4.89,
    reviews: 36,
  },
};
