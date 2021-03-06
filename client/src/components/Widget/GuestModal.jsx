/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModalCloseButton from '../ModalCloseButton';
import GuestSelector from './GuestSelector';

const GuestModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100 %;
  margin: 0px;
`;

const GuestModalInnerWrapper = styled.div`
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 16px;
  position: absolute;
  text-align: left;
  z-index: 50;
  right: 0px;
  width: 100%;
  min-width: 280px;
`;

const MaxGuests = styled.div`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  display: block;
  font-size: 14px;
  line-height: 18px;
  vertical-align: top;
  color: rgb(113, 113, 113);
  margin-bottom: 16px;
`;

const GuestModalCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GuestModal = ({ hideGuestModal, show, guests, increaseGuestCount, decreaseGuestCount }) => (
  <GuestModalWrapper>
    {
      show
        ? (
          <GuestModalInnerWrapper>
            <GuestSelector
              target={{ target: 'adults', subtext: '' }}
              currentValue={guests.adults}
              increaseGuestCount={increaseGuestCount}
              decreaseGuestCount={decreaseGuestCount}
              currentTotal={guests.totalGuests}
            />
            <GuestSelector
              target={{ target: 'children', subtext: 'Ages 2-12' }}
              currentValue={guests.children}
              increaseGuestCount={increaseGuestCount}
              decreaseGuestCount={decreaseGuestCount}
              currentTotal={guests.totalGuests}
            />
            <GuestSelector
              target={{ target: 'infants', subtext: 'Under 2' }}
              currentValue={guests.infants}
              increaseGuestCount={increaseGuestCount}
              decreaseGuestCount={decreaseGuestCount}
              currentTotal={guests.totalGuests}
            />

            <MaxGuests>
              6 guests maximum. Infants don’t count toward the number of guests.
            </MaxGuests>
            <GuestModalCloseButtonWrapper>
              <ModalCloseButton name="guestModalVisible" funct={hideGuestModal} />
            </GuestModalCloseButtonWrapper>
          </GuestModalInnerWrapper>
        )
        : <div />
    }

  </GuestModalWrapper>
);

export default memo(GuestModal);

GuestModal.propTypes = {
  hideGuestModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  guests: PropTypes.objectOf(PropTypes.number).isRequired,
  increaseGuestCount: PropTypes.func.isRequired,
  decreaseGuestCount: PropTypes.func.isRequired,
};
