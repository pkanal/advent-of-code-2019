const { interpret, parseOpCode } = require("./5");

describe("Parse OpCodes", () => {
  test("addition", () => {
    expect(parseOpCode(1)).toEqual({
      action: "ADD",
      parameters: ["POSITION", "POSITION"],
      nextInstruction: 4
    });
  });
  test("multiplication", () => {
    expect(parseOpCode(2)).toEqual({
      action: "MULTIPLY",
      parameters: ["POSITION", "POSITION"],
      nextInstruction: 4
    });
  });
  test("input", () => {
    expect(parseOpCode(3)).toEqual({
      action: "INPUT",
      parameters: ["POSITION"],
      nextInstruction: 2
    });
  });
  test("output", () => {
    expect(parseOpCode(4)).toEqual({
      action: "OUTPUT",
      parameters: ["POSITION"],
      nextInstruction: 2
    });
  });
  test("with parameters (3)", () => {
    expect(parseOpCode(102)).toEqual({
      action: "MULTIPLY",
      parameters: ["IMMEDIATE", "POSITION"],
      nextInstruction: 4
    });
  });
  test("with parameters (4)", () => {
    expect(parseOpCode(1002)).toEqual({
      action: "MULTIPLY",
      parameters: ["POSITION", "IMMEDIATE"],
      nextInstruction: 4
    });
    expect(parseOpCode(1101)).toEqual({
      action: "ADD",
      parameters: ["IMMEDIATE", "IMMEDIATE"],
      nextInstruction: 4
    });
    expect(parseOpCode(104)).toEqual({
      action: "OUTPUT",
      parameters: ["IMMEDIATE"],
      nextInstruction: 2
    });
  });
  test("end instruction", () => {
    expect(parseOpCode(99)).toEqual({
      action: "END",
      parameters: []
    });
  });

  test("jump if true", () => {
    expect(parseOpCode(5)).toEqual({
      action: "JUMP_IF_TRUE",
      parameters: ["POSITION", "POSITION"],
      nextInstruction: 3
    });
    expect(parseOpCode(105)).toEqual({
      action: "JUMP_IF_TRUE",
      parameters: ["IMMEDIATE", "POSITION"],
      nextInstruction: 3
    });
    expect(parseOpCode(1105)).toEqual({
      action: "JUMP_IF_TRUE",
      parameters: ["IMMEDIATE", "IMMEDIATE"],
      nextInstruction: 3
    });
  });

  test("jump if false", () => {
    expect(parseOpCode(6)).toEqual({
      action: "JUMP_IF_FALSE",
      parameters: ["POSITION", "POSITION"],
      nextInstruction: 3
    });
    expect(parseOpCode(106)).toEqual({
      action: "JUMP_IF_FALSE",
      parameters: ["IMMEDIATE", "POSITION"],
      nextInstruction: 3
    });
    expect(parseOpCode(1006)).toEqual({
      action: "JUMP_IF_FALSE",
      parameters: ["POSITION", "IMMEDIATE"],
      nextInstruction: 3
    });
  });

  test("less than", () => {
    expect(parseOpCode(7)).toEqual({
      action: "LESS_THAN",
      parameters: ["POSITION", "POSITION"],
      nextInstruction: 4
    });
    expect(parseOpCode(107)).toEqual({
      action: "LESS_THAN",
      parameters: ["IMMEDIATE", "POSITION"],
      nextInstruction: 4
    });
    expect(parseOpCode(1107)).toEqual({
      action: "LESS_THAN",
      parameters: ["IMMEDIATE", "IMMEDIATE"],
      nextInstruction: 4
    });
  });

  test("equals", () => {
    expect(parseOpCode(8)).toEqual({
      action: "EQUALS",
      parameters: ["POSITION", "POSITION"],
      nextInstruction: 4
    });
  });
});

describe("Addition and multiplication operations", () => {
  test("multiplication", () => {
    expect(interpret([1002, 4, 3, 4, 33])).toEqual({
      memory: [1002, 4, 3, 4, 99],
      nextInstructionIndex: -1,
      output: null,
      inputIndex: 0
    });
  });

  test("addition", () => {
    expect(interpret([1, 0, 0, 0, 99])).toEqual({
      memory: [2, 0, 0, 0, 99],
      nextInstructionIndex: -1,
      output: null,
      inputIndex: 0
    });
  });

  test("input / output", () => {
    expect(interpret([3, 0, 4, 0, 99], [1])).toEqual({
      memory: [1, 0, 4, 0, 99],
      nextInstructionIndex: -1,
      output: 1,
      inputIndex: 1
    });
  });

  test("jump if true", () => {
    expect(
      interpret([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [0]).output
    ).toEqual(0);
    expect(
      interpret([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [1000])
        .output
    ).toEqual(1);
  });

  test("jump if false", () => {
    expect(
      interpret([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], [0])
        .output
    ).toEqual(0);
    expect(
      interpret(
        [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
        [1000]
      ).output
    ).toEqual(1);
  });

  test("less than (position mode)", () => {
    expect(interpret([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [4]).output).toBe(1);
    expect(interpret([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [8]).output).toBe(0);
  });

  test("less than (immediate mode)", () => {
    expect(interpret([3, 3, 1107, -1, 8, 3, 4, 3, 99], [4]).output).toBe(1);
    expect(interpret([3, 3, 1107, -1, 8, 3, 4, 3, 99], [8]).output).toBe(0);
  });

  test("equals (position mode)", () => {
    expect(interpret([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [8]).output).toBe(1);
    expect(interpret([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [-47]).output).toBe(
      0
    );
  });

  test("equals (immediate mode)", () => {
    expect(interpret([3, 3, 1108, -1, 8, 3, 4, 3, 99], [8]).output).toBe(1);
    expect(interpret([3, 3, 1108, -1, 8, 3, 4, 3, 99], [-47]).output).toBe(0);
  });

  test("larger example", () => {
    expect(
      interpret(
        [
          3,
          21,
          1008,
          21,
          8,
          20,
          1005,
          20,
          22,
          107,
          8,
          21,
          20,
          1006,
          20,
          31,
          1106,
          0,
          36,
          98,
          0,
          0,
          1002,
          21,
          125,
          20,
          4,
          20,
          1105,
          1,
          46,
          104,
          999,
          1105,
          1,
          46,
          1101,
          1000,
          1,
          20,
          4,
          20,
          1105,
          1,
          46,
          98,
          99
        ],
        [-5]
      ).output
    ).toBe(999);
    expect(
      interpret(
        [
          3,
          21,
          1008,
          21,
          8,
          20,
          1005,
          20,
          22,
          107,
          8,
          21,
          20,
          1006,
          20,
          31,
          1106,
          0,
          36,
          98,
          0,
          0,
          1002,
          21,
          125,
          20,
          4,
          20,
          1105,
          1,
          46,
          104,
          999,
          1105,
          1,
          46,
          1101,
          1000,
          1,
          20,
          4,
          20,
          1105,
          1,
          46,
          98,
          99
        ],
        [8]
      ).output
    ).toBe(1000);
    expect(
      interpret(
        [
          3,
          21,
          1008,
          21,
          8,
          20,
          1005,
          20,
          22,
          107,
          8,
          21,
          20,
          1006,
          20,
          31,
          1106,
          0,
          36,
          98,
          0,
          0,
          1002,
          21,
          125,
          20,
          4,
          20,
          1105,
          1,
          46,
          104,
          999,
          1105,
          1,
          46,
          1101,
          1000,
          1,
          20,
          4,
          20,
          1105,
          1,
          46,
          98,
          99
        ],
        [39482]
      ).output
    ).toBe(1001);
  });
});
