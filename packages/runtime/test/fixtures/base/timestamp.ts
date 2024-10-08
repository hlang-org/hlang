import { ReadableNode, Port } from "../../../src/index";
import { interval } from "rxjs";
import * as moment from "moment";

export default class TimestampNode extends ReadableNode {
  constructor(opts) {
    super(opts);

    this.opts = opts;

    Port.O("Output").attach(this);
  }

  _read($o) {
    const { config = {} } = this.opts;
    const { params = {} } = config;

    const time: number = moment.duration(params.interval).asMilliseconds();

    const source = interval(time);

    source.subscribe(() => {
      const timestamp = moment().toISOString();

      $o("Output").send(timestamp);
    });
  }
}
