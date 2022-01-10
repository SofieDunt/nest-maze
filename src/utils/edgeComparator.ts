/**
 * Compares edges by their weight.
 */
import { Comparator } from './index';
import { EdgeDto } from '../dto';

export class EdgeComparator implements Comparator<EdgeDto> {
  compare(one: EdgeDto, two: EdgeDto): number {
    if (one.weight === two.weight) {
      return 0;
    } else if (one.weight < two.weight) {
      return -1;
    } else {
      return 1;
    }
  }
}
