import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "./sketch";

export default function GameCanvas() {
  return <ReactP5Wrapper sketch={sketch} />;
}
