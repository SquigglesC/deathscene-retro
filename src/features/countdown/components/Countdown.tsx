import { ROUTES } from "../../../utils/routes";
import Countdown from 'react-countdown';

interface CountdownProps {
  releaseDate: Date;
}

export function CountdownComponent({ releaseDate }: CountdownProps) {

  const renderer = ({ days, hours, minutes, seconds, completed }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {

    return completed ? (
      <span className="lg:px-24">Shop</span>
    ) : (
      <span className="lg:text-6xl text-4xl">
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    )

  }

  return <Countdown date={releaseDate} renderer={renderer} />;
}
