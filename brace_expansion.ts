// Time Complexity : O(k^n) k size of average group.. n is the size of groups.
// Space Complexity : O(n)

function brace_expansion(input: string): string[] {
  let result: string[] = [];
  let groups: string[][] = [];

  let idx = 0;

  while (idx < input.length) {
    let group: string[] = [];
    let char = input.charAt(idx);

    if (char == "{") {
      idx++;
      while (input.charAt(idx) != "}") {
        if (input.charAt(idx) != ",") {
          group.push(input.charAt(idx));
        }
        idx++;
      }
      idx++;
    } else {
      group.push(char);
      idx++;
    }
    group.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    groups.push(group);
  }

  function dfs(idx: number, path: string[]) {
    if (idx == groups.length) {
        result.push(path.join(""));
      return;
    }

    for (let i = 0; i < groups[idx].length; i++) {
      path.push(groups[idx][i]);
      dfs(idx + 1, path);
      path.pop();
    }
  }

  dfs(0, []);

  return result;
}

describe("1087. Brace Expansion", () => {
  it("Happy Path - 01", () => {
    expect(brace_expansion("a{c,b}d")).toStrictEqual(["abd", "acd"]);
  });
});
