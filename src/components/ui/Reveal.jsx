import useScrollReveal from "../../hooks/useScrollReveal";
import "./Reveal.css";


export default function Reveal({ children, direction = "up", delay = 0, as: Tag = "div", className = "" }) {
  const { ref, visible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${direction} ${visible ? "reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}