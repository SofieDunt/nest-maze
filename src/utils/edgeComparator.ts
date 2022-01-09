/**
 * Compares edges by their weight.
 */
import Comparator from './comparator';
import Edge from '../types/edge';

export default class EdgeComparator implements Comparator<Edge> {
  compare(one: Edge, two: Edge): number {
    if (one.weight === two.weight) {
      return 0;
    } else if (one.weight < two.weight) {
      return -1;
    } else {
      return 1;
    }
  }
}
