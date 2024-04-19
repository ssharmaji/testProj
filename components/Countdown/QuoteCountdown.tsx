import * as React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { Alert, AlertIcon } from '@chakra-ui/react';

type QuoteCountdownProps = {
  countdownMinutes?: number;
  handleCompleted: () => void;
};

const QuoteCountdown = ({
  countdownMinutes = 15,
  handleCompleted,
}: QuoteCountdownProps) => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      handleCompleted();
      return null;
    } else {
      const status = minutes >= 5 ? 'info' : 'warning';

      return (
        <Alert status={status}>
          <AlertIcon />
          This quote can be viewed for {zeroPad(minutes)}:{zeroPad(seconds)}
        </Alert>
      );
    }
  };

  const durationInMs = countdownMinutes * 60000;

  return <Countdown date={Date.now() + durationInMs} renderer={renderer} />;
};

export default QuoteCountdown;
