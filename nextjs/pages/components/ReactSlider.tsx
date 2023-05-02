import { ReactElement, ReactNode } from "react";
import Slider from "react-slick";

interface MyProps {
  children?: ReactNode;
}

export default function ReactSlider({ children }: MyProps) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <Slider {...settings}>{children}</Slider>;
}
