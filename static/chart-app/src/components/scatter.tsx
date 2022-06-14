import GlyphCircle, {
  GlyphCircleProps,
} from "@visx/glyph/lib/glyphs/GlyphCircle";
import GlyphTriangle, {
  GlyphTriangleProps,
} from "@visx/glyph/lib/glyphs/GlyphTriangle";

export type ScatterProps = {
  x: number;
  y: number;
  size: number;
} & Omit<
  React.SVGProps<SVGPathElement>,
  keyof GlyphCircleProps<unknown> & GlyphTriangleProps<unknown>
>;

function Scatter({ x, y, size, ...rest }: ScatterProps) {
  return size ? (
    <GlyphCircle className="dot" left={x} top={y} size={size} {...rest} />
  ) : (
    <GlyphTriangle
      className="triangle"
      left={x}
      top={y}
      {...rest}
      size={50}
      fill="red"
    />
  );
}

export default Scatter;
