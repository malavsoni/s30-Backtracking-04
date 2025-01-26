// Note: it's the combination of N-Queens problem and 0-1 Matrix
// Time Complexity : O(hxw)(hxwCn)
// Space Complexity : O(n)
class BuildingPlacement {
  findMinimumDistance(h: number, w: number, buildings: number) {
    let grid: number[][] = Array.from({ length: h }, () => Array(w).fill(-1));
    return this.placeTheBuilding(grid, 0, 0, buildings);
  }

  private placeTheBuilding(
    grid: number[][],
    row: number,
    col: number,
    buildings: number
  ): number {
    if (buildings == 0) {
      return this.findDistanceFromPlacements(grid);
    }

    if (col == grid[row].length) {
      col = 0;
      row += 1;
    }

    let min = Number.MAX_SAFE_INTEGER;
    for (let i = row; i < grid.length; i++) {
      for (let j = col; j < grid[i].length; j++) {
        if (grid[i][j] == -1) {
          grid[i][j] = 0;
          min = Math.min(
            min,
            this.placeTheBuilding(grid, i, j + 1, buildings - 1)
          );
          grid[i][j] = -1;
        }
      }
    }

    return min;
  }

  private findDistanceFromPlacements(grid: number[][]): number {
    let visited: number[][] = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill(0)
    );
    let queue: number[][] = [];

    // find position of buildings
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == 0) {
          queue.push([i, j]);
          visited[i][j] = 1;
        }
      }
    }

    const directions: number[][] = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    let distance = 0;
    while (queue.length > 0) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let current = queue.shift()!;

        for (const dir of directions) {
          let row = current[0] + dir[0];
          let col = current[1] + dir[1];
          if (
            row >= 0 &&
            row < grid.length &&
            col >= 0 &&
            col < grid[row].length &&
            grid[row][col] == -1 &&
            visited[row][col] == 0
          ) {
            visited[row][col] = 1;
            queue.push([row, col]);
          }
        }
      }
      if (queue.length > 0) distance++;
    }

    return distance;
  }
}
describe("Building Placement", () => {
  it("Happy Path - 01", () => {
    let buildingPlacer = new BuildingPlacement();
    expect(buildingPlacer.findMinimumDistance(5, 4, 3)).toStrictEqual(2);
  });
});
