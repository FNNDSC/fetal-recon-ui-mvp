import {Niivue, type NVConfigOptions} from "@niivue/niivue";

type CustomOptions = {
  hideCrosshair: boolean
};

class SizedNiivue extends Niivue {
  private customOptions: CustomOptions;
  constructor(options?: Partial<NVConfigOptions>) {
    super({ crosshairWidth: 0.5, textHeight: 0.2, ...options});
    this.customOptions = {
      hideCrosshair: false
    };
  }

  // Overridden to achieve absolute sizing of font and crosshair width.
  // See https://github.com/niivue/niivue/issues/857#issuecomment-1908825571
  resizeListener() {
    const screenSize = Math.min(this.gl.canvas.width, this.gl.canvas.height);
    this.opts.textHeight = 20 / screenSize;
    this.updateCrosshairs();
    super.resizeListener();
  }

  drawTextBetween(startXYendXY: number[], str: string, scale?: number, color?: number[] | null) {
    // see https://github.com/niivue/niivue/issues/1090
    const [x0, y0, x1, y1] = startXYendXY;
    const [x, y] = extendTo(x0, y0, x1, y1, 30);
    const modifiedPos = [x, y, x + 1, y + 1];
    super.drawTextBetween(modifiedPos, str, scale, color);
  }

  private screenSize() {
    return Math.min(this.gl.canvas.width, this.gl.canvas.height);
  }

  public setCrosshairHidden(hidden: boolean) {
    this.customOptions.hideCrosshair = hidden;
    this.updateCrosshairs();
  }

  updateCrosshairs() {
    this.setCrosshairWidth(this.customOptions.hideCrosshair ? 0 : 300 / this.screenSize());
  }
}

/**
 * Return a point a specified distance away from (x0, y0) in the direction of the vector from
 * (x0, y0) to (x1, y1).
 */
function extendTo(x0: number, y0: number, x1: number, y1: number, distance: number): [number, number] {
  const x = x0 - x1;
  const y = y0 - y1;
  if (x === 0 && y === 0) {
    return [x1 + distance, y1];
  }
  const c = Math.sqrt(x * x + y * y);
  const dX = distance * x / c;
  const dY = distance * y / c;

  return [x1 - dX, y1 - dY];
}

export default SizedNiivue;
