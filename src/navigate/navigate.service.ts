import { Injectable } from '@nestjs/common';
import { MazeDto, DirectionEnum } from '../dto';

@Injectable()
export class NavigateService {
  move(player: number, maze: MazeDto, direction: DirectionEnum): number {
    let movedPlayer = player;
    if (NavigateService.canMove(player, maze, direction)) {
      switch (direction) {
        case DirectionEnum.LEFT:
          movedPlayer = player - 1;
          break;
        case DirectionEnum.RIGHT:
          movedPlayer = player + 1;
          break;
        case DirectionEnum.UP:
          movedPlayer = player - maze.xDim;
          break;
        case DirectionEnum.DOWN:
          movedPlayer = player + maze.xDim;
          break;
      }
    }
    return movedPlayer;
  }

  private static canMove(
    player: number,
    maze: MazeDto,
    direction: DirectionEnum,
  ): boolean {
    const posn = maze.nodes[player].posn;
    switch (direction) {
      case DirectionEnum.LEFT:
        return posn.x - 1 >= 0 && maze.nodes[player - 1].hasPathToRight;
      case DirectionEnum.RIGHT:
        return posn.x + 1 < maze.xDim && maze.nodes[player].hasPathToRight;
      case DirectionEnum.UP:
        return (
          posn.y - 1 >= 0 && maze.nodes[player - maze.xDim].hasPathToBottom
        );
      case DirectionEnum.DOWN:
        return posn.y + 1 < maze.yDim && maze.nodes[player].hasPathToBottom;
      default:
        return false;
    }
  }
}
